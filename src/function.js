/*
 * 2021-08-05 12:06:23
 * @create by: zj
 * @Description: 
 */
function side(arr) {
  console.log(arr);
  arr[0] = arr[2]
}

function foo(a, b, c) {
  c = 10
  console.log(arguments,"arguments");
  side(arguments)
  return a + b +c
}
console.log(foo(1, 1, 1));  // => 21


// 当非严格模式中的函数有包含剩余参数、默认参数和解构赋值，那么arguments对象中的值不会跟踪参数的值
function foo1(a, b, c = 3) {
  c = 10
  console.log(arguments,"arguments");
  side(arguments)
  return a + b +c
}
console.log(foo1(1, 1, 1)); // => 12  编译成es6 块级作用域

// 手写模板字符串
function render(template, context) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    console.log(match,key,p);
    return context[key]
  });
}
const template = "{{name}}很厉name害，才{{age}}岁";
const context = { name: "jawil", age: "15" };
// console.log(render(template, context));

