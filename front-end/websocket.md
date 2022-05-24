# websocket

## socket.io-client

socket.io和WebSocket 有点不一样, 要用socket.io后端也要用socket.io



https://socket.io/docs/v4/

Although Socket.IO indeed uses WebSocket for transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.



## 原生

WebSocket + React 的简单 Demo

https://juejin.cn/post/6891684645880987661



React Hook 实现 WebSocket

https://juejin.cn/post/6956514880887193636



## react-use-websocket

https://www.npmjs.com/package/react-use-websocket

https://github.com/robtaussig/react-use-websocket



## websocket-heartbeat-js

https://www.npmjs.com/package/websocket-heartbeat-js

websocket-heartbeat-js基于浏览器js原生websocket封装，主要目的是保障客户端websocket与服务端连接状态。该程序有心跳检测及自动重连机制，当网络断开或者后端服务问题造成客户端websocket断开，程序会自动尝试重新连接直到再次连接成功。



## 参考资料

[ant desgin pro 的项目中 封装的 socket.js](https://www.cnblogs.com/taxun/p/13560138.html)