import * as ns from '../..'
import defaultExport from '../..'
import cjs1 = require('../..')

import { assert } from '@tybys/denostd/dist/esm/std/testing/asserts'

const cjs2: typeof import('../..') = require('../..')

assert(typeof ns === 'object' && typeof ns.config === 'function', 'Error: import * as wx from ___')
assert(typeof Object.getOwnPropertyDescriptor(ns, 'config')!.get !== 'function', 'Error: export getters')
assert(typeof defaultExport === 'object' && typeof defaultExport.config === 'function', 'Error: import wx from ___')
assert(typeof cjs1 === 'object' && typeof cjs1.config === 'function', 'Error: import wx = require(___)')
assert(typeof cjs2 === 'object' && typeof cjs2.config === 'function', 'Error: const wx = require(___)')

if (typeof window !== 'undefined') {
  console.log('=============== CJS ===================')
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
  console.log('=============== CJS ===================\n\n')
}

