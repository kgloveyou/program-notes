# 第3章 Basic Type Annotations  

## 基本类型

### BigInt  

bigint类型用于创建和处理非常大的或非常小的数字，这些数字由于JavaScript数值支持的限制，被视为不适合作为常规整数使用。

## unknown  类型



# 第10 章 Manipulating Types

## Utility Types

### Awaited

在最基本的用法中，`Await` 工具类型会解包一个包含 `ApiResponse` 对象的 Promise：

typescript

```typescript
type unwrappedApiResponse = Awaited<Promise<ApiResponse>>;
```

### Exclude  

### Extract  

### InstanceType  

### NonNullable  

`NonNullable` 工具类型可用于从联合类型中移除所有 `null` 或 `undefined` 类型：

typescript

```typescript
type CannotBeNull = NonNullable<string | null | undefined>;
```

在这种情况下，最终得到的 `CannotBeNull` 类型将简化为单纯的 `string` 类型，而不再是原来的联合类型 `string | null | undefined`。同样的规则也适用于 `string | null` 或 `string | undefined` 这样的联合类型。

### Omit  

`Omit` 工具类型允许我们：

1. 指定一个源类型
2. 提供该类型属性键的一个子集联合 然后生成一个新类型，这个新类型包含原类型的所有属性键，但排除了联合中指定的那些属性键。

### OmitThisParameter  

### Partial  

### Parameters  

`Parameters` 工具类型会根据传入的函数类型的参数列表，生成一个对应的元组类型。

我们可以向该工具类型传入一个函数，它会提取该函数接受的参数，并将其转换为元组类型。例如：

typescript

```typescript
type FnParams = Parameters<(a: string, b: number) => void>;
```

### Pick  

### Readonly  

`Readonly` 工具类型用于将一个所有属性都可读可写的类型，转换为所有属性都变为只读、初始化后不可修改的类型。

### Record  

### Required  

### ReturnType  

`ReturnType` 工具类型用于根据函数的返回值类型创建一个新的类型：

typescript

```typescript
type fnReturn = ReturnType<() => boolean>;
```

### ThisParameterType  

### ThisType  



# qianwen

## typescript中extends关键字的用法

在 TypeScript 中，`extends` 关键字有着多种用途，主要体现在类继承、接口扩展以及泛型约束这几个方面。下面详细介绍每种用法：

### 1. 类继承

使用 `extends` 关键字可以让一个类从另一个类继承属性和方法。

```typescript
class Animal {
    move() {
        console.log("Moving along!");
    }
}

class Dog extends Animal {
    woof(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("Woof!");
        }
    }
}

const myDog = new Dog();
myDog.move(); // "Moving along!"
myDog.woof(3); // "Woof!" x 3
```

在这个例子中，`Dog` 类通过 `extends` 继承了 `Animal` 类的所有属性和方法。

### 2. 接口扩展

`extends` 关键字也允许一个接口继承自一个或多个其他接口。

```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```

这里，`Square` 接口通过 `extends` 继承了 `Shape` 接口中的所有成员。

### 3. 泛型约束

`extends` 还可以用于为泛型设置约束条件，限制传入的类型参数必须符合一定的结构或行为。

```typescript
function identity<T extends { length: number }>(arg: T): T {
    console.log(arg.length);
    return arg;
}

identity([1, 2, 3]); // OK
identity({ length: 5, name: 'TypeScript' }); // OK
// identity(5); // Error: Argument type number is not assignable to parameter type { length: number }
```

在这个例子中，`T` 被约束为必须包含一个名为 `length` 的属性，因此只有那些满足这个条件的类型才能作为参数传递给 `identity` 函数。

### 4. 条件类型中的使用

正如之前提到的，在条件类型（Conditional Types）中，`extends` 关键字用来判断一个类型是否可以赋值给另一个类型，并据此决定返回哪一个分支的类型。

```typescript
type IsString<T> = T extends string ? true : false;
type Test1 = IsString<"hello">; // 结果是 true
type Test2 = IsString<5>; // 结果是 false
```

这种用法使得 TypeScript 能够基于类型关系执行更复杂的类型逻辑。

总之，`extends` 在 TypeScript 中是一个非常强大且多功能的关键字，它不仅支持传统的面向对象编程中的继承概念，还支持对泛型进行约束以及实现高级的类型操作。

## typescript 中 unknown类型

在 TypeScript 中，`unknown` 类型是一个特殊的类型，它表示任何类型的值，但与 `any` 类别不同，使用 `unknown` 类型的值时需要进行某种形式的类型检查或类型保护，这使得它比 `any` 更加安全。

以下是 `unknown` 类型的一些关键点：

1. **安全性**：当你有一个变量被声明为 `unknown` 类型时，在没有类型检查的情况下你不能对这个变量做太多事情。这意味着你需要执行类型断言或类型缩小来确认它的具体类型后才能进一步操作。

2. **赋值约束**：一个 `unknown` 类型的变量只能赋值给另一个 `unknown` 类型或者 `any` 类型的变量。如果要将其赋值给其他类型的变量，则必须先进行类型断言或类型缩小。

3. **类型缩小**：你可以通过条件语句、类型谓词（type predicates）、instanceof 操作符等方式将 `unknown` 缩小到更具体的类型。

例如：
```typescript
let value: unknown;

// 下面的代码会报错，因为 value 的类型是 unknown
// console.log(value.toString());

if (typeof value === "string") {
  // 在这个块中，value 已经被缩小为 string 类型
  console.log(value.toUpperCase());
}

function isString(test: unknown): test is string {
  return typeof test === "string";
}

if (isString(value)) {
  // 同样，在这个块中，value 被认为是 string 类型
  console.log(value.toUpperCase());
}
```

使用 `unknown` 可以帮助你在不知道数据具体类型的情况下编写更加健壮和类型安全的代码，同时强制你考虑类型检查，从而减少运行时错误的可能性。

### 在哪些场景下适合使用unknown类型？

`unknown` 类型在 TypeScript 中非常适合用于那些你希望限制任意值的使用场景，但同时又不想完全放弃类型检查。以下是几个适合使用 `unknown` 类型的典型场景：

1. **外部输入处理**：当你从外部源（如用户输入、文件读取、网络请求等）接收数据时，你可能无法确切知道或控制这些数据的结构和类型。在这种情况下，将这些数据的类型声明为 `unknown` 并根据需要进行类型检查可以增加代码的安全性。

2. **函数参数的灵活性**：如果你正在编写一个库或工具函数，该函数需要接受任意类型的参数，但你希望调用者明确地处理不同类型的输入，那么你可以使用 `unknown` 类型来强制执行这种行为。

3. **类型安全的默认值**：在某些情况下，你可能会定义一个变量但暂时不确定其具体类型，或者它可能不会被立即赋值。此时使用 `unknown` 作为类型，直到你能够确定它的实际类型并进行相应的类型检查。

4. **减少 `any` 的使用**：在你的代码中尽可能减少 `any` 类型的使用，并替换为更严格的 `unknown` 类型。这有助于确保所有的动态值都经过适当的验证和类型检查，从而提高代码的整体安全性。

5. **通用编程**：在编写泛型代码时，如果某个泛型参数不希望对传入的类型做任何假设，而是希望由调用者来决定如何处理这个类型，那么可以考虑使用 `unknown` 作为默认类型。

例如，在处理来自 API 的响应时：
```typescript
function handleApiResponse(response: unknown) {
    if (typeof response === 'object' && response !== null && 'data' in response) {
        // 现在可以安全地访问 data 属性了
        console.log((response as { data: any }).data);
    }
}
```

通过这种方式，你可以在保持代码灵活性的同时，确保所有潜在的类型错误都能在编译期被捕获，而不是导致运行时错误。

## never类型

在 TypeScript 中，`never` 类型表示那些永远不会发生的值的类型。它是一种特殊的类型，通常用于以下几种情况：

### 主要用途

1. **函数无返回值（抛出异常或无限循环）**：
   - 当一个函数总是抛出异常而不返回正常值时，其返回类型可以是 `never`。
   - 如果一个函数进入了一个无法退出的循环（如无限循环），其返回类型也是 `never`。

2. **类型缩小到没有任何可能的值**：
   - 使用类型保护缩小类型后，如果最终没有可能的类型，则结果类型为 `never`。例如，排除所有可能的类型分支后的剩余部分。

### 示例

- **函数抛出异常**:
    ```typescript
    function throwError(message: string): never {
        throw new Error(message);
    }
    ```

- **无限循环**:
    ```typescript
    function infiniteLoop(): never {
        while (true) {}
    }
    ```

- **类型保护导致的 never**:
    ```typescript
    type A = string | number;

    function controlFlowAnalysis(a: A) {
        if (typeof a !== 'string' && typeof a !== 'number') {
            // 这里的 a 被推断为 never，因为 A 类型仅包含 string 和 number
            const exhaustiveCheck: never = a;
        }
    }
    ```

在这个例子中，`controlFlowAnalysis` 函数尝试处理 `A` 类型的所有可能性。如果传入的参数不属于 `A` 定义的任何一种类型（本例中的 `string` 或 `number`），则会试图将该参数赋值给 `never` 类型的变量 `exhaustiveCheck`。这有助于确保在进行模式匹配或者类型检查时覆盖了所有可能的情况，从而作为一种编译期的检查手段来避免遗漏某些类型的处理。

`never` 类型是 TypeScript 类型系统的一部分，旨在帮助开发者编写更加安全和明确的代码。通过正确使用 `never`，可以在编译期间捕获潜在的逻辑错误，提高代码质量。

## typescript中infer关键字

`infer` 关键字是 TypeScript 中用于在条件类型（Conditional Types）中进行类型推断的关键字。它允许你在类型系统层面提取出类型信息，特别是从函数签名、返回值或数组元素等复杂结构中提取类型。`infer` 通常与条件类型结合使用，以创建更具表达力和灵活性的类型操作。

### 基本用法

`infer` 的基本语法如下：

```typescript
type SomeType<T> = T extends SomePattern<infer U> ? U : never;
```

这里，`infer U` 表示如果 `T` 能够匹配模式 `SomePattern<...>`，则从中推断出类型 `U` 并使用它。如果 `T` 不符合该模式，则结果为 `never` 或其他指定的默认值。

### 实际应用例子

#### 1. 提取函数返回类型

可以使用 `infer` 来定义一个工具类型，用来获取任意函数类型的返回类型：

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getUser() {
    return { name: 'Alice', age: 30 };
}

type UserReturnType = ReturnType<typeof getUser>;
// 结果：{ name: string; age: number; }
```

#### 2. 提取函数参数类型

类似地，你也可以定义一个工具类型来提取函数的第一个参数类型：

```typescript
type FirstParam<F> = F extends (arg1: infer P, ...rest: any[]) => any ? P : never;

function log(a: string, b: number): void {}
type T1 = FirstParam<typeof log>; // 结果：string
```

#### 3. 提取Promise中的值类型

当你有一个返回 `Promise` 的异步函数时，你可以使用 `infer` 来提取这个 `Promise` 包装的具体类型：

```typescript
type PromiseValue<T> = T extends Promise<infer U> ? U : T;

async function fetchData(): Promise<{data: string}> {
    return { data: "Hello" };
}

type ValueType = PromiseValue<ReturnType<typeof fetchData>>;
// 结果：{ data: string; }
```

这些例子展示了如何利用 `infer` 和条件类型来创建强大的类型查询工具。通过这种方式，可以在编译时分析并提取复杂的类型信息，使得代码更加健壮且易于维护。`infer` 是 TypeScript 类型系统中一个非常强大且灵活的功能，能够帮助开发者构建更加智能和类型安全的代码库。