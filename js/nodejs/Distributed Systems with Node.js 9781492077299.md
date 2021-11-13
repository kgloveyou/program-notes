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

使用 RPC，你可以几乎以其原始形式向网络公开该方法，而不是完成创建不同接口的工作。

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

容器将被拆除，并且由于它是使用 --rm 标志运行的，因此它将从你的系统中完全删除。

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

```dockerfile
FROM alpine:3.12 AS release

ENV V 14.8.0
ENV FILE node-v$V-linux-x64-musl.tar.xz

RUN apk add --no-cache libstdc++ \
  && apk add --no-cache --virtual .deps curl \
  && curl -fsSLO --compressed \
  "https://unofficial-builds.nodejs.org/download/release/v$V/$FILE" \
  && tar -xJf $FILE -C /usr/local --strip-components=1 \
  && rm -f $FILE /usr/local/bin/npm /usr/local/bin/npx \
  && rm -rf /usr/local/lib/node_modules \
  && apk del .deps
```

Dockerfile 声明将执行多个命令，但它们包含在单个 RUN 指令中以保持中间层的数量较少。

&&符号表示正在运行新命令（如果上一条命令失败，则不应运行下一条命令）。

Alpine 操作系统带有一个名为 `apk` 的包管理器，RUN 指令中的前两个命令使用它安装包。这些软件包是通过运行 `apk add` 来安装的。`--no-cache` 标识告诉 apk 不要留下任何跟踪安装的包管理文件，这有助于使镜像更小。`--virtual .deps` 标志告诉 `apk` 跟踪已安装的包及其依赖项。 然后，稍后，可以立即删除该组软件包。

最后， `apk del .deps` 命令删除 `curl` 及其依赖项。



例 5-4. recipe-api/Dockerfile“发布”阶段第2部分

```dockerfile
WORKDIR /srv
COPY --from=deps /srv/node_modules ./node_modules
COPY . .

EXPOSE 1337
ENV HOST 0.0.0.0
ENV PORT 1337
CMD [ "node", "producer-http-basic.js" ]
```

### 从镜像到容器

Example 5-5. 从 Dockerfile 构建镜像

```sh
$ cd recipe-api
$ docker build -t tlhunter/recipe-api:v0.0.1 .
```

tag pattern: `repository/name:version`  

如果未指定版本号，Docker 将提供默认的`latest`标签。

运行容器

```sh
$ docker run --rm --name recipe-api-1 \
-p 8000:1337 tlhunter/recipe-api:v0.0.1
```

停止容器（在新终端中运行）

```sh
$ docker kill recipe-api-1
```

### Rebuilding and Versioning an Image  

运行以下命令以查看你的应用程序 v0.0.1 版本的每个层的大小：

```sh
$ docker history tlhunter/recipe-api:v0.0.1
```

## 使用 Docker Compose 进行基本编排

Docker Compose  

docker-compose.yml  

### Composing Node.js Services  

当一个项目包含多个Dockerfile文件时，除了默认的Dockerfile外，其他按照惯例命名为`Dockerfile-*`  。

*Example 5-8. docker-compose.yml, part one*  

```yml
version: "3.7"
services:
  zipkin:
    image: openzipkin/zipkin-slim:2.19
    ports:
      - "127.0.0.1:9411:9411"
```

*Example 5-9. docker-compose.yml, part two*  

```yaml
  recipe-api:
    build:	①
      context: ./recipe-api
      dockerfile: Dockerfile-zipkin
    ports:
      - "127.0.0.1:4000:4000"
    environment:	②
      HOST: 0.0.0.0
      ZIPKIN: zipkin:9411
    depends_on:	③
      - zipkin
```

1. Instead of using a named image, a path to a Dockerfile is provided.
2. Environment variable pairs used by the service.
3. The *zipkin* service should be started before this container  



在这种情况下，`HOST` 值被覆盖为 0.0.0.0，这样应用程序将接受来自 Docker 容器外部的请求。



告诉 Docker Compose 启动你的服务

```sh
$ docker-compose up
```

停止服务

```sh
$ ctrl + c
```

删除相应的服务

```sh
$ docker rm distributed-node_web-api_1 \
distributed-node_recipe-api_1 distributed-node_zipkin_1
```

## Internal Docker Registry  

Docker Registry 是一个可以存储 Docker 镜像及其附属层的地方。默认情况下，Docker CLI 配置为使用 Docker Hub，即 Docker 的官方公共Registry。



`repository/name:version`  实际上是`server/repository/name:version`的简写，当server缺失时，Docker CLI 默认使用 Docker Hub 的repository -`docker.io`。`repository`部分也有默认值.  例如，命令 `docker pull node:14.8.0-alpine3.12` 也可以使用更简洁的 `docker pull docker.io/library/node:14.8.0-alpine3.12` 版本表示。

### 运行 Docker Registry  

### Pushing and Pulling to the Registry  

推送镜像命令：`docker push`  

```sh
# run for each of v0.0.1, v0.0.2, v0.0.3
$ time docker push localhost:5000/tlhunter/recipe-api:v0.0.1
```

`time`  命令将打印复制镜像所需的时间。



首先删除原来的镜像

```shell
$ docker rmi localhost:5000/tlhunter/recipe-api:v0.0.2
$ docker rmi tlhunter/recipe-api:v0.0.2
$ docker run tlhunter/recipe-api:v0.0.2 # should fail
```

拉取镜像并运行

```sh
$ docker pull localhost:5000/tlhunter/recipe-api:v0.0.2
$ docker image tag localhost:5000/tlhunter/recipe-api:v0.0.2 \
tlhunter/recipe-api:v0.0.2
$ docker run tlhunter/recipe-api:v0.0.2 # this time it succeeds
```

### Running a Docker Registry UI  

# 第6章 部署

*Continuous Integration* (CI)  

持续集成是一种软件开发实践，其中对应用程序所做的自包含更改不断地被测试、合并到主线分支并进行部署。CI 服务器负责管理构建管道（build
pipeline）以使这样的过程可行。

## Build Pipeline with Travis CI  

需要两个账号：

- GitHub 

- [Travis CI](https://www.travis-ci.com/)  

Travis 是一种流行的持续集成构建管道服务。 它也被 Node.js 和许多流行的 npm 包使用。

### 创建一个基础项目



### 配置 Travis CI  

167

### Testing a Pull Request  

**Travis CI 的替代品**

- GitHub Actions  
- Jenkins  

## 自动化测试

Tape  ，一个流行而简单的测试框架。

### 单元测试

`t.equal()`  which asserts that the two arguments are loosely equal to each other.  如果错误，进程将会退出，并返回非0状态码。

`t.deepLooseEqual()`  the two arguments are “deeply loosely equal.”   使用 ==  相等运算。

`t.deepEqual()`  



0代表测试通过，其他值代表测试失败。

### 集成测试

`Integration testing` covers an application at a layer logically higher than that covered by unit testing.  集成测试检查应用程序的不同部分如何协同工作。

175

### 代码覆盖执行

该值可以使用不同的标准来衡量，你将在本节中使用的工具衡量四个方面的覆盖范围：语句、分支、函数和行。

`nyc`  用于测试代码覆盖率的最受欢迎的软件包之一

```sh
$ npm install --save-dev nyc@15
```

在package.json   中设置

```json
  "scripts": {
    "test": "nyc tape ./test/**/*.js"
  },
```

nycrc配置文件

Example 6-6. distnode-deploy/.nycrc

```json
{
  "reporter": ["lcov", "text-summary"],
  "all": true,
  "check-coverage": true,
  "branches": 100,
  "lines": 100,
  "functions": 100,
  "statements": 100
}
```

测试代码中忽略指定行，在前面加上

```js
/* istanbul ignore next */
```

eslint  代码格式测试

**Tape的替代品**

Mocha  

## 部署到 Heroku

Heroku 是一个云平台，可以非常轻松地部署应用程序、配置数据库和横向扩展正在运行的应用程序实例。它带有许多第三方集成，使部署变得容易，并且可以配置为在分支合并到 GitHub 后自动部署你的 Node.js 应用程序代码。

### 创建一个Heroku  应用

### 配置Travis CI  

### 部署你的应用程序

**Heroku的替代品**

## Modules, Packages, and SemVer  

### Node.js Modules  

Node.js 支持两种不同的模块格式。

- [CommonJS module](https://nodejs.org/api/modules.html)  
- [ECMAScript module](https://nodejs.org/api/esm.html) (ESM)  ，近年来一直在大力发展的一种格式，最终应该弥合在浏览器中运行的 JavaScript 和在 Node.js 中运行的 JavaScript 之间的差距。很有可能有一天大多数应用程序代码将使用 ESM 编写，但从 Node.js v14.8 开始，ECMAScript 模块仍被标记为实验性的——这一标记意味着仍然可以进行向后的更改。出于这个原因，本节以及本书重点介绍 CommonJS 模块。

Node.js 模块不同于浏览器 JavaScript 的另一件事是，如果你首先在 JavaScript 文件中声明一个变量，例如 var foo = bar，该值将不会成为全局变量。 相反，它只能在当前文件中访问。Node.js 模块以这种方式工作的原因是因为 Node.js 自动将每个 JavaScript 文件包装在以下内容中

```js
(function(exports, require, module, __filename, __dirname) {
// File contents go here
});
```

这个wrapper  为应用程序开发人员提供了一些便利。 最重要的是，它提供了 CommonJS 标准要求的`exports`和`require`  。`_filename` 和 `__dirname` 都是字符串，可以方便地知道你的文件所在的位置。 两者都是绝对路径。

你可以使用`require.main === module`  检查当前模块是否恰好是应用程序入口点。

V8 引擎提供了两个对全局对象的引用：较新的 `globalThis` 和较旧的`global`  对象。浏览器对其全局对象有两个引用：较新的 `globalThis` 和较旧的`window`。由于在服务器和浏览器之间共享 JavaScript 文件的流行，创建 globalThis 是为了弥合差距。

**module resolution algorithm**  



当模块被加载到正在运行的 Node.js 进程中时，它们会被添加到`require cache`  中。该缓存位于 require.cache 并且可用于每个模块。

缓存是一个对象，其中键是文件的绝对路径，值是“模块”对象。

### SemVer (Semantic Versioning)  

1.2.3，major version.minor version.patch version.

当包进行了破坏向后兼容性的更改时，应增加`主版本号`。当一个包添加了一个新功能但保持向后兼容性时，应该增加`次版本号`。如果更改仅导致错误修复而没有其他结果，则应增加`补丁版本号`。每当版本增加时，较低的版本都会重置为零。

```json
"dependencies": {
    "fastify": "^2.11.0",
    "ioredis": "~4.14.1",
    "pg": "7.17.1"
}
```

^  表示将安装与指定版本兼容的任何未来版本的软件包。^符号前缀是运行 `npm install` 命令时给出的默认前缀。

~ 表示只接受包含错误修复（补丁更新）的包更新。

第3行表示只能安装`pg`的指定版本。

196

### npm Packages and the npm CLI  

**控制包的内容**

在package.json的顶层添加`“private”：true`可以阻止npm 发布。（发布将会失败）。

**依赖层次结构和去重（Dependency hierarchy and deduplication  ）**

这种方法有两个问题。 首先是有时包最终会产生循环依赖。 这将导致无限深的 node_modules/ 目录。 第二个问题是许多依赖树最终会产生重复的包，从而增加磁盘空间需求。

为了克服这些问题，npm CLI 将尝试在 node_modules/ 目录中的更高位置“去重”或“提升”子依赖项。



查看依赖树中的"物理"结构

```bash
ls node_modules  
```

查看依赖树的“逻辑”布局：

```bash
npm ls
```

## Internal npm Registry  

### 运行 Verdaccio  

https://verdaccio.org/

它是一个用 Node.js 编写的开源 npm 注册表。

```bash
$ docker run -it --rm \
--name verdaccio \
-p 4873:4873 \
verdaccio/verdaccio:4.8
```

然后访问 http://localhost:4873/  

### 配置 npm 以使用 Verdaccio

```bash
$ npm set registry http://localhost:4873
$ npm adduser --registry http://localhost:4873
```

### 发布到 Verdaccio

```bash
$ cd leftish-padder
$ npm publish --registry http://localhost:4873
```

增加版本号并重新发布

```bash
$ npm verson patch
$ npm publish --registry http://localhost:4873
```

**添加scope**  

打开*package.json*  文件，修改name字段：

```json
"name": "@tlhunter/leftish-padder",
```



删除配置，恢复官方npm链接

```bash
$ npm config delete registry
```

# 第7章 容器编排（Container Orchestration  ）

容器编排非常适用于无状态服务，例如典型的 Node.js 服务，其中实例可以被销毁或重新创建，而不会产生很多副作用。 有状态的服务，如数据库，在容器编排工具中运行时需要多加小心，因为存在跨部署的持久存储或随着实例的来去而重新分片数据等问题。许多组织选择仅在容器编排器中运行应用程序代码，并依靠专用机器来运行他们的数据库。

## Kubernetes 简介

210

### Kubernetes 概览  

以下是对不同组件及其相互关系的解释：

**容器**

Kubernetes 可以使用几种不同的容器格式，例如 Docker 和 rkt。

**卷**

**Pod**  

一个 pod 代表一个应用程序实例。通常，一个 Pod 只包含一个容器，但一个 Pod 中可能有多个容器。 Pod 还可以包含 Pod 容器所需的任何卷。 每个 pod 都有自己的 IP 地址，如果同一个 pod 中存在多个容器，它们将共享一个地址。 Pod 是 Kubernetes API 允许你与之交互的最小单元。

**Node**  

一个节点是一个工作机器——无论是物理的还是虚拟的——它是整个 Kubernetes 集群的一部分。每个节点都需要在机器上运行一个容器守护进程（如 Docker）、Kubernetes 守护进程（称为 Kubelet）和一个网络代理（Kube Proxy）。 不同的节点可能有不同的可用内存和 CPU，就像不同的 Pod 可能有不同的内存和 CPU 要求一样。

**Master**  

master表示在主节点上运行的一组服务。 master 公开了一个 API，这是外部客户端与之通信的 API，例如你将在本章中使用的 `kubectl` 命令。 master 将命令委托给在各个节点上运行的 Kubelet 进程。

**Cluster**  

集群代表主节点及其各种关联节点的整体集合。 通过指定哪个 pod 属于哪个环境，在技术上可以将单个集群用于不同的环境，例如staging 和production 。 也就是说，维护多个集群以防止意外交叉通信通常更安全，特别是如果你计划在生产之外测试集群。

### Kubernetes 概念

*Scheduling*  

调度是 Kubernetes 确定将新创建的 pod 分配到的最佳节点的过程。Kubernetes 中使用的默认调度程序称为 `kube-scheduler`。

遇到新创建的 pod 时，调度程序会检查可用节点。 它会考虑节点的空闲 CPU 和内存，以及 pod（如果指定）的 CPU 和内存要求。然后选择一个兼容的节点来托管 pod。 如果没有节点为 Pod 提供容量，那么它可以保持在等待节点可用的`scheduled`  状态。

*Namespaces*  

命名空间是一种 Kubernetes 机制，用于在逻辑上将集群划分为更小的、半隔离的集合。

*Labels* 

标签是分配给各种资源（例如 pod 或节点）的键/值对。

*Selectors*  

Selectors  声明 pod 的要求。 例如，一个特定的 pod 可能要求它在物理机而不是虚拟机上运行，因为它需要执行一些对时间非常敏感的工作。 在这种情况下，selector  可能是 machine:physical。

*Stateful sets*  

Kubernetes does work with stateful services, and stateful sets are intended to make this process convenient.  

*Replica sets*  

*Deployments*  

*Controllers*  

*Service*  

服务是向网络公开一组 Pod 的资源。

*Ingress*  

ingress  资源管理对 Kubernetes 集群内服务的外部网络访问。

*Probe*  

probe  很像你之前使用过的 HAProxy 健康检查。 它可用于判断 Pod 是否健康，以及它在启动后是否准备好接收流量。

### 启动 Kubernetes

要继续本章，你需要在开发机器上安装 Minikube 和 Kubectl。安装完成后，运行下面命令查看版本。

```sh
$ minikube version
$ kubectl version --client
```

## 入门  

启动Minikube  

```sh
# Linux:
$ minikube start
```

它实际上在你已经运行的 Docker 守护进程中运行了一个专用于 Minikube 的 Docker 容器。可以使用`docker ps`  命令查看：

运行以下命令以获取当前构成 Kubernetes 集群的节点列表：

```sh
$ kubectl get pods
```

Kubectl 默认使用`default`  命名空间。

```sh
$ kubectl get pods --namespace=kube-system
```

运行以下命令以获取 Kubernetes 集群中的节点列表：

```sh
$ kubectl get nodes
```

**Minikube 的替代品**

Minikube 在处理较少数量的容器时，对于在单台机器上运行 Kubernetes 非常有用。但是，在要求更高的生产环境中，你将需要功能更强大的东西。 你可以在生产机器上安装完整版本的 Kubernetes，这将需要多项服务，例如 Etcd。

## 部署应用程序

### Kubectl Subcommands  

### Kubectl 配置文件

```sh
$ kubectl apply -f recipe-api/recipe-api-deployment.yml
```

### Service Discovery  

```sh
$ minikube addons enable ingress
$ kubectl get pods --namespace kube-system | grep ingress
```

第一个命令指示 Minikube 启用 ingress 插件，这是扩展 Minikube 功能的一种方式。在这种情况下，它会创建一个使用 Nginx Web 服务器执行ingress  路由的新容器。

第二个命令只显示容器所在的位置。 在这种情况下，Kubernetes 在 `kube-system` 命名空间中启动 Nginx 容器。

许多其他[ingress controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)  可用，例如第 61 页的“使用 HAProxy 的反向代理”中介绍的心爱的 HAProxy，尽管默认的 Nginx 选项由 Kubernetes 项目直接维护。不同的入ingress controllers  支持不同的功能，但最终控制器会配置某种反向代理来将传入的请求映射到服务。

通过启用 ingress，你可以通过向单个主机名发出 curl 请求来向 web-api 服务发出请求，而不必使用 minikube CLI 来定位服务的主机和端口。这使得将来自外部客户端的请求路由到适当的节点和容器变得更加容易。

`web-api` 应用程序查找并与 `recipe-api` 应用程序通信的机制称为服务发现，主要由 Kubernetes 负责。

## 修改部署

### 扩展应用程序实例

### 部署新的应用程序版本

233

### 回滚应用程序部署

# 第8章 弹性（Resilience）

application resilience  ，这是在可能导致失败的情况下生存的能力。

## Node.js 进程的死亡

The `process` global is an `EventEmitter` instance, and when the process exits it will usually emit an `exit` event.  

### Process Exit  

`process.exit(code)` 方法是终止进程的最基本机制，在许多不一定涉及错误的场景中很有用。

`code`参数 1 是 0 到 255 范围内的数字型`exit status code`  。按照惯例，0 表示应用程序以健康的方式终止，任何非零数字表示发生了错误。

### Exceptions, Rejections, and Emitted Errors  



**Error swallowing**  

捕获错误并完全无视结果，包括不将错误记录到控制台，被认为是“吞下错误”。



有时，库作者可能会对错误进行子类化，但不会导出它们。 在这些情况下，你可以检查 .name 字段，例如使用 `e.name === 'ConnectionFallback'`。

```js
const logger = require('./lib/logger.js');
process.on('uncaughtException', (error) => {
    logger.send("An uncaught exception has occured", error, () => {
        console.error(error);
        process.exit(1);
    });
});
```

与未捕获的exceptions  类似，未处理的rejections  也可以使用`process` event emitter  进行监听。 这是一个如何完成的示例：

```js
process.on('unhandledRejection', (reason, promise) => {});
```

The `EventEmitter` class, available at `require('events').EventEmitter`, is extended by and used by many other classes, both those provided by core Node.js modules, as well as packages available on npm.  

### Signals  

运行 `kill -l` 命令以获取当前机器识别的信号列表。

```sh
#!/usr/bin/env node
console.log(`Process ID: ${process.pid}`);
process.on('SIGHUP', () => console.log('Received: SIGHUP'));
process.on('SIGINT', () => console.log('Received: SIGINT'));
setTimeout(() => {}, 5 * 60 * 1000); // keep process alive
```



而且，为了向将信号称为 kill 的惯例致敬，用于发送信号的方法可用作 `process.kill()`。

```sh
$ node -e "process.kill(<PROCESS_ID>, 'SIGHUP')"
```

终止程序

```sh
$ kill -9 <PROCESS_ID>
```

此命令将向你的进程发送 SIGKILL 信号，并立即终止它。

## 构建无状态服务

### 避免内存泄漏

### Bounded In-Process Caches  

cache hit

cache invalidation  

The `lru-cache` package is a popular tool for doing just that. It is a key/value store that can be configured to use the length of strings or buffers that are inserted into the cache to loosely approximate the memory requirements of those entries.  

`Least Recently Used`  

## 使用 Memcached 进行外部缓存

三种不同的缓存策略比较：

- In-memory cache  

  这是最快的方法，但缓存在崩溃和部署之间被破坏。

- External cache  

  它比内存缓存慢，但应该比找到真实来源更快。 它还可以防止缓存在崩溃和部署之间被清除。 必须在应用程序版本之间维护数据结构或重命名缓存键。 此处发生的查找可能需要数十毫秒。

- No cache  

  它通常是最慢和最容易实现的。

### 介绍 Memcached

Memcached 是最成熟的可用缓存服务之一。 它是一种可靠、简洁的缓存，可以分布在多台机器上。

**Memcached 的替代品**

Redis 可能是 Memcached 最受欢迎的替代品。

### 运行 Memcached

在实例化 Memcached 服务时，有几个标志可以传入，包括 -d 用于守护进程（Docker 容器不需要），-m 用于设置最大内存量（非常有用），以及 -v 用于启用日志记录 （可以重复此标志以增加详细程度）。

```sh
$ docker run \
	--name distnode-memcached \
	-p 11211:11211 \
	-it --rm memcached:1.6-alpine \
	memcached -m 64 -vv
```

端口 11211 是默认的 Memcached 端口.

当运行多个 Memcached 实例时，这些实例本身并不知道彼此。 相反，客户端直接连接到不同的实例并使用客户端散列算法来确定哪个服务器包含特定key。
理想情况下，这意味着每个客户端对相同的键名使用相同的服务器，但不同的客户端库可能会决定在不同的服务器上存储特定的键，这可能导致缓存未命中和数据冗余。

### 使用 Memcached 缓存数据

259

### Data Structure Mutations 

例如，key名称可以从 account-info-<ACCOUNT_ID> 更改为 account-info-<VERSION>-<ACCOUNT_ID>。

另一种解决方案是将数据从旧表单“迁移”到新表单，而不是更改键名和丢失缓存值。（参见：“Schema Migrations with Knex” on page 272）

## 数据库连接弹性

### 运行PostgreSQL  

### 自动重连

```js
class DatabaseReconnection extends EventEmitter {
  #client = null;       #conn = null;
  #kill = false;        connected = false;

  constructor(conn) {
    super();
    this.#conn = conn;
  }
```

前三个private属性，最后一个是public属性。

### 连接池

另一种增加应用程序数据库连接弹性的方法是使用多个连接，或者众所周知，使用连接池。关于弹性，如果一个连接失败，那么另一个连接 将保持开放。

当配置为使用连接池时，应用程序通常会尝试维护一定数量的连接。 当连接断开时，应用程序会尝试创建一个新连接来进行补偿。 当应用程序选择运行数据库查询时，它将选择池中的可用连接之一来传递查询。

大多数数据库包似乎默认支持某种形式的连接池。这些示例中使用的流行 `pg` 包也不例外。 The `pg.Pool` class is available and can mostly be swapped out with `pg.Client`, though it does have a few different configuration options and exposes some new properties.  

无论如何，您应该尝试使用最少数量的数据库连接来满足您的性能需求。 出于以下几个原因，将这个数字保持在较低水平很重要。

如果您想知道特定 Postgres 数据库配置为处理多少个连接（例如，在使用托管实例时），请运行以下查询：

```sql
SELECT * FROM pg_settings WHERE name = 'max_connections';
```

可以增加最大连接数，但至少需要服务器处理连接的少量开销。 如果不是，则默认值为无穷大。

在选择连接数时，您可能需要确保每个进程使用的连接数乘以同时运行的进程数小于 Postgres 服务器可以处理的连接数的一半。这半部分很重要，因为如果您部署一组新进程来替换旧进程，那么新旧实例需要在短时间内重叠运行。

Connection pooling isn’t just about resilience; it’s also about performance. The Postgres database, for example, isn’t able to handle multiple queries sent through the same connection at the same time. Instead, each query needs to finish before the following query can be sent, serially.

连接池不仅仅是关于弹性； 这也与性能有关。 例如，Postgres 数据库无法同时处理通过同一连接发送的多个查询。 相反，每个查询都需要在可以串行发送以下查询之前完成。

## Schema Migrations with Knex  

Knex 是一个流行的 SQL 查询构建器包。 许多更高级别的 ORM（对象关系映射）包都依赖它。 如果您参与过一些与 SQL 数据库交互的 Node.js 项目，那么您很有可能在某个时候接触过 Knex。

虽然 Knex 通常因其生成 SQL 查询的能力（减少将 SQL 字符串危险地连接在一起的需要）而广受赞誉，但本节中介绍的功能是其鲜为人知的[schema migration](https://knexjs.org/#Migrations)  功能。

`schema migration`   是对数据库schema以增量、可逆的方式进行的更改，并且可以使用可以检入版本控制的代码来表示。

### 配置 Knex

### Creating a Schema Migration  

### Applying a Migration  

执行以下命令在 Postgres Docker 容器内运行 psql 命令：

```sh
$ docker exec \
	-it distnode-postgres \
	psql -U user -W dbconn
```

### Rolling Back a Migration  

### 实时迁移（Live Migrations ）

实时迁移是以不会导致应用程序脱机的方式发生的迁移。

282

## 幂等性和消息弹性

### HTTP 重试逻辑

如果请求是幂等的，则可以多次重复请求而不会产生副作用。

HTTP的下列方法时幂等性的：GET  、PUT、DELETE。

如果消息会导致数据丢失，则该消息具有破坏性。（PUT、PATCH、DELETE ）。在这些情况下，服务器可能会选择实现 `ETag` 和 `If-Match` HTTP 头以提供额外的语义以避免数据破坏。

A mechanism that a server may choose to implement that makes every request idempotent is an `idempotency key`.   幂等键是客户端在向服务器发出请求时提供的元数据。当服务器收到带有此密钥的请求时，它首先检查缓存中是否存在该密钥。 如果该条目存在于缓存中，则服务器立即回复缓存条目。 如果缓存中缺少该条目，则服务器照常执行请求，然后将响应写入缓存并回复请求。如果重复请求的副作用可能代价高昂，请考虑在您的 API 中支持幂等键。

### 断路器模式

289

### Exponential Backoff  (指数退避)

让客户端重试对外部服务的请求的幼稚方法是简单地让它在失败发生时立即再次发出请求。 然后，如果重试失败，请立即再试一次。 这种方法可能无助于请求成功，也可能会加剧问题。

使用这种方法，客户端首先快速尝试重试，但随着时间的推移会变慢。 例如，服务可能会选择使用以下计划进行请求重试：

```
100ms | 250ms | 500ms | 1000ms | 2500ms | 5000ms | 5000ms | ...
```

这种方法可以与您之前使用过的 `ioredis` 包一起使用。

```js
const Redis = require('ioredis');
const DEFAULT = 5000;
const SCHEDULE = [100, 250, 500, 1000, 2500];
const redis = new Redis({
    retryStrategy: (times) => {
    	return SCHEDULE[times] || DEFAULT;
    }
});
```

`thundering herd`  

jitter  :抖动

抖动是随机变化，例如请求时序的增加或减少±10%。

```js
const redis = new Redis({
    retryStrategy: (times) => {
        let time = SCHEDULE[times] || DEFAULT;
        return Math.random() * (time * 0.2) + time * 0.9; // ±10%
    }
});
```

抖动的概念在其他情况下也很有用。 例如，应用程序可能需要在内存中缓冲统计信息并每分钟将其刷新到数据库中。这可以通过在应用程序启动时调用一次 setInterval(fn, 60_000) 来实现。 然而，同样存在`thundering herd`  问题。

## 弹性测试

作为一名工程师，很容易将错误场景视为二等公民。 工程师可能只测试应用程序的愉快路径，无论是通过 UI 与新功能交互还是编写单元测试。 当仅测试功能的成功使用时，当应用程序不再在开发人员的笔记本电脑上运行并被交付到生产环境时，它就会面临失败的风险。 分布式环境中的故障可能会进一步复杂化，因为一个应用程序中的错误可能会导致其他应用程序中的错误——通常没有原始堆栈跟踪进行调试。

强制处理此类错误的一种哲学称为混沌工程(**chaos engineering**  )。这是一种将故障随机引入环境的方法。通过将通常很少发生的故障变成日常发生，工程师被迫尽早处理这些故障，以免他们面临午夜寻呼机的愤怒。 这种测试失败的方法是您可以考虑在您的组织内使用的方法，尽管它需要非常严格的开发人员集合才能实现。

下面是一些可以引入 Node.js 应用程序的混乱类型的示例，这些混乱类型基于我在我处理过的应用程序中遇到的一些常见故障边界。

### 随机崩溃(Random Crashes  )

### 事件循环暂停

### Random Failed Async Operations  

**手动混沌的替代方案**

Netflix 创建了一个名为 Chaos Monkey 的开源工具，它将不同形式的混乱引入组织的基础设施中。

# 第9章 分布式原语

## ID 生成问题

```
How would you design a link shortening service?  
```

你如何生成用于短 URL 的 ID？

最终，URL ID 代表一个键，关联的值包含原始的完整 URL。

**lock**  

这个等待锁被解锁的循环称为自旋锁（`spinlock`  ）。

## Redis 介绍

301