r95

# 第1章　使用Threejs创建你的第一个三维场景

**网格（Mesh）**

表示基于以三角形为[polygon mesh](https://en.wikipedia.org/wiki/Polygon_mesh)（多边形网格）的物体的类。 同时也作为其他类的基类，例如SkinnedMesh。

https://threejs.org/docs/?q=Mesh#api/zh/objects/Mesh

**3D坐标系**  

x轴朝右，y轴朝上，z轴屏幕向外。



右手系(right-hand system)是在空间中规定[直角坐标系](https://baike.baidu.com/item/直角坐标系/1835293)的方法之一。此坐标系中x轴，y轴和z轴的正方向是如下规定的：把[右手](https://baike.baidu.com/item/右手/11035076)放在原点的位置，使大拇指，食指和中指互成直角，把大拇指指向x轴的正方向，食指指向y轴的正方向时，中指所指的方向就是z轴的正方向。也可以按如下方法确定右手(左手)坐标系：如果当右手(左手)的大拇指指向第一个[坐标轴](https://baike.baidu.com/item/坐标轴/9763108)(x轴)的正向，而其余手指以第二个轴(y轴)绕第一轴转动的方向握紧，就与第三个轴(z轴)重合，就称此坐标系为右手(左手)坐标系。



在 ThreeJS 中，一个物体可看作一个 Mesh，Mesh 的坐标是用一个 Vector3 来表示的，Vector3 中包含了 x、y、z 坐标。**空间坐标系是三维的，其原点默认在屏幕中心**，且 x y z 的范围是 [-1,1]



**OpenGL Transformation**

http://www.songho.ca/opengl/gl_transform.html



## 1.1　准备工作

## 1.2　获取源码

### 1.2.1　通过Git获取代码仓库

### 1.2.2　下载并解压缩档案文件

### 1.2.3　测试示例

## 1.3　搭建HTML框架

## 1.4　渲染并查看三维对象

## 1.5　添加材质、光源和阴影效果

​		基本材质（`THREE.MeshBasicMaterial`）不会对光源有任何反应，基本材质只会使用指定的颜色来渲染物体。

​		Three.js中的材质THREE.MeshLambertMaterial、THREE.MeshPhysicalMaterial和THREE.MeshStandardMaterial（以及被弃用的 THREE.MeshPhongMaterial）在渲染时会对光源产生反应。

​		并不是所有光源都能够产生阴影，但是通过 THREE.SpotLight 定义的光源能够产生阴影的。

## 1.6　让你的场景动起来

### 1.6.1　引入requestAnimationFrame()方法

```js
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
```

在这里我们创建了一个使渲染器能够在每次屏幕刷新时对场景进行绘制的循环（在大多数屏幕上，刷新率一般是60次/秒）。如果你是一个浏览器游戏开发的新手，你或许会说*“为什么我们不直接用setInterval来实现刷新的功能呢？”*当然啦，我们的确可以用setInterval，但是，**requestAnimationFrame**有很多的优点。最重要的一点或许就是当用户切换到其它的标签页时，它会暂停，因此不会浪费用户宝贵的处理器资源，也不会损耗电池的使用寿命。

### 1.6.2　旋转立方体

### 1.6.3　弹跳球

## 1.7　使用datGUI简化试验流程

## 1.8　场景对浏览器的自适应

## 1.9　总结

# 第2章	构建Three.js应用的基本组件

## 2.1　创建场景

### 2.1.1　场景的基本功能

### 2.1.2　给场景添加雾化效果

### 2.1.3　使用overrideMaterial属性

## 2.2　几何体和网格

### 2.2.1　几何体的属性和方法

### 2.2.2　网格对象的属性和方法

## 2.3　选择合适的摄像机

正交投影摄像机、透视投影摄像机

**备注**：还支持VR摄像机，例如 `THREE.StereoCamera`。（Dual PerspectiveCameras used for effects such as [3D Anaglyph](https://en.wikipedia.org/wiki/Anaglyph_3D) or [Parallax Barrier](https://en.wikipedia.org/wiki/parallax_barrier).）

### 2.3.1　正交投影摄像机和透视投影摄像机

Orthographic camera versus perspective camera  

正交相机：无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。**用于渲染2D场景或者UI元素是非常有用的**。



透视相机：被用来模拟人眼所看到的景象。**它是3D场景的渲染中使用得最普遍的投影模式**。

我们在使用透视相机时，可能会遇到这种情况：边缘处的物体会产生一定程度上的形变，原因是：**透视相机是鱼眼效果，如果视域越大，边缘变形越大。为了避免边缘变形，可以将fov角度设置小一些，距离拉远一些**

[PerspectiveCamera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera)

```js
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );//垂直方向为 45 度
scene.add( camera );
```

**Constructor**

**PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )**

fov — Camera frustum vertical field of view.
aspect — Camera frustum aspect ratio.
near — Camera frustum near plane.
far — Camera frustum far plane.

这四个参数定义了一个 *"视椎 (frustum)"*。 *视椎 (frustum)* 是指一个像被削去顶部的金字塔形状。换句话说，可以把 "视椎 (frustum)" 想象成其他三维形状如球体、立方体、棱柱体、截椎体。



fov分为水平视场角（HFOV）和垂直视场角（VFOV）。

[VR的FOV是什么](https://blog.csdn.net/lushuo9156/article/details/54928601)

VR头显的视场角通常指水平视场角

[Field of View(FOV)视野 水平角度与垂直角度切换计算](https://www.bilibili.com/read/cv16924939)

在Unity中就是指相机在透视模式(Perspective)下视野的角度,也就是上图 ∠θ,默认是垂直方向的角度,但是有的时候计算需要水平方向的角度,那么如何根据垂直方向的视角求出水平方向的视角呢? 作者：白白_可乐 https://www.bilibili.com/read/cv16924939 出处：bilibili

[浅析相机FOV](https://blog.csdn.net/huangkangying/article/details/108393392)

FOV又分为HFOV(水平）, VFOV( 垂直）， DFOV(对角）。



As you can see in this figure, there is a separate horizontal and vertical field of view.**Three.js only allows you to set the vertical one**, and the horizontal field of view is determined based on the aspect ratio you define on a camera. When you look at this figure, you can also directly see how this recipe works. By changing the field of view, we shrink the near and far planes and limit what is being rendered, and this way, we can zoom in.  (Three.js Cookbook.2015.pdf)



切换相机代码：

```js
var trackballControls  
var controls = new function () {
    this.perspective = "Perspective";
    this.switchCamera = function () {
        if (camera instanceof THREE.PerspectiveCamera) {
            camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
            camera.position.x = 120;
            camera.position.y = 60;
            camera.position.z = 180;
            camera.lookAt(scene.position);

            trackballControls = initTrackballControls(camera, renderer);
            this.perspective = "Orthographic";
        } else {
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.x = 120;
            camera.position.y = 60;
            camera.position.z = 180;



            camera.lookAt(scene.position);
            trackballControls = initTrackballControls(camera, renderer);
            this.perspective = "Perspective";
        }
    };
};

var gui = new dat.GUI();
gui.add(controls, 'switchCamera');
gui.add(controls, 'perspective').listen();
```



### 2.3.2　将摄像机聚焦在指定点上



# 第3章	学习使用Three.js中的光源

没有光源，渲染的场景将不可见（除非你使用基础材质或线框材质）。

## 3.1　Threejs中不同种类的光源

## 3.2 基础光源

### THREE.AmbientLight

`THREE.AmbientLight`不会产生阴影。

### THREE.SpotLight  

penumbra

半影 指天体本影周围有部分光通过的影区。呈圆锥形，顶端指向太阳。其边界同月球（或地球）、太阳相内切。在半影区内只能见到部分太阳。当月球半影扫过地球时，便发生日偏食。在影像上，半影是通过观察影像来认识物体的主要障碍，半影又称为模糊阴影。

https://baike.baidu.com/item/%E5%8D%8A%E5%BD%B1/14681287?fr=aladdin

![](https://bkimg.cdn.bcebos.com/pic/caef76094b36acafb9c6717c71d98d1001e99c08?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg)

[SpotLightHelper](https://threejs.org/docs/index.html?q=CameraHelper#api/en/helpers/SpotLightHelper)

This displays a cone shaped helper object for a SpotLight.

[CameraHelper](https://threejs.org/docs/index.html?q=CameraHelper#api/en/helpers/CameraHelper)

This helps with visualizing what a camera contains in its frustum.
It visualizes the frustum of a camera using a LineSegments.



### THREE.PointLight  

### THREE.DirectionalLight  

平行光

```js
{
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}
```

平行光有一个位置和目标点。默认值都为 (0, 0, 0)。

## 3.3　特殊光源

### 3.3.1　THREE.HemisphereLight

半球光光源

### 3.3.2　THREE.RectAreaLight

平面光光源，从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源。

### 3.3.3 镜头光晕（Lens flare ）

r143

```js
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
```



## 3.4　总结

# 第4章　使用Three.js的材质

## 4.1　理解材质的共有属性

### 4.1.1　基础属性

### 4.1.2 混合属性（Blending properties  ）

融合决定了我们渲染的颜色如何与它们后面的颜色交互。

最后一组属性（`blendEquation`）主要在内部使用，用来控制使用 WebGL 渲染场景的细节。

### 4.1.3 高级属性

我们不会深入讨论这些属性的细节。 它们与 WebGL 内部如何工作有关。如果想更多地了解这些属性，那么OpenGL规范是一个很好的起点。

## 4.2 从简单的网格材质开始

- `MeshBasicMaterial,`
- `MeshDepthMaterial,` 
- `MeshNormalMaterial.`  

### 4.2.1　THREE.MeshBasicMaterial

这种材质不考虑场景中光照的影响。（？）

### 4.2.2　THREE.MeshDepthMaterial

使用这种材质的物体，其外观不是由光照或某个材质属性决定的，而是由物体到摄像机的距离决定的。

### 4.2.3　联合材质（Combining materials）

### 4.2.4　THREE.MeshNormalMaterial

给球体每个面添加法线箭头

```js
  for (var f = 0, fl = sphere.geometry.faces.length; f < fl; f++) {
    var face = sphere.geometry.faces[f];
    var centroid = new THREE.Vector3(0, 0, 0);
    centroid.add(sphere.geometry.vertices[face.a]);
    centroid.add(sphere.geometry.vertices[face.b]);
    centroid.add(sphere.geometry.vertices[face.c]);
    centroid.divideScalar(3);

    var arrow = new THREE.ArrowHelper(
      face.normal,
      centroid,
      2,
      0x3333FF,
      0.5,
      0.5);
    sphere.add(arrow);
  }
```



### 4.2.5　在单几何体上使用多种材质

## 4.3　高级材质

### 4.3.1　THREE.MeshLambertMaterial

这种材质可以用来创建暗淡的并不光亮的表面。该材质非常易用，而且会对场景中的光源产生反应。

### 4.3.2　THREE.MeshPhongMaterial

通过该材质可以创建一种光亮的材质。

### 4.3.3　THREE.MeshStandardMaterial

该材质使用更加正确的物理计算来决定物体表面如何与场景中的光源互动。这种材质不但能够更好地表现塑料质感和金属质感的表面，而且向开发者提供了两个新的属性：`metalness` 和 `roughness`。

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

在新版api中，基类已经是`BufferGeometry`

https://threejs.org/docs/index.html?q=PlaneGeometry#api/en/geometries/PlaneGeometry

#### THREE.CircleGeometry  

二维圆（或部分圆）

#### THREE.RingGeometry 



#### THREE.ShapeGeometry  

用于创建一个自定义的二维图形。通过`THREE.ShapeGeometry` ，可以调用几个函数类创建自己的图形。可以将该功能与HTML画布元素和SVG里的<path>元素的功能相比较。

### 5.1.2　三维几何体

#### THREE.BoxGeometry

基类：BufferGeometry，立方缓冲几何体

#### THREE.SphereGeometry  

https://threejs.org/docs/index.html?q=SphereGeometry#api/zh/geometries/SphereGeometry

基类：BufferGeometry，球缓冲几何体

#### THREE.CylinderGeometry  

#### THREE.ConeGeometry  

圆锥缓冲几何体

####   THREE.TorusGeometry  

圆环缓冲几何体

#### THREE.TorusKnotGeometry  

环状扭结

#### THREE.PolyhedronGeometry  

多面体。Three.js提供了几种特定的多面体，你可以直接使用，而不必指定THREE.PolyhedronGeometry 的顶点和面。

#### THREE.IcosahedronGeometry  

20面体

#### THREE.TetrahedronGeometry  

正四面体

#### THREE.OctahedronGeometry  

八面体

#### THREE.DodecahedronGeometry  

12面体

# 第6章　高级几何体和二元操作

## 6.1　THREE.ConvexGeometry

凸包

## 6.2　THREE.LatheGeometry

车削缓冲几何体，样条曲线绕着某个轴旋转得到的图形，比如花瓶、铃铛或葫芦等。

## 6.3 通过拉伸创建几何体

### 6.3.1　THREE.ExtrudeGeometry

从一个形状路径中，挤压/拉伸出一个BufferGeometry。

### 6.3.2　THREE.TubeGeometry

创建一个沿着三维曲线延伸的管道。

### 6.3.3　从SVG拉伸

使用`d3-threeD`库解析`svg`字符串

## 6.4　THREE.ParametricGeometry

生成由参数表示其表面的几何体。

## 6.5　创建三维文本

### 6.5.1　渲染文本

### 6.5.2 添加自定义字体

FaceType.js库可以将TrueType和OpenType字体转换为JavaScript文件或JSON文件，以便在网页中的Javascript程序中直接使用。

可以访问网站https://gero3.github.io/facetype.js/在线转换所需的TrueType和OpenType字体。

## 6.6　使用二元操作组合网格

`ThreeBSP`库，可以将现有的模型组合出更多个性的模型来使用。我们可以使用`ThreeBSP`库里面的三个函数进行现有模型的组合，分别是：subtract(相减)、union（并集)、intersect(相交)。

### 6.6.1　subtract函数

### 6.6.2　intersect函数

### 6.6.3　union函数

这个函数并不是很实用，因为Three.js自己也提供了这个功能（`THREE.Geometry.merge` ），而且性能更好。

# 第7章　粒子和精灵

THREE.Points

## 7.1　理解粒子

精灵（[Sprite](https://threejs.org/docs/index.html#api/zh/objects/Sprite)）：精灵是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理。

当你想使用大量的`THREE.Sprite`  对象时，你会很快遇到性能问题，因为每个对象需要分别由Three.js进行管理。Three.js提供了另外一种方式来处理大量的粒子，这需要使用`THREE.Points`。  

## 7.2　THREE.Points和THREE.PointsMaterial

## 7.3　使用HTML5画布样式化粒子

### 7.3.1　在THREE.CanvasRenderer中使用HTML5画布

使用canvs绘图方式绘制图形。

### 7.3.2　在WebGLRenderer中使用HTML5画布

两种方式：

- 使用`THREE.PointsMaterial`并创建`THREE.Points`对象
- 使用`THREE.Sprite`和`THREE.SpriteMaterial`的`map`属性。

## 7.4　使用纹理样式化粒子

你可以使用 THREE.TextureLoader().load() 函数将图像加载为 THREE.Texture 对象。 然后可以将此 THREE.Texture 对象分配给材质的map属性。



你可能还记得，我们只能为 THREE.Points 对象提供一种材质。 如果我们想要多个材质，我们只需要使用多个 THREE.Points 实例，如下所示：

## 7.5　使用精灵贴图

## 7.6　从高级几何体创建THREE.Points

## 7.7　总结

​		到目前为止，我们已经根据 Three.js 提供的几何形状创建了网格。这适用于简单的模型，例如球体和立方体，但当你想要创建复杂的 3D 模型时，这不是最好的方法。 对于这些模型，你通常会使用 3D 建模应用程序，例如 Blender 或 3D Studio Max。

# 第8章　创建、加载高级网格和几何体

## 8.1　几何体组合与合并

### 8.1.1　对象组合
```js
sphere = createMesh(new THREE.SphereGeometry(5, 10, 10));
cube = createMesh(new THREE.BoxGeometry(6, 6, 6));

group = new THREE.Group();
group.add(sphere);
group.add(cube);

scene.add(group);
```

当三维物体被添加到组对象后，它们自身的位置、缩放和旋转参数便是相对于组对象的对应参数的。

### 8.1.2　将多个网格合并成一个网格



## 8.2　从外部资源加载几何体

### 8.2.1　以Three.js的JSON格式保存和加载

**1、保存和加载THREE.Mesh**

保存

```js
var result = knot.toJSON();
localStorage.setItem("json", JSON.stringify(result));
console.log(localStorage.getItem("json"));
```

加载

```js
var json = localStorage.getItem("json");

if (json) {
    var loadedGeometry = JSON.parse(json);
    var loader = new THREE.ObjectLoader();

    loadedMesh = loader.parse(loadedGeometry);
    loadedMesh.position.x -= 40;
    scene.add(loadedMesh);
}
```

**2、保存和加载场景**



### 8.2.2　使用Blender



## 8.3　导入三维格式文件

### 8.3.1　OBJ和MTL格式

​		OBJ和MLT是相互配合的两种格式，经常一起使用。OBJ文件定义几何体，而MTL文件定义所用的材质。OBJ和MTL都是基于文本的格式。

​		如果你只想加载几何体，可以使用OBJLoader。

```js
  var loader = new THREE.OBJLoader();
  loader.load('../../assets/models/pinecone/pinecone.obj', function (mesh) {

    var material = new THREE.MeshLambertMaterial({
      color: 0x5C3A21
    });

    // loadedMesh is a group of meshes. For 
    // each mesh set the material, and compute the information 
    // three.js needs for rendering.
    mesh.children.forEach(function (child) {
      child.material = material;
      child.geometry.computeVertexNormals();
      child.geometry.computeFaceNormals();
    });

    mesh.scale.set(120,120,120)

    // call the default render loop.
    loaderScene.render(mesh, camera);
  });
```

​		使用OBJLoader和MTLLoader加载模型并直接赋予材质。

### 8.3.2　加载Collada模型

​		COLLADA 模型（扩展名为 .dae）是另一种非常常见的模型，用于定义场景和模型（以及动画，我们将在下一章中看到）的格式。在 COLLADA 模型中，不仅定义了几何形状，还定义了材料。 甚至可以定义光源。

```js
  // load the model
  var loader = new THREE.ColladaLoader();
  loader.load("../../assets/models/medieval/Medieval_building.DAE", function (result) {

    var sceneGroup = result.scene;
    sceneGroup.children.forEach(function (child) {
      if (child instanceof THREE.Mesh) {
        child.receiveShadow = true;
        child.castShadow = true;
      } else {
        // remove any lighting sources from the model
        sceneGroup.remove(child);
      }
    });

    // correctly scale and position the model
    sceneGroup.rotation.z = 0.5 * Math.PI;
    sceneGroup.scale.set(8, 8, 8);

    // call the default render loop.
    loaderScene.render(sceneGroup, camera);
  });
```

### 8.3.3　从其他格式的文件中加载模型

### 8.3.4　展示蛋白质数据银行中的蛋白质



### 8.3.5　从PLY模型中创建粒子系统

## 8.4　总结

# 第9章　创建动画和移动摄像机

## 9.1　基础动画

```js
render();
function render() {
  // render the scene
  renderer.render(scene, camera);
  // schedule the next rendering using requestAnimationFrame
  requestAnimationFrame(render);
}
```

### 9.1.1　简单动画



### 9.1.2　选择对象

```js
    function onDocumentMouseDown(event) {

        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        vector = vector.unproject(camera);

        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

        if (intersects.length > 0) {
            console.log(intersects[0]);
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.1;
        }
    }
```

三维向量（Vector3）

.unproject ( camera : Camera ) : this

camera — 在投影中使用的摄像机。

将此向量(坐标)从相机的标准化设备坐标 (NDC) 空间投影到世界空间。

**Raycaster**

https://threejs.org/docs/#api/zh/core/Raycaster

这个类用于进行[raycasting](https://en.wikipedia.org/wiki/Ray_casting)（光线投射）。 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。

该链接有示例可以参考。

### 9.1.3　使用Tween.js实现动画

## 9.2　使用摄像机

### 9.2.1　轨迹球控制器

轨迹球控制器（TrackballControls）

https://threejs.org/docs/index.html?q=TrackballControls#examples/zh/controls/TrackballControls

常用的放大、缩小、旋转和平移功能。

[chroma.js](https://github.com/gka/chroma.js)

Chroma.js is a tiny small-ish zero-dependency JavaScript library (13.5kB) for all kinds of color conversions and color scales.

Chroma.js 是一个小型的零依赖 JavaScript 库 (13.5kB)，用于各种颜色转换和色阶。

```js
  var loader = new THREE.OBJLoader();
  loader.load("../../assets/models/city/city.obj", function (object) {

    var scale = chroma.scale(['red', 'green', 'blue']);
    setRandomColors(object, scale);
    mesh = object ;
    scene.add(mesh);
  });
```

`chroma.scale([<color1>,<color2>, ... , <color n>])` 函数，将在指定的颜色之间创建色阶。

`setRandomColors` 定义在 utils.js中的函数。

### 9.2.2　飞行控制器

`FlyControls`  

代码运行结果与书中效果不一致：没有那些控制，点击鼠标直接放大到不可见。

参考，https://threejs.org/examples/#misc_controls_fly



### 9.2.3　第一视角控制器

`FirstPersonControls`

像第一视角射击游戏一样。

### 9.2.4　轨道控制器

`OrbitControl`  

可以用于控制场景中的对象围绕场景中心旋转和平移。

## 9.3　变形动画和骨骼动画

Morphing and skeletal animation

- 变形动画
- 骨骼动画



### 9.3.1　用变形目标创建动画

**使用混合器和变形目标创建动画**

Animation with a mixer and morphtargets

为本身带有变形动画数据的模型设置和播放动画。

**使用多个THREE.AnimationClip对象**

手动创建包含两个`THREE.AnimationAction`  对象的动画。

### 9.3.2　用骨骼和蒙皮创建动画

Animation using bones and skinning

## 9.4　使用外部模型创建动画



### 9.4.1　使用Blender创建骨骼动画

### 9.4.2　从Collada模型加载动画

​		Three.js还有一个`KMZLoader`加载器，用于加载KMZ（Keyhole Markup language Zipped  ）模型。该模型基本就是压缩过的COLLADA  模型。如需加载此类模型，只需要将`ColladaLoader`  替换成`KMZLoader`  即可。

### 9.4.3　从雷神之锤（Quake）模型中加载动画

### 9.4.4　使用gltfLoader

### 9.4.5　利用fbxLoader显示动作捕捉模型动画

Autodesk FBX 格式

### 9.4.6　通过xLoader加载古老的DirectX模型

### 9.4.7　利用BVHLoader显示骨骼动画

### 9.4.8　如何重用SEA3D模型

## 9.5　总结

# 第10章　加载和使用纹理

## 10.1　将纹理应用于材质

### 10.1.1　加载纹理并应用到网格

```js
var textureLoader = new THREE.TextureLoader();
textureLoader.load("'../../assets/textures/general/metal-rust.jpg",
onLoadFunction, onProgressFunction, onErrorFunction)
```



### 10.1.2　使用凹凸贴图创建褶皱

Using a bump map to create wrinkles  

### 10.1.3　使用法向贴图创建更加细致的凹凸和褶皱

### 10.1.4　使用移位贴图来改变顶点位置

### 10.1.5　用环境光遮挡贴图实现细节阴影

​		在渲染循环里重复的渲染阴影是一个负担沉重的操作。如果场景中的光源或物体持续运动，则我们别无选择，只能用这种方式。但是在更多的情形里，场景中总是有静止不动的光源和物体，这意味着投射在物体上的阴影也不会变化，因为如果能计算一次阴影数据并在渲染循环里重复利用，那将是一个好主意。Three.js提供了两种不同的专用贴图：环境光遮挡贴图和光照贴图。

### 10.1.6　用光照贴图产生假阴影

### 10.1.7　金属光泽度贴图和粗糙度贴图

### 10.1.8　Alpha贴图

​		Alpha贴图用于控制物体表面的透明度。

### 10.1.9　自发光贴图（Emissive map）

​		自发光特性只能单独影响物体本身，却不能是该物体变成光源。

### 10.1.10　高光贴图（Specular map）

​		使用高光贴图，你可以定义模型的哪些部分应该是闪亮的，哪些部分应该是粗糙的（类似于我们之前看到的金属光泽度贴图和粗糙度贴图）。

### 10.1.11　使用环境贴图创建伪镜面反射效果

​		计算环境反射非常耗费 CPU，通常需要光线追踪方法。 如果你想在 Three.js 中使用反射，你仍然可以这样做，但你必须伪造它。你可以通过创建对象所在环境的纹理并将其应用于指定对象来实现。

refraction，折射



## 10.2　纹理的高级用途



### 10.2.1　自定义UV映射

### 10.2.2	重复纹理

### 10.2.3	在画布上绘制图案并作为纹理

### 10.2.4	将视频输出作为纹理

`live-server`黑屏，`http-server`正常显示。

`http-server`无法运行，可以安装`anywhere`。

```sh
npm install -g anywhere
```

运行，在要启动静态服务的目录下执行

```sh
anywhere -p 8080
```



## 10.3	总结

# 第11章 自定义着色器和后期处理

## 11.1	配置Three.js以进行后期处理

### 11.1.1	创建THREE.EffectComposer对象

## 11.2	后期处理通道

### 11.2.1	简单后期处理通道

### 11.2.2 	使用掩膜的高级效果组合器

### 11.2.3	高级渲染通道：景深效果

### 11.2.4 	高级渲染通道：环境光遮挡

## 11.3	 使用THREE.ShaderPass自定义效果

## 11.4	创建自定义后期处理着色器

### 11.4.1	 自定义灰度图着色器

​		顶点着色器（vertex shader）和片段着色器（fragment shader）。顶点着色器可用于改变单个顶点的位置，片段着色器可用于确定单个像素的颜色。

​		当你编写着色器时，你使用**OpenGL Shading Language (GLSL)**   编写它们，

### 11.4.2 	自定义位着色器

## 11.4 	总结

# 第12章 在场景中添加物理效果和声音

https://github.com/chandlerprall/Physijs

已经停止更新。2.0版本最新提交时间：Commits on Nov 14, 2016。

其他的库：[Babylon.js](https://www.babylonjs.com/)（巴比伦），功能和Three.js并列。Babylonjs 由微软公司发布 并持续更新。

## 12.1  使用Physi.js创建基本的Three.js场景

## 12.2  Physi.js材质属性

## 12.3  Physi.js支持的形体（shapes）

## 12.4  使用约束限制对象的移动

### 12.4.1  使用PointConstraint限制两点间的移动

### 12.4.2  使用HingeConstraint创建类似门的约束

### 12.4.3  使用SliderConstraint将移动限制在一个轴上

### 12.4.4  使用ConeTwistConstraint创建类似球销的约束

### 12.4.5  使用DOFConstraint实现细节的控制

​		`DOFConstraint`, also called the  degree of freedom constraint  



## 12.5  在场景中添加声源 

`live-server`和`http-server`无法运行，可以安装`anywhere`。

```sh
npm install -g anywhere
```

运行，在要启动静态服务的目录下执行

```sh
anywhere -p 8080
```

## 12.6  总结