# DJI

## 公司产品

### 大疆司空 2

https://enterprise.dji.com/cn/flighthub-2?site=enterprise&from=nav

### 大疆智图

https://enterprise.dji.com/cn/dji-terra?site=enterprise&from=solutions

## 技术

### web安全

#### 1、跨站脚本攻击（XSS）

跨站脚本攻击（Cross-Site Scripting，XSS）是一种常见的网络安全漏洞，攻击者利用这种漏洞向网页中插入恶意脚本，使得用户在浏览网页时执行恶意脚本，从而达到盗取用户信息、会话劫持等恶意目的。

XSS 攻击主要分为三种类型：

1. **存储型 XSS**：恶意脚本被存储在服务器上的数据库或文件中，当用户访问包含这些恶意脚本的页面时，脚本会被执行。

2. **反射型 XSS**：恶意脚本通过URL参数传递给服务器，服务器在返回响应时将恶意脚本反射给客户端执行。

3. **DOM 型 XSS**：恶意脚本在客户端执行，通过修改页面的 DOM 结构来触发漏洞。

防御 XSS 攻击的方法包括：

1. **输入验证**：对用户输入的数据进行验证和过滤，确保输入的内容符合预期的格式和规范，防止恶意脚本被插入。

2. **输出编码**：在将用户输入的数据输出到 HTML、JavaScript、CSS 等上下文时，对特殊字符进行编码，如将 `<` 编码为 `&lt;`、`>` 编码为 `&gt;` 等，以防止恶意脚本被解析执行。

3. **CSP（Content Security Policy）**：通过设置 CSP，限制页面加载资源的来源，阻止执行内联脚本和未经授权的外部脚本，从而减少 XSS 攻击的风险。

4. **使用 HttpOnly 标记**：将 cookie 标记为 HttpOnly，防止 JavaScript 通过 document.cookie 访问 cookie，减少会话劫持的风险。

5. **设置 X-XSS-Protection 头**：通过设置 HTTP 响应头 X-XSS-Protection，启用浏览器内置的 XSS 过滤器，减少 XSS 攻击的可能性。

6. **安全开发实践**：编写安全的前端和后端代码，包括严格限制用户输入、避免使用 eval() 函数、不信任的数据不要直接执行等，提高应用程序的安全性。

通过综合使用这些防御手段，可以有效地降低 XSS 攻击的风险，并保护用户的信息安全。

如何设置 CSP？

CSP（Content Security Policy）是一种安全策略，用于限制页面加载资源的来源，防止恶意脚本的注入和执行。CSP 可以通过 HTTP 头部或 `<meta>` 标签来设置。以下是设置 CSP 的方法：

### 通过 HTTP 头部设置 CSP

1. **在服务器端配置**：在 Web 服务器配置文件中添加 CSP 头部。具体配置方法取决于使用的服务器软件，例如 Apache、Nginx 或 Microsoft IIS。

   在 Apache 服务器中，可以通过修改 `.htaccess` 文件或配置文件来添加 CSP 头部：
   ```
   Header set Content-Security-Policy "directive1 directive2 ..."
   ```

2. **在应用程序中设置**：如果使用的是服务器端框架，可以在应用程序代码中设置 CSP 头部。具体方法取决于所使用的编程语言和框架。

   在 Node.js Express 框架中，可以通过添加中间件来设置 CSP 头部：
   ```javascript
   const express = require('express');
   const app = express();

   app.use((req, res, next) => {
       res.setHeader('Content-Security-Policy', "directive1 directive2 ...");
       next();
   });

   // 其他路由和中间件
   ```

### 通过 `<meta>` 标签设置 CSP

1. **在 HTML 文件中添加 `<meta>` 标签**：可以在 HTML 页面的 `<head>` 部分添加 `<meta>` 标签来设置 CSP。

   ```html
   <meta http-equiv="Content-Security-Policy" content="directive1 directive2 ...">
   ```

### CSP 指令设置

在设置 CSP 时，需要指定要应用的指令（directive），如 `default-src`、`script-src`、`style-src`、`img-src` 等。这些指令用于指定允许加载资源的来源，以及其他安全策略。以下是一些常见的 CSP 指令：

- `default-src`：默认加载资源的来源
- `script-src`：JavaScript 脚本的来源
- `style-src`：CSS 样式表的来源
- `img-src`：图像的来源
- `font-src`：字体文件的来源
- `connect-src`：XHR、WebSockets、EventSource 等连接的来源
- `frame-src`：内嵌框架的来源
- `media-src`：媒体文件的来源
- `object-src`：插件、嵌入式内容的来源
- `frame-ancestors`：允许嵌入页面的来源
- `report-uri`：指定违反 CSP 规则时报告的 URL

### 示例

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' 'unsafe-inline';">
```

这个示例设置了默认的资源加载来源为同源策略（当前页面的域名），允许加载 JavaScript 脚本来自当前页面域名和 `https://cdn.example.com`，允许内联样式，但不允许内联脚本。

如何将 cookie 标记为 HttpOnly？

在服务器端设置 cookie 为 HttpOnly 是通过设置 HTTP 响应头来实现的。具体而言，你需要在服务器端生成或设置 cookie 时，添加一个名为 "HttpOnly" 的标志位。不同的后端语言和框架有不同的实现方式，以下是一些常见的示例：

### 使用 Node.js（Express 框架）：

```javascript
res.cookie('cookieName', 'cookieValue', { httpOnly: true });
```

### 使用 PHP：

```php
setcookie('cookieName', 'cookieValue', 0, '/', '', false, true); // 最后一个参数为 true 表示设置为 HttpOnly
```

### 使用 Python（Django 框架）：

```python
response.set_cookie('cookieName', 'cookieValue', httponly=True)
```

### 使用 Java（Servlet）：

```java
Cookie cookie = new Cookie("cookieName", "cookieValue");
cookie.setHttpOnly(true);
response.addCookie(cookie);
```

这些示例中的代码都会在设置 cookie 时将其标记为 HttpOnly，这样浏览器在接收到这个 cookie 时，就会将其作为 HttpOnly cookie 处理，JavaScript 就无法通过 document.cookie 等方式获取到该 cookie 的值，从而提高了安全性。

#### 2、跨站请求伪造（CSRF）

跨站请求伪造（Cross-Site Request Forgery，CSRF）是一种利用用户在已认证的Web应用程序上的身份来执行未经用户许可的操作的攻击。攻击者通过诱使受害者访问包含恶意请求的页面，利用受害者当前的会话凭证（如cookie）来发起未经授权的操作。

CSRF 攻击通常以以下步骤进行：

1. 攻击者诱导受害者访问包含恶意请求的页面，例如通过发送钓鱼邮件、社交工程等手段。
2. 受害者在已经登录了的受信任网站中访问了包含攻击者精心构造的恶意请求的页面。
3. 由于受害者已经登录了受信任网站，他们的浏览器会自动发送带有受信任网站的会话凭证的请求，攻击者利用这些请求来执行未经授权的操作。

防御 CSRF 攻击的方法包括：

1. **CSRF Token**：在每个表单或者请求中加入一个随机生成的 CSRF token，并在服务器端进行验证。攻击者无法获取受信任网站的 CSRF token，因此无法伪造合法的请求。这是最常见、最有效的防御方法之一。

2. **同源检测**：在服务器端验证请求的来源是否与期望的来源一致，如果不一致则拒绝请求。可以通过检查请求的来源头（Referer 头）或者使用 Origin 头来验证请求的来源。

3. **Cookie 设置**：将敏感操作的 cookie 设置为 SameSite 属性为 Strict 或 Lax，以限制第三方站点对这些 cookie 的访问，从而减少 CSRF 攻击的风险。

4. **双重提交 cookie**：在每个表单提交中添加一个与会话关联的随机值，同时将这个值存储在用户的会话中。在处理表单提交时，比较表单提交的随机值与会话中存储的值是否一致，如果一致则处理请求，否则拒绝请求。

5. **使用验证码**：对于敏感操作，要求用户输入验证码以确认操作的真实性，从而防止 CSRF 攻击。

6. **限制敏感操作**：对于涉及敏感操作的请求（如修改密码、转账等），要求用户在进行操作前进行额外的确认，如输入密码、短信验证码等，以增加攻击者攻击的难度。

综合使用这些方法可以有效地防御 CSRF 攻击，保护用户的数据和安全。