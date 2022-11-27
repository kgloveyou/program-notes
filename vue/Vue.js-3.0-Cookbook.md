# Vue.js-3.0-Cookbook

代码，https://github.com/PacktPublishing/Vue.js-3.0-Cookbook

# 1、了解 Vue 3 和创建组件

## Vue 3 中的新功能

### 框架的改进

#### Under the hood  

外壳看起来和旧的一样，但引擎是一件艺术品。 在新版本中，没有 Vue 2 的剩余代码。核心团队使用 TypeScript 从头开始构建框架，并重写了所有内容以实现框架的最大性能。

#### Render engine  

## Using the reactivity and observable API outside the scope of Vue  

`reactivity` 和 `watch` APIs.  

## 使用 composition  API 创建组件

此方法受到 React Hooks 的启发，并引入了创建特殊函数的技术来组合可以共享的应用程序，而无需在 Vue 应用程序内部使用，因为使用了公开的 Vue API。

# 2、介绍 TypeScript 和 Vue 生态系统

### 理解 TypeScript  

#### Decorators  

要启用它，您可以在 tsconfig.json 文件中设置标志：

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

### 使用 vue-class-component 创建自定义 mixin

在 Vue 中，`mixin` 是一种在其他 Vue 对象中重用相同代码的方法，例如在组件内部混合 `mixin` 的所有属性。

当使用 mixin 时，Vue 首先声明 `mixin` 属性，然后声明组件值，因此组件将始终是最后一个有效值。 这种合并发生在深度模式下，并且已经在框架内声明了特定的方式，但可以通过特殊的配置进行更改。

通过使用 `mixins`，开发人员可以编写一小段代码并在许多组件中重用它们。

### 使用 vue-class-component 创建自定义函数装饰器

装饰器是一种高阶函数，它用另一个函数包装一个函数。

### 向 vue-classcomponent  添加自定义 hooks

### 将 vue-property-decorator 添加到 vue-class-component

因此，社区制作了一个名为 `vue-propertydecorator` 的库，该库得到了 Vue 核心团队的完全认可。

这个库带来了一些缺失的部分作为 ECMAScript 提案装饰器，例如 `props、watch、model、inject` 等。

## 3、数据绑定、表单验证、事件和计算属性

