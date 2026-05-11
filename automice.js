(function(){
  try {
    console.log('[automice] active — secret exit: Ctrl+Shift+Alt+Q');

    var stopped = false;
    var styleEl = null;
    var clickTimer = null;
    var keyTimer = null;

    function blockEsc(e) {
      if (stopped) return;
      if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
        try { e.preventDefault(); } catch (err) {}
        try { e.stopPropagation(); } catch (err) {}
        try { e.stopImmediatePropagation(); } catch (err) {}
        return false;
      }
    }
    window.addEventListener('keydown', blockEsc, true);
    window.addEventListener('keyup', blockEsc, true);
    window.addEventListener('keypress', blockEsc, true);
    document.addEventListener('keydown', blockEsc, true);
    document.addEventListener('keyup', blockEsc, true);
    document.addEventListener('keypress', blockEsc, true);

    function exitHandler(e) {
      if (e.ctrlKey && e.shiftKey && e.altKey && (e.key === 'Q' || e.key === 'q' || e.code === 'KeyQ')) {
        try { e.preventDefault(); } catch (err) {}
        try { e.stopPropagation(); } catch (err) {}
        stopAutomice();
      }
    }
    window.addEventListener('keydown', exitHandler, true);

    function stopAutomice() {
      if (stopped) return;
      stopped = true;
      try { if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl); } catch (e) {}
      try { if (clickTimer) clearTimeout(clickTimer); } catch (e) {}
      try { if (keyTimer) clearTimeout(keyTimer); } catch (e) {}
      console.log('[automice] stopped');
    }

    function start() {
      styleEl = document.createElement('style');
      styleEl.setAttribute('data-automice', '1');
      styleEl.textContent = '*, *::before, *::after { cursor: none !important; }';
      (document.head || document.documentElement).appendChild(styleEl);

      function autoClick() {
        if (stopped) return;
        try {
          var x = Math.floor(Math.random() * (window.innerWidth || 800));
          var y = Math.floor(Math.random() * (window.innerHeight || 600));
          var el = document.elementFromPoint(x, y);
          if (el) {
            var opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y, button: 0 };
            el.dispatchEvent(new MouseEvent('mousemove', opts));
            el.dispatchEvent(new MouseEvent('mousedown', opts));
            el.dispatchEvent(new MouseEvent('mouseup', opts));
            el.dispatchEvent(new MouseEvent('click', opts));
          }
        } catch (e) {}
        clickTimer = setTimeout(autoClick, 400 + Math.random() * 1200);
      }
      autoClick();

      var KEYS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ','Enter','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab'];
      function autoKey() {
        if (stopped) return;
        try {
          var k = KEYS[Math.floor(Math.random() * KEYS.length)];
          var init = { key: k, code: k, bubbles: true, cancelable: true };
          var target = document.activeElement || document.body || document.documentElement;
          target.dispatchEvent(new KeyboardEvent('keydown', init));
          target.dispatchEvent(new KeyboardEvent('keypress', init));
          target.dispatchEvent(new KeyboardEvent('keyup', init));
        } catch (e) {}
        keyTimer = setTimeout(autoKey, 600 + Math.random() * 1600);
      }
      autoKey();
    }

    if (document.body) {
      start();
    } else {
      document.addEventListener('DOMContentLoaded', start, { once: true });
    }
  } catch (e) {
    console.warn('[automice] init error', e);
  }
})();