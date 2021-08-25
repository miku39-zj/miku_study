/*
 * 2021-08-24 11:08:44
 * @create by: zj
 * @Description: 
 */
function debounce(func, wait) {
  let timeOut = null
  return function(...args) {
    const _this = this
    if (timeOut) {
      timeOut = null
    }
    timeOut = setTimeout(()=> {
      func.apply(_this, args)
    }, wait)
  }
}