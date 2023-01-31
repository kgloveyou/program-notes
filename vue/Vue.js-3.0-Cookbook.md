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

使用 `axios` 时，你可以运行它的多个实例，而它们之间不会相互干扰。 例如，你有一个指向版本 1 上的用户 API 的实例和另一个指向版本 2 上的支付 API 的实例，两者共享相同的命名空间。

在这里，我们将学习如何创建各种 `axios` 实例，这样你就可以使用任意数量的 API 命名空间，而不会出现问题或受到干扰。

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

### 5.6 使用 Axios 和 Vuesax 创建 CRUD 接口

Vuesax（发音为/vjusacksː/，作为view sacks）是一个使用Vuejs创建的UI组件框架。

252

#### 创建通用用户表单组件

```js
    watch: {
      tmpForm: {
        handler(value) {
          this.$emit('input', value);
        },
        deep: true,
      },
      value: {
        handler(value) {
          this.tmpForm = value;
        },
        deep: true,
        immediate: true,
      }
    },
```

使用 `watchers` 时，声明 `deep` 属性会使 `watcher` 检查数组或对象的深层变化，而 `immediate` 属性会在组件创建后立即执行 watcher。

#### 创建创建用户组件

#### View 组件

#### 更新用户组件

####  这个是怎么运作...

```js
    provide () {
      const base = {};

      Object.defineProperty(base, 'userId', {
        enumerable: true,
        get: () => Number(this.userId),
      });

      return base;
    },
```

使用 Vue 的 `provide/inject`   API，我们能够以可观察的方式将 userId 传递给每个组件，这意味着当变量更新时，组件接收更新的变量。 使用普通的 Vue API 无法实现这一点，因此我们不得不使用 `Object.defineProperty` 并将 provide 属性用作工厂函数来返回最终对象。

#### 也可以看看

You can find more information about the Vue provide/inject API at https://vuejs.org/v2/guide/components-edge-cases.html.

# 6、使用 vue-router 管理路由

你可以添加路由守卫以检查特定路由是否可按访问级别导航或在输入路由之前获取数据以管理应用程序上的错误。

## 6.2 Creating a programmatic navigation  

## 6.3 创建动态路由路径

获取接口地址（src\http\baseFetch.js）

```js
const localApi = createAxios({
  baseURL: `${document.location.protocol}//${document.location.host}`,
});
```

## 6.4、创建路由别名

```js
const routes = [
  {
    path: '/user',
    name: 'list',
    alias: '/',
    component: List,
  },
  {
    path: '/user/:id',
    name: 'view',
    alias: '/view/:id',
    component: View,
  },
  {
    path: '/user/edit/:id',
    name: 'edit',
    alias: '/edit/:id',
    component: Edit,
  },
  {
    path: '/user/create',
    name: 'create',
    alias: '/create',
    component: Create,
  },
];
```

## 6.5、创建路由重定向

```js
const routes = [
  {
    path: '/user',
    name: 'list',
    alias: '/',
    component: List,
  },
  {
    path: '/user/:id',
    name: 'view',
    alias: '/view/:id',
    component: View,
  },
  {
    path: '/user/edit/:id',
    name: 'edit',
    alias: '/edit/:id',
    component: Edit,
  },
  {
    path: '/user/create',
    name: 'create',
    alias: '/create',
    component: Create,
  },
  {
    path: '/create-new-user',
    redirect: '/user/create',
  },
  {
    path: '/users',
    redirect: {
      name: 'list',
    },
  },
  {
    path: '/my-user/:id?',
    redirect(to) {
      if (to.params.id) {
        return '/user/:id';
      }
      return '/user';
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];
```

## 6.6、Creating a nested router view  

在 vue-router 中，嵌套路由就像你的路由的命名空间，你可以在同一个路由中有多个级别的路由，使用一个基础视图作为主视图，并在里面渲染嵌套路由。

### Creating the router-view on the layout  

当使用带有子路由的 vue-router 时，我们需要创建主视图，它将调用 RouterView 的特殊组件。 该组件将在你正在渲染的布局或页面中渲染当前路由器。

### How it works...  

`vue-router` 提供了使用子路由作为当前视图或布局的内部组件的能力。 这使得使用特殊布局文件创建初始路由成为可能，并通过 RouterView 组件在该布局内渲染子组件。
这种技术通常用于在应用程序中定义布局并为模块设置命名空间，其中父路由可以具有一组特定的顺序，这些顺序将可用于其每个子路由。

## 6.7、创建 404 错误页

## 6.8、创建和应用身份验证中间件

```js
window.btoa(JSON.stringify({
    username: this.username
})
```

### 创建中间件

所有 vue-router 中间件也可以称为导航守卫，它们可以附加到应用程序的路由变化中。 这些更改有一些钩子，你可以将它们应用于你的中间件。 身份验证中间件发生在路由器更改之前，因此我们可以处理所有事情并将用户发送到正确的路由。

## 6.9、异步延迟加载页面

```js
const routes = [
  {
    path: '/',
    redirect: '/user'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      authenticated: false,
    },
  },
  ...UserRoutes,
  {
    path: '*',
    component: () => import('@/views/NotFound'),
    meta: {
      authenticated: false,
    },
  },
];
```



因为 webpack `import()` 方法是异步的，所以这个过程可以与其他代码一起执行，而不会影响或阻塞 JavaScript VM 的主线程。

# 7、使用 Vuex 管理应用程序状态

## 7.1、创建一个简单的 Vuex store

### Creating the store  

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
    decrement({ commit }) {
      commit('decrement');
    },
  },
});
```



### Creating the reactive component with Vuex  

```js
export default {
  computed: {
    counter() {
      return this.$store.state.counter;
    },
  },
  methods: {
    increment() {
      this.$store.dispatch('increment');
    },
    decrement() {
      this.$store.dispatch('decrement');
    },
  },
};
```

## 7.2、创建和理解 Vuex state

**Progressive Web Application (PWA)/ Single Page Application (SPA)** and a **Server Side Rendering (SSR)**,  



## 7.3、创建和理解 Vuex mutations  

### How it works...  

Each `mutation` is a function that will be called as a `commit`, and will have an `identifier` in the Vuex store.   

## 7.4、创建和理解 Vuex getters  

从 Vuex 访问数据可以通过 state 本身完成，这可能非常危险，或者通过 getter。 getter 就像可以在不触及或扰乱 Vuex 存储状态的情况下进行预处理和交付的数据。

7.4\src\store\user\getters.js

```js
function getUsersList(state) {
  return state.data.usersList;
}

function getUsersData(state) {
  return state.data.userData;
}

function getUserById(state) {
  return (userId) => {
    return state.data.usersList.find(u => u.id === userId);
  }
}

function isLoading(state) {
  return state.loading;
}

function hasError(state) {
  return state.error;
}

export default {
  getUsersList,
  getUsersData,
  getUserById,
  isLoading,
  hasError,
};
```

### How it works...  

在这个秘籍中，我们创建了两种类型的 getter：最基本的，具有简单的数据返回，以及高阶函数，需要作为函数调用以检索你想要的值。

## 7.5、创建和理解 Vuex actions  

Actions  负责编排应用程序与外界之间的这种通信过程。 控制何时需要在state  上改变数据并将其返回给操作的调用者。

7.5\src\store\user\actions.js

```js
import {
  getHttp,
  patchHttp,
  deleteHttp,
} from '@/http/fetchApi';
import MT from './types';

async function fetchUsersList({ commit }) {
  try {
    commit(MT.LOADING);
    const { data } = await getHttp(`api/users`);
    commit(MT.SET_USER_LIST, data);
  } catch (error) {
    commit(MT.ERROR, error);
  }
}

async function fetchUserData({ commit }, userId) {
  try {
    commit(MT.LOADING);
    const { data } = await getHttp(`api/users/${userId}`);
    commit(MT.SET_USER_DATA, data);
  } catch (error) {
    commit(MT.ERROR, error);
  }
}

async function updateUser({ commit }, payload) {
  try {
    commit(MT.LOADING);
    await patchHttp(`api/users/${payload.id}`, {
      data: {
        ...payload,
      }
    });
    commit(MT.UPDATE_USER, payload);
  } catch (error) {
    commit(MT.ERROR, error);
  }
}

async function removeUser({ commit }, userId) {
  try {
    commit(MT.LOADING);
    await deleteHttp(`api/users/${userId}`);
    commit(MT.REMOVE_USER, userId);
  } catch (error) {
    commit(MT.ERROR, error);
  }
}

export default {
  fetchUsersList,
  fetchUserData,
  updateUser,
  removeUser,
}
```

## 7.6、使用 Vuex 创建动态组件

在 UserForm 组件中，将 v-model 指令更改为 :value 指令：

```vue
            <user-form
              :value="userData"
              disabled
            />
```

**提示**：当使用只读值时，或者你需要删除 v-model 指令的语法糖时，你可以将输入值声明为 :value 指令，并将值更改事件声明为 @input 事件侦听器。



添加一个名为 watch 的新 Vue 属性，并添加一个新属性 userData，这将是一个 JavaScript 对象。

```vue
    watch: {
      userData: {
        handler(newData) {
          this.tmpUserData = newData;
        },
        immediate: true,
        deep: true,
      }
    },
```

## 7.7、为开发添加 hot-module-reload

**hot-module-reload (HMR)**  

在这个秘籍中，我们将学习如何将 HMR 添加到 Vuex store，并且能够在无需刷新整个应用程序的情况下更改 Vuex store。

7.7\src\store\index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from './user';

Vue.use(Vuex);

export const store = new Vuex.Store({
  ...UserStore,
});

if (module.hot) {
  const hmr = [
    './user',
    './user/getters',
    './user/actions',
    './user/mutations',
  ];

  const reloadCallback = () => {
    const getters = require('./user/getters').default;
    const actions = require('./user/actions').default;
    const mutations =  require('./user/mutations').default;

    store.hotUpdate({
      getters,
      actions,
      mutations,
    })
  };

  module.hot.accept(hmr, reloadCallback);
}

export default store;
```

**提示**：由于文件的 Babel 输出，你需要在使用 webpack require 函数动态导入的文件末尾添加 .default 。

### How it works...  

Vuex store 通过 webpack HMR 插件的 API 支持 HMR。
当它可用时，我们会创建一个可以更新的可能文件列表，以便 webpack 可以知道这些文件的任何更新。 当这些文件中的任何一个更新时，都会执行你创建的特殊回调。 此回调使 Vuex 能够更新或完全更改更新文件的行为。

## 7.8、Creating a Vuex module  

Vuex 有一种称为模块的方法，可以帮助我们将 store 分成不同的 store 分支。 这些分支或模块中的每一个都有一组不同的state  、mutation  、getter 和action  。 此模式有助于开发并降低向应用程序添加新功能的风险。

### 创建新的身份验证模块

### 将模块添加到 Vuex

src\store\index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from './user';
import Authentication from './authentication';

Vue.use(Vuex)

export default new Vuex.Store({
  ...UserStore,
  modules: {
    Authentication,
  }
})
```

### How it works...  

模块像独立的 Vuex stores 一样工作，但在同一个 Vuex 单一数据源中。 这有助于开发更大规模的应用程序，因为你可以维护和使用更复杂的结构，而无需检查同一文件中的问题。

同时，可以使用模块和普通 Vuex store ，从遗留应用程序迁移，因此你不必从头开始重写所有内容即可使用模块结构。

在我们的例子中，我们添加了一个名为 `authentication` 的新模块，其中只有一个 state 存在于 store 中，并继续使用旧的用户 Vuex store，以便将来我们可以将用户 store 重构到一个新模块中，并将其分离到一个 更具体的领域驱动架构。

# 8. Animating Your Application with Transitions and CSS  

使用 Animate.css 创建自定义过渡类

使用自定义 hooks 创建事务

## 创建你的第一个 CSS 动画

要使用 Vue 中可用的动画，我们需要在将动画应用于单个元素时使用名为 `Transition` 的组件，或者在处理组件列表时使用名为 `TransitionGroup` 的组件。

08.1\src\App.vue

```vue
<template>
  <div id="app">
    <transition name="image">
      <img
        v-if="display"
        alt="Vue logo" src="./assets/logo.png">
    </transition>
    <button
      @click="display = !display"
    >
      Toggle
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    display: true,
  }),
};
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .image-enter-active {
    animation: bounce-in .5s;
  }
  .image-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
```

### How it works...  

**提示**：`Transition` 组件为需要存在的 CSS 类使用预制命名空间。 这些是 `-enter-active`，当组件进入屏幕时，`-leave-active`，当组件离开屏幕时。

## 8.2、使用 Animate.css 创建自定义过渡类

### How to do it...  

```sh
npm install animate.css@3.7.2  
```

08.2\src\main.js

```js
import Vue from 'vue';
import App from './App.vue';
import 'animate.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

08.2\src\App.vue

```vue
<template>
  <div id="app">
    <transition
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutLeft"
    >
      <img
        v-if="display"
        alt="Vue logo" src="./assets/logo.png">
    </transition>
    <button
      @click="display = !display"
    >
      Toggle
    </button>
  </div>
</template>
```

### How it works...  

### There's more...  

Animate.css documentation at https://animate.style/.  

## 8.3 Creating transitions with custom hooks 

### How it works...  

The `Transition` component has eight custom hooks. These hooks are triggered by the CSS animations and when they are triggered, they emit custom events, which can be used by the parent component. These custom events are `before-enter`, `enter`, `after-enter`,`enter-cancelled`, `before-leave`, `leave`, `after-leave`, and `leave-cancelled`.  

## 8.4 在页面渲染时创建动画

在这个秘籍中，我们将学习如何使用 `Transition` 组件，以便在渲染页面时触发动画。

### How it works...  

Transition 组件有一个名为 appear 的特殊属性，启用该属性后，元素在屏幕上渲染时会触发动画。

## 8.5 Creating animations for lists and groups  

有些动画需要在一组元素或列表中执行。这些动画需要包装在 `TransitionGroup` 元素中才能工作。

### How it works...  

## 8.6 Creating a custom transition component  

08.6\src\components\CustomTransition.vue

```vue
<template functional>
  <transition
    :appear="props.appear"
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutRight"
  >
    <slot />
  </transition>
</template>
```

### How it works...  

首先，我们使用函数式组件的方式创建了一个自定义组件，这里不需要声明单文件组件的<script>部分。

## 8.7 在元素之间创建无缝过渡

当两个组件之间有动画和过渡时，它们需要是无缝的，这样当组件被放置在屏幕上时，用户不会看到 DOM 摇晃和重新绘制。 为此，我们可以使用 `Transition` 组件和过渡模式属性来定义过渡将如何发生。

### How it works...  

Transition 组件有一个名为 mode 的特殊属性，可以在其中定义元素过渡动画的行为。此行为将创建一组规则来控制动画步骤在 Transition 组件内的发生方式。

# 9 使用 UI 框架创建漂亮的应用程序

## 9.3 使用 Ant-Design 创建页面、布局和用户表单

### How it works...  

# 10 将应用程序部署到云平台

在本章中，我们将学习如何使用三种不同的托管平台——Netlify、Vercel  和 Firebase。

## 使用 GitHub 准备在 Netlify 上自动部署

### How it works...  

Netlify 平台连接到你的 GitHub 帐户并作为应用程序安装，允许访问选定的存储库。 然后，在平台上，你可以选择要用于部署的存储库。 选择存储库后，我们需要使用构建指令和构建的目标文件夹配置 Netlify-CLI。 最后，CLI 运行，我们的应用程序在 Web 上启动并运行。

## 使用 GitHub 准备在 Vercel 上自动部署

我们在前面的秘籍中学习了如何使用 Vercel-CLI 通过本地终端将我们的应用程序部署到 Web，但是可以将存储库管理器与 Vercel 平台集成并通过任何推送或打开的拉取请求自动部署。这就是我们将在这个食谱中做的。

# 11 Directives, Plugins, SSR, and More

462