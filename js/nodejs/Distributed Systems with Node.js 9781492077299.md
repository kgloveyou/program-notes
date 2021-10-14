# Distributed Systems with Node.js

代码

https://github.com/tlhunter/distributed-node

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

A metric is numeric data associated with time  

## 使用 Zipkin 进行分布式请求跟踪

## 健康检查

### 构建健康检查

### 测试健康检查

## 使用 Cabot 发送警告

# 第5章 容器

brittleness	脆弱性

## Docker 简介

如果 Dockerfile 中的一行预计会频繁更改，则应将其放置在 Dockerfile的后面。 这将允许在应用程序的 Docker 镜像的多个版本之间重用之前的层。

Alpine 是一个极其精简的 Linux 发行版，通常是有存储意识的开发人员选择的基本映像。有时，应用程序确实依赖于这样一个简单的基础映像没有提供的功能，而可能需要使用更复杂的功能。

官方的 [Node.js Docker 镜像](https://hub.docker.com/_/node/)包含 Debian 和 Alpine 的变体。

查看docker镜像列表

```sh
$ docker images
```

查看镜像层信息

```sh
$ docker history grafana/grafana:6.5.2
```

拉取镜像

```sh
$ docker pull node:lts-alpine
```

运行容器

```sh
$ docker run -it --rm --name ephemeral ubuntu /bin/bash
```

在Docker容器退出时，默认容器内部的文件系统仍然被保留，以方便调试并保留用户数据。

但是，对于foreground容器，由于其只是在开发调试过程中短期运行，其用户数据并无保留的必要，因而可以在容器启动时设置--rm选项，这样在容器退出时就能够自动清理容器内部的文件系统。

查看运行的容器

```sh
$ docker ps
```

甚至可以在当前运行的 Docker 容器中手动执行命令。

```sh
$ docker exec ephemeral /bin/ls /var  
```

退出容器

```sh
$ exit
```

容器将被拆除，并且由于它是使用 --rm 标志运行的，因此它将从您的系统中完全删除。

移除容器

```sh
$ docker rm <name/id>
```

移除镜像

```sh
$ docker rmi <image id>  
```

共享文件系统

`-v / --volume` 

`--mount  `

端口映射

`-p / --publish`

```sh
$ rm index.html ; curl -o index.html http://example.org
$ docker run --rm -p 8080:80 \
-v $PWD:/usr/share/nginx/html nginx
```

在这种情况下，使用 `-p 8080:80` 将主机上的端口 8080 映射到容器中的端口 80。

The current directory is mapped to the directory used by nginx to read static files with the `-v $PWD:/usr/share/nginx/html` flag (the -v flag expects absolute directories, which is why the command uses $PWD instead of “.”).  

viable  可行的

## 容器化Node.js服务

### Dependency Stage  

Example 5-2. recipe-api/Dockerfle “deps” stage

```dockerfile
FROM node:14.8.0-alpine3.12 AS deps


WORKDIR /srv

COPY package*.json ./

RUN npm ci --only=production

\# COPY package.json yarn.lock ./

\# RUN yarn install --production
```

一般来说，在处理诸如 Docker 镜像之类的干净环境时，`npm ci` 命令比 `npm install` 更快。

### Release Stage  

143