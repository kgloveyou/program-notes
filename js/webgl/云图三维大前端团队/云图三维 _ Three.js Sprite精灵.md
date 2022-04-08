图片来源： [unsplash.com/photos/xyhR…](https://unsplash.com/photos/xyhRYPQ0DqU)


>[云图三维 连接你·创造的世界](https://www.yuntucad.com/) 致力于打造国内第一家集查看、建模、装配和渲染于一体的“云端CAD”协作设计平台。

Three.js的精灵模型对象Sprite是一个**永远面向相机的平面**，没有z轴的概念，通常用来加载纹理、用作标签使用，注意Sprite没有背面，**它永远会正对着你**。所以我们可以用它来显示一些标签，当改变观看角度，标签也会随之改变角度。并且，sprite不接受阴影，计算机图形学中，精灵指包含于场景中的二维图像或动画，基类都是[Object3D](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/Object3D),关于精灵模型对象Sprite的方法和属性除了可以查看文档[Sprite](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Sprite)，也可以查看基类Object3D。

## 创建基本的组件
之前提过，一个Three.js场景中必须包含一些必要的组件。比如场景、相机、渲染器等等。下面代码初始化一些基本组件，便于复用

```js
 function initScence() {
            var scene = new THREE.Scene();
            //直线光
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
            directionalLight.position.set(-20, 40, 60);
            scene.add(directionalLight);
            //环境光
            var ambientLight = new THREE.AmbientLight(0x292929);
            scene.add(ambientLight);
            return scene
        }

        function initCamera() {
            var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.x = 120;
            camera.position.y = 60;
            camera.position.z = 180;
            return camera
        }

        function initRender() {
            var renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
            renderer.setSize(window.innerWidth, window.innerHeight);
            return renderer
        }
        
        function init() {
      
            var scene = initScence();
            var camera = initCamera();
            var renderer = initRender()
            camera.lookAt(scene.position);

            // 添加场景中的元素 TODO

           
            document.getElementById("WebGL-output").appendChild(renderer.domElement);
            render();
            function render() {
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }
        }
        window.onload = init
```


## 使用Sprite创建2D形状

通过Sprite创建精灵模型不需要几何体，只需要给构造函数Sprite的参数设置为一个精灵材质[SpriteMaterial](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/SpriteMaterial)即可。

精灵材质对象SpriteMaterial和普通的网格材质一样可以设置颜色(.color)、颜色贴图(.map)、开启透明(.transparent)、透明度(.opacity)等属性，精灵材质对象SpriteMaterial的基类是材质Material。

精灵材质SpriteMaterial的属性除了和网格材质类似的属性和方法外，还有一些自己独特的方法和属性，比如`.rotation`旋转精灵模型，更多相关属性和方法可以查看Threejs文档关于SpriteMaterial的介绍。

在Threejs中，可以使用Sprite加载图像纹理，当然也包括用canvas创建的纹理，因此，canvas能创建什么图像，Sprite就能创建什么形状。下面的例子使用Sprite创建了一个圆：

```javascript
function createSpriteShape(){
       /*1、创建一个画布，记得设置画布的宽高，否则将使用默认宽高，有可能会导致图像显示变形*/
        let canvas = document.createElement("canvas");
        canvas.width = 120;
        canvas.height = 120;
        /*2、创建图形，这部分可以去看w3c canvas教程*/
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ff0000";
        ctx.arc(50,50,50,0,2*Math.PI);
        ctx.fill();
        /*3、将canvas作为纹理，创建Sprite*/
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true; //注意这句不能少
        let material =  new THREE.SpriteMaterial({
          color:0xff00ff,//设置精灵矩形区域颜色
          rotation:Math.PI/4,//旋转精灵对象45度，弧度值
          map: texture,//设置精灵纹理贴图
        });
        let mesh = new THREE.Sprite(material);
        /*4、放大图片，每个精灵有自己的大小，默认情况下都是很小的，如果你不放大，基本是看不到的*/
        //mesh.scale.set(100,100,1);
        return mesh;
}
```

然后把mesh添加到scence中就能刚看到效果

```js
function init() {
            var scene = initScence();
            var camera = initCamera();
            var renderer = initRender()
            camera.lookAt(scene.position);
            scene.add(createSpriteShape())
            
            document.getElementById("WebGL-output").appendChild(renderer.domElement);
            render();
            function render() {
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }
        }
```


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf91ed16ee044c579e57d17703910414~tplv-k3u1fbpfcp-watermark.image)

### .scale和.position

精灵模型对象和网格模型Mesh对一样基类都是Object3D，自然精灵模型也有缩放属性`.scale`和位置属性`.position`，一般设置精灵模型的大小是通过`.scale`属性实现，而精灵模型的位置通过属性`.position`实现，精灵模型和普通模型一样，可以改变它在三维场景中的位置，区别在于精灵模型的正面一直平行于canvas画布。

在使用透视投影相机对象的时候，精灵模型对象显示的大小和网格模型一样受距离相机的距离影响，也就是距离越远，显示效果越小。


## 使用Sprite创建文字


```js
function createSpriteText(){
        //先用画布将文字画出
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffff00";
        ctx.font = "Bold 100px Arial";
        ctx.lineWidth = 4;
        ctx.fillText("Hello World",4,104);
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        
        //使用Sprite显示文字
        let material = new THREE.SpriteMaterial({map:texture});
        let textObj = new THREE.Sprite(material);
        textObj.scale.set(0.5 * 100, 0.25 * 100, 0.75 * 100);
        textObj.position.set(0,0,98);
        return textObj;
}
```

然后把textObj添加到scence中就能刚看到效果
```js
  // once everything is loaded, we run our Three.js stuff.
        function init() {
            var stats = initStats();
            var scene = initScence();
            var camera = initCamera();
            var renderer = initRender()
            camera.lookAt(scene.position);

            // scene.add(createSpriteShape())
            scene.add(createSpriteText())
            document.getElementById("WebGL-output").appendChild(renderer.domElement);
            render();
            function render() {
                stats.update();
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }
        }
        window.onload = init

```
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c659105a0c04ce6aaa4e7b1b4d2df48~tplv-k3u1fbpfcp-watermark.image)


## 写在最后

本文介绍了Three.js的Sprite相关的内容，包含了使用Sprite创建2D形状和创建文字，希望对你有帮助。

> 本文发布自 云图三维大前端团队，文章未经授权禁止任何形式的转载。
