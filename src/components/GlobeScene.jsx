import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import PROJECTS, { PROJECT_EVENT, PAGE_EVENT, PICK_EVENT } from '../data/projects';
import { trackEvent } from '../hooks/useUmami';
import createGalaxy, { createWarp, createFlyby, createFriendPlanet } from './galaxy';
import FRIENDS, { WARP_PARAM, WARP_FROM } from '../data/friends';

/*
 * Globe scene (three.js, no framework): "code is meant to be shared".
 * One fixed scene behind the whole home page:
 *  - a complete dotted planet with an atmosphere halo
 *  - a network of cities linked by faint routes, with data packets travelling
 *    back and forth (a message, then its reply), routes slowly handing over to new ones
 *  - a starfield that parallaxes with the cursor
 * As you scroll, the globe moves section by section: it slides to the side, zooms in,
 * becomes a horizon under the stack. Click on the globe to open new links from that spot.
 */

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const DOTS_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uCursor;     // cursor hit point on the globe (local space), or far away
uniform float uRipple;    // 0..1 click ripple progress
uniform vec3 uRippleAt;
varying float vLand;
varying float vFacing;
varying float vGlow;
${NOISE}
void main(){
  vec3 p = position;
  vec3 n = normalize(p);
  // procedural "continents"
  float land = snoise(n * 1.6) * 0.65 + snoise(n * 3.4 + 7.0) * 0.35;
  vLand = land;
  // cursor makes nearby dots lift and glow
  float d = distance(n, normalize(uCursor));
  float near = smoothstep(0.22, 0.0, d) * step(length(uCursor), 10.0);
  // click ripple: ring travelling outward over the surface
  float rd = distance(n, normalize(uRippleAt));
  float ring = smoothstep(0.12, 0.0, abs(rd - uRipple * 1.6)) * (1.0 - uRipple);
  vGlow = max(near, ring);
  p += n * (near * 0.05 + ring * 0.07);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vFacing = dot(normalize(normalMatrix * n), normalize(-mv.xyz));
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uPixelRatio * (1.0 + vGlow * 1.6) * (11.0 / -mv.z);
}
`;

const DOTS_FRAG = /* glsl */ `
uniform float uLight;
varying float vLand;
varying float vFacing;
varying float vGlow;
void main(){
  if (vLand < 0.02) discard;
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float edge = smoothstep(0.0, 0.55, vFacing);   // fade towards the limb
  vec3 base = mix(vec3(0.795, 0.778, 0.895), vec3(0.32, 0.22, 0.55), uLight);
  vec3 hot = vec3(0.895, 0.7, 0.825);
  vec3 col = mix(base, hot, vGlow);
  float a = (0.45 + 0.55 * edge) * (0.8 + vGlow * 0.2);
  gl_FragColor = vec4(col, a);
}
`;

const ATMO_VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vV;
void main(){
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const ATMO_FRAG = /* glsl */ `
uniform float uLight;
uniform float uBoost;
varying vec3 vN;
varying vec3 vV;
void main(){
  float f = 1.0 - abs(dot(vN, vV));
  float glow = pow(f, 3.2) * 1.2;
  // violet on top, pink/orange toward the sides
  vec3 col = mix(vec3(0.512, 0.44, 0.745), vec3(0.745, 0.505, 0.6), smoothstep(0.2, 0.9, abs(vN.x)));
  col = mix(col, vec3(0.47, 0.578, 0.775), smoothstep(0.3, 1.0, vN.y) * 0.5);
  float a = glow * (0.9 + uBoost * 0.6) * mix(1.0, 0.6, uLight);
  gl_FragColor = vec4(col * a, a);
}
`;

const ARC_VERT = /* glsl */ `
varying float vT;
void main(){
  vT = uv.x;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const ARC_FRAG = /* glsl */ `
uniform float uHead;   // packet position along the route (outside 0..1 = no packet)
uniform float uDir;    // 1: from A to B, -1: the reply, from B to A
uniform float uLife;   // route fade in / fade out
uniform float uLight;
varying float vT;
void main(){
  float t = uDir > 0.0 ? vT : 1.0 - vT;
  float ends = smoothstep(0.0, 0.04, vT) * smoothstep(1.0, 0.96, vT);
  float d = t - uHead;
  float live = step(0.0, uHead) * step(uHead, 1.0);
  float packet = exp(-d * d / 0.0016) * live;
  float tail = d < 0.0 ? exp(d / 0.1) * 0.6 * live : 0.0;
  float a = (0.32 + packet * 1.5 + tail) * ends * uLife;
  vec3 route = mix(vec3(0.63, 0.578, 0.82), vec3(0.838, 0.65, 0.77), vT);
  vec3 col = route * (0.75 + packet) + vec3(1.0) * packet * 0.6;
  gl_FragColor = vec4(col, a * mix(1.0, 0.9, uLight));
}
`;

const STARS_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uScroll;
attribute float aSeed;
attribute float aSize;
varying float vAlpha;
void main(){
  vec3 p = position;
  p.z += uScroll * (2.0 + aSeed * 6.0);      // fly through the stars when scrolling
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  // never smaller than ~2 px: sub-pixel points shimmer as soon as the camera moves.
  // Far stars are drawn dimmer instead of smaller.
  float size = aSize * uPixelRatio * (18.0 / -mv.z) * (1.0 + uScroll * 0.5);
  float minSize = 2.0 * uPixelRatio;
  gl_PointSize = max(size, minSize);
  float faint = clamp(size / minSize, 0.3, 1.0);
  // gentle, slow twinkle (never fully off)
  vAlpha = (0.78 + 0.22 * sin(uTime * (0.25 + aSeed * 0.6) + aSeed * 50.0)) * faint;
}
`;

const STARS_FRAG = /* glsl */ `
uniform float uLight;
uniform float uFade;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.15, d);
  vec3 c = mix(vec3(0.89, 0.88, 0.96), vec3(0.35, 0.25, 0.55), uLight);
  gl_FragColor = vec4(c, a * vAlpha * mix(0.75, 0.5, uLight) * uFade);
}
`;

const R = 1.7;

/* Where the globe sits for each section (world units, camera at z = 7) */
const STATES = {
  Home:       { x: 2.55, y: -0.05, s: 0.9,  tilt: 0.28, arcs: 1.0, proj: 0 },
  AboutMe:    { x: -3.7, y: 0.25,  s: 1.6,  tilt: 0.1,  arcs: 0.8, proj: 0 },
  MySkills:   { x: 0,    y: -3.05, s: 2.7,  tilt: 0.75, arcs: 1.2, proj: 0 },
  WorkAt:     { x: 5.5,  y: 0.05,  s: 1.35, tilt: 0.2,  arcs: 0.9, proj: 0 },
  // the code leaves home and spreads: the globe swings to the far left (an arc along the edge,
  // clear of the text), grows and gets busier
  OpenSource: { x: -7.0, y: -0.2,  s: 2.1,  tilt: 0.4,  arcs: 3.2, proj: 0 },
  Projects:   { x: 2.6,  y: -0.05, s: 1.15, tilt: 0.15, arcs: 1.0, proj: 1 },
  Contact:    { x: 0,    y: -0.45, s: 1.05, tilt: -0.1, arcs: 1.4, proj: 0 },
};

/* On a project page: the globe faces that project next to the title, sinks behind the
   screenshot, then comes back for the "next project" link */
const PAGE_STATES = {
  Home:        { x: 2.7, y: -0.1,  s: 1.15, tilt: 0.15, arcs: 1.2, proj: 1 },
  ProjectShot: { x: 0,   y: -3.2,  s: 2.6,  tilt: 0.7,  arcs: 1.2, proj: 0 },
  ProjectNext: { x: 2.6, y: -0.05, s: 1.1,  tilt: 0.15, arcs: 1.4, proj: 1 },
};

/* 404: the visitor is out in space, the globe is a horizon at the bottom of the screen */
const LOST_STATES = {
  Home: { x: 0, y: -5.7, s: 2.6, tilt: 0.55, arcs: 0.7, proj: 0 },
};
const KEYS = ['x', 'y', 's', 'tilt', 'arcs', 'proj'];

/* each project gets a fixed place on the globe */
const PROJECT_LATS = [0.32, -0.22, 0.5, -0.35, 0.12, 0.42, -0.08];
const PROJECT_DIRS = PROJECTS.map((_, i) => {
  const lon = (i / PROJECTS.length) * Math.PI * 2 + 0.4;
  const lat = PROJECT_LATS[i % PROJECT_LATS.length];
  return { lon, lat, dir: new THREE.Vector3(Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)) };
});

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

function randomOnSphere() {
  const u = Math.random() * 2 - 1;
  const t = Math.random() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  // slight bias toward the side facing the camera
  return new THREE.Vector3(s * Math.cos(t), u, s * Math.sin(t) + 0.45).normalize();
}

const smooth = (t) => t * t * (3 - 2 * t);
const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);

export default function GlobeScene({ project = null }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || navigator.webdriver || !hasWebGL()) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.innerWidth <= 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = 'globe-canvas';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 420);
    camera.position.set(0, 0, 7);

    const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';
    const light = { value: isLight() ? 1 : 0 };
    const time = { value: 0 };
    const pixelRatio = { value: renderer.getPixelRatio() };
    const scroll = { value: 0 };

    /* ── Planet ── */
    const planet = new THREE.Group();
    const globe = new THREE.Group();
    planet.add(globe);
    scene.add(planet);

    const DOTS = isSmall ? 14000 : 26000;
    const dotPos = new Float32Array(DOTS * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      dotPos[i * 3] = Math.cos(th) * r * R;
      dotPos[i * 3 + 1] = y * R;
      dotPos[i * 3 + 2] = Math.sin(th) * r * R;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    const dotUniforms = {
      uTime: time,
      uPixelRatio: pixelRatio,
      uLight: light,
      uCursor: { value: new THREE.Vector3(0, 0, 100) },
      uRipple: { value: 1 },
      uRippleAt: { value: new THREE.Vector3(0, 1, 0) },
    };
    const dots = new THREE.Points(dotGeo, new THREE.ShaderMaterial({
      vertexShader: DOTS_VERT, fragmentShader: DOTS_FRAG, uniforms: dotUniforms, transparent: true, depthWrite: false,
    }));
    globe.add(dots);

    const coreMat = new THREE.MeshBasicMaterial({ color: isLight() ? 0xffffff : 0x050407 });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 64, 64), coreMat));

    const atmoUniforms = { uLight: light, uBoost: { value: 0 } };
    planet.add(new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.14, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: ATMO_VERT, fragmentShader: ATMO_FRAG, uniforms: atmoUniforms,
        side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      })
    ));

    /* ── Network: cities exchanging packets ── */
    const CITY_COUNT = isSmall ? 16 : 26;
    const cities = Array.from({ length: CITY_COUNT }, () => randomOnSphere());
    const cityGeo = new THREE.BufferGeometry().setFromPoints(cities.map((c) => c.clone().multiplyScalar(R * 1.004)));
    const dotTex = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const g = c.getContext('2d');
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.25, 'rgba(230,200,216,0.9)');
      grad.addColorStop(1, 'rgba(230,200,216,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();
    const cityMat = new THREE.PointsMaterial({
      size: 0.18, map: dotTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.85,
    });
    globe.add(new THREE.Points(cityGeo, cityMat));

    const routes = [];
    const makeRoute = (from, to, delay = 0) => {
      const a = from.clone().normalize().multiplyScalar(R);
      const b = to.clone().normalize().multiplyScalar(R);
      const dist = a.distanceTo(b);
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R + dist * 0.38);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const geo = new THREE.TubeGeometry(curve, 72, 0.008, 6, false);
      const uniforms = { uHead: { value: -1 }, uDir: { value: 1 }, uLife: { value: 0 }, uLight: light };
      const mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({
        vertexShader: ARC_VERT, fragmentShader: ARC_FRAG, uniforms,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      }));
      globe.add(mesh);
      return {
        mesh, uniforms,
        age: -delay,
        life: 7 + Math.random() * 7,
        head: -Math.random() * 1.5,
        speed: 0.3 + Math.random() * 0.25,
        dir: Math.random() < 0.5 ? 1 : -1,
      };
    };
    const disposeRoute = (r) => {
      globe.remove(r.mesh);
      r.mesh.geometry.dispose();
      r.mesh.material.dispose();
    };
    const randomRoute = (delay) => {
      let i = Math.floor(Math.random() * CITY_COUNT);
      let j = Math.floor(Math.random() * CITY_COUNT);
      let guard = 0;
      while ((j === i || cities[i].distanceTo(cities[j]) < 0.45) && guard++ < 20) j = Math.floor(Math.random() * CITY_COUNT);
      return makeRoute(cities[i], cities[j], delay);
    };
    /* ── Projects: named points; the active one is turned towards the viewer ── */
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(PROJECT_DIRS.map((p) => p.dir.clone().multiplyScalar(R * 1.006)));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.32, map: dotTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0,
    });
    globe.add(new THREE.Points(nodeGeo, nodeMat));
    const activeGeo = new THREE.BufferGeometry().setFromPoints([PROJECT_DIRS[0].dir.clone().multiplyScalar(R * 1.008)]);
    const activeMat = new THREE.PointsMaterial({
      size: 0.5, map: dotTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0,
    });
    globe.add(new THREE.Points(activeGeo, activeMat));

    const labelLayer = document.createElement('div');
    labelLayer.className = 'globe-labels';
    const labels = PROJECTS.map((p) => {
      const el = document.createElement('span');
      el.className = 'globe-label';
      el.textContent = p.titre;
      labelLayer.appendChild(el);
      return el;
    });
    // label sizes, measured once (and again on resize), never inside the render loop
    let labelSizes = [];
    const measureLabels = () => {
      labelSizes = labels.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));
    };
    mount.appendChild(labelLayer);
    requestAnimationFrame(measureLabels);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureLabels).catch(() => {});
    window.addEventListener('resize', measureLabels);
    let activeProject = typeof project === 'number' ? project : 0;
    let focusLat = PROJECT_DIRS[activeProject].lat;

    const ROUTE_COUNT = isSmall ? 9 : 14;
    for (let i = 0; i < ROUTE_COUNT; i++) {
      const r = randomRoute(0);
      r.age = Math.random() * r.life * 0.6; // start mid-life so the network is already alive
      routes.push(r);
    }

    /* ── Stars ── */
    const STARS = isSmall ? 900 : 2000;
    const sPos = new Float32Array(STARS * 3);
    const sSeed = new Float32Array(STARS);
    const sSize = new Float32Array(STARS);
    for (let i = 0; i < STARS; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 30;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      sPos[i * 3 + 2] = -Math.random() * 25 + 1;
      sSeed[i] = Math.random();
      sSize[i] = 0.5 + Math.pow(Math.random(), 3) * 3;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute('aSeed', new THREE.BufferAttribute(sSeed, 1));
    sGeo.setAttribute('aSize', new THREE.BufferAttribute(sSize, 1));
    const stars = new THREE.Points(sGeo, new THREE.ShaderMaterial({
      vertexShader: STARS_VERT, fragmentShader: STARS_FRAG,
      uniforms: { uTime: time, uPixelRatio: pixelRatio, uScroll: scroll, uLight: light, uFade: { value: 1 } },
      transparent: true, depthWrite: false,
    }));
    scene.add(stars);

    /* ── Easter egg: 8 clicks on the Earth in the hero, and you are lost in the galaxy ── */
    const galaxy = createGalaxy(pixelRatio, isSmall);
    scene.add(galaxy.root);
    const GALAXY_STATE = { x: 0, y: 0, s: 0.95, tilt: 0.25, arcs: 1.6, proj: 0 };
    let galaxyOn = false;
    // both trips are timed, so the speed (and the warp streaks) peak half way
    const GALAXY_ENTER_S = 4.2;
    const GALAXY_RETURN_S = 3.6;
    let prevGz = 0;
    let warpW = 0;
    const warp = createWarp(isSmall);
    camera.add(warp.object);
    const flyby = createFlyby(isSmall, pixelRatio);
    camera.add(flyby.object);

    /* friends' planets: click one and the same jump takes you to their site */
    const FRIEND_S = 3.6;
    const friends = FRIENDS.map((f) => {
      const p = createFriendPlanet(f, isSmall, pixelRatio);
      galaxy.disc.add(p.object);
      return { ...f, p, label: null };
    });
    let trip = null; // { friend, t, fromPos, fromLook, navigated }
    let veil = null;
    const friendWorld = new THREE.Vector3();
    const tripPos = new THREE.Vector3();
    const tripLook = new THREE.Vector3();
    const tripDir = new THREE.Vector3();
    const paperOf = (f) => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? f.paper.dark : f.paper.light);
    const warpUrl = (f) => {
      const u = new URL(f.url);
      u.searchParams.set(WARP_PARAM, WARP_FROM);
      return u.toString();
    };
    const flyToFriend = (f) => {
      if (trip || !galaxyOn) return;
      trackEvent('friend-warp', { friend: f.id });
      if (reduceMotion) { window.location.href = warpUrl(f); return; }
      trip = { friend: f, t: 0, fromPos: camera.position.clone(), fromLook: new THREE.Vector3(), navigated: false };
      camera.getWorldDirection(trip.fromLook).multiplyScalar(60).add(camera.position);
      if (eggLayer) eggLayer.classList.add('is-leaving');
      veil = document.createElement('div');
      veil.className = 'friend-veil';
      veil.style.background = paperOf(f);
      document.body.appendChild(veil);
    };
    // back from the friend's site (back/forward cache): drop the finished trip, stay in the galaxy
    const onPageShow = (e) => {
      if (!e.persisted || !trip) return;
      trip = null;
      if (veil) { veil.remove(); veil = null; }
      if (eggLayer) eggLayer.classList.remove('is-leaving');
    };
    window.addEventListener('pageshow', onPageShow);
    scene.add(camera);
    let galaxyT = 0;
    let uniYaw = 0;
    let uniPitch = 0.12;
    let eggClicks = [];
    let eggLayer = null;
    const EGG_TEXT = {
      fr: { kicker: 'Easter egg trouvé', title: 'Bien joué.', muted: 'Te voilà perdu dans la galaxie.', text: 'Le petit point, c’est la Terre. Attrape la galaxie pour la faire tourner, puis clique sur la Terre pour rentrer.', back: 'Revenir sur Terre', here: 'Vous êtes ici' },
      en: { kicker: 'Easter egg found', title: 'Well played.', muted: 'You are now lost in the galaxy.', text: 'That little dot is the Earth. Grab the galaxy to spin it, then click the Earth to head home.', back: 'Back to Earth', here: 'You are here' },
    };
    const leaveGalaxy = () => {
      if (!galaxyOn || trip) return;
      galaxyOn = false;
      // the page comes back only once the trip home is almost over (see the loop)
      if (eggLayer) eggLayer.classList.remove('is-on');
    };
    const enterGalaxy = () => {
      if (galaxyOn) return;
      galaxyOn = true;
      eggClicks = [];
      const L = EGG_TEXT[document.documentElement.lang === 'en' ? 'en' : 'fr'];
      if (!eggLayer) {
        eggLayer = document.createElement('div');
        eggLayer.className = 'galaxy-egg';
        eggLayer.setAttribute('role', 'dialog');
        eggLayer.setAttribute('aria-live', 'polite');
        document.body.appendChild(eggLayer);
      }
      eggLayer.innerHTML = '';
      const card = document.createElement('div');
      card.className = 'galaxy-egg-card';
      const kicker = document.createElement('p');
      kicker.className = 'galaxy-egg-kicker';
      kicker.textContent = L.kicker;
      const title = document.createElement('p');
      title.className = 'galaxy-egg-title';
      title.append(`${L.title} `);
      const muted = document.createElement('span');
      muted.className = 'section-muted';
      muted.textContent = L.muted;
      title.append(muted);
      const text = document.createElement('p');
      text.className = 'galaxy-egg-text';
      text.textContent = L.text;
      const back = document.createElement('button');
      back.type = 'button';
      back.className = 'btn btn--primary btn--lg';
      back.textContent = L.back;
      back.addEventListener('click', leaveGalaxy);
      card.append(kicker, title, text, back);
      const here = document.createElement('span');
      here.className = 'galaxy-here';
      here.textContent = L.here;
      eggLayer.append(here, card);
      friends.forEach((f) => {
        const a = document.createElement('a');
        a.className = 'galaxy-friend';
        a.style.setProperty('--friend', `rgb(${f.planet.map((c) => Math.round(c * 255)).join(' ')})`);
        a.href = warpUrl(f);
        a.textContent = f.name;
        const pulse = document.createElement('span');
        pulse.className = 'galaxy-pulse';
        pulse.setAttribute('aria-hidden', 'true');
        a.prepend(pulse);
        a.addEventListener('click', (ev) => {
          if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
          ev.preventDefault();
          flyToFriend(f);
        });
        eggLayer.append(a);
        f.label = a;
      });
      document.documentElement.classList.add('galaxy-mode');
      // the card shows up once we drop out of the jump (see the loop)
      trackEvent('easter-egg-galaxy');
    };
    const onKey = (e) => { if (e.key === 'Escape') leaveGalaxy(); };
    window.addEventListener('keydown', onKey);
    // where the Earth is on screen while lost in the galaxy (it is only a dot, so the target is generous)
    const earthOnScreen = { x: -1e4, y: -1e4 };
    // what sits under the pointer in the galaxy: the Earth, a friend's planet, or nothing
    // (they are small on screen, so the targets are generous)
    const galaxyTargetAt = (x, y) => {
      if (!galaxyOn || trip || galaxyT < 0.9) return null;
      let best = null;
      let bestD = 46;
      const dE = Math.hypot(x - earthOnScreen.x, y - earthOnScreen.y);
      if (dE < bestD) { best = 'earth'; bestD = dE; }
      friends.forEach((f) => {
        if (!f.onScreen) return;
        const d = Math.hypot(x - f.sx, y - f.sy);
        if (d < bestD) { best = f; bestD = d; }
      });
      return best;
    };

    /* ── Theme ── */
    const themeObserver = new MutationObserver(() => {
      light.value = isLight() ? 1 : 0;
      coreMat.color.set(light.value ? 0xffffff : 0x050407);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    /* ── Layout ── */
    let narrow = false;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      narrow = camera.aspect < 0.9;
      camera.fov = narrow ? 60 : 40;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Scroll choreography: interpolate between section anchors ── */
    // null on the home page, the project's index on a project page, 'lost' on the 404
    let page = project;
    const table = () => (page == null ? STATES : page === 'lost' ? LOST_STATES : PAGE_STATES);
    const target = { ...table().Home };
    const cur = { ...table().Home };
    let anchors = [];
    const measure = () => {
      const vh = window.innerHeight || 800;
      anchors = Object.keys(table()).map((id) => {
        // project pages: hold the first position while the title is on screen
        if (id === 'Home') return { id, y: page == null ? 0 : vh * 0.5 };
        const el = document.getElementById(id);
        if (!el) return null;
        // a full-screen section is "reached" when its centre is in the middle of the viewport
        const full = el.closest('.home-section--full');
        if (full) {
          const r = full.getBoundingClientRect();
          return { id, y: r.top + window.scrollY + r.height / 2 };
        }
        return { id, y: el.getBoundingClientRect().top + window.scrollY + vh * 0.3 };
      }).filter(Boolean);
      // the pinned Projects section: hold the "Projects" position for its whole scroll
      const box = page == null && document.querySelector('.projects-scroll');
      const pi = anchors.findIndex((a) => a.id === 'Projects');
      if (box && pi >= 0) {
        const r = box.getBoundingClientRect();
        const top = r.top + window.scrollY;
        const start = top + vh * 0.5;
        const end = top + r.height - vh * 0.5;
        if (end > start) anchors.splice(pi, 1, { id: 'Projects', y: start }, { id: 'Projects', y: end });
      }
    };
    const stateFor = (id) => {
      const s = table()[id];
      if (!narrow) return s;
      // phones: keep the globe centred, behind the content
      return { ...s, x: s.x * 0.12, y: id === 'Home' ? -4.2 : s.y, s: id === 'Home' ? 1.25 : s.s * 0.8 };
    };
    const computeTarget = () => {
      const vh = window.innerHeight || 800;
      const y = window.scrollY + vh * 0.5;
      let i = 0;
      while (i < anchors.length - 1 && anchors[i + 1].y <= y) i++;
      const a = anchors[i];
      const b = anchors[i + 1];
      const sa = stateFor(a.id);
      if (!b) {
        KEYS.forEach((k) => { target[k] = sa[k]; });
        return;
      }
      const sb = stateFor(b.id);
      const f = smooth(Math.max(0, Math.min(1, (y - a.y) / Math.max(b.y - a.y, 1))));
      KEYS.forEach((k) => { target[k] = sa[k] + (sb[k] - sa[k]) * f; });
    };

    let lastScroll = window.scrollY;
    let velocity = 0;
    const onScroll = () => {
      const vh = window.innerHeight || 800;
      document.documentElement.style.setProperty('--hero-progress', Math.min(window.scrollY / vh, 1).toFixed(4));
      computeTarget();
    };
    measure();
    onScroll();
    const ro = new ResizeObserver(() => { measure(); computeTarget(); });
    ro.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Input ── */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const sphere = new THREE.Sphere(new THREE.Vector3(), R);
    const hit = new THREE.Vector3();
    const local = new THREE.Vector3();
    const inv = new THREE.Matrix4();

    const cursorOnGlobe = () => {
      ndc.set(pointer.tx, pointer.ty);
      raycaster.setFromCamera(ndc, camera);
      globe.updateWorldMatrix(true, false);
      sphere.center.setFromMatrixPosition(globe.matrixWorld);
      sphere.radius = R * planet.scale.x;
      if (!raycaster.ray.intersectSphere(sphere, hit)) return null;
      inv.copy(globe.matrixWorld).invert();
      return local.copy(hit).applyMatrix4(inv);
    };

    const BLOCKERS = 'a, button, input, textarea, .bento-card, .Card, .os-card, .language-box, nav, footer, .galaxy-egg-card';
    const onMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.active = !(e.target instanceof Element && e.target.closest(BLOCKERS));
    };
    const onLeave = () => { pointer.active = false; };
    /* grab the globe to spin it (with inertia); a simple click sends packets from there */
    const root = document.documentElement;
    const drag = { on: false, x: 0, y: 0, moved: 0, from: null, vx: 0, vy: 0 };
    let userTilt = 0;
    let grabbable = false;
    const sendFrom = (from) => {
      for (let i = 0; i < 2; i++) {
        const old = routes.shift();
        if (old) disposeRoute(old);
        const r = makeRoute(from, cities[Math.floor(Math.random() * CITY_COUNT)], 0);
        r.head = 0;
        r.dir = 1;
        routes.push(r);
      }
    };
    const onDown = (e) => {
      if (e.button !== 0 || trip) return;
      if (e.target instanceof Element && e.target.closest(BLOCKERS)) return;
      onMove(e);
      const p = cursorOnGlobe();
      // in the galaxy, the whole universe can be grabbed
      if (!p && !galaxyOn) return;
      Object.assign(drag, { on: true, x: e.clientX, y: e.clientY, moved: 0, from: p ? p.clone().normalize() : null, vx: 0, vy: 0 });
      root.classList.add('globe-dragging');
      const sel = window.getSelection && window.getSelection();
      if (sel) sel.removeAllRanges();
    };
    const onDrag = (e) => {
      if (!drag.on) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      // once per page view: does anyone actually play with the globe, and where?
      if (!grabTracked && drag.moved > 6 && !galaxyOn) {
        grabTracked = true;
        trackEvent('globe-grab', { section: currentSection() });
      }
      // a bigger globe turns less per pixel, so the surface follows the cursor
      const k = 0.0055 / Math.max(planet.scale.x, 0.6);
      spin += dx * k;
      userTilt = Math.max(-0.9, Math.min(0.9, userTilt + dy * k));
      drag.vx += (dx * k - drag.vx) * 0.5;
      drag.vy += (dy * k - drag.vy) * 0.5;
      if (galaxyOn) {
        uniYaw += dx * 0.004;
        uniPitch = Math.max(-0.7, Math.min(0.9, uniPitch + dy * 0.003));
      }
    };
    /* project points are clickable: they unfold the matching project in the list */
    const hits = PROJECTS.map(() => ({ px: 0, py: 0, lx: 0, ly: 0, w: 0, h: 0, on: false }));
    const pickAt = (x, y) => {
      let best = -1;
      let bestD = 26;
      hits.forEach((h, i) => {
        if (!h.on) return;
        const onLabel = x >= h.lx - 6 && x <= h.lx + h.w + 6 && y >= h.ly - 6 && y <= h.ly + h.h + 6;
        const d = onLabel ? 0 : Math.hypot(x - h.px, y - h.py);
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    };
    let grabTracked = false;
    const currentSection = () => {
      if (page === 'lost') return '404';
      if (typeof page === 'number') return 'project';
      const y = window.scrollY + (window.innerHeight || 800) * 0.5;
      let id = 'Home';
      anchors.forEach((a) => { if (a.y <= y) id = a.id; });
      return id;
    };
    let pickDown = -1;
    let pickHover = -1;
    const pickStart = { x: 0, y: 0 };
    const onPickDown = (e) => {
      pickDown = -1;
      if (galaxyOn || e.button !== 0) return;
      if (e.target instanceof Element && e.target.closest(BLOCKERS)) return;
      pickDown = pickAt(e.clientX, e.clientY);
      if (pickDown >= 0) Object.assign(pickStart, { x: e.clientX, y: e.clientY });
    };
    const onPickUp = (e) => {
      if (pickDown < 0) return;
      const i = pickDown;
      pickDown = -1;
      if (Math.hypot(e.clientX - pickStart.x, e.clientY - pickStart.y) > 6) return;
      if (pickAt(e.clientX, e.clientY) !== i) return;
      window.dispatchEvent(new CustomEvent(PICK_EVENT, { detail: i }));
    };
    const onUp = () => {
      if (!drag.on) return;
      drag.on = false;
      root.classList.remove('globe-dragging');
      if (drag.moved < 6) {
        drag.vx = 0;
        drag.vy = 0;
        if (drag.from) sendFrom(drag.from);
        // in the galaxy, one click on the Earth brings you home, one on a friend's planet flies there
        const target = galaxyTargetAt(drag.x, drag.y);
        if (target === 'earth') {
          trackEvent('easter-egg-home', { via: 'earth' });
          leaveGalaxy();
          return;
        }
        if (target) { flyToFriend(target); return; }
        // 8 clicks on the Earth in the hero, within a few seconds
        if (drag.from && !galaxyOn && page == null && window.scrollY < window.innerHeight * 0.5) {
          const now = performance.now();
          eggClicks = eggClicks.filter((t) => now - t < 5000);
          eggClicks.push(now);
          if (eggClicks.length >= 8) enterGalaxy();
        }
      }
    };
    const onProject = (e) => {
      const i = Number(e.detail);
      if (!Number.isInteger(i) || !PROJECT_DIRS[i] || i === activeProject) return;
      activeProject = i;
      activeGeo.setFromPoints([PROJECT_DIRS[i].dir.clone().multiplyScalar(R * 1.008)]);
      labels.forEach((el, k) => el.classList.toggle('is-active', k === i));
      // the active label grows: sizes change, so measure again once it has re-rendered
      requestAnimationFrame(measureLabels);
      // the project "talks" to the rest of the world
      for (let k = 0; k < 2; k++) {
        const old = routes.shift();
        if (old) disposeRoute(old);
        const r = makeRoute(PROJECT_DIRS[i].dir, cities[Math.floor(Math.random() * CITY_COUNT)], 0);
        r.head = 0;
        r.dir = 1;
        routes.push(r);
      }
    };
    labels[activeProject].classList.add('is-active');
    // the globe stays alive across pages: a route change only moves it and turns it
    const onPage = (e) => {
      page = e.detail ?? null;
      grabTracked = false;
      if (typeof page === 'number') onProject({ detail: page });
      measure();
      computeTarget();
    };
    window.addEventListener(PROJECT_EVENT, onProject);
    window.addEventListener(PAGE_EVENT, onPage);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onPickDown, { passive: true });
    window.addEventListener('pointerup', onPickUp);
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointermove', onDrag, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('blur', onUp);

    /* ── Loop ── */
    const labelVec = new THREE.Vector3();
    const lookVec = new THREE.Vector3();
    const hereVec = new THREE.Vector3();
    const normalVec = new THREE.Vector3();
    const camVec = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = null;
    let intro = 0;
    let elapsed = 0;
    let spin = 0;
    const timeScale = reduceMotion ? 0.2 : 1;
    // how fast the globe catches up with its target, per second (frame-rate independent)
    const FOLLOW = 2.0;
    const TURN = 2.4;

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt * timeScale;
      // gentle entrance: ease in and out over ~3 s instead of shooting in
      intro = Math.min(intro + dt * 0.33, 1);
      const introEase = intro < 0.5 ? 4 * intro * intro * intro : 1 - Math.pow(-2 * intro + 2, 3) / 2;
      const ease = reduceMotion ? 1 : 1 - Math.exp(-FOLLOW * dt);
      const turn = reduceMotion ? 1 : 1 - Math.exp(-TURN * dt);

      const sy = window.scrollY;
      velocity += ((sy - lastScroll) - velocity) * 0.1;
      lastScroll = sy;
      scroll.value += (Math.min(Math.abs(velocity) / 40, 1) - scroll.value) * 0.1;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      KEYS.forEach((k) => { cur[k] += ((galaxyOn ? GALAXY_STATE[k] : target[k]) - cur[k]) * ease; });
      // the trips out and home are steady in time, eased by smootherstep: slow start, a jump, a soft arrival
      const tripS = galaxyOn ? GALAXY_ENTER_S : GALAXY_RETURN_S;
      if (reduceMotion) galaxyT = galaxyOn ? 1 : 0;
      else galaxyT = Math.min(1, Math.max(0, galaxyT + (galaxyOn ? dt : -dt) / tripS));
      if (!galaxyOn && galaxyT < 0.08) document.documentElement.classList.remove('galaxy-mode');
      const gt = galaxyT;
      const gz = gt * gt * gt * (gt * (gt * 6 - 15) + 10);

      // warp intensity follows the speed of the trip (smootherstep peaks at 1.875 / duration)
      const gSpeed = dt > 0 ? Math.abs(gz - prevGz) / dt : 0;
      prevGz = gz;
      let wTarget = reduceMotion ? 0 : Math.pow(Math.min(1, (gSpeed * tripS) / 1.875), 1.6);
      // the trip to a friend's planet: steady in time, eased, with the same jump
      let fz = 0;
      if (trip) {
        const prevFz = smoother(trip.t);
        trip.t = Math.min(1, trip.t + dt / FRIEND_S);
        fz = smoother(trip.t);
        const fSpeed = dt > 0 ? (fz - prevFz) / dt : 0;
        // the streaks die down just before touching down, the surface takes over
        wTarget = Math.max(wTarget, Math.pow(Math.min(1, (fSpeed * FRIEND_S) / 1.875), 1.6) * (1 - smooth(Math.max(0, (trip.t - 0.8) / 0.2))));
      }
      warpW += (wTarget - warpW) * (1 - Math.exp(-dt * 10));
      warp.update(dt, warpW, galaxyOn && !trip ? -1 : 1);
      // planets met on the way, only while actually travelling
      const travelling = !reduceMotion && galaxyT > 0.001 && galaxyT < 0.999;
      if (trip) flyby.update(dt, Math.min(fz * 1.15, 1), trip.t < 0.85, 1);
      else flyby.update(dt, galaxyOn ? gz : 1 - gz, travelling, galaxyOn ? -1 : 1);

      // easter egg: the camera backs out of the Earth, through the arm, then rises above the galaxy;
      // on the way it swings wide along the arm and banks, like a ship taking a turn
      const rise = gz * gz;
      const arc = Math.sin(Math.PI * gz);
      camera.position.x = pointer.x * (0.35 + gz * 4) + arc * 16;
      camera.position.y = pointer.y * (0.2 + gz * 3) + rise * 92 + arc * 4;
      camera.position.z = 7 + gz * 40 + arc * 10;
      if (gz > 0.001) {
        // look towards the galaxy's centre, so the Earth ends up off to one side
        galaxy.disc.getWorldPosition(lookVec);
        camera.lookAt(lookVec.multiplyScalar(rise * 0.55));
        camera.rotateZ(arc * arc * 0.32 * (galaxyOn ? 1 : -1));
      } else {
        camera.lookAt(0, 0, 0);
      }
      if (trip) {
        // from where we were, swing towards the friend's planet and dive until its surface fills the view
        const f = trip.friend;
        f.p.object.getWorldPosition(friendWorld);
        const radius = f.p.radius;
        tripDir.copy(trip.fromPos).sub(friendWorld).normalize();
        tripPos.copy(friendWorld).addScaledVector(tripDir, radius * 1.15);
        const swing = Math.sin(Math.PI * fz);
        camera.position.copy(trip.fromPos).lerp(tripPos, fz);
        camera.position.y += swing * 10;
        camera.position.x += swing * 6;
        tripLook.copy(trip.fromLook).lerp(friendWorld, smooth(Math.min(1, trip.t * 2.2)));
        camera.lookAt(tripLook);
        camera.rotateZ(swing * swing * 0.28);
        // the last moments: the page fades to the friend's own background, then we land there
        const v = smooth(Math.max(0, (trip.t - 0.84) / 0.16));
        if (veil) veil.style.opacity = String(v);
        if (trip.t >= 1 && !trip.navigated) {
          trip.navigated = true;
          window.location.href = warpUrl(f);
        }
      }
      // the view widens with the speed, then snaps back when we drop out of the jump
      const baseFov = narrow ? 60 : 40;
      const fov = baseFov + warpW * 32;
      if (Math.abs(camera.fov - fov) > 0.01) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }

      planet.position.set(cur.x, cur.y - (1 - introEase) * 0.35, 0);
      planet.scale.setScalar(cur.s * (0.82 + 0.18 * introEase));
      planet.rotation.z = -velocity * 0.002;

      // free spin, sped up by scrolling; in "Projects" the globe turns to the active project
      const pw = smooth(Math.min(1, Math.max(0, cur.proj)));
      const ap = PROJECT_DIRS[activeProject];
      // the globe sits off-centre, so "facing us" means facing the camera, not +z
      const camAngle = Math.atan2(planet.position.x - camera.position.x, camera.position.z - planet.position.z);
      const focusYaw = -ap.lon - camAngle - 0.45;
      const nearestYaw = focusYaw + Math.PI * 2 * Math.round((spin - focusYaw) / (Math.PI * 2));
      // after a throw the globe keeps turning, slows down, and slowly levels out again
      if (!drag.on) {
        spin += drag.vx;
        userTilt += drag.vy;
        drag.vx *= 0.95;
        drag.vy *= 0.9;
        userTilt = Math.max(-0.9, Math.min(0.9, userTilt * 0.985));
      }
      // on the projects, the globe comes back to the active project once the throw has slowed
      const settle = drag.on ? 0 : 1 - Math.min(Math.abs(drag.vx) * 25, 1);
      spin += dt * timeScale * (0.07 + Math.min(Math.abs(velocity) * 0.01, 0.8)) * (1 - pw)
        + (nearestYaw - spin) * turn * pw * settle;
      globe.rotation.y = spin + pointer.x * 0.15 * (1 - pw);
      focusLat += (ap.lat - focusLat) * turn;
      planet.rotation.x = cur.tilt + (focusLat - cur.tilt) * pw + userTilt;

      const p = pointer.active ? cursorOnGlobe() : null;
      if (!!p !== grabbable) {
        grabbable = !!p;
        root.classList.toggle('globe-grab', grabbable);
      }
      dotUniforms.uCursor.value.lerp(p || new THREE.Vector3(0, 0, 100), p ? 0.25 : 1);

      // routes fade in, carry packets back and forth, then hand over to a new pair of cities
      for (let i = 0; i < routes.length; i++) {
        const r = routes[i];
        r.age += dt * timeScale;
        const fadeIn = smooth(Math.min(1, Math.max(0, r.age)));
        const fadeOut = smooth(Math.min(1, Math.max(0, r.life - r.age)));
        r.uniforms.uLife.value = fadeIn * fadeOut;
        r.head += dt * timeScale * r.speed * cur.arcs;
        if (r.head > 1.2) {
          r.head = -0.3 - Math.random() * 0.8; // short pause, then the reply goes back
          r.dir *= -1;
        }
        r.uniforms.uHead.value = r.head;
        r.uniforms.uDir.value = r.dir;
        if (r.age > r.life) {
          disposeRoute(r);
          routes[i] = randomRoute(Math.random() * 0.5);
        }
      }
      cityMat.opacity = 0.65 + Math.sin(elapsed * 1.5) * 0.15;

      // project points + labels
      nodeMat.opacity = pw * 0.9;
      activeMat.opacity = pw * (0.75 + Math.sin(elapsed * 2) * 0.1);
      activeMat.size = 0.5 + Math.sin(elapsed * 2) * 0.04;
      labelLayer.style.opacity = String(pw);
      if (pw > 0.02) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const EDGE = 16;
        for (let i = 0; i < labels.length; i++) {
          labelVec.copy(PROJECT_DIRS[i].dir).multiplyScalar(R * 1.01);
          globe.localToWorld(labelVec);
          const facing = normalVec.copy(labelVec).sub(planet.position).normalize()
            .dot(camVec.copy(camera.position).sub(labelVec).normalize());
          labelVec.project(camera);
          const px = (labelVec.x * 0.5 + 0.5) * vw;
          const py = (-labelVec.y * 0.5 + 0.5) * vh;
          const visible = facing > 0.1;

          const size = labelSizes[i] || { w: 120, h: 30 };
          let lx = px + 16;
          if (lx + size.w > vw - EDGE) lx = px - 16 - size.w;
          lx = Math.max(EDGE, lx);
          const ly = Math.max(EDGE, Math.min(py - size.h / 2, vh - EDGE - size.h));
          labels[i].style.transform = `translate3d(${lx.toFixed(1)}px, ${ly.toFixed(1)}px, 0)`;
          labels[i].style.opacity = visible ? (i === activeProject || i === pickHover ? '1' : '0.75') : '0';
          Object.assign(hits[i], { px, py, lx, ly, w: size.w, h: size.h, on: visible && pw > 0.5 });
        }
      } else {
        hits.forEach((h) => { h.on = false; });
      }
      // hovering a project point: hand cursor and a brighter name
      const hover = pointer.active && !drag.on
        ? pickAt((pointer.tx * 0.5 + 0.5) * window.innerWidth, (-pointer.ty * 0.5 + 0.5) * window.innerHeight)
        : -1;
      if (hover !== pickHover) {
        if (pickHover >= 0) labels[pickHover].classList.remove('is-hover');
        pickHover = hover;
        if (pickHover >= 0) labels[pickHover].classList.add('is-hover');
        root.classList.toggle('globe-pick', pickHover >= 0);
      }

      // in the galaxy, the Earth and the friends' planets take the hand cursor
      const galaxyHover = galaxyOn && pointer.active && !drag.on
        ? galaxyTargetAt((pointer.tx * 0.5 + 0.5) * window.innerWidth, (-pointer.ty * 0.5 + 0.5) * window.innerHeight)
        : null;
      root.classList.toggle('galaxy-pick', !!galaxyHover);

      // stars only drift slowly with the page; the camera parallax is enough for the mouse
      stars.rotation.y = sy * 0.00005;
      stars.material.uniforms.uFade.value = 1 - gz;
      if (galaxyOn && !drag.on) {
        uniYaw += drag.vx * 0.7 + dt * 0.02;
        uniPitch = Math.max(-0.7, Math.min(0.9, uniPitch + drag.vy * 0.5));
      }
      galaxy.root.rotation.set(uniPitch, uniYaw, 0);
      galaxy.update(dt * timeScale, gz);
      if (galaxyOn && gz > 0.86 && eggLayer && !eggLayer.classList.contains('is-on')) {
        eggLayer.classList.add('is-on');
        const back = eggLayer.querySelector('button');
        // keyboard users land on the button, without the focus ring showing up for mouse users
        if (back) back.focus({ preventScroll: true, focusVisible: false });
      }
      if (eggLayer && gz > 0.01) {
        const here = eggLayer.querySelector('.galaxy-here');
        if (here) {
          hereVec.copy(planet.position).project(camera);
          const hx = (hereVec.x * 0.5 + 0.5) * window.innerWidth;
          const hy = (-hereVec.y * 0.5 + 0.5) * window.innerHeight;
          earthOnScreen.x = hx;
          earthOnScreen.y = hy;
          here.style.transform = `translate3d(${hx.toFixed(1)}px, ${hy.toFixed(1)}px, 0)`;
          here.style.opacity = String(Math.max(0, (gz - 0.7) / 0.3));
        }
      }
      friends.forEach((f) => {
        f.p.update(dt * timeScale, gz);
        if (!f.label || !eggLayer) return;
        f.p.object.getWorldPosition(friendWorld);
        hereVec.copy(friendWorld).project(camera);
        const fx = (hereVec.x * 0.5 + 0.5) * window.innerWidth;
        const fy = (-hereVec.y * 0.5 + 0.5) * window.innerHeight;
        const inView = hereVec.z < 1 && Math.abs(hereVec.x) < 0.92 && Math.abs(hereVec.y) < 0.9;
        f.sx = fx;
        f.sy = fy;
        f.onScreen = inView;
        f.label.style.transform = `translate3d(${fx.toFixed(1)}px, ${fy.toFixed(1)}px, 0)`;
        f.label.style.opacity = String(inView && !trip ? Math.max(0, (gz - 0.75) / 0.25) : 0);
        f.label.style.pointerEvents = inView && !trip && gz > 0.9 ? 'auto' : 'none';
      });
      if (!galaxyOn && galaxyT < 0.01 && eggLayer) {
        eggLayer.remove();
        eggLayer = null;
      }

      time.value = elapsed;
      renderer.render(scene, camera);
      raf = document.hidden ? null : requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (!raf && !document.hidden) {
        clock.getDelta();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    onVis();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener(PROJECT_EVENT, onProject);
      window.removeEventListener(PAGE_EVENT, onPage);
      labelLayer.remove();
      window.removeEventListener('resize', measureLabels);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerdown', onPickDown);
      window.removeEventListener('pointerup', onPickUp);
      window.removeEventListener('pointermove', onDrag);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('blur', onUp);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pageshow', onPageShow);
      friends.forEach((f) => f.p.dispose());
      if (veil) veil.remove();
      warp.dispose();
      flyby.dispose();
      document.documentElement.classList.remove('galaxy-mode');
      if (eggLayer) eggLayer.remove();
      galaxy.dispose();
      root.classList.remove('globe-dragging', 'globe-grab', 'globe-pick', 'galaxy-pick');
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      dotTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
    // mounted once: later page changes go through PAGE_EVENT
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(PAGE_EVENT, { detail: project }));
  }, [project]);

  return (
    <div ref={mountRef} className="globe-scene" aria-hidden="true" />
  );
}
