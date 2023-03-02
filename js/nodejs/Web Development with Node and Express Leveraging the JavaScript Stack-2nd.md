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

### 播种初始数据

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

