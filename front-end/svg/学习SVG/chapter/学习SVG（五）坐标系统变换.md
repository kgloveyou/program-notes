一起养成写作习惯！这是我参与「掘金日新计划 · 4 月更文挑战」的第5天，[点击查看活动详情](https://juejin.cn/post/7080800226365145118 "https://juejin.cn/post/7080800226365145118")。

## 简介
SVG中自带`transform`属性，控制图形的坐标变换。它与`css3`中的`transform`是有区别的，`css3`中变换是以元素的中心点变换，SVG中中的`transform`是相对于画布的左上角计算的。

## translate 位移
- 用于设置元素的位移变换。
- 参数格式 `translate(tx[ ty])` 参数值之间使用逗号`,`或者直接空格分隔，但是不能包含单位。
```js
    <svg width="400" height="400">
      <circle cx="50" cy="50" r="50" fill="green" stroke="none" transform="translate(100 100)"></circle>
    </svg>
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c35171b215640978579d41194f3b2e9~tplv-k3u1fbpfcp-watermark.image?)

- 位移也是支持多声明累加的。
```html
    <svg width="400" height="400">
      <circle
        cx="50"
        cy="50"
        r="50"
        fill="green"
        stroke="none"
        transform="translate(100 100) translate(20 100)"
      ></circle>
```
- 这里相当于`translate(120 200)`。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e90f0a4f129f4f28b52b22d6b9b6fd3c~tplv-k3u1fbpfcp-watermark.image?)

## rotate 旋转
- 用于设置元素的旋转变换。需要注意，旋转的是整个坐标不是元素本身，其中心点是画布的左上角。
- 参数格式`rotate(angle [ x y])`。`angle`代表旋转角度，`[ x y]`可选参数设置旋转中心点，参数都不能包含单位。

```html
  <rect x="20" y="30" width="100" height="50" fill="green" transform="rotate(45)" />
  <rect x="20" y="30" width="100" height="50" fill="black" transform="rotate(45 60 40)" />
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6717c815c0544bca85855c20008ec708~tplv-k3u1fbpfcp-watermark.image?)

## scale缩放
- 缩放坐标系统。
- 参数格式`scale(sx[, sy])`。 `sx`表示横坐标缩放比例，`sy`表示纵坐标缩放比例，`sy`是可缺省的，如果缺失，表示使用和`sx`一样的值，也就是等比例缩放。
```html
<rect x="100" y="50" width="100" height="50" fill="green" transform="scale(2,1.5)" />
```
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b3c0f096047462d8ea996217c3917c7~tplv-k3u1fbpfcp-watermark.image?)

- 因为是缩放坐标系统，元素的位置发生了变化，想以元素中心缩放就需要特殊处理。
```html
      <rect
        x="100"
        y="50"
        width="100"
        height="50"
        fill="green"
        transform="translate(150 75) scale(2,1.5) translate(-150 -75)"
      />
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11708361a8f6443ab4b5191a3145776c~tplv-k3u1fbpfcp-watermark.image?)

## skew斜切
- 坐标系统斜切变换。只支持X轴和Y轴分开设置，`skewX`或者`skewY`。
- 需要注意，多声明累加在一起的斜切变换是不一样的，因为是以画布的左上角为圆心的。
```html
<rect x="20" y="30" width="100" height="50" fill="green" transform="skewX(45)" />
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f39ae2364cd41d7882c59336a010a4f~tplv-k3u1fbpfcp-watermark.image?)

## matrix 矩阵变换
- 用于设置元素的，平移、旋转、缩放等。
- [理解CSS3 transform中的Matrix(矩阵)](https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%e7%9f%a9%e9%98%b5/)，其原理和`css3`中矩阵一样。
```html
<rect x="20" y="30" width="100" height="50" fill="green" transform="matrix(1, 0, 0, 1, 30, 30)" />
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4064b6e2864e4533912a8244f1c7b6ee~tplv-k3u1fbpfcp-watermark.image?)
- 设置位置偏移。

## 总结
本节简单的介绍SVG中的坐标系统变换。实际SVG应用中，可能是多个变换参杂在一起，所以我们需要先明白简单的变换，才能去做好复杂变换的开发。

