const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const Icons = require('unplugin-icons/webpack');
const IconsResolver = require('unplugin-icons/resolver');
const { merge } = require('webpack-merge');
const path = require('path');
const { isDev, isProd } = require('../../config/utils');
const baseConfig = require('../../config/webpack.base.config').default;
const definePluginOptions = require('./env-config').default;
const { version: vueVersion } = require('vue');
const { version: elementPlusversion } = require('element-plus');

exports.default = merge(baseConfig, {
  context: __dirname,
  entry: [path.resolve(__dirname, 'src/main.ts')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[id].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: {
    providedExports: true,
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]@vue[\\/]/,
          name: `vue_${vueVersion}`,
          chunks: 'all'
        },
        element: {
          test: /[\\/]node_modules[\\/]element-(plus|ui)[\\/]es[\\/]\.mjs$/,
          name: `element-plus_${elementPlusversion}`,
          chunks: 'all'
        },
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
        sideEffects: true,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              additionalData: `@use '~@/scss/global.scss' as *;`
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext]'
        }
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new DefinePlugin(definePluginOptions),
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
      imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
      dts: path.resolve(__dirname, 'types/auto-imports.d.ts'),
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      eslintrc: {
        enabled: isProd,
        filepath: path.resolve(__dirname, '.eslintrc-auto-import.json'),
        globalsPropValue: true
      }
    }),
    Components({
      dts: path.resolve(__dirname, 'types/components.d.ts'),
      /**
       * 相对于 process.cwd() 的组件路径
       */
      dirs: [
        'packages/core/src/components',
        'packages/core/src/layout',
        'packages/core/src/pages'
      ],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep', 'material-symbols', 'mdi'],
        }),
      ]
    }),
    Icons({
      autoInstall: false,
    })
  ]
});