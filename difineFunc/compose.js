/*
 * @Description: 实现 func1(func2(func3(val))) => compose(func1, func2, func3)(val)
 */
function compose(...funcs) {
  return function proxy(...args) {
    const n = funcs.length
    if (n === 0) {
      return args
    }
    if(n === 1) {
      return funcs[0](...args)
    }
    return funcs.reduce((x, y) => {
      return typeof x=== 'function' ? y(x(...args)) : y(x)
    })
  }
}