/*
 * 2021-08-25 18:55:19
 * @create by: zj
 * @Description: 单例模式
 */

let sington = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new Object();
    }
    return instance
  }
})()