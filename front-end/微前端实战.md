# 微前端实战

## 第1部分 微前端入门

### 1、微前端是什么？

公司采用微前端架构的3个主要原因：

#### FRAGMENTS  

You can think of fragments as embeddable mini applications that are isolated from the rest of the page.  

#### 1.1.3  前端集成

​	The term frontend integration describes a set of techniques you use to assemble the user interfaces (pages and fragments) of the teams into an integrated application. You can group these techniques into three categories: **routing, composition, and communication**. Depending on your architectural choices, you have different options to solve these categories.  

##### 路由和页面转换

### 1.2 微前端解决了什么问题

- 优化功能开发

  减少团队之间的等待时间是微前端的主要目标

- 不再有前端巨石（monolith）

  monolithic frontend  ：这意味着前端来自一个单一的代码库，只有一个团队可以明智地工作。

- 能够保持变化

#### 12.4 独立的好处

##### SELF-CONTAINED  



##### TECHNICAL OVERHEAD  （技术开销）

### 1.3 微前端缺点

- Redundancy  
- Consistency  
- Heterogeneity  
- More frontend code  

### 1.4 微前端什么时候有意义？

- 适用于大中型项目
- Works best on the web  
- 

#### 1.4.4 微前端不适用的情景



#### 总结

- 微前端是一种体系架构方法，而不是特定技术。
- 微前端通过引入跨职能团队，消除了前端和后端开发人员之间的团队障碍。
- The micro frontends model typically comes with more code for the browser. It’s vital to address web performance from the start.  
- 

### 2、 第一个微前端项目

本章将学习如何通过*links*和*iframes*来集成不同组的UIs。从技术的角度来看，这些既不是新技术，也不令人兴奋。

#### 2.2 Page transition via links  

```html
<html>
  <head>
    <title>Porsche-Diesel Master 419</title>
    <link href="/static/page.css" rel="stylesheet" />
    <link href="/static/outlines.css" rel="stylesheet" />
  </head>
  <body class="layout">
    <h1 class="header">The Tractor Store</h1>
    <div class="product">
      <h2>Porsche-Diesel Master 419</h2>
      <img class="image" src="https://mi-fr.org/img/porsche.svg" />
    </div>
    <aside class="recos">
      <a href="http://localhost:3002/recommendations/porsche">
        Show Recommendations
      </a>
    </aside>
  </body>
</html>

```

link(<a>)，第一个微服务集成技术。

However, relying on a central CSS file introduces a considerable amount of coupling. Since micro frontends is all about decoupling and
maintaining team autonomy, we have to be careful—even with styling.  

##### 2.2.4 处理不断变化的 URLs  

如果不同系统的URL经常变动，则不能硬编码，建议放在一个JSON配置文件中。各个应用去从该文件中读取需要的URL。类似的标准有[URI
templates](https://tools.ietf.org/html/rfc6570), [json-home](https://mnot.github.io/I-D/json-home/)和 [Swagger OpenAPI](https://swagger.io/specification/)。

##### 2.2.5 优点

松耦合

高健壮性

##### 2.2.6 缺点

该方式有很多技术冗余和开销。 比如常见的页面标题之类的部分，每个团队都需要创建和维护。

#### 2.3 使用iframe  集成

##### 2.3.1 如何实现

Iframe在布局上有一大缺陷：外部的document需要知道Iframe内容的确切高度，以免出现滚动条或者空格。

对于静态布局，这可能不是问题，但是如果您要构建响应式网站，会变得棘手。 内容的高度可能会根据设备大小的变化而变化。

另一个问题是，Team Inspire 现在绑定了Team Decide定义的高度。 例如，他们无法添加第3条建议图片，而不必与其他团队交谈。 [JavaScript库](https://github.com/davidjbradshaw/iframe-resizer)可以在内容更改时自动更新iframe的大小。

团队之间的契约变得更加复杂。 之前，团队只需要知道URL。 现在他们还必须知道其内容的高度。

##### 2.3.3 缺点

**布局约束**

如前所述，缺乏可靠的自动iframe高度解决方案是日常使用中最重大的缺点之一。

**性能开销**

大量使用iframe对性能有严重影响。从浏览器的角度来看，在页面上添加iframe成本很高进。 每个iframe都会创建一个新的浏览上下文，这会导致额外的内存和CPU使用率。 如果您打算在网页上包含很多iframe，则应测试它们带来的性能影响。

**对视觉障碍者不友好**

**对搜索引擎不友好**

对于包含iframe的页面，爬虫程序会索引成两个不同的页面。

##### 2.3.4 什么时候使用iframe

如果您要建立面向客户的网站，并且加载性能，可访问性和SEO至关重要，则不应使用iframe。 但是对于内部工具而言，它们可以是入门微前端架构的绝佳且直接的选择。

#### 2.4 接下来是什么

前端集成技术分为3类：routing, composition, 和 communication。

我们涵盖了前两类：使用link  实现不同组页面之间的跳转；使用iframe  作为composition 技术，来包含来自另外组的内容。

## 第2部分 路由、组合和通信

Routing, composition,and communication  

## 第3章 使用Ajax和服务端路由实现组合

Composition with Ajax and server-side routing  

本章包含下面内容：

- 通过Ajax将fragments集成进页面。
- 使用项目范围的名称空间，以避免样式或脚本冲突。
- 利用Nginx web服务器为所有应用提供来自同一个域的服务。
- Implementing request routing to forward incoming requests to the right server  
- 

### 3.1 Composition via Ajax  

fragment—a snippet of HTML.  

必须完成两项工作来实现Ajax集成：

1、Team Inspire  将推荐暴露为一个fragment。

2、Team Decide  加载该fragment，并将其插入自己的DOM中。

#### 3.3.1 如何实现

**fragment  markup**  

team-inspire/fragment/recommendations/porsche.html  

```html
<link href="http://localhost:3002/static/fragment.css" rel="stylesheet" />
<div class="inspire_fragment">
  <h2 class="inspire_headline">Recommendations</h2>
  <div class="inspire_recommendations">
    <a href="http://localhost:3001/product/fendt">
      <img src="https://mi-fr.org/img/fendt.svg" />
    </a>
    <a href="http://localhost:3001/product/eicher">
      <img src="https://mi-fr.org/img/eicher.svg" />
    </a>
  </div>
</div>
```

**AJAX REQUEST**  

team-decide/static/page.js  

```js
(function() {
  const element = document.querySelector(".decide_recos");
  const url = element.getAttribute("data-fragment");

  window
    .fetch(url)
    .then(res => res.text())
    .then(html => {
      element.innerHTML = html;
    });
})();
```

03_ajax\team-decide\product\porsche.html

```html
    <aside
      class="decide_recos"
      data-fragment="http://localhost:3002/fragment/recommendations/porsche"
    >
      <a href="http://localhost:3002/recommendations/porsche">
        Show Recommendations
      </a>
    </aside>
    <script src="/static/page.js" async></script>
  </body>
```

#### 3.1.2 Namespacing styles and scripts  

**样式隔离**

`scoped`  

某些框架（例如Vue.js）使用了`scoped`语法来实现这种隔离。

Namespacing all CSS selectors with a team prefix  

| Team name | Team prefix | Example selectors                               |
| --------- | ----------- | ----------------------------------------------- |
| Decide    | decide      | .decide_headline .decide_recos                  |
| Inspire   | inspire     | .inspire_headline .inspire_recommendation__item |
| Checkout  | checkout    | .checkout_minicart .checkout_minicart—empty     |

Some tools can help here. CSS Modules, PostCSS, or SASS are a good start. You can configure most CSS-in-JS solutions to add a prefix to each class name. It does not matter which tool a team chooses, as long as all selectors are prefixed  

**JAVASCRIPT 隔离**

​		一种流行的方式是将代码包含在一个IIFE（*immediately invoked function expression*  ）中。这样，应用程序声明的变量和函数就不会添加到全局*window*  对象。 相反，我们将作用域限制到匿名函数中。

```js
(function() {
  const element = document.querySelector(".decide_recos");
  const url = element.getAttribute("data-fragment");

  window
    .fetch(url)
    .then(res => res.text())
    .then(html => {
      element.innerHTML = html;
    });
})();
```

Some JavaScript functionalities also need namespacing.  

| Function            | Example                                                      |
| ------------------- | ------------------------------------------------------------ |
| Cookies             | document.cookie = "decide_optout=true";                      |
| Local storage       | localStorage["decide:last_seen"] = "a,b";                    |
| Session storage     | sessionStorage["inspire:last_seen"] = "c,d";                 |
| Custom events       | new CustomEvent("checkout:item_added"); window.addEventListener("checkout:item_added", …); |
| Unavoidable globals | window.checkout.myGlobal = "needed this!"                    |
| Meta tags           | <meta name="inspire:feature_a" content="off" />              |

#### 3.1.3 使用h-include进行声明式加载

*h-include*  JavaScript 库为fragment的加载提供了一种声明式的方法。Including a fragment feels like including an iframe in the markup. You don’t
have to care about finding the DOM element and making the actual HTTP request. The library introduces a new HTML element called **h-include**, which handles everything for you.   

```html
...
<aside class="decide_recos">
  <h-include
    src="http://localhost:3002/fragment/recommendations/porsche">
  </h-include>
</aside>
...
```

h-include fetches the HTML from the src and inserts it into the element itself

该库还具有其他功能，例如定义超时，通过将多个fragments 的插入绑定在一起减少重排，并延迟加载。

#### 3.1.4 优点

Ajax 集成是一种容易实现和理解的技术。与iframe方法相比，有许多优点。

- 成熟的文档流

- 搜索引擎及可及性

  

#### 3.1.5  缺点

- 异步加载

- 缺少隔离

- 要求服务端请求

  roundtrip  往返

- 脚本无生命周期

#### 3.1.6 Ajax集成什么时候适用

如果要在服务器端生成markup，则此解决方案很有意义。

对于包含大量交互性且具有本地状态的fragments ，它可能变得棘手。可以使用Web Components 和客户端渲染。

#### 3.1.7 总结

### 3.2 使用Nginx进行 服务端路由

这里的路由web服务器称为前端代理。

#### 3.2.1 如何实现

Nginx  中的两个概念：

- proxy_pass/upstream  ：将请求转发到另外一台服务器。
- location  ：区分传入的请求。

Nginx’s ***upstream*** concept allows you to create a list of servers that Nginx can forward requests to.  

```
upstream team_decide {
	server localhost:3001;
}
```

You can differentiate incoming requests using ***location*** blocks.  Here’s a location block that matches all requests starting with **/product/**:  

```
location /product/ {
	proxy_pass http://team_decide;
}
```

See the `proxy_pass` directive in the location block? It advises Nginx to forward all matched requests to the `team_decide` upstream.  

#### 3.2.2 Namespacing resources  

#### 3.2.3 路由配置方法

- STRATEGY 1: TEAM ROUTES ONLY  

- STRATEGY 2: DYNAMIC ROUTE CONFIGURATION  

#### 3.2.4 Infrastructure ownership  

#### 3.2.5 什么时候适用

技术优势：

- 阻止浏览器安全问题（CORS）
- 共享数据，比如通过cookies共享登录状态
- 更好的性能（只需要一次DNS  查询，SSL握手，...）

#### 总结

## 第4章 服务端组合（Server-side composition  ）

在本章中，我们将基于这些内容并查看服务器端集成。

服务器端集成最大的好处是，页面在到达客户浏览器之前已经完成了组装。相比于客户端渲染技术，可以实现更好的首页加载速度体验。

### 4.1 Composition via Nginx and Server-Side Includes (SSI)  

#### 4.1.1 如何实现

##### HOW SSI WORKS  

SSI include  指令示例如下：

```html
<!--#include virtual="/url/to/include" -->
```

The web server replaces this directive with the contents of the referenced URL before it passes the markup to the client.  

The Nginx serves two roles: ***request forwarding*** based on the URL path and ***fetching and integrating fragments***.  

##### INTEGRATING A FRAGMENT USING SSI  

Nginx  的SSI功能默认不可用。可以在`nginx.conf`配置文件的 `server {…}`  部分添加 `ssi on;`  来激活该功能。

```
...
  server {
    listen 3000;
    ssi on;
    ...
  }
```

#### 4.1.2 更少的加载时间

