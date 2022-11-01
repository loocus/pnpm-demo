const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const webpackConfig = require('../build/webpack.config').default;

const cwd = process.cwd();
const packageRoots = [
  'packages/core',
  'packages/utils'
];

const build = (dir) => {
  const complier = webpack(merge(webpackConfig, {
    entry: resolve(dir, 'index.ts'),
    output: {
      path: resolve(dir, 'dist'),
      filename: 'index.js',
    }
  }));

  complier.run((err, stats) => {
    if (err) {
      // console.error(err);
      return;
    }

    // console.log(stats?.toString({
    //   chunks: false,
    //   colors: true
    // }))
  });
};

packageRoots.forEach(packageRoot => {
  build(resolve(cwd, packageRoot));
});
