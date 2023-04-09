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