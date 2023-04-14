# SVG.js

https://svgjs.dev/docs/2.7/

# HOME

## SVG.js

用于操作和动画 SVG 的轻量级库。

```js
// SVG.js
var draw = SVG('drawing')
  , rect = draw.rect(100, 100).fill('#f06')
```

上面这句代码在`div`中添加一了个<svg>标签。

```html
<div id="drawing">
    <svg width="100%" height="100%">
        <rect width="100" height="100" fill="#f06"></rect>
    </svg>
</div>
```

# Parents

## SVG.G

如果你想要将一组元素当作一个元素进行转换，则对元素进行分组会很有用。 一个组中的所有元素，保持它们相对于它们所属的组的位置。

**注意**：组没有自己的几何图形，它是从它们的内容继承而来的。 因此组不监听 `x`、`y`、`width`和`height`属性。 如果那是你要查找的内容，请改用 `nested()` svg 。

## SVG.Symbol

与`group`元素不同，`symbol` 元素是容器元素。 符号和组之间的唯一区别是不渲染符号。 因此 `symbol` 元素与 `use` 元素的结合是理想的：

```js
var symbol = draw.symbol()
symbol.rect(100, 100).fill('#f09')

var use  = draw.use(symbol).move(200, 200)
```

# Elements

SVG.Element 是包装 SVG.js 中所有元素（或相关节点）的基本原型。 SVG.Shape 添加了额外的细化级别。 可以采用填充和/或描边属性的每个元素。 最好在 SVG.Shape 上使用你自己的方法扩展元素，而不是在 SVG.Element 上。

## SVG.Line

### line.array()

`returns` **`SVG.PointArray`**

引用 `SVG.PointArray` 实例。 此方法更适合内部使用：

```js
polyline.array()
```

## SVG.Polygon

```js
var polygon = draw.polygon('0,0 100,50 50,100').fill('none').stroke({ width: 1 })
```

多边形字符串或数组与折线字符串完全相同。 无需关闭形状，因为第一个点和最后一个点将自动连接。

## SVG.Path

## SVG.Text

与 html 不同，svg 中的文本更难驯服。 无法创建流动文本，因此应手动输入换行符。 在 SVG.js 中，有两种创建文本元素的方法。

第一种也是最简单的方法是提供一串文本，用换行符分隔：

```js
var text = draw.text("Lorem ipsum dolor sit amet consectetur.\nCras sodales imperdiet auctor.")
```

这将自动创建一个文本块并在必要时插入换行符。

第二种方法会给你更多的控制权，但需要更多的代码：

```js
var text = draw.text(function(add) {
  add.tspan('Lorem ipsum dolor sit amet ').newLine()
  add.tspan('consectetur').fill('#f06')
  add.tspan('.')
  add.tspan('Cras sodales imperdiet auctor.').newLine().dx(20)
  add.tspan('Nunc ultrices lectus at erat').newLine()
  add.tspan('dictum pharetra elementum ante').newLine()
})
```

如果你想走另一条路并且根本不想添加 tspans，只是一行文本，你可以使用 `plain()` 方法代替：

```js
var text = draw.plain('Lorem ipsum dolor sit amet consectetur.')
```

这是 `SVG.Text` 实例上的 `plain` 方法的快捷方式，它根本不渲染换行符。

```js
var draw = SVG('drawing').size(500, 50)

var text = draw.text('I know that eggs do well to stay out of frying pans.')
text.move(20,20).font({ fill: '#f06', family: 'Inconsolata' })
```

## SVG.TextPath

svg 中的一个很好的特性是能够沿着路径运行文本：

## SVG.Tspan

tspan 元素仅在文本元素或其他 tspan 元素内可用。

## SVG.Image

创建图像如你所料：

```js
var image = draw.image('/path/to/image.jpg')
```

```js
var draw = SVG('drawing').size(500, 130)

var image = draw.image('https://cdn.img42.com/4b6f5e63ac50c95fe147052d8a4db676.jpeg')
image.size(100, 100).move(20, 20)
```

## SVG.Gradient

## SVG.Pattern

## SVG.Use

use 元素只是模拟另一个现有元素。 主元素上的任何更改都将反映在所有使用实例上。 use() 的用法非常简单：

```js
var rect = draw.rect(100, 100).fill('#f09')
var use  = draw.use(rect).move(200, 200)
```

在上面的示例中，两个矩形将出现在 svg 绘图上，即原始实例和 `use` 实例。 在某些情况下，你可能希望隐藏原始元素。 最好的方法是在 defs 节点中创建原始元素：

```js
var rect = draw.defs().rect(100, 100).fill('#f09')
var use  = draw.use(rect).move(200, 200)
```

这样，rect 元素就充当了一个库元素。 你可以编辑它，但它不会被渲染。

另一种方法是指向外部 SVG 文件，只需指定元素 `id` 和文件路径。

```js
var use  = draw.use('elementId', 'path/to/file.svg')
```

当你已经创建了复杂的图像时，这种方法很有用。
请注意，对于外部图像（在你的域之外），可能需要使用 XHR 加载文件。

## SVG.Marker

Markers can be added to every individual point of a `line`, `polyline`, `polygon` and `path`. There are three types of markers: `start`, `mid` and `end`. Where `start` represents the first point, `end` the last and `mid` every point in between.

```js
var draw = SVG('drawing')

var path = draw.path('M0 0 A50 50 0 0 1 50 50 A50 50 0 0 0 100 100')

path.fill('none').move(20, 20).stroke({ width: 1, color: '#ccc' })

path.marker('start', 10, 10, function(add) {
  add.circle(10).fill('#f06')
})
path.marker('mid', 10, 10, function(add) {
  add.rect(5, 10).cx(5).fill('#ccc')
})
path.marker('end', 20, 20, function(add) {
  add.circle(6).center(4, 5)
  add.circle(6).center(4, 15)
  add.circle(6).center(12, 10)

  this.fill('#0f9')
})
```

## SVG.Bare

对于 SVG.js 未描述的所有 SVG 元素，SVG.Bare 类派上用场。 此类直接从 SVG.Element 继承，并且可以在单独的命名空间中添加自定义方法，而不会污染主 SVG.Element 命名空间。 将其视为你的私人游乐场。

# Referencing

## By id

### SVG.get()

`returns` **`SVG.Element`** (or the most relevant subclass of `SVG.Element`)

如果你想通过 id 获取由 SVG.js 创建的元素，你可以使用 SVG.get() 方法：

```js
var element = SVG.get('my_element')

element.fill('#f06')
```

## 使用 CSS 选择器

### SVG.select()

`returns` **`SVG.Set`**

这将搜索文档中的所有 svg 元素并在 SVG.Set 的实例中返回它们：

```js
var elements = SVG.select('rect.my-class').fill('#f06')
```

此外，可以传递第二个参数来定义要搜索的父元素：

```js
var elements = SVG.select('rect.my-class', group).fill('#f06')
```

### element.select()

`returns` **`SVG.Set`**

与 SVG.select() 类似，也可以在子元素中选择元素：

```js
var elements = group.select('rect.my-class').fill('#f06')
```

该方法适用于所有继承自 SVG.Parent 的父类。

# Manipulating

## Attributes

## Positioning

例如，以下代码之所以有效，是因为每个元素都是通过设置原生属性来定位的：

```js
rect.attr({ x: 20, y: 60 })
circle.attr({ cx: 50, cy: 40 })
```

矩形将通过其左上角移动到新的坐标位置，而圆形将通过其中心点移动。然而，尝试以这种方式通过圆形的“角”或矩形的中心来移动它们将失败。以下代码行将被忽略，因为被设置的属性在元素上没有被原生使用。

```js
rect.attr({ cx: 20, cy: 60 })
circle.attr({ x: 50, y: 40 })
```

然而，下面详细介绍的定位方法对于所有元素类型都适用，无论被调用的属性是否属于该类型的原生属性。因此，与上面的代码不同，这些代码行可以正常工作：

```js
rect.cx(20).cy(60)
circle.x(50).y(40)
```

需要注意的是，这些方法仅适用于使用用户单位（无单位）的坐标。例如，如果一个元素的大小是通过百分比或其他单位来设置的，那么使用原生属性进行定位的方法可能仍然有效，但使用非原生属性进行定位的方法（无论是获取还是设置）可能会产生意外的结果。

### move()

将元素通过其左上角移动到给定的 x 和 y 位置：

```js
rect.move(200, 350)
```

### dmove()

将元素在 x 和 y 方向上相对于其当前位置进行平移：

```js
rect.dmove(10, 30)
```

## Styles

### hide()

隐藏元素：

```js
element.hide()
```

### show()

显示（取消隐藏）元素：

```js
element.show()
```

## Class Names

## Data

`data()` 方法允许你将任意对象、字符串和数字绑定到 SVG 元素。

## Memory

## Document Tree

## Arranging

你可以使用以下方法在其父 SVG 文档中排列元素。

## Geometry

### point()

`returns` **[`SVG.Point`](https://svgjs.dev/classes/#svg-point)**

将点从屏幕坐标转换为元素坐标系。

```js
// e is some mouseevent
var point = path.point(e.screenX, e.screenY) // {x, y}
```

### inside()

`returns` **`boolean`**

要检查给定点是否在元素的边界框内，你可以使用 inside() 方法：

```js
var rect = draw.rect(100, 100).move(50, 50)

rect.inside(25, 30) //-> returns false
rect.inside(60, 70) //-> returns true
```

**注意**：x 和 y 位置是根据元素的相对位置进行测试的。 不考虑父元素上的任何偏移量。

# Boxes

## SVG.Box

所有 `SVG.*Box` 实例都继承自 `SVG.Box`。

`所有 SVG.*Box 原型都有一个漂亮的小功能。 使用 merge()，两个 SVG.*Box 实例可以合并为一个新实例，基本上是两个原始框的边界框。` 例如：

## SVG.ViewBox

viewBox 指定用户空间中的一个矩形，该矩形应映射到给定元素建立的视口边界，同时考虑属性 preserveAspectRatio。

## SVG.BBox

## SVG.RBox

代表矩形框。 它包装了原生 `getBoundingClientRect()` 方法。 它与 BBox 不同，因为它计算元素视觉表示周围的边界框，包括所有转换。

# 动画

动画元素与使用 attr() 方法操作元素非常相似。 唯一的区别是你必须包含 animate() 方法。

请注意，animate() 方法不会返回目标元素，而是返回一个 SVG.FX 的实例，该实例将采用以下方法：

## 控制

## 定时

## 回调

# 事件

## 基本事件

## 事件监听器

## 其他元素

## 自定义事件

你甚至可以使用自己的事件。

只需为你的事件添加一个事件监听器：

# Classes

SVG.js 添加了很多与 SVG 规范无关的功能。 大多数附加功能都是 OO 特性的一部分，但也有其他有用的实用程序。

# 导入/导出 SVG

## svg() *as getter*

`returns` **`string`**

可以使用 svg() 方法导出完整生成的 SVG 或其中的一部分：

```js
draw.svg()
```

导出也适用于单个元素：

```js
var rect = draw.rect()
var svg  = rect.svg()
```

## svg() *as setter*

`returns` **`itself`**

通过将 svg 字符串作为第一个参数传递，使用相同的方法完成导入：

```js
draw.svg('<g><rect width="100" height="50" fill="#f06"></rect></g>')
```

导入适用于从 SVG.Parent 继承的任何元素，基本上是可以包含其他元素的每个元素。

# Extending

由于 SVG.js 的面向对象特性，对象/原型可以在任何级别上扩展。 invent() 和 extend() 方法提供了一种方便的方法来实现你自己的功能。

## SVG.invent()

借助 SVG.invent 函数，使用 SVG.js 创建你自己的自定义元素是小菜一碟。 为了这个例子，让我们“发明”一个形状。 我们想要一个圆角矩形，它总是与元素的高度成比例。 新形状位于 SVG 命名空间中，称为 Rounded。 以下是我们如何实现这一目标。

```js
SVG.Rounded = SVG.invent({
  // Define the type of element that should be created
  create: 'rect'

  // Specify from which existing class this shape inherits
, inherit: SVG.Shape

  // Add custom methods to invented shape
, extend: {
    // Create method to proportionally scale the rounded corners
    size: function(width, height) {
      return this.attr({
        width:  width
      , height: height
      , rx:     height / 5
      , ry:     height / 5
      })
    }
  }

  // Add method to parent elements
, construct: {
    // Create a rounded element
    rounded: function(width, height) {
      return this.put(new SVG.Rounded).size(width, height)
    }

  }
})
```

要在绘图中创建元素：

```js
var rounded = draw.rounded(200, 100)
```

就是这样，本发明现在可以使用了！

### 使用说明

需要强调的是，在传递给 SVG.invent() 的配置对象中：

- construct 不提供构造函数，而是提供可能调用构造函数的方法；
- create 为你正在定义的类型指定构造函数，并且与 Object.create() 不同。

当定义专门的 svg 元素（如上例中的 SVG.Rounded）时，create 指定的函数需要完成将元素添加到 svg 文档的 DOM 并将 DOM 节点连接到 SVG.js 接口的所有工作 . 当 create 的值是标识元素类型的字符串时，所有这些都会自动完成。 如果需要，请参阅源代码以了解如何明确执行此操作。

虽然默认值适用于为 SVG.js 框架创建 svg 元素，但 SVG.invent() 可以用作在 Javascript 中定义类型的通用函数。 当以这种更通用的方式使用时，作为 create 值提供的函数应编写为普通的 JS 构造函数。 （实际上，该函数只是作为新定义类型的构造函数返回。）

Svg.js 使用 SVG.invent() 函数来创建所有内部元素。 查看源代码将显示如何以各种方式使用此功能。

## SVG.extend()

SVG.js 具有模块化结构。 在不同级别添加自己的方法非常容易。 假设我们想为所有形状类型添加一个方法，那么我们会将我们的方法添加到 SVG.Shape：

```js
SVG.extend(SVG.Shape, {
  paintRed: function() {
    return this.fill('red')
  }
})
```

现在所有形状都可以使用 paintRed() 方法。 假设我们想让椭圆上的 paintRed() 方法应用稍微不同的颜色：

```js
SVG.extend(SVG.Ellipse, {
  paintRed: function() {
    return this.fill('orangered')
  }
})
```

SVG.Ellipse 的完整继承栈是：

SVG.Element > SVG.Shape > SVG.Ellipse

可以使用以下方法扩展 SVG 文档：

```js
SVG.extend(SVG.Doc, {
  paintAllPink: function() {
    this.each(function() {
      this.fill('pink')
    })
  }
})
```

你还可以一次扩展多个元素：

```js
SVG.extend(SVG.Ellipse, SVG.Path, SVG.Polygon, {
  paintRed: function() {
    return this.fill('orangered')
  }
})
```

# 插件

这是 SVG.js 可用的所有插件的列表。 如果你写了一个，请告诉我们！

- [svg.colorat.js](https://svgjs.dev/docs/2.7/plugins/svg-colorat-js)

- [svg.connectable.js](https://svgjs.dev/docs/2.7/plugins/svg-connectable-js)

- [svg.declarative.js](https://svgjs.dev/docs/2.7/plugins/svg-declarative-js)

- [svg.draggable.js](https://svgjs.dev/docs/2.7/plugins/svg-draggable-js)

  **Events**

   **Cancelable Events**

   这里是否可以用于限制中间棱只能水平移动？

  **Custom Drag Behavior**

   Constraints

  这里是否可以用于限制中间棱只能在矩形框范围内移动？

  这里是否可以用于限制VRU指向线固定一点，另一点可以旋转？

- [svg.draw.js](https://svgjs.dev/docs/2.7/plugins/svg-draw-js)

- [svg.easing.js](https://svgjs.dev/docs/2.7/plugins/svg-easing-js)

- [svg.filter.js](https://svgjs.dev/docs/2.7/plugins/svg-filter-js)
 一个用于 svg.js 添加滤镜功能的插件。
- [svg.foreignobject.js](https://svgjs.dev/docs/2.7/plugins/svg-foreignobject-js)

- [svg.intersections.js](https://svgjs.dev/docs/2.7/plugins/svg-intersections-js)

- [svg.math.js](https://svgjs.dev/docs/2.7/plugins/svg-math-js)

- [svg.panzoom.js](https://svgjs.dev/docs/2.7/plugins/svg-panzoom-js)

- [svg.path.js](https://svgjs.dev/docs/2.7/plugins/svg-path-js)

- [svg.pathmorphing.js](https://svgjs.dev/docs/2.7/plugins/svg-pathmorphing-js)

- [svg.resize.js](https://svgjs.dev/docs/2.7/plugins/svg-resize-js)

    svg.resize.js 用鼠标调整元素的大小。 （cvat中使用该插件拖动调整形状）

- [svg.screenbbox.js](https://svgjs.dev/docs/2.7/plugins/svg-screenbbox-js)

- [svg.select.js](https://svgjs.dev/docs/2.7/plugins/svg-select-js)

    svg.js 的扩展，允许用鼠标选择元素

- [svg.shapes.js](https://svgjs.dev/docs/2.7/plugins/svg-shapes-js)

- [svg.textmorph.js](https://svgjs.dev/docs/2.7/plugins/svg-textmorph-js)

- [svg.topath.js](https://svgjs.dev/docs/2.7/plugins/svg-topath-js)

- [svg.topoly.js](https://svgjs.dev/docs/2.7/plugins/svg-topoly-js)

    svg.topoly.js 将路径转换为多边形或折线。