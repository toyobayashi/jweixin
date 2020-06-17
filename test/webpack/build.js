const webpack = require('webpack')
const path = require('path')

webpack({
  mode: 'development',
  entry: {
    bundle: [path.join(__dirname, 'index.js')]
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  devtool: 'none'
}, (err, stat) => {
  console.log(stat.toString({ colors: true }))
})

webpack({
  mode: 'development',
  entry: {
    'bundle.cjs': [path.join(__dirname, 'index.cjs.ts')]
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
            strict: true,
            module: 'commonjs',
            target: 'es5',
            moduleResolution: 'node',
            esModuleInterop: true
          }
        }
      }
    ]
  },
  devtool: 'none'
}, (err, stat) => {
  console.log(stat.toString({ colors: true }))
})

webpack({
  mode: 'development',
  entry: {
    'bundle.esm': [path.join(__dirname, 'index.esm.ts')]
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
            strict: true,
            module: 'esnext',
            target: 'es5',
            moduleResolution: 'node',
            allowSyntheticDefaultImports: true
          }
        }
      }
    ]
  },
  devtool: 'none'
}, (err, stat) => {
  console.log(stat.toString({ colors: true }))
})
