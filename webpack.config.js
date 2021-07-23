/*
 * @Description: 
 */
// webpack-dev-server 热更新部署

// 一 、优化打包速度
// 1. mode可设置development production两个参数
// 如果没有设置，webpack4 会将 mode 的默认值设置为 production 
// production模式下会进行tree shaking(去除无用代码)和uglifyjs(代码压缩混淆）

// 2. 缩小文件的搜索范围(配置include exclude alias noParse extensions)
// alias: 当我们代码中出现 import 'vue'时， webpack会采用向上递归搜索的方式去node_modules 目录下找。
// 为了减少搜索范围我们可以直接告诉webpack去哪个路径下查找。也就是别名(alias)的配置。
// include exclude 同样配置include exclude也可以减少webpack loader的搜索转换时间。exclude: /node_modules/
// noParse  当我们代码中使用到import jq from 'jquery'时，webpack会去解析jq这个库是否有依赖其他的包。增加noParse属性,告诉webpack不必解析，以此增加打包速度。
// extensions webpack会根据extensions定义的后缀查找文件(频率较高的文件类型优先写在前面)

// 3 使用HappyPack开启多进程Loader转换
// 耗费时间大多数用在loader解析转换以及代码的压缩中
// HappyPack的基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

// 4 使用webpack-parallel-uglify-plugin 增强代码压缩 优化代码的压缩时间
const ParalleUglifyPlugin = require('webpack-parallel-uglify-plugin')

// 5 抽离第三方模块
// 每次更改我本地代码的文件的时候，webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库
// 使用webpack内置的DllPlugin DllReferencePlugin进行抽离

// 6 配置缓存
// 前大部分 loader 都提供了cache 配置项。比如在 babel-loader 中，可以通过设置cacheDirectory 来开启缓存
// npm i -D cache-loader


// 二 、 优化打包文件体积
// webpack-bundle-analyzer 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Externals的方式，将这些不需要打包的静态资源从构建逻辑中剔除出去
// externals: {
//   jquery: 'jQuery'
// }

// Tree-shaking 主要作用是用来清除代码中无用的部分

// copy-webpack-plugin 拷贝静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path');
const Webpack = require('webpack')
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
const vueLoaderPlugin = require('vue-loader/lib/plugin');



module.exports = {
  mode: 'production',
  entry: ["@babel/polyfill", path.resolve(__dirname, './src/main.js')], //入口文件
  output: {
    // filename: 'output.js', //打包文件
    filename: '[name].[hash:8].js', //打包后的文件名称
    path: path.resolve(__dirname, './dist') //打包后目录
  },
  module: { //module.rules 配置loader
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
      },
      {
        test: /\.js$/,
        use: [{
          loader: "happypack/loader?id=happyBabel"
        }],
        exclude: /node_modules/
      },
      {
        test: /\.ext$/,
        use: ['cache-loader', 'babel-loader'],
        include: path.resolve('src'),
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  plugins: [ //插件  webpack 插件是一个具有 apply 方法的 JavaScript 对象  通过require('html-webpack-plugin')
    // new BundleAnalyzerPlugin(),
    new Webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'static',
        to: 'static'
      }]
    }),
    new HappyPack({
      id: 'happyBabel', // 与loader对应的id标识
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env']
          ],
          cacheDirectory: true
        }
      }],
      threadPool: happyThreadPool //共享进程池
    }),
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
  // optimization: {
  //   minimizer: [
  //     new ParalleUglifyPlugin({
  //       cacheDir: '.cache/',
  //       uglifyJS: {
  //         output: {
  //           comments: false,
  //           beautify: false
  //         },
  //         compress: {
  //           drop_console: true,
  //           collapse_vars: true,
  //           reduce_vars: true
  //         }
  //       }
  //     })
  //   ]
  // },
  devServer: {
    port: 3000,
    hot: true,
    contentBase: './dist'
  }
}