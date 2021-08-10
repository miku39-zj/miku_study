# 类型转换

## 问题一：0==‘0’、0==[]为true 为什么‘0’==[]为false？

x == y 在非严格模式下，会类型转换, 有五种情况

x和y都是null或undefined: 返回true

```js
console.log ( null == undefined );//true

console.log ( null == null );//true

console.log ( undefined == undefined );//true
```

x或y是NaN: 返回false

x和y都是string,boolean,number: 有隐式类型转换，将不是number类型转成number

```js
console.log ( 1 == true );//true    (1) 1 == Number(true)
console.log ( 1 == "true" );//false   (1) 1 == Number('true')  ===> NaN
console.log ( 1 == ! "true" );//false  (1) 1 == !Boolean('true')  (2) 1 == !true  (3) 1 == false  (4)1 == Number(false) 
console.log ( 0 == ! "true" );//true 
console.log(true == 'true') // false
```

x或y是复杂数据类型： 会先获取复杂数据类型的原始值之后再左比较
	复杂数据类型的原始值： 先调用valueOf方法，然后调用toString方法
	valueOf:一般默认返回自身
	数组的toString：默认会调用join方法拼接每个元素并且返回拼接后的字符串

```js
console.log ( [].toString () );//空字符串 
console.log ( {}.toString () );//[object Object] 
//注意:  空数组的toString()方法会得到空字符串，而空对象的toString()方法会得到字符串[object Object] （注意第一个小写o，第二个大写O哟）  
console.log ( [ 1, 2, 3 ].valueOf().toString());//‘1，2，3’ 
console.log ( [ 1, 2, 3 ] == "1,2,3" );//true  (1)[1,2,3].toString() == '1,2,3'  (2)'1,2,3' == '1,2,3' 
console.log({} == '[object Object]');//true

```

x和y都是复杂数据类型：规则只比较地址，如果地址一致则返回true，否则返回false

```js
var arr1 = [10,20,30]; 
var arr2 = [10,20,30]; 
var arr3 = arr1; //将arr1的地址拷贝给arr3         
console.log ( arr1 == arr2 );  //false 虽然arr1与arr2中的数据是一样，但是它们两个不同的地址 
console.log ( arr3 == arr1 ); //true  两者地址是一样         
console.log ( [] == [] );//false 
console.log ( {} == {} );//false

```

## 问题二：` [] + {}`  和 `{} + []`  打印什么？

js +的作用，

1. 作为数值运算加法，比如 `1+1 = 2`
2. 作为字符串拼接 ，比如 `"abc" + "asd" = "abcasd"`

在js中，加法运算的规则很简单，只会触发两种情况:

1. `number + number`
2. `string + string`

js隐式转换规则中首先会推算两个操作数是不是number类型，如果是则直接运算得出结果。
如果有一个数为string，则将另一个操作数隐式的转换为string，然后通过字符串拼接得出结果。
如果为布尔值这种简单的数据类型，那么将会转换为number类型来进行运算得出结果
如果操作数为对象或者是数组这种复杂的数据类型，那么就将两个操作数都转换为字符串，进行拼接

先看 `[] + {}`,[]会通过隐式转换规则，调用toString方法转换为 "" ，同理{}转换为[object Object], 相加得出字符串拼接结果 [object Object]

```js
console.log([] + {}) // ===> [object Object]
```

再`{} + []`会不会是一样，答案是不一样的

在js中{}代表复合语句，在一些js解释器会将开头的 {} 看作一个代码块，而不是一个Object（在es6以前只有函数作用域与全局作用域，还没有块级作用域）而这里的{}只是空符号，不表明任何意思。这里的+[]是一个隐式转换，所以参与运算的只有+[]，在这里将[]转换成了number类型，所以得出结果为0。

```js
console.log({} + []) // ===> 0
```

## 问题三： `{b:42} > {b:41}` ,`{b:42}<{b:41}` ,`{b:42} == {b:41}`,`{b:42} >= {b:41}`

js比较：数值比较，字符串比较

对于["42"],会转换成"42"

```js
const a = [42]
const b = ["43"]
console.log(a < b) // true 
console.log(a < ["143"]) // false
```

看问题：{}会转换成字符串 ，为 [object Object]

```js
const a = {b: 42}
const b = {b: 41}
console.log(a > b) // false
console.log(a < b) // false
console.log(a == b) // false
console.log(a >= b) // true
```

为什么 `a >= b`,根据规范 `a >= b`会被处理成 `a<b`,然后将结果取反
