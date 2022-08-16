# Unity Shader入门精要

勘误网址，http://candycat1992.github.io/unity_shaders_book/unity_shaders_book_corrigenda.html

配套资源，https://github.com/candycat1992/Unity_Shaders_Book

### 2.3.4 屏幕映射

​		有一个需要注意的地方是，屏幕坐标系在OpenGL和DirectX之间的差异问题。OpenGL把屏幕的左下角当成最小的窗口坐标值，而DirectX则定义了屏幕的左上角为最小的窗口坐标值。

<img src="Unity Shader入门精要.assets/image-20220816155740598.png" alt="image-20220816155740598" style="zoom: 50%;" />

​		产生这种差异的原因是，微软的窗口都使用了这样的坐标系统，因为这和我们的阅读方式是一致的：从左到右，从上到下，并且很多图像文件也是按照这样的格式存储的。

### 2.3.5　三角形设置

深度值（z坐标）

### 2.3.6　三角形遍历

​		三角形遍历（）阶段将会检查每个像素是否被一个三角网格所覆盖。如果被覆盖的话，就会生成一个片元（fragment）。

​		需要注意的是，一个片元并不是真正意义上的像素，而是包含了很多状态的集合，这些状态用于计算每个像素的最终颜色。这些状态包括了（但不限于）它的屏幕坐标、深度信息，以及其他从几何阶段输出的顶点信息，例如法线、纹理信息等。

### 2.3.7　片元着色器

​		**片元着色器（Fragement Shader）**。在DirectX中，片元着色器被称为**像素着色器（Pixel Shader）**,但片元着色器时一个更合适的名字，因为此时的片元并不是一个真正意义上的像素。

## 3.2　Unity Shader的基础：ShaderLab

​		Unity在背后会根据使用的平台来把这些结构编译成真正的代码和Shader文件，而开发者只需要和 Unity Shader 打交道即可。

## 3.6　答疑解惑

### 3.6.1　Unity Shader != 真正的Shader

### 3.6.2　Unity Shader和CG/HLSL之间的关系

### 3.6.3　我可以使用GLSL来写吗

### 3.6.3　我可以使用GLSL来写吗

## 4.2　笛卡儿坐标系

**笛卡儿坐标系（Cartesian Coordinate System）**

### 4.2.4　Unity使用的坐标系

对于模型空间和世界空间，Unity使用的是左手系。

但对于观察空间来说，Unity使用的是右手坐标系。观察空间，通俗来讲就是以摄像机为原点的坐标系。

### 4.3.2　矢量运算

**矢量的点积**

**矢量的叉积**

### 4.4.5　行矩阵还是列矩阵



## 4.5　矩阵的几何意义：变换