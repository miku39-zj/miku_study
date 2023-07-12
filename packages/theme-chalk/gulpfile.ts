// 打包样式

import { series, src, dest } from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import GulpCleanCss from "gulp-clean-css";
import path from "path";

async function compile() {
  const sass = gulpSass(dartSass);

  return src(path.resolve(__dirname, "./src/**/*.scss"))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(GulpCleanCss())
    .pipe(dest("./dist/css"));
}

function copyfont() {
  return src(path.resolve(__dirname, "./src/fonts/**"))
    .pipe(GulpCleanCss())
    .pipe(dest("./dist/fonts"));
}

function copyfullStyle() {
  return src(path.resolve(__dirname, "./dist/**")).pipe(
    dest(path.resolve(__dirname, "../../dist/themem-chalk"))
  );
}

export default series(compile, copyfont, copyfullStyle);
