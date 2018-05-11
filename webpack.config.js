const path = require ('path');
const webpack = require('webpack');

const BUILD_DIR = path.join(__dirname, '/client/public');
const APP_DIR = path.join(__dirname, '/client');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?/,
        use: [
          {
            loader: 'babel-loader',
             query: {
               presets: ['react', 'es2015']
             }
          }
        ]
      }
    ]
  }
}
