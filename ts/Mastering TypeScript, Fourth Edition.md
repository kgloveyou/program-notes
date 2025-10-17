# Mastering TypeScript, Fourth Edition

# 4、泛型与高级类型推断

## 约束类型 T  

在大多数情况下，我们会希望限制类型 T，使其仅允许在泛型代码中使用特定的类型集合。这可以通过以下示例来最好地说明：  

```typescript
class Concatenator<T extends Array<string> | Array<number>> {
    public concatenateArray(items: T): string {
        let returnString = "";
        for (let i = 0; i < items.length; i++) {
            returnString += i > 0 ? "," : "";
            returnString += items[i].toString();
        }
        return returnString;
    }
}
```

这里我们定义了一个名为 `Concatenator` 的类，它使用了泛型语法，同时通过 `extends` 关键字将类型 `T` 约束为字符串数组或数字数组。这意味着，在代码中任何使用 `T` 的地方，`T` 只能被解释为字符串数组或数字数组。  这个类包含一个名为 `concatenateArray` 的方法，它有一个类型为 `T` 的参数 `items`，并返回一个字符串。

## 泛型约束（Generic Constraints）  

一个泛型类型可以基于另一个泛型类型构建。这种技术本质上是利用一个类型对另一个类型施加约束。我们来看一个示例：  

```typescript
function printProperty<T, K extends keyof T>(
    object: T, 
    key: K
) {
    let propertyValue = object[key];
    console.log(`object[${key}] = ${propertyValue}`);
}
```

在这个例子中，我们定义了一个名为 `printProperty` 的函数，它使用了两个泛型类型：`T` 和 `K`。其中，类型 `K` 被约束为通过 `keyof` 操作符从类型 `T` 计算得出的值。  需要记住的是，`keyof` 操作符会返回一个由对象属性组成的字符串字面量类型，因此 `K` 会被约束为类型 `T` 的属性名集合。换句话说，传入的 `key` 参数必须是 `T` 类型对象上实际存在的属性名，否则会在编译时报错。

## 在泛型中创建新对象  

有时，泛型类可能需要创建一个传入的泛型类型 `T` 的对象实例。请看以下代码：  

```typescript
class ClassA { }
class ClassB { }

function createClassInstance<T>(arg1: T): T {
    return new arg1(); // 错误：见下方说明
}

let classAInstance = createClassInstance(ClassA);
```

在这段代码中，我们定义了两个类：`ClassA` 和 `ClassB`。然后定义了一个使用泛型语法声明类型 `T` 的函数 `createClassInstance`。该函数有一个类型为 `T` 的参数 `arg1`，并返回类型 `T`。它的目的是创建传入参数（即 `arg1`）所表示的类的新实例。  

代码最后一行展示了我们期望如何使用 `createClassInstance` 函数：我们以 `ClassA` 的类定义作为唯一参数调用该函数。  

然而，这段代码会产生如下错误：  

```
error TS2351: This expression is not constructable.
Type 'unknown' has no construct signatures
return new arg1();
```

在这里我们可以看到，编译器不允许我们以这种方式构造类型 T 的新实例。这是因为此时类型 T 对于该函数来说实际上是未知的。

根据 TypeScript 文档，为了让泛型类能够构造类型 T 的对象，我们需要通过其构造函数来引用类型 T。因此，我们的 createClassInstance 函数需要重写如下：

```typescript
function createClassInstance<T>(arg1: { new(): T }): T {
    return new arg1();
}
```

在这里，我们修改了 arg1 参数，创建了一个匿名类型，该类型定义了一个 new 函数，并返回类型 T，即 arg1: { new(): T }。换句话说，arg1 参数是一个重载了 new 函数的类型，并返回 T 的一个实例。现在我们的代码将能够编译并按预期工作。

至此，我们完成了关于泛型的初步讨论。我们已经讨论了如何使用泛型语法、如何约束类型 T 的类型，以及泛型代码中哪些是可能的、哪些是不可能的。不过，泛型语法还允许我们通过映射类型和条件类型，将类型表示为其他类型的组合。我们将在本章下一节讨论这些语言特性。

## 高级类型推断

TypeScript 语言为我们提供了丰富的工具箱，让我们能够定义自定义类型、让类型相互继承，并使用泛型语法来处理任意多种不同类型。通过组合这些特性，我们可以开始描述一些非常高级的类型定义，包括基于其他类型的类型，或者基于某个类型的部分或全部属性的类型。我们还可以通过根据需要添加和删除属性来完全修改一个类型。

在本章的这一部分中，我们将探讨更高级的类型推断，包括条件类型、推断类型和映射类型，或者作者所描述的那样，"类型数学"。需要注意的是，高级类型使用的语法可能很快就会变得相当复杂难以阅读，但如果我们应用一些简单的规则，它就很容易理解。

请记住，尽管类型能帮助我们描述代码，也能帮助加固代码，但它们不会影响生成的 JavaScript。仅仅描述一个类型是一种理论上的练习，本章这一部分中的大部分"类型数学"仍然只会做一件事——指定一个类型。我们仍然需要在代码库中实际使用这些类型，才能实现它们的价值。

### 映射类型（Mapped Types）

我们已经知道，可以使用类型别名来定义一个特殊的命名类型，正如第 2 章“探索类型系统”中所讨论的。然而，当类型别名与泛型语法结合使用时，它的功能会更加强大，使我们能够基于其他类型来创建类型。再加上 keyof 关键字，我们就可以基于另一个类型的属性来创建新的类型。这最好通过以下示例来说明：

```typescript
interface IAbRequired {
  a: number;
  b: string;
}

let ab: IAbRequired = {
  a: 1,
  b: "test"
}
```

```typescript
type WeakInterface<T> = {
  [K in keyof T]?: T[K];
}

let allOptional: WeakInterface<IAbRequired> = {}
```

在这里，我们定义了一个名为 IAbRequired 的接口，它有两个属性：一个是类型为 number 的 a，另一个是类型为 string 的 b。然后我们创建了一个名为 ab 的对象实例，其类型为 IAbRequired，因此必须同时定义 a 和 b 属性，因为这两个属性都是必需的。

接着，我们创建了一个名为 WeakInterface 的类型别名，它使用泛型语法，使其可以与任意名为 T 的类型一起使用。这个类型别名还指定了第二个类型 K，它是在类型 T 上使用 keyof 关键字得到的。keyof 关键字的作用是，WeakInterface 类型将为类型 T 定义的每个属性都包含一个对应的属性。

但请注意，属性的定义方式，也就是 [K in keyof T]?，还使用了可选属性操作符 ?，并且每个属性的类型被定义为 T[K]。换句话说，返回类型 T 中名为 K 的原始属性的类型，但将其设为可选。

这意味着，我们定义了一个名为 WeakInterface 的类型，它接受一个名为 T 的类型，并将 T 中定义的每个属性都转换为可选属性。

代码片段的最后一行定义了一个名为 allOptional 的变量，其类型为 WeakInterface<IAbRequired>。因此，这使得 IAbRequired 接口中命名的所有属性都变为可选属性，我们的对象可以在不提供任何属性的情况下被构造出来。

还需要注意的是，即使我们将 IAbRequired 类型中的每个属性都设为可选，我们也不能定义该原始类型中不存在的属性。

### Partial, Readonly, Record 和 Pick  

我们最后要探讨的映射类型是 Record 映射类型，它用于动态构建一个类型。它几乎与 Pick 映射类型相反，使用一组提供的属性（以字符串字面量形式）来定义该类型必须具备哪些属性。请看下面的示例：

```typescript
type RecordedCd = Record<"c" | "d", number>;
let recordedCdVar: RecordedCd = {
  c: 1,
  d: 1
};
```

在这里，我们定义了一个名为 RecordedCd 的类型，它使用了 **Record** 映射类型，并提供了两个泛型参数。第一个泛型参数是一个字符串字面量联合类型，值为 `"c" | "d"`；第二个泛型参数是类型 `number`。**Record** 映射类型随后会创建一个新类型，该类型具有两个属性：`c` 和 `d`，它们的类型都是 `number`。

在代码片段的最后一行，我们可以看到如何使用这个新定义的 **RecordedCd** 类型。由于变量 **recordedCdVar** 的类型是 **RecordedCd**，它必须提供一个名为 `c` 的属性和一个名为 `d` 的属性，并且这两个属性的类型都必须是 `number`。

### 条件类型（Conditional Types）

在《第 2 章：探索类型系统》中，我们介绍了条件表达式的概念，其格式如下：

```typescript
(条件) ? (真值表达式) : (假值表达式);
```

这里有一个条件，后跟一个问号 `?`，然后是真值分支或假值分支，两者之间用冒号 `:` 分隔。我们也可以将这种语法用在类型上，从而形成所谓的 **条件类型（Conditional Type）**，例如：

```typescript
type NumberOrString<T> = T extends number ? number : string;
```

在这个例子中，我们定义了一个名为 **NumberOrString** 的类型，它使用了泛型语法，定义了一个类型参数 `T`。类型 `T` 的最终类型是由赋值符号 `=` 右侧的条件类型语句决定的。

### 条件类型的链式判断（Conditional Type Chaining）

与条件语句可以串联起来类似，**条件类型**也可以串联在一起，形成一个逻辑树，从而返回特定的类型。

我们来看一个稍微复杂一点的示例，它使用了这种技术：

```typescript
interface IA {
  a: number;
}

interface IAb {
  a: number;
  b: string;
}

interface IAbc {
  a: number;
  b: string;
  c: boolean;
}
```

这里我们定义了三个接口，分别命名为 **IA**、**IAb** 和 **IAbc**。其中：

- 接口 **IA** 具有一个属性 **a**，类型为 **number**；
- 接口 **IAb** 具有两个属性 **a** 和 **b**，类型分别为 **number** 和 **string**；
- 接口 **IAbc** 具有三个属性 **a**、**b** 和 **c**，类型分别为 **number**、**string** 和 **boolean**。

现在，我们来创建一个使用了条件类型链式判断的类型，如下所示：

```typescript
type abc_ab_a<T> =
  T extends IAbc ? [number, string, boolean] :
  T extends IAb ? [number, string] :
  T extends IA ? [number] :
  never;
```

在这里，我们定义了一个名为 **abc_ab_a** 的条件类型，它使用泛型参数 **T**。

其逻辑判断如下：

- 如果 **T** 是 **IAbc** 接口的类型（即 `T extends IAbc` 为真），则该条件类型返回一个元组类型：`[number, string, boolean]`；
- 如果 **T** 不是 **IAbc**，但它是 **IAb** 接口的类型（即 `T extends IAb` 为真），则返回元组类型：`[number, string]`；
- 如果 **T** 既不是 **IAbc** 也不是 **IAb**，但它是 **IA** 接口的类型（即 `T extends IA` 为真），则返回元组类型：`[number]`；
- 如果 **T** 不匹配以上任何一个接口，则返回 **never** 类型。

换句话说，这个条件类型根据传入的泛型参数 **T** 所符合的接口类型，返回一个对应结构（属性数量与类型）的元组。它通过一系列的 `extends` 条件判断，实现了类似“逻辑树”的效果，逐层筛选并返回不同的类型结果。

### 条件类型推导（Conditional Type Inference）

还有一种更高级、更专业化的条件类型用法，我们可以在条件类型语句中 推导出一个新的类型。这种带有类型推导的条件类型，最简单的形式可以通过以下示例来说明：

```typescript
type inferFromPropertyType<T> =
  T extends { id: infer U } ? U : never;
```

在这里，我们定义了一个名为 inferFromPropertyType 的类型，它使用了泛型参数 T。接下来，我们使用了一个 条件类型 来检查：类型 T 是否扩展自一个包含名为 id 的属性的对象。如果 **T** 是一个拥有属性 **id** 的对象类型，那么我们就 返回该 id 属性的类型本身。这是通过引入一个新的类型名称 **U** 并使用关键字 **infer** 来实现的。换句话说，我们在这里推导出了一个新的泛型类型 **U**，它的值就是对象 **T** 中 id 属性的类型。如果对象 **T** 没有 id 属性，那么我们就返回 **never** 类型。使用示例：

```typescript
function testInferFromPropertyType<T>(
  arg: inferFromPropertyType<T>
) { }
```

```typescript
testInferFromPropertyType<{ id: string }>("test");
testInferFromPropertyType<{ id: number }>(1);
```

我们定义了一个名为 testInferFromPropertyType 的函数，它使用泛型语法定义了一个名为 T 的类型。该函数有一个名为 arg 的单一参数，使用了我们的条件类型 inferFromPropertyType。需要注意的是，为了使用这个函数，我们必须在调用函数时指定 T 的类型，如代码片段中的最后两行所示。

在第一次调用 testInferFromPropertyType 函数时，我们指定 T 的类型是一个具有名为 id 的属性且该属性类型为 string 的对象。因此，我们推导出的类型取自 id 属性的类型。由于 id 属性的类型是 string，所以名为 arg 的参数必须是 string 类型。

第二次调用 testInferFromPropertyType 函数时，我们指定 T 的类型是一个具有名为 id 的属性且该属性类型为 number 的对象。因此，推导出的类型 U 就是 number 类型。

> 请记住，条件类型是基于作为输入给出的原始类型所计算出来的类型。这意味着，为了使用条件类型，我们需要提供一个输入类型，而条件类型将根据该输入类型为我们计算出来。

### 从函数签名进行类型推导

与我们可以基于对象属性定义推导类型的方式相同，我们也可以基于函数签名来推导类型。这些推导出的类型可以来自函数的参数，也可以来自函数的返回类型。让我们通过以下示例来看一下：

```typescript
type inferredFromFnParam<T> =
  T extends (a: infer U) => void ? U : never;
```

这里，我们定义了一个名为 inferredFromFnParam 的条件类型，它将从一个函数签名中的参数 **a** 推导出类型 **U**。该函数签名具有 **单个参数**，并返回 **void**。如果函数签名与 **extends** 子句中指定的内容不匹配——也就是说，它没有接受单个参数，或者没有返回 void——那么推导出的类型将是 **never**。

我们可以这样使用这个推导类型：

```typescript
function testInferredFromFnParam<T>(
  arg: inferredFromFnParam<T>
) { }

testInferredFromFnParam<(a: number) => void>(1);
testInferredFromFnParam<(a: string) => void>("test");
```

这里，我们有一个名为 **testInferredFromFnParam** 的函数，它接受一个参数，该参数的类型是我们定义的条件类型 **inferredFromFnParam** 所推导出来的结果。然后我们调用了这个函数两次，分别传入了两个不同的函数签名，用于计算这个条件推导类型。

在第一次调用 **testInferredFromFnParam** 函数时，我们传入了一个函数签名，该签名接受一个 **类型为 number 的参数**，并返回 **void**。因此，我们推导出的类型就是参数 **a** 的类型，在这个例子中是 **number**。所以，**testInferredFromFnParam** 函数实际接收一个 **类型为 number 的参数**。

在第二次调用 **testInferredFromFnParam** 函数时，我们传入了一个函数签名，该签名接受一个 **类型为 string 的参数 a**，并返回 **void**。因此，我们推导出的条件类型将解析为参数 **a** 的类型，在这个例子中是 **string**。

类似地，我们也可以从函数的返回类型中推导出一个类型，如下例所示：

```typescript
type inferredFromFnReturnType<T> =
  T extends (a: string) => infer U ? U : never;

function testInferredFromReturnType<T>(
  arg: inferredFromFnReturnType<T>
) { }

testInferredFromReturnType<(a: string) => number>(1);
testInferredFromReturnType<(a: string) => boolean>(false);
```

在这里，我们定义了一个条件推导类型 **inferredFromFnReturnType**，它会推导出类型 **U** 作为某个函数签名的返回类型。该函数签名接受一个 **类型为 string 的参数 a**。如果传入的函数签名与 **extends** 子句不匹配，则推导出的类型将是 **never**。

随后，我们定义了一个名为 **testInferredFromReturnType** 的函数，它定义了一个类型参数 **T**，并将其唯一参数 **arg** 的类型设置为 **inferredFromFnReturnType<T>** 所推导出来的类型。

### 从数组中进行类型推导

还有一种语法可用于推导类型，专门用于从数组中推断类型。这最好通过以下示例来说明：

```typescript
type inferredTypeFromArray<T> =
  T extends (infer U)[] ? U : never;

function testInferredFromArray<T>(
  args: inferredTypeFromArray<T>
) { }

testInferredFromArray<string[]>("test");
testInferredFromArray<number[]>(1);
```

在这里，我们定义了一个条件推导类型 **inferredTypeFromArray**，它检查类型 **T** 是否扩展自一个数组，即 **T extends []**。需要注意的是，这个 **extends** 子句通过在括号内包裹一个类型名称（即 **(infer U)**）的方式，在自身内部注入了一个被推导的类型 **U**。这意味着，类型 **U** 将会从数组本身的元素类型中推导出来。

代码片段的第二行定义了一个名为 **testInferredFromArray** 的函数，它使用了我们的条件推导类型，将类型 **T** 约束为该条件类型推导出来的结果。然后我们调用这个函数，并将 **T** 的类型设为 **string[]**（字符串数组）。这意味着，条件推导类型将解析为 **string**，因此参数 **args** 的类型也就是 **string**。

最后，我们又调用了一次这个函数，将 **T** 的类型设为 **number[]**（数字数组），因此参数 **args** 也必须为 **number** 类型。

### 标准条件类型

TypeScript 标准库中内置了一些非常实用的条件类型组合，这与我们之前看到的 **Partial** 和 **Readonly** 这类映射类型类似。下面我们来了解其中的三个标准条件类型：**Exclude**、**Extract** 和 **NonNullable**，示例如下：

```typescript
type ExcludeStringAndNumber = Exclude<
  string | number | boolean,
  string | number
>;
let boolValue: ExcludeStringAndNumber = true;
```

在这一示例中，我们使用了 **Exclude** 条件类型，它用于从一个联合类型中排除另一组类型。具体来说，`string | number | boolean` 排除了 `string | number`，最终得到的类型是 `boolean`。因此，变量 `boolValue` 的类型被推断为 `boolean`，并可以安全地赋值为 `true`。

在这里，我们定义了一个名为 **ExcludeStringAndNumber** 的类型，它使用了标准条件类型 **Exclude**。**Exclude** 条件类型接收两个泛型参数，它的作用是从第一个泛型参数所表示的类型集合中，排除第二个泛型参数所包含的类型。在这个例子中，我们指定要从类型联合 `number | string | boolean` 中排除 `number` 和 `string`。逻辑上，这样排除后就只剩下 `boolean` 是有效的类型，如代码片段最后一行所示。因此，类型为 **ExcludeStringAndNumber** 的变量 **boolValue**，只允许被赋值为 **boolean** 类型的值。

同样地，标准条件类型 **Extract** 会从一组类型中提取出另一组类型中的匹配项，如下例所示：

```typescript
type StringOrNumber = Extract<
  string | boolean | never,
  string | number
>;
let stringValue: StringOrNumber = "test";
```

在这里，我们定义了一个名为 **StringOrNumber** 的类型，它使用了标准条件类型 **Extract**。**Extract** 同样接收两个泛型参数（即两组类型）。该条件类型的作用是：从第一个泛型参数所提供的类型列表中，提取出所有与第二个泛型参数中的类型相匹配的类型。在我们前面的例子中，我们尝试从类型联合 `string | boolean | never` 中提取出 `string` 或 `number` 类型。逻辑上，唯一匹配的类型只有 `string`，这一点可以从代码最后一行看出：变量 **stringValue** 的类型为 **StringOrNumber**，它只能被赋值为 **string** 类型的值。

另一个标准条件类型用于从类型联合中排除 `null` 和 `undefined`。这个条件类型叫做 **NonNullable**，示例如下：

```typescript
type NotNullOrUndef = NonNullable<number | undefined | null>;
let numValue: NotNullOrUndef = 1;
```

在这里，我们定义了一个名为 **NotNullOrUndef** 的类型，它使用了条件类型 **NonNullable**，用于从一个给定的类型联合中提取出既不是 `null` 也不是 `undefined` 的类型。我们从类型联合 `number | undefined | null` 中移除了 `null` 和 `undefined`，最终只剩下 `number` 类型。因此，类型 **NotNullOrUndef** 最终会被解析为 `number` 类型，这一点可以从代码最后一行看出：变量 **numValue** 的类型为 **NotNullOrUndef**，并且只能被赋值为数字 `1`。



## 本章小结

在本章中，我们探讨了 **泛型（generics）** 的相关概念，包括 TypeScript 如何为泛型定义特定的语法，以及如何在某些情况下对泛型类型施加约束。随后，我们讨论了如何将泛型与接口结合使用，以及如何在泛型代码中创建新对象。本章的第二部分深入讲解了 **高级类型推导（advanced type inference）**，首先介绍了 **映射类型（mapped types）**，然后进一步探讨了 **条件类型（conditional types）**。我们讨论了 **分布式条件类型（distributed conditional types）**、**条件类型推导（conditional type inference）**，最后还介绍了一些随 TypeScript 标准安装即可使用的 **标准条件类型（standard conditional types）**。

在下一章中，我们将探索 JavaScript 编程中的 **异步特性（asynchronous language features）**，并学习如何利用 TypeScript 提供的特定语言结构来更好地处理异步编程。

