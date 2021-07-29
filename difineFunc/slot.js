/*
 * 2021-07-23 16:53:55
 * @create by: zj
 * @Description: 插槽原理
 */
import Vue from "vue"
var child = {
  name: "child",
  data() {
    return {
      msg: "hello world"
    }
  },
  template: `<div class="child">
    <slot name="bar"></slot>
    <slot name="foo" v-bind="{ msg }"></slot>
  </div>`
}
// template 就会被编译为这样的函数
with (this) {
  return _c("div", [_t("bar"), _t("foo", null, null, { msg })], 2);
}
// _t 也就是 renderSlot的别名
// renderSlot函数， 如果普通插槽，就直接调用函数生成 vnode，
// 如果是 作用域插槽，就直接带着 props 也就是 { msg } 去调用函数生成 vnode

var vm = new Vue({
  el: '#app',
  components: {
    child
  },
  template: `<div id="app">
    <child>
      <template v-slot:bar>
        <span>Hello</span>
      </template>
      <template v-slot:foo="prop">
        <span>{{prop.msg}}</span>
      </template>
    </child>
  </div>`
})
// Vue 2.6 版本后对 slot 和 slot-scope 做了一次统一的整合，让它们全部都变为函数的形式，所有的插槽都可以在 this.$scopedSlots 上直接访问
//v-slot 模板会被编译成这样： key 如果没有命名，默认是default
with(this) {
  return _c("child", {
    scopedSlots: _u([{
        key: "bar",
        fn: function () {
          return [_c("span", [_v("Hello")])];
        },
      },
      {
        key: "foo",
        fn: function (prop) {
          return [_c("span", [_v(_s(prop.msg))])];
        },
      },
    ]),
  });
}

// child 组件的实例 this.$scopedSlots 就可以访问到这两个 foo 、 bar 函数

// slot 2.5
var vm = new Vue({
  el: '#app',
  components: {
    child
  },  
  data(){
    return {
      name: 45
    }
  },
  template: `<div id="app">
    <child>
      <template slot="name">
        {{name}}
      </template>
    </child>
  </div>`
})
// 将插槽内容作为 children 渲染的，会在父组件的渲染函数中创建，插槽内容的依赖会被父组件收集
// 由于生成 slot 的作用域是在父组件中，所以明明是子组件的插槽 slot 的更新是会带着父组件一起更新的
with (this) {
  return _c(
    'child',
    [
      _c(
        'template',
        {
          slot: 'name'
        },
        [_v(_s(name))]
      )
    ],
    2
  )
}