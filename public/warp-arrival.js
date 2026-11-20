// Arrival from a friend's site (e.g. Damien's terminal, `/galaxy`): https://galleyhugo.com/?warp=damien
// lands straight in the galaxy easter egg. This runs before the first paint (external file: the CSP has
// no 'unsafe-inline'): it covers the page in black, like the screen the jump left from, and hands over
// to the globe (GlobeScene), which plays the end of the jump and lifts the veil.
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
  root.classList.add('warp-arrival');
  // safety net: if the globe never takes over (slow network, WebGL off), lift the veil anyway
  setTimeout(function () {
    if (window.__warpFrom === from) {
      window.__warpFrom = null;
      root.classList.add('warp-reveal');
      setTimeout(function () { root.classList.remove('warp-arrival', 'warp-reveal'); }, 1200);
    }
  }, 7000);
})();
