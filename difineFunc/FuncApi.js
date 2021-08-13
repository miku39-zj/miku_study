/*
 * 2021-08-12 19:54:39
 * @create by: zj
 * @Description: 
 */
// 手写 call  call()方法接受的是一个参数列表
Function.prototype.mycall = function (context, ...args) {
  if (typeof this !== 'function') {
    return new TypeError("function")
  }
  context = context || window;
  const fn = Symbol('fn')
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

// 手写 apply apply()第二个参数是个数组
Function.prototype.myapply = function (context, args) {
  if (typeof this !== 'function') {
    return new TypeError("e")
  }
  context = context || window
  const fn = Symbol('fn')
  context['fn'] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

//手写 bind(), 不会执行 ，返回一个函数
Function.prototype.mybind = function(context, ...args) {
  if (typeof this !== 'function') {
    return new TypeError("dasd")
  }
  context = context || window
  const fn = Symbol('fn')
  context['fn'] = this
  return function(...args2) {
    const res = context[fn](...args,...args2)
    delete context[fn]
    return res
  }
}