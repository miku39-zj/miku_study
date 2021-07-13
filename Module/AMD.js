/*
 * @Description: AMD模块规范 是非同步加载模块，允许指定回调函数
 */
// 语法： 
// 定义暴露模块
// 1. 定义没有依赖的模块
// define(function () {
//   return 模块
// });

// 2. 定义有依赖的模块
// define([
//   'module1',
//   'module2'
// ], function (m1, m2) {
//   return 模块
// });

// 引入模块
// require(['module1', 'module2'], function (m1, m2) {
//   使用m1/m2
// })

// 使用 require.js
// RequireJS的基本思想是，通过define方法，将代码定义为模块；通过require方法，实现代码的模块加载
// 定义没有依赖的模块
define(function () {
  let msg = 'www.baidu.com'

  function getMsg() {
    return msg.toUpperCase()
  }
  return {
    getMsg
  } // 暴露模块
})
// 定义有依赖的模块
define(['dataService'], function (dataService) {
  let name = 'Tom'

  function showMsg() {
    alert(dataService.getMsg() + ', ' + name)
  }
  // 暴露模块
  return {
    showMsg
  }
})

// AMD模块定义的方法非常清晰，不会污染全局环境，能够清楚地显示依赖关系