import * as ns from '../..'
import defaultExport from '../..'
import cjs1 = require('../..')
var cjs2 = require('../..')

console.log('import wx1 = require(___)')
console.log(cjs1)
console.log('const wx2 = require(___)')
console.log(cjs2)
console.log('wx1 === wx2')
console.log(cjs1 === cjs2)
console.log('import * as wx from ___')
console.log(ns)
console.log('import wx from ___')
console.log(defaultExport)
