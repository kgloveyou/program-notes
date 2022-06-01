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

[websocket-heartbeat-js心跳检测库正式发布](https://juejin.cn/post/6844903693142212621)



## [CurryPaste](https://github.com/CurryPaste)/**[ws-heartbeat-ts]**

https://github.com/CurryPaste/ws-heartbeat-ts

1. 使用 `getInstance` 获得ws实例, 而不是 `new` 关键字.



### 问题：

1、页面中多个组件使用ws实例后，前面定义的`onmessage`方法会被后续的定义覆盖，导致接收不到消息。

https://github.com/CurryPaste/ws-heartbeat-ts/issues/10

2、ws服务器重启后，重连失败



## message-center-frontend中定义的useWebsocket.jsx

D:\work_repos\message-center-frontend\src\hooks\useWebsocket.jsx

每调用一次`const { ws } = useWebsocket();`会创建一个新的连接。



## 多个tab页共享websocket

多个tab页如何共享websocket

http://www.zhuguannan.cn/%E9%9D%A2%E8%AF%95%E9%A2%98/%E5%A4%9A%E4%B8%AAtab%E9%A1%B5%E5%A6%82%E4%BD%95%E5%85%B1%E4%BA%ABwebsocket.html

https://blog.csdn.net/sinat_17775997/article/details/123701827，代码路径：E:\practice\SharedWorker\worker.js

[Scaling WebSocket Connections using Shared Workers](https://dev.to/ayushgp/scaling-websocket-connections-using-shared-workers-14mj)

[Reduce WebSocket Connections With Shared Workers](https://blog.pusher.com/reduce-websocket-connections-with-shared-workers/)

[shared worker实现多页面通信](https://juejin.cn/post/7064486575916187656)

[ayushgp](https://github.com/ayushgp)/**[shared-worker-socket-example](https://github.com/ayushgp/shared-worker-socket-example)**

[Scaling WebSocket Connections using Shared Workers](https://ayushgp.xyz/scaling-websockets-using-sharedworkers/)



## react-use-websocket

https://www.npmjs.com/package/react-use-websocket

没有心跳机制，可行的解决方案：https://github.com/robtaussig/react-use-websocket/issues/133



## 参考资料

[ant desgin pro 的项目中 封装的 socket.js](https://www.cnblogs.com/taxun/p/13560138.html)

[websocket长连接和公共状态管理方案（vuex + websocket or redux + websocket ）](https://juejin.cn/post/6882930418446925832)



## dva+subscriptions

[DvaJS的Subscription的使用](https://blog.51cto.com/u_15275953/5131016)



## 单实例ws监听多个onmessage事件

[Multiple Handlers for Websocket Javascript](https://stackoverflow.com/questions/39210534/multiple-handlers-for-websocket-javascript)

```js
ws.addEventListener("message", function(event) {
    var msg = event.data;
    console.info('Push Message : ' + msg);
    Ext.toast({
         html: msg,
         title: 'Alert',
         align: 'br',
         autoShow : true
    });

});

// some other listener for incoming messages
ws.addEventListener("message", function(event) {
    // code here
});
```

如果在多个地方添加监听，会导致响应多次



## pubsub-js

https://www.npmjs.com/package/pubsub-js

PubSubJS 是一个用 JavaScript 编写的基于主题的发布/订阅库。

### Basic example

```js
// create a function to subscribe to topics
var mySubscriber = function (msg, data) {
    console.log( msg, data );
};

// add the function to the list of subscribers for a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on
var token = PubSub.subscribe('MY TOPIC', mySubscriber);

// publish a topic asynchronously
PubSub.publish('MY TOPIC', 'hello world!');

// publish a topic synchronously, which is faster in some environments,
// but will get confusing when one topic triggers new topics in the
// same execution chain
// USE WITH CAUTION, HERE BE DRAGONS!!!
PubSub.publishSync('MY TOPIC', 'hello world!');
```

[React+Websocket简单实例](https://developer.aliyun.com/article/782771?spm=a2c6h.13262185.profile.11.5addabf9hcjQqA)

