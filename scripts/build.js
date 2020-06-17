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
  const re = /!\s*function\(\S{1},\s*\S{1}\)\s*\{(\r?\n)?(.+\r?\n)*\}\s*\(this,/

  const umdWrapper = `${fs.readFileSync(path.join(__dirname, 'wrapper.js'), 'utf8')}(${fs.readFileSync(path.join(__dirname, 'global.js'), 'utf8')},`

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
