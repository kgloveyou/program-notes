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