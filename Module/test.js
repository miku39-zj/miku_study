/*
 * 2021-07-13 19:14:45
 * @create by: zj
 * @Description: 
 */

// CommonJS test
// require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象
// var exp = require('./CommonJS.js')
// console.log(exp,"exp");
// console.log(exp.x);
// exp.x = 888
// console.log(exp.x);
// console.log(exp.addX(2));
// console.log(exp.count.value++);

// console.log(require('./CommonJS.js').count.value,"adasd");

// es6 module
//"type": "module",
import {
  obj,
  counter,
  changeCouter
}
from './es6Module.js'

console.log(obj.name);
obj.name = "yui"
console.log(obj.name);
console.log(counter);
changeCouter()
console.log(counter);
console.log("6666666test");
import('./es6Module.js').then(({obj}) => {
  console.log(obj,"obj");
})

