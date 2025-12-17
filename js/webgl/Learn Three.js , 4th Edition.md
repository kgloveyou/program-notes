# Learn Three.js Program 3D animations and visualizations for the web with JavaScript and WebGL, 4th Edition

Three.js r147

```bash
$ npm --version
8.3.1
$ node --version
v16.14.0
```

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

每个Three.js应用至少需要一个相机、一个场景和一个渲染器。场景是容纳所有对象（网格、相机和光源）的容器；相机决定了渲染时场景的哪部分会被显示；而渲染器则负责在屏幕上生成最终画面，它会综合考虑场景中所有网格、相机和光源的信息。



在这段代码片段中，我们还创建了一个WebGLRenderer，它将用于在场景中渲染相机的视图。请暂时忽略其他属性；我们将在后续章节深入探讨WebGLRenderer的细节时，解释这些属性如何微调颜色并处理阴影。其中值得注意的一点是`document.body.appendChild(renderer.domElement)`。这一步将一个HTML画布元素添加到页面中，用于显示渲染器的输出。在浏览器中检查页面时，你可以看到这个元素：

### 添加灯光

如果场景中没有光源，大多数材质会呈现为黑色。因此，为了能看到我们的网格（并生成阴影），我们需要在场景中添加一些光源。这里我们将添加两种灯光：

- THREE.AmbientLight（环境光）：这是一种简单的光源，以相同的强度和颜色均匀影响场景中的所有物体。
- THREE.DirectionalLight（平行光）：这种光源的光线彼此平行照射，类似于我们感受到的太阳光效果。

### 添加网格



### 添加一个动画循环

目前，整个场景是完全静态的。你无法移动相机，也没有任何物体在运动。如果我们想为场景添加动画，首先需要找到一种方法，能在特定时间间隔内重新渲染场景。在HTML5及相关JavaScript API出现之前，实现这一点的常用方法是使用`setInterval(function,interval)`函数。通过`setInterval`，我们可以指定一个函数，比如让它每100毫秒执行一次。但这个方法的问题是：它不会考虑浏览器当前的运行状态。即使你切换到其他标签页浏览，这个函数仍然会每隔几毫秒触发一次。此外，`setInterval`与屏幕的重绘并不同步，这可能导致CPU占用率升高、画面闪烁以及整体性能表现不佳。



`requestAnimationFrame`  

#### requestAnimationFrame  介绍

通过使用`requestAnimationFrame`，您可以指定一个函数在特定时间间隔内被调用。不过，这个间隔并不是由您定义的，而是由浏览器决定的。您在所提供的函数中执行所有需要进行的绘制操作，浏览器会确保以尽可能平滑高效的方式完成绘制。使用这个方法非常简单，我们只需添加以下代码：

```js
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

在为这个函数添加额外功能之前，我们将引入一个小型的辅助库，名为 stats.js，它提供了有关动画运行帧率的信息。这个库与 Three.js 的作者相同，它会渲染一个小图表，显示场景渲染的速率信息。

#### 为网格添加动画



#### Enabling orbit controls

`THREE.OrbitControls`  

如果您尝试用鼠标移动场景，可能不会有任何反应。这是因为相机被固定在了某个位置，并且我们没有在动画循环中更新它的位置。当然，我们可以采用与处理立方体位置相同的方式来实现这一点，但Three.js内置了多种控制器，可让您轻松平移场景和移动相机。在这个示例中，我们将介绍`THREE.OrbitControls`。借助这个控制器，您可以使用鼠标在场景中移动相机，从不同角度观察物体。要使其生效，我们只需创建这个控制器的新实例，将其附加到相机上，并在动画循环中调用更新函数：

```js
const orbitControls = new OrbitControls(camera, renderer.domElement)
// and the controller has a whole range of other properties we can set
function animate() {
  // ...
  orbitControls.update();
}
```

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

在第一章"用Three.js创建你的第一个3D场景"中，您已经创建了THREE.Scene，因此对Three.js的基础知识有了一定了解。我们了解到，要让场景显示内容，需要四种不同类型的对象：

- 相机：决定THREE.Scene的哪部分会被渲染到屏幕上。
- 光源：影响材质的显示效果，并在创建阴影效果时使用（详见第三章"在Three.js中使用光源"）。
- 网格：这是从相机视角渲染的主要对象。这些对象包含了构成几何体（如球体或立方体）的顶点和面，并包含定义几何体外观的材质。
- 渲染器：利用相机和场景中的信息，在屏幕上绘制（渲染）输出结果。

在 Three.js 中，**THREE.Scene** 是灯光和要渲染的网格物体的主要容器。**THREE.Scene** 本身并没有很多选项和功能。

**THREE.Scene** 是一个有时也称为场景图的结构。场景图可以包含图形场景的所有必要信息。在 Three.js 中，这意味着 **THREE.Scene** 包含了渲染所需的所有对象。值得注意的是，正如名称所暗示的那样，场景图不仅仅是一个对象数组；场景图由树形结构中的一组节点组成。正如我们在第 8 章“创建和加载高级网格和几何体”中将看到的，Three.js 提供了用于创建不同网格或灯光组的对象。用于创建场景图的主要对象是 **THREE.Group**。正如名称所暗示的那样，这个对象允许你将对象分组在一起。**THREE.Group** 继承自 Three.js 中另一个名为 **THREE.Object3D** 的基类，该基类提供了一组用于添加和修改子对象的标准函数。**THREE.Mesh** 和 **THREE.Scene** 也都继承自 **THREE.Object3D**，因此你也可以使用它们来创建嵌套结构。但是，使用 **THREE.Group** 来构建场景图更符合约定，并且在语义上也更正确。

### 场景的基本功能

了解场景功能的最佳方式是通过示例。在本章的源代码中，你可以找到 chapter-2/basic-scene.html 示例。我们将通过这个示例来说明场景的各种功能和选项。当在浏览器中打开该示例时，输出效果类似于下图所示（记住，你可以使用鼠标移动、缩放和平移渲染的场景）：



上图看起来与我们在第一章“用Three.js创建你的第一个3D场景”中看到的示例相似。尽管场景看起来相当空旷，但它已经包含了几个对象：

- 我们有一个THREE.Mesh，代表你所看到的地板区域
- 我们使用THREE.PerspectiveCamera来确定观察视角
- 我们添加了THREE.AmbientLight和THREE.DirectionalLight来提供光照

### 添加和移除对象

在前述代码中，我们引入了一个新元素：通过name属性为立方体指定了一个名称。这个名称被设置为cube-，并附加当前场景中对象的数量（scene.children.length）。名称在调试时非常有用，也可以用来直接从场景中访问特定对象。如果你使用`THREE.Scene.getObjectByName(name)`函数，就可以直接获取指定对象，例如改变其位置，而无需将JavaScript对象设为全局变量。

有时你可能需要从`THREE.Scene`中移除一个已存在的对象。由于`THREE.Scene`通过`children`属性暴露了它的所有子对象，我们可以使用以下简单的代码来移除最后添加的子对象：

```js
const removeCube = (scene) => {
	scene.children.pop();
};
```

Three.js提供了其他有关`THREE.Scene`的有用函数，与场景的子对象相关：
- add：我们已经看到了这个函数，它将提供的对象添加到场景中。如果之前已经添加到不同的THREE.Object3D中，它将从该对象中移除。
- attach：这类似于add，但如果使用它，对该对象应用的任何旋转或平移都将被保留。
- getObjectById：当你将对象添加到场景中时，它会获得一个ID。第一个对象获得ID为1，第二个为2，依此类推。使用此函数，你可以根据该ID获取子对象。
- getObjectByName：根据其name属性返回对象。名称是你可以在对象上设置的内容 - 这与id属性形成对比，后者是由Three.js分配的。
- remove：从场景中移除此对象。
- clear：从场景中移除所有子对象。
请注意，前述函数实际上来自THREE.Scene扩展的基础对象：THREE.Object3D。
在整本书中，如果我们想要操作场景的子对象（或者在稍后我们将探索的THREE.Group中），我们将使用这些函数。

### 添加雾



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

## 几何体与网格是如何关联的

### 几何体的属性和函数

请注意，您必须注意用于定义面的顶点顺序。顶点的定义顺序决定了Three.js将其视为正面（面向相机的面）还是背面。在创建面时，如果希望创建正面，应使用顺时针顺序的顶点；如果要创建背面，则应使用逆时针顺序的顶点。

在我们的示例中，我们使用了多个顶点来定义立方体的六个面，每个面由两个三角形构成。在旧版Three.js中，你也可以使用四边形而非三角形来定义面。一个四边形使用四个顶点而非三个顶点来定义面。使用四边形还是三角形更好，是3D建模领域中一个激烈争论的话题。不过，在建模过程中通常更倾向于使用四边形，因为四边形比三角形更容易进行优化和平滑处理。但对于渲染和游戏引擎而言，处理三角形通常更简便，因为任何形状都可以通过三角形高效地渲染出来。

利用这些顶点和面，我们现在可以创建`THREE.BufferGeometry`的新实例，并将顶点赋值给位置属性。最后一步是在创建的几何体上调用`computeVertexNormals()`函数。当我们调用此函数时，Three.js会计算每个顶点和面的法向量。Three.js利用这些信息，基于场景中的各种光源来确定如何对面进行着色（如果使用`THREE.MeshNormalMaterial`，可以直观地看到这种效果）。



这个示例采用了与我们所有其他示例相同的设置，包含一个渲染循环。每当您在下拉控制框中更改任意属性时，立方体都会根据某个顶点位置的变化重新渲染。但这一功能并非开箱即用。出于性能考虑，Three.js默认假定网格的几何体在其生命周期内不会改变。对于大多数几何体和用例来说，这是一个非常合理的假设。然而，如果您更改了底层数组（在本例中是const faces = new Float32Array([...])数组），就需要告诉Three.js某些内容已发生变更。您可以通过将相关属性的needsUpdate属性设置为true来实现，具体操作如下所示：

```js
mesh.geometry.attributes.position.needsUpdate = true;
mesh.geometry.computeVertexNormals();
```



```js
const meshFromGeometry = (geometry) => {
  var materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
    new THREE.MeshLambertMaterial({
      opacity: 0.1,
      color: 0xff0044,
      transparent: true,
    }),
  ];

  var mesh = createMultiMaterialObject(geometry, materials);
  mesh.name = "customGeometry";
  mesh.children.forEach(function (e) {
    e.castShadow = true;
  });

  return mesh;
};
```

回顾这个示例，你会看到一个透明的立方体以及构成几何体的线框（边缘）。为了实现这个效果，我们创建了一个多材质网格。这意味着我们告诉Three.js在一个网格中使用两种不同的材质。为此，Three.js提供了一个便捷的辅助函数`createMultiMaterialObject`，顾名思义，它能实现这一功能。基于几何体和材质列表，它会创建一个可以添加到场景中的对象。但使用`createMultiMaterialObject`的返回结果时需要注意一点：你得到的不是一个单独的网格，而是一个`THREE.Group`——一个容器对象，在这种情况下，它为我们提供的每种材质都包含一个独立的`THREE.Mesh`。因此，在渲染时，它看起来像一个单一对象，但实际上由多个`THREE.Mesh`对象叠加渲染而成。这也意味着如果我们想要生成阴影，需要为组内的每个网格单独启用阴影（这正是我们在前面代码片段中所做的）。

在前面的代码中，我们使用了`THREE.SceneUtils`中的`createMultiMaterialObject`来为创建的几何体添加线框。Three.js还提供了另一种使用`THREE.WireframeGeometry`添加线框的方法。假设你有一个名为geom的几何体，可以从中创建线框几何体：`const wireframe = new THREE.WireframeGeometry(geom);`。接下来，你可以使用`Three.LineSegments`对象绘制这个几何体的线框，首先创建`const line = new THREE.LineSegments(wireframe)`对象，然后将其添加到场景中：`scene.add(line)`。由于这个辅助对象内部只是一个`THREE.Line`对象，你可以自定义线框的显示样式。例如，要设置线框线条的宽度，可以使用`line.material.linewidth = 2;`。

### 网格的属性和函数

  我们已经学习到，要创建一个网格，我们需要一个几何体和一个或多个材质。一旦我们有了一个网格，我们将其添加到场景中，然后进行渲染。你可以使用一些属性来更改网格在场景中的位置和外观方式。在我们的第一个示例中，我们将查看以下一组属性和函数：

- position：确定对象相对于其父对象位置的位置。大多数情况下，对象的父对象是一个THREE.Scene对象或一个THREE.Group对象。
- rotation：使用此属性，你可以设置对象围绕其任何轴的旋转。Three.js还提供了围绕单个轴旋转的特定函数：rotateX()、rotateY()和rotateZ()。
- scale：此属性允许你沿着x轴、y轴和z轴缩放对象。
- translateX() / translateY() 和 translateZ()：此属性沿着相应的轴移动对象指定的量。
- lookAt()：此属性将对象指向空间中的特定向量。这是手动设置旋转的替代方法。
- visible：此属性确定是否应该渲染此网格。
- castShadow：此属性确定当光线照射到网格时，是否应该投射阴影。默认情况下，网格不会投射阴影。

当我们旋转一个对象时，我们是围绕一个轴旋转的。在一个3D场景中，有多个空间具有你可以围绕其旋转的轴。`rotateN()` 函数在局部空间中围绕轴旋转对象。这意味着对象围绕其父对象的轴旋转。因此，当你将一个对象添加到场景中时，`rotateN`() 函数将围绕场景的主轴旋转该对象。当它是一个嵌套组的一部分时，这些函数将围绕其父对象的轴旋转对象，这通常是你要寻找的行为。Three.js 还有一个特定的 `rotateOnWorldAxis` 函数，它允许你围绕主 `THREE.Scene` 的轴旋转对象，而不考虑对象的实际父对象。最后，你还可以通过调用 `rotateOnAxis` 函数强制对象围绕自己的轴旋转（这称为对象空间）。

#### 使用position属性设置网格的位置

我们已经多次见过这个属性，所以让我们快速讨论一下。使用这个属性，你可以设置对象相对于其父对象的x、y和z坐标。我们将在第五章"学习使用几何体"中讨论对象分组时再次探讨这一点。我们可以通过三种不同的方式设置对象的position属性。可以直接设置每个坐标：

```js
cube.position.x = 10;
cube.position.y = 3;
cube.position.z = 1;
```

但也可以一次性设置所有坐标，如下所示：

```js
cube.position.set(10, 3, 1);
```

还有第三种选择。position属性是一个THREE.Vector3对象，这意味着我们也可以这样设置：

```js
cube.position = new THREE.Vector3(10, 3, 1);
```


接下来是rotation属性。在第一章"用Three.js创建第一个3D场景"以及本章中，你已经多次见过这个属性的使用。

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

在前面的代码块中，我们自己完成了转换。Three.js还提供了MathUtils类，该类提供了许多有用的转换，包括与我们在前面的代码块中所做的相同的转换。你可以使用`chapter-2/mesh-properties`  示例来尝试这个属性。

#### 使用translate属性更改位置

使用translate属性，你还可以更改对象的位置，但不是定义你希望对象处于的绝对位置，而是定义对象应该移动的距离，相对于其当前位置。例如，我们有一个球体被添加到一个场景中，并且其位置被设置为(1, 2, 3)。接下来，我们沿着它的x轴进行平移：translateX(4)。现在它的位置将是(5, 2, 3)。如果我们想要将对象恢复到其原始位置，我们使用translateX(-4)。

最后两个属性用于完全隐藏对象：将visible属性设为false可使对象不可见；将castShadow属性设为false可禁用该对象投射阴影。点击这些按钮时，你会看到立方体在可见与不可见之间切换，并可以控制其是否投射阴影。

## 在不同场景中使用不同的相机

在Three.js中有两种不同的相机类型：正交相机（orthographic camera）和透视相机（perspective camera）。请注意，Three.js还提供了一些非常特定的相机，用于创建可以使用3D眼镜或VR设备查看的场景。在本书中，我们不会详细介绍这些相机，因为它们的工作方式与本章中解释的相机完全相同。如果你对这些相机感兴趣，Three.js提供了一些标准示例：
- 红蓝立体效果：https://threejs.org/examples/#webgl_effects_anaglyph
- 视差屏障：https://threejs.org/examples/#webgl_effects_parallaxbarrier
- 立体效果：https://threejs.org/examples/#webgl_effects_stereo

如果你正在寻找简单的VR相机，你可以使用THREE.StereoCamera创建渲染在两侧的3D场景（标准立体效果），使用平行障碍（就像3DS提供的那样），或者提供红蓝立体效果，其中不同的视图以不同的颜色渲染。此外，Three.js对WebVR标准有一些实验性的支持，该标准受到许多浏览器的支持（更多信息，请参见https://webvr.info/developers/）。要使用这个，不需要做太多的改变。你只需设置renderer.vr.enabled = true，Three.js将处理其余部分。Three.js网站上有一些示例，展示了这个属性以及Three.js支持WebVR的一些其他特性：https://threejs.org/examples/。
现在，我们将专注于标准的透视和正交相机。解释这些相机之间的区别最好的方法是看一些示例。

### 正交相机与透视相机

使用正交相机时，所有立方体都以相同大小渲染；物体与相机之间的距离不影响其显示尺寸。这种相机常用于2D游戏，例如旧版的《文明》和《模拟城市4》：

#### 透视相机属性

相机的`fov`属性决定了水平视场角。根据`aspect`属性，可以确定垂直视场角。`near`属性用于设置近裁剪面的位置，`far`属性则决定了远裁剪面的位置。近裁剪面与远裁剪面之间的区域将被渲染如下：

#### 正交相机属性

### 观察特定点

 到目前为止，你已经看到了如何创建相机以及各种参数的含义。在Chapter 1, Creating Your First 3D Scene with Three.js  ，你还看到需要将相机定位在场景中的某个位置，并且从该相机的视角进行渲染。通常，相机指向场景的中心：位置为(0, 0, 0)。然而，我们可以很容易地改变相机的观察目标，如下所示：

```js
camera.lookAt(new THREE.Vector3(x, y, z));
```

当你使用lookAt函数时，你将相机指向特定位置。你也可以使用这个函数使相机在场景中跟随一个对象。由于每个THREE.Mesh对象都有一个位置，该位置是一个THREE.Vector3对象，因此你可以使用lookAt函数指向场景中的特定网格。你只需要使用这个：camera.lookAt(mesh.position)。如果你在渲染循环中调用这个函数，你将使相机跟随一个对象在场景中移动。

### Debugging what a camera looks at（调试相机视角）

在上图中，你可以看到一个透视相机的视锥体轮廓。如果修改菜单中的属性，会看到视锥体随之变化。这个视锥体是通过以下代码实现可视化的：

```js
const helper = new THREE.CameraHelper(camera);
scene.add(helper);
// 在渲染循环中
helper.update();
```

我们还添加了一个switchCamera按钮，允许你在观察场景的外部相机和场景内的主相机之间切换。这为你调整相机设置提供了一个很好的方式：

在Three.js中切换相机非常简单，你只需要告诉Three.js希望通过另一个相机来渲染场景即可。



# 3、在Three.js中使用光源

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/eb57b0dd6af6adc0a74bc3eca39e6b8e/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766044791&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=aptXFqz79vvSTOfEQNwmQDrBmjE%3D)      

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

当你创建一个THREE.AmbientLight时，颜色是全局应用的。这种光源没有特定的方向，THREE.AmbientLight不会产生任何阴影。你通常不会将THREE.AmbientLight作为场景中唯一的光源，因为它以相同的方式将其颜色应用于场景中的所有对象，而不考虑网格的形状。你可以将它与其他光源一起使用，比如THREE.SpotLight或THREE.DirectionalLight，以软化阴影或向场景中添加一些额外的颜色。理解这一点最简单的方法是查看chapter-03  文件夹中的ambient-light.html示例。在这个示例中，你可以获得一个简单的用户界面，用于修改这个场景中可用的THREE.AmbientLight对象。
在以下的截图中，你可以看到我们使用了一个简单的瀑布模型，并且可以配置使用的THREE.AmbientLight对象的颜色和强度属性。在第一个截图中，你可以看到当我们将光的颜色设置为红色时发生了什么：



- THREE.PointLight：从一个特定点向所有方向发出光线。
- THREE.SpotLight：从一个特定点向锥形状发出光线。
- THREE.DirectionalLight：不是从单一点发出光线，而是从一个二维平面发出光线，这些光线是彼此平行的。

### THREE.SpotLight

THREE.SpotLight是你经常会使用的灯光之一（特别是如果你想要使用阴影的话）。THREE.SpotLight是一种具有锥形效果的光源。你可以将其与手电筒或灯笼进行比较。这种光源有一个方向和一个产生光线的角度。  

在此，我们创建一个THREE.SpotLight实例，并设置各项属性来配置这个光源。因为我们想要产生阴影，所以明确将castShadow属性设为true。我们还需要让THREE.SpotLight指向某个方向，这是通过target属性实现的。在使用此属性之前，我们首先需要将光源的默认目标对象添加到场景中，如下所示：

```js
scene.add(spotLight.target);
```


默认情况下，目标位置会被设置为(0, 0, 0)。在本节的示例中，您可以更改target属性的位置，并观察到光线会跟随这个目标对象的位置移动：



在继续介绍下一个光源之前，我们先快速了解一下THREE.SpotLight对象与阴影相关的属性。您已经知道，将THREE.SpotLight实例的castShadow属性设置为true即可产生阴影。同时您也了解，THREE.Mesh对象有两个与阴影相关的属性：对于需要投射阴影的对象，您需要设置castShadow属性；而对于需要显示阴影的对象，则需使用receiveShadow属性。Three.js 还允许您对阴影的渲染方式进行非常精细的控制，这主要通过本节开头表格中介绍的部分属性来实现。通过shadow.camera.near、shadow.camera.far和shadow.camera.fov属性，您可以控制此光源投射阴影的方式和范围。对于THREE.SpotLight实例，您无法直接设置shadow.camera.fov属性。该属性基于THREE.SpotLight的angle属性计算得出，其工作原理与我们在第2章介绍的透视相机视野（field of view）相同。要直观查看其作用，最简单的方法是添加THREE.CameraHelper：您可以通过勾选菜单中的阴影辅助线（shadow-helper）复选框，并调整相机设置来观察效果。如下方截图所示，勾选此复选框会显示用于确定此光源阴影范围的区域：




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

THREE.RectAreaLight 仅适用于 THREE.MeshStandardMaterial 或 THREE.MeshPhysicalMaterial 材质。关于这些材质的更多详细信息，将在第4章中介绍。

### THREE.LightProbe  

在前一章中，我们简要介绍了什么是立方体贴图。使用立方体贴图，你可以将模型放置在一个环境中显示。在前一章中，我们使用立方体贴图创建了一个随着相机视角旋转的背景：

正如我们将在下一章中看到的那样，我们可以使用来自立方体贴图的信息在我们的材质上显示反射。通常情况下，这些环境贴图不会为你的场景提供任何光线。然而，通过THREE.LightProbe，我们可以从立方体贴图中提取光照级别信息，并将其用于照亮我们的模型。因此，你将获得的效果有点像THREE.AmbientLight，但它会根据物体在场景中的位置和立方体贴图的信息来影响物体。

在前面的示例中，我们有一个模型位于类似洞穴的环境中。如果你围绕相机旋转，你会看到根据环境的光照，我们的模型稍微有所不同的照明。在前面的截图中，我们看到的是物体的背面，在洞穴的更深处，因此该模型在那一侧较暗。如果我们完全旋转相机，并将洞穴的入口设置在背后，我们会看到模型更明亮，接收到更多的光线：

这是一个非常巧妙的技巧，使你的物体看起来更加栩栩如生，而不是单调平淡，使用THREE.LightProbe，你的模型将以非均匀的方式接收光线，这样看起来效果更好。

设置 THREE.LightProbe 需要稍多一些步骤，但只需在创建场景时进行一次。只要环境不变，就无需重新计算 THREE.LightProbe 对象的值：

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

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/5bacd6bd5e5c361ba6bd56867ba84711/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766044944&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=LaVPwchDlWFfDmrOgQQREo%2FY5Qc%3D)      

在第3章《Three.js中的光源运用》中，我们初步探讨了材质。您了解到，材质与THREE.Geometry实例共同构成一个THREE.Mesh对象。材质就像物体的“皮肤”，它决定了几何体外表面的视觉呈现。例如，这层“皮肤”可以定义几何体看起来是金属质感、透明状态，还是以线框形式显示。最终生成的THREE.Mesh对象随后可被添加到场景中，由Three.js进行渲染。

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

您可以快速了解所有材质共享哪些属性。Three.js 提供了一个材质基类 THREE.Material，其中列出了所有这些通用属性。我们将这些通用材质属性分为以下三类：

• 基础属性：这些是您最常用的属性。通过这些属性，您可以控制对象的不透明度、可见性以及引用方式（通过 ID 或自定义名称）等。

• 混合属性：每个对象都有一组混合属性。这些属性定义了材质上每个点的颜色如何与其背景颜色进行混合。

• 高级属性：若干高级属性控制底层 WebGL 上下文如何渲染对象。在大多数情况下，您无需处理这些属性。

请注意，本章将跳过大部分与纹理和贴图相关的属性。大多数材质允许您使用图像作为纹理（例如，类似木头或石头的纹理）。第 10 章《加载和使用纹理》将深入探讨各种可用的纹理和贴图选项。某些材质还具有与动画相关的特定属性（例如蒙皮、变形法线和变形目标），我们也会跳过这些属性。这些将在第 9 章《动画和相机移动》中讨论。关于剪切、裁剪平面和阴影裁剪的属性将在第 6 章《高级几何体探索》中介绍。

我们将从列表中的第一组开始讨论：基础属性。

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

• depthTest：这是一个高级 WebGL 属性。通过此属性，您可以启用或禁用 GL_DEPTH_TEST 参数。该参数控制是否使用像素深度来决定新像素的值。通常情况下，您无需更改此设置。更多信息可在前面提到的 OpenGL 规范中查阅。

• depthWrite：这是另一个内部属性。此属性用于确定该材质是否影响 WebGL 深度缓冲区。如果将对象用于 2D 叠加层（例如平视显示器），应将该属性设置为 false。但通常您无需更改此属性。

• depthFunc：此函数用于比较像素深度。它对应于 WebGL 规范中的 glDepthFunc。

• polygonOffset、polygonOffsetFactor 和 polygonOffsetUnits：通过这些属性，您可以控制 POLYGON_OFFSET_FILL 这一 WebGL 功能。这些属性通常不需要调整。关于其具体作用的说明，可参考 OpenGL 规范。

• AlphaTest：此值可设为特定数值（0 到 1）。当像素的 Alpha 值小于此设定值时，该像素将不会被绘制。您可以使用此属性来消除某些与透明度相关的伪影。您可以将此材质的精度设置为以下 WebGL 值之一：highp、mediump 或 lowp。



## 从简单的材质开始

### THREE.MeshBasicMaterial

MeshBasicMaterial 是一种非常简单的材质，它不会考虑场景中的光源。使用此材质的网格将以简单的平面多边形形式渲染，您还可以选择显示几何体的线框。除了前面提到的此材质的通用属性外，我们还可以设置以下属性（我们将再次忽略用于纹理的属性，因为这些属性将在纹理章节中讨论）：

• color：此属性允许您设置材质的颜色。

• wireframe：这允许您将材质以线框形式渲染，这对于调试目的非常有用。

• vertexColors：当设置为 true 时，渲染模型时会考虑各个顶点的颜色。

### THREE.MeshDepthMaterial  

接下来列表中的材质是THREE.MeshDepthMaterial。使用这种材质，物体的外观不是由灯光或特定的材质属性定义的 - 而是由物体到摄像机的距离定义的。例如，你可以将其与其他材质结合使用，轻松创建淡化效果。这种材质唯一额外的属性是我们在THREE.MeshBasicMaterial中看到的属性之一：wireframe。



通常情况下，你不会将这种材质作为网格的唯一材质；而是将它与不同的材质结合使用。我们将在下一节中看到它是如何工作的。

### Combining materials 

回顾 THREE.MeshDepthMaterial 的属性，您会发现没有设置立方体颜色的选项。材质的默认属性已经决定了所有呈现效果。然而，Three.js 提供了将多种材质组合以创建新效果的功能（这里就涉及混合机制的应用）。以下代码展示了我们如何组合材质：

```js
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'
const material1 = new THREE.MeshDepthMaterial()
const material2 = new THREE.MeshBasicMaterial({
  color: 0xffff00
})
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const cube = SceneUtils.createMultiMaterialObject(geometry, [material2, material1])
```

首先，我们创建两种材质。对于 THREE.MeshDepthMaterial，我们不进行特殊设置；对于 THREE.MeshBasicMaterial，我们仅设置颜色。这段代码中的最后一行也很重要。当我们使用 SceneUtils.createMultiMaterialObject() 函数创建网格时，几何体会被复制，并以分组形式返回两个相同的网格。

我们得到以下绿色立方体，它们使用了 THREE.MeshDepthMaterial 的亮度信息，并结合了 THREE.MeshBasicMaterial 的颜色。您可以通过在浏览器中打开 chapter-4 文件夹下的 combining-materials.html 示例来查看其实际效果：



当你首次打开此示例时，你将只看到实心对象，没有任何来自THREE.MeshDepthMaterial的效果。要结合这些颜色，我们还需要指定这些颜色如何混合。在图4.6中的右侧菜单中，你可以使用blending属性指定这一点。对于这个例子，我们使用了THREE.AdditiveBlending模式，这意味着颜色会相加，并显示结果颜色。这个例子是尝试不同混合选项并观察它们如何影响材质最终颜色的绝佳方式。

### THREE.MeshNormalMaterial  

正如你所看到的，网格的每个面呈现出略有不同的颜色。这是因为每个面的颜色基于指向面外的法线。而这个面法线是基于构成该面的各个顶点的法线向量的。法线向量是垂直于顶点的面的。法线向量在Three.js的许多不同部分中都被使用。它用于确定光线反射，有助于将纹理映射到3D模型，并提供有关如何在表面上照明、着色和着色像素的信息。幸运的是，Three.js处理这些向量的计算并在内部使用它们，因此你无需自己计算或处理它们。

Three.js提供了一个辅助程序来可视化这个法线，你可以通过在菜单中启用vertexHelpers属性来显示它：



您可以通过几行代码自行添加此辅助对象：

```js
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';
...
const helper = new VertexNormalsHelper(mesh, 0.1, 0xff0000);
helper.name = 'VertexNormalHelper';
scene.add(helper);
```


VertexNormalsHelper 接收三个参数：  第一个参数是 THREE.Mesh（您需要显示法向辅助线的网格对象），第二个参数是 箭头的长度，  最后一个参数是 颜色。

### 单个网格使用多个材质

到目前为止，创建THREE.Mesh时，我们一直使用单个材质。还可以为几何体的每个面定义特定的材质。例如，如果你有一个立方体，它有12个面（记住，Three.js使用三角形），你可以为立方体的每一面分配一个不同的材质（例如，具有不同的颜色）。这样做非常简单，如下面的代码所示：



在这段代码中，首先我们创建了一个 THREE.Group，它将容纳所有独立的立方体（组）；  接下来，我们为立方体的每个面创建材质。然后，我们通过三重循环确保生成正确数量的立方体。在循环中，我们逐个创建每个独立的立方体，为其分配材质，设置位置，并将其添加到组中。需要记住的是：立方体的位置是相对于这个组的。如果我们移动或旋转这个组，所有立方体都会随之移动和旋转。关于如何操作组的更多信息，请参阅第8章《创建与加载高级网格和几何体》。  

至此，我们完成了基础材质及其组合使用的章节。在接下来的部分中，我们将探讨更高级的材质。

## 高级材质

在本节中，我们将介绍更高级的Three.js材质。我们将看到以下材质：

- THREE.MeshLambertMaterial：用于粗糙表面的材质
- THREE.MeshPhongMaterial：用于光滑表面的材质
- THREE.MeshToonMaterial：以卡通风格呈现网格的材质
- THREE.ShadowMaterial：仅显示投射在其上的阴影的材质；该材质在其他情况下为透明的
- THREE.MeshStandardMaterial：一种多功能材质，可用于表示许多不同类型的表面
- THREE.MeshPhysicalMaterial：类似于THREE.MeshStandardMaterial，但提供了用于更接近现实世界表面的额外属性
- THREE.ShaderMaterial：一种材质，你可以通过编写自己的着色器来定义如何渲染对象

### THREE.MeshLambertMaterial  

这种材质可用于创建表面无光泽、不反光的效果。这是一种非常易于使用的材质，能够响应场景中的光源。该材质可通过我们已经了解的基础属性进行配置，因此这里不再重复这些属性的细节；我们将重点介绍该材质特有的属性。其特有属性如下：

• color：材质的颜色。

• emissive：材质发射的颜色。它本身不作为光源，但这是一种不受其他光照影响的纯色，默认为黑色。您可以通过此属性创建看起来会发光的物体。

• emissiveIntensity：物体发光强度的控制参数。

创建此材质对象的方法与之前介绍的其他材质一致：

### THREE.MeshPhongMaterial  

通过 THREE.MeshPhongMaterial，我们可以创建具有光泽的材质。它所支持的属性与无光泽的 THREE.MeshLambertMaterial 材质基本相同。在旧版本中，这是唯一可用于制作具有光泽、塑料感或金属感物体的材质。而在新版本的 Three.js 中，如果您需要更精细的控制，还可以使用 THREE.MeshStandardMaterial 和 THREE.MeshPhysicalMaterial。在介绍完 THREE.MeshPhongMaterial 之后，我们将继续讨论这两种材质。

### THREE.MeshToonMaterial  

并非所有 Three.js 提供的材质都适用于写实场景。例如，THREE.MeshToonMaterial 可以让您以卡通风格渲染物体（参见 mesh-toon-material.html 示例）：

如您所见，这种效果与我们之前介绍的 THREE.MeshBasicMaterial 有些相似，但 THREE.MeshToonMaterial 能够响应场景中的光照并支持阴影。它通过将颜色分层叠加来营造出卡通风格的视觉效果。

如果您需要更逼真的材质效果，THREE.MeshStandardMaterial 会是一个不错的选择。

### THREE.MeshStandardMaterial  

THREE.MeshStandardMaterial 是一种基于物理渲染（PBR）的材质，它通过物理模型来计算在场景光照下的表现效果。这种材质非常适合制作具有光泽感和金属质感的物体，并提供了以下属性供您配置：

• metalness（金属度）：此属性决定材质的金属感强度。非金属材质应设置为 0，而金属材质应接近 1。默认值为 0.5。

• roughness（粗糙度）：您可以设置材质的粗糙程度。这决定了光线照射到材质表面后的漫反射效果。默认值为 0.5。值为 0 时呈现镜面般的反射效果，值为 1 时则会使光线完全漫射。

### THREE.MeshPhysicalMaterial  

与 THREE.MeshStandardMaterial 非常相似的一种材质是 THREE.MeshPhysicalMaterial。通过这种材质，您可以更精细地控制材质的反射特性。除了我们已经了解的 THREE.MeshStandardMaterial 属性外，它还提供以下属性来帮助您调整材质的外观：

• clearCoat（清漆涂层）：表示材质表面涂层强度的值。此值越高，涂层越厚，clearCoatRoughness 参数的效果也越明显。取值范围为 0 到 1，默认值为 0。

• clearCoatRoughness（清漆粗糙度）：用于控制材质涂层的粗糙度。粗糙度越高，光线漫射越明显。此属性需与 clearCoat 配合使用。取值范围为 0 到 1，默认值为 0。

正如我们在其他材质中看到的，要确定适合特定需求的参数值往往比较困难。通常最佳做法是添加一个简单的用户界面（正如我们在示例中所做的），并通过调整数值来找到最能满足您需求的组合。您可以通过运行 mesh-physical-material.html 示例来查看实际效果：

大多数高级材质都支持投射和接收阴影。接下来我们要简要介绍的这种材质与常规材质有所不同——它不会渲染物体本身，而仅显示阴影效果。

### THREE.ShadowMaterial  

THREE.ShadowMaterial 是一种特殊材质，它不包含任何可配置属性。您无法设置颜色、光泽度或其他任何参数。这种材质的唯一作用是渲染网格对象所接收到的阴影。以下截图可以帮助说明其效果：

如图所示，我们只能看到物体接收到的阴影，而物体本身是不可见的。这种材质的一个应用场景是：它可以与您自定义的材质结合使用，而无需您自行处理阴影接收的逻辑。

我们要探讨的最后一种高级材质是 THREE.ShaderMaterial。

### 使用 THREE.ShaderMaterial 实现自定义着色器

THREE.ShaderMaterial 是 Three.js 中功能最强大、也最复杂的材质之一。通过这种材质，您可以直接在 WebGL 环境中运行自己编写的自定义着色器。着色器的职责是将 Three.js 中的 JavaScript 网格对象转换为屏幕上的像素。借助自定义着色器，您可以精确控制物体的渲染方式，并覆盖或修改 Three.js 的默认渲染行为。本节中，我们不会深入探讨如何编写自定义着色器，而是通过几个示例来展示其基本用法。

正如我们之前所看到的，THREE.ShaderMaterial 包含多个可配置属性。在使用 THREE.ShaderMaterial 时，Three.js 会将这些属性的所有相关信息传递给您自定义的着色器，但您仍需自行处理这些信息以生成颜色和顶点位置。以下是 THREE.Material 中会传递给着色器、并可由您自行解读的部分属性：

• wireframe：以线框模式渲染材质。这对调试非常有用。

• shading：定义着色应用方式。可选项包括 THREE.SmoothShading 和 THREE.FlatShading。本材质的示例中未启用此属性，具体示例可参考 THREE.MeshNormalMaterial 章节。

• vertexColors：通过此属性，您可以为每个顶点定义独立的颜色。示例可参考 THREE.LineBasicMaterial 章节中关于 LineBasicMaterial 的部分，我们曾使用此属性为线条的不同部分着色。

• fog：决定此材质是否受全局雾效设置影响。示例中未展示此效果。若设置为 false，则第2章中介绍的全局雾效不会影响该对象的渲染。

除了传递到着色器的这些属性外，THREE.ShaderMaterial 还提供了一些特有属性，用于向您的自定义着色器传递额外信息。再次说明，我们不会深入探讨如何编写自定义着色器（这本身足以写成一本专著），仅介绍基础概念：

• fragmentShader（片元着色器）：此着色器定义每个传入像素的颜色。此处需要传入您的片元着色器程序的字符串值。

• vertexShader（顶点着色器）：此着色器允许您修改每个传入顶点的位置。此处需要传入您的顶点着色器程序的字符串值。

• uniforms：通过此属性，您可以向着色器传递信息。这些信息会同时发送给每个顶点和片元着色器。

• defines：将自定义的键值对转换为 #define 代码片段。通过这些片段，您可以在着色器程序中设置一些额外的全局变量，或定义自定义的全局常量。

• attributes：这些属性可以在每个顶点和片元之间变化，通常用于传递位置和法线相关的数据。如果希望使用此属性，您需要为几何体的所有顶点提供对应信息。

• lights：此属性决定是否将光照数据传递到着色器中，默认值为 false。

在查看示例之前，我们先简要说明 THREE.ShaderMaterial 最重要的组成部分。要使用这种材质，我们需要传入两种不同的着色器：

• vertexShader（顶点着色器）：在几何体的每个顶点上运行。您可以通过此着色器移动顶点位置来变换几何体。

• fragmentShader（片元着色器）：在几何体的每个片元上运行。在此着色器中，我们返回该片元应显示的颜色。

对于本章迄今为止讨论的所有材质，Three.js 已内置了 fragmentShader 和 vertexShader，因此您无需关心它们，也无需显式传入。

在本节中，我们将看一个简单示例：通过一个极简的 vertexShader 程序来修改基础 THREE.PlaneGeometry 顶点的 x 和 y 坐标，并搭配一个根据输入参数改变颜色的 fragmentShader 程序。

接下来，您可以看到完整的顶点着色器代码。请注意，着色器并非用 JavaScript 编写，而是使用一种类似 C 语言的 GLSL（WebGL 支持 OpenGL ES 着色语言 1.0 标准——有关 GLSL 的更多信息，请参考 https://www.khronos.org/webgl/）。我们的简单着色器代码如下所示：

uniform float time;

void main(){
  vec3 posChanged=position;
  posChanged.x=posChanged.x*(abs(sin(time*2.)));
  posChanged.y=posChanged.y*(abs(sin(time*1.)));
  posChanged.z=posChanged.z*(abs(cos(time*.5)));

  gl_Position=projectionMatrix*modelViewMatrix*vec4(posChanged,1.);
}

这里我们不会深入细节，仅聚焦于这段代码最关键的部分。为了在 JavaScript 与着色器之间进行通信，我们使用一种称为 uniforms 的机制。在此示例中，我们通过 `uniform float time;` 语句来传递外部值。

基于这个值，我们修改传入顶点（通过 position 变量传入）的 x、y 和 z 坐标：

```glsl
  posChanged.x=posChanged.x*(abs(sin(time*2.)));
  posChanged.y=posChanged.y*(abs(sin(time*1.)));
  posChanged.z=posChanged.z*(abs(cos(time*.5)));
```

现在，posChanged 向量中包含了基于传入的 time 变量计算出的新顶点坐标。最后一步是将这个新坐标传回渲染器。在 Three.js 中，这一操作始终按以下方式完成：

```glsl
gl_Position=projectionMatrix*modelViewMatrix*vec4(posChanged,1.);
```

gl_Position 是一个特殊变量，用于返回最终的顶点位置。这段程序会以字符串形式传递给 THREE.ShaderMaterial 的 vertexShader 属性。在 fragmentShader 中，我们采用类似的方式。我们编写了一个非常简单的片段着色器，仅根据传入的 `time` uniform 变量循环切换颜色：

```glsl
uniform float time;

void main(){
  
  float c1=mod(time,.5);
  float c2=mod(time,.7);
  float c3=mod(time,.9);

  gl_FragColor=vec4(c1,c2,c3,1.);
}
```

在 fragmentShader 中，我们的任务是确定传入片元（即像素）的颜色。实际的着色器程序会考虑许多因素，例如光照、顶点在面上的位置、法线等。但在此示例中，我们仅计算颜色的 rgb 值，并通过 gl_FragColor 返回，最终呈现在渲染后的网格上。

现在，我们需要将几何体、材质以及两个着色器组合在一起。在 Three.js 中，可以这样实现：

```js
  const geometry = new THREE.PlaneGeometry(10, 10, 100, 100)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() } // TODO: we should add a value here
    },
    vertexShader: vs_simple,
    fragmentShader: fs_simple
  })

  const mesh = new THREE.Mesh(geometry, material)
```

在这里，我们定义了 time uniform 变量，它将包含在着色器中可用的值，并将 vertexShader 和 fragmentShader 定义为要使用的字符串。唯一需要做的就是在渲染循环中更新 time uniform 的值，这样就完成了：

```js
// in the renderloop
material.uniforms.time.value += 0.005
```

在本章的示例中，我们添加了几个简单的着色器供您实验。如果您打开 chapter-4 文件夹中的 shader-material-vertex.html 示例文件，就能看到效果：

您可以将现有材质与自定义着色器结合使用，复用它们的片元和顶点着色器。通过这种方式，例如，您可以为 THREE.MeshStandardMaterial 扩展一些自定义效果。然而，在纯 Three.js 中实现这一过程较为困难且容易出错。幸运的是，有一个开源项目提供了一个自定义材质，使得包装现有材质并添加我们自己的着色器变得非常简单。在下一节中，我们将快速了解其工作原理。

### 使用 CustomShaderMaterial 定制现有着色器

**THREE.CustomShaderMaterial** 并未包含在 Three.js 的默认发行包中，但由于我们使用 yarn，安装它非常简单（这正是在第1章《使用Three.js创建你的第一个3D场景》中运行相关命令时所做的事情）。若想了解更多关于此模块的信息，可查阅您提供的GitHub链接（https://github.com/FarazzShaikh/THREE-CustomShaderMaterial），其中包含文档和额外示例。

首先，在展示具体示例之前，让我们快速了解一下代码结构。使用 THREE.CustomShaderMaterial 的方式与其他材质类似：

```js
const material = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader: ...,
  fragmentShader: ...,
  uniforms: {
    time: { value: 0.2 },
    resolution: { value: new THREE.Vector2() }
  },
  flatShading: true,
  color: 0xffffff
}
```

如您所见，这有点像是普通材质与 THREE.ShaderMaterial 的结合体。最核心的部分是 baseMaterial 属性。在这里，您可以指定任何标准的 Three.js 材质。除了 vertexShader、fragmentShader 和 uniforms 之外，您添加的任何其他属性都会应用于这个基础材质。而 vertexShader、fragmentShader 和 uniforms 属性的工作方式与我们在 THREE.ShaderMaterial 中看到的完全一致。

在使用 THREE.CustomShaderMaterial 时，我们需要对原本的着色器代码做一些小调整。回顾之前在 “使用 THREE.ShaderMaterial 实现自定义着色器” 部分，我们使用 gl_Position 和 gl_FragColor 来分别设置顶点的最终位置和片元的颜色。而在这个材质中，我们改用 csm_Position 来输出最终位置，并用 csm_DiffuseColor 来定义颜色。此外，该材质还提供了更多可用的输出变量，详细说明请参阅：  
https://github.com/FarazzShaikh/THREE-CustomShaderMaterial#output-variables

若您打开 custom-shader-material 示例，便会看到我们如何将简单的自定义着色器与 Three.js 的默认材质结合使用：



这种方法为您提供了一种相对简便的途径来创建自定义着色器，而无需完全从零开始。您可以直接复用默认着色器中的光照和阴影效果，并根据需要扩展自定义功能。

到目前为止，我们讨论的都是用于网格（mesh）的材质。Three.js 还提供了一些可与线几何体（line geometries）配合使用的材质。在下一节中，我们将探讨这些材质。

## 用于线几何体的材质

接下来我们将要探讨的最后几种材质只能应用于一种特定的网格：THREE.Line。顾名思义，这仅是由线段构成的单一线条，不包含任何面。Three.js 提供了两种可用于 THREE.Line 几何体的材质，如下所示：

• THREE.LineBasicMaterial：这种基础线条材质允许您设置颜色和顶点颜色属性。

• THREE.LineDashedMaterial：它具有与 THREE.LineBasicMaterial 相同的属性，但允许通过指定虚线和间距大小来创建虚线效果。

我们将从基础版本开始介绍，之后再探讨虚线变体。

### THREE.LineBasicMaterial  

适用于 THREE.Line 几何体的材质非常简单。它继承了 THREE.Material 的所有属性，但以下是对该材质最重要的属性：

• color：此属性决定线条的颜色。如果指定了 vertexColors，则会忽略此属性。以下代码片段展示了具体实现方式。

• vertexColors：通过将此属性设置为 THREE.VertexColors 值，您可以为每个顶点指定独立的颜色。

在查看 THREE.LineBasicMaterial 的示例之前，我们先快速了解如何通过一组顶点创建 THREE.Line 网格，并将其与 THREE.LineBasicMaterial 结合使用来创建网格，如下所示：

```js
const points = gosper(4, 50)
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
const colors = new Float32Array(points.length * 3)
points.forEach((e, i) => {
  const color = new THREE.Color(0xffffff)
  color.setHSL(e.x / 100 + 0.2, (e.y * 20) / 300, 0.8)
  colors[i * 3] = color.r
  colors[i * 3 + 1] = color.g
  colors[i * 3 + 2] = color.b
})
lineGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3, true))

const material = new THREE.LineBasicMaterial(0xff0000);
const mesh = new THREE.Line(lineGeometry, material)
mesh.computeLineDistances()
```

这段代码片段的第一部分 const points = gosper(4, 60) 是一个示例，用于获取一组 x、y 和 z 坐标。此函数返回一条高珀曲线（更多信息请参阅 https://mathworld.wolfram.com/Peano-GosperCurve.html），这是一种填充二维空间的简单算法。接下来，我们创建一个 THREE.BufferGeometry 实例，并调用 setFromPoints 函数来添加生成的点。对于每个坐标，我们还计算一个颜色值，用于设置几何体的 color 属性。请注意代码片段末尾的 mesh.computeLineDistances()。当您希望在使用 THREE.LineDashedMaterial 时显示虚线效果时，这是必需的。

现在我们有了几何体，就可以创建 THREE.LineBasicMaterial 并将其与几何体一起使用来创建一个 THREE.Line 网格。您可以在 line-basic-material.html 示例中看到结果。以下截图展示了该示例：



本章我们将讨论的最后一种材质与 THREE.LineBasicMaterial 仅有细微差别。通过 THREE.LineDashedMaterial，我们不仅能为线条着色，还能在线条中添加间隔，从而创建虚线效果。

### THREE.LineDashedMaterial  

这种材质具有与 THREE.LineBasicMaterial 相同的属性，并额外提供了三个属性用于定义虚线的短划宽度和间隔宽度：

• scale：此属性用于缩放 dashSize 和 gapSize。如果缩放值小于 1，则 dashSize 和 gapSize 会增大；如果缩放值大于 1，则 dashSize 和 gapSize 会减小。

• dashSize：定义短划（实线部分）的长度。

• gapSize：定义间隔（空白部分）的长度。

该材质的使用方式与 THREE.LineBasicMaterial 几乎完全相同。唯一的区别是必须调用 computeLineDistances()（此方法用于计算构成线条的顶点之间的距离）。如果不执行这一步，间隔将无法正确显示。此材质的示例可以在 line-dashed-material.html 中找到，其效果如下所示：



关于线条材质的这一节就到这里。您已经了解到，Three.js 专门为 line geometries 提供的材质选项并不多。但通过这些材质，特别是与 vertexColors 结合使用，您应该能够以任意想要的方式来设置 line geometries 的样式。

## 总结

Three.js 提供了多种材质，可用于为几何体赋予外观。这些材质从非常简单（如 THREE.MeshBasicMaterial）到高度复杂（如 THREE.ShaderMaterial，允许您提供自定义的 vertexShader 和 fragmentShader 程序）不等。各种材质共享许多基本属性，一旦掌握了如何使用其中一种材质，通常也就能够理解如何使用其他材质。需要注意的是，并非所有材质都会对场景中的光照产生反应。如果您需要一种能受光照影响的材质，通常可以使用 THREE.MeshStandardMaterial。如果需要更精细的控制，也可以考虑使用 THREE.MeshPhysicalMaterial、THREE.MeshPhongMaterial 或 THREE.MeshLambertMaterial。仅通过代码来确定特定材质属性的效果通常非常困难。因此，如本章所示，使用控制面板（control GUI）来试验这些属性是一个很好的方法。

另外，请记住，材质的大多数属性都可以在运行时修改。但有些属性（例如 side）则不能在运行时更改。如果您修改了这类属性的值，需要将材质的 needsUpdate 属性设置为 true。关于哪些属性可以在运行时修改的完整概述，请参阅以下页面：https://threejs.org/docs/#manual/en/introduction/How-to-update-things。

在本章及前一章中，我们讨论了几何体。我们在示例中使用了它们，并探讨了其中几种。在下一章，您将全面了解几何体以及如何操作它们。

# 5、学习使用几何体

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/96ef5cbacd88735fbd002e263a13da4d/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766045212&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=vSgFn1q5oTNg3KTvV2tropr2YI4%3D)            

在本章中，我们将了解以下几何体：
• THREE.CircleGeometry
• THREE.RingGeometry
• THREE.PlaneGeometry
• THREE.ShapeGeometry
• THREE.BoxGeometry
• THREE.SphereGeometry
• THREE.CylinderGeometry
• THREE.ConeGeometry
• THREE.TorusGeometry
• THREE.TorusKnotGeometry
• THREE.PolyhedronGeometry
• THREE.IcosahedronGeometry
• THREE.OctahedronGeometry
• THREE.TetrahedronGeometry
• THREE.DodecahedronGeometry



在我们深入了解Three.js提供的几何体之前，我们首先要深入了解一下Three.js是如何内部表示几何体的，它使用的是THREE.BufferGeometry。在一些文档中，你可能仍然会遇到THREE.Geometry作为所有几何体的基本对象。然而，在更新的版本中，THREE.Geometry已经完全被THREE.BufferGeometry替代了，后者通常提供了更好的性能，因为它可以轻松地将数据传输到GPU。不过，它的使用比旧的THREE.Geometry要复杂一些。

使用THREE.BufferGeometry时，几何体的所有属性都由一组属性标识。属性基本上是一个带有一些附加元数据的数组，其中包含有关顶点位置的信息。属性也用于存储有关顶点的其他信息，例如其颜色。要使用属性定义顶点和面，你可以使用THREE.BufferGeometry的以下两个属性：

- attributes：attributes属性用于存储可以直接传递到GPU的信息。例如，要定义一个形状，你可以定义一个Float32Array，其中的每三个值定义了一个顶点的位置。然后，每个三个顶点都被解释为一个面。可以像这样在THREE.BufferGeometry中定义：geometry.setAttribute('position', new THREE.BufferAttribute(arrayOfVertices, 3))。

- index：默认情况下，不需要显式地定义面（每三个连续的位置被解释为单个面），但是使用index属性，我们可以明确地定义哪些顶点组成一个面：geometry.setIndex(indicesArray)。

在本章中使用这些几何体时，你不需要考虑这些内部属性，因为Three.js会在构建几何体时正确设置它们。但是，如果你想从头开始创建一个几何体，你需要使用前面列表中显示的属性。

在Three.js中，我们有一些会产生2D网格的几何体，以及更多会创建3D网格的几何体。在本章中，我们将讨论以下主题：
- 2D几何体
- 3D几何体

## 2D几何体

### THREE.PlaneGeometry  

THREE.PlaneGeometry 对象可用于创建一个非常简单的二维矩形。关于此几何体的示例，请查看本章源文件中的 plane-geometry.html 示例。以下截图展示了一个使用 THREE.PlaneGeometry 创建的矩形：

在本章的示例中，我们添加了一个 control GUI，您可以通过它来调整几何体的属性（在本例中是 width、height、widthSegments 和 heightSegments），也可以更换材质（并调整其属性）、禁用阴影以及隐藏地平面。例如，如果您想查看此形状的各个面，只需隐藏地平面并启用所选材质的 wireframe 属性即可轻松实现：

创建一个 THREE.PlaneGeometry 对象非常简单，具体方法如下：

```js
new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
```

在这个 THREE.PlaneGeometry 的示例中，您可以修改这些属性，并直接观察到它们对生成的三维对象所产生的影响。以下是这些属性的说明列表：

•   width：矩形的宽度。

•   height：矩形的高度。

•   widthSegments：宽度方向划分的段数。默认值为 1。

•   heightSegments：高度方向划分的段数。默认值为 1。

如您所见，这个几何体并不复杂。您只需指定尺寸即可完成创建。如果您希望生成更多的面（例如，用于创建棋盘格图案时），可以使用 widthSegments 和 heightSegments 属性将几何体分割成更小的面。

> **注意**  
> 在几何体创建后，如果您想访问其属性，不能直接使用 plane.width 的方式。要访问几何体的属性，必须通过对象的 parameters 属性。因此，要获取本节中创建的平面对象的宽度属性，您需要使用 plane.parameters.width。

### THREE.CircleGeometry  

您可能已经猜到 THREE.CircleGeometry 能够创建什么。利用这个几何体，您可以创建一个简单的二维圆形（或部分圆形）。首先，让我们通过 circle-geometry.html 示例来了解此几何体。

在下面的截图中，您可以看到一个示例，其中我们创建了一个 THREE.CircleGeometry 对象，其 thetaLength 值小于 2 * PI：

在此示例中，您可以看到并控制一个由 THREE.CircleGeometry 创建的网格。2 * PI 弧度表示一个完整的圆。如果您更习惯使用角度而非弧度，两者之间的转换非常简单。

以下两个函数可以帮助您在弧度与角度之间进行转换，如下所示：

```js
const deg2rad = (degrees) => (degrees * Math.PI) / 180
const rad2deg = (radians) => (radians * 180) / Math.PI
```

当您创建 THREE.CircleGeometry 时，可以指定以下属性来定义圆形的外观：

•   radius：圆的半径决定了其大小。半径是指从圆心到边缘的距离。默认值为 50。

•   segments：此属性定义了用于创建圆形的面的数量。最小值为 3，如果未指定，此值默认为 8。数值越高，圆形越平滑。

•   thetaStart：此属性定义了开始绘制圆形的位置。此值的范围可从 0 到 2 * PI，默认值为 0。

•   thetaLength：此属性定义了圆形的完整程度。如果未指定，默认值为 2 * PI（一个完整的圆）。例如，如果为此值指定 0.5 * PI，您将得到一个四分之一圆。可将此属性与 thetaStart 属性结合使用，以定义圆形的形状。

要创建一个完整的圆，只需指定半径和分段数：

```js
new THREE.CircleGeometry(3, 12)
```

如果要从这个几何体创建半个圆，可以这样编写：

```js
new THREE.CircleGeometry(3, 12, 0, Math.PI)
```

这会创建一个半径为 3 的圆，并被分割为 12 个分段。该圆从默认的 0 位置开始绘制，由于我们将 thetaLength 指定为 Math.PI（即半个圆），因此只绘制了一半。

在继续讨论下一个几何体之前，先简要说明一下 Three.js 在创建这些二维形状（THREE.PlaneGeometry、THREE.CircleGeometry、THREE.RingGeometry 和 THREE.ShapeGeometry）时使用的方向：Three.js 会将这些对象创建为直立状态，因此它们沿着 x-y 平面对齐。这很合理，因为它们本质上是二维形状。然而，尤其是在使用 THREE.PlaneGeometry 时，您通常希望网格能平放在地面上（即 x-z 平面），作为某种可以放置其他对象的基础平面。创建水平方向而非垂直方向的二维对象的最简单方法是，将网格围绕其 x 轴向后旋转四分之一圈（-PI/2），如下所示：

```js
mesh.rotation.x =- Math.PI/2;  
```

关于 THREE.CircleGeometry 的介绍就到这里。下一个几何体 THREE.RingGeometry 看起来与 THREE.CircleGeometry 非常相似。

### THREE.RingGeometry  

通过 THREE.RingGeometry，您可以创建一个二维对象，它不仅与 THREE.CircleGeometry 非常相似，还允许您在中心定义一个孔洞（参见 ring-geometry.html）：

创建 THREE.RingGeometry 对象时，可以使用以下属性：

•   innerRadius：圆环的内半径定义了中心孔洞的大小。如果此属性设置为 0，则不会显示孔洞。默认值为 0。

•   outerRadius：圆环的外半径定义了其大小。半径是指从圆心到边缘的距离。默认值为 50。

•   thetaSegments：此属性定义了用于创建圆环的圆周分段数。数值越高，圆环越平滑。默认值为 8。

•   phiSegments：此属性定义了沿圆环径向的分段数。默认值为 8。这不会直接影响圆环的平滑度，但会增加面的数量。

•   thetaStart：此属性定义了开始绘制圆环的位置。此值的范围可从 0 到 2 * PI，默认值为 0。

•   thetaLength：此属性定义了圆环的完整程度。如果未指定，默认值为 2 * PI（一个完整的圆环）。例如，如果为此值指定 0.5 * PI，您将得到一个四分之一圆环。可将此属性与 thetaStart 属性结合使用，以定义圆环的形状。

### THREE.ShapeGeometry  

THREE.PlaneGeometry 和 THREE.CircleGeometry 在自定义外观方面能力有限。如果您想创建自定义的二维形状，可以使用 THREE.ShapeGeometry。通过 THREE.ShapeGeometry，您可以调用一系列函数来创建自己的形状。这可以与 <path/> 元素的功能相媲美，该功能在 HTML canvas 元素和 SVG 中也同样可用。我们先从一个示例开始，之后会向您展示如何使用各种函数来绘制自己的形状。您可以在本章的源文件中找到 shape-geometry.html 示例。

以下截图展示了这个示例：



## 3D几何体

### THREE.BoxGeometry  

THREE.BoxGeometry 是一个非常简单的三维几何体，允许您通过指定其 width、height 和 depth 属性来创建立方体。

如您在此示例中所见，通过更改 THREE.BoxGeometry 的 width、height 和 depth 属性，您可以控制生成网格的大小。在创建新立方体时，这三个属性也是必需的，如下所示：

```js
new THREE.BoxGeometry(10,10,10);
```

在此示例中，您还可以看到可以在立方体上定义的其他几个属性。以下列表解释了所有属性：

•   width：立方体的宽度。这是立方体顶点沿 x 轴的长度。

•   height：立方体的高度。这是立方体顶点沿 y 轴的长度。

•   depth：立方体的深度。这是立方体顶点沿 z 轴的长度。

•   widthSegments：此属性定义了我们将立方体沿 x 轴方向的面分割成的段数。默认值为 1。定义的段数越多，一个侧面包含的面就越多。如果此属性及后两个属性都设为 1，立方体的每个侧面将只有 2 个面。如果此属性设为 2，则该面将被分割为 2 段，从而产生 4 个面。

•   heightSegments：此属性定义了我们将立方体沿 y 轴方向的面分割成的段数。默认值为 1。

•   depthSegments：此属性定义了我们将立方体沿 z 轴方向的面分割成的段数。默认值为 1。

通过增加各种分段属性，您可以将立方体的六个主要面分割成更小的面。这在您希望使用 THREE.MeshFaceMaterial 在立方体的部分区域设置特定材质属性时非常有用。

THREE.BoxGeometry 是一个非常简单的几何体。另一个简单的几何体是 THREE.SphereGeometry。

### THREE.SphereGeometry  

  通过 THREE.SphereGeometry，您可以创建一个三维球体。让我们直接进入示例 sphere-geometry.html：

### THREE.CylinderGeometry  

通过这个几何体，我们可以创建圆柱体和圆柱形物体。与所有其他几何体一样，我们也有一个示例（cylinder-geometry.html），可以让您试验此几何体的属性，其截图如下：

### THREE.ConeGeometry  

### THREE.TorusGeometry  

圆环面是一种简单的形状，看起来像一个甜甜圈。

### THREE.TorusKnotGeometry  

通过 THREE.TorusKnotGeometry，您可以创建环面纽结（torus knot）。环面纽结是一种特殊的纽结结构，形似一根绕自身缠绕多次的管道。理解它的最佳方式是通过 torus-knot-geometry.html 示例来观察。以下截图展示了这种几何体：

### THREE.PolyhedronGeometry  

利用这个几何体，您可以轻松创建多面体。多面体是一种仅由平面和直线边构成的几何体。然而，大多数情况下，您不会直接使用 THREE.PolyhedronGeometry。Three.js 提供了一些特定的多面体，您可以直接使用，而无需指定 THREE.PolyhedronGeometry 的顶点和面。我们将在本节稍后部分讨论这些多面体。

如果您确实想直接使用 THREE.PolyhedronGeometry，则必须指定其顶点和面（就像我们在第三章《在 Three.js 中使用光源》中为立方体所做的那样）。例如，我们可以创建一个简单的四面体（也可参见本章关于 THREE.TetrahedronGeometry 的部分），代码如下：



在本节的开头，我们提到 Three.js 自带了几种现成的多面体。在接下来的几个小节中，我们将快速向您展示这些几何体。所有这些多面体类型都可以通过查看 polyhedron-geometry.html 示例来观察。

### THREE.IcosahedronGeometry  

THREE.IcosahedronGeometry 可创建一个由 12 个顶点构成的 20 个全等三角形面组成的正二十面体。创建该多面体时，只需指定半径（radius）和细分层级（detail）。以下截图展示了使用 THREE.IcosahedronGeometry 创建的多面体：

### THREE.TetrahedronGeometry  

四面体是最简单的多面体之一。它仅包含由四个顶点构成的四个三角形面。与其他 Three.js 提供的多面体一样，您可以通过指定半径（radius）和细分层级（detail）来创建 THREE.TetrahedronGeometry。以下截图展示了使用 THREE.TetrahedronGeometry 创建的四面体：

### THREE.OctahedronGeometry  

Three.js 同样提供了正八面体的实现。顾名思义，这个多面体有八个面。这些面由六个顶点构成。以下截图展示了此几何体：

### THREE.DodecahedronGeometry  

Three.js 提供的最后一个多面体几何体是 THREE.DodecahedronGeometry。这个多面体有 12 个面。以下截图展示了此几何体：

## 总结

在本章中，我们讨论了 Three.js 提供的所有标准几何体。如您所见，有许多几何体可以直接使用。要更好地掌握这些几何体的使用方法，请多进行实践。通过本章的示例，熟悉可用于自定义 Three.js 标准几何体集的各项属性。

对于二维形状，需要记住它们默认放置在 x-y 平面上。如果您希望二维形状水平放置，需要将网格绕 x 轴旋转 -0.5 * PI。最后请注意，在旋转二维形状或开放的三维形状（例如圆柱体或管道）时，记得将材质设置为 THREE.DoubleSide。如果不这样做，几何体的内部或背面将不会显示。

本章我们主要介绍了简单直接的网格。Three.js 还提供了创建复杂几何体的方法，我们将在第 6 章中介绍。

# 6、探索高级几何

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/6664544e20ac6c0d490dadcc3f6ce899/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766045456&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=iPd%2BfqX4y%2FOC0smelvOqYTesvAg%3D)      

在第5章《学习使用几何体》中，我们展示了Three.js提供的所有基础几何体。除了这些基础几何体，Three.js还提供了一系列更高级和专用的几何对象。在本章中，我们将向您展示这些高级几何体：

• 如何使用高级几何体，例如THREE.ConvexGeometry、THREE.LatheGeometry、THREE.BoxLineGeometry、THREE.RoundedBoxGeometry、THREE.TeapotGeometry和THREE.TubeGeometry。

• 如何使用THREE.ExtrudeGeometry从2D形状创建3D形状。我们将从一个2D SVG图像创建一个3D形状，并通过挤出2D Three.js形状来创建新颖的3D形状。

• 如果您希望自己创建自定义形状，可以继续使用我们在前几章讨论过的几何体。然而，Three.js还提供了一个THREE.ParametricGeometry对象。借助参数化几何体，您可以通过更改参数来影响几何体的形状。

• 我们还将展示如何使用THREE.TextGeometry创建3D文字效果，并介绍如何在场景中添加2D文本标签时使用Troika库。

• 此外，我们将介绍如何使用两种辅助几何体：THREE.WireframeGeometry和THREE.EdgesGeometry。这些辅助工具可帮助您更详细地查看其他几何体的结构。

我们将从列表中的第一个——THREE.ConvexGeometry开始介绍。

## 学习高级几何体

在这一节中，我们将探讨一系列高级Three.js几何体，首先从THREE.ConvexGeometry开始——它可用于生成凸包几何体。

### THREE.ConvexGeometry  

通过THREE.ConvexGeometry，我们可以从一组点创建凸包。凸包是能完全包围所有这些点的最小形状。理解这个概念最简单的方法就是看一个例子。如果你打开convex-geometry.html示例，你会看到一组随机点的凸包。

在这个示例中，我们生成了一组随机点，并基于这些点创建了THREE.ConvexGeometry。示例中，你可以通过右侧菜单的“重绘”按钮生成20个新点并绘制凸包。如果你想亲自尝试，可以开启材质的透明度并将不透明度设置为低于1的值，这样就能看到用于创建此几何体的点。在此示例中，这些点被创建为小的THREE.SphereGeometry对象。

```js
const generatePoints = () => {
  const spGroup = new THREE.Object3D()
  spGroup.name = 'spGroup'
  const points = []

  for (let i = 0; i < 20; i++) {
    const randomX = -5 + Math.round(Math.random() * 10)
    const randomY = -5 + Math.round(Math.random() * 10)
    const randomZ = -5 + Math.round(Math.random() * 10)
    points.push(new THREE.Vector3(randomX, randomY, randomZ))
  }

  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: false })
  points.forEach(function (point) {
    const spGeom = new THREE.SphereGeometry(0.04)
    const spMesh = new THREE.Mesh(spGeom, material)
    spMesh.position.copy(point)
    spGroup.add(spMesh)
  })

  return {
    spGroup,
    points
  }
}
```

正如您在这段代码片段中所见，我们创建了20个随机点（THREE.Vector3），并将它们存入一个数组。接着，我们遍历这个数组并创建多个 THREE.SphereGeometry 实例，将每个实例的位置设置为这些点之一（通过 position.copy(point)）。所有点都被添加到一个组中，这样在重绘时就能轻松替换它们。一旦获得这组点，从中创建 THREE.ConvexGeometry 就非常简单，如以下代码片段所示：

```js
const convexGeometry = new THREE.ConvexGeometry(points);
```

THREE.ConvexGeometry 接受的唯一参数是一个包含顶点（THREE.Vector3 类型）的数组。请注意，若想渲染平滑的 THREE.ConvexGeometry，应调用 computeVertexNormals 方法，正如我们在第二章《构成 Three.js 应用的基本组件》中解释的那样。

下一个复杂几何体是 THREE.LatheGeometry，例如可用于创建花瓶状形状。

### THREE.LatheGeometry  

THREE.LatheGeometry 允许您通过一组共同构成曲线的点来创建形状。查看图6.2时，可以看到我们创建了一系列点（红点），Three.js 利用这些点生成了 THREE.LatheGeometry。再次强调，理解 THREE.LatheGeometry 形态最直观的方式是查看示例。此几何体的展示可参考 lathe-geometry.html 文件，下图取自该示例的截图展示了这种几何体：

### BoxLineGeometry  

如果您只想显示轮廓线，您可以使用THREE.BoxLineGeometry。这个几何体的工作方式与THREE.BoxGeometry完全相同，但不是渲染实心对象，而是使用线条渲染盒子，如下所示（来自box-line-geometry.html）：

您使用此几何体的方式与 THREE.BoxGeometry 相同，但并非创建 THREE.Mesh，而是需要使用线框专用材质之一来创建 THREE.LineSegments：

```js
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry'

const material = new THREE.LineBasicMaterial({ color: 0x000000 })

const geometry = new BoxLineGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
const lines = new THREE.LineSegments(geometry, material)
scene.add(lines)
```

### THREE.RoundedBoxGeometry  

此几何体使用与 THREE.BoxGeometry 相同的属性，同时还允许您指定圆角的弧度。在 rounded-box-geometry 示例中，您可以观察到实际效果：



### TeapotGeometry  

TeapotGeometry 是一种可用于渲染茶壶的几何体（这并不令人意外）。该茶壶是自1975年以来一直使用的3D渲染标准参考模型。关于此模型历史的更多信息可在此处查看：https://www.computerhistory.org/ revolution/computer-graphics-music-and-art/15/206。

## 通过拉伸二维形状来创建几何体

Three.js 提供了一种方法，可以将二维形状拉伸成三维形状。所谓的拉伸，就是沿着其 z 轴拉伸二维形状以将其转换为三维形状。例如，如果我们将 THREE.CircleGeometry 进行拉伸，我们将得到一个看起来像圆柱体的形状，如果我们将 THREE.PlaneGeometry 进行拉伸，我们将得到一个类似立方体的形状。最通用的拉伸形状的方法是使用 THREE.ExtrudeGeometry。

### THREE.ExtrudeGeometry  

THREE.ExtrudeGeometry 允许您将2D形状转换为3D对象。在深入探讨此几何体前，我们先通过示例 extrude-geometry.html 来观察效果。下图截取自该示例，展示了这种几何体的形态：

### THREE.TubeGeometry  

THREE.TubeGeometry 可沿三维样条曲线生成管道。您只需指定由顶点构成的路径，该几何体便会自动创建管道结构。本章提供的 tube-geometry.html 示例可供交互体验，下图展示了该案例效果：

### 从SVG元素拉伸3D形状

在第5章讨论THREE.ShapeGeometry时，我们提到SVG采用非常相似的形状绘制方法。本节将介绍如何结合SVG图像与THREE.SVGLoader进行挤出操作，并以蝙蝠侠标志为例演示：

### THREE.ParametricGeometry  

THREE.ParametricGeometry 允许基于数学方程创建几何体。在探索自定义示例前，建议先研究 Three.js 官方提供的案例。下载 Three.js 发行包时，您会获得 examples/js/ParametricGeometries.js 文件，其中包含多个可与 THREE.ParametricGeometry 配合使用的方程示例。

最基础的示例是创建平面的函数：

```js
plane: function (width, height) {
  return function (u, v, target) {
    const x = u * width;
    const y = 0;
    const z = v * height;
    target.set(x, y, z);
  };
}
```

该函数由 THREE.ParametricGeometry 调用。参数 u 和 v 的取值范围为 0 到 1，系统会多次调用该函数以覆盖整个取值区间。在此示例中，u 值用于确定向量的 x 坐标，v 值用于确定 z 坐标。运行后将生成一个宽度为 width、深度为 depth 的基础平面。

而在我们的示例中，我们采用了类似方法，但并非创建平坦平面，而是生成了波浪状图案（如 parametric-geometry.html 示例所示）。下图展示了该案例效果：

为创建此形状，我们向 THREE.ParametricGeometry 传递了以下函数：

```js
const radialWave = (u, v, optionalTarget) => {
  var result = optionalTarget || new THREE.Vector3()
  var r = 20

  var x = Math.sin(u) * r
  var z = Math.sin(v / 2) * 2 * r + -10
  var y = Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)

  return result.set(x, y, z)
}

const geom = new THREE.ParametricGeometry(radialWave, 120, 120);
```

通过此示例可见，仅需少量代码即可创建出非常有趣的几何体。该示例同时展示了 THREE.ParametricGeometry 可接收的参数：
• function：定义基于 u、v 值的顶点坐标生成函数

• slices：设定 u 值方向的分段数量

• stacks：设定 v 值方向的分段数量

更多示例可参考 Three.js 发行包中的 examples/js/ParametricGeometries.js 文件，该文件包含创建以下几何体的函数：
• 克莱因瓶

• 平面  

• 二维莫比乌斯带

• 三维莫比乌斯带  

• 管道

• 环面纽结

• 球体

• 平面  

当您需要专注于几何体结构细节（如顶点与面片分析）而不关心材质与渲染效果时，除了启用材质的线框模式外，Three.js 还提供了一些辅助几何体。我们将在下一节探讨这些工具。

## 可用于调试的几何图形

Three.js提供了两种辅助几何体，使得查看几何体的细节或仅轮廓更加容易：
- `THREE.EdgesGeometry`：提供一个仅渲染几何体边缘的几何体。
- `THREE.WireFrameGeometry`：渲染几何体但不显示任何面。

首先，让我们来看看 `THREE.EdgesGeometry`。

### THREE.EdgesGeometry 

THREE.EdgesGeometry 通过包裹现有几何体，仅渲染边缘线而非单独显示顶点和面片。该效果展示在 edges-geometry.html 示例中：

上图中可见 RoundedBoxGeometry 的轮廓线被完整呈现，由于该几何体具有圆角特征，使用 THREE.EdgesGeometry 时会自然显示这些平滑转角。

使用时只需按以下方式包裹现有几何体：

```js
const baseGeometry = new RoundedBoxGeometry(3, 3, 3, 10, 0.4)
const edgesGeometry = THREE.EdgesGeometry(baseGeometry, 1.5)
```

THREE.EdgesGeometry 的唯一参数是 thresholdAngle（阈值角度）。通过该属性可控制几何体绘制边缘的条件。在 edges-geometry.html 示例中，您可以实时调整该参数观察效果。

若需显示现有几何体的线框，可直接通过材质配置实现：

```js
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
```

Three.js 还提供了另一种使用 THREE.WireframeGeometry 的方式。

### THREE.WireFrameGeometry  

这个几何体模拟了将材质的 wireframe 属性设置为 true 时所看到的效果：

使用此材质的方式与 THREE.EdgesGeometry 相同：

```js
const baseGeometry = new THREE.TorusKnotBufferGeometry(3, 1, 100, 20, 6, 9)
const wireframeGeometry = new THREE.WireframeGeometry(baseGeometry)
```

此几何体不接收任何附加属性。  
本章最后部分将介绍创建3D文本对象的两种方法：一种使用 THREE.Text 对象，另一种借助外部库实现。

## 创建一个三维文本网格

本节将简要介绍创建3D文本的方法。首先讲解如何使用Three.js内置字体渲染文本，以及如何加载自定义字体；随后通过Troika库（https://github.com/ protectwise/troika  ）的简易示例，演示如何快速创建标签与2D文本元素并添加到场景中。

### 渲染文本

在Three.js中渲染文本非常简单，只需定义所需字体并运用与THREE.ExtrudeGeometry相同的挤出属性即可。下图展示了text-geometry.html示例中Three.js的文本渲染效果：

该几何体也支持使用其他字体，但需要先将字体转换为JSON格式——具体操作方法将在下一节说明。

### 添加自定义字体

Three.js 提供了一些基于 TypeFace.js 库的预设字体。TypeFace.js 能够将 TrueType 和 OpenType 字体转换为 JavaScript 或 JSON 格式。早期版本使用 JavaScript 文件，但新版 Three.js 已全面改用 JSON 格式。  

如需转换现有字体，可通过 https://gero3.github.io/facetype.js/ 在线工具实现。

在此页面中，您可以上传字体文件，系统会将其转换为JSON格式。需注意：并非所有字体都能完美转换——结构越简单的字体（直线条居多），在Three.js中的渲染成功率越高。生成的JSON文件格式如下，其中每个字符（或字形）均被详细描述：

获取JSON文件后，您可通过FontLoader（如先前"渲染文本"章节所示）加载该字体，并将其作为font属性传入TextGeometry的配置参数。本章最后一个示例将展示Three.js创建文本的另一种方法。

### 使用 Troika 库创建文本

若需为场景中的特定部分创建标签或二维文本标记，除了使用 THREE.Text 几何体外，还可选用名为 Troika 的外部库：https://github.com/protectwise/troika。

该库功能丰富，能为场景添加大量交互特性。本例将重点介绍其文本模块的功能，具体效果可参阅 troika-text.html 示例：

使用该库前需先安装（若已按第1章《使用Three.js创建首个3D场景》的指引操作，则已具备使用条件）：  

```sh
$ yarn add troika-three-text
```

安装完成后，可像调用Three.js其他模块一样导入使用：

```js
import { Text } from 'troika-three-text'

const troikaText = new Text()
troikaText.text = 'Text rendering with Troika!\nGreat for 2D labels'
troikaText.fontSize = 2
troikaText.position.x = -3
troikaText.color = 0xff00ff
troikaText.sync()
scene.add(troikaText)
```

以上代码片段展示了如何使用 Troika 创建简单文本元素。您只需调用 Text() 构造函数并设置属性即可。但需注意：修改 Text() 对象的任何属性后，都必须调用 troikaText.sync() 方法，以确保变更能同步应用到屏幕渲染的模型上。

## 总结

本章我们学习了许多内容。我们介绍了几种高级几何体，并展示了如何使用Three.js创建和渲染文本元素。我们演示了如何利用THREE.ConvexGeometry、THREE.TubeGeometry和THREE.LatheGeometry等高级几何体创建非常精美的形状，以及如何通过调整这些几何体来获得期望的效果。一个非常好的特性是，我们可以使用THREE.ExtrudeGeometry将现有的SVG路径转换为Three.js几何体。

我们还快速了解了几种对调试非常有用的几何体。THREE.EdgesGeometry仅显示其他几何体的边缘，而THREE.WireframeGeometry可用于显示其他几何体的线框。

最后，如果您想创建3D文本，Three.js提供了TextGeometry，您可以传入要使用的字体。Three.js自带了一些字体，但您也可以创建自己的字体。不过请记住，复杂的字体通常无法正确转换。使用TextGeometry的替代方案是使用Troika库，它可以非常轻松地创建2D文本标签并将其放置在场景中的任何位置。

到目前为止，我们探讨的是实体（或线框）几何体，其中顶点相互连接形成面。在下一章中，我们将探讨一种使用粒子或点来可视化几何体的替代方法。使用粒子时，我们并不渲染完整的几何体，而是仅将各个顶点作为空间中的点进行渲染。这使您可以创建性能良好的、外观出色的3D效果。

# 7、点和精灵

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/34af7383596ff3be65ba0e09b276e46f/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766045614&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=XrQtQniDQCQ6qvGdj4MtxR3uNis%3D)      

在前几章中，我们已经探讨了Three.js提供的核心概念、对象和API。本章将深入讲解此前唯一未涉及的主题：点（Points）和精灵（Sprites）。通过THREE.Points（有时也称为精灵），可以轻松创建大量始终面向相机的小矩形，用于模拟雨、雪、烟雾等特效。例如，您可以将独立几何体以点集形式渲染，并分别控制这些点。本章将系统介绍Three.js中与点及精灵相关的各项功能。

具体来说，本章将涵盖以下主题：
• 使用 THREE.SpriteMaterial 和 THREE.PointsMaterial 创建并设置粒子样式

• 使用 THREE.Points 创建点群

• 利用画布为每个点单独设置样式

• 通过纹理定制单个点的外观

• 为 THREE.Points 对象添加动画效果

• 基于现有几何体生成 THREE.Points 对象

> **关于本章中使用的一些名称的简要说明**
> 在较新版本的 Three.js 中，与点相关的对象的名称已经多次更改。`THREE.Points` 对象以前被称为 `THREE.PointCloud`，在更早的版本中，它被称为 `THREE.ParticleSystem`。`THREE.Sprite` 以前被称为 `THREE.Particle`，而材质也经历了几次更名。因此，如果您看到使用这些旧名称的在线示例，请记住它们是在讨论相同的概念。

## 理解点和精灵

遵循新概念的讲解惯例，我们将从示例入手。在本章源码中，您会找到名为sprite.html的示例。打开该示例后，您将看到一个极简场景，其中仅包含一个纯色正方形：

您可以使用鼠标旋转场景观察。值得注意的是，无论从哪个角度观察，这个正方形看起来都完全一样。例如，下图展示了同一场景从不同视角观察的效果：

如图所示，精灵仍以朝向摄像机的角度呈现，您无法看到其背面。可以将精灵理解为一个始终面向摄像机的二维平面。若创建时不设置任何属性，精灵默认渲染为白色的小型二维方块。创建精灵仅需提供一种材质：

```js
const material = new THREE.SpriteMaterial({ size: 0.1, color: 0xff0000 })
const sprite = new THREE.Sprite(material)
sprite.position.copy(new THREE.Vector3(1, 1, 1))
```

您可以使用 THREE.SpriteMaterial 来配置精灵的外观：

• color：精灵的颜色，默认为白色。

• sizeAttenuation：若设为 false，则无论精灵距离摄像机多远，其大小保持不变；若设为 true，则大小随距离摄像机远近而变化，默认为 true。注意：此属性仅在使用 THREE.PerspectiveCamera 时生效，对于 THREE.OrthographicCamera，其行为始终等同于设为 false。

• map：通过此属性可为精灵添加纹理，例如将其显示为雪花状。此属性未在本示例中展示，但将在本章的“使用纹理设置粒子样式”一节中说明。

• opacity：结合 transparent 属性，设置精灵的不透明度，默认为 1（完全不透明）。

• transparent：若设为 true，精灵将根据 opacity 属性值呈现透明度，默认为 false。

• blending：渲染精灵时使用的混合模式。

需要注意的是，THREE.SpriteMaterial 继承自基础的 THREE.Material 对象，因此该对象的所有属性也可用于 THREE.SpriteMaterial。

在深入探讨更有趣的 THREE.Points 对象之前，我们先来详细了解 THREE.Sprite 对象。THREE.Sprite 与 THREE.Mesh 一样，继承自 THREE.Object3D 对象。这意味着 THREE.Mesh 中大多数已知的属性和函数均可用于 THREE.Sprite：您可以通过 position 属性设置其位置，使用 scale 属性进行缩放，并通过 translate 属性沿坐标轴移动。

使用 THREE.Sprite 可以轻松创建一组对象并在场景中移动它们。当处理少量对象时效果良好，但若需操作大量 THREE.Sprite 对象，很快就会遇到性能问题，因为每个对象都需要由 Three.js 单独管理。为此，Three.js 提供了通过 THREE.Points 对象批量处理大量精灵的优化方案。使用 THREE.Points 时，Three.js 只需管理单个 THREE.Points 实例而非众多独立精灵，从而实现对绘制过程的优化并提升性能。下图展示了通过 THREE.Points 对象渲染的多个精灵效果：

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

从这段代码可见，我们首先创建了一个 THREE.Vector3 对象数组——每个元素对应一个精灵的生成位置。同时，我们在 THREE.BufferGeometry 上设置了 color 属性，用于为每个精灵着色。通过 THREE.BufferGeometry 和 THREE.PointsMaterial 实例，即可创建 THREE.Points 对象。THREE.PointsMaterial 的属性与 THREE.SpriteMaterial 高度相似：

• color：点的颜色，默认为 0xffffff（白色）

• sizeAttenuation：若设为 false，所有点将保持相同尺寸（与摄像机距离无关）；设为 true 则根据摄像机距离动态调整尺寸，默认为 true

• map：通过纹理贴图可定制点的外观（如雪花效果），本章后续"使用纹理设置粒子样式"章节将详细说明

• opacity：配合 transparent 属性控制透明度，默认为 1（完全不透明）

• transparent：设为 true 时启用 opacity 设定的透明度，默认为 false

• blending：指定精灵的混合渲染模式

• vertexColors：通常所有点颜色相同，设为 true 且几何体设置 color 缓冲属性后，各点将采用数组中的对应颜色值，默认为 false

与往常一样，您可以通过示例右侧的菜单交互调整这些属性。

目前我们仅将粒子渲染为默认的小方块，但接下来将介绍另外两种粒子样式定制方法。

（pcd 点云数据的读取可以参照这个。）

## 使用纹理定制粒子样式

本节将介绍两种改变精灵外观的方法：  
1. 通过HTML画布绘制图像，并将该图像应用于每个精灵  
2. 加载外部图像文件，定义每个精灵的视觉形态  

我们先从自主绘制图像开始。

### 在画布上绘制图像

在 THREE.PointsMaterial 的属性中，我们提到过 map 属性。通过该属性，可以为每个粒子加载纹理。在 Three.js 中，这个纹理可以来自 HTML5 画布的输出。在查看代码之前，我们先看一个示例（canvas-texture.js）：  

如图所示，屏幕上出现了一大群类似吃豆人游戏中幽灵的粒子。这里使用的实现方法与之前"理解点与精灵"章节中介绍的方式相同。但这次我们展示的不再是简单的方块，而是自定义图像。创建该纹理的代码如下：



在下一节中，我们将加载一些外部图像作为纹理，替代手动绘制纹理的方式。

### 使用纹理定制粒子样式

在"画布绘制图像"章节的示例中，我们了解了如何通过HTML画布定制THREE.Points的样式。虽然您可以自由绘制任何内容甚至加载外部图像，但还有一种更直接的方式为粒子系统添加样式：使用THREE.TextureLoader().load()加载图像作为THREE.Texture对象，并将其赋给材质的map属性。  

本节将通过两个示例演示实现方法，两个案例均采用图像纹理为粒子赋予形态。第一个示例将创建雨滴模拟效果（rain.html）：

首先我们需要获取代表雨滴的纹理。您可以在 assets/textures/particles 文件夹中找到一些示例纹理。在后续章节中，我们将详细说明纹理的所有细节和要求。目前您只需了解：纹理应为正方形，且尺寸最好是2的幂次方（例如64x64、128x128或256x256）。本示例将使用以下纹理：

本章已详细讲解这些属性。核心要点在于：map属性指向通过THREE.TextureLoader.load加载的纹理。注意我们再次使用alphaTest属性来避免多个精灵重叠移动时出现渲染异常。

至此已完成THREE.Points对象的样式设置。当您打开示例时还会发现粒子本身在运动。实现原理非常简单：每个粒子都是构成THREE.Points对象几何体的顶点。下面展示如何为THREE.Points对象添加动态顶点：

这与本章之前的示例并无太大差异。这里我们为每个粒子添加了一个名为 velocity 的属性，该属性包含两个值：velocityX 和 velocityY。前者定义粒子（雨滴）的水平移动速度，后者则控制雨滴的下落速度。既然每个雨滴都有了独立的速度属性，我们就可以在渲染循环中移动单个粒子了：

这段代码从创建 THREE.Points 的几何体中获取所有顶点（粒子）。对于每个粒子，我们使用 velocityX 和 velocityY 来更新其当前位置。随后确保粒子保持在设定范围内：当 v.y 位置低于 0 时，将雨滴重置回顶部；当 v.x 位置触及边界时，通过反转水平速度实现反弹效果。最后需通知 Three.js 我们已修改 bufferGeometry 的数据，确保下次渲染时使用正确数值。

现在来看另一个示例。这次我们将不再模拟雨滴，而是创建雪花效果，并使用三张不同的纹理图片（取自 Three.js 示例）。先观察最终效果（snow.html）：

仔细观察上图会发现，我们并未使用单一图像作为纹理，而是采用了多张带透明背景的图片。您可能好奇这是如何实现的。如您所知，单个 THREE.Points 对象只能使用一种材质。若需多材质效果，只需创建多个 THREE.Points 实例即可，具体实现如下：

在这段代码中，我们创建了三个独立的 THREE.Points 实例，每个实例使用专属材质。雪花移动逻辑与雨滴示例相同（故未展示 createPoint 和渲染循环细节）。值得注意的是：若要在单个 THREE.Points 实例中实现多纹理效果，需自定义片元着色器并使用 THREE.ShaderMaterial。

需要强调的是，THREE.Points 是为现有场景添加视觉特效的高效方式。例如前文的雪花效果，能快速将普通场景转换为雪景：

精灵的另一种应用场景是在现有场景上方创建简易的二维平视显示器（HUD）。我们将在下一节探讨具体实现方法。

## 使用精灵贴图  

本章开头我们使用 THREE.Sprite 对象渲染独立点状元素，这些精灵被定位在3D世界中，其大小基于与摄像机的距离（这种技术也称为布告板渲染）。本节将展示 THREE.Sprite 的另一种应用：通过额外的 THREE.OrthographicCamera 实例和辅助场景，创建类似HUD（平视显示器）的图层。同时演示如何通过精灵贴图（sprite map）为 THREE.Sprite 选择图像。  

我们将创建一个从左向右移动的简单 THREE.Sprite 对象作为示例。背景中渲染的3D场景摄像机可自由移动，以此证明精灵的运动独立于摄像机。下图展示了首个示例（spritemap.html）的效果：

通过 map.offset 和 map.repeat 属性，我们可以选择在屏幕上显示正确的精灵。使用 map.offset 属性，我们可以确定已加载纹理在 x 轴（u）和 y 轴（v）上的偏移量。这些属性的取值范围是 0 到 1。在我们的示例中，如果要选择第三个幽灵，必须将 u 偏移量（x 轴）设置为 0.4，并且由于我们只有一行，因此不需要更改 v 偏移量（y 轴）。如果仅设置此属性，纹理将在屏幕上显示被压缩在一起的第三、第四和第五个幽灵。为了只显示一个幽灵，我们需要放大。我们可以通过将 u 值的 map.repeat 属性设置为 1/5 来实现这一点。这意味着我们放大（仅针对 x 轴）以仅显示纹理的 20%，正好是一个幽灵。最后，我们需要更新渲染函数：

```js
renderer.render(scene, camera)
renderer.autoClear = false
renderer.render(sceneOrtho, cameraOrtho)
```

首先，我们用普通摄像机渲染包含两个网格的场景；然后，渲染包含精灵的场景。在渲染循环中，我们还切换了一些属性，以便在精灵碰到右侧墙壁时显示下一个精灵并改变其方向（代码未显示）。

到目前为止，本章主要介绍了如何从头开始创建精灵和点云。不过，一个有趣的选项是从现有几何体创建 THREE.Points。

## 基于现有几何体创建 THREE.Points

您可能记得，THREE.Points 会根据提供的 THREE.BufferGeometry 的顶点来渲染每个点。这意味着如果我们提供一个复杂几何体（例如圆环结或管道），就可以基于该几何体的顶点创建 THREE.Points。在本章最后一节，我们将创建一个类似于第6章《探索高级几何体》中介绍的圆环结，并将其渲染为 THREE.Points 对象。  

关于圆环结的详细说明已在第6章中介绍，这里不再赘述。下图展示了该示例（points-from-geom.html）：

从以上截图可见，生成圆环结所用的每个顶点都被用作一个点。我们可以通过以下方式设置：

如您所见，我们只需创建一个几何体，并将其作为 THREE.Points 对象的输入。通过这种方式，我们可以将任何几何体渲染为点对象。

> **注意：**
>
> 若使用 Three.js 模型加载器（如 glTF 加载器）导入外部模型，通常会获得包含层级关系的对象结构——这些对象通常被分组在 THREE.Group 或 THREE.Object3D 中。此类情况下，需将每个组内的几何体单独转换为 THREE.Points 对象。

## 总结  

本章内容到此结束。我们已经讲解了精灵和点的概念，以及如何利用可用材质为这些对象设置样式。在本章中，您了解了如何直接使用 THREE.Sprite，以及当需要创建大量粒子时，应使用 THREE.Points 对象。使用 THREE.Points 时，所有元素共享相同的材质，对于单个粒子唯一可更改的属性是其颜色——通过将材质的 vertexColors 属性设置为 true，并在用于创建 THREE.Points 的 THREE.BufferGeometry 的 colors 数组中提供颜色值来实现。我们还展示了如何通过改变位置轻松实现粒子动画。这种方法对于单个 THREE.Sprite 实例和用于创建 THREE.Points 对象的几何体顶点同样适用。

到目前为止，我们基于 Three.js 提供的几何体创建了网格。这对于简单模型（如球体和立方体）效果很好，但当需要创建复杂 3D 模型时，这并不是最佳方法。对于这些模型，通常需要使用 3D 建模应用程序，例如 Blender 或 3D Studio Max。在下一章中，您将学习如何加载和显示由这类 3D 建模应用程序创建的模型。

# 8、创建和加载高级网格和几何体

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/939a5a609042046fe41c4026e0e43bce/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766044108&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=R4KMDZHEcomQF6Sr5PGDw8dVnVM%3D)      

## 几何体分组和合并

在这一节中，我们将学习Three.js的两个基本功能：将对象分组在一起和将多个几何体合并成一个单独的几何体。我们将从对象分组开始。

### 对象分组（Grouping objects together  ）

在之前的一些章节中，你已经看到了在使用多个材质时如何将对象分组。当你使用多个材质从几何体创建网格时，Three.js会创建一个组。你的几何体的多个副本被添加到这个组中，每个副本都有自己特定的材质。这个组被返回，所以它看起来像是一个使用多个材质的网格。然而，事实上它是一个包含多个网格的组。

创建组非常简单。你创建的每个网格都可以包含子元素，这些子元素可以使用 `add` 函数添加。将子对象添加到组中的效果是，你可以移动、缩放、旋转和平移父对象，所有的子对象也会受到影响。在使用组时，你仍然可以引用、修改和定位单独的几何体。你需要记住的唯一一件事是，所有的位置、旋转和平移都是相对于父对象进行的。

```js
const size = 1
const amount = 5000
const range = 20
const group = new THREE.Group()
const mat = new THREE.MeshNormalMaterial()
mat.blending = THREE.NormalBlending
mat.opacity = 0.1
mat.transparent = true
for (let i = 0; i < amount; i++) {
  const x = Math.random() * range - range / 2
  const y = Math.random() * range - range / 2
  const z = Math.random() * range - range / 2
  const g = new THREE.BoxGeometry(size, size, size)
  const m = new THREE.Mesh(g, mat)
  m.position.set(x, y, z)
  group.add(m)
}
```

在此代码片段中，您可以看到我们创建了一个 THREE.Group 实例。这个对象几乎与 THREE.Object3D 完全相同，而 THREE.Object3D 是 THREE.Mesh 和 THREE.Scene 的基类，但就其本身而言，它并不包含任何内容，也不会导致任何东西被渲染。在本示例中，我们使用 add 函数将大量立方体添加到该场景中。对于本示例，我们还添加了可用于更改网格位置的控件。每当您使用此菜单更改某个属性时，THREE.Group 对象的相关属性也会随之改变。例如，在下一个示例中，您可以看到当我们缩放这个 THREE.Group 对象时，所有嵌套的立方体也会随之缩放：

如果您想对 THREE.Group 对象进行更多实验，一个不错的练习是修改示例，使 THREE.Group 实例本身绕 x 轴旋转，而各个立方体则绕 y 轴旋转。

> **使用 `THREE.Group` 的性能影响**
>
> 在我们进入下一节关于合并的内容之前，先简要说明一下性能问题。当你使用 `THREE.Group` 时，这个组内的所有单独的网格都被视为单独的对象，需要 Three.js 进行管理和渲染。如果你在场景中有大量的对象，你会看到性能明显下降。如果你看一下图 8.2 的左上角，你会发现在屏幕上有 5,000 个立方体时，我们的帧率（FPS）大约是 56。这还算不错，但通常我们的帧率应该在 120 FPS 左右。

Three.js 还提供了另一种方法，我们可以通过它来控制单独的网格，但性能更好。这就是使用 `THREE.InstancedMesh`。如果你想渲染大量具有相同几何形状但具有不同变换（例如，旋转、缩放、颜色或任何其他矩阵变换）的对象，这个对象非常适合使用。

我们创建了一个名为 instanced-mesh.html 的示例，展示了这个方法的工作原理。在这个示例中，我们渲染了 250,000 个立方体，但仍然保持了出色的性能。

要使用 THREE.InstancedMesh 对象，我们创建它的方式与创建 THREE.Group 实例的方式类似：

```js
const size = 1
const amount = 250000
const range = 20
const mat = new THREE.MeshNormalMaterial()
mat.opacity = 0.1
mat.transparent = true
mat.blending = THREE.NormalBlending
const g = new THREE.BoxGeometry(size, size, size)
const mesh = new THREE.InstancedMesh(g, mat, amount)
for (let i = 0; i < amount; i++) {
  const x = Math.random() * range - range / 2
  const y = Math.random() * range - range / 2
  const z = Math.random() * range - range / 2
  const matrix = new THREE.Matrix4()
  matrix.makeTranslation(x, y, z)
  mesh.setMatrixAt(i, matrix)
}
```

与 THREE.Group 相比，创建 THREE.InstancedMesh 对象的主要区别在于，我们需要事先定义要使用的材质和几何体，以及要创建该几何体的实例数量。要定位或旋转其中一个实例，我们需要使用 THREE.Matrix4 实例提供变换信息。幸运的是，我们无需深入了解矩阵背后的数学原理，因为 Three.js 在 THREE.Matrix4 实例上为我们提供了几个辅助函数，用于定义旋转、平移以及其他一些变换。在本示例中，我们只是简单地将每个实例放置在随机位置。

因此，如果你要处理少量的网格（或使用不同几何形状的网格），你应该使用 `THREE.Group` 对象将它们分组在一起。如果你处理的是大量共享几何体和材质的网格，你可以使用 `THREE.InstancedMesh` 对象或 `THREE.InstancedBufferGeometry` 对象以获得出色的性能提升。

在下一节中，我们将看看合并操作，你将把多个独立的几何体合并成一个 `THREE.Geometry` 对象。

### 合并几何体（Merging geometries  ）

大多数情况下，使用组允许您轻松地操作和管理大量的网格。然而，当您处理大量对象时，性能将成为一个问题，因为 Three.js 必须单独处理组的所有子对象。通过 `BufferGeometryUtils.mergeBufferGeometries`，您可以将几何体合并在一起，创建一个组合的几何体，这样 Three.js 就只需要管理这个单一的几何体。在图 8.4 中，您可以看到这是如何工作的以及它对性能的影响。如果您打开 `merging.html` 示例，您会看到一个场景，其中包含了相同的随机分布的半透明立方体，我们将它们合并成一个单一的 `THREE.BufferGeometry` 对象：

如你所见，我们能够轻松地渲染50,000个立方体，而性能没有任何下降。为此，我们使用了以下几行代码：

```js
const size = 1
const amount = 500000
const range = 20
const mat = new THREE.MeshNormalMaterial()
mat.blending = THREE.NormalBlending
mat.opacity = 0.1
mat.transparent = true
const geoms = []
for (let i = 0; i < amount; i++) {
  const x = Math.random() * range - range / 2
  const y = Math.random() * range - range / 2
  const z = Math.random() * range - range / 2
  const g = new THREE.BoxGeometry(size, size, size)
  g.translate(x, y, z)
  geoms.push(g)
}
const merged = BufferGeometryUtils.mergeBufferGeometries(geoms)
const mesh = new THREE.Mesh(merged, mat)
```

在此代码片段中，我们创建了大量的 THREE.BoxGeometry 对象，然后使用 BufferGeometryUtils.mergeBufferGeometries(geoms) 函数将它们合并在一起。结果是一个单一的大型几何体，我们可以将其添加到场景中。最大的缺点是，你失去了对各个立方体的控制，因为它们都被合并成了一个单一的大型几何体。如果你想移动、旋转或缩放单个立方体，你是无法做到的（除非你找到正确的面和顶点并单独定位它们）。

> **通过构造实体几何（Constructive Solid Geometry，CSG）创建新几何体**
>
> 除了在本章中看到的合并几何体的方式之外，我们还可以使用构造实体几何(CSG)来创建几何体。通过CSG，您可以对两个几何体应用操作（通常是加法、减法、差异和交集），从而组合出一个新的几何体，基于所选的操作。例如，使用CSG，很容易在一个立方体的一侧创建一个类似于球体凹陷的形状。您可以在Three.js中使用的两个库是`three-bvh-csg`（https://github.com/gkjohnson/three-bvh-csg）和`Three.csg`（https://github.com/looeee/threejs-csg）。

借助分组和合并方法，您可以使用Three.js提供的基本几何体创建大型且复杂的几何体。如果您想创建更高级的几何体，那么使用Three.js提供的编程方法并不总是最佳和最简单的选择。幸运的是，Three.js还提供了其他几种创建几何体的方法。在下一节中，我们将介绍如何从外部资源加载几何体和网格。

## 从外部资源加载几何体

Three.js 可以读取大量 3D 文件格式，并导入这些文件中定义的几何体和网格。需要注意的是，并非所有这些格式的功能都始终得到支持。因此，有时可能会出现纹理问题，或者材质可能未正确设置。目前，用于交换模型和纹理的事实标准是 glTF，所以如果您想加载外部创建的模型，通常将这些模型导出为 glTF 格式会在 Three.js 中获得最佳效果。

在本节中，我们将更深入地探讨Three.js支持的一些格式，但不会向您展示所有加载器。以下列表展示了Three.js支持的格式概览：

• AMF：AMF是另一种3D打印标准，但目前已不再积极开发。有关此标准的更多信息，请参阅以下维基百科页面：https://www.sculpteo.com/en/glossary/amf-definition/。

• 3DM：3DM 是 Rhinoceros 使用的格式，Rhinoceros 是一款用于创建三维模型的工具。有关 Rhinoceros 的更多信息，请访问：https://www.rhino3d.com/。

• 3MF：3MF是3D打印所采用的标准之一。有关此格式的更多信息，请访问3MF联盟主页：https://3mf.io。

• 协作设计活动（COLLADA）：COLLADA 是一种以 XML 为基础的数字资产定义格式。这是一种应用广泛的格式，几乎所有的 3D 应用程序和渲染引擎都支持。

• Draco：Draco 是一种文件格式，可极为高效地存储几何体和点云数据。它规定了这些元素的最佳压缩与解压缩方式。有关 Draco 工作原理的详细信息，请访问其 GitHub 页面：https://github.com/google/draco。

• G代码：G代码是与3D打印机或CNC机床通信的一种标准方式。在打印模型时，控制3D打印机的一种方法就是向其发送G代码指令。该标准的详细内容请参阅以下论文：https://www.nist.gov/publications/nist-rs274ngc-interpreter-version-3?pub_id=823374。

• glTF：这是一种规范，定义了3D场景和模型如何被不同应用和工具交换与加载，并正逐渐成为网络上模型交换的行业标准格式。它们以二进制格式（扩展名为.glb）和基于文本的格式（扩展名为.gltf）提供。有关此标准的更多信息，请访问：https://www.khronos.org/gltf/。

• 工业基础类（IFC）：这是一种由建筑信息模型（BIM）工具使用的开放文件格式。它包含建筑物的模型以及大量有关所用材料的附加信息。有关此标准的更多信息，请访问：https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/。

• JSON：Three.js 有自己的 JSON 格式，可用于以声明方式定义几何体或场景。尽管这并非官方格式，但它使用起来非常简便，在您希望复用复杂几何体或场景时尤为方便。

• KMZ：这是Google Earth中用于3D资产的格式。更多信息请访问：https://developers.google.com/kml/documentation/kmzarchives。

• LDraw：LDraw 是一种开放标准，可用于创建虚拟乐高模型和场景。更多信息请访问 LDraw 主页：https://ldraw.org。

• LWO：这是LightWave 3D所使用的文件格式。有关LightWave 3D的更多信息，请访问：https://www.lightwave3d.com/。

• NRRD：NRRD 是一种用于可视化体数据的文件格式。例如，它可用于渲染 CT 扫描图像。您可在此处找到大量相关信息和示例：http://teem.sourceforge.net/nrrd/。

• OBJ 和 MTL：OBJ 是一种由 Wavefront Technologies 首次开发的简单 3D 格式。它是应用最广泛的 3D 文件格式之一，用于定义物体的几何形状。MTL 是 OBJ 的配套格式。在 MTL 文件中，会指定 OBJ 文件中各个物体的材质。如果您希望从 Three.js 将模型导出为 OBJ 格式，Three.js 还提供了一个自定义的 OBJ 导出器，称为 OBJExporter。

• PCD：这是一种用于描述点云的开放格式。更多信息请访问：https://pointclouds.org/documentation/tutorials/pcd_file_format.html。

• PDB：这是一种非常专业的格式，由蛋白质数据银行（PDB）创建，用于描述蛋白质的结构。Three.js 可以加载并可视化采用这种格式描述的蛋白质。

• 多边形文件格式（PLY）：此格式最常用于存储来自3D扫描仪的信息。

• 打包的原始WebGL模型（PRWM）：这是一种专注于高效存储和解析3D几何体的另一种格式。有关此标准的更多信息以及如何使用它，请参阅：https://github.com/kchapelier/PRWM。

• 立体光刻（STL）：这是一种广泛用于快速原型制作的技术。例如，3D打印机的模型通常以STL文件形式定义。如果你希望从Three.js中将模型导出为STL格式，Three.js还提供了一个自定义的STL导出器，名为STLExporter.js。

• SVG：SVG 是一种定义矢量图形的标准方式。此加载器可让您加载 SVG 文件，并返回一组 THREE.Path 元素，您可使用这些元素进行拉伸或在 2D 中渲染。

• 3DS：Autodesk 3DS 格式。更多信息请访问 https://www.autodesk.com/。

• TILT：TILT 是 Tilt Brush 所采用的格式，这是一款可在 VR 中进行绘画的工具。更多信息请访问：https://www.tiltbrush.com/。

• VOX：MagicaVoxel所使用的格式，这是一款免费工具，可用于创作体素艺术。更多信息请访问MagicaVoxel主页：https://ephtracy.github.io/。

• 虚拟现实建模语言（VRML）：这是一种基于文本的格式，可用于指定3D对象和世界。它已被X3D文件格式所取代。Three.js不支持加载X3D模型，但这些模型可轻松转换为其他格式。更多信息请访问http://www.x3dom.org/?page_id=532#。

• 可视化工具包（VTK）：这是由VTK定义并用于指定顶点和面的文件格式。该格式有两种形式：二进制格式和基于文本的ASCII格式。Three.js仅支持基于ASCII的格式。

• XYZ：这是一种用于描述三维空间中点的非常简单的文件格式。更多信息请访问：https://people.math.sc.edu/Burkardt/data/xyz/xyz.html。

在第9章“动画与摄像机移动”中，当我们探讨动画时，将再次回顾其中一些格式（并了解若干新增格式）。

正如您从这份列表中所看到的，Three.js 支持数量庞大的3D文件格式。我们不会逐一介绍所有这些格式，而只重点介绍其中最有趣的几个。我们将从JSON加载器开始，因为它提供了一种便捷的方式，用于存储和检索您自己创建的场景。

### 使用Three.js的JSON格式进行保存和加载

您可以在Three.js中针对两种不同场景使用Three.js JSON格式。您可以利用它来保存和加载单个THREE.Object3D对象（这意味着您也可以用它来导出THREE.Scene对象）。

为了演示保存与加载功能，我们基于THREE.TorusKnotGeometry创建了一个简单示例。通过这个示例，你可以像我们在第5章中那样创建一个环面纽结，并借助“保存/加载”菜单中的“保存”按钮，将当前的几何体保存下来。在本示例中，我们采用HTML5本地存储API进行保存。该API能够让我们轻松地在客户端浏览器中存储持久化信息，并在稍后随时调用（即使浏览器已关闭并重新启动）：

在前面的截图中，您可以看到两个网格——红色的是我们加载的网格，黄色的是原始网格。如果您自己打开这个示例并点击保存按钮，当前网格的状态将被存储。现在，您可以刷新浏览器并点击加载，保存的状态将以红色显示。

从Three.js导出JSON非常简单，无需引入任何额外的库。你唯一需要做的就是将THREE.Mesh导出为JSON，并将其存储在浏览器的localStorage中，如下所示：

```json
const asJson = mesh.toJSON()
localStorage.setItem('json', JSON.stringify(asJson))
```

此 JSON 字符串如下所示：

```json
{
  "metadata": {
    "version": 4.5,
    "type": "Object",
    "generator": "Object3D.toJSON"
  },
  "geometries": [
    {
      "uuid": "15a98944-91a8-45e0-b974-0d505fcd12a8",
      "type": "TorusKnotGeometry",
      "radius": 1,
      "tube": 0.1,
      "tubularSegments": 200,
      "radialSegments": 10,
      "p": 6,
      "q": 7
    }
  ],
  "materials": [
    {
      "uuid": "38e11bca-36f1-4b91-b3a5-0b2104c58029",
      "type": "MeshStandardMaterial",
      "color": 16770655,
      // left out some material properties
      "stencilFuncMask": 255,
      "stencilFail": 7680,
      "stencilZFail": 7680,
      "stencilZPass": 7680
    }
  ],
  "object": {
    "uuid": "373db2c3-496d-461d-9e7e-48f4d58a507d",
    "type": "Mesh",
    "castShadow": true,
    "layers": 1,
    "matrix": [
      0.5,
      ...
      1
    ],
    "geometry": "15a98944-91a8-45e0-b974-0d505fcd12a8",
    "material": "38e11bca-36f1-4b91-b3a5-0b2104c58029"
  }
}
```

如你所见，Three.js 保存了关于 THREE.Mesh 对象的所有信息。将 THREE.Mesh 加载回 Three.js 也只需几行代码，如下所示：

```js
const fromStorage = localStorage.getItem('json')
if (fromStorage) {
  const structure = JSON.parse(fromStorage)
  const loader = new THREE.ObjectLoader()
  const mesh = loader.parse(structure)
  mesh.material.color = new THREE.Color(0xff0000)
  scene.add(mesh)
}
```

在这里，我们首先使用保存时所用的名称（本例中为json）从本地存储中获取JSON。为此，我们使用HTML5本地存储API提供的localStorage.getItem函数。接下来，我们需要将字符串转换回JavaScript对象(JSON.parse)，并将JSON对象转换回THREE.Mesh。Three.js提供了一个名为THREE.ObjectLoader的辅助对象，你可以用它将JSON转换为THREE.Mesh。在本示例中，我们直接对加载器调用了parse方法来解析JSON字符串。加载器还提供了一个load函数，你可以在其中传递包含JSON定义的文件的URL。

如您在此处所见，我们仅保存了一个 THREE.Mesh 对象，因此会丢失其他所有内容。如果您想保存完整的场景，包括灯光和摄像机，可以使用相同的方法来导出场景：

```js
const asJson = scene.toJSON()
localStorage.setItem('scene', JSON.stringify(asJson))
```

这可以按照我们之前为 THREE.Mesh 对象展示的方式加载。虽然在仅使用 Three.js 时，以 JSON 格式存储当前场景和对象非常方便，但这种格式并不容易与其他工具或程序进行交换或创建。在下一节中，我们将更深入地探讨 Three.js 支持的一些 3D 格式。

## 从3D文件格式导入

在本章开头，我们列出了 Three.js 支持的多种格式。在本节中，我们将快速浏览这些格式的一些示例。

### OBJ 和 MTL 格式

OBJ 和 MTL 是配套格式，通常一起使用。OBJ 文件定义几何体，MTL 文件定义所使用的材质。OBJ 和 MTL 都是基于文本的格式。OBJ 文件的一部分如下所示：

```
v -0.032442 0.010796 0.025935
v -0.028519 0.013697 0.026201
v -0.029086 0.014533 0.021409
usemtl Material
s 1
f 2731 2735 2736 2732
f 2732 2736 3043 3044
```

MTL 文件定义材质，如下所示：

```
newmtl Material
Ns 56.862745
Ka 0.000000 0.000000 0.000000
Kd 0.360725 0.227524 0.127497
Ks 0.010000 0.010000 0.010000
Ni 1.000000
d 1.000000
illum 2
```

OBJ 和 MTL 格式受 Three.js 的良好支持，因此如果您想交换 3D 模型，这是一个不错的格式选择。Three.js 提供了两种不同的加载器可供使用。如果您只想加载几何体，可以使用 OBJLoader。我们在示例中使用了此加载器（load-obj.html）。以下截图展示了此示例：

从外部文件加载OBJ模型的方法如下：

在本章中，我们将使用基于 Promise 的 loadAsync 方法，因为它避免了嵌套回调，并使这种类型的调用链式处理变得更容易。下一个示例（load-obj-mtl.html）使用 OBJLoader 和 MTLLoader 来加载模型并直接分配材质。以下截图展示了此示例：

在查看代码之前，首先要说明的是，如果您收到一个OBJ文件、一个MTL文件以及所需的纹理文件，您需要检查MTL文件是如何引用这些纹理的。这些引用应相对于MTL文件进行，而不能使用绝对路径。这段代码本身与我们之前看到的THREE.ObjLoader代码差别不大。首先，我们用一个THREE.MTLLoader对象加载MTL文件，然后通过setMaterials函数将加载的材质设置到THREE.ObjLoader中。

我们在此示例中使用的模型很复杂。因此，我们在回调中设置了一些特定属性，以解决若干渲染问题，如下所示：

•  我们需要合并模型中的顶点，以便将其渲染为平滑的模型。为此，我们首先需要从加载的模型中删除已定义的法线向量，这样我们就可以使用BufferGeometryUtils.mergeVertices和computeVertexNormals函数，为Three.js提供正确渲染模型所需的信息。

•  源文件中的不透明度设置有误，导致翅膀不可见。因此，为了修复这个问题，我们自己设置了不透明度和透明属性。

•  默认情况下，Three.js 只渲染对象的一侧。由于我们从两个侧面观察翅膀，我们需要将 side 属性设置为 THREE.DoubleSide 值。

•  当需要将翅膀叠加在一起渲染时，它们会产生一些不需要的伪影。我们通过设置 alphaTest 属性解决了这个问题。

但正如你所见，你可以轻松地将复杂模型直接加载到Three.js中，并在浏览器中实时渲染它们。不过，你可能需要微调各种材质属性。

### 加载 gLTF 模型

我们已经提到，glTF 是在 Three.js 中导入数据时非常棒的格式。为了向您展示导入和呈现甚至复杂场景是多么简单，我们添加了一个示例，其中我们直接从 https://sketchfab.com/3d-models/sea-house-bc4782005e9646fb9e6e18df61bfd28d 获取了一个模型:

正如您从之前的截图中所看到的，这并不是一个简单的场景，而是一个复杂的场景，包含大量模型、纹理、阴影和其他元素。要在Three.js中实现这一点，我们只需做以下操作：

```js
const loader = new GLTFLoader()
return loader.loadAsync('/assets/models/sea_house/scene.gltf').then((structure) => {
  structure.scene.scale.setScalar(0.2, 0.2, 0.2)
  visitChildren(structure.scene, (child) => {
    if (child.material) {
      child.material.depthWrite = true
    }
  })
  scene.add(structure.scene)
})
```

你已经熟悉异步加载器了，我们唯一需要修复的是确保材质的 depthWrite 属性设置正确（这似乎是某些 glTF 模型中常见的问题）。就这么简单——它就是能用。glTF 还允许我们定义动画，这一点我们将在下一章中更深入地探讨。

### 显示完整的乐高模型

除了3D模型——其中模型定义了顶点、材质、光源等——还有各种文件格式，它们并不显式地定义几何体，但具有更具体的用途。我们将在本节中介绍的LDrawLoader加载器，就是为渲染乐高模型而创建的3D加载器。使用这个加载器的方式与我们之前已经见过的几次完全相同：

http://localhost:8080/chapter-8/load-ldraw.html

如果你想探索更多模型，可以从LDraw仓库下载：https:// omr.ldraw.org/.

### 加载基于体素的模型（voxel-based models）

另一种有趣的创建3D模型的方法是使用体素。这使你可以用小立方体构建模型，并使用Three.js进行渲染。例如，你可以使用这种工具在Minecraft之外创建Minecraft结构，并在稍后将其导入Minecraft。一个免费的体素实验工具是MagicaVoxel (https://ephtracy.github.io/)。这个工具允许你创建像这样的体素模型：

有趣的是，你可以使用 VOXLoader 加载器轻松地在 Three.js 中导入这些模型，如下所示：

http://localhost:8080/chapter-8/load-vox.html

有趣的是，你可以使用 VOXLoader 加载器轻松地在 Three.js 中导入这些模型，如下所示：

### 显示来自PDB的蛋白质

PDB网站（www.rcsb.org）包含许多不同分子和蛋白质的详细信息。除了对这些蛋白质的解释外，它还提供了一种以PDB格式下载这些分子结构的方法。Three.js为PDB格式指定的文件提供了一个加载器。在本节中，我们将举例说明如何解析PDB文件并使用Three.js进行可视化。

包含此加载器后，我们将创建以下分子描述的3D模型（请参阅load-pdb.html示例）：

### 从PLY模型加载点云

使用PLY格式与使用其他格式并没有太大区别。你需要包含加载器并处理加载的模型。不过，在这个最后一个示例中，我们将采用一种不同的方法。我们不会将模型渲染为网格，而是利用该模型中的信息创建一个粒子系统（请参阅以下截图中的load-ply.html示例）：

用于呈现上述屏幕截图的 JavaScript 代码实际上非常简单；它看起来像这样：

```js
const texture = new THREE.TextureLoader().load('/assets/textures/particles/glow.png')
const material = new THREE.PointsMaterial({
  size: 0.15,
  vertexColors: false,
  color: 0xffffff,
  map: texture,
  depthWrite: false,
  opacity: 0.1,
  transparent: true,
  blending: THREE.AdditiveBlending
})
return new PLYLoader().loadAsync('/assets/models/carcloud/carcloud.ply').then((model) => {
  const points = new THREE.Points(model, material)
  points.scale.set(0.7, 0.7, 0.7)
  scene.add(points)
})
```

正如你所见，我们使用 THREE.PLYLoader 加载模型，并将此几何体用作 THREE.Points 的输入。我们使用的材质与我们在第 7 章最后一个示例中使用的相同，即 Points and Sprites。正如你所见，借助 Three.js，只需几行代码，就能非常轻松地组合来自不同来源的模型，并以不同的方式呈现它们。

### 其他加载器

在本章开头的“从外部资源加载几何体”部分，我们向您展示了Three.js提供的所有不同加载器列表。我们在第8章的源文件中提供了所有这些加载器的示例:

所有这些加载器的源代码都遵循与我们在本章中所解释的加载器相同的模式。只需加载模型，确定要显示已加载模型的哪一部分，确保缩放和位置正确，然后将其添加到场景中。

### 加载PCD模型

```js
import { bootstrapMeshScene } from './util/standard-scene'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'

const modelAsync = () => {
  return new PCDLoader().loadAsync('/assets/models/points/car6.pcd').then((model) => {
    model.translateY(66)
    model.translateX(37)
    model.translateZ(6)

    model.material.size = 0.03

    return model
  })
}

bootstrapMeshScene({
  loadMesh: modelAsync
}).then()
```

## 总结

在 Three.js 中使用外部来源的模型并不难，尤其是对于简单的模型——你只需采取几个简单的步骤。

在使用外部模型或通过分组和合并创建模型时，需要注意以下几点。首先，您需要记住的是，当您对对象进行分组时，这些对象仍可作为独立对象使用。应用于父级的变换也会影响子级，但您仍然可以单独变换子级。除了分组之外，您还可以将几何体合并到一起。采用这种方法后，您将失去各个独立的几何体，而得到一个全新的单一几何体。这在处理数千个需要渲染的几何体并遇到性能问题时特别有用。如果您想控制大量具有相同几何形状的网格，最后一种方法是使用THREE.InstancedMesh对象或THREE.InstancedBufferGeometry对象。这两种对象允许您定位和变换各个网格，同时还能获得出色的性能。

Three.js 支持大量外部格式。在使用这些格式加载器时，最好查看一下源代码，并添加 console.log 语句，以确定所加载的数据的真实面貌。这将有助于您了解为获得正确的网格并将其设置到正确的位置和比例需要采取哪些步骤。通常，当模型显示不正确时，这是由其材质设置引起的。可能是使用了不兼容的纹理格式、不正确地定义了透明度，或者格式中包含了指向纹理图像的错误链接。通常，使用测试材质来确定模型本身是否正确加载是个好主意，并将加载的材质记录到 JavaScript 控制台，以检查是否存在意外值。

如果您想重用自己的场景或模型，只需调用 asJson 函数将其导出，然后使用 ObjectLoader 再次加载即可.

你在本章以及前几章中所使用的模型大多是静态模型。它们没有动画效果，不会移动，也不会改变形状。在第9章中，你将学习如何为你的模型添加动画，让它们栩栩如生。除了动画之外，下一章还将介绍Three.js提供的各种相机控制功能。借助相机控制，你可以围绕场景移动、平移和旋转相机。

# 9、动画与摄像机移动

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/76368aff66cfb53dcdb487010f575c15/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766044300&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=MZsMcLyPVFogBlBdZHYWikIpfSE%3D)      

在之前的章节中，我们看到了一些简单的动画，但并没有涉及太复杂的内容。在第1章“使用Three.js创建你的第一个3D场景”中，我们介绍了基本的渲染循环；在接下来的几章中，我们利用这个循环旋转了一些简单的物体，并展示了一些其他基本的动画概念。

在本章中，我们将更详细地探讨Three.js如何支持动画。我们将涉及以下四个主题：

- 基本动画
- 使用相机
- 变形和骨骼动画
- 使用外部模式创建动画

我们将首先介绍动画背后的基本概念。

## 基本动画

在我们看示例之前，让我们快速回顾一下第1章中介绍的内容，即渲染循环。为了支持动画，我们需要告诉Three.js每隔一段时间就渲染一次场景。为此，我们使用标准的HTML5 requestAnimationFrame功能，如下所示：

```js
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

有了这段代码，我们只需在初始化场景后调用一次render()函数。在render()函数内部，我们使用requestAnimationFrame来安排下一次渲染。这样一来，浏览器就能确保render()函数以正确的间隔被调用（通常每秒约60次或120次）。在requestAnimationFrame被引入浏览器之前，人们会使用setInterval(function, interval)或setTimeout(function, interval)。这些方法会在设定的间隔内每次调用指定的函数。

这种方法的问题在于，它没有考虑到其他正在发生的事情。即使你的动画没有显示出来，或者在隐藏的选项卡中，它仍然会被调用，并且仍在占用资源。另一个问题是，这些函数每次被调用时都会更新屏幕，而不是在浏览器最适宜的时候更新，这会导致更高的CPU使用率。而通过requestAnimationFrame，我们并不告诉浏览器何时需要更新屏幕；我们只是请求浏览器在最恰当的时候运行提供的函数。通常，这会带来大约60或120 FPS的帧率（具体取决于你的硬件）。借助requestAnimationFrame，你的动画将运行得更加流畅，对CPU和GPU也更加友好，而且你也不用再担心时间同步问题了。

在下一节中，我们将从创建一个简单的动画开始

### 简单动画

通过这种方法，我们可以通过改变对象的旋转、缩放、位置、材质、顶点、面以及你能想到的任何其他属性，非常轻松地实现对象的动画效果。在下一个渲染循环中，Three.js 将会渲染这些已更改的属性。一个非常简单的示例，基于我们在第 7 章“点和精灵”中已经看到的示例，可在 01-basic-animations.html 中找到。以下截图展示了这个示例：

这个渲染循环非常简单。首先，我们初始化 userData 对象上的各种属性——这是一个用于存储自定义数据的场所，这些数据保存在 THREE.Mesh 本身中；然后，我们使用在 userData 对象上定义的数据更新网格上的这些属性。在动画循环中，只需根据这些属性更改旋转、位置和缩放，其余部分由 Three.js 处理。以下是我们的实现方式：

这里没什么特别的，但它很好地展示了本书中我们将要讨论的基本动画背后的概念。我们只需改变缩放、旋转和位置属性，Three.js会完成剩下的工作。

在下一节中，我们将快速绕道而行。除了动画之外，当您在更复杂的场景中使用Three.js时，很快就会遇到的一个重要方面是：能够用鼠标在屏幕上选择对象。

### 选择和移动对象

尽管这与动画没有直接关系，但由于本章将涉及摄像机和动画，因此了解如何选择和移动对象也是对本章所讲解内容的一个很好的补充。在此，我们将向您展示如何执行以下操作：

•  使用鼠标从场景中选择一个对象

•  用鼠标在场景中拖动对象

我们先来看看选择一个对象所需的步骤。

#### 选择对象

当你在场景中移动鼠标时，你会发现，每当鼠标碰到某个物体时，该物体就会被高亮显示。你可以通过使用 `THREE.Raycaster`轻松实现这一点。射线检测器会查看你当前的摄像机，并从摄像机向鼠标位置发射一条射线。根据这条射线，它能够根据鼠标的当前位置计算出被击中的物体。为了实现这一功能，我们需要执行以下步骤：

- 创建一个对象，用于跟踪鼠标指向的位置
- 每当我们移动鼠标时，就更新该对象。
- 在渲染循环中，使用此更新后的信息来查看我们正指向哪个Three.js对象

以下代码片段中显示了这一点：

```js
// initially set the position to -1, -1
let pointer = {
  x: -1,
  y: -1
}
// when the mouse moves update the point
document.addEventListener('mousemove', (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
})
// an array containing all the cubes in the scene
const cubes = ...
// use in the render loop to determine the object to highlight
const raycaster = new THREE.Raycaster()
function render() {
  raycaster.setFromCamera(pointer, camera)
  const cubes = scene.getObjectByName('group').children
  const intersects = raycaster.intersectObjects(cubes)
  // do something with the intersected objects
}
```

在这里，我们使用 THREE.Raycaster 来确定哪些对象与从摄像机位置发出的鼠标位置相交。结果（相交，在前面的示例中）包含了所有与我们的鼠标相交的立方体，因为光线是从摄像机位置射出，一直延伸到摄像机范围的尽头。此数组中的第一个元素是我们正悬停其上的那个，而此数组中的其他值（如果有的话）则指向位于第一个网格后面的对象。THREE.Raycaster 还提供了关于你确切击中对象位置的其他信息：

在这里，我们点击了`face`对象。`faceIndex` 指向所选网格的面。`distance` 值是从相机到所点击对象的距离，而point 是在网格上被点击的确切位置。最后，我们得到了 uv 值，它决定了在使用纹理时，所点击的点在 2D 纹理上的显示位置（范围从 0 到 1；有关 uv 的更多信息，请参阅第 10 章“加载与处理纹理”）。

#### 拖动对象

除了选择对象之外，一个常见的需求是能够拖动并移动对象。Three.js 也为此提供了默认支持。如果你在浏览器中打开 dragging-objects.html 示例，你会看到与图 9.2 所示类似的场景:在这个时候，当你点击某个对象时，就可以将其拖动到场景中的任意位置了：

为支持拖动对象，Three.js 使用了一种称为 `DragControls` 的东西。它负责处理所有相关事宜，并在拖动开始和结束时提供便捷的回调函数。实现这一功能的代码如下所示：

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

就这么简单。在这里，我们添加了DragControls，并传入了可拖动的元素（在我们的例子中，就是所有随机放置的立方体）。然后，我们添加了两个事件监听器。第一个事件监听器dragstart，会在我们开始拖动立方体时触发；而dragend则会在我们停止拖动对象时触发。在这个示例中，当我们开始拖动时，我们会禁用OrbitControls（这样我们就可以用鼠标来环视场景），并改变所选对象的颜色。一旦我们停止拖动，就会将对象的颜色恢复原状，并重新启用OrbitControls。

还有一个更高级的`DragControls`版本，名为`TransformControls`。我们不会详细介绍这个控件，但它允许您使用一个简单的UI来变换网格的属性。当您在浏览器中打开transform-controls-html时，可以找到该控件的一个示例：

如果您单击此控件的各个部分，可以轻松地更改立方体的形状：

**该控件可以切换平移、旋转和缩放3种模式。**

对于本章的最后一个示例，我们将向您展示如何使用补间动画库以一种替代方式修改对象的属性（正如我们在本章的第一个示例中所看到的）。

### 使用Tween.js进行动画处理

Tween.js 是一个小型 JavaScript 库，您可以从 https://github.com/sole/tween.js/ 下载，并可轻松地定义属性在两个值之间的过渡。起始值和结束值之间的所有中间点都会为您计算出来。这一过程称为补间动画。例如，您可以使用此库将网格的 x 位置从 10 更改为 3，耗时 10 秒，如下所示：

```js
const tween = new TWEEN.Tween({ x: 10 }).to({ x: 3 }, 10000)
  .easing(TWEEN.Easing.Elastic.InOut)
  .onUpdate(function () {
    // update the mesh
  })
```

或者，您可以创建一个单独的对象，并将其传递给您想要处理的网格：

```js
const tweenData = {
  x: 10
}
new TWEEN.Tween(tweenData)
  .to({ x: 3 }, 10000)
  .yoyo(true)
  .repeat(Infinity)
  .easing(TWEEN.Easing.Bounce.InOut)
  .start()
mesh.userData.tweenData = tweenData
```

在本示例中，我们创建了TWEEN.Tween。此补间动画将确保x属性在10,000毫秒内从10变为3。Tween.js还允许您定义该属性随时间变化的方式。这可以通过线性、二次或其他任何方式实现（请参阅http://sole.github.io/tween.js/examples/03_graphs.html以获取完整概述）。值随时间的变化称为缓动。使用Tween.js时，您可通过easing()函数进行配置。此库还提供了其他方法来控制缓动的执行方式。例如，我们可以设置缓动重复的频率(repeat(10))以及是否希望出现悠悠效果（这意味着在本示例中，我们将从10变到3，然后再回到10）。

将此库与Three.js一起使用非常简单。如果您打开tween-animations.html示例，您会看到Tween.js库正在运行。以下截图显示了该示例的静态图像：

在本示例中，我们采用了第7章中的点云，并创建了一个动画，其中所有点都缓慢地向中心移动。这些粒子的位置是通过使用Tween.js库创建的补间动画来设置的，如下所示：

借助这段代码，我们创建了一个补间动画，它将一个值从1过渡到0，然后再返回。要使用补间动画中的值，我们有两种不同的选择：我们可以使用该库提供的onUpdate函数，每当补间动画更新时（通过调用TWEEN.update()实现），就调用一个带有更新后值的函数；或者，我们可以直接访问更新后的值。在本示例中，我们采用了后一种方法。

在我们查看需要对渲染函数进行的更改之前，我们必须在加载模型后执行一个额外的步骤。我们希望在原始值与零之间进行补间动画，然后再恢复到原始值。为此，我们需要将顶点的原始位置存储起来。我们可以通过复制起始位置数组来实现这一点：

```js
geometry.setAttribute('originalPos', geometry.attributes['position'].clone())
```

有了这些步骤，补间库将负责在屏幕上定位各个点。正如你所见，使用这个库比自己管理过渡要容易得多。除了对对象进行动画处理和变换之外，我们还可以通过移动摄像机来为场景添加动画效果。在之前的章节中，我们曾多次手动更新摄像机位置来实现这一功能。Three.js 还提供了几种额外的更新摄像机的方法。

## 使用相机

Three.js 有几个相机控件，你可以使用它来控制整个场景中的相机。 这些控件位于 Three.js 发行版中，可以在 examples/js/controls 目录中找到。 在本节中，我们将更详细地了解以下控件：

- `ArcballControls`：一个广泛的控件，它提供了一个透明的覆盖层，你可以使用它轻松地四处移动相机。
- `FirstPersonControls`：这些控件的行为类似于第一人称射击游戏中的控件。你可以使用键盘四处移动并使用鼠标环顾四周。
- `FlyControls`：这些是类似飞行模拟器的控件。 你可以使用键盘和鼠标移动和操纵。
- `OrbitControls`：这模拟了围绕特定场景在轨道上运行的卫星。 这使你可以使用鼠标和键盘四处移动。
- `PointerLockControls`：这些类似于第一人称控件，但它们还将鼠标指针锁定在屏幕上，使其成为简单游戏的绝佳选择。
- `TrackBallControls`：这些是最常用的控件，允许你使用鼠标（或轨迹球）轻松移动、平移和缩放场景。

除了使用这些相机控件，您还可以通过设置其位置并使用 lookAt() 函数更改其指向的位置，自行移动相机。

我们首先来看的控制是ArcballControls.

### ArcballControls

解释ArcballControls工作原理最简单的方法就是看一个示例。如果你打开arcball-controls.html示例，你会看到一个简单的场景，如下所示：

如果你仔细观察这个截图，会看到两条半透明的线横跨整个场景。这些线是由ArcballControls提供的，你可以用它们来旋转和移动场景。这些线被称为小工具。左键用于旋转场景，右键可用于平移，而滚轮则可以用来放大或缩小。

除了此标准功能之外，此控件还允许您聚焦于所显示网格的特定部分。如果您双击场景，相机将聚焦于场景的该部分。要使用此控件，我们只需实例化它，并传入相机属性、渲染器使用的domElement属性以及我们正在查看的场景属性即可：

```js
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls'
const controls = new ArcballControls(camera, renderer.domElement, scene)
controls.update()
```

此控件功能非常灵活，可通过一组属性进行配置。在本示例中，您可使用右侧菜单探索其中的大部分属性。对于此特定控件，我们将更深入地探讨该对象提供的属性和方法，因为它是一个功能灵活的控件，也是希望为用户提供一种便捷方式来浏览场景时的理想选择。让我们先来概述一下此控件提供的属性和方法。首先，我们来看一下属性：

此控件还提供若干方法，以进一步交互或配置它：

ArcballControls 是 Three.js 中一个非常有用且相对较新的功能，它通过鼠标提供了对场景的高级控制。如果您正在寻找一种更简单的方法，可以使用 TrackBallControls。

### TrackBallControls

使用 TrackBallControls 的方法与我们之前看到的 ArcballControls 相同：

```js
import { TrackBallControls } from 'three/examples/jsm/controls/TrackBallControls'
const controls = new TrackBallControls(camera, renderer.domElement)
```

这一次，我们只需从渲染器中传入相机和 domeElement 属性。为了使轨道球控件正常工作，我们还需要添加一个 THREE.Clock 并更新渲染循环，如下所示：

```js
const clock = new THREE.Clock()
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update(clock.getDelta())
}
```

在前面的代码片段中，我们可以看到一个新的Three.js对象，THREE.Clock。THREE.Clock对象可用于计算特定调用或渲染循环完成所花费的经过时间。你可以通过调用clock.getDelta()函数来实现这一点。该函数将返回从本次调用到上一次调用getDelta()之间的经过时间。要更新相机的位置，我们可以调用TrackBallControls.update()函数。在这个函数中，我们需要提供自上次调用update函数以来经过的时间。为此，我们可以使用THREE.Clock对象中的getDelta()函数。你可能会想：为什么我们不直接将帧率（1/60秒）传入update函数呢？原因在于，虽然借助requestAnimationFrame，我们能预期达到60 FPS，但这并不是绝对保证的。根据各种外部因素的不同，帧率可能会发生变化。为了确保相机能够平稳地转动和旋转，我们必须传入准确的经过时间。

此功能的运行示例可在 trackball-controls-camera.html 中找到。以下屏幕截图显示了此示例的静态图像：

您可以按以下方式控制相机：

- 左键单击并移动：围绕场景旋转和滚动相机 
- 滚轮：放大和缩小 
- 中键并移动：放大和缩小 
- 右键单击并移动：在场景中平移

有一些属性可用于微调相机的行为。例如，您可以使用rotateSpeed属性设置相机旋转的速度，并通过将noZoom属性设置为true来禁用缩放功能。在本章中，我们不会详细介绍每个属性的具体作用，因为它们几乎不言自明。如需了解可能的完整概览，请查看 TrackBallControls.js 文件的源代码，其中列出了这些属性。

### FlyControls

我们接下来要了解的控制是FlyControls。借助FlyControls，你可以使用飞行模拟器中也有的控件在场景中自由飞行。一个示例可在fly-controls-camera.html中找到。以下截图显示了该示例的静态图像：

启用 FlyControls 的工作方式与其他控件相同：

```js
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
const controls = new FlyControls(camera, renderer.domElement)
const clock = new THREE.Clock()
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update(clock.getDelta())
}
```

FlyControls 将相机和渲染器的 domElement 作为参数，并要求您在渲染循环中使用经过的时间调用 update() 函数。您可以按以下方式使用 THREE.FlyControls 控制相机：

• 鼠标左键和中键：开始向前移动 

• 右键：后退 • 鼠标移动：环顾四周 

•  W：开始向前移动 

•  S：向后移动 

•  A：向左移动 

•  D：向右移动 

•  R：向上移动 

•  F：向下移动 

• 左、右、上、下箭头：分别向左、右、上、下看 

•  G：向左滚动 

•  E：向右滚动

我们接下来要了解的控制是THREE.FirstPersonControls.

### FirstPersonControls  

顾名思义，FirstPersonControls 允许您像第一人称射击游戏那样控制相机。鼠标用于环视，键盘用于四处走动。您可以在 07-first-person-camera.html 中找到一个示例。以下截图显示了此示例的静态图像：

### OrbitControls  

OrbitControls 控件是一种很好的方式，可在场景中心的物体周围进行旋转和平移。这也是我们在其他章节中使用的控件，可为您提供一种简单的方法来探索所提供的示例中的模型。

借助 orbit-controls-orbit-camera.html，我们提供了一个示例，展示了此控件的工作原理。以下屏幕截图显示了该示例的静态图像：

左键旋转，右键平移，滚轮缩放。

最常用的控件，点云预览用这个。

以上就是有关相机及其移动的介绍。在本节中，我们了解了许多控件，这些控件可让您通过更改相机属性轻松地与场景交互并进行移动。在下一节中，我们将探讨更高级的动画方法：变形和蒙皮。

## 变形和骨骼动画

当您在外部程序（例如 Blender）中创建动画时，通常有两种主要选项来定义动画：

• 形变目标：借助形变目标，您可以定义网格的变形版本——即关键位置。对于这个变形目标，所有顶点位置都会被存储下来。要对形状进行动画处理，您只需将所有顶点从一个位置移动到另一个关键位置，并重复此过程即可。以下截图展示了用于表现面部表情的各种形变目标（此截图由Blender基金会提供）：

• 骨骼动画：另一种选择是使用骨骼动画。借助骨骼动画，您可以定义网格的骨架——即骨骼——并将顶点绑定到特定的骨骼上。现在，当您移动一个骨骼时，任何相连的骨骼也会相应地移动，而绑定的顶点则会根据骨骼的位置、运动和缩放进行移动和变形。以下截图再次由Blender基金会提供，展示了如何利用骨骼来移动和变形对象的示例:

Three.js 支持这两种模式，但在想要使用基于骨架/骨骼的动画时，可能会遇到导出效果不佳的问题。为了获得最佳效果，您应将模型导出或转换为 glTF 格式，该格式正逐渐成为交换模型、动画和场景的默认格式，并且得到了 Three.js 的大力支持。

在本节中，我们将探讨这两种选项，并了解 Three.js 支持的几种外部格式，这些格式可用于定义动画。

### 带有变形目标的动画

变形目标是定义动画最直接的方式。您为每个重要位置（也称为关键帧）定义所有顶点，并指示Three.js将顶点从一个位置移动到另一个位置。

我们将通过两个示例向您展示如何使用变形目标。在第一个示例中，我们将让Three.js处理各个关键帧（或我们从现在起称之为“变形目标”）之间的过渡；在第二个示例中，我们将手动完成这一过程。请记住，我们只是触及了Three.js动画功能的冰山一角。正如您将在本节中看到的，Three.js对控制动画提供了出色的支持，支持动画同步，并提供了从一种动画平滑过渡到另一种动画的方法，仅此主题就足以写成一本专著。因此，在接下来的几节中，我们将向您介绍Three.js动画的基础知识，这些内容应能为您提供足够的信息，让您入门并探索更复杂的主题。

### 使用混合器和变形目标的动画(Animation with a mixer and morph targets  )

### 使用骨骼和蒙皮的动画

正如我们在“使用混合器和变形目标的动画”一节中所看到的，变形动画非常简单直接。Three.js 知道所有目标顶点的位置，只需将每个顶点从一个位置过渡到下一个位置即可。而对于骨骼和蒙皮，情况就稍微复杂一些。当你使用骨骼进行动画时，你移动的是骨骼，而 Three.js 必须确定如何相应地转换附着的蒙皮（一组顶点）。在本示例中，我们将使用一个从 Blender 导出为 Three.js 格式的模型（models/blender-skeleton 文件夹中的 lpp-rigging.gltf）。这是一个人物模型，带有一组骨骼。通过移动这些骨骼，我们可以对整个模型进行动画处理。首先，让我们来看看我们是如何加载这个模型的：

## 使用外部模型创建动画

在第8章“创建和加载高级网格与几何体”中，我们了解了Three.js支持的几种3D格式。其中一些格式还支持动画。在本章中，我们将研究以下示例：

• COLLADA 模型：COLLADA 格式支持动画。对于本示例，我们将从 COLLADA 文件加载一个动画，并使用 Three.js 进行渲染。

• MD2模型：MD2模型是旧版Quake引擎中使用的一种简单格式。尽管该格式有些过时，但它仍然是存储角色动画的极佳格式。

• glTF 模型：GL 传输格式（glTF）是一种专门用于存储 3D 场景和模型的格式。它专注于最小化资源大小，并力求在解包模型时尽可能高效。

•  FBX 模型：FBX 是由 https://www.mixamo.com 上提供的 Mixamo 工具生成的格式。借助 Mixamo，您可以轻松地为模型设置骨骼并制作动画，而无需具备丰富的建模经验。

•  BVH 模型：Biovision (BVH) 格式与其他加载器略有不同。使用此加载器时，您无需加载带有骨架的几何体或一组动画。采用 Autodesk MotionBuilder 使用的这种格式，您只需加载一个骨架，即可对其进行可视化，甚至将其附加到您的几何体上。

我们将从 glTF 模型开始，因为这种格式正逐渐成为在不同工具和库之间交换模型的标准。

### 使用gltfLoader

最近越来越受关注的一种格式是glTF格式。您可以在https://github.com/KhronosGroup/glTF上找到关于这种格式的非常详尽的说明，它专注于优化大小和资源使用。使用glTFLoader与使用其他加载器类似：

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// ...
return loader.loadAsync('/assets/models/truffle_man/scene.gltf').
  then((container) => {
    container.scene.scale.setScalar(4)
    container.scene.translateY(-2)
    scene.add(container.scene)
    const mixer = new THREE.AnimationMixer(container.scene);
    const animationClip = container.animations[0];
    const clipAction = mixer.clipAction(animationClip).
      play();
  })
```

此加载器还会加载完整场景，因此您可以将所有内容添加到组中，也可以选择子元素。对于本示例，您可以通过打开 load-gltf-anim.html 查看结果:

对于下一个示例，我们将使用FBX模型。

### 使用fbxLoader可视化捕获的模型运动

Autodesk FBX格式已经存在一段时间了，而且使用起来非常简单。网上有一个很棒的资源，你可以在这里找到许多可以下载的动画：https://www.mixamo.com/。该网站提供了2,500个可供你使用和定制的动画：

下载动画后，从Three.js中使用它非常简单：

正如您在 load-fbx.html 中所看到的，生成的动画效果很棒：

FBX 和 glTF 是现代格式，应用广泛，是交换模型和动画的不错方式。此外还有一些较旧的格式。一个有趣的格式是旧版第一人称射击游戏《雷神之锤》所使用的 MD2 格式。

### 从Quake模型加载动画

### 从COLLADA模型加载动画

虽然标准的 COLLADA 模型未经过压缩（因此文件体积可能会非常大），但 Three.js 中也提供了 KMZLoader。这是一种经过压缩的 COLLADA 模型，因此当你遇到 KMZ（Keyhole Markup Language Zipped）格式的模型时，可以使用 KMZLoader 而非 ColladaLoader 来加载模型：

### 使用BVHLoader可视化骨架

BVHLoader 是一种与我们迄今所见的加载器略有不同的加载器。此加载器不会返回带有动画的网格或几何体；相反，它会返回一个骨架和一个动画。load-bvh.html 中展示了此类示例:

为了可视化这一点，我们可以使用 THREE.SkeletonHelper，如这里所示。借助 THREE.SkeletonHelper，我们可以可视化网格的骨架。BVH 模型仅包含骨架信息，我们可以这样进行可视化：

在较旧版本的Three.js中，曾支持其他类型的动画文件格式。其中大部分已过时，并随后从Three.js发行版中删除。如果您确实遇到一种想要展示动画的其他格式，可以查看较旧的Three.js版本，并可能重新使用那里的加载器。

## 总结

在本章中，我们探讨了为场景添加动画的不同方法。我们从一些基本的动画技巧开始，接着介绍了摄像机的移动与控制，最后讨论了如何使用变形目标和骨骼/骨骼动画来为模型添加动画。

当您已搭建好渲染循环后，添加简单动画就非常容易了。只需更改网格的一个属性；在下一个渲染步骤中，Three.js 将会渲染更新后的网格。对于更复杂的动画，通常会在外部程序中进行建模，然后通过 Three.js 提供的加载器之一将其加载进来。

在前面的章节中，我们探讨了可用于为对象添加材质的各种材料。例如，我们了解了如何更改这些材料的颜色、光泽度和不透明度。然而，我们尚未详细讨论的是，如何将外部图像（也称为纹理）与这些材料结合使用。借助纹理，我们可以轻松地创建看起来像是由木材、金属、石头等制成的物体。在第10章中，我们将深入探讨纹理的所有不同方面以及它们在Three.js中的使用方法。

# 10 加载和使用纹理

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/76368aff66cfb53dcdb487010f575c15/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766044300&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=MZsMcLyPVFogBlBdZHYWikIpfSE%3D)      

## 在材质中使用纹理

在本示例中，您可以看到纹理很好地环绕着形状。当您在Three.js中创建几何体时，它会确保正确应用所使用的任何纹理。这是通过一种称为UV映射的技术实现的。借助UV映射，我们可以告诉渲染器应将纹理的哪一部分应用到特定的面。我们将在第13章“使用Blender和Three.js”中详细介绍UV映射，届时我们将向您展示如何轻松地使用Blender为Three.js创建自定义UV映射。

除了我们能用 THREE.TextureLoader 加载的标准图像格式，Three.js 还提供了一些自定义加载器，可用于加载不同格式的纹理。如果你使用的是特定的图像格式，可以查看 Three.js 发行版中的 loaders 文件夹(https://github.com/mrdoob/three.js/tree/dev/examples/jsm/ loaders)，以确定该图像格式是否可由 Three.js 直接加载，或者是否需要手动转换。

除了这些普通图像，Three.js 还支持 HDR 图像。

### 将HDR图像加载为纹理

HDR图像捕捉的亮度范围比标准图像更广，能够更贴近我们人眼所见。Three.js支持EXR和RGBE格式。如果你有一张HDR图像，可以微调Three.js渲染HDR图像的方式，因为HDR图像包含的亮度信息比显示器能显示的更多。这可以通过在THREE.WebGLRenderer中设置以下属性来实现:

如果您想加载 EXR 或 RGBE 图像并将其用作纹理，可以使用 THREE.EXRLoader 或 THREE.RGBELoader。这与我们之前看到的 THREE.TextureLoader 的工作方式相同:

在texture-basics.html示例中，我们向您展示了如何使用纹理将颜色应用到网格上。在下一节中，我们将探讨如何使用纹理通过向网格应用虚假的高度信息，使模型看起来更加精细。

### 使用凹凸贴图向网格提供额外细节

凹凸贴图用于为材质添加更多深度。您可以通过打开texture-bump-map.html来查看其效果:

在本示例中，您可以看到该模型看起来更加精细，似乎也更有深度。这是通过在材质上设置一种额外的纹理，即所谓的凹凸贴图来实现的：

```js
const exrLoader = new EXRLoader()
const colorMap = exrLoader.load('/assets/textures/brick-wall/brick_wall_001_diffuse_2k.exr', (texture) => {
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
})
const bumpMap = new THREE.TextureLoader().load(
  '/assets/textures/brick-wall/brick_wall_001_displacement_2k.png',
  (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
  }
)
const material = new THREE.MeshPhongMaterial({
  color:
    0xffffff
})
material.map = colorMap
material.bumpMap = bumpMap
```

在该代码中，您可以看到，除了设置`map`属性外，我们还将`bumpMap`属性设置为一种纹理。此外，通过上一个示例中的菜单可用的`bumpScale`属性，我们可以设置凹凸的高度（如果设置为负值，则表示深度）。本示例中使用的纹理如下所示：

凹凸贴图是一种灰度图像，但你也可以使用彩色图像。像素的亮度决定了凹凸的高度。凹凸贴图仅包含像素的相对高度，而不会说明坡度的方向。因此，使用凹凸贴图所能达到的细节程度和深度感知是有限的。若要获得更精细的效果，可以使用法线贴图。

### 使用法线贴图实现更精细的凹凸和皱纹

在法线贴图中，不存储高度（位移），而是存储每个像素的法线方向。不赘述细节，借助法线贴图，你可以仅用少量顶点和面就创建出看起来非常精细的模型。例如，请查看texture-normal-map.html示例：

在前面的截图中，您可以看到一个看起来非常精细的模型。随着模型的移动，您会发现纹理正在响应它所接收到的光线。这提供了一个非常逼真的模型，而且只需要一个非常简单的模型和几张贴图。以下代码片段展示了如何在Three.js中使用法线贴图：

```js
const colorMap = new THREE.TextureLoader().load('/assets/textures/red-bricks/red_bricks_04_diff_1k.jpg', (texture) => {
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
})
const normalMap = new THREE.TextureLoader().load(
  '/assets/textures/red-bricks/red_bricks_04_nor_gl_1k.jpg',
  (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
  }
)
const material = new THREE.MeshPhongMaterial({
  color:
    0xffffff
})
material.map = colorMap
material.normalMap = normalMap
```

这与我们用于凹凸贴图的方法相同。不过，这一次，我们将normalMap属性设置为法线纹理。我们还可以通过设置normalScale属性来定义凹凸效果的明显程度(mat.normalScale.set(1,1))。利用此属性，您可以沿X轴和Y轴进行缩放。不过，最好的方法是保持这些值不变。在本示例中，您可以随意调整这些值。

然而，法线贴图的问题在于它们并不容易制作。你需要使用专门的工具，比如Blender或Photoshop。这些程序可以将高分辨率渲染图或纹理作为输入，并据此生成法线贴图。

使用法线贴图或凹凸贴图时，您不会改变模型的形状；所有顶点都保持在相同的位置。这些贴图只是利用场景中的光源来创建虚假的深度和细节。不过，Three.js 提供了第三种方法，您可以使用贴图为模型添加细节，这种方法会改变顶点的位置。这是通过位移贴图实现的。

### 使用位移贴图来改变顶点的位置

Three.js 还提供了一种纹理，可用于更改模型顶点的位置。虽然凹凸贴图和法线贴图会营造出一种深度的错觉，但借助位移贴图，我们可根据纹理中的信息改变模型的形状。我们可以像使用其他贴图一样使用位移贴图：

```js
const colorMap = new THREE.TextureLoader().load('/assets/textures/displacement/w_c.jpg', (texture) => {
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
})
const displacementMap = new THREE.TextureLoader().load('/assets/textures/displacement/w_d.png', (texture) => {
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
})
const material = new THREE.MeshPhongMaterial({
  color:
    0xffffff
})
material.map = colorMap
material.displacementMap = displacementMap
```

在前面的代码片段中，我们加载了一个位移贴图，其外观如下：

颜色越亮，顶点的位移越大。当你运行texture-displacement.html示例时，你会看到位移贴图的结果是一个模型，该模型的形状会根据贴图中的信息而改变：

除了设置位移贴图纹理外，我们还可以使用 displacementScale 和 displacementOffset 来控制位移的明显程度。关于使用位移贴图需要提及的一点是，只有当您的网格包含大量顶点时，才能获得良好的效果。否则，由于顶点数量太少，无法充分表现所需的位移，位移效果将与提供的贴图不一致。

### 使用环境光遮蔽贴图添加微妙的阴影（Adding subtle shadows with an ambient occlusion map）

在前面的章节中，您学习了如何在Three.js中使用阴影。如果您设置了正确网格的castShadow和receiveShadow属性，添加了几盏灯光，并正确配置了灯光的阴影相机，Three.js 就会渲染出阴影。

然而，渲染阴影是一项相当昂贵的操作，每次渲染循环都会重复进行。如果你的光源或物体在移动，这是必要的；但通常情况下，一些光源或模型是固定的，因此如果我们能计算一次阴影，然后重复使用它们，那就太好了。为此，Three.js 提供了两种不同的贴图：环境光遮蔽贴图和光照贴图。在本节中，我们将介绍环境光遮蔽贴图；在下一节中，我们将介绍光照贴图。

环境光遮蔽是一种用于确定模型各部分在场景中受环境光照影响程度的技术。在Blender等工具中，环境光通常通过半球光源或定向光源（如太阳）来模拟。虽然模型的大部分区域都会接收到一些环境光，但并非所有区域接收到的环境光都相同。例如，如果你建模一个人物，头部上方会比手臂底部接收到更多的环境光。这种光照差异——即阴影——可以被渲染（烘焙，如以下截图所示）到一张纹理中，然后我们可以将该纹理应用到模型上，为它们添加阴影，而无需每次都重新计算阴影：

一旦你有了环境光遮挡贴图，就可以将其分配给材质的aoMap属性，Three.js会在应用和计算场景中灯光应照射到模型特定部分的程度时考虑这一信息。以下代码片段展示了如何设置aoMap属性：

```js
const aoMap = new THREE.TextureLoader().load('/assets/gltf/material_ball_in_3d-coat/aoMap.png')
const material = new THREE.MeshPhongMaterial({
  color:
    0xffffff
})
material.aoMap = aoMap
material.aoMap.flipY = false
```

与其他类型的纹理贴图一样，我们只需使用 THREE.TextureLoader 加载纹理，并将其分配给材质的正确属性。与许多其他贴图一样，我们还可以通过设置 aoMapIntenisty 属性来调整贴图对模型光照的影响程度。在本示例中，您还会发现，我们需要将 aoMap 的 flipY 属性设置为 false。有时，外部程序存储的材质在纹理中的排列方式与 Three.js 的预期略有不同。借助此属性，我们可以翻转纹理的方向。通常，在处理模型时，您会通过反复试验注意到这一点。

要使环境光遮挡贴图正常工作，我们（通常）需要额外执行一步。我们之前已经提到了UV映射（存储在uv属性中）。这些映射定义了纹理的哪一部分被映射到模型的特定面上。对于环境光遮挡贴图，以及接下来示例中的光照贴图，Three.js使用了一组单独的UV映射（存储在uv2属性中），因为其他纹理往往需要以不同于阴影和光照贴图的方式应用。对于我们的示例，我们只是简单地复制了模型中的UV映射；请记住，当我们使用aoMap属性或lightMap属性时，Three.js会使用uv2属性的值，而不是uv属性。如果加载的模型中没有这个属性，大多数情况下，直接复制uv映射属性也行，因为我们并未对环境光遮挡贴图进行优化，而优化可能需要一组不同的UV映射：

```js
const k = mesh.geometry
const uv1 = k.getAttribute('uv')
const uv2 = uv1.clone()
k.setAttribute('uv2', uv2)
```

我们将提供两个使用环境光遮蔽贴图的示例。在第一个示例中，我们展示了图10.9中的模型，并应用了aoMap (texture-ao-map-model.html):

您可以使用右侧的菜单来设置aoMapIntensity。该值越高，从加载的aoMap纹理中看到的阴影就越多。正如您所见，拥有一个环境光遮挡贴图确实非常有用，因为它能为模型提供丰富的细节，使模型看起来更加逼真。我们在本章中已经见过的一些纹理也提供了额外的aoMap，您可以加以利用。如果您打开texture-ao-map.html，您将得到一种简单的砖块状纹理，但这一次还添加了aoMap：

虽然环境光遮挡贴图会改变模型某些部分接收到的光照量，但Three.js也支持光照贴图，其作用正好相反（大致如此），通过指定一张贴图来为模型的某些部分添加额外的光照。

### 使用光照贴图创建假光源

在本节中，我们将使用光照贴图。光照贴图是一种纹理，其中包含场景中的光源将如何影响模型的信息。换句话说，光源的效果被烘焙到纹理中。光照贴图是在Blender等3D软件中烘焙的，包含模型每个部分的光照值：

我们在本示例中将使用的光照贴图如图10.12所示。编辑窗口的右侧显示了地面平面的烘焙光照贴图。您可以看到，整个地面平面都以白光照明，而部分区域接收到的光线较少，因为场景中还有一个模型。使用光照贴图的代码与环境光遮挡贴图的代码类似：

```js
const textureLoader = new THREE.TextureLoader()
const colorMap = textureLoader.load('/assets/textures/wood/abstract-antique-backdrop-164005.jpg')
const lightMap = textureLoader.load('/assets/gltf/material_ball_in_3d-coat/lightMap.png')
const material = new THREE.MeshBasicMaterial({
  color:
    0xffffff
})
material.map = colorMap
material.lightMap = lightMap
material.lightMap.flipY = false
```

我们再次需要为 Three.js 提供一组额外的 UV 坐标，称为 uv2（代码中未显示），并且必须使用 THREE.TextureLoader 来加载纹理——在本例中，使用了一个简单的纹理来表示地板的颜色，以及在 Blender 中为此示例创建的光照贴图（lightmap）。最终效果如下所示（texture-light-map.html）：

如果你查看前面的示例，就会发现来自光照贴图的信息被用来创建一个外观非常精美的阴影，这个阴影似乎是由模型投射出来的。重要的是要记住，烘焙阴影、灯光和环境光遮挡在静态场景中与静态对象配合使用效果极佳。一旦物体或光源发生变化或开始移动，你就必须实时计算阴影了。

### 金属度和粗糙度贴图

在讨论Three.js中可用的材质时，我们提到一个不错的默认材质是THREE.MeshStandardMaterial。你可以用它来创建闪亮的、类似金属的材质，也可以通过应用粗糙度，让网格看起来更像木材或塑料。通过使用材质的金属度和粗糙度属性，我们可以配置材质以呈现我们想要的材质效果。除了这两个属性之外，你还可以通过使用一个纹理。因此，如果我们有一个粗糙的物体，并且希望指定该物体的某个部分是光亮的，我们可以设置 THREE.MeshStandardMaterial 的 metalnessMap 属性；如果希望表明网格的某些部分应显示为划痕或更粗糙，我们可以设置 roughnessMap 属性。当您使用这些贴图时，模型特定部分的纹理值会分别与粗糙度属性或金属度属性相乘，从而决定该特定像素的渲染方式。首先，我们来看一下 texture-metalness-map.html 中的金属度属性：

在本示例中，我们略过了部分步骤，还使用了环境贴图，这使我们能够将环境中的反射效果渲染到物体表面。金属度高的物体反射更多，而粗糙度高的物体则会更多地散射反射光。对于此模型，我们使用了metalnessMap；你可以看到，当纹理中的金属度属性较高时，物体本身显得很亮；而在纹理中金属度属性较低的部分，则显得较为粗糙。查看roughnessMap时，我们会发现几乎相同的效果，只是颜色反转了：

正如您所见，根据提供的纹理，模型的某些部分比其他部分更粗糙或有更多划痕。对于metalnessMap，材质的值会乘以材质的metalness属性；对于roughnessMap，情况相同，只不过此时该值会乘以材质的roughness属性。

加载这些纹理并将其设置到材质中，可以按如下方式进行：

```js
const metalnessTexture = new THREE.TextureLoader().load(
  '/assets/textures/engraved/Engraved_Metal_003_ROUGH.jpg',
  (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
  }
)
const material = new THREE.MeshStandardMaterial({
  color:
    0xffffff
})
material.metalnessMap = metalnessTexture
...
const roughnessTexture = new THREE.TextureLoader().load(
  '/assets/textures/marble/marble_0008_roughness_2k.jpg',
  (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
  }
)
const material = new THREE.MeshStandardMaterial({
  color:
    0xffffff
})
material.roughnessMap = roughnessTexture
```

接下来是阿尔法贴图。借助阿尔法贴图，我们可以使用纹理来改变模型部分的透明度。

### 使用 alpha  贴图创建透明模型

alpha  贴图是一种控制曲面不透明度的方法。如果贴图的值为黑色，则模型的该部分将完全透明；如果为白色，则完全不透明。在我们查看纹理及其应用方法之前，先来看一下示例(texture-alpha-map.html):

在本示例中，我们渲染了一个立方体，并设置了材质的alphaMap属性。如果您打开此示例，请务必把材质的透明度属性设为true。您可能会注意到，您只能看到立方体的正面部分，而与前面的截图不同，您可以在立方体中透视并看到另一面。原因是，默认情况下，所用材质的side属性被设置为THREE.FrontSide。要渲染通常隐藏的那一面，我们必须将材质的side属性设置为THREE.DoubleSide；您会发现，立方体的渲染效果如前面的截图所示。

我们在本示例中使用的纹理非常简单：

要加载它，我们必须使用与其他纹理相同的方法：

```js
const alphaMap = new THREE.TextureLoader().load('/assets/textures/alpha/partial-transparency.png', (texture) => {
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
})
const material = new THREE.MeshPhongMaterial({
  color:
    0xffffff
})
material.alphaMap = alphaMap
material.transparent = true
```

在这一段代码中，您还可以看到我们设置了纹理的wrapS、wrapT和repeat属性。我们将在本章稍后更详细地介绍这些属性，但这些属性可用于确定我们希望在网格上重复纹理的频率。如果设置为(1, 1)，则整个纹理在应用于网格时不会重复；如果设置为更高的值，则纹理会缩小并多次重复。在本例中，我们在两个方向上各重复了四次。

### 为会发光的模型使用自发光贴图（Using an emissive map for models that glow）

> “emissive map” 的标准中文术语是 自发光贴图，有时也简称为 发光贴图，但在技术文档或 three.js 相关语境中，推荐使用 自发光贴图 以避免与光照贴图（lightmap）等其他贴图混淆。

自发光贴图是一种可用于使模型的某些部分发光的纹理，就像发光属性对整个模型的作用一样。与发光属性类似，使用自发光贴图并不意味着该物体正在发光——它只是让应用了此纹理的模型部分看起来像在发光。通过查看一个示例，这一点就更容易理解了。如果您在浏览器中打开texture-emissive-map.html示例，您会看到一个类似熔岩的物体：

不过，当你仔细观察时，可能会发现，尽管这些物体似乎会发光，但它们本身并不会发出光线。这意味着你可以利用这一点来增强物体的视觉效果，但这些物体本身并不会对场景的光照产生贡献。在本示例中，我们使用了一张发射贴图，其外观如下：

要加载并使用自发光贴图，我们可以使用 THREE.TextureLoader 加载一个，并将其分配给 emissiveMap 属性（同时搭配其他一些贴图，以获得图 10.18 所示的模型）：

```js
const emissiveMap = new THREE.TextureLoader().load
  ('/assets/textures/lava/lava.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
  })
const roughnessMap = new THREE.TextureLoader().load
  ('/assets/textures/lava/lava-smoothness.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
  })
const normalMap = new THREE.TextureLoader().load
  ('/assets/textures/lava/lava-normals.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
  })
const material = new THREE.MeshPhongMaterial({
  color:
    0xffffff
})
material.normalMap = normalMap
material.roughnessMap = roughnessMap
material.emissiveMap = emissiveMap
material.emissive = new THREE.Color(0xffffff)
material.color = new THREE.Color(0x000000)
```

由于自发光贴图（emissiveMap）的颜色会与材质的 emissive 属性进行调制，因此请确保将材质的 emissive 属性设置为非黑色的值。

### 使用高光贴图（specular map）来确定 shininess（光泽度/高光强度）

在之前的示例中，我们主要使用了 `THREE.MeshStandardMaterial` 以及该材质所支持的各种贴图。当你需要一种材质时，`THREE.MeshStandardMaterial` 通常是最佳选择，因为它可以轻松配置，以表现大量不同类型的现实世界材质。在 Three.js 的旧版本中，你必须使用 `THREE.MeshPhongMaterial` 来表现有光泽的材质，而使用 `THREE.MeshLambertMaterial` 来表现无光泽的材质。本节中使用的高光贴图（specular map）只能与 `THREE.MeshPhongMaterial` 配合使用。通过高光贴图，你可以定义模型的哪些部分应该具有光泽，哪些部分应该显得粗糙（这类似于我们之前介绍过的 `metalnessMap`（金属度贴图）和 `roughnessMap`（粗糙度贴图））。

在 `texture-specular-map.html` 示例中，我们渲染了地球，并使用高光贴图使海洋区域比陆地区域更具光泽：

通过右上角的菜单，你可以调整高光颜色（specular color）和光泽度（shininess）进行尝试。如你所见，这两个属性会影响海洋对光线的反射效果，但不会改变陆地的光泽度。这是因为我们使用了以下高光贴图（specular map）：

在这张贴图中，黑色表示对应区域的光泽度为 0%，而白色表示光泽度为 100%。
要使用高光贴图（specular map），我们必须使用 `THREE.TextureLoader` 加载该贴图，并将其赋值给 `THREE.MeshPhongMaterial` 的 `specularMap` 属性：

```js
const colorMap = new THREE.TextureLoader().load
  ('/assets/textures/specular/Earth.png')
const specularMap = new THREE.TextureLoader().load
  ('/assets/textures/specular/EarthSpec.png')
const normalMap = new THREE.TextureLoader().load
  ('/assets/textures/specular/EarthNormal.png')
const material = new THREE.MeshPhongMaterial({
  color:
    0xffffff
})
material.map = colorMap
material.specularMap = specularMap
material.normalMap = normalMap
```

通过使用高光贴图，我们已经讨论了可用于为你的模型添加深度、颜色、透明度或额外光照效果的大部分基本纹理。在接下来的两个部分中，我们将介绍另一种类型的贴图，它将允许你为模型添加环境反射效果。

### 使用环境贴图创建伪反射效果

计算环境反射非常消耗 CPU 资源，通常需要采用光线追踪（ray tracer）的方法。如果你希望在 Three.js 中使用反射效果，仍然可以实现，但需要采用“伪造”的方式：即创建一个物体所处环境的纹理，并将其应用到该物体上。

首先，我们先展示一下期望实现的效果（参见 `texture-environment-map.html`，如下图所示）：

在前面的截图中，你可以看到球体反射了周围环境。如果你移动鼠标，还会发现反射效果与你所见环境的相机角度相匹配。

要创建这个示例，请执行以下步骤：

1. 创建一个 `CubeTexture` 对象。`CubeTexture` 是一组可以应用到立方体每个面上的六个纹理。
2. 设置天空盒（skybox）。当我们有了 `CubeTexture` 后，我们可以将其设置为场景的背景。这样做时，实际上我们创建了一个非常大的盒子，摄像机和物体都被放置在这个盒子内部，这样当我们移动摄像机时，场景的背景也会相应地正确变化。或者，我们也可以创建一个非常大的立方体，应用 `CubeTexture`，并手动将其添加到场景中。
3. 将 `CubeTexture` 对象设置为材质 `cubeMap` 属性的纹理。用于模拟环境的同一个 `CubeTexture` 对象应该被用作网格上的纹理。Three.js 会确保它看起来像是对环境的反射。

一旦你有了原始素材，创建 `CubeTexture` 就相当简单了。你需要准备六张图像，它们共同构成一个完整的环境。具体来说，你需要以下六张图片：

- 朝前看（正 Z 方向，posz）  
- 朝后看（负 Z 方向，negz）  
- 朝上看（正 Y 方向，posy）  
- 朝下看（负 Y 方向，negy）  
- 朝右看（正 X 方向，posx）  
- 朝左看（负 X 方向，negx）

Three.js 会将这些图像拼接在一起，生成一张无缝的环境贴图。有许多网站可以下载全景图像，但这些图像通常采用球形等距柱状投影（equirectangular）格式，看起来如下所示：

这类贴图有两种使用方式。第一种方法是将其转换为由六个独立文件组成的立方体贴图（cube map）格式。你可以通过以下网站在线完成这一转换：https://jaxry.github.io/panorama-to-cubemap/。  

另一种方法是采用不同的方式将这种纹理直接加载到 Three.js 中，我们将在本节稍后部分进行演示。

要从六个独立的文件加载 `CubeTexture`，我们可以使用 `THREE.CubeTextureLoader`，如下所示：

```js
const cubeMapFlowers = new THREE.CubeTextureLoader().load([
  '/assets/textures/cubemap/flowers/right.png',
  '/assets/textures/cubemap/flowers/left.png',
  '/assets/textures/cubemap/flowers/top.png',
  '/assets/textures/cubemap/flowers/bottom.png',
  '/assets/textures/cubemap/flowers/front.png',
  '/assets/textures/cubemap/flowers/back.png'
])
const material = new THREE.MeshPhongMaterial({
  color:
    0x777777
})
material.envMap = cubeMapFlowers
material.mapping = THREE.CubeReflectionMapping
```

在这里，你可以看到我们从多张不同的图像中加载了一个 `cubeMap`（立方体贴图）。加载完成后，我们将该纹理赋值给材质的 `envMap` 属性。最后，我们还需要告诉 Three.js 要使用哪种映射方式。

如果你是通过 `THREE.CubeTextureLoader` 加载纹理的，可以使用 `THREE.CubeReflectionMapping` 或 `THREE.CubeRefractionMapping`：使用 `THREE.CubeReflectionMapping` 时，你的物体会根据所加载的 `cubeMap` 显示反射效果；而使用 `THREE.CubeRefractionMapping` 时，模型会呈现出类似半透明玻璃的效果，并根据 `cubeMap` 中的信息对光线产生轻微的折射。

我们也可以将这个 cubeMap  设置为场景的背景，如下所示：

```js
scene.background = cubeMapFlowers
```

当你只有一张图像时，处理过程并不会有很大的不同：

```js
const cubeMapEqui = new THREE.TextureLoader().load
  ('/assets/equi.jpeg')
const material = new THREE.MeshPhongMaterial({
  color:
    0x777777
})
material.envMap = cubeMapEqui
material.mapping = THREE.EquirectangularReflectionMapping
scene.background = cubeMapFlowers
```

这一次，我们使用了普通的纹理加载器（normal texture loader），但通过指定不同的映射方式，可以告诉 Three.js 如何渲染该纹理。采用这种方法时，你可以将映射方式设置为 `THREE.EquirectangularRefractionMapping` 或 `THREE.EquirectangularReflectionMapping`。

这两种方法所得到的效果都是：场景看起来仿佛我们置身于一个开阔的户外环境中，而其中的网格模型会反射周围的环境。侧边的菜单允许你调整材质的各项属性：

除了反射之外，Three.js 还允许您使用立方体贴图对象进行折射（类似玻璃的物体）。以下屏幕截图展示了这一点（您可以使用右侧的菜单自行测试）：

要实现这种效果，我们只需将 `cubeMap` 的 `mapping` 属性设置为 `THREE.CubeRefractionMapping`（默认值为反射模式，也可以通过显式指定 `THREE.CubeReflectionMapping` 来手动设置）：

```js
cubeMap.mapping = THREE.CubeRefractionMapping
```

在本例中，我们为网格使用了静态的环境贴图。换句话说，我们只能看到环境的反射，而看不到环境中其他网格对象的反射。在下面的截图中可以看到，只需稍加处理，我们也可以实现对其他物体的反射效果：

为了同时显示场景中其他物体的反射效果，我们需要使用一些其他的 Three.js 组件。其中第一个组件是一个额外的摄像机，称为 `THREE.CubeCamera`：

```js
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget
  (128, {
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter
  })

const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)

cubeCamera.position.copy(mesh.position);
scene.add(cubeCamera);
```

我们将使用 `THREE.CubeCamera` 对包含所有物体的场景进行快照，并将该快照用作立方体贴图（cubeMap）。前两个参数定义了摄像机的近裁剪面（near）和远裁剪面（far）属性。因此，在本例中，摄像机仅渲染距离在 0.1 到 1.0 范围内的内容。  最后一个参数是我们要渲染纹理的目标。为此，我们创建了一个 `THREE.WebGLCubeRenderTarget` 的实例。其第一个参数是渲染目标的尺寸：值越高，反射效果就越精细。另外两个属性用于控制当你缩放时，纹理如何进行放大或缩小（即纹理的过滤方式）。

你需要确保将该摄像机精确放置在你希望显示动态反射效果的 `THREE.Mesh` 的位置上。在本例中，我们从网格对象复制了其位置信息，以确保摄像机被正确放置。

现在我们已经正确设置了 `CubeCamera`，接下来需要确保 `CubeCamera` 所“看到”的内容被应用为我们示例中立方体的纹理。为此，我们必须将材质的 `envMap` 属性设置为 `cubeCamera.renderTarget`：

```js
cubeMaterial.envMap = cubeRenderTarget.texture;
```

现在，我们必须确保 `cubeCamera` 渲染场景，以便将其输出用作立方体的输入纹理。为此，我们需要按如下方式更新渲染循环（如果场景不发生变化，也可以只调用一次）：

### 重复平铺（Repeat Wrapping）

当您将纹理应用到由Three.js创建的几何体时，Three.js会尽可能以最佳方式应用该纹理。例如，对于立方体，这意味着每一面都会显示完整的纹理；而对于球体，完整的纹理会被包裹在球体表面。然而，在某些情况下，您可能不希望纹理覆盖整个面或整个几何体，而是希望纹理能够重复显示。Three.js提供了相应的功能来控制这一行为。一个可以尝试调整重复属性的示例位于texture-repeat-mapping.html。以下截图展示了该示例：

在该属性产生预期效果之前，你需要确保将纹理的包裹方式（wrapping）设置为 `THREE.RepeatWrapping`，如下列代码片段所示：

```js
mesh.material.map.wrapS = THREE.RepeatWrapping;
mesh.material.map.wrapT = THREE.RepeatWrapping;
```

`wrapS` 属性定义了纹理在其 X 轴方向上的平铺方式，而 `wrapT` 属性则定义了纹理在其 Y 轴方向上的平铺方式。Three.js 为此提供了以下三种选项：

- `THREE.RepeatWrapping`：允许纹理重复平铺；
- `THREE.MirroredRepeatWrapping`：允许纹理重复平铺，但每次重复都是镜像翻转的；
- `THREE.ClampToEdgeWrapping`：默认设置，纹理整体不会重复，仅边缘的像素会被延伸重复。

在本示例中，你可以尝试各种不同的重复设置以及 `wrapS` 和 `wrapT` 选项。一旦选定了平铺类型，我们就可以设置 `repeat` 属性，如下列代码片段所示：

```js
mesh.material.map.repeat.set(repeatX, repeatY);
```

`repeatX` 变量定义了纹理在其 X 轴方向上重复的次数，`repeatY` 变量则定义了 Y 轴方向上的重复次数。  如果这些值设为 1，纹理将不会重复；  如果设置为大于 1 的值，你会看到纹理开始重复；  也可以使用小于 1 的值，此时会放大（“拉近”）纹理；  如果将 repeat 值设为负数，纹理将会被镜像翻转。

当你修改 `repeat` 属性时，Three.js 会自动更新纹理并以新设置进行渲染。但如果你将平铺模式从 `THREE.RepeatWrapping` 更改为 `THREE.ClampToEdgeWrapping`（或反之），则需要显式地通知 Three.js 更新纹理，方法是设置：

```javascript
mesh.material.map.needsUpdate = true;
```

## 渲染到画布并将其用作纹理

在本节中，我们将介绍两个不同的示例。首先，我们将介绍如何使用画布创建一个简单的纹理并将其应用到网格上；之后，我们将更进一步，创建一个可用作凹凸贴图的画布，该画布采用随机生成的图案。

### 将画布用作颜色图

在第一个示例中，我们将把分形渲染到一个 HTML Canvas 元素上，并将其用作网格的颜色映射。以下截图显示了此示例 (texture-canvas-as-color-map.html):

首先，我们来看一下渲染分形所需的代码：

### 将画布用作凹凸贴图

正如你在本章前面所看到的，我们可使用凹凸贴图向模型添加高度。此贴图中像素的强度越高，褶皱就越高。由于凹凸贴图只是简单的黑白图像，因此我们完全可以将其绘制在画布上，并将该画布用作凹凸贴图的输入。

在以下示例中，我们将使用画布生成基于 Perlin 噪声的灰度图像，并将该图像用作应用于立方体的凹凸贴图的输入。请参阅 texture-canvas-as-bump-map.html 示例。以下屏幕截图显示了此示例：



> **使用 THREE.DataTexture 作为动态纹理**
>
> 在本示例中，我们使用 HTML canvas 元素渲染了 Perlin 噪声。Three.js 还提供了一种动态创建纹理的替代方法：您可以创建一个 THREE.DataTexture 纹理，然后传入一个 Uint8Array，在其中直接设置 RGB 值。有关如何使用 THREE.DataTexture 的更多信息，请参阅此处：https://threejs.org/docs/#api/en/textures/DataTexture.

我们用于纹理的最后一种输入源是另一个 HTML 元素：HTML5 的视频元素（video element）。

### 使用视频的输出作为纹理

如果你阅读了前面关于渲染到 Canvas 的章节，可能会想到将视频渲染到 Canvas 上，然后将其用作纹理的输入。这是一种可行的方法，但 Three.js 已经原生支持直接使用 HTML5 视频元素（通过 WebGL）作为纹理源。请查看 `texture-canvas-as-video-map.html` 示例：

将视频用作纹理的输入很容易，就像使用 canvas 元素一样。首先，我们需要一个 video 元素来播放视频：

```js
const videoString = `
<video
id="video"
src="/assets/movies/Big_Buck_Bunny_small.ogv"
controls="true"
</video>
`
const div = document.createElement('div')
div.style = 'position: absolute'
document.body.append(div)
div.innerHTML = videoString
```

这会通过将 HTML 字符串直接设置为 div 元素的 innerHTML 属性，创建一个基本的 HTML5 视频元素。虽然这种方法非常适合测试，但框架和库通常会为此提供更好的选项。接下来，我们可以配置 Three.js，使其将视频用作纹理的输入，如下所示：

```js
const video = document.getElementById('video')
const texture = new THREE.VideoTexture(video)
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: texture
})
```

效果可以在 `texture-canvas-as-video-map.html` 示例中看到。

## 总结

至此，我们完成了本章关于纹理的内容。正如你所见，Three.js 提供了多种类型的纹理，每种都有不同的用途。你可以使用 PNG、JPG、GIF、TGA、DDS、PVR、KTX、EXR 或 RGBE 格式的任意图像作为纹理。这些图像的加载是异步进行的，因此请务必使用渲染循环，或在加载纹理时添加回调函数。借助这些丰富的纹理类型，即使使用低多边形（low-poly）模型，你也能创建出视觉效果出色的物体。

借助 Three.js，还可以轻松创建动态纹理——只需使用 HTML5 的 Canvas 元素或视频（video）元素作为输入来定义纹理，并在需要更新纹理时将 `needsUpdate` 属性设为 `true` 即可。

随着本章的结束，我们基本上已经涵盖了 Three.js 的所有重要概念。不过，我们尚未介绍 Three.js 提供的一项有趣功能：后期处理（postprocessing）。通过后期处理，你可以在场景渲染完成后为其添加各种特效。例如，你可以对场景进行模糊处理、着色，或者使用扫描线（scan lines）来实现类似老式电视的效果。在第 11 章《渲染后期处理》中，我们将深入探讨后期处理技术，以及如何将其应用到你的场景中。

# 11 渲染后处理

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/30438dc66a8fd73f6bb6dd33efaf86c9/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1765958399&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=NvVzr0hXdvX5sIUicnyKibl4Cqk%3D)      

在本章中，我们将介绍Three.js的一个主要功能，而我们之前尚未涉及：渲染后处理。借助渲染后处理，您可以在场景渲染完成后为其添加额外的效果。例如，您可以添加一种效果，使场景看起来像是在老式电视机上显示的，或者您可以添加模糊和泛光效果。

本章我们将讨论的主要内容如下：

•  为后处理设置Three.js

•  Three.js 提供的一些基本后处理通道，例如 BloomPass 和 FilmPass

•  使用蒙版将效果应用于场景的某一部分

•  使用ShaderPass添加更多基本的后期处理效果，例如棕褐色滤镜、镜像效果和颜色调整

•  使用ShaderPass实现各种模糊效果和更高级的滤镜

•  通过编写一个简单的着色器来创建自定义后处理效果

在第1章“使用Three.js创建你的第一个3D场景”的“介绍requestAnimationFrame”部分，我们设置了一个贯穿全书的渲染循环，以便渲染和动画化我们的场景。对于后处理，我们需要对这一设置做几处改动，以使Three.js能够对最终渲染进行后处理。在第一部分，我们将探讨如何实现这一点。

## 为后处理设置Three.js

### 创建 THREE.EffectComposer

### 为后期处理配置 THREE.EffectComposer

### 更新渲染循环

我们只需对渲染循环稍作修改，即可使用 composer 来替代 `THREE.WebGLRenderer`：

```js
const render = () => {
  requestAnimationFrame(render);
  composer.render();
}
```

我们所做的唯一修改是移除了 `renderer.render(scene, camera)`，并将其替换为 `composer.render()`。这会调用 `EffectComposer` 的渲染函数，而该函数内部会使用传入的 `THREE.WebGLRenderer`，最终将处理后的结果呈现在屏幕上：

> 在应用渲染通道（render pass）之后使用控制器
>
> 你仍然可以使用常规的控制器在场景中移动。本章中你将看到的所有后期处理效果，都是在场景渲染完成之后才应用的。有了这一基础设置，我们将在接下来的几节中介绍可用的各种后期处理通道（postprocessing passes）。

## 后处理通道

Three.js 提供了多种后处理通道（postprocessing passes），你可以直接与 `THREE.EffectComposer` 配合使用。

> 使用简单的 GUI 进行实验
> 本章展示的大多数着色器（shaders）和后期处理通道（passes）都是可配置的。当你想自己应用其中某一个时，通常最简单的方法是添加一个简易的用户界面（UI），让你可以方便地调整各项属性。这样，你就能直观地找到最适合你具体场景的参数设置。

以下列表展示了 Three.js 中所有可用的后期处理通道（postprocessing passes）：

- **AdaptiveToneMappingPass**：此渲染通道会根据场景中可用光线的多少，动态调整场景的亮度（luminosity）。
- **BloomPass**：该效果使较亮区域“溢出”到较暗区域，模拟相机因强光过曝而产生的泛光效果。
- **BokehPass**：为场景添加景深（bokeh）效果，使场景前景清晰对焦，其余部分则失焦模糊。
- **ClearPass**：此通道用于清空当前的纹理缓冲区。
- **CubeTexturePass**：可用于在场景中渲染天空盒（skybox）。
- **DotScreenPass**：在屏幕上叠加一层黑色圆点，以点阵形式表现原始图像。
- **FilmPass**：通过添加扫描线和失真效果，模拟老式电视机或胶片的画面风格。
- **GlitchPass**：以随机时间间隔在屏幕上显示电子故障（glitch）效果。
- **HalfTonePass**：为场景添加半色调（halftone）效果，将画面渲染为一系列不同大小的彩色符号（如圆形、方形等）。
- **LUTPass**：可在场景渲染完成后应用颜色校正（使用查找表 LUT），本章未展示此功能。
- **MaskPass**：允许为当前图像设置遮罩，后续的后期处理通道仅作用于遮罩区域。
- **OutlinePass**：渲染场景中物体的轮廓线。
- **RenderPass**：根据提供的场景和相机渲染整个场景。
- **SAOPass**：提供实时环境光遮蔽（Screen Space Ambient Occlusion）效果。  
- **SMAAPass**：为场景添加 SMAA（Subpixel Morphological Anti-Aliasing）抗锯齿效果。  
- **SSAARenderPass**：通过屏幕空间多重采样（SSAA）为场景添加抗锯齿效果。  
- **SSAOPass**：提供另一种实现运行时环境光遮蔽（SSAO）的方式。  
- **SSRPass**：该通道可用于创建具有屏幕空间反射（Screen Space Reflections）效果的物体。  
- **SavePass**：执行此通道时，会复制当前渲染步骤的结果以供后续使用。但在实际应用中用处不大，我们的示例中也不会使用它。  
- **ShaderPass**：允许你传入自定义着色器，用于实现高级或定制化的后期处理效果。  
- **TAARenderPass**：通过时间性抗锯齿（Temporal Anti-Aliasing, TAA）为场景添加抗锯齿效果。  
- **TexturePass**：将当前 `EffectComposer` 的状态保存到一个纹理中，该纹理可作为其他 `EffectComposer` 实例的输入。  
- **UnrealBloomPass**：与 `THREE.BloomPass` 类似，但其泛光效果模仿了虚幻（Unreal）3D 引擎中使用的风格。

### 简单的后期处理通道

对于简单的后期处理通道，我们将探讨 `FilmPass`、`BloomPass` 和 `DotScreenPass` 能实现哪些效果。我们提供了一个示例（`multi-passes.html`），你可以通过它尝试这些通道，并观察它们对原始渲染结果产生的不同影响。下图展示了该示例的效果：

### 在同一屏幕上显示多个渲染器的输出

### 其他简单通道

## 使用遮罩的高级 EffectComposer 流程

在前面的示例中，我们将后期处理通道应用到了整个屏幕。然而，Three.js 也支持仅对特定区域应用这些通道。在本节中，我们将执行以下步骤：

1. 创建一个场景作为背景图像；  
2. 创建一个包含类似地球的球体的场景；  
3. 创建一个包含类似火星的球体的场景；  
4. 创建一个 `EffectComposer`，将这三个场景合成到一张图像中；  
5. 对渲染为火星的球体应用着色（colorify）效果；  
6. 对渲染为地球的球体应用棕褐色（sepia）效果。

这听起来可能有些复杂，但实际上实现起来却出乎意料地简单。首先，让我们看看在 `masks.html` 示例中我们希望达到的效果。下图展示了上述步骤的最终结果：

我们首先需要做的是设置我们将要渲染的各种场景：

```javascript
const sceneEarth = new THREE.Scene();
const sceneMars = new THREE.Scene();
const sceneBG = new THREE.Scene();
```

为了创建地球和火星的球体，我们只需使用正确的材质和纹理创建这些球体，并将它们添加到各自对应的场景中。对于背景场景，我们加载一张纹理并将其设置为 `sceneBG` 的背景。以下是相关代码（`addEarth` 和 `addMars` 只是辅助函数，用于保持代码清晰；它们通过 `THREE.SphereGeometry` 创建简单的 `THREE.Mesh`，生成一些光源并将它们全部添加到 `THREE.Scene` 中）： 

```js
sceneBG.background = new THREE.TextureLoader().load
  ('/assets/textures/bg/starry-deep-outer-space-galaxy.jpg')
const earthAndLight = addEarth(sceneEarth)
sceneEarth.translateX(-16)
sceneEarth.scale.set(1.2, 1.2, 1.2)
const marsAndLight = addMars(sceneMars)
sceneMars.translateX(12)
sceneMars.translateY(6)
sceneMars.scale.set(0.2, 0.2, 0.2)
```

在这个例子中，我们使用了一个场景的背景属性来添加星空背景。还有另一种创建背景的方法，那就是使用 `THREE.OrthographicCamera`（正交相机）。使用 `THREE.OrthographicCamera` 时，被渲染对象的大小不会随着它与相机之间距离的改变而变化，因此，通过将一个 `THREE.PlaneGeometry` 对象直接放置在 `THREE.OrthographicCamera` 正前方，我们同样可以创建出背景。 

现在我们已经准备好了三个场景，可以开始设置后期处理通道和 `EffectComposer` 了。我们先来看一下完整的通道链，然后再逐一分析各个通道：

### 高级通道——景深（Bokeh）

通过 `BokehPass`，你可以为场景添加景深（bokeh）效果。在景深效果中，只有场景的一部分处于焦点范围内，其余部分则呈现模糊状态。要查看这一效果的实际演示，可以打开 `bokeh.html` 示例：

### 高级通道——环境光遮蔽（Ambient Occlusion）

在第 10 章《加载和使用纹理》中，我们讨论过使用预烘焙的环境光遮蔽贴图（aoMap），根据环境光照直接应用阴影。环境光遮蔽（Ambient Occlusion）指的是物体表面因各部分接收到的环境光量不同而产生的阴影和明暗变化。除了在材质上使用 `aoMap` 外，还可以通过 `EffectComposer` 中的后期处理通道来实现类似的效果。如果你打开 `ambient-occlusion.html` 示例，就能看到使用 `SSAOPass` 后的效果：

## 使用 `THREE.ShaderPass` 实现自定义效果

通过 `THREE.ShaderPass`，我们可以向场景中应用大量额外的效果，只需传入自定义的着色器即可。Three.js 自带了一组可与 `THREE.ShaderPass` 配合使用的内置着色器，本节将列出这些着色器。我们将本节内容分为三个部分进行介绍。

如果你浏览 Three.js 发行版中的 `Shaders` 目录，可能会注意到一些本章未列出的其他着色器。这些着色器——如 `FresnelShader`、`OceanShader`、`ParallaxShader` 和 `WaterRefractionShader`——并不是用于后期处理的着色器，而是应与我们在第 4 章《使用 Three.js 材质》中介绍过的 `THREE.ShaderMaterial` 对象配合使用。

接下来，我们将从几个简单的着色器开始介绍。

### 简单的着色器

### 模糊着色器

在本节中，我们同样不会深入讲解代码，而只展示各种模糊着色器的效果。你可以通过 `shaders-blur.html` 示例来亲自尝试这些效果。前两个展示的着色器是 `HorizontalBlurShader`（水平模糊着色器）和 `VerticalBlurShader`（垂直模糊着色器）：

## 创建自定义后期处理着色器

在本节中，你将学习如何创建可用于后期处理的自定义着色器。我们将创建两个不同的着色器：第一个着色器会将当前图像转换为灰度图；第二个着色器则通过减少可用颜色数量，将图像转换为 8 位风格（即色彩量化效果）。

> **顶点着色器与片元着色器**
>
> 创建顶点着色器（vertex shader）和片元着色器（fragment shader）是一个非常广泛的主题。在本节中，我们仅简要介绍这些着色器的基本工作原理以及它们所能实现的功能。若想深入了解，你可以参考 WebGL 官方规范：http://www.khronos.org/webgl/。另一个充满实例的优秀资源是 Shadertoy（[https://www.shadertoy.com](https://www.shadertoy.com/)），以及《The Book of Shaders》（https://thebookofshaders.com/）。

### 自定义灰度着色器

要为 Three.js（以及其他 WebGL 库）创建自定义着色器，你需要编写两个组成部分：顶点着色器（vertex shader）和片元着色器（fragment shader）。  顶点着色器用于修改各个顶点的位置；  片元着色器则用于确定每个像素的颜色。对于后期处理着色器而言，我们通常只需要实现片元着色器，而可以沿用 Three.js 提供的默认顶点着色器。

在查看代码之前，有一个重要概念需要了解：GPU 支持多条着色器流水线并行执行。这意味着顶点着色器会同时在多个顶点上并行运行，片元着色器也是如此——它们会在大量像素上并行处理。

我们先来看一下为图像应用灰度效果的着色器完整源代码（`custom-shader.js`）：

> **定义着色器的另一种方式**
>
> 在第 4 章中，我们展示了如何将着色器代码定义在独立的文件中。而在 Three.js 中，大多数着色器都采用前一段代码所示的结构。这两种方法都可以用来定义着色器的代码。

如前一段代码所示，这并不是 JavaScript。编写着色器时，使用的是 OpenGL 着色语言（GLSL），其语法与 C 语言非常相似。有关 GLSL 的更多信息，请参见：http://www.khronos.org/opengles/sdk/docs/manglsl/。

首先，我们来看一下顶点着色器：

```js
  vertexShader: [
    'varying vec2 vUv;',

    'void main() {',

    'vUv = uv;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}'
  ].join('\n'),
```

对于后期处理而言，这个着色器实际上并不需要做任何特殊操作。上述代码是 Three.js 实现顶点着色器的标准方式：它结合了相机的投影矩阵（`projectionMatrix`）和模型视图矩阵（`modelViewMatrix`，用于将对象的位置转换到世界空间），从而确定顶点在屏幕上的渲染位置。在后期处理的上下文中，这段代码中唯一值得关注的部分是：纹理坐标（`uv` 值，用于指示从纹理中读取哪个纹素）通过 `varying vec2 vUv` 变量传递给了片元着色器。

这可以用来在片元着色器中获取需要处理的像素。接下来，我们来看片元着色器，了解其中的代码具体做了什么。我们先从以下变量声明开始：

```js
'uniform float rPower;',
'uniform float gPower;',
'uniform float bPower;',
'uniform sampler2D tDiffuse;',
'varying vec2 vUv;',
```

在这里，我们可以看到四个 `uniform`（一致变量）的声明。`uniform` 变量的值由 JavaScript 传入着色器，并且在处理每个片元时都保持相同。在本例中，我们传入了三个 `float` 类型的值（用于确定各颜色通道在最终灰度图像中的混合比例），以及一个名为 `tDiffuse` 的纹理（类型为 `sampler2D`）。该纹理包含了来自 `EffectComposer` 实例上一处理步骤的图像结果。Three.js 会确保当 uniform 变量命名为 `tDiffuse` 时，自动将对应的纹理传递给此着色器。此外，我们也可以通过 JavaScript 手动设置其他 uniform 变量的值。但在 JavaScript 中使用这些 uniform 之前，我们需要先在着色器文件顶部明确声明哪些 uniform 属性要暴露给 JavaScript。声明方式如下：

```js
uniforms: {
"tDiffuse": { type: "t", value: null },
"rPower": { type: "f", value: 0.2126 },
"gPower": { type: "f", value: 0.7152 },
"bPower": { type: "f", value: 0.0722 }
},
```

此时，我们就可以从 Three.js 接收配置参数，并获取当前渲染的输出结果。接下来看一下将每个像素转换为灰度像素的代码：

```js
"void main() {",
"vec4 texel = texture2D( tDiffuse, vUv );",
"float gray = texel.r*rPower + texel.g*gPower + texel.b*bPower;", 
"gl_FragColor = vec4( vec3(gray),texel.w );"
```

这里所做的操作是：从传入的纹理中获取正确的像素。我们通过调用 `texture2D` 函数来实现这一点，该函数接收当前图像（`tDiffuse`）和要采样的像素位置（`vUv`）作为参数。返回的结果是一个纹素（texel，即纹理中的一个像素），其中包含颜色信息和透明度（`texel.w`）。接着，我们利用该纹素的 `r`、`g` 和 `b` 分量计算出一个灰度值，并将该灰度值赋给 `gl_FragColor` 变量——这个变量最终会被显示在屏幕上。至此，我们就完成了一个自定义着色器！它的使用方式与本章前面多次展示的方法一致。首先，我们需要像下面这样设置 `EffectComposer`：

```js
const effectCopy = new ShaderPass(CopyShader)
effectCopy.renderToScreen = true
const grayScaleShader = new ShaderPass(CustomGrayScaleShader)
const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader)
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
composer.addPass(grayScaleShader)
composer.addPass(gammaCorrectionShader)
composer.addPass(effectCopy)
```

我们在渲染循环中调用 `composer.render()`。如果希望在运行时动态修改该着色器的属性，只需更新我们之前定义的 `uniforms` 属性即可，如下所示：

```js
shaderPass.uniforms.rPower.value = ...;
shaderPass.uniforms.gPower.value = ...;
shaderPass.uniforms.bPower.value = ...;
```

效果可以在 `custom-shaders-scene.html` 中查看。下图展示了该示例：

### 创建自定义位着色器

通常，颜色是以24位值表示的，这给我们提供了大约1600万种不同的颜色。在计算技术的早期，这是不可能实现的，颜色往往以8位或16位来表示。使用这个着色器，我们可以自动将24位输出转换为4位颜色深度（或者任何你想要的深度）。

## 小结

在本章中，我们探讨了多种后期处理选项。正如你所见，创建 `EffectComposer` 并将多个通道（passes）串联起来实际上非常简单，但需要注意以下几点：并非所有通道都会直接输出到屏幕上。如果你需要将结果渲染到屏幕，可以始终使用带有 `CopyShader` 的 `ShaderPass`。向 `EffectComposer` 中添加通道的顺序非常重要，因为效果会按照该顺序依次应用。如果你想复用某个 `EffectComposer` 实例的渲染结果，可以使用 `TexturePass`。当你的 `EffectComposer` 中包含多个 `RenderPass` 时，请务必将除第一个之外的其他 `RenderPass` 的 `clear` 属性设为 `false`；否则，你只会看到最后一个 `RenderPass` 的输出。如果只想对特定对象应用某种效果，可以使用 `MaskPass`；完成遮罩操作后，记得使用 `ClearMaskPass` 清除遮罩。除了 Three.js 提供的标准通道外，还有大量内置的标准着色器可供使用，它们可与 `ShaderPass` 配合使用。使用 Three.js 的标准方法创建用于后期处理的自定义着色器非常简单——通常你只需编写一个片元着色器（fragment shader）即可。

至此，我们已经涵盖了 Three.js 核心部分几乎所有需要了解的内容。在第 12 章《为场景添加物理效果和声音》中，我们将介绍一个名为 Rapier.js 的库，你可以用它来为 Three.js 场景添加物理功能，例如碰撞检测、重力以及约束等效果。

# 12 向场景中添加物理效果和声音

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/a636d3c4fa7a7521e616705c08ff56fa/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1765963579&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=29fYyNEYqPPoiihaPQVFul3Rzig%3D)      

## 总结

在本章中，我们探讨了如何通过添加物理效果来扩展Three.js的基本3D功能。为此，我们使用了Rapier库，它允许你为场景和物体添加重力，使物体之间相互作用并在碰撞时反弹，并利用关节限制物体之间的相对运动。

此外，我们还向您展示了Three.js如何支持3D声音。我们创建了一个场景，您可以在其中使用THREE.PositionalAudio和THREE.AudioListener对象添加位置声。

尽管我们现已涵盖了Three.js提供的所有核心功能，但仍有两章专门介绍一些可与Three.js配合使用的外部工具和库。在下一章中，我们将深入探讨Blender，并了解如何利用Blender的功能，例如烘焙阴影、编辑UV贴图以及在Blender和Three.js之间交换模型。

# 13 使用Blender和Three.js进行工作

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/2faed3799c9a011adf897f5f4133150c/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766044528&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=1%2FGSybuSIezT2WquvqUCzV6xs9g%3D)      

Baking lightmaps and ambient occlusion maps in Blender，

在 Blender 中烘焙光照贴图和环境遮挡贴图

# 14 Three.js 与 React、TypeScript 和 Web-XR 一起使用

## 脑图

​        ![img](https://darwin-controller-pro.oss-cn-hangzhou.aliyuncs.com/c8fee48771477bea33085fbdcb86e392/mind/%E3%80%90%E8%84%91%E5%9B%BE%E3%80%91Learn%20Three.jpeg?Expires=1766019724&OSSAccessKeyId=LTAI5tBVMtznbk7xyCa56gof&Signature=0OkBZH6kgGAjbj%2Ff8ZfYesOn0Kk%3D)      

## 将 Three.js 与 TypeScript 结合使用

TypeScript 是一种带有类型系统的语言，可以编译（转译）为 JavaScript。这意味着你可以用它来开发网站，并且生成的代码在浏览器中运行起来与普通 JavaScript 完全一样。配置 TypeScript 项目的方式有很多，其中最简单的一种是由 Vite（https://vitejs.dev/）提供的。
Vite 提供了一个集成的构建环境，某种程度上可视为 webpack 的替代方案（我们在常规章节示例中使用的是 webpack）。

```bash
$ yarn add three
$ yarn add -D @types/three
```

## 使用 Three.js 和 React 与 TypeScript

创建项目

```bash
yarn create react-app lts-tf --template TypeScript

// or
yarn create vite lts-tf --template react-ts
```

在前面的示例中，我们实现了 React 与 Three.js 的简单集成。虽然这种方式可行，但以编程方式描述 Three.js 场景仍显得有些奇怪，因为在 React 中，通常采用声明式的方式通过组件来定义应用。我们可以像 ThreeCanvas 组件那样封装现有的 Three.js 组件，但很快就会变得复杂起来。幸运的是，Three.js fibers 项目已经完成了这项繁重的工作：https://r3f.docs.pmnd.rs/getting-started/introduction。在下一节中，我们将探讨借助这个项目，Three.js 和 React 能多么轻松地实现集成。

src\ThreeCanvas.tsx

```tsx
import { useCallback, useState } from 'react'
import * as THREE from 'three'

const initThreeJsScene = (node: HTMLDivElement) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0xffffff)
  renderer.setSize(500, 500)
  node.appendChild(renderer.domElement)

  camera.position.z = 5

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshNormalMaterial()
  const cube = new THREE.Mesh(geometry, material)

  scene.add(cube)

  const animate = () => {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }

  animate()
}

export const ThreeCanvas = () => {
  const [initialized, setInitialized] = useState(false)

  const threeDivRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null && !initialized) {
        initThreeJsScene(node)
        setInitialized(true)
      }
    },
    [initialized]
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
      ref={threeDivRef}
    ></div>
  )
}
```

在initThreeJsScene中，你可以找到使用TypeScript初始化一个简单Three.js场景的标准代码。要将这个Three.js场景连接到React，我们可以使用ThreeCanvas函数式React组件中的代码。我们希望在div元素被附加到其父节点时初始化Three.js场景。为此，我们可以使用useCallback函数。该函数仅在该节点被附加到父节点时调用一次，即使父节点的某个属性发生变化，也不会重新运行。在我们的例子中，我们还会添加另一个isInitialized状态，以确保即使开发服务器重新加载应用程序的部分内容，我们也只初始化一次Three.js场景。

> **useRef 或 useCallback**
>
> 你可能会想在这里使用useRef。在https:// reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node 上有一篇很好的解释，说明了为什么在这种情况下，你应该使用useCallback而不是useRef，以避免不必要的重新渲染。

如何测量一个 DOM 节点？

一种基本的测量 DOM 节点位置或尺寸的方法是使用回调 ref（callback ref）。每当该 ref 被挂载到不同的节点上时，React 都会调用这个回调函数。下面是一个小示例：

```jsx
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>上方标题的高度为 {Math.round(height)} 像素</h2>
    </>
  );
}
```

在这个例子中，我们没有选择使用 `useRef`，因为对象形式的 ref 不会在当前 ref 值发生变化时通知我们。而使用回调 ref 可以确保：即使子组件稍后才渲染出被测量的节点（例如响应一次点击事件），父组件仍然能收到通知，并更新测量结果。

注意，我们在 `useCallback` 中传入了空依赖数组 `[]`。这可以确保我们的 ref 回调函数在组件重新渲染之间不会发生变化，从而避免 React 不必要地多次调用它。

在此示例中，回调 ref 仅在组件挂载和卸载时被调用，因为所渲染的 `<h1>` 元素在整个重新渲染过程中始终存在。如果你希望在组件尺寸发生变化时都能收到通知，可以考虑使用 `ResizeObserver`，或者基于它构建的第三方 Hook。

如果你愿意，还可以将上述逻辑提取为一个可复用的自定义 Hook：

```jsx
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>上方标题的高度为 {Math.round(rect.height)} 像素</h2>
      }
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```

**问题：为什么运行时，浏览器页面中有两个相同的canvas呢？**

在开发模式下，React 的 <StrictMode> 会故意渲染组件两次（包括其副作用，如初始化 Three.js 场景），以帮助检测潜在的不纯副作用。这导致 initThreeJsScene 函数被调用两次，从而在页面上创建了两个相同的 canvas。

要解决这个问题，你可以移除 <StrictMode> 包装器（在 main.tsx 中），但请注意，这可能会隐藏一些开发时的警告。在生产环境中，StrictMode 不会导致双重渲染。

如果你需要保留 StrictMode，可以在 initThreeJsScene 中添加检查，确保只初始化一次，即使在 StrictMode 下。

## 使用 Three.js 和 React Three Fiber

在之前的示例中，我们自己设置了 React 和 Three.js 之间的集成。虽然这种方法可行，但它与 React 的工作方式并未紧密集成。为了实现这些框架之间的良好集成，我们可以使用 React Three Fiber。我们将再次从设置一个项目开始。

为此，请运行以下命令：

```bash
yarn create vite lts-r3f --template react
```

安装依赖

```bash
yarn add three @react-three/fiber @react-three/drei
```



https://docs.pmnd.rs/react-three-fiber/getting-started/introduction

`'@react-three/fiber'`

https://github.com/pmndrs/drei

`'@react-three/drei'`

API文档：https://drei.docs.pmnd.rs/getting-started/introduction



React Three Fiber 和 drei 库提供了与普通 Three.js 库几乎完全相同的所有功能（甚至还提供了一些普通 Three.js 库中没有的功能）。如果你正在使用 React 并且需要集成 Three.js，这是一种很棒的使用 Three.js 的方式。即使你并不一定在构建 React 应用程序，React Three Fiber 提供的声明式场景、组件和交互定义方式也非常直观。React Three Fiber 为你想要创建的任何 Three.js 可视化效果提供了一个绝佳的替代方案。

## Three.js 和 VR

## Three.js 和 AR

## 总结

在本章中，我们探讨了与Three.js相关的一些技术。我们向您展示了将Three.js与TypeScript和React集成的不同方法，还向您展示了如何创建一些基本的AR和VR场景。

通过使用 Three.js TypeScript 绑定，您可以轻松地从您的 TypeScript 项目访问所有 Three.js 功能。此外，通过 React Three Fiber 库，将 Three.js 与 React 集成变得轻而易举。

在Three.js中使用VR和AR也非常简单。只需向主渲染器添加几个属性，就能快速将任何场景转换为VR或AR场景。别忘了使用浏览器插件，以便轻松测试你的场景，而无需实际的VR和AR设备。

至此，本书就到此结束了。希望你喜欢阅读本书，并乐于尝试书中的示例。祝你实验愉快！