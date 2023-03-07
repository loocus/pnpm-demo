const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../packages/core/webpack.config').default;

const devServerConfig =   {
  hot: true,
  port: 8080,
  open: true
};

const complier = webpack(webpackConfig);

const devServer = new WebpackDevServer(devServerConfig, complier);

const start = () => {
  devServer.start();
}

start();
