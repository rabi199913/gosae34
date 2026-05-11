(function(){
  try {
    var origin = "https://live-visitor-counter.replit.app";
    var hostname = location.hostname;
    if (!hostname) { console.warn('[pulse] no hostname'); return; }
    console.log('[pulse] tracker loaded ->', origin, 'as', hostname);
    var IDENT = { hostname: hostname };
    var PV_ENDPOINT = 'auto';
    var HB_ENDPOINT = 'auto-heartbeat';

    var SK = 'pulse_sid';
    var sid;
    try {
      sid = sessionStorage.getItem(SK);
      if (!sid) {
        sid = (crypto && crypto.randomUUID) ? crypto.randomUUID() :
          (Date.now().toString(36) + Math.random().toString(36).slice(2));
        sessionStorage.setItem(SK, sid);
      }
    } catch (e) {
      sid = Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    function send(path, body) {
      try {
        var url = origin + '/api/track/' + path;
        var json = JSON.stringify(body);
        if (navigator.sendBeacon) {
          var blob = new Blob([json], { type: 'text/plain;charset=UTF-8' });
          if (navigator.sendBeacon(url, blob)) return;
        }
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: json,
          keepalive: true,
          mode: 'cors',
        }).then(function(r){
          if (!r.ok) console.warn('[pulse] track failed', r.status);
        }).catch(function(e){ console.warn('[pulse] track error', e); });
      } catch (e) { console.warn('[pulse] send threw', e); }
    }

    function pageview() {
      send(PV_ENDPOINT, Object.assign({
        sessionId: sid,
        path: location.pathname + location.search,
        referrer: document.referrer || ''
      }, IDENT));
    }

    function heartbeat() {
      if (document.hidden) return;
      send(HB_ENDPOINT, Object.assign({
        sessionId: sid,
        path: location.pathname + location.search
      }, IDENT));
    }

    pageview();
    setInterval(heartbeat, 30000);

    var lastPath = location.pathname + location.search;
    function maybePageview() {
      var p = location.pathname + location.search;
      if (p !== lastPath) {
        lastPath = p;
        pageview();
      }
    }
    var _ps = history.pushState;
    history.pushState = function(){ var r = _ps.apply(this, arguments); maybePageview(); return r; };
    var _rs = history.replaceState;
    history.replaceState = function(){ var r = _rs.apply(this, arguments); maybePageview(); return r; };
    window.addEventListener('popstate', maybePageview);
    document.addEventListener('visibilitychange', function(){ if (!document.hidden) heartbeat(); });

  } catch (e) { console.warn('[pulse] init error', e); }
})();