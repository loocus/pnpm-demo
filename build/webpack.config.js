const { DefinePlugin } = require('webpack');
const { ENV, ORIGN_ENV } = require('../config/env-config');

exports.default = {
  mode: ORIGN_ENV.NODE_ENV,
  output: {
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-typescript',
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      ...ENV
    })
  ]
};