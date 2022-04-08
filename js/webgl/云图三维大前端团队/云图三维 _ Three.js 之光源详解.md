图片来源： https://unsplash.com/photos/wNsHBf_bTBo

>[云图三维 连接你·创造的世界](https://www.yuntucad.com/) 致力于打造国内第一家集查看、建模、装配和渲染于一体的“云端CAD”协作设计平台。

Three.js中光源有很多种，但是下面四种是最长用到的几种，分别是：

- 环境光（AmbientLight）
- 点光源（PointLight）
- 平行光 (DirectinalLight)
- 聚光灯 (SpotLight)

## 基础场景
在开始添加关于之前，我们先搭建一个简单的场景

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// 创建渲染器并设置大小,整体背景色为白色
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xFFFFFF));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enable = true;

// 添加坐标轴
var axes = new THREE.AxisHelper(10);
scene.add(axes);

// TOOD：添加物体

// 添加相机，设置相机的位置是正好对着场景原点
camera.position.x = -25;
camera.position.y = 30;
camera.position.z = 25;
camera.lookAt(new THREE.Vector3(0, 0, 0));

// TOOD:添加光源

document.getElementById("WebGL-output").appendChild(renderer.domElement);
renderer.render(scene, camera);

```

这个时候还没有环境光，场景中只有正方体本身的颜色，且为`FF0000`红色

## 环境光（AmbientLight）

[环境光](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/lights/AmbientLight)是指场景整体的光照效果，会均匀的照亮场景中的所有物体，是由于场景内若干光源的多次反射形成的亮度一致的效果，通常用来为整个场景指定一个基础亮度。因此，环境光没有明确的光源位置，在各处形成的亮度也是一致的。
在设置环境光时，只需要指定光的颜色即可，**不能用来投射阴影**，因为它**没有方向**：

```javascript
var ambiColor = "#ff0000";
var ambientLight = new THREE.AmbientLight(ambiColor);
scene.add(ambientLight);
```

其中，hex是十六进制的RGB颜色信息，如红色表示为0xff0000。
环境光并不在乎物体材质的color属性，而是ambient属性。ambient属性的默认值是0xffffff，若将两个长方体设置为：

```js
var greenCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
                new THREE.MeshLambertMaterial({color: 0x00ff00}));
greenCube.position.x = 3;
scene.add(greenCube); //将实体添加到场景中
var whiteCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
                new THREE.MeshLambertMaterial({color: 0xffffff}));
whiteCube.position.x = -3;
scene.add(whiteCube); //将实体添加到场景中
```

也就意味着ambient为`0x00ff00`的右边的长方体被渲染成了黑色。这是因为不透明物体的颜色其实是其反射光的颜色，而ambient属性表示的是**物体反射环境光的能力**。
对于`0x00ff00`的物体，红色通道是0，而环境光是完全的红光，因此该长方体不能反射任何光线，最终的渲染颜色就是黑色；而对于`0xffffff`的白色长方体，红色通道是0xff，因而能反射所有红光，渲染的颜色就是红色。

当环境光不是白色或灰色的时候，渲染的效果往往会很奇怪。因此，环境光通常使用白色或者灰色，**作为整体光照的基础**。

效果图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c902d6d64a04b19b095deeee6dd167c~tplv-k3u1fbpfcp-watermark.image)


## 点光源（PointLight）

[点光源](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/lights/PointLight)是不计光源大小，可以看作一个点发出的光源。点光源照到不同物体表面的亮度是线性递减的，因此，离点光源距离越远的物体会显得越暗，一个常见的例子是模拟一个灯泡发出的光，可投射阴影。

```js
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);
```
其中，构造函数原型`THREE.PointLight(hex, intensity, distance)`,hex是光源十六进制的颜色值；intensity是亮度，缺省值为1，表示100%亮度；distance是光源最远照射到的距离，缺省值为0。

效果图：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2624f322ca9d4485af0df56d088a04f0~tplv-k3u1fbpfcp-watermark.image)

## 平行光（DirectinalLight）

我们都知道，太阳光常常被看作[平行光](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/lights/DirectionalLight)，这是因为相对地球上物体的尺度而言，太阳离我们的距离足够远。对于任意平行的平面，平行光照射的亮度都是相同的，而与平面所在位置无关。

其中方法原型`THREE.DirectionalLight(hex, intensity)`,hex是光源十六进制的颜色值；intensity是亮度，缺省值为1，表示100%亮度。
此外，对于平行光而言，设置光源位置尤为重要。

```js
var light = new THREE.DirectionalLight();
light.position.set(2, 5, 3);
scene.add(light);
```

注意，这里设置光源位置并不意味着所有光从(2, 5, 3)点射出（如果是的话，就成了点光源），而是意味着，平行光将以矢量(-2, -5, -3)的方向照射到所有平面。因此，平面亮度与平面的位置无关，而只与平面的法向量相关。只要平面是平行的，那么得到的光照也一定是相同的。

效果图：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30d77558bf004b6a866b6cb5cf93df0e~tplv-k3u1fbpfcp-watermark.image)

## 聚光灯(SpotLight)

从官网上的定义：
A point light that can cast shadow in one direction.
可以看出，[聚光灯](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/lights/SpotLight)是一种特殊的点光源，它能够朝着一个方向投射光线。聚光灯投射出的是类似圆锥形的光线，这与我们现实中看到的聚光灯是一致的。
其构造函数为：

```js
const spot = THREE.SpotLight(hex, intensity, distance, angle, exponent) //创建一个聚光灯光源
```

相比点光源，多了angle和exponent两个参数。angle是聚光灯的张角，缺省值是Math.PI / 3，最大值是Math.PI / 2；exponent是光强在偏离target的衰减指数（target需要在之后定义，缺省值为(0, 0, 0)），缺省值是10。
在调用构造函数之后，除了设置光源本身的位置，一般还需要设置target：

```js
light.position.set(x1, y1, z1);
light.target.position.set(x2, y2, z2);
```

除了设置light.target.position的方法外，如果想让聚光灯跟着某一物体移动（就像真的聚光灯！），可以target指定为该物体：

```js
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
new THREE.MeshLambertMaterial({color: 0x00ff00}));
var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
light.target = cube;
```


## 阴影

明暗是相对的，阴影的形成也就是因为比周围获得的光照更少。因此，要形成阴影，光源必不可少。
在Three.js中，能形成阴影的光源只有THREE.DirectionalLight与THREE.SpotLight；而相对地，能表现阴影效果的材质只有THREE.LambertMaterial与THREE.PhongMaterial。因而在设置光源和材质的时候，一定要注意这一点。
下面，我们以聚光灯为例
首先，我们需要在初始化时，告诉渲染器渲染阴影：

```js
renderer.shadowMapEnabled = true; //开启阴影功能
```

然后，对于光源以及所有要产生阴影的物体调用：

```js
xxx.castShadow = true; 
```
对于接收阴影的物体调用：
```js
xxx.receiveShadow = true;
```

比如场景中一个平面上有一个正方体，想要让聚光灯照射在正方体上，产生的阴影投射在平面上，那么就需要对聚光灯和正方体调用castShadow = true，对于平面调用receiveShadow = true。

以上就是产生阴影效果的必要步骤了，不过通常还需要设置光源的阴影相关属性，才能正确显示出阴影效果。

- 对于聚光灯，需要设置shadowCameraNear、shadowCameraFar、shadowCameraFov三个值，类比我们在第二章学到的透视投影照相机，只有介于shadowCameraNear与shadowCameraFar之间的物体将产生阴影，shadowCameraFov表示张角。
- 对于平行光，需要设置shadowCameraNear、shadowCameraFar、shadowCameraLeft、shadowCameraRight、shadowCameraTop以及shadowCameraBottom六个值，相当于正交投影照相机的六个面。同样，只有在这六个面围成的长方体内的物体才会产生阴影效果。
为了看到阴影照相机的位置，通常可以在调试时开启`light.shadowCameraVisible = true`

## 写在最后

本文介绍了Three.js的光源相关的内容，包含了环境光（AmbientLight）、点光源（PointLight）、平行光 (DirectinalLight)、 聚光灯 (SpotLight)。


> 本文发布自 云图三维大前端团队，文章未经授权禁止任何形式的转载。