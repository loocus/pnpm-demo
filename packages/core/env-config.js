
const { stringifyOptions, rawPluginOptions } = require('../../config/env-config');

const options = {
  development: {
    __SERVER__: '/'
  },
  production: {
    __SERVER__: '/'
  }
}

exports.default = stringifyOptions({
  ...rawPluginOptions,
  // vue 构建配置参数
  __VUE_OPTIONS_API__: false,
  __VUE_PROD_DEVTOOLS__: false,
  // vue-i18n 构建配置参数
  __VUE_I18N_FULL_INSTALL__: true,
  __VUE_I18N_LEGACY_API__: true,
  __INTLIFY_PROD_DEVTOOLS__: false,
  // 是否开启 mock
  __MOCK__: JSON.parse(process.env.__MOCK__),
  ...options[process.env.NODE_ENV]
})