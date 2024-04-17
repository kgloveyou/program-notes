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

您可能会遇到非空断言，它如此常用，以至于拥有特殊的语法：

```typescript
const elNull = document.getElementById('foo'); // Type is HTMLElement | null
const el = document.getElementById('foo')!; // Type is HTMLElement
```

当作为前缀时，! 表示布尔值的逻辑非操作。但是作为后缀时，! 被解释为断言该值非空。您应该像对待任何其他断言一样对待 !：它会在编译过程中被擦除，因此只有在您拥有类型检查器所缺少的信息并且可以确保该值非空的情况下才应该使用它。如果您无法确保，则应该使用条件语句来检查`null`  情况。



```typescript
interface Person { name: string; }
const body = document.body;
const el = body as Person;
// ~~~~~~~~~~~~~~ Conversion of type 'HTMLElement' to type 'Person'
// may be a mistake because neither type sufficiently
// overlaps with the other. If this was intentional,
// convert the expression to 'unknown' first
```

错误信息提示了一种解决方法，即使用`unknown`  类型 (Item 42)。所有类型都是未知类型的子类型，因此涉及未知类型的断言始终有效。这使您可以转换任意类型的值，但至少明确表示您正在执行可疑的操作！

```typescript
const el = document.body as unknown as Person; // OK
```

### 注意事项：

- 优先使用类型声明 (`: Type`) 而不是类型断言 (`as Type`)。
- 了解如何标注箭头函数的返回类型。
- 当您了解类型系统所不知道的类型信息时，请使用类型断言和非空断言。

## 第十条：避免使用对象包装类型 (String, Number, Boolean, Symbol, BigInt)

除了对象之外，JavaScript 还有七种原始值类型：strings、numbers  、booleans、null、undefined、symbol  和bigint  。前五种类型从一开始就存在。符号原始值是在 ES2015 中添加的，而大整数正在被最终确定中。

原始值与对象的区别在于原始值是不可变的，并且没有方法。你可能会反驳说字符串确实有方法：
```javascript
'primitive'.charAt(3)
```
输出："m"

但事实并非完全如此。实际上，这里有一些令人惊讶和微妙的事情。虽然字符串原始值没有方法，但 JavaScript 还定义了一个 String 对象类型，该类型具有方法。JavaScript 自由地在这些类型之间进行转换。当你在字符串原始值上访问像 charAt 这样的方法时，JavaScript 将其包装在一个 String 对象中，调用方法，然后将对象丢弃。

**记住以下几点**：

- 了解对象包装类型如何用于在原始值上提供方法。避免实例化它们或直接使用它们。
- 避免使用 TypeScript 对象包装类型。而是使用原始类型：string 而不是 String，number 而不是 Number，boolean 而不是 Boolean，symbol 而不是 Symbol，bigint 而不是 BigInt。

## 条目 11：认识到过量属性检查的限制

**记住以下几点**：

- 当你将对象字面量赋给一个变量或将其作为参数传递给函数时，它会经历过量属性检查。
- 过量属性检查是发现错误的有效方式，但它与 TypeScript 类型检查器通常进行的结构可赋性检查是不同的。混淆这些过程会让你更难以建立可赋值性的心理模型。
- 注意过量属性检查的限制：引入一个中间变量会移除这些检查。

## 条目 12：尽可能将类型应用于整个函数表达式

JavaScript（以及TypeScript）区分函数语句和函数表达式：
```typescript
function rollDice1(sides: number): number { /* ... */ } // 语句
const rollDice2 = function(sides: number): number { /* ... */ }; // 表达式
const rollDice3 = (sides: number): number => { /* ... */ }; // 也是表达式
```
在TypeScript中，函数表达式的一个优点是你可以一次性为整个函数应用类型声明，而不是单独指定参数和返回类型的类型：

```typescript
type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = sides => { /* ... */ };
```

如果你在编辑器中悬停在 `sides` 上，你会看到 TypeScript 知道它的类型是 `number`。在这样一个简单的例子中，函数类型并没有提供太多价值，但这个技术确实开启了许多可能性。

一种方法是减少重复。例如，如果你想写几个用于对数字进行算术运算的函数，你可以这样写：

```typescript
function add(a: number, b: number) { return a + b; }
function sub(a: number, b: number) { return a - b; }
function mul(a: number, b: number) { return a * b; }
function div(a: number, b: number) { return a / b; }
```
或者将重复的函数签名合并为单个函数类型：
```typescript
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;
```
这样的写法比之前少了更多的类型注解，并且它们被与函数实现分开。这使得逻辑更加清晰。你还获得了一个检查，即所有函数表达式的返回类型都是数字。

常见的函数签名通常由库提供类型。例如，ReactJS 提供了 MouseEventHandler 类型，你可以将其应用于整个函数，而不是将 MouseEvent 指定为函数参数的类型。如果你是一个库的作者，考虑为常见的回调提供类型声明。

除了更简洁外，将整个函数表达式进行类型注解而不是其参数使你获得了更好的安全性。当你编写具有与另一个函数相同类型签名的函数，或者编写多个具有相同类型签名的函数时，考虑是否可以将类型声明应用于整个函数，而不是重复参数和返回值的类型。

**记住以下几点**：

- 考虑将类型注解应用于整个函数表达式，而不是它们的参数和返回类型。
- 如果你反复编写相同的类型签名，请提取一个函数类型或查找现有的函数类型。如果你是一个库的作者，请为常见的回调提供类型。
- 使用 `typeof fn` 来匹配另一个函数的签名。

## 条目 13：了解 type 和 interface 之间的区别

一个接口可以扩展一个类型（稍后会解释一些注意事项），而一个类型也可以扩展一个接口：
```typescript
interface IStateWithPop extends TState {
  population: number;
}
type TStateWithPop = TState & { population: number; };
```
再次强调，这些类型是相同的。注意事项是，一个接口不能扩展一个复杂类型，比如联合类型。如果你想要这样做，你需要使用类型和 & 运算符。



然而，接口确实具有一些类型所没有的能力。其中之一是接口可以被增强。回到 State 的例子，你可以通过另一种方式添加 population 字段：

```typescript
interface IState {
  name: string;
  capital: string;
}
interface IState {
  population: number;
}
const wyoming: IState = {
  name: 'Wyoming',
  capital: 'Cheyenne',
  population: 500_000
}; // OK
```
这被称为“声明合并”，如果你以前从未见过它，这可能会让你感到惊讶。这主要用于类型声明文件（第 6 章），如果你正在编写这样的文件，你应该遵循惯例并使用接口来支持它。其思想是你的类型声明中可能存在用户需要填充的空白，这就是他们如何填充这些空白的方式。

TypeScript使用合并来获取不同版本JavaScript标准库的不同类型。例如，Array接口在lib.es5.d.ts中定义。默认情况下，这是你所获得的全部内容。但是，如果你将ES2015添加到tsconfig.json文件的lib条目中，TypeScript还将包括lib.es2015.d.ts。这将包括另一个Array接口，其中包含ES2015中添加的额外方法，例如find。它们通过合并添加到其他Array接口中。其结果是你得到了一个具有完全正确方法的单一Array类型。

合并不仅在声明中受支持，而且在常规代码中也受支持，你应该意识到这种可能性。如果确保没有人对你的类型进行增强是至关重要的，那么就使用type。

回到条目开头的问题，你应该使用type还是interface？对于复杂类型，你别无选择：你需要使用类型别名。但是对于可以以两种方式表示的更简单的对象类型，应该如何选择？为了回答这个问题，你应该考虑一致性和增强。你是否在一个一致使用接口的代码库中工作？那就坚持使用接口。它是否使用类型？那就使用类型。

对于没有已建立样式的项目，你应该考虑增强。你是否为API发布了类型声明？那么当API发生变化时，能够通过接口合并新字段对你的用户来说可能会很有帮助。所以使用接口。但是对于在项目内部使用的类型，声明合并可能是一个错误。所以更喜欢类型。

## 条目14：使用类型操作和泛型来避免重复自己

你也可以反过来进行。假设你有一个类型 State，它表示整个应用程序的状态，另一个类型 TopNavState，它只表示一个部分。
```typescript
interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}

interface TopNavState {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
}
```
与其通过扩展 TopNavState 来构建 State，你更希望将 TopNavState 定义为 State 中字段的一个子集。这样，你就可以保持一个单一的接口来定义整个应用程序的状态。

映射类型是类型系统中对数组字段进行循环的等效操作。这个特定模式非常常见，它已经成为标准库的一部分，被称为Pick：
```typescript
type Pick<T, K extends keyof T> = { [k in K]: T[k] };
```
（这个定义不是完全的，你会看到原因。）你可以这样使用它：
```typescript
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;
```

Pick 是一个泛型类型的例子。延续去除代码重复的类比，使用 Pick 相当于调用一个函数。Pick 接受两个类型参数 T 和 K，并返回一个新的类型，就像一个函数可能接受两个值并返回一个值一样。

另一种重复可能出现在带标记的联合类型中。如果你只想要一个标记的类型，该怎么办？
```typescript
interface SaveAction {
  type: 'save';
  // ...
}
interface LoadAction {
  type: 'load';
  // ...
}
type Action = SaveAction | LoadAction;
type ActionType = 'save' | 'load'; // 重复的类型！
```
你可以通过对 Action 联合类型进行索引来定义 ActionType，避免重复自己：
```typescript
type ActionType = Action['type']; // 类型是 "save" | "load"
```
当你向 Action 联合类型添加更多类型时，ActionType 将自动包含它们。这种类型与使用 Pick 得到的类型是不同的，后者会给你一个带有 type 属性的接口：
```typescript
type ActionRec = Pick<Action, 'type'>; // {type: "save" | "load"}
```

如果你正在定义一个可以初始化并稍后更新的类，那么update方法的参数类型将可选地包含与构造函数中的大部分相同的参数：
```typescript
interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}

interface OptionsUpdate {
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}

class UIWidget {
  constructor(init: Options) { /* ... */ }
  update(options: OptionsUpdate) { /* ... */ }
}
```
你可以使用一个映射类型和keyof从Options构造OptionsUpdate：
```typescript
type OptionsUpdate = {[k in keyof Options]?: Options[k]};
```
keyof接受一个类型，并给出其键的类型的联合：

```ts
type OptionsKeys = keyof Options;
// Type is "width" | "height" | "color" | "label"
```

映射类型 ([k in keyof Options]) 迭代这些键，并查找Options中相应的值类型。? 使每个属性变为可选的。这种模式也非常常见，并被规范库确定为 Partial：
```typescript
class UIWidget {
  constructor(init: Options) { /* ... */ }
  update(options: Partial<Options>) { /* ... */ }
}
```



重复和复制粘贴编码在类型空间中和值空间中一样糟糕。用于避免在类型空间中重复的构造可能不太熟悉，但学习它们是值得的。不要重复自己！
要记住的事情：

- DRY（不要重复自己）原则适用于类型，就像它适用于逻辑一样。
- 给类型命名，而不是重复它们。使用extends来避免在接口中重复字段。
- 建立对TypeScript提供的工具的理解，以在类型之间进行映射。这些工具包括keyof、typeof、索引和映射类型。
- 泛型类型是类型的函数等效物。使用它们来在类型之间进行映射，而不是重复类型。使用extends来约束泛型类型。
- 熟悉标准库中定义的泛型类型，如Pick、Partial和ReturnType。

## 条目 15：使用索引签名处理动态数据

TypeScript允许你通过在类型上指定索引签名来表示这种灵活的映射：
```typescript
type Rocket = {[property: string]: string};
const rocket: Rocket = {
  name: 'Falcon 9',
  variant: 'v1.0',
  thrust: '4,940 kN',
}; // OK
```
`[property: string]: string` 就是索引签名。它指定了三件事情：

你应该使用索引签名来处理什么？典型的情况是真正动态的数据。例如，这可能来自于一个CSV文件，其中你有一个标题行，并想将数据行表示为将列名映射到值的对象：

```typescript
function parseCSV(input: string): { [columnName: string]: string }[] {
  const lines = input.split("\n");
  const [header, ...rows] = lines;
  return rows.map((rowStr) => {
    const row: { [columnName: string]: string } = {};
    rowStr.split(",").forEach((cell, i) => {
      row[header[i]] = cell;
    });
    return row;
  });
}
```

在这种一般的情况下，事先无法知道列名是什么，因此索引签名是合适的。

如果使用索引签名的问题在于string类型过于宽泛，那么有几种替代方案。

一种方法是使用Record。这是一种泛型类型，它可以让你在键的类型上具有更大的灵活性。特别是，你可以传入string的子集：
```typescript
type Vec3D = Record<'x' | 'y' | 'z', number>;
// 类型 Vec3D = {
//   x: number;
//   y: number;
//   z: number;
// }
```
另一种方法是使用映射（mapped）类型。这使你可以为不同的键使用不同的类型：
```typescript
type Vec3D = {[k in 'x' | 'y' | 'z']: number};
// 与上面相同
type ABC = {[k in 'a' | 'b' | 'c']: k extends 'b' ? string : number};
// 类型 ABC = {
//   a: number;
//   b: string;
//   c: number;
// }
```

要记住的事情：
- 当对象的属性在运行时无法确定时，例如，如果你从CSV文件中加载它们时，请使用索引签名。
- 考虑将undefined添加到索引签名的值类型中，以更安全地访问。
- 在可能的情况下，更倾向于使用更精确的类型而不是索引签名：interfaces、Records或映射（mapped）类型。

## 条目 16：优先使用数组、元组和ArrayLike，而不是数字索引签名

JavaScript是一种以奇特闻名的语言。其中一些最臭名昭著的怪异之处涉及隐式类型转换：

如果类型不能说服你，也许性能可以：在大多数浏览器和JavaScript引擎中，对数组的for-in循环比for-of或C风格的for循环慢几个数量级。

这里的一般模式是，数字索引签名意味着你放入的内容必须是一个数字（除了for-in循环是一个明显的例外），但你取出的内容却是一个字符串。

如果这听起来让人困惑，那是因为确实如此！一般来说，没有太多理由将number作为类型的索引签名，而不是string。如果你想指定一个将使用数字索引的内容，你可能想使用数组或元组类型。使用number作为索引类型可能会让人误解，即数字属性是JavaScript中的一种特性，无论是对你自己还是对你代码的读者来说。

如果你反对接受一个Array类型，因为它们有许多其他属性（来自它们的原型），你可能不会使用，比如push和concat，那么这很好 - 你在进行结构化思考！（如果你需要恢复记忆，可以参考条目 4。）

如果你真的想要接受任意长度的元组或任何类数组的构造，TypeScript 有一个名为ArrayLike的类型可以使用：
```typescript
function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
  if (i < xs.length) {
    return xs[i];
  }
  throw new Error(`Attempt to access ${i} which is past end of array.`)
}
```
这只有一个长度和数字索引签名。在这种情况下很少见，但你应该使用它。但请记住，键仍然是字符串！
```typescript
const tupleLike: ArrayLike<string> = {
  '0': 'A',
  '1': 'B',
  length: 2,
}; // OK
```

要记住的事情：
- 了解数组是对象，因此它们的键是字符串，而不是数字。将数字作为索引签名是一种纯粹的TypeScript构造，旨在帮助捕获错误。
- 优先使用数组、元组或ArrayLike类型，而不是自己使用数字作为索引签名。

## 条目 17：使用readonly来避免与Mutation相关的错误

要记住的事情：
- 如果你的函数不修改其参数，则声明它们为readonly。这样可以使其合约更清晰，并防止在其实现中意外发生变异。
- 使用readonly来防止变异错误，并找出代码中发生变异的地方。
- 理解const和readonly之间的区别。
- 理解readonly是浅层的。

## Item 18: Use Mapped Types to Keep Values in Sync  

# 第3章 类型推断（Type Inference）

# 第8章 迁移到 TypeScript

本章提供了一些关于将JavaScript项目迁移到TypeScript的建议，以免失去理智并放弃这一努力。

将大型项目迁移到TypeScript可能并不容易，但它确实提供了巨大的潜在好处。一项2017年的研究发现，在GitHub上的JavaScript项目中修复的15%的错误可以通过TypeScript来预防。更令人印象深刻的是，AirBnb对六个月的事故分析发现，其中38%的事故可以通过TypeScript来预防。如果你正在组织中倡导使用TypeScript，这样的统计数据会很有帮助！进行一些实验并找到早期采用者也是如此。条目 59 讨论了在开始迁移之前如何尝试使用TypeScript。

由于本章主要涉及JavaScript，许多代码示例要么是纯JavaScript（不需要通过类型检查器），要么使用了更宽松的设置进行了检查（例如，关闭了 noImplicitAny）。

## 条目 58：编写现代JavaScript

### 使用 ECMAScript 模块

### 使用 Classes 而不是 Prototypes  

### 使用 let/const  而不是 var  

### 使用for-of或者Array方法而不是 for(;;)  

在经典的 JavaScript 中，你使用 C 风格的 for 循环来遍历数组：
```javascript
for (var i = 0; i < array.length; i++) {
  const el = array[i];
  // ...
}
```
在现代 JavaScript 中，你可以使用 for-of 循环代替：
```javascript
for (const el of array) {
  // ...
}
```
这样做不太容易出错，也不需要引入索引变量。如果你需要索引变量，可以使用 forEach：
```javascript
array.forEach((el, i) => {
  // ...
});
```
避免使用 for-in 循环来遍历数组，因为它有很多意想不到的问题（参见条目 16）。

### Use Compact Object Literals and Destructuring Assignment  

### 使用默认函数参数

### 使用 async/await 替代原始的 Promise 或回调

### 在 TypeScript 中不要使用"use strict"

在 TypeScript 输出的 JavaScript 中包含'use strict'是有一定价值的。如果设置了 alwaysStrict 或 strict 编译器选项，TypeScript 将以严格模式解析您的代码，并为您在 JavaScript 输出中放置'use strict'。

简而言之，在 TypeScript 中不要编写'use strict'。而是使用 alwaysStrict。