/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      dgram: false,
      fs: false,
      net: false,
      tls: false,
      child_process: false
    }
  },
  devServer: {
    contentBase: './dist',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  }
};