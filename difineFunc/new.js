/*
 * @Description: new 原理
 */

// 1.创建 一个全新的对象
// 2.把这个对象的[[prototype]]关联到指定函数的原型，[[prototype]]连接
// 3.this绑定到这个新对象，函数执行
// 4.如果没有返回对象，那么返回这个新对象

function maNew(ctor, ...args) {
  let obj = Object.create(ctor.prototype);
  let res = ctor.apply(obj, args)
  return res instanceof Object ? res : obj
}