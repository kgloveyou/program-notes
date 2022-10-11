# AR and VR Using the WebXR API  

学习使用 WebGL、Three.js 和 A-Frame 创建沉浸式内容

# 第 1 章 入门

不要与 WebXR 规范混淆，WebXR API 是 WebXR 功能集的实现。 WebXR API 充当 XR Web 内容和运行它们的设备之间的接口。例如，WebXR API 收集有关耳机方向和用户姿势的数据。 WebXR API 通过其命令库为开发人员提供对用户数据的访问。

然而，WebXR 设备 API 确实有重要的限制：它不能管理 3D 数据或在屏幕上绘制任何东西。 WebXR API 不是渲染引擎。 它不能加载模型，将它们包裹在纹理中，并将它们绘制到像素上——这个过程被称为光栅化。 为了在浏览器中栅格化 3D 内容，WebXR API 扩展了另一个称为 WebGL 的 API。