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