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

### Reslove

解析，Resolve 配置 Webpack 如何寻找模块所对应的文件

resolve 流程开始的入口在 factory 阶段，factory 事件会触发 NormalModuleFactory 中的函数

NormalModuleFactory 中注册了 resolver 事件

```js
// Webpack alias 配置
resolve:{
  alias:{
    components: './src/components/'
  }
}
```

当你通过 `import Button from 'components/button'` 导入时，实际上被 `alias` 等价替换成了 `import Button from './src/components/button'`。

### Chunk

代码块,一个 Chunk 由多个模块组合而成,用于代码合并与分割

### Loader

模块转换器，将所有类型的文件转换为 webpack 能够处理的有效模块,运行时机，Loader运行在打包文件之前

常见Loader:

- `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文
- `babel-loader`：把 ES6 转换成 ES5
- `css-loader`：加载 CSS，支持模块化、压缩、文件导入等特性
- `style-loader`：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- `vue-loader`：加载 Vue.js 单文件组件

### Plugin

扩展插件，插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量，plugin在整个编译周期都起作用

常见Plugin:

- `ignore-plugin`：忽略部分文件
- `html-webpack-plugin`：简化 HTML 文件创建 (依赖于 html-loader)
- `terser-webpack-plugin`: 支持压缩 ES6 (Webpack4)
- `mini-css-extract-plugin`: 分离样式文件，CSS 提取为独立文件，支持按需加载
- `webpack-bundle-analyzer`: 可视化 Webpack 输出文件的体积

### mode

模式：

1. `development`
2. `production`
3. `none`

```js
module.exports = {
  mode: 'development',
  //mode: 'production',
};
```

### optimization

优化，optimization 用于自定义 webpack 的内置优化配置，一般用于生产模式提升性能，常用配置项如下：

- minimize：是否需要压缩 bundle；
- minimizer：配置压缩工具，如 TerserPlugin、OptimizeCSSAssetsPlugin；
- splitChunks：拆分 bundle；
- runtimeChunk：是否需要将所有生成 chunk 之间共享的运行时文件拆分出来。

```js
module.exports = {
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // 重复打包问题
      cacheGroups:{
        vendors:{ //node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: 'vendors', //chunks name
          priority: 10, //优先级
          enforce: true 
        }
      }
    },
  },
}
```

### watch

webpack 可以监听文件变化

[webpack-dev-server](https://github.com/webpack/webpack-dev-server) 和 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 里 Watch 模式默认开启。

### webpack-dev-server  

webpack 将我们的项目源代码进行编译打包成可分发上线的静态资源，在开发阶段我们想要预览页面效果的话就需要启动一个服务器伺服 webpack 编译出来的静态资源，webpack-dev-server 就是用来启动 webpack 编译、伺服这些静态资源，

提供了liveReload的功能，就是在一次 webpack 编译完成后浏览器端就能自动刷新页面读取最新的编译后资源

提供了 hot 选项开启 hotReload，相对于 liveReload, hotReload 不刷新整个页面，只更新被更改过的模块

 配置使用 devServer 

 devServer 会启动一个 HTTP 服务器用于服务网页请求

 开发服务器，用来自动化 （自动编译， 自动打开浏览器， 热部署），contentBase配置 DevServer HTTP 服务器的文件根目录。 默认情况下为当前执行目录，通常是项目根目录

```js
var path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'public'), //告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。
    compress: true, //为每个静态文件开启 gzip compression：
    headers: { //为所有请求添加响应标头：
      'X-Custom-Foo': 'bar',
    },
    host: '0.0.0.0', //指定要使用的 host
    hot: true, //热部署
    open: true/'Google Chrome', //服务器启动后打开浏览器
    port: 8080, //指定端口号
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ]
};
```

原理：

webpack-dev-server启动了一个**使用express的Http服务器**，这个服务器与客户端采用websocket通信协议，当原始文件发生改变，webpack-dev-server会实时编译。

这里注意两点:

1.webpack-dev-server伺服的是资源文件，不会对index.html的修改做出反应

2.webpack-dev-server生成的文件在内存中，因此不会呈现于目录中，生成路径由content-base指定，不会输出到output目录中。

3.默认情况下: webpack-dev-server会在content-base路径下寻找index.html作为首页

### webpack-dev-middleware

`webpack-dev-middleware` 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。`webpack-dev-server` 在内部使用了它

## Devtool

`devtool` 配置 Webpack 如何生成 Source Map，默认值是 `false` 即不生成 Source Map

```js
module.export = {
  devtool: 'source-map'
}
```

sourceMap：是一项将编译、打包、压缩后的代码映射回源代码的技术

## Externals

Externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块

## webpack工作流程

![71b263000fa](D:\图片\71b263000fa.jpg)

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数
2. 开始编译：用参数初始化Compiler对象，加载所有所有配置插件( 依次调用插件的 apply 方法，让插件可以监听后续的所有事件节点)，执行Compiler对象的run方法开始编译
3. 确定入口： 根据entry找出所有入口文件
4. 编译模块：调用配置loader对模块进行翻译转换
5. 遍历 AST，收集依赖：对 模块进行转换后，再解析出当前 模块依赖的 模块
6. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk，再把所有 Chunk 转换成文件输出

Webpack 的构建流程可以分为以下三大阶段：

1. 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
2. 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
3. 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

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

## Loader工作流程

`loader`从本质上来说其实就是一个`node`模块，根据我们设置的规则，经过它的一系列加工后还给我们加工好code

工作流程：

1. webpack.config.js 里配置了一个 模块 的 Loader；
2. 遇到 相应模块 文件时，触发了 该模块的 loader;
3. loader 接受了一个表示该 模块 文件内容的 source;
4. loader 使用 webapck 提供的一系列 api 对 source 进行转换，得到一个 result;
5. 将 result 返回或者传递给下一个 Loader，直到处理完毕。

原则：

- 单一原则: 每个 `Loader` 只做一件事；
- 链式调用: `Webpack` 会按顺序链式调用每个 `Loader`；
- 统一原则: 遵循 `Webpack` 制定的设计规则和结构，输入与输出均为字符串，各个 `Loader` 完全独立

Loader编写

```js
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')
module.exports = function(source) {
  // source 为 compiler 传递给 Loader 的一个文件的原内容
  // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换
    
  // 关闭该 Loader 的缓存功能
  this.cacheable(false);
  const ast = parser.parse(source,{ sourceType: 'module'})
  traverse(ast,{
    CallExpression(path){ 
      if(t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object, {name: "console"})){
        path.remove()
      }
    }
  })
  const output = generator(ast, {}, source);
  return output.code
};
```

## Plugin

`plugin`则是针对整个流程执行广泛的任务。

webpack 在编译过代码程中，会触发一系列 钩子事件，插件所做的，Plugin 可以监听这些事，当 webpack 构建的时候，通过 Webpack 提供的 API 改变输出结果

### plugin插件结构

```js
class firstPlugin {
  constructor (options) {
    console.log('firstPlugin options', options)
  }
  apply (compiler) {
    compiler.plugin('done', compilation => {
      console.log('firstPlugin')
      compilation.hooks.someHook.tap(...)
    ))
  }
}

module.exports = firstPlugin
```

Webpack 启动后,在读取配置的过程会初始化插件实例。在初始化 compiler 对象后，再调用插件的apply方法，给插件实例传入 compiler 对象

插件实例在获取到 compiler 对象后，就可以通过 `compiler.plugin(事件名称, 回调函数)` 监听到webpack的钩子事件

- emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改(emit 事件是修改 Webpack 输出资源的最后时机)
- watch-run 当依赖的文件发生变化时会触发

### compiler和compilation

compiler 对象是 webpack 的编译器对象，compiler 对象会在启动 webpack 的时候被一次性地初始化，compiler 对象中包含了所有 webpack 可自定义操作的配置，例如 loader 的配置，plugin 的配置，entry 的配置等各种原始 webpack 配置等

compilation 实例继承于 compiler，compilation 对象代表了一次单一的版本 webpack 构建和生成编译资源的过程。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源以及新的 compilation 对象。一个 compilation 对象包含了 当前的模块资源、编译生成资源、变化的文件、以及 被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。

- Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例
- Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。在构建的过程中，每次构建都会产生一次`Compilation，Compilation` 则是构建周期的产物。`Compilation` 是通过 `Compiler`创建的实例

- compiler 暴露了和 Webpack 整个生命周期相关的钩子
- compilation 暴露了与模块和依赖有关的粒度更小的事件钩子

Compiler 和 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。

## devServer

devServer: 开发服务器，用来自动化 （自动编译， 自动打开浏览器， 热部署）

特点： 只会在内存中编译打包，不会有任何输出

启动devServe指令为： webpack-dev-server

HMR： hot modul replacement 热模块替换

样式文件： 可以使用HMR功能

js文件： 默认不能使用HMR功能

html文件： 默认不能使用HMR功能

```js
devServer: {
	contentBase: resolve(__dirname, 'build') // 需要运行的目录
    compress: true, //启动gzip压缩
    port: 300, // 端口号
    open: true //自动打开浏览器
    hot: true //热部署  HMR
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

## HMR(Hot Module Replacement)原理  ??????

[webpack-dev-server](https://github.com/webpack/webpack-dev-server) 和 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 里 Watch 模式默认开启。

调用 Watch 方法监听文件变更，当文件发生变化，重新编译，编译完成之后继续监听

Webpack 编译打包之后得到一个 Compilation ，并将 Compilation 传递到 Webpack-dev-middleware 插件中，Webpack-dev-middleware 可以通过 Compilation 调用 Webpack中 的 Watch 方法实时监控文件变化，并重新编译打包写入内存

**第一步：**webpack-dev-middleware 调用 webpack 的 api 对文件系统 watch，当 hello.js 文件发生改变后，webpack 重新对文件进行编译打包，然后保存到内存中

**第二步:** devServer 通知浏览器端文件发生改变

[sockjs](https://link.zhihu.com/?target=https%3A//github.com/sockjs/sockjs-client) 是服务端和浏览器端之间的桥梁，在启动 devServer 的时候，sockjs 在服务端和浏览器端建立了一个 webSocket 长连接，以便将 webpack 编译和打包的各个阶段状态告知浏览器，最关键的步骤还是 webpack-dev-server 调用 webpack api 监听 compile的 `done` 事件，当compile 完成后，webpack-dev-server通过 `_sendStatus` 方法将编译打包后的新模块 hash 值发送到浏览器端

**第三步：**webpack-dev-server/client 接收到服务端消息做出响应

**第四步：**webpack 接收到最新 hash 值验证并请求模块代码

**第五步：**HotModuleReplacement.runtime 对模块进行热更新

```js
const webpack = require('webpack');
module.exports = {
    //....
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //热更新插件
    ]
}
```

基于 `WDS (Webpack-dev-server)` 的模块热替换

通过 HotModuleReplacementPlugin 或 --hot 开启

叫热更新，可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

### 服务端主要分为四个关键点

- 通过webpack创建compiler实例，webpack在watch模式下编译

  - compiler实例：监听本地文件的变化、文件改变自动编译、编译输出
  - 更改config中的entry属性：将lib/client/index.js、lib/client/hot/dev-server.js注入到打包输出的chunk文件中
  - 往compiler.hooks.done钩子（webpack编译完成后触发）注册事件：里面会向客户端发射`hash`和`ok`事件

- 调用webpack-dev-middleware：启动编译、设置文件为内存文件系统、里面有一个中间件负责返回编译的文件

- 创建webserver静态服务器：让浏览器可以请求编译生成的静态资源

- 创建websocket服务：建立本地服务和浏览器的双向通信；每当有新的编译，立马告知浏览器执行热更新逻辑

### 客户端主要分为两个关键点

- 创建一个 websocket客户端 连接 websocket服务端，websocket客户端监听 `hash` 和 `ok` 事件
- 主要的热更新客户端实现逻辑，浏览器会接收服务器端推送的消息，如果需要热更新，浏览器发起http请求去服务器端获取新的模块资源解析并局部刷新页面（这本是HotModuleReplacementPlugin帮我们做了，他将HMR 运行时代码注入到chunk中了，但是我会带大家实现这个 `HMR runtime`）

**HotModuleReplacementPlugin做了哪些事**

1. 生成**两个补丁文件**
   上一次编译生成的JSON文件
   上一次编译生成的JS文件
2. **在chunk文件中注入HMR runtime运行时代码**：我们的热更新客户端主要逻辑（`拉取新模块代码`、`执行新模块代码`、`执行accept的回调实现局部更新`）都是这个插件 把函数 注入到我们的chunk文件中

## 文件指纹是什么

文件指纹是打包后输出的文件名的后缀。

`Hash`：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改

`Chunkhash`：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash

`Contenthash`：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变


js的文件指纹，output的filename设置 chunkhash

css的文件指纹，设置MIniExtractPlugin的filename,用contenthash

图片：设置file-loader的name，使用hash。

## Tapable

Tapable 是 webpack 项目组的一个内部库，主要是抽象了一套插件机制。它类似于 NodeJS 的 EventEmitter 类，专注于自定义事件的触发和操作

webpack 整个编译过程中暴露出来大量的 Hook 供内部/外部插件使用,

 Tapable 提供了很多类型的 Hook

- **BasicHook**: 执行每一个，不关心函数的返回值，有 SyncHook、AsyncParallelHook、AsyncSeriesHook
- **BailHook**: 顺序执行 Hook，遇到第一个结果 result !== undefined 则返回，不再继续执行。有：SyncBailHook、AsyncSeriseBailHook, AsyncParallelBailHook。
- **WaterfallHook**: 类似于 reduce，如果前一个 Hook 函数的结果 result !== undefined，则 result 会作为后一个 Hook 函数的第一个参数。既然是顺序执行，那么就只有 Sync 和 AsyncSeries 类中提供这个Hook：SyncWaterfallHook，AsyncSeriesWaterfallHook
- **LoopHook**: 不停的循环执行 Hook，直到所有函数结果 result === undefined。同样的，由于对串行性有依赖，所以只有 SyncLoopHook 和 AsyncSeriseLoopHook（PS：暂时没看到具体使用 Case）

原理

hook 事件注册 ——> hook 触发 ——> 生成 hook 执行代码 ——> 执行

# Bable
