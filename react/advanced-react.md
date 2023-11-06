# advanced-react

## Table of contents

https://advanced-react.com/

# Chapter 1. Intro to re-renders

P8：如果没有触发状态更新，那么改变 props 将被“吞噬”：React 不会监控它们。

https://advanced-react.com/examples/01/02

这里的`prop`只是一个内部变量，并不是从外部传入的`prop`。所以，上面的说法存疑。

在重新渲染的情况下，组件的属性是否发生变化只在一种情况下才会有影响：如果所说的组件被包裹在React.memo高阶组件中。只有在这种情况下，React才会停止其自然的重新渲染链，并首先检查属性。如果没有任何属性发生变化，那么重新渲染将在那里停止。如果有一个属性发生变化，它们将像平常一样继续重新渲染。

正确地使用记忆化来防止重新渲染是一个复杂的话题，有许多注意事项。

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

P28

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

52

<<<<<<< HEAD
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

