/*
 * 2021-08-19 20:15:40
 * @create by: zj
 * @Description: 
 */
// Object.assign()
Object.myAssign =  function(target, ...source) {
  if (target === null || target === undefined) {
    throw new TypeError("")
  }
  let res = Object(target)
  source.forEach(obj => {
    if(obj !== null) {
      Object.keys(obj).forEach(key => {
        res[key] = obj[key]
      })
    }
  })
  return res
}
// Object.prototype.propertyIsEnumerable
Object.assign =  function(target, ...source) {
  if (target === null || target === undefined) {
    throw new TypeError("")
  }
  let res = Object(target)
  source.forEach(obj => {
    if(obj !== null) {
      Reflect.ownKeys(obj).forEach(key => {
        if(obj.propertyIsEnumerable(key)) {
          res[key] = obj[key]
        }
      })
    }
  })
  return res
}
