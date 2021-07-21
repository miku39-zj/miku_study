/*
 * @Description:  集合引用类型
 */
// object
let obj = {
  name: "miku39",
}
let obj1 = {
  1: "asd"
}
// 只能使用字符串、数值、符号作为键
// 属性分为数据属性和访问器属性
// 数据属性
let person = {
  _age: 23
}
Object.defineProperty(person,'name',{
  writable:true, //是否可以被修改
  configurable:true, //是否可配置，delete
  enumerable:true, //是否可枚举，for...in...
  value: 'miku'
})

// 访问器属性
Object.defineProperty(person,'age',{
  get () {
    return this._age
  },
  set(val) {
    this._age = val
  }
})
console.log(person.age,"person");
person.age = 24
console.log(person.age,"person");
// map 可以使用任何类型作为键

// weakMap 弱映射
const wm = new WeakMap()
// 弱映射的键只能是 Object, 键所引用的对象是弱引用，保证只有通过键对象的引用才能取到值
// 弱引用： 是指不能确保其引用的对象不会被垃圾回收
// WeakMap 不能包含无引用的对象，否则会被自动清除出集合（垃圾回收机制）；
// WeakMap 对象是不可枚举的，无法获取集合的大小。
