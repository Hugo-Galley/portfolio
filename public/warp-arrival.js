// Arrival from a friend's site (e.g. Damien's terminal, `/galaxy`): https://galleyhugo.com/?warp=damien
// lands straight in the galaxy easter egg. This runs before the first paint (external file: the CSP has
// no 'unsafe-inline'). The friend's page left in the middle of a hyperspace jump, so this one starts in
// the very same jump: the streaks below copy the 3D ones (createWarp in src/components/galaxy.js) at
// full speed (same tunnel, speed, length, colours, 72° field of view), drawn in 2D so they show up at
// once. GlobeScene then takes over with the real 3D jump, still at full speed, and fades these out.
(function () {
  var params = new URLSearchParams(location.search);
  var from = params.get('warp');
  if (!from || !/^[a-z0-9-]{1,32}$/.test(from)) return;
  // the address becomes clean again; a reload does not replay the arrival
  params.delete('warp');
  var query = params.toString();
  history.replaceState(history.state, '', location.pathname + (query ? '?' + query : '') + location.hash);
  // the globe (and so the galaxy) only lives on the home page, on screens wide enough for it
  var home = location.pathname === '/' || location.pathname === '/index.html';
  if (!home || !window.matchMedia('(min-width: 769px)').matches) return;
  window.__warpFrom = from;
  var root = document.documentElement;
  // warp-arrived stays for the whole visit: the globe skips its fade-in (it would dim the jump)
  root.classList.add('warp-arrival', 'warp-arrived');

  var stop = function () {};
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var canvas = document.createElement('canvas');
    canvas.id = 'warp-arrival-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:5001;pointer-events:none;background:#000;transition:opacity .35s ease';
    root.appendChild(canvas);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, f = 1;
    var size = function () {
      W = canvas.width = Math.round(innerWidth * dpr);
      H = canvas.height = Math.round(innerHeight * dpr);
      f = (H / 2) / Math.tan((72 / 2) * Math.PI / 180); // camera fov 40 + 32 at full warp
    };
    size();
    window.addEventListener('resize', size);
    var ctx = canvas.getContext('2d');
    // same seeds as createWarp: a hollow tunnel around the view, three tints
    var N = innerWidth < 768 ? 500 : 1100;
    var FAR = 70;
    var seeds = [];
    for (var i = 0; i < N; i++) {
      var a = Math.random() * Math.PI * 2;
      var r = 0.9 + Math.pow(Math.random(), 0.6) * 9;
      var tint = Math.random();
      var c = tint < 0.6 ? '217,217,255' : tint < 0.85 ? '179,158,255' : '255,153,199';
      seeds.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z: -2 - Math.random() * FAR, k: 0.6 + Math.random() * 0.8, c: c });
    }
    var SPEED = 180, LEN = 22.4, NEAR = 0.5;
    var last = performance.now();
    var running = true;
    var frame = function (now) {
      if (!running) return;
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = dpr;
      var cx = W / 2, cy = H / 2;
      for (var i = 0; i < N; i++) {
        var s = seeds[i];
        s.z += SPEED * s.k * dt;
        if (s.z > -1) s.z -= FAR;
        var head = Math.min(s.z, -NEAR);
        var tail = s.z - LEN * s.k;
        if (tail >= head) continue;
        var hx = cx + (s.x * f) / -head, hy = cy - (s.y * f) / -head;
        var tx = cx + (s.x * f) / -tail, ty = cy - (s.y * f) / -tail;
        var g = ctx.createLinearGradient(hx, hy, tx, ty);
        g.addColorStop(0, 'rgba(' + s.c + ',0.8)');
        g.addColorStop(1, 'rgba(' + s.c + ',0)');
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    stop = function () {
      canvas.style.opacity = '0';
      setTimeout(function () {
        running = false;
        window.removeEventListener('resize', size);
        canvas.remove();
      }, 400);
    };
  }
  // GlobeScene calls this once its own 3D jump is on screen
  window.__warpHandOver = function () { window.__warpHandOver = null; stop(); };

  // safety net: if the globe never takes over (slow network, WebGL off), lift the veil anyway
  setTimeout(function () {
    if (window.__warpFrom === from) {
      window.__warpFrom = null;
      if (window.__warpHandOver) window.__warpHandOver();
      root.classList.add('warp-reveal');
      setTimeout(function () { root.classList.remove('warp-arrival', 'warp-reveal'); }, 1200);
    }
  }, 7000);
})();
