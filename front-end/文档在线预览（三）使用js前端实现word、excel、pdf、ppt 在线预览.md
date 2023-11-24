关于实现文档在线预览的做法，之前文章提到了的两种实现方式：

1、通过将文档转成图片：详见[《文档在线预览（一）通过将txt、word、pdf转成图片实现在线预览功能》](https://blog.csdn.net/q2qwert/article/details/130884607 "《文档在线预览（一）通过将txt、word、pdf转成图片实现在线预览功能》")；

2、将文档转成html：详见[《文档在线预览（二）word、pdf文件转html以实现文档在线预览》](https://blog.csdn.net/q2qwert/article/details/130893498 "《文档在线预览（二）word、pdf文件转html以实现文档在线预览》")；

其实除了这两种实现方式之外之外，还有一种常见的做法就是在前端在通过相关的在线预览组件来实现预览

### 实现方案

在网上的找了一圈实现方案，发现还挺多开源组件可以实现，整理了一下这些开源组件放在了下面的表格里，里面有一些是可以直接通过npm在vue中引入使用。

| 文档格式 | 相关的开源组件 |
| --- | --- |
| word(docx) | docx-preview、mammoth |
| pdf | pdf.js、pdfobject.js、vue-pdf |
| excel | sheetjs js-xlsx、canvas-datagrid、handsontable、DataTables |
| powerpoint（pptx） | pptxjs |

### 一、docx文件实现前端预览

#### 1、docx-preview

​ 是一个 纯前端的JavaScript库，它的优点是可以后端就实现对 .docx 的文件进行在线预览，但是缺点是 **不支持.doc**(划重点)。

github地址：[https://github.com/VolodymyrBaydalka/docxjs](https://github.com/VolodymyrBaydalka/docxjs "https://github.com/VolodymyrBaydalka/docxjs")

[demo示例](https://volodymyrbaydalka.github.io/docxjs/ "demo示例")

安装：

```coffeescript
npm install docx-preview -S
```

使用效果：

![](https://img-blog.csdnimg.cn/img_convert/09e8cf06b8aedd89362e1e31160f23a6.png)

#### 2、Mammoth

Mammoth 原理是将 .docx 文档并将其转换为 HTML。 注意Mammoth 转换过程中复杂样式被忽，居中、[首行缩进](https://so.csdn.net/so/search?q=%E9%A6%96%E8%A1%8C%E7%BC%A9%E8%BF%9B&spm=1001.2101.3001.7020)等，此外同样也只能转换.docx文档。

github地址：[https://github.com/mwilliamson/mammoth.js](https://github.com/mwilliamson/mammoth.js "https://github.com/mwilliamson/mammoth.js")

安装：

```coffeescript
npm install mammoth
```

### 二、PDF文件实现前端预览

#### 1、pdf.js

pdf.js是一款非常优秀的pdf解析工具，其实[火狐浏览器](https://so.csdn.net/so/search?q=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8&spm=1001.2101.3001.7020)内核自带pdf预览解析器就是pdf.js这个解析器，我们用火狐浏览器打开pdf文件并按F12打开控制台可以看到源码内容。

![](https://img-blog.csdnimg.cn/img_convert/78751871e67ae1852c01aa76977dc2e2.png)

官网地址：[PDF.js](http://mozilla.github.io/pdf.js "PDF.js")

github地址：[https://github.com/mozilla/pdf.js](https://github.com/mozilla/pdf.js "https://github.com/mozilla/pdf.js")

[demo示例](https://mozilla.github.io/pdf.js/web/viewer.html "demo示例")

使用效果：

![](https://img-blog.csdnimg.cn/img_convert/cd59d61d63b573f44b9ed2302675a60d.png)

#### 2、pdfobject.js

​ PDFObject.js - 将PDF嵌入到一个div内，而不是占据整个页面，要求浏览器支持显示PDF（主流浏览器都支持），如果浏览器不支持，也可通过配置PDF.js来实现

官网地址: [PDFObject: A JavaScript utility for embedding PDFs](https://pdfobject.com/ "PDFObject: A JavaScript utility for embedding PDFs")

github地址：[https://github.com/pipwerks/PDFObject](https://github.com/pipwerks/PDFObject "https://github.com/pipwerks/PDFObject")

实现效果：

![](https://img-blog.csdnimg.cn/img_convert/8c74da1066ad84af38a1b8e551787714.png)

#### 3、vue-pdf

Vue-pdf是通过Vue下基础基于 pdf.js 组件实现PDF文件的展示，操作和生成的组件。

github地址：[https://github.com/FranckFreiburger/vue-pdf](https://github.com/FranckFreiburger/vue-pdf "https://github.com/FranckFreiburger/vue-pdf")

[demo示例](https://jsfiddle.net/fossfiddler/5k4ptmqg/145/ "demo示例")

安装：

```sql
npm install --save vue-pdf
```

实现效果：

![](https://img-blog.csdnimg.cn/img_convert/93c54c578325b2b5cd27e205781fdb3a.png)

#### 4、iframe / object/ embed

iframe / object / embed 使用方法和效果都同理，即将 pdf 作为插件内嵌在这三个HTML标签内，以下用 iframe 为例，效果就如同直接用链接打开 pdf 文件是一样的，相当于一个新的页面内嵌在当前页面中。

```cobol
<iframe style="width: 100%; height: 100%;" src="/static/xxx.pdf"></iframe>
```

实现效果：

![](https://img-blog.csdnimg.cn/img_convert/89dc0c854c08fe6610a14a9063588798.png)

### 三、Excel文件实现前端预览

#### 1、sheetjs js-xlsx

​ js-xlsx是sheetJS出品的读取和导出各种ecxel的工具库，功能十分强大。

xlsx官方文档：[xlsx - npm](https://www.npmjs.com/package/xlsx "xlsx - npm")

github仓库： [https://github.com/SheetJS/sheetjs](https://github.com/SheetJS/sheetjs "https://github.com/SheetJS/sheetjs")

安装：

```coffeescript
npm install xlsx
```

js-xlsx可以用二进制流方式读取得到整份excel表格对象

```cobol
let workbook = XLSX.read(data, { type: "array" });   //表格对象let sheetNames = workbook.SheetNames;  //获取到所有表格let worksheet = workbook.Sheets[sheetNames[0]];  //取第一张表
```

获取表格数据后再调用js-xlsx提供的方法，直接将表格数据转换为html代码，再将html代码渲染到指定容器就完成了

```cobol
let html = XLSX.utils.sheet_to_html(worksheet);
```

实现效果：

![](https://img-blog.csdnimg.cn/img_convert/d0d11059d2a212f988973017f997da16.png)

#### 2、canvas-datagrid

​ 基于 canvas 来渲染表格，支持表格过滤、数据编辑、自定义操作菜单、大数据场景优化、主题样式修改

github地址：[https://github.com/TonyGermaneri/canvas-datagrid](https://github.com/TonyGermaneri/canvas-datagrid "https://github.com/TonyGermaneri/canvas-datagrid")

[demo示例](https://codesandbox.io/s/handsontable-vue-data-grid-hello-world-app-forked-z288wy "demo示例")

安装：

```less
npm install canvas-datagrid
```

#### 3、 handsontable

handsontable基于 DOM 元素来渲染表格，功能强大，canvas-datagrid\` 支持的功能它都支持，并且主题样式扩展更方便

官网地址：[Tutorial: Custom build - Handsontable Documentation](https://handsontable.com/docs/7.1.0/tutorial-custom-build.html "Tutorial: Custom build - Handsontable Documentation")

github地址：[https://github.com/handsontable/handsontable](https://github.com/handsontable/handsontable "https://github.com/handsontable/handsontable")

文档地址：[JavaScript Data Grid - Documentation | Handsontable](https://handsontable.com/docs/javascript-data-grid "JavaScript Data Grid - Documentation | Handsontable")

安装：

```coffeescript
npm install handsontable @handsontable/vue
```

[Demo示例](https://handsontable.com/demo "Demo示例")

实现效果：

![](https://img-blog.csdnimg.cn/img_convert/457ad454b16d01333bcd589635dc3186.png)

#### 4、DataTables

基于Jquery 表格插件DataTables的一个表格插件，还在用Jquery 可以以考虑这个

官网地址：[https://www.datatables.net](https://www.datatables.net/ "https://www.datatables.net")

安装：

[官网下载地址](https://www.datatables.net/download/ "官网下载地址")，在你的项目中使用 DataTables，只需要引入三个个文件即可，jQuery库，一个DataTables的核心js文件和一个DataTables的css文件。有的时候还需要DataTables样式的一些资源。

```cobol
<link href="DataTables/datatables.min.css" rel="stylesheet"/><script src="DataTables/datatables.min.js"></script>
```

使用方式：

```kotlin
$('#example').DataTable( {    data: data} );
```

### 四、pptx文件实现前端预览

#### 1、PPTXJS

[PPTXJS](https://pptx.js.org/index.html "PPTXJS")是jquery的一个插件，她的主要功能是实现pptx转html，用于在线进行展示

官网地址：[PPTXjs](https://pptx.js.org/index.html "PPTXjs")

github地址：[https://github.com/meshesha/PPTXjs](https://github.com/meshesha/PPTXjs "https://github.com/meshesha/PPTXjs")

[PPTXjs | Demos](https://pptx.js.org/pages/demos.html "PPTXjs | Demos")

使用示例：

```cobol
<div id="slide-resolte-contaniner" ></div> <script>   $("#slide-resolte-contaniner").pptxToHtml({     pptxFileUrl: "Sample_demo1.pptx",     slidesScale: "50%",     slideMode: false,     keyBoardShortCut: false   }); </script>
```

实现效果：

![](https://img-blog.csdnimg.cn/img_convert/18dc8b80109bc4c6a6bd49f962b91d64.png)

### 总结

本文主要介绍了word、excel、pdf、ppt等文件纯前端实现在线预览的方式，具体实现可以是：

#### 1、前端根据不同文件类型使用对应的在线预览组件进行在线预览。

前端通过判断不同文件类型的使用对应的在线预览组件进行在线预览。 因为不同类型的在线预览组件不一样在使用时预览界面会存在差异，如果需要做的完善一点 最好是把所有用到的组件都统一封装的一个在线预览的UI界面中。

#### 2、后端配合将不同格式的文件转换成pdf，转成统一的文件格式，再由前端实现预览效果

从本文的测试情况来看前端实现预览最好的效果还是PDF，不会出现一些文字错乱和乱码的问题，这样能保留文件的一些样式的效果，同时前端也只用支持一种文件格式的预览，工作量也能大大降低。

以上就是使用js前端实现word、excel、pdf、ppt等文件在线预览的方式的全部内容，感谢大家的阅读！