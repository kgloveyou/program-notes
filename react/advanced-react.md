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

