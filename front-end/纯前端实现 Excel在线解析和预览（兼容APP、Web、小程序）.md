本文正在参加[「金石计划」](https://juejin.cn/post/7207698564641996856/ "https://juejin.cn/post/7207698564641996856/")

## 前言

最近接到了一个 Excel 在线预览的需求，在进行一些调研之后确认这个需求仅依靠纯前端技术就可以实现。这个需求仅仅是对基本的 Excel 表格数据进行预览，没有飞书、语雀、金山等在线文档一样复杂的编辑、保存、分享等功能，所以从头开始开发的难度其实不大。

本文正是对这次需求开发的实现过程记录与技术总结。

## 效果预览

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c5ae391cf3b4ee8862bcd6078d791a0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

使用纯 Web 技术下载原始的 Excel 文件，然后进行解析在页面上使用表格显示，支持多个 sheet 的显示以及切换。

APP 和小程序中效果如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed62ec1c405e4896a517a7c1b0e567d0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 功能拆分

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8f5ffccbc6b44eaaba4845224d5acdd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

文件下载很常见，可以使用 `axios` 、`XMLHttpRequest` 或 `fetch`，不细说，下文说下后面两步。

### Excel 文件的解析

有以下两点要求：

1.  纯前端进行文件解析，需要使用 JS 且在 Web 环境执行，不能是 Node.js 环境。
    
2.  Excel 文件有不同的规范格式，都需要支持。
    

> 可以使用开源框架 SheetJS 实现 Excel 文件解析。

### 解析后数据的渲染

渲染成前端页面可以是普通 DOM 元素组成的表格，也可以是 canvas 绘制出表格，在 APP、小程序环境中可以使用内嵌的 webview 打开 H5 页面实现。

> 可以使用开源框架 canvs-datagrid 或 handsontable 实现表格渲染。

## SheetJS

仓库地址：[github.com/SheetJS/she…](https://github.com/SheetJS/sheetjs "https://github.com/SheetJS/sheetjs")

文档地址：[docs.sheetjs.com/](https://docs.sheetjs.com/ "https://docs.sheetjs.com/")

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/731e6a423d734187819adcf04fb15fa2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

特点是：

-   是解析不同标准格式的 excel 文件
-   适用于浏览器、Node.js 等各个环境
-   浏览器兼容性好

兼容性见下图：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a42615e6203748279aa5568498f6b415~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

安装注意事项：

`SheetJS` 对应的 npm 包名为：`xlsx`，安装命令：

```bash
npm install xlsx
```

> 从 npm 官方安装的不是最新版本

目前其最新版本已不在 npm 官方发布，使用如下命令安装最新版本

```bash
npm i --save https://cdn.sheetjs.com/xlsx-0.19.2/xlsx-0.19.2.tgz
```

> 上面最新版本安装命令好像需要翻墙，暂时从 npm 安装 `0.18.5` 版本

## canvas-datagrid

仓库地址：[github.com/TonyGermane…](https://github.com/TonyGermaneri/canvas-datagrid "https://github.com/TonyGermaneri/canvas-datagrid")

文档地址：[canvas-datagrid.js.org/](https://canvas-datagrid.js.org/ "https://canvas-datagrid.js.org/")

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47d68b0260e144c9824774558f57e2c3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

特点是：

-   基于 canvas 来渲染表格
-   支持表格过滤、数据编辑、自定义操作菜单、大数据场景优化、主题样式修改（但比较有限）

## handsontable

仓库地址：[github.com/handsontabl…](https://github.com/handsontable/handsontable "https://github.com/handsontable/handsontable")

文档地址：[handsontable.com/docs/javasc…](https://handsontable.com/docs/javascript-data-grid/ "https://handsontable.com/docs/javascript-data-grid/")

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4e8d85141954065bfdef8459458a6f5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

特点是：

-   基于 DOM 元素来渲染表格
-   `canvas-datagrid` 支持的功能它都支持，并且主题样式扩展更方便

总之，**这个表格渲染框架非常强大**，下面链接是一个简单 demo 可以点击查看，其渲染效果可以看下方图片。

[codesandbox.io/s/handsonta…](https://codesandbox.io/s/handsontable-vue-data-grid-hello-world-app-forked-z288wy "https://codesandbox.io/s/handsontable-vue-data-grid-hello-world-app-forked-z288wy")

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07e536ef98c54e078cdfd95cace02ae1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这里，不妨大胆猜测一下，飞书、语雀、金山文档等在线电子表格的渲染可能就是基于这个开源框架开发实现的。

## 具体实现

> 以下实现的完整 demo 在这里：[github.com/JohnieXu/ex…](https://github.com/JohnieXu/excel-demo "https://github.com/JohnieXu/excel-demo")
> 
> 在线效果预览：[excel-demo.vercel.app/](https://excel-demo.vercel.app/ "https://excel-demo.vercel.app/")

### 项目架构

-   **前端框架采用 vue2 + vant2**
    
    前面介绍的工具库对前端框架没有要求，为了方便这里采用 vue2，另外 vant2 用的比较熟悉也便于开发。
    
-   **HTTP 请求库使用 axios**
    
    已经是事实上的标准，简单好用。
    
-   **Excel 文件解析使用 SheetJS**
    
-   **表格渲染采用 canvas-datagrid**
    
    使用 canvas 渲染兼容性可能会好一些，本次需求简单没有复杂交互，无需强大的 `handsontable`。
    

### 下载 excel 文件

Web 环境下载文件只有两种实现方法：`XMLHttpRequest` 和 `fetch`，两者都是标准规范定义的底层方法。`fetch` 是比较新的 API，兼容性不是很好，这里采用基于 `XMLHttpRequest` 的 `axios` 实现。

封装了一个下载文件并转为 ArrayBuffer 实例的工具方法：

```js
/**
 * 获取网络文件buffer
 * @param {String} fileUrl 文件完整路径
 * @param {Function} onDownloadProgress 下载进度回调
 * @returns {Promise<Buffer>} data
 */
export const getFileBuffer = (fileUrl, onDownloadProgress) => {
  return new Promise((resolve, reject) => {
    axios
      .get(fileUrl, {
        withCredentials: true,
        responseType: "arraybuffer",
        timeout: 1000 * 60 * 60,
        onDownloadProgress: onDownloadProgress ? onDownloadProgress : null
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
};
```

需要注意的是：

1.  配置参数 `responseType` 需要指定为 `"arraybuffer"`，这样返回的数据才是 ArrayBuffer 实例；
2.  配置参数 `timeout` 表示请求超时时间，这里指定为 1 小时，太短的话很容易**出现下载大文件时超出默认超时时间配置，导致文件的下载被取消**。
3.  配置参数 `onDownloadProgress` 为文件下载进度回调函数，用于通知文件下载进度。

### 解析 excel 文件

将前面下载得到的 ArrayBuffer 数据解析为 SheetJS 的 workbook 对象

```js
import * as xlsx from "xlsx";
const workbook = xlsx.read(buffer);
```

取 sheet 对象转换为 JSON 格式数据

> sheet 表示 Excel 文件中的一张表，一个文件可以包含多张表

```js
import * as xlsx from "xlsx";
const sheet = workbook.Sheets[wb.SheetNames[0]]; // 这里取第 0 个 sheet
const json = xlsx.utils.sheet_to_json(sheet); // 得到的 json 是解析之后的数据
```

`sheet` 的结构类似于这种：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/456bbd201d1a4dc39b5383423353a668~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`json` 的结构类似于这种：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a93a8ae584747f8bf1ccdb0718a7049~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

> 是一个数组，一个元素对应着 Excel 中的一条记录

需要注意的是：

1.  生成的 `workbook、sheet` 最好不要直接绑定到 vue 的响应式数据上，例如：使用 data 来存储该对象，vue 会递归遍历该对象生成大量 `observable` 对象影响性能。

### 渲染表格到页面

使用 `canvas-datagrid` 初始化 grid 对象

```js
import canvasDatagrid from "canvas-datagrid";
const grid = canvasDatagrid({
  parentNode: el, // el 是 document 中的一个 DOM 元素
  data: json, // json 是前面解析得到 sheet 对应的数据
  editable: false, // 表示不使用表格编辑
  // ... // 下面是对表格的一些配置项
});
```

生成 grid 对象之后，需要设置表格渲染所用的 canvas 的尺寸

```js
grid.style.width = "100%"; // 宽度为视口宽度
grid.style.height = "calc(100vh - 40px)"; // 视口高度减去顶部的 sheet 切换按钮区高度
```

> 设置 width、height 非常重要，涉及到大数据表格的渲染问题，后文再细说

需要注意的是：

1.  在 vue 项目中需要在 `mounted` 生命周期中执行上面初始化 grid 对象过程，防止传递给 `canvas-datagrid` 的 el 还未挂载到页面；
2.  生成的 grid 对象最好不要直接绑定到 vue 的响应式数据上，例如：使用 data 来存储该对象，vue 会递归遍历该对象生成大量 `observable` 对象影响性能。

到这里，就可以看到 Excel 文件的第 0 个 sheet 数据已经以表格形式渲染了。

### 切换表格 sheet

当切换 sheet 时取对应 sheet 的数据进行解析，然后更新 grid 的数据就可以更新表格中显示的数据。

```js
const sheetIndex = 1;
const sheet = workbook.Sheets[wb.SheetNames[sheetIndex]]; // 这里取第 1 个 sheet
const json = xlsx.utils.sheet_to_json(sheet);
grid.data = json
```

### 兼容大数据渲染

较大的 Excel 文件的解析、渲染，几万甚至几十万条记录解析并渲染到页面，如何处理？

大文件的解析本文采用加载中效果来处理，详细讨论后文分析。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12411a4dbf1448999c46e839b65e528d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f6ef0cfd0154ba1b81775a32443d964~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`canvas-datagrid`、`handsontable` 对大数据的渲染已经进行了优化，两者都是通过**长列表虚拟滚动**实现，详见后文。

## 难点解决

在进行上面具体实现过程中遇到了一些难题，下面将依次进行描述。

### 1\. 大文件预览时页面卡顿分析

现象是：当 Excel 文件很大（十几 Mb）时，页面经常卡住不动，有时候表格还不能正常显示。

#### 卡顿原因

1.  **JS 的主线程被占用导致其他页面交互无响应**
    
    具体原因有：
    
    **A. 解析 Excel 文件长时间占用主线程**
    
    SeetJS 默认使用 JS 主线程解析文件
    
    **B. 解析后的 JSON 数据的遍历处理长时间占用主线程**
    
    若将 `workbook、sheet、grid` 等挂载到了 vue 的 data 上会出现，因为 vue 响应式数据会递归遍历这些对象生成 `__ob__` 来跟踪这些数据的变化。
    
2.  **页面生成的 DOM 元素太多**
    
    如果表格渲染使用 `handsontable` 会遇到，当展示的 sheet 的记录条数很多时 JS 会遍历生成大量 HTML 字符串然后更新到挂载的 parentNode 元素节点下。
    
    这里大量的 HTML 写入的过程占用 CPU、大量的 HTML 渲染展示占用内存，所以会卡顿或表格显示失败。
    
3.  **页面生成的 canvas 的尺寸太大浏览器不能显示**
    
    `canvas-datagrid` 默认会根据要渲染的记录条数生成相应大小的 canvas 来进行绘图，canvas 尺寸过大时会绘图失败。
    
    不能显示的原因暂时还未找到解释，知道的读者可以留言解答下 :) 。
    

#### 解决方法

1.  **使用 worker 线程进行文件解析、数据遍历**
    
    涉及文件的解析、数据的遍历过程可以使用 `web worker` 创建一个新线程来处理。
    
    不过，可能在不同 web 环境（不同浏览器内核、小程序、APP 的不同 webview）下存在兼容性问题，本文的实现没有采用这种方式。
    
2.  **不对解析后数据进行响应式处理**
    
    即与 Excel 文件解析、渲染相关的所有对象都不要直接关联到 vue 的响应式数据上，必须用到时可以**按需取用并单独存储**。
    
3.  **主线程占用期间用加载中占位避免有页面交互行为**
    
    最简单直接，也是本文 demo 采用的方法。在进行文件解析、sheet 数据转换、大数据遍历处理的过程中统一在页面添加全屏的加载中提示，阻止用户的交互行为。
    
    但是，之前存在的定时器、进行中的接口请求、下载中的图片请求会怎么样到是没有验证，若读者感兴趣可自行跟踪验证下。
    
4.  **使用虚拟滚动避免一次性渲染大量 DOM、绘制很大的 canvas**
    
    在页面滚动时计算出当前需要显示的数据，只生成当前用户窗口内可见数据对应的 DOM 或者 canvas。
    
    这是 `canvas-datagrid、handsontable` 处理大数据渲染的基本原理，感兴趣的读者可以去看看其实现。
    
    本文的 demo 是通过配置一个相对较小的渲染尺寸给到 `canvas-datagrid` 来解决的。前文的这段代码至关重要：
    
    ```js
    grid.style.width = "100%"; // 宽度为视口宽度
    grid.style.height = "calc(100vh - 40px)"; // 视口高度减去顶部的 sheet 切换按钮区高度
    ```
    

## 总结

本文实现了一个可以进行常规 Excel 文件的在线预览功能，完全不需要后端任何服务，可以为前端同学开发 Excel 编辑软件提供一种比较可靠的思路。

实现的预览功能在浏览器、小程序、安卓 APP 中进行测试通过，能正常渲染。但是，并未没有提供编辑、嵌套表格展示、单元格样式展示等高级功能，并不代表开源框架 `canvas-datagrid` 和 `handsontable` 不能实现。

如果有时间精力的话，完全可以使用本文介绍的开源框架实现一个完整版的 Excel 软件。

## 参考资料

-   [docs.sheetjs.com/docs/](https://docs.sheetjs.com/docs/ "https://docs.sheetjs.com/docs/")
-   [handsontable.com/docs/javasc…](https://handsontable.com/docs/javascript-data-grid/ "https://handsontable.com/docs/javascript-data-grid/")
-   [canvas-datagrid.js.org/](https://canvas-datagrid.js.org/ "https://canvas-datagrid.js.org/")