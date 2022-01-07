# React积累

## [Hook 概览](https://zh-hans.reactjs.org/docs/hooks-overview.html)

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

## useState

https://zh-hans.reactjs.org/docs/hooks-state.html

使用 State Hook

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

Hook 在 class 内部是不起作用的。但你可以使用它们来取代 class 。

```jsx
const [count, setCount] = useState(0);
```

这里的方括号代表JavaScript的数组解构。

## useEffect

https://zh-hans.reactjs.org/docs/hooks-effect.html

使用 Effect Hook

Effect Hook 可以让你在函数组件中执行副作用操作

 *提示*

*如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。*

提示

与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 useLayoutEffect Hook 供你使用，其 API 与 useEffect 相同。



如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React **跳过**对 effect 的调用，只要传递数组作为 `useEffect` 的第二个可选参数即可：

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。



```jsx
// (1) On Mount and every render
useEffect (() => {
  dosomething()
});
// (2) Only on Mount
useEffect (() => {
  dosomething()
}, []);
// (3) On Mount/every time state of count changes
useEffect (() => {
  dosomething()
}, [count]);
// (4) UseEffect with cleanup
useEffect (() => {
  dosomething();
  return clearSomething(){};
});
```



## useRef

https://zh-hans.reactjs.org/docs/hooks-reference.html#useref

```jsx
const refContainer = useRef(initialValue);
```

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变。

## useImperativeHandle

https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle

`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 [`forwardRef`](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 一起使用：

## React.createRef

`React.createRef` 创建一个能够通过 ref 属性附加到 React 元素的 [ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)。

## React.forwardRef

https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref

`React.forwardRef` 会创建一个React组件，这个组件能够将其接受的 [ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 属性转发到其组件树下的另一个组件中。

## React.memo

https://zh-hans.reactjs.org/docs/react-api.html#reactmemo

`React.memo` 为[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)。它与 [`React.PureComponent`](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent) 非常相似，但只适用于函数组件，而不适用 class 组件。

如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

## suspense 和 lazy

https://www.jianshu.com/p/164be62145a7

通过 `React.lazy` 实现组件的懒加载

```jsx
const Foo = React.lazy(() => import('../components/Foo'));
```

通过使用 Suspense 标签将要进行 lazy（懒加载）的组件进行包裹，然后在 callback 函数中给出加载过程中处理方式，也就是加载过程中的行为。

## React.Fragment

https://www.jianshu.com/p/36bb4d88f26c

如果子元素需要父元素包裹起来，但是不需要渲染父元素，我们就可以使用fragment。其实它的功能和vue的template一样，都只是占位，不渲染。

我们也可以把<React.Fragment></React.Fragment>简写为<></>,看着像空组件；
 <></> 是 <React.Fragment/> 的语法糖。
 <></> 语法不能接受键值或属性。

如果你需要一个带 key 的片段，你可以直接使用 <React.Fragment /> 。
一个使用场景是映射一个集合为一个片段数组 — 例如：创建一个描述列表：

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，将会触发一个key警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

key 是唯一可以传递给 Fragment 的属性。在将来，我们可能增加额外的属性支持，比如事件处理。

## useCallback

https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback

```react
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) (缓存的）回调函数。

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

In [computing](https://en.wikipedia.org/wiki/Computing), **memoization** or **memoisation** is an [optimization](https://en.wikipedia.org/wiki/Optimization_(computer_science)) technique used primarily to speed up [computer programs](https://en.wikipedia.org/wiki/Computer_programs) by storing the results of expensive [function calls](https://en.wikipedia.org/wiki/Subroutine) and returning the cached result when the same inputs occur again. Memoization has also been used in other contexts (and for purposes other than speed gains), such as in simple [mutually recursive](https://en.wikipedia.org/wiki/Mutual_recursion) descent parsing.[[1\]](https://en.wikipedia.org/wiki/Memoization#cite_note-Norvig1991-1) Although related to [caching](https://en.wikipedia.org/wiki/Cache_(computing)), memoization refers to a specific case of this optimization, distinguishing it from forms of caching such as [buffering](https://en.wikipedia.org/wiki/Buffer_(computer_science)) or [page replacement](https://en.wikipedia.org/wiki/Page_replacement_algorithm). In the context of some [logic programming](https://en.wikipedia.org/wiki/Logic_programming) languages, memoization is also known as [tabling](https://en.wikipedia.org/wiki/Prolog#Tabling).[[2\]](https://en.wikipedia.org/wiki/Memoization#cite_note-Warren1999-2)

## useMemo

```react
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 值。

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

## useReducer

实现了redux类似功能。

官方介绍的 `useReducer` 使用方法：

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

Manage complex internal state with the Reducer Hook

https://itnext.io/managing-complex-state-with-usereducer-943b03be35ca

using `useReducer` in place of `useState`.

According to the [official documentation](https://reactjs.org/docs/hooks-reference.html#usereducer), `useReducer` is:

> an alternative to `useState`. Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method.

and works exactly as a reducer in **Redux**. The article further mentions that:

> `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

## useContext

使用上面两个hooks，可以轻松地实现一个轻量级的状态管理解决方案。

参见：https://juejin.im/post/5eb2b8b4f265da7bd802ae8b

## queryString

设置queryString:

`npm i qs`

```jsx
import { stringify } from 'querystring';

const createInference = (item) => {
    const queryString = stringify({
        modelPath: encodeURIComponent(item.path)
    });
    history.push((`/Inference/submit/?${queryString}`))
};
```

函数组件中读取queryString:

```jsx
const SubmitModelTraining = (props) => {
  ...
  console.log(111, decodeURIComponent(props.location.query.modelPath));
  ...
}
```

## Context

https://zh-hans.reactjs.org/docs/context.html

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

# Refs and the DOM

https://react.docschina.org/docs/refs-and-the-dom.html

默认情况下，**你不能在函数组件上使用 `ref` 属性**，因为它们没有实例：

如果要在函数组件中使用 `ref`，你可以使用 [`forwardRef`](https://react.docschina.org/docs/forwarding-refs.html)（可与 [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle) 结合使用），或者可以将该组件转化为 class 组件。

不管怎样，你可以**在函数组件内部使用 `ref` 属性**，只要它指向一个 DOM 元素或 class 组件：

```jsx
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 才可以引用它  
  const textInput = useRef(null);
  
  function handleClick() {
    textInput.current.focus();  
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />      
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

## React 中的变量存储

https://blog.csdn.net/tang_yi_/article/details/82706338

1、props

需要注意的是：

- key 和 ref 不会传递给子组件的 this.props。
- 只有属性没有值，React会自动解析为布尔值 true。
- 属性值除了字符串外，其他值需要用花括号包裹。
- 子组件内部不能改变 this.props 的值。

  综上，使用 props 来存储父组件传递给子组件的值。

https://www.freecodecamp.org/news/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00/

### Local state

The important thing to know about local **state** is that when a **state** value changes, it triggers a re-render.

**Takeaway（要点）:** keep UI state and transitory data (such as form inputs) in local **state**.

### Redux store

**Takeaway**: keep data that you intend to share across components in **store**.

### this.<something>

We’re storing the **counter** value in the component and using [forceUpdate()](https://facebook.github.io/react/docs/component-api.html#forceupdate) to re-render when the value changes. *This is because changes to anything other than **state** and **props** does not trigger a re-render*.

This is actually an example of how you should *not* use **this**. If you find yourself using **forceUpdate()**, you’re probably doing something wrong. For values for which a change should trigger a re-render, you should use local **state** or **props/**Redux **store**.

**Takeaway:** use **this** to store things that shouldn’t trigger a re-render.

### Static

If you’ve used [**PropTypes**](https://facebook.github.io/react/docs/reusable-components.html#prop-validation), you’ve already defined a **static** property.

*The main difference between **static** and **this** is that you do not need to instantiate the class to access the value.*

In the example above, you can see that to get the **staticProperty** value, we could just call it straight from the class without instantiating it, but to get **prototypeProperty**, we had to instantiate it with **new App()**.

**Takeaway:** you’re probably never going to use **static**.

### That other option…

**Takeaway:** don’t use module-scoped variables if you can avoid it.



# React Hook父组件调用子组件的方法

#### 情景:

略（暂时没总结）

#### 方法:

父组件使用 `useRef` 创建一个 `ref` 传入 子组件

```jsx
...
const childrenRef = useRef(null);
...
return <children ref={childrenRef} />
```

子组件需要使用 `useImperativeHandle` 暴露 `ref` 自定义的实例值给父组件。这个需要用 `forwardRef` 包裹着。

```jsx
function children(props, ref) {
    useImperativeHandle(ref, () => ({
        hello: () => console.log('hello world!')
    }))
    return <h1>children</h1>
}
export default forwardRef(children);
```

那么在父组件怎么调用呢？

```jsx
...
const childrenRef = useRef(null);
const something = () => childrenRef.current.hello();
...
```

#### 建议：

还是可以查看一下实现方法的关键点： `useRef`, `useImperativeHandle`, `forwardRef`。其实是利用了 `ref` 不变的性质，将子组件的方法保存着，父组件可以调用。可以说，`ref` 作为父组件和子组件的一座由父组件到达子组件的桥梁（单向的，父->子）。

作者：活抓一只小机灵
链接：https://juejin.cn/post/6844903937468792846
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



# [Storing non-state variables in functional components](https://stackoverflow.com/questions/53146575/storing-non-state-variables-in-functional-components)

The [`useRef`](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) hook is not just for DOM refs, but can store any mutable value you like.

**Example**

```js
function FunctionalBar(props) {
  const [foo] = useState(new Animated.Value(0));
  const _foo = useRef(0);

  function showFoo() {
    let anim = Animated.timing(foo, { toValue: 1, duration: 1000, useNativeDriver: true });
    anim.start(() => console.log(_foo.current));
  }

  useEffect(() => {
    function _onChangeFoo({ value }) {
      _foo.current = value;
    }

    foo.addListener(_onChangeFoo);
    showFoo();
    return () => foo.removeListener(_onChangeFoo);
  }, []);

  return <View />;
}
```

# [react functional component let variable doesn't changed](https://stackoverflow.com/questions/58344165/react-functional-component-let-variable-doesnt-changed)

`isDirty` is neither a `prop` nor a `state`. So it doesn't persist. On re-render, it will initialize back to `false`.

Make it a `state` instead.

```js
const [isDirty, setDirty] = useState(false)
```

# React的memo和useMemo的作用

https://juejin.cn/post/6897038904914870286



# 问题

1、页面崩溃

Uncaught Error: Rendered fewer hooks than expected. This may be caused by an accidental early return statement.

**错误原因：**嵌套的子组件里面有根据条件动态生成内容，其中使用了hooks。

https://stackoverflow.com/questions/53472795/uncaught-error-rendered-fewer-hooks-than-expected-this-may-be-caused-by-an-acc

https://www.cnblogs.com/longlongdan/p/10833412.html（※）

```tsx
const JobItemComponent: React.FC<JobItemProps> = (props) => {
    // const context = useContext(MetaDataContext);
    // const { info: { subTaskStatus } } = context;
    const { taskId, id, isAutoAnnotating, subTaskStatus, lang } = props;
    // const { locale } = useContext(ConfigProvider.ConfigContext);

    return (
        <>
            <Row className='cvat-jobs-list-item' justify='center' align='middle'>
                {renderPreview(props)}
                {renderDescription(props)}
                {renderStatus(props, subTaskStatus, { taskId: taskId, jobId: id })}
                {!isAutoAnnotating && renderProgress(props)}
                {isAutoAnnotating && renderAutoAnnotatingProgress(props)}
                {renderNavigation(props, lang)}
            </Row>
        </>
    );
}
```

而react的钩子官方要求如下

**不要在循环，条件或嵌套函数中调用Hook。相反，始终在React函数的顶层使用Hooks。通过遵循此规则，您可以确保每次组件呈现时都以相同的顺序调用Hook。这就是允许React在多个`useState`和`useEffect`调用之间正确保留Hook状态的原因。**

**解决方案：**选择在没有判断条件的顶层使用useContext、useState、useEffect、userHistory、useTransaction等，将获取的值，作为参数传给子组件使用！

# 强制刷新页面

tell the browser to reload the current page:

```js
window.location.reload(false);
```

This method takes an optional parameter which by default is set to false. If set to true, the browser will do a complete page refresh from the server and *not* from the cached version of the page.



# Using setTimeout in React components (including hooks)

https://felixgerschau.com/react-hooks-settimeout/

