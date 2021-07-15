/*
 * @Description: 
 */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'), //入口文件
  output: {
    filename: 'output.js', //打包文件
    path: path.resolve(__dirname, './dist') //打包后目录
  }
}