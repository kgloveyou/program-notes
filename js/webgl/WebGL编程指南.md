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

