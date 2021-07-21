/*
 * @Description: promise
 */
// promise有三个状态
// 1. 待定 pending
// 2. 解决 fulfilled  或 resolved
// 3. 拒绝 rejected
// 待定 pending 为初始状态，在此状态下可变成resolved状态 或 rejected状态，无论变成那种状态都是不可逆的
let p1 = new Promise((resolve,reject) => {
  resolve() //将pending状态转换成  解决状态resolved
  reject() // 将pending状态转换成  拒绝状态rejected
})
// Promise.resolve()解决
// Promise.reject() 拒绝