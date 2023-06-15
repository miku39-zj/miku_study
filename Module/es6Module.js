/*
 * @Description: ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
 */

// CommonJS 和 AMD 模块，都只能在运行时确定这些东西 

// 定义模块
// var basicNum = 0;
// var add = function (a, b) {
//     return a + b;
// };
// export { basicNum, add };

// 引入入模块
// import { basicNum, add } from './math';
// function test(ele) {
//     ele.textContent = add(99 + basicNum);
// }

// export default命令，为模块指定默认输出。
// export-default.js
// export default function () {
//   console.log('foo');
// }
// 引入 
// import customName from './export-default';
// customName(); // 'foo'


// ES6 模块与 CommonJS 模块的差异

// ① CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

// ② CommonJS 模块是运行时加载，ES6 模块是编译时输出接口(按需加载)。
// 因为 CommonJS 加载的是一个对象（即module.exports属性），在输入时是先加载整个模块,生成一个对象
// 编译时加载,是通过 export 命令显式指定输出的代码,在import时可以指定加载某个输出值

// import 命令会被 JavaScript 引擎静态分析，优先于模块内的其他内容执行
// 在文件中的任何位置引入 import 模块都会被提前到文件顶部
// JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。
//等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值
// export 命令会有变量声明提前的效果。
// export let obj = {
//   name:"miku",
//   age: 20
// }
// export let counter = 3
// export let changeCouter = () => {
//   counter = 39
// }

// const add = function() {
//   return () => counter++
// }
// let one = add()
// one()

let a = 12
