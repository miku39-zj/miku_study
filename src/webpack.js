/*
 * 2021-07-23 19:07:14
 * @create by: zj
 * @Description: webpack
 */
// webpack 是一个现代 JavaScript 应用程序的静态模块打包器

// 核心概念
// entry: 入口 使用哪个模块,来作为构建其内部依赖图的开始
// output: 输出
// Module:模块
// ,在 Webpack 里一切皆模块,一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块

// Chunk: 代码块
// ,一个 Chunk 由多个模块组合而成,用于代码合并与分割。

// loader: 模块转换器，用于把模块原内容按照需求转换成新内容
// 将所有类型的文件转换为 webpack 能够处理的有效模块

// 插件(plugins): 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情
// 插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量

// webpack的整个打包流程：

// 1、读取webpack的配置参数；
// 2、启动webpack，创建Compiler对象并开始解析项目；
// 3、从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
// 4、对不同文件类型的依赖模块文件使用对应的Loader进行编译，最终转为Javascript文件；
// 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,
// 再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会

// 在webpack源码中主要依赖于compiler和compilation两个核心对象实现。
// compiler对象是一个全局单例，他负责把控整个webpack打包的构建流程。
// compilation对象是每一次构建的上下文对象，它包含了当次构建所需要的所有信息，每次热更新和重新构建，
// compiler都会重新生成一个新的compilation对象，负责此次更新的构建过程。

const fs = require('fs')

// @babel/parser,这是 babel7 的工具,来帮助我们分析内部的语法,包括 es6,返回一个 AST 抽象语法树。
const parser = require('@babel/parser')

// @babel/traverse(遍历)方法维护这 AST 树的整体状态,我们这里使用它来帮我们找出依赖模块。
const traverse = require('@babel/traverse').default

// 将 AST 语法树转换为浏览器可执行代码,我们这里使用@babel/core 和 @babel/preset-env
const { transformFromAst } = require('@babel/core') 

const options = require('../webpack.config')
const path = require('path')

const Parser = {
  getAst: path => {
    // 读取入口文件
    const content = fs.readFileSync(path,'utf-8')
    // 将文件内容转为AST抽象语法树
    return parser.parse(content, {
      sourceType: 'module'
    })
  },
  getDependecies: (ast, filename) => {
    const dependecies = {}
    // 遍历所有的 import 模块,存入dependecies
    traverse(ast, {
      // 类型为 ImportDeclaration 的 AST 节点 (即为import 语句)
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename)
        // 保存依赖模块路径,之后生成依赖关系图需要用到
        const filepath = './' + path.join(dirname, node.source.value)
        dependecies[node.source.value] = filepath
      }
    })
    return dependecies
  },
  getCode: ast => {
    // AST 转换为code
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }
}

class Compiler {
  constructor (options) {
    // webpack 配置
    const { entry , output } = options
    // 入口
    this.entry = entry
    // 出口
    this.output = output
    // 模块
    this.modules = []
  }
  // 构建启动
  run () {
    const { getAst, getDependecies, getCode } = Parser
    const ast = getAst(this.entry[1])
    console.log(ast);

    const dependecies = getDependecies(ast, this.entry[1])
    console.log(dependecies,"dependecies");

    const code = getCode(ast)
    console.log(code,"code");
  }
  // 重写require函数， 输出bundle
  generate () {}

}

new Compiler(options).run()

