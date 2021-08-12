/*
 * @Description: 
 */
/*
 * @Description: 作用域
 */

// javascript 编译 再 执行
//编译： 词法分析、语法分析、代码生成
//作用域： 一套根据标识符查找变量的规则，决定了代码块中变量的可见性
// 全局作用域、函数作用域、块作用域
//作用域之间可以相互嵌套，会形成引用关系，这种关系形成一条链，叫作用域链
// 词法作用域：作用域的一种工作模型，还有一种是动态作用域，
//词法作用域就在写代码时就决定了的，是一种静态作用域

//引擎对变量进行查询: LHS查询、RHS查询
//对变量进行赋值操作 LHS查询 写入内存
// 获取变量的值 RHS查询  读取内存

function a(age) {
  console.log(age);
  var age = 20
  console.log(age);

  function age() {}
  console.log(age);
}
a(18);

//作用域链： 执行代码时，会从当前的上下文进行查找变量，如果没有，就向上一级查找

//执行上下文: 代码在执行的时候，会产生一个执行环境，这个执行环境就是执行上下文
// 全局执行上下文、函数执行上下文、evel执行上下文
//执行上下文分为三个阶段： 1、创建阶段 2、执行阶段 3、销毁阶段
// 创建阶段： 1.绑定this 2.创建词法环境（全局环境、函数环境（包含argument）） 3.变量环境
// 词法环境和 变量环境， 词法环境存储函数声明和变量绑定（let、const） 变量环境（var）变量绑定




function func() {
  const guang = 'guang';

  function func2() {
    const ssh = 'ssh';
    console.log(guang)
  }
  func2()
  console.dir(func2)
}

// 作用域链中的父作用域先于子作用域销毁
//销毁父作用域后，把用到的变量包起来，打包给子函数，放到一个属性上。这就是闭包的机制。
//闭包是返回函数的时候扫描函数内的标识符引用，把用到的本作用域的变量打成 Closure 包，放到 [[Scopes]] 里
// 闭包（closure）  内函数持有外部函数作用域中变量的引用
//直接调用 eval 会打包整个作用域
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }
  return bar
}
var baz = foo()
baz();

//bar持有foo()作用域的引用，这个引用就叫做闭包

for (var i = 0; i < 5; i++) {
  // console.log(i,"i"); // 输出 0,1,2,3,4
  setTimeout(() => {
    console.log(i, "delay"); // 输出 5 个 5
  })
}
// i被封闭在一个共享的全局作用域中，只有一个i
//解决 为每一个迭代创建一个闭包
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j, "nodelay"); // 输出 0,1,2,3,4
    })
  })(i)
}

//使用场景 

// 能够访问函数定义时所在的词法作用域(阻止其被回收)
// 私有化变量
// 模拟块级作用域
// 创建模块

//单例 模式
let Sington = (function () {
  let instance;

  function createInstance() {
    return new Object("asd")
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance
    }
  }
})()

const instance1 = Sington.getInstance()
const instance2 = Sington.getInstance()
console.log(instance1 === instance2, "Sington");

// 全局Api中的$watch方法中使用闭包 
// return function unwatchFn () {
//   watcher.teardown()
// }


//var声明 变量提升 函数作用域， 函数声明 提升 优先

console.log(b, "b");
var b

function b() {}

// var声明提升
for (var i = 0; i < 5; i++) {
  // console.log(i,"i"); // 输出 1,2,3,4,5
  setTimeout(() => {
    console.log(i, "var"); // 输出 5 个 5
  })
}

// let声明 变量不提升 暂时性死区 块作用域  不能重复声明
// 暂时性死区： 必须在声明之后执行， 声明之前执行的瞬间叫 ‘暂时性死区：’
for (let i = 0; i < 5; i++) {
  // console.log(i,"i"); // 输出 1,2,3,4,5
  setTimeout(() => {
    console.log(i, "let"); // 输出 5 个 5
  })
}
// let 在全局作用域中声明的变量不会成为window对象的属性 （var声明的变量则会）

// const 在声明变量是必须同时初始化变量  不能重复声明  不能修改