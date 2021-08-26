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
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        onFulfilled(this.value) //执行
      } else if (this.status === REJECTED) {
        onRejected(this.reason) //执行
      } else if (this.status === PENDING) {
        // 将回调存起来
        this.onFulfilledCallback.push(onFulfilled)
        this.onRejectedCallback.push(onRejected)
      }
    })
  }
  catch (reson) {
    if (this.status === REJECTED) {
      onRejected(this.reason) //执行
    }
  }
  finally (fn) {
    return this.then(res => {
      Promise.resolve(fn()).then(res => {
        return res
      })
    },err => {
      Promise.reject(fn()).then(err => {
        throw err
      })
    })
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
  // 传入的所有 Promsie 都是 fulfilled，则返回由他们的值组成的，状态为 fulfilled 的新 Promise；
  static All(promiseArr) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promiseArr)) {
        return new TypeError("must be a array")
      }
      let counter = 0
      const len = promiseArr.length
      const res = []
      for (let i = 0; i < len; i++) {
        MyPromise.resolve(promiseArr[i]).then(value => {
            counter++
            res[i] = value
            if (counter === len) {
              return resolve(res)
            }
          })
          .catch(err => {
            return reject(err)
          })
      }
    })
  }
  // Promise.race 会返回一个由所有可迭代实例中第一个 fulfilled 或 rejected 的实例包装后的新实例。
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(p => {
        MyPromise.resolve(p).then(val => {
          resolve(val)
        }, err => {
          reject(err)
        })
      });
    })
  }
  // Promise.allSettled 的规则是这样：
  // 所有 Promise 的状态都变化了，那么新返回一个状态是 fulfilled 的 Promise，
  //且它的值是一个数组，数组的每项由所有 Promise 的值和状态组成的对象；
  // 如果有一个是 pending 的 Promise，则返回一个状态是 pending 的新实例；
  static allSettled(promiseArr) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promiseArr)) {
        return new TypeError("must array")
      }
      const res = []
      promiseArr.forEach(p => {
        MyPromise.resolve(p).then(val => {
          res.push({
            status: 'fulfilled',
            value: val
          })
          if (res.length === promiseArr.length) {
            resolve(res)
          }
        }, err => {
          res.push({
            status: 'rejected',
            reason: err
          })
          if (res.length === promiseArr.length) {
            resolve(res)
          }
        })
      });
    })
  }
  //   Promise.any 的规则是这样：
  // 空数组或者所有 Promise 都是 rejected，则返回状态是 rejected 的新 Promsie，且值为 AggregateError 的错误；
  // 只要有一个是 fulfilled 状态的，则返回第一个是 fulfilled 的新实例；
  static any(promiseArr) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promiseArr)) {
        return new TypeError("")
      }
      let counter = 0
      promiseArr.forEach(p => {
        MyPromise.resolve(p).then(val => {
          resolve(val)
        }, err => {
          counter++
          if (counter === promiseArr.length) {
            reject("all rejected")
          }
        })
      })
    })
  }
}

let p1 = new MyPromise((resolve, reject) => {
  resolve(666)
})
console.log(p1, "p1");