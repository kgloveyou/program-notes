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

### 5.2.3 抓取查询参数

>**注意**，查询参数存在一个常见的安全漏洞（问题），很遗憾。如果你访问 `?arg=something`，那么 `req.query.arg` 将是一个字符串。但如果你访问 `?arg=something&arg=somethingelse`，那么 `req.query.arg` 将是一个数组。我们将在第8章详细讨论应对这类问题的方法。一般来说，你要确保不要盲目地假设某个东西是字符串或者数组。

## 5.5 在Express中使用HTTPS

# 6、构建API

## 6.5 设置 HTTP 状态码

401 (Unauthorized)  

403 (Forbidden)  

如果不确定该使用哪种客户端错误码，就发送 **400 Bad Request** 错误。这是一个通用的响应，适用于任何类型的无效请求。

# 7、视图和模板：Pug 和 EJS  

### 7.1.3 让所有视图引擎与 Express 兼容：Consolidate.js

## 7.2 关于 EJS 你需要知道的一切

### 7.2.1 EJS  的语法

```ejs
Hi <%= name %>!
You were born in <%= birthyear %>, so that means you’re
➥ <%= (new Date()).getFullYear() - birthyear %> years old.
<% if (career) { -%>
<%=: career | capitalize %> is a cool career!
<% } else { -%>
Haven’t started a career yet? That’s cool.
<% } -%>
Oh, let’s read your bio: <%- bio %> See you later!
```

If you pass the following context to EJS

```json
{
    name: "Tony Hawk",
    birthyear: 1968,
    career: "skateboarding",
    bio: "<b>Tony Hawk</b> is the coolest skateboarder around."
}
```

then you’ll get the following result (as of 2015, anyway):  

```json
Hi Tony Hawk!
You were born in 1968, so that means you’re 47 years old.
Skateboarding is a cool career!
Oh, let’s read your bio: Tony Hawk is the coolest skateboarder around. See
you later!
```

这个简单的示例展示了 EJS 的四个主要特性：  
1. 被执行、转义并输出的 JavaScript 代码；  
2. 被执行但不输出的 JavaScript 代码；  
3. 被执行并输出（但不对 HTML 进行转义）的 JavaScript 代码；  
4. 过滤器（Filters）。  

你可以通过两种方式输出 JavaScript 表达式的结果：  
• `<% expression %>` 会执行表达式，但不会输出结果；  

• `<%- expression %>` 会执行表达式并输出结果，同时会对可能存在的 HTML 实体进行转义。  


通常建议优先使用后者（`<%- %>`），因为它更安全。  

你还可以运行任意的 JavaScript 代码，并阻止其输出结果。这在处理循环和条件语句时非常有用（如前面的示例所示）。这种语法是 `<% expression %>`。如你所见，可以用花括号将跨多行的循环或条件语句分组。此外，还可以通过 `<% expression -%>` 避免添加多余的空行（注意末尾的连字符）。  

在输出内容后追加冒号（`:`）可以应用过滤器。过滤器会接收表达式的输出，并对其进行处理以改变最终结果。前面的示例使用了首字母大写过滤器，但还有许多其他内置过滤器，你也可以自定义过滤器（稍后会详细介绍）。  

### ejs模板语法中： <%= ... %>、<%- ... %>和<% ... %>的区别

在 EJS（Embedded JavaScript）模板引擎中，`<%= ... %>`、`<%- ... %>` 和 `<% ... %>` 是三种常用的标签语法，它们的区别如下：

---

### 1. **`<%= ... %>`**  
   - **作用**：输出转义后的内容（HTML 会被转义，防止 XSS 攻击）。  
   - **适用场景**：渲染动态文本内容（如用户输入、数据库字段等），确保安全性。  
   - **示例**：  
     ```ejs
     <p><%= userInput %></p>
     ```
     如果 `userInput` 是 `<script>alert(1)</script>`，会被转义为：  
     ```html
     <p>&lt;script&gt;alert(1)&lt;/script&gt;</p>
     ```

---

### 2. **`<%- ... %>`**  
   - **作用**：输出**原始内容**（HTML 不会被转义，直接渲染）。  
   - **适用场景**：渲染可信的 HTML 片段（如富文本编辑器内容、服务端生成的 HTML）。  
   - **风险**：如果内容来自用户输入，可能导致 XSS 漏洞。  
   - **示例**：  
     ```ejs
     <div><%- trustedHTML %></div>
     ```
     如果 `trustedHTML` 是 `<b>加粗文本</b>`，会直接渲染为：  
     ```html
     <div><b>加粗文本</b></div>
     ```

---

### 3. **`<% ... %>`**  
   - **作用**：执行 JavaScript 代码逻辑，**不输出内容**。  
   - **适用场景**：控制流程（如条件、循环、变量赋值等）。  
   - **示例**：  
     ```ejs
     <% if (isAdmin) { %>
       <button>管理员按钮</button>
     <% } %>
     ```
     或循环：  
     ```ejs
     <ul>
       <% users.forEach(user => { %>
         <li><%= user.name %></li>
       <% }) %>
     </ul>
     ```

---

### 总结对比：
| 语法         | 输出内容 | HTML 转义 | 用途                     |
| ------------ | -------- | --------- | ------------------------ |
| `<%= ... %>` | 是       | 是        | 安全输出动态文本         |
| `<%- ... %>` | 是       | 否        | 输出原始 HTML（需谨慎）  |
| `<% ... %>`  | 否       | -         | 逻辑控制（条件、循环等） |

---

### 其他 EJS 标签（补充）：
- **`<%# ... %>`**：注释，不执行、不输出。  
- **`<%_ ... _%>`**：去除前后空白（用于格式化代码）。  
- **`<%%` 或 `%%>`**：输出字面量 `<%` 或 `%>`。  

根据场景选择合适的语法，尤其是涉及用户输入时优先使用 `<%= ... %>` 确保安全。

**在你的模板中引入其他 EJS 模板**

**添加自己的过滤器**

```ejs
ejs.filters.sum = function (arr) {
    var result = 0;
    for (var i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    return result;
};
```

Now you can use it just like any other filter.

```ejs
<%=: myarray | sum %>  
```

# 8、使用 MongoDB  持久化数据

### 8.1.1 MongoDB 的工作原理

<img src="Express in Action.2016.pdf.assets/image-20250422112534288.png" alt="image-20250422112534288" style="zoom: 67%;" />

### 8.2.3 Using your model  

```js
app.use(bodyParser.urlencoded({ extended: false }));
```

将 `body-parser` 的 `extended` 选项设置为 `false` 可以使解析更简单且更安全。

详细解释
• `body-parser`：它是 Express 框架的一个中间件，用于解析 HTTP 请求的主体（body）。在处理客户端发送的包含数据的请求（如 POST、PUT 请求）时，`body-parser` 可以将请求体中的数据解析为 JavaScript 对象，方便后续在代码中使用。

• `extended` 选项：当使用 `body-parser.urlencoded()` 方法来解析 URL 编码的请求体时，可以设置 `extended` 选项。该选项决定了使用哪种方式来解析 URL 编码的数据。

◦ `extended: false`：使用 Node.js 内置的 `querystring` 模块来解析数据。这种方式解析出来的数据会被转换为简单的键值对形式，解析过程相对简单，并且由于不依赖一些复杂的第三方库，安全性相对较高。
◦ `extended: true`：使用 `qs` 库来解析数据。`qs` 库功能更强大，支持嵌套对象和数组等复杂的数据结构，但解析过程相对复杂，可能会带来一些潜在的安全风险。

## 8.3 Authenticating users with Passport  

# 9、测试Express 应用

146