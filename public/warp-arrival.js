// Arrival from a friend's site (e.g. Damien's terminal, `/galaxy`): https://galleyhugo.com/?warp=damien
// lands straight in the galaxy easter egg. This runs before the first paint (external file: the CSP has
// no 'unsafe-inline'). The friend's page left in the middle of a hyperspace jump, so this one starts in
// the very same jump: the streaks below copy the 3D ones (createWarp in src/components/galaxy.js) at
// full speed (same tunnel, speed, length, colours, 72° field of view), drawn in 2D so they show up at
// once (public/warp-streaks.js, in a worker). GlobeScene takes over with the real 3D jump, still at
// full speed, once its shaders are compiled, and fades these out.
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
    var count = innerWidth < 768 ? 500 : 1100;
    var dims = function () { return { width: Math.round(innerWidth * dpr), height: Math.round(innerHeight * dpr), dpr: dpr }; };
    var src = (document.currentScript && document.currentScript.src || '/warp-arrival.js').replace(/warp-arrival\.js.*$/, 'warp-streaks.js');
    var onResize;
    var halt;
    // the streaks are drawn in a worker, so they keep flowing while the page and the 3D scene start up
    if (window.Worker && canvas.transferControlToOffscreen) {
      var worker = new Worker(src);
      var off = canvas.transferControlToOffscreen();
      var d = dims();
      worker.postMessage({ canvas: off, count: count, width: d.width, height: d.height, dpr: d.dpr }, [off]);
      onResize = function () { var r = dims(); worker.postMessage({ resize: true, width: r.width, height: r.height, dpr: r.dpr }); };
      halt = function () { worker.postMessage({ stop: true }); setTimeout(function () { worker.terminate(); }, 50); };
    } else {
      // fallback: the same drawing, on the main thread
      var running = true;
      halt = function () { running = false; };
      var script = document.createElement('script');
      script.src = src;
      script.onload = function () {
        if (!running || !window.__warpStreaks) return;
        var streaks = window.__warpStreaks(canvas.getContext('2d'), count);
        var r = dims();
        streaks.resize(r.width, r.height, r.dpr);
        onResize = function () { var q = dims(); streaks.resize(q.width, q.height, q.dpr); };
        var last = performance.now();
        var loop = function (now) {
          if (!running) return;
          streaks.frame(Math.min((now - last) / 1000, 0.05));
          last = now;
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      };
      document.head.appendChild(script);
    }
    var resize = function () { if (onResize) onResize(); };
    window.addEventListener('resize', resize);
    stop = function () {
      canvas.style.opacity = '0';
      setTimeout(function () {
        halt();
        window.removeEventListener('resize', resize);
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
