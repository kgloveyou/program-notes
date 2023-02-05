# Learn Three.js Program 3D animations and visualizations for the web with JavaScript and WebGL, 4th Edition

Three.js r147

https://github.com/PacktPublishing/Learn-Three.js-Fourth-edition

# 1、使用 Three.js 创建你的第一个 3D 场景

**提示**

除了 WebGL 之外，正在开发一种使用 GPU 在浏览器中进行渲染的新标准，称为 WebGPU，它将提供比 WebGL 更好的性能，并在未来成为新标准。 当你使用 Three.js 时，你不必担心这个变化。Three.js 已经部分支持 WebGPU 并且随着该标准的成熟，Three.js 中也会支持该标准。 因此，你使用 Three.js 创建的所有内容也可以开箱即用地使用 WebGPU。

**提示**

除了这些基于文本的编辑器，你可以使用它们来编辑和试验本书的源代码，Three.js 目前还提供了一个在线编辑器。
使用此编辑器（你可以在 http://threejs.org/editor/ 找到），你可以使用图形化方式创建 Three.js 场景。

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