const utils = require('../config/utils');
const os = require('os');
const execa = require('execa');
const args = process.argv.slice(2);

const build = async target => {
  const pkgDir = `packages/${target}`;

  console.time(pkgDir);
  await execa('webpack-cli', [`--config=${pkgDir}/webpack.config.js`], {
    stdio: 'inherit'
  });
  console.timeEnd(pkgDir);
};

(async () => {
  console.time('构建所有模块花费时间为');
  await utils.runParallel(
    os.cpus().length,
    args.length > 0
      ? args.filter(arg => utils.allTargets.includes(arg))
      : utils.allTargets,
    build
  );
  console.timeEnd('构建所有模块花费时间为');
})();
