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

7、umi运行时配置

https://v3.umijs.org/zh-CN/docs/runtime-config

8、我们是怎么在项目中落地qiankun的

https://mp.weixin.qq.com/s/yu1tKtwneoTI9eSGS4us-g

9、Umi + qiankun 实现动态加载子应用路由

https://developer.baidu.com/article/details/2836356

用umi搭建项目微服务-qiankun微服务的配置

https://blog.csdn.net/sinat_36146776/article/details/107528351

基于qiankun的微前端最佳实践 -（同时加载多个微应用）

https://developer.aliyun.com/article/858969

请问antd pro的入口文件在哪里 我想在入口放一个类似Provider🧐[问题] #6763

https://github.com/ant-design/ant-design-pro/issues/6763

umi-qiankun

https://github.com/blueju/umi-qiankun