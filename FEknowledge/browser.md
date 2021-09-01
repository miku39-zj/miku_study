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

`URL HTTP => HTML parse => DOM css computing => DOM with CSS layout => DOM with position render=> Bitmap `

## `HTTP`

主要获取`HTML`

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

### 有限状态机处理字符串

**有限状态机：**每个状态都是一个机器

- 在每一个机器里，可以做计算、存储、输出
- 所有机器接受的输入时一致的
- 状态机的每一个机器本身没有状态，如果用函数来表示的化，它应该是纯函数

每一个机器知道下一个状态

- 每个机器都有确定的下一个状态（Moore）
- 每个机器根据输入决定下一个状态（Mealy）

## HTML解析

