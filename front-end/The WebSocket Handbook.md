# The WebSocket Handbook: learn about the technology behind the realtime web

Server-Sent Events (SSE)  

SSE 旨在通过称为 `EventSource` 的 JavaScript API 增强本地跨浏览器服务器到客户端的流式传输，该 API 由万维网联盟 (W3C) 标准化为 HTML5 的一部分。

这是通过 SSE 打开流的快速示例：

```js
var source = new EventSource('URL_TO_EVENT_STREAM');
source.onopen = function () {
  console.log('connection to stream has been opened');
};
source.onerror = function (error) {
  console.log('An error has occurred while receiving stream', error);
};
source.onmessage = function (stream) {
  console.log('received stream', stream);
};
```



我们可以将 WebSocket 用例大致分为两个不同的类别：

- 实时更新。想想实时体育更新、警报、实时仪表板或位置跟踪，仅举几个用例。
- 双向通信：示例包括聊天、虚拟活动和虚拟教室（最后两个通常涉及投票、测验和问答等功能）。 WebSockets 还可用于支持多用户同步协作功能，例如多人同时编辑同一个文档。



## 子协议

子协议可以分为三个主要类别：

- **Registered protocols**. This refers to the protocols that are registered with IANA.
- **Open protocols**. Open protocols, such as Message Queuing Telemetry Transport (MQTT) or Simple Text Oriented Message Protocol (STOMP).
- **Custom protocols**. Refers to open-source libraries or proprietary solutions introducing their specific flavor of WebSocket-based communications.  

## 构建系统以实现规模化

发布/订阅模式

## 备用传输

大多数 WebSocket 解决方案都内置了回退支持。例如，Socket.IO 是目前最流行的开源 WebSocket 库之一，如果可能，它将不透明地尝试建立 WebSocket 连接，否则将回退到 HTTP 长轮询 .

另一个例子是 SockJS，它支持大量的流式和轮询回退，包括 xhr-polling（使用跨域 XHR 的长轮询）和 eventsource（Server-Sent Events）。

## 管理 WebSocket 连接和消息

## 监控 WebSocket

## 恢复连接

### 自动重新连接

一种改进是使用指数退避重新连接算法，如下例所示：

您可以通过使其随机化来使指数退避机制更可靠，因此并非所有客户端都在完全相同的时间重新连接：

### 具有连续性的重新连接

## 心跳

WebSocket 协议本身支持称为 Ping 和 Pong 的控制帧。这些控制帧是一种应用程序级的心跳机制，用于检测 WebSocket 连接是否处于活动状态。 通常，服务器是发送 Ping 帧的服务器，并且，收到后，客户端必须发回一个 Pong 帧作为响应。

## Backpressure（背压？）

典型的背压纠正措施是不加选择地丢弃数据包。 当从 WebSocket 流发送的最后一条消息始终是最重要的消息时，这种方法很有效——例如，像现场体育更新这样的用例，其中最新的比分是最相关的信息。 为了减少带宽和延迟，除了丢包之外，您还应该考虑消息增量压缩之类的东西，它通常使用差异算法仅将前一条消息的更改而不是整个消息发送给消费者。

但是，丢弃数据包并不总是一个好的解决方案——在某些用例中，数据完整性至关重要，而且您根本无法承受丢失信息的后果。 在这种情况下，您应该使用应用程序级确认 (ACK) 作为消息接收的确认，并将您的系统配置为在收到 ACK 之前暂停发送额外的消息批次。 即使涉及断开连接，您还需要考虑如何确保流的连续性。

## 关于容错的快速说明

## 大规模 WebSockets 清单