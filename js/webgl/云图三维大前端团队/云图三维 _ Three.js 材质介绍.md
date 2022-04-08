图片来源： https://unsplash.com/photos/EnxIiphOFzU

>[云图三维 连接你·创造的世界](https://www.yuntucad.com/) 致力于打造国内第一家集查看、建模、装配和渲染于一体的“云端CAD”协作设计平台。



Three.js提供了多种类型的材质（material）。材质定义了对象在场景中的外型，容易和它混淆的是纹理贴图。简单对比一下：

| 中文 |英文 | 本质 | 解释|
|---|---|---|---|
| 材质 | Materail |数据集| 核心在于**物体对光的交互**，供渲染器读取数据集，包括贴图纹理，光照算法|
| 纹理贴图 | Texture mapping |图像映射规则|核心在于**把存在内存的位图**，通过UV坐标映射到渲染物体表面|

Three.js一共提供了如下几种材质：
- LineBasicMaterial
- LineDashedMaterial
- MeshBasicMaterial
- MeshDepthMaterial
- MeshDistanceMaterial
- MeshLambertMaterial
- MeshMatcapMaterial
- MeshNormalMaterial
- MeshPhongMaterial
- MeshPhysicalMaterial
- MeshStandardMaterial
- MeshToonMaterial
- PointsMaterial
- RawShaderMaterial
- ShaderMaterial
- ShadowMaterial
- SpriteMaterial

下面选择几个重点介绍一下

## 设置材质

有2种方法可以设置大部分的材质属性。
一种是在实例化的时候设置

```js
const material = new THREE.MeshPhongMaterial({
  color: 0xFF0000,    // 红色 (也可以使用CSS的颜色字符串)
  flatShading: true,
});
```

另一种是在实例化之后设置

```js
const material = new THREE.MeshPhongMaterial();
material.color.setHSL(0, 1, .5);  // 红色
material.flatShading = true;
```

### THREE.Color
Three.js中，对颜色的操作都是通过`THREE.Color`实现的，可以通过多种凡是去设置属性。

```js
material.color.set(0x00FFFF);    // 同 CSS的 #RRGGBB 风格
material.color.set(cssString);   // 任何 CSS 颜色字符串, 比如 'purple', '#F32',
                                 // 'rgb(255, 127, 64)',
                                 // 'hsl(180, 50%, 25%)'
material.color.set(someColor)    // 其他一些 THREE.Color
material.color.setHSL(h, s, l)   // 其中 h, s, 和 l 从 0 到 1
material.color.setRGB(r, g, b)   // 其中 r, g, 和 b 从 0 到 1
```

在实例化时，你可以传递一个十六进制数字或CSS字符串作为参数。

```js
const m1 = new THREE.MeshBasicMaterial({color: 0xFF0000});         // 红色
const m2 = new THREE.MeshBasicMaterial({color: 'red'});            // 红色
const m3 = new THREE.MeshBasicMaterial({color: '#F00'});           // 红色
const m4 = new THREE.MeshBasicMaterial({color: 'rgb(255,0,0)'});   // 红色
const m5 = new THREE.MeshBasicMaterial({color: 'hsl(0,100%,50%)'); // 红色
```

## 材质效果

接下来看看three.js的几种材质的效果。

### MeshBasicMaterial、MeshLambertMaterial、MeshPhongMaterial

首先是`MeshBasicMaterial`,其特点在于**不受光照的影响**。而`MeshLambertMaterial` 只在**顶点计算光照**，然后 `MeshPhongMateria`l 则在**每个像素计算光照**,并且`MeshPhongMaterial` 还支持镜面高光。


![一个完整的对比图](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf5c499a9b954633b27dfe47a47f62ab~tplv-k3u1fbpfcp-watermark.image)


对于`MeshPhongMaterial` 的 `shininess（光泽度）` 设置决定了镜面高光的光泽度。它的默认值是30。通过设置不同的数值，可以看到下面的效果：

![设置shininess](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40f1b17540fd45ab98fc81e0721f77dc~tplv-k3u1fbpfcp-watermark.image)


> 需要注意一点的是将 `MeshLambertMaterial` 或 `MeshPhongMaterial` 的 emissive( 发光度 属性设置为颜色，并将颜色设置为黑色(phong的 shininess 为0)，最终看起来就像 MeshBasicMaterial 一样。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c19dd4dadacc41d99d9f9b899e9cf2f6~tplv-k3u1fbpfcp-watermark.image)


在实际工作应用场景中，可以根据不同的场景需求选用不同的材质，这也是为什么Three.js提供了这几种基本材质的原因。因为是更复杂的材质会**消耗更多**的GPU功耗。在一个较慢的GPU上，比如说手机，一般使用一个不太复杂的材质来减少绘制场景所需的GPU功耗。同样，如果不需要额外的功能，那就使用最简单的材质，已达到最佳的性能。如果你不需要**照明和镜面高光**，那么就使用 MeshBasicMaterial 。

### MeshToonMaterial
`MeshToonMaterial` 与` MeshPhongMaterial` 类似，但有一个很大的不同。**它不是平滑地着色，而是使用一个渐变图（一个X乘1的纹理（X by 1 texture））来决定如何着色**。默认使用的渐变图是前70%的部分,使用70%的亮度，之后的部分使用100%的亮度，我们可以定义自己的渐变图。这最终会给人一种两种色调的感觉。使用`MeshToonMaterial`材质之后的效果如下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d40b2d1e65bc41078f7b9b7402ef340a~tplv-k3u1fbpfcp-watermark.image)


### MeshStandardMaterial
接下来介绍一下图形学上经常提到的PBR，其全称是Physically Based Rendering，俗称物理渲染。Three.js提供了两种材质用于物理渲染，分别是`MeshStandardMaterial`与`MeshPhysicalMaterial`。

上面提到的材质只是使用简单的数学来实现的，虽然看起来是3D的，但它们并不是现实世界中实际存在的东西。而`MeshStandardMaterial`与`MeshPhysicalMaterial`PBR材质使用的是更复杂的数学来实现接近现实世界中的效果。

`MeshPhongMaterial` 和 `MeshStandardMaterial` 最大的区别**是它们使用的参数不同**。`MeshPhongMaterial` 有**一个**参数用来设置 `shininess` 属性。`MeshStandardMaterial` 有**2个参数**用来分别设置 `roughness` 和 `metalness` 属性。

在某种意义上将，`roughness(粗糙度)` 和 `shininess(光泽度)`是相反的 。粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。其设置范围从0到1。

另一个设定，`metalness`，说的是材质的**金属度**。金属与非金属的表现不同。0代表非金属，1代表金属。

下图是一个`MeshStandardMaterial` 快速示例，从左至右看，粗糙度从0到1，从上至下看，金属度从0到1。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d113890331db438bbf91c46958e34662~tplv-k3u1fbpfcp-watermark.image)

### MeshPhysicalMaterial
`MeshPhysicalMateria`l 与 `MeshStandardMaterial` 相同，但它增加了一个`clearcoat` 参数，该参数从0到1，决定了要涂抹的**清漆**光亮层的程度，还有一个 `clearCoatRoughness` 参数，指定光泽层的粗糙程度。

这里是和上面一样的以二维网格的形式对比，但可以设置 `clearcoat` 和 `clearCoatRoughness` 。


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6864351d60bd45d5b96450aa87869834~tplv-k3u1fbpfcp-watermark.image)

各种标准材质的创建速度从最快到最慢顺序如下：
**MeshBasicMaterial -> MeshLambertMaterial-> MeshPhongMaterial-> MeshStandardMaterial-> MeshPhysicalMaterial**
创建速度越慢的材质，做出的场景越逼真，但在低功率或移动设备上可能会有性能问题，所以在实际应用中需要根据具体场景进行优化。

### 特殊材质

接下来的3种材质有特殊用途。

- `ShadowMaterial` 用于获取阴影创建的数据。

- `MeshDepthMaterial` 渲染每个像素的深度，其中处在摄像机负近端面的像素其深度为0，处在摄像机负远端面的像素其深度为1。使用这个属性可以实现一些特殊效果。一个简单的例子

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2e54261b5284ff08b2af74862ddb702~tplv-k3u1fbpfcp-watermark.image)

- `MeshNormalMaterial` 会显示**几何体的法线**。法线是一个特定的三角形或像素所面对的方向。在调试的时候用得比较多。`MeshNormalMaterial` 会绘制视图空间法线（相对于摄像机的法线）。x 是红色, y 是绿色, 以及 z 是蓝色，所以朝向右边的东西是粉红色，朝向左边的是水蓝色，朝上的是浅绿色，朝下的是紫色，朝向屏幕的是淡紫色。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fac32be46104b38a3835217b712f610~tplv-k3u1fbpfcp-watermark.image)

- `ShaderMaterial` 通过Three.js的着色器系统来制作自定义材质。
- `RawShaderMaterial` 完全自定义的着色器，不需要Three.js的帮助。

## 材质常用属性

大多数材质都共享一套 Material 的属性。所有的属性都可以在[官方文档](https://threejs.org/docs/#api/zh/materials/Material)中找到，先来看看两个最常用的属性。

- flatShading：对象是否使用平面着色，默认为false。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61bac0e018904da4b723e786df4ac326~tplv-k3u1fbpfcp-watermark.image)

- side：要显示三角形的哪个面。默认值是 `THREE.FrontSide`，其他值`THREE.BackSide` 和 `THREE.DoubleSide（正反两面）`。Three.js中，大多数3D对象可能都是不透明的实体，所以不需要绘制反面（面向实体内部的面）。设置 side 的最常见的原因是**用于绘制平面或其他非实体对象**，在这些对象中通常会看到三角形的反面。

下面是用 `THREE.FrontSide` 和 `THREE.DoubleSide` 绘制的6个平面对比效果


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdeeb8bf9e73458789ea5aac59f83e72~tplv-k3u1fbpfcp-watermark.image)

- material.needsUpdate：Three.js会在使用材质时应用材质设置，也就是使用了材质的物体会被渲染。有些材质设置**只应用一次**，因为改变材质需要消耗很多资源。在这种情况下，需要设置 `material.needsUpdate = true` 来告诉 three.js 应用材质的变化。当你在使用材质后再去更改设置，需要去设置 `needsUpdate`的最常见的几种情况：

- flatShading
- 添加或删除纹理，改变纹理是可以的，但是如果想从**使用无纹理切换到使用纹理，或者从使用纹理切换到无纹理**，那么你需要设置 needsUpdate = true。


## 写在最后

本文介绍了Three.js的材质相关的内容，包含了`MeshBasicMaterial、MeshLambertMaterial、MeshPhongMaterial、MeshToonMaterial、MeshStandardMaterial、MeshPhysicalMaterial`，希望对有帮助


> 本文发布自 云图三维大前端团队，文章未经授权禁止任何形式的转载。