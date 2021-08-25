/*
 * 2021-08-06 11:58:54
 * @create by: zj
 * @Description: 
 */
// >>>0  无符号位移   第一个操作数向右移动指定的位数。向右被移出的位被丢弃，左侧用0填充。
// 1 . 如果不能转换为Number，那就为0
// 2 . 如果为非整数，先转换为整数，

// 判断 一个 obj 是一个数组 

// Array.prototype.isPrototypeOf([])
// [] instanceof Array
// [].constructor === Array
// [].__proto__ === Array.prototype
//Object.prototype.toString.call([]).slice(8,-1)
function func() {
  const guang = 'guang';
  function func2() {
    const ssh = 'ssh';
    console.log(guang);
    function func3 () {
      console.log(guang);
      console.log(ssh);
      const suzhe = 'suzhe';
    }
    return func3;
  }
  return func2;
}

const func2 = func();
const func3 = func2();
func3()

function bubbleSort(arr) {
  const n = arr.length;
  let flag = true
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    if (flag) {
      break
    }
  }
  return arr
}


function selectSort(arr) {
  const n = arr.length
  let minI
  for (let i = 0; i < n - 1; i++) {
    minI = i
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[i]) {
        minI = j
      }
    }
    [arr[i], arr[minI]] = [arr[minI], arr[i]]
  }
  return arr
}

function insertSort(arr) {
  const n = arr.length
  for (let i = 1; i < n; i++) {
    let j = i
    while (j > 0 && arr[j - 1] > arr[j]) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      j--
    }
  }
  return arr
}


function mergeSort(arr) {
  const merge = function (left, right) {
    const ln = left.length,
      rn = right.length,
      res = []
    let lp = 0,
      rp = 0
    while (lp < ln && rp < rn) {
      if (left[lp] <= right[rp]) {
        res.push(left[lp])
        lp++
      } else {
        res.push(right[rp])
        rp++
      }
    }
    while (lp < ln) {
      res.push(left[lp])
      lp++
    }
    while (rp < rn) {
      res.push(right[rp])
      rp++
    }
    return res
  }
  const n = arr.length
  if (n < 2) {
    return arr
  }
  const mid = n >> 1,
    left = arr.slice(0, mid),
    right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function quickSort(arr) {
  const n = arr.length - 1
  const quick = function (left, right) {
    if (left >= right) {
      return arr
    }
    const mid = left
    let i = left,
      j = right
    while (i < j) {
      while (i < j && arr[i] < arr[mid]) {
        i++
      }
      while (i < j && arr[j] >= arr[mid]) {
        j--
      }
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    [arr[mid], arr[i]] = [arr[i], arr[mid]]
    quick(left, i-1)
    quick(i + 1, right)
    return arr
  }
  return quick(0, n)
}


function bucketSort (arr) {
  const n = arr.length
  const max = Math.max(...arr)
  const bucket = new Array(max + 1).fill(0)
  for (let i = 0; i < n; i++) {
    bucket[arr[i]]++
  }
  let res = []
  for(let i = 0; i< max + 1; i++) {
    while(bucket[i]) {
      res.push(i)
      bucket[i]--
    }
  }
  return res
}
const res = bucketSort([1, 3, 2, 3, 6, 4])
// console.log(res);

// "use strict"
var a = "默认";
function foo() {
  console.log(this.a,12321);
}

foo();