/*
 * @Description: CommonJS模块化 同步的
 */
//概述： 每个文件就是一个模块，有自己的作用域
// 在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。

//特点： 
// 所有代码运行在模块作用域，不会污染全局变量
// 块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存
// 模块加载的顺序，按照代码中出现的顺序

//语法：
// 暴露模块： module.exports = value 或 exports.XXX = value
// 引入模块： require(xxx), 三方模块xxx为模块名，自定义xxx为路径


// module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。
// 加载某个模块，其实是加载该模块的module.exports属性

// CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值
var x = 5;
var addX = function (value) {
  return value + x;
}

var count = 3;

function initCounte() {
  count++
}

module.exports = {
  count: count,
  initCounte: initCounte,
  x: x,
  addX: addX
}

console.log(123);

// module.exports.x = x;
// module.exports.addX = addX;