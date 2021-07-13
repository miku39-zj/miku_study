/*
 * @Description: 
 */
(function (window) {
  let data = 'www.baidu.com'

  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
  }

  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }

  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = {
    foo,
    bar
  } //ES6写法
})(window)

// 避免命名冲突(减少命名空间污染)
// 更好的分离, 按需加载
// 更高复用性
// 高可维护性