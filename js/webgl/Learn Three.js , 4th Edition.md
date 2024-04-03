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

这本书中使用的设置只是开发 web 应用程序的众多方法之一。或者，您可以将 Three.js（和其他库）直接包含在您的 HTML 文件中，或者使用类似于 Three.js 网站上的示例的 import-maps 方法。所有这些方法都各有优劣势。在这本书中，我们选择了一种便于试验源代码并直接在浏览器中获得反馈的方法，这种方法与通常构建此类应用程序的方式非常相似。

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
- getObjectById：当您将对象添加到场景中时，它会获得一个ID。第一个对象获得ID为1，第二个为2，依此类推。使用此函数，您可以根据该ID获取子对象。
- getObjectByName：根据其name属性返回对象。名称是您可以在对象上设置的内容 - 这与id属性形成对比，后者是由Three.js分配的。
- remove：从场景中移除此对象。
- clear：从场景中移除所有子对象。
请注意，前述函数实际上来自THREE.Scene扩展的基础对象：THREE.Object3D。
在整本书中，如果我们想要操作场景的子对象（或者在稍后我们将探索的THREE.Group中），我们将使用这些函数。

### 改变背景

我们已经看到，可以通过设置WebGLRenderer的clearColor来更改背景颜色，例如：renderer.setClearColor(backgroundColor)。您也可以使用THREE.Scene对象来更改背景。为此，您有三个选项：
• 选项1：您可以使用纯色。
• 选项2：您可以使用纹理，这基本上是一张图片，拉伸以填满整个屏幕。（有关纹理的更多信息，请参见第10章，加载和使用纹理。）
• 选项3：您可以使用环境贴图。这也是一种纹理，但它完全包围了摄像机，并且当您改变摄像机方向时它会移动。
请注意，这设置了我们要渲染到的HTML画布的背景颜色，而不是HTML页面的背景颜色。如果您想要一个透明的画布，您需要将渲染器的alpha属性设置为true：

```js
new THREE.WebGLRenderer({ alpha: true }}
```

### 更新场景中所有的材质

在 Three.js 中，**THREE.Scene** 有两个属性会影响场景中网格物体的材质。第一个属性是 `overrideMaterial`。首先，让我们看一下它是如何工作的。在章节代码页面的 `chapter-02/basic-scene.html` 中，你可以点击 “切换覆盖材质” 按钮。这会将场景中所有网格物体的材质更改为 `THREE.MeshNormalMaterial` 材质：

承接上文，正如您在前面的插图中看到的，所有物体（包括地面）现在都使用相同的材质 - 在本例中为 `THREE.MeshNormalMaterial`。这种材质根据网格的面相对于摄像机的方向 (法向量) 来为每个面染色。这可以通过代码轻松实现，只需调用 `scene.overrideMaterial = new THREE.MeshNormalMaterial();` 即可。

除了将完整的材质应用于场景之外，Three.js 还提供了一种方式将每个网格材质的环境映射属性设置为相同的值。环境映射模拟网格所处的环境（例如房间、室外或洞穴）。环境映射可以用于在网格上创建反射，使它们看起来更真实。

我们已经在上一节关于背景的讨论中看到了如何加载环境映射。如果我们想要所有材质都使用环境映射来实现更动态的反射和阴影，我们可以将加载好的环境映射分配给场景的 `environment` 属性：

```js
textureLoader.load("/assets/equi.jpeg", (loaded) => {
  loaded.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = loaded;
});
```

为了演示上述代码，您可以参考 chapter-02/basic-scene.html 示例中的 “切换环境” 按钮。现在如果您放大观察立方体，可以看到它们的表面会反射部分环境，不再是纯色了。

既然我们已经讨论了用于渲染所有对象的的基本容器，那么在下一节中，我们将仔细研究可以添加到场景中的对象 (结合了 THREE.Geometry 和材质的 THREE.Mesh)。

## How geometries and meshes are related

### 几何体的属性和函数

### 网格的属性和函数

  我们已经学习到，要创建一个网格，我们需要一个几何体和一个或多个材质。一旦我们有了一个网格，我们将其添加到场景中，然后进行渲染。您可以使用一些属性来更改网格在场景中的位置和外观方式。在我们的第一个示例中，我们将查看以下一组属性和函数：

- position：确定对象相对于其父对象位置的位置。大多数情况下，对象的父对象是一个THREE.Scene对象或一个THREE.Group对象。
- rotation：使用此属性，您可以设置对象围绕其任何轴的旋转。Three.js还提供了围绕单个轴旋转的特定函数：rotateX()、rotateY()和rotateZ()。
- scale：此属性允许您沿着x轴、y轴和z轴缩放对象。
- translateX() / translateY() 和 translateZ()：此属性沿着相应的轴移动对象指定的量。
- lookAt()：此属性将对象指向空间中的特定向量。这是手动设置旋转的替代方法。
- visible：此属性确定是否应该渲染此网格。
- castShadow：此属性确定当光线照射到网格时，是否应该投射阴影。默认情况下，网格不会投射阴影。

当我们旋转一个对象时，我们是围绕一个轴旋转的。在一个3D场景中，有多个空间具有您可以围绕其旋转的轴。rotateN() 函数在局部空间中围绕轴旋转对象。这意味着对象围绕其父对象的轴旋转。因此，当您将一个对象添加到场景中时，rotateN() 函数将围绕场景的主轴旋转该对象。当它是一个嵌套组的一部分时，这些函数将围绕其父对象的轴旋转对象，这通常是您要寻找的行为。Three.js 还有一个特定的 rotateOnWorldAxis 函数，它允许您围绕主 THREE.Scene 的轴旋转对象，而不考虑对象的实际父对象。最后，您还可以通过调用 rotateOnAxis 函数强制对象围绕自己的轴旋转（这称为对象空间）。

#### 使用position属性设置网格的位置

我们已经多次见过这个属性，所以让我们快速讨论一下。使用这个属性，您可以设置对象相对于其父对象的x、y和z坐标。

#### 使用rotation属性定义网格的旋转

使用此属性，您可以设置对象围绕其轴之一的旋转。您可以以与设置位置相同的方式设置此值。一个完整的旋转，您可能还记得数学课上讲过的，是2π。在Three.js中，您可以以几种不同的方式配置这个值：

```js
cube.rotation.x = 0.5 * Math.PI;
cube.rotation.set(0.5 * Math.PI, 0, 0);
cube.rotation = new THREE.Vector3(0.5 * Math.PI, 0, 0);
```

如果您想使用度数（从0到360），我们将不得不将其转换为弧度。这可以很容易地完成如下：

```js
const degrees = 45;
const inRadians = degrees * (Math.PI / 180);
```

在前面的代码块中，我们自己完成了转换。Three.js还提供了MathUtils类，该类提供了许多有用的转换，包括与我们在前面的代码块中所做的相同的转换。您可以使用`chapter-2/meshproperties`  示例来尝试这个属性。

#### 使用translate属性更改位置

使用translate属性，您还可以更改对象的位置，但不是定义您希望对象处于的绝对位置，而是定义对象应该移动的距离，相对于其当前位置。例如，我们有一个球体被添加到一个场景中，并且其位置被设置为(1, 2, 3)。接下来，我们沿着它的x轴进行平移：translateX(4)。现在它的位置将是(5, 2, 3)。如果我们想要将对象恢复到其原始位置，我们使用translateX(-4)。

## 在不同场景中使用不同的相机

在Three.js中有两种不同的相机类型：正交相机（orthographic camera）和透视相机（perspective camera）。请注意，Three.js还提供了一些非常特定的相机，用于创建可以使用3D眼镜或VR设备查看的场景。在本书中，我们不会详细介绍这些相机，因为它们的工作方式与本章中解释的相机完全相同。如果您对这些相机感兴趣，Three.js提供了一些标准示例：
- 红蓝立体效果：https://threejs.org/examples/#webgl_effects_anaglyph
- 视差屏障：https://threejs.org/examples/#webgl_effects_parallaxbarrier
- 立体效果：https://threejs.org/examples/#webgl_effects_stereo

如果您正在寻找简单的VR相机，您可以使用THREE.StereoCamera创建渲染在两侧的3D场景（标准立体效果），使用平行障碍（就像3DS提供的那样），或者提供红蓝立体效果，其中不同的视图以不同的颜色渲染。此外，Three.js对WebVR标准有一些实验性的支持，该标准受到许多浏览器的支持（更多信息，请参见https://webvr.info/developers/）。要使用这个，不需要做太多的改变。您只需设置renderer.vr.enabled = true，Three.js将处理其余部分。Three.js网站上有一些示例，展示了这个属性以及Three.js支持WebVR的一些其他特性：https://threejs.org/examples/。
现在，我们将专注于标准的透视和正交相机。解释这些相机之间的区别最好的方法是看一些示例。

### 正交相机与透视相机

#### 透视相机属性

#### 正交相机属性

### Looking at specific points

 到目前为止，您已经看到了如何创建相机以及各种参数的含义。在Chapter 1, Creating Your First 3D Scene with Three.js  ，您还看到需要将相机定位在场景中的某个位置，并且从该相机的视角进行渲染。通常，相机指向场景的中心：位置为(0, 0, 0)。然而，我们可以很容易地改变相机的观察目标，如下所示：

```js
camera.lookAt(new THREE.Vector3(x, y, z));
```

当您使用lookAt函数时，您将相机指向特定位置。您也可以使用这个函数使相机在场景中跟随一个对象。由于每个THREE.Mesh对象都有一个位置，该位置是一个THREE.Vector3对象，因此您可以使用lookAt函数指向场景中的特定网格。您只需要使用这个：camera.lookAt(mesh.position)。如果您在渲染循环中调用这个函数，您将使相机跟随一个对象在场景中移动。

### Debugging what a camera looks at  

# 3、在Three.js中使用光源

**注意**

WebGL本身并没有内置对光照的支持。如果没有Three.js，您将不得不编写特定的WebGL着色器程序来模拟这些类型的光照，这相当困难。您可以在https://developer.mozilla.org/en-US/docs/Web/WebGL/Lighting_in_WebGL找到一个很好的介绍，介绍了从头开始在WebGL中模拟光照的内容。

## Three.js提供了哪些类型的光源？

在Three.js中提供了几种不同的光源，它们都具有特定的行为和用途。在本章中，我们将讨论以下一组光源：

- THREE.AmbientLight：这是一种基本的光源，其颜色被添加到场景中物体的当前颜色中。
- THREE.PointLight：这是空间中的一个单一点，从该点向所有方向发光。这种光源可以用于创建阴影。
- THREE.SpotLight：这种光源具有类似于台灯、天花板聚光灯或手电筒的锥形效果。这种光源可以投射阴影。
- THREE.DirectionalLight：也称为无限光。这种光源的光线可以被看作是平行的，类似于太阳的光线。这种光源也可以用于创建阴影。
- THREE.HemisphereLight：这是一种特殊的光源，可以通过模拟反射表面和微弱的照亮天空来创建更自然的室外照明。这种光源也不提供任何与阴影相关的功能。
- THREE.RectAreaLight：使用这种光源，您可以指定一个区域来发光，而不是在空间中的单一点。THREE.RectAreaLight不投射任何阴影。
- THREE.LightProbe：这是一种特殊类型的光源，根据使用的环境贴图，创建一个动态环境光源来照亮场景。
- THREE.LensFlare：这不是一个光源，但是使用THREE.LensFlare，您可以在场景中的光源上添加镜头眩光效果。

本章分为两个主要部分。首先，我们将查看基本光源：THREE.AmbientLight、THREE.PointLight、THREE.SpotLight和THREE.DirectionalLight。所有这些光源都扩展了基本的THREE.Light对象，提供了共享的功能。在这里提到的光源是简单的光源，需要很少的设置，并且可以用来重新创建大多数所需的照明场景。在第二部分中，我们将查看几种特殊用途的光源和效果：THREE.HemisphereLight、THREE.RectAreaLight、THREE.LightProbe和THREE.LensFlare。您可能只在非常特殊的情况下需要这些光源。

## 使用基本光源

### THREE.AmbientLight  

当您创建一个THREE.AmbientLight时，颜色是全局应用的。这种光源没有特定的方向，THREE.AmbientLight不会产生任何阴影。您通常不会将THREE.AmbientLight作为场景中唯一的光源，因为它以相同的方式将其颜色应用于场景中的所有对象，而不考虑网格的形状。您可以将它与其他光源一起使用，比如THREE.SpotLight或THREE.DirectionalLight，以软化阴影或向场景中添加一些额外的颜色。理解这一点最简单的方法是查看chapter-
03  文件夹中的ambient-light.html示例。在这个示例中，您可以获得一个简单的用户界面，用于修改这个场景中可用的THREE.AmbientLight对象。
在以下的截图中，您可以看到我们使用了一个简单的瀑布模型，并且可以配置使用的THREE.AmbientLight对象的颜色和强度属性。在第一个截图中，您可以看到当我们将光的颜色设置为红色时发生了什么：



- THREE.PointLight：从一个特定点向所有方向发出光线。
- THREE.SpotLight：从一个特定点向锥形状发出光线。
- THREE.DirectionalLight：不是从单一点发出光线，而是从一个二维平面发出光线，这些光线是彼此平行的。

### THREE.SpotLight

THREE.SpotLight是您经常会使用的灯光之一（特别是如果您想要使用阴影的话）。THREE.SpotLight是一种具有锥形效果的光源。您可以将其与手电筒或灯笼进行比较。这种光源有一个方向和一个产生光线的角度。  



我将用几条提示来结束本节，以防您在阴影方面遇到问题。

如果阴影看起来很方块，您可以增加shadow.mapSize.width和shadow.mapSize.Height属性，并确保用于计算阴影的区域紧密地包裹着您的对象。您可以使用shadow.camera.near、shadow.camera.far和shadow.camera.fov属性来配置这个区域。
请记住，您不仅需要告诉光源投射阴影，还需要告诉每个几何体是否接收和/或投射阴影，方法是设置castShadow和receiveShadow属性。

如果您想要更柔和的阴影，您可以在THREE.WebGLRenderer上设置不同的shadowMapType值。默认情况下，该属性设置为THREE.PCFShadowMap；如果您将该属性设置为PCFSoftShadowMap，您将获得更柔和的阴影。

**注意**

Shadow bias 
如果您在场景中使用薄物体，渲染阴影时可能会出现奇怪的伪影。您可以使用shadow.bias属性来轻微偏移阴影，这通常可以解决这些问题。

### THREE.PointLight

### THREE.DirectionalLight 

### 使用THREE.Color对象

## 使用特殊光源

###  THREE.HemisphereLight  

使用THREE.HemisphereLight，我们可以创建更自然的室外照明。如果没有这种光源，我们可以通过创建THREE.DirectionalLight来模拟太阳，并可能添加另一个THREE.AmbientLight来为场景提供一些通用的颜色。然而，这样做看起来不够自然。当您在户外时，并不是所有的光都直接来自上方：大部分光线都是被大气散射并被地面和其他物体反射的。Three.js中的THREE.HemisphereLight就是为这种情况创建的。这是获得更自然的室外照明的简单方法。

### THREE.RectAreaLight  

### THREE.LightProbe  

在前一章中，我们简要介绍了什么是立方体贴图。使用立方体贴图，您可以将模型放置在一个环境中显示。在前一章中，我们使用立方体贴图创建了一个随着相机视角旋转的背景：

正如我们将在下一章中看到的那样，我们可以使用来自立方体贴图的信息在我们的材质上显示反射。通常情况下，这些环境贴图不会为您的场景提供任何光线。然而，通过THREE.LightProbe，我们可以从立方体贴图中提取光照级别信息，并将其用于照亮我们的模型。因此，您将获得的效果有点像THREE.AmbientLight，但它会根据物体在场景中的位置和立方体贴图的信息来影响物体。

在前面的示例中，我们有一个模型位于类似洞穴的环境中。如果您围绕相机旋转，您会看到根据环境的光照，我们的模型稍微有所不同的照明。在前面的截图中，我们看到的是物体的背面，在洞穴的更深处，因此该模型在那一侧较暗。如果我们完全旋转相机，并将洞穴的入口设置在背后，我们会看到模型更明亮，接收到更多的光线：

这是一个非常巧妙的技巧，使您的物体看起来更加栩栩如生，而不是单调平淡，使用THREE.LightProbe，您的模型将以非均匀的方式接收光线，这样看起来效果更好。

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
现在我们有了这个立方体贴图，我们可以从中生成一个THREE.LightProbe。这通过将cubeTexture传递给LightProbeGenerator来完成。结果是一个THREE.LightProbe，我们将其添加到场景中，就像添加任何其他光源一样。与THREE.AmbientLight一样，您可以通过设置intensity属性来控制这个光源对网格照明的贡献程度。

**注意：**

Three.js还提供了另一种LightProbe：THREE.HemisphereLightProbe。这种LightProbe与普通的THREE.HemisphereLight几乎相同，但在内部使用了一个LightProbe。

本章的最后一个对象不是光源，而是经常在电影中出现的对相机的把戏：THREE.LensFlare。

### THREE.LensFlare  

您可能已经熟悉了镜头光晕。例如，当您直接拍摄太阳或其他明亮光源时，它们会出现。在大多数情况下，您希望避免这种情况，但对于游戏和3D生成的图像，它提供了一个很好的效果，使场景看起来更加真实。Three.js也支持镜头光晕，并且非常容易将它们添加到您的场景中。在本节中，我们将向场景添加一个镜头光晕，并创建以下截图中显示的输出；您可以通过打开lens-flare.html来自行查看：

# 4、使用Three.js材质

到目前为止，我们还没有详细讨论过材质。在本章中，我们将深入研究Three.js提供的所有材质，您将学习如何使用这些材质来创建漂亮的3D对象。本章中我们将探讨的材质如下所示：
- MeshBasicMaterial：这是一种基本材质，您可以使用它来给几何体赋予简单的颜色或显示几何体的线框。这种材质不受光源影响。
- MeshDepthMaterial：这是一种根据相机到物体的距离确定如何着色的材质。
- MeshNormalMaterial：这是一种简单的材质，它基于面的法向量确定颜色。
- MeshLambertMaterial：这是一种考虑了光照效果的材质，用于创建暗淡、不发光的物体。
- MeshPhongMaterial：这是一种考虑了光照效果的材质，可用于创建发光的物体。
- MeshStandardMaterial：这是一种使用物理渲染的材质来渲染物体。使用物理渲染，会使用一个物理上正确的模型来确定光线与表面的交互方式。这使您能够创建更准确和逼真的对象。
- MeshPhysicalMaterial：这是MeshStandardMaterial的扩展，允许更多地控制反射。
- MeshToonMaterial：这是MeshPhongMaterial的扩展，尝试使对象看起来是手绘的。
- ShadowMaterial：这是一种特殊的材质，可以接收阴影，但在其他方面呈现为透明。
- ShaderMaterial：这种材质允许您指定着色器程序，直接控制顶点的位置和像素的颜色。
- LineBasicMaterial：这是一种可以用在THREE.Line几何体上的材质，用于创建彩色线条。
- LineDashMaterial：与LineBasicMaterial相同，但这种材质还允许您创建虚线效果。

在Three.js的源代码中，您还可以找到THREE.SpriteMaterial和THREE.PointsMaterial。这些是您在样式化单个点时可以使用的材质。我们不会在本章中讨论它们，但我们将在第7章《Points and Sprites》中探讨它们。

## 理解常见的材质属性

### 基本属性

106

# 6、探索高级几何

## 可用于调试的几何图形

### THREE.EdgesGeometry 

它提供了一个只渲染几何体边缘的几何体。

### THREE.WireFrameGeometry  

# 7、点和精灵

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