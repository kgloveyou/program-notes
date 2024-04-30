#### React报错#310复盘小结

-   -   [问题背景](#_1)
    -   [解决方案](#_8)
    -   [原理&学习](#_30)
    -   [引发错误情况](#_82)
    -   -   [1\. 不要在循环，条件或嵌套函数中调用 Hook](#1__Hook_84)
        -   [2\. 把所有的钩子移到组件的顶层，在任何可能返回值的条件之上。](#2__105)
    -   [3\. React函数组件或自定义钩子中只在调用Hook](#3_ReactHook_124)
    -   [总结](#_142)

### 问题背景

apm报错：**Minified React error #310**  
[https://reactjs.org/docs/error-decoder.html/?invariant=310](https://reactjs.org/docs/error-decoder.html/?invariant=310)  
![[图片]](https://img-blog.csdnimg.cn/cd24ac37d8c54d7d98ba883ea5f803cf.png)

当我们有条件地调用一个钩子或在所有钩子运行之前提前返回时，会产生"Rendered more [hooks](https://so.csdn.net/so/search?q=hooks&spm=1001.2101.3001.7020) than during the previous render"错误。

### 解决方案

```cpp
const App = () => {
    …………
+   const [loading, setLoading] = useState(false)
+   useEffect(函数1, [……])
    
    if (条件) {
      try {
        …………
      } catch {}
    }
   
-   const [loading, setLoading] = useState(false)
-   useEffect(函数1, [……])
    return (……)
}
123456789101112131415
```

if中 `catch {}` 阻塞了后续hook的渲染，为了解决该错误，将所有的钩子移到函数组件的顶层，以及不要在条件中使用钩子。

### 原理&学习

React 靠的是 **Hook 调用的顺序**。  
在正常的程序中，Hook 的调用顺序在每次渲染中都是相同的

```cpp
const App = () => {
    const [loading, setLoading] = useState(false)
    useEffect(函数1)
    const [test, setTest] = useState('name')
}
12345
```

```cpp
// 首次渲染
useState('false')            // 1. 使用 false 初始化变量名为 loading 的 state
useEffect(函数1)             // 2. 添加 effect 以保存 form 操作
useState('name')            // 3. 使用 'Poppins' 初始化变量名为 surname 的 state

// 二次渲染
useState('false')            // 1. 读取变量名为 loading 的 state（参数被忽略）
useEffect(函数1)             // 2. 替换保存 form 的 effect
useState('name')            // 3. 读取变量名为 surname 的 state（参数被忽略）
123456789
```

只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。

那如果在正常程序中插入一个if语句呢？如下：

```js
const App = () => {
    const [loading, setLoading] = useState(false)
    useEffect(函数1)
    if (条件) {
      return （）
    }
    const [test, setTest] = useState('name')
}
12345678
```

If条件的存在导致程序提前终止，不再执行下方语句（而下方又存在一些hook），导致两种渲染情况不一致：

```javascript
// 没进入到catch
useState('false')            // 1. 使用 false 初始化变量名为 loading 的 state
useEffect(函数1)             // 2. 添加 effect 以保存 form 操作
useState('name')            // 3. 使用 'Poppins' 初始化变量名为 surname 的 state

// 进入到catch中
useState('false')             // 1. 读取变量名为 loading 的 state（参数被忽略）
useEffect(函数1)              // 2. 替换保存 form 的 effect
//useState('name')           // 3. 此 Hook 被忽略！
123456789
```

### 引发错误情况

[https://zh-hans.reactjs.org/docs/hooks-rules.html](https://zh-hans.reactjs.org/docs/hooks-rules.html)

#### 1\. 不要在循环，条件或嵌套函数中调用 Hook

```javascript
export default function App() {
  const [counter, setCounter] = useState(0);
-  if (counter > 0) {
-    useEffect(() => {
-      console.log(counter);
-    });
-  }
// 将if条件语句移到useEffect钩子内部
+  useEffect(() => {
+    if (counter > 0) {
+      console.log(counter);
+    }
+  });
  return (
    ……
}
12345678910111213141516
```

#### 2\. 把所有的钩子移到组件的顶层，在任何可能返回值的条件之上。

```javascript
export default function App() {
  const [counter, setCounter] = useState(0);
+ const [color, setColor] = useState('salmon');

  if (counter > 0) {
    return <h2>Returning early</h2>;
  }
  // Error: 该hook在counter<=0条件时，才被调用
- const [color, setColor] = useState('salmon');
  
  return (
    <div><button onClick={() => setCounter(counter + 1)}>toggle loading</button><h1>Hello world</h1></div>
  );
}
1234567891011121314
```

### 3\. React函数组件或自定义钩子中只在调用Hook

```javascript
// 在普通函数中不要使用hook
const AppContent = () => {
  const [counter, setCounter] = useState(0);

  return (
    …………
  );
}
export const App = {
  dataIndex: 'app',
- render: AppContent,
+ render: () => <AppContent />
}
12345678910111213
```

### 总结

-   只从React函数组件或自定义钩子中调用Hook
-   只在最顶层使用 Hook
-   不要在循环，条件或嵌套函数中调用 Hook
-   确保总是在你的 React 函数的最顶层以及任何 return 之前使用 Hook

这有助于React在多个`useState`和`useEffect`调用之间保留钩子的状态。

### 原文

https://blog.csdn.net/qq_29493173/article/details/128874386