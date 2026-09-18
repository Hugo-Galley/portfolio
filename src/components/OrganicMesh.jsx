import { useEffect, useRef, useCallback, useState } from 'react';

/*
 * Simplex noise implementation for organic flow fields.
 * Based on Stefan Gustavson's simplex noise algorithm.
 */
class SimplexNoise {
  constructor(seed = Math.random()) {
    this.grad3 = [
      [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
    ];
    this.p = [];
    for (let i = 0; i < 256; i++) this.p[i] = i;
    // Shuffle with seed using LCG
    let s = seed * 2147483647;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      const j = Math.floor((s / 2147483647) * (i + 1));
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }
    this.perm = new Array(512);
    this.permMod12 = new Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  noise3D(xin, yin, zin) {
    const F3 = 1.0 / 3.0;
    const G3 = 1.0 / 6.0;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const X0 = i - t, Y0 = j - t, Z0 = k - t;
    const x0 = xin - X0, y0 = yin - Y0, z0 = zin - Z0;

    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if (y0 < z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if (x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }

    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2*G3, y2 = y0 - j2 + 2*G3, z2 = z0 - k2 + 2*G3;
    const x3 = x0 - 1 + 3*G3, y3 = y0 - 1 + 3*G3, z3 = z0 - 1 + 3*G3;

    const ii = i & 255, jj = j & 255, kk = k & 255;
    const gi0 = this.permMod12[ii + this.perm[jj + this.perm[kk]]];
    const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]];
    const gi2 = this.permMod12[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]];
    const gi3 = this.permMod12[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]];

    const dot = (g, x, y, z) => g[0]*x + g[1]*y + g[2]*z;

    let n0, n1, n2, n3;
    let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    n0 = t0 < 0 ? 0 : (t0 *= t0, t0 * t0 * dot(this.grad3[gi0], x0, y0, z0));
    let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    n1 = t1 < 0 ? 0 : (t1 *= t1, t1 * t1 * dot(this.grad3[gi1], x1, y1, z1));
    let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    n2 = t2 < 0 ? 0 : (t2 *= t2, t2 * t2 * dot(this.grad3[gi2], x2, y2, z2));
    let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    n3 = t3 < 0 ? 0 : (t3 *= t3, t3 * t3 * dot(this.grad3[gi3], x3, y3, z3));

    return 32.0 * (n0 + n1 + n2 + n3);
  }
}

export default function OrganicMesh() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const noiseRef = useRef(null);
  const timeRef = useRef(0);
  const dprRef = useRef(1);
  const isVisibleRef = useRef(true);

  const PARTICLE_COUNT = 1500;
  const MOUSE_RADIUS = 150;
  const NOISE_SCALE = 0.003;
  const FLOW_SPEED = 0.0004;

  const themeStylesRef = useRef({
    particleLow: 'rgba(255, 255, 255, 0.22)',
    particleMid: 'rgba(255, 255, 255, 0.5)',
    particleHigh: 'rgba(255, 255, 255, 0.85)',
    lineBase: 'rgba(255, 255, 255, 0.12)',
    lineMouse: 'rgba(255, 255, 255, 0.45)',
  });

  // Reusable typed arrays for zero-allocation batching
  const buffersRef = useRef({
    bucket0: new Int16Array(PARTICLE_COUNT),
    bucket1: new Int16Array(PARTICLE_COUNT),
    bucket2: new Int16Array(PARTICLE_COUNT),
    linesArray: new Float32Array(4000), // up to 1000 lines * 4 coords
    mouseLinesArray: new Float32Array(2000), // up to 500 lines * 4 coords
  });

  const updateThemeColor = useCallback(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    const isLight = theme === 'light';
    const rgb = isLight ? '20, 20, 30' : '255, 255, 255';
    themeStylesRef.current = {
      particleLow: `rgba(${rgb}, 0.22)`,
      particleMid: `rgba(${rgb}, 0.5)`,
      particleHigh: `rgba(${rgb}, 0.85)`,
      lineBase: `rgba(${rgb}, 0.12)`,
      lineMouse: `rgba(${rgb}, 0.45)`,
    };
  }, []);

  const initParticles = useCallback((width, height) => {
    const particles = [];
    const noise = noiseRef.current;
    
    // Create particles distributed along noise-driven organic curves
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      const noiseVal = noise.noise3D(x * NOISE_SCALE, y * NOISE_SCALE, 0);
      const nx = noise.noise3D((x + 1) * NOISE_SCALE, y * NOISE_SCALE, 0);
      const ny = noise.noise3D(x * NOISE_SCALE, (y + 1) * NOISE_SCALE, 0);
      const edgeStrength = Math.abs(nx - noiseVal) + Math.abs(ny - noiseVal);
      
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: 0.5 + Math.random() * 1.2,
        baseSize: 0.5 + Math.random() * 1.2,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.15 + edgeStrength * 2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    noiseRef.current = new SimplexNoise(42);
    updateThemeColor();

    // Watch for theme changes
    const themeObserver = new MutationObserver(() => updateThemeColor());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      dprRef.current = dpr;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const animate = () => {
      if (!isVisibleRef.current) {
        animFrameRef.current = null;
        return;
      }

      const width = canvas.width / dprRef.current;
      const height = canvas.height / dprRef.current;
      const noise = noiseRef.current;
      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const time = timeRef.current;
      const { bucket0, bucket1, bucket2, linesArray, mouseLinesArray } = buffersRef.current;
      const styles = themeStylesRef.current;

      ctx.clearRect(0, 0, width, height);

      let b0Count = 0;
      let b1Count = 0;
      let b2Count = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic flow via 3D noise
        const angle = noise.noise3D(
          p.x * NOISE_SCALE + p.noiseOffsetX,
          p.y * NOISE_SCALE + p.noiseOffsetY,
          time * FLOW_SPEED
        ) * Math.PI * 2;

        const angle2 = noise.noise3D(
          p.x * NOISE_SCALE * 2.5 + 500,
          p.y * NOISE_SCALE * 2.5 + 500,
          time * FLOW_SPEED * 0.7
        ) * Math.PI * 2;

        const flowX = (Math.cos(angle) * 0.6 + Math.cos(angle2) * 0.4) * p.speed;
        const flowY = (Math.sin(angle) * 0.6 + Math.sin(angle2) * 0.4) * p.speed;

        p.x += flowX * 0.5;
        p.y += flowY * 0.5;

        // Gentle pull back towards base position
        p.x += (p.baseX - p.x) * 0.002;
        p.y += (p.baseY - p.y) * 0.002;

        // Mouse interaction — organic repulsion + growth
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let mouseInfluence = 0;
        if (dist < MOUSE_RADIUS) {
          mouseInfluence = 1 - dist / MOUSE_RADIUS;
          const force = mouseInfluence * mouseInfluence * 3;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
          p.size = p.baseSize + mouseInfluence * 3;
        } else {
          p.size += (p.baseSize - p.size) * 0.05;
        }

        // Wrap around edges smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Smooth breathing pulsation using fast trigonometric wave
        const breathe = Math.sin(time * 0.02 + p.phase);
        const dynamicOpacity = Math.max(0.15, Math.min(1,
          p.opacity * (0.7 + breathe * 0.3) + mouseInfluence * 0.6
        ));

        // Group into buckets for batched rendering
        if (dynamicOpacity < 0.38) {
          bucket0[b0Count++] = i;
        } else if (dynamicOpacity < 0.68) {
          bucket1[b1Count++] = i;
        } else {
          bucket2[b2Count++] = i;
        }
      }

      // Draw all particles in 3 batched draw calls instead of 1500+ individual calls
      if (b0Count > 0) {
        ctx.beginPath();
        ctx.fillStyle = styles.particleLow;
        for (let k = 0; k < b0Count; k++) {
          const p = particles[bucket0[k]];
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (b1Count > 0) {
        ctx.beginPath();
        ctx.fillStyle = styles.particleMid;
        for (let k = 0; k < b1Count; k++) {
          const p = particles[bucket1[k]];
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (b2Count > 0) {
        ctx.beginPath();
        ctx.fillStyle = styles.particleHigh;
        for (let k = 0; k < b2Count; k++) {
          const p = particles[bucket2[k]];
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Draw connections with early-exit rejection and batching
      const connectionDist = 50;
      const connectionDistSq = connectionDist * connectionDist;
      const mouseRadiusSq = MOUSE_RADIUS * MOUSE_RADIUS;
      let lineCount = 0;
      let mouseLineCount = 0;
      const maxLines = linesArray.length / 4;
      const maxMouseLines = mouseLinesArray.length / 4;
      const isMouseActive = mouse.x > -1000;

      for (let i = 0; i < particles.length; i += 4) {
        const a = particles[i];
        for (let j = i + 4; j < particles.length; j += 8) {
          const b = particles[j];
          const ddx = a.x - b.x;
          if (ddx > connectionDist || ddx < -connectionDist) continue;
          const ddy = a.y - b.y;
          if (ddy > connectionDist || ddy < -connectionDist) continue;

          const dSq = ddx * ddx + ddy * ddy;
          if (dSq < connectionDistSq) {
            let isNearMouse = false;
            if (isMouseActive) {
              const midX = (a.x + b.x) * 0.5;
              const midY = (a.y + b.y) * 0.5;
              const mdx = midX - mouse.x;
              const mdy = midY - mouse.y;
              if (mdx * mdx + mdy * mdy < mouseRadiusSq) {
                isNearMouse = true;
              }
            }

            if (isNearMouse && mouseLineCount < maxMouseLines) {
              const idx = mouseLineCount * 4;
              mouseLinesArray[idx] = a.x;
              mouseLinesArray[idx + 1] = a.y;
              mouseLinesArray[idx + 2] = b.x;
              mouseLinesArray[idx + 3] = b.y;
              mouseLineCount++;
            } else if (!isNearMouse && lineCount < maxLines) {
              const idx = lineCount * 4;
              linesArray[idx] = a.x;
              linesArray[idx + 1] = a.y;
              linesArray[idx + 2] = b.x;
              linesArray[idx + 3] = b.y;
              lineCount++;
            }
          }
        }
      }

      ctx.lineWidth = 0.3;

      if (lineCount > 0) {
        ctx.beginPath();
        for (let k = 0; k < lineCount; k++) {
          const idx = k * 4;
          ctx.moveTo(linesArray[idx], linesArray[idx + 1]);
          ctx.lineTo(linesArray[idx + 2], linesArray[idx + 3]);
        }
        ctx.strokeStyle = styles.lineBase;
        ctx.stroke();
      }

      if (mouseLineCount > 0) {
        ctx.beginPath();
        for (let k = 0; k < mouseLineCount; k++) {
          const idx = k * 4;
          ctx.moveTo(mouseLinesArray[idx], mouseLinesArray[idx + 1]);
          ctx.lineTo(mouseLinesArray[idx + 2], mouseLinesArray[idx + 3]);
        }
        ctx.strokeStyle = styles.lineMouse;
        ctx.stroke();
      }

      timeRef.current += 1;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    // Pause animation when hero leaves the viewport
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        isVisibleRef.current = isIntersecting;
        if (isIntersecting && !animFrameRef.current) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else if (!isIntersecting && animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(parent);

    // Pause animation when browser tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      } else if (isVisibleRef.current && !animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [initParticles, isMobile, updateThemeColor]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 3,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
