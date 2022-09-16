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

如果您的 Object3D 是另一个已经是场景子级的 Object3D 的子级，那么世界变换值也将考虑其父级、祖父母、曾祖父母等的变换。



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

它比 MeshLambertMaterial、MeshNormalMaterial 和 MeshBasicMaterial 的计算成本更高，因此如果需要考虑性能，那么您可以选择仅在必要时使用它。

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

使用位移贴图时，请确保您使用的网格几何体（例如平面）具有许多顶点。 位移贴图正在修改顶点。 拥有的顶点越多，位移的细节就越详细。

出现了DEM的效果（*）



[置换贴图也常作为高度图来生成地形，并结合凹凸贴图实现丰富的地形效果。](https://zhuanlan.zhihu.com/p/260973533?utm_medium=social&utm_oi=726478653495468032)

## DisplacementMap with NormalMap

添加法线贴图可以得到更好的结果。

与上一页中的位移贴图相比，此示例使用的是 [MeshPhongMaterial](https://sbcode.net/threejs/meshphongmaterial/)。

出现了DEM的效果（*）