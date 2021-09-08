/*
 * 2021-08-31 14:03:35
 * @create by: zj
 * @Description: LRU 最近最少使用
 */

class LRUCache {
  constructor (capacity) {
    this.secreKey = new Map()
    this.capacity = capacity
  }
  get(key) { // 获取
    if (this.secreKey.has(key)) {
      let tempValue = this.secreKey.get(key)
      this.secreKey.delete(key)
      this.secreKey.set(key, tempValue)
      return tempValue
    }else  {
      return -1
    }
  }
  put(key, value) { // 添加
    if (this.secreKey.has(key)) {
      this.secreKey.delete(key)
      this.secreKey.set(key, value)
    }else if (this.secreKey.size < this.capacity) {
      this.secreKey.set(key, value)
    }else {
      this.secreKey.set(key, value)
      this.secreKey.delete(this.secreKey.keys().next().value)
    }
  }
}
