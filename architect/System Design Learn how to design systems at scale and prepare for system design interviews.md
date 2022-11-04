# System Design Learn how to design systems at scale and prepare for system design interviews

### UDP  

用户数据报协议 (UDP) 是一种更简单的无连接互联网协议，其中不需要错误检查和恢复服务。 使用 UDP，打开连接、维护连接或终止连接没有任何开销。 数据不断地发送给接收者，无论他们是否收到。

对于广播或多播网络传输等实时通信而言，它在很大程度上是首选。 当我们需要最低延迟并且延迟数据比数据丢失更糟糕时，我们应该使用 UDP 而不是TCP。

### TCP vs UDP  

TCP是面向连接的协议，而UDP是无连接的协议。 TCP 和 UDP 之间的一个关键区别是速度，因为 TCP 比 UDP 慢。 总体而言，UDP 是一种更快、更简单、更高效的协议，但是只有 TCP 才能重传丢失的数据包。

TCP 提供从用户到服务器的有序数据传递（反之亦然），而 UDP 不专用于端到端通信，也不检查接收者的准备情况（是否已经准备好）。

| Feature             | TCP                                         | UDP                                |
| ------------------- | ------------------------------------------- | ---------------------------------- |
| Connection          | Requires an established connection          | Connectionless protocol            |
| Guaranteed delivery | Can guarantee delivery of data              | Cannot guarantee delivery of data  |
| Re-transmission     | Re-transmission of lost packets is possible | No re-transmission of lost packets |
| Speed               | Slower than UDP                             | Faster than TCP                    |
| Broadcasting        | Does not support broadcasting               | Supports broadcasting              |
| Use cases           | HTTPS, HTTP, SMTP, POP, FTP, etc            | Video streaming, DNS, VoIP, etc    |

### Domain Name System (DNS)  

## 集群

Highly available or fail-over  （高可用或故障转移）

on standby  （随时待命）

P33