/*
 * 2021-08-25 20:46:58
 * @create by: zj
 * @Description: 
 */
function add (a, b) {
  let maxLen = Math.max(a.length, b.length)
  a = a.padStart(maxLen,'0')
  b = b.padStart(maxLen,"0")
  let res = ""
  let sum = 0;
  let t = 0;
  let r = 0;
  for(let i = maxLen-1; i>=0; i--){
    sum = parseInt(a[i])+parseInt(b[i]) + t;
    t = Math.floor(sum / 10)
    r = sum % 10
    res += r
  }
  return res
}