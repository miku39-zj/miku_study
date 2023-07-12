// 专门打包util库的  指令  hook
import { series, src, dest, parallel } from "gulp";
import { buildConfig } from "./utils/config";
import path from "path";
import { outDir, projectRoot } from "./utils/paths";
import ts from "gulp-typescript";
import { withTaskName } from "./utils";

export const buildPackages = (dirname: string, name: string) => {
  // 打包的格式 什么类型  模块规范 cjs  es模块
  // umd 浏览器使用

  // 可以用rollup
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const tsConfig = path.resolve(projectRoot, "tsconfig.json");
    const inputs = ["**/*.ts", "!gulpfile.ts", "!node_modules"];
    const output = path.resolve(dirname, config.output.name);
    return series(
      withTaskName(`build:${dirname}`, () => {
        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true, // 打包需要生成配置文件
              strict: false,
              module: config.module,
            })()
          )
          .pipe(dest(output));
      }),
      withTaskName(`copy:${dirname}`, () => {
        return src(`${output}/**`).pipe(
          dest(path.resolve(outDir, config.output.name, name))
        );
      })
    );
  });
  return parallel(...tasks);
};
