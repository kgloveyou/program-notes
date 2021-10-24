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