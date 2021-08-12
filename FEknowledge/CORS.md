# 跨域

## 什么是同源策略？

同源策略是一种约定，是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

**同源策略限制内容有：**

- `Cookie`、`LocalStorage`、`IndexedDB` 等存储性内容
- `DOM` 节点
- `AJAX`请求发送后，结果被浏览器拦截了

但是有三个标签是允许跨域加载资源：

- `<img src=XXX>`
- `<link href=XXX>`
- `<script src=XXX>`

**跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了**

## 跨域解决方案

### `JSONP`

`JSONP`原理：

​	利用 `<script>` 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP请求一定需要对方的服务器做支持才可以

`JSONP`优缺点：

​	`JSONP`优点是兼用性好
​	缺点是，仅支持get方法，可能会遭受`XSS`攻击

`JSONP`实现

​	

```js

function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    window[callback] = function(data) {
      resolve(data)
      document.body.removeChild(script)
    }
    params = { ...params, callback } // wd=b&callback=show
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}
jsonp({
  url: 'http://localhost:3000/say',
  params: { wd: 'Iloveyou' },
  callback: 'show'
}).then(data => {
  console.log(data)
})
```

### `CORS`

`CORS`全称**跨域资源共享**。它允许浏览器向跨源服务器，发请求，浏览器会自动进行 `CORS` 通信，实现 `CORS `通信的关键是后端

服务端设置`Access-Control-Allow-Origin`就可以开启`CORS`，该属性表示哪些域名可以访问资源

在请求时有两种情况,分为**简单请求**和**非简单请求**

**简单请求**

满足以下条件的就是简单请求：

- 请求方式为`GET`、`POST`或`HEAD`
- `http`头信息不超出，`Accept`、`Accept-Language` 、 `Content-Language`、 `Last-Event-ID`、 `☆ Content-Type`(限于三个值：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`)

简单请求的具体实现：在请求是加入一个`Origin`字段

```
GET /cors HTTP/1.1
Origin: http://wang.com
```

Origin的作用就是说嘛本次请求来自哪个源，服务器会根据`Origin`的值来判断是否接受本次请求

服务端设置：`Access-Control-Allow-Origin`,表示接受哪些域名的请求

**非简单请求(复杂请求)**

就是不满足简单请求的

像请求方法为`PUT`或`DELETE`,或者`Content-Type`为`application/json`

复杂请求会是发起一个预检请求