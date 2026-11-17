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
