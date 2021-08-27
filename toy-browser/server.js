/*
 * 2021-08-21 11:47:20
 * @create by: zj
 * @Description: 
 */
//  开启HTTP服务
let http = require("http")

const server = http.createServer((req, res) => {
  // console.log(req,"request received");
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'PUT')
  res.setHeader('Cache-Control', 'max-age=120')
  res.setHeader('Content-Type', 'application/json;charset=UTF-8')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, {
    'Content-type': 'text/plain'
  });
  res.end(`<div>6666</div>`)
})
server.listen(8088)