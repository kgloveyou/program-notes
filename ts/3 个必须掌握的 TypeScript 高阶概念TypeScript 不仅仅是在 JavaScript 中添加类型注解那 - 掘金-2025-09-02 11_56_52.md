 

# 3 个必须掌握的 TypeScript 高阶概念

[CF14年老兵](/user/483440845143341/posts)

2025-08-25 471 阅读4分钟

关注

TypeScript 不仅仅是在 JavaScript 中添加类型注解那么简单——它是一个超集，能够帮助你编写更安全、更可预测、更易维护的代码。当你熟悉了基础语法后，往往会遇到一些需要“更强火力”的场景。本文将介绍三个强大的 TypeScript 概念（假设你已具备 TS 基础知识）：

* 递归类型
* 映射类型与条件类型
* 支持类型推断的工具类型



### 1\. 递归类型

你没看错，TypeScript 中同样存在递归。递归类型是一种用于描述可以包含自身的数据结构的方式，例如树、链表或深度嵌套的对象。

一个经典的例子是用于表示 JSON 数据的类型，它可以是字符串、数字、布尔值、JSON 值数组，或包含更多 JSON 值的对象。

```typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// 示例用法：
const data: JSONValue = {
  name: "Alice",
  age: 30,
  friends: [
    { name: "Bob", age: 31 },
    { name: "Carol", age: 28 }
  ],
  address: null
};

```

递归类型让 TypeScript 能够描述并约束复杂嵌套数据结构的形态，使其既强大又易于阅读和理解。

再看一个直观的例子：

```typescript
type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

// 示例用法：
const tree: TreeNode<string> = {
  value: "root",
  children: [
    {
      value: "child1",
      children: [
        { value: "grandchild1" }
      ]
    },
    {
      value: "child2"
    }
  ]
};

```

* * *

### 2\. 映射类型与条件类型

#### 2.1 映射类型

映射类型允许你通过转换现有类型的属性来创建新类型。你可以将所有属性变为可选、只读，或修改它们的类型。

```typescript
type User = {
  id: number;
  name: string;
  isActive: boolean;
};

// 将所有属性变为可选
type OptionalUser = {
  [K in keyof User]?: User[K];
};

// 将所有属性变为只读
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

```

TypeScript 内置了常用的映射类型，如 `Partial<T>`、`Readonly<T>` 和 `Record<K, T>`，我们稍后会进一步了解。

#### 2.2 条件类型

就像递归一样，条件判断在 TypeScript 类型系统中同样存在。条件类型让你可以根据其他类型来选择当前类型，类似于三元表达式，但作用于类型层面。

```typescript
interface Person {...}
interface User extends Person {...}
interface Bot {...}

type Visitor<T> = T extends Person ? User : Bot;

```

你可以使用条件类型构建灵活的 API、过滤类型或从类型中提取信息，从而实现高级的类型计算。

**过滤类型：**  
假设你想排除一个类型中所有字符串属性。下面的 `ExcludeStrings` 使用条件类型和 `as` 映射，过滤掉属性类型为字符串的键：

```typescript
type ExcludeStrings<T> = {
  [K in keyof T as T[K] extends string ? never : K]: T[K]
};

type User = {
  id: number;
  name: string;
  isActive: boolean;
};

type NonStringProps = ExcludeStrings<User>; 
// 结果: { id: number; isActive: boolean }

```

**从类型中提取信息：**  
获取函数的返回类型：

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type MyFunc = (x: number) => Promise<string>;
type Result = ReturnType<MyFunc>; // 结果: Promise<string>

```

**构建灵活 API：**  
创建一个能根据输入类型自适应输出类型的类型：

```typescript
type Flatten<T> = T extends Array<infer U> ? U : T;

type A = Flatten<number[]>;      // 结果: number
type B = Flatten<string>;        // 结果: string
type C = Flatten<boolean[][]>;   // 结果: boolean[]

```

* * *

### 3\. 工具类型

工具类型是 TypeScript 内置的用于操作类型的辅助类型：

* `Record<K, T>`：构建键为 K、值为 T 的对象类型
* `Omit<T, K>`：从类型 T 中移除指定的键 K
* `ReturnType<T>`：获取函数的返回类型
* `Parameters<T>`：获取函数的参数类型

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  friends?: string[];
  meta: {...};
}

type DisplayedUser = Omit<User, 'meta'>;

// 也可以通过联合类型一次移除多个属性
type LeanUser = Omit<User, 'friends' | 'meta'>;

type UserRecord = Record<number, User>;

const userRecord: UserRecord = {
  1: { id: '1', name: 'Alice', email: 'alice@example.com', friends: [...], meta: {} },
  2: { id: '2', name: 'Bob', email: 'bob@example.com', meta: {} },
};

```

类型推断与工具类型让你可以基于已有类型编写通用、可复用的代码，而无需额外定义新类型。

就我个人而言，`Partial`、`Record` 和 `Omit` 非常实用且高频出现，但工具类型远不止这些，每种都有其独特的适用场景。你可以在 TypeScript 官方文档中探索所有工具类型。

* * *

### 总结

以上概念可能不会每天用到，但在合适的场景中运用它们，能帮你省去大量纠结的时间，避免编写过度复杂或冗余的类型。

掌握这些高阶概念将帮助你更精确、轻松地建模数据，编写更清晰安全的代码，并构建出灵活的 API。

如果你觉得这些内容有帮助，或者你有使用这些模式（或其他模式/概念）的成功案例，欢迎在评论区分享！