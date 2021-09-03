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
      compiler.plugin('done', (stats) => {
        // 在 done 事件中回调 doneCallback
        this.doneCallback(stats);
      });
      compiler.plugin('failed', (err) => {
        // 在 failed 事件中回调 failCallback
        this.failCallback(err);
      });
      callback()
    })
  }
}
module.exports = firstPlugin

class miniPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap('miniPlugin', () => {
      const url = this.options.url
      const open = require('opn')
      open(url)
    })
  }
}