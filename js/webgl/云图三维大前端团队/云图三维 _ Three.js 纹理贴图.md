


图片来源： https://unsplash.com/photos/UD5drKd4H6w

>[云图三维 连接你·创造的世界](https://www.yuntucad.com/) 致力于打造国内第一家集查看、建模、装配和渲染于一体的“云端CAD”协作设计平台。

应读者的要求，希望我们成立一个专业的、面向成渝地区的前端开发人员的webgl、Threejs行业QQ交流群，便于大家讨论问题。群里有研究webgl、Threejs大佬哦，欢迎大家加入！——点击链接加入群聊【three.js/webgl重庆联盟群】：<https://jq.qq.com/?_wv=1027&k=pX9BUnzn>

## 一、前言

今天这篇文章中，主要介绍下three.js中纹理贴图的模块，渲染一个 3D 物体时，网格 Mesh 决定了这个物体的形状态，如一个球，一辆车，一个人等。而纹理决定了这个物体的表面具体长什么样子。一个球包上一层篮球的花纹就是篮球了，而如果包上的是一层足球的花纹那可能就是足球了。

## 二、概述

Three.Js 中为定义了多种多样的纹理，其类图如下。

![0585M36@OQ2}}5DD(T_0M3E.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35f9c74156a14be6bbc8b0a654c55fcd~tplv-k3u1fbpfcp-watermark.image)

纹理的基类是 Texture，一般我们都使用这个类，通过给其属性 Image 传入一个图片从而构造出一个纹理。纹理是材质的属性，材质和几何体 Gemotry 构成 Mesh ，然后被添加到 Scene 中进行渲染。**纹理决定了物体的表面该是什么样子，而材质则决定了物体具备什么样的“气质”**。


## 三、纹理介绍

### 1、Texture

纹理的属性很多，但在一般情况下，并不要需要一一来设置，而是取默认值即可。并且，我们一般都会通过 `TextureLoader `来为我们构造一个纹理，而不是直接构造。例子如下。

```js
var texture = new THREE.TextureLoader().load( "textures/water.jpg" ); 
texture.wrapS = THREE.RepeatWrapping; 
texture.wrapT = THREE.RepeatWrapping; 
texture.repeat.set( 4, 4 );
```

一般情况下，我们这么简单的设置下就可以了。但实际应用中，我们可能会碰到需要指定自己的纹理坐标的情况。那这个时候，我们就需要自己计算好纹理坐标，然后给 geometry 添加属性 “uv”，从而应用我们自己的纹理坐标。

```js
geom.addAttribute('uv', new THREE.BufferAttribute(uvArr, 2))
```

通过纹理贴图加载器[TextureLoader](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/loaders/TextureLoader)的`load()`方法加载一张图片可以返回一个纹理对象[Texture](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/textures/Texture)，纹理对象`Texture`可以作为模型材质颜色贴图`.map`属性的值。

材质的颜色贴图属性`.map`设置后，模型会从纹理贴图上采集像素值，这时候一般来说不需要再设置材质颜色`.color`。`.map`贴图之所以称之为颜色贴图就是因为网格模型会获得颜色贴图的颜色值RGB。

```js
// 纹理贴图映射到一个矩形平面上 
var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面 
// TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理 
var textureLoader = new THREE.TextureLoader(); // 执行load方法，加载纹理贴图成功后，返回一个纹理对象
Texture textureLoader.load('Earth.png', function(texture) { 
var material = new THREE.MeshLambertMaterial({ 
// color: 0x0000ff, 
// 设置颜色纹理贴图：Texture对象作为材质map属性的属性值 
    map: texture,//设置颜色贴图属性值 
}); 
//材质对象
Material var mesh = new THREE.Mesh(geometry, material); 
//网格模型对象
Mesh scene.add(mesh); 
//网格模型添加到场景中 
//纹理贴图加载成功后，调用渲染函数执行渲染操作 
// render(); 
})
```

### 2、CanvasTexture
在Three.js中，肯定避免不了要设置实体的材质，比如说要给一个box加颜色、图片或者视频画面；
大家可以看以下代码

```js
new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff}); // 颜色
 
new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('./assets/plane.jpeg') } ); // 图片
 
new THREE.VideoTexture(document.getElementId('video')); // 视频
```

其实这些功能对我来说已经够用了，后来发现也可以用canvas的渲染作为材质，为了做demo方便自己包装了下

```js
var createCanvas = function (w,h) {
		w = w || 30;
		h = h || 30
		var cs = document.createElement('canvas')
		var ctx = cs.getContext('2d');
		cs.width = w;
		cs.height = h;
		ctx.fillStyle ="#fff";
		ctx.fillRect(0,0,w,h);
		ctx.strokeStyle = "#c00";
		ctx.shadowBlur = 20;
		ctx.shadowColor = "#c99";
		ctx.strokeWidth = 30;
		ctx.beginPath();
		ctx.moveTo(w/2, 0);
		ctx.lineTo(0,h);
		ctx.lineTo(w, h);
		ctx.closePath()
		ctx.stroke();
		return cs;
	}
 
var texture = new THREE.Texture(createCanvas(130,130)) 
var material = new THREE.MeshBasicMaterial({
    map: texture
})
```
附上效果图

![)XHJAY%NAZSX{V%W_VTL$CV.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24b7aeace2b74f7eb31c91bf4831abdf~tplv-k3u1fbpfcp-watermark.image)


### 3、DataTexture（数据纹理对象）
three.js数据纹理对象[DataTexture](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/textures/DataTexture)简单地说就是通过程序创建纹理贴图的每一个像素值。

程序生成一张图片的RGB值

![A9%A3_I0~7}@W$_@UUSS25A.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81eaec418b094b4b8f4fe6ae1854aed5~tplv-k3u1fbpfcp-watermark.image)

```js
var geometry = new THREE.PlaneGeometry(128, 128); //矩形平面 
/** * 创建纹理对象的像素数据 */ 
var width = 32; //纹理宽度 
var height = 32; //纹理高度 
var size = width * height; //像素大小 
var data = new Uint8Array(size * 3); //size*3：像素在缓冲区占用空间 
for (let i = 0; i < size * 3; i += 3) { // 随机设置RGB分量的值 
data[i] = 255 * Math.random() 
data[i + 1] = 255 * Math.random() 
data[i + 2] = 255 * Math.random() 
} 
// 创建数据文理对象 RGB格式：THREE.RGBFormat 
var texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat); 
texture.needsUpdate = true; 
//纹理更新 
//打印纹理对象的image属性 
// console.log(texture.image); 
var material = new THREE.MeshPhongMaterial({ 
map: texture, // 设置纹理贴图 
}); 
//材质对象Material 
var mesh = new THREE.Mesh(geometry, material);
```

## 写在最后

本文介绍了Three.js的纹理相关的内容，包含了使用Texture、CanvasTexture、DataTexture具体如何使用，希望对你有帮助。


> 本文发布自 云图三维大前端团队，文章未经授权禁止任何形式的转载。
