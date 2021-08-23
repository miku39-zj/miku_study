/*
 * 2021-08-21 18:48:59
 * @create by: zj
 * @Description: 
 */
function myinstaceof(left, right) {
  let lproto = Object.getPrototypeOf(left)
  const rProto = right.prototype
  while(lproto !== null) {
    if (lproto === rProto) {
      return true
    }
    lproto = Object.getPrototypeOf(lproto)
  }
  return false
}