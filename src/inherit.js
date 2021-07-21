/*
 * @Description: 继承
 */

// 原型 继承意味着复制，js并不会复制对象属性 
// js会在两个对象之间创建关联，这样一个对象就可以通过委托（关联）来访问另一个对象的属性和方法
// 原型继承
// Object.create()会创建一个新对象 并把新对象的[[Prototype]] 关联到指定的对象
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
// console.log(a.myName());
// console.log(a.myLabel());
// instanceof: 在a的整条[[Prototytp]]中是否有Foo.prototype指向的对象
// 只能处理 对象和函数之间的关系
// console.log(a instanceof Foo);

//原型链继承: 重写原型链
function Sup () {
  this.name = "yui"
  this.color = ['r','g','b']
}
Sup.prototype.getName = function () {
  return this.name
}

function Sub(label) {
  this.label = label
}
Sub.prototype = new Sup()
let obj1 = new Sub("hh")
console.log(obj1.getName(),"原型链继承");
// 问题1： 原型中包含的引用值在原型中共享
// 问题2： 子类型在实例化时不能给父类构造函数传参

// 盗用构造函数
function Sup1 (name) {
  this.name = name
  this.color = ['r','g','b']
  this.getColor = function () {
    return this.color
  }
}
Sup1.prototype.getName = function () {
  return this.name
}

function Sub1 (label,name) {
  Sup1.call(this, name)
  this.label = label
}
let obj2 = new Sub1("hh","miku")
console.log(obj2.getColor(),"盗用构造函数");
// 问题1: 必须在构造函数定义函数，函数不能重用，
// 问题2： 子类不能访问父类原型上的方法

// 组合继承: 原型链继承 + 盗用构造函数
// 原型链继承原型上的属性和方法，盗用构造函数继承实例属性
function Sup2 (name) {
  this.name = name
  this.color = ['r','g','b']
}
Sup2.prototype.getName = function () {
  return this.name
}

function Sub2 (label,name) {
  Sup2.call(this, name)
  this.label = label
}
Sub2.prototype = new Sup2()
let obj3 = new Sub2("hh","mio")
console.log(obj3.getName(),"组合继承");
// 问题： 调用了两次父类构造函数

// 原型继承
function object (obj) { //就是 Object.create()
  function F() {}
  F.prototype = obj
  return new F()
}

let person = {
  name: "sakury",
  color: ['r','g','b']
}
let cPerson = object(person) // === Object.create(cPerson)
console.log(cPerson.name,"原型继承");
console.log(cPerson.color,"cPerson");
cPerson.color[0] = 'a'
let cPerson1 = object(person)
console.log(cPerson.color,"cPerson1");
// 问题1： 原型中包含的引用值在原型中共享
// 问题2： 子类型在实例化时不能给父类构造函数传参

// 寄生式继承: 在原型继承的基础上,增强对象，返回构造函数
function createAnother(original){
  var clone = object(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function(){  // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}


// 寄生组合式继承; 借助构造函数传参和寄生模式实现继承
function Sup3 (name) {
  this.name = name
  this.color = ['r','g','b']
}
Sup3.prototype.getName = function () {
  return this.name
}

function Sub3 (label,name) {
  Sup3.call(this, name)
  this.label = label
}
Sub3.prototype = Object.create(Sup3.prototype)
Sub3.prototype.construcor = Sup3

let obj4 = new Sub3("hh","mio")
console.log(obj4.getName(),"寄生组合式继承");

// es6 extends
// ES6的继承有所不同，实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this。
// 因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错。
