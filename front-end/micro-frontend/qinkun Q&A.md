# qinkun 问题

1、路由怎么配置跳转外链，就是path配置了http链接 #10894

https://github.com/ant-design/ant-design-pro/issues/10894

2、🧐[问题]antd pro 引入qiankun后布局分层 #7556

https://github.com/ant-design/ant-design-pro/issues/7556

3、Uncaught (in promise) Error: [qiankun]: You need to export lifecycle functions in apsc entry

4、@umijs/plugin-qiankun支持主应用为antd pro项目(umi项目)，子应用非umi项目吗（比如webpack 或者vue项目）？ #12102

https://github.com/umijs/umi/discussions/12102#discussioncomment-8317169

**问题1**：因为十几个应用都是历史项目，基于    `"umi": "^3.5.13"`的，一起去升级风险比较大，时间上也不允许。所以只能考虑`@umijs/plugin-qiankun`插件。
**问题3**：回到标题中的问题：主应用是（新建的）antd pro项目(umi项目)，但是子应用（历史项目）有`umi/webpack/vue`多个技术栈。
要使用qiankun微前端的话，可以主应用使用`@umijs/plugin-qiankun`写法，(umi)子应用使用`@umijs/plugin-qiankun`,(webpack/vue)子应用使用原生的`qiankun`写法吗？
还是说，目前这种情况，主应用和子应用全部按照原生的`qiankun`写法呢？

只有 umi 的项目可以用 `@umijs/plugin-qiankun` ( umi 3 ) ，不过你可以在 umi 主应用里用 qiankun 的方法 `loadMicroApp` 去加载非 umi 的子应用，这个子应用必须要遵循 qiankun 的文档去修改好他的配置、导出，就是确保这个子应用是合理的 qiankun 子应用就可以。

5、[Bug] 微前端 umi max 主应用，cra 子应用，子应用路由访问不了

https://github.com/umijs/umi/issues/8965

6、从零搭建一个qiankun微前端demo #34

https://github.com/zhangyu1818/blog/issues/34

# 微前端 @umijs/plugin-qiankun 主应用，cra 子应用，可行吗？能不能用约定式路由？ #12141

https://github.com/umijs/umi/discussions/12141

umi 3 不维护了，建议升级到 umi 4 。

在 umi 4 中是可行的。关于 umi 3 的 qiankun 用法，请自行参考 qiankun 文档学习和尝试。

不可以使用约定式路由；当子应用不为 umi 时，这个子应用只是作为一个独立的 qiankun 外部应用来看待，和 umi 相关的 路由、model、数据传输等等 均不适用，因为 umi 在 qiankun 加载时增加了很多中间层代码使得这些 umi 的功能可以在均为 umi 的主、子应用间使用，而当子应用不为 umi 时，这些 umi 的功能都是用不了的。

7、umi运行时配置

https://v3.umijs.org/zh-CN/docs/runtime-config

8、我们是怎么在项目中落地qiankun的

https://mp.weixin.qq.com/s/yu1tKtwneoTI9eSGS4us-g

9、Umi + qiankun 实现动态加载子应用路由

https://developer.baidu.com/article/details/2836356

10、用umi搭建项目微服务-qiankun微服务的配置

https://blog.csdn.net/sinat_36146776/article/details/107528351

11、基于qiankun的微前端最佳实践 -（同时加载多个微应用）

https://developer.aliyun.com/article/858969

12、请问antd pro的入口文件在哪里 我想在入口放一个类似Provider🧐[问题] #6763

https://github.com/ant-design/ant-design-pro/issues/6763

13、umi-qiankun

https://github.com/blueju/umi-qiankun

14、Ant-Design-Pro使用QianKun微前端最佳实践（※）

https://blog.csdn.net/Iversons/article/details/125599974

![img](https://img-blog.csdnimg.cn/770fdee0896540eba73fe48af76a14f1.png)

![img](https://img-blog.csdnimg.cn/3851acc51a544ac8896818d9e173556c.png)

15、从0开始创建一个qiankun微前端项目

https://juejin.cn/post/7047754090905862180

```js
const getBasename = () => {
  return process.env.NODE_ENV === 'production'
    ? window.__POWERED_BY_QIANKUN__ // 生产环境
      ? '/app-react/' // qiankun 中的 base
      : '/child/app-react/' // 独立访问的时候的 base
    : window.__POWERED_BY_QIANKUN__ // 开发环境
      ? '/app-react/' // 本地开发中的 qiankun 中的 base
      : '/'
}

作者：大码哥
链接：https://juejin.cn/post/7047754090905862180
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

16、qiankun微前端实践

https://www.cnblogs.com/fozero/p/17717323.html

1. 设置histroy模式路由base

建议使用 history 模式的路由，设置histroy模式路由base，值和它的 activeRule 是一样的

```javascript
<BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/child-one' : '/'}>
```

# 路由切换问题（※）

主应用切换至子应用，然后子应用之前相互切换时会出现切换不过去的问题，原因是子应用的路由重定向导致

```jsx
{/* 子应用一定不能写，否则会出现路由跳转bug */}
{/* <Redirect from="*" to="/"></Redirect> */}
```

https://blog.csdn.net/Mine____/article/details/118380815

# 嵌入子应用后，主应用 title 被修改

https://juejin.cn/post/7255473856235175996

主应用嵌入子应用后，主应用的 document.title 变成了子应用的 document.title

可以在 入口文件 app.js 中监听并防止修改

```ts
/**
 * 禁止所有子应用修改页面的标题
 */
try {
  document.title = "AIStudio";
  Object.defineProperty(document, "title", {
    get: () => "AIStudio",
    set: () => {},
  });
} catch (e) {}
```

