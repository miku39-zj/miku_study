/*
 * @Description: 
 */

// 5 抽离第三方模块
// 每次更改我本地代码的文件的时候，webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库
// 使用webpack内置的DllPlugin DllReferencePlugin进行抽离
const path = require("path");
const webpack = require("webpack")

module.exports = {
  entry: {
    // vendor: ['vue', 'element-ui']
    vendor: ['vue']
  },
  output: {
    path: path.resolve(__dirname, 'static'), //打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library',
    // 需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname,'[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}