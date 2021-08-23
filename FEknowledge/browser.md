# 浏览器知识

## `五层协议`

- 应用层： `HTTP`
- 传输层： `TCP`
- 网络层： `Internet  ip`
- 数据链路层
- 物理层

## `TCP 与 IP`

`TCP`: `流， 端口 ， require('net')  全双工通道`

`IP`: `包, IP地址， `

## `HTTP`

文本协议，通过文本来发

- `Request`
- `Response`

响应数据：`HTTP/1.1 200 OK`  status line 
`Content-Type: text/html`
`Connection: keep-alive`      headers
`Transfer-Encoding: chunk`

`26 `
`<body>asdsadsa</body>`   body

流的形式 ，  状态机

