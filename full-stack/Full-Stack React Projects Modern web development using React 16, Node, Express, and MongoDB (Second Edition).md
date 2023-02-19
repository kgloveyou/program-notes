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

## 检查你的开发设置

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

## 集成后端 API

Fetch API 是一个较新的标准，它使网络请求类似于 XMLHttpRequest (XHR)，但使用 promises 代替，从而实现更简单、更清晰的 API。

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## 在前端添加授权

正如我们在上一章中讨论的那样，使用 JWT 实现身份验证会将管理和存储用户身份验证状态的责任交给客户端。为此，我们需要编写代码，允许客户端存储在成功登录时从服务器接收到的 JWT，在访问受保护的路由时使其可用，在用户注销时删除或使 token 无效， 并且还根据用户身份验证状态限制对前端视图和组件的访问。

### 管理授权状态

在我们的 MERN 应用程序中，我们将使用浏览器的 `sessionsStorage` 作为存储选项来存储 JWT 身份验证凭证。

**提示**：或者，你可以使用 `localStorage` 而不是 `sessionStorage` 来存储 JWT 凭据。 使用 `sessionStorage`，用户身份验证状态只会在当前窗口选项卡中被记住。 使用 `localStorage`，用户身份验证状态将在浏览器的各个选项卡中被记住。

### PrivateRoute 组件

它将允许我们为前端声明受保护的路由，以限制基于用户身份验证的视图访问。

Chapter03 and 04\mern-skeleton\client\auth\PrivateRoute.js

```js
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute
```

## 完成 User 前端

### Users  组件

```js
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  }, [])
```

在这个 effect  中，我们还添加了一个 cleanup  函数，以在组件卸载时中止获取调用。 为了将 signal  与 fetch 调用相关联，我们使用 AbortController Web API，它允许我们根据需要中止 DOM 请求。

对应的 list 函数定义：

```js
const list = async (signal) => {
  try {
    let response = await fetch('/api/users/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API

要中止未完成的 `fetch()`，甚至 `XMLHttpRequest` 操作，请使用 [`AbortController`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 和 [`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal) 接口。



上述代码中的 signal 即为 [`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal) 接口，参见：https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal



### Profile  组件

读取用户信息

```js
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])
```

注意，`cleanup` 函数，在组件卸载时，终止正在进行的请求。



框架前端现已完成，并具有允许用户在考虑身份验证和授权限制的同时在后端注册、查看和修改用户数据的所有必要组件。 但是还是不能直接在浏览器地址栏访问前端路由； 这些只有在从前端视图中链接时才能访问。 要在框架应用程序中启用此功能，我们需要实现基本的服务器端渲染。

## 实现基本的服务器端渲染

目前，当直接在浏览器地址栏输入 React Router 路由或路径名或刷新不在根路径的视图时，该 URL 不起作用。 发生这种情况是因为服务器无法识别我们在前端定义的 React Router 路由。 我们必须在后端实现基本的服务器端渲染，以便服务器能够在收到对前端路由的请求时做出响应。

### 服务器端渲染模块

### 生成 CSS 和 markup

### 发送带有 markup 和 CSS 的模板

生成 markup 后，我们需要检查组件中是否渲染了要在 markup 中发送的重定向。 如果没有重定向，那么我们使用 sheets.toString 从sheets  中获取 CSS 字符串，并且在响应中，我们将带有 markup 和 CSS 注入的模板发回，如以下代码所示。

### 更新 App.js

一旦在服务器端渲染的代码到达浏览器并且前端脚本接管，我们需要在加载根 React 组件时使用 `useEffect`  hook 删除服务器端注入的 CSS。

```js
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])
```

### Hydrate instead of render  

```js
import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

hydrate(<App/>, document.getElementById('root'))
```

`hydrate` 函数 hydrates  一个容器，该容器已经具有由 `ReactDOMServer` 渲染的 HTML 内容。 这意味着当 React 在浏览器中接管时，服务器呈现的标记将被保留并且仅附加事件处理程序，从而使初始加载性能更好。

通过实现基本的服务器端渲染，服务器现在可以正确处理从浏览器地址栏到前端路由的直接请求，从而可以为 React 前端视图添加书签。

# 5 将模板发展成社交媒体应用程序

## 介绍 MERN Social  

## 上传个人资料照片

考虑到不同的文件存储选项，有多种方法可以实现此上传功能：

- **服务器文件系统**：将文件上传并保存到服务器文件系统，并将 URL 存储在 MongoDB 中。
- **外部文件存储**：将文件保存到Amazon S3等外部存储，并将URL存储在MongoDB中。
- **在 MongoDB 中存储为数据**：将体积较小（小于16MB）的文件作为Buffer类型的数据保存到MongoDB中。

对于 MERN Social，我们将假设用户上传的照片文件体积较小，并演示如何将这些文件存储在 MongoDB 中以用于个人资料照片上传功能。在第 8 章，扩展订单和支付市场，我们将讨论如何使用 GridFS 在 MongoDB 中存储更大的文件。

### 更新用户模型以将照片存储在 MongoDB 中

### 从编辑表单上传照片

### Form submission with the file attached  

```js
  const clickSubmit = () => {
    let userData = new FormData()
    values.name && userData.append('name', values.name)
    values.email && userData.append('email', values.email)
    values.passoword && userData.append('passoword', values.passoword)
    values.about && userData.append('about', values.about)
    values.photo && userData.append('photo', values.photo)
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, userData).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, 'redirectToProfile': true})
      }
    })
  }
```

由于发送到服务器的数据的内容类型不再是 `'application/json'`，我们还需要修改 `api-user.js` 中的 `update` fetch 方法，以从 fetch 调用的标头中删除 `Content-Type`，如此处所示。

### 处理包含文件上传的请求

在服务器上，为了处理对现在可能包含文件的更新 API 的请求，我们将使用 `formidable`  Node 模块。

### 检索个人资料照片  

检索存储在数据库中的图像然后在视图中显示它的最简单的选择是设置一个路由，该路由将获取数据并将其作为图像文件返回给请求的客户端。 在本节中，我们将学习如何设置此路由以公开照片 URL，以及如何使用此 URL 在前端视图中显示照片。

#### 个人资料照片 URL

#### 在视图中显示照片

mern-social/client/user/Profile.js: 

```js
    const photoUrl = values.user._id
              ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
              : '/api/users/defaultphoto'
```

为了确保 `img` 元素在照片更新后重新加载到 `Profile` 视图中，我们必须向照片 URL 添加一个时间值以绕过浏览器的默认图像缓存行为。

## 在 MERN Social 中关注用户

### 关注和取消关注

#### 更新用户模型

#### 更新 userByID 控制器方法

#### 添加 API 以关注和取消关注

#### 在视图中访问关注和取消关注 API

## 在 MERN Social 上发帖

### 在视图中获取创建帖子 API

此方法与用户 `edit`  fetch 方法一样，将使用包含文本字段和图像文件的 FormData 对象发送多部分表单提交。

### 制作 NewPost 组件

mern-social/client/post/NewPost.js:  

```js
  const clickPost = () => {
    let postData = new FormData()
    postData.append('text', values.text)
    postData.append('photo', values.photo)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, postData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, text:'', photo: ''})
        props.addUpdate(data)
      }
    })
  }
  
  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
  }  
```

# 6 构建基于 Web 的课堂应用程序

## 介绍 MERN 课堂

# 7 通过在线市场锻炼 MERN 技能



# 9 为市场添加实时竞价功能

## 使用 Socket.IO 实现实时竞价

### 集成 Socket.IO

Socket.IO 是一个 JavaScript 库，具有在浏览器中运行的客户端模块和与 Node.js 集成的服务器端模块。将这些模块与我们基于 MERN 的应用程序集成将实现客户端和服务器之间的双向和实时通信。

**提示**：Socket.IO 的客户端部分可作为 Node 模块 `socket.io-client` 使用，而服务器端部分可作为 Node 模块 `socket.io` 使用。 你可以在 https://socket.io 上了解有关 Socket.IO 的更多信息并尝试他们的入门教程。

### 出价

为了允许用户出价，在接下来的部分中，我们将添加一个表单，让他们输入一个比上次出价更高的值，并使用 socket 通信将其提交给服务器。 然后，在服务器上，我们将处理通过 socket 发送的新出价，以便可以将更改后的拍卖出价保存在数据库中，并且当服务器接受此出价时，可以立即为所有连接的用户更新视图。

### 在服务器上接收竞价

### 显示变化的竞价历史

# 10 将数据可视化与费用跟踪应用程序集成

# 11 构建流媒体应用程序

在本章中，我们将扩展 MERN 骨架应用程序以构建媒体流应用程序，同时演示如何利用 MongoDB GridFS 并将媒体流功能添加到您的 Web 应用程序。

## 上传和存储媒体

### 使用MongoDB GridFS存储大文件

在前面的章节中，我们讨论了如何将用户上传的文件作为二进制数据直接存储在MongoDB中；但这只适用于小于 16 MB 的文件。 为了在 MongoDB 中存储更大的文件，例如这个流媒体应用程序所需的视频文件，我们将需要使用 GridFS。

GridFS 是 MongoDB 中的一个规范，它允许我们通过将给定文件分成几个块来将大文件存储在 MongoDB 中。 每个块的最大大小为 255 KB，并存储为单独的文档。 当必须检索文件以响应对 GridFS 的查询时，将根据需要重新组合块。 这打开了根据需要仅获取和加载文件部分的选项，而不是检索整个文件。

在为 MERN Mediastream 应用程序存储和检索视频文件的情况下，我们将利用 GridFS 来存储视频文件和流式传输部分视频，具体取决于用户跳到并开始播放的部分。

**提示**：您可以在中了解有关 GridFS 规范及其功能的更多信息。官方 MongoDB 文档位于 https://docs.mongodb.com/manual/core/gridfs/。

要从我们的后端代码访问和使用 MongoDB GridFS，我们将使用 Node.js MongoDB 驱动程序的流 API，方法是创建一个具有已建立的数据库连接的 `GridFSBucket`。

### 创建一个新的媒体帖子

```js
import Media from '../models/media.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

//media streaming
import mongoose from 'mongoose'
let gridfs = null
mongoose.connection.on('connected', () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db)
})

const create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Video could not be uploaded"
        })
      }
      let media = new Media(fields)
      media.postedBy= req.profile
      if(files.video){
        let writestream = gridfs.openUploadStream(media._id, {
          contentType: files.video.type || 'binary/octet-stream'})
        fs.createReadStream(files.video.path).pipe(writestream)
      }
      try {
        let result = await media.save()
        res.status(200).json(result)
      }
      catch (err){
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
      }
    })
}
```

如果请求中有文件，`formidable` 会将其临时存储在文件系统中。我们将使用此临时文件和媒体对象的 ID 通过 `gridfs.openUploadStream` 创建一个可写流。 在这里，临时文件会被读取然后写入到`MongoDB GridFS`中，同时将 `filename`  值设置为媒体ID。这将在MongoDB中生成关联的块和文件信息文档，当需要检索这个文件时，我们将用媒体 ID 识别它。

#### NewMedia 组件

```jsx
          <input accept="video/*" onChange={handleChange('video')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button color="secondary" variant="contained" component="span">
              Upload
              <FileUpload/>
            </Button>
          </label> <span className={classes.filename}>{values.video ? values.video.name : ''}</span><br/>
```

在文件 `input` 元素中，我们指定它接受视频文件，因此当用户单击“上传”并浏览其本地文件夹时，他们只能选择上传视频文件。

```js
  const clickSubmit = () => {
    let mediaData = new FormData()
    values.title && mediaData.append('title', values.title)
    values.video && mediaData.append('video', values.video)
    values.description && mediaData.append('description', values.description)
    values.genre && mediaData.append('genre', values.genre)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, mediaData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', mediaId: data._id, redirect: true})
      }
    })
  }
```

## Retrieving and streaming media

实现此功能需要将存储在 MongoDB GridFS 中的视频文件流式传输到发出请求的客户端，并在媒体播放器中渲染流。

mern-mediastream/server/controllers/media.controller.js:  

```js
const video = (req, res) => {
  const range = req.headers["range"]
  if (range && typeof range === "string") {
    const parts = range.replace(/bytes=/, "").split("-")
    const partialstart = parts[0]
    const partialend = parts[1]

    const start = parseInt(partialstart, 10)
    const end = partialend ? parseInt(partialend, 10) : req.file.length - 1
    const chunksize = (end - start) + 1

    res.writeHead(206, {
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Range': 'bytes ' + start + '-' + end + '/' + req.file.length,
        'Content-Type': req.file.contentType
    })

    let downloadStream = gridfs.openDownloadStream(req.file._id, {start, end: end+1})
    downloadStream.pipe(res)
    downloadStream.on('error', () => {
      res.sendStatus(404)
    })
    downloadStream.on('end', () => {
      res.end()
    })
  } else {
      res.header('Content-Length', req.file.length)
      res.header('Content-Type', req.file.contentType)

      let downloadStream = gridfs.openDownloadStream(req.file._id)
      downloadStream.pipe(res)
      downloadStream.on('error', () => {
        res.sendStatus(404)
      })
      downloadStream.on('end', () => {
        res.end()
      })
  }
}
```

在前面的代码中，如果请求不包含 range  标头，我们使用 `gridfs.openDownloadStream` 流回整个视频文件，这为我们提供了存储在 GridFS 中的相应文件的可读流。 这是通过管道发送回客户端的响应。 在响应标头中，我们设置文件的内容类型和总长度。

如果请求包含 range  标头——例如，当用户拖动到视频的中间并从该点开始播放时——我们需要将接收到的 range  标头转换为开始和结束位置，这将与存储的正确块相对应 在GridFS中，如下代码所示。

### 使用 React 媒体播放器渲染视频

React 风格的媒体播放器的一个不错选择是 `ReactPlayer` 组件，它可以作为 node 模块使用，可以根据需要进行自定义。

```bash
yarn add react-player
```

## Listing media  

### 列出流行媒体

# 12 定制化媒体播放器和改进 SEO

## 将自定义媒体播放器添加到 MERN Mediastream

在这个结构中，为了渲染每个媒体项的视频快照，我们将使用一个没有控件的基本 `ReactPlayer`，如下所示：

```jsx
<Link to={"/media/"+item._id}>
    <ReactPlayer url={'/api/media/video/'+item._id} width='160px' height='140px'/>
</Link>
```

### Fullscreen （*）

为了实现视频的全屏选项，我们将使用 `screenfull` Node模块，用于跟踪视图何时处于全屏状态，和来自 `react-dom` 的 `findDOMNode` 来指定哪个文档对象模型 (DOM) 元素将使用 `screenfull`  显示为全屏。  

```bash
yarn add screenfull
```



为了显示时间，我们可以使用带有 `datetime`  值的 HTML `time` 元素，并将其添加到 `MediaPlayer` 的视图代码中，如下所示：

mern-mediastream/client/media/MediaPlayer.js  

```jsx
<span style={{float: 'right', padding: '10px', color: '#b83423'}}>
    <time dateTime={`P${Math.round(duration * values.played)}S`}>
        {format(duration * values.played)}
    </time> / 
    <time dateTime={`P${Math.round(duration)}S`}>
    	{format(duration)}
    </time>
</span>
```

## 使用数据进行服务器端渲染

SEO 对于向用户提供内容并希望使内容易于查找的任何 Web 应用程序都很重要。 通常，如果内容易于搜索引擎读取，则任何网页上的内容将更有可能吸引更多的浏览者。 当搜索引擎机器人访问 Web URL 时，它将获得 SSR 输出。因此，要使内容可被发现，内容应该是 SSR 输出的一部分。

在 MERN Mediastream 中，我们将使用使媒体详细信息在搜索引擎结果中流行的案例，来演示如何将数据注入基于 MERN 的应用程序中的 SSR 视图。 我们将专注于通过为“`/media/:mediaId`”路径返回的 `PlayMedia` 组件注入数据来实现 SSR。 此处概述的一般实施步骤可用于使用其他视图的数据实施 SSR。

我们将首先定义一个静态路由配置文件，并使用它来更新后端现有的 SSR 代码，以从数据库中注入必要的媒体数据。 然后，我们将更新前端代码以在视图中渲染这个服务器注入的数据，最后，检查这个 SSR 实现是否按预期工作。

### 添加路由配置文件

```bash
yarn add react-router-config  
```

接下来，我们将创建一个路由配置文件，该文件将列出前端 React Router 路由。 此配置将在服务器上用于将这些路由与传入请求 URL 进行匹配，以检查是否必须在服务器返回渲染的标记以响应此请求之前注入数据。

mern-mediastream/client/routeConfig.js  

```js
import PlayMedia from './media/PlayMedia'
import { read } from './media/api-media.js'

const routes = [
  {
    path: '/media/:mediaId',
    component: PlayMedia,
    loadData: (params) => read(params)
  }

]
export default routes
```

### 更新 Express 服务器的 SSR 代码

#### 使用 route configuration 来加载数据

当服务器收到任何请求时，我们将使用路由配置文件中定义的路由来寻找匹配的路由。 如果找到匹配项，我们将使用在配置中为此路由声明的相应 `loadData` 方法来检索必要的数据，然后将其注入代表 React 前端的服务器渲染标记（markup）中。 我们将在名为 `loadBranchData` 的方法中执行这些路由匹配和数据加载操作，该方法定义如下：

#### Isomorphic-fetch

我们将确保我们为客户端代码定义的任何 fetch 方法也可以通过使用 `isomorphic-fetch`   node 模块在服务器上使用。  

##### Absolute URLs

使用 `isomorphic-fetch` 的一个问题是它目前要求获取 URL 是绝对的。  

#### 将数据注入 React 应用程序

### 将服务器注入的数据应用到客户端代码

### 在 PlayMedia 中渲染接收到的数据

### 用数据检验SSR的执行情况

我们可以通过在浏览器中打开应用程序 URL 并关闭 JavaScript 来验证带有数据的 SSR 的实现是否正常工作。

#### 在 Chrome 中测试

# 13 开发基于 Web 的 VR 游戏

## 开始使用 React 360

React 360 使使用与 React 相同的声明式和基于组件的方法构建 VR 体验成为可能。 React 360 的底层技术利用 Three.js JavaScript 3D 引擎在任何兼容的 Web 浏览器中使用 WebGL 渲染 3D 图形，还为我们提供了使用 Web VR API 访问 VR （具备麦克风的）头戴式耳机的权限。

### 设置 React 360 项目

558