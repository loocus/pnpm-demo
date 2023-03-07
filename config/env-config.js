const { isDev, isProd } = require('./utils');

/**
 * 打包后实际要替换的环境变量
 */
const definePluginOptions = {
  __DEV__: isDev,
  __PROD__: isProd,
  __VUE_OPTIONS_API__: false,
  __VUE_PROD_DEVTOOLS__: false
};

/**
 * DefinePlugin 插件使用变量需要特殊转换
 */
module.exports = Object.keys(definePluginOptions).reduce((env, key) => {
  env[key] = JSON.stringify(definePluginOptions[key]);
  return env;
}, {});
