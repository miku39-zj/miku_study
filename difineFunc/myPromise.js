/*
 * @Description:  手写Promise
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  status = PENDING; //状态
  value = null; // 成功后的值
  reason = null; // 失败后的值
  // 存储成功回调函数
  onFulfilledCallback = [];
  // 存储失败回调函数
  onRejectedCallback = [];
  constructor(exe) {
    // exe是一个执行器函数，进入立即执行
    exe(this.resolve, this.reject)
  }
  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  resolve = (value) => {
    console.log(this, "this");
    if (this.status === PENDING) {
      this.status = FULFILLED //修改状态
      this.value = value //保存成功后的值
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value)
      }
    }
  }
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED //修改状态
      this.reason = reason //保存失败后的值
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason)
      }
    }
  }
  then(onFulfilled, onRejected) { //then接收两参数，onFulfilled, onRejected,当状态是FULFILLED执行onFulfilled 是rejected执行onRejected
    if (this.status === FULFILLED) {
      onFulfilled(this.value) //执行
    } else if (this.status === REJECTED) {
      onRejected(this.reason) //执行
    } else if (this.status === PENDING) {
      // 将回调存起来
      this.onFulfilledCallback.push(onFulfilled)
      this.onRejectedCallback.push(onRejected)
    }
  }
  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }
    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter);
    });
  }
  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

let p1 = new MyPromise((resolve, reject) => {
  resolve(666)
})
console.log(p1, "p1");