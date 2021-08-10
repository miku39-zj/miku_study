# filter过滤器

问题：

`1、页面的 filter 解析成什么

2、设置的 filter 如何被调用`

```js
<div>{{parentName|all }}</div>
new Vue({    
    el:document.getElementsByTagName("div")[0],
    data(){        
        return {            
            parentName:111
        }
    },    
    filters:{
        all(){  return "我是过滤器" }
    }
})

```

被解析成下面的渲染函数

```js
function render() {
  with(this) {
    return _c('div', [_v(_s(_f("all")(parentName)))])
  }
}
```

可以看到 **' parentName | all '** 被解析成 **_f('all')( parentName )**

**怎么解析的 ？**

当匹配到 **|** 这个符号，就知道你用过滤器，然后就解析成 **_f** 去获取对应过滤器 并调用

_f 是获取具体过滤器的函数

```js
// 已简化
function installRenderHelpers(target) {
      target._s = toString;
      target._f = resolveFilter;
}
installRenderHelpers(Vue.prototype);
```

_f 是 resolveFilter，一个可以获取 具体filter 的函数

使用 _f("all") 就能获取到 all 这个过滤器

调用 resolveAsset ，目的就是拿到 组件选项中的 具体 filter

```js
function resolveAsset( 
    options, type, id, warnMissing
) {      
    // g：拿到  filters 选项
    var assets = options[type];      
    // g：返回 调用的 filter
    return assets[id]
}
```

