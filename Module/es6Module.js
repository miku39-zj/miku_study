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

// ② CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
// 因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成