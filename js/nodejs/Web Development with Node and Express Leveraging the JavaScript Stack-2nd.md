# Web Development with Node and Express Leveraging the JavaScript Stack-2nd

git registory: https://github.com/EthanRBrown/web-development-with-node-and-express-2e

# 1、介绍 Express  

Node 与更传统的 Web 服务器之间的另一个主要区别是 Node 是单线程的。单线程极大地简化了编写 Web 应用程序的业务，如果你需要多线程应用程序的性能，你可以简单地启动更多 Node 实例，并且你将有效地获得多线程的性能优势。

**注意**：npm 中有几个可用的包，它们将尝试找出项目中每个依赖项的许可证。 在 npm 中搜索 `nlf` 或 `license-report`。

# 2 开始使用 Node

要安装 nodemon（一种流行的实用程序，可以在你更改源代码时自动重启 Node 程序），你可以发出以下命令（在控制台上）：

```bash
npm install -g nodemon
```

# 4 整理

## npm 包

```json
{
    "dependencies": {
        "express": "^4.16.4",
        "express-handlebars": "^3.0.0"
    }
}
```

包版本前面的插入符号 (^) 表示以指定版本号开头的任何版本（直到下一个主要版本号）都可以使用。例如，这个 `package.json` 表示任何以 4.0.0 开头的 Express 版本都可以工作，因此 4.0.1 和 4.9.9 都可以工作，但 3.4.7 不会，5.0.0 也不会。这是使用 `npm install` 时的默认版本特异性，通常是一个非常安全的选择。npm 中的版本号由称为 `semver`（for “semantic versioning”  ）的组件解析。

# 5 质量保证

## 测试类型

- 单元测试

- 集成测试（我认为系统测试是一种集成测试）

## 质量保证技术概述

本书中使用的测试框架，

单元测试：Jest  

集成测试：使用 Puppeteer 和 Jest

## 单元测试

### 编写我们的第一个测试

ch05/lib/__tests__/handlers.test.js  

```js
const handlers = require('../handlers')

test('home page renders', () => {
  const req = {}
  const res = { render: jest.fn() }
  handlers.home(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('home')
})
```

在这种情况下，代码应该做的是用字符串 home 调用响应对象的 `render` 方法。 Jest 的 mock 函数会跟踪它被调用的所有时间，所以我们要做的就是验证它只被调用了一次（如果它被调用两次可能会出现问题），这是第一个 expect 所做的，并且 它以 home 作为它的第一个参数被调用（第一个数组索引指定哪个调用，第二个索引指定哪个参数）。

### 代码覆盖率

运行 `npm test -- --coverage`  

控制台输出如下（部分）：

| File             | % Stmts    | % Branch   | % Funcs    | % Lines    | Uncovered Line #s   |      |
| ---------------- | ---------- | ---------- | ---------- | ---------- | ------------------- | ---- |
| All files        | 93.1       | 75         | 83.33      | 92.31      |                     |      |
| ch05             | 87.5       | 75         | 0          | 87.5       |                     |      |
| meadowlark.js    | 87.5       | 75         | 0          | 87.5       | 29,30               |      |
| ch05/lib         | 100        | 100        | 100        | 100        |                     |      |
| fortune.js       | 100        | 100        | 100        | 100        |                     |      |
| handlers.js      | 100        | 100        | 100        | 100        |                     |      |
| ---------------- | ---------- | ---------- | ---------- | ---------- | ------------------- |      |
```bash
Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 4 passed, 5 total
Snapshots:   0 total
Time:        8.456s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

**其中**：

statements (Stmts)  

Statements  是指 JavaScript 语句，例如每个表达式、控制流语句等。请注意，你可以拥有 100% 的行覆盖率，但不是 100% 的语句覆盖率，因为你可以在 JavaScript 中将多个语句放在一行中。
Branch  覆盖是指控制流语句，例如 `if-else`。 如果你有 `if-else` 语句并且你的测试仅执行 `if` 部分，则该语句的分支覆盖率为 50%。

## 集成测试

meadowlark.js  

```js
if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}
```

我将跳过对此的技术解释，因为它相当乏味，但如果你很好奇，仔细阅读 [Node’s module documentation](http://bit.ly/32BDO3H)  将会清楚。 重要的是要知道，如果你直接用 node 运行一个 JavaScript 文件，`require.main` 将等于 global `module`  ； 否则，它是从另一个模块导入的。

Puppeteer 本质上是一个可控的、无头的 Chrome 版本。 （无头只是意味着浏览器能够在不实际在屏幕上渲染 UI 的情况下运行。）

## Linting  

ESLint 需要一个配置文件来告诉它应用哪些规则。 从头开始执行此操作将是一项耗时的任务，因此幸运的是 ESLint 提供了一个实用程序来为你创建一个。 从你的项目根目录，运行以下命令：

```bash
./node_modules/.bin/eslint --init
```

笨拙的 ./node_modules/.bin 路径需要直接运行本地安装的实用程序。我们很快就会看到，如果我们将实用程序添加到 package.json 文件的脚本部分，我们就不必这样做了，这是我们经常做的事情的推荐做法。

## 持续集成

# 6  Request 和 Response 对象

这两个对象起源于 Node，由 Express 扩展。

# 7 使用 Handlebars 进行模板化

## 选择模板引擎

[Template-Engine-Chooser](http://bit.ly/2CExtK0)  

## Pug：一种不同的方法

## Handlebars 基础知识

# 8 表单处理

##  表单处理的不同方法

- 302重定向

虽然这是一种常见的方法，但它是对 302（Found）响应代码的原始含义的误用。 HTTP 1.1 添加了 303 (See Other) 响应代码，这是更可取的。 除非你有理由针对 1996 年之前制造的浏览器，否则你应该改用 303。

- 303重定向

HTTP 1.1 中添加了 303（See Other）响应代码，以解决 302 重定向的误用问题。 HTTP 规范明确指出浏览器在遵循 303 重定向时应使用 GET 请求，而不管原始方法如何。 这是响应表单提交请求的推荐方法。



简介：*CSRF*一般指跨站请求伪造。 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 *CSRF* 或者 XSRF， 是一种挟持用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。



**提示**：在这种情况下使用 303（或 302）重定向非常重要，而不是 301 重定向。 301 重定向是“永久性的”，这意味着你的浏览器可能会缓存重定向目标。 如果你使用 301 重定向并尝试第二次提交表单，你的浏览器可能会完全绕过 `/process` 处理程序并直接转到 `/thank-you`，因为它正确地认为重定向是永久性的。另一方面，303 重定向告诉你的浏览器，“是的，你的请求有效，你可以在此处找到你的响应”，并且不会缓存重定向目标。

## 使用 Fetch 发送表单数据

## 文件上传

多部分表单处理有四种流行且强大的选项：busboy、multiparty、formidable 和 multer。 四个我都用过，都不错，但是我觉得multiparty是最好维护的，所以就用在这里。

### 使用 Fetch 上传文件

令人高兴的是，使用 `fetch` 进行文件上传几乎与让浏览器处理它完全相同。 文件上传的艰巨工作实际上是在编码中，这是通过中间件为我们处理的。

# 9 Cookies 和 Sessions  

不幸的是，由于人们对它们所做的邪恶行为，Cookie 名声不好。这很不幸，因为 cookie 对于“现代网络”的运行来说确实非常重要（尽管 HTML5 引入了一些新功能，如 local storage ，可用于相同目的）。

*Cookies 对用户来说不是秘密*

服务器发送给客户端的所有 cookie 都可供客户端查看。你没有理由不能发送加密的内容来保护其内容，但很少需要这样做（（至少如果你没有做任何邪恶的事情！）。我们稍后将讨论的 `Signed`   cookie 可以混淆 cookie 的内容，但这绝不是加密安全的，以免被窥探。

*用户可以删除或禁止 cookie*

用户可以完全控制 cookie，浏览器可以批量或单独删除 cookie。 除非你不怀好意，否则用户没有真正的理由这样做，但它在测试期间很有用。 用户也可以禁止 cookie，这会带来更多问题，因为只有最简单的 Web 应用程序才能在没有 cookie 的情况下使用。

*常规 cookie 可以被篡改*

每当浏览器向你的服务器发出具有关联 cookie 的请求并且你盲目地信任该 cookie 的内容时，你就是在为攻击打开自己的大门。 例如，最愚蠢的做法是执行 cookie 中包含的代码。 为确保 cookie 不被篡改，请使用签名 cookie。

*Cookie 可用于攻击*

近年来，一种称为跨站点脚本 (XSS) 攻击的攻击如雨后春笋般涌现。 XSS 攻击的一种技术涉及恶意 JavaScript 修改 cookie 的内容。 这是不信任返回到你的服务器的 cookie 内容的另一个原因。 使用签名 cookie 有帮助（无论用户还是恶意 JavaScript 修改了签名 cookie，篡改在签名 cookie 中都是显而易见的），还有一个设置指定 cookie 只能由服务器修改。 这些 cookie 的用途可能会受到限制，但它们肯定更安全。

*如果你滥用 cookie，用户会注意到*

如果你在用户的计算机上设置了大量 cookie 或存储了大量数据，这会激怒你的用户，这是你应该避免的事情。 尽量减少对 cookie 的使用。

*Prefer sessions over cookies*  

在大多数情况下，你可以使用会话来维护状态，这样做通常是明智的。 它更容易，你不必担心滥用用户的存储空间，而且它可以更安全。 会话当然依赖于 cookie，但是对于会话，Express 将为你完成繁重的工作。

**提示**：Cookie 不是魔法：当服务器希望客户端存储 cookie 时，它会发送一个名为 `Set-Cookie` 的标头，其中包含名称/值对，并且当客户端向其具有 cookie 的服务器发送请求时，它会发送多个 Cookie 包含 cookie 值的请求标头。

## 外化凭证

## Express 中的 Cookie

`cookie-parser`  中间件

ch09/meadowlark.js  

```js
const cookieParser = require('cookie-parser')
app.use(cookieParser(credentials.cookieSecret))

res.cookie('monster', 'nom nom')
res.cookie('signed_monster', 'nom nom', { signed: true })
```

**注意**：已签名的 cookie 优先于未签名的 cookie。 如果你将已签名的 cookie 命名为 signed_monster，则你不能拥有同名的未签名 cookie（它将返回为 `undefined`）。

要检索从客户端发送的 cookie（如果有）的值，只需访问 request 对象的 `cookie` 或 `signedCookie` 属性：

```js
const monster = req.cookies.monster
const signedMonster = req.signedCookies.signed_monster
```

当你设置 cookie 时，你可以指定以下选项：

- `domain`  

- path  

- maxAge  

- secure  

- httpOnly  

将此设置为 `true` 指定 cookie 将仅由服务器修改。 也就是说，客户端 JavaScript 无法修改它。 这有助于防止 XSS 攻击。

- signed  

将此设置为 true 会标记此 cookie，使其在 `res.signedCookies` 而不是 `res.cookies` 中可用。 被篡改的签名 cookie 将被服务器拒绝，cookie 值将被重置为原始值。

## Sessions  

### Memory Stores

### 使用会话

## 会话的用途

当你想要保存跨页面应用的用户首选项时，会话很有用。 最常见的是，会话用于提供用户身份验证信息：你登录，并创建一个会话。 之后，你不必每次重新加载页面时都重新登录。 不过，即使没有用户帐户，会话也很有用。站点记住你喜欢的事物排序方式或你喜欢的日期格式是很常见的——所有这些都无需你登录。

虽然我鼓励你更喜欢会话而不是 cookie，但了解 cookie 的工作原理很重要（尤其是因为它们使会话能够工作）。 它将帮助你诊断问题并了解应用程序的安全和隐私注意事项。

# 10 中间件

从概念上讲，*中间件*是一种封装功能的方法——具体来说，是对应用程序的 HTTP 请求进行操作的功能。 实际上，中间件只是一个接受三个参数的函数：一个请求对象、一个响应对象和一个 next() 函数，稍后将对其进行解释。 （还有一种带有四个参数的形式，用于错误处理，将在本章末尾介绍。）

中间件在所谓的 *pipeline* 中执行。在 Express 应用程序中，你可以通过调用 `app.use` 将中间件插入pipeline。

## 中间件原理

## 通用中间件

# 11 发送电子邮件

我推荐的软件包是 Andris Reinman 的优秀 [Node-mailer](http://bit.ly/2Ked7vy)。

## SMTP, MSAs, and MTAs 

Simple Mail Transfer Protocol (SMTP)  

mail submission agent (MSA)  

mail transfer agent (MTA)  

虽然可以使用 SMTP 将电子邮件直接发送到收件人的邮件服务器，但这通常不是一个好主意：除非你是 Google 或 Yahoo! 等“受信任的发件人”，否则你的电子邮件很可能会被直接扔进垃圾邮件 垃圾桶。最好使用邮件提交代理 (MSA)，它会通过受信任的渠道发送电子邮件，从而减少你的电子邮件被标记为垃圾邮件的可能性。除了确保你的电子邮件送达之外，MSA 还会处理临时中断和退回电子邮件等麻烦事。等式的最后一部分是邮件传输代理 (MTA)，它是实际将电子邮件发送到最终目的地的服务。 就本书而言，MSA、MTA 和 SMTP 服务器本质上是等同的。

## 接收邮件

## Nodemailer  

# 12 生产问题

## 执行环境

## 特定于环境的配置

`morgan`  ，这是最常见的日志记录中间件。

## 运行你的 Node 进程

根据你的托管解决方案，如果托管解决方案本身提供进程管理器，则你可能不需要进程管理器。 也就是说，托管提供商会给你一个配置选项来指向你的应用程序文件，它会处理进程管理。

但是，如果你需要自己管理进程，进程管理员有两种流行的选择：

• Forever
• PM2  

## 扩展你的网站

构建设计用于横向扩展的网站时要记住的最重要的事情是持久性。 如果你习惯于依赖基于文件的存储来实现持久性，*请就此打住*。 那就是疯狂。

### 使用 App Clusters  横向扩展

ch12\01-server.js

```js
function startServer(port) {
  app.listen(port, function() {
    console.log(`Express started in ${app.get('env')} ` +
      `mode on http://localhost:${port}` +
      `; press Ctrl-C to terminate.`)
  })
}

if(require.main === module) {
  // application run directly; start app server
  startServer(process.env.PORT || 3000)
} else {
  // application imported as a module via "require": export
  // function to create server
  module.exports = startServer
}
```

如果`require.main === module`，说明脚本已经直接运行； 否则，它已从另一个脚本中用 `require` 调用。

### 处理未捕获的异常

**提示**：`process.nextTick` 类似于调用参数为 0 的 `setTimeout`，但效率更高。

因此，考虑到这一点，当遇到未处理的异常时，我们如何才能尽可能优雅地关闭呢？ Node 的处理机制是 `uncaughtException` 事件。

### 使用多个服务器（Multiple Servers）横向扩展

尽管使用集群进行横向扩展可以最大限度地提高单个服务器的性能，但是当你需要多个服务器时会发生什么情况呢？ 这就是事情变得有点复杂的地方。 要实现这种并行，就需要一个代理服务器。（为了区别于常用于访问外部网络的代理，它通常被称为反向代理或前向代理，但我觉得这种语言令人困惑且没有必要，所以我 将简单地将其称为代理。）

两个非常流行的选项是 [NGINX](https://www.nginx.com)（发音为“engine X”）和 [HAProxy](http://www.haproxy.org)。

如果你确实配置了代理服务器，请确保你告诉 Express 你正在使用代理并且它应该是可信的：

```js
app.enable('trust proxy')
```

## 监控你的网站

# 13 持久化

## Filesystem  持久化

Node 通过 `fs`（filesystem）模块使文件系统持久化成为可能。

## 云持久化

 AWS 将其文件存储机制称为`buckets`  ，而 Azure 称它们为 `containers` 。

• [AWS: Getting Started in Node.js](https://amzn.to/2CCYk9s)
• [Azure for JavaScript and Node.js Developers](http://bit.ly/2NEkTku)  

## 数据库持久化

### 关于性能的注释

### 抽象数据库层

### 设置 MongoDB

在线申请，https://mlab.com  

https://cloud.mongodb.com/v2/6402bcc17cbeea0ce4fa05f6#/clusters，使用 google 账号登录。

### Mongoose

虽然 MongoDB 有可用的低级驱动程序，但你可能希望使用 object document mapper    (ODM)。 MongoDB 最流行的 ODM 是 `Mongoose`。  

Mongoose 试图通过引入`schemas`  和 `models`（结合起来，模式和模型类似于传统面向对象编程中的类）来取得平衡。 模式很灵活，但仍为你的数据库提供一些必要的结构。

ch13\00-mongodb\models\vacation.js

```js
const mongoose = require('mongoose')

const vacationSchema = mongoose.Schema({
  name: String,
  slug: String,
  category: String,
  sku: String,
  description: String,
  location: {
    search: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  price: Number,
  tags: [String],
  inSeason: Boolean,
  available: Boolean,
  requiresWaiver: Boolean,
  maximumGuests: Number,
  notes: String,
  packagesSold: Number,
})

const Vacation = mongoose.model('Vacation', vacationSchema)
module.exports = Vacation
```

一旦我们有了模式，我们就使用 `mongoose.model` 创建一个模型：在这一点上，`Vacation` 非常像传统面向对象编程中的一个类。

**注意**：由于浮点数的性质，你应该始终小心使用 JavaScript 进行金融计算。你应该考虑使用诸如 [currency.js](https://currency.js.org) 或 [decimal.jslight](http://bit.ly/2X6kbQ5) 之类的库。 此外，自 Node 10 起可用的 JavaScript 的 [BigInt](https://mzl.la/2Xhs45r) 内置对象（在我编写本文时浏览器支持有限）可用于此目的。

### 生成初始数据

### 检索数据

### 添加数据

### PostgreSQL

object-relational mapping (ORM)   



github授权登录



使用[Lodash](https://lodash.com)  的函数，可以将pg字段的snake_case  格转换成 camelCase 。   

```typescript
const { Pool } = require('pg')
const _ = require('lodash')

const credentials = require('./credentials')

const { connectionString } =
  credentials.postgres[process.env.NODE_ENV || 'development']
const pool = new Pool({ connectionString })

module.exports = {
  getVacations: async () => {
    const { rows } = await pool.query('SELECT * FROM VACATIONS')
    return rows.map(row => {
      const vacation = _.mapKeys(row, (v, k) => _.camelCase(k))
      vacation.price = parseFloat(vacation.price.replace(/^\$/, ''))
      vacation.location = {
        search: vacation.locationSearch,
        coordinates: {
          lat: vacation.locationLat,
          lng: vacation.locationLng,
        },
      }
      return vacation
    })
  },
  addVacationInSeasonListener: async (email, sku) => {
    await pool.query(
      'INSERT INTO vacation_in_season_listeners (email, sku) ' +
      'VALUES ($1, $2) ' +
      'ON CONFLICT DO NOTHING',
      [email, sku]
    )
  },
}
```

它还使用Lodash的 `mapKeys`  和 `camelCase`  函数将我们的数据库属性转换为 camelCase。

## 使用数据库进行会话存储

gmail/chrome密码

# 14 路由

以下是一些帮助你实现持久 IA 的建议：

- 为你的 URLs 使用小写字母

## Routes and SEO

## Subdomains    

Express 中的路由机制默认不考虑子域：app.get(/about) 将处理对 http://meadowlarktravel.com/about ，http://www.meadowlarktravel.com/about 和 http://admin.meadowlarktravel.com/about 的请求。如果你想单独处理一个子域，你可以使用一个名为 `vhost` 的包（用于“虚拟主机”，它来自通常用于处理子域的 Apache 机制）。

要在你的开发机器上测试基于子域的路由，你需要一些方法来“伪造”域名。 幸运的是，这就是你的 `hosts file`  的用途。

C:\Windows\System32\drivers\etc\hosts

```bash
127.0.0.1 admin.meadowlark.local
127.0.0.1 meadowlark.local
```

## 路由处理程序是中间件

我们还可以使用这种方法实现授权机制。假设我们的用户授权代码设置了一个名为 `req.session.authorized` 的会话变量。我们可以使用以下内容来制作可重用的授权过滤器（配套仓库中的 ch14/04-authorizer.js）：

```js
function authorize(req, res, next) {
  if(req.session.authorized) return next()
  res.render('not-authorized')
}

app.get('/public', (req, res) => res.render('public'))

app.get('/secret', authorize, (req, res) => res.render('secret'))
```

## 路由路径和正则表达式

```js
app.get('/user(name)?', (req, res) => res.render('user'))
```

```js
app.get('/khaa+n', (req, res) => res.render('khaaan'))
```

## 路由参数

## 组织路由

### 在模块中声明路由

### 将处理程序按逻辑分组

### 自动渲染视图

# 15 REST APIs 和 JSON

对 REST 的正式描述很复杂并且充满了计算机科学形式，但基本原理是 REST 是客户端和服务器之间的无状态连接。 REST 的正式定义还规定了服务可以缓存，服务可以分层（也就是说，当你使用一个 REST API 时，它下面可能还有其他 REST API）。

从实际的角度来看，HTTP 的限制实际上使得创建非 RESTful 的 API 变得困难； 例如，你必须竭尽全力建立状态。 所以我们的工作大部分都是为我们完成的。

## API错误报告

一般来说，错误可以分为以下几类：

**灾难性错误**

导致服务器状态不稳定或未知的错误。 通常，这是未处理异常的结果。 从灾难性错误中恢复的唯一安全方法是重新启动服务器。 理想情况下，任何挂起的请求都会收到 500 响应代码，但如果故障足够严重，服务器可能根本无法响应，请求就会超时。

**可恢复的服务器错误**

可恢复的错误不需要重新启动服务器或任何其他英雄行为。 该错误是服务器上意外错误情况的结果（例如，数据库连接不可用）。 该问题可能是暂时的或永久的。 在这种情况下，500 响应代码是合适的。

**客户端错误**

客户端错误是客户端犯错的结果——通常是参数丢失或无效。 使用 500 响应代码是不合适的。 毕竟服务器没有出故障。 一切正常； 客户端只是没有正确使用 API。 你在这里有几个选择：你可以使用状态代码 200 进行响应并在响应正文中描述错误，或者你可以另外尝试使用适当的 HTTP 状态代码来描述错误。 我推荐后一种方法。 在这种情况下最有用的响应代码是 404（未找到）、400（错误请求）和 401（未授权）。 此外，响应正文应包含对错误细节的解释。 如果你想超越，错误消息甚至会包含指向文档的链接。 请注意，如果用户请求了一个列表但没有返回任何内容，这不是错误情况。 简单地返回一个空列表是合适的。

## Cross-Origin Resource Sharing  

`same-origin policy`  使得你的 API 无法被其他站点使用，而这正是跨域资源共享 (CORS) 的用武之地。CORS 允许你根据具体情况取消此限制，甚至允许你列出特别允许哪些域访问脚本。 CORS 是通过 `Access-Control-Allow-Origin` 标头实现的。 在 Express 应用程序中实现它的最简单方法是使用 `cors` 包 (`npm install cors`)。 要为你的应用程序启用 CORS，请使用：

```js
const cors = require('cors')
app.use(cors())
```

因为存在同源 API 是有原因的（为了防止攻击），所以我建议仅在必要时应用 CORS。 在我们的例子中，我们想要公开我们的整个 API（但只是 API），因此我们将 CORS 限制为以 `/api` 开头的路径：

```js
const cors = require('cors')
app.use('/api', cors())
```

有关更高级的 CORS 使用的信息，请参阅[包文档](https://github.com/expressjs/cors)。

## 我们的测试

在我们为 API 编写测试之前，我们需要一种方法来实际*调用* REST API。 为此，我们将使用一个名为 `node-fetch` 的 Node 包，它复制了浏览器的 `fetch` API：

## 使用 Express 提供 API

Express 非常有能力提供 API。 有各种可用的 npm 模块提供有用的功能（例如，请参阅 `connect-rest` 和 `json-api`），但我发现 Express 开箱即用，我们将坚持使用纯 Express 实现。

# 16 单页应用程序

术语*single-page application*   (SPA) 有点用词不当，或者它至少混淆了“页面”一词的两种含义。 从用户的角度来看，SPA 可以（而且通常确实）仍然具有不同的页面：主页、假期页面、关于页面等。 事实上，你可以创建一个传统的服务器端渲染的应用程序和一个用户无法区分的 SPA。

“单页”更多地与 HTML 的构造位置和方式有关，而不是用户体验。 在 SPA 中，服务器会在用户首次加载应用程序时提供单个 HTML 包，UI 中的任何更改（对用户而言可能显示为不同的页面）都是 JavaScript 操纵 DOM 以响应用户活动或 网络事件。

SPA 仍然需要与服务器频繁通信，但 HTML 通常仅作为第一个请求的一部分发送。 之后客户端和服务器之间只传输JSON数据和静态资产。

## Web 应用程序开发简史

这种技术称为服务器端渲染 (SSR)，它允许服务器使用浏览器用来创建单独页面的相同代码，以增加首页负载。 这里的关键是服务器不需要做太多思考：它只是使用与浏览器相同的技术来生成特定页面。 这种SSR通常是为了提升首页加载体验，支持搜索引擎优化。

## React Basics  

### Routing  

```jsx
function Home() {
  return (
    <div>
      <h2>Welcome to Meadowlark Travel</h2>
      <ul>
        <li>Check out our "<Link to="/about">About</Link>" page!</li>
        <li>And our <Link to="/vacations">vacations</Link>!</li>
      </ul>
    </div>
  )
}
```

要注意的第二件事是 <Link> 的使用。 你可能想知道为什么我们不只使用 <a> 标签。<a> 标签的问题是——如果不做一些额外的工作——浏览器会尽职尽责地把它们当作“去别处”，即使它在同一个网站上，它会导致对服务器的新 HTTP 请求……和 HTML 并且 CSS 将被再次下载，击败 SPA 议程。它的工作原理是当页面加载时，React Router 会做正确的事情，但它不会那么快或高效，调用不必要的网络请求。 看到差异实际上是一项有启发性的练习，可以让你深入了解 SPA 的本质。作为实验，创建两个导航元素，一个使用 <Link>，另一个使用 <a>：

```jsx
<Link to="/">Home (SPA)</Link>
<a href="/">Home (reload)</a>
```

然后打开你的开发工具，打开“网络”选项卡，清除流量，然后单击“保留日志”（在 Chrome 上）。 现在单击“Home (SPA)”链接，注意根本没有网络流量。 单击“主页（重新加载）”链接并观察网络流量。 简而言之，这就是 SPA 的本质。

### 部署选项

**提示**：如果你想知道 CRA 的开发服务器是如何工作的，它使用了一个名为 `webpack-dev-server` 的包，它在底层使用 Express！ 所以最后一切都回到了 Express！

# 17 静态内容

## 性能注意事项

两个主要的性能考虑因素是`减少请求数量`和`减小内容大小`。

在这两者中，减少 (HTTP) 请求的数量更为重要，尤其是对于移动设备而言（通过蜂窝网络发出 HTTP 请求的开销要高得多）。 减少请求数量可以通过两种方式实现：组合资源和浏览器缓存。

**组合资源**主要是架构和前端问题：应尽可能将小图像组合成单个精灵。 然后使用 CSS 设置偏移量和大小以仅显示你想要的图像部分。 对于创建精灵，我强烈推荐免费服务 [SpritePad](http://bit.ly/33GYvwm)。 它使生成 sprite 变得异常容易，它也为你生成 CSS。 没有比这更容易的了。SpritePad 的免费功能可能是你所需要的全部，但如果你发现自己创建了很多精灵，你可能会发现他们的高级产品是值得的。

**浏览器缓存**通过在客户端浏览器中存储常用的静态资源来帮助减少 HTTP 请求。 尽管浏览器竭尽全力使缓存尽可能自动化，但这并不神奇：你可以而且应该做很多事情来启用静态资源的浏览器缓存。

最后，我们可以通过减少静态资源的大小来提高性能。 有些技术是*无损*的（可以在不丢失任何数据的情况下实现尺寸缩减），而有些技术是*有损*的（尺寸缩减是通过降低静态资源的质量来实现的）。 无损技术包括缩小 JavaScript 和 CSS，以及优化 PNG 图像。 有损技术包括提高 JPEG 和视频压缩级别。 我们将在本章中讨论缩小和捆绑（minification and bundling）（这也减少了 HTTP 请求）。

**提示**：随着 HTTP/2 变得越来越普遍，减少 HTTP 请求的重要性将随着时间的推移而减弱。 HTTP/2 的主要改进之一是`请求和响应多路复用`，它减少了并行获取多个资源的开销。 有关详细信息，请参阅 Ilya Grigorik 的“HTTP/2 简介”。

## Content Delivery Networks  

但是，如果你想最大限度地提高站点的性能（或允许将来这样做），你将希望能够轻松地将静态资源托管在*内容分发网络* (CDN) 上。 CDN 是为交付静态资源而优化的服务器。 它利用启用浏览器缓存的特殊标头（我们将很快了解）。

CDN 还可以启用*地理优化*（通常称为边缘缓存）； 也就是说，他们可以从地理位置更接近你的客户的服务器传送你的静态内容。 虽然互联网确实非常快（不是以光速运行，确切地说，但足够接近），但传输一百英里的数据仍然比一千英里更快。 个人节省的时间可能很少，但如果你将所有用户、请求和资源相乘，它就会快速增加。

**提示**：使用 CDN 时，你通常不必担心跨域资源共享 (CORS)。 以 HTML 加载的外部资源不受 CORS 策略的约束：你必须仅为通过 Ajax 加载的资源启用 CORS（请参阅第 15 章）。

## Designing for CDNs

构建应用程序的最简单方法是轻松区分动态资产和静态资产，以使 CDN 路由规则尽可能简单。

### 服务端渲染的网站

```js
app.use('/static', express.static('public'))
```

### 单页应用程序

单页应用程序通常与服务器渲染的网站相反：只有 API 会被路由到你的服务器（例如，任何以 `/api` 为前缀的请求），其他所有内容都将被重新路由到你的静态文件存储。

## 缓存静态资产

`Expires/Cache-Control`  

你只需要这些标头之一，并且 Expires 得到更广泛的支持，因此最好使用那个标头。 如果资源在缓存中，并且还没有过期，浏览器根本不会发出 GET 请求，这提高了性能，尤其是在移动设备上。

`Last-Modified/ETag`  

这两个标签提供了某种版本控制：如果浏览器需要获取资源，它会在下载内容之前检查这些标签。 仍然向服务器发出 GET 请求，但如果这些标头返回的值使浏览器满意资源没有更改，则不会继续下载文件。 顾名思义，`Last-Modified` 允许你指定资源的最后修改日期。 `ETag` 允许你使用任意字符串，通常是版本字符串或内容哈希。 



提供静态资源时，你应该使用 `Expires` 标头和 `LastModified` 或 `ETag`。 Express 内置 `static` 中间件设置 `Cache-Control`，但不处理 `Last-Modified` 或 `ETag`。 因此，虽然它适用于开发，但并不是一个很好的部署解决方案。

## 改变你的静态内容

缓存显着提高了网站的性能，但也并非没有后果。 特别是，如果你更改任何静态资源，客户端可能无法看到它们，直到缓存版本在你的浏览器中过期。 Google 建议你缓存一个月，最好是一年。 想象一下每天在同一个浏览器上使用你的网站的用户：这个人可能一整年都看不到你的更新！

显然这是一种不受欢迎的情况，你不能只是告诉你的用户清除他们的缓存。 解决方案是缓存破坏。**缓存破坏**（Cache busting）是一种让你控制用户浏览器何时被迫重新下载资产的技术。通常这相当于对资产进行版本控制（*main.2.css* 或 *main.css?version=2*）或添加某种哈希（*main.e16b7e149dccfcc399e025e0c454bf77.css*）。 无论你使用什么技术，当你更新资源时，资源名称都会改变，浏览器知道它需要下载它。

我们可以对我们的多媒体资产做同样的事情。 让我们以我们的 logo 为例（*/static/img/meadowlark_logo.png*）。 如果我们将其托管在 CDN 上以获得最佳性能，指定一年的到期时间，然后更改 logo，你的用户可能最多一年都看不到更新后的 logo。 但是，如果你重命名你的logo  */static/img/meadowlark_logo-1.png*（并在你的 HTML 中反映该名称更改），浏览器将被迫下载它，因为它看起来像一个新资源。

如果你使用的是单页应用程序框架，例如 create-react-app 或类似框架，它们将提供一个构建步骤，该步骤将创建附加了哈希值的生产就绪资源包。

如果你是从头开始，你可能想要查看一个bundler（这是 SPA 框架在幕后使用的）。 Bundlers 将你的 JavaScript、CSS 和一些其他类型的静态资产组合成尽可能少的，并缩小结果（使其尽可能小）。 Bundler 配置是一个很大的话题，但幸运的是那里有很多好的文档。 目前可用的最流行的bundler如下：

[Webpack](https://webpack.js.org)  

Webpack 是最早真正起飞的打包工具之一，它仍然拥有大量的追随者。 它非常复杂，但这种复杂性是有代价的：学习曲线陡峭。 但是，至少了解基础知识是件好事。

[Parcel](https://parceljs.org)  

Parcel 是新来者，它引起了轰动。 它的文档非常齐全，速度非常快，而且最重要的是，它的学习曲线最短。 如果你希望快速完成工作，不费吹灰之力，请从这里开始。

[Rollup](https://rollupjs.org)  

Rollup 介于 Webpack 和 Parcel 之间。 和 Webpack 一样，它非常健壮并且有很多特性。 但是，它比Webpack更容易上手，不像Parcel那么简单。

# 18 安全

## HTTPS  

安全性与最薄弱的环节一样强大，该链条中的第一个环节是网络协议。

HTTPS 协议基于具有公钥证书（有时称为 SSL 证书）的服务器。 SSL 证书的当前标准格式称为 X.509。 证书背后的想法是有颁发证书的证书颁发机构 (CA)。 证书颁发机构向浏览器供应商提供受信任的根证书。 当你安装浏览器时，浏览器会包含这些受信任的根证书，这就是在 CA 和浏览器之间建立信任链的原因。 要使此链正常工作，你的服务器必须使用 CA 颁发的证书。

这样做的结果是，要提供 HTTPS，你需要 CA 的证书，那么如何获得这样的东西呢？ 从广义上讲，你可以生成自己的、从免费 CA 获得一个，或从商业 CA 购买一个。

### 生成你自己的证书

生成你自己的证书很容易，但通常只适用于开发和测试目的（并且可能适用于 Intranet 部署）。由于证书颁发机构建立的层次结构，浏览器将只信任已知 CA（可能不是你）生成的证书。 如果你的网站使用来自浏览器未知的 CA 的证书，浏览器将以非常令人震惊的语言警告你，你正在与未知（因此不受信任）的实体建立安全连接。 在开发和测试中，这很好：你和你的团队知道你生成了自己的证书，并且你期望浏览器出现这种行为。 如果你要将这样的网站部署到生产环境以供公众消费，他们会成群结队地离开。

要生成你自己的证书，你需要一个 OpenSSL 实现。

表 18-1 获取不同平台的实现

| Platform       | Instructions                                                 |
| -------------- | ------------------------------------------------------------ |
| macOS          | brew install openssl                                         |
| Ubuntu, Debian | sudo apt-get install openssl                                 |
| Other Linux    | Download from http //www.openssl.org/source/; extract tarball and follow instructions |
| Windows        | Download from http://gnuwin32.sourceforge.net/packages/openssl htm |

安装 OpenSSL 后，你可以生成一个私钥和一个公共证书：

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout meadowlark.pem -out meadowlark.crt
```

此命令的结果是两个文件，*meadowlark.pem* 和 *meadowlark.crt*。 隐私增强电子邮件 (PEM) 文件是你的私钥，不应向客户端提供。 CRT 文件是将发送到浏览器以建立安全连接的自签名证书。

### 使用免费证书颁发机构

[Let's Encrypt](https://letsencrypt.org) 是一个基于开源的免费自动化 CA，已成为一个不错的选择。Let's Encrypt 的唯一缺点是其证书的最长有效期为 90 天。

### 购买证书

## 为你的 Express 应用启用 HTTPS

## A Note on Ports  

## HTTPS 和代理

如果你使用代理服务器，那么客户端（用户的浏览器）将与**代理服务器**通信，而不是你的服务器。反过来，代理服务器很可能会通过常规 HTTP 与你的应用程序通信（因为你的应用程序和代理服务器将在受信任的网络上一起运行）。 你会经常听到人们说 HTTPS 在代理服务器处终止，或者代理正在执行“SSL 终止”。

在大多数情况下，一旦你或你的托管服务提供商正确配置了代理服务器来处理 HTTPS 请求，你就不需要做任何额外的工作。如果你的应用程序需要同时处理安全和不安全的请求，则该规则的例外情况 .

这个问题有三种解决方案。 第一个是简单地配置你的代理以将所有 HTTP 流量重定向到 HTTPS，实质上强制与你的应用程序的所有通信都通过 HTTPS。 这种方法正变得越来越普遍，它当然是解决问题的简单方法。

第二种方法是以某种方式将客户端代理通信中使用的协议传达给服务器。 通常的通信方式是通过 `X-Forwarded-Proto` 标头。 例如，要在 NGINX 中设置此标头：

```bash
proxy_set_header X-Forwarded-Proto $scheme;
```

然后，在你的应用程序中，你可以测试协议是否为 HTTPS：

```js
app.get('/', (req, res) => {
  // the following is essentially
  // equivalent to: if(req.secure)
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.send('line is secure')
  } else {
    res.send('you are insecure!')
  }
})
```

**注意**：在 NGINX 中，有一个单独的 `server` 配置块用于 HTTP 和 HTTPS。 如果你未能在与 HTTP 对应的配置块中设置 `X-Forwarded-Protocol`，你就会面临客户端欺骗标头的可能性，从而使你的应用程序认为连接是安全的，即使它不是 . 如果你采用这种方法，请确保始终设置 `X-Forwarded-Protocol` 标头。

当你使用代理时，Express 提供了一些方便的属性，使代理更加“透明”（就好像你没有使用代理一样，而不会牺牲好处）。 要利用这一点，请使用 `app.enable('trust proxy')` 告诉 Express 信任代理。 一旦你这样做，`req.protocol`、`req.secure` 和 `req.ip` 将引用客户端与代理的连接，而不是你的应用程序。

## Cross-Site Request Forgery  

跨站点请求伪造 (CSRF) 攻击利用了用户通常信任他们的浏览器并在同一会话中访问多个站点这一事实。 在 CSRF 攻击中，恶意站点上的脚本向另一个站点发出请求：如果你登录到另一个站点，则恶意站点可以成功地从另一个站点访问安全数据。

为了防止 CSRF 攻击，你必须有办法确保请求合法地来自你的网站。 我们这样做的方法是将一个唯一的 token 传递给浏览器。当浏览器随后提交表单时，服务器会检查以确保 token 匹配。 `csurf` 中间件将为你处理 token 创建和验证； 你所要做的就是确保 token 包含在对服务器的请求中。安装 `csurf` 中间件（`npm install csurf`）； 然后将其链接并向 r`es.locals` 添加一个 token 。 确保在链接 `body-parser`、`cookie-parser` 和 `express-session` 之后链接 `csurf` 中间件：

```js
// this must come after we link in body-parser,
// cookie-parser, and express-session
const csrf = require('csurf')
app.use(csrf({ cookie: true }))
app.use((req, res, next) => {
  res.locals._csrfToken = req.csrfToken()
  next()
})
```

`csurf` 中间件将 `csrfToken` 方法添加到请求对象。 我们不必将它分配给 `res.locals`； 我们可以直接将 `req.csrfToken()` 显式传递给每个需要它的视图，但这通常工作量较小。

现在，在所有表单（和 AJAX 调用）上，你必须提供一个名为 `_csrf` 的字段，该字段必须与生成的令牌匹配。 让我们看看如何将其添加到我们的表单之一：

```jsx
<form action="/newsletter" method="POST">
  <input type="hidden" name="_csrf" value="{{_csrfToken}}">
  Name: <input type="text" name="name"><br>
  Email: <input type="email" name="email"><br>
  <button type="submit">Submit</button>
</form>
```

`csurf` 中间件将处理其余部分：如果 body 包含字段，但没有有效的 `_csrf` 字段，它将引发错误（确保你的中间件中有错误路由！）。 继续并删除隐藏字段，看看会发生什么。

**注意**：如果你有 API，你可能不希望 `csurf` 中间件干扰它。 如果你想限制从其他网站访问你的 API，你应该查看 API 库（如 `connect-rest`）的“API key”功能。 为防止 `csurf` 干扰你的中间件，请在链接 `csurf` 之前链接它。

## Authentication

身份验证是一个大而复杂的话题。 不幸的是，它也是大多数重要 Web 应用程序的重要组成部分。我可以传授给你的最重要的智慧是*不要试图自己做*。如果你查看自己的名片，发现名片上没有“安全专家”字样，那么你可能还没有为设计安全身份验证系统所涉及的复杂考虑做好准备。

### 身份验证与授权

虽然这两个术语经常互换使用，但还是有区别的。 身份验证（*Authentication*）是指验证用户的身份。 也就是说，他们就是他们所说的那样。授权（*Authorization*）是指确定用户被授权访问、修改或查看的内容。 例如，客户可能被授权访问他们的帐户信息，而 Meadowlark Travel 员工将被授权访问其他人的帐户信息或销售记录。

**提示**：Authentication is often abbreviated as *authN* and “authorization” as *authZ*.  

### 使用密码的问题

密码的问题在于每个安全系统的强度取决于其最薄弱的环节。 密码要求用户发明一个密码——这是你最薄弱的环节。众所周知，人类不擅长想出安全密码。 在对 2018 年安全漏洞的分析中，最流行的密码是“123456”。 “password”是第二位的。 即使在注重安全的 2018 年，人们仍在选择极其糟糕的密码。 例如，密码策略要求大写字母、数字和标点符号只会导致密码为“Password1!”。

归根结底，作为应用程序设计者，你无法解决这个问题。但是，你可以做一些事情来提升密码的安全性。 一种是推卸责任，依靠第三方进行认证。 另一个是让你的登录系统对密码管理服务友好，例如 1Password、itwarden 和 LastPass。

### 第三方认证

第三方身份验证利用了这样一个事实，即互联网上几乎每个人都至少拥有一个主要服务的帐户，例如 Google、Facebook、Twitter 或 LinkedIn。 所有这些服务都提供了一种机制来通过他们的服务来验证和识别你的用户。

**提示**：第三方身份验证通常称为联合身份验证或委托身份验证。 这些术语在很大程度上可以互换，尽管联合身份验证通常与安全断言标记语言 (SAML) 和 OpenID 相关联，而委托身份验证通常与 OAuth 相关联。



第三方身份验证有其缺点。 很难相信，有些人在 Google、Facebook、Twitter 或 LinkedIn 上没有帐户。然后，在拥有此类帐户的人中，怀疑（或对隐私的渴望）可能会使 他们不愿意使用这些凭据登录你的网站。许多网站通过鼓励用户使用现有帐户来解决这个特定问题，但是那些没有这些凭据（或不愿意使用它们来访问你的服务）的人可以创建一个 你的服务的新登录。

### 在数据库中存储用户

### 身份验证与注册和用户体验

### Passport

`Passport` 是一个非常流行且强大的 Node/Express 身份验证模块。 它不依赖于任何一种身份验证机制； 相反，它基于可插入身份验证策略的思想（如果你不想使用第三方身份验证，则包括本地策略）。 了解身份验证信息流可能会让人不知所措，因此我们将从一种身份验证机制开始，稍后再添加更多。  

**提示**：正如你将在本章中看到的那样，使用 Passport 进行身份验证需要大量工作。 然而，身份验证是你应用程序的重要组成部分，我认为花一些时间来正确处理它是明智的。 [LockIt](http://bit.ly/lock_it) 等项目试图提供更“现成”的解决方案。 另一个越来越受欢迎的选项是 [Auth0](https://auth0.com)，它非常强大，但不像 LockIt 那样容易设置。然而，为了最有效地使用 LockIt 或 Auth0（或类似的解决方案），你有必要了解身份验证和授权的详细信息，这正是本章旨在做的事情。 此外，如果你需要自定义身份验证解决方案，Passport 是一个很好的起点。

#### Setting up Passport

  现在让我们安装 Passport 和 Facebook 身份验证策略：

```bash
npm install passport passport-facebook
```

### 基于角色的授权

### Adding Authentication Providers

# 19  与第三方 API 集成 

## 社交媒体

### 社交媒体插件和网站性能

### 渲染推文

Twitter 有兴趣确保其数据以符合品牌的方式使用。 为此，它确实有显示要求，即使用必须包含的功能元素来显示推文。

如果你需要显示推文，最好的办法是使用 Twitter 小部件库，即使它会产生额外的 HTTP 请求。 对于更复杂的 API 使用，你仍然需要从后端访问 REST API，因此你最终可能会结合前端脚本使用 REST API。

## Geocoding  

### Geocoding with Google 

###  Geocoding Your Data

### 显示地图

虽然在地图上显示假期确实属于“前端”工作，但如果走到这一步却看不到我们的劳动成果，那将是非常令人失望的。 因此，我们将稍微偏离本书的后端重点，看看如何在地图上显示我们新地理编码的经销商。

views/vacationsmap.handlebars  

```html
<div id="map" style="width: 100%; height: 60vh;"></div>
<script>
  let map = undefined
  async function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      // approximate geographic center of oregon
      center: { lat: 44.0978126, lng: -120.0963654 },
      // this zoom level covers most of the state
      zoom: 7,
    })
    const vacations = await fetch('/api/vacations').then(res => res.json())
    vacations.forEach(({ name, location }) => {
      const marker = new google.maps.Marker({
        position: location.coordinates,
        map,
        title: name,
      })
    })
  }
</script>
<script src="https://maps.googleapis.com/maps/api/js?key={{googleApiKey}}&callback=initMap"
    async defer></script>
```

最后这一句是JSONP调用方式，

原理就是通过添加一个`<script>`标签，向服务器请求JSON数据，这样不受同源政策限制。服务器收到请求后，将数据放在一个callback回调函数中传回来。不过只支持GET请求且不安全，可能遇到XSS攻击，不过它的好处是可以向老浏览器或不支持CORS的网站请求数据

参考：https://blog.csdn.net/Daisy_i/article/details/124806871

# 20 调试

## 使用 Node 的内置 Debugger  

Node 有一个内置的调试器，可以让你单步执行你的应用程序，就好像你正在和 JavaScript 解释器一起旅行一样。 开始调试应用程序所需要做的就是使用 `inspect` 参数：

```bash
node inspect meadowlark.js
```

命令行调试器具有更多功能，但你可能不想经常使用它。 命令行适用于很多事情，但调试不是其中之一。它在紧要关头可用（例如，如果你只有通过 SSH 访问服务器，或者如果你的服务器甚至没有安装 GUI），这很好。 更多时候，你会想要使用图形检查器客户端。

## Node Inspector Clients  



Chrome 不是检查客户端的唯一选择。 特别是，如果你使用 Visual Studio Code，它的内置调试器会非常有效。 不要使用 `--inspect` 或 `--inspect-brk` 选项启动你的应用程序，而是单击 Visual Studio Code 侧面菜单中的“调试”图标（带有一条线的错误）。 在侧边栏的顶部，你会看到一个小齿轮图标； 单击它，这将打开一些调试配置设置。 你唯一需要担心的设置是“程序”； 确保它指向你的入口点（例如 meadowlark.js）。

完成所有设置后，只需单击调试栏中的绿色播放箭头，调试器就会运行。 该界面与 Chrome 的界面略有不同，但如果你使用的是 Visual Studio Code，你可能会有宾至如归的感觉。 有关详细信息，请参阅在 Visual Studio Code 中调试。

## 调试异步函数

## 调试 Express  

# 21 上线（Going Live）

## 域名注册和托管

### Domain Name System  

域名系统 (DNS) 负责将域名映射到 IP 地址。

### Security

### 顶级域名  

### 子域

### Nameservers

如果你想将你的域直接映射到你的网站（跳过主机的名称服务器），你将添加 A 记录或 CNAME 记录。 A 记录将域名直接映射到 IP 地址，而 CNAME 将一个域名映射到另一个。 CNAME 记录通常不太灵活，因此通常首选 A 记录。  

无论你使用何种技术，域映射通常都会被积极缓存，这意味着当你更改域记录时，你的域最多可能需要 48 小时才能连接到新服务器。

如果你需要在特定时间准确上线，则不应依赖 DNS 更改。 相反，修改你的服务器以重定向到“即将推出”的站点或页面，并在实际切换之前更改 DNS。 然后，在指定的时刻，你可以将你的服务器切换到实时站点，你的访问者将立即看到更改，无论他们身在何处。

### 托管

一开始选择托管服务似乎让人不知所措。 Node 已经大放异彩，每个人都吵着要提供 Node 托管来满足需求。 如何选择托管服务提供商在很大程度上取决于你的需求。 如果你有理由相信你的网站将成为下一个 Amazon 或 Twitter，那么与你为当地集邮俱乐部建立网站时相比，你会有一系列非常不同的担忧。

#### 传统托管还是云托管？

#### XaaS

在考虑云托管时，你会遇到SaaS，PaaSs，IaaS 和 FaaS 的首字母缩写：  

- Software as a Service (SaaS)  

SaaS通常描述提供给你的软件（网站，应用程序）：你只使用它们。 一个示例是Google文档或Dropbox。

- Platform as a Service (PaaSS)  

PaaS 为你提供所有基础架构（操作系统，网络 - 都已处理）。 你要做的就是编写你的应用程序。 尽管PaaSs和IaaS之间通常有模糊的界限（并且你经常会发现自己跨越该线路作为开发人员），但这通常是我们在本书中讨论的服务模型。 如果你正在运行网站或Web服务，则可能是你想要的PaaS。

- Infrastructure as a Service (IaaS)  

IaaS为你提供最大的灵活性，但要付出代价。 你所获得的只是虚拟机和连接它们的基本网络。 然后，你负责安装和维护操作系统，数据库和网络策略。 除非你需要对环境的控制水平，否则通常需要坚持使用PAA。 （请注意，PaaS确实使你可以控制操作系统和网络配置的选择：你只是不必自己做。）

- Functions as a Service (FaaS)  

FaaS 描述了AWS Lambda，Google Functions  和 Azure Functions 等产品，这些产品提供了一种在云中运行单个 Function 的方法，而无需你自己配置运行时环境。 它是通常称为“ serverless  ”体系结构的核心。

#### 庞然大物

本质上运行互联网的公司（或至少在互联网运行中投入了大量投资）已经意识到，随着计算资源的商品化，它们还有另一种可行的产品可供出售。亚马逊，微软和Google都提供云计算服务，其服务非常好。

除了“三巨头”之外，还值得考虑的是[Heroku](https://www.heroku.com)，它一直在人们迎合人们托管快速而敏捷的节点应用程序的一段时间。 我对Digitalocean也很幸运，[Digitalocean](https://www.digitalocean.com)的重点是以非常用户友好的方式提供容器和有限数量的服务。

#### 精品店托管

### 部署

至少你应该使用SFTP或FTP（不要混淆），但是你应该真正考虑连续交付（CD）服务。

CD背后的想法是，你与可以发布的版本（几周甚至几天）永远不会远。 CD通常与连续集成（CI）相同的呼吸中，该呼吸是指为整合开发人员的工作和测试它们的自动化过程。

你应该查看一些可用于CI/CD的选项，并选择满足你需求的一种：

[Travis CI](https://travis-ci.org/)  

[CircleCI](https://circleci.com/)  

[Jenkins](https://jenkins.io/)  

Jenkins 是另一个拥有大型社区的现任人。 我的经验是，它并没有跟上现代部署实践以及这里的其他一些选择，但它确实发布了一个看起来很有希望的新版本。

#### Git 在部署中的作用

**注意**：我们已经讨论了将你的二进制资产（多媒体和文档）与你的代码存储库分开的价值。基于代码的部署为这种方法提供了另一种激励。 如果你的存储库中有4 GB的多媒体数据，则它们将永远使用克隆，并且你将为每个生产服务器提供所有数据的不必要副本。

#### 基于手动git的部署

# 22 维护

## 维护原则

### 锻炼良好的卫生

### 不要拖延

机构拖延可能是最难打击的事情之一。

### 进行例行 QA 检查

### 监视分析

### 优化性能

### 优先考虑线索跟踪

由于潜在客户跟踪对您的网站的成功至关重要，因此我建议以下五个用于收集信息的原则：

### 防止“无形”失败

## 代码重复使用和重构

Node 和Express的开发提供了解决此问题的一些好方法。Node 带来了命名空间（通过 modules）和软件包（通过 npm），并带来了中间件的概念。 借助您可以使用这些工具，开发可重复使用的代码要容易得多。

### Private npm Registry

### Middleware    

# 23 其他资源

