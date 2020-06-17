(function (e, n) {
  function w(e, n) {
    if (!e.location) e.location = { href: '', __polyfill: true };
    if (!e.navigator) e.navigator = { userAgent: '', platform: '', __polyfill: true };
    if (!e.document) e.document = { title: '', addEventListener: function () {}, __polyfill: true };
    var m = n(e);
    if (e.location.__polyfill) delete e.location;
    if (e.navigator.__polyfill) delete e.navigator;
    if (e.document.__polyfill) delete e.document;
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      try { Object.defineProperty(m, Symbol.toStringTag, { value: 'Module' }); } catch (_) {}
    }
    try { Object.defineProperty(m, '__esModule', { value: true });  } catch (_) { m.__esModule = true; }
    try { Object.defineProperty(m, 'default', { enumerable: true, value: m }); } catch (_) { m['default'] = m; }
    return m;
  }
  if(typeof exports === 'object' && typeof module === 'object') {
    module.exports = w(e, n);
  } else if(typeof define === 'function' && define.amd) {
    define(function () {
      return w(e, n);
    });
  } else if(typeof exports === 'object') {
    exports['wx'] = w(e, n);
  } else {
    if (!e['jWeixin']) {
      e['wx'] = e['jWeixin'] = n(e);
    }
  }
})