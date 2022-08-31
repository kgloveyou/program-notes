# Three.js模块引入

r143 vs r95

```js
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import Stats  from 'three/examples/jsm/libs/stats.module';
import Stats from 'three/examples/js/libs/stats.min.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries'
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils.js'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';
```

移除的模块

`THREE.Face3`

从修订版 126 开始，Face3 构造函数已在 three.js 中删除。（https://dustinpfister.github.io/2018/05/11/threejs-face3/）

`THREE.Geometry()`

The [Face3 constructor has been removed](https://github.com/mrdoob/three.js/pull/21161) in [three.js](https://threejs.org/) as of [revision 126](https://github.com/mrdoob/three.js/releases/tag/r126). Before that change the Face3 Constructor was used to define a Face when making a custom geometry with the [Geometry Constructor](https://dustinpfister.github.io/2018/04/14/threejs-geometry/) which has also been removed as of revision 125. It might still be possible to get the old geometry constructor working on new versions of threejs, but it would be best to make custom geometries with the [Buffered Geometry](https://dustinpfister.github.io/2021/04/22/threejs-buffer-geometry/) constructor when it comes to making use of late versions of threejs.

Moved `Geometry` to `examples/jsm/deprecated`.
Moved `DirectGeometry` inside of `Geometry` and added `toBufferGeometry()` in `Geometry`.

- THREE.CubeGeometry

替换为 THREE.BoxGeometry

r65 → r66

- Renamed `CubeGeometry` to `BoxGeometry`.

r97 → r98

- `CanvasRenderer` has been removed.

# 第3方模块引入

```sh
$ npm install --save dat.gui

// ES6:
import * as dat from 'dat.gui';
```

