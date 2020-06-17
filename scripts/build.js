const beautify = require('js-beautify').js
const fs = require('fs')
const path = require('path')
const Terser = require("terser")

const fetchSDKCode = require('./fetch.js')

async function main () {
  let sdkCode = ''
  const localSDK = path.join(__dirname, '../src/jweixin.min.js')
  if (fs.existsSync(localSDK)) {
    sdkCode = fs.readFileSync(localSDK, 'utf8')
  } else {
    sdkCode = await fetchSDKCode()
  }
  const beautifiedCode = beautify(sdkCode, { indent_size: 2, space_in_empty_paren: true, eol: require('os').EOL })
  const re = /!\s*function\(\S{1},\s*\S{1}\)\s*\{(\r?\n)?(.+\r?\n)*\}\s*\(this,\s*/

  const umdWrapper = `!function (e, n) {
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
      e['wx'] = e['jWeixin'] = w(e, n);
    }
  }
}(typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : (typeof self !== "undefined" ? self : this)), `

  const out = path.join(__dirname, '../dist')
  if (!fs.existsSync(out)) {
    fs.mkdirSync(out)
  }

  const newCode = beautifiedCode.replace(re, umdWrapper)
  fs.writeFileSync(path.join(out, 'jweixin.js'), newCode, 'utf8')

  var newMin = Terser.minify(newCode).code;
  fs.writeFileSync(path.join(out, 'jweixin.min.js'), newMin, 'utf8')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
