# CSS 技术揭秘与实战通关

https://juejin.cn/book/7052964245259943948?scrollMenuIndex=0

账号：mobile 2，用户78284756767

作者的博客：https://chokcoco.github.io/#blog，https://github.com/chokcoco

# 3、background 属性进阶技巧讲解及实战演练

# 4、mask：巧用遮罩解决各类视觉难题

```css
html, body {
    width: 100%;
    height: 100%;
    display: flex;
}


div {
    margin: auto;
    position: relative;
    width: 25vw;
    height: 50vh;
    background: url(https://i.pinimg.com/originals/e8/ba/25/e8ba252917952f23dfc9715e942e654e.jpg) no-repeat;
    background-size: cover;
    mask: linear-gradient(90deg, transparent, #000);
}
```

```css
 mask: linear-gradient(90deg, transparent, #000);
```

这段CSS代码表示一个线性渐变的遮罩（mask）效果，应用于某个元素。具体分析如下：

- `mask`: CSS中的`mask`属性用于在元素上应用某种“遮罩”效果，以此来隐藏部分区域或改变元素的外观。遮罩可以使用图像、渐变或颜色来创建。

- `linear-gradient`: 指定了要使用的渐变为线性渐变。线性渐变是从一个方向到另一个方向逐渐变化的颜色。

- `90deg`: 这指定了渐变的方向为90度。在CSS的坐标系统中，0度代表从下到上，90度则代表从左到右。所以，这是一个从左边开始的水平渐变。

- `transparent, #000`: 渐变的颜色序列，起始颜色是`transparent`（完全透明），结束颜色是`#000`（黑色）。这意味着渐变效果将从完全透明过渡到完全不透明的黑色。

综上所述，这段代码实现的效果是：元素从左侧向右侧逐渐应用一个遮罩，遮罩的左侧是完全透明的，右侧则是完全不透明的黑色。这样的遮罩常用于实现元素的部分透明或阴影效果，比如让元素右侧渐渐隐入背景，或者创建独特的视觉分离效果。

```css
background-size: cover;
```

在CSS中，`background-size: cover;` 是一个背景图片尺寸的属性值，用于控制背景图片如何根据元素的尺寸进行缩放。当设置为 `cover` 时，背景图片会按照以下规则进行调整：

1. **保持比例**：背景图片会保持其原始宽高比，不会拉伸或扭曲。
2. **完全覆盖**：图片会被缩放至足够大，以便完全覆盖包含它的元素的背景，同时保持图片的宽高比。这意味着图片的一部分可能会超出元素的边界而被裁剪，以确保元素的每一部分都有背景覆盖。

简而言之，`background-size: cover;` 确保背景图片始终“足够大”来填充背景区域，无论元素的尺寸如何变化，都提供了一个视觉上饱满且不失真的背景效果，特别适用于背景需要富有视觉冲击力且不关心图片完整显示的场景。



这里得到了使用 mask 最重要结论：元素的内容**与 mask 生成的渐变的透明重叠部分，将会变得透明**。

值得注意的是，上面的渐变使用的是 `linear-gradient(90deg, transparent, #000)`，这里的 `#000`纯色部分其实换成任意颜色都可以，不影响效果。

# 5、mask：实现弹幕特效、转场切换等高阶交互动画效果

# 6、clip-path：实现不规则图形及各类溢出场景的利器

## 技巧四：clip-path 的坐标可以是负数，可以超出 100%

```css
div {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* clip-path: polygon(-5% -9%, 107% -3%, 100% 108%, -5% 105%); */

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border: 3px dashed #e30;
  }
}
```

- `inset: 0;`: 这是一个简写属性，等同于`top: 0; right: 0; bottom: 0; left: 0;`，意在让伪元素覆盖整个`div`的范围。

```css
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 70% 20%;
  transition: .25s;
  cursor: pointer;
  
  &:hover {
    transform: scale(120%);
  }
}
```

这段代码定义了一个图像 (`img`) 标签的CSS样式，具体说明如下：

- `width: 100%;` 和 `height: 100%;`: 图像的宽度和高度均设置为100%，这意味着图像将占据其父容器的全部宽度和高度。这对于响应式设计特别有用，能确保图像适应不同大小的屏幕或容器。

- `object-fit: cover;`: 这个属性决定了图像如何缩放以适应定义的宽度和高度。当值设为"cover"时，图像会被缩放以填充内容框，同时保持其原始纵横比，可能部分图像会被裁剪以保证填满整个空间。

- `object-position: 70% 20%;`: 指定了图像在被缩放后的位置。在这个例子中，图像的中心点会位于其容器的70%宽度处和20%高度处。这意味着图像的右上角内容会被更多地展示给用户。

- `transition: .25s;`: 添加了过渡效果，持续时间为0.25秒。这会使得CSS属性的变化（在本例中是变换效果）更加平滑，而不是突变。

- `cursor: pointer;`: 将鼠标光标在图像上悬停时的样式变为手指状（或其他指针设备的相应图标），提示用户该元素可点击。

- `&:hover { transform: scale(120%); }`: 这是一个伪类选择器，定义了当图像被鼠标悬停时的样式。在这种情况下，图像会通过缩放变换（`transform: scale(120%)`）增大到其原始大小的120%，创造出一种放大效果，增加交互性。

综上所述，这段CSS代码使得图像能够响应式地适应其容器，保持视觉上的协调，并在用户悬停时通过平滑的动画效果轻微放大，提升用户体验。

# 7、clip-path：实现形态及区域变化等高级动画效果

```css
div {
    position: relative;
}
div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid gold;
    animation: clippath 3s infinite linear;
}
@keyframes clippath {
    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }
    25% {
        clip-path: inset(0 95% 0 0);
    }
    50% {
        clip-path: inset(95% 0 0 0);
    }
    75% {
        clip-path: inset(0 0 0 95%);
    }
}
```

`inset(0 95% 0 0);` 是 CSS 中 `clip-path` 属性的一个值，用于定义一个元素的裁剪区域。`inset()` 函数在这里用来创建一个矩形裁剪区域，其参数代表了这个矩形相对于元素自身边界的偏移量。这四个参数分别对应于 top（上）、right（右）、bottom（下）、left（左）的偏移量，顺序遵循顺时针方向，从上开始。

具体到 `inset(0 95% 0 0);` 这个值，它的意义如下：
- 第一个 `0` 表示顶部边缘向下偏移0%，即裁剪区域从元素的顶部开始。
- 接着的 `95%` 表示右侧边缘向左偏移95%，意味着裁剪区域结束于元素左侧的5%位置，换句话说，元素的右侧95%部分将被裁掉。
- 紧接着的第二个 `0` 表示底部边缘向上偏移0%，保持与顶部对齐，不影响垂直裁剪。
- 最后的 `0` 表示左侧边缘不做偏移，即裁剪区域从元素的最左侧开始。

综上所述，这个 `clip-path` 规则会创建一个裁剪区域，该区域从元素的顶部开始，延伸到左侧的5%位置，并且覆盖元素的整个高度，最终结果是只有元素的左侧5%宽度的内容可见，其余部分被隐藏。

# 9、shadow 的 4 种高阶技巧讲解：复制自身、遮罩模拟、光效动画及阴影性能优化

## 技巧一：利用阴影复制自身图形

```css
    div {
      width: 80px;
      height: 80px;
      border: 1px solid #333;
      box-sizing: border-box;
      box-shadow: 80px 80px 0 0 #000;
    }
```

- `box-shadow: 80px 80px 0 0 #000;`：为`div`添加了一个阴影效果。这个阴影效果的具体参数为：水平偏移80像素，垂直偏移80像素，模糊距离0像素，扩散大小0像素，颜色为黑色（#000）。这样的设置实际上在`div`的右下角创建了一个正方形的“投影”，由于阴影的偏移量与`div`本身的尺寸相同，且没有模糊和扩散效果，这个阴影看起来就像是在元素的右下角叠加了一个黑色的正方形，营造出一种立体或特殊视觉效果的感觉。

# 10、filter：CSS 中的三种滤镜模式及其特殊性介绍

实现一个倒三角

```css
    div {
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-top: 100px solid #000;
    }
```

实现一个正三角

```css
    .triangle-down {
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 100px solid red;
    }
```

# 12、filter：比阴影更强大的 drop-shadow() 阴影技巧

实现一个右三角（div.triangle 20*40）

```css
    div.triangle {
      height: 0;
      width: 0;
      border-width: 20px 20px 20px 0;
      border-style: solid;
      border-color:
        transparent #ddd transparent transparent;
    }
```

# 13、filter：其他滤镜高阶技巧

## 网站置灰

```css
html {
    filter: grayscale(.9);
}
```

# 17、现代 CSS 伪类及伪元素

CSS 规范定义，伪元素通常使用 `::` 两个冒号进行表现，而伪类使用 `:` 单个冒号进行表示：

```css
// 伪元素使用两个冒号
#id::after{
 ...
}

// 伪类使用单个冒号
#id:hover{
 ...
}
```

当然，现代浏览器也都支持单个冒号表示的伪元素，譬如 `:before` 也可以正常工作。这是由于最早的 CSS2 规范，定义伪元素就是使用 `:` 单个冒号表示的。为了更加符合规范，建议大家一定要在使用伪元素和伪类的时候，注意区分使用单双冒号。

### 巧用 `inset` 关键字

第一个我认为非常实用的技巧，就在于 `inset` 属性。什么是 `inset` 属性？它的作用是什么？

别急，首先我们看这么一个场景，我们需要实现一个和元素一样大小的伪元素，代码通常是这样的：

```HTML
div {
    position: relative;
    width:120px;
    height: 64px;
}
div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
}
```

可以看到，几乎每次当你使用伪元素的时候，都需要借助 `position:absolute` 绝对定位加上 `top`、`left`、`right`、`bottom` 四个定位属性控制伪元素的定位。

此时，我们可以使用 `inset` 简化我们的代码：

```CSS
div {
    position: relative;
    width:120px;
    height: 64px;
}
div::before {
    content: "";
    position: absolute;
    inset: 0;
}
```

上述 `inset: 0` 就等同于 `top:0; left: 0; right: 0; bottom: 0`，可以有效地简化代码量。

[根据 MDN - inset](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Finset)：[CSS](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS) 属性 `inset` 为简写属性，对应于 `top`、`right`、`bottom` 和 `left` 属性。其与 `margin` 简写属性具有相同的多值语法。

# 18、transition：过渡技巧与细节，构建更强大的交互效果

# 20、animation：动画高阶技巧 - 分治、复用与合成

 CSS 变量

```css
@keyframes move {
    60%,
    100% {
        transform: translate(var(--dis));
    }
}
```

```css
li:nth-child(1) {
    --dis: 150px;
}
li:nth-child(2) {
    --dis: 120px;
}
li:nth-child(3) {
    --dis: 200px;
}
```

# 22、从 CSS 变量到 CSS @property，突破传统 CSS 限制

