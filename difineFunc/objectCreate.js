/*
 * @Description: Object.create()
 */
let myCreate = function (o) {
  function F() {}
  F.prototype = o
  return new F()
}