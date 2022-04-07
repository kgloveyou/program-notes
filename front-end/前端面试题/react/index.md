# React

## 1、React router 的两种模式，怎么动态获取路由上的 id

（天眼查）

[说说React Router有几种模式？实现原理？](https://vue3js.cn/interview/React/React%20Router%20model.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

- hash 模式：在url后面加上#，如http://127.0.0.1:5500/home/#/page1
- history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录

```tsx
const id = +own.match.params.id;
```

其中：`own: Props`

## 2、React.memo、useMemo和useCallback

（美团）

[React的memo和useMemo的作用](https://juejin.cn/post/6897038904914870286)，具体代码示例参见：https://codesandbox.io/s/svcpo?file=/src/index.js

### React.memo

https://zh-hans.reactjs.org/docs/react-api.html#reactmemo

`React.memo` 为[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)。它与 [`React.PureComponent`](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent) 非常相似，但只适用于函数组件，而不适用 class 组件。

如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

`React.memo` 仅检查 props 变更。如果函数组件被 `React.memo` 包裹，且其实现中拥有 [`useState`](https://zh-hans.reactjs.org/docs/hooks-state.html)，[`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer) 或 [`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

```jsx
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

此方法仅作为**[性能优化](https://zh-hans.reactjs.org/docs/optimizing-performance.html)**的方式而存在。但请不要依赖它来“阻止”渲染，因为这会产生 bug。

> 注意
>
> 与 class 组件中 [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate) 方法不同的是，如果 props 相等，`areEqual` 会返回 `true`；如果 props 不相等，则返回 `false`。这与 `shouldComponentUpdate` 方法的返回值相反。



[React-Hooks 初识 （五）： React性能优化手段 Memo 防止子组件不必要的reRender](https://juejin.cn/post/7077369439011749902)

> 注意：memo包裹子组件只能解决父组件没有传参给子组件的情况或者父组件传简单数据类型的参数给子组件的情况（例如 string、number、boolean等）

**memo已经包裹，但父组件传给子组件的参数是复杂数据类型，那么子组件仍会渲染**

这是因为，由于子组件接收了父组件的fValue，并且类型是个对象，每次父组件render时这个fValue都是新的，从而造成子组件在每次父组件render时props都会发生变化，也就重新进行渲染了。



**但是此时还有一个bug，如果在子组件Child上添加一个监听函数，无论修改m的值与否，都会执行Child组件，因此引出useMemo。**

### useMemo

https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo

```react
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 值。

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

**你可以把 `useMemo` 作为性能优化的手段，但不要把它当成语义上的保证。**将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 `useMemo` 的情况下也可以执行的代码 —— 之后再在你的代码中添加 `useMemo`，以达到优化性能的目的。



### useCallback

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



[详解 React useCallback & useMemo](https://juejin.cn/post/6844904101445124110)

事实上在使用中 useMemo 的场景远比 useCallback 要广泛的很多，我们可以将 useMemo 的返回值定义为返回一个函数这样就可以变通的实现了 useCallback。

简单理解呢 useCallback 与 useMemo 一个缓存的是函数，一个缓存的是函数的返回值。



[React-Hooks 初识 (六): ReactHooks性能优化手段--> useMemo、useCallback 的基本用法](https://juejin.cn/post/7079959655903936526)

(一定要注意一点，useMemo、useCallback做性能优化时子组件要用memo包裹，没有这个前提，useMemo、useCallback优化是没用的！）

memo、useMemo、useCallback：三者结合使用，可以有效的减少项目里组件的rerender，是React的一种性能优化手段。



[What's the difference between `useCallback` with an empty array as inputs and `useCallback` without a second parameter?](https://stackoverflow.com/questions/55026139/whats-the-difference-between-usecallback-with-an-empty-array-as-inputs-and-u)

对于 useMemo 和 useCallback （本质上只是 useMemo 的一种特殊情况），如果第二个参数是一个空数组，则该值将被记忆一次并始终返回。

如果省略第二个参数，则永远不会记住该值，并且 useCallback 和 useMemo 不会做任何事情。

也许在某些极端情况下，您可以有条件地记住：

```
useMemo(someValue, shouldMemoize ? [] : null)
```

但在绝大多数情况下，useMemo 和 useCallback 的第二个参数都应该被认为是强制性的。 事实上，Typescript 定义就是这样对待它们的。

```typescript
// Require a second argument, and it must be an array
function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
// Second argument can be undefined, but must be explicitly passed as undefined, not omitted.
function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
```

There's an [open pull request](https://github.com/facebook/react/pull/15025) that's enhancing the `exhaustive-deps` hooks eslint rule so that it will raise a lint error if the second argument is omitted, so pretty soon this will likely be a linter error.



I think it's the same logic behind all the hooks, `useEffect`, `useLayoutEffect`, `useCallback`, `useMemo`, for dependency array,if no dependencies passed means we passed the null value for dependencies, hence comparison would always result false and inline function will execute every time.

If empty dependencies are passed means there is nothing to compare further hence inline function will only execute once. (it is just like we are instructing React for no further comparison).

If the array are passed with some variable then it will compute the inline function based on the changes in the variable.

Though instance of the inline function will always created.
