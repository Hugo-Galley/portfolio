// Charge Umami uniquement sur galleyhugo.com et si ce navigateur n'est pas exclu.
// Exclure son navigateur : https://galleyhugo.com/?umami=off (une fois par navigateur/appareil).
// Réactiver : https://galleyhugo.com/?umami=on
// (recorder.js ne respecte ni data-domains ni umami.disabled, d'où ce chargement conditionnel.)
// Fichier externe et non script en ligne : la CSP n'autorise pas 'unsafe-inline'.
(function () {
  var KEY = 'umami.disabled';
  var store = null;
  try { store = window.localStorage; } catch (e) {}
  var flag = new URLSearchParams(location.search).get('umami');
  if (store && flag === 'off') { try { store.setItem(KEY, '1'); } catch (e) {} }
  if (store && flag === 'on') { try { store.removeItem(KEY); } catch (e) {} }
  if (flag === 'off' || flag === 'on') {
    console.info('[umami] tracking ' + (flag === 'off' ? 'désactivé' : 'réactivé') + ' pour ce navigateur');
  }
  var disabled = false;
  try { disabled = !!(store && store.getItem(KEY)); } catch (e) {}
  if (disabled || location.hostname !== 'galleyhugo.com') return;
  var ID = 'ecbac90b-157b-4347-9b88-d70269d34402';
  function load(src, extra) {
    var s = document.createElement('script');
    s.defer = true;
    s.src = 'https://analytics.galleyhugo.com/' + src;
    s.setAttribute('data-website-id', ID);
    s.setAttribute('data-domains', 'galleyhugo.com');
    for (var k in extra) s.setAttribute(k, extra[k]);
    document.head.appendChild(s);
  }
  load('script.js', { 'data-performance': 'true' });
  load('recorder.js', {});
})();
