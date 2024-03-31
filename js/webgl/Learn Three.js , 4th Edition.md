# Learn Three.js Program 3D animations and visualizations for the web with JavaScript and WebGL, 4th Edition

Three.js r147

https://github.com/PacktPublishing/Learn-Three.js-Fourth-edition

# 1、使用 Three.js 创建你的第一个 3D 场景

**提示**

除了 WebGL 之外，正在开发一种使用 GPU 在浏览器中进行渲染的新标准，称为 WebGPU，它将提供比 WebGL 更好的性能，并在未来成为新标准。 当你使用 Three.js 时，你不必担心这个变化。Three.js 已经部分支持 WebGPU 并且随着该标准的成熟，Three.js 中也会支持该标准。 因此，你使用 Three.js 创建的所有内容也可以开箱即用地使用 WebGPU。

**提示**

除了这些基于文本的编辑器，你可以使用它们来编辑和试验本书的源代码，Three.js 目前还提供了一个在线编辑器。
使用此编辑器（你可以在 http://threejs.org/editor/ 找到），你可以使用图形化方式创建 Three.js 场景。

**运行示例代码**

```bash
$ npm run serve
```

**提示**

这本书中使用的设置只是开发 web 应用程序的众多方法之一。或者，您可以将 Three.js（和其他库）直接包含在您的 HTML 文件中，或者使用类似于 Three.js 网站上的示例的 import-maps 方法。所有这些方法都各有优劣势。在这本书中，我们选择了一种便于试验源代码并直接在浏览器中获得反馈的方法，这种方法与通常构建此类应用程序的方式非常相似。

## 探索 Three.js 应用程序的 HTML 结构

## 渲染和查看 3D 对象

### 设置场景

### 添加灯光

### 添加一个动画循环

`requestAnimationFrame`  

#### requestAnimationFrame  介绍

```js
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

在为这个函数添加额外功能之前，我们将引入一个小型的辅助库，名为 stats.js，它提供了有关动画运行帧率的信息。这个库与 Three.js 的作者相同，它会渲染一个小图表，显示场景渲染的速率信息。



### 使用 lil-gui 控制属性并使实验更容易

```js
import GUI from "lil-gui";

// add gui
const gui = new GUI();
const props = {
  cubeSpeed: 0.01,
  torusSpeed: 0.01,
};

gui.add(props, 'cubeSpeed', -0.2, 0.2, 0.01)
gui.add(props, 'torusSpeed', -0.2, 0.2, 0.01)

  cube.rotation.x += props.cubeSpeed;
  cube.rotation.y += props.cubeSpeed;
  cube.rotation.z += props.cubeSpeed;
```

### Helper objects and util functions  

`AxesHelper、GridHelper、PolarGridHelper`

# 2、构成 Three.js 应用程序的基本组件

# 6、探索高级几何

## 可用于调试的几何图形

### THREE.EdgesGeometry 

它提供了一个只渲染几何体边缘的几何体。

### THREE.WireFrameGeometry  

# 7、点和精灵

使用 THREE.Sprite，你可以非常轻松地创建一组对象并在场景中移动它们。 当你处理少量对象时，这很有效，但是当你要处理大量 THREE.Sprite 对象时，你很快就会遇到性能问题。 这是因为每个对象都需要由 Three.js 单独管理。 Three.js 提供了一种使用 THREE.Points 对象处理大量精灵的替代方法。 使用 THREE.Points，Three.js 不必管理许多单独的 THREE.Sprite 对象，只需管理 THREE.Points 实例。这将允许 Three.js 优化其绘制精灵的方式并获得更好的性能。 以下屏幕截图显示了使用 THREE.Points 对象渲染的几个精灵：

要创建一个 THREE.Points 对象，我们需要为其提供 THREE.BufferGeometry。 对于前面的屏幕截图，我们可以创建一个 THREE.BufferGeometry，如下所示：

```js
// Use sprites and sprite material for a simple rendering
import { bootstrapGeometryScene } from './util/standard-scene'
import * as THREE from 'three'

const createPoints = () => {
  const points = []

  for (let x = -15; x < 15; x++) {
    for (let y = -10; y < 10; y++) {
      let point = new THREE.Vector3(x / 4, y / 4, 0)
      points.push(point)
    }
  }

  const colors = new Float32Array(points.length * 3)
  points.forEach((e, i) => {
    const c = new THREE.Color(Math.random() * 0xffffff)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  })

  const geom = new THREE.BufferGeometry().setFromPoints(points)
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3, true))

  return geom
}

bootstrapGeometryScene({
  geometry: createPoints(),
  provideGui: () => {},
  material: new THREE.PointsMaterial({ size: 0.1, vertexColors: true, color: 0xffffff }),
  hidefloor: true
}).then()
```

pcd 点云数据的读取可以参照这个。



# 9、动画和移动相机

## 基本动画

### 选择和移动对象

#### 选择对象

当你在场景中移动鼠标时，你会看到每当你的鼠标点击一个对象时，该对象就会突出显示。 你可以使用 `THREE.Raycaster` 轻松创建它。raycaster  将查看你当前的相机并将光线从相机投射到你的鼠标位置。 在此基础上，它可以根据鼠标的位置计算出击中了哪个对象。为此，我们需要采取以下步骤：

#### 拖动对象

为了支持拖动对象，Three.js 使用了一种叫做 `DragControls` 的东西。

```js
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.update()

const controls = new DragControls(mesh.children, camera, renderer.domElement)
controls.addEventListener('dragstart', function (event) {
    orbit.enabled = false
    event.object.material.emissive.set(0x33333)
})

controls.addEventListener('dragend', function (event) {
    orbit.enabled = true
    event.object.material.emissive.set(0x000000)
})

return controls
```

还有一个更高级的 `DragControls` 版本，称为 `TransformControls`。 我们不会详细介绍此控件，但它允许你使用简单的 UI 来转换网格的属性。 当你在浏览器中打开 `transform-controls-html` 时，你可以找到此控件的示例：



**可以切换平移、旋转和缩放3种模式。**

### 使用 Tween.js 制作动画

## 使用相机

Three.js 有几个相机控件，你可以使用它来控制整个场景中的相机。 这些控件位于 Three.js 发行版中，可以在 examples/js/controls 目录中找到。 在本节中，我们将更详细地了解以下控件：

- `ArcballControls`：一个广泛的控件，它提供了一个透明的覆盖层，你可以使用它轻松地四处移动相机。

- `FirstPersonControls`：这些控件的行为类似于第一人称射击游戏中的控件。你可以使用键盘四处移动并使用鼠标环顾四周。

- `FlyControls`：这些是类似飞行模拟器的控件。 你可以使用键盘和鼠标移动和操纵。

- `OrbitControls`：这模拟了围绕特定场景在轨道上运行的卫星。 这使你可以使用鼠标和键盘四处移动。

- `PointerLockControls`：这些类似于第一人称控件，但它们还将鼠标指针锁定在屏幕上，使其成为简单游戏的绝佳选择。

- `TrackBallControls`：这些是最常用的控件，允许你使用鼠标（或轨迹球）轻松移动、平移和缩放场景。

### ArcballControls

### TrackBallControls

左键旋转，右键平移，滚轮缩放。

`THREE.Clock` 对象可用于计算完成特定调用或渲染循环所用的时间。你可以通过调用 `clock.getDelta()` 函数来完成此操作。 该函数将返回本次调用与上一次调用 `getDelta()` 之间的经过时间。为此，我们可以使用 `THREE.Clock` 对象中的 `getDelta()` 函数。 你可能想知道为什么我们不直接将帧速率（1/60 秒）传递给更新函数。 原因是使用 `requestAnimationFrame`，我们可以期待 60 FPS，但这并不能保证。 根据各种外部因素，帧速率可能会发生变化。 为了确保相机转动和旋转顺畅，我们需要传入准确的经过时间。

### FlyControls

### FirstPersonControls  

### OrbitControls  

左键旋转，右键平移，滚轮缩放。

最常用的控件，点云预览用这个。



# 13 使用 Blender 和 Three.js

Baking lightmaps and ambient occlusion maps in Blender，

在 Blender 中烘焙光照贴图和环境遮挡贴图

# 14 Three.js 与 React、TypeScript 和 Web-XR 一起使用

## 14.1 将 Three.js 与 TypeScript 结合使用

```bash
$ yarn add three
$ yarn add -D @types/three
```

## 14.2 使用 Three.js 和 React 与 TypeScript

## 14.3 使用 Three.js 和 React Three Fiber

https://docs.pmnd.rs/react-three-fiber/getting-started/introduction

`'@react-three/fiber'`

https://github.com/pmndrs/drei

`'@react-three/drei'`

## 14.4 Three.js 和 VR