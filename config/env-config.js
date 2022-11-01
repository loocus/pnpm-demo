const ORIGN_ENV = {
  __DEV__: process.env.NODE_ENV === 'development',
}

const ENV = Object.keys(ORIGN_ENV).reduce((env, key) => {
  // @ts-ignore
  env[key] = JSON.stringify(ORIGN_ENV[key]);
  return env;
}, {});

module.exports = {
  ORIGN_ENV,
  ENV
}