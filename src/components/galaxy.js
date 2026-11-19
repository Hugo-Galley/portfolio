import * as THREE from 'three';

/*
 * Easter egg scenery: a spiral galaxy, with the Earth (at the origin) lost in one of its arms.
 * The camera pulls back out of the Earth, through the arm's stars, and rises above the disc.
 * Everything fades with `g` (0..1).
 */

const POINTS_VERT = /* glsl */ `
uniform float uPixelRatio;
uniform float uScale;
attribute float aSize;
attribute vec3 aColor;
varying vec3 vColor;
varying float vNear;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(aSize * uPixelRatio * (uScale / -mv.z), 1.2 * uPixelRatio, 14.0 * uPixelRatio);
  vColor = aColor;
  // stars that brush past the camera fade instead of blowing up
  vNear = smoothstep(0.6, 4.0, -mv.z);
}
`;
const POINTS_FRAG = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vNear;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  gl_FragColor = vec4(vColor * a, a * uOpacity * vNear);
}
`;

const gauss = () => {
  const u = Math.random() || 1e-6;
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

function pointCloud(count, fill, pixelRatio, scale, blending = THREE.AdditiveBlending) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const size = new Float32Array(count);
  for (let i = 0; i < count; i++) fill(i, pos, col, size);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  const uniforms = { uPixelRatio: pixelRatio, uScale: { value: scale }, uOpacity: { value: 0 } };
  const mat = new THREE.ShaderMaterial({
    vertexShader: POINTS_VERT, fragmentShader: POINTS_FRAG, uniforms,
    transparent: true, depthWrite: false, blending,
  });
  return { points: new THREE.Points(geo, mat), uniforms };
}

/* galaxy shape */
export const GALAXY_RADIUS = 60;
const WIND = 0.11; // radians of arm rotation per unit of radius
const armAngle = (arm, r) => arm * Math.PI + r * WIND;
// the Earth sits in arm 0, a bit more than half way out (like the Sun in the Milky Way)
const EARTH_R = 34;
const EARTH_A = armAngle(0, EARTH_R);

const BULGE = new THREE.Color(1.0, 0.86, 0.66);
const INNER = new THREE.Color(1.0, 0.93, 0.85);
const ARM = new THREE.Color(0.66, 0.62, 1.0);
const NEBULA = new THREE.Color(1.0, 0.45, 0.7);
const HAZE = new THREE.Color(0.55, 0.5, 0.8);
const tmp = new THREE.Color();

export default function createGalaxy(pixelRatio, isSmall) {
  const root = new THREE.Group();
  root.visible = false;
  const fades = [];

  // the galaxy centre is placed so that the Earth (origin) falls inside arm 0
  const disc = new THREE.Group();
  disc.position.set(-Math.cos(EARTH_A) * EARTH_R, 0, -Math.sin(EARTH_A) * EARTH_R);
  root.add(disc);

  const N = isSmall ? 22000 : 46000;
  const stars = pointCloud(N, (i, pos, col, size) => {
    const kind = Math.random();
    let x;
    let y;
    let z;
    let c;
    let s;
    if (kind < 0.07) {
      // bulge: dense, warm, slightly flattened
      const r = Math.abs(gauss()) * 3.2;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      x = r * Math.sin(ph) * Math.cos(th);
      y = r * Math.cos(ph) * 0.35;
      z = r * Math.sin(ph) * Math.sin(th);
      c = tmp.copy(BULGE).lerp(INNER, Math.min(r / 8, 1));
      s = 2 + Math.random() * 2;
    } else if (kind < 0.86) {
      // two main arms (plus a faint offset pair), logarithmic-looking spiral
      const arm = Math.random() < 0.8 ? (Math.random() < 0.5 ? 0 : 1) : (Math.random() < 0.5 ? 0.5 : 1.5);
      const t = Math.pow(Math.random(), 0.85);
      const r = 4 + t * (GALAXY_RADIUS - 4);
      const a = armAngle(arm, r) + gauss() * (0.13 + 0.12 * (1 - t));
      const rr = r + gauss() * 1.1;
      x = Math.cos(a) * rr;
      z = Math.sin(a) * rr;
      y = gauss() * (0.45 + 0.4 * (1 - t));
      const nebula = Math.random() < 0.07;
      c = nebula ? tmp.copy(NEBULA) : tmp.copy(INNER).lerp(ARM, Math.min(t * 1.6, 1));
      s = nebula ? 5 + Math.random() * 4 : 2.2 + Math.pow(Math.random(), 5) * 5;
    } else {
      // faint disc haze between the arms
      const r = -Math.log(1 - Math.random() * 0.98) * 16;
      const a = Math.random() * Math.PI * 2;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
      y = gauss() * 0.9;
      c = tmp.copy(HAZE);
      s = 1 + Math.random();
    }
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
    const b = kind >= 0.86 ? 0.3 + Math.random() * 0.15 : 0.7 + Math.random() * 0.3;
    col[i * 3] = c.r * b;
    col[i * 3 + 1] = c.g * b;
    col[i * 3 + 2] = c.b * b;
    size[i] = s;
  }, pixelRatio, 90);
  disc.add(stars.points);
  fades.push((g) => { stars.uniforms.uOpacity.value = g; });

  // a soft glow over the core
  const glowTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,230,200,0.9)');
    grad.addColorStop(0.3, 'rgba(255,200,170,0.35)');
    grad.addColorStop(1, 'rgba(255,200,170,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const glowMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
  const glow = new THREE.Sprite(glowMat);
  glow.scale.set(16, 16, 1);
  disc.add(glow);
  fades.push((g) => { glowMat.opacity = g * 0.6; });

  // a shell of distant stars all around
  const shell = pointCloud(isSmall ? 1200 : 2500, (i, pos, col, size) => {
    const u = Math.random() * 2 - 1;
    const th = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const r = 150 + Math.random() * 60;
    pos[i * 3] = s * Math.cos(th) * r;
    pos[i * 3 + 1] = u * r;
    pos[i * 3 + 2] = s * Math.sin(th) * r;
    const w = 0.5 + Math.random() * 0.4;
    col[i * 3] = w;
    col[i * 3 + 1] = w;
    col[i * 3 + 2] = w * 1.05;
    size[i] = 1.5 + Math.pow(Math.random(), 5) * 5;
  }, pixelRatio, 150);
  fades.push((g) => { shell.uniforms.uOpacity.value = g; });
  root.add(shell.points);

  return {
    root,
    disc,
    update(dt, g) {
      root.visible = g > 0.002;
      if (!root.visible) return;
      fades.forEach((f) => f(g));
    },
    dispose() {
      glowTex.dispose();
    },
  };
}

/*
 * Hyperspace streaks for the trips in and out of the galaxy: lines that live in camera space,
 * stretch with the speed of the trip and fly past the camera (towards it on the way home).
 */
export function createWarp(isSmall) {
  const N = isSmall ? 500 : 1100;
  const pos = new Float32Array(N * 6);
  const col = new Float32Array(N * 6);
  const seeds = [];
  const FAR = 70;
  for (let i = 0; i < N; i++) {
    // a hollow tunnel: nothing right in front of the eyes, denser towards the edges of the view
    const a = Math.random() * Math.PI * 2;
    const r = 0.9 + Math.pow(Math.random(), 0.6) * 9;
    const tint = Math.random();
    const c = tint < 0.6 ? [0.85, 0.85, 1.0] : tint < 0.85 ? [0.7, 0.62, 1.0] : [1.0, 0.6, 0.78];
    seeds.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z: -2 - Math.random() * FAR, k: 0.6 + Math.random() * 0.8 });
    // head bright, tail black: with additive blending the tail fades out
    col.set([c[0], c[1], c[2], 0, 0, 0], i * 6);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true, opacity: 0, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(geo, mat);
  lines.frustumCulled = false;
  lines.renderOrder = 10;
  lines.visible = false;

  return {
    object: lines,
    // w: 0..1 intensity, dir: +1 flies towards the camera (forward), -1 away (backing out)
    update(dt, w, dir) {
      lines.visible = w > 0.01;
      if (!lines.visible) return;
      mat.opacity = Math.min(0.8, w * 1.1);
      const speed = 20 + w * 160;
      const len = 0.4 + w * w * 22;
      for (let i = 0; i < N; i++) {
        const s = seeds[i];
        s.z += dir * speed * s.k * dt;
        if (s.z > -1) s.z -= FAR;
        if (s.z < -1 - FAR) s.z += FAR;
        const tail = s.z - dir * len * s.k;
        pos[i * 6] = s.x;
        pos[i * 6 + 1] = s.y;
        pos[i * 6 + 2] = s.z;
        pos[i * 6 + 3] = s.x;
        pos[i * 6 + 4] = s.y;
        pos[i * 6 + 5] = tail;
      }
      geo.attributes.position.needsUpdate = true;
    },
    dispose() {
      geo.dispose();
      mat.dispose();
    },
  };
}

/*
 * A few planets met on the way, drawn like the site's globe: dotted spheres with a soft rim
 * (one with a dotted ring). They live in camera space and are swept past the camera by the
 * trip's progress, each in its own slot, turning on themselves.
 */
const DOT_VERT = /* glsl */ `
uniform float uPixelRatio;
uniform float uSize;
attribute float aShade;
varying float vFront;
varying float vShade;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  // dots on the far side are dimmer, like on the globe
  vec3 n = normalize(normalMatrix * normalize(position));
  vFront = smoothstep(-0.35, 0.6, dot(n, normalize(-mv.xyz)));
  vShade = aShade;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(uSize * uPixelRatio * (60.0 / -mv.z), 1.6 * uPixelRatio, 9.0 * uPixelRatio);
}
`;
const DOT_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uFade;
varying float vFront;
varying float vShade;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.15, d) * (0.18 + 0.82 * vFront) * vShade * uFade;
  gl_FragColor = vec4(uColor * a, a);
}
`;
const RIM_VERT = /* glsl */ `
varying float vRim;
void main(){
  vec3 n = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vRim = pow(1.0 - max(dot(n, normalize(-mv.xyz)), 0.0), 2.6);
  gl_Position = projectionMatrix * mv;
}
`;
const RIM_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uFade;
varying float vRim;
void main(){
  float a = vRim * 0.9 * uFade;
  gl_FragColor = vec4(uColor * a, a);
}
`;

// a soft, flat-coloured body under the dots: lit from one side, no surface detail
const BODY_VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vV;
void main(){
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;
const BODY_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uFade;
varying vec3 vN;
varying vec3 vV;
void main(){
  vec3 n = normalize(vN);
  float diff = smoothstep(-0.3, 1.0, dot(n, normalize(vec3(-0.55, 0.45, 0.7))));
  float edge = 1.0 - max(dot(n, normalize(vV)), 0.0);
  vec3 col = uColor * (0.05 + diff * 0.42) + uColor * pow(edge, 3.0) * 0.25;
  gl_FragColor = vec4(col, uFade);
}
`;
const RINGBAND_VERT = /* glsl */ `
varying vec2 vP;
void main(){
  vP = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const RINGBAND_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uFade;
uniform float uIn;
uniform float uOut;
varying vec2 vP;
void main(){
  float r = (length(vP) - uIn) / (uOut - uIn);
  float a = smoothstep(0.0, 0.15, r) * smoothstep(1.0, 0.75, r) * 0.22 * uFade;
  gl_FragColor = vec4(uColor * a, a);
}
`;

const PLANETS = [
  // slot: where in the trip it passes (0..1), x/y: where on screen it slides past
  { slot: 0.3, x: 5.5, y: -2.2, r: 1.5, color: [0.72, 0.6, 1.0], spin: 0.25 },
  { slot: 0.5, x: -7.0, y: 2.6, r: 2.6, color: [0.95, 0.76, 0.71], spin: 0.12, ring: true },
  { slot: 0.68, x: 3.2, y: 3.4, r: 0.9, color: [0.62, 0.78, 1.0], spin: 0.4 },
  { slot: 0.82, x: -3.8, y: -3.2, r: 1.2, color: [0.93, 0.5, 0.72], spin: 0.3 },
];

// evenly spread dots (Fibonacci sphere), with faint "continents" made of brighter dots
function dotSphere(count, r) {
  const pos = new Float32Array(count * 3);
  const shade = new Float32Array(count);
  const off = Math.random() * 10;
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const rr = Math.sqrt(1 - y * y);
    const th = i * 2.399963229728653;
    const x = Math.cos(th) * rr;
    const z = Math.sin(th) * rr;
    pos.set([x * r, y * r, z * r], i * 3);
    const land = Math.sin(x * 3.1 + off) * Math.sin(y * 4.3 + off * 0.7) + Math.sin(z * 2.7 - off) * 0.6;
    shade[i] = land > 0.25 ? 1 : 0.42;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aShade', new THREE.BufferAttribute(shade, 1));
  return geo;
}
function dotRing(count, rIn, rOut) {
  const pos = new Float32Array(count * 3);
  const shade = new Float32Array(count);
  const rows = 5;
  for (let i = 0; i < count; i++) {
    const row = i % rows;
    const a = (Math.floor(i / rows) / (count / rows)) * Math.PI * 2 + row * 0.07;
    const r = rIn + (row / (rows - 1)) * (rOut - rIn);
    pos.set([Math.cos(a) * r, 0, Math.sin(a) * r], i * 3);
    shade[i] = row === 2 ? 0.45 : 0.85;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aShade', new THREE.BufferAttribute(shade, 1));
  return geo;
}

// one planet in the site's style: a soft body, a dotted surface, a rim glow (and maybe a dotted ring)
function makePlanet(d, isSmall, pixelRatio, rimGeo, disposables) {
  const holder = new THREE.Group();
  const color = new THREE.Vector3(...d.color);
  const fade = { value: 0 };
  const dotsMat = (size) => new THREE.ShaderMaterial({
    vertexShader: DOT_VERT, fragmentShader: DOT_FRAG,
    uniforms: { uPixelRatio: pixelRatio, uSize: { value: size }, uColor: { value: color }, uFade: fade },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const body = new THREE.Group();
  const count = Math.round((isSmall ? 500 : 900) * d.r);
  const sGeo = dotSphere(count, d.r);
  const sMat = dotsMat(2.6);
  body.add(new THREE.Points(sGeo, sMat));
  const rimMat = new THREE.ShaderMaterial({
    vertexShader: RIM_VERT, fragmentShader: RIM_FRAG,
    uniforms: { uColor: { value: color }, uFade: fade },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const solidMat = new THREE.ShaderMaterial({
    vertexShader: BODY_VERT, fragmentShader: BODY_FRAG,
    uniforms: { uColor: { value: color }, uFade: fade }, transparent: true,
  });
  const solid = new THREE.Mesh(rimGeo, solidMat);
  solid.scale.setScalar(d.r * 0.985);
  holder.add(solid);
  disposables.push(solidMat);
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.scale.setScalar(d.r * 1.06);
  holder.add(rim);
  disposables.push(sGeo, sMat, rimMat);
  if (d.ring) {
    const rGeo = dotRing(isSmall ? 600 : 1100, d.r * 1.45, d.r * 2.3);
    const rMat = dotsMat(2.0);
    const ring = new THREE.Points(rGeo, rMat);
    ring.rotation.set(0.42, 0, 0.3);
    holder.add(ring);
    const bandIn = d.r * 1.4;
    const bandOut = d.r * 2.35;
    const bGeo = new THREE.RingGeometry(bandIn, bandOut, 128, 1);
    const bMat = new THREE.ShaderMaterial({
      vertexShader: RINGBAND_VERT, fragmentShader: RINGBAND_FRAG,
      uniforms: { uColor: { value: color }, uFade: fade, uIn: { value: bandIn }, uOut: { value: bandOut } },
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    });
    const band = new THREE.Mesh(bGeo, bMat);
    // child of the dotted ring, laid flat in its plane
    band.rotation.x = -Math.PI / 2;
    ring.add(band);
    disposables.push(rGeo, rMat, bGeo, bMat);
  }
  body.rotation.z = 0.35;
  holder.add(body);
  return { holder, body, fade };
}

export function createFlyby(isSmall, pixelRatio) {
  const group = new THREE.Group();
  const rimGeo = new THREE.SphereGeometry(1, 40, 30);
  const disposables = [rimGeo];
  const items = PLANETS.map((d) => {
    const { holder, body, fade } = makePlanet(d, isSmall, pixelRatio, rimGeo, disposables);
    holder.renderOrder = 12;
    holder.visible = false;
    group.add(holder);
    return { d, holder, body, fade };
  });

  return {
    object: group,
    // p: progress of the trip (0..1); dir +1 flies towards them (home), -1 backs away (going out)
    update(dt, p, active, dir) {
      items.forEach(({ d, holder, body, fade }) => {
        // each planet travels between far ahead and behind the camera over a short window of the trip
        const k = (p - (d.slot - 0.16)) / 0.32;
        const on = active && k > 0 && k < 1;
        holder.visible = on;
        body.rotation.y += dt * d.spin;
        if (!on) return;
        // going out they slip in from behind and recede; coming home they rush in and fly past
        const q = dir > 0 ? k : 1 - k;
        const e = q * q; // faster as it gets close
        holder.position.set(d.x * (0.7 + e * 0.5), d.y * (0.7 + e * 0.5), -75 + e * 83);
        holder.rotation.z = q * 0.4;
        fade.value = Math.min(1, q / 0.18) * Math.min(1, (1 - q) / 0.06);
      });
    },
    dispose() {
      disposables.forEach((x) => x.dispose());
    },
  };
}

/* A friend's planet, set in the other arm of the galaxy: a real place you can fly to */
export function createFriendPlanet(friend, isSmall, pixelRatio) {
  const rimGeo = new THREE.SphereGeometry(1, 40, 30);
  const disposables = [rimGeo];
  const d = { r: 1.1, color: friend.planet, ring: !!friend.ring };
  const { holder, body, fade } = makePlanet(d, isSmall, pixelRatio, rimGeo, disposables);
  fade.value = 0;
  const r = friend.orbit;
  const a = armAngle(friend.arm ?? 1, r) + 0.12;
  holder.position.set(Math.cos(a) * r, 0.8, Math.sin(a) * r);
  return {
    object: holder,
    radius: d.r,
    update(dt, g) {
      holder.visible = g > 0.01;
      fade.value = g;
      body.rotation.y += dt * 0.2;
    },
    dispose() { disposables.forEach((x) => x.dispose()); },
  };
}
