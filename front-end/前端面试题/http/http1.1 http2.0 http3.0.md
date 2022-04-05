# http1.1 http2.0 http3.0

[一文总结http1.0，http1.1，http2，http3，面试强心剂](https://juejin.cn/post/7001510315514937375)

## http2

htpp2头部压缩

http2多路复用

## http3

之前说了http2，那么http3就是为了解决http2相关问题而诞生，它基于一个新的传输层协议**QUIC**，而http3就是建立一个在QUIC上运行的HTTP新规范，而http3之前的版本都是基于TCP，QUIC就是为了替代TCP，解决TCP的一些缺陷

### QUIC

1. 同样拥有**头部压缩**，并优化了对乱序发送的支持，也优化了压缩率
2. 放弃tcp，通过**udp**建立，提高了连接建立的速度，降低了延迟
3. tcp本身是无法解决**队头拥塞**，quic则**解决**了这个问题
4. Connection ID使得http3支持**连接迁移**以及NAT的重绑定