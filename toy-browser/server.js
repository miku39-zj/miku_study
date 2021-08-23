/*
 * 2021-08-21 11:47:20
 * @create by: zj
 * @Description: 
 */
//  开启HTTP服务
let http = require("http")

const server = http.createServer((req, res) => {
  console.log("request received")
  console.log(req.headers);
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods','PUT')
  res.setHeader('Content-Type','text/html')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, {'Content-type': 'text/plain'});
  res.end('ok');
})
server.listen(8088)