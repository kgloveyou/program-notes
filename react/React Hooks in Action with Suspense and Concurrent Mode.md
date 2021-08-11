# React Hooks in Action with Suspense and Concurrent Mode   

### 1.4.1 Concurrent Mode  

## 1.4.2 Suspense  

## 1.5 React’s new publication channels  

Much of Concurrent Mode and Suspense for data fetching are on the experimental channel at the time of writing.  

# 2、Managing component state with the useState hook  

## 2.2 Storing, using, and setting values with useState  



### 2.2.1 Assigning new values to variables doesn’t update the UI  

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

# 3 Managing component state with the useReducer hook  

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

side effect  包括如下：

- 强制设置页面标题

- Working with timers like `setInterval` or `setTimeout`  

- Measuring the width, height, or position of elements in the DOM  

- Logging messages to the console or other service  

- Setting or getting values in local storage  

- Fetching data or subscribing and unsubscribing to services  

  

The `useEffect` hook is our gateway to safe interactions with the outside world.  

## 4.1 Exploring the useEffect API with simple examples  

### 4.1.1 Running side effects after every render  

Reaching out to a browser API in this way is considered a side effect.  

```js
useEffect(() => {
	document.title = "Bonjour";
});  
```

When you call the `useEffect` hook in this way, without a second argument, React runs the effect after every render.   

### 4.1.2 Running an effect only when a component mounts  

```js
useEffect( () => {
// perform a side effect
}, [ ] );
```

### 4.1.3 Cleaning up side effects by returning a function  

We have to be careful not to make a mess when we set up long-running side effects like **subscriptions, data requests, timers, and event listeners.**   

```js
useEffect( () => {
    // perform a side effect
    return function () { /* clean up side effect */ };
}, [ ] );
```

Cleanup function: Return a function to clean up  after the effect (e.g., unsubscribe,  stop timers, remove listeners, etc.).  

​		React runs the cleanup function when it unmounts the component. But that’s not the only time it runs it. Whenever the component re-renders, React calls the cleanup function before running the effect function, **if the effect runs again**. If multiple effects need to run again, React calls all of the cleanup functions for those effects. Once the cleanup is finished, React reruns the effect functions as needed.  

### 4.1.4 Controlling when an effect runs by specifying dependencies  

```jsx
useEffect( () => {
    // do something with dep1 and dep2
    return () => { /* clean up */ };
}, [dep1, dep2] );
```

Cleanup function: Remove listeners, unsubscribe, etc.  

### 4.1.5 Summarizing the ways to call the useEffect hook  

### 4.1.6 Calling useLayoutEffect to run an effect before the browser repaints  

This hook has the same API as `useEffect` but runs synchronously after React updates the DOM and before the browser repaints.   If the effect makes further updates to the state, the intermediate state isn’t painted to the screen.  

You generally won’t need `useLayoutEffect`, but if you come across problems (maybe with an element flickering between states), you could try switching from `useEffect` for the suspect effect.  

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

```js
useEffect(() => {
    // perform effect
    return () => {/* clean-up */};
}, [dep1, dep2]);
```

- If, on re-render, multiple effects are going to run, React will call all of the cleanup functions for the rerunning effects before it runs any effects themselves.  

# 5 Managing component state with the useRef hook  

## 5.1 Updating state without causing a re-render  

With the `useState` hook, calling a state value’s updater function usually triggers a re-render. 

With the `useRef` hook, we can update our value without a corresponding change to the UI.   

### 5.1.1 Comparing useState and useRef when updating state values  

`useState`  

React persists the state across renders, each time passing it back to the component,where it is assigned to the `count` variable.  

`useRef`  

The hook returns an object, a `ref`, which we use to store the state value. Changing the value stored on the ref doesn’t trigger a re-render. React persists the state across renders, each time passing the same ref object back to the component, where it is assigned to the `ref` variable.  

### 5.1.2 Calling useRef  

Every time React runs the component code, each call to `useRef` will return the same ref object for that call.  

```js
const refObject = useRef( initialValue );  
```

`useRef` returns an object with a current property.  

```jsx
ref1.current = "Babel Fish";
ref2.current = "1,000,000,000,000";  
```

Assigning new values to the `current` properties of the ref objects doesn’t trigger a rerender. But as React always returns the same ref objects, the new values are available when the component runs again.  

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

## 5.3 Keeping references to DOM elements  

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

#### 受控组件

With controlled components, the data flow is from the component to the DOM, in line with the standard React approach.  

## 概述

- Call the `useRef` hook when you want React to manage a state value but don’t want changes to the value to trigger a re-render.  For example, use it for storing IDs for `setTimeout` and `setInterval` or for references to DOM elements. You
  can pass it an initial value if required. It returns an object with a `current` property set to the initial value:  

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

- React recommends you use `controlled components.` Use the `useState` hook or the `useReducer` hook to manage the state and get React to update the DOM with the latest state values. Your component will be the one source of truth rather than splitting state between the component and the DOM.  

# 6 Managing application state  

## 6.1 Passing shared state to child components  

### 6.1.1 Passing state from a parent by setting props on the children  

### 6.1.2 Receiving state from a parent as a prop  

The code here destructures the props, assigning the color prop to a local variable of the same name.  

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

### 6.5.1 Depending on functions we pass in as props  

### 6.5.2 Maintaining function identity with the useCallback hook  

When we want to use the same function from render to render but don’t want it to be redefined each time, we can pass the function to the `useCallback` hook. React will return the same function from the hook on every render, redefining it only if one of the function’s dependencies changes. Use the hook like this:  

```jsx
const stableFunction = useCallback(funtionToCache, dependencyList);
```

​	`useCallback` lets us memoize functions. To prevent the redefinition or recalculation of values more generally, React also provides the `useMemo` hook, and we’ll look at that in the next chapter.  

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

### 7.1.1 Generating anagrams with an expensive algorithm  

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

## 7.3 Organizing the components on the Bookings page  

### 7.3.2 Managing the selected week and booking with useReducer and useState  

## 7.4 Efficiently building the bookings grid with useMemo  

### 7.4.5 Coping with racing responses when fetching data in useEffect  

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

## 8.1 Needing state from higher up the component tree  

## 8.2 Working with custom providers and multiple contexts  

### 8.2.1 Setting an object as the context provider’s value  

### 8.2.2 Moving the state to a custom provider  

Because `App` re-renders, `all of its children` rerender,   

**CREATING A CUSTOM PROVIDER**  

**USING THE CHILDREN PROP TO RENDER WRAPPED COMPONENTS**  

**AVOIDING UNNECESSARY RE-RENDERS**  （※）

**USING THE CUSTOM PROVIDER**  

### 8.2.3 Working with multiple contexts  

**SPLITTING THE CONTEXT VALUES ACROSS MULTIPLE PROVIDERS**  

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

然后，嵌套组件只使用它们需要的值，并在它们选择的值发生变化时重新渲染。

**USING A CUSTOM PROVIDER FOR MULTIPLE CONTEXTS**  

**USING SEPARATE CONTEXTS FOR A STATE VALUE AND ITS UPDATER FUNCTION**  

### 8.2.4 Specifying a default value for a context  

```jsx
const MyContext = createContext(defaultValue);  
```

## 概述

# 9、创建自己的hooks

## 9.1 Extracting functionality into custom hooks  

### 9.1.1 Recognizing functionality that could be shared

### 9.1.2 Defining custom hooks outside your components  

### 9.1.3 Calling custom hooks from custom hooks  

The hook returns a function so code that uses the hook can ask for the next title.  

## 9.2 Following the Rules of Hooks  

227