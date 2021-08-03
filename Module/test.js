/*
 * @Description: 
 */
// require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象
var exp = require('./CommonJS.js')
console.log(exp,"exp");
console.log(exp.x);
exp.x = 888
console.log(exp.x);
console.log(exp.addX(2));
console.log(exp.count.value++);

console.log(require('./CommonJS.js').count.value,"adasd");