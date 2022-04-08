

>[云图三维 连接你·创造的世界](http://yuntucad.com) 致力于打造国内第一家集查看、建模、装配和渲染于一体的“云端CAD”协作设计平台。

应读者的要求，希望我们成立一个专业的、面向成渝地区的前端开发人员的webgl、Threejs行业QQ交流群，便于大家讨论问题。群里有研究webgl、Threejs大佬哦，欢迎大家加入！——点击链接加入群聊【three.js/webgl重庆联盟群】：[jq.qq.com/?_wv=1027&k…](https://link.juejin.cn?target=https%3A%2F%2Fjq.qq.com%2F%3F_wv%3D1027%26k%3DpX9BUnzn "https://link.juejin.cn?target=https%3A%2F%2Fjq.qq.com%2F%3F_wv%3D1027%26k%3DpX9BUnzn")




后置处理通常是指应用到`2D`图像上的某种特效或者是滤镜。在`ThreeJs`的场景中，我们有由很多网格`(mesh)`构成的场景`(scene)`渲染成的`2D`图像。一般来说，图像被直接渲染成`canvas`，然后在浏览器中展示，然而在结果被输出到canvas之前，我们也可以通过另外的一个`render target`并应用一些后置效果。这被称为`Post Processing`，因为它发生在主场景渲染过程之后。

## Pass对象
后置处理的实例，比如 Instagram 的滤镜，photoshop的滤镜。ThreeJs同样拥有后置处理管道。

工作方式是你需要创建`EffectComposer`然后增加一些`Pass`对象。每一个`Pass`阶段都可以增加一些后置处理特效，添加小插图，模糊，添加光晕，添加噪点，调整色相，饱和度，对比度等等。最终把效果渲染到canvas。

理解`EffectComposer`是如何工作的是有一点重要的。它创建两个render targets，我们称他们为**rtA**和**rtB**，然后调用`EffectComposer.addPass`按照想要应用的顺序增加`pass`。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72e5c86a5f78437b8a9503920f3c7c65~tplv-k3u1fbpfcp-watermark.image?)

首先 你传入`RenderPass`的场景被渲染到rtA，不管rta的内容是啥，它继续向下一个`pass`传递。下一个`pass`将它作为输入做一些操作然后将其写入到rtB。然后rtB传到下一个`pass`，将rtB作为输入作一些操作然后在写回rtA。这个过程在整个pass过程中持续发生。
每个`pass`都有4个基础选项：

enabled
→ 是否使用这个`pass`

needsSwap
→ 完成这个`pass`后是否交换rtA和rtB

clear
→ 在渲染这个`pass`之前是否需要清除

renderToScreen
→ 是否将当前的内容渲染到画布上
## Start
第一步，我们创建一个`EffectComposer`

```js
import * as THREE from 'THREE'
const composer = new THREE.EffectComposer(renderer);
```
然后，作为第一个`pass`，我们添加一个`RenderPass`，它会将我们的场景scene和我们的相机camera渲染到第一个渲染目标。


```js
composer.addPass(new THREE.RenderPass(scene, camera));
```
接下来，我们添加一个`BloomPass`。`BloomPass`将它的输入放入一个通常来说更小的`render target`然后对这个结果的表面进行模糊处理。这使得scene产生辉光效果。
```js
-   const bloomPass = new THREE.BloomPass(
-   1, // strength
-   25, // kernel size
-   4, // sigma ?
-   256, // blur render target resolution
-   );
-   composer.addPass(bloomPass);
```
最后,我们用`FilmPass`来添加噪点和扫描线。
```js
-   const filmPass = new THREE.FilmPass(
-   0.35, // noise intensity
-   0.025, // scanline intensity
-   648, // scanline count
-   false, // grayscale
-   );
-   filmPass.renderToScreen = true;
-   composer.addPass(filmPass);
```
由于filmPass是最后一次传递，我们将其`renderToScreen`属性设置为true来告诉它渲染到画布。如果不设置它，它将渲染到下一个渲染目标。

对于几乎所有的后期处理EffectComposer，RenderPass 都是必需的。我们需要做的最后一件事是使用`EffectComposer.render` 替代 `WebGLRenderer.render` 并告诉EffectComposer来匹配画布的大小

```diff
-   function render(now) {
-   time *= 0.001;
+   let then = 0;
+   function render(now) {
+   now *= 0.001; // convert to seconds
+   const deltaTime = now - then;
+   then = now;
  
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth /   canvas.clientHeight;
    camera.updateProjectionMatrix();
+   composer.setSize(canvas.width, canvas.height);
   }
    
    cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
-   const rot = time * speed;
+   const rot = now * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });
   
-   renderer.render(scene, camera);
+   composer.render(deltaTime);
    
   requestAnimationFrame(render);
  }
```
`EffectComposer.render` 需要花费`deltaTime`自最后一帧渲染后的数秒时间。如果任何一个有动画，它将各种效果传递下去。在这个示例中`FilmPass`被动画化了。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    html,
    body {
      height: 100%;
      margin: 0;
    }

    #c {
      width: 100%;
      height: 100%;
      display: block;
    }
  </style>
</head>

<body>
  <canvas id="c"></canvas>
  <script>
    import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
    import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/EffectComposer.js';
    import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/RenderPass.js';
    import { BloomPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/BloomPass.js';
    import { FilmPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/FilmPass.js';

    function main() {
      const canvas = document.querySelector('#c');
      const renderer = new THREE.WebGLRenderer({ canvas });
      const fov = 75;
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2;
      const scene = new THREE.Scene();
      {
        const color = 0xFFFFFF;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = x;
        return cube;
      }
      const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
      ];
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new BloomPass(
        1,    // strength
        25,   // kernel size
        4,    // sigma ?
        256,  // blur render target resolution
      );
      composer.addPass(bloomPass);
      const filmPass = new FilmPass(
        0.35,   // noise intensity
        0.025,  // scanline intensity
        648,    // scanline count
        false,  // grayscale
      );
      filmPass.renderToScreen = true;
      composer.addPass(filmPass);
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
      let then = 0;
      function render(now) {
        now *= 0.001;
        const deltaTime = now - then;
        then = now;
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          composer.setSize(canvas.width, canvas.height);
        }
        cubes.forEach((cube, ndx) => {
          const speed = 1 + ndx * .1;
          const rot = now * speed;
          cube.rotation.x = rot;
          cube.rotation.y = rot;
        });
        composer.render(deltaTime);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    }
    main();
  </script>
</body>

</html>
```
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3505921af2b4da897746e6c9db35490~tplv-k3u1fbpfcp-watermark.image?)
[查看实例](https://threejsfundamentals.org/threejs/threejs-postprocessing.html)

要在运行时更改效果参数，通常需要设置统一的值。让我们添加一个GUI来调整一些参数。为了您可以轻松调整哪些值以及如何调整它们您需要深入了解该效果的代码。
```js
import { GUI } from '../3rdparty/dat.gui.module.js';

bloomPass.copyUniforms.opacity.value = someValue;
   const gui = new GUI();
   {
   const folder = gui.addFolder('BloomPass');
   folder.add(bloomPass.copyUniforms.opacity, 'value', 0, 2).name('strength');
   folder.open();
   }
   {
   const folder = gui.addFolder('FilmPass');
   folder.add(filmPass.uniforms.grayscale, 'value').name('grayscale');
   folder.add(filmPass.uniforms.nIntensity, 'value', 0, 1).name('noise intensity');
   folder.add(filmPass.uniforms.sIntensity, 'value', 0, 1).name('scanline intensity');
   folder.add(filmPass.uniforms.sCount, 'value', 0, 1000).name('scanline count');
   folder.open();
  }
```
对于后期处理，THREE.js提供了一个有用的帮助器，称为`ShaderPass`。它需要一个对象，该对象的信息定义了顶点着色器，片段着色器和默认输入。它将处理设置要读取的纹理以获取上一遍的结果以及要渲染到 `EffectComposers`渲染目标之一或画布上的位置。

这是一个简单的后期处理着色器，它将之前的结果乘以颜色。
```js
const colorShader = {
  uniforms: {
    tDiffuse: { value: null },
    color:    { value: new THREE.Color(0x88CCFF) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform vec3 color;
    void main() {
      vec4 previousPassColor = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(
          previousPassColor.rgb * color,
          previousPassColor.a);
    }
  `,
};
```
上面`tDiffuse`是`ShaderPass`用来传递上一个`pass`纹理的名称，因此我们几乎总是需要它。然后，我们声明`color` 为一个THREE.js Color。

接下来，我们需要一个顶点着色器。对于后期处理，此处显示的顶点着色器几乎是标准的，几乎不需要更改。变量`uv`没有进入太多细节，`projectionMatrix`， `modelViewMatrix`和`position`都奇迹般地被three.js所增加。

最后，我们创建一个片段着色器。在此行中，我们从上一个`pass`获得了该行的像素颜色
```js
vec4 previousPassColor =  texture2D（tDiffuse，vUv）;
```
我们用我们的颜色乘它然后设置`gl_FragColor`为计算的结果
```js
gl_FragColor = vec4(
    previousPassColor.rgb * color,
    previousPassColor.a
);
```
添加一些简单的GUI来设置颜色的3个值
```js
const gui = new GUI();
gui.add(colorPass.uniforms.color.value, 'r', 0, 4).name('red');
gui.add(colorPass.uniforms.color.value, 'g', 0, 4).name('green');
gui.add(colorPass.uniforms.color.value, 'b', 0, 4).name('blue');
```
大功告成。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fde0ca0b858f4c16928042e6d4e2a87f~tplv-k3u1fbpfcp-watermark.image?)
[查看实例](https://threejsfundamentals.org/threejs/threejs-postprocessing-custom.html)

翻译于：https://threejsfundamentals.org/threejs/lessons/threejs-post-processing.html

## end
如前所述，要讲述如何编写GLSL和自定义着色器的所有细节太多了。如果真的想知道WebGL本身是如何工作的,请查看[这些文章](https://webglfundamentals.org/)，希望能为你提供帮助。
