> [云图三维 连接你·创造的世界](https://link.juejin.cn?target=undefined "https://link.juejin.cn?target=undefined") 致力于打造国内第一家集查看、建模、装配和渲染于一体的“云端CAD”协作设计平台。

应读者的要求，希望我们成立一个专业的、面向成渝地区的前端开发人员的webgl、Threejs行业QQ交流群，便于大家讨论问题。群里有研究webgl、Threejs大佬哦，欢迎大家加入！——点击链接加入群聊【three.js/webgl重庆联盟群】：[jq.qq.com/?_wv=1027&k…](https://link.juejin.cn?target=https%3A%2F%2Fjq.qq.com%2F%3F_wv%3D1027%26k%3DpX9BUnzn "https://link.juejin.cn?target=https%3A%2F%2Fjq.qq.com%2F%3F_wv%3D1027%26k%3DpX9BUnzn")

**作者介绍**

庆庆，云图大前端研发工程师，负责云图三维 front 端的开发工作。


## 正文

不少的初学者，对于ThreeJS中矩阵应用的理解是比较模糊的，比如笔者。笔者刚开始接触ThreeJS的时候，一下子就被灌输了很多计算机图形学的基础理论，其中就包括了矩阵变换，在过程中，笔者的脑袋产生了几个关于矩阵变换的疑问：

> 1、矩阵到底是什么？ 2、矩阵的用途是什么？ 3、为什么要用4×4矩阵？

相信初学者搞明白这三个问题，就能理解ThreeJS中矩阵的应用了，下面就针对这三个问题进行探讨。

## 矩阵到底是什么？

百度百科的第一句是这么说的：

> 在数学中，矩阵（Matrix）是一个按照长方阵列排列的复数或实数集合，最早来自于方程组的系数及常数所构成的方阵。

笔者对着ThreeJS文档核心基础类Object3D的API浏览了一番。 

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/417c275704204962972406a646db5ad5~tplv-k3u1fbpfcp-watermark.image?)


API文档中多次提到Matrix（矩阵）这个单词。至此，我们了解到矩阵是一种数据的集合，在ThreeJS当中应用非常多。但是出于好奇，笔者又在JS文件里试着敲下了如下的代码：

```js
import {Object3D} from "three";
……
const obj = new Object3D();
console.log(obj);
```

运行最后得到结果的部分截图如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5f7ddf074fa47f4af7edb7eab4a7427~tplv-k3u1fbpfcp-watermark.image?)

这里可以看出，每一个Object3D new出来的实例对象都有一个叫matrix的属性，而且正常情况下的初始值和上图是一致，它包含了一个长度为16的数组。 这个时候不少初学者会好奇：这个martix属性（矩阵）中的数组元素代表什么？我们保留这个疑问继续往下探讨下一个问题。

## 矩阵的用途是什么？

在此之前，我们可以先去想一个问题：我们该如何平移三维空间中的一条线段？ 思路其实不难，线段由两个端点组成，我们只需要把两个端点坐标的每个分量(x,y,z)和对应轴上的平移距离相加就能实现平移。 下面是实现思路的伪代码，仅供参考。

```js
/**
* @description 通过加上(x,y,z)的平移分量去平移线段
* @param {LineSegments} line 线段的实例
* @param {number} deltaX x轴上的平移分量
* @param {number} deltaY y轴上的平移分量
* @param {number} deltaZ z轴上的平移分量
**/
​
function translationLine(line:LineSegments,deltaX:number,deltaY:number,deltaZ:number):void{
    const pastPoints:Float32Array[] = line.geometry.attributes.instanceStart.data.array;//两个点，数组长度为6
    const points:Vector3[]=[]
    points.push( new THREE.Vector3( pastPoints[0]+deltaX, pastPoints[1]+deltaY, pastPoints[2]+deltaZ ) ); 
    points.push( new THREE.Vector3( pastPoints[3]+deltaX, pastPoints[4]+deltaY, pastPoints[5]+deltaZ ) );
    line.geometry.setFromPoints( points );
}
```

是不是很简单？接下来我们再看看另一种变换——旋转。 

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d5dc063319e4afc9ea8e450b1178cba~tplv-k3u1fbpfcp-watermark.image?)

如上图所示， 线段OP1以Z轴为轴顺时针旋转β度之后与OP2重合。先模拟一道初中数学题。  我们已知P1点坐标(x1,y1,z1)，旋转角度β，求旋转后的P2点的坐标(x2,y2,z2)。 我们先假设OP1的长度为L，且OP1与Y轴之间的夹角为α，那么根据三角函数公式我们可以先得到P1的坐标：

> x1 = L·sinα y1 = L·cosα z1 = 0

同样根据三角函数公式，我们可以继续计算出P2的具体坐标：

> x2 = L·sin(α + β) y2 = L·cos(α + β) z2 = 0

P2的坐标是表示出来了，但是式子里还有L和α两个假设的未知数，怎么办？别着急，继续往下走。 我们根据两角和差公式得到下列的式子。

> x2 = L·sin(α + β) = L·(sinα·cosβ+cosα·sinβ) y2 = L·cos(α + β) = L·(cosα·cosβ-sinα·sinβ) z2 = 0

再将P1的式子带入到P2中去，得到

> x2 = L·(sinα·cosβ+cosα·sinβ) = cosβ·x1 + sinβ·y1 y2 = L·(cosα·cosβ-sinα·sinβ) = cosβ·y1 - sinβ·x1 z2 = 0

我们将上述的数学式子转换成ThreeJS的伪代码：

```js
function rotateLine(line:LineSegments,angle){
    const pastPoints:Float32Array[] = line.geometry.attributes.instanceStart.data.array;//两个点，数组长度为6
    const points:Vector3[]=[]
    points.push( new THREE.Vector3(Math.cos(angle)*pastPoints[0]+Math.sin(angle)*pastPoints[1], Math.cos(angle)*pastPoints[1]-Math.sin(angle)*pastPoints[0], 0 ) );
    points.push( new THREE.Vector3(Math.cos(angle)*pastPoints[3]+Math.sin(angle)*pastPoints[4], Math.cos(angle)*pastPoints[4]-Math.sin(angle)*pastPoints[3], 0 ));
    line.geometry.setFromPoints( points );
}
```

读者看到这里可能察觉到一丝丝不对劲了——这道题我看是看懂了，但是……话说你不是在讲ThreeJS中矩阵的用途吗？怎么看着看着我发现你说的例子里没有一个跟矩阵有关系的。

别急，这就来解释，上述只是抛砖引玉。从理论上讲，我们确实可以通过数学公式实现平移、旋转、缩放等变换，但实际情况有可能会非常复杂，使用数学表达式来进行运算会相当繁琐，如果在threeJS当中用上述的方法去进行平移或者旋转，一旦有多个旋转或者多个平移叠加，那写出来的代码不但不够优雅，而且执行效率也较为低下。

因此，在现实中常常使用矩阵（由m × n个标量组成的长方形数组）来表示诸如平移、旋转以及缩放等线性变换。而另一个更有趣的事实是，当两个变换矩阵A和B的积为P=AB时，则变换矩阵P相当于A和B所代表的变换。举一个例子，若A为旋转矩阵，B为平移矩阵，则矩阵P就能够实现旋转和平移变换。不过需要注意的是，矩阵乘法不符合交换律，因此AB和BA并不相等。 接下来，我们尝试用3×3的矩阵表示上述的旋转。首先，我们先来看一个矩阵乘以一个三维矢量的算式： 

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2349fcd435cc44a69320aa6db5e76147~tplv-k3u1fbpfcp-watermark.image?)


可以看到该矩阵为一个3×3的矩阵，矩阵的右侧是点P1的坐标，而矩阵的左侧则是点P2的坐标。根据这个表达式，我们可以得出下列的式子：

> x2 = a·x1 + b·y1 + c·z1 y2 = d·x1 + e·y1 + f·z1 z2 = g·x1 + h·y1 + i·z1

为了将矩阵等式和之前小节的数学表达式联系起来，下面我们就将旋转表达式和该矩阵等式做一个对比。

> x2 = a·x1 + b·y1 + c·z1 x2 = cosβ·x1 + sinβ·y1
>
> y2 = d·x1 + e·y1 + f·z1 y2 = cosβ·y1 - sinβ·x1
>
> z2 = g·x1 + h·y1 + i·z1 z2 = 0

通过对比x2，我们可以发现a=cosβ，b=sinβ，c=0； 对比y2，也可以发现d=-sinβ，e=cosβ，f=0； 最后对比z2，可以确定g=0，h=0，i=1； 将这个结果带入到之前的矩阵中，我们的等式就可以变成下面这个样子： 

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3020612dff9f4efa9e7a44cfe4e00db8~tplv-k3u1fbpfcp-watermark.image?)

通过这个3×3的变换矩阵，我们就已经实现了三维空间的旋转变换，显然如果这个3×3矩阵真的是完美的解决变换的方案的话，那么它显然也必须要适合于其他的变换，例如平移。但是它到底能否满足平移的需求呢？下面我们还是通过对比矩阵等式和数学表达式的方式，来寻找答案。

> x2 = a·x1 + b·y1 + c·z1 x2 = x1 + Δx
>
> y2 = d·x1 + e·y1 + f·z1 y2 = y1 + Δy
>
> z2 = g·x1 + h·y1 + i·z1 z2 = z1 + Δz

通过对比，我们发现平移和旋转之间很有趣的一个区别，那就是平移的表达式中带有常量Δx，而无论是旋转的表达式还是矩阵等式中都不存在这样一个常量能够与之对应。那么问题就来了，我们没有办法使用3×3的矩阵来表示平移。这个问题该如何解决呢？这就涉及到我们要探讨的第三个问题。

## 为什么要用4×4矩阵？

为了解决三维矢量和4×4矩阵相乘的问题，我们机智的为三维矢量添加了第四个分量，这样之前的三维矢量(x,y,z)就变成了四维的(x,y,z,w)，这样由4个分量组成的矢量便被称为齐次坐标。需要说明的是，齐次坐标(x,y,z,w)等价于三维坐标(x/w,y/w,z/w)，因此只要w分量的值是1，那么这个齐次坐标就可以被当作三维坐标来使用，而且所表示的坐标就是以x，y，z这3个值为坐标值的点。 因此，为了和4×4矩阵相乘，我们的P1点坐标就变成了(x1,y1,z1,1)。而矩阵等式也变成了下面这个样子： 

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a58032258bac42aa8ea24184103a1ba5~tplv-k3u1fbpfcp-watermark.image?)


我们再将这个新的矩阵等式和平移的数学表达式做一番对比：

> x2 = a·x1 + b·y1 + c·z1 + d x2 = x1 + Δx
>
> y2 = e·x1 + f·y1 + g·z1 + h y2 = y1 + Δy
>
> z2 = i·x1 + j·y1 + k·z1 + l z2 = z1 + Δz
>
> 1 = m·x1 + n·y1 + o·z1 + p

通过对比x2，我们可以发现a=1，b=0，c=0，d=Δx； 对比y2，也可以发现e=0，f=1，g=0，h=Δy； 再对比z2，可以确定i=0，j=0，k=1，l=Δz； 最后还可以根据表达式求出m=0，n=0，o=0，p=1； 这样，我们就求出了我们的4×4的平移矩阵：

到这一步，我们回归前面画线部分的疑问——Object3D中martix属性（矩阵）中的数组元素代表什么？ 我们将这长度为16的数组按照顺序化成4×4的矩阵试试。 和上面说到的4×4矩阵对比一下，得出：

> Δx = 0 Δy = 0 Δz = 0 w = 1

发现没？这是一个没有进行任何变换过的初始矩阵。

## 总结

最后我们把目光放回Three.JS，总结一下。

> -   矩阵是一串数据的集合。
> -   在ThreeJS当中，矩阵主要被用于记录物体的变换过程（平移、旋转、缩放）。
> -   4×4矩阵是为了解决三维坐标系中平移变换和其他变换矩阵数据格式的一致性。