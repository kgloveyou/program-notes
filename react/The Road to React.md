# React 基础

## 属性处理（高阶）

### 面试问题

**问题：** 展开运算符（spread operator）创建的是对象的浅拷贝还是深拷贝？
**回答：** 展开运算符创建的是对象的浅拷贝，这意味着嵌套的对象仍然指向原始对象的引用。

**问题：** 为什么在 React Hooks（如 `useState`）中使用数组解构，而在处理 `props` 时使用对象解构？
**回答：** 像 `useState` 这样的 React Hook 返回的是一个数组，而 `props` 是一个对象；因此我们需要根据底层的数据结构应用相应的操作。`useState` 返回数组的好处在于，解构时可以给这些值任意命名。

## React 副作用

## React 自定义 hook（高级）

src/App.jsx  

```jsx
const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

const App = () => {
  // ...
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );
  // ...
}
```

## React 组件组合

95

## 命令式 React

命令式编程涉及提供明确的逐步指令，详细说明程序应如何执行任务。相比之下，声明式编程侧重于指定期望的结果，而不必指定每个过程步骤。声明式代码通常被认为更简洁、更易读且更易于维护。

102

## React 高级状态

useReducer Hook  

## React 中的第三方库

在该代码中，我们调用 axios axios.get() 来发起一个明确的 HTTP GET 请求¹⁹³，这与我们使用浏览器原生 fetch API 默认采用的 HTTP 方法相同。您也可以使用其他 HTTP 方法，例如 HTTP POST，通过 axios.post() 来实现。从这些示例中可以看出，axios 是一个功能强大的库，可用于向远程 API 发起请求。当请求变得复杂、需要兼容旧版浏览器或用于测试时，我建议优先使用 axios 而不是原生 fetch API。

# React 路线图

React的生态系统非常庞大。每年，我都会总结所有在React中可用于各种目的的[必备且流行的库²¹⁵](https://www.robinwieruch.de/react-libraries/)。你可以浏览这个列表，并尝试使用那些能提升你项目质量的库。我还为其中一些库撰写了专门的教程。

# React 中的样式设置

## React 中的 CSS 模块

## Styled Components in React  

借助CSS-in-CSS的先前方法，Styled Components是几种CSS-in-JS方法之一。我选择了Styled Components，因为它最受欢迎。它作为JavaScript依赖项提供，因此我们必须在命令行上安装它：

## React 中的 SVG

# React 维护

## React 中的性能（高级）

### 严格模式

在我们了解 React 中的性能之前，我们将简要了解一下 React 的严格模式，该模式会在 src/main.jsx 文件中启用：

src/main.jsx  

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

React 的严格模式²⁵⁰ 是一个辅助组件，可在我们的实现出现错误时通知开发者。例如，使用已弃用²⁵¹ 的 React API（如使用旧版 React 钩子）会在浏览器的开发者工具中向我们发出警告。不过，它也能确保开发者妥善实现状态和副作用。让我们在代码中体验一下这意味着什么。

App组件最初会从远程API获取数据，并以列表形式显示。我们使用React的useEffect钩子来初始化数据获取。现在，我建议你添加一个console.log()，以便在每次此钩子运行时记录日志：

src/App.jsx  

```jsx
const App = () => {
  // ...
  React.useEffect(() => {
    console.log('How many times do I log?');
    handleFetchStories();
  }, [handleFetchStories]);
  // ...
}
```

许多人会期望在浏览器的开发者工具中只看到一次日志记录，因为这个副作用应该只运行一次（或者如果 handleFetchStories 函数发生变化）。然而，你会在 App 组件的初始渲染中看到两次日志记录。老实说，这种行为非常出乎意料（即使是经验丰富的 React 开发者也会感到意外），这使得 React 初学者很难理解。不过，React 核心团队决定，这种行为对于发现应用程序中误用副作用相关的 bug 是必要的。

因此，React 的严格模式会在首次渲染时运行两次 React 的 useEffect 钩子。由于这会导致同一数据被获取两次，但这对我们来说并不是问题。这种操作被称为幂等操作，这意味着成功执行一次请求的结果与执行次数无关。毕竟，这只是个性能问题，因为涉及两次网络请求，但并不会导致应用程序出现错误行为。除了所有这些不确定性之外，严格模式仅适用于开发环境，因此每当此应用程序构建为生产环境时，严格模式会自动移除。

这两种行为——在首次渲染时运行 React 的 useEffect Hook 两次，以及在开发和生产环境中产生不同的结果——引发了围绕 React 的严格模式的诸多值得探讨的问题。

对于以下性能部分，我建议您通过简单地将其删除来禁用严格模式。这样，我们就可以跟踪该应用程序在构建为生产环境后将发生的日志记录：

src/main.jsx  

```jsx
createRoot(document.getElementById('root')).render(<App />);
```

不过，在性能部分结束时，我建议您重新启用严格模式，毕竟它就是为了帮助您的。

### 首次渲染时不要运行

```jsx
const useStorageState = (key, initialState) => {
  const isMounted = React.useRef(false);
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      console.log('A');
      localStorage.setItem(key, value);
    }
  }, [value, key]);
  return [value, setValue];
}
```

我们正在利用 ref及其可变的 current属性来进行命令式状态管理，而不会触发重新渲染。一旦该钩子在其组件中首次被调用（组件渲染时），ref的 current属性就会被初始化为一个名为 isMounted的布尔值 false。因此， useEffect中的副作用函数不会被调用；只有 isMounted的布尔标志会在副作用中切换为 true。每当该钩子再次运行时（组件重新渲染），副作用中会评估这个布尔标志。由于它已经是 true，副作用函数就会执行。在组件的整个生命周期中， isMounted布尔值将一直保持 true。它的存在是为了避免在首次渲染时调用使用我们自定义钩子的副作用函数。

### 如果不需要，就不要重新渲染

虽然传递给组件的所有 props 保持不变，但如果其父组件被迫重新渲染，该组件仍会再次渲染。这是 React 的默认行为，大多数情况下都能正常工作，因为重新渲染机制相当快速。然而，如果重新渲染降低了 React 应用的性能，React 的 memo API 可以帮助防止不必要的重新渲染。正如我们所见，有时仅使用 memo 并不能解决问题。在父组件中，每次都会重新定义回调处理函数，并将其作为已更改 props 传递给组件，这会导致组件再次重新渲染。在这种情况下，可以使用 useCallback，以确保回调处理函数仅在其依赖项发生变化时才会改变。

### 不要重新运行昂贵的计算

现在，我们已经了解了useMemo、useCallback 和memo 的这些场景，记住，这些并不一定需要默认使用。只有在遇到性能瓶颈时，才应用这些性能优化。大多数情况下，这种情况并不会发生，因为 React 的渲染机制默认就相当高效。有时，对memo 等实用工具的检查，其开销甚至可能比重新渲染本身还要大。

## React 中的 TypeScript

既然 TypeScript 已经能通过 React 的 `useState` Hook 推断出该类型，我们其实可以直接再次移除这个返回类型声明。但是，我们需要将返回的数组声明为 TypeScript 的 `const`（常量），因为如果不这样做，应用程序的其他部分将无法确定数组中各项的顺序。

src/App.tsx

```tsx
const useStorageState = (key: string, initialState: string) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue] as const;
}
```

不过，考虑到之前对自定义 Hook 进行的类型安全改进，我们并没有必要为函数体内的内部 React Hook 添加类型。这是因为开箱即用的情况下，类型推断在大多数时候都适用于 React Hook。如果 React useState Hook 的初始状态是一个 JavaScript 字符串原语，那么返回的当前状态将被推断为字符串，而返回的状态更新函数将仅接受字符串作为参数，并且不返回任何内容。

## React 中的测试

测试金字塔包括端到端测试、集成测试和单元测试。单元测试针对的是小型的、孤立的代码块，例如单个函数或组件。集成测试有助于我们了解这些代码块之间的协作效果如何。而端到端测试则模拟真实场景，比如用户登录一个Web应用程序。尽管单元测试编写和维护起来又快又简单，但端到端测试却恰恰相反。

要覆盖一个可用应用程序中的所有功能和组件，需要进行大量的单元测试；随后，通过若干集成测试确保最重要的各个单元能够协同工作。最后，再进行一些端到端测试，以模拟关键的用户场景。在本节中，我们将介绍单元测试和集成测试，以及一种名为快照测试的实用的组件特定测试技术。E2E测试也将是练习的一部分。

对于React新手来说，选择一个测试库可能是个挑战，因为选项很多。为了简化流程，我们将采用最流行的工具： **Vitest**²⁶⁶ 和 **React Testing Library**²⁶⁷（RTL）。Vitest是一个功能齐全的测试框架，具备测试运行器、测试套件、测试用例和断言等功能。RTL用于渲染React组件、触发鼠标点击等事件，以及从DOM中选择HTML元素以进行断言。我们将逐步探索这两种工具，从设置到单元测试再到集成测试。

### 测试套件、测试用例和断言

src/App.test.jsx  

```jsx
import { describe, it, expect } from 'vitest';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });
  it('false to be false', () => {
    expect(false).toBe(false);
  });
});
```

“describe”块是我们的测试套件，“it”块是我们的测试用例。请注意，测试用例可以不使用测试套件：

```jsx
import { it, expect } from 'vitest';

it('true to be true', () => {
  expect(true).toBe(true);
});

it('false to be false', () => {
  expect(false).toBe(false);
});
```

像函数或组件这样的大主题通常需要多个测试用例，因此将它们与测试套件一起使用是有意义的：

```jsx
describe('App component', () => {
  it('removes an item when clicking the Dismiss button', () => {
  });

  it('requests some initial stories from an API', () => {
  });
});
```

### 单元测试：函数

### 单元测试：组件

我们在上一节中使用Vitest测试了我们的第一个JavaScript函数。接下来，我们将通过单元测试单独测试我们的第一个React组件。因此，我们必须告知Vitest我们希望渲染React组件的无头浏览器环境，因为测试不会为我们启动真正的浏览器。然而，用React组件渲染的HTML最终必须出现在某个地方（例如无头浏览器），才能方便进行测试。执行此任务最流行的方式是安装 **jsdom**²⁷⁵，它充当我们的无头浏览器：



此外，我们将在测试中使用名为 react-testing-library (RTL) 的库来渲染 React 组件。我们也需要安装它：

### 集成测试：组件

React 测试库秉持着一个核心理念：它不是测试 React 组件的实现细节，而是测试用户如何与应用程序交互，以及应用程序是否按预期工作。这一点在集成测试中尤其强大。

### 快照测试

快照测试作为一种更轻量级的方式来测试 React 组件及其结构。本质上，快照测试会将你渲染出的组件输出（HTML 元素及其结构）创建为一个实例。在下一次测试中，该快照会与之前的快照进行比较，从而更详细地展示渲染出的组件发生了哪些变化，并显示测试因何差异而失败。你可以根据预期功能选择接受或拒绝源代码中的任何差异，直到组件按预期运行。

快照测试非常轻量，它不太关注组件的具体实现细节。让我们为我们的 `SearchForm` 组件执行一个快照测试：



Vitest 将快照存储在文件夹中，以便它可以针对未来的快照测试验证差异。用户可以使用 git 等版本控制平台跨团队共享这些快照。这就是我们确保 DOM 保持不变的方式。

快照测试有助于在 React 中快速设置测试，不过最好避免单独使用它们。相反，应将快照测试用于更新频率不高、复杂度较低且更容易比较组件结果的组件。

## React 项目结构