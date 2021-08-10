# Computed计算属性

**`computed` 和 `watch` 的差异**

1. `computed` 是计算一个新的属性，并将该属性挂载到 vm（Vue 实例）上，而 `watch` 是监听已经存在且已挂载到 `vm` 上的数据，所以用 `watch` 同样可以监听 `computed` 计算属性的变化（其它还有 `data`、`props`）
2. `computed` 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问  `computed`  属性，才会计算新的值，而 `watch` 则是当数据发生变化便会调用执行函数
3. 从使用场景上说，`computed` 适用一个数据被多个数据影响，而 `watch` 适用一个数据影响多个数据；

## Computed原理流程

### computed数据响应

1. 当组件初始化的时候，`computed` 和 `data` 会分别建立各自的响应系统，`Observer`遍历 `data` 中每个属性设置 `get/set` 数据拦截

2. 初始化 `computed` 会调用 `initComputed` 函数
   1. 注册一个 `watcher` 实例，
   
      ```js
      // state.js
      function initComputed (vm: Component, computed: Object) {
          const watchers = vm._computedWatchers = Object.create(null)
          const userDef = computed[key]
          const getter = typeof userDef === 'function' ? userDef : userDef.get
      	watchers[key] = new Watcher(
              vm,
              getter || noop,
              noop,
              computedWatcherOptions  //lazy: true
            )
      }
      // watcher.js
      class Watcher {
      	constructor () {
              this.dirty = this.lazy
              if (typeof expOrFn === 'function') {
           		this.getter = expOrFn //函数
          	}
              this.value = this.lazy
            ? undefined // computed不执行
            : this.get() //执行get
         }
      }
      ```
   
   2. 定义createComputedGetter，通过Object.defineProperty(target, key, sharedPropertyDefinition)去拦截，当通过this.key来获取时，会通过`watcher.evaluate()`来重新计算值，并调用`watcher.depend()`来添加`dep`订阅
   
      ```js
      export function defineComputed (
        target: any,
        key: string,
        userDef: Object | Function
      ) {
        sharedPropertyDefinition.get = shouldCache
            ? createComputedGetter(key)
            : createGetterInvoker(userDef)
        Object.defineProperty(target, key, sharedPropertyDefinition)
      }
      function createComputedGetter (key) {
        return function computedGetter () {
          const watcher = this._computedWatchers && this._computedWatchers[key]
          if (watcher) {
            if (watcher.dirty) { //脏数据
              watcher.evaluate()//重新计算
            }
            if (Dep.target) {
              watcher.depend() // 添加dep订阅
            }
            return watcher.value
          }
        }
      }
      
      //watcher.js
      evaluate () {
          this.value = this.get() //执行getter
          this.dirty = false // dirty为false
      }
      
      depend () {
          let i = this.deps.length
          while (i--) {
            this.deps[i].depend() //添加订阅
          }
      }
      ```
   
      
3. 当某个属性发生变化，触发 `set` 拦截函数，然后调用自身消息订阅器 `dep` 的 `notify` 方法，遍历当前 `dep` 中保存着所有订阅者 `wathcer` 的 `subs` 数组，并逐个调用 `watcher` 的  `update` 方法，完成响应更新。

   