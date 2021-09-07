/*
 * 2021-08-24 11:08:44
 * @create by: zj
 * @Description: 
 */
function debounce(func, wait, immediate) {
  let timeOut = null
  return function(...args) {
    const _this = this
    if (immediate && !timeOut) {
      func.apply(_this,args)
    }
    timeOut && clearTimeout(timeOut)
    timeOut = setTimeout(()=> {
      func.apply(_this, args)
    }, wait)
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}