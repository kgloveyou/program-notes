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

# 第3章 Scaling   

出于至少两个原因，运行服务的冗余副本很重要。

第一个原因是为了实现高可用性。

另一个原因是给定的 Node.js 实例只能处理这么多的吞吐量。

## The Cluster Module  

Node.js 提供了集群（cluster）模块，允许在同一台机器上运行 Node.js 应用程序的多个副本，将传入的网络消息分派到副本。

knee-jerk  下意识的

### 一个简单的例子

### 请求分发 （Request Dispatching）

### Cluster的缺点（Cluster Shortcomings ）

cluster最大的缺点是它只将传入的请求分发给运行在同一台机器上的进程。

## 使用 HAProxy 反向代理（Reverse Proxies with HAProxy ）

### HAProxy 简介

和 JavaScript 一样，HAProxy 是事件驱动和单线程的。

**HAProxy 的替代品**

- Nginx  

### 负载平衡和健康检查

### 压缩

### TLS Termination  

cipher 密码

### Rate Limiting and Back Pressure  

One way to do this is to set the `maxConnections` property of an `http.Server` instance.   

## SLA 和负载测试

*Service Level Agreement (SLA)*  ，服务水平协议

ample  充足的

uptime  正常运行时间

throughput  吞吐量

### Autocannon 介绍

load-testing  负载测试

```sh
$ npm install -g autocannon@6  
```

polyglot  多语言

Apache Bench (ab)  

### 运行基线负载测试

### Reverse Proxy Concerns  

#### Establishing a baseline  

### Protocol Concerns  

# 第4章 Observability  

reactive  被动的

proactive	主动的

## 环境

作为惯例，Node.js 应用程序通常使用 NODE_ENV 环境变量来指定实例在哪个环境中运行。

通常，公司至少会拥有以下环境：



## 使用 ELK 进行日志记录

*Elasticsearch, Logstash*, and *Kibana*,   

on-prem  本地

**Elasticsearch**  

**Logstash**  

**Kibana**  

### 通过 Docker 运行 ELK

## Metrics with Graphite, StatsD, and Grafana  

102