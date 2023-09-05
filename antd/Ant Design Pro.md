# Ant Design Pro

https://pro.ant.design/zh-CN（v5）

## 基础使用

### 文件夹结构

#### 页面代码结构推荐

```
src
├── components
└── pages
    ├── Welcome        // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
    |   ├── Form.tsx
    |   ├── index.tsx  // 页面组件的代码
    |   └── index.less // 页面样式
    ├── Order          // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── index.tsx
    |   └── index.less
    ├── user           // 一系列页面推荐通过小写的单一字母做 group 目录
    |   ├── components // group 下公用的组件集合
    |   ├── Login      // group 下的页面 Login
    |   ├── Register   // group 下的页面 Register
    |   └── util.ts    // 这里可以有一些共用方法之类，不做推荐和约束，看业务场景自行做组织
    └── *              // 其它页面组件代码
```

一系列页面推荐通过小写的单一字母做 group 目录；单个页面推荐大写目录；

所有路由组件（会配置在路由配置中的组件）我们推荐以大驼峰命名打平到 pages 下面第一级（复杂的项目可以增加 group 层级，在 group 下放置 pages）。不建议在路由组件内部再嵌套路由组件 - 不方便分辨一个组件是否是路由组件，而且不方便快速从全局定位到路由组件。

我们推荐尽可能的拆分路由组件为更细粒度的组件，对于多个页面可能会用到的组件我们推荐放到 src/components 中，对于只是被单个页面依赖的（区块）组件，我们推荐就近维护到路由组件文件夹下即可。

## 样式和资源

### 添加图片，字体和文件

如果想要使用缓存，可以把文件放到 `public/logo.png`，然后再代码中这样使用。

```tsx
// 使用 antd 的图片
return <Image src="/logo.png" />;
```

在编译的时候，public 会全部移动到 dist 中，不会进行任何处理。使用时一定要使用绝对路径。通常我们建议从 JavaScript 导入 stylesheets，图片和字体。 public 文件夹可用作许多不常见情况的变通方法.

### 添加 SVG

svg 是一种特殊标签，为了方便管理，我们建议大家将其转化为一个组件来使用。网络上有很多将 svg 转化为的 react 组件的[工具](https://github.com/sairion/svg-inline-react)。最后结果是这样的：

```tsx
return (
  <svg width={300} height={300}>
    <rect
      width="100%"
      height="100%"
      style={{ fill: 'purple', strokeWidth: 1, stroke: 'rgb(0,0,0)' }}
    />
  </svg>
);
```

## 质量

### Lint

Pro 中一直有一套自己的 lint 的规则列表，默认模式比较严格，以下是一些常见的 lint 错误，以下是内置的一些错误。

- prettier（一个“有态度”的代码格式化工具，按保存键时，代码就被格式化了）

  对应的配置文件：.prettierrc.js

- eslint（可组装的JavaScript和JSX检查工具）

  对应的配置文件：.eslintrc.js

- stylelint

  A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.

### TypeScript

#### 什么时候推荐用 type 什么时候用 interface ？

推荐任何时候都是用 type， type 使用起来更像一个变量，与 interface 相比，type 的特点如下：

- 表达功能更强大，不局限于 object/class/function
- 要扩展已有 type 需要创建新 type，不可以重名
- 支持更复杂的类型操作

基本上所有用 interface 表达的类型都有其等价的 type 表达。在实践的过程中，我们也发现了一种类型只能用 interface 表达，无法用 type 表达，那就是往函数上挂载属性。

```tsx
interface FuncWithAttachment {
  (param: string): boolean;
  someProperty: number;
}

const testFunc: FuncWithAttachment = {};
const result = testFunc('mike'); // 有类型提醒
testFunc.someProperty = 3; // 有类型提醒
```

#### 定义接口数据

很多项目中是没有类型定义的，这里推荐 json2ts 等网站来自动转化。

####  一些小坑

##### React.forwardRef

如果我们使用 function 组件，可能会报错 ref 找不到，这时候我们就需要使用 `React.forwardRef`,但是要注意的是 类型也要做相应的修改。

```tsx
- React.FC<CategorySelectProps>
+ React.ForwardRefRenderFunction<HTMLElement, CategorySelectProps>
```

##### 动态增加

有时候我需要对一个 Object 的 key 进行动态的更新，为了方便我们可以对 key 设置为 any，这样就可以使用任何 key，多余 JSON.parse

```tsx
type Person = {
  name: string;
  age?: number;
  [propName: string]: any;
};
```

## 高级使用

### 菜单的高级用法

#### 自定义高亮

这样的路由非常标准，可以被 ProLayout 完美的消费，高亮也能正确展示，但是不一定所有的菜单的都可以做的这么规范，ProLayout 也提供一个方式来重定向菜单的高亮。如果我们想要 `/list/:id`，高亮 `/product`可以这样配置。

```tsx
export default [
  {
    path: '/product',
    hideInMenu: true,
    name: '产品管理',
  },
  {
    path: '/list/:id',
    hideInMenu: true,
    name: '列表详情',
    parentKeys: ['/product'],
  },
];
```

这样就可以在`/list/:id`路径的时候，也高亮 `/product`, `parentKeys` 中的 `key` 一般是路径，如果不方便设置为路径的话可以在 菜单配置中增加 key 属性，Layout 会优先使用配置的 `Key` 属性。

### 环境变量

当 `UMI_ENV` 为 `test` 时，则必须在 config 目录下配置 `config.test.ts` 文件来管理 `test` 环境下的不同变量，Umi 框架会在 deep merge 后形成最终配置。



配置文件夹 config 下的结构：

```bash
ant-design-pro
├── config
│   ├── config.dev.ts
│   ├── config.test.ts
│   ├── config.pre.ts
│   ├── config.prod.ts
│   ├── config.ts
│   ├── proxy.ts
│   ├── routes.ts
│   ├── defaultSettings.ts
...
```

## 其他

### 常见问题

#### 如何从服务器请求菜单？

你可以在 [src/layouts/BasicLayout.tsx](https://github.com/ant-design/ant-design-pro/blob/4420ae2c224144c4114e5384bddc3e8ab0e1dc1c/src/layouts/BasicLayout.tsx#L116) 中修改 `menuDataRender`，并在代码中发起 http 请求，只需服务器返回下面格式的 json 即可。

```tsx
const [menuData, setMenuData] = useState([]);

useEffect(() => {
// 这里是一个演示用法
// 真实项目中建议使用 dva dispatch 或者 umi-request
fetch('/api/example.json')
  .then(response => response.json())
  .then(data => {
    setMenuData(data || []);
  });
}, []);

...

return (
<ProLayout
  ...
  menuDataRender={() => menuData}
  ...
/>
);
```

`menuData` 数据格式如下，ts 定义在此：[MenuDataItem](https://github.com/ant-design/ant-design-pro-layout/blob/56590a06434c3d0e77dbddcd2bc60827c9866706/src/typings.ts#L18).

```tsx
[
{
  path: '/dashboard',
  name: 'dashboard',
  icon: 'dashboard',
  children: [
    {
      path: '/dashboard/analysis',
      name: 'analysis',
      exact: true,
    },
    {
      path: '/dashboard/monitor',
      name: 'monitor',
      exact: true,
    },
    {
      path: '/dashboard/workplace',
      name: 'workplace',
      exact: true,
    },
  ],
}
....
]
```

# ant design pro v4 从后台服务器请求菜单

https://www.yuque.com/deepstates/blog/wgnx0u

# ant design pro v4 菜单权限、按钮权限控制

https://www.yuque.com/deepstates/blog/rkv8p1

# Antd-Pro 动态路由

https://webliuyang.com/react/problem/Antd-Pro%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1.html

# ant design pro 动态路由

https://juejin.cn/s/ant%20design%20pro%20%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1

# antd pro 动态菜单与动态路由

https://www.yuque.com/liuyin-zzwa0/ada6ao/va6p77

# ant-design-pro动态加载menu菜单

https://www.cnblogs.com/steamed-twisted-roll/p/16257672.html

# 基于 Ant Design Pro 的菜单栏权限控制

https://juejin.cn/post/6875880022537109512

# 前端重定向，index.html文件被浏览器缓存，导致整个应用都是旧的

https://github.com/ant-design/ant-design-pro/issues/1365

# [前端项目中 浏览器缓存的更新不及时问题及解决方法](https://www.cnblogs.com/SallyShan/p/13603221.html)

# [React 项目生产版本迭代页面不刷新问题](https://www.cnblogs.com/zfygiser/p/10489289.html)