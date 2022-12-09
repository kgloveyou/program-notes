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

要启用它，你可以在 tsconfig.json 文件中设置标志：

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

### 使用双向数据绑定创建输入表单

### 向元素添加事件监听器

### Removing the v-model from the input  

```vue
<template>
  <div class='cardBox'>
    <div class='container tasker'>
      <strong>My task is:</strong>
      <input 
        type='text' 
        :value='task' 
        @input='task = $event.target.value' 
        class='taskInput' 
      />
      <button v-on:click='addTask'>Add Task</button>
    </div>
  </div>
</template>
```

### 创建动态待办事项列表

### 创建计算属性并了解它们的工作原理

使用计算属性可以更轻松地获取需要预处理甚至缓存的数据，而无需执行任何其他外部存储函数。



当使用计算属性将值传递给模板时，该值现在被缓存。 这意味着我们只会在值更新时触发渲染过程。同时，我们确保模板不会使用变量进行渲染，这样就无法在模板上更改它，因为它是变量的缓存副本。

使用此过程，我们可以获得最佳性能，因为我们不会浪费处理时间来重新渲染 DOM 树以进行对显示的数据没有影响的更改。 这是因为如果某些内容发生变化并且结果相同，则计算属性会缓存结果并且不会更新最终结果。

### 使用自定义过滤器显示更清晰的数据和文本

过滤器是接收值并且必须返回一个值以显示在文件的 <template> 部分或在 Vue 属性中使用的方法。

### 使用 Vuelidate 添加表单验证

### 为列表创建过滤器和排序器

### 使用 vue-devtools 调试你的应用

## 4、Components, Mixins, and Functional Components  

### 使用 slots  和 named slots  将数据放入组件中

要添加 named slots，我们需要使用一个名为 `v-slot:` 的指令，然后是我们要使用的 slot 的名称：

```vue
      <template v-slot:header>
        <strong>Card Title</strong><br>
        <span>Card Sub-Title</span>
      </template>
```

对于默认插槽，我们不需要使用指令； 它只需要包裹在组件中，放置在组件的 <slot /> 部分。

### 将数据传递给你的组件并验证数据

#### 静态 vs. 动态 Prop[#](https://cn.vuejs.org/guide/components/props.html#static-vs-dynamic-props)

至此，你已经见过了很多像这样的静态值形式的 props：

```vue
<BlogPost title="My journey with Vue" />
```

相应地，还有使用 `v-bind` 或缩写 `:` 来进行动态绑定的 props：

```vue
<!-- 根据一个变量的值动态传入 -->
<BlogPost :title="post.title" />

<!-- 根据一个更复杂表达式的值动态传入 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### 创建函数式组件

函数式组件的美妙之处在于它们的简单性。 它们是无状态组件，没有任何数据、计算属性，甚至没有生命周期。 它们只是在传递的数据发生变化时调用的渲染函数。

你可能想知道这有什么用。 好吧，函数式组件是不需要在其中保留任何数据的 UI 组件，或者只是渲染组件不需要任何数据操作的可视化组件的完美伴侣。

顾名思义，它们是简单的函数组件，它们无非就是渲染功能。 它们是专门用于性能渲染和视觉元素的组件的精简版本。

在我们组件的 `<template>` 部分，我们首先需要将 `functional` 属性添加到 `<template>` 标签，以向 `vue-templatecompiler` 表明该组件是一个函数式组件。

```vue
<template functional>
  <button
    tabindex="0"
    class="button"
    :class="{
      round: props.isRound,
      isFlat: props.isFlat,
    }"
    :style="{
      background: props.backgroundColor,
      color: props.textColor
    }"
    v-on="listeners"
  >
    <div
      tabindex="-1"
      class="button_focus_helper"
    />
    <slot/>
  </button>
</template>
```

要将所有事件侦听器直接发送给父级，我们可以调用 `v-on` 指令并传递 `listeners` 属性。这将绑定所有事件侦听器，而无需声明每个侦听器。

#### 这个怎么运作...

函数式组件通过接收两个参数来工作：`createElement` 和 `context`。 正如我们在单个文件中看到的，我们只能访问元素，因为它们不在 JavaScript 对象的 `this` 属性中。 发生这种情况是因为在将上下文传递给渲染函数时，没有 `this` 属性。

函数式组件在 Vue 上提供了最快的渲染速度，因为它不依赖于组件的生命周期来检查渲染； 它只是在每次数据更改时渲染。

### 访问你的子组件数据

css [user-select](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)

user-select CSS 属性控制用户是否可以选择文本。 这对作为浏览器用户界面（其 chrome）的一部分加载的内容没有任何影响，文本框除外。

[Formal syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#formal_syntax)

```
user-select = 
  auto     |
  text     |
  none     |
  contain  |
  all      
```

[Examples](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#examples)

[HTML](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#html)

```html
<p>You should be able to select this text.</p>
<p class="unselectable">Hey, you can't select this text!</p>
<p class="all">Clicking once will select all of this text.</p>
```

Copy to Clipboard

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#css)

```css
.unselectable {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

.all {
  -webkit-user-select: all;
  -ms-user-select: all;
  user-select: all;
}
```



评分的![img](Vue.js-3.0-Cookbook.assets/451E84E0.png)图标是用字体实现的。

```css
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons' !important;
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
```



```css
.starRating .material-icons {
  font-size: .9rem !important;
  color: orange;
}
```

#### 这个怎么运作...

当 `ref` 属性被添加到组件中时，Vue 将引用元素的链接添加到 JavaScript 的 `this` 属性对象内部的 `$refs` 属性中。 从那里，你可以完全访问该组件。

此方法通常用于操作 HTML DOM 元素，而无需调用文档查询选择器函数。

但是，此属性的主要功能是直接访问 Vue 组件，使你能够执行函数并查看组件的计算属性、变量和更改的变量——就像从外部完全访问组件一样。

#### 还有更多...

与父组件可以访问子组件的方式相同，子组件可以通过在 `this` 对象上调用 `$parent` 来访问父组件。 事件可以通过调用 `$root` 属性来访问 Vue 应用程序的根元素。

### 创建动态注入组件

在某些情况下，你的组件可以由你接收的变量类型或你拥有的数据类型来定义； 然后，你需要即时更改组件，而无需设置大量 Vue `v-if`、`v-else-if` 和 `v-else` 指令。

在这些情况下，最好的办法是使用动态组件，当计算属性或函数可以定义将用于渲染的组件时，并实时做出决定。

```vue
<template>
  <component
    :is="starComponent"
    :max-rating="maxRating"
    :rating="rating || rank"
    :votes="votes"
    @final-vote="vote"
  >
    Rate this Place
  </component>
</template>
```

#### 这个怎么运作...

使用 Vue 特殊的 `<component>` 组件，我们根据计算属性上设置的规则声明了组件应该渲染的内容。

作为一个通用组件，你始终需要保证每个可以渲染的组件的一切都在那里。 最好的方法是将 `v-bind` 指令与需要定义的 props 和规则一起使用，但也可以直接在组件上定义它，因为它将作为 prop 传递下去。

### 创建依赖注入组件

**父组件**

4.7\src\components\StarRating.vue

```vue
export default {
  name: 'StarRating',
  components: { StarRatingDisplay, StarRatingInput },
  provide: {
    starRating: true,
  },
  ...
};
```

**子组件**

4.7\src\components\StarRatingDisplay.vue

```vue
export default {
  name: 'StartRatingDisplay',
  props: {
	...
  },
  inject: {
    starRating: {
      default() {
        console.error('StarRatingDisplay need to be a child of StartRating');
      },
    },
  },
```

#### 这个怎么运作...

在运行时，Vue 会检查 `StarRatingDisplay` 和 `StarRatingInput` 组件中注入的 `starRating` 属性，如果父组件没有提供这个值，它将在控制台上记录错误。

使用组件注入通常用于维护有界组件（例如菜单和项目）之间的公共接口。 一个项目可能需要一些存储在菜单中的功能或数据，或者我们可能需要检查它是否是菜单的子项。

依赖注入的主要缺点是共享元素不再具有反应性。 因此，它主要用于共享功能或检查组件链接。

### 创建组件 mixin

有时你会发现自己一遍又一遍地重写相同的代码。 但是，有一种方法可以防止这种情况发生并使你的工作效率更高。

你可以使用所谓的 `mixin`，这是 Vue 中的一种特殊代码导入，可将组件外部的代码部分连接到当前组件。

#### 这个怎么运作...

Mixins work as an object merge, but do make sure you don't replace an already-existing property in your component with an imported one.

`mixin` 属性的顺序也很重要，因为它们将作为 `for` 循环进行检查和导入，因此最后一个 `mixin` 不会更改其任何祖先的任何属性。

在这里，我们将代码中的很多重复部分拆分为四个不同的小 JavaScript 文件，这些文件更易于维护并提高生产力，而无需重写代码。

### 懒加载你的组件

`webpack` 和 Vue 天生就是在一起的。 当使用 `webpack` 作为 Vue 项目的打包器时，可以让你的组件在需要时加载或异步加载。 这通常称为延迟加载。

#### 这个怎么运作...

当我们为每个组件声明一个返回 `import()` 函数的函数时，`webpack` 知道这个导入函数会进行代码拆分，它会使组件成为 bundle 上的一个新文件。

`import()` 函数是由 TC39 作为模块加载语法的提案引入的。 此函数的基本功能是加载异步声明的任何模块，避免在第一次加载时放置所有文件的需要。

## 5、通过 HTTP 请求从 Web 获取数据

### 为 Fetch API 创建一个包装器作为 HTTP 客户端

### 创建一个随机的猫图像或 GIF 组件

#### 这个怎么运作...

使用 `getHttp` 包装器，组件能够获取 URL 并将其检索为 `Blob` 类型。 通过此响应，我们可以使用 `URL.createObjectUrl` 导航器方法并将 `Blob` 作为参数传递，以获取可用作 `src` 属性的有效图像 URL。

### 使用 MirageJS 创建你的假 JSON API 服务器

### 使用 axios 作为新的 HTTP 客户端

### 创建不同的 axios 实例

使用 `axios` 时，您可以运行它的多个实例，而它们之间不会相互干扰。 例如，您有一个指向版本 1 上的用户 API 的实例和另一个指向版本 2 上的支付 API 的实例，两者共享相同的命名空间。

在这里，我们将学习如何创建各种 `axios` 实例，这样您就可以使用任意数量的 API 命名空间，而不会出现问题或受到干扰。

#### 更改 HTTP 函数

##### 更改 HTTP Fetch 包装器

我们需要创建一个名为 `createAxios` 的新工厂函数，以便在每次执行时生成一个新的 `axios` 实例：

```js
export function createAxios(options = {}) {
  return axios.create({
    ...options,
  });
}
```

#### 这个怎么运作...

### 为 axios 创建请求和响应拦截器

拦截器最常见的使用方式是 `JWT` 令牌验证和刷新接收特定错误或 API 错误操作的请求。

238