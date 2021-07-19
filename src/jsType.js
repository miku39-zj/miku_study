/*
 * @Description: 类型
 */
// 简单类型： Undefined、 Null、Boolean、Number、String、Symbol and Bigint  原始值
// 复杂数据类型： Object(对象)   引用值

console.log(typeof undefined); //undefined
console.log(typeof null); // Object
console.log(typeof 1); // number
console.log(typeof "a"); //string
console.log(typeof false); //boolean
console.log(typeof {}); //object
console.log(typeof Symbol()); //symbol
console.log(typeof
  function () {}); //function
console.log(typeof []); //object
console.log(typeof new Map()); //object

// parseInt 解析一字符串，并返回一个整数
// parseInt(string, radix) radix 2-36之间 将string看成radix进制转成10进制
// parseInt('1',0) ,0会看成10进制
console.log([1, 2, 3].map(parseInt));
console.log([1, 2, 3].map((x, i) => parseInt(x, i)));

// 函数参数按值传递
function setName(obj) {
  obj.name = "Mike"
  obj = new Object(); //改变obj 的引用
  obj.name = "Tom"
}
const person = new Object()
setName(person)
console.log(person.name,"Mike"); //打印Mike, 如果是按引用传值就会打印Tom