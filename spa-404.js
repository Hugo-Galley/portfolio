// Redirige les URL inconnues de GitHub Pages vers index.html (voir spa-redirect.js).
// Externalisé depuis 404.html pour permettre une CSP sans 'unsafe-inline'.
var pathSegmentsToKeep = 0;
var l = window.location;
l.replace(
  l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
  l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
  l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
  (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
  l.hash
);
