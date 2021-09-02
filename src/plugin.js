/*
 * 2021-07-22 20:50:59
 * @create by: zj
 * @Description: 
 */
// compiler 对象包含了Webpack 环境所有的的配置信息
// compilation对象包含了当前的模块资源、编译生成资源、变化的文件等

// ompiler代表了整个webpack从启动到关闭的生命周期，而compilation 只是代表了一次新的编译过程

class firstPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      let str = ''
      for (let filename in compilation.assets) {
        str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
      }
      // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
      compilation.assets['fileSize.md'] = {
        source: function () {
          return str
        },
        size: function () {
          return str.length
        }
      }
      callback()
    })
  }
}
module.exports = firstPlugin


function WebpackOpenBrowserPlugin (options) {
  this.options = options || {}
}

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    fn()
  }
}

WebpackOpenBrowserPlugin.prototype.apply = function (compiler) {
  var t = this
  // Open the browser should be once
  compiler.hooks.done.tap('WebpackOpenBrowserPlugin', once(function () {
    var url = t.options.url
    if (!url) {
      console.error('please pass a url, like: new WebpackOpenBrowserPlugin({ url: "http://localhost:8080" })')
      return
    }

    // setTimeout delay is used because there is no need to make webpack wait for the browser to open
    setTimeout(function () {
      var open = require('opn')
      open(url)
    })
  }))
}

module.exports = WebpackOpenBrowserPlugin