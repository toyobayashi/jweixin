const webpack = require('webpack')
const path = require('path')
webpack({
  mode: 'development',
  entry: {
    bundle: [path.join(__dirname, 'index.ts')],
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            module: 'commonjs',
            target: 'es5',
            moduleResolution: 'node',
            esModuleInterop: true
          }
        }
      }
    ]
  },
  target: 'web',
  node: false,
  devtool: 'none'
}, (err, stat) => {
  console.log(stat.toString({ colors: true }))
})
