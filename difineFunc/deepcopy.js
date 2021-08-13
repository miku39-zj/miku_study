/*
 * 2021-08-12 19:33:10
 * @create by: zj
 * @Description: 
 */
function deepClone (target, map = new WeakMap()) {
  if (target === null || typeof target !== 'object') {
    return target
  }
  if (map.get(target)) {
    return target
  }
  const cloneTarget = Array.isArray(target) ? [] : {}
  map.set(target, cloneTarget)
  for(const key in target) {
    cloneTarget[key] = deepClone(target[key], map)
  }
  return cloneTarget
}

const obj = {a: [1,2,3],b: {asd: 66}, c: 777}

console.log(deepClone(obj));