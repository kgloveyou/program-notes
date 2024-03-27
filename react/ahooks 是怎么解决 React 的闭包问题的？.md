https://gpingfeng.github.io/ahooks-analysis/guide/blog/closure

https://www.cnblogs.com/gopal/p/16573868.html

## React 的[闭包](https://so.csdn.net/so/search?q=%E9%97%AD%E5%8C%85&spm=1001.2101.3001.7020)问题，举个例子

```javascript
import React, { useState, useEffect } from "react"; export default () => {  const [count, setCount] = useState(0);   useEffect(() => {    setInterval(() => {      console.log("setInterval:", count);    }, 1000);  }, []);   return (    <div>      count: {count}      <br />      <button onClick={() => setCount((val) => val + 1)}>增加 1</button>    </div>  );};
```

当我点击按钮的时候，发现 setInterval 中打印出来的值并没有发生变化，始终都是 0。这就是 React 的闭包问题。

## 解决的方法

解决方法一：给 [useEffect](https://so.csdn.net/so/search?q=useEffect&spm=1001.2101.3001.7020) 设置依赖项，重新执行函数，设置新的定时器，拿到最新值。

```javascript
useEffect(() => {  if (timer.current) {    clearInterval(timer.current);  }  timer.current = setInterval(() => {    console.log("setInterval:", count);  }, 1000);}, [count]);
```

解决方法二：使用 [useRef](https://so.csdn.net/so/search?q=useRef&spm=1001.2101.3001.7020)。 useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数

```javascript
const lastCount = useRef(count); useEffect(() => {  setInterval(() => {    console.log("setInterval:", lastCount.current);  }, 1000);}, []); return (  <div>    count: {count}    <br />    <button      onClick={() => {        setCount((val) => val + 1);        // +1        lastCount.current += 1;      }}    >      增加 1    </button>  </div>);
```

基于上述的第二种解决方案，在ahooks中的useLatest 这个 hook 随之诞生。它返回当前最新值的 Hook，可以避免闭包问题。实现原理很简单，只有短短的十行代码，就是使用 useRef 包一层

## useRef => useLatest

```javascript
import { useRef } from 'react'; // 通过 useRef，保持每次获取到的都是最新的值function useLatest<T>(value: T) {  const ref = useRef(value);  ref.current = value;   return ref;} export default useLatest;
```

## useEvent => useMemoizedFn

React 中另一个场景，是基于 useCallback 的。

```javascript
const [count, setCount] = useState(0); const callbackFn = useCallback(() => {  console.log(`Current count is ${count}`);}, []);
```

以上不管，我们的 count 的值变化成多少，执行 callbackFn 打印出来的 count 的值始终都是 0。这个是因为回调函数被 useCallback 缓存，形成闭包，从而形成闭包陷阱。我们想要解决这个问题的话，官方提出了 useEvent。它解决的问题：如何同时保持函数引用不变与访问到最新状态。使用它之后，上面的例子就变成了：

```javascript
const callbackFn = useEvent(() => {  console.log(`Current count is ${count}`);});
```

实际上，在 ahooks 中已经实现了类似的功能，那就是 useMemoizedFn。它是持久化 function 的 Hook，理论上，可以使用 useMemoizedFn 完全代替 useCallback。使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。以上的问题，通过以下的方式就能轻松解决：

```javascript
const memoizedFn = useMemoizedFn(() => {  console.log(`Current count is ${count}`);});
```

它的源码：

```javascript
function useMemoizedFn<T extends noop>(fn: T) {  // 通过 useRef 保持其引用地址不变，并且值能够保持值最新  const fnRef = useRef<T>(fn);  fnRef.current = useMemo(() => fn, [fn]);  // 通过 useRef 保持其引用地址不变，并且值能够保持值最新  const memoizedFn = useRef<PickFunction<T>>();  if (!memoizedFn.current) {    // 返回的持久化函数，调用该函数的时候，调用原始的函数    memoizedFn.current = function (this, ...args) {      return fnRef.current.apply(this, args);    };  }   return memoizedFn.current as T;}
```

## 总结：

React 自从引入 hooks，虽然解决了 class 组件的一些弊端，比如逻辑复用需要通过高阶组件层层嵌套等。但是也引入了一些问题，比如闭包问题。这个是 React 的 Function Component State 管理导致的，有时候会让开发者产生疑惑。开发者可以通过添加依赖或者使用 useRef 的方式进行避免。ahooks 也意识到了这个问题，通过 useLatest 保证获取到最新的值和 useMemoizedFn 持久化 function 的方式，避免类似的闭包陷阱。