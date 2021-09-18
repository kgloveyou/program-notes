# 教你用Node.JS开发一个cli工具

https://learn.kaikeba.com/home

nodejs esm

execa

## 发包

强制删除已发的包

```sh
npm unpublish --force --registry https://registry.npmjs.org
```

## 其他

可以用prettier库的api格式化生成的代码。

```js
import prettier from 'prettier';

// 格式化js文件
prettier.format(code, {parse: "babel"});

// 格式化package.json
prettier.format(code, {parse: "json"});
```

