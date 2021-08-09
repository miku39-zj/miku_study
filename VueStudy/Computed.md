# Computed计算属性

**`computed` 和 `watch` 的差异**

1. `computed` 是计算一个新的属性，并将该属性挂载到 vm（Vue 实例）上，而 `watch` 是监听已经存在且已挂载到 `vm` 上的数据，所以用 `watch` 同样可以监听 `computed` 计算属性的变化（其它还有 `data`、`props`）
2. `computed` 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问  `computed`  属性，才会计算新的值，而 `watch` 则是当数据发生变化便会调用执行函数
3. 从使用场景上说，`computed` 适用一个数据被多个数据影响，而 `watch` 适用一个数据影响多个数据；

## Computed原理流程

### computed数据响应

1. 当组件初始化的时候，`computed` 和 `data` 会分别建立各自的响应系统，`Observer`遍历 `data` 中每个属性设置 `get/set` 数据拦截

2. 初始化 `computed` 会调用 `initComputed` 函数
   1. 注册一个 `watcher` 实例，并在内实例化一个 `Dep` 消息订阅器用作后续收集依赖
   2. 调用计算属性时会触发其`Object.defineProperty`的`get`访问器函
3. 当某个属性发生变化，触发 `set` 拦截函数，然后调用自身消息订阅器 `dep` 的 `notify` 方法，遍历当前 `dep` 中保存着所有订阅者 `wathcer` 的 `subs` 数组，并逐个调用 `watcher` 的  `update` 方法，完成响应更新。

   