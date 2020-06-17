describe('Test module export', function () {
  it('js', function () {
    require('./webpack/bundle.js')
  })

  it('target: commonjs', function () {
    require('./webpack/bundle.cjs.js')
  })

  it('target: esnext', function () {
    require('./webpack/bundle.esm.js')
  })
})
