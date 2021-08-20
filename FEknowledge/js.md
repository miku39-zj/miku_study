

# JavaScript

测试 ： `test262`

## 1.`Source Code`:

`'\t'.codePointAt() 在unicode里的位置  .toString(16)`

## 2. `Lexical Grammar`

### 	2.1 `InputElemen`:

​		`WhiteSpace(空格)`: 

​			`&nbsp;`/`TAB`/`VB`/`SP(空格)`/`ZWNBSP（'\uFEFF'）`

​		`LineTerminator(换行符)`

​			`LF（\n U+000A）`/`CR(回车 \R U+000D)`					

​		`Commen(注释)`:  `/**/` `//`
​		`Token（词）`:
​				`Identifier`: 标识符  分为 变量名 和 属性名
​				`KeyWords`：关键词， undefined不是关键字，在非全局的清空下可设置成变量名
​				`Punctuator`: 符号
​				`Literal`: 直接量	
​						`Number`:`0b` 二进制 `0o` 8进制 `0x` 16进制  `1.2e3`,  符号位  指数部分  小数部分 

```js
var a = 0.1 // 用二进制表示 是不精准的 一直 乘以 2 不会变成整数
var b = 0.2
const memory = new Float64Array(1);
memory[0] = a
const intarr = new Uint8Array(memory.buffer);
console.log(intarr)
1/ +0 === Infinity
1/-0 === -Infinity

Math.abs(0.1+0.2 - 0.3) <= Number.EPSLON（精度）
```

​						`String`: `Character/Code Point/Encoding`

```js
//当读取一个基本类型的时候，后台就会创建一个对应的基本包装类型对象
10 .toString(2), 转成二进制(10后 不加空格会报错) ，会装箱

UTF-8： 英文 两 字节 中文 3 字节

String语法: "abc" 'abc' `abc`
```

​					`Boolean`: `true / false`， `Null`, `undfined`

## 3. Expressions		

### `Left Habdside & Right Handside`

`Left Handside`：`MemberExpression  New  Call`

`MemberExpression`:
	`a.b, a[b],super.b,new.target(判断是不是 new)  new foo()`

`New`:  `new Foo` 
	`new 一个return 一个对象的函数 会返回这个对象`， `new new foo() ==> new (new foo())`

` Call`: `foo()['b']`

`Right handside`： `updata ( a++ ), Unary( void 0, + a !a, ) , Exponental(2**3) Multiplicative( * / %), Additive(+ -)， Shift(<< >> >>> intanceof in), Relationship ( > < >=), Equality( ==，!=) , Bitwise(& ^ |),Logical(&& ||), Conditional(? :)`



```
// Updata
var a = 1, b = 1
a
++
b
// b + 1
// Unary
void 0; // void 生成 undfined
for (var i = 0; i < 5; i++) {
    void function (i) { // 不用 void 函数声明 ，有就是 合法的函数表达式
		setTimeout(()=> {
            console.log(i)
        })
    }(i)
}

//Logical 短路逻辑
//&& || 不会 类型转换
```

## 4.`Type Convertion(类型转换)`

|             | `Number`             | `String`            | `Boolean`  | `Undefinede` | `Null` | `Object` | `Symbol` |
| ----------- | -------------------- | ------------------- | ---------- | ------------ | ------ | -------- | -------- |
| `Number`    |                      |                     | 0 `false`  |              |        | `Boxing` |          |
| `String`    |                      |                     | "" `false` |              |        | `Boxing` |          |
| `Boolean`   | `true`  1  `false `0 | `'true'` `'false'`  |            |              |        | `Boxing` |          |
| `Undefined` | NaN                  | `'Undefined'`       | false      |              |        |          |          |
| `Null`      | 0                    | `'null'`            | false      |              |        |          |          |
| `Object`    | valueOf              | `valueOf  toString` |            |              |        |          |          |
| `Symbol`    |                      |                     |            |              |        | `Boxing` |          |

### `Boxing & Unboxing (装箱拆箱)`

`Number,String, Boolean, Symbol`四种基本类型 有对应的`class`包装类型,将基本类型转成包装类型叫`Boxing`装箱

7种基本类型， 在`Object`里有不同的 类 ：`Number,String, Boolean typeof 为 object`类对应 `number string boolean`类型

`new Number(1)`会包装成一个对象,`Number(1)`生成普通类型的（强制类型转换），`Object("12")`强制装箱

`Symbol("1")`装箱 `Object(Symbol("1"))` ，`(function(){return this}).apply(Symbol("1"))`

`Unboxing`拆箱

```js
1 + {}
1 + {[Symbol.toPrimitive](){return 6} valueOf() {return 1}, toString() {return "2"}}
// 优先级 Symbol.toPrimitive最高 valueOf toString

生成 数字
function coverStringToNumber(str, x) {
	var chars = str.split('');
    var number = 0
    var i = 0 
    while (vi < chars.length; && chars[i] != '.') { // 整数部分
		number = number*x;
         number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    }
    if (chars[i] == '.') {
		i++;
    }
    var fraction = 1; //小数部分
    while(i < chars.length) {
        fraction = fraction /x;
        number += （chars[i].codePointAt(0) - '0'.codePointAt(0)）* fraction
        i++
    }
    fraction = fraction /x;
    return number + fraction
}
```

## 5.Statements(语句)

`ExpressionStatement,Block ,LabelledStatement(标签), IterationStatement, `  `[[type]]: return throw(运行时错误)`

### `Iteration`:

### `while, for( ; ;), for( in ), for( of )`

```js
for (let i = 0; i< 10; i++) {}
for (let p in {a:1,b:2}) {console.log(p)} // a, b
for(let p of [1, 2, 3]) {console.log(p)} // iterator机制 => Generator/Array

try {
	throw 2;
} catch(e) {
    //let e = 3; 会报错，生成一个作用域
    console.log(e)
}
//作用域 一个声明的有效文本范围，变量作用范围，文本区域
//执行上下文：存变量的地方，javascript引擎的一块内存
```

## 6.声明

函数声明及var变量声明 会提升

### FuntionDeclaration

```js
//函数声明
funtion foo () {}
class foo {}

var foo = funtion foo () {} / funtion () {}
var foo = class foo {} / class {}
```

### Generator

```js
function* foo () {
    yield 1;
    yield 2;
}
var foo = funtion* foo () {} / funtion () {}
```

### asyncFunction

```js
function sleep(d) {
	return new Promise(resolve=> setTimeout(resolve, d))
}
void async function() {
	var i = 0;
    while(true) {
		console.log(i++)
        await sleep(1000)
    }
}
```

### asyncGeneration

```js
async function* foo() {
    var i = 0;
    while(true) {
		yield i++;
        await sleep(1000)
    }
}
void async function() {
	var g = foo()
    for await(let e of g){
		console.log(e)	
    }
}()
```

### VariableStatement（变量声明）

## 7.Object

唯一标识(对象指针)，状态 (行为变化 成员变量)， 行为(成员函数)

面向对象：1. `Object-Class` 基于类面向对象的    2.`Object-Prototype` 基于原型面向对象

`javaScript `：`Object ` 运行时 , 只关心原型和属性两部分

```js
// Object 属性 是一个 key ,value 对
key: Symbol 、 String
value: 数据型属性， 访问型属性
数据型属性：[[value]], writable, enumerable, configurable
访问型属性： get set,enumerable,configurable
访问属性 会 沿着 原型链 一直往上找 直到null
// Object Api
1. Object.defineProperty
2.Object.create/Object.setPrototypeOf/Object.getPrototypeOf
3.new/class/extends

内置对象
```

### Function  Object
