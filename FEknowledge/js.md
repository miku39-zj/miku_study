

# JavaScript

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

|          | `Number` | `String` | `Boolean` | `Undefinede` | `Null` | `Object` | `Symbol` |
| -------- | -------- | -------- | --------- | ------------ | ------ | -------- | -------- |
| `Number` |          |          |           |              |        |          |          |
|          |          |          |           |              |        |          |          |
|          |          |          |           |              |        |          |          |
|          |          |          |           |              |        |          |          |
|          |          |          |           |              |        |          |          |
|          |          |          |           |              |        |          |          |
|          |          |          |           |              |        |          |          |

