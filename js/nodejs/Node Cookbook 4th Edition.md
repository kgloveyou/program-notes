

# 2 Handling I/O  

`process.cwd()`  is a function on the global process object that returns the current directory of the Node.js process.  



The asynchronous version of `readFileSync()` is `readFile()`.   

30

### Using the fs Promises API  

1. To use the API, you'll first need to import it:  

```js
const fs = require("fs").promises;
```

## 检查文件元数据

### 还有更多

#### Checking file access  

如果只是想检查文件是否存在，则可以使用 `fs.access()` 或 `fs.accessSync()` APIs。

**Important note**  

有一个现在已弃用的旧 API，称为 `fs.exists()`。 不建议使用此函数 — 应改用 `fs.access()` API。

#### Modifying file permissions  

`chmod()`, and an equivalent synchronous API, `chmodSync()`.   

#### Inspecting symbolic links  

Node.js REPL (Read-Eval-Print Loop)  

Node.js REPL 是一个交互式 shell，我们可以将语句传递给它，它将评估它们并将结果返回给用户。

要进入 Node.js REPL，请在 shell 中键入 node：

```shell
$ node
Welcome to Node.js v14.0.0.
Type ".help" for more information.
>  
```

## Watching for file updates  

## 创建 TCP 服务器和客户端通信

### 还有更多

UDP 最常用于速度被认为比可靠性更重要的情况。UDP 通常用于视频通话、游戏或流媒体——因为在这些情况下，最小化延迟很重要。

# 3 流，流，流

通过顺序读取数据块，我们可以处理非常大的文件（或其他数据输入），这些文件通常太大而无法读入内存并作为一个整体进行处理。
流是大数据应用程序或媒体流服务的基础，其中数据太大而无法立即使用。

Node.js 中有四种主要类型的流：

- 可读流：用于读取数据
- 可写流：用于写入数据
- 双工流：用于读取和写入数据
- 转换流：一种双工流，它转换输入的数据，然后输出转换后的数据

## 在 Node.js 中创建流

### 还有更多…

#### Interacting with infnite data  

#### Readable streams with async iterators  

```js
async function run() {
  for await (const chunk of rs) {
    console.log("Read chunk:", chunk);
  }
  console.log("No more data.");
}
```

## Interacting with paused streams  

## Piping streams  

```js
const fs = require("fs");

const rs = fs.createReadStream("file.txt");

rs.pipe(process.stdout);

```

pipe() 方法提供的内置管理有助于解决后端压力（backpressure）。 当输入超出系统容量时，就会出现backpressure。 对于流，这可能发生在我们正在消费一个快速读取数据的流，而可写流无法跟上。

## Transforming data with transform streams

转换流允许我们使用输入数据，然后处理该数据，然后以处理后的形式输出数据。我们可以使用转换流以功能性和异步方式处理数据操作。可以将许多转换流连接在一起，使我们能够将复杂的处理分解为顺序任务。

```js
// File system module 
const fs = require("fs");
const { Transform } = require("stream");

const rs = fs.createReadStream("./file.txt");

const newFile = fs.createWriteStream("./newFile.txt");

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    // Data processing
    callback(null, chunk.toString().toUpperCase());
  },
});

rs.pipe(uppercase).pipe(newFile);

```

转换流是双工流，这意味着它们实现了可读和可写的流接口。



Node.js 包含一些内置的转换流。特别是，Node.js 核心的`crypto`  和 `zlib` 模块都暴露了转换流。

### ES6 syntax  

```js
const fs = require("fs");
const { Transform } = require("stream");

const rs = fs.createReadStream("./file.txt");
const newFile = fs.createWriteStream("./newFile.txt");

class Uppercase extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

rs.pipe(new Uppercase()).pipe(newFile);

```

## Building stream pipelines  

The `util.promisify()` method is used to convert a callback-style method into Promise form.  To use this method, we pass the
method we wish to *promisify* as an argument. For example, we could use the following code to *promisify* the `fs.stat()` method:  

```js
const stat = util.promisify(fs.stat);
```

# 4 使用网络协议

fine-grained（细粒度的）

- 405—Method Not Allowed  

## 处理 HTTP POST 请求



## 使用 formidable 处理文件上传

In this recipe, we will use the `formidable` module as our multipart parser to handle fle uploads.  

允许上传任何大小的任何文件类型会使你的服务器容易受到拒绝服务 (DoS) 攻击。 攻击者可能会故意尝试上传过大或恶意文件以降低你的服务器速度。 建议你同时添加客户端和服务器端验证，以限制你的服务器将接受的文件类型和大小。

## 使用 ws 创建 WebSocket 服务器

在这个秘籍中，我们将使用第三方 `ws` 模块来创建一个 WebSocket 服务器，我们可以通过浏览器与之交互。

## 使用你自己的 SMTP 服务器发送自动电子邮件

我们将使用名为 `smtp-server` 的第三方 npm 模块设置 SMTP 服务器。

要使用 Node.js 发送电子邮件，我们可以使用 `nodemailer` npm 模块。

# 5、开发 Node.js 模块

## 使用 Node.js 模块

Yarn 维护一个注册表，它是 npm 注册表的反向代理。

```json
"express": "^4.17.1"
```

^ 表示它将允许安装 v4.17.1 以上的所有版本，但不允许安装 v5.x.x。

#### Development dependencies  

要安装开发依赖项，你需要提供带有 `--save-dev` 参数的安装命令。 例如，要安装 prettier，我们可以使用以下命令：

```bash
$ npm install --save-dev --save-exact prettier
```

`--save-exact` 在你的 package.json 文件中固定确切的版本。当使用 prettier 时建议这样做，因为补丁版本可能会引入新的样式规则，当自动拾取时可能会很麻烦。

#### 全局模块

```bash
$ npm install --global lolcatjs  
```

它将安装到 Node.js 安装的 `bin` 目录中。 要查看它的安装位置，你可以使用 `which` 命令（或 Windows 上的 `where`）：



在 `npm` v5.2 版本中，`npm` 将 `npx` 命令添加到其 CLI 中。此命令允许你执行全局模块而无需将其永久存储。 你可以执行 lolcatjs 模块而不使用以下内容存储它：

```bash
$ npx lolcatjs  
```

#### Responsibly consuming modules  

在选择要包含在应用程序中的 Node.js 模块时，你应该考虑许多因素。

- Security  

- Licenses  

- Maintenance  

## Setting up your own module  

本地项目推送到 github 仓库

```bash
$ echo "# reverse-sentence" >> README.md
$ git init
$ git add README.md
$ git commit -m "first commit"
$ git remote add origin git@github.com:<username>/
reverse-sentence.git
$ git push -u origin master
```

我们现在可以再次输入 `$ npm init` ，它会自动建议你的 GitHub 远程存储库作为存储库字段。

```json
  "repository": {
    "type": "git",
    "url": "git+https://github.com/BethGriggs/reverse-sentence.git"
  },
  "bugs": {
    "url": "https://github.com/BethGriggs/reverse-sentence/issues"
  },
  "homepage": "https://github.com/BethGriggs/reverse-sentence#readme",
```

The `npm version` command can be supplied with `major`, `minor`, or `patch` to increment the appropriate version numbers in your `package.json`.   

## 实现你的模块

index.js

```js
module.exports = reverse;  
```

测试

```bash
$ node --print "require('./')('Hello Beth\!')"
Beth! Hello  
```



`npm` CLI 支持许多快捷方式。

`npm install`  = `npm i`  

`npm test`  = `npm t`  

`npm run-script`  = `npm run`  

## 准备模块并将其发布到 npm

使用以下命令授权你的 npm 客户端：

```bash
npm login  
```

创建tag

```bash
$ git add .
$ git commit -m "v0.1.0"
$ git push origin master
$ git tag v0.1.0
$ git push origin v0.1.0
```

发布

```bash
$ npm publish --access=public  
```

请注意，发布到全局范围时不需要 `--access=public` 标志，因为全局命名空间中的所有模块都是公共的。

### Prepublish scripts  

### .npmignore  

经常添加到 `.npmignore` 文件中的文件和目录类型是测试文件。

### Private registries  

您可以使用以下命令更改您指向的注册表：

```bash
$ npm config set registry https://registry.your-registry.npme.
io/
```

您可以使用以下命令查看您指向的注册表：

```bash
$ npm config get registry
https://registry.npmjs.org/
```

## 使用 ECMAScript 模块

在高于 `v13.2.0` 的 Node.js 版本中默认启用 ECMAScript 模块支持，尽管它仍被认为是实验性的。



We'll create an index file with the `.mjs` extension rather than `.js`:  

```bash
$ touch server.mjs  
```

ecmascript-modules\server.mjs

```js
import express from "express";
import { name } from "./get-name/index.mjs";

const PORT = 3000;
const app = express();

app.get("/", (req, res) => res.send(`Hello from ${name}!`));

app.listen(PORT, () => {
  console.log("Express server started on port", PORT);
});

```

还有其他方法可以表明您希望将模块视为 ECMAScript 模块。如果最近的 package.json 包含值为 module 的类型字段，则以 .js 结尾的文件被视为 ECMAScript 模块，如下所示：

```json
{
	"type": "module"
}
```

也可以将类型指定为 commonJS 模块：

```json
{
	"type": "commonjs"
}
```

我们使用 import 语法而不是 require 语法导入 express：

```js
import express from "express";
```

像这样的导入语句只允许在 `.mjs` 文件中使用，但它们可以引用 CommonJS 模块或 ECMAScript 模块。

# 6、Exploring Node.js web Frameworks  