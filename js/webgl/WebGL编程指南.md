# WebGL编程指南

示例代码

https://sites.google.com/site/webglbook

勘误

https://sites.google.com/site/webglbook/home/webgl-pg-errata

# 第1章 WebGL概述

在正式学习 GLSL ES 之前，我们先大概了解下以下内容：

- OpenGL

OpenGL 全称为 Open Graphics Library（开放图形库）。

是**用于渲染 2D 或 3D 图像的跨语言跨平台的应用程序编程接口**。

- OpenGL ES

OpenGL ES 全称为 OpenGL for Embedded Systems（嵌入式系统开放图形库）。

**OpenGL ES 是 OpenGL 的子集**，主要针对**嵌入式系统**设计，去除了 Open GL 中非必要的特性。

- GLSL

GLSL 全称为 OpenGL Shading Language（OpenGL 着色语言），是一款在 OpenGL 着色器（Shader）中使用的编程语言。

- GLSL ES

GLSL ES 全称为 OpenGL ES Shading Language（OpenGL ES 着色语言），就是用于 OpenGL ES 着色器的编程语言。

# 第2章 WebGL入门

## 绘制一个点

### 顶点着色器

控制点的位置和大小。

### 片元着色器

控制点的颜色。**片元**就是显示在屏幕上的一个像素（严格意义上来说，片元包括这个像素的位置、颜色和其他信息）。

## 绘制一个点（版本2）

### 使用attribute变量

## 改变点的颜色

### uniform变量

只有顶点着色器才能使用attribute变量，使用片元着色器时，需要使用uniform变量。

```js
// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';
```

第3行使用**精度限定词**（precision qualifier）来指定变量的范围（最大值与最小值）和精度，本例中为中等精度。

# 第3章 绘制和变换三角形

## 绘制多个点

构成三维模型的基本单位是三角形。

**缓冲区对象**（buffer object）

### 类型化数组

注意，与普通的`Array`数组不同，类型化数组不支持`push()`和`pop()`方法。

注意，创建类型化数组的唯一方法就是使用`new`运算符，不能使用`[]`运算符（那样创建的就是普通数组）。

## Hello Triangle  

## 移动、旋转和缩放

### 平移

修改应当发生在顶点着色器。

### 旋转

### 变换矩阵：旋转

变换矩阵（transformation matrix  ）

### 变换矩阵：平移

### 示例程序 (RotatedTriangle_Matrix.js)  

WebGL和OpenGL一样，矩阵元素是按列主序存储在数组中的。

### 平移：相同的策略

### 变换矩阵：缩放

# 第4章 高级变换与动画基础

## 平移，然后旋转

### 矩阵变换库：cuon-matrix.js  

### 示例程序：RotatedTriangle_Matrix4.js  

### 复合变换

![image-20220417203434871](https://gitee.com/kg_loveyou/cdn/raw/master/image-20220417203434871.png)

**模型变换（model transformation）**，或者**建模变换（modeling transformation）**，响应地，模型变换的矩阵成为**模型矩阵（model matrix）**。

### 示例程序 (RotatedTranslatedTriangle.js)  

​		你可能会注意到，“先平移后旋转”的顺序与构造模型矩阵`<旋转矩阵>X<平移矩阵>`的顺序是相反的，这是因为变换矩阵最终要与三角形的三个顶点的原始坐标矢量相乘，再看一下等式3.4，你就明白了。

## 动画

