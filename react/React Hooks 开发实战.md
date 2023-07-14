# React Hooks 开发实战

## 3.3 forwardRef

如果目标组件是一个自定义函数组件，那么它是没有实例的，此时用`ref`去传递会报错，因为它无法获取到实例。`forwardRef`就是用来解决这个问题的。

```jsx
import React, { useRef, useState, useEffect, forwardRef } from 'react';
import './App.css';

const Child = forwardRef((props, ref) => 
  return (
    <input
      placeholder={props.placeholder}
      type='text'
      ref={ref}
    />
  )
});

function App() {
  const ref = useRef(null)
  const [placeholder, setPlaceholder] = useState('请输入搜索内容')
  const onClick = () => {
    console.log("子组件的内容==>", ref.current.value)
  }
  useEffect(() => {
    ref.current.focus();
  }, [])

  return (
    <div className="App">
      <Child ref={ref} placeholder={placeholder} />
      <button onClick={onClick}>获取子组件内容</button>
    </div>
  );
}

export default App;
```

### 3.3.2 使用forwardRef时的注意事项

**1、ref必须指向DOM元素。**









## 3.7 useReducer

`useReducer` 可以同时更新多个状态，当状态更新逻辑较复杂时就可以考虑使用 `useReducer` 了。

## 4.8 中间件 redux-persist

redux-persist 支持使用 localStorage、sessionStorage、cookie 来完成数据持久化操作。

## 6.1 constate

​		constate 是一个基于 React Hooks 和 React Context 的轻量级状态管理库。它的主要功能是将自定义 Hooks 的执行结果传送到 Context 中，并利用 React Context 通信机制将结果提供给子组件消费使用，从而实现跨组件的状态共享。

```bash
yarn add constate
```

