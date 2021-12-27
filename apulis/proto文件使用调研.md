# proto文件使用调研

## 185上编译生成ts文件

```shell
cd /home/apulis/protos/data-work-object

make generate-ts 
```

实际执行命令

```sh
rm -rf ./out/ts
mkdir -p ./out/ts
protoc \
        -I /home/apulis/GOPATH/pkg/mod/github.com/envoyproxy/protoc-gen-validate@v0.6.2 \
        --plugin=./node_modules/.bin/protoc-gen-ts_proto \
        --ts_proto_out=./out/ts \
        --proto_path=. \
        ./dataworkobjects/*.proto
```



## 集成到adhub-frontend

tsconfig.json

```
// "esModuleInterop": true,
```

该配置项作用：[esModuleInterop 到底做了什么？](https://zhuanlan.zhihu.com/p/148081795)、[Typescript 内置的模块导入兼容方式](https://segmentfault.com/a/1190000022792712)

代码中报错：

```
This module can only be referenced with ECMAScript imports/exports by turning on the 'allowSyntheticDefaultImports' flag and referencing its default export.ts(2497)
```

原因：

https://stackoverflow.com/questions/54701255/importing-victor-js-in-typescript

解决办法：

替换

```typescript
import * as Long from "long";
```

为

```typescript
import Long from "long";
```



也可以通过在make命令中配置--ts_proto_opt=esModuleInterop=true

```
rm -rf ./out/ts
mkdir -p ./out/ts
protoc \
        -I /home/apulis/GOPATH/pkg/mod/github.com/envoyproxy/protoc-gen-validate@v0.6.2 \
        --plugin=./node_modules/.bin/protoc-gen-ts_proto \
        --ts_proto_out=./out/ts \
        --ts_proto_opt=esModuleInterop=true \
        --proto_path=. \
        ./dataworkobjects/*.proto
```

生成示例：

```typescript
import Long from "long";
import _m0 from "protobufjs/minimal";
```

## 客户端调用示例

https://github.com/stephenh/ts-proto/blob/main/integration/grpc-web/client-ts.ts



服务端代码：

https://github.com/stephenh/ts-proto/tree/main/integration/grpc-web-go-server

运行bin文件步骤：

1、`chmod 755 example.bin`

3、`./abc.bin`

这里有矢量切片的示例：

https://github.com/stephenh/ts-proto/tree/main/integration/vector-tile