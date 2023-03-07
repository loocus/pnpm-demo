const fs = require('fs');
const { resolve } = require('path');
const cwd = process.cwd();

/**
 * 是否是开发环境
 */
exports.isDev = process.env.NODE_ENV === 'development';

/**
 * 是否是生产环境
 */
exports.isProd = process.env.NODE_ENV === 'production';

/**
 * 打包产物的模块类型
 */
exports.LIB_TYPE = process.env.LIB_TYPE;

/**
 * 需要排除的构建目标
 */
const excludes = [];

/**
 * 需要构建的包
 */
const directoryList = fs.readdirSync(resolve(cwd, 'packages'))
  .filter(file =>
    fs.statSync(resolve(cwd, `packages/${file}`)).isDirectory() && !excludes.includes(file)
  );


/**
 * 并行执行
 * @param max 最大并行数
 * @param targets 执行目标（包目录）
 * @param executor 执行器
 */
exports.runParallel = async (max, targets, executor) => {
  const executing = [];
  const taskList = [];

  for (const target of targets) {
    const task = Promise.resolve().then(() => executor(target));
    taskList.push(task);

    if (targets.length > max) {
      const exe = task.then(() => executing.splice(executing.indexOf(exe), 1));
      executing.push(exe);

      if (executing.length >= max) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(taskList);
};

exports.allTargets = directoryList

