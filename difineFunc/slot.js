/*
 * 2021-07-23 16:53:55
 * @create by: zj
 * @Description: 插槽原理
 */
import Vue from "vue"
var child = {
  template: `<div class="child"><slot></slot></div>`
}
var vm = new Vue({
  el: '#app',
  components: {
    child
  },
  template: `<div id="app"><child>test</child></div>`
})