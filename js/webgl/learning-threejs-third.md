# 第1章　使用Threejs创建你的第一个三维场景

**网格（Mesh）**

表示基于以三角形为[polygon mesh](https://en.wikipedia.org/wiki/Polygon_mesh)（多边形网格）的物体的类。 同时也作为其他类的基类，例如SkinnedMesh。

https://threejs.org/docs/?q=Mesh#api/zh/objects/Mesh

**3D坐标系**  

x轴朝右，y轴朝上，z轴屏幕向外。



右手系(right-hand system)是在空间中规定[直角坐标系](https://baike.baidu.com/item/直角坐标系/1835293)的方法之一。此坐标系中x轴，y轴和z轴的正方向是如下规定的：把[右手](https://baike.baidu.com/item/右手/11035076)放在原点的位置，使大拇指，食指和中指互成直角，把大拇指指向x轴的正方向，食指指向y轴的正方向时，中指所指的方向就是z轴的正方向。也可以按如下方法确定右手(左手)坐标系：如果当右手(左手)的大拇指指向第一个[坐标轴](https://baike.baidu.com/item/坐标轴/9763108)(x轴)的正向，而其余手指以第二个轴(y轴)绕第一轴转动的方向握紧，就与第三个轴(z轴)重合，就称此坐标系为右手(左手)坐标系。



**OpenGL Transformation**

http://www.songho.ca/opengl/gl_transform.html



# 第2章	构建Three.js应用的基本组件





# 第3章	学习使用Three.js中的光源

## 3.2 基础光源

### THREE.AmbientLight

### THREE.SpotLight  

penumbra

半影 指天体本影周围有部分光通过的影区。呈圆锥形，顶端指向太阳。其边界同月球（或地球）、太阳相内切。在半影区内只能见到部分太阳。当月球半影扫过地球时，便发生日偏食。在影像上，半影是通过观察影像来认识物体的主要障碍，半影又称为模糊阴影。

https://baike.baidu.com/item/%E5%8D%8A%E5%BD%B1/14681287?fr=aladdin

![](https://bkimg.cdn.bcebos.com/pic/caef76094b36acafb9c6717c71d98d1001e99c08?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg)

### THREE.PointLight  

### THREE.DirectionalLight  

平行光

## 3.3　特殊光源

### 3.3.1　THREE.HemisphereLight

半球光光源

### 3.3.2　THREE.RectAreaLight

平面光光源，从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源。

### 3.3.3 镜头光晕（Lens flare ）

# 第4章　使用Three.js的材质

## 4.1　理解材质的共有属性

### 4.1.1　基础属性

### 4.1.2 混合属性（Blending properties  ）

最后一组属性主要在内部使用，用来控制使用 WebGL 渲染场景的细节。

### 4.1.3 高级属性

我们不会深入讨论这些属性的细节。 它们与 WebGL 内部如何工作有关。

## 4.2 从简单的网格材质开始

- `MeshBasicMaterial,`
- `MeshDepthMaterial,` 
- `MeshNormalMaterial.`  

### 4.2.1　THREE.MeshBasicMaterial

### 4.2.2　THREE.MeshDepthMaterial

使用这种材质的物体，其外观不是由光照或某个材质属性决定的，而是由物体到摄像机的距离决定的。

### 4.2.3　联合材质（Combining materials）

### 4.2.4　THREE.MeshNormalMaterial

### 4.2.5　在单几何体上使用多种材质

## 4.3　高级材质

### 4.3.1　THREE.MeshLambertMaterial

这种材质可以用来创建暗淡的并不光亮的表面。该材质非常易用，而且会对场景中的光源产生反应。

### 4.3.2　THREE.MeshPhongMaterial

通过该材质可以创建一种光亮的材质。

### 4.3.3　THREE.MeshStandardMaterial

该材质使用更加正确的物理计算来决定物体表面如何与场景中的光源互动。

### 4.3.4　THREE.MeshPhysicalMaterial

该材质与`THREE.MeshStandardMaterial`非常相似，但提供了对反光度的更多控制。

### 4.3.5　用THREE.ShaderMaterial创建自己的着色器  

Three.js库中最常用、最复杂的材质之一。通过它，可以使用自己定制的着色器，直接在WebGL环境中运行。

`fragmentShader`  galary 网站：https://glslsandbox.com/

## 4.4　线性几何体的材质

### 4.4.1　THREE.LineBasicMaterial



### 4.4.2　THREE.LineDashedMaterial

# 第5章　学习使用几何体

- `THREE.BufferGeometry`  ，效率更高，因为它可以轻松地将其数据获取到 GPU，但不太容易使用。

- `THREE.Geometry`  ，非常容易理解和使用。

  在 Three.js 的旧版本中，所有几何形状都基于 THREE.Geometry。

两者的相互转换方法：

```js
var normalGeometry = new THREE.Geometry();
normalGeometry.fromBufferGeometry(bufferGeometry);

var bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.fromGeometry(normalGeometry);
```



## 5.1　Three.js提供的基础几何体

### 5.1.1　二维几何体

#### THREE.PlaneGeometry  

二维矩形

#### THREE.CircleGeometry  

二维圆（或部分圆）

#### THREE.ShapeGeometry  

用于创建一个自定义的二维图形。通过`THREE.ShapeGeometry` ，可以调用几个函数类创建自己的图形。可以将该功能与HTML画布元素和SVG里的<path>元素的功能相比较。

### 5.1.2　三维几何体

#### THREE.BoxGeometry

长方体

#### THREE.SphereGeometry  

#### THREE.CylinderGeometry  

####   