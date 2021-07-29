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

P104

