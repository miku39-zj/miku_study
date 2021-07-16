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

// 会查找[[Prototype]]链
for (var item in myObj) { // 对象可枚举属性
  console.log(item, "item"); // a item
}

//所有函数默认拥有一个prototype的属性，指向原型对象，Func.prototype访问

function Foo(name) {
  this.name = name
}
Foo.prototype.myName = function () {
  return this.name
}
var a = new Foo("a")

// instanceof: 在a的整条[[Prototytp]]中是否有Foo.prototype指向的对象
// 只能处理 对象和函数之间的关系
console.log(a instanceof Foo);

// Foo.prototype.constructor 默认指向 Foo
// a.constructor 实际上 是关联 Foo.prototype.constructor
console.log(Foo.prototype.constructor === Foo);

// Foo.prototype.isPrototypeOf(a) 是否出现在 a的[[Prototype]]链中
console.log(Foo.prototype.isPrototypeOf(a));
// Object.getPrototypeOf(a) 获取 a 的[[Prototype]]链
console.log(Object.getPrototypeOf(a));
console.log(Object.getPrototypeOf(a) === Foo.prototype);
console.log(a.__proto__ === Foo.prototype);
var b = new Foo("b")