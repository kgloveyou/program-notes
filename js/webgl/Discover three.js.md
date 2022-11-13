# Discover three.js

https://discoverthreejs.com/book/

## GitHub 上的 three.js - 魔法出现的地方

[Migration Guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide)

https://discoverthreejs.com/zh/book/first-steps/app-structure/

# Three.js 应用的结构

***index.html****: 引用* ***main.js***


```html
<script type="module" src="./src/main.js"></script>
```

`module`属性还有另一个优点：浏览器将自动 *推迟* 运行此文件，直到 HTML 被解析。这将防止由于在浏览器读取之前尝试访问 HTML 元素而导致的错误（浏览器从上到下读取 HTML）。

# 你的第一个 three.js 场景：你好，立方体！

## 实时 3D 应用程序组件

### 场景：小宇宙

场景`scene`定义了一个名为**World Space（世界空间）**的坐标系，它是我们在 three.js 中处理可见对象时的主要参考框架。

### 相机：指向小宇宙的望远镜

### 渲染器：具有非凡才能和速度的艺术家

## 我们的第一个可见对象：网格 Mesh

### 创建材质

### 你（通常）需要一盏灯才能看到

如果我们现在使用除`MeshBasicMaterial`之外的几乎任何其他材质类型，我们将无法看到任何东西，因为场景完全处于黑暗中。**就像在现实世界中一样，我们通常需要光线才能看到场景中的事物**。`MeshBasicMaterial`是该规则的一个例外。

对于 three.js 的新手来说，这是一个常见的混淆点，所以如果您看不到任何东西，请确保您已经在场景中添加了一些灯光，或者暂时将所有材质切换为`MeshBasicMaterial`. 我们将在 [1.4：基于物理的渲染和照明](https://discoverthreejs.com/zh/book/first-steps/physically-based-rendering/)中为场景添加一些灯光。

# Introducing the World App

https://discoverthreejs.com/zh/book/first-steps/world-app/