# Discover three.js

https://discoverthreejs.com/book/

https://discoverthreejs.com/zh/book/introduction/

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

场景`scene`定义了一个名为**World Space（世界空间）**的坐标系，它是我们在 three.js 中处理可见对象时的主要参考框架。世界空间是一个 [3D 笛卡尔坐标系](https://mathinsight.org/cartesian_coordinates)。我们将在 [1.5：变换和坐标系中](https://discoverthreejs.com/zh/book/first-steps/transformations/#coordinate-systems)更详细地探讨这个怎么理解以及如何使用世界空间。

场景的中心是点(0,0,0)，也称为坐标系的**原点**。每当我们创建一个新对象并将其添加到我们的场景中时，它将被放置在原点，并且每当我们移动它时，我们说的都是在这个坐标系中移动它。

当我们将对象添加到场景中时，它们会被放入 [**场景图中**](http://what-when-how.com/advanced-methods-in-computer-graphics/scene-graphs-advanced-methods-in-computer-graphics-part-1/)，这是一个树形结构，场景位于顶部。

### 相机：指向小宇宙的望远镜

### 渲染器：具有非凡才能和速度的艺术家

## 我们的第一个可见对象：网格 Mesh

### 创建材质

### 你（通常）需要一盏灯才能看到

如果我们现在使用除`MeshBasicMaterial`之外的几乎任何其他材质类型，我们将无法看到任何东西，因为场景完全处于黑暗中。**就像在现实世界中一样，我们通常需要光线才能看到场景中的事物**。`MeshBasicMaterial`是该规则的一个例外。

对于 three.js 的新手来说，这是一个常见的混淆点，所以如果您看不到任何东西，请确保您已经在场景中添加了一些灯光，或者暂时将所有材质切换为`MeshBasicMaterial`. 我们将在 [1.4：基于物理的渲染和照明](https://discoverthreejs.com/zh/book/first-steps/physically-based-rendering/)中为场景添加一些灯光。

## 创建渲染器

### 设置渲染器的大小

我们快到完成了！接下来，我们需要使用容器的宽度和高度告诉渲染器我们的场景大小。

***main.js****: 设置渲染器的大小*

```js
// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);
```

如果你还记得，我们使用 CSS 使容器占据了整个浏览器窗口的大小（如 [上一章](https://discoverthreejs.com/zh/book/first-steps/app-structure/#adding-a-three-js-scene-to-the-page)所述），因此场景也将占据整个窗口。

> 我们已经将渲染器的大小设置为容器的宽度和高度，*就像现在一样*。如果我们调整浏览器窗口的大小，窗口的宽度和高度会改变，但画布的大小不会改变。我们将在 [1.6：让我们的场景具有响应性（以及处理 Jaggies）](https://discoverthreejs.com/zh/book/first-steps/responsive-design/) 中解决这个问题。

### 设置设备像素比（DPR）

我们还需要告诉渲染器设备屏幕的像素比是多少。**这是防止 HiDPI 显示器模糊所必需的** （也称为视网膜显示器）。

***main.js****: 设置像素比例*

```js
// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);
```

我们不会在这里讨论技术细节，但你不能忘记设置它，否则你的场景在你测试它的笔记本电脑上可能看起来很棒，但在带有视网膜显示器的移动设备上会模糊。与往常一样， [附录有更多细节](https://discoverthreejs.com/zh/book/appendix/dom-api-reference/#the-virtual-viewport)。

### 将canvas元素添加到我们的页面



# Introducing the World App

https://discoverthreejs.com/zh/book/first-steps/world-app/

# 基于物理的渲染和照明

## 创建物理大小的场景

### three.js中的大小单位是米

- 我们之前创建的2×2×2的立方体每边长为两米。
- `camera.far = 100`意味着我们可以看到一百米的距离。
- `camera.near = 0.1`意味着距离相机不到十厘米的物体将不可见。

**使用米为单位是一种约定，而不是规则。如果您不遵循它，那么除了物理上精确的照明之外的一切都仍然有效。** 事实上，在某些情况下使用不同的比例是有意义的。例如，如果您正在构建一个大规模的空间模拟，您可能会决定使用 1单位=1000公里。**但是，如果您想要物理上准确的照明，那么您必须使用以下公式将场景构建到真实世界的规模：**

> 1单位=1米

如果您引入由另一位艺术家制作的以英尺、英寸、厘米或弗隆为单位的模型，您应该将它们重新缩放为米。 [我们将在下一章向您展示如何缩放对象](https://discoverthreejs.com/zh/book/first-steps/transformations/)。

## Three.js 中的光照

如果你在一个黑暗的房间里打开一个灯泡，那个房间里的物体会以两种方式接收到光：

1. **直接照明**：直接来自灯泡并撞击物体的光线。
2. **间接照明**：光线在击中物体之前已经从墙壁和房间内的其他物体反弹，每次反弹都会改变颜色并失去强度。

与这些相匹配，three.js 中的灯光类分为两种类型：

1. **直接光照**，模拟直接光照。
2. **环境光**，这是 *一种* 廉价且可信的间接照明方式。

我们可以轻松模拟直接照明。直接光线从光源出来并沿直线继续，直到它们击中或不击中物体。然而，间接照明更难模拟，因为这样做需要计算从场景中所有表面永远反射的无限数量的光线。没有足够强大的计算机来做到这一点，即使我们限制自己仅计算几千条光线，每条光线只产生几次反弹（ **[光线追踪](https://en.wikipedia.org/wiki/Ray_tracing_(graphics))** )，实时计算通常仍然需要很长时间。因此，如果我们想要场景中的真实光照，我们需要某种方式来伪造间接光照。在 three.js 中有几种技术可以做到这一点，其中环境光就是其中之一。其他的几种技术分别是基于图像的照明 (IBL) 和光探测器，我们将在本书后面看到。

### 直接照明[#](https://discoverthreejs.com/zh/book/first-steps/physically-based-rendering/#直接照明)

在本章中，我们将添加`DirectionalLight`，它模拟来自太阳或另一个非常明亮的遥远光源的光。我们将在本节稍后部分回到 [环境照明](https://discoverthreejs.com/zh/book/first-steps/ambient-lighting/)。three.js 核心中总共有四种直接光源类型可用，每一种都模拟一个常见的现实世界光源：

- **`DirectionalLight` => 阳光**
- **`PointLight` => 灯泡**
- **`RectAreaLight` => 条形照明或明亮的窗户**
- **`SpotLight` => 聚光灯**

### 默认情况下禁用阴影[#](https://discoverthreejs.com/zh/book/first-steps/physically-based-rendering/#默认情况下禁用阴影)

即使我们使用 PBR，现实世界和 three.js 之间的一个区别是默认情况下对象不会阻挡光线。光路径中的每个物体都会收到照明，即使路上有一堵墙。落在物体上的光会照亮它，但也会直接穿过并照亮后面的物体。物理正确性就这么多！

我们可以逐个对象的、逐个光照的手动启用阴影。但是，阴影很昂贵，因此我们通常只为一盏灯或两盏灯启用阴影，尤其是当我们的场景需要在移动设备上工作时。只有直接光类型可以投射阴影，环境光不能。

# 变换、坐标系和场景图

一路上，我们会遇到几个数学对象，例如**场景图**，一种用于描述构成我们场景的对象层次结构的结构，**向量**，用于描述3D空间中的位置（以及许多其他事物） ，还有不少于两种描述旋转的方式：欧拉角**Euler angles**和四元数**quaternions**。我们将通过向您介绍转换矩阵**transformation matrices**来结束本章，它用于存储对象的完整转换状态。

> ### 你好，线性代数（很高兴认识你！）[#](https://discoverthreejs.com/zh/book/first-steps/transformations/#你好线性代数很高兴认识你)
>
> 我们即将在本章中遇到的变换、坐标系和大多数其他数学术语都来自**线性代数**。你只需要高中水平就可以读完这本书，但如果你的代数技能有点生疏，或者即使你以前从未听说过坐标系，也不用担心。使用three.js时，您只需很少的数学知识就可以过关，并且three.js核心内置了一系列数学帮助方法，因此我们很少需要自己进行任何计算。
>
> 如果在某个时候你想更深入地研究这个主题， [可汗学院](https://www.khanacademy.org/)是网络上学习数学及其课程的最佳资源之一，尤其是 [线性代数课程](https://www.khanacademy.org/math/linear-algebra)，拥有通读这本书所需的一切。如果您已经熟悉此主题并希望更深入地了解WebGL中使用的坐标系的技术概述，请查看 [在learnopengl.com上的优秀文章](https://learnopengl.com/Getting-started/Coordinate-Systems)。

## 平移、旋转和缩放：三个基本转换

## 坐标系：世界空间和局部空间

### 世界空间

<img src="https://discoverthreejs.com/images/first-steps/coordinate_system.svg" alt="*我们的场景定义了世界空间*" style="zoom:50%;" />

我们`scene`定义了世界空间坐标系，系统的中心是`X`、`Y`和`Z`轴的交点。

还记得几章前， [当我们第一次介绍这个`Scene`类时](https://discoverthreejs.com/zh/book/first-steps/first-scene/#the-scene)，我们称它为“小宇宙”吗？ 这个微小的宇宙就是世界空间。

当我们在场景中布置对象时——无论我们是在房间中放置家具、在森林中放置树木还是在战场上狂暴的机器人——我们在屏幕上看到的就是每个对象在世界空间中的位置。

**当我们直接将一个对象添加到场景中，然后平移、旋转或缩放它时，该对象将相对于世界空间移动——即相对于场景的中心。**

<img src="https://discoverthreejs.com/images/first-steps/world_space_scene_graph.svg" style="zoom: 67%;" />

*添加到场景中的对象存在于世界空间中*

```js
// add a cube to our scene
scene.add(cube);

// move the cube relative to world space
cube.position.x = 5;
```

这两个语句是等价的，只要对象是场景的直接子对象：

1. 相对于世界空间变换对象。
2. 在场景中移动一个对象。

每当我们尝试在3D中可视化一些棘手的东西时，降低一个维度并考虑2D类比可能会很有用。所以，让我们考虑一个棋盘。当我们安排棋子开始新游戏时，我们将它们放置在棋盘上的特定位置。这意味着棋盘是场景，棋子是我们放置在场景中的对象。

### 局部空间

就像棋盘上的棋子一样，**我们可以添加到场景中的每个对象也都有一个局部坐标系**，并且在这个局部坐标系中描述了对象的形状（几何形状）。当我们创建网格或灯光时，我们还创建了一个新的局部坐标系，网格或灯光位于其中心。这个局部坐标系有*X*、*Y*和*Z*轴，就像世界空间一样。对象的局部坐标系称为**局部空间**（或有时称为**对象空间**）。

当我们创建一个2×2×2`BoxBufferGeometry`，然后使用几何体创建网格，几何体的大小在 *网格局部空间中* 是每边两个单位：

*几何体在网格的局部空间中的描述*

```js
const geometry = new BoxBufferGeometry(2, 2, 2);

const mesh = new Mesh(geometry, material);
```

正如我们将在下面看到的，我们可以使用`.scale`拉伸或收缩网格，然后在我们的屏幕上绘制的网格大小会发生变化。但是，当我们缩放网格时，几何体的大小不会改变。当渲染器来渲染网格时，它会看到它已经被缩放，然后以不同的大小绘制网格。

### 每个对象都有一个坐标系

回顾一下：顶级场景定义了世界空间，而其他每个对象都定义了自己的局部空间。

```js
// creating the scene creates the world space coordinate system
const scene = new Scene();

// mesh A has its own local coordinate system
const meshA = new Mesh();

// mesh B also has its own local coordinate system
const meshB = new Mesh();
```

通过以上三行代码，我们创建了三个坐标系。这三个坐标系在数学上没有区别。我们可以在世界空间中进行的任何数学运算都将在任何对象的局部空间中以相同的方式进行。

很容易将坐标系视为大而复杂的事物，但是，在3D空间中工作时，您会发现周围有很多坐标系。每个对象至少有一个，有些有几个。渲染场景涉及另一整套坐标系，即将对象从3D世界空间转换为在屏幕的平面2D表面上看起来不错的东西。每个纹理甚至都有一个2D坐标系。最后，它们并没有那么复杂，而且创建起来非常容易。

## 使用场景图

使用每个对象的`.add`方法`.remove`方法，我们可以创建和操作场景图。

![场景图是一系列嵌入式<br> 坐标系，顶部有世界空间](https://discoverthreejs.com/images/first-steps/local_space_scene_graph.svg)
场景图是一系列嵌入式坐标系，顶部有世界空间

当我们使用`scene.add`向场景添加对象时，我们将这个对象嵌入到场景的坐标系世界空间中。当我们移动对象时，它将相对于世界空间（或等效地，相对于场景）移动。

当我们将一个对象添加到场景图中更深的另一个对象时，我们就将子对象嵌入到了父对象的本地空间中。当我们移动子对象时，它会相对于父对象的坐标系移动。坐标系像俄罗斯娃娃一样相互嵌套。

让我们看一些代码。首先，我们将添加一个对象*A*作为场景的子对象：

*添加对象\*A*到场景中*

```js
scene.add(meshA);
```

现在，`scene`是*A*的父对象，或等效地，*A*是`scene`的子对象。接下来我们平移*A*对象：

*在世界空间内移动\*A**

```js
meshA.position.x = 5;
```

现在，*A*对象已沿世界空间内的*X*轴正向平移了五个单位。**每当我们变换一个对象时，我们都是相对于它的父坐标系进行的**。接下来，让我们看看当我们添加第二个对象*B*时会发生什么，作为*A*的一个子对象：

*添加\*B*对象到\*A*对象中*

```js
meshA.add(meshB);
```

*A*还是场景的子对象，所以我们有关系*S**c**e**n**e*⟶*A*⟶*B*。 所以，*A*是场景的子对象，然后*B*是*A*的子对象。 或者，等效地，*A*对象现在生活在世界空间，*B*现在住在*A*的局部空间。当我们移动*A*对象时，它将在世界空间中移动，当我们移动*B*时, 它会在*A*的局部空间中移动。

接下来我们平移*B*：

*在\*A*对象的局部空间移动\*B*对象*

```js
meshB.position.x = 3;
```

你认为*B*对象最终会停在哪呢？

### 我们看到的是世界空间

当我们调用`.render`时，渲染器计算每个对象的世界空间位置。为此，它从场景图的底部开始并向上移动，结合每个父子节点的变换，计算每个对象相对于世界空间的最终位置。**我们最终在屏幕上看到的是世界空间**。在这里，我们将手动计算*A*和*B*。 请记住，每个对象最开始的位置都是相对于它的父对象的中心(0,0,0)。

```js
// A starts at (0,0,0) in world space
scene.add(meshA);

// B starts at (0,0,0) in A's local space
meshA.add(meshB);

meshA.position.x = 5;

meshB.position.x = 3;
```

计算*A*的位置很简单，因为它是场景的直接子元素。我们沿着*X*轴的右侧平移了*A*五个单位，所以它的最终位置是*x*=5,*y*=0,*z*=0， 或者(5,0,0)。

当我们平移*A*时，它的局部坐标系也随之移动，我们在计算*B*的世界空间位置时必须考虑到这一点。因为，*B*是*A*的子对象，这意味着它现在相对于世界空间在(5,0,0)的位置。接下来，我们相对于*A*沿着*X*轴平移了*B*三个单位, 所以最终*B*在*X*轴的位置是5+3=8。 最终*B*在世界空间的位置是：(8,0,0)。

### 在坐标系之间移动对象[#](https://discoverthreejs.com/zh/book/first-steps/transformations/#在坐标系之间移动对象)

如果我们将一个对象从一个坐标系移动到另一个坐标系会发生什么？换句话说，如果我们拿到对象*B*，然后在不改变它的`.position`的情况下，把它从*A*对象中移除并直接添加到场景中，会发生什么？我们可以仅使用一行代码做到这一点：

*添加网格\*B*到场景中，并删除任何以前它的父对象*

```js
scene.add(meshB);
```

一个对象只能有一个父对象，因此任何先前*B*的父对象（在这种情况下，网格*A*）都会被移除。

以下陈述仍然成立：***B\* \*在其父坐标系内\* 已沿\*X\*轴正方向平移三个单位。** 然而，*B*的父对象现在是场景而不是*A*对象，所以现在我们必须重新计算*B*在世界空间而不是*A*的局部空间，它现在的位置应该是(3,0,0)。

这就是坐标系。在本章的其余部分，我们将深入了解三个基本变换中的每一个：平移、旋转和缩放。

## 我们的最后一个转换：旋转

与平移或缩放相比，旋转需要更加小心。这有几个原因，但主要是**旋转顺序很重要**。如果我们在*X*轴、*Y*轴和*Z*轴平移或缩放，哪个轴先设置并不重要。以下三个平移方法最终得到的结果是一样的：

1. 平移*X*轴，然后*Y*轴，最后是*Z*轴。
2. 平移*Y*轴，然后*X*轴，最后是*Z*轴。
3. 平移*Z*轴，然后*X*轴，最后是*Y*轴。

下面的三种缩放操作最终结果也是一样的：

1. 缩放*X*轴，然后*Y*轴，最后是*Z*轴。
2. 缩放*Y*轴，然后*X*轴，最后是*Z*轴。
3. 缩放*Z*轴，然后*X*轴，最后是*Y*轴。

但是，这三个旋转 *可能* 不会给出相同的结果：

1. 旋转*X*轴，然后*Y*轴，最后是*Z*轴。
2. 旋转*Y*轴，然后*X*轴，最后是*Z*轴。
3. 旋转*Z*轴，然后*X*轴，最后是*Y*轴。

结果，我们用于`.position`和`.scale`的不起眼的`Vector3`类不足以存储旋转数据。相反，three.js不是使用一个，而是用 *两个* 数学类用于存储旋转数据。我们将在这里查看到更详细的内容： [欧拉角](https://en.wikipedia.org/wiki/Euler_angles)。幸运的是，它与`Vector3`类相似。

### 表示旋转的类：`Euler`类[#](https://discoverthreejs.com/zh/book/first-steps/transformations/#表示旋转的类euler类)

欧拉角在three.js中使用类 [`Euler`](https://threejs.org/docs/#api/en/math/Euler)表示 。与`.position`和`.scale`一样，当我们创建一个新的场景对象时，会自动创建一个`Euler`实例并为其赋予默认值。

*对象的旋转存储为`Euler`角*

```js
// when we create a mesh...
const mesh = new Mesh();

// ... internally, three.js creates an Euler for us:
mesh.rotation = new Euler();
```

与`Vector3`一样，有`.x`、`.y`和`.z`属性，以及`.set`方法：

*该`Euler`类似于`Vector3`类*

```js
mesh.rotation.x = 2;
mesh.rotation.y = 2;
mesh.rotation.z = 2;

mesh.rotation.set(2, 2, 2);
```

同样的，我们可以自己创建`Euler`实例：

*创建一个`Euler`实例*

```js
import { Euler } from 'three';

const euler = new Euler(1, 2, 3);
```

与`Vector3`一样，我们可以省略参数以使用默认值，同样，所有轴的默认值为零：

*`Euler`类: 默认值*

```js
const euler = new Euler();

euler.x; // 0
euler.y; // 0
euler.z; // 0
```

#### 欧拉旋转顺序[#](https://discoverthreejs.com/zh/book/first-steps/transformations/#欧拉旋转顺序)

默认情况下，three.js将在对象的局部空间中围绕*X*轴，然后围绕*Y*轴，最后围绕*Z*轴旋转。我们可以使用 [`Euler.order`属性](https://threejs.org/docs/#api/en/math/Euler.order)来改变它。默认顺序称为“XYZ”，但也可以使用“YZX”、“ZXY”、“XZY”、“YXZ”和“ZYX”。

我们不会在这里进一步讨论旋转顺序。通常，您需要更改顺序的唯一时候是在处理来自另一个应用程序的旋转数据时。即便如此，这通常也是由three.js加载器处理。现在，如果您愿意，可以简单地将`Euler`视为`Vector3`. 在您开始创建动画或执行涉及旋转的复杂数学运算之前，您不太可能遇到任何问题。

# 使我们的场景具有响应性（以及处理锯齿）

# 动画循环

## 用three.js创建一个动画循环

### 使用`.setAnimationLoop`创建循环

现在，一切都设置好了，我们可以创建循环了。正如我们上面提到的，我们不需要担心创建动画循环的技术细节，因为three.js提供了一个为我们做所有事情的方法： [`WebGLRenderer.setAnimationLoop`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setAnimationLoop)。

*使用`.setAnimationLoop`创建循环*

```js
import { WebGLRenderer } from 'three';

const renderer = new WebGLRenderer();

// start the loop
renderer.setAnimationLoop(() => {
renderer.render(scene, camera);
});
```

这将一遍又一遍地调用`renderer.render`以生成帧流。我们可以通过传递`null`作为回调来取消正在运行的循环：

*停止正在运行的循环*

```js
// stop the loop
renderer.setAnimationLoop(null);
```

在内部，循环是使用 [`.requestAnimationFrame`](https://discoverthreejs.com/zh/book/appendix/dom-api-reference/#drawing-animation-frames)。这种内置的浏览器方法可以智能地安排帧与显示器的刷新率同步，如果您的硬件跟不上，它会平滑地降低帧率。由于`.setAnimationLoop`是最近添加的，较旧的three.js示例和教程通常直接使用`.requestAnimationFrame`设置循环，这样做相当简单。然而，`.setAnimationLoop`还有一点额外的魔力可以确保循环在虚拟现实和增强现实环境中工作。

### 移除`onResize`钩子[#](https://discoverthreejs.com/zh/book/first-steps/animation-loop/#移除onresize钩子)

首先，让我们整理一下。现在循环正在运行，每当我们调整窗口大小时，都会在循环的下一次迭代中生成一个新帧。这足够快，您不会注意到任何延迟，因此我们不再需要在调整大小时手动重绘场景。从World中移除`resizer.onResize`钩子：

### `cube.tick`方法

 [three.js中的旋转以弧度为单位](https://discoverthreejs.com/zh/book/first-steps/transformations/#the-unit-of-rotation-is-radians)，因此在内部这个值被解释为 *0.01弧度*，大约是半度。因此，我们每帧将立方体在每个轴上旋转大约半度。每秒六十帧，这意味着我们的立方体将旋转60×0.5=30∘每秒，或围绕*X*, *Y*和*Z*轴大约每十二秒一整圈。

## 动画系统中的计时

### 测量跨帧时间[#](https://discoverthreejs.com/zh/book/first-steps/animation-loop/#测量跨帧时间)

这就是`Clock`类的用武之地。我们将用 [`Clock.getDelta`](https://threejs.org/docs/#api/en/core/Clock.getDelta)来衡量前一帧花了多长时间。

*`Clock.getDelta`方法*

```js
import { Clock } from 'three';

const clock = new Clock();

const delta = clock.getDelta();
```

**`.getDelta`告诉我们自上次调用`.getDelta`以来已经过去了多少时间**。如果我们在每一帧开始时调用它一次，并且只调用一次，它将告诉我们前一帧花了多长时间。**注意：如果您每帧调用`.getDelta`不止一次，后续调用的测量值将接近于零**。只在一帧开始时调用`.getDelta`一次！

### 创建`clock`[#](https://discoverthreejs.com/zh/book/first-steps/animation-loop/#创建clock)

在循环中，在文件顶部创建一个模块作用域的`clock`实例。

****Loop.js***: 创建`clock`*

```js
import { Clock } from 'three';

const clock = new Clock();

class Loop {
  ...
```

### 在每帧开始时调用`.getDelta`[#](https://discoverthreejs.com/zh/book/first-steps/animation-loop/#在每帧开始时调用getdelta)

接下来，我们将在`Loop.tick`的开头调用`.getDelta`，将结果保存在一个名为`delta`的变量中，然后我们将其传递给每个动画对象的`.tick`方法。

****Loop.js***: 将时间增量传递给动画对象*

```js
tick() {
  // only call the getDelta function once per frame!
  const delta = clock.getDelta();

  for (const object of this.updatables) {
    object.tick(delta);
  }
}
```

### 帧速率永远不会完全稳定[#](https://discoverthreejs.com/zh/book/first-steps/animation-loop/#帧速率永远不会完全稳定)

在内联代码编辑器中，我们添加了一条日志语句：

****Loop.js***: 以毫秒为单位记录经过的时间*

```js
// console.log(
//   `The last frame rendered in ${delta * 1000} milliseconds`,
// );
```

`delta`以秒为单位，因此我们将其乘以一千以转换为毫秒。这些行被注释掉以避免用数百条日志语句填充控制台，但是如果您删除`//`字符并按F12打开控制台，您将看到一个快速更新的日志列表，告诉您每帧渲染花费了多长时间. 如果您在刷新率为 60Hz 的显示器上查看此页面，它将如下所示：

*记录到控制台的帧时间*

```bash
The last frame rendered in $17.40000000083819$ milliseconds
The last frame rendered in $15.710000006947666$ milliseconds
The last frame rendered in $16.574999986914918$ milliseconds
...
```

即使有一个强大的GPU和一个像这个单一立方体这样简单的场景，我们也不会达到每秒60帧的精度。有些帧渲染得有点快，有些帧渲染得有点慢。这个是正常的。部分原因是， [出于安全原因](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now#Reduced_time_precision)，浏览器会在`.getDelta`的结果中增加大约1毫秒的抖动。

### 通过`delta`来缩放立方体的旋转[#](https://discoverthreejs.com/zh/book/first-steps/animation-loop/#通过delta来缩放立方体的旋转)

通过`delta`按比例缩放运动很容易。我们只需决定在一秒钟内要移动一个对象多少，然后在`objects.tick`方法中将该值乘以`delta`。在`cube.tick`中，我们发现了一个值，该值导致立方体在60FPS时每秒旋转大约30度。

****cube.js***: 未缩放的tick方法*

```js
cube.tick = () => {
  // increase the cube's rotation each frame
  cube.rotation.z += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
};
```

现在，我们将解决这个问题，使立方体在 *任何* FPS都以每秒30度旋转。首先，我们需要将30度转换为弧度，为此，我们将使用 [`MathUtils.degToRad`](https://discoverthreejs.com/zh/book/first-steps/transformations/#the-unit-of-rotation-is-radians)方法（如果您需要回忆它是如何工作的，请参阅转换章节）：

*将度数转换为弧度*

```js
import { MathUtils } from 'three';

const radiansPerSecond = MathUtils.degToRad(30);
```

接下来，我们在每一帧将`radiansPerSecond`缩放`delta`。

****cube.js***: 修改后的tick方法, 现在按比例缩放`delta`*

```js
cube.tick = (delta) => {
  // increase the cube's rotation each frame
  cube.rotation.z += radiansPerSecond * delta;
  cube.rotation.x += radiansPerSecond * delta;
  cube.rotation.y += radiansPerSecond * delta;
};
```

把所有这些放在一起，这是我们最终的 ***cube.js*** 模块：

****cube.js***: 最终代码*

```js
import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from 'three';

function createCube() {
  const geometry = new BoxBufferGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color: 'purple' });
  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = MathUtils.degToRad(30);

  // this method will be called once per frame
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}
```



现在，立方体将再次围绕每个轴每秒旋转30度，但有一个重要的区别：无论我们在哪里运行动画，无论是在以90FPS运行的VR装备上，还是在十年前的智能手机几乎不能达到10FPS，或者是3000年以后以10亿FPS运行的未来系统。**帧率可能会改变，但动画速度不会**。

通过这一更改，**我们成功地将动画速度与帧速率解耦。**

## 循环或不循环

按需渲染可能会减少电池使用，但另一方面，使用循环更简单。它无需考虑需要在何时何地绘制帧，您只需生成持续的稳定的帧即可，因此，本书中的大多数示例都将使用循环。但是，这并不是说按需渲染比循环更好。由您决定哪种方法适合您的应用程序。

# 纹理映射简介



这就是 [**纹理映射**](https://en.wikipedia.org/wiki/Texture_mapping)的用武之地。用最简单的术语来说，纹理映射意味着拿着图像并将其拉伸到3D对象的表面上。我们将以这种方式使用的图像称为**纹理**，我们可以使用纹理来表示颜色、粗糙度和不透明度等材料属性。例如，要更改几何区域的颜色，我们更改位于顶部的纹理区域的颜色，就像您在上图中看到的附加到面部模型的颜色纹理一样。

## 纹理类型[#](https://discoverthreejs.com/zh/book/first-steps/textures-intro/#纹理类型)

***uv-test-bw.png*** 是一个以PNG格式存储的普通2D图像文件，我们将使用`TextureLoader`加载它，这将返回 [`Texture`](https://threejs.org/docs/#api/en/textures/Texture)类的一个实例。您可以以相同的方式使用浏览器支持的任何图像格式，例如PNG、JPG、GIF、BMP。这是我们将遇到的最常见和最简单的纹理类型：存储在简单2D图像文件中的数据。

还有一些专用图像格式的加载器，如HDR、EXR和TGA，它们具有相应的加载器，如 [`TGALoader`](https://threejs.org/docs/#examples/en/loaders/TGALoader)。同样，一旦加载，我们将获得一个`Texture`实例，我们可以以与加载的PNG或JPG图像大致相同的方式使用它。

除此之外，three.js还支持许多其他类型的非简单2D图像的纹理，例如 [**视频纹理**](https://threejs.org/examples/?q=video#webgl_materials_video)、 [**3D纹理**](https://threejs.org/examples/#webgl2_volume_instancing)、 [**画布纹理**](https://threejs.org/examples/#webgl_materials_texture_canvas)、 [**压缩纹理**](https://threejs.org/examples/?q=texture#webgl_loader_texture_basis)、 [**立方体纹理**](https://threejs.org/examples/?q=cubemap#webgl_materials_cubemap_dynamic)、 [**矩形纹理**](https://threejs.org/examples/?q=equirectangular#webgl_panorama_equirectangular)等等。同样，我们将在本书后面更详细地探讨这些内容。在本章的其余部分，我们将关注以PNG或JPG格式存储的2D纹理。

## 纹理术语

### 像素和纹素[#](https://discoverthreejs.com/zh/book/first-steps/textures-intro/#像素和纹素)

数字图像是一个二维像素阵列，每个像素都是一个包含单一颜色的小点。我们的屏幕也是由一个2D小点阵列组成，每个小点都显示一种颜色，我们也称这些像素为像素。但是，构成屏幕的像素是实际的物理对象，LED或OLED或其他一些高科技设备，而构成图像的像素只是存储在文件中的数字。

**为避免混淆，我们将继续称构成屏幕像素的点为像素 \*pixels\*，但将构成纹理的点称为纹素 \*texels\*。**.

# 组织你的场景

## `Group`对象[#](https://discoverthreejs.com/zh/book/first-steps/organizing-with-group/#hello-group)

[组](https://threejs.org/docs/#api/objects/Group)在 [场景图中占据一个位置](https://discoverthreejs.com/zh/book/first-steps/transformations/#the-object3d-base-class-and-the-scene-graph)并且可以有子对象，但它们本身是不可见的。如果`Scene`代表整个宇宙，那么您可以将`Group`视为该宇宙中的单个 *复合* 对象。

![场景图中的`Group`](https://discoverthreejs.com/images/first-steps/scene_tree.svg)

场景图中的`Group`

当我们移动一个组时，它的所有子对象也会移动。同样，如果我们旋转或缩放一个组，它的所有子项也将被旋转或缩放。但是，子对象也可以独立平移、旋转或缩放。这正是对象在现实世界中的行为方式。例如，汽车由车身、车窗、车轮、发动机等独立部件组成，当您移动汽车时，它们都会随之移动。但是轮子可以独立转动，你可以开门、摇下车窗、转动方向盘等等。

当然，所有这些都适用于 *每个* 场景对象。每个场景对象都有继承自`Object3D`的`.add`和`.remove`的方法，就像`Group`和`Scene`本身一样， [每个对象都可以在场景图中占据一个位置并拥有子对象](https://discoverthreejs.com/zh/book/first-steps/transformations/#working-with-the-scene-graph)。不同之处在于组是 *纯粹的可组织对象*。其他场景对象，如网格、灯光、相机等，除了在场景图中占据一席之地外，还有其他用途。但是，组的存在纯粹是为了帮助您操纵其他场景对象。

## `.clone`方法[#](https://discoverthreejs.com/zh/book/first-steps/organizing-with-group/#introduce-clone)

在上面我们创建了许多球体的示例中，我们跳过了必须将每个球体移动到新位置的部分。如果我们不这样做，所有球体都将保持在场景的正中心，所有球体都相互重叠。这就是克隆对象有用的地方。我们可以按照我们喜欢的方式设置一个对象，然后我们可以创建一个精确的克隆。这个克隆将具有相同的变换、相同的形状、相同的材质，如果是灯光，它将具有相同的颜色和强度，如果是相机，它将具有相同的视野和纵横比，等等。然后，我们可以对克隆进行任何我们想要的调整。

three.js中几乎所有的对象都有一个`.clone`方法，它允许您创建该对象的相同副本。所有场景对象都继承自 [`Object3D.clone`](https://threejs.org/docs/#api/en/core/Object3D.clone)，而几何体继承自 [`BufferGeometry.clone`](https://threejs.org/docs/#api/en/core/BufferGeometry.clone)，材质继承自 [`Material.clone`](https://threejs.org/docs/#api/en/materials/Material.clone)。

在本章中，我们将专注于克隆网格，其工作原理如下：

*克隆网格*

```js
const mesh = new Mesh(geometry, material);
const clonedMesh = mesh.clone();
```

如果我们设置`mesh`的位置、旋转和缩放，然后克隆它，`clonedMesh`将具有与原始对象相同的位置、旋转和缩放。

*克隆对象与原始对象具有相同的变换*

```js
const mesh = new Mesh(geometry, material);
mesh.position.set(1, 1, 1);
mesh.rotation.set(0.5, 0.5, 0.5);
mesh.scale.set(2, 2, 2);

const clonedMesh = mesh.clone();
// clonedMesh.position === (1, 1, 1)
// clonedMesh.rotation === (0.5, 0.5, 0.5)
// clonedMesh.scale === (2, 2, 2)
```

克隆后，您可以分别调整原始网格和克隆网格上的变换。

*调整原始网格和克隆网格的变换*

```js
// only mesh will move
mesh.position.x = 20;

// only clonedMesh will increase in size
clonedMesh.scale.set(5, 5, 5);
```

`clonedMesh`也具有与`mesh`相同的几何体和材料。**但是，几何体和材质不是克隆的，它们是共享的**。如果我们对共享材质进行任何更改，例如，更改其颜色，**所有克隆的网格将与原始网格一起更改**。如果您对几何体进行任何更改，这同样适用。

*对材质或几何体的更改将影响所有克隆*

```js
// mesh AND clonedMesh will turn red
mesh.material.color.set('red');

// mesh AND clonedMesh will turn blue
clonedMesh.material.color.set('blue');
```

但是，您可以给一个克隆一个全新的材料，而原来的材料不会受到影响。

*您可以通过为克隆提供新材料或几何体来断开连接*

```js
clonedMesh.material = new MeshStandardMaterial({ color: "indigo" });

// mesh.material -> still red
```

### 自定义属性不会克隆（如`.tick`）

一个重要的最后说明。只会克隆对象的默认属性。如果您像我们用来创建动画的 [`.tick`方法](https://discoverthreejs.com/zh/book/first-steps/animation-loop/#the-tick-method)方法一样创建自定义属性，这些将不会被克隆。您必须在克隆的网格上再次设置任何自定义属性。

## 挑战

### 中等

1. 在`group.tick`方法内部，我们每一帧都减去一个旋转：`.rotation.z -= ...`。这将导致 *顺时针* 旋转。切换到`+=`，并注意旋转如何变为 *逆时针*。如果添加旋转，则运动将逆时针。如果减去旋转，运动将是顺时针方向。**three.js中的正旋转是逆时针的**。
2. 你能在这里创建一些其他的动画吗？请记住，您可以 *为任何可以更改的属性* 设置动画。

# 使用内置几何体获得创意

> ### `Geometry`和`BufferGeometry`
>
> 从技术上讲，我们将创建的几何体是“缓冲区”几何体，这意味着它们的数据存储在称为 ***缓冲区*** 的平面数组中。`BoxBufferGeometry`是 [`BufferGeometry`](https://threejs.org/docs/#api/en/core/BufferGeometry)类的一个扩展。与老旧的`Geometry`类相比，这是一种更新、更快的几何体表示方式。在three.js r125之前，`Geometry`和`BufferGeometry`都包含在three.js核心中，但从three.js r126开始，`Geometry`已被删除。它在示例文件夹中仍然可用，但如果您想使用它，则必须手动包含它。
>
> 但是，除非您有充分的理由并且知道自己在做什么，**否则您应该 \*始终\* 使用`BufferGeometry`**。`Geometry`仍然在 [repo的示例文件夹中](https://github.com/mrdoob/three.js/blob/master/examples/jsm/deprecated/Geometry.js)仅用于向后兼容。

## `Material.flatShading`属性[#](https://discoverthreejs.com/zh/book/first-steps/built-in-geometries/#materialflatshading属性)

我们还将在本章中介绍一种新的材料属性。 [`Material.flatShading` ](https://threejs.org/docs/#api/en/materials/Material.flatShading)在基类`Material`中定义，这意味着它可用于每种材料。默认情况下，它设置为false。

[正如我们在上一章中提到的](https://discoverthreejs.com/zh/book/first-steps/organizing-with-group/#introducing-spherebuffergeometry)，所有的几何体都是由三角形组成的。**您可以使用WebGL绘制的唯一形状是点、线和三角形**，所有其他形状都是由这些组成的。但是，**`Mesh`对象完全由三角形组成**，而不是点或线。当它们是网格的一部分时，这些三角形称为**面**。要创建平滑曲线，三角形需要非常小。然而，为了减少三角形的数量，通常需要在光照计算中混合相邻的面。一旦我们在本书后面解释什么是 ***法线***，我们将更详细地解释它是如何工作的。

如果启用`.flatShading`，则不再混合相邻面。您可以使用它为对象赋予雕刻或多面的外观，这对于像我们的火车这样的低多边形对象可能是一个很好的效果。


您可以通过将参数传递给构造函数来创建启用了平面着色的材质：

*创建一个红色的启用flatShading的`MeshStandardMaterial`*

```js
const material = new MeshStandardMaterial({
color: 'red',
flatShading: true,
});
```

您也可以在创建材质后设置`material.flatShading`属性。但是，如果您已经在渲染场景中使用过材质（从技术上讲，如果材质已被 *编译*），您还需要设置 [`material.needsUpdate`](https://threejs.org/docs/#api/en/materials/Material.needsUpdate)标志：

*材料编译后，在更改某些属性时设置`.needsUpdate`标志*

```js
const material = new MeshStandardMaterial({
color: 'red',
flatShading: false, // default
});

material.flatShading = true;
material.needsUpdate = true;
```

## 助手（Helpers）[#](https://discoverthreejs.com/zh/book/first-steps/built-in-geometries/#助手帮助方法)

在编辑器中，我们添加了几个帮助方法，让您更轻松地构建火车。有一个 [`AxesHelper`](https://threejs.org/docs/#api/en/helpers/AxesHelper)，它有三条线分别代表*X*、*Y*和*Z*轴， 还有一个 [`GridHelper`](https://threejs.org/docs/#api/en/helpers/GridHelper)，它是一个矩形网格，粗黑线穿过场景中心，较小的灰线以一个单位为间隔。

在构建场景时，您通常会发现添加这样的帮助方法很有用，尤其是在您习惯使用three.js坐标系系统时。除了这两个之外，还有许多其他帮助方法可以帮助我们可视化场景中的各种事物，例如盒子、相机、灯光、箭头、平面等。

在这里，注意坐标轴助手中线条的颜色：RGB，代表XYZ：*X*轴是红色的，*Y*轴是绿色的，而*Z*轴为蓝色。接下来，注意网格助手的每个正方形都是1×1正方形，您可以使用它来帮助可视化火车各部分的大小。我们的这一列火车最后大约有9米长，对于玩具火车来说可能有点大（或者可能不是），但我们暂时不用担心。您还可以在助手中调整方块的大小，这在构建大型或小型场景时很有用。

## 使用旋转[#](https://discoverthreejs.com/zh/book/first-steps/built-in-geometries/#使用旋转)

<img src="https://discoverthreejs.com/images/first-steps/coordinate_system.svg" alt="世界空间坐标系" style="zoom:50%;" />

世界空间坐标系

看上面的 [世界空间坐标系](https://discoverthreejs.com/zh/book/first-steps/transformations/#coordinate-systems-world-space-and-local-space)。首先最开始，(0,0,0), 位于场景的中心。在本章中使用转换时，请牢记此图。另外，请注意图表中的颜色如何与编辑器中轴助手的颜色匹配：RGB表示XYZ。

在我们继续将碎片移动到位之前，请记住，**three.js中的正旋转方向是逆时针方向**。这可能与您的直觉所期望的相反，也与CSS旋转相反，因此请特别注意：

**正旋转 = 逆时针！**

*各种顺时针和逆时针旋转*

```js
// 90 degrees anti-clockwise around the X-axis
mesh.rotation.x = Math.PI / 2;

// 90 degrees clockwise around the X-axis
mesh.rotation.x = -Math.PI / 2;

// 90 degrees anti-clockwise around the Y-axis
mesh.rotation.y = Math.PI / 2;

// 90 degrees clockwise around the Z-axis
mesh.rotation.z = -Math.PI / 2;

// 45 degrees clockwise around the X-axis
mesh.rotation.x = -Math.PI / 4;

// 45 degrees anti-clockwise around the Y-axis
mesh.rotation.y = Math.PI / 4;
```

# 以glTF格式加载3D模型

## 通过Web发送3D资源的最佳方式：glTF

### glTF文件的类型

glTF文件以标准和二进制形式出现。这些有不同的扩展名：

- **标准 \*.gltf\* 文件未压缩，可能附带一个额外的 \*.bin\* 数据文件。**
- **二进制 \*.glb\* 文件将所有数据包含在一个文件中。**

标准和二进制glTF文件都可能包含嵌入在文件中的纹理或可能引用外部纹理。由于二进制 ***.glb*** 文件要小得多，因此最好使用这种类型。另一方面，未压缩的 ***.gltf*** 在文本编辑器中很容易阅读，因此它们可能对调试有用。

## `GLTFLoader`插件

### `.load`和`.loadAsync`方法[#](https://discoverthreejs.com/zh/book/first-steps/load-models/#load和loadasync方法)

所有three.js加载器都有两种加载文件的方法：旧的基于回调的 [`.load`](https://threejs.org/docs/#examples/en/loaders/GLTFLoader.load)方法和新的基于Promise的`.loadAsync`方法。再次参考第 [A.5](https://discoverthreejs.com/zh/book/appendix/asynchronous-javascript/)章，我们详细介绍了这两种方法之间的区别。Promise允许我们使用异步函数，这反过来会产生更简洁的代码，因此在本书中，我们将始终使用`.loadAsync`.

*`GLTFLoader.loadAsync`*

```js
const loader = new GLTFLoader();

const loadedData = await loader.loadAsync('path/to/yourModel.glb');
```

# three.js 动画系统

# 处理不同的 three.js 版本

## Semver？绝不！[#](https://discoverthreejs.com/zh/book/appendix/threejs-versions/#semver-no-way)

three.js 的发展速度 *很快* ，并且它使用了一个略微不寻常的版本系统。大多数软件会以 **V0.5**、**V0.6**、**V1.0**、**V1.1.1** 等形式逐步发布。这被称为 **语义版本控制** ，或 [**semver**](https://semver.org/) 简称。

three.js 打破了这一趋势，转而使用 **修订系统** 。大约每月会发布一个新的修订版本，其名称为 **r45**、**r67**、**r98** 等。你可以在这里查看 [发布列表 ](https://github.com/mrdoob/three.js/releases)。

很快，我们将向您展示如何使用 NPM 包管理器安装 three.js [NPM 包管理器](https://discoverthreejs.com/zh/book/introduction/get-threejs/#package-manager)我们介绍了如何从 NPM 安装 three.js，NPM 是一个用于所有 JavaScript 内容的包仓库。NPM 需要使用 semver，所以如果你查看 [three.js 的 NPM 包](https://www.npmjs.com/package/three)你会发现 **r88** 已被转换为 **V0.88.0**，**r108** 已被转换为 **V0.108.0**，等等。

## 从旧版本升级 [#](https://discoverthreejs.com/zh/book/appendix/threejs-versions/#upgrading-from-an-older-version)

更新使用旧版 three.js 编写的应用程序通常是一个简单的过程。每当您需要更新旧代码时，请阅读 [迁移指南](https://github.com/mrdoob/three.js/wiki/Migration-Guide)以了解您需要做出的更改。

然而，在您感到需要追逐最新版本之前，请记住 three.js 是一个非常稳定的库。最新版本可能不会添加您需要的内容。通常的最佳实践是锁定您正在使用的版本，并且仅在绝对需要新功能时才更新。如果您需要对此进行说服，请注意 [Autodesk Forge Viewer](https://forge.autodesk.com/showcase) 仍然使用 three.js r77，这是一个来自 2016 年的版本。