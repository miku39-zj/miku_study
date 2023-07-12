import { series, parallel } from "gulp";
import { run, withTaskName } from "./utils";

// 1.打包样式  2.打包工具方法 2.打包所有组件  3.打包每个组件 4.生成一个组件库  5. 发布组件
export default series(
  withTaskName("clean", async () => {
    run("rmdir dist"); // rm -rf
  }),
  withTaskName("buildPackges", async () => {
    run("pnpm run --filter ./packages/** --parallel build");
  })
);
