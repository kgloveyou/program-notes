# Full-Stack React Projects Modern web development using React 16, Node, Express, and MongoDB (Second Edition)

### MongoDB  

在为任何应用程序选择 NoSQL 数据库时，MongoDB 是首选。 它是一个面向文档的数据库，将数据存储在灵活的、类似 JSON 的文档中。这意味着字段可能因文档而异，并且数据模型可以随着时间的推移而发展，以响应不断变化的应用程序需求。

高度重视可用性和可伸缩性的应用程序受益于 MongoDB 的分布式架构特性。 它内置了对高可用性、使用分片的水平扩展以及跨地理分布的多数据中心可扩展性的支持。

MongoDB 具有表达力强的查询语言，支持即席查询、快速查找索引和实时聚合，提供访问和分析数据的强大方法，同时即使在数据量呈指数增长时也能保持性能。

## MERN 的相关性

## MERN 应用范围

### 本书开发的 MERN 应用程序

#### 社交媒体平台

#### 基于 Web 的课堂应用

#### 在线市场

#### 费用跟踪应用程序

#### 流媒体应用

#### Web VR 游戏

借助构建在 React 之上的 React 360 等框架，可以将 Web VR 和 3D 功能应用于 React 的用户界面。

## 总结

MERN 栈项目集成了 MongoDB、Express、React 和 Node 来构建 Web 应用程序。

# 2 准备开发环境

## 设置 MERN 栈技术

## 检查您的开发设置

https://github.com/PacktPublishing/Full-Stack-React-Projects-Second-Edition/tree/master/Chapter02/mern-simplesetup

### 配置 Babel、Webpack 和 Nodemon

#### 用于生产的客户端 Webpack 配置

这里的配置类似于开发模式的客户端配置，但没有热重载插件和调试配置，因为这些在生产中不需要。



有了捆绑配置，我们可以添加配置，以便在开发期间使用 Nodemon 在代码更新时自动运行这些生成的捆绑包。

#### Nodemon  

此配置将设置 nodemon 以监视开发过程中服务器文件的更改，然后根据需要执行编译和构建命令。

### 使用 Express 和 Node 的服务器

# 3 使用 MongoDB、Express 和 Node 构建后端

## 骨架应用概述

### 功能细分

### 定义后端组件

#### User model

#### API endpoints for user CRUD  

#### Auth with JSON Web Tokens  

身份验证和授权机制  

最常见且经过时间考验的选项是使用会话在客户端和服务器端存储用户状态。但更新的方法是使用 **JSON Web Token (JWT)** 作为无状态身份验证机制，不需要在服务器端存储用户状态。

##### JWT 的工作原理

<img src="Full-Stack React Projects Modern web development using React 16, Node, Express, and MongoDB (Second Edition).assets/image-20230211184155383.png" alt="image-20230211184155383" style="zoom:50%;" />

最初，当用户使用他们的凭据登录时，服务器端会生成一个使用密钥和唯一用户详细信息签名的 JWT。 然后，这个 token 被返回给请求的客户端，在本地保存在 `localStorage`、`sessionStorage` 或浏览器中的 cookie 中，实质上将维护用户状态的责任移交给客户端。

对于成功登录后发出的 HTTP 请求，尤其是对受保护且访问受限的 API 端点的请求，客户端必须将此 token 附加到请求。 更具体地说，`JSON Web Token` 必须作为 `Bearer` 包含在请求 `Authorization` 标头中：

```http
Authorization: Bearer <JSON Web Token>
```

当服务器收到对受保护 API 端点的请求时，它会检查请求的 `Authorization` 标头以获得有效的 `JWT`，然后验证签名以识别发件人并确保请求数据未损坏。 如果 token 有效，则向请求客户端授予对关联操作或资源的访问权限；否则，将返回授权错误。

在骨架应用程序中，当用户使用他们的电子邮件和密码登录时，后端将生成一个带有用户 ID 和仅在服务器上可用的密钥的签名 `JWT`。 当用户试图查看任何用户配置文件、更新其帐户详细信息或删除其用户帐户时，将需要此 token 进行验证。

实现用户模型来存储和验证用户数据，然后将其与 API 集成以使用 JWT 执行基于身份验证的 CRUD 操作，将产生一个功能独立的后端。 在本章的其余部分，我们将研究如何在 MERN 堆栈和设置中实现这一点。

## 设置骨架后端

### Preparing the server 

#### 配置 Express   

### 实现 user 模型

#### 身份验证密码

##### 将 password  字符串作为虚拟字段处理

用户提供的 `password`  字符串不会直接存储在用户文档中。相反，它被处理为 `virtual`  字段。

##### 加密和身份验证



**注意**：哈希算法为相同的输入值生成相同的哈希。但是，为了确保两个用户碰巧使用相同的密码文本，他们最终不会使用相同的哈希密码，我们在为每个用户生成哈希密码之前，将每个密码与唯一的盐值配对。这也使得难以猜测正在使用的哈希算法，因为相同的用户输入似乎正在生成不同的哈希。

这些 `UserSchema` 方法用于将用户提供的密码字符串加密为具有随机生成的 `salt`  值的 `hashed_password`。

在创建或更新时将用户详细信息保存到数据库时，`hashed_password`和 `salt` 存储在用户文档中。

##### Password 字段校验

### 添加用户 CRUD API

#### User controller

#### Creating a new user    

#### 通过 ID 加载用户以读取、更新或删除

### 集成用户身份验证和受保护的路由

#### 登入

Chapter03 and 04\mern-skeleton\server\controllers\auth.controller.js

```js
const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      "email": req.body.email
    })
    if (!user)
      return res.status('401').json({
        error: "User not found"
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (err) {

    return res.status('401').json({
      error: "Could not sign in"
    })

  }
}
```

然后，将签名的 JWT 连同用户的详细信息返回给经过身份验证的客户端。可选地，我们还可以将 token 设置为响应对象中的 cookie，这样如果 cookie 是所选的 JWT 存储形式，它就可供客户端使用。在客户端，当从服务器请求受保护的路由时，此 token 必须作为 `Authorization`   标头附加。 要注销用户，客户端可以简单地删除此 token ，具体取决于它的存储方式。 在下一节中，我们将学习如何使用 `signout`  API 端点清除包含 token 的 cookie。

#### 登出

Chapter03 and 04\mern-skeleton\server\controllers\auth.controller.js

```js
const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}
```

`signout` 函数清除包含已签名 JWT 的响应 cookie。 这是一个可选的端点，如果前端根本不使用 cookie，那么对于身份验证目的来说并不是必需的。

使用 JWT，用户状态存储是客户端的责任，除了 cookie 之外，客户端存储有多种选择。 注销时，客户端需要在客户端删除 token 以确定用户不再经过身份验证。 在服务器端，我们可以使用并验证登录时生成的 token ，以保护未经有效身份验证不应访问的路由。 在下一节中，我们将学习如何使用 JWT 实现这些受保护的路由。

### 使用 express-jwt 保护路由

为了保护对读取、更新和删除路由的访问，服务器需要检查请求客户端是否确实是经过身份验证和授权的用户。

要在访问受保护路由时检查请求用户是否已登录并具有有效的 JWT，我们将使用 `express-jwt` 模块。

#### Protecting user routes  

#### Requiring sign-in

## 检查独立后端

# 4 添加 React 前端以完成 MERN

### Style declarations

```js
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  }
}))
```

Material-UI 使用 JSS，这是一种 CSS-in-JS 样式解决方案，用于向组件添加样式。 JSS 使用 JavaScript 作为描述样式的语言。

111