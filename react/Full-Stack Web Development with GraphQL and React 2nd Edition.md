# Full-Stack Web Development with GraphQL and React 2nd Edition

# 1 准备你的开发环境

​		我们将在本书中构建的应用程序将是 Facebook 的简化版本，称为 **Graphbook**。 我们将允许我们的用户注册和登录以阅读和撰写帖子并与朋友聊天，类似于我们在普通社交网络上可以做的事情。

## 了解应用程序架构

​		GraphQL 完全与数据库无关，可以用任何编程语言实现。为了跳过实现 GraphQL 库的步骤，我们将使用 Apollo，它是 Node.js 生态系统的 GraphQL 服务器。 感谢 Apollo 背后的团队，这是非常模块化的。 Apollo 可与许多常见的 Node.js 框架一起使用，例如 Hapi、Koa 和 Express.js。

​		我们将使用 Express.js 作为我们的基础，因为它在 Node.js 和 GraphQL 社区中被广泛使用。GraphQL 可以与多个数据库系统和分布式系统一起使用，为你的所有服务提供一个简单的 API。 它允许开发人员统一现有系统并处理客户端应用程序的数据获取。

​		如何将数据库、外部系统和其他服务组合到一个服务器后端取决于你。 在本书中，我们将通过 Sequelize 使用 MySQL 服务器作为我们的数据存储。 SQL 是最知名和最常用的数据库查询语言，使用 Sequelize，我们为 Node.js 服务器提供了一个现代客户端库，用于连接我们的 SQL 服务器。

​		HTTP 是访问 GraphQL API 的标准协议。 它也适用于 Apollo 服务器。 但是，GraphQL 并不固定在一种网络协议上。 到目前为止，我们提到的一切对后端来说都是重要的。

在本书中，我们将使用 Apollo 客户端库。 它自然地与 React 和我们的 Apollo 服务器集成。

如果我们把所有这些放在一起，结果就是由 Node.js、Express.js、Apollo、SQL、Sequelize 和 React 组成的主堆栈。

### 基本设置

## Setting up React  

### CSS with webpack  

```js
{
    test: /\.css$/,
        use: ['style-loader', 'css-loader']
}
```

`style-loader` injects your bundled CSS right into the DOM. `css-loader` will resolve all `import` or `url` occurrences in your CSS code.  

style-loader 将捆绑的 CSS 直接注入到 DOM 中。css-loader 将解析你的 CSS 代码中出现的所有 import 或 url。

### 使用 React 进行事件处理和状态更新

我们需要运行 `event.preventDefault` 来阻止我们的浏览器实际尝试提交表单并重新加载页面。 大多数来自 jQuery 或其他 JavaScript 框架的人都知道这一点。

### 使用 React Helmet 控制文档头

```jsx
import { Helmet } from 'react-helmet';

return (
    <div className="container">
        <Helmet>
            <title>Graphbook - Feed</title>
            <meta name="description" content="Newsfeed of all your friends on Graphbook" />
        </Helmet>
```

### 使用 webpack 进行生产构建

生产包确实合并了所有 JavaScript 文件，但它也将所有 CSS 文件合并到两个单独的文件中。 这些可以直接在浏览器中使用。 为了打包 CSS 文件，我们将依赖另一个名为 MiniCss 的 webpack 插件：

## 有用的开发工具

React Developer Tools  

# 2、使用 Express.js 设置 GraphQL

Setting Up GraphQL with Express.js

## Node.js 和 Express.js 入门

### 设置 Express.js

```js
import express from 'express';
```

我们可以在这里使用 import，因为我们的后端被 Babel 转译了。

### 在开发中运行 Express.js

```js
"server": "nodemon --exec babel-node --watch src/server src/server/index.js",
```

首先，我们必须安装 @babel/node 包，因为我们使用 --exec babel-node 选项使用 Babel 转换后端代码。 这允许我们使用 import 语句：

```bash
npm install --save-dev @babel/node
```

## Express.js 中的路由

### Serving our production build  

```js
import path from 'path';

const root = path.join(__dirname, '../../');

app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));
app.get('/', (req, res) => {
  res.sendFile(path.join(root, '/dist/client/index.html'));
});
```

我们使用全局 `__dirname` 变量来获取我们项目的根目录。 该变量保存当前文件的路径。 将 `path.join` 与 `../../` 和 `__dirname` 一起使用为我们提供了项目的真正根目录。

Express.js 提供了 `use` 函数，当给定的路径匹配时运行一系列命令。 在没有路径的情况下执行此函数时，它会针对每个请求执行。

我们使用此函数通过 `express.static` 提供我们的静态文件（头像图像）。它们包括 `bundle.js` 和 `bundle.css`，它们由 `npm run client:build` 创建。

## 使用 Express.js 中间件

每个中间件函数都会收到一个request  、一个response  和`next`  。它需要运行 `next` 以将控制权传递给下一个处理函数。 否则，你将收到超时。中间件允许我们对请求或响应对象进行预处理或后处理，执行自定义代码等等。

Express.js 可以有多个路由用于相同的路径和 HTTP 方法。 中间件可以决定应该执行哪个函数。

### 安装重要的中间件

### Express Helmet  

Helmet 是一个工具，它允许你设置各种 HTTP 标头以保护你的应用程序。

```js
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
```

我们一次在这里做很多事情。 在前面的代码中，我们添加了一些跨站脚本 (XSS) 保护策略，并删除了 X-Powered-By HTTP 标头，以及其他一些有用的东西，只需使用第一行中的helmet() 函数即可。

此外，为了确保没有人可以注入恶意代码，我们使用了 Content-Security-Policy HTTP 标头或简称 CSP。 此标头可防止攻击者从外部 URL 加载资源。

最后一项增强是设置 Referrer HTTP 标头，但仅限于在同一主机上发出请求时。 例如，当我们从域 A 转到域 B 时，我们不包括Referrer  ，即用户来自的 URL。 此增强功能可阻止任何内部路由或请求暴露于 Internet。

### 使用 Express.js 进行压缩

```js
import compress from 'compression';

app.use(compress());
```

**注意：**

每当你有这样的中间件或匹配相同路径的多个路由时，你都需要检查初始化顺序。 除非你运行`next`  命令，否则只会执行第一个匹配的路由。 之后定义的所有路由都不会被执行。

### Express.js 中的 CORS

我们希望我们的 GraphQL API 可以从任何网站、应用程序或系统访问。 一个好主意可能是构建一个应用程序或将 API 提供给其他公司或开发人员，以便他们可以使用它。 当你通过 Ajax 使用 API 时，主要问题是 API 需要发送正确的 `Access-Control-Allow-Origin` 标头。

通过将以下命令添加到 index.js 文件，允许**cross-origin resource sharing (CORS)**  请求：

```js
app.use(cors());
```

这个命令一次处理了我们通常在跨域请求中遇到的所有问题。 它只是在 Access-Control-Allow-Origin 中设置一个带有 * 的通配符，允许任何地方的任何人使用你的 API，至少在第一个实例中是这样。 你始终可以通过提供 API 密钥或仅允许登录用户访问来保护你的 API。
启用 CORS 仅允许请求站点接收响应。

此外，该命令还实现了整个应用程序的 `OPTIONS` 路由。

每次我们使用 CORS 时都会发出 OPTIONS 方法或请求。 此操作称为预检**preflight**  请求，可确保响应服务器信任你。 如果服务器没有正确响应 OPTIONS 预检，则浏览器根本不会执行 POST 等实际方法。

## 将 Express.js 与 Apollo 相结合

GraphQL schema  是 API 的表示——即即客户端可以请求或运行的数据和函数。
Resolver  函数是schema的实现。 两者都需要匹配。 你不能返回字段或运行不在schema内的mutation  ：

```js
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import Resolvers from './resolvers';
import Schema from './schema';

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
});
const server = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => req
});

export default server;
```

### 编写你的第一个 GraphQL schemas  

Mutations  类似于 REST API 的 POST、UPDATE、PATCH 和 DELETE 请求。

### 实现 GraphQL 解析器（resolvers  ）

现在模式已经准备好了，我们需要匹配的解析器函数。

此外，GraphQL 检查每个属性的数据类型。 如果 id 定义为 Int，则无法返回常规 MongoDB id，因为这些 ID 属于 String 类型。GraphQL 也会抛出错误。

### 发送 GraphQL 查询

我们可以使用任何 HTTP 客户端（例如 Postman、Insomnia 或任何你习惯使用的客户端）来测试此查询。 下一节将介绍 HTTP 客户端。 如果你想自己发送以下查询，则可以阅读下一部分并返回此处。

### 在 GraphQL 模式中使用多种类型

### 编写你的第一个 GraphQL mutation  

```js
  input PostInput {
    text: String!
  }

  input UserInput {
    username: String!
    avatar: String!
  }

  type RootMutation {
    addPost (
      post: PostInput!
      user: UserInput!
    ): Post
  }
```

schema中的感叹号告诉 GraphQL 该字段是必需参数。



```json
{
    "operationName": null,
    "query": "mutation addPost($post : PostInput!,$user: UserInput!) {addPost(post : $post, user: $user) {id text user { username avatar}}}",
    "variables": {
        "post": {
            "text": "You just added a post."
        },
        "user": {
            "avatar": "/uploads/avatar3.png",
            "username": "Fake User"
        }
    }
}
```



## 后端调试和日志记录

### Logging in Node.js  

Node.js 最流行的日志记录包称为 `winston`。

### 使用 Postman 进行调试

Postman中测试GraphQL 的方法：

**QUERY（左边）**

```ql
mutation addPost($post : PostInput!,$user: UserInput!) {addPost(post : $post, user: $user) {id text user { username avatar}}}
```

**GRAPHQL VARIABLES（右边）**

```json
{
            "post": {
            "text": "You just added a post."
        },
        "user": {
            "avatar": "/uploads/avatar3.png",
            "username": "Fake User"
        }
}
```

Postman 还有其他很棒的功能，例如自动化测试、监控和模拟假服务器。

在本书后面，为所有请求配置 Postman 会变得更加复杂。在这种情况下，我喜欢使用 Apollo Client Developer Tools，它完美地集成到前端并利用 Chrome DevTools。 Apollo 客户端开发工具的优点在于它们使用了我们在前端代码中配置的 Apollo 客户端，这意味着它们可以重用我们在前端中构建的身份验证。

## 概括

# 3、连接到数据库

我们希望我们的后端使用 Sequelize 将数据持久化到我们的 SQL 数据库中。为此，我们必须为我们的 GraphQL 实体实现数据库模型。

## 在 GraphQL 中使用数据库

GraphQL 是一种用于发送和接收数据的协议。 Apollo 是可用于实现该协议的众多库之一。 GraphQL（在其规范中）和 Apollo 都不是直接在数据层上工作的。 你放入响应中的数据来自哪里，以及你随请求发送的数据保存在哪里，由开发人员决定。

MongoDB 等数据库系统的一般替代方案是具有经过验证的稳定性和全局使用的典型 MySQL 服务器。 我经常遇到的一个案例涉及依赖于需要升级的旧代码库和数据库的系统和应用程序。实现这一点的一个好方法是使用 GraphQL 获得一个分层的 API 级别。在这种情况下，GraphQL 服务器接收所有请求，你可以一一替换 GraphQL 服务器所依赖的现有代码库。 在这些情况下，GraphQL 与数据库无关是很有帮助的。

### 安装 MySQL 进行开发

### 在 MySQL 中创建数据库

## 将 Sequelize 集成到我们的 Node.js 栈中

Sequelize 是 Node.js 的 ORM。 它支持 PostgreSQL、MySQL、SQLite 和 MSSQL 标准。

```bash
npm install --save sequelize mysql2
```

`mysql2` 包允许 Sequelize 与我们的 MySQL 服务器对话。

Sequelize 只是针对不同数据库系统的各种库的包装器。它提供了用于直观模型使用的强大功能，以及用于创建和更新数据库结构以及插入开发数据的功能。

### 使用 Sequelize 连接到数据库

### 将配置文件与 Sequelize 一起使用

## 编写数据库模型

Sequelize 允许我们为每个 GraphQL 实体创建一个数据库schema  。

### 你的第一个数据库模型

我们将使用 Sequelize CLI 生成我们的第一个数据库模型。 使用以下命令全局安装它：

```bash
npm install -g sequelize-cli  
```

这使你能够在终端中运行 sequelize 命令。
Sequelize CLI 允许我们自动生成模型。 这可以通过运行以下命令来完成：

```bash
sequelize model:generate --models-path src/server/models
--migrations-path src/server/migrations --name Post
--attributes text:text
```

### 你的第一个数据库迁移（migration  ）

需要创建我们的数据库表和列，这就是创建迁移文件的原因。

迁移文件具有多个优点，例如：

1. 迁移使我们能够通过我们的常规版本控制系统（例如 Git 或 SVN）跟踪数据库更改。 对我们数据库结构的每一次更改都应该包含在迁移文件中
2. 迁移文件使我们能够编写更新，为我们的应用程序的新版本自动应用数据库更改。

迁移有两个属性，如下所示：

- `up` 属性说明了在运行迁移时应该做什么。

- `down` 属性说明撤消迁移时运行的内容。

要执行此迁移，我们将再次使用 Sequelize CLI，如下所示：

```bash
sequelize db:migrate --migrations-path src/server/migrations
--config src/server/config/index.js
```

在这里，你将找到名为`posts`  的新表。 这该表的结构应如下所示：

此外，还创建了两个附加字段——`createdAt` 和 `updatedAt`。 这两个字段告诉我们何时创建或更新行。 这些字段是由 Sequelize 自动创建的。 如果你不希望这样做，可以将模型中的`timestamps`  属性设置为 `false`。

每次使用 Sequelize 及其迁移功能时，都会有一个名为 `sequelizemeta` 的附加表。 该表的内容应如下所示：

Sequelize 保存已执行的每个迁移。 如果我们在开发或新的发布周期中添加更多字段，我们可以编写一个迁移，为我们运行所有表更改语句作为更新。 Sequelize 会跳过保存在meta  表中的所有迁移。

### 使用 Sequelize 导入模型

## 使用 Sequelize 生成数据

我们应该用我们的假数据填充空的 Posts 表。 为此，我们将使用 Sequelize 的功能将数据播种到我们的数据库中。

现在，我们可以运行下一个 Sequelize CLI 命令来生成模板文件：

```bash
sequelize seed:generate --name fake-posts --seeders-path src/server/seeders
```

使用以下命令执行`seeders`  夹中的所有seeds  ：

```bash
sequelize db:seed:all --seeders-path src/server/seeders
--config src/server/config/index.js
```

## 将 Sequelize 与 GraphQL 一起使用

### 全局数据库实例

### 运行第一个数据库查询

## Sequelize 中的一对一关系

