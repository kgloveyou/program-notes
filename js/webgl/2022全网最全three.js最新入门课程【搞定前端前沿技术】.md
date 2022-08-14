# 2022全网最全three.js最新入门课程【搞定前端前沿技术】

https://www.bilibili.com/video/BV1Gg411X7FY/?vd_source=ada6f000d1772e939ebb2f8afea929b3

屏幕绘制工具，Epic pen

## 10-Gsap动画库基本使用与原理

## 11-Gsap控制动画属性与方法

## 13-调用js接口控制画布全屏和退出全屏

```js
window.addEventListener('dblclick', ()=>{
  if(document.fullscreenElement){
    // 退出全屏
    document.exitFullscreen();
  } else {
    // 让画布全屏
    renderer.domElement.requestFullscreen();
  }
});
```

## 14-应用图形用户界面更改变量

```shell
npm install --save dat.gui
```

## 01-掌握几何体顶点_UV_法向属性

## 09-环境遮挡贴图与强度

aoMap（Ambient Occlusion），设置为一张包含阴影的环境遮挡贴图，使得对象有立体感和阴影效果。



## 10-详解PBR物理渲染

## 11-标准网格材质与光照物理效果

MeshStandardMaterial

需要有光源才会显示出来。



## 12-位移贴图与顶点细分设置

displacementMap

高度贴图，使得物体看起来有真正的凹凸感。

需要一并设置几何体的以下参数

```
widthSegments — （可选）宽度的分段数，默认值是1。
heightSegments — （可选）高度的分段数，默认值是1。
depthSegments — （可选）深度的分段数，默认值是1。
```

## 13-设置粗糙度与粗糙度贴图

设置`MeshStandardMaterial`的`roughness`。0.0表示平滑的镜面反射，1.0表示完全漫反射。当为0时，可以看见光源的高亮。

roughnessMap，加载一张粗糙度贴图图片。

## 14-设置金属度与金属贴图

metalness

设置为1，完全金属的话，在光线找不到的情况下，全黑。

## 15-法线贴图应用

光源打到物体上，不同位置阴影和强度都不同，更有真实感。

## 16-如何获取各种类型纹理贴图

[Poliigon - Textures, Models and HDRIs for 3D rendering](https://www.poliigon.com/)

[Arroway Textures – Professional Textures](https://www.arroway-textures.ch/)

注册一个Unreal账号，使用自带的Quixel Bridge里面的贴图。

## 17-纹理加载进度情况

TextureLoader

LoadingManager

可用于纹理文件、模型文件的加载。

## 18-详解环境贴图

金属球反射的周边景象就是用环境贴图实现。

https://threejs.org/examples/?q=env#webgl_materials_envmaps

envMap

## 19-经纬线映射贴图与HDR

// 给场景添加贴图

设置Scene的background为Texture.

// 给场景所有的物体添加默认的环境贴图

设置Scene的environment为Texture.



HDR，高动态范围

*.hdr图片（拍不同曝光的一系列图片，然后合成一张图）

使用[DataTextureLoader](https://threejs.org/docs/index.html?q=data#api/zh/loaders/DataTextureLoader) 的子类 [RGBELoader](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/RGBELoader.js) 加载。

在加载完成的回调中，设置

```js
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 目标：设置环境纹理
// 加载hdr环境图
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("textures/hdr/002.hdr").then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});
```

显示的结果与看房软件360度全景效果一致，可以旋转查看四周。

## 01-灯光与阴影的关系与设置

**基础网格材质(MeshBasicMaterial)**

这种材质不受光照的影响。

**标准网格材质(MeshStandardMaterial)**

基于物理的渲染（PBR），支持光照。

在实践中，该材质提供了比[MeshLambertMaterial](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/MeshLambertMaterial) 或[MeshPhongMaterial](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/MeshPhongMaterial) 更精确和逼真的结果，代价是计算成本更高。

日常用这个基本够了。

## 02-平行关阴影属性与阴影相机原理

[DirectionalLightShadow](https://threejs.org/docs/index.html?q=shadow#api/zh/lights/shadows/DirectionalLightShadow)

[正交相机（OrthographicCamera）](https://threejs.org/docs/index.html?q=camera#api/zh/cameras/OrthographicCamera)

.updateProjectionMatrix () : undefined

更新摄像机投影矩阵。在任何参数被改变以后必须被调用。

## 03-详解聚光灯各种属性与应用

## 04-详解点光源属性与应用

[点光源（PointLight）](https://threejs.org/docs/index.html?q=pointl#api/zh/lights/PointLight)

## 手把手教你用three.js开发水天一色小岛

敲注释内容，直接出代码的工具是`copilot`插件。

天空是给Sphere（天空球）添加纹理图片，渲染得到的。

把geometry反转过来，让视角位于球的内部。默认是在球的外部的。

本项目平面贴图有个缺陷，转动会出现边界，可以使用鱼眼摄像机拍摄一张360度的图片，进行贴图。

- 天空

使用视频纹理，创建流动的云。

- 水面

导入官方的水面对象

```js
// 导入水面
import { Water } from "three/examples/jsm/objects/Water2";

// 创建水面
const waterGeometry = new THREE.CircleBufferGeometry(300, 64);
const water = new Water(waterGeometry, {
  textureWidth: 1024,
  textureHeight: 1024,
  color: 0xeeeeff,
  flowDirection: new THREE.Vector2(1, 1),
  scale: 1,
});
water.position.y = 3;
// 水面旋转至水平
water.rotation.x = -Math.PI / 2;
scene.add(water);
```

- 小岛

使用模型文件glb

```js
// 导入gltf载入库
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
```

## 3D地月环绕实战案例

文字用CSS 2D渲染器（CSS2DRenderer）实现。

地球和月球的贴图用textureLoader加载。

背景的星空直接对canvas设置css样式。（backgroud-image）



更新摄像头设置后，一定要调用`updateProjectionMatrix`方法。

```js
// 调整尺寸
window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}
```

## 前端用AI写酷炫3D导弹飞行演示

这里指用copilot插件写代码。

glb模型文件中已经包含地图、导弹和曲线。

导弹的爆炸效果是用THREE.Sprite写的，他的材质是用shader（*.glsl）实现。

添加爆炸声音。

```js
const listener = new THREE.AudioListener();
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load("assets/bomb.mp3", (buffer) => {
  sound.setBuffer(buffer);
  // sound.setLoop(true);
  sound.setVolume(0.5);
  // sound.play();
});
```

## 详解THREE.js实现VR看房

方案1：采用Cube。

思路：给一个长方体贴上6张图片。

让盒子反过来，进入盒子内部。

```js
cube.geometry.scale(1, 1, -1);
```

方案2：一张全景图（hdr），映射到球上。

## 01-宝马汽车产品展示项目与原理

物理网格材质(MeshPhysicalMaterial)

只讲了原理，没有实现过程。下面几节是实现过程。

## 02-编写Threejs项目基础代码

## 03-模型加载与展厅灯光