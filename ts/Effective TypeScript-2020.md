# Effective TypeScript-2020

# 第1章 认识 TypeScript

## 条款 1：了解 TypeScript 与 JavaScript 之间的关系

**需要记住的要点**

- TypeScript是JavaScript的超集。换句话说，所有的JavaScript程序已经是TypeScript程序了。TypeScript有一些自己的语法，因此一般来说，TypeScript程序并不是有效的JavaScript程序。



## 第 2 项：了解你正在使用哪些 TypeScript 选项

*tsconfig.json*  配置文件

```json
{
    "compilerOptions": {
        "noImplicitAny": true
    }
}
```

可以使用`tsc --init`生成。

要有效地使用它，你应该了解其中最重要的设置：`noImplicitAny` 和 `strictNullChecks`。

`noImplicitAny` 控制变量是否必须具有已知类型。

TypeScript 在有类型信息时最有用，因此你应该确保尽可能设置 `noImplicitAny`。

对于新项目，你应该从 `noImplicitAny` 开始，以便在编写代码时编写类型。 这将有助于 TypeScript 发现问题、提高代码的可读性并增强你的开发体验（参见第 6 条）。 仅当你将项目从 JavaScript 转换为 TypeScript 时才适合关闭 `noImplicitAny`（参见第 8 章）。



`strictNullChecks` 控制 `null` 和 `undefined` 是否是每种类型中的允许值。

如果你不希望允许`null`，你需要找出它来自哪里，然后添加检查或断言：

```ts
const el = document.getElementById("status");
el.textContent = "Ready"; // ~~ Object is possibly 'null'

if (el) {
  el.textContent = "Ready"; // OK, null has been excluded
}
el!.textContent = "Ready"; // OK, we've asserted that el is non-null
```

在TypeScript中，如果你确定一个表达式不会为null或undefined，你可以使用非空断言操作符`!`来去除这些类型。在你的例子中，你可以使用非空断言操作符来断言`el`不为null，然后给`textContent`属性赋值。

```typescript
el!.textContent = 'Ready'; // OK，我们断言el不为null
```

请注意，使用非空断言操作符需要谨慎，因为它会绕过编译器的类型检查。确保在使用非空断言操作符之前，你已经仔细考虑了代码的逻辑，并确信表达式不会为null或undefined。



`strictNullChecks` 对于捕获涉及 `null` 和`undefined`  的错误非常有帮助，但它确实增加了使用该语言的难度。 如果你正在开始一个新项目，请尝试设置 `strictNullChecks`。 但是，如果你不熟悉该语言或正在迁移 JavaScript 代码库，你可能会选择不使用它。 你当然应该在设置 `strictNullChecks` 之前设置 `noImplicitAny`。

如果你选择不使用 `strictNullChecks`，请留意可怕的`“undefined is not an object”`运行时错误。 每一个都提醒你应该考虑启用更严格的检查。 随着项目的增长，更改此设置只会变得更加困难，因此在启用它之前不要等待太久。

## 第 3 项：了解代码生成与类型无关

在高层次上，tsc（TypeScript 编译器）做了两件事：

- 它将下一代 TypeScript/JavaScript 转换为可在浏览器中运行的旧版 JavaScript（“转译”）。
- 它检查你的代码是否存在类型错误。

令人惊讶的是，这两种行为完全独立。换句话说，代码中的类型不能影响 TypeScript 生成的 JavaScript。由于执行的是这段 JavaScript 代码，这意味着你的类型不能影响代码运行的方式。
这有一些令人惊讶的含义，应该影响你对 TypeScript 能够做什么和不能做什么的期望。

### 带有类型错误的代码仍然可能生成输出

**编译和类型检查**

这可能是 TypeScript 周围一些随意用语的根源。人们通常会说他们的 TypeScript "不能编译"，意思是它有错误。但这在技术上并不准确！只有代码生成才是"编译"。只要你的 TypeScript 是有效的 JavaScript（通常即使不是），TypeScript 编译器都会生成输出。



在存在错误的情况下生成代码在实践中是有帮助的。如果你正在构建一个 web 应用程序，你可能会知道它的某个部分存在问题。但由于 TypeScript 会在存在错误的情况下生成代码，所以你可以在修复它们之前测试应用程序的其他部分。

在提交代码时，你应该力争零错误，以免陷入记住什么是预期错误或非预期错误的陷阱。如果你想在出现错误时禁用输出，可以在 *tsconfig.json* 中使用 `noEmitOnError` 选项，或者在构建工具中使用等效选项。

### 你无法在运行时检查 TypeScript 类型

```ts
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // ~~~~~~~~~ 'Rectangle' only refers to a type,
    // but is being used as a value here
    return shape.width * shape.height;
    // ~~~~~~ Property 'height' does not exist
    // on type 'Shape'
  } else {
    return shape.width * shape.width;
  }
}
```

`instanceof` 检查发生在运行时，但 `Rectangle` 是一种类型，因此它不会影响代码的运行时行为。 TypeScript 类型是“可擦除的”：编译为 JavaScript 的一部分只是从代码中删除所有`interfaces, types,`   和type annotations。

要确定你正在处理的shape 的类型，你需要一些方法在运行时重建它的类型。 在这种情况下，你可以检查是否存在 `height` 属性：

```ts
function calculateArea(shape: Shape) {
  if ("height" in shape) {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width;
  }
}
```

这是因为属性检查只涉及运行时可用的值，但仍然允许类型检查器将`shape`的类型细化为 `Rectangle`。

另一种方法是引入一个“tag  ”，以一种在运行时可用的方式显式存储类型：

```ts
interface Square {
  kind: "square";
  width: number;
}
interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if (shape.kind === "rectangle") {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width;
  }
}
```

这里的 `Shape` 类型是“标记联合（tagged union）”的一个示例。 因为它们使得在运行时恢复类型信息变得如此容易，所以标记联合在 TypeScript 中无处不在。



一些构造同时引入了类型（在运行时不可用）和值（存在）。 `class` 关键字就是其中之一。 将 `Square` 和 `Rectangle`定义成类将是修复错误的另一种方法：

```ts
class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width; // OK
  }
}
```

这是因为`class Rectangle`  引入了一个类型和一个值，而`interface`  只引入了一个类型。

The `Rectangle` in `type Shape = Square | Rectangle` refers to the *type*, but the `Rectangle` in `shape instanceof Rectangle` refers to the *value*.  

### 类型操作不能影响运行时值

假设你有一个可能是字符串或数字的值，并且你希望对其进行规范化，使其始终为数字。 这是类型检查器接受的错误尝试：

```ts
function asNumber(val: number | string): number {
  return val as number;
}
```

查看生成的 JavaScript 可以清楚地了解这个函数的真正作用：

```js
function asNumber(val) {
  return val;
}
```

没有任何转换发生。 `as number`  是一种类型操作，因此它不会影响代码的运行时行为。 要规范化该值，你需要检查其运行时类型并使用 JavaScript constructs  进行转换：

```ts
function asNumber(val: number | string): number {
  return typeof val === "string" ? Number(val) : val;
}
```

(`as number` is a *type assertion*. For more on when it’s appropriate to use these, see Item 9.)  

### 运行时类型可能与声明类型不同

这个函数能命中到最终的`console.log`吗？

```ts
function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log(`I'm afraid I can't do that.`);
  }
}
```

TypeScript 通常会标记死代码，但即使使用 `strict` 选项，它也不会抱怨这一点。 你怎么能命中这个分支？

关键是要记住 `boolean` 是声明的类型。由于它是 TypeScript 的类型，它在运行时被移除。在 JavaScript 代码中，用户可能无意中使用类似 "ON" 的值调用 `setLightSwitch`。

有纯 TypeScript 的方法来触发这个代码路径。也许函数被调用时传递的值来自于网络调用：

```typescript
interface LightApiResponse {
  lightSwitchValue: boolean;
}
async function setLight() {
  const response = await fetch("/light");
  const result: LightApiResponse = await response.json();
  setLightSwitch(result.lightSwitchValue);
}
```

你已经声明 `/light` 请求的结果是 `LightApiResponse`，但没有强制执行这一点。如果你误解了 API，而 `lightSwitchValue` 实际上是一个字符串，那么在运行时会将一个字符串传递给 `setLightSwitch`。或者在部署后，API 发生了变化。

当你的运行时类型与声明的类型不匹配时，TypeScript 可能会变得相当混乱，这是你尽量避免的情况。但请注意，一个值可能具有你声明的类型之外的其他类型。

### 你不能基于 TypeScript 类型重载函数

像 C++ 这样的语言允许你定义在参数类型上有区别的多个版本的函数。这被称为“函数重载”。由于你的代码的运行时行为独立于 TypeScript 类型，所以在 TypeScript 中是不可能使用这种构造的：

```ts
function add(a: number, b: number) {
  return a + b;
}
// ~~~ Duplicate function implementation
function add(a: string, b: string) {
  return a + b;
}
// ~~~ Duplicate function implementation
```

### TypeScript 类型对运行时性能没有影响

因为在生成 JavaScript 时类型和类型操作会被删除，所以它们不会影响运行时性能。 TypeScript 的静态类型是真正的零成本。 下次有人提供运行时开销作为不使用 TypeScript 的理由时，您将确切知道他们对这一说法的测试效果如何！

对此有两个警告：

- 虽然没有运行时开销，但 TypeScript 编译器会引入构建时间开销。 TypeScript 团队非常重视编译器的性能，编译通常非常快，尤其是对于增量构建。 如果开销变得很大，您的构建工具可能有一个“transpile only  ”选项来跳过类型检查。
- TypeScript 生成的代码为了支持较老的运行时可能会在性能上产生开销，与原生实现相比。例如，如果你使用生成器函数并且目标是 ES5，而 ES5 不支持生成器，那么 tsc 将会生成一些帮助代码以使其工作。这可能会导致与生成器的本地实现相比有一些性能开销。无论如何，这与发射目标和语言级别有关，仍然与类型无关。

## Item 4: 熟悉结构化类型

```ts
interface Vector2D {
  x: number;
  y: number;
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
  name: string;
  x: number;
  y: number;
}

const v: NamedVector = { x: 3, y: 4, name: "Zee" };
calculateLength(v); // OK, result is 5
```

有趣的是，您从未声明 `Vector2D` 和 `NamedVector` 之间的关系。 而且您不必为 `NamedVectors` 编写 `calculateLength` calculateLength 的替代实现。 TypeScript 的类型系统正在对 JavaScript 的运行时行为进行建模（第 1 项）。 它允许使用 `NamedVector` 调用 `calculateLength`，因为它的结构与 `Vector2D` 兼容。 这就是术语“结构类型”的由来。

### 要记住的事情

- 了解 JavaScript 是鸭子类型的，TypeScript 使用结构类型来对此建模：可分配给接口的值可能具有超出类型声明中明确列出的属性。 类型不是“密封的”。
- 请注意，类也遵循结构类型规则。 您可能没有您期望的类的实例！
- 使用结构类型来促进单元测试。

## 第 5 项：限制使用 any 类型

type assertions  `(as any)`  

# 第2章 TypeScript的类型系统

## 第 6 条：使用你的编辑器来询问和探索类型系统

当你安装 TypeScript 时，你会得到两个可执行文件：

- `tsc`，TypeScript 编译器
- `tsserver`，TypeScript 独立服务器

你更有可能直接运行 TypeScript 编译器，但服务器也同样重要，因为它提供*语言服务（language services）*。 这些包括自动完成、检查、导航和重构。 您通常通过您的编辑器使用这些服务。 如果您的未配置为提供它们，那么您就错过了！

## 第 7 项：将类型视为一组值

最小的集合是空集，它不包含任何值。 它对应于 TypeScript 中的 `never` 类型。 因为它的域是空的，所以没有值可以分配给一个 `never` 类型的变量：

```ts
const x: never = 12;
// ~ Type '12' is not assignable to type 'never'
```



```ts
interface Point {
  x: number;
  y: number;
}
type PointKeys = keyof Point; // Type is "x" | "y"
function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  // ...
}
const pts: Point[] = [
  { x: 1, y: 1 },
  { x: 2, y: 0 },
];
sortBy(pts, "x"); // OK, 'x' extends 'x'|'y' (aka keyof T)
sortBy(pts, "y"); // OK, 'y' extends 'x'|'y'
sortBy(pts, Math.random() < 0.5 ? "x" : "y"); // OK, 'x'|'y' extends 'x'|'y'
sortBy(pts, "z");
// ~~~ Type '"z"' is not assignable to parameter of type '"x" | "y"
```



您有时可以使用 `Exclude` 减去类型，但前提是它会产生正确的 TypeScript 类型：

```ts
type T = Exclude<string | Date, string | number>; // Type is Date
type NonZeroNums = Exclude<number, 0>; // Type is still just number
```



表 2-1. TypeScript 术语和集合术语

| TypeScript term  never  Literal type                         | Set term ∅ (empty set) Single element set                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Value assignable to T Value ∈ T (member of)                  |                                                              |
| T1 assignable to T2  T1 extends T2  T1 \| T2  T1 & T2  unknown | T1 ⊆ T2 (subset of) T1 ⊆ T2 (subset of) T1 ∪ T2 (union) T1 ∩ T2 (intersection) Universal set |

## 项目 8: 能够分辨符号属于类型空间还是值空间

## 项目 9: 优先使用类型声明而非类型断言

40