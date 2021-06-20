(function (_this) {
  var g;
  g = (function () { return this; })();

  try {
    g = g || new Function("return this")();
  } catch (_) {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof __webpack_public_path__ === "undefined") {
      if (typeof global !== "undefined") return global;
    }
    if (typeof window !== "undefined") return window;
    if (typeof self !== "undefined") return self;
  }

  return g || _this || {};
})(this)
