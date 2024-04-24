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

### Translate

```css
transform: translateY(-.5em);
```

### Skew  



**提示**：访问 http://westciv.com/tools/transforms/index.html 来使用一个在线工具，可视化 CSS 变换。

### Origin  

通常情况下，当您对一个元素应用变换时，Web 浏览器会将元素的中心作为变换点。然而，CSS 允许您更改这个变换点，使用 transform-origin 属性。它的工作方式类似于 background-position 属性（见第 236 页）；您可以提供关键字值、像素的绝对值，以及 ems 和百分比的相对值。

### 3D变换

CSS 还提供了一种更复杂的变换类型。
3D 变换可以让您在显示器、平板电脑或手机的平面屏幕上模拟三维空间。
要了解关于3D变换的简短介绍，请访问 http://coding.smashingmagazine.com/2012/01/06/adventures-in-thethird-dimension-css-3-d-transforms/ ，如果您需要更详细的解释和大量示例，请查看 http://desandro.github.io/3dtransforms/ 。要查看一些3D变换的精彩示例，请访问以下网站：

- 苹果的“Morphing Power Cubes”页面（www.webkit.org/blog-files/3d-transforms/morphing-cubes.html），这是3D变换威力的最初示例之一，演示了一个旋转的立方体，您可以将其变成旋转的一组瓷砖。

- 这是一个3D“翻转”效果的示例：http://davidwalsh.name/css-flip —— 一个动画效果，看起来像是翻转一张卡片以显示其背面。

## Transitions

虽然变换可以很有趣（特别是旋转函数），但当与 CSS 过渡结合使用时，它们确实可以使您的页面生动起来。过渡简单地是从一组 CSS 属性到另一组 CSS 属性在特定时间内的动画。例如，您可以使横幅在两秒内旋转 360 度。

### Adding a Transition  

```css
.navButton {
    background-color: orange;
    transition-property: background-color;
    transition-duration: 1s;
}

.navButton:hover {
    background-color: blue;
}
```

```css
transition-timing-function: ease-in-out;
```

### 延迟过渡的开始

```css
transition-delay: .5s;
```

**提示**

通常情况下，你会将过渡属性放在起始样式中（例如，.navButton 在第331页），而不是最终样式（.navButton:hover）。然而，这里有一个用于 CSS 下拉菜单的技巧（见第296页上的框）。在 CSS 中，下拉菜单的一个问题是，如果你意外地将鼠标移出菜单，菜单通常会很快消失。然而，你可以通过使用 transition-delay 属性来使菜单出现很快，但消失很慢。为此，你可以将以下代码添加到原始样式中：

```css
transition-delay: 1s;
```
然后在 :hover 样式中去掉延迟：
```css
transition-delay: 0;
```
这看起来有些反直觉，但这段代码基本上使 :hover 过渡立即发生，没有延迟。但是返回到正常样式（菜单消失）需要1秒钟。在这段时间内，访问者有足够的时间将他的错误鼠标移到菜单上，使其不会消失。

### Transition Shorthand  

```css
transition: all 1s ease-in .5s;
```

### 实现更流畅的动画

在网页中同时对许多不同的属性进行动画化可能会影响浏览器的性能。无论您是使用 CSS 过渡还是 CSS 动画，浏览器都需要做大量工作来动画化 CSS 属性的变化。同时进行的太多动画和过渡可能会使浏览器变得很慢，甚至崩溃。这在移动设备和平板电脑上尤为明显，因为它们的CPU比台式机和笔记本电脑的CPU慢得多。

然而，有四种属性可以在不消耗太多CPU资源的情况下进行动画：opacity（不透明度）（见第671页），以及 transform 属性的 translate、scale 和 rotate 选项（见第319页）。这四种属性比其他 CSS 属性更有效地处理，因此您使用它们创建的任何过渡或动画都会更加流畅。关于技术细节，可以参考：http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/。

此外，您还可以强制浏览器将动画移动到计算机的 GPU（图形处理单元）。GPU 是非常快速的计算机，它们可以比计算机的 CPU 更快地执行特定类型的计算。您可以通过在样式中添加 3D 变换属性来欺骗浏览器将样式交给 GPU 处理。例如，如果您计划在访问者将鼠标悬停在元素上时，为元素的背景色添加动画效果，您可以使用原始背景色创建样式，如下所示：

```css
.highlight {
    background-color: rgb(231, 0, 23);
    transition: background-color 1s;
    transform: translateZ(0);
}

.highlight:hover {
    background-color: rgb(0, 0, 255);
}
```

transform: translateZ(0) 这一行在视觉上并没有任何作用。它告诉浏览器沿着三维 Z 轴移动元素 0 像素；换句话说，根本不移动它。然而，由于它使用了一个 3D 变换，浏览器将此样式交给 GPU 处理。结果是，由于 GPU 的更强大的性能，动画可能会显得更流畅。

但是，在您开始在每个样式上都添加 transform: translateZ(0) 之前，请注意 GPU 只能处理有限数量的内容，过多的可视效果会使浏览器变得极慢。

此外，过多的动画和过渡可能会对页面的性能产生非常负面的影响，尤其是在移动设备上。请确保在多个浏览器和移动电话上测试所有的过渡和动画效果，以确保您的页面正常运行。

## 动画

CSS提供了另一种更丰富的机制来创建动画。使用CSS过渡，您只能从一组CSS属性过渡到另一组。CSS动画可以让您从一组属性过渡到另一组属性，然后再到另一组属性，以此类推。此外，您可以使动画重复播放，在访问者将鼠标悬停在动画上时暂停，甚至在动画达到结束时反向播放。

### 定义关键帧

```css
@keyframes animationName {
    from {
        /* list CSS properties here */
    }

    to {
        /* list CSS properties here */
    }
}
```

**注意**：@keyframes 不是一个 CSS 属性，而是一个称为 at 规则（at rule）的东西。CSS 中的其他 at 规则包括 @import 语句，用于从另一个样式表加载外部样式表，以及 @media 用于定义不同媒体类型（如打印机或不同的屏幕尺寸和分辨率）的样式（见第465页）。

```css
      @keyframes fadeIn {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }
```

```css
      @keyframes backgroundGlow {
        from {
          background-color: yellow;
        }

        50% {
          background-color: blue;
        }

        to {
          background-color: red;
        }
      }
```

```css
      @keyframes glow {
        from {
          background-color: yellow;
        }

        25%,
        75% {
          background-color: blue;
        }

        to {
          background-color: red;
        }
      }
```

注意第5行中的 25% 和 75%。这意味着在动画进行到 25% 的时候，元素的背景颜色应该是蓝色。然而，在动画进行到 75% 的时候，背景颜色也应该是蓝色。换句话说，在 25% 到 75% 的时间段内，背景将保持为纯蓝色，最后才变为红色。如果这个动画持续了4秒，那么在动画的中间2秒中，元素的背景将保持为纯蓝色。

### 应用一个动画

344