> [云图三维 连接你·创造的世界](https://link.juejin.cn?target=undefined "https://link.juejin.cn?target=undefined") 致力于打造国内第一家集查看、建模、装配和渲染于一体的“云端CAD”协作设计平台。

应读者的要求，希望我们成立一个专业的、面向成渝地区的前端开发人员的webgl、Threejs行业QQ交流群，便于大家讨论问题。群里有研究webgl、Threejs大佬哦，欢迎大家加入！——点击链接加入群聊【three.js/webgl重庆联盟群】：[jq.qq.com/?_wv=1027&k…](https://link.juejin.cn?target=https%3A%2F%2Fjq.qq.com%2F%3F_wv%3D1027%26k%3DpX9BUnzn "https://link.juejin.cn?target=https%3A%2F%2Fjq.qq.com%2F%3F_wv%3D1027%26k%3DpX9BUnzn")

**作者介绍**

丹丹，云图大前端研发工程师，负责云图三维 front 端的开发工作。

## 正文
我们在最开始学习three.js时候就会接触到向量，而在以后的学习中也会不断用到向量的知识。在Three.js相关API中我们可以看到，向量有二维向量（[Vector2](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/math/Vector2)）、三维向量（[Vector3](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/math/Vector3)）、四维向量（[Vector4](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/math/Vector4)），这三种向量有一些共有的方法和一些各自特有的方法，具体可见[Three.js官方文档](http://www.yanhuangxueyuan.com/threejs/docs/index.html)。因项目原因，笔者平时使用最频繁的是三维向量的一些方法，故整理一下自己的理解。

我们知道三维向量（Vector3）表示的是一个有顺序的、三个为一组的数字组合（标记为x、y和z），它既可以表示空间中的一个点位，又可以表示从坐标原点到该点的一个向量，至于在什么情况下理解为点位，什么情况下理解为向量，可以根据需要来定义，那么在下文中我们也会举例来讲。

##### （1）知道两个点的位置，求两点组成的线段的方向向量

已知A为坐标原点，B、C为三维空间中的两个点，求这两个点位组成的线段BC的方向向量。

我们可以先确定方向，例如求B点到C点的方向向量，可以先将BC线段的两个端点B、C点都减去B点值，得到B_1、C_1点，其中B_1点坐标与坐标原点重合，C_1点位置即为C点坐标减去B点坐标所得值，得到与BC线段平行的线段B_1C_1，而B_1C_1的方向向量即是BC的方向向量，具体公式如下：

```js
const A = Vector3(0, 0, 0)
const B = Vector3(1, 2, 0)
const C = Vector3(-2, 1, 2)
const bc = C.clone().sub(B) // Vector3(-3, -1, 2) *注.sub方法会改变执行它的向量的值，使用之前需先克隆该向量
```

以上向量bc便是B点到C点的方向向量，同理可得C点到B点的方向即为bc的反向量，即bc.negate()

##### （2）知道线段的方向、长度以及其中一个端点，求另一个端点

由上（1）我们可以反推，首先方向向量确定，且长度确定（若为标准向量可自行设置长度），可以得到与BC向量方向相同、长度相等并且以坐标原点为其中一个端点的线段B_1C_1,若已知B点坐标求C点坐标，则用B点坐标与方向向量BC相加，若已知C点坐标求B点坐标，则是C点坐标与方向向量相减，如下：

```js
// 已知B点坐标求C点坐标
const bc = Vector3(-3, -1, 2) // 方向向量
const B = Vector3(1, 2, 0) // 确定的端点
const C = C.clone().add(bc) // Vector3(-2, 1, 2)
​
// 已知C点坐标求B点坐标
const bc = Vector3(-3, -1, 2) // 方向向量
const C = Vector3(-2, 1, 2) // 确定的端点
const B = C.clone().sub(bc) // Vector3(1, 2, 0)
```

##### （3）通过点积（dot）判断向量之间的夹角

以（1）中向量B与向量C为例计算，则向量B与向量C夹角的余弦值为B.clone().normalize().dot(C.normalize())。证明如下： 根据余弦定理，三角形任一边的平方等于其他两边平方和减去这两边与他们夹角的余弦的积的两倍。若a、b、c分别表示\DeltaABC中A、B、C的对边，则余弦定理可表述为：

$a^2 = b^2 + c^2 - 2bc cosA， b^2 = a^2 + c^2 - 2ac cosB， c^2 = a^2 + b^2 - 2ab cosC$

余弦定理还可以用以下形式表达：


$cosA$ = $(b^2 + c^2 - a^2)\over2bc$

$cosB$ = $(a^2 + c^2 - b^2)\over2ac$

$cosC$ = $(a^2 + b^2 - c^2)\over2ab$

下面我们开始进行推算，首先定义三个点位A、B、C

```js
const A = Vector3(0, 0, 0) // 坐标原点
const B =  Vector3(x1, y1, z1)
const C =  Vector3(x2, y2, z2)
```

我们假设A、B、C都是被归一化后的标准向量且AB=c=1，AC=b=1,BC=a,那么根据上图公式可以得出： $cos A = (x_1^2 + y_1^2 + z_1^2 + x_2^2 + y_2^2 + z_2^2 - ((x_1-x_2)^2 + (y_1-y_2)^2 + (z_1-z_2)^2) / 2bc = (2x_1x_2 + 2y_1y_2 + 2z_1z_2) / 2 = x_1x_2 + y_1y_2 + z_1z_2$ 而B.dot(C)得到的也是$x_1x_2 + y_1y_2 + z_1z_2$的值，故此，两个标准向量的点积求出的即是两个向量夹角的余弦值

##### （4）叉乘（cross）两个向量的叉乘所得向量与这两个向量同时垂直

```js
// 假设向量G是由向量E、F叉乘所得
const E =  Vector3(0, 1, 5)
const F =  Vector3(1, 0, 5)
const G = E.clone().cross(F) // Vector3(5, 5, -1)
​
console.log(E.clone().dot(G)) // 0
console.log(F.clone().dot(G)) // 0
```

由于我们已经知道两个向量的点积的值即是这两个向量的余弦值，而垂直角的余弦值为0，由此可知向量G与向量E、F的夹角都为垂直角，可以得出E、F点与坐标原点所构成平面的法向量就是向量G，这一点于实际开发中也会很有用。

#### 总结

当然，向量的方法还有很多，笔者就不再做一一解释，由于官方文档对这些方法的解释较为简洁，对于初学者来说，理解起来有一定难度，希望更多的小伙伴能写下自己的理解和感悟，大家一起学习，共同进步！