/*
 * @Description: promise
 */
// Promise，在new Promise()的时候会传入一个执行器(函数)，这个函数会立即执行
// 这个函数 接收两个参数，resolve和reject ,执行改变状态
// promise有三个状态
// 1. 待定 pending
// 2. 解决 fulfilled  或 resolved
// 3. 拒绝 rejected

// 待定 pending 为初始状态，在此状态下可变成resolved状态 或 rejected状态，无论变成那种状态都是不可逆的
let p1 = new Promise((resolve, reject) => {
  resolve() //将pending状态转换成  解决状态resolved
  reject() // 将pending状态转换成  拒绝状态rejected
})
// Promise.resolve()解决 静态方法，定义在Promise本身上
// Promise.reject() 拒绝

// Promise.prototype.then()方法  返回一个新的promise对象
// then() 接收两个参数(函数) onResolved处理程序 处理resoled、onRejected处理程序 处理rejected
let p2 = new Promise((resolve, reject) => {
  reject()
})
p2.then(() => {
  console.log("resolve");
},() => {
  console.log("reject");
})

// Promise.prototype.catch()
// 给promise添加拒绝处理程序 ，只接收一个参数 onRejected处理程序
p2.catch(() => {
  console.log("catch reject");
})

// Promise.prototype.finally()
// 添加onFinally处理程序，解决或拒绝都会执行
p2.finally(() => {
  console.log("finally");
})

// Promise.all() 返回一个新的promise
let p3 = Promise.all([
  Promise.resolve(),
  Promise.resolve()
])
// 全部resolve 才进入resolved
// 有一个reject 就进入rejected

// Promise.race() 返回一个新的promise
// 集合中最先解决或拒绝 状态

// async/await
// async 函数是 Generator 函数的语法糖 async用来声明异步函数 async 函数返回一个 Promise 对象
// 使用 await 来表示异步
// Generator 的问题在于，函数的执行需要依靠执行器，每次都需要通过 g.next() 的方式去执行

async function asyncFn() {
  return "miku"
}

// await 用来暂停异步函数的执行，等待await Promise resolved 才会继续执行 await 命令后面跟着的是 Promise ，如果不是的话，也会被转换成一个 立即 resolve 的 Promise
// await 后 返回Promise rejected就不会继续执行
// async函数必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变