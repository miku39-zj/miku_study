/*
 * 2021-09-01 10:26:55
 * @create by: zj
 * @Description: 
 */

class EventBus {
  constructor () {
    this.cache = {}
  }
  on(name, fn) {
    if(this.cache[name]) {
      this.cache[name].push(fn)
    } else {
      this.cache[name] = [fn]
    }
  }
  off(name, fn) {
    let tasks = this.cache[name]
    if(tasks) {
      const index = tasks.indexOf(fn);
      if (index > -1) {
        tasks.splice(index,1)
      }
    }
  }
  emit(name,...args) {
    if(this.cache[name]) {
      let tasks = this.cache[name].slice()
      for(let fn of tasks) {
        fn(...args)
      }
    }
  }
}
