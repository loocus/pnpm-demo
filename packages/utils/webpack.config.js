const { merge } = require('webpack-merge');
const path = require('path');
const baseConfig = require('../../config/webpack.base.config').default;
const { isDev, isProd, LIB_TYPE } = require('../../config/utils');

exports.default = merge(baseConfig, {
  entry: path.resolve(__dirname, 'src/index.ts'),
  experiments: {
    outputModule: LIB_TYPE === 'module',
  },
  output: {
    path: path.resolve(__dirname, LIB_TYPE === 'module' ? 'dist/esm' : 'dist/cjs'),
    filename: LIB_TYPE === 'module' ? 'utils.esm.js' : 'utils.js',
    library: {
      type: LIB_TYPE
    }
  },
  plugins: []
});