# 3D Web Development with Three.js and Next.js

https://github.com/bpbpublications/3D-Web-Development-with-Three.js-and-Next.js



代码运行前需要安装相关的依赖包

```bash
npm install --save three vite
npm install --save lil-gui
```



# 第6章 Three.js入门

## 调试和故障排除

一些调试工具

- [Tweakpane](https://github.com/cocopon/tweakpane)。Tweakpane is a compact pane library for fine-tuning parameters and monitoring value changes, inspired by [dat.GUI](https://github.com/dataarts/dat.gui).
- Control-panel: (https://github.com/freeman-lab/control-panel)
- Lil-gui(https://lil-gui.georgealways.com/ ). 

# 第9章 相机和视角

## ArrayCamera

```js
const cameras = [];
for ( let y = 0; y < AMOUNT; y ++ ) {
    for ( let x = 0; x < AMOUNT; x ++ ) {
        const subcamera = new THREE.PerspectiveCamera( 120, ASPECT_RATIO, 1, 1000 );
        subcamera.viewport = new THREE.Vector4( 
                Math.floor( x * WIDTH ), 
                Math.floor( y * HEIGHT ), 
                Math.ceil( WIDTH ), 
                Math.ceil( HEIGHT ) 
        );
        subcamera.lookAt( sphere.position );
        subcamera.position.set(0,0,0);
        subcamera.updateMatrixWorld();
        cameras.push( subcamera );
    }
}

// Create an ArrayCamera using the array of cameras
const arrayCamera = new THREE.ArrayCamera(cameras);
arrayCamera.position.z = 3;
```

代码的重要部分是使用视口参数。视口定义了屏幕上渲染相机视图的部分。对于 ArrayCamera，这一点尤其重要，因为它允许我们将屏幕分成多个区域，每个区域对应于数组中的不同相机。

# 第10章 纹理和贴图

## 将纹理应用于3D对象

有各种网站提供现成的免费纹理。我们将从以下网址获取一个：https://www.poliigon.com/zh

### LoadingManager的关键特性

虽然纹理加载器可以处理单个图像，但使用以下工具管理多个纹理效率更高：LoadingManager. 此工具简化了一次加载多个图像的过程，优化了性能和资产管理。

## 纹理映射技术和UV坐标

### PBR

在处理纹理映射时，我们需要加载多个文件。

正如你在前一节中了解到的，基于物理的渲染（PBR）纹理分为六个部分。每个部分都需要一个特定的文件。在本节中，我们将使用代码清单 10.3，它展示了如何使用加载管理器（LoadManager）将所有需要的文件加载到应用程序中。

```js
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('assets/Glass_Window_003_basecolor.jpg');
colorTexture.colorSpace = THREE.SRGBColorSpace;
const alphaTexture = textureLoader.load('assets/Glass_Window_003_opacity.jpg');
const heightTexture = textureLoader.load('assets/Glass_Window_003_height.png');
const normalTexture = textureLoader.load('assets/Glass_Window_003_normal.jpg');
const ambientOcclusionTexture = textureLoader.load('assets/Glass_Window_003_ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('assets/Glass_Window_003_metallic.jpg');
const roughnessTexture = textureLoader.load('assets/Glass_Window_003_roughness.jpg');

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshStandardMaterial( { 
    map: colorTexture,
    metalnessMap: metalnessTexture,
    roughnessMap: roughnessTexture,
    normalMap: normalTexture,
    aoMap: ambientOcclusionTexture,
    alphaMap: alphaTexture,
    heightTexture
} );

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

### UV坐标

UV 贴图是一种在 3D 计算机图形学中使用的技术，用于将 2D 纹理映射到 3D 对象上。UV 坐标 (u, v) 表示应用于表面的 2D 坐标系一个 3D 模型。为了将纹理的当前部分应用到对象，我们需要使用从纹理图像中获取的特定坐标。从技术上讲，我们将纹理分成块，就像在图 10.4然后将它们与 UV 坐标一起使用。

UV 坐标是一对值 (u, v)，分配给 3D 模型的每个顶点。这些坐标决定了 2D 纹理如何应用于模型的表面。(0, 0)点对应于纹理的左下角，(1, 1)点对应于右上角。