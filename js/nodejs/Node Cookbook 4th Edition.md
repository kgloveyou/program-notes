

https://www.packtpub.com/product/node-cookbook-fourth-edition/9781838558758

https://github.com/PacktPublishing/Node.js-14-Cookbook



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

`fs.watchFile`

42
=======
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

你可以使用以下命令更改你指向的注册表：

```bash
$ npm config set registry https://registry.your-registry.npme.
io/
```

你可以使用以下命令查看你指向的注册表：

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

还有其他方法可以表明你希望将模块视为 ECMAScript 模块。如果最近的 package.json 包含值为 module 的类型字段，则以 .js 结尾的文件被视为 ECMAScript 模块，如下所示：

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

## 使用 Express.js 构建 Web 应用程序

### Adding views with Express.js  

Embedded JavaScript (EJS)  

### 使用 Express.js 创建自定义中间件

### 生成 Express.js 应用程序

Express.js 提供了一个生成器，可以为你构建一个框架应用程序。 你可以使用 npx 从终端运行生成器：

```bash
$ npx express-generator --view=ejs express-generated-app
```

### 处理 POST 请求和路由参数

### Router methods  

### 使用 NODE_ENV 环境变量

或者，你可以将其作为环境变量直接传递给 Node.js 进程：

```bash
$ NODE_ENV=production node index.js  
```

## 使用 Koa.js 构建 Web 应用程序

与 Express.js 相比，Koa.js 是一个更小、更轻量级的框架，并且没有预装任何中间件。

### Adding views with Koa.js  

### Cascading middleware  

### 使用 Koa.js 创建自定义中间件

## 使用 Fastify 构建 Web 应用程序

虽然 Fastify 可用于创建 Web 应用程序，但在构建基于 JSON 的 API 时它确实表现出色。

### 使用 Fastify 的自定义插件

Fastify 认为一切都是插件，包括你定义的路由。

### Fastify CLI  

Fastify 提供了一个命令行界面（CLI），使你能够生成和运行 Fastify 应用程序：

```bash
$ npx fastify-cli generate fastify-generated-app
```

## 使用 Hapi 构建 Web 应用程序

Hapi 是 Web 应用程序的另一个框架。 Hapi 的原始版本是基于 Express 创建的，用于处理沃尔玛的黑色星期五促销规模要求。 与我们在本章中介绍的其他 Web 框架相比，Hapi 具有截然不同的理念。

### 使用 Hapi 添加视图

# 7、使用数据库

`dotenv` 模块将环境变量从 `.env` 文件加载到 Node.js 进程中。

## 连接并持久化到 MySQL 数据库

## 连接并持久化到 PostgreSQL 数据库

PostgreSQL 既可以用作关系数据库，也可以用作文档数据库。

PostgreSQL 提供了两种 JSON 数据类型：`json` 和 `jsonb`。`json` 数据类型类似于常规文本输入字段，但它还验证 JSON。
`jsonb` 类型是结构化的，便于文档对象内的查询和索引。当你需要能够查询或索引数据时，你会选择 `jsonb` 数据类型而不是 `json` 数据类型。

## 连接和持久化到 MongoDB

虽然 MongoDB 通常被标识为 NoSQL 数据库，但它确实提供了类似 SQL 的语法。

### Mongoose

Mongoose 是一个对象数据建模库，可让你使用 Node.js 将模式应用于 MongoDB 数据。

## 使用 Redis 持久化数据

它通常用于在应用程序中提供缓存，但也可以用作数据库。

## 使用 LevelDB 持久化数据

LevelDB 是一个嵌入式数据库。 它是谷歌编写的键值对存储，其中数据按键排序。 LevelDB 通常用于需要快速访问大型数据集的情况。 LevelDB 直接用作库，因此没有服务器或命令行界面。

我们将使用 `levelup` 和 `leveldown` 模块来创建我们的 LevelDB 存储并与之交互：

# 8、使用 Node.js 进行测试

## 用tape测试

TAP stands for **Test Anything Protocol**   

## 用Mocha测试

The `it()` syntax is to create a test case; it stands for Individual Test.   

## 用 Jest 进行测试

Jest 是 Facebook 开发的开源 JavaScript 测试框架。 它通常用于测试 React 代码，但也可用于测试 Node.js 应用程序。



`describe()` 用于定义测试集合。

Jest的 `test()` 语法用于定义测试用例。

### Mocking with Jest  

我们可以使用mock来验证我们的函数是否已使用正确的参数调用，而无需实际执行该函数。

```js
describe("uppercase", () => {
  test("uppercase hello returns HELLO", () => {
    uppercase = jest.fn(() => "HELLO");
    const result = uppercase("hello");
    expect(uppercase).toHaveBeenCalledWith("hello");
    expect(result).toBe("HELLO");
  });
});
```

`jest.fn(() => "HELLO");` returns a new mock function.   

## Stubbing HTTP requests  

为了能够在不向外部服务发送请求的情况下对代码进行单元测试，你可以伪造请求和响应。 这个概念被称为stubbing  。

```js
const test = require("tape");
const sinon = require("sinon");

const github = require("../github.js");
const octokitUserData = require("./octokitUserData.js");

test("Get GitHub user by username", async function (t) {
  t.plan(3);

  sinon.stub(github, "getGitHubUser").returns(octokitUserData);
  
  const githubUser = await github.getGitHubUser("octokit");

  t.equal(githubUser.id, 3430433);
  t.equal(githubUser.login, "octokit");
  t.equal(githubUser.name, "Octokit");
});

```

Stub，打桩，存根, 占位代码，指满足形式要求但没有实现实际功能的占坑/代理代码。

```js
sinon.stub(github, "getGitHubUser").returns(octokitUserData);
```

`stub()` 方法指示 Sinon.JS 创建一个匿名存根函数。 我们向 `stub()` 方法传递了两个参数，它们是我们希望存根的对象和方法。在我们的例子中，我们想要存根 `github.getGitHubUser()`。

## 使用 Puppeteer

Puppeteer 是一个开源库，可用于自动化 UI 测试。 Puppeteer 提供了一个可以以编程方式与之交互的headless  Chromium 实例。



也可以在非无头模式下运行 Puppeteer。你可以通过将参数传递给 launch() 方法来做到这一点：

```js
const browser = await puppeteer.launch({
	headless: false
});
```

在这种模式下，当你运行测试时，你将看到 Chromium UI，并且可以在测试执行时跟踪你的测试。 这在调试 Puppeteer 测试时特别有用。

## 配置持续集成测试

Continuous Integration (CI)   持续集成 (CI) 是一种开发实践，开发人员定期将他们的代码合并到源存储库。 为了保持源代码的完整性，通常会在接受每个代码更改之前运行自动化测试。

**Pull Request (PR)**  

有许多 CI 产品可以执行您的单元测试。 最受欢迎的之一是 Travis CI (https://travis-ci.org/)。 但其他包括 GitHub Actions (https://github.com/features/actions) 和 Circle CI (https://circleci.com/)。



默认情况下，Travis CI 配置为在提交被推送到任何分支时执行构建。



.travis.yml

```yaml
language: node_js
node_js:
  - 14
```

基础 Node.js `.travis.yml` 文件也默认使用 `npm install` 或 `npm ci` 安装依赖项。 当存在 `package-lock.json` 或 `npm-shrinkwrap.json` 文件时，Travis CI 将使用 `npm ci`。`npm ci` 安装项目的依赖项，但确保它从一个干净的状态安装它们。此命令是专门为在 CI 环境中使用而创建的。

在内部，当构建运行时，Travis CI 将首先将存储库克隆到虚拟环境中。 Travis CI 将执行 `.travis.yml` 文件中定义的构建任务。 在我们的例子中，由于我们没有指定任何自定义命令，Travis CI 默认运行 `npm install` 然后运行 `npm test`。 如果任何构建任务失败，构建将被标记为失败。

**GitHub 分支保护**

可以将 GitHub 配置为阻止拉取请求，直到它们通过build /CI 运行。 可以在 GitHub 存储库的设置中进行配置。

# 9、保护 Node.js 应用程序

**Cross-Site Scripting (XSS)** and **Cross-Site Request Forgery (CSRF)**  

## 检测已知的依赖漏洞

检测漏洞

```bash
$ npm audit  
```

修复漏洞

```bash
$ npm audit fix  
```

The `$ npm audit` command has been available since npm version 6. The command submits a report of the dependencies in our application and compares it with a database of known vulnerabilities. The `$ npm audit` command will audit direct, development, bundled, and optional dependencies. However, it does not audit peer dependencies. The command requires both a `package.json` and a `package-lock.json` file to be present; otherwise, it will fail. The audit automatically runs when a package is installed with the `$ npm install` command.

许多组织认为 `$ npm audit` 是一种预防措施，以保护其应用程序免受已知安全漏洞的影响。

In the recipe, we used the `$ npm audit fix` command to automatically update your dependencies to fixed versions. The command will only upgrade dependencies to later minor or patch versions.

```bash
$ npm audit fix --force  
```

可以使用 `$ npm audit fix --force` 命令覆盖此行为并强制 npm 更新所有依赖项，即使它们包括重大更改。

Tools such as **Dependabot** (https://dependabot.com/) can help keep your dependencies up to date by automating updates on GitHub.

## 使用 Express.js 进行身份验证

### Secure session cookies  

会话 cookies 可以使用`Secure`属性进行标记。 `Secure`属性强制浏览器不使用 HTTP 将 cookie 发送回服务器。 这是为了避免中间人**Man-In-Te-Middle（MITM）**攻击。在生产应用程序中，应使用 HTTPS 和安全 cookies。 但在开发中，使用 HTTP 更容易。

生产环境通常在负载均衡器层应用 SSL 加密。负载均衡器是应用程序架构中的一种技术，负责通过在一组资源上分配一组任务来提高应用程序的效率——例如，将登录请求分配到服务器。

### Hashing with bcrypt

密码永远不应以纯文本形式存储，而应以散列形式存储。 使用散列函数**hashing function**  将密码转换为散列形式。  

散列通常与一种称为加盐的技术结合使用。

`bcrypt` (https://www.npmjs.com/package/bcrypt) 是一个流行的模块，用于在 Node.js 中散列密码。

现在我们必须定义salt rounds的数量。`bcrypt` 将使用指定的轮数生成盐。

## 使用 Helmet 设置 HTTP 

`Helmet` 模块 (https://github.com/helmetjs/helmet) 提供了一个中间件来为我们的 HTTP 请求设置与安全相关的headers，从而节省手动配置的时间。

不加helmet模块前，返回的响应头：

```bash
$ curl -I http://localhost:3000
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
Date: Sun, 06 Feb 2022 03:07:22 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

注意 `X-Powered-By: Express` 头。

添加helmet模块

```js
const helmet = require("helmet");

app.use(helmet());
```

请注意，X-Powered-By 标头已被删除。



`helmet`  删除了 `X-Powered-By: Express` 标头，因此发现服务器是基于 Express 的变得更加困难。 混淆这一点的原因是为了防止攻击者试图利用面向 Express.js 的安全漏洞，从而减慢他们确定应用程序中使用的服务器类型的速度。



其他一些流行的 Web 框架也可以通过以下模块集成`helmet`  中间件：

- Koa.js: https://www.npmjs.com/package/koa-helmet
- Fastify: https://www.npmjs.com/package/fastify-helmet  

## 防御 HTTP 参数污染攻击

参数污染是一种注入攻击，其中 Web 应用程序的 HTTP 端点的 HTTP 参数被注入特定的恶意输入。 HTTP 参数污染可用于暴露内部数据，甚至导致拒绝服务 (DoS) 攻击，其中攻击者试图中断资源并使其无法被资源的预期用户访问。



发生这种情况是因为多个 `msg` 值已转换为数组。



Express.js 依赖于 `qs` 模块进行 URL 参数处理。 `qs` 模块处理多个同名参数的方法是将重复的名称转换为数组。 正如配方中所展示的，这种转换会导致代码中断和意外行为。

### 还有更多…

## 防止 JSON 污染

防止 JSON 污染攻击的关键是验证所有 JSON 输入。 这可以手动完成，也可以通过为您的 JSON 定义一个schema  模式来验证。

具体来说，我们将使用**Another JSON Schema Validator(Ajv)** 来验证我们的 JSON 输入。

## 防止跨站点脚本攻击

XSS 攻击是客户端注入攻击，其中恶意脚本被注入网站。 XSS 漏洞非常危险，因为它们可以危害受信任的网站。

为了转义或清理输入，我们将使用一个名为 `he` 的模块。



XSS 攻击的两种主要类型是persistent XSS  和reﬂected  XSS。



### Protocol-handler XSS  

### 参数验证

## 防范跨站请求伪造攻击

CSRF 是一种攻击，其中恶意 Web 应用程序导致用户的 Web 浏览器在用户登录的另一个受信任的 Web 应用程序上执行操作。

# 10、性能优化

## 对 HTTP 请求进行基准测试

我们将使用名为 `autocannon`(https://github.com/mcollina/autocannon) 的工具来模拟 HTTP 请求来捕获 HTTP Web 服务器的基准性能测量。

```bash
$ npm install --global autocannon  
```

输入以下命令以使用 `autocannon` 运行负载测试：

```bash
$ autocannon --connections 100 http://localhost:3000/  
```

### 复制生产环境

使用以下命令以生产模式重新启动 Express.js 服务器：

```bash
$ NODE_ENV=production npm start
```

## 解释火焰图

火焰图是一种可视化工具，它允许我们识别应用程序中的“热代码路径”。 术语“热代码路径”用于描述程序中消耗相对大量时间的执行路径，这可能表示应用程序中的瓶颈。

我们将使用 `0x` 火焰图工具（https://github.com/davidmarkclements/0x) 为我们的 Node.js 应用程序生成一个火焰图。

示例运行结果与书中不同，没有生成火焰图。

## 检测内存泄漏

当内存块从未被 GC 回收并因此空闲且效率低下时，就会发生内存泄漏。

### 准备好

### 怎么做…

```bash
$ node --max-old-space-size=10 leaky-server.js
Server listening on port 3000
```

## 优化同步函数

## 优化异步函数

## 使用工作线程

工作线程在 Node.js 版本 12 及更高版本中被声明为稳定，并通过 Node.js 核心 `worker_threads` 模块公开。工作线程 API 允许使用线程并行执行 JavaScript，最适合处理 CPU 密集型 JavaScript 操作

