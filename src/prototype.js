/*
 * @Description:  原型
 */
var anotherObj = {
  a: 5
}
var myObj = Object.create(anotherObj)
//Object.create() 创建一个对象并把这个对象的[[prototype]]关联到指定的对象
console.log(myObj.a);
console.log(myObj.__proto__ === anotherObj);
console.log("a" in myObj);
//in 会查找整个[[Prototype]]链 ，， 尽头 Object.prototype

//所有函数默认拥有一个prototype的属性，指向原型对象，Func.prototype访问

function Foo(name) {
  this.name = name
}
Foo.prototype.myName = function () {
  return this.name
}
var a = new Foo("a")
// Foo.prototype.constructor 默认指向 Foo
// a.constructor 实际上 是关联 Foo.prototype.constructor
console.log(Foo.prototype.constructor === Foo);
console.log(Object.getPrototypeOf(a) === Foo.prototype);
console.log(a.__proto__ === Foo.prototype);
var b = new Foo("b")