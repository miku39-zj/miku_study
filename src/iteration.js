/*
 * @Description: 迭代器与生成器
 */
// 计数循环
for (let i = 0; i < 10; i++) {
  // console.log(i);
}
// 可迭代协议
// 实现Iterable接口，拥有Symbol.iterator属性，这个属性引用一个迭代器工厂函数，返回一个新的迭代器
// 可迭代对象
// 1.Array
// 2.String
// 3.Map
// 4.Set
// 5.arguments
// 6.NodeList
let arr = ['miku','yui','mio'] //可迭代对象
let iter = arr[Symbol.iterator](); //迭代器
console.log(iter.next(),"next");
for(let item of arr) {
  console.log(item,"arr");
}
for(let item of iter) {
  console.log(item,"iter");
}

// 迭代器： 一种一次性使用的对象，具有next()方法用来遍历数据，返回{done:false,value:"miku"}

// for...of...遍历可迭代对象

// 生成器
// 生成器函数声明
function* generatorFn() {}
// 生成器函数表达式
// let generatorFn = function* () {}
// 箭头函数不能用来定义生成器
// 实现了itrerator接口 ， 具有next()方法

function* genarator () {
  yield 'miku';
  yield 'yui';
  yield 'mio';
  yield 'mugi';
  yield 'lizi';
  yield 'azi';
}
let geneObj = genarator()
console.log(geneObj.next(),"miku");
console.log(geneObj.next(),"yui");
for (const item of geneObj) {
  console.log(item,"gen");
}
