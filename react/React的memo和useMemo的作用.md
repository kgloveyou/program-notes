# React的memo和useMemo的作用

https://gitee.com/kg_loveyou/memo-usememo



**要想学习useMemo必须要先知道React.memo**

这两者都有一定的优化作用

# memo的作用

当数据变化时，代码会重新执行一遍，但是**子组件数据没有变化也会执行**，这个时候可以使用`memo`将子组件封装起来，让子组件的数据只在发生改变时才会执行

## 案例

点击按钮改变n的值，m不变，验证程序会不会执行m的代码

### 不使用memo的情况

只改变n的值时，虽然说m的值没变，但是也执行了Child的打印语句

```jsx
function App(){
  const [n,setN] = useState(0);
  const [m,setM] = useState(0);
  
  const add=()=>{
    setN(i=>i+1);
  };
  const addChild=()=>{
    setM(i=>i+1);
  };
  
  return(
    <div>
      <div>
        n:{n}
        <button onClick={add}>n+1</button>
        <button onClick={addChild}>m+1</button>
      </div>
      <Child data={m} />
    </div>
  )
}
function Child(props){
  console.log('child执行了')
  return(
    <div>
      child:{props.data}
    </div>
      )
}
ReactDOM.render(<App />,document.getElementById('root'));
```

### 使用memo进行封装

将Child用memo封装一下，就可以使m不变就不执行Child，这个时候只要m的值不变，就不会执行Child组件

使用React.memo封装，会返回一个新的组件，调用新组件

```jsx
function Child(props){
  console.log('child执行了')
  return(
    <div>
      child:{props.data}
    </div>
      )
}
// 封装child
const Child2 = React.memo(Child)
ReactDOM.render(<App />,document.getElementById('root'));
```

**但是此时还有一个bug，如果在子组件Child上添加一个监听函数，无论修改m的值与否，都会执行Child组件**

```jsx
function App(){
  const [n,setN] = useState(0);
  const [m,setM] = useState(0);
  const add=()=>{
    setN(i=>i+1);
  };
  const addChild=()=>{
    setM(i=>i+1);
  };
+  const onClickChild=()=>{  };

  return(
    <div>
      <div>
        n:{n}
        <button onClick={add}>n+1</button>
        <button onClick={addChild}>m+1</button>
      </div>
+      <Child2 data={m} onClick={onClickChild} />
    </div>
  )
}
function Child(props){
  console.log('child执行了')
  console.log('这里有很多代码')
  return(
+    <div onClick={props.onClick}>
      child:{props.data}
    </div>
      )
}
const Child2 = React.memo(Child)
```

当点击n时，就会重新执行App代码，`onClickChild`空函数的地址会发生改变，所以说此时还是会执行Child的

**而useMemo正是解决这个问题的**

# useMemo的作用

解决因函数更新而渲染自己的问题，就可以使用useMemo,使用它将函数重新封装

`const onClickChild=useMemo(fn,array)`监听变量，第一个参数是函数，第二个参数是依赖，只有依赖变化时才会重新计算函数

```jsx
import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom'

//其他的代码不变，只需要重写m的点击函数

  //使用useMemo重新写监听函数，当m变化时才会执行此代码
  const onClickChild=useMemo(()=>{
    return ()=>{
      console.log(m)
    }
  },[m])
```

也可以把useMemo替换成useCallback,使用useCallback就不用写return函数了

```jsx
const onClickChild=useMemo(()=>{
    return ()=>{
      console.log(m)
    }
  },[m])
 //等价于
 const onClickChild=useCallback(()=>{
      console.log(m)
  },[m])
```

### 注意：

- 如果你的value是个函数，那么你就要写成`useMemo(()=>(x)=> console.log(x))`
- 这是一个返回函数的函数,比较复杂；于是就有了`useCallback`，你可以使用`useCallback`


作者：oldUath
链接：https://juejin.cn/post/6897038904914870286
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。