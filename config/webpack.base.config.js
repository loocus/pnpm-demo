const { DefinePlugin, ProgressPlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { resolve } = require('path');
const readLine = require('readline');
const { isDev, isProd } = require('./utils');

const definePluginOptions = require('./env-config');

exports.default = {
  mode: isProd ? 'production' : 'development',
  cache: isDev
  ? ({
      type: 'filesystem',
    })
  : false,
  output: {
    clean: true,
    pathinfo: false
  },
  devtool: isDev ? 'eval-source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-typescript",
                {
                  allExtensions: true, //支持所有文件扩展名
                },
              ],
            ]
          },
        },
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@pnpm-demo/utils': resolve(__dirname, '../packages/utils/src')
    }
  },
  optimization: {
    // runtimeChunk: true,
    providedExports: true,
    usedExports: true,
    sideEffects: true,
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new DefinePlugin(definePluginOptions),
    // new ForkTsCheckerWebpackPlugin()
    // new ProgressPlugin({
    //   activeModules: false,
    //   entries: true,
    //   handler(percentage, message, ...args) {
    //     // process.stdout.clearScreenDown()
    //     // readLine.cursorTo(process.stdout, 0, 0);
    //     // readLine.clearLine(process.stdout, 0);
    //     // readLine.clearScreenDown(process.stdout);
    //     // process.stdout.write(
    //     //   `${message}-${(percentage * 100).toFixed(2)}%\n`
    //     // );
    //   },
    //   modules: true,
    //   modulesCount: 5000,
    //   profile: false,
    //   dependencies: true,
    //   dependenciesCount: 10000,
    //   percentBy: null
    // }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      exclude: ['node_modules', '**/node_modules'],
      fix: true
    }),
    // new BundleAnalyzerPlugin()
  ],
  watchOptions: {
    ignored: '**/node_modules'
  }
};
