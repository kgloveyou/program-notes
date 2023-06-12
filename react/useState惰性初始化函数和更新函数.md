小知识，大挑战！本文正在参与“[程序员必备小知识](https://juejin.cn/post/7008476801634680869 "https://juejin.cn/post/7008476801634680869")”创作活动。

## 背景

`useState`的基本用法

js

复制代码

    `const [state, setState] = useState(init)`

例子

js

复制代码

    `function Counter() {       const [count, setCount] = React.useState(() => 0)       const increment = () => setCount(previousCount => previousCount + 1)       return <button onClick={increment}>{count}</button>     }`

例子中的`useState`和更新函数`setCount`不同于直接使用固定值为初始化和更新后的值，而都是接收了一个函数，且以函数返回值分别作为`count`的初始值和更新后的值。两种方式在某些特定场景下，会有一定区别。

## 惰性初始化函数

例子：

javascript

复制代码

    `const initialState = Number(window.localStorage.getItem('count'))     const [count, setCount] = React.useState(initialState)`

当函数组件更新`re-render`时，函数组件内所有代码都会重新执行一遍。此时`initialState`的初始值是一个相对开销较大的`IO`操作。每次函数组件`re-render`时，第一行代码都会被执行一次，引起不必要的性能损耗。

js

复制代码

    `const initialState = () => Number(window.localStorage.getItem('count'))     const [count, setCount] = React.useState(initialState)`

当`initialState`以函数形式传入时，它只会在函数组件初始化的时候执行一次，函数`re-render`时不会再被执行。这个函数即惰性初始化函数这个特性，可以在这种场景下规避不必要的性能问题。

## 更新函数

例子：

js

复制代码

    `function DelayedCounter() {       const [count, setCount] = React.useState(0)       const increment = async () => {         await doSomethingAsync()         setCount(count + 1)       }       return <button onClick={increment}>{count}</button>     }`

假设`doSomethingAsync`这个异步函数执行需要`500ms`，连续快速三次点击按钮，会发现最终`count`值为`1`，而不是我们想要的最新值`3`。而在`increment`函数内部打印`console.log`可以发现，函数`increment`确实执行了三次，但是如果在`setCount`方法上方`console.log(count)`打印会发现`count`值一直是`0`。  
目前我理解的原因是函数组件在一次`re-render`完成之前，我们连续三次点击按钮，调用`increment`方法时，`setCount`所访问的`count`值一直是未更新的值`0`导致的。

js

复制代码

    `function DelayedCounter() {       const [count, setCount] = React.useState(0)       const increment = async () => {         await doSomethingAsync()         setCount(previousCount => previousCount + 1)       }       return <button onClick={increment}>{count}</button>     }`

这种场景解决方法也很简单，把`setCount`参数改为函数形式即可。原因是不同于直接取值`count`，函数默认参数`previousCount`为`count`更新后的最新值，所以可以确保每次点击按钮，`increment`访问的都是最新的`count`值

其中，

```js
function doSomethingAsync() {
  return new Promise((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
      const success = true; // 根据需要设置异步操作的成功或失败条件

      if (success) {
        resolve("操作成功"); // 异步操作成功时，调用resolve并传递结果
      } else {
        reject("操作失败"); // 异步操作失败时，调用reject并传递错误信息
      }
    }, 2000); // 模拟异步操作的延迟时间
  });
}
```



## 总结

-   惰性初始化函数在某些场景下可以规避性能问题，提升性能
-   更新函数默认参数可以确保每次访问的值是更新后的值

## 参考

[React-hooks](https://reactjs.org/docs/hooks-reference.html#usestate "https://reactjs.org/docs/hooks-reference.html#usestate")  
[useState lazy initialization and function updates](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates "https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates")