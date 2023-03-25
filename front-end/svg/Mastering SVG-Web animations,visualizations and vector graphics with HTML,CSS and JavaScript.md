# Mastering SVG: Web animations,visualizations and vector graphics with HTML,CSS and JavaScript

# 9、Helper Libraries Snap.svg and SVG.js

## 使用 SVG.js

### 使用 SVG.js 的动画

```bash
npm install svg.easing.js  
```

### SVG.js utilities  

下一个实用方法允许你调整 SVG 元素的堆栈。 与具有显式堆叠顺序 (z-index) 的绝对定位 HTML 元素不同，SVG 元素根据它们在 DOM 中的外观进行分层。 DOM 中较晚出现的元素似乎位于 DOM 中较早出现的元素之上。

### SVG.js 事件

  

在这里使用 SVG.js 的一个好处是，你始终可以通过在添加每个圆圈后调用 `circle.front()` 来确保可点击的圆圈位于堆栈的顶部。

### 使用 SVG.js 自定义数据可视化

