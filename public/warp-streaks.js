// Hyperspace streaks for the arrival from a friend's site (see warp-arrival.js).
// A 2D copy of the 3D streaks (createWarp in src/components/galaxy.js) at full speed: same tunnel,
// speed, length, tints and 72° field of view. It runs in a worker on an OffscreenCanvas, so it keeps
// moving while the main thread is busy starting the page and the 3D scene; when workers or
// OffscreenCanvas are missing, warp-arrival.js loads this same file as a plain script instead.
(function (scope) {
  var TINTS = ['217,217,255', '179,158,255', '255,153,199'];
  // the tail of each streak fades out: three segments, from the bright head to the dim end
  var STEPS = [[0, 1 / 3, 0.8], [1 / 3, 2 / 3, 0.45], [2 / 3, 1, 0.15]];

  function createStreaks(ctx, count) {
    var FAR = 70, SPEED = 180, LEN = 22.4, NEAR = 0.5;
    var W = 1, H = 1, dpr = 1, f = 1;
    var seeds = [];
    for (var i = 0; i < count; i++) {
      var a = Math.random() * Math.PI * 2;
      var r = 0.9 + Math.pow(Math.random(), 0.6) * 9;
      var tint = Math.random();
      seeds.push({
        x: Math.cos(a) * r, y: Math.sin(a) * r, z: -2 - Math.random() * FAR,
        k: 0.6 + Math.random() * 0.8, t: tint < 0.6 ? 0 : tint < 0.85 ? 1 : 2,
      });
    }
    return {
      resize: function (w, h, ratio) {
        W = w; H = h; dpr = ratio;
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        f = (H / 2) / Math.tan((72 / 2) * Math.PI / 180);
      },
      frame: function (dt) {
        var cx = W / 2, cy = H / 2, i, s;
        for (i = 0; i < seeds.length; i++) {
          s = seeds[i];
          s.z += SPEED * s.k * dt;
          if (s.z > -1) s.z -= FAR;
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineWidth = dpr;
        // a handful of batched paths per frame (tint × segment), not one stroke per streak
        for (var t = 0; t < TINTS.length; t++) {
          for (var p = 0; p < STEPS.length; p++) {
            var step = STEPS[p];
            ctx.strokeStyle = 'rgba(' + TINTS[t] + ',' + step[2] + ')';
            ctx.beginPath();
            for (i = 0; i < seeds.length; i++) {
              s = seeds[i];
              if (s.t !== t) continue;
              var len = LEN * s.k;
              var z0 = Math.min(s.z - len * step[0], -NEAR);
              var z1 = s.z - len * step[1];
              if (z1 >= z0) continue;
              ctx.moveTo(cx + (s.x * f) / -z0, cy - (s.y * f) / -z0);
              ctx.lineTo(cx + (s.x * f) / -z1, cy - (s.y * f) / -z1);
            }
            ctx.stroke();
          }
        }
      },
    };
  }

  var inWorker = typeof WorkerGlobalScope !== 'undefined' && scope instanceof WorkerGlobalScope;
  if (!inWorker) {
    scope.__warpStreaks = createStreaks;
    return;
  }

  // worker: draw on the canvas handed over by the page, until told to stop
  var streaks = null;
  var running = false;
  var last = 0;
  var raf = scope.requestAnimationFrame
    ? function (cb) { scope.requestAnimationFrame(cb); }
    : function (cb) { setTimeout(function () { cb(performance.now()); }, 16); };
  function loop(now) {
    if (!running) return;
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    streaks.frame(dt);
    raf(loop);
  }
  scope.onmessage = function (e) {
    var d = e.data;
    if (d.canvas) {
      streaks = createStreaks(d.canvas.getContext('2d'), d.count);
      streaks.resize(d.width, d.height, d.dpr);
      running = true;
      last = performance.now();
      streaks.frame(0);
      raf(loop);
    } else if (d.resize && streaks) {
      streaks.resize(d.width, d.height, d.dpr);
    } else if (d.stop) {
      running = false;
    }
  };
})(self);
