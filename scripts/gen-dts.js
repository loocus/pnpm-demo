const utils = require('../config/utils');
const execa = require('execa');
const fs = require('fs-extra');
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');
const path = require('path');
const args = process.argv.slice(2);
const cwd = process.cwd();

/**
 * 为所有目标生成对应 d.ts 声明文件
 * @param {*} targets
 */
const executor = async targets => {
  const typesDir = `packages/types`;

  console.time('tsc completed');
  await execa(
    'tsc',
    [
      '--declaration',
      '--emitDeclarationOnly',
      `--declarationDir`,
      `./packages/types`
    ],
    {
      stdio: 'inherit'
    }
  );
  console.timeEnd('tsc completed');

  const mergeDTS = async target => {
    const pkgDir = `packages/${target}`;
    const extractorConfigPath = path.resolve(cwd, `api-extractor.json`);

    if (await fs.exists(extractorConfigPath)) {
      const extractorConfig =
        ExtractorConfig.loadFileAndPrepare(extractorConfigPath);

      if (await fs.exists(`${typesDir}/index.d.ts`)) {
        extractorConfig.mainEntryPointFilePath = path.resolve(cwd, `${typesDir}/index.d.ts`);
      } else {
        extractorConfig.mainEntryPointFilePath = path.resolve(cwd, `${typesDir}/${target}/src/index.d.ts`);
      }

      extractorConfig.publicTrimmedFilePath = path.resolve(cwd, `${pkgDir}/dist/${target}.d.ts`)

      console.log(`开始生成 ${pkgDir} 包的 t.ds 文件`);
      const extractorResult = Extractor.invoke(extractorConfig, {
        localBuild: true,
        showVerboseMessages: true
      });

      if (extractorResult.errorCount > 0) {
        process.exitCode = 1;
      }
    }
  }

  targets.forEach(async target => mergeDTS(target));

  await fs.remove(typesDir);
};

executor(
  args.length > 0
    ? args.filter(arg => utils.allTargets.includes(arg))
    : utils.allTargets
);
