# AR and VR Using the WebXR API  

学习使用 WebGL、Three.js 和 A-Frame 创建沉浸式内容

# 1. 开始

​		WebXR 不是一种编程语言； 它甚至不是我们可以用来创建应用程序的代码库。 WebXR 是由万维网联盟 (W3C) 开发的规范，W3C 是一个由行业专家组成的非营利组织，他们合作创建跨 Web 的标准协议。 W3C 已将 WebXR 指南的实施留给了浏览器的开发人员。 因此，WebXR 只不过是行业商定的一套规则。

​		不要与 WebXR 规范混淆，WebXR API 是 WebXR 功能集的实现。 WebXR API 充当 XR Web 内容和运行它们的设备之间的接口。 例如，WebXR API 收集有关耳机方向和用户姿势的数据。 WebXR API 通过其命令库为开发人员提供对用户数据的访问。

然而，WebXR 设备 API 确实有重要的限制：它不能管理 3D 数据或在屏幕上绘制任何东西。 WebXR API 不是渲染引擎。 它不能加载模型，将它们包裹在纹理中，并将它们绘制到像素上——这个过程被称为光栅化。 为了在浏览器中栅格化 3D 内容，WebXR API 扩展了另一个名为 WebGL 的 API。

在介绍了使用 WebXR API 不可或缺的组件之后，我们将讨论创建自己的 XR 应用程序所需的工具。 创建 WebXR 应用程序所需的工具是代码编辑器、本地开发服务器、Web 浏览器和 XR 设备。 无法访问 XR 设备的开发人员可以使用 Mozilla 等浏览器创建者提供的 WebXR Emulator。 所有这些都将在本章的后面部分讨论。

## WebGL

WebGL 是一个 Web 图形库，可通过 JavaScript API 在所有当代 Web 浏览器中使用。与 WebXR API 一样，WebGL API 也符合规范。然而，WebGL 的规范并非由 W3C 维护，而是由称为 Kronos Group 的不同联盟维护。 Kronos 集团由 150 多家领先的技术公司组成，致力于促进图形、混合现实和机器学习应用程序的高级 Web 标准。他们众多的视觉计算 API 之一是 OpenGL 图形标准。

OpenGL 图形标准指定了应用程序和 GPU 驱动程序之间的通信协议，例如由 Nvidia 和 AMD 制造的那些。虽然 OpenGL 跨机器兼容，但也存在特定于平台的 API，如 Microsoft 的 DirectX 和 Apple 的 Metal。然而，OpenGL 的跨平台适用性使得它的表弟 OpenGL ES 成为一种流行的图形 API，可以在移动设备上实现。 OpenGL ES 中的 ES 代表“嵌入式系统”，这意味着 API 面向小型、低功耗设备。例如，由于这些设备无法利用您在台式游戏计算机中可以找到的大型 GPU，因此它们需要专用于其特定需求的图形 API。

OpenGL ES 在移动设备上运行的能力使 WebGL 能够在独立耳机和智能手机上运行的 Web 浏览器中创建 2D 和 3D 图形。 通知 WebGL API 实现的是 Kronos Group 的 OpenGL ES 规范。 虽然应用程序和 GPU 之间的通信仍然需要使用 GLSL，这是 OpenGL 的渲染和绘图命令的语言，但 WebGL API 使 Web 开发人员能够将 GLSL 与他们更熟悉的语言 JavaScript 相结合。 毕竟，JavaScript 是 Web 的语言，而 Web 是浏览器的领域。