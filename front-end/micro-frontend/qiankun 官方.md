# qiankun 技术圆桌

## 探索微前端的场景极限

https://www.yuque.com/kuitos/gky7yw/uyp6wi

这里有嵌套弹出的示例说明。

将同一个应用的不同页面，同时渲染到主应用的不同 UI 容器中

#### 新的 UI 共享模式

通过微前端的方式，引用公共组件。

## 基于微前端的大型中台项目融合方案

https://zhuanlan.zhihu.com/p/202983352

我们知道 history 分为 `brower` 、 `hash` 、 `memory` 三种，其中 `memory` 路由是不依赖浏览器的 url 的，如果我们能在运行时动态的将 user 应用的 history 改为 memory 类型，那完全可以实现 shop 和 user 同时存在。

示例代码，https://github.com/brickspert/umi-micro-apps



ps:

React Router中的`history`分为`browser`、`hash`和`memory`三种类型。它们之间的区别主要在于它们如何创建和处理URL以及如何与浏览器交互。

1. `browser history`：使用完整的URL，与浏览器地址栏中显示的URL相同。它与浏览器的历史记录和位置API交互。

2. `hash history`：只使用URL中第一个哈希符号后面的部分。这种类型的`history`适用于静态文件服务器，因为它可以返回磁盘上存在的文件。

3. `memory history`：不与浏览器地址栏的URL交互，而是在内存中创建和管理URL。这种类型的`history`通常用于测试或非DOM环境。

在React Router中，可以使用`createBrowserHistory`、`createHashHistory`和`createMemoryHistory`方法来创建相应类型的`history`对象。这些`history`对象具有相似的属性和方法，包括`location`、`push`、`replace`、`goBack`、`goForward`等，用于导航和监听URL变化。

# qiankun

https://qiankun.umijs.org/zh/guide

cra 应用的设置方法参见，https://qiankun.umijs.org/zh/guide/tutorial#react-%E5%BE%AE%E5%BA%94%E7%94%A8



# @umijs/plugin-qiankun

https://v3.umijs.org/zh-CN/plugins/plugin-qiankun