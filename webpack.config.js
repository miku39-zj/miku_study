/*
 * @Description: 
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// clean-webpack-plugin:每次执行npm run build打包输出前清空文件夹
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

//为css添加浏览器前缀 postcss-loader autoprefixer(插件) 

// mini-css-extract-plugin 拆分打包css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// file-loader就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中

// 用babel转义js文件babel-loader @babel/preset-env @babel/core
// babel-polyfill,es6的新的api promise/map等 转换成es5

// vue-loader 用于解析.vue文件
// vue-template-compiler 用于编译模板 配置如下
const vueLoaderPlugin = require('vue-loader/lib/plugin')

// webpack-dev-server 热更新部署

const Webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: ["@babel/polyfill",path.resolve(__dirname, './src/main.js')], //入口文件
  output: {
    // filename: 'output.js', //打包文件
    filename: '[name].[hash:8].js', //打包后的文件名称
    path: path.resolve(__dirname, './dist') //打包后目录
  },
  module: {
    rules: [{
        test: /\.css$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //打包图片
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      },
      { 
        test: /\.js$/,
        use: {
          loader: 'babel-loader', //将es6/7/8 转换成 es5, 不会对新的api转换，例如map
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname,'./src')
    },
    extensions:['*','.js','.json','.vue']
  },
  plugins: [
    new vueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(),
    require('autoprefixer'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      // chunks: ['main']
    }),
    // new HtmlWebpackPlugin({ 多入口
    //   template: path.resolve(__dirname, './src/header.html'),
    //   filename: 'header.html',
    //   chunks: ['header']
    // }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    contentBase: './dist'
  }
}