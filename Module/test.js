/*
 * @Description: 
 */
// require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象
var exp = require('./CommonJS.js')
console.log(exp.x);
console.log(exp.addX(2));
console.log(exp.count);
exp.initCounte();
console.log(exp.count);