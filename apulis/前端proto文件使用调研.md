# proto文件使用调研

## 转换插件

[ts-proto](https://github.com/stephenh/ts-proto)

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
        --ts_proto_opt=esModuleInterop=true \
        --proto_path=. \
        ./dataworkobjects/*.proto
```



## 集成到adhub-frontend

https://gitee.com/kg_loveyou/cdn/raw/master/image-20211228100733301.png

<img src="https://gitee.com/kg_loveyou/cdn/raw/master/image-20211228100733301.png" alt="代码结构" style="zoom:50%;" />

## 测试示例

src\pages\Etl\index.tsx

```tsx
import { ADHubDatasource } from '@/protos/dataworkobjects/adhub_infos';
import _m0 from "protobufjs/minimal";


  const bytes = ADHubDatasource.encode({ id: 123 }).finish();
  console.log(bytes)
  // const adHubDatasource = ADHubDatasource.decode(_m0.Reader.create(bytes));
  const adHubDatasource = ADHubDatasource.decode(bytes);
  console.log(adHubDatasource)
  const { id } = adHubDatasource;
  console.log(id)
```

