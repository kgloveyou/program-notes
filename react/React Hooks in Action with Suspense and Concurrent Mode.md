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