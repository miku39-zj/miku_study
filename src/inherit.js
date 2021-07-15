/*
 * @Description: 继承
 */

// 原型 继承意味着复制，js并不会复制对象属性 
// js会在两个对象之间创建关联，这样一个对象就可以通过委托（关联）来访问另一个对象的属性和方法
// 原型继承
function Foo(name) {
  this.name = name
}
Foo.prototype.myName = function () {
  return this.name
}

function Bar(name, label) {
  Foo.call(this, name)
  this.label = label
}
Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.myLabel = function () {
  return this.label
}

var a = new Bar("b", "obj bar")
console.log(a.myName());
console.log(a.myLabel());