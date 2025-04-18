代码：https://github.com/EvanHahn/Express.js-in-Action-code/

### 3.4.5 第3方中间件库

#### MORGAN: LOGGING MIDDLEWARE  

#### EXPRESS’S STATIC MIDDLEWARE  

```js
var express = require("express");
var path = require("path");
var http = require("http");

var app = express();

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Looks like you didn't find a static file.");
});

http.createServer(app).listen(3000);
```

现在，public  目录中的任何文件都可以被访问。你可以在其中放置任何你想要的内容，服务器会将其发送出去。如果在public 文件夹中不存在匹配的文件，它将继续执行下一个中间件，并显示“Looks like you didn't find a static file.”。如果找到了匹配的文件，`express.static` 会将其发送出去，并终止中间件链。

下面是deepseek对代码的解释。

```javascript
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
```
- `path.resolve(__dirname, "public")`: 解析出一个绝对路径，指向程序所在目录下的 "public" 文件夹
- `express.static()`: Express 的中间件，用于提供静态文件服务
- `app.use()`: 将静态文件中间件应用到整个应用
- 这一配置意味着：所有请求会先在 "public" 目录中查找匹配的文件，如果找到就返回该文件

```javascript
app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Looks like you didn't find a static file.");
});
```
- 这是一个捕获所有路由的中间件
- 当请求没有匹配到任何静态文件时（即在 public 目录中找不到对应文件），会执行这个处理器
- 它返回状态码 200 和纯文本内容


#### FINDING MORE MIDDLEWARE  

connect-ratelimit ——让你将连接到每小时一定数量的请求进行节流。如果有人向你的服务器发送大量请求，你可以开始向他们返回错误，以阻止他们使你的网站瘫痪。

Helmet——帮助你添加 HTTP 头信息，使你的应用程序能更好地防范某些类型的攻击。我们将在后面的章节中对其进行探讨。（我是 Helmet 的贡献者，所以我强烈推荐使用它！）

cookie-parser —— 解析浏览器 Cookie。

response-time  —— 发送 `X-Response-Time` 头部，以便你对应用程序的性能进行调试。

## 3.2 路由

## 3.3 Extending request and response  

# 4、中间件

### 4.2.2 

> **厌倦了反复重启服务器？**

> 到目前为止，当你修改代码后，必须先停止服务器，然后再重新启动它。

> 这可能会变得很繁琐！为了解决这个问题，你可以安装一个名为 nodemon 的工具，它会监视你所有的文件是否有更改，并在检测到更改时自动重启服务器。

> 你可以通过运行以下命令全局安装 nodemon：

```bash
npm install nodemon --global
```

> 安装完成后，你可以在命令中将 `node` 替换为 `nodemon` 来以监视模式启动文件。例如，如果你之前输入的是 `node app.js`，现在只需将其更改为 `nodemon app.js`，这样当你的应用程序代码发生变化时，它会自动重新加载。

## 4.3 错误处理中间件



# 5、路由

## 5.2 The features of routing  

### 5.2.1 Grabbing parameters to routes  

### 5.2.2  使用正则表达式匹配路由

72