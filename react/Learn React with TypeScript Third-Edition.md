# 代码

https://github.com/PacktPublishing/Learn-React-with-TypeScript-Third-Edition/tree/main/

React 19 or later

Next.js 15 or later

TypeScript 5 or later

# 第1章：React入门

使用 Vite 创建项目。

## 使用 state

打开 App.jsx 文件，并将 closable 属性传递给 Alert 组件：

```jsx
export default function App() {
  return (
    <div className="App">
      <Alert 
        type="information" 
        heading="Success"
        closable
      >
        Everything is really good!
      </Alert>
    </div>
  );
}
```

注意，在 closable 属性上并没有显式地定义一个值。我们也可以像下面这样传递该值：

```jsx
closable={true}
```

然而，对于布尔类型的属性，没有必要显式传递值。如果某个元素上存在该布尔属性，它的值会自动被视为 true。

## 使用 React 开发者工具  

### 使用组件（Components）工具  

### 使用性能分析（Profiler）工具

# 第2章：TypeScript 入门

## 使用基础 TypeScript 类型

### 使用 `any` 类型

### 使用 `unknown` 类型

`unknown` 类型与 `any` 类型恰恰相反——它本身不包含任何具体类型信息。一个"空类型"乍看似乎毫无用处，但通过类型检查后，TypeScript 能够安全地将其扩展为更具体的类型。



以下是本节所学基础类型的总结：

- TypeScript 在 JavaScript 类型（如 Date）基础上添加了许多有用的类型，并能够表示数组。
- TypeScript 可以根据变量的赋值推断其类型。当类型推断无法得到期望的类型时，可以使用类型注解。
- 对于 any 类型的变量不会进行类型检查，因此应避免使用该类型。
- unknown 类型是 any 的强类型替代方案，但必须先对 unknown 变量进行类型收窄才能使用。
- 数组类型可以通过在元素类型后添加方括号来定义（例如：string[]）。

# 第3章：使用 React Hooks

## 使用 memo Hook

### 理解 memo Hook

### 使用 memo Hook

请注意，在开发模式和 React 的严格模式下会发生**双重渲染**。因此，当点击按钮时，你会在控制台看到两次 `Executing silly function` 的输出。



## 使用 callback Hook

### 理解 callback Hook

`useCallback` 的常见用途是避免子组件不必要的重新渲染。在使用 `useCallback` 之前，我们先花时间理解组件何时会重新渲染。

### 理解组件何时重新渲染

### 使用 callback Hook

这个章节使用React Profiler工具的火焰图，展示了组件重新渲染的过程。

## 其他 React Hooks

### useId

`useId` Hook 用于生成唯一 ID，通常应用于可复用组件的无障碍访问（a11y）属性。

### useTransition

`useTransition` Hook 能够让状态转换不阻塞用户界面（UI），因此特别适合处理那些可能需要较长时间才能完成的状态转换。

以下组件允许用户筛选一个大型姓名列表。当用户在搜索输入框中键入字符时，列表状态会更新为筛选后的姓名结果。通过 React 的 `useTransition` 机制，该列表状态更新会被标记为低优先级任务，从而确保用户在输入时搜索框不会出现卡顿现象。

`useTransition` Hook 返回一个包含以下两项的元组（tuple）：

1. **过渡状态标志**：用于判断当前是否正在进行过渡。在下方示例中，该标志变量名为 `isPending`。
2. **启动过渡的函数**：用于显式触发过渡过程。在下方示例中，该函数名为 `startTransition`。

```tsx
function App() {
  const [query, setQuery] = useState('');
  const [list, setList] = useState(names);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);

          startTransition(() => {
            setList(
              names.filter((name) => name.toLowerCase().includes(e.target.value.toLowerCase())),
            );
          });
        }}
        placeholder="Search names..."
      />

      {isPending && <p>Loading...</p>}
      <ul>
        {list.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### useDeferredValue

与 `useTransition` 类似，`useDeferredValue` Hook 也能帮助优化用户界面（UI）性能。该 Hook 的主要作用是延迟更新某个原始值（primitive value）的渲染。

# 第4章：React前端样式化方案

## 使用 CSS modules

### 理解 CSS modules

**CSS Modules** 是一个开源库，托管在 GitHub 上（https://github.com/css-modules/css-modules），它可以集成到打包流程中，自动实现 CSS 类名的局部作用域（scoped）。

一个 **CSS 模块** 和普通的 CSS 文件类似（如前一节所述），但它的文件扩展名是 `.module.css` 而不是 `.css`。这个特殊的扩展名让 **Vite**（或其他构建工具）能够区分 CSS 模块文件和普通 CSS 文件，从而采用不同的处理方式。

在 React 组件中，可以这样导入 CSS 模块文件：

js

```tsx
import styles from './styles.module.css';
```



使用 Vite 创建的项目已默认集成并配置好 CSS Modules，这意味着我们无需额外安装即可直接在项目中使用它。

### 在 alert 组件中使用 CSS modules



以下是关于 CSS Modules 的核心要点总结：

1. **作用机制**
   CSS Modules 能够自动将 CSS 类名限定在 React 组件作用域内，有效避免不同组件间的样式冲突。
2. **技术本质**
   它并非浏览器原生支持的标准特性，而是一个可通过构建流程集成的开源库。不过在使用 Vite 创建的项目中，该功能已默认预装并完成配置。
3. **开发体验**
   在 CSS 模块文件中，开发者可以像编写普通 CSS 那样进行样式定义，这种熟悉的书写方式降低了学习成本。
4. **生产构建**
   与常规 CSS 类似，CSS Modules 在生产环境的 CSS 打包过程中不会自动移除冗余的类名定义。

## 使用 Tailwind CSS

### 理解 Tailwind CSS

### 安装和配置 Tailwind CSS

### 使用 Tailwind CSS

# 第5章：React 服务端组件与客户端组件的应用
## 理解服务器组件

### 理解什么是服务器组件

RSC（React Server Components，React 服务器组件）最初在实验性的 React 18 版本中引入，并在 React 19 中正式发布。在此之前的 React 版本中，所有组件均为客户端组件（Client Components）。

### 理解 RSC（React Server Components，React 服务器组件）如何解决 SPA（单页应用）的问题

### 理解服务器组件的优势

## 创建服务端组件

### 创建项目

在 Next.js 中，组件默认即为 RSC（React 服务器组件）——也就是说，你无需任何额外声明即可让组件以 RSC 形式运行。事实上，你无法显式地将一个组件标记为 RSC，只能明确指定某个组件为客户端组件（Client Component）。本章后续部分将详细讲解具体实现方式。

### 创建一个 RSC

## 探索客户端组件

### 理解客户端组件

对于交互式应用而言，客户端组件（Client Components）至关重要。事实上，在 React 服务器组件（RSC）推出之前，所有 React 组件本质上都是客户端组件。

以下是客户端组件具备而服务器组件所不具备的关键特性：

- 支持 React Hooks（如 useState、useRef 和 useEffect）
- 提供浏览器事件处理能力（例如按钮的 onClick 事件）
- 能够与 React 上下文（Context）共享状态和函数
- 可直接访问浏览器 API（如 window.localStorage）

接下来，我们将深入探讨 Next.js 中客户端组件的渲染机制。

### 解析客户端组件的渲染机制

### 声明客户端组件

正如本章前文所述，在 Next.js 中组件默认以 RSC（服务器组件）形式运行。若需明确声明某个组件为客户端组件（Client Component），则必须在文件顶部添加 `'use client'` 指令。但需要注意的是，任何被导入到客户端组件文件中的组件会自动继承客户端组件特性，此时无需额外添加 `'use client'` 声明。

### 创建客户端组件

```tsx
'use client';
import { useState, useEffect } from 'react';

export function ColorModeToggle() {
  console.log('Does ColorModeToggle run on the Server and Client?');
  const [colorMode, setColorMode] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    if (colorMode === 'dark') {
      document.body.classList.add('dark');
      document.documentElement.style.setProperty('--background', '#0a0a0a');
      document.documentElement.style.setProperty('--foreground', '#ededed');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.style.setProperty('--background', '#ffffff');
      document.documentElement.style.setProperty('--foreground', '#171717');
    }
  }, [colorMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorMode(mediaQuery.matches ? 'dark' : 'light');
  }, []);

  function handleClick() {
    const newColorMode = colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(newColorMode);
  }

  return (
    <button onClick={handleClick} className="flex rounded bg-blue-500 px-4 py-2 text-white">
      {colorMode === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
```

这段代码用于在网页应用中启用“深色模式”主题。

第一行 [document.body.classList.add('dark');](vscode-file://vscode-app/c:/Program Files/Microsoft VS Code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) 给 `<body>` 元素添加了 `dark` 这个 CSS 类。这样可以在 CSS 中通过 `.dark` 类来应用深色模式的专属样式。

接下来的两行通过 [document.documentElement.style.setProperty](vscode-file://vscode-app/c:/Program Files/Microsoft VS Code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) 方法，在根元素 `<html>` 上设置了自定义的 CSS 变量。`--background` 被设置为非常深的颜色（`#0a0a0a`），`--foreground` 被设置为较浅的颜色（`#ededed`）。这些变量可以在 CSS 中被引用，用于动态切换背景色和前景色（通常是文字颜色）。

这三行代码结合起来，可以通过同时更新类名和 CSS 变量的方式，让界面切换到深色配色方案。这种做法灵活且易于维护，有助于扩展和管理应用的主题功能。



至此，我们完成了关于客户端组件的章节内容。以下是本章要点回顾：

- 客户端组件对交互式应用至关重要，因为它们支持React Hooks、事件处理和DOM访问等功能。这类组件会先在服务器端运行，随后在客户端通过"水合"（hydration）过程注入交互能力。

- 每个客户端组件文件顶部必须添加'use client'指令。但需注意：被导入到客户端组件文件中的其他组件会自动成为客户端组件，这意味着后续的客户端组件无需重复添加'use client'指令。

- 最后需要说明的是，ColorModeToggle是我们应用中的第一个客户端组件。该组件包含状态管理、副作用处理和事件处理器，因此必须采用客户端组件模式而非服务端组件（RSC）架构。

## 组合服务端组件与客户端组件

### 服务端组件（RSC）与客户端组件的对比

<img src="Learn React with TypeScript Third-Edition.assets/image-20250715104827530.png" alt="image-20250715104827530" style="zoom: 67%;" />

### 理解何时使用 RSC 或客户端组件

如果你正在创建一个新的 Next.js 页面，应该从服务端组件（RSC）开始构建组件树。这是因为这是 Next.js 的默认设置，而且服务端组件往往更简单、性能更优。如果某个组件需要服务端组件所不具备的功能（例如交互性），就将其转换为客户端组件。为了实现最佳性能，只需将服务端组件无法实现的部分隔离到客户端组件中。这正是我们在上一节中对 ColorModeToggle 所采用的做法。

接下来，我们将深入理解究竟在什么情况下需要使用 'use client' 指令。

### 理解客户端边界

在代码中引入 `'use client'` 指令后，后续导入的所有文件都会自动成为客户端组件。这一机制被称为**客户端边界**（client boundary）。

下图直观展示了该应用页面中的客户端边界划分：



**Page** 和 **Header** 组件属于服务端组件（RSC）。需要注意的是，**ContactForm** 因包含 `'use client'` 指令，所以是一个客户端组件。而 **Name**、**Details** 和 **Submit** 组件本身已经是客户端组件，因此无需再添加 `'use client'` 指令。由此可见，**ContactForm** 导入的所有内容都会被纳入一个客户端边界（client boundary）内。

你可能会认为在客户端组件中渲染服务端组件是不可能的。下一节我们将详细讲解如何实现这一点。

### 在 ColorModeToggle 中渲染 RSC

在本节中，我们将为 **ColorModeToggle** 组件添加一个图标。回顾一下，这个组件目前是一个**客户端组件（Client Component）**。接下来，我们会学习如何将这个图标转换为一个**服务端组件（RSC）**。

需要明确的是：**客户端组件无法直接导入服务端组件**。但反过来，**服务端组件可以作为 props 传递给客户端组件**。

基于这一核心机制，我们将把图标组件（RSC）集成到 **ColorModeToggle** 中。具体步骤如下：

# 第6章：使用Next.js创建多页面应用

## 创建路由

### 理解路由

**路由（Route）** 是 Web 应用中与特定 URL 对应的路径。Next.js 提供两种路由系统：**页面路由（Page Router）** 和 **应用路由（App Router）**。本书将重点介绍较新发布的 **应用路由**，我们的项目正是基于此配置的。

### 创建一个 posts 路由

**核心要点在于**：Next.js 的路由是通过 **app 目录结构** 和 **page.tsx 文件** 来定义的。

## 创建导航

### 使用 Link 组件

**关键点在于**：`Link` 组件可以在 RSC（服务端组件）中使用。（也可在客户端使用）

### 使用 useRouter

Next.js 的 `useRouter` 钩子支持以编程方式实现导航。与 `Link` 组件不同，它无法在服务端组件（RSC）中使用，因此调用该钩子的组件必须声明为客户端组件。

该 hook 返回一个包含实用路由方法的对象，主要包括：

- **push**：执行客户端导航，在浏览器历史记录中新增一条记录
- **replace**：执行客户端导航，但不会在浏览器历史记录中新增条目
- **refresh**：刷新当前路由，同时保持所有状态不丢失



至此，我们已完成关于导航功能的介绍。总结如下：

- **Link 组件**是 Next.js 推荐的导航方式，既可用于服务端组件（RSC），也支持在客户端组件中使用
- **useRouter 钩子**则为客户端组件提供了编程式导航的能力

## 创建共享布局（Creating shared layout）

### 理解布局组件

在 Next.js 中，共享布局通过一个名为 `layout.tsx` 的特殊文件来定义。我们可以在任意路由层级创建共享布局。当前应用在 `src/app` 目录的根路径下已配置了一个共享布局。以下是该文件的部分内容：

```tsx
export default function RootLayout({ children }: ...) {
    return (
        <html lang="en">
            <body ... >
                {children}
            </body>
        </html>
    );
} 
```

该文件导出一个作为默认导出的 React 组件。组件名称可以自定义（当前命名为 `RootLayout` 是因为它会为所有路由提供布局渲染）。

布局组件既可以是服务端组件（RSC），也可以是客户端组件。在本应用中，`RootLayout` 被定义为服务端组件。

当前路由对应的页面组件会作为 `children` prop 传递给布局组件。例如：

- 访问 `/` 路径时会渲染 `Home` 页面组件
- 访问 `/posts/` 路径时会渲染 `Posts` 页面组件

在理解了共享布局组件的工作原理后，接下来我们将创建一个共享页头组件。

### 创建一个 header

```tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  return (
    <header>
      <Link href="/" className={pathname === '/' ? 'active' : ''}>
        Home
      </Link>
      <Link href="/posts" className={pathname === '/posts' ? 'active' : ''}>
        Posts
      </Link>
    </header>
  );
}
```

我们需要将 `Header` 组件改造为**客户端组件（Client Component）**，因为 `usePathname` 这个 Hook **无法在服务端组件（RSC）中使用**。

## 创建动态路由

### 理解动态路由

在 Next.js 中，**动态路由**允许你创建能够响应不同 URL 参数的页面，从而根据 URL 中的变化数据动态显示页面内容。动态 URL 片段需要用**方括号** `[]` 来定义。

一个典型的例子是我们的文章页面，其URL表现为`posts/1`、`posts/2`等形式，在动态路由形式下对应`posts/[id]`。在这个动态路由中，`id`被称为路由参数。

路由参数通过 `params` prop 传递给页面组件。例如，`id` 参数可以在文章页面中按如下方式使用：

```tsx
export default async function Post({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    return <main>Blog post {id}</main>;
}
```

类型注解用于强制声明路由参数的类型。请注意，`params` prop 是异步的，这意味着组件必须使用 `async` 关键字声明。

如果需要在组件树的更深层级使用路由参数，Next.js 提供了 `useParams` 这个 Hook 来实现。但需要注意，它**仅适用于客户端组件（Client Components）**，不能在服务端组件（RSC）中使用。`useParams` 支持通过泛型参数来强制声明路由参数的类型。以下是一个使用 `id` 参数的示例：

```tsx
‘use client’;
import { useParams } from ‘next/navigation’;
export function SomeComponent() {
    const params = useParams<{id: string}>();
    return <h3>Blog post {params.id}</h3>
}
```

## 使用查询参数

### 理解查询参数

搜索参数是 URL 中位于问号 `?` 之后、并由 `&` 符号分隔的部分。搜索参数有时也被称为查询参数。在以下 URL 中，`type` 和 `when` 就是搜索参数：
`https://somewhere.com/?type=sometype&when=recent`

在 Next.js 中，可以通过 `searchParams` prop 访问搜索参数，如下所示：

```tsx
export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}) {
    const params = await searchParams;
    return (
        <main>
            Searching: {params.type}, {params.when}
        </main>
    );
}
```

请注意，`searchParams` 是异步的，因此必须使用 `await` 获取其值，并且组件必须声明为异步函数。

如果需要在组件树的更深层级访问搜索参数，Next.js 提供了 `useSearchParams` 这个 Hook。需要注意的是，**该 Hook 仅限客户端组件（Client Components）使用**，不适用于服务端组件（RSC）。以下是一个获取 `type` 和 `when` 参数的示例：

```tsx
'use client';
import { useSearchParams } from 'next/navigation';

export function SomeComponent() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const when = searchParams.get('when');
    // ...
}
```

### 给 app 添加查询功能

# 第7章: Server Component Data Fetching and Server Function Mutations

在本章中，我们将学习如何通过服务器组件（Server Component）从服务器获取数据，并探讨这种方式的优点。我们将基于上一章创建的博客应用进行升级，接入真实数据库数据来实现更贴近实际的数据交互。在此过程中，我们会实现加载状态指示器和错误处理机制，以确保良好的用户体验。

随后，我们将学习React服务器函数（React Server Functions）的数据变更操作，并运用这些知识在应用中创建新的博客文章。同样地，我们会通过实现数据变更状态指示器和错误处理来保障用户体验的流畅性。

## 理解服务端和客户端数据获取

### 客户端的数据获取

### 服务端的数据获取

> 注意：需要特别说明的是，无论是客户端数据获取还是服务器端数据获取，数据既可以直接从数据库查询获得，也可以从其他服务器端点获取。

### 理解两者各自的好处



本节关于客户端与服务器端数据获取机制的讲解到此结束。总结如下：客户端数据获取发生在初始渲染之后，需要发起多次HTTP请求，由于会导致页面重新渲染，因此用户体验相对较慢。而服务器端数据获取效率更高，能在初始渲染阶段就展示数据，且仅需较少HTTP请求。但其局限性在于，若不进行整页刷新就无法更新数据。

## 环境配置指南

### 创建项目

### 配置数据库

SQLite 是一种基于 SQL 的轻量级数据库引擎，具有开箱即用的易用性。我们将采用 SQLite 的一个流行分支版本——libSQL，该版本与 Next.js 框架深度集成。当前项目已预装 libSQL 所需的依赖项。

安装 vs code 插件 **SQLite3 Editor**。

## 使用 RSC 获取数据

### 为数据库查询添加类型安全保障

知名库 Zod 能以优雅的方式实现数据模式验证。若验证失败，系统会直接抛出错误。虽然这种处理方式看似不够理想，但它能精准定位问题根源，从而帮助开发者快速修复问题。

## 使用 React Suspense 实现加载状态指示器

### 理解 React Suspense

## 使用 React 错误边界处理异常

React 错误边界是一种组件，用于在渲染过程中捕获其子组件的错误。目前仅支持在 React 类组件中使用错误边界。若要在函数组件中使用该特性，可以通过 react-error-boundary 这个第三方库提供的 ErrorBoundary 组件来实现。

## 使用 Server Function 改变数据

### 理解  Server Function

React Server Function 顾名思义——是一个在服务器端执行的函数。其典型应用场景是执行数据库变更操作（如增删改）。

```tsx
export function DeleteButton({id}: {id: number}) {
    async function deleteProduct() {
        ‘use server’;
        const client = createClient({ 
            url: process.env.DB_URL ?? ‘’
        });    
        await client.execute({
            sql: ‘DELETE FROM products WHERE id = ?’,
            args: [id],
        });
        client.close();
    }
    return (
        <button type=”button” onClick={deleteProduct}>
            Delete
        </button>
    );
}
```

`'use server'` 指令将 `deleteProduct` 函数标记为一个服务端函数。该函数不会被下载到浏览器——它仅存在于服务器端运行。这意味着数据库的敏感信息（如连接凭证）不会泄露到浏览器环境。

你可能会认为，前面的代码片段不可能是 React Server Component（RSC），因为它包含了一个按钮点击事件处理函数。我们之前学过，RSC 本身无法直接处理事件，因为它们必须运行在服务端。但在 Next.js 中，这段代码可以正常工作——因为 RSC 允许将服务端函数（Server Functions）通过特定的事件处理器传递到客户端，而 `onClick` 就是支持这种能力的事件之一（另一个常用的是 `onSubmit`）。需要强调的是，整个服务端函数并不会被完整发送到客户端，客户端仅能获取它的引用。

服务端函数（Server Functions）也可以从客户端组件（Client Components）中调用，但必须放在不同的文件里。下面是同一个功能的实现示例，但这次 `DeleteButton` 是一个客户端组件：

------

`DeleteButton.tsx` 文件

```tsx
'use client';
import { deleteProduct } from '@/data/deleteProduct';

export function DeleteButton({ id }: { id: number }) {
    return (
        <button
            type="button"
            onClick={() => deleteProduct(id)}
        >
            Delete
        </button>
    );
}
```

`deleteProduct` 服务端函数被导入，并像普通函数一样调用。

------

`deleteProduct.ts` 文件

```ts
'use server';
import { createClient } from '@libsql/client';

export async function deleteProduct(id: number) {
    const client = createClient({ 
        url: process.env.DB_URL ?? ''
    });
    await client.execute({
        sql: 'DELETE FROM posts WHERE id = ?',
        args: [id],
    });
    client.close();
}
```

文件顶部的 `'use server'` 指令将该文件中导出的函数标记为服务端函数。

### 创建一个服务端函数

createPost.ts

```ts
‘use server’;
import { revalidatePath } from ‘next/cache’;
import { createClient } from ‘@libsql/client’;
export async function createPost(
    title: string,
    description: string,
) {
    const client = createClient({
        url: process.env.DB_URL ?? ‘’,
    });
    await client.execute({
        sql: ‘INSERT INTO posts(title, description) VALUES (?, ?)’,
        args: [title, description],
    });
    client.close();
    revalidatePath(‘/posts’);
}
```

`revalidatePath` 函数会清除 Next.js 的缓存，从而使新发布的文章能够立即显示在列表中。

`'use server'` 指令的作用是将该函数标记为服务端函数（Server Function），使其只能在服务器端执行。

### 添加进度指示器

### 处理错误



至此，我们已完成错误处理部分及本章关于服务端函数（Server Functions）的内容。以下是快速回顾：

• 服务端函数（Server Functions）支持以简单且类型安全的方式，直接从 React 组件中执行服务端代码。

• 客户端组件（Client Component）中的进度指示器可通过 React 状态实现——在执行服务端函数前后分别更新该状态即可。

• 利用 try-catch 语句可捕获服务端函数中的错误。通过将错误是否发生的结果返回给 React 组件，即可在界面中渲染出成功或错误的对应状态。

## 问题

4、为什么在 Next.js 中不推荐使用 React 服务端函数进行数据获取？

Next.js 中的 React 服务端函数使用 HTTP POST 请求而非 HTTP GET 请求，因此无法利用浏览器或 CDN 缓存。

# 第8章：使用 TanStack Query 实现客户端组件数据获取与变更操作

## 使用 TanStack Query 进行数据获取

### 理解使用 useEffect 进行数据获取的挑战

随着需要处理的边缘情况（edge cases）增多，实现这段代码的复杂度会迅速上升。TanStack Query 的维护者之一 Dominik Forgmeister 在以下博客文章中更深入地探讨了这种复杂性：https://tkdodo.eu/blog/why-you-want-react-query

### 理解 TanStack Query

TanStack Query 通过自动管理加载状态、错误状态等不同阶段的数据请求状态，简化了数据获取代码。其核心是一个智能的数据缓存系统——当缓存数据失效（stale）时，它会自动重新发起请求获取最新数据。

以下是一个在组件中使用 TanStack Query 获取产品数据并显示名称和描述的代码示例：

```tsx
function Product({ id }: { id: number }) {
  const { data, error, isPending } = useQuery({
    queryKey: ['products', id],  // 查询唯一标识键
    queryFn: () =>
      fetch(`https://some-server.com/products/${id}`)
        .then((res) => res.json()),
  });

  if (isPending) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
    </div>
  );
}
```

TanStack Query 提供的 `useQuery` Hook 能自动管理数据请求的全流程及不同状态。配置参数通过对象形式传入，其中两个最核心的选项是：

- **queryKey**：数据的唯一标识键。由于 TanStack Query 的缓存系统需要区分不同查询的数据，这个键值就是数据的缓存标识。本例中使用数组 `['products', id]` 作为键，其中包含静态标识符 "products" 和动态的产品 ID。

> **注意事项**
> 使用数组作为查询键（queryKey）是最佳实践，因为这能让 TanStack Query 轻松区分具有相同前缀的不同查询，并基于此进行智能管理。例如：当键 `['products']` 对应的数据被标记为失效时，所有以 `['products']` 为前缀的子键（如 `['products',1]`、`['products',2]` 等）关联的数据也会自动触发失效逻辑。

- **queryFn**：用于实际发起数据请求的函数。本例中通过浏览器的 `fetch` API 从远程接口获取产品数据。


useQuery Hook 只能在 React 组件树中的 QueryClientProvider 组件内使用。这使得同一个数据缓存可以在整个应用程序中被共享。QueryClientProvider 组件接收一个 QueryClient 实例作为参数，如下例所示：

```jsx
function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      ...
    </QueryClientProvider>
  );
}
```

QueryClient 实例被保存在状态中，这样在重新渲染后可以重用同一个实例。

QueryClient 还可以用来访问数据缓存；一个常见的用例是使缓存失效，以便获取新数据。以下代码片段使键为 ['products'] 的缓存失效：

```js
queryClient.invalidateQueries({ queryKey: ['products'] });
```

接下来，我们将设置本章将使用的项目。

### 获取博客文章数据

**注意**：该请求是 HTTP POST 而非 GET 请求。这是因为 Next.js 中的所有 Server Functions（服务器函数）都采用 HTTP POST 请求方式。



至此已完成使用 TanStack Query 重构数据获取的改造。以下是本节内容回顾：

- TanStack Query 通过以下特性简化了客户端数据获取流程：自动管理加载与错误状态、数据缓存、陈旧数据重新获取，以及失败查询的重试机制。

- 要使用 TanStack Query，需在 React 组件树顶层配置 QueryClientProvider。这一设置实现了全局数据缓存访问，并提供了如 useQuery 等 Hooks 用于查询状态管理与数据获取。

- TanStack Query 的默认配置包含两大特性：自动重试失败查询，并在浏览器窗口重新获得焦点时刷新数据。

## Using a Route Handler with TanStack Query

### 理解 Route Handlers 的优势

Next.js 路由处理器支持创建 API 端点。虽然 Server Functions（服务器函数）的实现方式较为简单，并能跨网络边界提供类型安全保障，但其存在以下局限性：

- Server Functions 采用顺序执行机制。当父组件调用 Server Function 获取数据时，若子组件同时发起另一个 Server Function 请求，后者的执行必须等待前者完成。相比之下，路由处理器支持并行请求处理。
- Server Functions 默认使用 HTTP POST 方法进行数据获取，而业界标准的数据获取操作通常采用 GET 方法——POST 方法一般用于数据变更操作。
- Next.js 和 React 官方团队明确建议优先使用其他方案（如路由处理器）而非 Server Functions 进行数据获取。

基于上述原因，在后续应用开发中我们将采用路由处理器来实现数据交互。

### 使用 Route Handlers

路由处理器定义在 src/app/api 文件夹中。不同路径的处理程序与页面定义方式类似，只不过使用 route.ts 文件而非 page.tsx 文件。在 src/app/api/posts 文件夹中创建一个 route.ts 文件，并添加以下内容：

### 为 API 响应添加类型安全

类型安全增强已完成，本节关于使用路由处理器的内容到此结束。以下是要点回顾：

- 在数据获取场景中，路由处理器通常比服务器函数更受青睐。这是因为它们通过支持并行API请求和使用HTTP GET请求来提升性能。
- 使用路由处理器进行数据获取的一个缺点是跨网络边界时缺乏类型安全。可通过Zod库利用验证API响应体的模式来弥补这一差距。

## 使用 TanStack Query 的变更功能修改数据

### 理解 TanStack Query mutations

TanStack Query 的 `useMutation` Hook 负责管理整个变更流程，包含实用的状态变量，并提供了在数据变更后更新缓存的机制。示例代码如下：

```javascript
const { mutate, isPending, isError } = useMutation({
  mutationFn: (newProduct) => createProduct(newProduct),
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ['products'],
    }); 
  },
});

async function handleClick() {
  mutate({
    name: 'New product',
    description: 'New product description',
  });
}

if (isPending) return 'Mutating...';
if (isError) return 'An unexpected error occurred';
```

### 使用 useMutation

> **注意**

> 我们本可以使用路由处理器（Route Handler）来实现这个变更操作，而非服务器函数（Server Function）。但服务器函数具有实现更简单、类型安全性更强的优势。



快速回顾：

- TanStack Query 的 `useMutation` Hook 通过处理变更操作来简化状态管理，并提供诸如 `isPending`、`isSuccess` 和 `isError` 等辅助状态变量。
- 通过在 `onSuccess` 函数中调用 `QueryClient.invalidateQueries` 并传入正确的查询键，可以使受变更影响的数据缓存失效。

## 问题

1、以下数据获取代码存在什么问题？

```tsx
useEffect(() => {
  fetch(“/api/data”)
    .then((res) => res.json())
    .then((data) => setData(data));
}, []);
```

**答案**

若组件在数据获取完成前卸载，可能会尝试更新状态，从而触发警告。可通过在组件卸载时中止的 `AbortController` 对象来解决此问题：

```tsx
useEffect(() => {
  const controller = new AbortController();
  fetch(“/api/data”, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => {
      if (err.name !== “AbortError”) {
        console.error(err);
      }
    });
  return () => controller.abort(); 
}, []);
```

2、为何在 Next.js 中不推荐使用服务端函数（Server Function）进行数据获取？

**答案**

服务端函数按顺序而非并行执行，当同时调用多个服务端函数时可能导致性能问题。此外，它们采用 HTTP POST 请求而非 HTTP GET 请求。

5、以下代码中的 `staleTime` 选项有何作用？

```tsx
useQuery([“todos”], fetchTodos, { staleTime: 10000 });
```

`staleTime` 选项用于设定查询数据被视为“新鲜”的毫秒时长。在此时间段内，即使组件重新挂载或浏览器窗口重新获得焦点，TanStack Query 也不会自动在后台重新获取数据。因此在代码示例中，获取到的数据将在十秒内保持新鲜状态

# 9、Working with Forms

## 使用基本表单

## 使用路由处理器进行提交

## 使用 Server Action 进行提交

在第7章《服务端组件数据获取与服务器函数变更》中，我们学习了如何通过服务器函数修改数据。现在我们可以将服务器函数应用于表单提交场景。事实上，专门用于表单提交的服务器函数极为常见，以至于它们拥有一个专门的名称——服务器操作（Server Actions）。

服务器操作可以通过`action`属性传递给表单元素，如下所示：

```jsx
<form action={serverAction}>
```

### 添加服务端校验

我们将使用 Zod 库添加服务端验证。在第8章《使用 TanStack Query 实现客户端组件数据获取与变更》中，我们曾借助 Zod 校验数据库及 Web API 数据。同样地，该库也可用于表单数据验证：

## 使用 useFormStatus

本节我们将了解 React 的 `useFormStatus` Hook 如何提升用户体验，并在表单中实际应用它。

### 理解 useFormStatus

`useFormStatus` 这个 Hook 能够让客户端组件获取表单提交过程中的状态信息。它主要有两大用途：一是实现提交状态指示器（比如加载动画），二是在提交过程中禁用特定表单元素（例如提交按钮）。与其他 React Hooks 不同的是，这个 Hook 来自 `react-dom` 包而非 React 核心库。

## 使用 useActionState

### 理解 useActionState

`useActionState` 这个 Hook 能让客户端组件获取服务器操作的返回结果，从而支持向用户显示错误提示信息，并能在表单提交后保留字段值（避免重复填写）

### 使用 useActionState



由此可见，`useActionState` 和 `useFormStatus` 在实现提交状态指示和提交过程中禁用表单元素方面存在功能重叠。不过，`useFormStatus` 只能在表单的子组件中使用，而 `useActionState` 则必须与表单处于同一组件内。因此，当表单元素集中在同一组件时，推荐使用 `useActionState` 方案；若表单元素分散在多个子组件中，则更适合采用 `useFormStatus` 方案。

接下来，我们将学习一个广受欢迎的表单库，它能进一步提升表单的用户体验。

## 使用 React Hook Form

### 理解客户端校验

React Hook Form 的核心特性之一是支持客户端表单验证。这种验证机制能在用户提交数据前实时检测输入问题，从而显著提升用户体验。同时，由于大量无效表单会被前端拦截，服务器处理的请求量得以减少，有效提升了系统可扩展性。

### 理解 useForm Hook

### 使用 React Hook Form

## 实现乐观更新

在本节中，我们将学习什么是乐观UI更新，以及如何使用React的useOptimistic Hook来实现它。然后我们会在应用的新页面中应用此模式，允许用户将联系人项目标记为已完成。

### 理解 useOptimistic

乐观UI更新是指在用户操作触发后、操作完全完成前，就立即更新界面的一种模式。这种模式能让应用更快速、响应更及时。`useOptimistic` Hook可用于管理某个预期会在操作过程中发生变化的变量，该变量通常保存着来自服务器的数据。其基本语法如下：

```jsx
const [optimisticValue, setOptimisticValue] = 
  useOptimistic(initialValue);
```

### 使用 useOptimistic



至此，我们已经完成了对ContactItem组件的功能增强，以及关于乐观更新这一章节的内容讲解。总结来说，乐观UI更新通过在用户操作后立即反映在界面上，从而提升了应用的响应速度；而React的useOptimistic Hook不仅帮助我们实现了这一模式，还能有效处理错误和竞态条件等问题。

# 第10章 状态管理

## 理解状态的类型

### 服务端状态

**服务器状态（Server State）** 是指从外部服务器或API获取并用于渲染UI的数据，也被称为远程状态（Remote State）或数据状态（Data State）。

在第七章《服务端组件数据获取与服务器函数变更》中，我们学习了RSC（服务端组件）如何通过完全在服务器端获取和渲染数据来消除对服务端状态的需求。

有时我们确实需要在客户端组件中获取数据。在第八章《使用TanStack Query实现客户端组件数据获取与变更》中，我们了解了TanStack Query如何为我们管理服务端状态，以及为何使用useEffect和useState自行管理会存在问题。

### 表单状态

表单状态包含字段值、验证错误信息以及是否显示提交指示器等内容。在第九章《表单处理》中，我们学习了如何通过React的useActionState和useFormStatus Hooks，以及流行的React Hook Form库来管理这类状态。相较于使用useState自行编写状态管理代码，这些方案要简单得多。

### URL 状态

URL参数是存储少量UI状态的有效方式。在前几章中，我们曾使用搜索参数来存储搜索条件，但路由参数同样可以实现这一功能。这种方法的核心优势在于：包含状态的URL可以被分享给其他用户，对方打开链接时应用会直接渲染出对应的状态。

### Local 状态

本地状态由单个组件通过React的useState或useReducer钩子进行管理——这正是我们在本书中始终采用的状态管理方式。

### Derived state

派生状态是通过计算其他状态得出的值，而非直接存储的状态。这种模式能有效避免状态冗余，使代码更简洁且不易出错。

以下是状态重复的典型示例——其中`filteredItems`是通过`items`状态过滤得到的活跃元素：

```jsx
const [items, setItems] = useState([ ... ]);
const [filteredItems, setFilteredItems] = useState([]);
useEffect(() => {
  setFilteredItems(items.filter((item) => item.active));
}, [items]);
```

这种情况下，`filteredItems`属于重复状态，必须通过`useEffect`钩子进行同步维护。

以下是使用派生状态的优化方案：

```jsx
const [items, setItems] = useState([ ... ]);
const filteredItems = items.filter((item) => item.active);
```

这种实现更加简洁，因为完全不需要状态同步逻辑。

若需优化计算性能，可使用`useMemo`钩子避免不必要的派生状态重复计算：

```jsx
const filteredItems = useMemo(() => {
  return items.filter((item) => item.active);
}, [items]);
```

### Shared state

顾名思义，共享状态（shared state）是指在多个组件之间共享的状态。这种状态有时也被称为全局状态（global state）。



本章后续内容将重点探讨实现共享状态的多种方法。值得注意的是，服务器状态（server state）和URL状态（URL state）同样可作为共享状态的实现方案——本章也将对这两种模式展开讨论。

## 使用属性透传（prop drilling）

### 理解和使用属性透传

**属性透传（Prop Drilling）** 是指通过 props 从父组件出发，经过多层中间组件逐级传递数据，最终到达嵌套子组件的数据传递方式。这种模式直接运用了我们已熟悉的 React 特性。



这种方法的一个优点是实现简单，且只需使用我们已经熟悉的React特性。其缺点在于，它可能迫使位于提供状态组件和访问状态组件之间的组件，都必须为该状态添加一个prop。因此，一些不需要访问该状态的组件也可能被迫接收它。例如Main组件——权限状态不得不经过它才能传递到Content组件。

#### 采用更优的组件组合方式

## 使用 React context

### 理解 React context

可以使用 `createContext` 函数创建一个上下文，如下所示：

```typescript
const Context = createContext<ContextType>(defaultValue);
```

创建上下文时，必须传入一个默认值（`defaultValue`）。此外，`createContext` 还支持一个泛型类型参数，用于指定该上下文所生成对象的类型（即 `ContextType`）。

react 还提供了一个 `use` Hook，可用于从上下文中获取值：

```typescript
const { someState } = use(Context);
```

使用时，必须将上下文对象传递给 `use` Hook，然后可以对其返回的结果进行解构，提取所需的属性。

> **注意**
>
> 另一种 `useContext` Hook 也能以相同的语法从上下文中获取状态。但与 `useContext` 不同的是，`use` Hook 支持条件式调用。

因此，需要访问共享状态的组件可以通过 `use` Hook 按如下方式获取状态：

```typescript
export function SomeComponent() {
  const { someState } = use(Context);
  return <div>I have access to {someState}</div>;
}
```

### 使用 React context

> **注意**
>
> React 上下文（Context）不仅可以共享状态（state），还可以共享函数。我们将利用这一特性来共享 `handleSignIn`、`handleSignOut` 和 `togglePermissions` 这几个函数。

## 使用 Zustand

### 理解 Zustand

Zustand 是一个流行、高性能且可扩展的 React 状态管理库，它极其简单易用。

状态存储在一个集中式的 store 中，该 store 通过 Zustand 的 `create` 函数创建：

```typescript
const useCountStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));
```

与 React Context 类似，Zustand 的 store 既可以存储状态值，也可以存储函数。上面的示例 store 包含一个 `count` 状态，以及用于递增和递减该状态的 `inc` 和 `dec` 函数。

### 使用 Zustand 

Chapter10\zustand\src\state\useUserStore.ts

```ts
import { create } from 'zustand';
import { signIn, signOut } from '@/data/auth';
import { UserState } from './types';

export const useUserStore = create<UserState>(
  (set) => ({
    userName: undefined,
    permissions: undefined,
    loading: false,
    handleSignIn: async () => {
      set({ loading: true });
      const user = await signIn();
      set({
        userName: user.name,
        permissions: user.permissions,
        loading: false,
      });
    },
    handleSignOut: async () => {
      await signOut();
      set({
        userName: undefined,
        permissions: undefined,
        loading: false,
      });
    },
    togglePermissions: () =>
      set((state) =>
        state.permissions?.length === 0
          ? { permissions: ['admin'] }
          : { permissions: [] },
      ),
  }),
);
```



**至此，我们已经完成了将应用从 React Context 重构为使用 Zustand 的工作。** 实践证明，Zustand 极其易用，而且**无需像 React Context 那样必须使用 Provider 组件**，这一点优势非常明显。当 Zustand store 中的状态发生变化时，**只有订阅了该状态变化的组件才会重新渲染**，这使得它的性能表现比 React Context 更优。

## 使用 TanStack Query 和 URL 参数

在本节中，我们将学习如何使用 TanStack Query 在不同 React 组件间共享通常来自服务器数据库的状态数据。 接着，我们会进一步探讨如何通过 URL 搜索参数（search parameters）实现跨组件状态共享。

### 使用 TanStack Query

**如先前所学，TanStack Query 会对其获取的数据维护一个客户端缓存。** 只需使用相同的查询键（query key）调用 `useQuery` Hook，这些数据就能在不同组件间共享。当调用该 Hook 时，如果数据未过期（stale），则会直接从缓存中读取。在扩展后的应用中，`Header` 和 `Main` 组件正是采用这种方式获取用户名。

为了进一步优化代码结构，获取核心用户信息的 `useQuery` 调用被封装成了一个自定义 Hook `useGetUser`，具体实现如下：

```tsx
import { userSchema } from '@/data/schema';
import { useQuery } from '@tanstack/react-query';

export function useGetUser(
  userId: string | undefined,
) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(
        `/api/users/${userId}`,
      );
      return userSchema.parse(
        await response.json(),
      );
    },
    enabled: userId !== undefined,
  });
}
```

查询函数会调用一个路由处理器（Route Handler），并返回经过验证的响应体，这些数据会被存储到查询缓存中。 `enabled` 选项确保了查询仅在用户登录且用户 ID 可用时才会触发。

当用户登录后，`Header` 组件会重新渲染，从而触发查询并获取数据，随后数据会被缓存。接着，`Main` 组件也会重新渲染并触发相同的查询。但由于该查询键（query key）对应的数据已存在于缓存中，`Main` 组件会直接使用缓存数据，而不会发起新的网络请求。

使用 TanStack Query 是一种自然且高效的服务器状态共享方式。 只需在需要数据的组件中调用 `useQuery` Hook，并传入查询函数和合适的查询键，TanStack Query 就会自动管理数据缓存，并智能决定是否需要重新获取数据。

### 使用 URL 参数

# 第11章 可复用组件

## 使用泛型属性

### 理解泛型

#### keyof 操作符

**`keyof` 操作符** 是 TypeScript 中的一个内置操作符，用于获取给定类型的所有属性键（key）组成的联合类型（union type），其结果是一个由字符串字面量类型构成的集合。

示例：

```typescript
type User = {
  name: string;
  email: string;
};
type UserKeys = keyof User; // "name" | "email"
```

在此例中，`UserKeys` 类型会被推断为 `"name" | "email"`，即 `User` 类型的所有属性名的联合类型。

## 使用属性展开（Using prop spreading）

**在本节中，我们将学习一种称为「属性展开」的模式。** 当需要在一个组件的实现中直接传递 HTML 元素的所有属性时，这种模式非常有用。以我们的清单组件（checklist component）为例，我们将通过该模式将 `ul` 元素的所有属性透传到组件内部。这样做的好处是，组件的使用者可以自由地为清单组件指定属性，例如设置列表的高度、宽度等样式参数。

## 使用 render  属性

## 添加 checked 功能

## 创建自定义 hooks

### 理解自定义 hooks

**自定义 Hook 的定义需遵循一个关键约定：函数名称必须以 `use` 开头**。这一命名规范的核心作用是让 ESLint 能够通过静态分析检测自定义 Hook 的调用是否符合 React 的规则（例如在条件语句或循环中错误调用 Hook 的问题）。

**自定义 Hook 的另一个核心特征是它必须调用其他标准的 React Hook**。例如，`useToggle` 这个自定义 Hook 内部使用了 `useState`。如果一个函数没有调用任何 React 内置 Hook（如 `useState`、`useEffect` 等）或其他已定义的自定义 Hook，那么它就只是一个普通的 JavaScript 函数，而不能被称为「自定义 Hook」。

## 允许内部状态被外部控制

# 第12章：使用Vitest与React Testing Library进行单元测试

## 测试纯函数

**纯函数对于给定的参数值始终返回一致的输出结果**。这类函数仅依赖于传入的参数，不受函数外部任何状态影响，且不会修改传入的参数值。正因如此，纯函数是学习编写测试的理想对象——它们不存在难以处理的副作用问题。

### 理解测试

**Vitest 会检测特定扩展名的文件来发现测试用例**：纯函数的测试文件应使用 `.test.ts` 扩展名，而 React 组件的测试文件则需采用 `.test.tsx` 扩展名。此外，也可以选择使用 `.spec.*` 系列扩展名（如 `.spec.ts` 或 `.spec.tsx`）作为替代方案。

### 测试 isChecked

### 测试异常

Vitest 提供了 toThrow 匹配器用于检测异常是否被抛出。需要注意的是，被测函数必须包裹在箭头函数内执行，才能被正确捕获异常，具体用法如下：

```typescript
test('某个测试用例', () => {
  expect(() => {
    someAssertionFunction(someValue);
  }).toThrow('预期的错误信息');
});
```

### 运行测试

## 测试组件

### 理解 React Testing Library

**React Testing Library 是用于测试 React 组件的主流工具库**。它提供了一系列核心 API 用于渲染组件并定位内部 DOM 元素，同时需要配合配套工具库 jest-dom 使用——后者提供了丰富的专用匹配器（matchers），用于对元素状态和行为进行断言验证。

## 实现 checklist 组件测试

## 模拟用户交互

### 理解 fireEvent 和user-event

user-event 包可以模拟点击之外的其他交互操作。更多信息请参阅以下文档链接：https://testing-library.com/docs/user-event/intro

## 获取代码覆盖率

**代码覆盖率**（Code Coverage）是指我们的应用程序代码中有多少部分被单元测试所覆盖。在编写单元测试时，我们大致能了解哪些代码已被覆盖，哪些尚未覆盖。但随着应用规模扩大和时间推移，这些信息很容易变得模糊不清。

本节我们将学习如何使用 **Vitest** 的代码覆盖率功能，这样就不必仅凭记忆来追踪测试覆盖情况。我们将通过该功能检测 **清单组件**（Checklist Component）的覆盖率，并解读报告中各项统计数据的含义。借助覆盖率报告，我们可以定位清单组件中未被测试覆盖的代码，进而扩展测试用例以实现**完全覆盖**（Full Code Coverage）。

### 理解代码覆盖率报告

### 在覆盖率报告中忽略文件