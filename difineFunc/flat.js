/*
 * 2021-08-27 16:34:17
 * @create by: zj
 * @Description: 
 */

function flat(arr) {
  return arr.reduce((cur, pre) => {
    return cur.concat(Array.isArray(pre) ? flat(pre) : pre)
  }, cur)
}
