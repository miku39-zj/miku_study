/*
 * 2021-07-22 15:47:27
 * @create by: zj
 * @Description:  Vue.use原理  执行插件的install 方法 ，，用一个数组保存起来，避免重新加载
 */

// 1、在Vue.js上新增了use方法，并接收一个参数plugin。

// 2、首先判断插件是不是已经别注册过，如果被注册过，则直接终止方法执行，此时只需要使用indexOf方法即可。

// 执行 plugin 下的 install
import Vue from "vue";

Vue.use = function (plugin) {
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
  if (installedPlugins.indexOf(plugin) > -1) {
    return this;
  } 
  // 其他参数
  const args = toArray(arguments, 1);
  args.unshift(this);
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args);
  } else if (typeof plugin === 'function') {
    plugin.apply(null, plugin, args);
  }
  installedPlugins.push(plugin);
  return this;
}