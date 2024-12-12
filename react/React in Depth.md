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

### 3.2.4 Memoization hooks in detail  

在本节中，我将详细介绍两个记忆化钩子的使用场景和最佳实践。简单来说，你可以使用 `useMemo` 来记忆化任何值，使用 `useCallback` 来特别记忆化函数。但什么时候应该进行记忆化？如何确保在必要时值能够正确更新？

**使用 `useMemo` 记忆化任何值**

这个钩子在渲染之间记忆化值，主要用于两个目的（也可以同时用于这两个目的）：

- 防止代价高昂的重新计算
- 保持引用相等

`useMemo` 接收一个函数和一个依赖项数组。如果自上次渲染以来依赖项数组中的任何值发生了变化，该函数就会执行，且函数的返回值将作为 `useMemo` 的返回值。如果自上次渲染以来依赖项数组中的值没有发生变化，那么 `useMemo` 会返回上一次渲染时的值（见图 3.4）。

**MEMOIZE FUNCTIONS WITH USECALLBACK**  

## 3.3 Understanding dependency arrays  

如果你指定了一个非空数组，钩子会在渲染时检测数组中任何一个值的变化。任何单个值的变化都会触发该钩子。React 使用**引用相等性**来判断值是否发生了变化。

>>**引用相等性**
>>
>>在 JavaScript（以及许多其他语言）中，值分为两类：**基本类型**和**复杂对象**。JavaScript 有七种基本类型（`number`、`bigint`、`Boolean`、`string`、`symbol`、`null` 和 `undefined`）以及一种复杂类型（`object`）。也许你会想，类、正则表达式、数组和函数呢？这些也被认为是对象（尽管在某种意义上类和函数可以视为函数，而函数是对象的一个子类型）。
>>
>>你可以使用三等号运算符 `===` 来比较值是否严格相等。普通的双等号运算符 `==` 会进行类型转换，因此 `"1" == 1` 为 `true`，而严格相等要求类型也相同。
>>
>>在比较两个基本类型的值时，如果它们代表相同的数据，即使是不同变量，它们也会被认为是严格相等的。例如，`2 === 1+1` 是 `true`。
>>
>>但对于复杂类型来说，严格相等表示**引用相等**。只有当对象是同一个对象时，才会被认为是相同的，更新其中一个也会同时更新另一个。因此，`{} !== {}` 和 `[] !== []`，即使我们分别比较的是两个空对象和空数组。它们不被认为是严格相等的，因为它们不是同一个对象（或数组），只是相似的数据结构。
>>
>>当我们说 React 使用**引用相等性**时，我们的意思是 React 会使用严格相等运算符（`===`）来比较值。因此，只有当对象或数组是指向同一个对象的引用时，React 才会认为它们是相同的，而不仅仅是包含相似数据的两个不同值。

### 3.3.1什么是依赖项？

钩子的依赖项是钩子中使用的所有变量和引用的一个子集。依赖项指的是任何在组件作用域内本地存在的变量，而不是组件作用域外也存在的变量。图 3.6 显示了一些示例。

依赖项包括在组件中定义的任何变量（如 `const`、`let` 或 `var`）、在组件内部定义的任何函数，以及传递给组件的任何参数（主要是属性，但也可能是转发的引用）。任何在组件外部定义或从其他文件导入的函数或变量对于钩子来说都不是相关的依赖项。最后，在钩子内部定义的任何变量也不是依赖项，因为它们不在外部组件中存在。

### 3.3.2 Run on every render by skipping the dependency array  

假设你希望你的效果在每次渲染时都执行，而不管组件重新渲染的原因是什么。也许你想跟踪所有的渲染以用于追踪或统计目的。你可以添加一个依赖项数组，列出所有存在的属性和状态值，这样在这些值中的任何一个发生变化时，效果都会被执行。

但是请记住，组件之所以重新渲染，也可能是因为其父组件重新渲染，而这种父组件触发的渲染可能没有任何属性或状态值的变化。因此，无论你在依赖项数组中放入多少个值，你的效果都不会在每一个可能的渲染中执行。

有一个简单的解决方案：跳过依赖项数组。根本不提供任何依赖项数组，这样你的效果将会在每次渲染时执行，无论渲染发生的原因是什么：

```javascript
function Component({ ... }) {
  useEffect(() => track('Component rendered'));
  ...
}
```

请注意，我们只向 `useEffect` 函数提供了一个参数。我们只是忽略了传递第二个参数。

你可能会问，为什么要在钩子中运行效果？为什么不直接像下面这样在内联中运行代码？

```javascript
function Component({ ... }) {
  track('Component rendered');
  ...
}
```

在效果钩子中执行跟踪函数是出于优化考虑。前面的 `track` 函数可能会稍慢，这个函数调用的响应性不应该阻塞组件的渲染。因此，通过在效果中运行这个函数，你将效果的执行与组件的渲染解耦。

**MEMOIZATION WITHOUT DEPENDENCIES IS MEANINGLESS**  

**NO DEPENDENCY ARRAY IS DIFFERENT FROM AN EMPTY ARRAY**  

### 3.3.3 Skip stable variables from dependencies  

85

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

### 6.1.2 Typing useRef  

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

### 6.1.3 Typing contexts and useContext  

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

215