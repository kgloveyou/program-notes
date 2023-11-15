# advanced-react

## Table of contents

https://advanced-react.com/

# Chapter 1. Intro to re-renders

## 问题

very-slow-component.tsx 中模拟耗时操作。

```tsx
const wait = (ms: number) => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) now = Date.now();
};

export const VerySlowComponent = () => {
  wait(500);
  return null;
};

export const AnotherVerySlowComponent = () => {
  wait(500);
  return null;
};
```



有经验处理 React 性能的人可能会说：“啊，当然！你在重新渲染整个应用，你只需要将所有东西包装在 React.memo 中，并使用 useCallback 钩子来防止它。”从技术上讲，这是对的。但不要急。在这里，记忆化是完全不必要的，而且会带来更多的弊端。

但首先，让我们回顾一下这里到底发生了什么以及原因是什么。

## 状态更新、嵌套组件和重新渲染

让我们从头开始：组件的生命周期及在讨论性能时我们需要关注的最重要的阶段。这些阶段包括：挂载、卸载和重新渲染。

接下来是卸载：这是当 React 检测到不再需要一个组件时的情况。因此，它进行最终的清理，销毁该组件的实例以及与之关联的所有内容，如组件的状态，最后移除与之关联的 DOM 元素。

最后是重新渲染。这是当 React 用一些新信息更新已经存在的组件时发生的情况。与挂载相比，重新渲染是轻量级的：React 只是重用已经存在的实例，运行钩子，执行所有必要的计算，并使用新属性更新已存在的 DOM 元素。

每次重新渲染都始于状态。在 React 中，每当我们使用像 useState、useReducer 或任何外部状态管理库（如 Redux）的钩子时，我们都为组件添加了交互性。从那时起，组件将具有在其生命周期内保留的一部分数据。如果发生需要交互响应的事件，比如用户点击按钮或传入一些外部数据，我们就使用新数据更新状态。

重新渲染是 React 中最重要的概念之一。这是指 React 使用新数据更新组件并触发所有依赖于该数据的钩子。没有这些操作，React 中就不会有数据的更新，因此也就没有交互性。应用程序将会是完全静态的。而状态更新是 React 应用中所有重新渲染的初始来源。以我们的初始应用为例：

```jsx
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <Button onClick={() => setIsOpen(true)}>Open dialog</Button>;
};
```

当我们点击按钮时，触发了 `setIsOpen` setter 函数：我们使用新值（从 `false` 到 `true`）更新了 `isOpen` 状态。结果，持有该状态的 `App` 组件重新渲染自身。

在状态更新并 `App` 组件重新渲染之后，需要将新数据传递给依赖它的其他组件。React 会自动为我们完成这个过程：它获取所有初始组件内渲染的组件，重新渲染它们，然后重新渲染它们内部的嵌套组件，以此类推，直到达到组件链的末尾。

如果你将一个典型的 React 应用想象成一棵树，从状态更新发起的位置开始，向下的所有内容都将被重新渲染。

在我们的应用中，当状态发生变化时，所有它渲染的东西，包括那些非常慢的组件，都将被重新渲染：

```jsx
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  // everything that is returned here will be re-rendered when the state is updated
  return (
    <div className="layout">
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

结果，打开对话框几乎需要一秒钟的时间 - React 需要在对话框出现在屏幕上之前重新渲染所有内容。

在这里要记住的重要一点是，当 React 重新渲染组件时，它永远不会沿着渲染树向上移动。如果状态更新起源于组件树的中间某个地方，那么只有树下方的组件将重新渲染。

在“底部”的组件影响“顶部”组件的唯一方法是它们要么显式调用“顶部”组件中的状态更新，要么将组件作为函数传递。

## The big re-renders myth

您是否注意到我在这里没有提到有关 props 的任何内容？您可能听说过这个说法：“**组件在其 props 更改时重新渲染。**”这是React中最常见的误解之一：每个人都相信它，没有人怀疑它，但它实际上是不正确的。

正常的 React 行为是，如果触发了状态更新，React 将重新渲染所有嵌套的组件，而不管它们的 props 如何。如果没有触发状态更新，那么更改 props 将被“吞噬”：React 不会监视它们。

如果我有一个带有 props 的组件，并且我尝试在不触发状态更新的情况下更改这些 props，就像这样：

```jsx
const App = () => {
  // local variable won't work
  let isOpen = false;
  return (
    <div className="layout">
      {/* nothing will happen */}
      <Button onClick={() => (isOpen = true)}>Open dialog</Button>
      {/* will never show up */}
      {isOpen ? <ModalDialog onClose={() => (isOpen = false)} /> : null}
    </div>
  );
};
```

它只是不起作用。当点击按钮时，本地的 `isOpen` 变量会改变。但是 React 生命周期没有被触发，所以渲染输出从未更新，模态对话框永远不会显示出来。

https://advanced-react.com/examples/01/02

（*疑问：这里的`prop`只是一个内部变量，并不是从外部传入的`prop`。所以，上面的说法存疑。*）

在重新渲染的情况下，组件的属性是否发生变化只在一种情况下才会有影响：如果所说的组件被包裹在`React.memo`高阶组件中。只有在这种情况下，React才会停止其自然的重新渲染链，并首先检查属性。如果没有任何属性发生变化，那么重新渲染将在那里停止。如果有一个属性发生变化，它们将像平常一样继续重新渲染。

正确地使用记忆化来防止重新渲染是一个复杂的话题，有许多注意事项。

## Moving state down  

## 自定义 hooks 的危险性

毕竟，它们被引入的目的正是为了让我们能够抽象出有状态逻辑。



因此，状态的放置位置非常重要。理想情况下，为了避免未来的性能问题，你应该尽可能将状态隔离到尽可能小而轻的组件中。

## 要点总结

- 重新渲染是React使用新数据更新组件的方式。没有重新渲染，我们的应用程序将失去互动性。

- 状态更新是所有重新渲染的初始源头。
- 如果触发了组件的重新渲染，那么该组件内部的所有嵌套组件都将被重新渲染。

- 在正常的React重新渲染周期中（没有使用记忆化的情况下），props 的变化并不重要：即使组件没有任何props，它们也会重新渲染。

- 在大型应用程序中，我们可以使用“向下移动状态”的模式来防止不必要的重新渲染。

- 在钩子中的状态更新将触发使用该钩子的组件的重新渲染，即使状态本身未被使用。

- 在使用其他钩子的钩子的情况下，该钩子链中的任何状态更新都将触发使用第一个钩子的组件的重新渲染。

# Chapter 2. Elements, children as props, and re-renders  

## 问题

```tsx
import { ReactNode, useState } from 'react';

import { BunchOfStuff, OtherStuffAlsoComplicated } from './components/mocks';
import { VerySlowComponent } from './components/very-slow-component';
import './styles.scss';

const MovingBlock = ({ position }: { position: number }) => (
  <div className="movable-block" style={{ top: position }}>
    {position}
  </div>
);

// just hard-coded approximation to demonstrate the re-renders problem
// not to be used in real code
const getPosition = (val: number) => 150 - val / 2;

const ScrollableWithMovingBlock = ({ content }: { content: ReactNode }) => {
  const [position, setPosition] = useState(150);

  const onScroll = (e: any) => {
    const calculated = getPosition(e.target.scrollTop);
    setPosition(calculated);
  };

  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      {/* put our content prop here, where the slow bunch of stuff used to be */}
      {content}
    </div>
  );
};

export default function App() {
  const slowComponents = (
    <>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );

  return <ScrollableWithMovingBlock content={slowComponents} />;
}
```

## 元素、组件和渲染

```jsx
const Parent = (props) => {
	return <Child />;
};
```

事实上，漂亮的类似 HTML 的语法只不过是 `React.createElement` 函数的语法糖[2]。我们甚至可以用以下内容替换该元素：`React.createElement(Child, null, null)` 一切都会按预期工作 。



现在来谈谈重新渲染。通常我们所说的 "重新渲染" 是指 React 调用那些函数并执行在此过程中需要执行的一切（比如钩子）。从这些函数的返回值，React 构建了一个对象树。我们现在称之为 Fiber 树，有时也叫虚拟 DOM。事实上，它甚至是两棵树：重新渲染之前和之后的树。通过比较（"diffing"），React 将提取信息发送给浏览器：哪些 DOM 元素需要更新、删除或添加。这就是所谓的 "协调" 算法。

在本章问题中最重要的部分是：如果在重新渲染之前和之后的对象（元素）完全相同，那么React将跳过表示该元素及其嵌套组件的组件的重新渲染。而所谓的 "完全相同" 意味着 `Object.is(ElementBeforeRerender, ElementAfterRerender)` 返回 `true`。React不会执行对象的深度比较。如果这个比较的结果是 `true`，那么React将保持该组件不变，并继续下一个组件。

如果比较返回 `false`，这就是向 React 发出的信号，表示某些东西发生了变化。接着，React会查看组件的`type`。如果`type`相同，React将重新渲染此组件。如果`type`发生了变化，它将删除 "旧" 组件并挂载 "新" 组件。我们将在第6章中更详细地研究这一过程，深入了解比较和协调。

## Children as props  

```jsx
<Parent children={<Child />} />

// exactly the same as above
<Parent>
	<Child />
</Parent>
```

## 要点总结

希望这一切都讲得清楚，你现在对"组件作为属性"和"子元素作为属性"的模式有了信心。在下一章中，我们将看看在性能之外，组件作为属性如何有用。与此同时，这里有一些需要记住的事项：

- 一个组件只是一个接受参数（props）并返回应该在屏幕上渲染时渲染的元素的函数。`const A = () => <B />` 就是一个组件的示例。这个组件不接受任何 props，它返回了一个 `<B />` 元素，表示在渲染时会渲染组件 `B`。这是 React 中组件的基本构建块之一，通过组件的嵌套和组合，你可以构建复杂的用户界面。

- 一个元素（Element）是一个对象，它描述了需要在屏幕上渲染的内容，类型可以是字符串（用于表示DOM元素）或组件的引用。`const b = <B />` 是一个元素的示例。这个元素表示在渲染时应该渲染组件 `B`。元素是 React 构建用户界面的基本单位，它们可以包含在组件中，形成组件树，最终渲染成实际的UI。

- 重新渲染只是React调用组件函数。

- 当组件的元素对象发生变化时，组件会重新渲染，这是通过在重新渲染之前和之后对其进行 `Object.is` 比较来确定的。

- 当元素作为 props 传递给组件，并且这个组件通过状态更新触发重新渲染时，作为 props 传递的元素不会重新渲染。

- "children" 只是 props，当它们通过 JSX 嵌套语法传递时，它们的行为与其他 prop 类似：

```jsx
<Parent>
	<Child />
</Parent>

// the same as:
<Parent children={<Child />} />
```

# 第3章：将元素作为 props 的配置问题

## 问题

## Elements as props  

```jsx
const ModalDialog = ({ children, footer }) => {
  return (
    <div className="dialog">
      <div className="content">{children}</div>
      <div className="footer">{footer}</div>
    </div>
  );
};
```

永远记住：在这种情况下，“children”只不过是一个 prop，而“嵌套”语法只是它的语法糖！

## 条件渲染和性能

```jsx
const App = () => {
  return (
    <>
      <Route path="/some/path" element={<Page />} />
      <Route path="/other/path" element={<OtherPage />} />
      ...
    </>
  );
};
```

这里没有条件，所以感觉就像 App 同时拥有和渲染了 <Page /> 和 <OtherPage />。但事实并非如此。它只是创建了描述这些页面的小对象。实际的渲染只会在路径与URL匹配并且element属性确实从Route组件中返回时发生。

## `props` 中元素的默认值

50

```tsx
import React, { ReactElement } from 'react';

import LoadingIcon from '@mui/icons-material/HourglassEmpty';
import './styles.scss';

type IconProps = {
  color?: string;
  size?: 'large' | 'medium' | 'small';
};
const Loading = ({ color, size }: IconProps) => <LoadingIcon style={{ color }} fontSize={size} />;

type ButtonProps = {
  icon: ReactElement;
  size?: 'large' | 'normal';
  appearance?: 'primary' | 'secondary';
};
const Button = ({ icon, size = 'normal', appearance = 'primary' }: ButtonProps) => {
  // create default props
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  const newProps = {
    ...defaultIconProps,
    // make sure that props that are coming from the icon override default if they exist
    ...icon.props,
  };

  // clone the icon and assign new props to it
  const clonedIcon = React.cloneElement(icon, newProps);

  return <button className={`button ${appearance}`}>Submit {clonedIcon}</button>;
};

export default function App() {
  return (
    <>
      <h4>primary button will have white icons</h4>
      <Button appearance="primary" icon={<Loading />} />

      <h4>secondary button will have black icons</h4>
      <Button appearance="secondary" icon={<Loading />} />

      <h4>large button will have large icons</h4>
      <Button size="large" icon={<Loading />} />

      <h4>override default icons</h4>
      <Button size="large" icon={<Loading color="red" />} />
    </>
  );
}
```

https://react.dev/reference/react/cloneElement

使用 `cloneElement` 不常见，可能会导致脆弱的代码。请参阅常见的替代方法。

`cloneElement` 允许你使用另一个元素作为起点来创建一个新的 React 元素。

```tsx
const clonedElement = cloneElement(element, props, ...children)
```

- 参考
-- cloneElement(element, props, ...children)
- 用法
-- 覆盖元素的属性
- 替代方法
-- 使用渲染属性传递数据
-- 通过上下文传递数据
-- 将逻辑提取到自定义 Hook 中

## 为什么我们不应该在默认值上过于疯狂


## 要点总结

# 第4章：使用`render`  属性进行高级配置

## Render props for rendering Elements  

一个渲染属性（render prop）本质上就是一个返回元素的函数。这个函数几乎与一个组件（Component）相同。唯一的不同是，你不会直接调用一个组件 - React会代为调用，但渲染函数（render function）在你的控制之下。

## 共享有状态逻辑：将子元素作为渲染属性（render props）

## Hooks replaced render props  

```tsx
const useResizeDetector = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const listener = () => {
      const width = window.innerWidth;
      setWidth(width);
    };
    window.addEventListener('resize', listener);
    // the rest of the code
  }, []);

  return width;
};

export default function App() {
  const windowWidth = useResizeDetector();

  return windowWidth > 600 ? <WideLayout /> : <NarrowLayout />;
}
```

## 要点总结

# 第5章：使用useMemo、useCallback和React.memo进行记忆化（Memoization）

## 问题：比较值

```jsx
const Component = () => {
  const submit = () => { };
  useEffect(() => {
    // call the function here
    submit();
    // it's declared outside of the useEffect
    // so should be in the dependencies
  }, [submit]);
  return ...
}
```

重新渲染就是React调用组件的函数。在重新渲染过程中，每个局部变量都会被重新创建，与JavaScript中的任何函数一样。

因此，React将比较重新渲染前后的 `submit` 变量，以确定这次是否应该运行 `useEffect` 钩子。由于每次都是一个新的引用，比较将始终返回false。因此，`useEffect` 钩子将在每次重新渲染时触发。这可能会导致不必要的副作用执行。

## useMemo 和 useCallback：它们是如何工作的

正如您所看到的，API 中存在轻微的差异。`useCallback` 将我们要记忆化的函数作为第一个参数，而 `useMemo` 接受一个函数并记忆化其返回值。正因为这一点，它们的行为也存在轻微差异。

这一切为什么重要呢？对于实际应用程序而言，除了理解API之间的差异外，它并不重要。然而，有时会出现这种观点，即 `useMemo` 在性能方面比 `useCallback` 更好，因为 `useCallback` 在每次重新渲染时都会重新创建传递给它的函数，而 `useMemo` 不会这样做。但正如您所看到的，这并不正确。对于它们两者来说，第一个参数中的函数都会被重新创建。

理论上，我唯一能想到会真正重要的情况是，当我们将另一个函数执行的结果硬编码内联传递为第一个参数时。基本上就是这样的情况：

## 反模式：对props进行记忆化

在记忆化钩子的使用中，除了记忆化值作为依赖项之外，第二常见的用例是将它们传递给props。您肯定已经见过类似这样的代码：

```jsx
const Component = () => {
  const onClick = useCallback(() => {
    // do something on click
  }, []);
  return <button onClick={onClick}>click me</button>;
};
```

不幸的是，这里的 `useCallback` 是多余的。有一种广泛传播的观点，即即使是ChatGPT似乎也持有这种观点，即对props进行记忆化可以防止组件重新渲染。但正如我们在前几章已经了解到的那样，如果一个组件重新渲染，那么该组件内部的每个组件也将重新渲染。

所以，无论我们是否将`onClick`函数包装在`useCallback`中，在这里都没有什么关系。我们所做的只是让React多做一些工作，使我们的代码变得更难阅读。当只有一个`useCallback`时，看起来还不算太糟糕。但通常情况下不会只有一个，对吧？会有另一个，然后是另一个，它们将开始相互依赖，然后在你知道之前，应用程序中的逻辑就被埋在了难以理解和难以调试的`useMemo`和`useCallback`的混乱之中。

实际上只有两种主要情况下我们需要在组件上对props进行记忆化。第一种情况是当这个prop在下游组件中的另一个hook中用作依赖项时。

```jsx
const Parent = () => {
  // this needs to be memoized!
  // Child uses it inside useEffect
  const fetch = () => { };
  return <Child onMount={fetch} />;
};
const Child = ({ onMount }) => {
  useEffect(() => {
    onMount();
  }, [onMount]);
};
```

这应该是不言自明的：如果一个非原始值（non-primitive  ）进入依赖项，它应该在重新渲染之间具有稳定的引用，即使它来自一系列的props。

第二种情况是当一个组件被包装在`React.memo`中。

## What is React.memo  

React.memo或简称memo是React提供给我们的一个非常有用的工具。它允许我们对组件本身进行记忆化。如果一个组件的重新渲染是由其父组件触发的（仅在这种情况下），并且如果这个组件被包装在React.memo中，那么只有在这种情况下，React才会停下来检查它的props。如果没有props发生变化，那么组件将不会重新渲染，并且正常的重新渲染链将被停止。这有助于提高性能，避免不必要的重新渲染。

这再次是React执行我们在本章开头谈到的比较的情况。如果其中一个props发生了变化，那么被包装在React.memo中的组件将像通常一样重新渲染：

## React.memo and children  

# 5

## useMemo and expensive calculations

## 要点总结

# 第6章：深入探讨差异计算和协调（Diffing and Reconciliation）

## 神秘的Bug

## 差异比对和协调

这个虚拟DOM只是一个巨大的对象，包含了所有应该渲染的组件、它们的所有props以及它们的子组件 - 这些子组件也是具有相同结构的对象。

## Reconciliation and state update  

## 为什么不应该在其他组件内部创建组件？

为什么通常认为这种代码是一个反模式？

```jsx
const Component = () => {
  const Input = () => <input />;
  return <Input />;
};
```

```tsx
import { useState } from 'react';
import './styles.scss';

export default function App() {
  const [text, setText] = useState('');

  const ComponentWithState = () => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className={`block ${isActive ? 'active' : ''}`}>
        <button onClick={() => setIsActive(!isActive)}>click to highlight</button>
      </div>
    );
  };

  return (
    <div>
      <input type="text" className="input" value={text} onChange={(e) => setText(e.target.value)} />
      <ComponentWithState />
    </div>
  );
}
```

在React中像这样在其他组件内部声明组件可以是性能上的重大隐患之一。

## 谜题的答案

有至少两种简单的方法可以修复它：使用数组和keys。

## Reconciliation and arrays  

## Reconciliation and "key"  

还有另一种修复相同 bug 的方法：借助 "key" 属性。 

## "Key" attribute and memoized list  

## 使用 "key" 强制重用现有元素

## 为什么我们在数组外部不需要使用键（keys）？

## 动态数组和普通元素一起使用

123

## 要点

# 第7章. 在现代世界中的高阶组件

## Enhancing callbacks

## 向高阶组件添加数据

## 增强 React 生命周期事件

## 拦截 DOM 事件

## 要点

# 第8章. React 上下文（Context）和性能

"React 中重新渲染" 拼图的最后一块非常重要的部分是上下文（Context）。上下文在重新渲染方面有不好的声誉。我有一种感觉，有时人们将上下文视为一个邪恶的小精灵，只是在应用程序中漫游，因为它可以而导致突如其来且无法阻止的重新渲染。结果，开发人员有时会尽一切努力避免使用上下文。

当然，这种声誉的一部分是应该的：上下文确实存在问题。然而，经常被低估或根本不知道的是，上下文可以防止不必要的重新渲染，并因此显着提高我们应用程序的性能。当正确且谨慎地应用时，当然。

但最重要的是，理解上下文对于外部状态管理库（如Redux）非常有用。心智模型完全相同。如果你学会了上下文，你将能够以非常少的努力以最优的方式使用任何状态管理库。

## 问题

very-slow-component.tsx

```tsx
const wait = (ms: number) => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) now = Date.now();
};

export const VerySlowComponent = () => {
  wait(400);
  return null;
};

export const AnotherVerySlowComponent = () => {
  wait(400);
  return null;
};
```

模拟耗时操作。

## How Context can help  

不再需要在任何地方传递属性！现在，当状态发生变化时，上下文提供程序（Context provider ）上的 `value` 属性将发生变化，只有使用 `useNavigation` 钩子的组件将重新渲染。侧边栏或主块内的所有其他组件都不使用它，因此它们是安全的，不会重新渲染。就是这样，通过简单使用 Context ，我们大幅提高了整个应用程序的性能。



## Context value change  

每次 Context 提供者上的 `value` prop 发生变化时，使用此 Context 的每个组件都会重新渲染。

每当我们改变状态时，值对象都会发生变化，因此每个通过 `useNavigation` 使用此上下文的组件都会重新渲染。这是自然而预期的：我们希望每个人都能访问到最新的值，而在React中更新组件的唯一方式就是重新渲染它们。

## 防止不必要的 Context  重新渲染：拆分 providers  

## Reducers and split providers  

`useReducer`  

## Context selectors

## 要点

- 使用 Context（或任何类似上下文状态管理库），我们可以在渲染树深处将数据直接从一个组件传递给另一个组件，而无需通过 props 连接它。

- 通过这种方式传递数据可以提高我们应用程序的性能，因为我们可以避免重新渲染中间的所有组件。

- 然而，Context 可能存在风险：如果上下文提供程序中的值发生更改，所有使用它的组件都将重新渲染。这种重新渲染无法通过标准的记忆化技术来阻止。

- 为了最小化 Context 重新渲染，我们应该始终对传递给提供程序的值进行记忆化处理。

- 我们可以将 Context 提供程序拆分为多个提供程序，以进一步减少重新渲染。切换从 `useState` 到 `useReducer` 可以在这方面提供帮助。

- 即使我们没有适当的 Context 选择器，我们可以使用高阶组件和 `React.memo` 来模拟它们的功能。

# Chapter 9. Refs: from storing data to imperative API  

## 在React中访问DOM

## Ref 是什么?  

Ref（引用）是React在重新渲染之间保留的可变对象。请记住，在组件内部声明的一切将会在每次重新创建。

```jsx
const Component = () => {
    //  "data"对象将在每次重新渲染时都是新的
    const data = { id: 'test' };
};
```

组件只是函数，所以其中的一切基本上都是该函数的局部变量。Refs允许我们绕过这种限制。

要创建一个Ref，我们可以使用`useRef`钩子，并将Ref的初始值传递给它：

```jsx
const Component = () => {
  const ref = useRef({ id: "test" });
};
```

这个初始值现在可以通过`ref.current`属性访问，我们传递给Ref的所有内容都存储在那里。

```jsx
const Component = () => {
  // pass initial value here
  const ref = useRef({ id: "test" });
  useEffect(() => {
    // access it here
    console.log(ref.current);
  });
};
```

初始值被缓存，所以如果我们在重新渲染之间比较`ref.current`，引用将保持不变。这就好像我们只是在该对象上使用了`useMemo`钩子一样。

所有这些看起来非常类似于状态（state），是吗？只是API不同。那么，有什么需要注意的地方呢？为什么我们在各处都使用状态，但Ref被认为是一个不应该使用的逃生舱？在使表单太花哨之前，让我们首先弄清楚这个问题。也许我们根本不需要在那里使用状态？

## Ref 和 state 之间的区别

在React中，通常情况下，我们会将一个`onChange`回调函数添加到 `input`  ，将输入的信息保存在 state 中，以便在重新渲染时保留它，然后在 `submit`  函数中访问它：



但是我已经多次提到，我们存储在Ref中的任何内容也会在重新渲染之间保留。而且，方便的是，可以将任何内容分配给Ref。如果我只是将输入框的值保存在Ref中，而不是状态中，会发生什么呢？

看起来它的工作方式与状态（state）完全相同：我在输入框中输入一些内容，然后点击按钮，该值就会被发送。

那么，有什么区别呢？为什么我们通常不在我们的应用程序中看到这种模式呢？其中有一些原因。

## Ref 的更新不会触发重新渲染

在Ref和状态之间最显著的差异之一是，Ref的更新不会引起重新渲染。如果在这两种表单中都放置`console.log`，你会看到带有状态的Form组件在每次按键时重新渲染，而带有Ref的Form保持不变。

表面上看，这似乎是个好消息。不是这本书的一半都专注于重新渲染以及如何避免它们吗？如果Refs不会引起重新渲染，那么它们肯定是解决所有性能问题的解决方案吗？

并不是。如果你还记得第一章的内容，重新渲染是React生命周期的一个关键部分。这是React如何使用新信息更新我们的组件的方式。例如，如果我想在文本字段下方显示输入的字母数，使用Refs是无法实现的。

## Ref 更新是同步的和可变的

第二个重大的不同之处在于Ref的更新是同步的。毕竟，我们只是在JavaScript中进行同步操作，改变一个对象。然而，状态通常是异步的。它甚至更多于异步：状态更新是以"快照"的方式运行的。React拥有一个复杂的系统来管理它，并确保一个"快照"内的数据和组件保持一致并得到适当更新。然而，Ref没有这些复杂性：我们直接修改一个对象，就是这样。

当你尝试在设置它们后在`onChange`回调中访问状态和Ref值时，这一点就变得非常明显。

```jsx
const Form = () => {
  const [value, setValue] = useState();
  const onChange = (e) => {
    console.log("before", value);
    setValue(e.target.value);
    console.log("after", value); // same as before
  };
};
```

上面的代码中，"before"和"after"的值将是相同的。当我们调用`setValue`时，我们并没有立即更新状态。我们只是让React知道它需要在完成当前的操作后安排一个状态更新，使用新的数据。

使用Ref，情况正好相反：

```jsx
const Form = () => {
  const ref = useRef();
  const onChange = (e) => {
    console.log("before", ref.current);
    ref.current = e.target.value;
    console.log("after", ref.current); // already changed
  };
};
```

我们修改了一个对象，该对象中的数据立即可用，但并不触发React生命周期的任何操作。

## 那么我们什么时候可以使用 Ref 呢？

我们可以使用Ref，例如，来存储有关组件的一些"开发"信息。也许我们对组件渲染的次数感兴趣：

```jsx
useEffect(() => {
  ref.current = ref.current + 1;
  console.log("Render number", ref.current);
});
```

或者也许我们想要访问先前的状态值：

```jsx
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    // this will be changed after the value is returned
    ref.current = value;
  }, [value]);
  return ref.current;
};
```

然后在`useEffect`中有条件地触发某些操作：

```jsx
useEffect(() => {
  if (previuosValue.length > value.length) {
    console.log("Text was deleted");
  } else {
    console.log("Text was added");
  }
}, [previuosValue, value]);
```

当然，还有一个重要而广泛使用的情况是将DOM元素分配给Ref。这是Ref的最重要和最流行的用例之一。

## Assigning DOM elements to Ref  



## Passing Ref from parent to child as a prop  

## 使用`forwardRef`将 Ref 从父组件传递给子组件

是使用`forwardRef`还是简单地将 Ref 作为属性传递只是个人口味的问题：最终结果是相同的。

## Imperative API with useImperativeHandle  

看起来现在是为我们的InputField组件实现一个适当的命令式API的时候了。React是声明性的，并期望我们相应地编写我们的代码。但有时候我们需要以命令式的方式触发某些操作。幸运的是，React为我们提供了一个逃生口：`useImperativeHandle`钩子。

## Imperative API without useImperativeHandle  

## 要点

- 引用（Ref）只是一个可变对象，可以存储任何值。这个值将在重新渲染之间保留不变。
- 引用（Ref）的更新不会触发重新渲染，而且是同步的。

# 第10章. React中的闭包

在前一章中，我们学习了有关引用（Refs）的一切：它们是什么，为什么我们需要它们，何时使用它们，何时不使用它们。然而，当涉及到在重新渲染之间保留某些内容，尤其是在引用中时，还有一个额外的主题需要讨论：函数。更具体地说，闭包以及它们的存在如何影响我们的代码。

## 问题

现在你将面临一个两难选择。正如我们在第5章中所了解的，使用`useMemo`、`useCallback`和`React.memo`进行记忆化，被包装在`React.memo`中的组件的每个属性需要是一个原始值或在重新渲染之间保持不变。否则，记忆化将无法起作用。因此从技术上讲，我们需要将`onClick`包装在`useCallback`中：



发生了什么事呢？
这被称为"过期闭包"问题。为了解决它，我们首先需要深入了解可能是JavaScript中最令人畏惧的主题之一：闭包以及它们的工作原理。

## JavaScript, scope, and closures  

这是通过创建所谓的 "闭包" 来实现的。函数内部"封闭"了来自外部的所有数据。它本质上是在内存中单独存储的 "外部" 数据的一个在时间上冻结的快照。



在React中，我们一直在创建闭包，甚至自己都没有意识到。在组件内声明的每个回调函数都是一个闭包：

```jsx
const Component = () => {
  const onClick = () => {
    // closure!
  };
  return <button onClick={onClick} />;
};
```

在`useEffect`或`useCallback`钩子中的一切都是闭包：

```jsx
const Component = () => {
  const onClick = useCallback(() => {
    // closure!
  });

  useEffect(() => {
    // closure!
  });
};
```

它们都将访问组件中声明的状态、属性和局部变量：

```jsx
const Component = () => {
  const [state, setState] = useState();
  const onClick = useCallback(() => {
    // perfectly fine
    console.log(state);
  });
  useEffect(() => {
    // perfectly fine
    console.log(state);
  });
};
```

由于组件本身只是一个函数，因此在组件内的每个函数都是一个闭包。

## 过期闭包问题（The stale closure problem）

那么问题在哪里呢？为什么闭包是JavaScript中最可怕的事情之一，也是许多开发者的痛点来源？

这是因为闭包的生存期与引发它们的函数存在的时间一样长。对函数的引用只是一个可以分配给任何东西的值。让我们稍微费点脑筋。这是我们之前的函数，返回一个完全无害的闭包：



```js
const cache = {};
let prevValue;
const something = (value) => {
  // check whether the value has changed
  if (!cache.current || value !== prevValue) {
    cache.current = () => {
      console.log(value);
    };
  }
  // refresh it
  prevValue = value;
  return cache.current;
};
```

将值保存在一个变量中，以便我们可以将下一个值与前一个值进行比较。然后，如果变量发生了变化，刷新 `cache.current` 闭包。

现在它将正确记录变量，如果我们比较具有相同值的函数，该比较将返回 `true`：

```jsx
const first = something('first');
const anotherFirst = something('first');
const second = something('second');
first(); // logs "first"
second(); // logs "second"
console.log(first === anotherFirst); // will be true
```

## Stale closures in React: useCallback  

如果你还记得"使用`useMemo`、`useCallback`和`React.memo`进行记忆化"这一章节，上面的代码应该看起来很熟悉。事实上，我们刚刚实现了`useCallback`钩子为我们做的事情。

每当我们使用`useCallback`时，我们都创建一个闭包，并且我们传递给它的函数被缓存：

```jsx
// that inline function is cached exactly as in the section before
const onClick = useCallback(() => {}, []);
```

如果我们需要在这个函数内部访问状态或属性，我们需要将它们添加到依赖项数组中：

```jsx
const Component = () => {
  const [state, setState] = useState();
  const onClick = useCallback(() => {
    // access to state inside
    console.log(state);
    // need to add this to the dependencies array
  }, [state]);
};
```

这个依赖项数组是让 React 刷新缓存闭包的关键，正如我们在比较 `value !== prevValue` 时所做的一样。如果我忘记了这个数组，我们的闭包就会变得陈旧（stale）：

```jsx
const Component = () => {
  const [state, setState] = useState();
  const onClick = useCallback(() => {
    // state will always be the initial state value here
    // the closure is never refreshed
    console.log(state);
    // forgot about dependencies
  }, []);
};
```

每次触发回调时，所有被记录的内容都将是 `undefined`。

## Stale closures in React: Refs  

在 `useCallback` 和 `useMemo` 钩子之后，引入陈旧闭包问题的第二种最常见方式是使用 Refs。

如果我尝试使用 Ref 来替代 `useCallback` 钩子作为 `onClick` 回调会发生什么呢？这有时是互联网上的一些建议，用于在组件上记忆 props。表面上看，它确实更简单：只需将一个函数传递给 `useRef`，然后通过 `ref.current` 进行访问。没有依赖项，没有担忧。

```jsx
const Component = () => {
  const ref = useRef(() => {
    // click handler
  });
  // ref.current stores the function and is stable between rerenders
  return <HeavyComponent onClick={ref.current} />;
};
```

然而。组件内的每个函数都将形成一个闭包，包括我们传递给 `useRef` 的函数。我们的 ref 将只在创建时初始化一次，并且永远不会自行更新。基本上就是我们在一开始创建的逻辑。只是，我们不是传递 `value`，而是传递我们想要保留的函数。类似于这样：

```jsx
const ref = {};
const useRef = (callback) => {
  if (!ref.current) {
    ref.current = callback;
  }
  return ref.current;
};
```

因此，在这种情况下，当组件刚挂载时形成的闭包将被保留并永远不会刷新。当我们尝试在存储在 Ref 中的函数中访问状态或属性时，我们只会得到它们的初始值：

```jsx
const Component = ({ someProp }) => {
  const [state, setState] = useState();
  const ref = useRef(() => {
    // both of them will be stale and will never change
    console.log(someProp);
    console.log(state);
  });
};
```

为了解决这个问题，我们需要确保在我们尝试访问的每次更改时更新该 ref 值。基本上，我们需要实现依赖项数组功能对于 `useCallback` 钩子所做的事情。

```jsx
const Component = ({ someProp }) => {
  // initialize ref - creates closure!
  const ref = useRef(() => {
    // both of them will be stale and will never change
    console.log(someProp);
    console.log(state);
  });
  useEffect(() => {
    // update the closure when state or props change
    ref.current = () => {
      console.log(someProp);
      console.log(state);
    };
  }, [state, someProp]);
};
```

## Stale closures in React: React.memo  

最后，我们回到本章一开始并引发所有这一切的谜题。让我们再次看看有问题的代码：

```jsx
const HeavyComponentMemo = React.memo(
  HeavyComponent,
  (before, after) => {
    return before.title === after.title;
  },
);
const Form = () => {
  const [value, setValue] = useState();
  const onClick = () => {
    // submit our form data here
    console.log(value);
  };
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <HeavyComponentMemo
        title="Welcome to the form"
        onClick={onClick}
      />
    </>
  );
};
```

每次点击按钮时，我们都会记录 "undefined"。我们 `onClick` 内部的值从未更新。现在你能知道为什么了吗？

当然，这又是一个陈旧的闭包问题。当我们创建 `onClick` 时，闭包首先使用默认状态值形成，即 "undefined"。我们将该闭包与 `title` 属性一起传递给我们的记忆化组件。在比较函数内部，我们仅比较 `title`。它永远不会改变，它只是一个字符串。比较函数始终返回 `true`，`HeavyComponent` 从未更新，因此它保存对第一个 `onClick` 闭包的引用，其中 `undefined` 被冻结。

既然我们知道问题所在，我们该如何解决呢？这里说起来容易做起来难…

理想情况下，我们应该在比较函数中比较每个 prop，因此我们需要将 `onClick` 包含在其中：

```jsx
(before, after) => {
  return (
    before.title === after.title &&
    before.onClick === after.onClick
  );
};
```

然而，在这种情况下，这意味着我们只是重新实现了 React 的默认行为，实际上就是在做没有比较函数的 React.memo 所做的事情。因此，我们可以放弃比较函数，只保留 `React.memo(HeavyComponent)`。

但这样做意味着我们需要用 `useCallback` 包装我们的 `onClick`。但它依赖于状态，因此会在每次按键时更改。我们又回到了原点：我们的重组件将在每次状态更改时重新渲染，这正是我们试图避免的。

我们可以尝试使用组合玩弄，并尝试提取和隔离状态或 `HeavyComponent`。我们在前几章中探讨的技术。但这不会很容易：`input` 和 `HeavyComponent` 都依赖于该状态。

我们可以尝试许多其他方法。但是，为了摆脱这个闭包陷阱，我们不必进行任何繁重的重构。这里有一个很酷的技巧可以帮助我们。

## 使用引用（Refs）来避免闭包陷阱

这个技巧绝对令人惊叹：它非常简单，但它可能会永远改变你在React中进行函数记忆的方式。或者也可能不会……无论如何，这将对下一章至关重要，让我们深入了解一下。

暂时去掉我们React.memo和onClick实现中的比较函数，只保留一个带有状态和经过记忆的HeavyComponent的纯组件：

```jsx
const HeavyComponentMemo = React.memo(HeavyComponent);
const Form = () => {
  const [value, setValue] = useState();
  return (
    <>
      <input type="text" value={value} onChange={(e) =>
        setValue(e.target.value)} />
      <HeavyComponentMemo title="Welcome to the form" onClick=
        {...} />
    </>
  );
}
```

现在我们需要添加一个在重新渲染之间保持稳定但同时又能访问最新状态的onClick函数，我们将把它存储在Ref中，先留空：

```jsx
const Form = () => {
  const [value, setValue] = useState();
  // adding an empty ref
  const ref = useRef();
};
```

为了让函数能够访问到最新的状态，它需要在每次重新渲染时被重新创建。这是无法避免的，它是闭包的本质，与React无关。我们应该在 useEffect 中修改 Ref，而不是直接在渲染中，所以让我们这样做。

```jsx
const Form = () => {
  const [value, setValue] = useState();
  // adding an empty ref
  const ref = useRef();
  useEffect(() => {
    // our callback that we want to trigger
    // with state
    ref.current = () => {
      console.log(value);
    };
    // no dependencies array!
  });
};
```

使用没有依赖数组的 useEffect 将在每次重新渲染时触发。这正是我们想要的。所以现在在我们的 ref.current 中，我们有一个闭包，它在每次重新渲染时都会被重新创建，因此在那里记录的状态始终是最新的。

但我们不能简单地将该 ref.current 传递给记忆化组件。该值将在每次重新渲染时不同，因此记忆化将无法起作用。

```jsx
const Form = () => {
  const ref = useRef();
  useEffect(() => {
    ref.current = () => {
      console.log(value);
    };
  });
  return (
    <>
      {/* Can't do that, will break memoization */}
      <HeavyComponentMemo onClick={ref.current} />
    </>
  );
};
```

因此，让我们创建一个小的空函数，使用 useCallback 包装，没有依赖项。

```jsx
const Form = () => {
  const ref = useRef();
  useEffect(() => {
    ref.current = () => {
      console.log(value);
    };
  });
  const onClick = useCallback(() => {
    // empty dependency! will never change
  }, []);
  return (
    <>
      {/* Now memoization will work, onClick never changes */}
      <HeavyComponentMemo onClick={onClick} />
    </>
  );
};
```

现在，记忆功能运行得很完美 - onClick 从不改变。然而，有一个问题：它什么也没做。

这就是魔术的窍门：为了使它起作用，我们所需要的就是在记忆的回调内调用 ref.current：

```jsx
useEffect(() => {
  ref.current = () => {
    console.log(value);
  };
});
const onClick = useCallback(() => {
  // call the ref here
  ref.current();
  // still empty dependencies array!
}, []);
```

请注意，ref 不在 useCallback 的依赖项中。它不需要在 useCallback 中。ref 本身永远不会改变。它只是 useRef 钩子返回的可变对象的引用。

但是当闭包固定周围的一切时，它并不会使对象变得不可变或冻结。对象存储在内存的不同部分，多个变量可以包含对完全相同对象的引用。

But when a closure freezes everything around it, it doesn't make objects immutable or frozen. Objects are stored in a different part of the memory, and multiple variables can contain references to exactly the same object.  

在我们的例子中，甚至这也不会发生：我们在 useCallback 和 useEffect 内部具有完全相同的引用。因此，当我们在 useEffect 内部更改 ref 对象的 current 属性时，我们可以在 useCallback 内部访问该确切属性。该属性恰好是捕获了最新状态数据的闭包。

完整的代码如下：

```jsx
const Form = () => {
  const [value, setValue] = useState();
  const ref = useRef();
  useEffect(() => {
    ref.current = () => {
      // will be latest
      console.log(value);
    };
  });
  const onClick = useCallback(() => {
    // will be latest
    ref.current?.();
  }, []);
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <HeavyComponentMemo
        title="Welcome closures"
        onClick={onClick}
      />
    </>
  );
};
```

现在，我们拥有最佳的两全其美：重组件得到了正确的记忆化，不会在每次状态变化时重新渲染。并且组件中的 onClick 回调函数可以访问组件中的最新数据，而不会破坏记忆化。我们现在可以安全地将所有需要发送到后端的东西发送过去了！

## 要点

- 闭包是在一个函数内部创建另一个函数时形成的。
- 由于React组件只是函数，因此在组件内创建的每个函数都形成一个闭包，包括`useCallback`和`useRef`等钩子。
- 当形成闭包的函数被调用时，它周围的所有数据都被 "冻结"，就像一个快照。
- 要更新那些数据，我们需要重新创建 "封闭" 函数。这就是像`useCallback`等钩子的依赖项允许我们做的事情。
- 如果我们遗漏了一个依赖项，或者没有刷新分配给`ref.current`的封闭函数，闭包就会变得 "过期"。
- 在React中，我们可以通过利用Ref是可变对象这一事实来避免"过期闭包"的陷阱。我们可以在"过期闭包"之外修改`ref.current`，然后在内部访问它，这将是最新的数据。

# 第11章 使用引用（Refs）实现高级的防抖和节流

## 什么是去抖和节流？

节流非常相似，保持内部跟踪器和返回函数的思想是一样的。区别在于，节流保证定期调用回调函数，每个等待间隔一次，而去抖会不断重置计时器，直到最后才执行。

如果我们不使用异步搜索示例，而是使用具有自动保存功能的编辑字段，区别将变得明显：如果用户在字段中输入一些内容，我们希望在用户明确按下"保存"按钮之前就向后端发送请求，实时保存他们输入的内容。如果用户在这样的字段中非常快地写一首诗，"去抖"的`onChange`回调将只触发一次。如果在输入过程中出现问题，整首诗将丢失。而"节流"的回调将定期触发，诗将定期保存，如果发生灾难，只会丢失最后的几毫秒诗歌。这是一种更安全的方法。

## React中的去抖回调：处理重新渲染



所以，在每次重新渲染时，我们调用`debounce(sendRequest, 500)`时，我们正在重新创建一切：新的调用，新的计时器，新的带有回调的返回函数。但是旧函数从未被清理，因此它只是停留在内存中等待计时器过去。

当计时器完成时，它触发回调函数，然后就消亡了，最终由垃圾收集器清理。

我们最终得到的只是一个简单的 `delay`  函数，而不是一个正确的`debounce`  函数。现在修复它应该是显而易见的：我们应该只调用一次`debounce(sendRequest, 500)`，以保留内部计时器和返回的函数。

最简单的方法就是将其移到Input组件之外：

然而，如果这些函数对组件生命周期内发生的事情有依赖，比如状态或属性，这种方法就不起作用了。不过没问题，我们可以使用记忆化钩子来实现完全相同的结果：

## Debounced callback in React: dealing with state inside  

这里有什么可以做的吗？当然！这是一个使用 Refs 的完美用例。如果您搜索关于防抖和 React 的文章，其中一半将提到 `useRef` 作为避免在每次重新渲染时重新创建防抖函数的方法。

通常，模式如下：

```jsx
const Input = () => {
  // creating ref and initializing it with the debounced backend
  call;
  const ref = useRef(
    debounce(() => {
      // this is our old "debouncedSendRequest" function
    }, 500)
  );
  const onChange = (e) => {
    const value = e.target.value;
    // calling the debounced function
    ref.current();
  };
};
```

这实际上可能是基于`useMemo`和`useCallback`的上一解决方案的一个很好的替代方案。我不知道您的情况，但有时这些链式钩子会让我头疼。基于ref的解决方案似乎要简单得多。

很遗憾，它只适用于先前的用例：当我们在回调函数中没有状态时。还记得前一章的闭包问题吗？Ref 的初始值被缓存且永远不会更新。在组件挂载和 ref 初始化时，它被“冻结”。
正如我们已经了解的，使用 Ref 中的函数时，我们需要在 useEffect 中更新它们。否则，闭包就会变得陈旧。

这是前一章中详细讨论的解决闭包陷阱的解决方案的另一个很好的用例！我们需要做的就是将 `sendRequest` 赋值给 `Ref`，在 `useEffect` 中更新 `Ref` 以获取对最新闭包的访问权限，然后在我们的闭包中触发 `ref.current`。记住：`Ref` 是可变的，闭包不执行深克隆。它只“冻结”对该可变对象的引用，我们仍然可以在每次引用的对象中进行变更。

思考闭包让我的大脑感到混乱，但实际上它确实有效，在代码中更容易理解这个思路：

```jsx
const Input = () => {
  const [value, setValue] = useState();
    
  const sendRequest = () => {
    // send request to the backend here
    // value is coming from state
    console.log(value);
  };
    
  // creating ref and initializing it with the sendRequest function
  const ref = useRef(sendRequest);
    
  useEffect(() => {
    // updating ref when state changes
    // now, ref.current will have the latest sendRequest with access to the latest state
    ref.current = sendRequest;
  }, [value]);
    
  // creating debounced callback only once - on mount
  const debouncedCallback = useMemo(() => {
    // func will be created only once - on mount
    const func = () => {
      // ref is mutable! ref.current is a reference to the latest
      sendRequest;
      ref.current?.();
    };
    // debounce the func that was created once, but has access to the latest sendRequest
    return debounce(func, 1000);
    // no dependencies! never gets updated
  }, []);
    
  const onChange = (e) => {
    const value = e.target.value;
      
    // calling the debounced function
    debouncedCallback();
  };
};
```

现在，我们只需将这个令人头疼的闭包逻辑提取到一个小小的钩子中，放入一个单独的文件，并假装不去注意它。

```jsx
const useDebounce = (callback) => {
  const ref = useRef();
    
  useEffect(() => {
    ref.current = callback;
  }, [callback]);
    
  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };
      
    return debounce(func, 1000);
  }, []);
    
  return debouncedCallback;
};
```

然后，我们的生产代码可以在不用经受 useMemo 和 useCallback 那令人眼花缭乱的链条的情况下使用它，无需担心依赖，并可以在内部访问到最新的状态和属性！

```jsx
const Input = () => {
  const [value, setValue] = useState();

  const debouncedRequest = useDebounce(() => {
    // send request to the backend
    // access to the latest state here
    console.log(value);
  });

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
    debouncedRequest();
  };
  
  return <input onChange={onChange} value={value} />;
};
```

JavaScript 中闭包和可变性的威力是无穷的！

## 要点

那是不是很有趣？JavaScript 的闭包一定是互联网上最受欢迎的特性之一。在下一章中，我们将尝试从处理它们中恢复过来，转而玩一些 UI 改进。更具体地说，我们将学习如何消除定位元素的“闪烁”效果。但在此之前，让我们快速回顾一下本章：

- 我们在希望跳过某个函数因被过于频繁触发而执行的情况下使用防抖和节流。
- 为了让这些函数正常工作，它们应该在组件的生命周期内只被调用一次，通常是在组件挂载时。
- 如果我们直接在组件的渲染函数中调用它们，内部的计时器将在每次重新渲染时重新创建，这样函数将无法按预期工作。
- 为了解决这个问题，我们可以使用 useMemo 进行记忆化，或者通过使用 Refs。
- 如果我们简单地对它们进行记忆化，或者“天真地”使用 Refs，我们将无法访问组件的最新数据，如状态或 props。这是因为在初始化 Ref 时创建了一个闭包，它会在创建时冻结值。
- 为了避免闭包陷阱，我们可以利用 Ref 对象的可变性，在 useEffect 中不断更新 ref.current 中的“封闭”函数，从而获得对最新数据的访问权限。

# 第12章. 使用 useLayoutEffect 避免闪烁的UI

那么，它究竟存在什么问题，为什么“正常”的策略不够好呢？让我们进行一些编码，找出答案。在这个过程中，我们将学到：

- 有关 useLayoutEffect 的所有我们需要了解的内容。
- 何时以及为什么我们应该使用它而不是 useEffect 。
- 浏览器如何渲染我们的 React 代码。
- 绘制是什么以及为什么所有这些都很重要。
- 服务器端渲染（SSR）在这里扮演的角色。

## useEffect 的问题是什么？

## 通过 useLayoutEffect 修复

这种闪烁的原因应该很明显：我们在移除不必要的项之前先渲染这些项并使其可见。而且我们必须先渲染它们，否则漂亮的响应性就不会起作用。

然而，在 React 版本从 ~16.8（使用 hooks 的版本）开始，我们只需将 useEffect 钩子替换为 useLayoutEffect。

```jsx
const Component = ({ items }) => {
  // everything is exactly the same, only the hook name is
  different;
  useLayoutEffect(() => {
    // the code is still the same
  }, [ref]);
};
```

在 React 中使用 useLayoutEffect 是否安全？为什么我们不在所有地方都使用它，而是使用 useEffect？文档明确表示 useLayoutEffect 可能会影响性能[15]，应该避免使用。这是为什么呢？文档还指出它在“浏览器重新绘制屏幕之前”触发，这意味着 useEffect 在其后触发。但在实际情况中，这意味着什么？在编写简单的下拉菜单时，我是否需要考虑像浏览器绘制这样的底层概念？为了回答这些问题，我们需要离开 React 一会儿，谈一谈浏览器和经典的 JavaScript。

## 为什么这个修复方案有效：渲染、绘制和浏览器

```jsx
setTimeout(() => {
  child.style = "border: 10px solid red";
  wait(1000);
  setTimeout(() => {
    child.style = "border: 20px solid green";
    wait(1000);
    setTimeout(() => {
      child.style = "border: 30px solid black";
      wait(1000);
    }, 0);
  }, 0);
}, 0);
```

然后，这些超时中的每一个都将被视为一个新的“任务”。因此，在完成一个任务之后并在开始下一个任务之前，浏览器将能够重新绘制屏幕。我们将能够看到从红色到绿色再到白色的缓慢但辉煌的过渡，而不是在白屏上冥想三秒钟。

这就是 React 为我们所做的。基本上，它是一个非常复杂但非常高效的引擎，将我们庞大的 npm 依赖项与我们自己的代码组合在一起的庞大代码块分割成浏览器能够在 13 毫秒（理想情况下）内处理的最小可能块。

## 回到 useEffect 与 useLayoutEffect 的比较

useLayoutEffect 是 React 在组件更新期间同步运行的东西。在这段代码中：

```jsx
const Component = () => {
  useLayoutEffect(() => {
    // do something
  });
  return ...
};
```

无论我们在组件中渲染什么，都将在 useLayoutEffect 中作为同一"任务"运行。React 保证了这一点。即使我们在 useLayoutEffect 中更新状态，通常我们认为这是一个异步任务，React 仍会确保整个流程是同步运行的。

如果我们回到最开始实现的"导航"示例，从浏览器的角度来看，它只会是一个"任务"。

这种情况与我们看不到的红绿黑边框转换完全相同！

相反，使用 `useEffect` 的流程将分为两个任务：

第一个任务渲染了所有按钮的“初始”导航。第二个任务删除我们不需要的子元素。这两个任务之间有屏幕重绘！与在 timeouts 内使用边框完全相同的情况。



因此，回答一开始的问题。使用`useLayoutEffect`安全吗？是的！它会影响性能吗？绝对会！我们最不希望的是我们整个React应用程序变成一个巨大的同步“任务”。

只有在需要根据元素的实际大小调整UI以消除视觉“闪烁”时才使用`useLayoutEffect`。对于其他一切，`useEffect`是更好的选择。而且，你甚至可能也不需要使用`useEffect`[16]。

## 关于`useEffect`的更多信息

虽然将`useEffect`想象为在`setTimeout`中运行的形式在概念上很方便理解其差异，但从技术上来说并不完全正确。首先，为了使实现细节清晰，React 使用了 `postMessage` 结合 `requestAnimationFrame` 的技巧。

其次，它实际上并不保证异步运行。虽然 React 会尽量优化它，但有时它可能在浏览器绘制之前运行并阻塞绘制。其中一种情况是当在更新链的某处已经有 `useLayoutEffect` 时。

问题在于，React 在“快照”或周期中运行重新渲染。每个重新渲染周期将按照以下顺序进行： "触发状态更新 -> 触发 useLayoutEffect -> 触发 useEffect"。如果其中任何一个触发了状态更新，它将启动另一个重新渲染周期。但在执行这个周期之前，React 需要完成触发状态更新的那个周期。因此，`useEffect` 必须在新的周期开始之前运行。因此，如果状态更新是在 `useLayoutEffect` 中触发的，而 `useLayoutEffect` 是同步的，那么 React 将不得不同步运行 `useEffect`。

## 在 Next.js 和其他 SSR 框架中使用 `useLayoutEffect`

够了，低级别的 JavaScript 和浏览器的东西就说到这里，让我们回到我们的生产代码。因为在“现实生活”中，我们通常不需要经常关心这些。在“现实生活”中，我们只想编写我们美丽的响应式导航，使用像 Next.js 这样的先进框架构建一些出色的用户体验。

然而，当我们尝试这样做时，我们会注意到根本行不通。就是一点效果也没有。闪烁仍然存在，不再有魔法。要复制它，只需将我们之前修复的导航粘贴到您的 Next.js 应用程序中（如果有的话）。

发生了什么？

这是服务器端渲染（SSR）。这是一些框架默认支持的一个很酷的特性。但在处理类似问题时确实会让人头疼。

你看，当启用了服务器端渲染（SSR）时，渲染 React 组件和调用所有生命周期事件的第一个步骤是在代码到达浏览器之前在服务器上完成的。如果你对SSR的工作原理不熟悉，这只是意味着在后端的某个地方，有一些方法调用了类似 `React.renderToString(<App />)` 的东西。然后，React遍历应用中的所有组件（即调用它们的函数），并生成这些组件表示的HTML。

然后，这个HTML被注入到即将发送到浏览器的页面中，然后就是进展。就像在过去一切都是在服务器上生成的，我们只是用JavaScript来打开菜单的时候一样。之后，浏览器下载页面，展示给我们看，下载所有的脚本（包括React），运行它们（再次包括React），React遍历预生成的HTML，为其添加一些交互性，我们的页面就又活了起来。

这里的问题是：在生成初始HTML时，还没有浏览器。因此，任何涉及计算元素实际尺寸的操作（就像我们在useLayoutEffect中所做的那样）在服务器上根本不起作用：此时只有字符串，没有具体的元素尺寸。而由于useLayoutEffect的整个目的是获取元素的尺寸，因此在服务器上运行它没有太多意义。而React也不会这样做。

因此，在浏览器首次加载时，显示给我们的页面尚不具有交互性，我们看到的是在组件的“第一遍”阶段渲染的内容：包括“更多”按钮在内的所有按钮。在浏览器有机会执行所有操作并激活React之后，它最终可以运行useLayoutEffect，并最终隐藏按钮。但是视觉上的闪烁问题仍然存在。

如何修复这个问题是一个用户体验问题，完全取决于你愿意向用户“默认”展示什么。我们可以向用户展示一些“加载”状态而不是菜单。或者显示一两个最重要的菜单项。甚至可以完全隐藏项目，并仅在客户端进行渲染。由你决定。

## 要点

- 当我们在 `useEffect` 钩子中计算元素的尺寸，然后隐藏它们或调整它们的大小时，可能会出现视觉上的“闪烁”。
- 这是因为通常情况下，`useEffect` 是异步运行的。从浏览器的角度来看，异步代码是一个独立的任务。因此，在变化之前和之后，它有机会绘制状态，从而导致了这种闪烁。
- 我们可以使用 `useLayoutEffect` 钩子来阻止这种行为。这个钩子是同步运行的。从浏览器的角度来看，它将是一个大而不可分割的任务。因此，浏览器会等待，直到任务完成并计算出最终的尺寸，然后再进行绘制。
- 在SSR环境中，`useLayoutEffect` 不会起作用，因为React在SSR模式下不会运行 `useLayoutEffect`，而"闪烁"问题会再次可见。
- 这可以通过为此特定功能选择退出SSR来解决。

# 第13章. React portals及其作用

你可能听说过，在React中，我们需要使用Portals来避免在具有`overflow: hidden`属性的元素内部渲染元素时的问题。关于Portals的每篇第二篇文章都提到了这个例子。事实上，我们可以仅通过纯CSS来解决内容“裁剪”的问题。我们需要Portals是出于其他原因。这个“溢出问题”也可能给人一种错误的安全感：如果我们在应用中没有任何`overflow: hidden`，我们就可以轻松地安全地在任何地方定位所有内容。这也是不正确的。

请注意：这是一章关于CSS的内容。它的前半部分详细介绍了仅涉及CSS的概念，因为并非每个React开发者都精通CSS。

## CSS：绝对定位

## Absolute is not that absolute  

首先，绝对定位并不是绝对的...它实际上是相对的：相对于最近的`position`属性被设置为任何值的元素。在我们的情况下，这只是巧合起作用：因为在我的模态对话框和应用程序根元素之间没有任何定位元素。

如果对话框碰巧在具有 `position: relative`（或 `sticky` 或 `absolute`）的 div 中渲染，并且此 div 不在页面的中央，那么一切都会崩溃。模态对话框将定位在该 div 的中央，而不是屏幕的中央。

因此，对于应该相对于屏幕定位的元素，绝对定位并非最佳选择。当然，虽然仍然可以计算，但无法仅使用纯 CSS。

但是像工具提示或下拉菜单这样的东西呢？我们期望它们相对于它们起源的元素定位，对吧？因此，绝对定位是相对于的这个事实非常适合这样的情况：我们可以简单地在触发器上使用 `offsetLeft` 和 `offsetTop` 来获取触发器与父元素之间的左/上距离，然后我们的对话框/工具提示/菜单将始终完美地相对于触发器定位。

技术上是的，它会起作用。
直到层叠上下文（Stacking Context）规则生效。

## Understanding Stacking Context  

## Position: fixed. Escape the overflow  

## Stacking Context in real apps  

## How React Portal can solve this

在CSS中，`position: sticky;`是一种特殊的定位类型。它表示元素在滚动到某个位置时相对于其最近的定位祖先（而不是相对于视口）固定位置。

更具体地说，当一个元素的定位被设置为`sticky`时，该元素在滚动超过其最近的定位祖先之前会根据正常的文档流进行定位。然而，一旦元素滚动超过其最近的定位祖先，它就会固定在指定的位置，直到页面的其余部分滚动到足够远的位置，使得元素再次成为视口的一部分。

这种效果非常适合创建例如导航栏、工具提示等效果，其中元素需要在用户滚动页面时保持可见。

需要注意的是，`position: sticky;`需要指定一个`top`、`bottom`、`left`或`right`的值，以确定元素在滚动超过其最近的定位祖先时要固定的位置。

例如：

```css
.sticky {  
  position: sticky;  
  top: 0; /* 指定元素在滚动到顶部0位置时固定 */  
}
```

## React生命周期、重新渲染、Context和Portal

## CSS、原生JavaScript、表单提交和Portals  

如果你依赖于“原生”事件传播，这也不会生效。如果你尝试通过 element.addEventListener 捕捉在模态框中产生的事件，而不是在“主”div上使用 onClick 回调，它是不会生效的。

```jsx
const App = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    el.addEventListener("click", () => {
      // trying to catch events, originated in the portalled modal
      // not going to work!!
    });
  }, []);
  // the rest of the app
  return <div ref={ref} ... />;
};
```

如果你尝试通过 parentElement 获取模态框的父元素，它将返回根div，而不是主应用程序。对于任何作用于DOM元素的原生JavaScript函数，情况也是一样的。

最后是 `<form>` 元素上的 onSubmit 事件。这是关于此问题最不明显的部分。它感觉与 onClick 相同，但实际上，submit 事件并不由 React 管理[23]。这是一个本地API和DOM元素的事情。如果我将应用程序的主体包装在 `<form>` 中，那么单击对话框内的按钮将不会触发 "submit" 事件！从DOM的角度来看，这些按钮在表单之外。如果您希望对话框内有一个表单并希望依赖 onSubmit 回调，则 form 标记也应该在对话框内。

## 要点

# 第14章. 客户端数据获取和性能

## 数据获取的类型

## 我真的需要在React中使用外部库来获取数据吗？

## "性能良好" 的 React 应用是什么？

## React生命周期和数据获取

## 浏览器限制和数据获取

你知道浏览器对同一主机并行处理的请求数量有限制吗？假设服务器是HTTP1（这仍然是互联网的70%），这个数字并不是很大。在Chrome中，只有6个[26]。只有6个请求可以同时处理！如果同时发送更多的请求，其余的请求都必须排队等待第一个可用的“槽位”。

## 瀑布式请求：它们是如何出现的

## 如何解决请求瀑布问题

### Promise.all 解决方案

```jsx
useEffect(async () => {
  const [sidebar, issue, comments] = await Promise.all([
    fetch("/get-sidebar"),
    fetch("/get-issue"),
    fetch("/get-comments"),
  ]);
}, []);
```

```jsx
fetch("/get-sidebar")
  .then((data) => data.json())
  .then((data) => setSidebar(data));
fetch("/get-issue")
  .then((data) => data.json())
  .then((data) => setIssue(data));
fetch("/get-comments")
  .then((data) => data.json())
  .then((data) => setComments(data));
```

现在，每个fetch请求都是并行发起的，但独立解决的。现在在App的渲染中，我们可以做一些很酷的事情，比如一旦Sidebar和Issue的数据出现在状态中，就进行渲染：





这里需要注意的一点是，在这个解决方案中，我们独立触发了三次状态改变，这将导致父组件重新渲染三次。考虑到这是发生在应用程序的顶部，这样不必要的重新渲染可能导致半个应用程序不必要地重新渲染。性能影响实际上取决于组件的顺序，当然还取决于它们的大小，但这是需要牢记的事项。

## 数据提供者用于抽象数据获取(Data providers to abstract away fetching)

如上面的示例中将数据加载提升是有利于性能的，但对于应用程序架构和代码可读性来说却是糟糕的。

突然间，我们不再有漂亮的数据获取请求和它们组件之间的关联，取而代之的是一个负责获取一切的庞大组件，以及贯穿整个应用程序的大量 prop 传递。

幸运的是，对于这个问题有一个相对简单的解决方案：我们可以引入“数据提供者”的概念到应用中。“数据提供者”在这里只是一个围绕数据获取的抽象，它使我们能够在应用的一个地方获取数据，并在另一个地方访问该数据，绕过了中间的所有组件。本质上，它就像每个请求的一个小型缓存层。在“原始”的 React 中，它只是一个简单的上下文：

```jsx
const Context = React.createContext();
export const CommentsDataProvider = ({ children }) => {
  const [comments, setComments] = useState();
  useEffect(async () => {
    fetch("/get-comments")
      .then((data) => data.json())
      .then((data) => setComments(data));
  }, []);
  return <Context.Provider value={comments}>{children}</Context.Provider>;
};
export const useComments = () => useContext(Context);
```

如果你不是 Context 的狂热粉丝，不用担心，完全相同的概念可以适用于你选择的任何状态管理解决方案。

## 如果我在 React 之前获取数据怎么办？

最后一个要学习的技巧是对抗请求瀑布的。这个技巧非常重要，因此你可以在代码审查时阻止同事使用它。我的意思是，这是一件非常危险的事情，因此要谨慎使用。



简单。记得浏览器的限制部分吗？只能并行处理 6 个请求，超过的请求会排队。而使用这种方法的 fetch 会立即触发，而且完全不受控制。在传统的瀑布流方法中，一个很少渲染的组件，即使它实际上被渲染了，也不会对任何人造成麻烦。但使用这个技巧，它有潜力窃取关键数据的初始获取中最宝贵的毫秒数。对于任何试图弄清楚一个位于代码某个存在的角落中、甚至从未在屏幕上渲染的组件如何拖慢整个应用程序的人，祝好运。

这种模式只有两个“合理”的用例，我能想到的是：在路由器级别预获取一些关键资源和在懒加载组件中预获取数据。

在第一种情况下，你实际上需要尽快获取数据，并且你确切地知道这些数据是关键的且立即需要的。而懒加载组件的 JavaScript 只有在它们出现在渲染树中时才会被下载和执行，因此，根据定义，它们在获取和渲染所有关键数据之后。所以是安全的。

## 如果我使用数据获取的库呢？

React 集成的库，如具有类似查询 API 的 hooks 的 swr[30]，此外还对使用 useCallback、state 和许多其他内容进行了抽象处理，如错误处理和缓存。与仍然需要许多工作才能达到生产就绪的这种代码怪物相比：

## What about Suspense?

```jsx
const Issue = () => {
  return (
    <>
      {/*issue data*/}
      <Suspense fallback="loading">
        <Comments />
      </Suspense>
    </>
  );
};
```

## 要点

# 第15章。数据获取和竞态条件

数据在前端获取时的另一个重要主题，值得拥有自己章节的关注是竞态条件。在我们日常生活中，这些条件相对较少，可以开发相当复杂的应用程序，而无需处理它们。但一旦它们发生，调查和修复它们可能是一个真正的挑战。由于在JavaScript中，fetch或任何异步操作大多数时候只是一个被美化的Promise，因此本章的主要焦点是Promises。

## What is a Promise?  

## Promises and race conditions  

## Race condition reasons  

一切归结为两个因素：Promises 的性质和 React 生命周期。

但如果我在第一个 fetch 仍在进行且尚未完成时点击导航按钮，id 发生了变化会发生什么呢？这是一个很酷的情况！

## 解决竞态条件：强制重新挂载(Fixing race conditions: force remounting  )

```jsx
const App = () => {
  const [page, setPage] = useState("issue");
  return (
    <>
      {page === "issue" && <Issue />}
      {page === "about" && <About />}
    </>
  );
};
```

顺便提一下，你还记得那个可怕的警告*"Can't perform a React state update on an unmounted component"*  吗？它通常会在这些情况下出现：当异步操作（比如数据获取）在组件已经卸载后完成时。不过“通常会”，因为它最近被移除了。

然而，这并不是我会推荐用于解决一般竞态条件问题的解决方案。存在太多的注意事项：性能可能受到影响，焦点和状态可能出现意外的错误，可能会意外地触发渲染树下游的 useEffect。这更像是把问题搁置一边。在处理竞态条件的问题时有更好的方法（见下文）。但在某些情况下，如果小心使用，它可以是你工具库中的一种工具。

## 解决竞态条件问题：丢弃错误的结果

解决竞态条件问题的一种更温和的方式，而不是从整个`Page`组件中删除，只是确保`.then`回调中传入的结果与当前“活动”的id匹配。

如果结果返回了用于生成URL的id，我们只需比较它们。如果它们不匹配，则忽略它们。这里的技巧是逃离React生命周期和函数的本地作用域，并在所有`useEffect`的迭代中（即使是“陈旧”的迭代）获取对“最新” id 的访问。这是在第9章“Refs：从存储数据到命令式API”中讨论过的Refs的另一个用例。

```jsx
const Page = ({ id }) => {
  // create ref
  const ref = useRef(id);
  useEffect(() => {
    // update ref value with the latest id
    ref.current = id;
    fetch(`/some-data-url/${id}`)
      .then((r) => r.json())
      .then((r) => {
        // compare the latest id with the result
        // only update state if the result actually belongs to that id
        if (ref.current === r.id) {
          setData(r);
        }
      });
  }, [id]);
};
```

你的结果没有返回可靠标识它们的内容？没问题，我们可以比较URL：

```jsx
const Page = ({ id }) => {
  // create ref
  const ref = useRef(id);
  useEffect(() => {
    // update ref value with the latest url
    ref.current = url;
    fetch(`/some-data-url/${id}`).then((result) => {
      // compare the latest url with the result's url
      // only update state if the result actually belongs to that url
      if (result.url === ref.current) {
        result.json().then((r) => {
          setData(r);
        });
      }
    });
  }, [url]);
};
```

## 解决竞态条件问题：删除所有先前的结果

不喜欢之前的解决方案，或者认为为类似这样的问题使用 ref 很奇怪？没问题，还有另一种方法。useEffect 有一个称为 "cleanup" 函数的东西，我们可以在其中清理诸如订阅之类的东西。或者在我们的情况下，清理活跃的数据获取请求。

它的语法如下：

```jsx
// normal useEffect
useEffect(() => {
  // "cleanup" function - function that is returned in useEffect
  return () => {
    // clean something up here
  };
  // dependency - useEffect will be triggered every time url has changed;
}, [url]);
```

cleanup function[36]在组件卸载后运行，或在每次有更改的依赖项重新渲染之前运行。因此，在重新渲染期间的操作顺序如下：

- url更改
- 触发"清理"函数
- 触发useEffect的实际内容

这个结合了JavaScript函数和闭包的特性[37]，使我们能够这样做：

```jsx
useEffect(() => {
  // local variable for useEffect's run
  let isActive = true;
  // do fetch here
  return () => {
    // local variable from above
    isActive = false;
  };
}, [url]);
```

我们引入了一个本地的布尔变量 `isActive`，并在 `useEffect` 运行时将其设置为 `true`，在清理阶段设置为 `false`。`useEffect` 中的函数在每次重新渲染时都会重新创建，因此对于最新的 `useEffect` 运行，`isActive` 将始终重置为 `true`。但是！“清理”函数在之前运行，并且仍然可以访问先前函数的作用域，并将其重置为 `false`。这就是 JavaScript 闭包[38]的工作原理。

虽然 fetch Promise 是异步的，但它仍然仅存在于该闭包内，并且仅能访问启动它的 `useEffect` 运行的本地变量。因此，在 `.then` 回调中检查 `isActive` 布尔值时，只有最新的运行，即尚未清理的运行，该变量才设置为 `true`。因此，我们现在只需要检查我们是否在活动的闭包中，如果是 - 设置状态。如果不是 - 什么都不做。数据将简单地消失在虚空中。

```jsx
useEffect(() => {
  // set this closure to "active"
  let isActive = true;
  fetch(`/some-data-url/${id}`)
    .then((r) => r.json())
    .then((r) => {
      // if the closure is active - update state
      if (isActive) {
        setData(r);
      }
    });
  return () => {
    // set this closure to not active before next re-render
    isActive = false;
  };
}, [id]);
```

## 修复竞态条件：取消所有先前的请求

与其清理或比较结果，我们可以简单地取消所有先前的请求。如果它们永远不完成，就不会发生包含过时数据的状态更新，问题就不会存在。我们可以使用 AbortController [39] 接口来实现。

就是在 useEffect 中创建一个 AbortController 并在 cleanup 函数中调用 .abort()。

```jsx
useEffect(() => {
  // create controller here
  const controller = new AbortController();
    
  // pass controller as signal to fetch
  fetch(url, { signal: controller.signal })
    .then((r) => r.json())
    .then((r) => {
      setData(r);
    });
    
  return () => {
    // abort the request here
    controller.abort();
  };
}, [url]);
```

因此，在每次重新渲染时，正在进行的请求将被取消，只有新的请求才能解析并设置状态。

取消进行中的请求会导致 Promise 被拒绝，因此您需要捕获错误以消除控制台中的警告。但无论如何，正确处理 Promise 拒绝都是一个好主意，因此无论使用何种策略，都应该这样做。由于 AbortController 引起的拒绝会产生特定类型的错误，使得可以将其从常规错误处理中排除。

```jsx
fetch(url, { signal: controller.signal })
  .then((r) => r.json())
  .then((r) => {
    setData(r);
  })
  .catch((error) => {
    // error because of AbortController
    if (error.name === 'AbortError') {
      // do nothing
    } else {
      // do something, it's a real error!
    }
  });
```

## Async/await 改变了什么？

不，实际上并没有。Async/await 只是以更好的方式编写相同的 promises。它只是从执行流的角度将它们变成了“同步”函数，但并没有改变它们的异步性质。与其说是：

```jsx
fetch('/some-url')
  .then((r) => r.json())
  .then((r) => setData(r));
```

我们会写成：

```js
const response = await fetch('/some-url');
const result = await response.json();
setData(result);
```

使用 async/await 而不是“传统”Promise实现的完全相同的应用程序将具有完全相同的竞争条件。

上面的解决方案和原因都适用，只是语法略有不同。

## 要点

希望你对竞态条件是如何看似简单而又危险的问题有所印象，现在能够轻松地检测并避免它们。

- 竞态条件可能发生在在同一个 React 组件中解析 promise 后多次更新状态的情况下。

  ```jsx
  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        // this is vulnerable to the race conditions
        setData(r);
      });
  }, [url]);
  ```

  

- 我们可以通过以下方式解决它：
  - 强制重新挂载一个组件，使用我们不需要的“旧”数据。
  - 与触发 Promise 的变量比较返回的结果，如果它们不匹配，则不设置状态。
  - 通过 useEffect 中的清理函数追踪最新的 Promise，并丢弃所有“旧” Promise 的结果。
  - 使用 AbortController 取消所有先前的请求。



# 第16章. 在React中的通用错误处理

## 在 React 中为什么我们应该捕获错误

答案很简单：从版本16开始，在 React 生命周期中抛出的错误如果没有被阻止，将导致整个应用卸载。在此之前，即使组件格式错误且表现异常，它们仍然会保留在屏幕上。现在，在UI的某个无关紧要的部分或者甚至一些你无法控制的外部库发生不可预知的未捕获错误时，都有可能破坏整个页面并呈现一个空白屏幕给所有用户。

前端开发人员以前从未拥有过如此破坏性的力量！

## 记住如何在JavaScript中捕获错误

## 简单的React try/catch：如何操作以及注意事项

## React ErrorBoundary 组件

```jsx
const Component = () => {
  return (
    <ErrorBoundary>
      <SomeChildComponent />
      <AnotherChildComponent />
    </ErrorBoundary>
  );
};
```

现在，如果在这些组件或它们的子组件在渲染过程中出现问题，错误将被捕获并进行处理。

但 React 并没有直接提供组件，它只是提供了一个工具来实现它。最简单的实现可能如下所示：

## ErrorBoundary组件：局限性

错误边界仅捕获在React生命周期中发生的错误。发生在生命周期之外的事情，比如已解析的Promise、带有setTimeout的异步代码、各种回调和事件处理程序，如果不明确处理，将会被忽略。

```jsx
const Component = () => {
  useEffect(() => {
    // this one will be caught by ErrorBoundary component
    throw new Error('Destroy everything!');
  }, []);
  const onClick = () => {
    // this error will just disappear into the void
    throw new Error('Hulk smash!');
  };
  useEffect(() => {
    // if this one fails, the error will also disappear
    fetch('/bla');
  }, []);
  return <button onClick={onClick}>click me</button>;
};
const ComponentWithBoundary = () => {
  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
};
```

这里的常见建议是对这些类型的错误使用常规的try/catch。而至少在这里，我们可以相对安全地使用状态：事件处理程序的回调通常是我们通常设置状态的地方。因此，从技术上讲，我们可以将这两种方法结合起来，做如下操作：

## 使用 ErrorBoundary 捕获异步错误

有趣的是，我们实际上确实可以使用 ErrorBoundary 捕获所有错误！有一个很酷的技巧可以实现这一点。

## 我可以使用 `react-errorboundary` 库吗？

对于那些不喜欢重复造轮子或更喜欢已解决问题的库的人，有一个很好的库叫做 "react-error-boundary"，它实现了一个灵活的 ErrorBoundary 组件，并具有一些类似于上面描述的有用的工具。

## 要点

