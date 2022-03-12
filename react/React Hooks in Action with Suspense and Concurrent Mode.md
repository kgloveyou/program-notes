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
- 

# 5 使用useRef hook管理组件状态

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

- React recommends you use `controlled components.` 

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