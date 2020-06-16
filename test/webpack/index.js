import * as ns from '../..'
import defaultExport from '../..'
var cjs = require('../..')

console.log('const wx = require(___)')
console.log(cjs)
console.log('import * as wx from ___')
console.log(ns)
console.log('import wx from ___')
console.log(defaultExport)
