# Props原理

三个问题

1. 父组件 怎么传值给 子组件的 props
2. 子组件如何读取props
3. 父组件 data 更新，子组件的props 如何更新

现在我们有一个这样的 **根组件 A** 和 他的 **子组件 test**

**根组件A** 会 把 parentName 传给 **子组件 test** 的 props

**根组件A** 也是 **组件test** 的 父组件

```html
//父组件
<div class="a">
    <test :child-name="parentName" ></test>
</div>
```

```js
new Vue({    
    el:".a",        
    name:"A",    
    components:{        
        testb:{            
            props:{                
                childName:""
            },            
        template: '<p>父组件传入的 props 的值 {{childName}}</p>',
        }
    },
    data(){       
        return {            
            parentName:"我是父组件"
        }
    },
})
```

## 父组件 传 props

**props传值设置**

```html
<div class="a">
    <test :child-name="parentName" ></test>
</div>
```

**父组件的模板 会被解析成一个 模板渲染函数**

```js
function render() {
  with(this) {
    return _c('div', {
      staticClass: "a"
    }, [_c('test', {
      attrs: {
        "child-name": parentName
      }
    })], 1)
  }
}
```

**props开始赋值**

模板函数会被执行，执行时会绑定 **父组件为作用域** ，所以渲染函数内部所有的变量，**都会从父组件对象 上去获取**

绑定了父作用域之后， parentName 自然会从父组件获取，父组件赋值之后的 attrs 就是下面这样

```js
_c('testb',{attrs:{"child-name":parentName}})
```

**子组件保存props**

子组件拿到父组件赋值过后的 attr 

而 attrs 包含 普通属性 和 props，所以需要 **筛选出 props**，然后保存起来

## 自组件读取props

this.key 就是 this._props[key]

```js
Object.defineProperty(vm, key, {    
    get() {        
        return this._props[key]
    },    
    set(val) {        
        this._props[key] = val
    }
});
```

直接在这里给 props 赋值，不会影响到 父组件的data 的好吧

## 父组件数据变化，子组件props如何更新

**parentName 会收集 父组件的 watcher**

在 get 函数中，parentName 会将 父组件的 watcher 保存到自己的 **依赖收集器** 中

**父组件重新渲染，重新赋值 props**

parentName 改变之后，触发 parentName 的 **set** 函数，里面会通知 自己**依赖收集器**中 父组件的 watcher

父组件 watcher 开始更新，重新开始渲染的步骤

然后渲染函数执行
