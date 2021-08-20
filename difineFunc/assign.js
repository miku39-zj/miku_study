/*
 * 2021-08-19 20:15:40
 * @create by: zj
 * @Description: 
 */
Object.myAssign =  function(target, ...source) {
  if (target === null) {
    throw new TypeError("")
  }
  let res = Object(target)
  source.forEach(obj => {
    if(obj !== null) {
      for(let key in obj) {
        res[key] = obj[key]
      }
    }
  })
}
