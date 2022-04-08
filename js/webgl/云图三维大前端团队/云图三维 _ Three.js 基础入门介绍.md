图片来源: https://unsplash.com/photos/d2w-_1LJioQ


> [云图三维 连接你·创造的世界](https://www.yuntucad.com/)  致力于打造国内第一家集查看、建模、装配和渲染于一体的“云端CAD”协作设计平台。

## 正文
[Three.js](http://threejs.org/) 是一个尽可能简化在网页端操作 3D 内容的js库。与其容易混淆的还有WebGL，事实上Three.js是对WebGL 封装， WebGL 是一个只能画点、线和三角形的非常底层的系统。想要用 WebGL 来做一些实用的东西通常需要大量的代码， Three.js对其封装之后，会大大减少代码量，提高编码效率。**Three.js封装了诸如场景、灯光、阴影、材质、贴图、空间运算等一系列功能，让你不必要再从底层 WebGL 开始写起**。

## 项目结构

首先了解一下Three.js项目的整体结构。一个Three.js项目需要创建非常多的对象，包括Scene、Renderer、Camera、Mesh、Object3D、Group、Light、Geometry、Material、Texture等。下图是这些对象之间一些关系展示。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9349284332b5435aa5c723978b3cb59d~tplv-k3u1fbpfcp-watermark.image)



## 重点对象介绍

在进入编码前，对上面提到的对象重点解释一下，有助于从整体上把握思路。

- 首先有一个[渲染器 (`Renderer`)](https://threejs.org/docs/#api/zh/constants/Renderer)。这可以说是 three.js 的主要对象。传入一个[场景 (`Scene`)](https://threejs.org/docs/#api/zh/scenes/Scene) 和一个[摄像机 (`Camera`)](https://threejs.org/docs/#api/zh/cameras/Camera) 到[渲染器 (`Renderer`)](https://threejs.org/docs/#api/zh/constants/Renderer) 中，然后它会将摄像机视椎体中的三维场景渲染成一个二维图片显示在画布上。

- 其次有一个[场景图](https://threejsfundamentals.org/threejs/lessons/zh_cn/threejs-scenegraph.html) 它是一个树状结构，由很多对象组成，比如图中包含了一个[场景 (`Scene`)](https://threejs.org/docs/#api/zh/scenes/Scene) 对象 ，多个[网格 (`Mesh`)](https://threejs.org/docs/#api/zh/objects/Mesh) 对象，[光源 (`Light`)](https://threejs.org/docs/#api/zh/lights/Light) 对象，[群组 (`Group`)](https://threejs.org/docs/#api/zh/objects/Group)，[三维物体 (`Object3D`)](https://threejs.org/docs/#api/zh/core/Object3D)，和[摄像机 (`Camera`)](https://threejs.org/docs/#api/zh/cameras/Camera) 对象。一个[场景 (`Scene`)](https://threejs.org/docs/#api/zh/scenes/Scene) 对象定义了场景图最基本的要素，并包了含背景色和雾等属性。这些对象通过一个层级关系与明确的树状结构来展示出各自的位置和方向。子对象的位置和方向总是相对于父对象而言的。比如说汽车的轮子是汽车的子对象，这样移动和定位汽车时就会自动移动轮子。

  注意图中[摄像机 (`Camera`)](https://threejs.org/docs/#api/zh/cameras/Camera) 是一半在场景图中，一半在场景图外的。这表示在 three.js 中，[摄像机 (`Camera`)](https://threejs.org/docs/#api/zh/cameras/Camera) 和其他对象不同的是，它不一定要在场景图中才能起作用。相同的是，[摄像机 (`Camera`)](https://threejs.org/docs/#api/zh/cameras/Camera) 作为其他对象的子对象，同样会继承它父对象的位置和朝向。

- [网格 (`Mesh`)](https://threejs.org/docs/#api/zh/objects/Mesh) 对象可以理解为用一种特定的[材质 (`Material`)](https://threejs.org/docs/#api/zh/materials/Material) 来绘制的一个特定的[几何体 (`Geometry`)](https://threejsfundamentals.org/threejs/lessons/zh_cn/Geometry)。[材质 (`Material`)](https://threejs.org/docs/#api/zh/materials/Material) 和[几何体 (`Geometry`)](https://threejsfundamentals.org/threejs/lessons/zh_cn/Geometry) 可以被多个[网格 (`Mesh`)](https://threejs.org/docs/#api/zh/objects/Mesh) 对象使用。比如在不同的位置画两个蓝色立方体，需要两个[网格 (`Mesh`)](https://threejs.org/docs/#api/zh/objects/Mesh) 对象来代表每一个立方体的位置和方向。但只需一个[几何体 (`Geometry`)](https://threejsfundamentals.org/threejs/lessons/zh_cn/Geometry) 来存放立方体的顶点数据，和一种[材质 (`Material`)](https://threejs.org/docs/#api/zh/materials/Material) 来定义立方体的颜色为蓝色就可以了。两个[网格 (`Mesh`)](https://threejs.org/docs/#api/zh/objects/Mesh) 对象都引用了相同的[几何体 (`Geometry`)](https://threejsfundamentals.org/threejs/lessons/zh_cn/Geometry) 和[材质 (`Material`)](https://threejs.org/docs/#api/zh/materials/Material)。

- [几何体 (`Geometry`)](https://threejsfundamentals.org/threejs/lessons/zh_cn/Geometry) 对象顾名思义代表一些几何体，如球体、立方体、平面、狗、猫、人、树、建筑等物体的**顶点信息**。Three.js 内置了许多[基本几何体](https://threejsfundamentals.org/threejs/lessons/zh_cn/threejs-primitives.html) 。你也可以[创建自定义几何体](https://threejsfundamentals.org/threejs/lessons/zh_cn/threejs-custom-buffergeometry.html)或[从文件中加载几何体](https://threejsfundamentals.org/threejs/lessons/zh_cn/threejs-load-obj.html)。

- [材质 (`Material`)](https://threejs.org/docs/#api/zh/materials/Material) 对象代表[绘制几何体的表面属性](https://threejsfundamentals.org/threejs/lessons/zh_cn/threejs-materials.html)，包括使用的颜色，和光亮程度。一个[材质 (`Material`)](https://threejs.org/docs/#api/zh/materials/Material) 可以引用一个或多个[纹理 (`Texture`)](https://threejs.org/docs/#api/zh/textures/Texture)，这些纹理可以用来，打个比方，将图像包裹到几何体的表面。

- [纹理 (`Texture`)](https://threejs.org/docs/#api/zh/textures/Texture) 对象通常表示一幅要[从文件中加载，要么在画布上生成，要么由另一个场景渲染出的图像。

- [光源 (`Light`)](https://threejs.org/docs/#api/zh/lights/Light) 对象代表不同种类的光。

## 正方体

有了以上基本概念，接下来就用Three.js画个正方体 。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/add5739d96114ff1bf076b3ecc7edf7a~tplv-k3u1fbpfcp-watermark.image)




首先是加载 three.js

```javascript
<script type="module">
import * as THREE from 'pathxxx/three.module.js';
</script>
```

把`type="module"`放到 script 标签中很重要。这可以让我们使用`import`关键字加载 three.js。还有其他的方法可以加载 three.js，但是自 r106 开始，使用模块是最推荐的方式。模块的优点是可以很方便地导入需要的其他模块。这样我们就不用再手动引入它们所依赖的其他文件了。

下一步我们需要一个`<canvas>`标签。

```javascript
<body>
  <canvas></canvas>
</body>
```

Three.js 需要使用这个 canvas 标签来绘制，所以我们要先获取它然后传给 three.js。

```javascript
<script type="module">
import * as THREE from 'pathxxx/three.module.js';
 
function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  ...
</script>
```

拿到 canvas 后我们需要创建一个 [WebGL 渲染器 (`WebGLRenderer`)](https://threejs.org/docs/#api/zh/renderers/WebGLRenderer)。渲染器负责将你提供的所有数据渲染绘制到 canvas 上。之前还有其他渲染器，比如 CSS 渲染器 (`CSSRenderer`)、Canvas 渲染器 (`CanvasRenderer`)。将来也可能会有 WebGL2 渲染器 (`WebGL2Renderer`) 或 WebGPU 渲染器 (`WebGPURenderer`)。目前的话是 [WebGL 渲染器 (`WebGLRenderer`)](https://threejs.org/docs/#api/zh/renderers/WebGLRenderer)，它通过 WebGL 将三维空间渲染到 canvas 上。

注意这里有一些细节。如果你没有给 three.js 传 canvas，three.js 会自己创建一个 ，但是你必须手动把它添加到文档中。

接下来我们需要一个[透视摄像机 (`PerspectiveCamera`)](https://threejs.org/docs/#api/zh/cameras/PerspectiveCamera)。

```javascript
const fov = 75;
const aspect = 2;  // 相机默认值
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
```

`fov`是视野范围 (field of view) 的缩写。上述代码中是指垂直方向为 75 度。 注意 three.js 中大多数的角用弧度表示，但是因为某些原因透视摄像机使用角度表示。

`aspect`指画布的宽高比。我们将在别的文章详细讨论，在默认情况下 画布是 300x150 像素，所以宽高比为 300/150 或者说 2。

`near`和`far`代表近平面和远平面，它们限制了摄像机面朝方向的可绘区域。 任何距离小于或超过这个范围的物体都将被裁剪掉 (不绘制)。

这四个参数定义了一个 *"视椎 (frustum)"*。 *视椎 (frustum)* 是指一个像被削去顶部的金字塔形状。换句话说，可以把 "视椎 (frustum)" 想象成其他三维形状如球体、立方体、棱柱体、截椎体。



![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7d3379e30284c3ebbfe76b6639fbe05~tplv-k3u1fbpfcp-watermark.image)




近平面和远平面的高度由视野范围决定，宽度由视野范围和宽高比决定。

视椎体内部的物体将被绘制，视椎体外的东西将不会被绘制。

摄像机默认指向 Z 轴负方向，上方向朝向 Y 轴正方向。我们将会把立方体放置在坐标原点，所以我们需要往后移一下摄像机才能显示出物体。

```javascript
camera.position.z = 2;
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f5fe2409df04e80a3fd01d57522b64d~tplv-k3u1fbpfcp-watermark.image)



我们能看到摄像机的位置在`z = 2`。它朝向 Z 轴负方向。我们的视椎体范围从摄像机前方 0.1 到 5。因为这张图是俯视图，视野范围会受到宽高比的影响。画布的宽度是高度的两倍，所以水平视角会比我们设置的垂直视角 75 度要大。

然后我们创建一个[场景 (`Scene`)](https://threejs.org/docs/#api/zh/scenes/Scene)。[场景 (`Scene`)](https://threejs.org/docs/#api/zh/scenes/Scene) 是 three.js 的基本的组成部分。需要 three.js 绘制的东西都需要加入到 scene 中。 

```javascript
const scene = new THREE.Scene();
```

然后创建一个包含盒子信息的[立方几何体 (`BoxGeometry`)](https://threejs.org/docs/#api/zh/geometries/BoxGeometry)。几乎所有希望在 three.js 中显示的物体都需要一个包含了组成三维物体的顶点信息的几何体。

```javascript
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
```

然后创建一个基本的材质并设置它的颜色. 颜色的值可以用 css 方式和十六进制来表示。

```javascript
const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
```

再创建一个[网格 (`Mesh`)](https://threejs.org/docs/#api/zh/objects/Mesh) 对象，它包含了：

1. [几何体 (`Geometry`)](https://threejsfundamentals.org/threejs/lessons/zh_cn/Geometry)(物体的形状)
2. [材质 (`Material`)](https://threejs.org/docs/#api/zh/materials/Material)(如何绘制物体，光滑还是平整，什么颜色，什么贴图等等)
3. 对象在场景中相对于他父对象的位置、朝向、和缩放。下面的代码中父对象即为场景对象。

```javascript
const cube = new THREE.Mesh(geometry, material);
```

最后我们将网格添加到场景中。

```javascript
scene.add(cube);
```

之后将场景和摄像机传递给渲染器来渲染出整个场景。

```javascript
renderer.render(scene, camera);
```

效果如下：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/290bee1a11fc45bfa792bf7294b0a738~tplv-k3u1fbpfcp-watermark.image)

很难看出来这是一个三维的立方体，因为我们直视 Z 轴的负方向并且立方体和坐标轴是对齐的，所以我们只能看到一个面。



## 运动的正方体

我们来让立方体旋转起来，以便更好的在三维环境中显示。为了让它动起来我们需要用到一个渲染循环函数 [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

代码如下：

```javascript
function render(time) {
  time *= 0.001;  // 将时间单位变为秒
 
  cube.rotation.x = time;
  cube.rotation.y = time;
 
  renderer.render(scene, camera);
 
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
```

`requestAnimationFrame`函数会告诉浏览器你需要显示动画。传入一个函数作为回调函数。本例中的函数是`render`函数。如果你更新了跟页面显示有关的任何东西，浏览器会调用你传入的函数来重新渲染页面。我们这里是调用 three.js 的`renderer.render`函数来绘制我们的场景。

`requestAnimationFrame`会将页面开始加载到函数运行所经历的时间当作入参传给回调函数，单位是毫秒数

然后我们把立方体的 X 轴和 Y 轴方向的旋转角度设置成这个时间。这些旋转角度是弧度制。一圈的弧度为 2Π所以我们的立方体在每个方向旋转一周的时间为 6.28 秒。

最后渲染我们的场景并调用另一个帧动画函数来继续我们的循环。

回调函数之外在主进程中我们调用一次`requestAnimationFrame`来开始整个渲染循环。


![2021-06-11-14-51-54.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7aa176ba29694607b16c2274823ee34d~tplv-k3u1fbpfcp-watermark.image)

## 添加灯光效果

效果好了一些但还是很难看出是三维的。我们来添加些光照效果。three.js 中有很多种类型的灯光，现在我们先创建一盏平行光。

```javascript
{
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}
```

平行光有一个位置和目标点。默认值都为 (0, 0, 0)。我们这里 将灯光的位置设为 (-1, 2, 4)，让它位于摄像机前面稍微左上方一点的地方。目标点还是 (0, 0, 0)，让它朝向坐标原点方向。

我们还需要改变下立方体的材质。[`MeshBasicMaterial`](https://threejs.org/docs/#api/zh/materials/MeshBasicMaterial)材质不会受到灯光的影响。我们将他改成会受灯光影响的 [`MeshPhongMaterial`](https://threejs.org/docs/#api/zh/materials/MeshPhongMaterial)材质。

```javascript
const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // 绿蓝色
const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // 绿蓝色
```

这是我们新的项目结构



![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a966bac64a05409ea4a98e91721a82b1~tplv-k3u1fbpfcp-watermark.image)

效果

![2021-06-11-14-53-24.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d582f6f6f86c4711b11d47d8a0c08cb9~tplv-k3u1fbpfcp-watermark.image)

现在应该可以很清楚的看出是三维立方体了。

## 让场景更为复杂

我们再添加两个立方体使场景更加复杂。

每个立方体会引用同一个几何体和不同的材质，这样每个立方体将会是不同的颜色。

首先我们创建一个根据指定的颜色生成新材质的函数。它会根据指定的几何体生成对应网格，然后将网格添加进场景并设置其 X 轴的位置。

```javascript
function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
 
  cube.position.x = x;
 
  return cube;
}
```

然后我们将用三种不同的颜色和 X 轴位置调用三次函数，将生成的网格实例存在一个数组中。

```javascript
const cubes = [
  makeInstance(geometry, 0x44aa88,  0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
];
```

最后我们将在渲染函数中旋转三个立方体。我们给每个立方体设置了稍微不同的旋转角度。

```javascript
function render(time) {
  time *= 0.001;  // 将时间单位变为秒
 
  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });
 
  ...
```

这里是结果。


![2021-06-11-14-54-34.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf218a8d823f41f899412347b9e26786~tplv-k3u1fbpfcp-watermark.image)

如果你对比上面的示意图可以看到此效果符合我们的预想。位置为 X = -2 和 X = +2 的立方体有一部分在我们的视椎体外面。他们大部分是被包裹的，因为水平方向的视角非常大。

## 现在的项目结构

我们的项目现在有了这样的结构



![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b50a9cfcf194138822032b3aad865af~tplv-k3u1fbpfcp-watermark.image)


我们有三个[网格 (`Mesh`)](https://threejs.org/docs/#api/zh/objects/Mesh) 引用了相同的[立方几何体 (`BoxGeometry`)](https://threejs.org/docs/#api/zh/geometries/BoxGeometry)。每个[网格 (`Mesh`)](https://threejs.org/docs/#api/zh/objects/Mesh) 引用了一个单独的 [`MeshPhongMaterial`](https://threejs.org/docs/#api/zh/materials/MeshPhongMaterial)材质来显示不同的颜色。

## 写在最后

本文介绍了Three.js的基本概念，并通过了一个简单的实例从零到一搭建了一个三维场景。麻雀虽小五脏俱全，希望对大家有所帮助。

> 本文发布自 云图三维大前端团队，文章未经授权禁止任何形式的转载。