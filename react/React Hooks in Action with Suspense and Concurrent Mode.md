# 1 React 正在发展



# 2 使用 useState hook管理组件状态

### 2.2.4 Passing a function to useState as the initial value

the `useState` hook accepts a function as its argument, `a lazy initial state,`  

```js
const [ selected, setSelected ] = useState(
	() => { return "Lecture Hall"; }
);
```

Figure 2.16 You can pass a function to useState as the initial value. React will use the function’s return value as the initial value.  

React executes the function only the first time the component is rendered. It uses the function’s return value as the initial state:  

```js
function ShinyString ({tangledWeb}) {
    const [shiny, setShiny] = useState(() => untangle(tangledWeb));
    // use shiny value and allow new shiny values to be set
}
```

Use the lazy initial state if you need to undertake expensive work to generate an initial value for a piece of state.  

### 2.2.5 Using the previous state when setting the new state  

When we want to update a state value based on its previous value, as in our Next button example, instead of passing the updater function a value to set, we can pass it a function. React will pass that function the current state value and will use the return
value of that function as the new state value.   

```jsx
setBookableIndex( oldValue => oldValue + 1 );  
```

### 2.3.2 Using a check box to set state  

P56

## Summary  

- If you need to perform an expensive calculation to generate the initial state, pass it to `useState` in a function. React will run the function to get this `lazy initial state` only when it first calls the component:  

```js
const [value, setValue] = useState(() => { return initialState; });  
```

- To be sure you’re working with the latest state value when calling the updater function and setting a new value based on the old one, pass the updater function a function as its argument. React will assign the latest state value to the function argument:  

```js
setValue(value => { return newValue; });

setValue(state => {
    return {
    ...state,
    property: newValue
    };
});
```

# 3 使用useReducer hook管理组件状态

## 3.1 Updating multiple state values in response to a single event  

React gives us the `useReducer` hook to help us manage this collocation of state update logic, and we look at that hook next.  

## 3.2 Managing more complicated state with useReducer  

### 3.2.1 Updating state using a reducer with a predefined set of actions  

### 3.2.3 Accessing component state and dispatching actions with useReducer  

```js
const [ state, dispatch ] = useReducer( reducer, initialState );
```

## 3.3 Generating the initial state with a functio  

```js
const [state, dispatch] = useReducer(reducer, initArgument, initFunction);
```

The initialization function uses the initialization argument to generate the initial state  

### 3.3.2 Creating utility functions to work with dates and weeks  

### 3.3.3 Building the reducer to manage dates for the component  

## 3.4 Reviewing some useReducer concepts  

# 4、Working with side effects  

​		以某种方式影响外部世界的行为称为`side effect`。side effect  包括如下：

- 强制设置页面标题

- Working with timers like `setInterval` or `setTimeout`  

- Measuring the width, height, or position of elements in the DOM  

- Logging messages to the console or other service  

- Setting or getting values in local storage  

- Fetching data or subscribing and unsubscribing to services  


React 提供了 useEffect 钩子，以便我们可以更好地控制副作用并将它们集成到我们组件的生命周期中。

The `useEffect` hook is our gateway to safe interactions with the outside world.  

## 4.1 Exploring the useEffect API with simple examples

在本节中，我们着眼于以不会失控的方式设置副作用。 特别是，我们探讨了以下四种情况：

- 每次渲染后运行 side effects  
- 仅在组件挂载时运行 effect
- 通过返回一个函数来清理 side effects  
- 通过指定依赖项来控制 effect 何时运行

### 4.1.1 Running side effects after every render    

​		The document title isn’t part of the document body and isn’t rendered by React.  But the title is accessible via the `document` property of the window. You can set the title like this:  

```js
document.title = "Bonjour";  
```

​		以这种方式访问浏览器 API 被认为是一种副作用。 我们可以通过将代码包装在 `useEffect` hook 中来明确这一点：

```jsx
  useEffect(() => {
    document.title = greetings[index];
  });
```

### 4.1.2 仅在组件挂载时运行 effect

```js
  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }

    window.addEventListener("resize", handleResize);
  }, []);
```

 Effect function: We want to run this function only once, when the component mounts.  

### 4.1.3 Cleaning up side effects by returning a function  

We have to be careful not to make a mess when we set up long-running side effects like **subscriptions, data requests, timers, and event listeners.**   

```js
useEffect( () => {
    // perform a side effect
    return function () { /* clean up side effect */ };
}, [ ] );
```

**Cleanup function: Return a function to clean up  after the effect (e.g., unsubscribe,  stop timers, remove listeners, etc.).**  

​		React runs the cleanup function when it unmounts the component. But that’s not the only time it runs it. Whenever the component re-renders, React calls the cleanup function before running the effect function, **if the effect runs again**. If multiple effects need to run again, React calls all of the cleanup functions for those effects. Once the cleanup is finished, React reruns the effect functions as needed.  

​		React 在卸载组件时会运行清理功能。 但这不是它唯一一次运行它。 每当组件重新渲染时，如果effect 再次运行，React 会在运行effect 函数之前调用清理函数。 如果多个 effect 需要再次运行，React 会为这些 effect 调用所有清理函数。 清理完成后，React 会根据需要重新运行 effect 函数。

​		我们已经看到了两个极端：只运行一次 effect 和每次渲染后运行一个 effect 。 如果我们想要更多地控制 effect 何时运行怎么办？ 还有一个案例需要说明。 让我们填充那个依赖数组。

### 4.1.4 Controlling when an effect runs by specifying dependencies  

```jsx
useEffect( () => {
    // do something with dep1 and dep2
    return () => { /* clean up */ };
}, [dep1, dep2] );
```

**Cleanup function: Remove listeners, unsubscribe, etc.**  

### 4.1.5 Summarizing the ways to call the useEffect hook  

| Call pattern                        | Code pattern                                                 | Execution pattern                                            |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 没有第二个参数                      | `useEffect(() => { // perform effect });`                    | Run after every render.                                      |
| 空数组作为第二个参数                | `useEffect(() => { // perform effect }, []);`                | Run once, when the compo nent mounts.                        |
| Dependency array as second argument | `useEffect(() => { // perform effect // that uses dep1 and dep2 }, [dep1, dep2]);` | Run whenever a value in the dependency array changes.        |
| Return a function                   | `useEffect(() => { // perform effect return () => {/* clean-up */}; }, [dep1, dep2]);` | React will run the cleanup function when the component unmounts and before rerunning the effect. |

### 4.1.6 Calling useLayoutEffect to run an effect before the browser repaints  

​		Making changes in `useEffect` will show users an intermediate state that’ll immediately be updated.  

​		We can avoid such flashes of changing state by calling the `useLayoutEffect` hook instead of `useEffect`.   This hook has the same API as `useEffect` but runs synchronously after React updates the DOM and before the browser repaints.   If the effect makes further updates to the state, the intermediate state isn’t painted to the screen.  

​		You generally won’t need `useLayoutEffect`, but if you come across problems (maybe with an element flickering between states), you could try switching from `useEffect` for the suspect effect.  

## 4.2 获取数据

使用`json-server` 包安装JSON server  

### 4.2.1 创建新的db.json文件

​		In later chapters, we’ll start updating the database file by sending POST and PUT requests. The `create-react-app` development server restarts whenever files within the src folder change. Having the db.json file outside src avoids unnecessary restarts as we test adding new bookables and making bookings.  

### 4.2.2 设置 JSON 服务器

`json-server` 包是提供 JSON 数据作为模拟 REST API 的一种非常方便、简单的方法。

全局安装

```shell
npm install -g json-server  
```

在本项目的根路径，启动服务器

```sh
json-server --watch db.json --port 3001  
```

此时便可以通过`localhost:3001`  查询数据。

### 4.2.3 使用useEffect存取数据

延迟响应

```sh
json-server --watch db.json --port 3001 --delay 3000  
```

### 4.2.4 Working with async and await  （※）

```jsx
useEffect(async () => {
    const resp = await fetch("http://localhost:3001/users");
    const data = await (resp.json());
    setUsers(data);
}, []);
```

上面的代码会在控制台报警告信息。

- Effect callbacks are synchronous to prevent race conditions. Put the async function inside.  

  

`async` functions return a promise by default. Setting the effect function as `async` will cause trouble because React is looking for the return value of an effect to be a cleanup function. To solve the issues, remember to put the `async` function inside the effect function, rather than making the effect function `async` itself:  

```js
useEffect(() => {
    async function getUsers() {
        const resp = await fetch(url);
        const data = await (resp.json());
        setUsers(data);
    }
    getUsers();
}, []);
```

## 概述

- Return a cleanup function from the effect that React will run before rerunning the effect function and when the component unmounts:  

  ```jsx
  useEffect(() => {
      // perform effect
      return () => {/* clean-up */};
  }, [dep1, dep2]);
  ```

  

- If, on re-render, multiple effects are going to run, React will call all of the cleanup functions for the rerunning effects before it runs any effects themselves.  



# 5 使用useRef hook管理组件状态

本章涵盖
- 调用 `useRef` hook 获取 ref
- 通过将值分配给其 `current` 属性来更新 ref
- 在不触发重新渲染的情况下更新状态
- 在 JSX 中设置 ref 属性以将 DOM 元素引用分配给 ref
- 通过 ref 访问 DOM 元素的属性和方法

## 5.1 Updating state without causing a re-render  

With the `useState` hook, calling a state value’s updater function usually triggers a re-render. 

With the `useRef` hook, we can update our value without a corresponding change to the UI.   

### 5.1.1 Comparing useState and useRef when updating state values  

`useState`  

React persists the state across renders, each time passing it back to the component,where it is assigned to the `count` variable.  

`useRef`  

The hook returns an object, a `ref`, which we use to store the state value. **Changing the value stored on the ref doesn’t trigger a re-render.** React persists the state across renders, each time passing the same ref object back to the component, where it is assigned to the `ref` variable.  

### 5.1.2 调用 useRef  

Every time React runs the component code, each call to `useRef` will return the same ref object for that call.  

```js
const refObject = useRef( initialValue );  
```

`useRef` returns an object with a current property.  

```jsx
ref1.current = "Babel Fish";
ref2.current = "1,000,000,000,000";  
```

**Assigning new values to the `current` properties of the ref objects doesn’t trigger a rerender**. **But as React always returns the same ref objects, the new values are available when the component runs again.**  

## 5.2 Storing timer IDs with a ref  

```js
const timerRef = useRef(null);
...
useEffect(() => {
    timerRef.current = setInterval(() => {
        dispatch({ type: "NEXT_BOOKABLE" });
        }, 3000);
    return stopPresentation;
}, []);
...
function stopPresentation () {
	clearInterval(timerRef.current);
}
```

## 5.3 保持对 DOM 元素的引用 

​		这种对 DOM 元素的引用让我们可以直接与元素交互，绕过通常的 React 状态到 UI 流程。 特别是，我们看看两个常见的用例：

- 将焦点设置在元素上以响应事件
- 读取非受控的文本框的值

### 5.3.1 Setting focus on an element in response to an event  

```jsx
const nextButtonRef = useRef();
...

<button
    className="btn"
    onClick={nextBookable}
    ref={nextButtonRef}
    autoFocus
>
</button>

...
nextButtonRef.current.focus();
```

#### 非受控组件

Components that let the DOM manage their state in this way are called `uncontrolled components`.  

让 DOM 以这种方式管理其状态的组件称为“非受控组件”。

#### 受控组件

With controlled components, the data flow is from the component to the DOM, in line with the standard React approach.  

使用受控组件，数据流是从组件到 DOM，符合标准的 React 方法。

## 概述

- 当你希望 React 管理状态值但不希望更改值触发重新渲染时，调用 `useRef` hook。例如，使用它来存储 `setTimeout` 和 `setInterval` 的 ID 或对 DOM 元素的引用。如果需要，你可以传递一个初始值。 它返回一个`current`属性设置为初始值的对象：

```jsx
const ref = useRef(initialValue);
ref.current; // initialValue
```

- A call to `useRef` will return the same ref object each time the component runs. Persist values in the ref across renders by assigning them to the ref’s `current` property:  

```jsx
ref.current = valueToStore;  
```

admagic中标注页面scenario刷新后改变的问题，是不是可以采用？

- React can automatically assign DOM element references to your ref’s `current` property. Assign your ref variable to an element’s `ref` attribute in JSX:  

```jsx
const myRef = useRef();
...
return (
	<button ref={myRef}>Click Me!</button>
);
...
myRef.current;
```

- Use the ref to interact with the DOM element. For example, set focus on the element:  

```jsx
myRef.current.focus();
```

- Components that read their state from the DOM are called `uncontrolled components`. You can use refs to access and update the state.  

- React recommends you use `controlled components.` 使用 `useState` 钩子或 `useReducer` 钩子来管理状态并让 React 使用最新的状态值更新 DOM。 你的组件将成为唯一的事实来源，而不是在组件和 DOM 之间分割状态。

# 6 管理应用状态

## 6.1 将共享状态传递给子组件

### 6.1.2 Receiving state from a parent as a prop  

  The code here destructures the props, assigning  the color prop to a local variable of the same name.  

```jsx
import React from "react";

export default function ColorChoiceText({ color }) {
  return color ? (
    <p>The selected color is {color}!</p>
  ) : (
    <p>No color has been selected!</p>
  );
}

```

### 6.1.3 Receiving an updater function from a parent as a prop  

## 6.2 Breaking components into smaller pieces  

### 6.2.1 Seeing components as part of a bigger app  

### 6.2.2 Organizing multiple components within a page’s UI  

## 6.3 Sharing the state and dispatch function from useReducer  

### 6.3.1 Managing state in the BookablesView component  

### 6.3.3 Receiving state and dispatch in the BookablesList component  

## 6.4 从 useState 共享状态值和更新函数

### 6.4.1 Managing the selected bookable in the BookablesView component  

### 6.4.2 Receiving the bookable and updater function in BookablesList  

*optional chaining operator*, ?., a recent addition to JavaScript:  

If no bookable is selected, the expression *bookable?.group* returns *undefined*.   It saves us from checking whether the bookable exists before accessing the `group` property:  

```jsx
const group = bookable && bookable.group;  
```

**EFFECT**  

```jsx
useEffect(() => {
    getData("http://localhost:3001/bookables")

        .then(bookables => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
    })

        .catch(error => {
        setError(error);
        setIsLoading(false);
    });
}, [setBookable]);
```

React doesn’t trust functions passed in as props to be the same on each render. In this version,  `BookingsView` passes in the `setBookable` function as a prop, so we include it in the dependency array for the first effect.   

**HANDLER FUNCTIONS**  

**UI**  

## 6.5 将函数传递给 useCallback 以避免重新定义它们  

If the functions are updater or dispatch functions from `useState` or `useReducer`, React guarantees that their identity will be stable. But for functions we define ourselves, the very nature of components as functions that React calls means our functions will be defined on every render.   In this section, we explore the problems such redefining can cause and look at a new hook, `useCallback`, that can help solve such problems.  

如果函数是来自 `useState` 或 `useReducer` 的 updater 或 dispatch 函数，React 保证它们的身份将是稳定的。 但是对于我们自己定义的函数，组件作为 React 调用的函数的本质意味着我们的函数将在每次渲染时定义。 在本节中，我们将探讨此类重新定义可能导致的问题，并查看一个新的钩子 `useCallback`，它可以帮助解决此类问题。

### 6.5.1 Depending on functions we pass in as props 

在上一节中，所选 bookable 的状态由 `BookablesView` 组件管理。它将 bookable 及其更新函数 `setBookable` 传递给 `BookablesList`。`BookablesList` calls `setBookable` whenever a user choses a bookable and also within the effect wrapping the data-fetching code, shown here without the `catch` block:  

src\components\Bookables\BookablesView.js

```jsx
export default function BookablesView () {
  const [bookable, setBookable] = useState();

  return (
    <Fragment>
      <BookablesList bookable={bookable} setBookable={setBookable}/>
      <BookableDetails bookable={bookable}/>
    </Fragment>
  );
}
```

src\components\Bookables\BookablesList.js

```jsx
export default function BookablesList ({bookable, setBookable}) {
...
  useEffect(() => {
    getData("http://localhost:3001/bookables")

      .then(bookables => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })

      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);
...    
}    
```

 当前情况下，`setBookable`不会变，所以上述`useEffect`只会调用一次。

考虑另外一种情况：

src\components\Bookables\BookablesView.js

```jsx
export default function BookablesView() {
  const [bookable, setBookable] = useState();
  function updateBookable(selected) {
    if (selected) {
      selected.lastShown = Date.now();
      setBookable(selected);
    }
  }
  return (
    <Fragment>
      <BookablesList bookable={bookable} setBookable={updateBookable} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
}
```

上述`useEffect`会不断被调用。

父组件 BookablesView 管理所选 bookable 的状态。每当 BookablesList 加载 bookables 数据并设置 bookable 时，BookablesView 重新渲染； React 再次运行它的代码，再次定义 updateBookable 函数并将新版本的函数传递给 BookablesList。 BookablesList 中的 useEffect 调用看到 setBookable 属性是一个新函数并再次运行效果，重新获取可预订数据并再次设置可预订，重新启动循环。 我们需要一种方法来维护我们的更新函数的身份，这样它就不会随着渲染而改变。

### 6.5.2 Maintaining function identity with the useCallback hook  

When we want to use the same function from render to render but don’t want it to be redefined each time, we can pass the function to the `useCallback` hook. React will return the same function from the hook on every render, redefining it only if one of the function’s dependencies changes. Use the hook like this:  

当我们想在每次渲染中使用相同的函数但不希望每次都重新定义它时，我们可以将该函数传递给 `useCallback` hook。 React 将在每次渲染时从 hook 返回相同的函数，仅当函数的依赖项之一发生更改时才重新定义它。 像这样使用钩子：

```jsx
const stableFunction = useCallback(funtionToCache, dependencyList);
```

The function that `useCallback` returns is stable while the values in the dependency list don’t change. When the dependencies change, React redefines, caches, and returns the function using the new dependency values.  	

```jsx
export default function BookablesView() {
  const [bookable, setBookable] = useState();

  const updateBookable = useCallback(selected => {
    if (selected) {
      selected.lastShown = Date.now();
      setBookable(selected);
    }
  }, []);

  return (
    <Fragment>
      <BookablesList bookable={bookable} setBookable={updateBookable} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
}
```

在 `useCallback` 中包装我们的 updater 函数意味着 React 将在每次渲染时返回相同的函数，除非依赖项改变了值。 但是我们使用了一个空的依赖列表，所以值永远不会改变，React 总是会返回完全相同的函数。 `BookablesList` 中的 `useEffect` 调用现在将看到它的 `setBookable` 依赖是稳定的，并且它将停止无休止地重新获取可预订数据。

`useCallback` lets us memoize functions. To prevent the redefinition or recalculation of values more generally, React also provides the `useMemo` hook, and we’ll look at that in the next chapter.  

## 概述

- Destructure the props parameter, assigning properties to local variables:  

```jsx
export default function ColorPicker({colors = [], color, setColor}) {
    return (
    // UI that uses colors, color and setColor
    );
}
```

- Maintain the identity of functions across renders by wrapping them in calls to the `useCallback` hook. React will redefine the function only when the dependencies change:  

```jsx
const stableFunction = useCallback(functionToCache, dependencyList);
```

# 7、使用 useMemo 管理性能

- 使用 useMemo hook避免重新运行昂贵的计算

- 使用依赖数组控制 useMemo
- 应用程序重新渲染时考虑用户体验
- 获取数据时处理竞争条件
- Using JavaScript’s optional chaining syntax with square brackets  

React 提供了 `useMemo` 钩子来帮助我们避免不必要和浪费的工作。

## 7.1 Breaking the cook’s heart by calling, “O, shortcake!”  

### 7.1.1 使用昂贵的算法生成字谜  

### 7.1.2 避免多余的函数调用

```jsx
  const anagrams = useMemo(() => getAnagrams(sourceText), [sourceText]);
  const distinct = useMemo(() => getDistinct(anagrams), [anagrams]);
```

In this version, React should call `getAnagrams` only when `sourceText` changes, and should call `getDistinct` only when `anagrams` changes.   

## 7.2 Memoizing expensive function calls with useMemo  

```jsx
const memoizedValue = useMemo( () => expensiveFn(a, b), [a, b] );
```

To reiterate, `useMemo` *may* return the stored value. React reserves the right to clear its store if it needs to free up memory. So, it might call the expensive function even if the dependencies are unchanged.  

重申一下，`useMemo` 可能会返回存储的值。 如果需要释放内存，React 保留清除其存储的权利。 因此，即使依赖项没有改变，它也可能调用昂贵的函数。

## 7.3 Organizing the components on the Bookings page  

### 7.3.2 Managing the selected week and booking with useReducer and useState  

## 7.4 Efficiently building the bookings grid with useMemo  

### 7.4.5 Coping with racing responses when fetching data in useEffect  

在 useEffect 中获取数据时应对竞争性的响应。

我们可以尝试实现一种方法来取消正在进行的请求。

Before rerunning an effect, React calls any associated cleanup function for the previous invocation of the effect.   

```jsx
return () => doUpdate = false;
```

## 概述

- Pass `useMemo` the expensive function you want to memoize:  

  ```jsx
  const value = useMemo(
      () => expensiveFn(dep1, dep2),
      [dep1, dep2]
  );
  ```

  

- If the values in the dependency array don’t change from one call to the next, `useMemo` can return its stored result for the expensive function.  

- Don’t rely on `useMemo` to always use a memoized value. React may discard stored results if it needs to free up memory.  

- When fetching data within a call to useEffect, combine a local variable and the cleanup function to match a data request with its response:  

```jsx
useEffect(() => {
    let doUpdate = true;
    fetch(url).then(resp => {
        if (doUpdate) {
        // perform update with resp
        }
    });
    return () => doUpdate = false;
}, [url]);
```

If the component re-renders with a new `url`, the cleanup function for the previous render will set the previous render’s `doUpdate` variable to `false`, preventing the previous `then` method callback from performing updates with stale data.  

# 8、使用 Context API 管理状态

本章涵盖
 通过 Context API 及其 `Provider` 组件提供状态
 使用 useContext 钩子消费 context 状态
 在更新状态值时避免不必要的重新渲染
 创建自定义 context providers
 在多个contexts 中拆分共享状态

​		但是，嵌套在多个分支上的许多组件渴望相同的多汁蠕虫、相同的应用程序状态花絮，例如主题、本地化信息或经过身份验证的用户详细信息，这种情况并不少见。 嗯嗯，花絮。 . . React 的 Context API 是一种将多汁的状态花絮直接传递到你的巢穴的方法，而无需通过多层中间人传递它们，这些中间人更喜欢炸玉米饼而不是花絮，对它们不感兴趣。

## 8.1 需要来自组件树更高层的状态

### 8.1.1 在页面首次加载时显示号召性用语消息

### 8.1.2 访客选择预订时显示预订信息

### 8.1.3 显示用户预订的编辑按钮：问题

### 8.1.4 显示用户预订的编辑按钮：解决方案

1、src\components\Users\UserContext.js

```js
import {createContext} from "react";

const UserContext = createContext();

export default UserContext;
```

2、src\components\App.js

```js
...
import UserContext from "./Users/UserContext";

export default function App () {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className="App">
		...
          <Routes>
            <Route path="/bookings" element={<BookingsPage/>}/>
            <Route path="/bookables" element={<BookablesPage/>}/>
            <Route path="/users" element={<UsersPage/>}/>
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>

  );
```

The `App` component imports the `UserContext` object and then wraps the UI in the context’s `Provider` component, making the `user` state value available to all components in the tree:  

```jsx
<UserContext.Provider value={user}>
// all app UI
</UserContext.Provider>
```

The provider  不必包装整个组件树。 正如代码所示，app 将 `user` 和 `setUser` 作为 props 传递给 `UserPicker` 组件，我们可以只将 routes 包装在 the provider 中：

```jsx
<Router>
    <div className="App">
        <header>
        // nav and user picker
        </header>
        <UserContext.Provider value={user}>
            <Routes>
            // routes
            </Routes>
        </UserContext.Provider>
    </div>
</Router>
```

3、src\components\Bookings\BookingDetails.js

```js
import {useContext} from "react";

import UserContext from "../Users/UserContext";

export default function BookingDetails ({booking, bookable}) {

  const user = useContext(UserContext);

  ...
}
```

​	React 的 Context API 非常适合在预订应用程序中共享选定的用户。但它提出了几个问题：如果我们有不止一个 value 要分享怎么办？ 或者是一个具有许多属性的更复杂的值？ 并且我们可以避免在调用 setUser 时触发整个组件树的重新渲染吗？ 在寻找这些问题的答案时，让我们更深入地研究一下 React 渲染的细微差别。

## 8.2 使用自定义的 providers 和多个 contexts  

​		在本节中，我们将研究扩展 context  使用的四种方法。 第一个，使用对象作为值，可能会导致问题。 第二个和第三个，使用自定义providers和多个contexts  ，可以帮助我们解决这些问题。 最后一种方法让我们为我们的context  指定一个默认值。

### 8.2.1 Setting an object as the context provider’s value  

```jsx
<UserContext.Provider value={{user, setUser}}>
// app JSX
</UserContext.Provider/>
```

`BookingDetails` 组件中消费：

```jsx
const {user} = useContext(UserContext);
```

`UsersPage` 组件中消费：

```jsx
const {user : loggedInUser} = useContext(UserContext);
```

`UserPicker` 组件中消费：

```jsx
const {user, setUser} = useContext(UserContext);
```

### 8.2.2 Moving the state to a custom provider  

Because `App` re-renders, `all of its children` rerender,   

​		重新渲染本质上并不是坏事——我们关注状态，React 调用组件，进行差异化，并对 DOM 进行处理——如果你的应用程序运行良好，则无需使代码复杂化。 但是，如果树中出现速度较慢、涉及更多的组件，你可能希望避免不会更改 UI 的重新渲染。我们想要一种更新the context provider value  的方法，而不会在组件树的整个过程中引发一连串的更新。 我们希望context消费者（调用 useContext 的组件）重新渲染以响应provider上的值变化，而不仅仅是因为整个树都在重新渲染。 我们可以避免更新 App 组件中的状态吗？

​		回答这个问题需要对 React 的渲染行为有很好的理解。 我们将在以下四个小节中讨论这些概念以及如何应用它们：

 创建自定义的 provider
 Using the `children` prop to render wrapped components
 避免不必要的重新渲染
 使用自定义的 provider

**CREATING A CUSTOM PROVIDER**  

src\components\Users\UserContext.js

```jsx
import {createContext, useState} from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider ({children}) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

```

**USING THE CHILDREN PROP TO RENDER WRAPPED COMPONENTS**  

每当一个组件包装其他组件时，React 都会将 wrapped components  分配给 wrapper  的 `children` 属性。

```jsx
<Wrapper>
	<MyComponent/>
</Wrapper>
```

```jsx
function Wrapper ({children}) {
	return <div className="wrapped">{children}</div>
}
```

When returning its UI, `Wrapper` uses the components React has assigned to `children`.
The UI becomes the following:  

```jsx
<div className="wrapped"><MyComponent/></div>
```

**AVOIDING UNNECESSARY RE-RENDERS**  （※）

当后代（例如用户选择器）调用 `setUser` 来更新 `UserProvider` 组件中的`user`状态值时，React 会注意到状态已更改并重新渲染管理该状态的组件 `UserProvider`。 但是对于 `UserProvider`，它的所有子节点都不会重新渲染，如图 8.10 所示。

**Figure 8.10 When `UserProvider` re-renders, only the context consumers, not the whole tree, re-render.**  

​		这可能出乎意料，但这是标准的 React 渲染行为； 这里没有应用特殊的memoizing function。 当 App 管理用户状态时，是什么让 `UserProvider` 的行为与我们的 `App` 组件不同？ 是什么阻止了 React 渲染 the provider’s children？

​		It’s because `UserProvider` accesses its children as a prop, and updating the state `within` the component doesn’t change its props. The identity of `children` doesn’t change when a descendant calls `setUser`. It’s exactly the same object as it was before.There’s no need to re-render all the children, so React doesn’t.  

​		除了context consumers！ context 的closest provider的值发生变化时，Context consumers总是重新渲染。我们的自定义provider 为其消费者提供updater function。 当组件调用 updater 函数时，自定义provider 会重新渲染，更新其context值。 React 知道provider的孩子没有改变，所以不会重新渲染它们。 但是，任何使用context的组件都会重新渲染以响应provider上的值变化，不是因为整个组件树都重新渲染了。



**使用自定义 PROVIDER**  

src\components\App.js

```jsx
import {UserProvider} from "./Users/UserContext";

export default function App () {
  return (
    <UserProvider>
      <Router>
        <div className="App">
		...
          <Routes>
            <Route path="/bookings" element={<BookingsPage/>}/>
            <Route path="/bookables" element={<BookablesPage/>}/>
            <Route path="/users" element={<UsersPage/>}/>
          </Routes>
        </div>
      </Router>
    </UserProvider>

  );
}
```



### 8.2.3 Working with multiple contexts

​		如果你发现你确实有不经常改变的状态并且被应用程序中不同级别的许多组件使用，那么 Context API 听起来很合适。 但即便如此，由 context 提供的单个状态对象可能效率低下。假设你的context state value 如下所示：  

```jsx
value = {
  theme: "lava",
  user: 1,
  language: "en",
  animal: "Red Panda"
};

<MyContext.Provider value={value}><App/></MyContext.Provider>
```

​		在你的组件层次结构中，一些组件使用主题，一些使用用户，另一些使用语言，还有一些使用动物。 问题是，如果单个属性值发生变化（比如主题从 *lava* 变为 *cute*），*所有*使用 context 的组件都将**重新渲染**，即使它们对更改的值不感兴趣。

**SPLITTING THE CONTEXT VALUES ACROSS MULTIPLE PROVIDERS**  

​		你可以根据需要使用尽可能多的 contexts，并且嵌套组件可以仅在它们使用的context 上调用 `useContext` hook。 如果每个共享值都有自己的，则 providers 看起来如下：

```jsx
<ThemeContext.Provider value="lava">
    <UserContext.Provider value=1>
        <LanguageContext.Provider value="en">
            <AnimalContext.Provider value="Red Panda">
            </AnimalContext.Provider>
        </LanguageContext.Provider>
    </UserContext.Provider>
</ThemeContext.Provider>
```

然后，嵌套组件只使用它们需要的值，并在它们选择的值发生变化时重新渲染。 这里有两个组件分别访问一对context值：

```jsx
function InfoPage(props) {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  return ( /* UI */ );
}

function Messages(props) {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  // subscribe to messages for user 
  return ( /* UI */ );
}
```

**为多个 CONTEXTS 使用自定义PROVIDER** 

​		你希望将你的 providers 尽可能靠近使用其 contexts 的组件，包装子树而不是整个应用程序。 但是，有时，context 确实会在整个应用程序中使用，并且 providers 可以位于或接近根目录。 根部的代码通常不会有太大变化，因此不必担心嵌套多个 providers； 你不必将嵌套视为“包装地狱”或“末日中的金字塔”。 如果你愿意，并且providers 可能会在一起，你总是可以创建一个自定义 provider，将多个 providers 分组在一个地方，如下所示：

```jsx
function AppProvider({ children }) {

  return (
    <ThemeContext.Provider value="lava">
      <UserContext.Provider value='1'>
        < LanguageContext.Provider value="en">
          <AnimalContext.Provider value="Red Panda">
            {children}
          </AnimalContext.Provider>
        </LanguageContext.Provider >
      </UserContext.Provider>
    </ThemeContext.Provider >
  );
}
```

然后app可以使用自定义provider(s)：

```jsx
<AppProvider> 
	<App/>
</AppProvider>
```

**为状态值及其更新函数使用单独的context**

​		当 context provider的值改变时，它的consumers会重新渲染。 A provider 也可能由于其父级重新渲染而重新渲染。 If the provider’s value is an object that the code creates every time the provider renders,则该值在每次渲染时都会发生变化，即使您分配给对象的属性值保持不变。 

​		所以，我们有两个问题：

- 每次渲染都会为provider值分配一个新对象。

- 更改该值的一个属性会重新渲染可能不使用该值的消费者。

  
  
  我们可以通过在自定义 provider 中使用两个 contexts 而不是一个 context 来解决这两个问题，如下面的清单所示。
  
  ```jsx
  import {createContext, useState} from "react";
  
  const UserContext = createContext();
  export default UserContext;
  
  export const UserSetContext = createContext();
  
  export function UserProvider ({children}) {
    const [user, setUser] = useState(null);
  
    return (
      <UserContext.Provider value={user}>
        <UserSetContext.Provider value={setUser}>
        {children}
        </UserSetContext.Provider>
      </UserContext.Provider>
    );
  }
  
  ```
  
  `user` 和 `setUser` 不会在每次渲染时重新创建，我们现在为每个值使用单独的context和provider，因此一个值的消费者不会受到另一个值的更改的影响。

### 8.2.4 Specifying a default value for a context  

​		使用 Context API 涉及providers和consumers  ：provider设置一个值，consumer读取该值。 但是使用两个独立的部分可能需要一点信任。 如果我们使用context对象调用 `useContext` ，但在树的后面没有设置相应的provider怎么办？ 如果合适，在创建context对象时，我们可以为这种情况指定一个默认值，如下所示：

```jsx
const MyContext = createContext(defaultValue);  
```

​		如果相应的provider没有为该context设置任何值，则 `useContext` hook将返回该context对象的默认值。 如果您的应用使用默认语言或主题，这可能会很有用；provider可用于覆盖默认值，但如果不包含provider，一切仍然有效。

## 概述

- 对于许多组件使用的很少更改的值，请考虑使用 Context API。
- 

# 9、创建自己的hooks

## 9.1 Extracting functionality into custom hooks  

### 9.1.1 Recognizing functionality that could be shared

### 9.1.2 Defining custom hooks outside your components  

### 9.1.3 Calling custom hooks from custom hooks  

The hook returns a function so code that uses the hook can ask for the next title.  

## 9.2 Following the Rules of Hooks  

- Start the names of custom hooks with “use.”
- Call hooks only at the top level.
- Call hooks only from React functions.  

### 9.2.1 仅在顶层调用hooks

- Don’t put hooks inside conditionals.
- Don’t put hooks inside loops.
- Don’t put hooks inside nested functions.  

​        If you have an effect that should run only under certain conditions, and the conditions aren’t covered by the dependency array, put the conditions inside the effect function.  

```jsx
useEffect(() => {
    if (condition) {
    // perform task.
    }
}, [dep1, dep2]);
```

### 9.2.2 仅从 React 函数调用hooks

Keep your hook calls within **function components** and **custom hooks**.  

### 9.2.3 Using an ESLint plugin for the rules of hooks  

`eslint-plugin-react-hooks`  

## 9.3 提取自定义hooks的更多示例

### 9.3.1 使用 useWindowSize  hook访问窗口尺寸

### 9.3.2 Getting and setting values with a useLocalStorage hook  

## 9.4 Consuming a context value with a custom hook  

## 9.5 Encapsulating data fetching with a custom hook  

### 9.5.1 Creating the useFetch hook  

### 9.5.2 Using the data, status, and error values the useFetch hook returns  

```jsx
const {data : bookables = [], status, error} = useFetch(
	"http://localhost:3001/bookables"
);
```

It assigns the `data` property to the `bookables` variable and includes a default value of an empty array for when the `data` property is `undefined`:  

```jsx
data : bookables = []
```

### 9.5.3 Creating a more specialized data-fetching hook: useBookings  

# 10、使用第三方hooks  

## 10.1 Accessing state in the URL with React Router  

### 10.1.1 Setting up routes to enable nesting  

### 10.1.2 Adding nested routes to the Bookables page  

### 10.1.3 Accessing URL parameters with the useParams hook  

### 10.1.4 Navigating with the useNavigate hook  

```jsx
const navigate = useNavigate();

navigate("/bubbletea");
```

## 10.2 获取和设置查询字符串查询参数  

### 10.2.1 从查询字符串中获取查询参数

```jsx
const [searchParams, setSearchParams] = useSearchParams();
```

**创建一个 useBookingsParams   Hook**

**USING THE QUERY PARAMETERS IN THE BOOKINGSPAGE COMPONENT**  

**USING THE DATE QUERY PARAMETER IN THE BOOKINGS COMPONENT**  

### 10.2.2 设置查询字符串

```jsx
const [searchParams, setSearchParams] = useSearchParams();

setSearchParams(params, {replace: true});
```

Components that consume the search parameters will re-render, using the fresh values as the latest state. The `{replace: true}` option causes the browser to replace the current URL in its history with the new one. This will prevent each visited date from
appearing in the browser’s history. The browser’s Back button won’t step back through each date selected in the `WeekPicker`. If you think it would be useful for your app’s users to be able to navigate back through each selected date, you can omit the
option argument.  

## 10.3 使用 React Query 简化数据获取

### 10.3.1 介绍 React Query

React Query  特点：

- Caching
- Deduping multiple requests for the same data into a single request
- Updating out-of-date data in the background
- Knowing when data is out of date
- Reflecting updates to data as quickly as possible  

```sh
npm install react-query
```

To prevent this data-fetching duplication, should we move all the data-fetching code into a central store and access that single source from the components that need it? With React Query, we don’t need to do any of the work involved in creating
such a store. It lets us keep the data-fetching code in the components that need the data, but behind the scenes it manages a data cache, passing already-fetched data to components when they ask for them.  

### 10.3.2 Giving components access to a React Query client  

### 10.3.3 使用 useQuery 获取数据

```jsx
const {data, status, error} = useQuery(key, () => fetch(url));
```

`useQuery` uses the key to identify the data in its cache; it can return the data corresponding to existing keys straightaway and then fetch the latest data from the server in the background. The key can be a string or a more complicated array or object that
can be serialized.  

**USING A STRING AS THE QUERY KEY**  

```jsx
const {data: bookables = [], status, error} = useQuery(
    "bookables",
    () => getData("http://localhost:3001/bookables")
);
```

**USING AN ARRAY AS THE QUERY KEY**  

### 10.3.4 Accessing data in the query cache  

​		React Query makes the cache available to components via the client object that we assigned to the provider in section 10.3.2. Call React Query’s `useQueryClient` hook to get ahold of the client object:  

```jsx
const queryClient = useQueryClient();
```

We can use the associated query key and the `getQueryData` method to access alreadyfetched data. For example, to get the list of bookables in the cache:

```jsx
const bookables = queryClient.getQueryData("bookables");
```

If we want a bookable with a specified ID, we call the `find` array method, like this:

```jsx
const bookable = bookables?.find(b => b.id === id);  
```

React Query’s `useQuery` hook accepts a config object as a third argument:

```jsx
const {data, isLoading} = useQuery(key, asyncFunction, config);  
```

The config lets the calling code control all kinds of query-related functionality, such as cache expiry, retry policies when fetching-errors occur, callback functions, whether to work with `Suspense` and error boundaries (see chapter 11), and the setting of initial data.  `BookableEdit` sets the `initialData` config property so that, when first called, and if the initial data exists, `useQuery` won’t bother fetching the data from the server:  

```jsx
const {data, isLoading} = useQuery(
    ["bookable", id],
    () => getData(`http://localhost:3001/bookables/${id}`),
    {
        initialData:
        queryClient.getQueryData("bookables")
        ?.find(b => b.id === parseInt(id, 10))
    }
);
```

### 10.3.5 使用 useMutation 更新服务器状态

`useMutation`  

```jsx
const {mutate, status, error} = useMutation(asyncFunction, config);  
```

# 第2部分

# 11、使用 Suspense 进行代码拆分

`code splitting`  ：rather than loading all of an app’s code at once, we load it in `chunks`, as it’s needed.  

`static imports`  ：一般页面中通过import引用代码方式。

`tree-shaking`  ：可以避免重复代码并丢弃未使用的代码，保持包的有序并尽可能小。

## 11.1 使用import函数动态引入代码

p284

### 11.1.3 Using static imports to load JavaScript  

### 11.1.4 Calling the import function to dynamically load JavaScript  

## 11.2 使用lazy和Suspense动态导入组件

### 11.2.1 Converting a component to a lazy component with the lazy function  

```js
const LazyCalendar = lazy(() => import("./Calendar.js"));  
```

We pass `lazy` a function that returns a promise.   

相当于：

```js
const getPromise = () => import(modulePath);

const LazyComponent = lazy(getPromise);  // React.lazy
```

The `getPromise` function returns a promise that resolves to a module. The module’s default export must be a component.  

### 11.2.2 Specifying fallback content with the Suspense component  

Use the `Suspense` component to wrap UI that contains one or more lazy components in its tree:  

```jsx
<Suspense fallback={<div>Loading...</div>}>
	<CalendarWrapper />
</Suspense>
```



```jsx
<Suspense fallback={<div>Loading...</div>}>
    <CalendarWrapper />
    <CalendarWrapper />
</Suspense>
```

### 11.2.3 Understanding how lazy and Suspense work together  

### 11.2.4 Code splitting an app on its routes  

## 11.3 Catching errors with error boundaries  

`error boundary`  

### 11.3.1 Checking out the error boundary example in the React docs  

### 11.3.2 Creating our own error boundary  

### 11.3.3 Recovering from errors  

a prebuilt error boundary package from npm called `react-error-boundary`.  

# 12、 Integrating data fetching with Suspense  

305