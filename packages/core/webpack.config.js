const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const baseConfig = require('../../config/webpack.base.config').default;
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const { merge } = require('webpack-merge');
const path = require('path');
const { isDev, isProd } = require('../../config/utils');
const { version: vueVersion } = require('vue');
const { version: elementPlusversion } = require('element-plus')

exports.default = merge(baseConfig, {
  entry: [path.resolve(__dirname, 'src/main.ts')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[id].js'
  },
  resolve: {
    alias: {
      '@components': 'src/components',
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]@vue[\\/]/,
          name: `vue_${vueVersion}`,
          chunks: 'all'
        },
        element: {
          test: /[\\/]node_modules[\\/]element-(plus|ui)[\\/]/,
          name: `element_${elementPlusversion}`,
          chunks: 'all'
        }
      }
    }
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          reactivityTransform: true,
          hotReload: true
        }
      },
      {
        test: /\.s?css$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new WebpackManifestPlugin({
      filter: desc => !/\.d.ts/.test(desc.name)
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    AutoImport({
      imports: ['vue'],
      dts: path.resolve(__dirname, 'auto-imports.d.ts'),
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false,
      }
    }),
    Components({
      dts: path.resolve(__dirname, 'components.d.ts'),
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false,
      }
    })
  ]
});
