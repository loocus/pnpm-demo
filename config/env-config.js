const { isDev, isProd } = require('./utils');

/**
 * 打包后实际要替换的环境变量
 */
const rawPluginOptions = {
  __DEV__: isDev,
  __PROD__: isProd
};

const stringifyOptions = (rawPluginOptions) => {
  return Object.keys(rawPluginOptions).reduce((env, key) => {
    env[key] = JSON.stringify(rawPluginOptions[key]);
    return env;
  }, {});
}

exports.rawPluginOptions = rawPluginOptions;

exports.stringifyOptions = stringifyOptions;

/**
 * DefinePlugin 插件使用变量需要特殊转换
 */
exports.default = stringifyOptions(rawPluginOptions);
