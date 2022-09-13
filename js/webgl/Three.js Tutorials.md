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