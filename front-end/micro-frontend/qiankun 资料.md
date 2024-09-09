# qiankun 资料

# devvi.ai

https://devv.ai/zh/search?threadId=ddnrhtcmnkzk

**@umijs/plugin-qiankun部署时如何设置entry**

根据提供的信息，@umijs/plugin-qiankun是一个用于qiankun微前端框架的Umi插件。在部署时，你可以通过配置子应用的entry来设置子应用的HTML地址。具体的配置方式如下：

```javascript
export default {
  plugins: [
    ['@umijs/plugin-qiankun', {
      master: {
        apps: [
          {
            name: 'app1', // 子应用的唯一id
            entry: '//localhost:7001', // 子应用的HTML地址
            base: '/app1', // 子应用的路由前缀，通过这个前缀判断是否要启动该应用，通常跟子应用的base保持一致
            history: 'browser', // 子应用的history配置，默认为当前主应用history配置
          },
          {
            name: 'app2',
            entry: {
              scripts: ['//localhost:7002/main.js'],
              styles: [],
            },
            base: '/app2',
          },
        ],
        jsSandbox: true, // 是否启用js沙箱，默认为false
        prefetch: true, // 是否启用prefetch特性，默认为true
      },
    }],
  ],
};
```

在这个配置中，你可以设置子应用的entry，即子应用的HTML地址，以及其他相关的配置信息。这样，在部署时，qiankun框架就会根据这些配置来启动和管理子应用。

希望这可以帮助到你。

**这里的entry是什么**

在@umijs/plugin-qiankun中，entry指的是子应用的HTML地址或入口文件。它是子应用的主要入口点，用于加载和启动子应用。在配置中，你可以指定子应用的entry，以便qiankun框架知道从哪里加载子应用的内容。

例如，对于一个基于Vue.js的子应用，entry可以是指向子应用的index.html文件或者JavaScript入口文件的URL。这个entry告诉qiankun框架在加载子应用时应该从哪里获取子应用的内容。

希望这能够解答你的疑问。

**entry可以是一个HTML地址还是一个入口文件？**

在@umijs/plugin-qiankun中，entry可以是一个HTML地址，也可以是一个入口文件的URL。这意味着你可以直接指定子应用的HTML地址，也可以指定子应用的JavaScript入口文件的URL作为entry。

这样的设计使得@umijs/plugin-qiankun非常灵活，可以适应不同类型的子应用，无论是基于HTML的静态页面还是基于JavaScript的单页面应用。

希望这个回答能够帮助到你。

**如果是部署在服务器上，上面的entry该如何写呢**

如果子应用是部署在服务器上，你需要将entry设置为子应用在服务器上的实际访问地址。假设子应用的HTML文件部署在服务器的根目录下，那么entry可以是类似于`http://your-server.com/app1/index.html`这样的地址。

如果子应用是一个单页面应用（SPA），你也可以将entry设置为子应用的JavaScript入口文件的URL，例如`http://your-server.com/app1/main.js`。

总之，entry应该是子应用在服务器上的实际访问地址，以便qiankun框架能够正确加载和启动子应用。

希望这个回答能够帮助到你。

# antd-design-pro项目引用微前端，使用qiankun实现动态路由加载

https://blog.csdn.net/qq_40010841/article/details/129010237

# Antd Pro項目接入qiankun微前端

https://www.laitimes.com/article/5k8hx_60oej.html

# Umi + qiankun 实现动态加载子应用路由

https://juejin.cn/post/7095996200645558302

# umi 微前端方案（※）

https://blog.jashoka.com/2021/01/12/umi-%E5%BE%AE%E5%89%8D%E7%AB%AF%E6%96%B9%E6%A1%88/

这里部署后配置entry的代码

```js
const apps = [
  {
    name: 'micro-app-a',    // 子应用名称
    entry:
      process.env.NODE_ENV === 'development'
        ? '//localhost:8001/micro-app-a'
        : '/micro-app-a',   // 子应用入口
    codePath: 'micro-app-a',    // 子应用工程目录名称，打包脚本会用到这参数
  },
];

module.exports = apps;
```

# 使用vite-plugin-qiankun插件， 将应用快速接入乾坤（vue3 vite）

https://devpress.csdn.net/vue/66caf8d5a0bc797cf7b7a0ab.html?dp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MzAxODUxMCwiZXhwIjoxNzI1NjExMjc3LCJpYXQiOjE3MjUwMDY0NzcsInVzZXJuYW1lIjoia2dfbG92ZXlvdTIifQ.RGdP6fz3p60Gn7cfb8VnlE8zG4uPSu4297m3kemUd54&spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Eactivity-3-128662335-blog-138180177.235%5Ev43%5Econtrol&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Eactivity-3-128662335-blog-138180177.235%5Ev43%5Econtrol&utm_relevant_index=6

# 项目实践——>微应用vue3——>vite #2949

https://github.com/umijs/qiankun/issues/2949

提及了https://github.com/gongshun/qiankun-vue-demo

# 微前端-qiankun：vue3-vite 接入 vue3-vite

https://developer.aliyun.com/article/1269797

# qiankun插件vite-plugin-qiankun的使用

https://blog.csdn.net/m0_74331766/article/details/138180177

# micro-frontend-starter

[micro-frontend-starter](https://github.com/yugasun/micro-frontend-starter)

https://github.com/yugasun/micro-frontend-starter/blob/main/packages/subapp1/src/main.ts

# qiankun微前端引入vite+vue3项目子应用

https://juejin.cn/post/7205401322111385656

里面有PUBLIC_PATH的设置方式，但是不知道怎么使用。

# vite2 接入 qiankun 微前端（※）

https://www.cnblogs.com/ljx20180807/p/16048110.html

# vue3 + vite 作为子应用出现的问题解决办法 #2966

https://github.com/umijs/qiankun/issues/2966

# vue3+vite接入qiankun的问题

## 1、vite-plugin-qiankun/ReadableStream is not defined

打包报错 ReferenceError: ReadableStream is not defined #76

[node版本](https://so.csdn.net/so/search?q=node版本&spm=1001.2101.3001.7020)问题，升级node到18以上

https://github.com/tengmaoqing/vite-plugin-qiankun/issues/76

## 2、Target container with #root-subapp not existed while pc-tool loading

```
loader.js:24 Uncaught QiankunError: application 'pc-tool' died in status LOADING_SOURCE_CODE: [qiankun]: Target container with #root-subapp not existed while pc-tool loading!
    at assertElementExist (loader.js:24:1)
    at render (loader.js:149:1)
    at _callee17$ (loader.js:294:1)
    at tryCatch (runtime.js:45:1)
    at Generator.invoke [as _invoke] (runtime.js:274:1)
    at prototype.<computed> [as next] (runtime.js:97:1)
    at asyncGeneratorStep (asyncToGenerator.js:3:1)
    at _next (asyncToGenerator.js:25:1)
```

# pointcloud改造

修改margin

```css
.ant-pro-basicLayout-content {
    position: relative;
    margin: 24px;
}
```

隐藏左侧菜单

# PUBLIC_PATH

1、在微前端qiankun中使用Vite你踩坑了吗？（下）

https://developer.aliyun.com/article/921297

提到了https://github.com/jy0529/vite-plugin-dynamic-publicpath

2、[为什么 qiankun 不能和 vite 一起使用？](https://segmentfault.com/a/1190000042738311)

提到了，[@sh-winter/vite-plugin-qiankun](https://github.com/sh-winter/vite-plugin-qiankun)

