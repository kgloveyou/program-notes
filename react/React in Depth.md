# React in Depth

源码：https://github.com/React-in-Depth/react-in-depth

```sh
git clone https://github.com/React-in-Depth/react-in-depth.git  

npm install

npm run dev -w chXX/YYY
```

P16

# 第2章 高级组件模式

- Provider  

- Composite  

- Summary  

## 2.1 The Provider pattern  

P26

## 2.2 The Composite pattern  

38

## 2.3 The Summary pattern  

### 2.3.4 总结模式有多有用？

总结来说，总结模式因其能够简化和组织 React 组件的能力而脱颖而出。在通过单个或多个自定义 Hook 探索其应用后，我们看到这种模式在提升代码清晰度和可维护性方面起到了关键作用。

总结模式的优势在于其多功能性和可扩展性。无论是通过单个 Hook 简化组件，还是在更复杂的场景中协调多个 Hook，它都提供了管理组件逻辑的定制化方法。这种模式不仅能清理代码，还能培养可重用的思维方式，使其在需要保持一致性的大型项目中非常宝贵。

本质上，虽然总结模式可能并不引人注目，但它在创建高效且易于管理的 React 应用程序中所做的贡献是不可否认的。它体现了这样一个原则：有效的解决方案通常蕴含于简洁和深思熟虑的组织中。

## 总结

- 有效的软件开发反映了建筑的核心原则，强调稳定性、结构性以及适当模式的使用。
- React 中的 Provider 模式集中并简化了数据管理，使其在复杂应用程序的全局状态控制中不可或缺。
- 通过使用 Provider 模式，React 开发人员可以高效地在组件层次结构中传递数据和函数，增强了组织性和功能性。
- React 中的组合模式（Composite pattern）提供了一种管理复杂 UI 结构的策略性方法，能够实现模块化和灵活的组件架构。
- 采用组合模式可以实现动态且复杂的 UI 设计，促进组件的重用性和结构完整性，提升 React 项目的可维护性。
- React 中的总结模式（Summary pattern）旨在通过将逻辑抽象到自定义 Hook 中来减少代码杂乱，从而产生更简洁、更易维护的组件。
- 实施总结模式可以增强 React 组件的可读性和可扩展性，有助于提高开发效率并促进团队协作的编码实践。
- 在 React 开发中，遵循如 Provider、Composite 和 Summary 等基础设计模式，确保了稳健且创新应用的创建。
- 掌握这些 React 设计模式为开发人员提供了构建多样且稳定的数字结构的工具，类似于物理建筑中的构造。

# 第3章 优化 React 性能

## 3.1 理解 React 渲染

要优化 React 渲染，我们首先需要理解它。一个函数组件会由于以下三种原因之一进行渲染：

- 组件刚刚被挂载。（它之前不在组件树中，现在加入了组件树。）
- 父组件刚刚重新渲染。
- 组件使用了某个 Hook，该 Hook 触发了此组件的重新渲染。

就是这样。如果以上三种情况都没有发生，你的组件将不会重新渲染，这是可以保证的。如果其中任何一种情况发生，组件一定会重新渲染。不过，React 可能会在多个事件发生后进行批量渲染。例如，如果一个状态值发生了变化并且父组件重新渲染，组件可能会重新渲染一次，也可能会渲染两次。这个过程由 React 控制，取决于一些微妙的时间细节。

你现在应该对这些内容有了比较好的理解，基于你对 React 的基础知识，所以我不会详细展开讨论。但我会讨论一些与此相关的误解。特别是，我将介绍以下两个常见的误区：

- **误区一**：React 会在属性改变时重新渲染组件。技术上来说，这个说法不准确，而这个技术细节非常重要。
- **误区二**：在 React 18 的严格模式（Strict Mode）中，React 会两次挂载每个组件。实际上情况稍有不同。

让我们讨论这两个误区，因为它们非常重要。

### 3.1.1 改变属性是无关紧要的

在 React 开发圈中有一个常见的误解，认为组件会因为属性（props）的变化而重新渲染，但实际上并非如此。我们可以通过两种方式来证明这一点：

- 我们可以创建一个属性发生变化但不会重新渲染的组件。
- 我们也可以创建一个多次使用相同属性渲染却每次都重新渲染的组件。

这两种情况都很容易想象。首先，我们需要一个能够清楚显示它是否重新渲染的组件。接下来，我们可以创建一个这样的组件，如以下代码所示。

## 3.2 通过最小化重新渲染来优化性能

**什么是记忆化**

**记忆化（Memoization）**是一种优化技术，它通过记住纯函数的上一次输入和输出来避免重复计算。如果下一次调用该函数时，输入与上次相同，记忆化会直接返回之前计算的结果，而不需要再次执行函数。

记忆化的关键是它仅适用于**纯函数**，即返回值完全取决于其输入，而不依赖任何外部信息或随机性。

虽然记忆化可以被看作是一种缓存，但与传统缓存不同，缓存通常存储多种输入和输出的对应关系，而记忆化通常只记住**最近一次**函数调用的输入和输出，随后比较下一次调用的输入是否相同，若相同则复用上次的结果。

在 React 中，有一个 `memo()` 函数可以用于记忆化组件，但它不适用于非组件的函数。如果你想记忆化常规函数（不仅限于 React 组件），可以使用像 `memoizee` 这样的包。例如：

```javascript
import memoize from 'memoizee';

const rawAddition = (a, b) => a + b;
const addition = memoize(rawAddition);
```

在这个例子中，如果多次调用未记忆化的函数 `rawAddition()`，即使传入相同的值，每次都会重新进行计算。但如果调用记忆化的 `addition()` 函数，并传入相同的值，则计算只会在第一次执行，随后相同的输入会直接返回缓存的结果，而不再进行重复计算。这可以大大提高性能，尤其是在处理计算密集型操作时。

### 3.2.1 Memoize a component  

我之前提到过一个你可能会觉得有点奇怪的现象：当一个组件渲染时，它的所有子组件也会重新渲染，无论它们是否发生了变化。这种强制性的子组件渲染包括那些完全自包含、不接收任何属性、只渲染一段静态 JSX 的子组件。此外，即使给接收属性的组件传入相同的属性值，它们仍然会重新渲染。

我们可以使用 React 模块中的 `memo()` 函数来对整个组件进行记忆（缓存）。这样，如果该组件再次以相同的属性（或没有属性）被调用，它就不会再次渲染，而是直接使用之前已经计算好的结果。

在这种情况下，React 会对你的组件与浏览器文档对象模型（DOM）之间的协调过程进行优化，并意识到并没有生成新的信息，因此甚至不需要将 DOM 与 JSX 进行比较。React 知道，由于 JSX 不仅仅是相似，而是完全相同，所以 DOM 已经是正确的了。这样的优化可以节省大量时间！

让我们创建一个待办事项应用程序，允许用户添加待办事项。当用户在输入框中输入内容时，我们将更新要添加的待办事项标题的内部状态。这种方式在受控输入框中很常见，但会导致大量的重新渲染。在我们的第一次尝试中，我们将实现一个**未使用记忆化（memoization）**的待办事项应用。

### 3.2.2 记忆化组件的部分内容

在前一节中，列表项是在一个单独的组件中渲染的，因此我们有一个便利的选择，即对整个组件进行记忆化处理。但我们并不总是有这个选择。有时，相关的 JSX 部分跨越了多个组件。

假设我们没有使用一个单独的 `Items` 组件，而是直接在 `Todo` 组件中渲染列表项。那我们该怎么办呢？

我们可以采取两种方法：

- 将组件中经常不变的部分提取到一个新的、独立的组件中，并对该组件进行记忆化处理，这实际上就直接回到了第 3.6 节的示例。
- 使用 `useMemo` 钩子直接在父组件中对 JSX 进行记忆化处理，如下一节所示。

```jsx
import { useMemo, useState } from "react";

function Todo() {
  const [items, setItems] = useState(["Clean gutter", "Do dishes"]);
  const [newItem, setNewItem] = useState("");
  const onSubmit = (evt) => {
    setItems((items) => items.concat([newItem]));
    setNewItem("");
    evt.preventDefault();
  };
  const itemsRendered = useMemo(
    () => (
      <>
        <h2>Todo items</h2>
        <ul>
          {items.map((todo) => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
      </>
    ),
    [items]
  );
  const onChange = (evt) => setNewItem(evt.target.value);
  return (
    <main>
      {itemsRendered}
      <form onSubmit={onSubmit}>
        <input value={newItem} onChange={onChange} />
        <button>Add</button>
      </form>
    </main>
  );
}

function App() {
  return <Todo />;
}

export default App;
```



### 3.2.3 Memoize properties to memoized components  

```jsx
<Items
  items={items}
  onDelete={(item) => setItems((ls) => ls.filter((i) => i !== item))}
/>
```

由于这个函数是在 JavaScript 中内联定义的，因此每次渲染都会创建一个新函数。你可能会认为每次渲染时它是同一个函数，因为每个函数的定义都相同，但这并不是 JavaScript 的工作方式。在使用记忆化时，每次渲染都传递新的属性是不可行的。为了让记忆化生效，我们的值必须在引用上是相同的。因此，需要将这个回调函数进行记忆化。使用专门为此目的设计的 `useCallback` 钩子是更好的选择。请参见以下代码示例。

```jsx
// Todo component
const onDelete = useCallback(
    (item) => setItems((list) => list.filter((i) => i !== item)),
    []
  );

<Items items={items} onDelete={onDelete} />

// Items component
const Items = memo(function Items({ items, onDelete }) {
  return (
    <>
      <h2>Todo items</h2>
      <ul>
        {items.map((todo) => (
          <li key={todo}>
            {todo}
            <button onClick={() => onDelete(todo)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
});
```



通常，当你开始对组件进行记忆化时，就会发现对属性进行记忆化也是必要的。属性记忆化主要针对内联创建的对象和数组，尤其是对函数更为重要，这也是 `useCallback` 钩子存在的主要原因以及在 React 中频繁使用的原因。

记忆化并不是等到项目末期、发现应用程序有些缓慢时才进行的工作。记忆化是在开发过程中就应该执行的，以确保平稳、优化的用户体验。使用本节中介绍的工具，你应该能够将这个示例应用于自己的项目中。

同时，过早优化也会带来问题。如果你优化了那些运行良好的部分，最终可能适得其反。调用优化函数本身会带来轻微的运行时开销，如果这些优化无法加速应用，反而会使其变慢。

如果你是新手开发者，不要过早优化。但如果你清楚自己在做什么，当你预测到优化会有所影响时，可以进行记忆化。

### 3.2.4 深入了解记忆化钩子

在本节中，我将详细介绍两个记忆化钩子的使用场景和最佳实践。简单来说，你可以使用 `useMemo` 来记忆化任何值，使用 `useCallback` 来特别记忆化函数。但什么时候应该进行记忆化？如何确保在必要时值能够正确更新？

**使用 `useMemo` 记忆化任何值**

这个钩子在渲染之间记忆化值，主要用于两个目的（也可以同时用于这两个目的）：

- 防止代价高昂的重新计算
- 保持引用相等

`useMemo` 接收一个函数和一个依赖项数组。如果自上次渲染以来依赖项数组中的任何值发生了变化，该函数就会执行，且函数的返回值将作为 `useMemo` 的返回值。如果自上次渲染以来依赖项数组中的值没有发生变化，那么 `useMemo` 会返回上一次渲染时的值（见图 3.4）。

**使用 useCallback 记忆化函数** 

useCallback 是 React 内置的最不必要的一个钩子之一，因为它只是 useMemo 的一个简单扩展。如果用 useMemo 来记忆化一个函数，它和 useMemo 做的事情是一样的。useCallback 完全可以用 useMemo 来定义，就像下面这样：

```javascript
function useCallback(fn, deps) {
  return useMemo(() => fn, deps);
}
```

这个定义甚至直接写在了 React 的官方文档中。那么为什么这两个钩子都存在呢？useCallback 用于创建具有引用相等性需求的记忆化回调函数，而它从来不是用来避免昂贵计算的。回调函数通常是在组件体内内联定义的，如下所示：

```jsx
const handleClick = useCallback((evt) => {
  // handle evt and do stuff
}, []);
```

如果我们想使用 useMemo 来定义同样的记忆化函数，可以这样做：

```jsx
const handleClick = useMemo(
  () => (evt) => {
    // handle evt and do stuff
  },
  []
);
```

第二行中的双箭头语法很容易被忘记——而一旦忘记，就会改变代码的含义。我们原本希望将一个函数赋值给 handleClick，但如果忘记了双箭头，实际上我们赋值的是调用该回调函数的结果，而这个结果很可能是 undefined，因为我们很少在事件处理函数中返回任何值。尽管这个钩子只能实现 useMemo 所能做的一部分功能，但在本书后续内容中，我们将更多地使用 useCallback 而非 useMemo，因为我们记忆化函数的频率要高于其他类型的值。



## 3.3 理解依赖数组  

我们之前已经多次使用依赖数组来控制各种钩子在何时触发。对于副作用钩子（effect hooks），我们会使用依赖数组。在副作用钩子中，空数组表示该钩子仅在组件挂载时运行，而非空数组则表示该钩子会在组件挂载时以及每次所列依赖项更新时运行。我们也对记忆化钩子（memoization hooks）使用依赖数组；例如，通过使用空依赖数组，我们可以创建稳定的值。

但在实际使用中，依赖数组是如何工作的呢？你应该如何在依赖数组中指定正确的元素？又如何确保这些依赖项不会过于频繁地更新？

首先，让我们重申一下哪些钩子使用这些依赖数组来定义它们应该在何时生效：useEffect、useCallback、useMemo 和 useLayoutEffect。这四个钩子，且只有这四个钩子，使用依赖数组来有条件地触发它们的副作用和/或执行。

依赖数组大致可以分为三类：完全不指定数组、指定空数组，或者指定非空数组。以下是对这三类情况的示例说明：

```jsx
useEffect(() => { ... });
useEffect(() => { ... }, []);
useEffect(() => { ... }, [id]);
```

如果你没有指定依赖数组，那么无论钩子内部（如果有的话）哪些值发生了更新，该钩子都会在每次渲染时都被触发。如果你指定了一个空数组，那么你的钩子只会在组件挂载时触发一次，之后再也不会触发（清理函数除外，它会在组件卸载时触发，但那不是你的钩子本身触发的，而是运行你的钩子所产生的一种副作用）。

如果你指定了一个非空数组，钩子会在渲染时检测数组中任何一个值的变化。任何单个值的变化都会触发该钩子。React 使用**引用相等性**来判断值是否发生了变化。

>**引用相等性**
>
>在 JavaScript（以及许多其他语言）中，值分为两类：**基本类型**和**复杂对象**。JavaScript 有七种基本类型（`number`、`bigint`、`Boolean`、`string`、`symbol`、`null` 和 `undefined`）以及一种复杂类型（`object`）。也许你会想，类、正则表达式、数组和函数呢？这些也被认为是对象（尽管在某种意义上类和函数可以视为函数，而函数是对象的一个子类型）。
>
>你可以使用三等号运算符 `===` 来比较值是否严格相等。普通的双等号运算符 `==` 会进行类型转换，因此 `"1" == 1` 为 `true`，而严格相等要求类型也相同。
>
>在比较两个基本类型的值时，如果它们代表相同的数据，即使是不同变量，它们也会被认为是严格相等的。例如，`2 === 1+1` 是 `true`。
>
>但对于复杂类型来说，严格相等表示**引用相等**。只有当对象是同一个对象时，才会被认为是相同的，更新其中一个也会同时更新另一个。因此，`{} !== {}` 和 `[] !== []`，即使我们分别比较的是两个空对象和空数组。它们不被认为是严格相等的，因为它们不是同一个对象（或数组），只是相似的数据结构。
>
>当我们说 React 使用**引用相等性**时，我们的意思是 React 会使用严格相等运算符（`===`）来比较值。因此，只有当对象或数组是指向同一个对象的引用时，React 才会认为它们是相同的，而不仅仅是包含相似数据的两个不同值。

### 3.3.1什么是依赖项？

钩子的依赖项是钩子中使用的所有变量和引用的一个子集。依赖项指的是任何在组件作用域内本地存在的变量，而不是组件作用域外也存在的变量。图 3.6 显示了一些示例。

依赖项包括在组件中定义的任何变量（如 `const`、`let` 或 `var`）、在组件内部定义的任何函数，以及传递给组件的任何参数（主要是属性，但也可能是转发的引用）。任何在组件外部定义或从其他文件导入的函数或变量对于钩子来说都不是相关的依赖项。最后，在钩子内部定义的任何变量也不是依赖项，因为它们不在外部组件中存在。

### 3.3.2 通过省略依赖数组，在每次渲染时都运行

假设你希望你的副作用在每次渲染时都运行，而不管组件是因为什么原因重新渲染的。也许你是为了追踪或统计目的，想要记录所有的渲染情况。你可以添加一个依赖数组，列出所有存在的属性和状态值——只要其中任何一个值发生变化，这个副作用就会运行。

但请记住，你的组件也会因为其父组件重新渲染而重新渲染，而这种由父组件触发的渲染可能并不会伴随任何属性或状态值的变化。因此，无论你在依赖数组中放入多少个值，你的副作用都不会在每一次可能的渲染中都运行。

你有一个简单的解决方案：不使用依赖数组。完全不传入任何依赖数组，这样你的副作用就会在每次渲染时都运行，而不论渲染是由什么原因触发的：

```javascript
function Component({ ... }) {
  useEffect(() => track('Component rendered'));
  ...
}
```

请注意，我们只向 `useEffect` 函数提供了一个参数。我们只是忽略了传递第二个参数。

你可能会问，为什么非要在钩子中运行这个副作用呢？为什么不直接内联写这段代码，就像下面这样？

```javascript
function Component({ ... }) {
  track('Component rendered');
  ...
}
```

建议在副作用钩子中执行追踪函数，这样做有助于优化性能。前面的 track 函数可能执行较慢，而该函数的调用响应速度不应该阻塞组件的渲染。因此，通过在副作用中运行该函数，你可以将副作用的执行与组件的渲染解耦。

**没有依赖项的缓存/记忆化是没有意义的  **

你会为了使用缓存钩子而跳过依赖数组吗？如果缓存钩子的函数体在每次渲染时都会执行，那么对值进行缓存的额外开销就没有任何意义。所以你绝不会这么做，因为这样的代码毫无用处。如果你写了这样的代码：  
```javascript
const value = useMemo(() => someCalculation());
```
那你还不如直接使用下面这段效率更高且功能完全相同的代码：  
```javascript
const value = someCalculation();
```

**没有依赖数组和空依赖数组是不同的**  

请注意，缺少依赖数组和空依赖数组是完全不同的。在依赖数组的上下文中，这两种情况截然相反。带有空依赖数组的钩子仅在组件初次挂载渲染时执行一次，之后永远不会再次执行；而没有依赖数组的钩子会在组件的每一次渲染时都执行，无论渲染的原因是什么。

### 3.3.3 跳过稳定的变量作为依赖项

如果你格外细心，可能会意识到我们有时候会“偷懒”。我们并没有始终遵循“将钩子中使用的所有变量都列入依赖数组”这一最佳实践。在列表 3.10 中，我们就跳过了这一步骤。能发现这一点，你值得额外获得一颗金星！不过我当时其实有指出这一点，所以也许你只能得一颗银星了。以下是列表 3.10 中该组件的相关部分：

```jsx
const onDelete = useCallback(
  (item) => setItems((list) => list.filter((i) => i !== item)),//这里，我们使用了变量 setItems，它明确定义在 effect 之外，但在组件之内。
  []	//但我们仍然指定了一个空依赖数组。这样不允许，对吧？
);
```

这里发生了什么？我们可以不把变量列入依赖项吗？是的，如果该变量是一个**稳定的变量**。“稳定的变量”这个概念本身其实有点自相矛盾，因为它指的是一个**不会变化的变量**。如果某个变量在你的组件每次渲染时都保持相同的值，那么把它放进依赖数组就无关紧要了，因为我们知道它永远不会改变。这也是为什么来自组件外部的值通常不需要放进依赖数组的部分原因。如果我们**在组件外部定义了一个常量**，或者**从其他文件导入了一个常量**，我们就知道它在组件的每一次渲染中都是同一个常量，因此即使我们依赖它，也不需要把它当作一个可能变化的值来对待。

同样地，我们的组件内部也可能存在一些我们知道是稳定的变量——也就是那些永远不会改变的变量。当涉及到函数和对象时，稳定的值就显得尤为重要，因为即使一个函数每次的内容都相同，这也并不意味着它的值就是相同的。

当谈到 Hooks 时，React 定义并明确将某些返回值列为**稳定的**。如果你比较某些 Hook 的返回值，就会发现它们不仅返回相似的函数或对象，而是**完全相同的函数或对象**。我们可以忽略将这些值添加到依赖项中，从而使我们的组件和 Hook 更易于阅读和理解。

这就是由 useState 返回的 setter 函数的情况。虽然每次渲染时返回的值可能会变化，但 setter 函数始终是同一个函数引用，这就是为什么我们不需要将它包含在依赖数组中。

useRef 返回的对象也是如此。该对象始终是同一个，但其 current 属性的值是动态变化的。

如果你在 useEffect（或记忆化钩子）中使用了一个 useRef 引用或 useState 的 setter，你可以将其添加到依赖数组中，但并不是必须的。你和 React 都知道，这个引用和 setter 都是稳定的，它们永远不会改变，因此也绝不会导致钩子的执行发生变化。将它们列为依赖项是可选的。为了保持一致性，我建议你要么始终包含这些已知稳定的值，要么永远不包含。（我自己从来不包含。）开发团队通常会在编码规范中明确规定他们在这方面的选择。

你也可以自己创建稳定的变量，从而让你的组件更易于阅读和理解——无论是对你自己作为开发者而言，还是对团队的其他成员来说。如果你在组件中使用某个 Hook 来记忆化一个值，并传入一个空的依赖数组，那么返回的值就是稳定的。一个带有空依赖数组的记忆化 Hook 总是返回相同的值，因此可以认为它是稳定的。

想象一下这段代码，它来自一个未完成的组件，其中我们把所有依赖项都列了出来，即使其中一些是已知稳定的。这样一来，代码就会变得更冗长，牺牲了简洁性和可读性。

```jsx
function Panel() {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((open) => !open), [setOpen]);
  useEffect(() => {
    // Some effect here
    toggleOpen();
  }, [toggleOpen]);
  // ...
}
```

在这里，我们把 setOpen 列为了依赖项，尽管（正如刚才讨论过的）我们可以跳过它，因为它是已知稳定的，永远不会改变。然而，如果你查看前面那个组件中的代码，由于存在一个依赖数组，你并不能一眼看出这个副作用只在挂载时运行。你必须去追踪这个依赖项，检查它的来源，而这可能又会迫使你去查看另一组依赖项。

如果我们从 useCallback 钩子中省略掉 setOpen 这个依赖项，就会发现 toggleOpen 现在是一个稳定的值，因为它是在一个带有空依赖数组的记忆化钩子中被定义的。这个值在整个组件的生命周期内也永远不会改变，因此我们也可以从 effect 钩子的依赖数组中省略掉 toggleOpen。我们可以像下面这样大幅简化这个组件：

```jsx
function Panel() {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((open) => !open), []);
  useEffect(() => toggleOpen(), []);
  // ...
}
```

这个版本更容易阅读和理解，因为你一眼就能看出这两个 Hook 由于依赖数组为空，都只会运行一次。

### 3.3.4 获取帮助以维护依赖数组

维护依赖数组可能会相当麻烦。比如说，你在编辑某个副作用时，引用了组件接收到的某个属性，但却忘记更新依赖数组——整个组件就会开始出现奇怪的行为。

在第4章中，我们会讨论开发者工具。其中有一个工具叫ESLint，它有一条非常实用的规则，可以帮助你保持依赖数组的更新。如果你忘记将本应包含的依赖项添加进去，ESLint会直接在你的编辑器中报错。这个功能默认是开启的，所以只要安装该工具包就可以直接使用了。



# 4、使用开发者工具进行更好的代码维护

### 4.1.3 如何开始使用 ESLint

## 4.2 使用格式化工具提高生产力

### 4.2.1 Prettier 解决的问题

### 4.2.3 如何开始使用 Prettier

**步骤 1：将 Prettier 添加为一个包**

**步骤 2：添加一个配置文件（可选）**

**步骤 3：在编辑器中强制格式化**

**步骤 4：在代码提交时强制格式化（可选）**

请注意，这一步是可选的；并非每个项目都需要它。根据你的设置和工具栈中的其他工具，有多种方法可以实现这一任务，其中最简单的方法之一是使用一个名为 **lint-staged** 的工具。

如果你已经在项目中运行了安装 **lint-staged** 的命令，它会自动检测到你已经设置了 Prettier，并会开始根据 Prettier 的规则验证更改的文件。如果还未安装，可以使用以下命令来安装 **lint-staged**：

```bash
npm install --save-dev lint-staged
```

**小贴士**：查看在提交前钩子中使用 Prettier 的其他选项列表，请参见此页面：[Prettier Precommit Options](https://prettier.io/docs/en/precommit.html)。

### 4.4.4 Using the profiler in React Developer Tools

117

# 5、TypeScript：高级 JavaScript

### 5.3.2 Typing children  

```tsx
import { type PropsWithChildren } from 'react';

function Heading({ children }: PropsWithChildren) {
...
}
```

### 5.3.3 Extending interfaces  

我们甚至可以通过传入多个字符串的联合类型来省略多个属性：

```typescript
Omit<ButtonProps, "size" | "color">
```

我们也可以反过来：只选择几个属性，这可能比省略多个属性更简单。假设我们只想从按钮组件中扩展 `color` 属性。我们可以通过省略 `size`、`onClick`、`disabled` 和 `className` 属性来实现这一点。但更简单的方法是只选择 `color` 属性，如下所示：

```typescript
Pick<ButtonProps, "color">
```

`Pick` 也是 TypeScript 提供的一个内置接口。在所有这些示例中，我们通过直接引用描述这些属性的接口来扩展另一个组件的属性。但是，如果我们没有该属性接口的引用，只有组件本身呢？请看下一节内容（通过一个小小的绕行）。

### 5.3.4 Spreading props in general  

有一个更好的方法：`ComponentProps`，它是 React 内置的。`ComponentProps` 是一个泛型接口，我们需要提供一个类型参数。这个类型参数是我们希望获取属性接口的组件类型。在我们的例子中，该组件是 `img`，因此我们将其作为字符串传入：

```typescript
import { type ComponentProps } from 'react';

interface UserImageProps extends ComponentProps<"img"> { ... }
```

然而，我们遇到了一个小问题：对于所有组件，这个接口还允许 `ref` 属性，但引用在组件内部并不是作为常规属性接收的（至少在 React 19 之前不是）。因此，将组件接收到的属性类型化为包含 `ref` 属性并不合理。我们将在 5.3.8 节中详细讨论引用的类型。稍微更长一些的接口 `ComponentPropsWithoutRef` 则正好解决了这个问题：

```typescript
import { type ComponentPropsWithoutRef } from 'react';

interface UserImageProps extends ComponentPropsWithoutRef<"img"> { ... }
```

现在，我们的组件可以完全正常运行，并接收正确的属性。请记住，我们也可以从该接口中使用 `Pick<>` 或 `Omit<>` 来允许或禁止特定属性。例如，如果我们不希望开发人员传入 `alt` 属性，因为我们将自己设置它：

```tsx
import { type ComponentPropsWithoutRef } from 'react';
interface UserImageProps extends
  Omit<ComponentPropsWithoutRef<"img">, "alt"> {
  name: string;
  title: string;
}

function UserImage({ name, title, ...rest }: UserImageProps) {
  return (
    ...
    <img
      alt={`Profile image for ${name}`}
      {...rest}
    />
    ...
  );
}
```

但是，如果我们正在扩展一个自定义组件，该怎么办？我们还能使用 `ComponentPropsWithoutRef` 吗？假设我们有一个第三方库的 `<Rating />` 组件，该组件接受类似于以下示例的属性（并且可能接受更多属性）：

```javascript
<Rating icon="♥" max={6} value={4.3} label="4.3 hearts" />
```

我们想创建一个新的 `BookReview` 组件，希望能够传入一些特定于书籍的信息，同时也传入一些 `Rating` 组件使用的相同属性，例如 `value`、`label` 和 `icon`。我们希望能够这样做：

```tsx
import { Rating, type RatingProps }
  from 'cool-rating-library';
interface BookReviewProps extends
  Pick<RatingProps, "value" | "label" | "icon"> {
  title: string;
  reviewer: string;
  body: string;
}

function BookReview({ ... }: BookReviewProps) {
...
```

在这个例子中，我们依赖外部库提供组件属性的类型。如果没有提供该类型，我们能使用 `ComponentPropsWithoutRef` 吗？直接使用是不行的，因为 `ComponentPropsWithoutRef<Rating>` 没有意义。这里 `Rating` 是一个真正的 JavaScript 变量，而不是一个 TypeScript 类型。

不过，我们可以采取一种简单的方法，使用 `typeof`：

```tsx
import { type ComponentPropsWithoutRef } from 'react';
import { Rating } from 'cool-rating-library';
type RatingProps =
  ComponentPropsWithoutRef<typeof Rating>;
interface BookReviewProps extends
  Pick<RatingProps, "value" | "label" | "icon"> {
...
```

让我们将这段代码扩展成一个完整的示例，以便可以进行实验。我们将自己创建两个组件，但不会对外公开 `Rating` 组件的 `props` 类型。此外，我们还会使用一些 CSS 来制作一个漂亮的评分显示。首先，我们从 `Rating` 组件开始。

### 5.3.5 Restricting and loosening types  

当我们扩展一个接口时，可以对接口进行约束，但不能放宽它。例如，如果我们有以下接口：

```typescript
interface Style {
  width: number | string;
}
```

可以通过扩展该接口并对其进行约束，例如限定为仅数字类型：

```typescript
interface NumberStyle extends Style {
  width: number;
}
```

但不能反向操作，放宽其定义为更广泛的类型：

```typescript
interface AnyStyle extends Style {
  width: number | string | null;
}
```

上述代码会导致以下 TypeScript 错误消息：

```
Interface 'AnyStyle' incorrectly extends interface 'Style'.
	Types of property 'width' are incompatible.
		Type 'string | number | null' is not assignable to type
		'string | number'.
			Type 'null' is not assignable to type 'string | number'.
```

### 5.3.6 Using optional and required properties  

在前面的示例中，我讨论了对类型的约束或放宽，并提到了向联合类型中添加或减少可选项。但我们还可以切换属性的另一个方面，即它是否为必需项。可以通过省略问号来创建一个必须提供的字符串输入：

```typescript
interface StringInputProps extends ComponentPropsWithoutRef<"input"> {
  value: string;
}
```

但反过来却行不通。假设我们想扩展之前的 `Rating` 组件，但使 `BookReview` 组件的 `value` 属性可选：

```typescript
interface BookReviewProps extends PickedRatingProps {
  value?: number;
}
```

此代码会导致类似于第 5.3.5 节中的 TypeScript 错误消息，因为我们实际上将类型扩展为了 `number` 或 `undefined`，这种放宽是不允许的，因此我们需要在重新定义之前先省略该属性。

有时，我们只想将特定属性设置为必填，而不是可选，但不希望更改类型的其他内容。假设我们想添加一个按钮，并必须定义 `onClick`。按钮的 `onClick` 属性的内置可选类型相当长：

```typescript
// 按钮 onClick 属性的内置类型
onClick?: React.MouseEventHandler<HTMLButtonElement>;
```

我们不想重复整个定义，只是去掉问号。所以可以直接引用旧定义，通过 `ComponentPropsWithoutRef` 来获取：

```typescript
type ButtonProps = ComponentPropsWithoutRef<"button">;
interface ButtonWithClickProps extends ButtonProps {
  onClick: ButtonProps["onClick"];
}
```

不过，这段代码会导致大量的输入，如果我们想对多个属性做同样的事情：

```typescript
type ButtonProps = ComponentPropsWithoutRef<"button">;
interface HoverButtonProps extends ButtonProps {
  onMouseOver: ButtonProps["onMouseOver"];
  onMouseMove: ButtonProps["onMouseMove"];
  onMouseOut: ButtonProps["onMouseOut"];
}
```

有一种更聪明的方法。TypeScript 有一个内置接口 `Required<>`，它使另一个类型的所有属性都变为必填。虽然这种行为并不是我们想要的，但我们可以用它来创建自己的工具接口，使某些属性变为必填：

```typescript
type RequireSome<T, K extends keyof T> = T & Required<Pick<T, K>>;
```

然后，我们可以更加优雅地创建 `HoverButtonProps`：

```typescript
type ButtonProps = ComponentPropsWithoutRef<"button">;
type RequireSome<T, K extends keyof T> = T & Required<Pick<T, K>>;
type HoverButtonProps = RequireSome<
  ButtonProps,
  "onMouseOver" | "onMouseMove" | "onMouseOut"
>;
```

你可能开始意识到 TypeScript 的强大。你可以仅通过使用类型来进行编程！

### 5.3.7 Using either/or properties  

146

### 5.3.8 Forwarding refs  

148

# 6、Mastering TypeScript with React  

## 6.1 在 TypeScript 中使用 React Hooks 

### 6.1.1 为 useState 添加类型

useState 钩子在进行类型标注时需要一条信息：即该钩子所存储状态的类型。有时这条信息很简单明了；但有时存储的数据类型会随时间变化，这时我们需要在初始化时告知钩子所有可能的类型，以便能够以类型安全的方式使用它。

### 6.1.2 为 useRef 添加类型

如果按照 6.1.1 节中的做法，这段代码基本上会按预期工作。但是，`useRef` 有一些意外之处。我们可以更简单地为第一个示例定义类型：

```javascript
const stringOrNullRef = useRef<string>(null);
```

`useRef` 针对特定情况有一个类型重载：如果类型参数中不包含 `null`，但初始化器为 `null`，则 `useRef` 会隐式地将类型参数扩展为允许 `null`。

但这里的陷阱在于，后者的定义是一个不可变引用。不可变引用可以传递给元素，因此类似下面的代码是可行的：

```javascript
const inputRef = useRef<HTMLInputElement>(null);
...
return <input ref={inputRef} />;
```

这个示例是 `useRef` 特殊重载的常见用例。我们可以在类型参数中省略 `| null`，并用 `null` 初始化 ref，一切都能如预期工作。但是，如果我们为可变状态创建引用，并希望直接更新该状态，例如在 effect 或回调中，这种方法将不起作用。

假设我们想创建一个组件，在光标位于组件内部时记录其位置，并在鼠标离开时清除该引用。我们可以实现如下组件：

```javascript
function MouseTracker() {
  const position = useRef<{ x: number; y: number } | null>(null);

  const onMouseLeave = () => {
    position.current = null;
  };

  const onMouseMove = (evt: MouseEvent) => {
    position.current = { x: evt.clientX, y: evt.clientY };
  };

  return (
    <div onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
      ...
    </div>
  );
}
```

请注意，我们在类型参数中使用了显式的 `| null` 来初始化该引用。如果我们省略这一部分，示例将无法正常工作——并非因为不允许 `null`，而是因为该引用将是不可变的，不允许直接更新，并会报以下错误：

```
Cannot assign to 'current' because it is a read-only property.
```

最好在类型参数中明确可变引用的可能值，以避免这种奇怪的行为。

### 6.1.3 为 Context 和 useContext 添加类型  

### 6.1.4 为 effects  添加类型



### 6.1.5 Typing reducers  

```typescript
export type Action =
  | { type: "up"; index: number }
  | { type: "down"; index: number }
  | { type: "first"; index: number }
  | { type: "last"; index: number };

export type ActionType = Action["type"];
```

你定义了一个 TypeScript 类型 `Action`，它是一个联合类型，包含四种不同类型的动作对象。每种动作对象都有一个 `type` 属性和一个 `index` 属性。接着，你定义了一个 `ActionType` 类型，它是 `Action` 类型中 `type` 属性的所有可能值的联合类型。

### 定义 `Action` 类型
```typescript
export type Action =
  | { type: "up"; index: number }
  | { type: "down"; index: number }
  | { type: "first"; index: number }
  | { type: "last"; index: number };
```

### 提取 `type` 属性的值
```typescript
export type ActionType = Action["type"];
```

### 解释
- `Action` 类型是一个联合类型，包含四种不同的动作对象。
- `Action["type"]` 是一个索引类型查询，它提取 `Action` 类型中所有成员的 `type` 属性的值。
- `ActionType` 是这些 `type` 属性值的联合类型，即 `"up" | "down" | "first" | "last"`。

### 6.1.6 Typing memoization hooks  

`useDeferredValue` 是 React 18 引入的一个 Hook，用于优化用户体验，特别是在处理大量数据或高频率更新的场景中。`useDeferredValue` 允许你延迟某些计算或渲染，从而让更重要的更新优先处理。

### 6.2.2 Memoizing a generic component  

## 6.3 使用 TypeScript 的缺点

## 6.4 TypeScript 资源  

# 7、CSS in JavaScript  

### 7.1.4 Why not inline styles?

disabled 按钮样式

```jsx
const DISABLED_STYLES = {
  opacity: 0.5,
  pointerEvents: "none",
};
```

190

### 7.3.3 Implementation with class names  

```jsx
  const classNames = [
    "button",
    outline ? "button--outline" : "",
    className,
  ].filter(Boolean);
```

这段代码定义了一个名为 `classNames` 的常量，用来动态组合 CSS 类名。以下是代码的解析：

### 代码功能

1. **类名数组：**

   ```javascript
   [
     "button",
     outline ? "button--outline" : "",
     className,
   ]
   ```

   - `"button"`：基础类名，始终存在。
   - `outline ? "button--outline" : ""`：根据 `outline` 的值是否为真，动态决定是否添加 `"button--outline"` 类名。如果 `outline` 为 `false`，则添加空字符串（即什么都不添加）。
   - `className`：外部传入的自定义类名，允许额外的类名动态传入。

2. **`.filter(Boolean)`：**

   - 过滤掉数组中的假值（如 `false`、`null`、`undefined`、空字符串等）。
   - 仅保留有效的类名，确保最终生成的类名字符串中没有多余的空格或无效值。

### 示例用法

假设：

- `outline` 为 `true`。
- `className` 为 `"custom-class"`。

则 `classNames` 的结果为：

```javascript
["button", "button--outline", "custom-class"]
```

最终可以通过 `join(" ")` 转换为：

```javascript
"button button--outline custom-class"
```

### 总结

这段代码是动态生成类名的一个常见模式，确保代码简洁且易于维护，是处理条件类名组合的优雅方案。

## 7.4 方法 2: CSS Modules  

这种方法是对常规 CSS 文件和类名方法的小扩展，解决了我在第 7.3.5 节中提到的一些问题。这个概念被称为 **CSS Modules**，它主要处理组件化和命名冲突的问题。CSS Modules 仍然使用 CSS 文件，编写方式与通常的 CSS 文件相同。但这些文件会被解析，类名会被提取并重新生成为新的唯一名称。其他方面的操作保持不变。

### 7.4.1 CSS Modules 是如何工作的

apulis 前端项目就是使用的这种方案。

```jsx
import styles from './index.less';

<Spin spinning={loading} delay={300}>
    <Tabs className={styles.tabs} onChange={onTabChange}>
        {panes}
    </Tabs>
</Spin>
```

### 7.4.2 CSS Modules 项目的设置

对 CSS Modules 的支持默认内建于任何 Vite 设置中。你所需要做的就是将你的 CSS 文件命名为 *.module.css，然后就可以正常使用了。
如果你没有使用基于 Vite 的设置，你需要找到一个与你的打包工具兼容的 CSS Modules 插件。对于 webpack，你可以使用 css-loader 插件，
而对于其他所有情况，你可以使用 postcss 和 postcss-modules 插件。

- css-loader—https://github.com/webpack-contrib/css-loader
- postcss—https://github.com/postcss/postcss
- postcss-modules—https://github.com/madyankin/postcss-modules  

## 7.5 方法 3: Styled-components  

Styled-components 是 CSS Modules 的自然延伸，将这一概念推进到了下一步。CSS Modules 使用 CSS 文件和类名，但这些类名是局部变量，而不是最终 CSS 中的类名。那么为什么不跳过类名这一步，直接创建已经应用了一组给定样式的元素，并在组件中直接使用这些元素呢？

### 7.5.1 Styled-components 是如何工作的

https://styled-components.com  



### 7.5.2 styled-components  项目的设置

对 styled-components 的支持并未内置在 Vite 中，但安装起来仍然非常简单。你只需要使用 npm 安装该模块：

```sh
$ npm install --save styled-components
```

然后你可以开始从该包中导入并在项目中使用它，就像我们在第 7.5.1 节中看到的那样。

### 7.5.3 Source code with styled-components  

### 7.5.4 styled-components  的优点

### 7.5.5 styled-components  的缺点

### 7.5.6 什么时候（不）使用 styled-components

Styled-components 非常适合具有许多一次性组件的复杂设计，但对于组件库或拥有统一和精简设计的网页应用程序（如仪表板和管理界面）来说，通常被认为不太理想。这个库非常多功能且受欢迎，所以使用它不会错，但在大型项目中承诺使用它之前，你可能想要考虑一下其他替代方案。

## 7.6 One problem, infinite solutions  

# 8、React 中的数据管理

# 9、Remote data and reactive caching  

Mock Service Worker (MSW for short)  

为了模拟真实的网页体验，我们将引入一个小但明显的服务器响应延迟。最初的简单解决方案虽然因为明显的延迟而不太理想——在延迟期间没有任何事情发生，但它确实可以工作。稍后，我们将讨论为什么反应式缓存可能是一个更好的解决方案，并最终使用 TanStack Query 重新实现整个应用程序，TanStack Query 是一个为 React 设计的反应式缓存和数据管理库。我们将从使用默认的基础设置来实现这个工具开始。最后，我们将介绍客户端缓存原则，这些原则将使依赖服务器的体验对用户来说更加流畅。

## 9.2 Adding a remote server to do goal tracking  

273

# 10、React单元测试

Vitest + React Testing Library.  

你可以使用多种工具来实现不同目标和层次的测试。在本章中，我们将讨论如何使用 Vitest 作为测试运行器，以及如何使用 React Testing Library 作为组件的黑盒测试框架。Vitest 是一个经常与 Vite 一同使用的较新的库，我们在示例中也使用了 Vite。Jest 是另一个测试库，在 React 测试中可能更为常用，但 Vitest 的 API 几乎与 Jest 完全相同，并且由于它与 Vite 的紧密集成而获得了大量关注。Vitest 和 Jest 都可以在没有 React Testing Library 的情况下独立使用，但 React Testing Library 已迅速成为标准，因为它配备了一套更好的工具和实用函数，并基于更优良的原则构建。我们将在第 10.1.3 节中重新审视这些原则。

所以，1-2-3 测试！

## 10.1 Testing a static component  

### 10.1.3 测试弹性



## 10.2 测试交互式组件  

### 10.2.1 测试有状态的组件

### 10.2.2 测试回调

### 10.2.3 测试表单

### 10.2.4 测试 a hook

## 10.3 Testing a component with dependencies  

### 10.3.1 模拟浏览器 API  

使用这种方法，你可以模拟组件可能从浏览器使用的任何 API，包括本地存储、网络请求（如 fetch）、电池状态和屏幕捕获。

### 10.3.2 Mocking a library  

**注意**：对于网络库，我建议使用 **Mock Service Worker (MSW)** 来模拟整个后端，而不是模拟网络库本身。这种方法更可靠且更具前瞻性，能更好地模拟 API 层。你可以回到第 9 章，了解 MSW 的工作原理。不过，本节介绍的方法仍然有效且有用。

### 10.3.3 Mocking a context  

# 11、React 网站框架

React 网站框架允许我们在服务器上运行 React。你可能会疑惑为什么想要这样做，而无论是简短的答案还是详细的解释都是：速度和性能。页面渲染得更快，网站的整体性能也变得更好。这些改进有助于访客留存、搜索引擎优化以及整体用户体验——并且很可能对你（或你的雇主）的经济效益也有正面影响。

在本章中，我将详细讲解这些技术细节，并讨论是什么使得 React 的服务器端渲染（SSR）通常更快。接着，我将演示如何使用两个流行的 React 网站框架——Next.js (https://nextjs.org) 和 Remix (https://remix.run)，来创建一个服务器端渲染的天气应用程序。

## 11.1 什么是网站框架?  

React 是一个 JavaScript 框架，而浏览器运行 JavaScript，因此浏览器可以运行 React。但除了浏览器之外的其他环境也可以运行 JavaScript，因此像网页服务器上的 Node 这样的其他环境也可以运行 React。

能够在任何支持 JavaScript 的环境中运行 React 是 React 网站框架的基石。你可以在服务器上运行 React，从而使用 React 作为模板语言在服务器端生成 HTML。在服务器上运行 React 给你带来了多个好处，包括但不限于以下几点：

- **全栈开发**：这种类型的开发使你能够在一个应用程序中构建整个网站，前端和后端合并在一起。你不需要有两个不同的项目、代码库，甚至不需要两个需要协调的不同团队。所有内容都一起构建，因此你可以获得最优的共存。你可以在单个文件中直接更改从数据库加载的内容以及它在最终 HTML 中的位置，即使这些事情分别发生在后端和前端。
  
- **服务器端渲染（SSR）**：通过 SSR，HTML 可以立即从服务器提供，这可以改善页面加载时间，进而可能提高访客留存率和搜索引擎排名。

- **动态内容**：由于你控制了整个堆栈，你可以无缝地将任何内容集成到你的网站中。你可以从数据库或外部 API 加载内容，甚至是那些通常不会放在前端应用程序中的某些秘密信息。框架会确保你的内容正确地从前端传递到后端；你无需做额外的工作。

- **URL 路由**：URL 路由允许你将 URL 用作导航的来源。大多数框架内置了复杂的路由规则，使得创建页面变得简单。

但这些好处附带了一个特定的要求：hydration（水合）。当客户端首次渲染 React 输出时，每一个字节的输出都必须与服务器端渲染的结果相匹配。

本节的其余部分将总体上涉及到这些概念。当我们理解了使一个 React 网站框架运转的关键因素后，我们将在第 11.2 节讨论两个候选框架。

### 11.1.1 Fullstack React as a concept  

当你引入全栈 React 时，你消除了所有这些问题，因为 React 同时运行在前端和后端。这些问题突然间消失了：

- 你可以将前端和后端作为一个单一的应用程序来开发，因此不需要花费太多时间考虑如何访问数据库或保存文件到永久存储。
- 你可以轻松地标记代码的哪些部分仅在客户端或仅在服务器端运行，因此可以毫不费力地将你的 API 密钥隐藏在服务器上。
- API 的担忧不复存在，因为你实际上是在同一个文件中使用数据编写前端和提供数据的后端。
- 深度链接变得微不足道，并且已经内置到平台中。

### 11.1.2 在服务器端渲染 HTML

使用服务器端渲染（SSR），我们在服务器上渲染完整的 HTML，这意味着我们运行整个 React 应用程序，并将所有正确的数据放入所有正确的组件中，然后对生成的 HTML 进行快照，并将这个 HTML 返回给浏览器。

幸运的是，答案是否定的。服务器端渲染只发生在第一个页面。之后，只有数据是从服务器加载的。因此，当我们为 SSR 编写组件时，我们将它们作为两个独立的部分来编写：一个组件和一个数据包。对于访问的第一个页面，这两个部分在服务器上结合，并与 JavaScript 应用程序一起返回。但对于后续的页面访问，每个页面只需要请求数据包，因为我们已经在浏览器中拥有了 React 应用程序（包括组件），所以我们只需要每个页面的数据。图 11.3 展示了一次网站访问的过程。

这个概念——每个页面都有两部分，即数据和 React 组件——是 React 网站框架运作方式的核心。那个数据部分可以包含各种动态内容，我们将在接下来的内容中讨论这一点。

### 11.1.3 动态内容

Prisma 是一个对象关系映射（ORM）库。本质上，这样的库是构建在 SQL（甚至是 NoSQL）之上的抽象层，它屏蔽了编写 SQL 查询的复杂性，而是使用简单的对象表示法来向数据库写入数据和从数据库检索数据。

Remix 强烈推荐使用 Prisma 作为数据库引擎，并且在许多可用的 Remix 示例应用程序中已经预安装了 Prisma。Next.js 则稍微开放一些，拥有使用其他框架的示例应用程序，但 Prisma 仍然是一个强烈推荐的选择，因此在本章以及第 12 章中，我们将使用 Prisma。

https://www.prisma.io  

### 11.1.4 Hydration is necessary  

图 11.4 中的步骤，即 React 同样渲染页面并将渲染的 HTML 与服务器生成的 HTML 进行比较的过程，被称为水合（hydration）。这个步骤对于获得服务器端渲染（SSR）所提供的性能提升非常重要。我们将在接下来的几个部分中讨论这些影响。

**ONLY PERFECT HYDRATION IS ALLOWED**  

为了确保水合（hydration）能够正确工作，必须保证服务器端和客户端的输出完全相同，精确到每一个字节。任何差异都会导致 React 报错。这种情况带来了几个后果，最明显的是你不能在应用程序中生成任何随机内容，因为这会影响输出的一致性。

例如，如果你想在一个英雄横幅中显示随机名言（或在你的博客上显示随机广告），你不能让 React 来做这个随机选择。这个随机选择必须在服务器端、React 之外进行，并以确定性的方式传递给 React。你需要将随机选择的结果包含在数据包中，而不是让 React 来选择（参见图 11.5）。

**WHAT'S THE PROBLEM WITH NONPERFECT HYDRATION?**  

你可能会疑惑为什么水合（hydration）必须做到像素级别的精确——为什么某些部分稍微不同就不能工作。这是因为 React 的设计就是这样；它是一个要么全部正确要么全部不正确的概念。

如果打破了这一原则，应用程序会崩溃吗？不会，应用程序不会因此崩溃。水合仍然会工作，但会带来性能上的惩罚。让我解释一下为什么会发生这种惩罚。

如果水合成功，React 启动得比平常更快，因为它不需要渲染到文档对象模型（DOM）——只需要检查差异（这比重新渲染要快）。但如果水合失败，React 会清除文档并从空白页面重新渲染整个页面，但这是在检查差异之后进行的，这使得过程变慢了——虽然不会慢很多，但确实更慢。另一个因素是 HTML 文件的大小。在传统的设置中，HTML 文件非常小，因为它几乎是空的。但是当它经过服务器端渲染后，如果页面复杂，HTML 文件可能会变得相当大。因此，只有当水合正确工作时，服务器生成的 React 才能获得性能提升。参见图 11.6 中的对比。

**关于部分水合（Partial Hydration）**

部分水合是一个相对较新的概念，它涉及到将内容拆分成更小的部分，这些部分可以独立地进行水合或不进行水合。这一主题相当复杂，超出了本书的讨论范围，但我想提一下，以防你有兴趣深入研究。

现代 React 开发中有许多进展都在这个领域，但它非常复杂，需要更多的介绍，而这些超出了本章能够提供的内容。诸如 React Server Components、流式内容交付、服务器端动作、污染对象等话题都是前沿 React 框架的一部分，而这些新功能大多归结于部分水合带来的好处。

**注**： React 18 中的一些新特性也与服务器端动作相关，随着 React 18 的采用，我们将看到 React 网站框架性能的重大改进。本书不会讨论这些新特性，而是专注于全水合。

## 11.2 实践

### 11.2.1 Next.js  

https://nextjs.org  

### 11.2.2 Remix  



### 11.2.3 Environment values and API keys  

341

### 11.3.3 存储本地数据

但 `localStorage` 仅在浏览器中工作，不在服务器上工作。

相反，我们可以使用 cookies。Cookies 在客户端和服务器端都能工作，因为它们在每次请求中都会被发送到服务器并从服务器接收。在每次请求中发送数据看起来似乎有些浪费，因此你能够存储的数据量比 localStorage 中要少很多。我们的示例中将待办事项数据存储在 localStorage 中的做法可能无法用 cookies 实现，因为我们很快就会超出 cookies 的存储空间。

使用 cookies，你会得到如图 11.15 所示的流程。

Cookie 在客户端和服务器端都可以被设置、读取、编辑和删除，因此它们非常适合我们的示例。在任意一端手动设置 Cookie 略显繁琐，但幸运的是，我们使用的两个框架都带有出色的工具来操作 Cookie。在 Remix 中，这一功能内置在核心中，而在 Next.js 中，一个名为 cookies-next 的实用库能完美地完成这项工作。

**COOKIES IN NEXT.JS**  

**COOKIES IN REMIX**  

### 11.3.4 Creating an API  

356

## 11.4 基于 React 的替代网站框架