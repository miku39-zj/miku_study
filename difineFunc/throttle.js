/*
 * 2021-08-24 11:27:53
 * @create by: zj
 * @Description: 
 */

function throttle(func, waite) {
  let timeOut = null
  return function (...args) {
    const _this = this
    if (!timeOut) {
      timeOut = setTimeout(()=> {
        func.apply(_this, args)
        timeOut = null
      },waite)
    }
  }
}
