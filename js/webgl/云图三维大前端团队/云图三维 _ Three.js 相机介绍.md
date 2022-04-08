

图片来源： https://unsplash.com/photos/dozkVhDyvhQ

>[云图三维 连接你·创造的世界](https://www.yuntucad.com/) 致力于打造国内第一家集查看、建模、装配和渲染于一体的“云端CAD”协作设计平台。

Three.js中相机有很多种，但是最长用到的有以下两种：

| 名称 | 可视体 | 区别 |
| --- | --- | --- |
| 正交相机（OrthographicCamera）| 长方体 |无论物体距离相机距离远或者近，大小都保持不变。常用于制图、建模  |
| 透视相机（PerspectiveCamera）| 四锥体  | 模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式 |


## 正交相机（OrthographicCamera）


[正交相机（OrthographicCamera）](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/cameras/OrthographicCamera)所看到的物体都是三维的，但是人的眼睛只能看到正面，不能看到被遮挡的背面，三维几何体在人眼睛中的效果就像一张相机拍摄的二维照片，你看到的是一个2D的投影图。 空间几何体转化为一个二维图的过程就是投影，不同的投影方式意味着投影尺寸不同的算法。

构造函数：

```js
/**
 * 正投影相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
```

```js
// 构造函数格式
OrthographicCamera( left, right, top, bottom, near, far )
```


| 参数 |含义  |
| --- | --- |
| left | 渲染空间的左边界 |
| right | 渲染空间的右边界 |
| top | 渲染空间的上边界 |
| bottom | 渲染空间的下边界 |
| near | near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 默认值0.1 |
| far | far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小小，会有部分场景看不到。 默认值1000 |

如下图所示：

![c48a1d57e7cdcbd7f02122ba41d811bd.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9142fa66caea4918b0194609be1ae7bd~tplv-k3u1fbpfcp-watermark.image)


## 透视相机（PerspectiveCamera）


[透视相机（PerspectiveCamera）](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/cameras/PerspectiveCamera)的结果除了与几何体的角度有关，还和距离相关， 人的眼睛观察世界就是透视投影，比如你观察一条铁路距离越远你会感到两条轨道之间的宽度越小。无论正投影还是透视投影，three.js都对相关的投影算法进行了封装， 大家只需要根据不同的应用场景自行选择不同的投影方式。使用[OrthographicCamera](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/cameras/OrthographicCamera)相机对象的时候，three.js会按照正投影算法自动计算几何体的投影结果； 使用[PerspectiveCamera](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/cameras/PerspectiveCamera)相机对象的时候，three.js会按照透视投影算法自动计算几何体的投影结果。

构造函数：

```js
/**
 * 透视投影相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
/**透视投影相机对象*/
var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
```


```js
// 构造函数格式
PerspectiveCamera( fov, aspect, near, far )
```
| 参数 |含义  |默认值  |
| --- | --- |--- |
| fov | fov表示视场，所谓视场就是能够看到的角度范围，人的眼睛大约能够看到180度的视场，视角大小设置要根据具体应用，一般游戏会设置60~90度 |45度|
| aspect | aspect表示渲染窗口的长宽比，如果一个网页上只有一个全屏的canvas画布且画布上只有一个窗口，那么aspect的值就是网页窗口客户区的宽高比 |window.innerWidth/window.innerHeight|
| near | near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 | 0.1|
| far | far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小，会有部分场景看不到|1000|

如下图所示：

![u=1373517419,1809253126&fm=26&fmt=auto&gp=0.webp](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aeed969a2b414ad4aeaf6f109462e5e5~tplv-k3u1fbpfcp-watermark.image)

## 写在最后
本文介绍了Three.js的相机相关的内容，正交相机（OrthographicCamera）、透视相机（PerspectiveCamera）希望对你有帮助。

> 本文发布自 云图三维大前端团队，文章未经授权禁止任何形式的转载。
