P38

# 第3章 Hookings into React

 不要在循环、条件语句或嵌套函数内部调用 Hooks。相反，应始终在 React 函数的最外层（任何提前返回语句之前）使用 Hooks。

# 第4 章 使用状态快速启动组件

### 比较状态

我们之前提到过，React 在比较两个状态时会使用 `Object.is` 函数。

JavaScript 内置了七种原始数据类型：字符串（string）、数字（number）、大整数（bigint）、布尔值（Boolean）、未定义（undefined）、符号（symbol）和空值（null）。这些数据类型一旦在内存中创建，其值便无法被修改。

在 JavaScript 中，对于像对象（object）或数组（array）这样的非原始类型，会使用引用（也称为指针）来指向特定的内存空间。

这意味着，如果你创建两个新的对象，它们不会指向同一个内存空间。因此，即使这两个对象 `{}` 和 `{}` 包含完全相同的内容，对它们进行比较也会返回 `false`。

刚开始可能需要一些时间来适应使用 `Object.is` 函数或严格相等运算符（`===`）。你可以问自己一个简单的问题：要比较的值是否可变？如果可变，则按引用比较；如果不可变，则按值比较。

### 多个 dispatches  

# 第5章 使用 Effect 处理副作用

这里似乎出现了一个规律——如果 Effect 回调函数使用了某个变量，那么这个变量通常需要被添加到 `deps` 数组中。这句话在实际开发中几乎总是成立的（准确率高达 99.9%）。如果你确实希望某个变量变化时**不触发屏幕更新** ，那么你可以选择不把它添加到依赖数组中。不过，React 官方并不推荐这种做法。为了帮助开发者发现潜在的依赖遗漏问题，React 甚至专门提供了一个 ESLint 插件（`eslint-plugin-react-hooks`）。

# 第6章 使用 Memo 来提高性能

133

## Appendix B – Skipping a Child Update  

Profiler 图表提供了一次更新中访问的所有 Fiber 的拓扑结构概览。这种拓扑关系直观地展现了它们如何像树一样连接。此外，我们可以通过颜色区分每个 Fiber 的状态变化：

- **纯色条形** 表示该组件发生了更新；
- **灰色阴影条形** 则表示 React 决定跳过该组件的更新（称为 **bailout**）。

**该图表在分析网站性能时非常有用，因为它能清晰展示：**

1. 在某次更新中，有多少 Fiber 被替换（重新创建）；
2. 有多少 Fiber 被复用（保留旧实例）；
3. 特定 Fiber 是否被访问过。

# 第7章 Use Context to Cover an Area  

# 第8章 Use Ref to Hide Stuff  

通过 `useRef` 创建的 `ref` 不仅可以持有 DOM 实例，还可以存储任意值。你可以在任何时候通过重新赋值来更新它的 `current` 属性：

```javascript
ref.current = ...  
```

这个赋值可以是任意的 JavaScript 表达式。需要注意的是，`ref` 的赋值操作本身是静默的 ——它仅仅是一个普通的变量赋值，不会触发组件的重新渲染。

## 阻止内存泄漏

```jsx
const Title = () => {
  const [text, setText] = useState("")
  const mountedRef = useRef(true)
  useEffect(() => {
    fetch("https://google.com").then(res => {
      if (!mountedRef.current) return
      setText(res.title)
    })
    return () => {
      mountedRef.current = false
    }
  }, [])
}
```

## Appendix A – Callback ref  

```jsx
const ref = useRef()
const setRef = (r) => {
  if (...) {
    ref.current = r
  } else {
    // …
  }
}
return <h1 ref={setRef}>...</h1>
```

## Appendix B – Forward ref  

因此，通过 `forwardRef` 和 `useImperativeHandle`，我们可以为函数组件附加 ref。这为开发者提供了更多手动控制函数组件的机会。然而需要理解的是，从子组件传递到父组件的 ref 源自单个元素，因此从技术上讲，这种方式创建的 ref 仍然是该元素的 ref，而不是真正针对函数组件的 ref。

# 第9章 Use Custom Hooks to Reuse Logic  

希望到目前为止，这些令人费解的例子没有让你感到头晕目眩。简而言之，按照约定，自定义钩子需要满足前面列出的所有要求。

从技术层面来说，自定义钩子与普通函数的唯一区别在于：它至少会使用一次内置钩子。那么内置钩子有什么特别之处呢？内置钩子能够‘挂钩’React的核心机制，提供那些不打开引擎就无法实现的功能——这里的功能主要指管理持久化状态。这正是‘自定义’这个名称的由来，用以区分你创建的钩子和React内置的钩子。

在开始创建自定义钩子之前，还有一个值得指出的独特之处：大多数自定义钩子在设计时并不附带任何可视化表现形式。因此，从本质上讲，自定义钩子就是一段可复用的算法。

这正是React团队设想中钩子能为我们带来的价值——钩子‘让你能在组件间复用逻辑’。创建自定义钩子时，请牢记这一点。如果你觉得某段逻辑足够通用，或者至少认为还有其他地方可以用同样的逻辑，那就该尝试使用自定义函数的想法了；而如果最终发现它使用了某个内置钩子，那么恭喜你，你已经成功创建了一个自定义钩子。

更多hooks参考，https://usehooks.com/

# 第10章 使用React构建一个网站