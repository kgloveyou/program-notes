# 第1章 Next.js介绍

## 内置路由

### 基于文件的路由

Next.js 使用基于文件的路由系统，这意味着您网站中的每个页面都对应于 `pages` 目录中的一个文件。

### 动态路由

Next.js 还支持动态路由，这使您能够创建可以接受 URL 中参数的页面。

### API 路由

### Link 组件

# 第3章 TAILWIND CSS  介绍

## Styling Elements with Tailwind CSS  

### Padding and Margin  

`p-` 类用于设置元素的 **内边距（padding）**，而 `m-` 类用于设置元素的 **外边距（margin）**。

```html
<div class="p-4">This div has 4 units of padding</div>

<p class="m-2">This paragraph has 2 units of margin</p>
```

## Common Utility Classes  

### Spacing  

- **`m-2`**：设置外边距为 **2 单位**。
- **`m-4`**：设置外边距为 **4 单位**。
- **`p-2`**：设置内边距为 **2 单位**。
- **`p-4`**：设置内边距为 **4 单位**。
- **`mx-2`**：设置水平方向的外边距为 **2 单位**。
- **`mx-4`**：设置水平方向的外边距为 **4 单位**。
- **`my-2`**：设置垂直方向的外边距为 **2 单位**。
- **`my-4`**：设置垂直方向的外边距为 **4 单位**。

> **单位说明**：
> 上述示例中的 ​**​1 单位默认等于 `0.25rem`​**​（在主流浏览器中通常对应 ​**​4px​**​）。
> 如需自定义尺寸比例（例如将 1 单位改为 `8px`），可修改 `tailwind.config.js` 文件中的配置。

### Naming Convention of Utility Classes  

## 使用 Tailwind CSS 实现响应式设计

### Using Responsive Utility Classes  

# 第4章 构建一个“ HELLO WORLD ”  应用

# 第5章 构建一个个人网站

## 创建一个 Layout  

为了准备添加导航栏，我们希望所有页面采用相同的布局。之后，我们可以将导航栏整合到布局中，这样导航栏就会自动应用到全部 3 个页面上。



相比直接使用 HTML 的 `<img>` 标签，我们选择 Next.js 提供的 `<Image>` 组件，因为它能带来额外的功能支持：

1. **懒加载优化**
   `<Image>` 组件会自动实现图片懒加载，仅在需要时加载图片，从而显著提升页面加载速度和整体性能。
2. **智能图片优化**
   它可以对图片进行优化处理，包括自动调整尺寸（resizing）和压缩（compressing），进一步改善性能表现。
3. **动态加载配置**
   该组件支持基于特定条件（如设备类型或网络速度）动态加载图片，实现更灵活的响应式体验。

## 让页面对 SEO 友好

社交标签能让社交媒体平台在分享网页时准确显示内容的预览，包括标题、描述、图片及其他信息。

## 总结

### 在 Next.js  中使用 getStaticProps()

`getStaticProps()` 是 Next.js 的一个函数，它会在**构建时**为页面生成所需的 props，通过**预取数据**来提升性能。
它能创建针对搜索引擎优化的静态页面，比如处理元数据（metadata）等信息。

# 第6章 构建一个天气 APP

## 构建搜索页面

我们还从 `@/components/SearchBox` 模块导入了 `SearchBox` 组件。其中 `@` 符号是表示应用程序根目录的简写形式。

## 下载城市 JSON  数据

## 定义城市数据的数据接口

## 定义天气数据的数据接口

## 展示一张图片

- 在 `next.config.js` 中将图片主机名加入白名单

next.config.js  

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
  },
}
module.exports = nextConfig
```

# 第7章 部署至生产环境