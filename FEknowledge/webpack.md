# webpack

## 什么是webpack

webpack 的核心是用于现代 JavaScript 应用程序的**静态模块打包器**。 当 webpack 处理您的应用程序时，它会在内部构建一个**依赖关系图**，该图映射项目所需的每个模块并**生成一个或多个包**

## 核心概念

### Entry

入口起点(entry point)指示 webpack 应该使用哪个模块,来作为构建其内部依赖图的开始

### Output

输出

### Module

模块，在 Webpack 里一切皆模块,一个模块对应着一个文件。

### Chunk

代码块,一个 Chunk 由多个模块组合而成,用于代码合并与分割

### Loader

将所有类型的文件转换为 webpack 能够处理的有效模块

### Plugin

扩展插件

### Webpack配置

```js
//webpack.config.js
const path = require("path");
module.exports = {
    mode:'development', // 开发模式
    entry: { //入口
      main:path.resolve(__dirname,'../src/main.js'),
  	}, 
    output: { //出口
      filename: '[name].[hash:8].js',      // 打包后的文件名称
      path: path.resolve(__dirname,'../dist')  // 打包后的目录
    },
    module:{ //配置loader
      rules:[
        {
          test:/\.css$/,
          use:['style-loader','css-loader']  // 从右向左解析原则
        },
        {
          test:/\.less$/,
          use:['style-loader','css-loader','less-loader']  // 从右向左解析原则
        }
      ]
    }
    plugins:[ //插件
    ]
}
```

## 常见配置

打包HTML: 插件html-webpack-plugin

```
npm i html-webpack-plugin --save-dev
```

配置：

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};
```

清除打包文件夹： clean-webpack-plugin

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    plugins:[new CleanWebpackPlugin()]
}
```

引用css: style-loader  /  css-loader  /  less-loader

```
npm i -D style-loader css-loader
```

```
module.exports = {
    module:{
      rules:[
        {
          test:/\.css$/,
          use:['style-loader','css-loader'] // 从右向左解析原则
        },
        {
          test:/\.less$/,
          use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
        }
      ]
    }
} 
```

拆分css: mini-css-extract-plugin插件

```
npm i -D mini-css-extract-plugin
```

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  //...省略其他配置
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
           MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].css",
    })
  ]
}
```

打包图片、字体、媒体等文件：

`file-loader`就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中

`url-loader` 一般与`file-loader`搭配使用，功能与 file-loader 类似，如果文件小于限制的大小。

```js
module.exports = {
  // 省略其它配置 ...
  module: {
    rules: [
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
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
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  }
}
```

转义js文件：是js代码更兼容 babel-loader 、@babel/preset-env、 @babel/core

```
npm i -D babel-loader @babel/preset-env @babel/core
```

```js
// webpack.config.js
module.exports = {
    module:{
        rules:[
          {
            test:/\.js$/,
            use:{
              loader:'babel-loader', // 将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)
              options:{
                presets:['@babel/preset-env']
              }
            },
            exclude:/node_modules/
          },
       ]
    }
}
```

将 ES6/7/8 api(promise、Generator、Set、Maps、Proxy)转换为ES5语法: @babel/polyfill

```
npm i @babel/polyfill
```

```
// webpack.config.js
const path = require('path')
module.exports = {
    entry: ["@babel/polyfill",path.resolve(__dirname,'../src/index.js')],    // 入口文件
}
```

解析.vue文件：

`vue-loader` 用于解析`.vue`文件
`vue-template-compiler` 用于编译模板 配置如下

```
npm i -D vue-loader vue-template-compiler vue-style-loader
npm i -S vue
```

```js
const vueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    module:{
        rules:[{
            test:/\.vue$/,
            use:['vue-loader']
        },]
     },
    resolve:{
        alias:{
          'vue$':'vue/dist/vue.runtime.esm.js',
          ' @':path.resolve(__dirname,'../src')
        },
        extensions:['*','.js','.json','.vue']
   },
   plugins:[
        new vueLoaderPlugin()
   ]
}
```

配置热更新： webpack-dev-server

```
npm i -D webpack-dev-server
```

```js
const Webpack = require('webpack')
module.exports = {
  // ...省略其他配置
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ]
}
```



## 优化

