import * as ns from '../..'
import defaultExport from '../..'
import { assert } from '@tybys/denostd/dist/esm/std/testing/asserts'

const cjs: typeof import('../..') = require('../..')

assert(typeof ns === 'object' && typeof ns.config === 'function', 'Error: import * as wx from ___')
assert(typeof Object.getOwnPropertyDescriptor(ns, 'config')!.get !== 'function', 'Error: export getters')
assert(typeof defaultExport === 'object' && typeof defaultExport.config === 'function', 'Error: import wx from ___')
assert(typeof cjs === 'object' && typeof cjs.config === 'function', 'Error: const wx = require(___)')

if (typeof window !== 'undefined') {
  console.log('=============== ESM ===================')
  console.log('const wx = require(___)')
  console.log(cjs)
  console.log('import * as wx from ___')
  console.log(ns)
  console.log('import wx from ___')
  console.log(defaultExport)
  console.log('=============== ESM ===================\n\n')
}

