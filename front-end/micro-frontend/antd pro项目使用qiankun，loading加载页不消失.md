## 一、问题描述

antd pro项目开启qiankun作为主应用后，输入项目地址，我们会发现，我们看不到我们想要的页面，呈现在眼前的只是一个加载页，如下图：

![](https://i-blog.csdnimg.cn/blog_migrate/4aba701eee4a75057b2e318d263ba7a8.png)

其实细心的人会发现，该页面存在滚动条，滚动下去即可看到项目当前路由的页面，只是加载页处于上方布局，一直存在不会消失而已。为什么会这样呢？看下图，我们会发现加载页和登录页挂载的dom节点并不一样。

![](https://i-blog.csdnimg.cn/blog_migrate/f3facf32cf7bbb8fa4c758e96a385bda.png)

**loading加载页挂载在id为“root”的dom节点下（antd pro默认挂载节点为root），而登录页挂载在id为“root-master”的dom节点下（@umijs/plugin-qiankun插件默认挂载节点为root-master）。总体而言，产生上述问题的原因就在于，使用qiankun插件后，更改了页面要渲染到的dom节点位置。**

## 二、解决方案

**方案1：**

修改document.ejs文件（src/pages/document.ejs），将id="root"改为id="<%= context.config.mountElementId %>"，即将id修改为config.ts 中的mountElementId（指定 [react](https://so.csdn.net/so/search?q=react&spm=1001.2101.3001.7020) app 渲染到的 HTML 元素 id），这样当mountElementId被修改后可以确保ejs存在该dom节点

**方案2：**

修改document.ejs文件（src/pages/document.ejs），将id="root"改为id="root-master"，并修改全局样式中的“#root”改为“#root-master”

**方案3：**

config.ts配置文件配置mountElementId，重新指定下 react app 渲染到的 HTML 元素 id。

```javascript
mountElementId: 'root',
```

 **【推荐文章】**

[微前端系列讲解--应用集成方案（qiankun+umi+vue）![](https://i-blog.csdnimg.cn/blog_migrate/dad932ca2c38cf78e5ef19cfc5db654e.png)https://blog.csdn.net/w544924116/article/details/120105320](https://blog.csdn.net/w544924116/article/details/120105320 "微前端系列讲解--应用集成方案（qiankun+umi+vue）")[antd pro(ProLayout) mix混合菜单不生效![](https://i-blog.csdnimg.cn/blog_migrate/dad932ca2c38cf78e5ef19cfc5db654e.png)https://blog.csdn.net/w544924116/article/details/120211891](https://blog.csdn.net/w544924116/article/details/120211891 "antd pro(ProLayout) mix混合菜单不生效")[Error: Module “xxx“ does not exist in container. / antd pro v5启用qiankun报错 / 同时使用mfsu和qiankun报错![](https://i-blog.csdnimg.cn/blog_migrate/dad932ca2c38cf78e5ef19cfc5db654e.png)https://blog.csdn.net/w544924116/article/details/120123331](https://blog.csdn.net/w544924116/article/details/120123331 "Error: Module “xxx“ does not exist in container. / antd pro v5启用qiankun报错 / 同时使用mfsu和qiankun报错")[引用window自定义变量以及ts在window上自定义变量数据类型报错的解决方案![](https://i-blog.csdnimg.cn/blog_migrate/dad932ca2c38cf78e5ef19cfc5db654e.png)https://blog.csdn.net/w544924116/article/details/120251686](https://blog.csdn.net/w544924116/article/details/120251686 "引用window自定义变量以及ts在window上自定义变量数据类型报错的解决方案")

感谢您读完本文！如果本文对您有帮助，请点个赞呗，您的点赞是对我最大的支持和认可！

我的公众号：**大前端教程**，欢迎关注，会定期更新前端知识，希望能帮到您。

![](https://i-blog.csdnimg.cn/blog_migrate/cd166fdb7695358a3b363d023b4b8b41.jpeg)