# 使用JSONP解决跨域

https://blog.csdn.net/Daisy_i/article/details/124806871

## 2.什么是JSONP？

- JSONP是JSON with Padding的略称，JSONP为民间提出的一种跨域解决方案，通过客户端的script标签发出的请求方式
- 原理就是通过添加一个<script>标签，向服务器请求JSON数据，这样不受同源政策限制。服务器收到请求后，将数据放在一个callback回调函数中传回来。比如axios。不过只支持GET请求且不安全，可能遇到XSS攻击，不过它的好处是可以向老浏览器或不支持CORS的网站请求数据
- 服务端： 将服务端返回数据封装到指定函数中返回 callback({返回数据})
- 客户端： 不管是我们的script标签的src还是img标签的src，或者说link标签的href他们没有被同源策略所限制，比如我们有可能使用一个网络上的图片，就可以请求得到；所以利用同源策略漏洞，将访问地址放在下面的标签的路径中，<script src="www.baidu.com"> 、< img src=""/>、 <link href=""/> 来解决跨域的问题
  

## 3.jsonp简单实现

- 实现步骤
  - 获取客户端发送过来的回调函数的名字
  - 得到要通过JSONP形式发送给客户端的数据
  - 根据前两步得到的数据，拼接出一一个函数调用的字符串
  - 把上一步拼接得到的字符串，响应给客户端的`<script>`标签进行解析执行
- node服务器端代码

```js
   const express = require('express')
   const app = express()
   const port = 3000

   //路由配置
   app.get("/user",(req,res)=>{
      //1.获取客户端发送过来的回调函数的名字
      let fnName = req.query.callback;
      //2.得到要通过JSONP形式发送给客户端的数据
      const data = {name:'tom'}
      //3.根据前两步得到的数据，拼接出个函数调用的字符串
      let result = `${fnName}({name:"tom"})`
      //4.把上步拼接得到的字符串，响应给客户端的<script> 标签进行解析执行
      res.send(result);
   })

   app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
   })
```

- 前端代码

```html
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>JSONP简单实现</title>
   </head>
      <body>
         <button id="btn">点击发送请求</button>
         <script>
            function getJsonpData(data) {
               console.log("获取数据成功")
               console.log(data) //{name:'tom'}
            }
            var btn = document.getElementById("btn");
            btn.onclick = function () {
               //创建script标签
               var script = document.createElement("script");
               script.src = 'http://localhost:3000/user?callback=getJsonpData';
               document.body.appendChild(script);
               script.onload = function () {
                  document.body.removeChild(script)
               }
            }
         </script>
      </body>
   </html>
```

## 4.结论

- 优点：
- 兼容性比较好，可用于解决主流浏览器的跨域数据访问的问题
  - 不受到同源策略的限制，在请求完毕后可以通过调用callback 的方式回传结果
- 缺点：
  - 仅支持get请求；
  - 具有局限性，不安全，可能会受到XSS攻击；
  - 只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面之间如何进行 Javascript 调用的问题