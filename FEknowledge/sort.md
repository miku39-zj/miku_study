# 排序算法整理

## 1.冒泡排序

```js
function bubbleSort(arr) {
  const n = arr.length;
  let flag = true
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    if (flag) {
      break
    }
  }
  return arr
}
console.log(bubbleSort([1,3,2,5,6,4]));
```

## 2.选择排序

```js
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
console.log(selectSort([1, 3, 2, 5, 6, 4]));
```

## 3.插入排序

```js
function insertSort (arr) {
  const n = arr.length
  for (let i = 1; i < n; i++) {
    let j = i
    while (j > 0 && arr[j-1] > arr[j]) {
      [arr[j-1], arr[j]] = [arr[j], arr[j-1]]
      j--
    }
  }
  return arr
}
console.log(insertSort([1, 3, 2, 5, 6, 4]));
```

## 4.归并排序

```js
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
      }else {
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
console.log(mergeSort([1, 3, 2, 5, 6, 4]));
```

## 5.快速排序

