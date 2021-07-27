/*
 * @Description: this  <<你不知道的javascript>>上
 */

//this的绑定个函数的声明的位置没有关系，只取决函数的调用方式
//this 的绑定 规则 
// 1. 默认绑定 this默认绑定指向全局对象， strict mode不能将全局对象用于默认绑定
function foo() {
  console.log(this.a);
}
var a = "默认";
foo();

//2.隐式绑定 当函数引用有上下对象，会把this绑定到这个上下文对象
var obj = {
  a: 2,
  foo: function () {
    console.log(this.a);
  }
}
obj.foo() // 调用位置 obj上下文对象
//隐式绑定丢失
var obj2 = {
  a: 2,
  foo: function () {
    console.log(this.a, "丢失");
  }
}
var bar = obj2.foo;
bar(); //调用位置， 全局

// 3.显示绑定 通过 call()、apply()、bind()
// call(obj ,param1, params2,...)
// apply(obj,params) 
function foo2() {
  console.log(this.a);
}
var obj3 = {
  a: 3
}
foo2.call(obj3)
var bar2 = foo2.bind(obj3)
bar2()

// function bind(fn, obj) {
//   return function() {
//     return fn.apply(obj, arguments)
//   }
// }

//4.new 绑定 new foo() 会构造一个新对象并把它绑定到foo()调用里的this上
//绑定到新创建的对象
function foo3(a) {
  this.a = a
}
var bar3 = new foo3(4)
console.log(bar3.a);
//  new call/apply(显示绑定) 隐式绑定 默认绑定


//间接引用
function foo4() {
  console.log(this.a);
}
var o = {
  a: 5,
  foo: foo4
}
var p = {
  a: 6
}
o.foo();
p.foo = o.foo
p.foo()

//箭头函数 根据外层作用域来决定this
function foo5() {
  return a => {
    console.log(this.a);
  }
}
let obj4 = {
  a: 7
}

var bar4 = foo4.call(obj4)