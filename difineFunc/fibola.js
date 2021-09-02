/*
 * 2021-09-01 09:13:12
 * @create by: zj
 * @Description: 
 */

function fib(n) {
  if (n < 2) {
    return n
  }
  return fib(n-1)+fib(n-2)
}

function fib2(n) {
  const fibImpl = function (a,b,n) {
    if (n === 0) {
      return a
    }
    return fibImpl(b, a+b, n-1)
  }
  return fibImpl(0,1,n)
}