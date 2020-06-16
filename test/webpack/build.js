const webpack = require('webpack')
const path = require('path')
webpack({
  mode: 'development',
  entry: {
    bundle: [path.join(__dirname, 'index.js')],
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  target: 'web',
  node: false,
  devtool: 'none'
}, (err, stat) => {
  console.log(stat.toString({ colors: true }))
})
