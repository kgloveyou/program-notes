# Distributed Systems with Node.js

勘误链接

https://www.oreilly.com/catalog/errata.csp?isbn=0636920342762

## 第1章 为什么使用分布式？

例如，`Atomics`对象提供了跨不同线程协调通信的机制，而`SharedArrayBuffer`的实例可以跨线程写入和读取。

### JavaScript的单线程特性

### Node.js 快速概览

Node.js itself *is* multithreaded. The lower levels of Node.js are written in C++.  

Internally, libuv maintains a thread pool for managing I/O operations, as well as CPU-heavy operations like crypto and zlib.   



Additionally, many of these objects have a pair of methods attached to them, `.unref()` and `.ref()`. The former method is used to tell the object to no longer keep the process alive, whereas the latter does the opposite.  



not all of the APIs that exist in browser JavaScript behave the same way in Node.js.  The `setTimeout()` function,for example, returns an integer in web browsers. The Node.js implementation returns an object with several properties and methods.  

### Node.js  事件循环

#### 事件循环阶段

**microtask queues**

第一个微任务队列处理使用 process.nextTick() 注册的回调。

第二个微任务队列处理 promises that reject or resolve.   

微任务队列中的回调优先于阶段正常队列中的回调，next tick 微任务队列中的回调运行在promise微任务队列的回调之前。

#### Event Loop Tips  

### 示例应用程序

# 第2章 协议（Protocols）

Inter-Process Communication (IPC)  

Remote Procedure Call (RPC)  

## Request and Response with HTTP  

### HTTPS / TLS  

Transport Layer Security (TLS)  

### JSON over HTTP  

### The Dangers of Serializing POJOs  

## API Facade with GraphQL  

GraphQL 并没有规定使用特定的底层协议。

### GraphQL Schema  

### GraphQL Producer  

### GraphQL Consumer  

## RPC with gRPC  

Remote Procedure Call (RPC)  

使用 RPC，您可以几乎以其原始形式向网络公开该方法，而不是完成创建不同接口的工作。

通常，RPC 的工作方式是选择要公开应用程序中的哪些函数，并在这些函数之间与某种网络接口之间创建映射。

Google’s **gRPC**. gRPC is typically served over HTTP/2.   

### Protocol Buffers  

gRPC typically  transfers the data using Protocol Buffers (aka Protobufs)  

Protocol Buffer消息中的属性顺序非常重要，原因有两个：

第1个原因是字段名称不与消息本身一起传输。

字段顺序很重要的第2个原因是使用Protobufs和 gRPC 本身表示的消息被设计为向后兼容。

### gRPC Producer  

The gRPC package abstracts the underlying HTTP/2 layer, so you typically don’t need to think of a gRPC service as being over HTTP/2, nor do you have to think about the paths.  

### gRPC Consumer  

