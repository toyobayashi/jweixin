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
  const beautifiedCode = beautify(sdkCode, { indent_size: 2, space_in_empty_paren: true })
  const re = /!\s*function\(\S{1},\s*\S{1}\)\s*\{(\r?\n)?(.+\r?\n)*\}\s*\(this,\s*/

  const umdWrapper = `!function (e, n) {
  if(typeof exports === 'object' && typeof module === 'object') {
    var mod = n(e);
    module.exports = mod;
    module.exports['default'] = mod;
  } else if(typeof define === 'function' && define.amd) {
    define(function () {
      return n(e);
    });
  } else if(typeof exports === 'object') {
    exports['wx'] = n(e);
  } else {
    if (!e['jWeixin']) {
      e['wx'] = e['jWeixin'] = n(e);
    }
  }
}(window, `

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
