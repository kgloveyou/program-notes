# **Three.js and TypeScript**

https://sbcode.net/threejs/

## Install the Three.js Typescript Boilerplate

```sh
git clone https://github.com/Sean-Bradley/Three.js-TypeScript-Boilerplate.git
cd Three.js-TypeScript-Boilerplate
npm install
npm run dev
```

## Dat GUI

https://sbcode.net/threejs/dat-gui/

安装依赖

```bash
npm install dat.gui --save-dev
npm install @types/dat.gui --save-dev
```

引用

```typescript
import { GUI } from 'dat.gui'
```

## Object3D Hierarchy

https://sbcode.net/threejs/object-hierarchy/

获取 Object3D 变换，例如位置、旋转/四元数和比例，将返回局部变换空间中的值。 如果 Object3D 是场景的直接后代，那么世界空间值将是相同的。

如果你的 Object3D 是另一个已经是场景子级的 Object3D 的子级，那么世界变换值也将考虑其父级、祖父母、曾祖父母等的变换。



要获得对象的世界变换，

```typescript
const objectsWorldPosition = new THREE.Vector3()
object.getWorldPosition(objectsWorldPosition)

const objectsWorldDirection = new THREE.Vector3()
object.getWorldDirection(objectsWorldDirection)

const objectsWorldQuaternion = new THREE.Quaternion()
object.getWorldQuaternion(objectsWorldQuaternion)

const objectsWorldScale = new THREE.Vector3()
object.getWorldScale(objectsWorldScale)
```

## Geometries

https://sbcode.net/threejs/geometries/



## Updating THREE.Geometry to THREE.BufferGeometry

https://sbcode.net/threejs/geometry-to-buffergeometry/

> BufferGeometry is a more efficient way of representing meshes since it stores the data as typed arrays.

## Materials

https://sbcode.net/threejs/materials/

## MeshBasicMaterial

## MeshNormalMaterial

## MeshLambertMaterial

在本讲座中，我们使用 Three.js MeshLambertMaterial 进行实验。

朗伯反射率是定义理想无光泽或漫反射表面的属性。

例子可以是木头或石头。 通常物体不发光，但仍受光照影响。

## MeshPhongMaterial

在本次讲座中，我们使用 Three.js MeshPhongMaterial 进行实验。

它使用 Blinn-Phong 反射模型，

它可用于模拟闪亮的物体，例如抛光的木头。

它比 MeshLambertMaterial、MeshNormalMaterial 和 MeshBasicMaterial 的计算成本更高，因此如果需要考虑性能，那么你可以选择仅在必要时使用它。

## MeshStandardMaterial

在本讲座中，我们使用 Three.js MeshStandardMaterial 进行实验。

它使用基于物理的渲染 (PBR) 模型。

它创建的外观比 MeshLambertMaterial 或 MeshPhongMaterial 更逼真。 它的计算成本也更高。

## MeshPhysicalMaterial

在本次讲座中，我们使用 Three.js MeshPhysicalMaterial 进行实验。

它是 MeshStandardMaterial 的扩展，提供更多反射率选项。

## MeshMatcapMaterial

在本讲座中，我们使用 Three.js MeshMatcapMaterial 进行实验。

MatCap（材质捕获）着色器使用球体图像作为视图空间环境贴图。 图像包含预烘焙的颜色和阴影。

## MeshToonMaterial

Toon shading 或 Cel shading 是一种非真实感渲染技术，旨在通过使用较少的阴影颜色而不是平滑的渐变效果来使 3D 计算机图形看起来更卡通化。

## SpecularMap（高光贴图）

SpecularMap 是一个纹理图像，它影响 MeshLambertMaterial 和 MeshPhongMaterial 材质上的镜面高光。

要调整镜面高光的强度，请在 MeshPhongMaterial 上使用镜面反射和光泽度属性。

同样在 MeshPhongMaterial 上，要调整环境贴图强度，请使用材质反射率属性。

# RoughnessMap and MetalnessMap（粗糙度贴图和金属度贴图）

roughnessMap 和 metalnessMap 是 MeshStandardMaterial 和 MeshPhysicalMaterial 材质的 specularMap 等效项。

## BumpMap（凹凸贴图）

## NormalMap（法线贴图）

比凹凸贴图更令人印象深刻的是法线贴图。
法线贴图使用图像的 rgb 值来影响光照。

它还模拟与灯光相关的感知深度，但使用不同的算法来指示在上/下和左/右方向上改变照明的程度。

使用 `normalScale` 属性来改变感知深度。 `normalScale` 需要一个 `THREE.Vector2`。 通常， `normalScale` 的 `x,y` 值将介于 `0` 和 `1.0` 之间。 在我的示例中，我的值高达 `10`，以使其更加极端。

下面是用作法线贴图的图像。

## DisplacementMap

位移贴图是可用于改变网格几何形状的图像。 每个像素的值用于改变网格顶点的位置。

使用位移贴图时，请确保你使用的网格几何体（例如平面）具有许多顶点。 位移贴图正在修改顶点。 拥有的顶点越多，位移的细节就越详细。

出现了DEM的效果（*）



[置换贴图也常作为高度图来生成地形，并结合凹凸贴图实现丰富的地形效果。](https://zhuanlan.zhihu.com/p/260973533?utm_medium=social&utm_oi=726478653495468032)

## DisplacementMap with NormalMap

添加法线贴图可以得到更好的结果。

与上一页中的位移贴图相比，此示例使用的是 [MeshPhongMaterial](https://sbcode.net/threejs/meshphongmaterial/)。

出现了DEM的效果（*）

https://sbcode.net/extra_html/displacement_and_normal_maps.html

## Material Repeat and Center

可以通过更改其 UV 坐标来更改材质纹理位于几何体上的位置。 它也可以被拉伸、重复、旋转和偏移。

在本视频中，我演示了通过使用`repeat`和 `center` 材质选项更改纹理 UV 坐标来放大我们的 3D 世界平面。

https://sbcode.net/extra_html/materialrepeatcenter.html

开启了 `wireframe`，有 Delauny 三角网的效果。

材质(Material) 的几个属性值：

### .alphaTest : Float

设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为**0**。



AlphaTest —— Alpha 测试，是阻止片元被写到屏幕上的最后机会。

在最终渲染出的颜色被计算出来之后，可以通过将颜色的透明度，和一个固定值进行比较。

```
如果该颜色 的透明度 alpha，满足条件，则通过测试，绘制此片元；否则丢弃此片元，不进行绘制。
```



### .depthTest : Boolean

是否在渲染此材质时启用深度测试。默认为 **true**。

[深度测试](https://learnopengl-cn.readthedocs.io/zh/latest/04%20Advanced%20OpenGL/01%20Depth%20testing/)

### .depthWrite : Boolean

渲染此材质是否对深度缓冲区有任何影响。默认为**true**。

在绘制2D叠加时，将多个事物分层在一起而不创建z-index时，禁用深度写入会很有用。

## Texture Mipmaps

### 描述

Mipmapping 是一种基于每个纹理应用的纹理渲染技术。

当启用 mipmapping（默认）时，GPU 将使用不同大小的纹理版本来渲染表面，具体取决于它与相机的距离。

### Magnification Filters

定义当被纹理化的像素映射到小于或等于一个纹理元素 (texel) 的区域时要使用的纹理放大功能。

```js
texture.magFilter =
```

- THREE.NearestFilter
- THREE.LinearFilter (Default)

### Minification Filters

定义当被纹理化的像素映射到大于一个纹理元素 (texel) 的区域时使用的纹理缩小函数。

```
texture.minFilter =
```

- THREE.NearestFilter
- THREE.NearestMipmapNearestFilter
- THREE.NearestMipmapLinearFilter
- THREE.LinearFilter
- THREE.LinearMipmapNearestFilter
- THREE.LinearMipmapLinearFilter (Default)

创建两个场景

```ts
function render() {
    renderer.setScissorTest(true)

    renderer.setScissor(0, 0, window.innerWidth / 2 - 2, window.innerHeight)
    renderer.render(scene1, camera)

    renderer.setScissor(
        window.innerWidth / 2,
        0,
        window.innerWidth / 2 - 2,
        window.innerHeight
    )
    renderer.render(scene2, camera)

    renderer.setScissorTest(false)
}
```

其中，

- setScissor ( x : Integer, y : Integer, width : Integer, height : Integer ) : undefined

将剪裁区域设为(x, y)到(x + width, y + height) Sets the scissor area from

- setScissorTest ( boolean : Boolean ) : undefined

启用或禁用剪裁检测. 若启用，则只有在所定义的裁剪区域内的像素才会受之后的渲染器影响。

## Custom Mipmaps

你可以根据与相机的距离以及是否需要缩小或放大纹理像素来创建自己的自定义 mipmap，以便在绘制纹理像素时使用。

```js
const mipmap = (size: number, color: string) => {
    const imageCanvas = document.createElement('canvas') as HTMLCanvasElement
    const context = imageCanvas.getContext('2d') as CanvasRenderingContext2D
    imageCanvas.width = size
    imageCanvas.height = size
    context.fillStyle = '#888888'
    context.fillRect(0, 0, size, size)
    context.fillStyle = color
    context.fillRect(0, 0, size / 2, size / 2)
    context.fillRect(size / 2, size / 2, size / 2, size / 2)
    return imageCanvas
}

const blankCanvas = document.createElement('canvas') as HTMLCanvasElement
blankCanvas.width = 128
blankCanvas.height = 128

const texture1 = new THREE.CanvasTexture(blankCanvas)
texture1.mipmaps[0] = mipmap(128, '#ff0000')
texture1.mipmaps[1] = mipmap(64, '#00ff00')
texture1.mipmaps[2] = mipmap(32, '#0000ff')
texture1.mipmaps[3] = mipmap(16, '#880000')
texture1.mipmaps[4] = mipmap(8, '#008800')
texture1.mipmaps[5] = mipmap(4, '#000088')
texture1.mipmaps[6] = mipmap(2, '#008888')
texture1.mipmaps[7] = mipmap(1, '#880088')
texture1.repeat.set(5, 5)
texture1.wrapS = THREE.RepeatWrapping
texture1.wrapT = THREE.RepeatWrapping

const texture2 = texture1.clone()
texture2.minFilter = THREE.NearestFilter
texture2.magFilter = THREE.NearestFilter

const material1 = new THREE.MeshBasicMaterial({ map: texture1 })
const material2 = new THREE.MeshBasicMaterial({ map: texture2 })

const plane1 = new THREE.Mesh(planeGeometry1, material1)
const plane2 = new THREE.Mesh(planeGeometry2, material2)

scene1.add(plane1)
scene2.add(plane2)
```

## Anistropic Filtering

各向异性过滤

各向异性过滤允许我们提高 MIP 贴图的质量。

```ts
const gui = new GUI()
const textureFolder = gui.addFolder('THREE.Texture')
textureFolder
    .add(texture2, 'minFilter', options.minFilters)
    .onChange(() => updateMinFilter())
textureFolder
    .add(texture2, 'magFilter', options.magFilters)
    .onChange(() => updateMagFilter())
textureFolder
    .add(texture2, 'anisotropy', 1, renderer.capabilities.getMaxAnisotropy())
    .onChange(() => updateAnistropy())
textureFolder.open()

function updateAnistropy() {
    // for Three r137 and earlier
    // texture2.needsUpdate = true

    // for Three r138 and later
    material2.map = texture2.clone()
}
```

## Lights

### 描述

Threejs中有各种各样的光源。

它们都从 THREE.Light 基类扩展而来，而后者又从 Object3D 基类扩展而来。

基类属性

- 颜色

- 强度

- isLight（只读）

  光源为你提供了更多选项来更改场景中网格的外观。 网格需要添加材料才能使光照调整生效。

如果场景没有光源，大多数材质将不可见。 [MeshBasicMaterial](https://sbcode.net/threejs/meshbasicmaterial/)、[MeshNormalMaterial](https://sbcode.net/threejs/meshnormalmaterial/) 和 [MeshMatcapMaterial](https://sbcode.net/threejs/meshmatcapmaterial/) 是自发光的，因此它们不需要在场景中可见光照，但大多数其他材质都需要，例如 [MeshLambertMaterial](https://sbcode.net/threejs/meshlambertmaterial/)、[MeshPhongMaterial](https://sbcode.net/threejs/meshphongmaterial/)、[MeshStandardMaterial](https://sbcode.net/threejs/meshstandardmaterial/)、[MeshPhysicalMaterial](https://sbcode.net/threejs/meshphysicalmaterial/) 和 [MeshToonMaterial](https://sbcode.net/threejs/meshtoonmaterial/)。

在接下来的示例中，我将演示不同的光照如何影响不同的材质。

## Ambient Light

### 描述

- 平等地照亮场景中的所有对象，除了 MeshBasicMaterial、MeshNormalMaterial 和 MeshMatcapMaterial 等自发光对象。
- 不投射阴影。
- 光线在所有方向和距离上均等地传播。 因此，将灯光与 [0, 0, 0] 的默认位置不同的位置没有任何区别。
- 材质不会根据几何法线显示阴影，也不会产生镜面反射效果，因此如果其他网格前面的网格具有相同的材质甚至是单一颜色贴图纹理，则它们将不可见。

## Directional Light

### 描述

将平行光想象为 `OrthographicCamera`，而不是 `PerspectiveCamera`。 来自 `DirectionalLight` 的光线在方向上是平行的。

## Hemisphere Light（半球光）

Threejs 半球光非常像平行光，但也可以设置以反向投射光线。 我还演示了半球光辅助对象。

## Point Light（点光源）

从一个点向各个方向发出的光

- distance - 光源的最大范围。 默认值为 0（无限制）。
- 衰减 - 光沿着光的距离变暗的量。 默认值为 1。

## Spot Light

## Spot Light Shadow

## Directional Light Shadow

Directional Light Shadow 使用 OrthographicCamera 来计算阴影，而不是 PerspectiveCamera。 这是因为来自 DirectionalLight 的光线是平行的。

## DisplacementMap with Shadow

从 Three r132 开始，置换贴图现在支持自阴影。 确保你的网格（例如平面）同时投射和接收阴影。 如果你看到阴影伪影，你将需要管理 light.shadow.bias。

此示例使用带有 [MeshStandardMaterial]() 的平行光阴影

## Orbit Controls

Orbit controls allow the camera to orbit around a target.

## Trackball Controls

TrackballControls 类似于 OrbitControls。 但是，它不保持恒定的相机向上矢量。 这意味着相机可以绕过它的极地极端（ polar extremes）。 它不会翻转以保持右侧向上。

https://sbcode.net/extra_html/trackballcontrols.html

## PointerLockControls

PointerLockControls 实现了内置的浏览器指针锁定 API。 它提供基于鼠标随时间移动的输入方法（即增量），而不仅仅是鼠标光标在视口中的绝对位置。 它使你可以访问原始鼠标移动，将鼠标事件的目标锁定到单个元素，消除对鼠标在单个方向上移动距离的限制，并从视图中移除光标。 例如，它非常适合第一人称 3D 游戏。

代码中，添加了W、A、S、D键监听，用来移动。

```ts
const onKeyDown = function (event: KeyboardEvent) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(0.25)
            break
        case 'KeyA':
            controls.moveRight(-0.25)
            break
        case 'KeyS':
            controls.moveForward(-0.25)
            break
        case 'KeyD':
            controls.moveRight(0.25)
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)
```

该类的实现是基于[Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)的。 对于第一人称3D游戏来说， PointerLockControls 是一个非常完美的选择。

## DragControls

用于为场景中的对象提供拖放交互。

https://sbcode.net/extra_html/dragcontrols.html

```typescript
const controls = new DragControls(cubes, camera, renderer.domElement)
```

## Transform Controls

允许你更改场景中对象的变换。

你将控件附加到对象，然后将控件添加到场景中，以便交互句柄可见。

然后你可以在场景中重新缩放、旋转和定位对象。

```typescript
const controls = new TransformControls(camera, renderer.domElement)
controls.attach(cube)
scene.add(controls)
```

## OBJ Model Loader

```typescript
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false })

const objLoader = new OBJLoader()
objLoader.load(
    'models/cube.obj',
    (object) => {
        // (object.children[0] as THREE.Mesh).material = material
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         (child as THREE.Mesh).material = material
        //     }
        // })
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
```

## MTL Loader

MTL 是 OBJ 文件使用的材质信息。 你可以设置颜色、高光（specular）、自发光、alpha、平滑度、图像贴图和坐标。

由于默认是[MeshPhongMaterial](https://sbcode.net/threejs/meshphongmaterial/)，我们只能设置影响meshPhongMaterial的属性。

如果你使用 Blender 创建你的 OBJ 和 MTL，那么你可以更改

- Base Color
- Specular
- Emission
- Alpha
- Smooth/Flat Shaded



```typescript
const mtlLoader = new MTLLoader()
mtlLoader.load(
    'models/monkey.mtl',
    (materials) => {
        materials.preload()

        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(
            'models/monkey.obj',
            (object) => {
                scene.add(object)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log('An error happened')
            }
        )
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log('An error happened')
    }
)
```

## GLTF Model Loader

用于将 [glTF](https://www.khronos.org/gltf/) 模型加载到 Threejs 场景中的加载器。

glTF 是一种用于高效传输和加载 3D 场景和模型的规范。

glTF 最小化了 3D 资产的大小，以及解压和使用这些资产所需的运行时处理。

一个 glTF 文件可能包含一个或多个场景、网格、材质、纹理、皮肤、骨架、变形目标、动画、灯光和相机。

资产可以 JSON (.gltf) 或二进制 (.glb) 格式提供。

```typescript
const loader = new GLTFLoader()
loader.load(
    'models/monkey.glb',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                const m = child as THREE.Mesh
                m.receiveShadow = true
                m.castShadow = true
            }
            if ((child as THREE.Light).isLight) {
                const l = child as THREE.Light
                l.castShadow = true
                l.shadow.bias = -0.003
                l.shadow.mapSize.width = 2048
                l.shadow.mapSize.height = 2048
            }
        })
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
```

## DRACO Loader

DRACO 加载器用于加载用 Draco 库压缩的几何图形。

Draco 是一个开源库，用于压缩和解压缩 3D 网格和点云。

glTF 文件也可以使用 DRACO 库进行压缩，也可以使用 glTF 加载器进行加载。 在这种情况下，我们可以将 glTF 加载器配置为使用 DRACOLoader 来解压文件。

压缩后的几何图形可以小得多，但代价是客户端浏览器上的额外解码时间。

https://github.com/google/draco

## Textured GLTF

在本视频中，我演示了向 glTF 模型添加纹理并修改其 UV 坐标。 默认情况下，当你从 blender 导出纹理时，纹理会嵌入到模型中。 与使用 OBJ 和 MTL 相比，这使得创建和使用纹理模型更容易。

```js
const loader = new GLTFLoader()
loader.load(
    'models/monkey_textured.glb',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                const m = child as THREE.Mesh
                m.receiveShadow = true
                m.castShadow = true
            }
            if ((child as THREE.Light).isLight) {
                const l = child as THREE.Light
                l.castShadow = true
                l.shadow.bias = -0.003
                l.shadow.mapSize.width = 2048
                l.shadow.mapSize.height = 2048
            }
        })
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
```

## PLY Model Loader

## STL Model Loader

STL 模型格式广泛用于快速原型制作、3D 打印和计算机辅助制造。

STL 文件仅描述 3D 对象的表面几何形状，没有任何颜色、纹理或其他常见 3D 建模属性的表示。

## FBX Model Loader

FBX 格式用于提供数字内容创建应用程序和游戏引擎（如 Blender、Maya、Autodesk、Unity、Unreal 等）之间的互操作性。 它支持许多功能，例如 3D 模型、场景层次结构、材质、照明、动画、骨骼等等。

## FBX Animations

在本练习中，我们导入了一个不同的 FBX 模型，并且我们还为该模型导入了几个动画剪辑。 然后，我们创建按钮以在每个动画剪辑之间平滑过渡模型。

## GLTF Animations

在本课中，我们将创建与 FBX 动画课中创建的项目等效的 GLTF。

我们使用 Blender 将主要的 FBX 模型及其相关动画文件转换为 GLB 文件。

## GLTF Custom Animations

我们不需要从其他网站下载动画，我们可以创建自己的。

使用 Blender，你可以创建模型，然后通过在时间线编辑器上创建关键帧来调整其部件的位置、比例和旋转。

使用 Blender 中时间线编辑器上的播放选项来测试你的动画作品，然后将你的模型导出为 GLB（首选）或 GLTF，并为导出选择动画选项。

导出模型后，你可以将 GLB/GLTF 文件从文件系统拖到下面的示例场景中。 它将读取文件并为它找到的每个动画剪辑创建一个新的复选框。 你可以单独启用/禁用每个动画。

## 带有 GLTF 动画的 DragControls

使用动画导出的 GLTF 模型通常不适用于 DragControl，因此解决该问题的一种方法是创建一个辅助对象，例如立方体，并将 DragControl 绑定到该对象。 然后将模型组的位置调整到被拖动立方体的新位置。

在此示例中，你可以使用 DragControls 拖动动画 GLTF 模型。

https://sbcode.net/extra_html/dragcontrols-animated-gltf.html

拳击游戏角色，可以拖动到场景的不同位置。

### 资源

对于这个例子，我已经下载了 Eve By J.Gonzales 模型，其中包含拳击动画。 在 [Mixamo](https://www.mixamo.com/) 中，我选择了 Eve 角色，然后选择了动画选项卡并选择了 Punching 动画。

## TransformControls with GLTF Animations

这是一个使用变换控件操作动画 GLTF 的示例。

在本例中，你可以变换动画模型的位置、旋转和大小。

https://sbcode.net/extra_html/transformcontrols-animated-gltf.html

拳击游戏角色，可以平移、旋转和缩放角色。

## Reflector（反射器）

包含在 Threejs 示例子文件夹中的 Reflector 对象可用于创建镜像。

下面的示例使用带有多个镜像的 [GLTF 动画扩展 DragControls](https://sbcode.net/threejs/gltf-animations-drag/)。

反射器对象将仅在一个方向上镜像。 如果要创建无限远镜，可以在现有反射器前面放置另一个反射器，但在它前面放置一段距离并背对第一个反射器。 反射器只会反映它们在当前渲染过程中看到的内容。 所以一开始你不会得到逼真的无限镜效果。 由于反射器仅在一个方向反射，因此你可以将另一个反射器串联放置在现有反射器后面，你将在另一个反射器中获得三次反射，反射回串联放置的其他两个反射器。 在上面的示例中，我有 4 个反射器，它们都互相看着。 2个向前看，2个向后看。 并且都在不同的距离。 请注意，使用此技术创建无限镜将需要更多 CPU 用于添加到场景中的每个新反射器。

## CubeCamera Reflections

CubeCamera 对象可用于在体积对象（例如球体、立方体和其他对象）上创建更逼真的反射。

https://sbcode.net/extra_html/cubecamera.html

实现球体反射环境的倒影。

pivot：枢，旋转。

## CubeCamera Refractions

`THREE.CubeCamera` 对象也可用于创建逼真的折射效果。

使用 `THREE.CubeCamera` 进行折射时的额外注意事项是，

- 将 `CubeRenderTargets texture.mapping` 设置为 `THREE.CubeRefractionMapping`
- 将 `refractionRatio` 属性添加到你的材质中

https://sbcode.net/extra_html/cubecamera-refractions.html