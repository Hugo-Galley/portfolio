// Restaure l'URL d'origine après la redirection de 404.html (SPA sur GitHub Pages).
// Externalisé depuis index.html pour permettre une CSP sans 'unsafe-inline'.
(function(l) {
  if (l.search[1] === '/' ) {
    var decoded = l.search.slice(1).split('&').map(function(s) {
      return s.replace(/~and~/g, '&');
    }).join('?');
    window.history.replaceState(null, null,
      l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}(window.location));
