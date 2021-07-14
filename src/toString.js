/*
 * @Description: toString valueOf
 */

// const a = 10;

// console.log(a.toString(2)); // '1010'  转为二进制
// console.log(a.toString(16)); // 'a' 16进制

// toString 返回一个表示该对象的字符串

console.log({}.toString()); //'[object Object]'
console.log({
  a: 67
}.toString());
console.log([1, 2].toString()); // '1,2'

console.log(toString.call({})); // '[object Object]' 实际上就是 Object.prototype.toString.call({}); 
toString.call(() => {}) // [object Function]
toString.call([]) // [object Array]
toString.call('') // [object String]
toString.call(22) // [object Number]
toString.call(undefined) // [object undefined]
toString.call(null) // [object null]
toString.call(new Date) // [object Date]
toString.call(Math) // [object Math] 

Object.prototype.toString.call(null); // => "[object Null]"
Object.prototype.toString.call(undefined); // => "[object Undefined]"

let c = [1, 2, 3]
let d = {
  a: 2
}
// Object.prototype.toString = function(){
//     console.log('Object')
// }
// Array.prototype.toString = function(){
//     console.log('Array')
//     return this.join(',') 
// }

// console.log(2 + 1)  // 3
// console.log('s')    // 's'
// console.log('s'+2)  // 's2'
// console.log(c < 2) // false  Array

// valueOf  返回当前对象的原始值
const f = [1, 2]
const g = {
  a: 3
}
console.log(f.valueOf());
console.log(g.valueOf());

//存在优先级 
// class A {
//   valueOf(){
//     return 66
//   }
//   toString(){
//     return "牛逼"
//   }
// }
// const aa = new A()
// console.log(String(aa))  // '哈哈哈'   => (toString)
// console.log(Number(aa))  // 66         => (valueOf)
// console.log(aa + '6')   // '666'     => (valueOf)
// console.log(aa == 66)     // true      => (valueOf)
// console.log(aa === 66)    // false     => (严格等于不会触发隐式转换)

//运算符操作 valueOf 优先于 toString


//1. 实现 a == 1 && a == 2 && a == 3

class AA {
  constructor(value) {
    this.value = value
  }
  valueOf() {
    return this.value++
  }
}
let a = new AA(1)

if (a == 1 && a == 2 && a == 3) {
  console.log("miku");
}

//1. 实现 a === 1 && a === 2 && a === 3
const obj = {

}
let value = 1;
Object.defineProperty(obj, 'a', {
  get() {
    return value++
  }
})
if (obj.a === 1 && obj.a === 2 && obj.a === 3) {
  console.log("miku666");
}

//实现无限累加
// add(1); // 1
// add(1)(2);  // 3
// add(1)(2)(3); // 6
// add(1)(2)(3)(4); // 10 

function add(a) {
  function sum(b) {
    a = b ? a + b : a;
    return sum
  }
  sum.toString = function () {
    return a
  }
  return sum
}

console.log(add(1));
console.log(add(1)(2));



function curry(func) {
  return function currid(...args) {
    let _this = this
    if (args.length >= func.length) {
      return func.apply(_this, args)
    } else {
      return function (...args2) {
        return currid.apply(_this, args.concat(args2))
      }
    }
  }
}