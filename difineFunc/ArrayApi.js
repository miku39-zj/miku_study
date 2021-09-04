// 手写 filter
Object.prototype.hasOwnProperty
Array.prototype.myFilter = function (cb, thisArg) {
  if (this === undefined) {
    return new TypeError("undefined")
  }
  if (typeof cb !== 'function') {
    return new TypeError("cb must be func")
  }
  const res = []
  const arr = this
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      if (cb.call(thisArg, arr[i], i, arr)) {
        res.push(arr[i])
      }
    }
  }
  return res
}
console.log([1, 2, 3].myFilter(x => x > 2));

//手写 map
Array.prototype.myMap = function (cb, thisArg) {
  if (this === undefined) {
    return new TypeError("undefined")
  }
  if (typeof cb !== 'function') {
    return new TypeError("dsa")
  }
  const res = []
  const arr = Object(this)
  const len = arr.length >>> 0
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      res[i] = cb.call(thisArg, arr[i], i, arr)
    }
  }
  return res
}

Array.prototype.myreduce = function (cb, initVal) {
  if (this === undefined) {
    return new TypeError("ad")
  }
  if (typeof cb !== 'funtion') {
    return new TypeError("sad")
  }
  const arr = Object(arr)
  let res = initVal
  const len = arr.length
  let k = 0
  if (res === undefined) {
    while (k < len && !(k in arr)) {
      k++;
    }
    // 如果超出数组界限还没有找到累加器的初始值，则TypeError
    if (k >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    res = arr[k++];
  }
  while (k < len) {
    if (k in arr) {
      res = cb.call(null, res, arr[k], k, arr)
    }
    k++
  }
  return res
}