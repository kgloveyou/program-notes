> svg-url-loader react-svg-loader的区别

`svg-url-loader` 和 `react-svg-loader` 都是处理 SVG 图像的加载器，但它们的作用略有不同。

`svg-url-loader` 是一个 Webpack 加载器，用于将 SVG 文件转换为一个 URL，以便在 CSS 样式表或 JavaScript 代码中使用。它允许你将 SVG 文件作为一个 URL 引用，而不必将它们转换为 base64 编码或使用 Data URIs。这样做可以减小文件大小，提高加载速度，同时使你的代码更加干净。

`react-svg-loader` 则是一个用于在 React 应用中加载和呈现 SVG 图像的加载器。它将 SVG 文件转换为 React 组件，这样你就可以像使用其他组件一样使用它们。它还支持将 SVG 文件作为模块引入，并允许你在 SVG 文件中使用 ES6 模块语法。

总之，`svg-url-loader` 主要用于将 SVG 文件转换为 URL，以便在 CSS 样式表或 JavaScript 代码中使用；而 `react-svg-loader` 则主要用于将 SVG 文件转换为 React 组件，以便在 React 应用中使用。