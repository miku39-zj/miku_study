/*
 * 2021-08-31 14:46:07
 * @create by: zj
 * @Description: 
 */

class A {
  constructor () {
    this.promie = Promise.resolve()
  }
  log(val) {
    this.promie = this.promie.then(()=> {
      console.log(val);
    })
    return this
  }
  wait(time) {
    this.promie = this.promie.then(()=>{
      return new Promise(resolve => {
        setTimeout(() => {
          resolve
        },time)
      })
    })
    return this
  }
}
