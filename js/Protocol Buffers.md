

0、JavaScript Generated Code

https://developers.google.com/protocol-buffers/docs/reference/javascript-generated#packages-and-closure-imports

1、TS项目中使用Protobuf的解决方案

https://segmentfault.com/a/1190000012820412

2、protobufjs

https://www.npmjs.com/package/protobufjs#pbjs-for-javascript

3、protobufjs中文文档

http://febeacon.com/protobuf_docs_zh_cn/

4、官方仓库

https://github.com/protocolbuffers/protobuf

Protocol Buffers - Google's data interchange format

[JavaScript: es6 module generation #4274](https://github.com/protocolbuffers/protobuf/issues/4274)

5、[thesayyn](https://github.com/thesayyn)/**[protoc-gen-ts](https://github.com/thesayyn/protoc-gen-ts)**

Compile protocol buffer messages to TypeScript.

```shell
npm install -g protoc-gen-ts

protoc -I=sourcedir --ts_out=dist myproto.proto
```

上面的protoc是Protocol Buffer Compiler命令。



[issue](https://github.com/thesayyn/protoc-gen-ts/issues/97)里面提到

https://github.com/timostamm/protobuf-ts

6、Protocol Buffer Compiler Installation

https://grpc.io/docs/protoc-installation/

7、掘金相关帖子

https://juejin.cn/search?query=protobuf.js

- vue3+websocket使用protobuf碰到的一些问题（※）

https://juejin.cn/post/6916164817409540104

- 如何使用websocket + protobuf开发IM聊天项目

https://juejin.cn/post/6844904038958383118

8、ts-proto（*）

https://github.com/stephenh/ts-proto

(Note, if you're a new user of ts-proto and using a modern TS setup with `esModuleInterop`, you need to also pass that as a `ts_proto_opt`.)

adhub-frontend使用的这个库。

客户端调用示例：

https://github.com/stephenh/ts-proto/blob/main/integration/grpc-web/client-ts.ts

9、protoc vs ts-proto vs ts-protoc-gen

https://www.npmtrends.com/protoc-vs-ts-proto-vs-ts-protoc-gen

ts-protoc-gen的使用量最多。

