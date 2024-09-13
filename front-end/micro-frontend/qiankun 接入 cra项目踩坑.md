# qiankun 接入 cra项目踩坑

## 1、主应用接入微应用的页面后，一闪而过，然后变成空白

原因：子应用的路由重定向导致，修改如下：

```tsx
{!window.__POWERED_BY_QIANKUN__ && <Redirect to='/dashboard' />}
```

## 2、微应用单独使用时正常，但是集成在主应用时svg.js库报错

原因：svg.js 库是在 DOMContentLoaded 初始化 SVG 对象，作为微应用时无法触发，所以在这里进行初始化

修改如下：

```tsx
export async function bootstrap() {
    console.log('react app bootstraped');

    /**
     * annot-canvas 中用到的 svg.js 库是在 DOMContentLoaded 初始化 SVG 对象，作为微应用时无法触发，所以在这里进行初始化
     */
    if (!(SVG as any)?.parser?.draw) {
        (SVG as any)?.prepare();
    }
}
```

### 3、antd pro项目使用qiankun，loading加载页不消失

https://blog.csdn.net/w544924116/article/details/120164997

src\pages\document.ejs

```ejs
<div id="<%= context.config.mountElementId %>">
```

