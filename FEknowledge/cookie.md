# cookie和localStorage、sessionStorage区别

前端本地存储的方式有三种，分别是cookie，localstorage和sessionStorage 

## 三者的异同

### 生命周期

cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效

sessionStorage：仅在当前网页会话下有效，关闭页面或浏览器后被清除

localStorage： 除非手动清除，否则将会永久有效

### 存放数据大小

cookie： 4kb左右

localStorage和sessionStorage： 可以保存5MB的信息

### http请求

cookie：会携带下http头中

localStorage和session：仅在客户端中保存，不参与服务器的通信

# Cookie和Session

**HTTP**:超文本传输协议（英文：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议

**HTTP** 是无状态协议，说明它不能以状态来区分和管理请求和响应

## CookieS

Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息

**HTTP 是无状态的协议（对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息**）：每个请求都是完全独立的，服务端无法确认当前访问者的身份信息，无法分辨上一次的请求发送者和这一次的发送者是不是同一个人。所以服务器与浏览器为了进行会话跟踪（知道是谁在访问我），就必须主动的去维护一个状态，这个状态用于告知服务端前后两个请求是否来自同一浏览器。而这个状态需要通过 cookie 或者 session 去实现。

**cookie 存储在客户端：** cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。

**cookie 是不可跨域的：** 每个 cookie 都会绑定单一的域名，无法在别的域名下获取使用，**一级域名和二级域名之间是允许共享使用的**（**靠的是 domain: 指定 cookie 所属域名，默认是当前域名）**

## Session

**session 是一种记录服务器和客户端会话状态的机制**

流程：

- 用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的 Session，并将一个SessionID返回给浏览器
- 浏览器接收到服务器返回的 SessionID 信息后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名
- 当用户第二次访问服务器的时候，将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息

## Cookie和Session的区别

-  Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的。
- 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie
- Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短