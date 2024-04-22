# CSS The Missing Manual, 4th Edition.2015.08

https://github.com/sawmac/css_mm_4e

# 第8章 向网页添加图形

## 添加背景图

```css
url(../images/bg.png) /* document-relative */
url(/images/bg.png) /* root-relative */
```

正如第237页上的信息框所解释的那样，文档相对路径提供的方向是相对于样式表文件而言，而不是您正在样式化的HTML页面。

## 定位背景图

### 使用百分比值

最后，您可以使用百分比值来定位背景图像。以这种方式使用百分比有些棘手，如果您可以使用之前讨论过的关键字或精确值实现您想要的效果，那么请使用它们。但是，如果要将元素定位在与元素宽度成比例的位置上，比如说，如果您想要将图形放在标题的四分之三处，而您不知道元素的宽度，则必须使用百分比。

与像素或em值一样，您提供两个百分比值：一个用于指示水平位置，另一个用于指示垂直位置。百分比值测量的是一点棘手的：简而言之，百分比值将图像的指定百分比与样式化元素的相同百分比对齐。什么意思？

该声明将图像上距其左边缘50%的点直接放置在距页面左边缘（或您已用背景图像进行样式化的任何元素）50%的点上。该声明还将图像上距其顶部50%的点与页面或样式化元素顶部50%的点对齐。换句话说，图像的中心与元素的中心对齐。这意味着在使用百分比时，正在对齐的图像上的确切点可能是一个移动目标。（这是因为如果您的访问者调整其浏览器的大小，您样式化的元素的定位百分比可能会改变。）

### 固定图像的位置

```css
body {
    background-image: url(images/logo.gif);
    background-repeat: no-repeat;
    background-attachment: fixed;
}
```

### 定义背景的原点和裁剪

您可以使用 background-origin 属性重新定位图像的起始点。

background-clip 属性限制了背景图像出现的区域。

### 背景图像的缩放

通常，放置在页面元素背景中的图像会以您创建的大小显示。然而，background-size 属性允许您控制背景图像的大小。您可以使用值或关键字来设置大小：

• 提供一个高度和宽度值来设置图像的大小。您可以使用像素值这样的绝对值：
```css
background-size: 100px 200px;
```
这段代码将背景图像设置为100像素宽，200像素高。

您还可以仅设置宽度或高度的值，并将另一个值设置为 auto：
```css
background-size: 100px auto;
```
在这种情况下，背景图像的宽度为100像素，浏览器会自动设置高度以保持图像的纵横比不变（以防止图像失真）。您也可以使用百分比值。如果您希望图像完全适应背景，则可以对两个设置都使用100%（见图8-11，左侧）：
```css
background-size: 100% 100%;
```

• contain 关键字强制图像调整大小以适应页面元素的背景空间，同时保持图像的纵横比（见图8-10，中间）。根据图像和元素的形状，图像被拉伸以适应元素的宽度或高度。

```css
background-size: contain;
```

• cover 关键字强制图像的宽度适应元素的宽度，图像的高度适应元素的高度，而不改变图像的纵横比（见图8-1，右侧）。

```css
background-size: cover;
```

几乎总是通过 background-size 属性调整原始图像大小：如果图像小于元素，则浏览器会将图像放大，通常导致图像出现明显的像素化和降级（如图8-12中的背景图像）。

**提示：**
在处理使用百分比大小的元素时，使用 background-size 属性尤其有帮助，比如在第14章中讨论的响应式设计中。例如，如果您将一个图像放入一个横幅的背景中，在桌面监视器上查看时它是960像素，但在手机上查看时缩小到480像素，您可以使用以下设置：

```css
background-size: 100% auto;
```
这会强制网络浏览器调整图像大小，使其适应横幅缩小到较窄的尺寸。

**为背景图像带来特效**

如果您是像 Photoshop 这样的照片编辑软件的高级用户，您可能已经研究过混合模式，它可以让您转换两个图层在视觉上的交互方式。这里是它们的工作原理的示例：想象一下，您在一个元素的背景中放置了一张照片。您还为该元素设置了背景颜色。通常，任何没有透明度的图像都会覆盖在背景颜色之上。但是，如果您能够将图像和背景混合在一起会怎么样呢？例如，假设您想让背景颜色透过图像的白色部分显示出来。相对较新的 background-blend-mode 属性允许您做到这一点。您可以将该属性应用于具有背景颜色和图像的元素。该属性采用了 16 种不同的混合模式值之一，每种模式对混合物具有不同的效果。在另一个例子中，假设您有一张番茄的照片放在一个 div 的背景中，并且您希望橙色混合到照片中。您可以将背景颜色设置为橙色，然后设置混合模式如下：
```css
background-image: url(tomato.png);
background-color: orange;
background-blend-mode: screen;
```
您甚至可以在多个图像背景上使用混合模式（参见第249页）来创建一些非常有趣的视觉效果。
要了解混合模式在 Photoshop 中的工作原理，请查看 www.youtube.com/watch?v=Bnl1CJV17q4 的视频。尽管此视频是关于 Photoshop，但它们与 CSS 的 background-blend-mode 属性具有相同的混合模式和相同的效果。
要了解混合模式在 CSS 中的工作原理的视觉演示，请访问 http://sarasoueidan.com/blog/compositing-andblending-in-css/。（目前，Internet Explorer 的任何版本都不支持此属性。）

## Using Background Property Shorthand  

以下样式在页面中央添加了一个图形，将图像调整为其大小的50%，只放置一个图像（不重复），将图像固定在位置（因此如果页面滚动，图像将保持固定），并将背景颜色设置为白色：
```css
body {
    background: url(bullseye.gif) center center / 50% no-repeat fixed #FFF;
}
```
如果您指定了位置（例如，上面直接的代码示例中的 center center）和 background-size 属性（例如示例中的50%），则用斜杠（/）分隔它们。

## 使用多个背景图像

幸运的是，您可以向元素的背景中添加多个图像。在滚动示例中，您可以使用三个背景图像：一个用于滚动的顶部，一个用于滚动的底部，一个用于其文本区域。最后一个图像是一个无缝平铺的图像，因此当侧边栏变得更高时，图像会简单地平铺以适应空间。

当像这样使用多个值时，第一个值（在本例中是 no-repeat）与 background-image 属性中列出的第一个图像（scrollTop.png）配对；第二个值与第二个列出的图像配对，依此类推。由于这可能会很快让人感到困惑，许多网页设计师使用速记方法来指定多个图像，如下所示：
```css
background: url(scrollTop.jpg) center top no-repeat,
            url(scrollBottom.jpg) center bottom no-repeat,
            url(scrollMiddle.jpg) center top repeat-y;
```



## 教程：创建一个相册

```css
figure {
  display: inline-block;
  vertical-align: top;
  width: 210px;
  margin: 0 10px 10px 10px;
}
```
display: inline-block 属性（第192页）将每个图像/标题对视为块（具有高度和宽度的框），但同时也视为内联元素（因此这些块可以并排）。此外，设置为 top 的 vertical-align 属性确保每个 <figure> 标签与同一行中的所有其他 <figure> 标签顶部对齐。

## 教程：使用背景图像

1. 返回文本编辑器和 styles.css 文件。定位您在第272页步骤7中添加的 .announcement 样式，并添加一个额外的属性：
```css
.announcement {
    background: url(images/scroll_top.jpg) no-repeat center top,
                url(images/scroll_bottom.jpg) no-repeat center bottom,
                url(images/scroll_middle.jpg) repeat-y center top;
    margin-top: 115px;
}
```
是的，这只是一个属性 - background 属性 - 但它包含了三个不同的图像。您列出这些图像的顺序很重要，因为它们会堆叠在一起。在这种情况下，第一个图像是滚动的顶部；它只出现一次（no-repeat），在顶部和中心。第二个图像是滚动的底部；它也只出现一次，但在 div 的底部。最后，滚动的中间部分 - scroll_middle.jpg - 将位于其他两个图像的下面（因为它在列表中出现在最后），并且沿着 y 轴（上下）重复，因此如果 <div> 变得更高，图像将简单地平铺以填充空间。 
如果您预览页面，您会看到一些问题。首先，文本出现在卷起的滚动顶部和底部的顶部。稍微增加一点填充就可以解决这个问题。

# 第10章 CSS 变换、过渡和动画

## Transforms  

缩放还提供了另一个视觉效果：可以将元素上下翻转和左右反转。虽然没人确定W3C使用了哪个数学分支来设计这个系统，但如果您在`scale`  属性中使用负数，您实际上就可以将元素翻转过来。例如，这是如何将元素上下翻转和左右反转的代码：
```css
transform: scale(-1);
```

这会产生图10-4中左侧所示的图像。您也可以只在一个轴上翻转元素。在图10-4中的中间图像中，图像仅在水平轴上翻转。沿着垂直轴翻转元素会产生中间图像：
```css
transform: scale(-1, 1);
```
这会产生一个像镜子靠在元素一侧的效果，或者像您翻转了元素并从其背面看过去。多有趣啊！

325