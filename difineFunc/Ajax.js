/*
 * 2021-08-25 18:43:59
 * @create by: zj
 * @Description: 
 */

function ajax(url, method, headers,body) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    for (let key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= '200' && xhr.status < '300') {
          resolve(xhr.responseText)
        }else {
          reject(xhr)
        }
      }
    }
    xhr.send(body)
  })
}