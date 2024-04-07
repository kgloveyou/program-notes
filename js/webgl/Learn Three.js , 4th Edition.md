# Learn Three.js Program 3D animations and visualizations for the web with JavaScript and WebGL, 4th Edition

Three.js r147

https://github.com/PacktPublishing/Learn-Three.js-Fourth-edition

**代码运行步骤**

```bash
$ cd source/
$ npm install
$ npm build
$ npm run serve
```



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

这本书中使用的设置只是开发 web 应用程序的众多方法之一。或者，你可以将 Three.js（和其他库）直接包含在你的 HTML 文件中，或者使用类似于 Three.js 网站上的示例的 import-maps 方法。所有这些方法都各有优劣势。在这本书中，我们选择了一种便于试验源代码并直接在浏览器中获得反馈的方法，这种方法与通常构建此类应用程序的方式非常相似。

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

#### Enabling orbit controls

`THREE.OrbitControls`  

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

## 创建一个场景

在 Three.js 中，**THREE.Scene** 是灯光和要渲染的网格物体的主要容器。**THREE.Scene** 本身并没有很多选项和功能。

**THREE.Scene** 是一个有时也称为场景图的结构。场景图可以包含图形场景的所有必要信息。在 Three.js 中，这意味着 **THREE.Scene** 包含了渲染所需的所有对象。值得注意的是，正如名称所暗示的那样，场景图不仅仅是一个对象数组；场景图由树形结构中的一组节点组成。正如我们在第 8 章“创建和加载高级网格和几何体”中将看到的，Three.js 提供了用于创建不同网格或灯光组的对象。用于创建场景图的主要对象是 **THREE.Group**。正如名称所暗示的那样，这个对象允许你将对象分组在一起。**THREE.Group** 继承自 Three.js 中另一个名为 **THREE.Object3D** 的基类，该基类提供了一组用于添加和修改子对象的标准函数。**THREE.Mesh** 和 **THREE.Scene** 也都继承自 **THREE.Object3D**，因此你也可以使用它们来创建嵌套结构。但是，使用 **THREE.Group** 来构建场景图更符合约定，并且在语义上也更正确。



如果你使用 `THREE.Scene.getObjectByName(name)` 函数，你可以直接检索特定对象，例如，改变其位置，而无需将JavaScript对象设为全局变量。



Three.js提供了其他有关THREE.Scene的有用函数，与场景的子对象相关：
- add：我们已经看到了这个函数，它将提供的对象添加到场景中。如果之前已经添加到不同的THREE.Object3D中，它将从该对象中移除。
- attach：这类似于add，但如果使用它，对该对象应用的任何旋转或平移都将被保留。
- getObjectById：当你将对象添加到场景中时，它会获得一个ID。第一个对象获得ID为1，第二个为2，依此类推。使用此函数，你可以根据该ID获取子对象。
- getObjectByName：根据其name属性返回对象。名称是你可以在对象上设置的内容 - 这与id属性形成对比，后者是由Three.js分配的。
- remove：从场景中移除此对象。
- clear：从场景中移除所有子对象。
请注意，前述函数实际上来自THREE.Scene扩展的基础对象：THREE.Object3D。
在整本书中，如果我们想要操作场景的子对象（或者在稍后我们将探索的THREE.Group中），我们将使用这些函数。

### 改变背景

我们已经看到，可以通过设置WebGLRenderer的clearColor来更改背景颜色，例如：renderer.setClearColor(backgroundColor)。你也可以使用THREE.Scene对象来更改背景。为此，你有三个选项：
• 选项1：你可以使用纯色。
• 选项2：你可以使用纹理，这基本上是一张图片，拉伸以填满整个屏幕。（有关纹理的更多信息，请参见第10章，加载和使用纹理。）
• 选项3：你可以使用环境贴图。这也是一种纹理，但它完全包围了摄像机，并且当你改变摄像机方向时它会移动。
请注意，这设置了我们要渲染到的HTML画布的背景颜色，而不是HTML页面的背景颜色。如果你想要一个透明的画布，你需要将渲染器的alpha属性设置为true：

```js
new THREE.WebGLRenderer({ alpha: true }}
```

### 更新场景中所有的材质

在 Three.js 中，**THREE.Scene** 有两个属性会影响场景中网格物体的材质。第一个属性是 `overrideMaterial`。首先，让我们看一下它是如何工作的。在章节代码页面的 `chapter-02/basic-scene.html` 中，你可以点击 “切换覆盖材质” 按钮。这会将场景中所有网格物体的材质更改为 `THREE.MeshNormalMaterial` 材质：

承接上文，正如你在前面的插图中看到的，所有物体（包括地面）现在都使用相同的材质 - 在本例中为 `THREE.MeshNormalMaterial`。这种材质根据网格的面相对于摄像机的方向 (法向量) 来为每个面染色。这可以通过代码轻松实现，只需调用 `scene.overrideMaterial = new THREE.MeshNormalMaterial();` 即可。

除了将完整的材质应用于场景之外，Three.js 还提供了一种方式将每个网格材质的环境映射属性设置为相同的值。环境映射模拟网格所处的环境（例如房间、室外或洞穴）。环境映射可以用于在网格上创建反射，使它们看起来更真实。

我们已经在上一节关于背景的讨论中看到了如何加载环境映射。如果我们想要所有材质都使用环境映射来实现更动态的反射和阴影，我们可以将加载好的环境映射分配给场景的 `environment` 属性：

```js
textureLoader.load("/assets/equi.jpeg", (loaded) => {
  loaded.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = loaded;
});
```

为了演示上述代码，你可以参考 chapter-02/basic-scene.html 示例中的 “切换环境” 按钮。现在如果你放大观察立方体，可以看到它们的表面会反射部分环境，不再是纯色了。

既然我们已经讨论了用于渲染所有对象的的基本容器，那么在下一节中，我们将仔细研究可以添加到场景中的对象 (结合了 THREE.Geometry 和材质的 THREE.Mesh)。

## How geometries and meshes are related

### 几何体的属性和函数

### 网格的属性和函数

  我们已经学习到，要创建一个网格，我们需要一个几何体和一个或多个材质。一旦我们有了一个网格，我们将其添加到场景中，然后进行渲染。你可以使用一些属性来更改网格在场景中的位置和外观方式。在我们的第一个示例中，我们将查看以下一组属性和函数：

- position：确定对象相对于其父对象位置的位置。大多数情况下，对象的父对象是一个THREE.Scene对象或一个THREE.Group对象。
- rotation：使用此属性，你可以设置对象围绕其任何轴的旋转。Three.js还提供了围绕单个轴旋转的特定函数：rotateX()、rotateY()和rotateZ()。
- scale：此属性允许你沿着x轴、y轴和z轴缩放对象。
- translateX() / translateY() 和 translateZ()：此属性沿着相应的轴移动对象指定的量。
- lookAt()：此属性将对象指向空间中的特定向量。这是手动设置旋转的替代方法。
- visible：此属性确定是否应该渲染此网格。
- castShadow：此属性确定当光线照射到网格时，是否应该投射阴影。默认情况下，网格不会投射阴影。

当我们旋转一个对象时，我们是围绕一个轴旋转的。在一个3D场景中，有多个空间具有你可以围绕其旋转的轴。rotateN() 函数在局部空间中围绕轴旋转对象。这意味着对象围绕其父对象的轴旋转。因此，当你将一个对象添加到场景中时，rotateN() 函数将围绕场景的主轴旋转该对象。当它是一个嵌套组的一部分时，这些函数将围绕其父对象的轴旋转对象，这通常是你要寻找的行为。Three.js 还有一个特定的 rotateOnWorldAxis 函数，它允许你围绕主 THREE.Scene 的轴旋转对象，而不考虑对象的实际父对象。最后，你还可以通过调用 rotateOnAxis 函数强制对象围绕自己的轴旋转（这称为对象空间）。

#### 使用position属性设置网格的位置

我们已经多次见过这个属性，所以让我们快速讨论一下。使用这个属性，你可以设置对象相对于其父对象的x、y和z坐标。

#### 使用rotation属性定义网格的旋转

使用此属性，你可以设置对象围绕其轴之一的旋转。你可以以与设置位置相同的方式设置此值。一个完整的旋转，你可能还记得数学课上讲过的，是2π。在Three.js中，你可以以几种不同的方式配置这个值：

```js
cube.rotation.x = 0.5 * Math.PI;
cube.rotation.set(0.5 * Math.PI, 0, 0);
cube.rotation = new THREE.Vector3(0.5 * Math.PI, 0, 0);
```

如果你想使用度数（从0到360），我们将不得不将其转换为弧度。这可以很容易地完成如下：

```js
const degrees = 45;
const inRadians = degrees * (Math.PI / 180);
```

在前面的代码块中，我们自己完成了转换。Three.js还提供了MathUtils类，该类提供了许多有用的转换，包括与我们在前面的代码块中所做的相同的转换。你可以使用`chapter-2/meshproperties`  示例来尝试这个属性。

#### 使用translate属性更改位置

使用translate属性，你还可以更改对象的位置，但不是定义你希望对象处于的绝对位置，而是定义对象应该移动的距离，相对于其当前位置。例如，我们有一个球体被添加到一个场景中，并且其位置被设置为(1, 2, 3)。接下来，我们沿着它的x轴进行平移：translateX(4)。现在它的位置将是(5, 2, 3)。如果我们想要将对象恢复到其原始位置，我们使用translateX(-4)。

## 在不同场景中使用不同的相机

在Three.js中有两种不同的相机类型：正交相机（orthographic camera）和透视相机（perspective camera）。请注意，Three.js还提供了一些非常特定的相机，用于创建可以使用3D眼镜或VR设备查看的场景。在本书中，我们不会详细介绍这些相机，因为它们的工作方式与本章中解释的相机完全相同。如果你对这些相机感兴趣，Three.js提供了一些标准示例：
- 红蓝立体效果：https://threejs.org/examples/#webgl_effects_anaglyph
- 视差屏障：https://threejs.org/examples/#webgl_effects_parallaxbarrier
- 立体效果：https://threejs.org/examples/#webgl_effects_stereo

如果你正在寻找简单的VR相机，你可以使用THREE.StereoCamera创建渲染在两侧的3D场景（标准立体效果），使用平行障碍（就像3DS提供的那样），或者提供红蓝立体效果，其中不同的视图以不同的颜色渲染。此外，Three.js对WebVR标准有一些实验性的支持，该标准受到许多浏览器的支持（更多信息，请参见https://webvr.info/developers/）。要使用这个，不需要做太多的改变。你只需设置renderer.vr.enabled = true，Three.js将处理其余部分。Three.js网站上有一些示例，展示了这个属性以及Three.js支持WebVR的一些其他特性：https://threejs.org/examples/。
现在，我们将专注于标准的透视和正交相机。解释这些相机之间的区别最好的方法是看一些示例。

### 正交相机与透视相机

#### 透视相机属性

#### 正交相机属性

### Looking at specific points

 到目前为止，你已经看到了如何创建相机以及各种参数的含义。在Chapter 1, Creating Your First 3D Scene with Three.js  ，你还看到需要将相机定位在场景中的某个位置，并且从该相机的视角进行渲染。通常，相机指向场景的中心：位置为(0, 0, 0)。然而，我们可以很容易地改变相机的观察目标，如下所示：

```js
camera.lookAt(new THREE.Vector3(x, y, z));
```

当你使用lookAt函数时，你将相机指向特定位置。你也可以使用这个函数使相机在场景中跟随一个对象。由于每个THREE.Mesh对象都有一个位置，该位置是一个THREE.Vector3对象，因此你可以使用lookAt函数指向场景中的特定网格。你只需要使用这个：camera.lookAt(mesh.position)。如果你在渲染循环中调用这个函数，你将使相机跟随一个对象在场景中移动。

### Debugging what a camera looks at  

# 3、在Three.js中使用光源

**注意**

WebGL本身并没有内置对光照的支持。如果没有Three.js，你将不得不编写特定的WebGL着色器程序来模拟这些类型的光照，这相当困难。你可以在https://developer.mozilla.org/en-US/docs/Web/WebGL/Lighting_in_WebGL找到一个很好的介绍，介绍了从头开始在WebGL中模拟光照的内容。

## Three.js提供了哪些类型的光源？

在Three.js中提供了几种不同的光源，它们都具有特定的行为和用途。在本章中，我们将讨论以下一组光源：

- THREE.AmbientLight：这是一种基本的光源，其颜色被添加到场景中物体的当前颜色中。
- THREE.PointLight：这是空间中的一个单一点，从该点向所有方向发光。这种光源可以用于创建阴影。
- THREE.SpotLight：这种光源具有类似于台灯、天花板聚光灯或手电筒的锥形效果。这种光源可以投射阴影。
- THREE.DirectionalLight：也称为无限光。这种光源的光线可以被看作是平行的，类似于太阳的光线。这种光源也可以用于创建阴影。
- THREE.HemisphereLight：这是一种特殊的光源，可以通过模拟反射表面和微弱的照亮天空来创建更自然的室外照明。这种光源也不提供任何与阴影相关的功能。
- THREE.RectAreaLight：使用这种光源，你可以指定一个区域来发光，而不是在空间中的单一点。THREE.RectAreaLight不投射任何阴影。
- THREE.LightProbe：这是一种特殊类型的光源，根据使用的环境贴图，创建一个动态环境光源来照亮场景。
- THREE.LensFlare：这不是一个光源，但是使用THREE.LensFlare，你可以在场景中的光源上添加镜头眩光效果。

本章分为两个主要部分。首先，我们将查看基本光源：THREE.AmbientLight、THREE.PointLight、THREE.SpotLight和THREE.DirectionalLight。所有这些光源都扩展了基本的THREE.Light对象，提供了共享的功能。在这里提到的光源是简单的光源，需要很少的设置，并且可以用来重新创建大多数所需的照明场景。在第二部分中，我们将查看几种特殊用途的光源和效果：THREE.HemisphereLight、THREE.RectAreaLight、THREE.LightProbe和THREE.LensFlare。你可能只在非常特殊的情况下需要这些光源。

## 使用基本光源

### THREE.AmbientLight  

当你创建一个THREE.AmbientLight时，颜色是全局应用的。这种光源没有特定的方向，THREE.AmbientLight不会产生任何阴影。你通常不会将THREE.AmbientLight作为场景中唯一的光源，因为它以相同的方式将其颜色应用于场景中的所有对象，而不考虑网格的形状。你可以将它与其他光源一起使用，比如THREE.SpotLight或THREE.DirectionalLight，以软化阴影或向场景中添加一些额外的颜色。理解这一点最简单的方法是查看chapter-
03  文件夹中的ambient-light.html示例。在这个示例中，你可以获得一个简单的用户界面，用于修改这个场景中可用的THREE.AmbientLight对象。
在以下的截图中，你可以看到我们使用了一个简单的瀑布模型，并且可以配置使用的THREE.AmbientLight对象的颜色和强度属性。在第一个截图中，你可以看到当我们将光的颜色设置为红色时发生了什么：



- THREE.PointLight：从一个特定点向所有方向发出光线。
- THREE.SpotLight：从一个特定点向锥形状发出光线。
- THREE.DirectionalLight：不是从单一点发出光线，而是从一个二维平面发出光线，这些光线是彼此平行的。

### THREE.SpotLight

THREE.SpotLight是你经常会使用的灯光之一（特别是如果你想要使用阴影的话）。THREE.SpotLight是一种具有锥形效果的光源。你可以将其与手电筒或灯笼进行比较。这种光源有一个方向和一个产生光线的角度。  



我将用几条提示来结束本节，以防你在阴影方面遇到问题。

如果阴影看起来很方块，你可以增加shadow.mapSize.width和shadow.mapSize.Height属性，并确保用于计算阴影的区域紧密地包裹着你的对象。你可以使用shadow.camera.near、shadow.camera.far和shadow.camera.fov属性来配置这个区域。
请记住，你不仅需要告诉光源投射阴影，还需要告诉每个几何体是否接收和/或投射阴影，方法是设置castShadow和receiveShadow属性。

如果你想要更柔和的阴影，你可以在THREE.WebGLRenderer上设置不同的shadowMapType值。默认情况下，该属性设置为THREE.PCFShadowMap；如果你将该属性设置为PCFSoftShadowMap，你将获得更柔和的阴影。

**注意**

Shadow bias 
如果你在场景中使用薄物体，渲染阴影时可能会出现奇怪的伪影。你可以使用shadow.bias属性来轻微偏移阴影，这通常可以解决这些问题。

### THREE.PointLight

### THREE.DirectionalLight 

### 使用THREE.Color对象

## 使用特殊光源

###  THREE.HemisphereLight  

使用THREE.HemisphereLight，我们可以创建更自然的室外照明。如果没有这种光源，我们可以通过创建THREE.DirectionalLight来模拟太阳，并可能添加另一个THREE.AmbientLight来为场景提供一些通用的颜色。然而，这样做看起来不够自然。当你在户外时，并不是所有的光都直接来自上方：大部分光线都是被大气散射并被地面和其他物体反射的。Three.js中的THREE.HemisphereLight就是为这种情况创建的。这是获得更自然的室外照明的简单方法。

### THREE.RectAreaLight  

### THREE.LightProbe  

在前一章中，我们简要介绍了什么是立方体贴图。使用立方体贴图，你可以将模型放置在一个环境中显示。在前一章中，我们使用立方体贴图创建了一个随着相机视角旋转的背景：

正如我们将在下一章中看到的那样，我们可以使用来自立方体贴图的信息在我们的材质上显示反射。通常情况下，这些环境贴图不会为你的场景提供任何光线。然而，通过THREE.LightProbe，我们可以从立方体贴图中提取光照级别信息，并将其用于照亮我们的模型。因此，你将获得的效果有点像THREE.AmbientLight，但它会根据物体在场景中的位置和立方体贴图的信息来影响物体。

在前面的示例中，我们有一个模型位于类似洞穴的环境中。如果你围绕相机旋转，你会看到根据环境的光照，我们的模型稍微有所不同的照明。在前面的截图中，我们看到的是物体的背面，在洞穴的更深处，因此该模型在那一侧较暗。如果我们完全旋转相机，并将洞穴的入口设置在背后，我们会看到模型更明亮，接收到更多的光线：

这是一个非常巧妙的技巧，使你的物体看起来更加栩栩如生，而不是单调平淡，使用THREE.LightProbe，你的模型将以非均匀的方式接收光线，这样看起来效果更好。

```js
const loadCubeMap = (renderer, scene) => {
  const base = 'drachenfels'
  const ext = 'png'
  const urls = [
    '/assets/panorama/' + base + '/posx.' + ext,
    '/assets/panorama/' + base + '/negx.' + ext,
    '/assets/panorama/' + base + '/posy.' + ext,
    '/assets/panorama/' + base + '/negy.' + ext,
    '/assets/panorama/' + base + '/posz.' + ext,
    '/assets/panorama/' + base + '/negz.' + ext
  ]

  new THREE.CubeTextureLoader().load(urls, function (cubeTexture) {
    cubeTexture.encoding = THREE.sRGBEncoding
    scene.background = cubeTexture
    const lp = LightProbeGenerator.fromCubeTexture(cubeTexture)
    lp.intensity = 15
    scene.add(lp)
  })
}

initScene(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.set(-7, 2, 5)
  orbitControls.update()

  loadIsland(scene)

  loadCubeMap(renderer, scene)

  const lightProbe = new THREE.LightProbe()
  scene.add(lightProbe)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    stats.update()

    orbitControls.update()
  }

  animate()
})
```

在上面的代码片段中，我们做了两件主要的事情。首先，我们使用THREE.CubeTextureLoader来加载立方体贴图。正如我们将在下一章中看到的，立方体贴图由六个图像组成，代表立方体的六个面，这些图像共同组成了我们的环境。一旦加载完成，我们将其设置为场景的背景（请注意，这对于THREE.LightProbe的工作是不需要的）。
现在我们有了这个立方体贴图，我们可以从中生成一个THREE.LightProbe。这通过将cubeTexture传递给LightProbeGenerator来完成。结果是一个THREE.LightProbe，我们将其添加到场景中，就像添加任何其他光源一样。与THREE.AmbientLight一样，你可以通过设置intensity属性来控制这个光源对网格照明的贡献程度。

**注意：**

Three.js还提供了另一种LightProbe：THREE.HemisphereLightProbe。这种LightProbe与普通的THREE.HemisphereLight几乎相同，但在内部使用了一个LightProbe。

本章的最后一个对象不是光源，而是经常在电影中出现的对相机的把戏：THREE.LensFlare。

### THREE.LensFlare  

你可能已经熟悉了镜头光晕。例如，当你直接拍摄太阳或其他明亮光源时，它们会出现。在大多数情况下，你希望避免这种情况，但对于游戏和3D生成的图像，它提供了一个很好的效果，使场景看起来更加真实。Three.js也支持镜头光晕，并且非常容易将它们添加到你的场景中。在本节中，我们将向场景添加一个镜头光晕，并创建以下截图中显示的输出；你可以通过打开lens-flare.html来自行查看：

# 4、使用Three.js材质

到目前为止，我们还没有详细讨论过材质。在本章中，我们将深入研究Three.js提供的所有材质，你将学习如何使用这些材质来创建漂亮的3D对象。本章中我们将探讨的材质如下所示：
- MeshBasicMaterial：这是一种基本材质，你可以使用它来给几何体赋予简单的颜色或显示几何体的线框。这种材质不受光源影响。
- MeshDepthMaterial：这是一种根据相机到物体的距离确定如何着色的材质。
- MeshNormalMaterial：这是一种简单的材质，它基于面的法向量确定颜色。
- MeshLambertMaterial：这是一种考虑了光照效果的材质，用于创建暗淡、不发光的物体。
- MeshPhongMaterial：这是一种考虑了光照效果的材质，可用于创建发光的物体。
- MeshStandardMaterial：这是一种使用物理渲染的材质来渲染物体。使用物理渲染，会使用一个物理上正确的模型来确定光线与表面的交互方式。这使你能够创建更准确和逼真的对象。
- MeshPhysicalMaterial：这是MeshStandardMaterial的扩展，允许更多地控制反射。
- MeshToonMaterial：这是MeshPhongMaterial的扩展，尝试使对象看起来是手绘的。
- ShadowMaterial：这是一种特殊的材质，可以接收阴影，但在其他方面呈现为透明。
- ShaderMaterial：这种材质允许你指定着色器程序，直接控制顶点的位置和像素的颜色。
- LineBasicMaterial：这是一种可以用在THREE.Line几何体上的材质，用于创建彩色线条。
- LineDashMaterial：与LineBasicMaterial相同，但这种材质还允许你创建虚线效果。

在Three.js的源代码中，你还可以找到THREE.SpriteMaterial和THREE.PointsMaterial。这些是你在样式化单个点时可以使用的材质。我们不会在本章中讨论它们，但我们将在第7章《Points and Sprites》中探讨它们。

## 理解常见的材质属性

### 基本属性

106

### 混合属性

材质具有几个通用的与混合相关的属性。混合决定了我们渲染的颜色如何与它们后面的颜色交互。当我们讨论材质的组合时，我们将稍微涉及这个主题。以下是混合属性的列表：

- blending（混合）：决定该对象上的材质与背景混合的方式。常规模式是THREE.NormalBlending，它只显示顶层。
- blendSrc（混合源）：除了使用标准的混合模式外，还可以通过设置blendSrc、blendDst和blendEquation来创建自定义的混合模式。这个属性定义了一个对象（源）如何混合到背景（目标）中。默认的THREE.SrcAlphaFactor设置使用alpha（透明度）通道进行混合。
- blendSrcAlpha（混合源透明度）：这是blendSrc的透明度。默认值为null。
- blendDst（混合目标）：该属性定义了背景（目标）在混合中的使用方式，默认为THREE.OneMinusSrcAlphaFactor，这意味着该属性也使用源的alpha通道进行混合，但将1（源的alpha通道）作为值。
- blendDstAlpha（混合目标透明度）：这是blendDst的透明度。默认值为null。
- blendEquation（混合方程）：这定义了blendSrc和blendDst值的使用方式。默认情况下是将它们相加（AddEquation）。通过这三个属性，你可以创建自己的自定义混合模式。

最后一组属性主要在内部使用，控制了WebGL如何用于渲染场景的具体细节。

### 高级属性

我们不会详细讨论这些属性。这些属性与WebGL内部工作原理有关。如果你确实想了解更多关于这些属性的信息，OpenGL规范是一个很好的起点。你可以在https://www.khronos.org/opengl/wiki找到该规范。以下列表提供了这些高级属性的简要描述：

## 从简单的材质开始

### THREE.MeshBasicMaterial

### THREE.MeshDepthMaterial  

接下来列表中的材质是THREE.MeshDepthMaterial。使用这种材质，物体的外观不是由灯光或特定的材质属性定义的 - 而是由物体到摄像机的距离定义的。例如，你可以将其与其他材质结合使用，轻松创建淡化效果。这种材质唯一额外的属性是我们在THREE.MeshBasicMaterial中看到的属性之一：wireframe。



通常情况下，你不会将这种材质作为网格的唯一材质；而是将它与不同的材质结合使用。我们将在下一节中看到它是如何工作的。

### Combining materials 

```js
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'
const material1 = new THREE.MeshDepthMaterial()
const material2 = new THREE.MeshBasicMaterial({
  color: 0xffff00
})
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const cube = SceneUtils.createMultiMaterialObject(geometry, [material2, material1])
```

 首先，我们创建两种材质。对于THREE.MeshDepthMaterial，我们不做任何特殊处理；对于THREE.MeshBasicMaterial，我们只设置颜色。在这段代码片段中的最后一行也是重要的。当我们使用SceneUtils.createMultiMaterialObject()函数创建一个带有多个材质的网格时，几何体被复制，并且以一个组的形式返回两个相同的网格。

当你首次打开此示例时，你将只看到实心对象，没有任何来自THREE.MeshDepthMaterial的效果。要结合这些颜色，我们还需要指定这些颜色如何混合。在图4.6中的右侧菜单中，你可以使用blending属性指定这一点。对于这个例子，我们使用了THREE.AdditiveBlending模式，这意味着颜色会相加，并显示结果颜色。这个例子是尝试不同混合选项并观察它们如何影响材质最终颜色的绝佳方式。

### THREE.MeshNormalMaterial  

正如你所看到的，网格的每个面呈现出略有不同的颜色。这是因为每个面的颜色基于指向面外的法线。而这个面法线是基于构成该面的各个顶点的法线向量的。法线向量是垂直于顶点的面的。法线向量在Three.js的许多不同部分中都被使用。它用于确定光线反射，有助于将纹理映射到3D模型，并提供有关如何在表面上照明、着色和着色像素的信息。幸运的是，Three.js处理这些向量的计算并在内部使用它们，因此你无需自己计算或处理它们。

Three.js提供了一个辅助程序来可视化这个法线，你可以通过在菜单中启用vertexHelpers属性来显示它：

### 单个网格使用多个材质

到目前为止，创建THREE.Mesh时，我们一直使用单个材质。还可以为几何体的每个面定义特定的材质。例如，如果你有一个立方体，它有12个面（记住，Three.js使用三角形），你可以为立方体的每一面分配一个不同的材质（例如，具有不同的颜色）。这样做非常简单，如下面的代码所示：

## 高级材质

在本节中，我们将介绍更高级的Three.js材质。我们将看到以下材质：

- THREE.MeshLambertMaterial：用于粗糙表面的材质
- THREE.MeshPhongMaterial：用于光滑表面的材质
- THREE.MeshToonMaterial：以卡通风格呈现网格的材质
- THREE.ShadowMaterial：仅显示投射在其上的阴影的材质；该材质在其他情况下为透明的
- THREE.MeshStandardMaterial：一种多功能材质，可用于表示许多不同类型的表面
- THREE.MeshPhysicalMaterial：类似于THREE.MeshStandardMaterial，但提供了用于更接近现实世界表面的额外属性
- THREE.ShaderMaterial：一种材质，你可以通过编写自己的着色器来定义如何渲染对象

## 用于线几何体的材质

# 5、学习使用几何体

在我们深入了解Three.js提供的几何体之前，我们首先要深入了解一下Three.js是如何内部表示几何体的，它使用的是THREE.BufferGeometry。在一些文档中，你可能仍然会遇到THREE.Geometry作为所有几何体的基本对象。然而，在更新的版本中，THREE.Geometry已经完全被THREE.BufferGeometry替代了，后者通常提供了更好的性能，因为它可以轻松地将数据传输到GPU。不过，它的使用比旧的THREE.Geometry要复杂一些。

使用THREE.BufferGeometry时，几何体的所有属性都由一组属性标识。属性基本上是一个带有一些附加元数据的数组，其中包含有关顶点位置的信息。属性也用于存储有关顶点的其他信息，例如其颜色。要使用属性定义顶点和面，你可以使用THREE.BufferGeometry的以下两个属性：

- attributes：attributes属性用于存储可以直接传递到GPU的信息。例如，要定义一个形状，你可以定义一个Float32Array，其中的每三个值定义了一个顶点的位置。然后，每个三个顶点都被解释为一个面。可以像这样在THREE.BufferGeometry中定义：geometry.setAttribute('position', new THREE.BufferAttribute(arrayOfVertices, 3))。

- index：默认情况下，不需要显式地定义面（每三个连续的位置被解释为单个面），但是使用index属性，我们可以明确地定义哪些顶点组成一个面：geometry.setIndex(indicesArray)。

在本章中使用这些几何体时，你不需要考虑这些内部属性，因为Three.js会在构建几何体时正确设置它们。但是，如果你想从头开始创建一个几何体，你需要使用前面列表中显示的属性。

在Three.js中，我们有一些会产生2D网格的几何体，以及更多会创建3D网格的几何体。在本章中，我们将讨论以下主题：
- 2D几何体
- 3D几何体

## 2D几何体

## 3D几何体



# 6、探索高级几何

## 学习高级几何体

### THREE.ConvexGeometry  

使用 THREE.ConvexGeometry，我们可以从一组点创建一个凸包（convex hull）。凸包是包围所有这些点的最小形状。

### THREE.LatheGeometry  

THREE.LatheGeometry允许你从一组共同形成曲线的点创建形状。

### BoxLineGeometry  

如果您只想显示轮廓线，您可以使用THREE.BoxLineGeometry。这个几何体的工作方式与THREE.BoxGeometry完全相同，但不是渲染实心对象，而是使用线条渲染盒子，如下所示（来自box-line-geometry.html）：

### THREE.RoundedBoxGeometry  

### TeapotGeometry  

## 通过拉伸二维形状来创建几何体

Three.js 提供了一种方法，可以将二维形状拉伸成三维形状。所谓的拉伸，就是沿着其 z 轴拉伸二维形状以将其转换为三维形状。例如，如果我们将 THREE.CircleGeometry 进行拉伸，我们将得到一个看起来像圆柱体的形状，如果我们将 THREE.PlaneGeometry 进行拉伸，我们将得到一个类似立方体的形状。最通用的拉伸形状的方法是使用 THREE.ExtrudeGeometry。

### THREE.ExtrudeGeometry  

### THREE.TubeGeometry  

### 从SVG元素拉伸3D形状

### THREE.ParametricGeometry  



## 可用于调试的几何图形

Three.js提供了两种辅助几何体，使得查看几何体的细节或仅轮廓更加容易：
- `THREE.EdgesGeometry`：提供一个仅渲染几何体边缘的几何体。
- `THREE.WireFrameGeometry`：渲染几何体但不显示任何面。

首先，让我们来看看 `THREE.EdgesGeometry`。

### THREE.EdgesGeometry 

它提供了一个只渲染几何体边缘的几何体。

### THREE.WireFrameGeometry  

这个几何体模拟了将材质的 wireframe 属性设置为 true 时所看到的效果：

## 创建一个三维文本网格



# 7、点和精灵

在之前的章节中，我们讨论了 Three.js 提供的最重要的概念、对象和 API。在本章中，我们将探讨到目前为止我们跳过的唯一概念：点和精灵。通过 `THREE.Points`（有时也称为精灵），可以非常容易地创建许多小矩形，它们始终面向摄像机，可以用来模拟雨、雪、烟等有趣的效果。例如，您可以将单个几何体渲染为一组点，并分别控制这些点。在本章中，我们将探索由 Three.js 提供的各种与点和精灵相关的功能。

**关于本章中使用的一些名称的简要说明**
在较新版本的 Three.js 中，与点相关的对象的名称已经多次更改。`THREE.Points` 对象以前被称为 `THREE.PointCloud`，在更早的版本中，它被称为 `THREE.ParticleSystem`。`THREE.Sprite` 以前被称为 `THREE.Particle`，而材质也经历了几次更名。因此，如果您看到使用这些旧名称的在线示例，请记住它们是在讨论相同的概念。

## 理解点和精灵



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

## 使用纹理美化粒子

# 8、创建和加载高级网格和几何体

## 几何体分组和合并

在这一节中，我们将学习Three.js的两个基本功能：将对象分组在一起和将多个几何体合并成一个单独的几何体。我们将从对象分组开始。

### 对象分组（Grouping objects together  ）

在之前的一些章节中，你已经看到了在使用多个材质时如何将对象分组。当你使用多个材质从几何体创建网格时，Three.js会创建一个组。你的几何体的多个副本被添加到这个组中，每个副本都有自己特定的材质。这个组被返回，所以它看起来像是一个使用多个材质的网格。然而，事实上它是一个包含多个网格的组。

创建组非常简单。你创建的每个网格都可以包含子元素，这些子元素可以使用 `add` 函数添加。将子对象添加到组中的效果是，你可以移动、缩放、旋转和平移父对象，所有的子对象也会受到影响。在使用组时，你仍然可以引用、修改和定位单独的几何体。你需要记住的唯一一件事是，所有的位置、旋转和平移都是相对于父对象进行的。

**使用 `THREE.Group` 的性能影响**

在我们进入下一节关于合并的内容之前，先简要说明一下性能问题。当你使用 `THREE.Group` 时，这个组内的所有单独的网格都被视为单独的对象，需要 Three.js 进行管理和渲染。如果你在场景中有大量的对象，你会看到性能明显下降。如果你看一下图 8.2 的左上角，你会发现在屏幕上有 5,000 个立方体时，我们的帧率（FPS）大约是 56。这还算不错，但通常我们的帧率应该在 120 FPS 左右。



Three.js 还提供了另一种方法，我们可以通过它来控制单独的网格，但性能更好。这就是使用 `THREE.InstancedMesh`。如果你想渲染大量具有相同几何形状但具有不同变换（例如，旋转、缩放、颜色或任何其他矩阵变换）的对象，这个对象非常适合使用。

我们创建了一个名为 instanced-mesh.html 的示例，展示了这个方法的工作原理。在这个示例中，我们渲染了 250,000 个立方体，但仍然保持了出色的性能。

因此，如果你要处理少量的网格（或使用不同几何形状的网格），你应该使用 `THREE.Group` 对象将它们分组在一起。如果你处理的是大量共享几何体和材质的网格，你可以使用 `THREE.InstancedMesh` 对象或 `THREE.InstancedBufferGeometry` 对象以获得出色的性能提升。

在下一节中，我们将看看合并操作，你将把多个独立的几何体合并成一个 `THREE.Geometry` 对象。

### 合并几何体（Merging geometries  ）

大多数情况下，使用组允许您轻松地操作和管理大量的网格。然而，当您处理大量对象时，性能将成为一个问题，因为 Three.js 必须单独处理组的所有子对象。通过 `BufferGeometryUtils.mergeBufferGeometries`，您可以将几何体合并在一起，创建一个组合的几何体，这样 Three.js 就只需要管理这个单一的几何体。在图 8.4 中，您可以看到这是如何工作的以及它对性能的影响。如果您打开 `merging.html` 示例，您会看到一个场景，其中包含了相同的随机分布的半透明立方体，我们将它们合并成一个单一的 `THREE.BufferGeometry` 对象：



**通过构造实体几何（Constructive Solid Geometry，CSG）**

除了在本章中看到的合并几何体的方式之外，我们还可以使用构造实体几何(CSG)来创建几何体。通过CSG，您可以对两个几何体应用操作（通常是加法、减法、差异和交集），从而组合出一个新的几何体，基于所选的操作。例如，使用CSG，很容易在一个立方体的一侧创建一个类似于球体凹陷的形状。您可以在Three.js中使用的两个库是`three-bvh-csg`（https://github.com/gkjohnson/three-bvh-csg）和`Three.csg`（https://github.com/looeee/threejs-csg）。

## 从外部资源加载几何体

Three.js可以读取大量的3D文件格式，并导入这些文件中定义的几何体和网格。需要注意的是，并非所有这些格式的所有功能都总是被支持的。因此，有时可能会出现纹理有问题，或者材质设置不正确的情况。现在用于交换模型和纹理的新事实标准是glTF，因此，如果您想加载外部创建的模型，将这些模型导出为glTF格式通常会在Three.js中获得最佳结果。

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