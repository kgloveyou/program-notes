# 网站

https://typescript-book.com/

# 第1章 TypeScript for Smashing People  

TypeScript 虽然功能强大，但也有些“害羞”。要释放它的全部潜力，我们必须明确邀请它告诉我们分析结果。只需在文件的最开头添加 `//@ts-check`，TypeScript 就会开始在那些逻辑不通的代码处标出红色波浪线。

# 第 2 课：追踪 Bug  

添加 `//@ts-check` 后，TypeScript 开始在我们的 JavaScript 文件中发挥作用，并列出了第一批问题。通常，代码编辑器不仅会以红色波浪线的形式提供视觉反馈，还会告诉你具体是什么问题。当你将鼠标悬停在有问题的代码上时，VS Code 会通过弹窗给出解释。但即使没有提示，你往往也能一眼注意到那些被高亮显示的问题。你使用 TypeScript 越多，它的提示就会越直观。

# 第 4 课：使用 JSDoc 添加类型

# 第5课：类型声明文件

虽然 JSDoc 能帮你解决很多问题，但有时候它也会显得有些笨重，尤其是当你想定义复杂的嵌套对象结构，或者在不同文件之间复用类型时。最终你会写出一大堆注释和子类型，很可能会让你的代码库变得更乱，而不是更有帮助。

为了更方便地定义自定义类型、描述全局函数接口，或者在 JavaScript 应用的不同部分之间共享类型，我们可以使用 类型声明文件（type declaration files）。

## .d.ts  文件

# 第 6 课：环境声明文件（Ambient Declaration Files）

## 自定义环境声明

TypeScript 是对的！仅仅依靠 isDevelopment 的存在，我们无法确定它的类型，这全凭“善意假设”。TypeScript 无法推断它到底是什么类型——是布尔值？字符串？复合对象？函数？还是 undefined？我们自己现在知道它是一个布尔值，但三个月后我们的同事还会知道吗？

为了让全局变量、函数等被 TypeScript 正确认知和约束，我们可以使用 **环境类型声明（ambient type declarations）**。这些类型是全局存在的，无处不在，包围着你的代码。

我们需要再创建一个 `.d.ts` 文件，把它放在和类型定义相近的位置，在这个文件里，我们可以定义程序中需要用到的函数签名、全局对象和变量。

接下来，我们在主 JavaScript 文件的旁边创建一个环境 `.d.ts` 文件，并在其中添加一行代码：

```typescript
declare const isDevelopment: boolean
```

我们再次进入了 TypeScript 的语言范畴。而且，你也能看到它与 JavaScript 之间存在一些相似之处。比如 `const isDevelopment` 这部分，是直接从 JavaScript 中照搬过来的写法。关键在于它前面的关键字 **`declare`**，它告诉 TypeScript：我们要声明某个东西是存在的，但并不提供其具体实现。由于这只是一个 **声明（declaration）**，所以我们 **不需要为其赋予具体的值**。

在 `const isDevelopment` 后面的部分是一个 **类型注解（type annotation）**，这里也小小地剧透了一下第 2 章的内容。通过 `: boolean`，我们明确告诉 TypeScript：`isDevelopment` 的类型是 —— 没错，就是布尔值（Boolean）！保存这一行代码后，`isDevelopment` 就会在 **你所有的 JavaScript 文件中成为已知且带有类型信息的常量**，TypeScript 就能基于此提供类型检查和智能提示等功能。

## 安装环境库声明（Ambient Library Declarations）

# 第 10 课

## 引入 unknown

值得庆幸的是，TypeScript 有一个与 any 配对的类型：unknown。unknown 同样兼容 TypeScript 中的每一种类型，因此它也是一个顶级类型（top type）。

但它同时也非常具有约束性。在 any 类型中我们可以做任何操作，而对于 unknown 类型，我们几乎什么都不能直接做。

unknown 应该会让你更加谨慎：我们必须提供合适的控制流逻辑，以确保类型安全。让我们看看把 any 换成 unknown 会发生什么：

```typescript
function selectDeliveryAddress(addressOrIndex: unknown): string {
  if (typeof addressOrIndex === 'number' &&
      addressOrIndex < deliveryAddresses.length) {
    return deliveryAddresses[addressOrIndex]
  }
  return addressOrIndex
}
```

Boom！这正是我们想要的效果：“类型 number 不能赋值给类型 string。”  我们必须进行类型检查并触发控制流分析，否则 TypeScript 就会报错！

```typescript
function selectDeliveryAddresses(addressOrIndex: unknown): string {
  if (
    typeof addressOrIndex === "number" &&
    addressOrIndex < deliveryAddresses.length
  ) {
    return deliveryAddresses[addressOrIndex];
  } else if (typeof addressOrIndex === "string") {
    return addressOrIndex;
  }
  return "";
}
```

控制流已经完整了。如果我们接收到的值是两种可能类型之一 —— number 或 string，我们就知道该怎么处理：要么返回配送地址列表中的对应项，要么直接返回刚刚传入的配送地址字符串。如果传入的是其他类型的值，我们就返回一个空字符串！

# 第11课：Typing Objects  

在前面的示例中，我们大量使用了基本类型：字符串、数字和布尔值。我们还学习了两个在JavaScript中不存在、但TypeScript及其类型系统独有的基本顶级类型：any 和 unknown。any 既自由又随意，将类型安全完全交由开发者掌控； 而 unknown 则需要更多的谨慎和关注。

# 第14课：接口（Interfaces）

在使用类型时，你迟早会接触到接口。当类被引入TypeScript时，接口也随之而来——它们是从当时流行的面向对象编程语言中继承过来的概念。

从历史上看，类和接口之间有着紧密的关系：接口描述了一个类的蓝图，即必须由相应类实现的结构性信息。这也引出了 implements 关键字的使用。

这听起来很像自定义对象类型与对象之间的关系。事实上，随着TypeScript的发展，接口与自定义对象类型几乎已经没有明显区别了。不过，它们之间仍然存在一些细微的差异。

## 声明合并（Declaration Merging）

乍一看，接口（interfaces）和类型（types）似乎完全一样。记住这一点，后面我们会看到对象类型的一些高级用法。你随时可以用接口替代对象类型。除了历史原因，它们还有什么区别呢？除了些许细微差别外，最大的不同就是**声明合并**。

接口的声明合并意味着：我们可以在同一个文件的不同位置多次声明同一个接口，并为它添加不同的属性，而TypeScript会把所有这些声明合并成一个完整的接口定义。

举个例子，我们可以基于之前定义的 ShopItem 接口，在完全不同的位置，为它扩展一个 reviews 数组属性：

```typescript
interface ShopItem {
  reviews: {
    rating: number,
    content: string
  }[]
}
```

只要加上这几行代码，就会导致我们文件中所有使用 ShopItem 的地方都报错，因为 reviews 属性不再是可选的，像 DVD 等商品对象也必须实现这个属性。

在同一文件内使用声明合并（declaration merging），虽然可行，但可能看起来有些不合常理。如果我们将所有属性都放在一个声明里，不是更清晰、更容易理解吗？当然！  

但有一种特殊的使用场景，声明合并就非常有意义了。回想一下第1章，我们在环境类型定义文件中定义了一个全局变量。  

在编写JavaScript时，我们经常会遇到这样一种情况：某些来自外部的变量、函数或类，会自动变成全局可用的。不仅仅是 isDevelopment 这样的标志位，还可能是某个分析脚本，让你可以获取网站使用情况的统计数据；或者是YouTube API，允许你在页面中嵌入并播放不同的YouTube视频。  

所有这些内容通常都会挂载到全局对象上。在浏览器中，这个全局对象就是 window。而 window 对象的定义，很大程度上是通过 Window 接口来完成的。  

那么，如果我们能从代码的任意位置扩展 Window 接口，让全局标志、API 和函数在任何地方都能直接使用，岂不是很棒？只需要短短几行代码就能做到：

```typescript
declare global {
  interface Window {
    isDevelopment: boolean
  }
}
```

首先，我们打开了全局命名空间（global namespace）。命名空间是模块化封装机制成熟之前的一种特性，主要用于将类型声明分散在多个文件中，比如那些全局可用的声明（如 window、document、navigator 等）。

命名空间声明本身也是可以合并的。

接下来，我们打开了 Window 接口。我们并没有覆盖整个类型定义，而是给它附加了一个自定义字段：类型为 boolean 的 isDevelopment。  有了这个声明之后，我们就可以在代码的任何地方，直接检查当前是否处于开发模式：

```typescript
class Discount {
  ...
  apply(article: Article) {
    ...
    // 在这里我们检查是否处于开发模式
    if (window.isDevelopment) {
      console.log('Another discount applied');
    }
  }
}
```

Window 接口通常会根据你 `tsconfig.json` 中设定的编译目标（compile target），紧密对应当前主流浏览器的实际状态。这意味着，你的浏览器中可能已经支持某些新特性，但 TypeScript 可能还没有为这些特性提供相应的类型定义，因此使用时可能会报错。

这是因为 TypeScript 在处理 Window 接口时，采用的是“最低公共兼容”的策略 —— 也就是只包含大多数浏览器都支持的特性类型，以确保最大兼容性。如果你想使用一些较新的浏览器特性（比如 ResizeObserver），而这些特性在 TypeScript 的默认类型中尚未提供，你可以先通过运行时判断该特性是否存在，再利用前面提到的 **声明合并（declaration merging）** 技术，为 Window 接口手动添加对应的类型定义，从而获得类型安全。我曾在我的个人网站 [Fettblog](https://fettblog.eu/) 上发表过一篇文章，详细介绍了如何为 Window 接口添加 ResizeObserver 的类型定义，以及如何安全地使用它。你可以参考那篇文章了解更多细节。

# 第15课：一个搜索函数

在 JavaScript 中，函数无处不在。在前面的几个例子中，我们也已经看到了一些函数。函数为 TypeScript 的“值创建空间”做出了贡献。

函数的参数有类型，默认是 any（任意类型），但也可以从默认值中推断出来；函数的返回值也有类型，通常可以从函数体中实际返回的值推断得出。

现在，我们要为我们的网站创建一个搜索框。当我们输入查询内容时，就会调用后端接口，获取 JSON 格式的搜索结果。在我们的程序中，我们将创建一个搜索函数，它接收查询参数，调用后端的搜索 API，并返回正确的结果。

## 函数头部（函数签名）的类型定义

让我们来看一下这个搜索函数的函数头部。我们使用了 declare 关键字，这样可以在**暂时不提供函数具体实现的情况下，让函数在类型层面可用**。这是一种非常好的方式，可以让我们**先专注于函数的类型定义和接口设计，而不用立刻关心具体实现细节**。

稍后，我们会移除 declare 关键字，并确保为该函数提供完整的实际实现。

```typescript
// A helper type with the results we expect
// from calling the back end
type Result = {
  title: string;
  url: string;
  abstract: string;
};
/**
 * The search function takes a query it sends
 * to the back end, as well as a couple of tags
 * as a string array, to get filtered results
 */
declare function search(query: string, tags: string[]): Result[];
```

## 异步后端调用

为了使我们的函数正确地支持异步操作，我们将使用 **Promise** 来处理异步任务。  Promise 是 JavaScript 中处理异步任务的主要机制。它们被称为“承诺”，是因为它们**承诺最终会解析（resolve）出一个值……只是我们不知道具体什么时候会完成**。最常用的基于 Promise 的异步操作之一就是 **fetch**，它是一种非常方便的调用后端并接收数据的方式。

让我们使用 fetch 来实现我们的搜索函数。  **移除函数头部的 declare 关键字**。我们不再是在声明一个函数（即只定义类型而不实现），而是在真正实现它。另外，**暂时移除函数声明中的返回值类型**。我们稍后会再添加上。

TypeScript 的一个优点是，你不需要把所有 API 都背下来。一旦你调用了 fetch，你的编辑器就会提示你可以传入哪些参数。当你在 then 回调里时，你也不必事先知道 response 对象有一个 .json() 方法。你可以浏览编辑器给出的建议列表，然后选择你认为最合适的那一个。很可能你会在看到 .json() 时停下，并心想：“啊，对，这就是我想要的。”

fetch 的返回值类型是 Promise<Response>。下一个 then 返回的是 response.json() 的返回值，这个值也自动成为了我们搜索函数的返回值类型。这就是类型推断的力量！

然而，`response.json()` 的返回值类型是 `Promise<any>`。这是有道理的！TypeScript 怎么可能知道你调用后端接口后会得到什么样的数据呢？而我们真正想要的就是：一个返回结果的 Promise。 用类型表示，就是：`Promise<Result[]>`

在这种情况下，我们必须**显式地指定类型**，有两种方式：

---

### 方式一：通过类型断言（Type Cast）

```typescript
function search(query: string, tags?: string[]) {
  ...
  return fetch(`/search${queryString}`)
    .then(response =>
      response.json() as Promise<Result[]>)
}
```

✅ 这样做是可以的，因为我们是在得到 `any` 类型的地方，**明确地指出它实际上是一个 `Promise<Result[]>`**。

---

### 方式二：通过在函数头部声明返回类型

```typescript
function search(
  query: string,
  tags?: string[]
): Promise<Result[]> {
  ...
  return fetch(`/search${queryString}`)
    .then(response => response.json())
}
```

✅ 这样做也是可以的，我们直接在**函数签名中声明返回值类型是 `Promise<Result[]>`**，那么 TypeScript 就能够根据上下文正确推断出 `response.json()` 的类型，无需额外进行类型断言。

这两种写法效果是一样的：因为 `any` 可以兼容任何其他类型。 它就像一个通配符，是一个“随遇而安”的类型，可以接受任何值。但我们在这里**明确地表示，我们期望得到的是一个 `Result` 数组，而不是 `any`**。而 TypeScript 也接受了这种明确的类型说明！

至于你选择哪种写法，取决于你自己。类型断言（type casts）写起来很快，而且可以在需要的地方直接使用，但有时可能会被忽略或不够显眼。  我个人更倾向于**在函数头部显式声明返回类型**，同时让函数体内的 JavaScript 代码保持原样，更加直观和清晰。

# 第 18 课：This 和 That

# 第 21 课：Generator  函数

在 JavaScript 中，有一种特殊的函数叫做 **生成器函数（generator function）**。生成器函数可以**中途退出，之后再重新进入继续执行**。它的核心思想是：这类函数可以**随着时间的推移逐步生成值**，这也是它名字的由来。

听起来可能非常复杂 —— 坦白说，它们确实不简单。但 **TypeScript 的类型信息** 在开发生成器函数时能给你提供很大帮助。而且，它的 **类型推断功能也非常强大！**

# 第 22 课: Modeling Data  

## Intersection  类型

我们称这个概念为 **交叉类型（intersection types）**。我们将 `&` 运算符读作“与”（and）。它的作用是把一个类型 A 的属性和另一个类型 B 的属性组合在一起，有点像是类的继承扩展。  最终得到的，是一个**同时拥有类型 A 和类型 B 所有属性的新类型**。

这样做最直接的好处是：我们可以把**共有的属性集中定义在一个地方**，这样后续的更新和修改就会变得容易很多。

此外，不同类型之间的**实际差异也会变得更加清晰、更易读**。每个子类型只需要关注它特有的那几个属性，而不必处理全部属性的完整列表。

## Union  类型

```typescript
type TechEvent = Webinar | Conference | Meetup;
```

我们将竖线运算符 `|` 读作“或”（or）。  通过它，我们得到的是一个新类型 —— 一个尝试涵盖我们在联合类型中设置的所有可能属性的类型。

# 第25课：动态联合类型

## Lookup Types  

```typescript
type TechEvent = Conference | Webinar | Meetup | Hackathon

// Doing the same thing on a type level
type EventKind = TechEvent['kind']
// EventKind is now
// 'conference' | 'webinar' | 'meetup' | 'hackathon'
```

## Mapped Types  

在我们这个例子中，我们希望键名 `hackathon`、`webinar`、`meetup` 和 `conference` 能够**自动生成**，并通过遍历 `EventKind` 联合类型，将它们映射到一个 `TechEvent[]` 列表上：

```ts
type GroupedEvents = {
  [Kind in EventKind]: TechEvent[]
}
```

我们把这种类型称为 **映射类型（mapped type）**。与具有明确属性名的普通对象类型不同，映射类型使用 **方括号 `[ ]` 来表示一个占位符，代表未来可能的属性键名**。  在这个例子中，这些属性键名是通过**遍历联合类型 `EventKind` 自动生成的**。为了更好地理解它是如何工作的，我们可以手动分几步来“展开”这个映射类型。  

```typescript
// 1. The original declaration
type GroupedEvents = {
  [Kind in EventKind]: TechEvent[];
};
// 2. Resolving the type alias.
// We suddenly get a connection to tech event
type GroupedEvents = {
  [Kind in TechEvent["kind"]]: TechEvent[];
};
// 3. Resolving the union
type GroupedEvents = {
  [Kind in "webinar" | "conference" | "meetup" | "hackathon"]: TechEvent[];
};
// 4. Extrapolating keys
type GroupedEvents = {
  webinar: TechEvent[];
  conference: TechEvent[];
  meetup: TechEvent[];
  hackathon: TechEvent[];
};
```

就像我们从原始类型中所得到的一样！映射类型不仅是一种便利，它能让我们写更少的代码，同时还能获得完整的类型提示和工具支持。  更重要的是，它为我们创建了一张精细的、相互关联的类型信息网络，使得我们能在数据发生变化的**瞬间捕获错误**。

一旦我们在技术活动列表中新增了一种活动类型，`EventKind` 就会**自动更新**，同时 `filterByKind` 函数也会获得更多类型信息；我们也知道 `GroupedEvents` 中会多出一个对应的条目，而 `groupEvents` 函数如果不返回新增的键就会**无法通过编译**，因为返回值缺少了对应的属性。而这些好处，我们**无需付出额外的成本**。我们只需要保持类型定义清晰，并建立必要的类型关联即可。

请记住，**手动维护类型很容易成为错误的源头，而动态更新类型则能帮助我们规避这些问题。**

# Lesson 26:Object Keys and Type Predicates

```typescript
type UserEvents = {
  watching: TechEvent[];
  rvsp: TechEvent[];
  attended: TechEvent[];
  signedout: TechEvent[];
};
```



## keyof  

```typescript
type UserEventCategory = "watching" | "rsvp" | "attended" | "signedoff";

function filterUserEvent(
  userEventList: UserEvents,
  category: UserEventCategory,
  filterKind?: EventKind
) {
  const filteredList = userEventList[category];
  if (filterKind) {
    return filteredList.filter((event) => event.kind === filterKind);
  }
  return filteredList;
}

```

这样做虽然可行，但我们仍然面临着和上一课相同的问题：我们是在手动维护类型，而这很容易出错，比如出现拼写错误等问题。这类问题往往很难被发现。或许你没有注意到，我犯了一个错误：在 UserEventCategory 中使用了值类型 signedoff，但它并不是 UserEvents 中的一个键。正确的应该是 signedout。

我们想要创建这样的类型，而 TypeScript 为此提供了一个专门的运算符。通过 keyof，我们可以获取我们定义的任何类型的对象键。我指的是任何类型。我们甚至可以对字符串字面量类型使用 keyof，从而获取该字符串上的所有字符串方法；也可以对数组类型使用 keyof，获取所有数组操作符：

```typescript
// 'speaker' | 'title' | 'abstract'
type TalkProperties = keyof Talk

// number | 'toString' | 'charAt' | ...
type StringKeys = keyof 'speaker'

// number | 'length' | 'pop' | 'push' | ...
type ArrayKeys = keyof []
```

得到的结果是一个值类型的联合类型。我们想要的是 UserEvents 的键，所以我们要这样做：

```typescript
function filterUserEvent(
  userEventList: UserEvents,
  category: keyof UserEvents,
  filterKind?: EventKind
) {
  const filteredList = userEventList[category];
  if (filterKind) {
    return filteredList.filter((event) => event.kind === filterKind);
  }
  return filteredList;
}

```

一旦我们更新了 UserEvent 类型，我们也就知道了应该期待哪些键。因此，如果我们移除了某个键，那些使用了已移除键的地方就会出现红色波浪线提示；如果我们新增了一个键，TypeScript 还会为我们提供相应的自动补全功能。

## Type Predicates  

这样的安全性已经足够，即使我们接收到无法处理的输入，程序也不会崩溃。但 TypeScript（尤其是在严格模式下）对此并不满意。我们会失去与 UserEvents 的所有类型关联，而且 category 仍然只是一个普通的字符串。在类型层面上，我们如何确保自己访问的是正确的属性呢？

这就是 **类型谓词（type predicates）** 的用武之地。类型谓词是一种为控制流分析添加更多信息的方式。我们可以通过告诉 TypeScript：**如果进行了某种检查，就可以确定变量属于某种特定类型**，从而扩展类型收窄（narrowing）的可能性。

下面就是一个例子：

```ts
function isUserEventListCategory(
  list: UserEvents,
  category: string
): category is keyof UserEvents { // 这就是类型谓词
  return Object.keys(list).includes(category)
}
```

类型谓词适用于返回布尔值的函数。如果该函数返回 true，我们就可以确信 category 是 UserEvents 的一个键。这意味着，在 if 语句的 true 分支中，TypeScript 能更准确地知道该变量的类型。我们将原本宽泛的字符串类型，收窄到了更小的集合——即 keyof UserEvents。

# 第27课：深入底层：never 类型  

在经历了各种类型的拓宽与收窄，甚至缩小到单个值也能成为一个类型之后，我们不禁要问：还能再窄一些吗？  

答案是：可以。有一种类型处于类型体系的**最底层**，它比只包含一个值的类型集合还要小，它是一个**不包含任何值**的类型，也就是**空集**：`never`。

## never 在控制流分析中的表现

`never` 的行为很像是 `any` 的反类型。`any` 可以接受所有值，并允许对这些值进行任意操作；而 `never` 则**完全不能接受任何值**。你**不可能给它赋值**，当然，对于一个永远不会有值的类型，也**不存在任何可执行的操作**。那么，当我们实际使用一个“没有任何值”的类型时，它到底是什么感觉呢？

我们之前其实已经简单接触过它，它就藏在显而易见的地方。让我们回到第24课，回想一下我们在编写 `getEventTeaser` 函数时所做的事情 —— 现在加上了 `Hackathon` 类型。

```typescript
function getEventTeaser(event: TechEvent) {
  switch (event.kind) {
    case "conference":
      return `${event.title} (Conference), ` + `priced at ${event.price} USD`;
    case "meetup":
      return `${event.title} (Meetup), ` + `hosted at ${event.location}`;
    case "webinar":
      return `${event.title} (Webinar), ` + `available online at ${event.url}`;
    case "hackathon":
      return `${event.title} (Hackathon)`;
    default:
      throw new Error("Not sure what to do with that!");
  }
}
```

这个 `switch` 语句遍历了联合类型 `EventKind` 中的所有可能值：`'conference'`、`'meetup'`、`'webinar'` 和 `'hackathon'`。在 `switch` 的每一个 `case` 语句中，TypeScript 都会从这个列表中移除一个已匹配的值类型。比如，当我们检查过 `'conference'` 之后，后续就不会再重复检查它了。

一旦这个列表被全部遍历完毕，我们的集合中就不再有任何剩余的值了。此时，这个列表就是空的。这正是我们 `switch` 语句中的 `default` 分支所代表的情况。

但是，如果我们已经检查过了列表中的所有可能值，那为什么还会进入 `default` 分支呢？这种情况难道不应该是错误的吗？

没错！这正是一种非常严重的错误，所以我们立即通过抛出一个新的错误来表明这一点！进入 `default` 分支的情况是**绝不可能发生**的。**永远不会！**

看，这里就出现了 `never` 这个词。这就是 `never` 类型的意义所在。它用来表示那些**不应该发生的情况**，提醒我们此时应该格外小心，因为我们的变量很可能并不包含我们所期望的值。

如果你拿上面的例子来说，在 `default` 分支的第一行输入 `event`，然后将鼠标悬停在它上面，TypeScript 就会明确地告诉你这一点。

对 `event` 进行的任何操作（除了作为被抛出的错误的一部分）都会导致编译器报错。这种情况**根本就不应该发生！**

## Preparing for Dynamic Updates  

借助 `never` 类型，我们可以为那些可能发生但绝不应该发生的情况设置一道安全防线。尤其是在开发应用时，处理那些随着代码逻辑不断变宽或收窄的值集合时尤其有用。

`never` 是所有其他类型的底类型（bottom type），在接下来的章节中，它会是一个非常实用的工具。

# 第28课: undefined 和 null  

`null` 和 `undefined` 都表示“没有值”。 `undefined` 表示一个变量或属性已经被声明，但尚未被赋予任何值；  而 `null` 则是一个空值，可以主动赋值，用于清空某个变量或属性。

## undefined and null in the Type Space  

## Strict null Checks  

# 第29课：我不知道我想要什么，但我知道怎么去得到它

## 进入泛型

## 泛型注解与泛型推断

## 现实中的泛型

# 第30课：泛型约束

## 定义边界

正如我们最初解释的那样，泛型的类型参数涵盖了整个类型集合：即任意类型。通过替换为特定类型，类型集合会变得更窄且更明确。

然而，我们可以定义边界，或者说类型空间的子集。这使得泛型类型参数在被实际类型替换之前就变得稍微狭窄一些。如果我们传递了一个不应该传递的对象，我们就能提前获得相关信息。

为了定义泛型子集，TypeScript 使用 `extends` 关键字。我们检查泛型类型参数是否扩展自某个特定的类型子集。如果我们只希望传递对象，我们可以从 `object` 类型进行扩展：

```typescript
function isAvailable<FormatList extends object>(
  obj: FormatList,
  key: string
): key is keyof FormatList {
  return key in obj;
}
```

通过 `<FormatList extends object>`，我们告诉 TypeScript 我们传递的参数至少需要是一个对象。所有原始类型甚至数组都被排除在外。

```typescript
isAvailable('A string', 'length')
```

红色波浪线出现在它们该出现的地方。

## 索引类型

正如我们在第 4 章中简要介绍的那样，索引类型非常适合这种场景。下面是一个我们之前见过的索引类型，它遍历一组联合类型，并且在这种情况下允许每个属性为任意值：

```typescript
type PossibleKeys = 'meetup' | 'conference' | 'hackathon' | 'webinar';
type Groups = {
  [k in PossibleKeys]: any;
};
```

索引类型不会定义具体的属性键。它们只是定义了一组它们会遍历的键。我们也可以接受整个字符串集合作为键。

```typescript
type AnyObject = {
  [k: string]: any;
};
```

一个能同时包含 VideoFormatURLs 和 SubtitleURLs 的完美结构。实际上还能适配任何其他 URL 列表！因此，这也是我们泛型类型参数的完美约束条件：

```typescript
type URLList = {
  [k: string]: URL  // 任意字符串键都对应 URL 类型的值
}

function loadFile<Formats extends URLList>(
  fileFormats: Formats,  // 强制要求传入符合 URLList 结构的对象
  format: string         // 动态格式标识符
) {
  // 函数实现...
}
```


这样一来，我们传入的任何不符合 URL 对象结构的对象，都会在编辑器里产生漂亮的红色波浪线警告。

# 第31课：处理键（Keys）

```typescript
// 3 Type Parameters

function loadFile<
  T extends { [k: string] : URL }, 
  K extends keyof T>(fileList: T, format: K): { format: K, video: string} {
    return {
      format,
      video: fileList[format].pathname
    }
}

loadFile(videoFormat, "format1080p")
```

# 第32课：泛型映射类型（Generic Mapped Types）

## Pick  

`Pick<O, K>` 用于从对象类型 `O` 中选取指定的属性键 `K`，生成一个只包含这些属性的新对象类型。它的定义如下：

```typescript
type Pick<
  O,          // 原始对象类型
  K extends keyof O  // 要选取的属性键，必须是 O 的合法键的子集
> = {
  [P in K]: O[P]  // 遍历 K 中的每个键 P，保留 O[P] 对应的类型
}
```

`[P in K]` 会遍历联合类型 `K` 中的所有值（即对象 `O` 的所有键）。`O[P]` 是一个索引访问类型，它的作用类似于通过键访问对象，但获取的是类型而非值。这种方式允许我们定义一个属于原始对象类型 `O` 的键的联合，并从原始对象中选取这些键及其对应的类型。

例如，以下是一个包含所有高清视频的类型：  
```typescript
type HD = Pick<
  VideoFormatURLs, 
  'format1080p' | 'format720p'  // 从 VideoFormatURLs 中选取这两个键
>;
// 等价于
type HD = {
  format1080p: URL,  // 键对应原类型中的 URL 类型
  format720p: URL
};
```

Pick 工具类型的最常见用途，类似于 Lodash 等库中提供的 `pick` 实用函数（用于从对象中选取指定属性）。但它也能应用于其他场景，我们将在后续章节探讨其中一些用例。

## Record  

## Mapped and Indexed Access Types  

# Lesson 33:Mapped Type Modifiers

## Partials  

`Optional<Obj>` 是 TypeScript 中的一个内置类型，实际上它就是 `Partial<Obj>`。  
它还有一个反向操作 `Required<Obj>`，该操作通过移除可选属性修饰符（`?`）来使所有属性都变为必选。其定义为：  

```typescript
type Required<Obj> = {
  [Key in keyof Obj]-?: Obj[Key]
}
```

## Readonly  