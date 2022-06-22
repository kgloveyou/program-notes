# Learning JavaScript Design Patterns

https://www.patterns.dev/posts/singleton-pattern/

## Design Patterns

### Hooks Pattern

With the `useEffect` hook, we can *"hook into"* a components lifecycle. The `useEffect` hook effectively combines the `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` lifecycle methods.

```jsx
componentDidMount() { ... }
useEffect(() => { ... }, [])

componentWillUnmount() { ... }
useEffect(() => { return () => { ... } }, [])

componentDidUpdate() { ... }
useEffect(() => { ... })
```

### 单例模式

`Object.freeze` 方法确保消费代码不能修改 Singleton。 无法添加或修改冻结实例上的属性，这降低了意外覆盖 Singleton 上的值的风险。

```js
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

#### 优/缺点

但是，上面示例中显示的类实现实际上是矫枉过正。 由于我们可以直接在 JavaScript 中创建对象，因此我们可以简单地使用常规对象来实现完全相同的结果。 让我们来介绍一下使用单例的一些缺点！

##### 使用常规对象

```js
let count = 0;

const counter = {
  increment() {
    return ++count;
  },
  decrement() {
    return --count;
  }
};

Object.freeze(counter);
export { counter };
```

#### 全局行为

但是，单例的常见用例是在整个应用程序中拥有某种全局状态。 让代码库的多个部分依赖同一个可变对象可能会导致意外行为。

通常，代码库的某些部分会修改全局状态中的值，而其他部分会使用该数据。 这里的执行顺序很重要：我们不想在没有数据要消费的时候（还）不小心先消费数据！ 随着应用程序的增长以及数十个组件相互依赖，使用全局状态时理解数据流可能会变得非常棘手。

#### React 中的状态管理

在 React 中，我们经常通过 **Redux** 或 **React Context** 等状态管理工具来依赖全局状态，而不是使用 Singletons。 尽管它们的全局状态行为可能看起来类似于单例，但这些工具提供了**只读状态**而不是单例的可变状态。 使用 Redux 时，只有纯函数 *reducer* 可以在组件通过*dispatcher*发送操作后更新状态。

尽管使用这些工具不会神奇地消除拥有全局状态的缺点，但我们至少可以确保全局状态按照我们的预期方式发生变化，因为组件不能直接更新状态。

### 代理模式（Proxy Pattern）

使用 Proxy 对象，我们可以更好地控制与某些对象的交互。 代理对象可以在我们与对象交互时确定行为，例如当我们获取值或设置值时。

一般来说，代理是指代他人。 你将与代表你尝试联系的人的代理人交谈，而不是直接与该人交谈。 JavaScript 中也是如此：我们将与 Proxy 对象进行交互，而不是直接与目标对象交互。

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  }
});

personProxy.name;
personProxy.age = 43;
```

代理可用于添加验证。 用户不应该能够将人的年龄更改为字符串值，或者给他们一个空名称。 或者如果用户试图访问对象上不存在的属性，我们应该让用户知道。

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(
        `Hmm.. this property doesn't seem to exist on the target object`
      );
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
  }
});
```

#### Reflect

JavaScript 提供了一个名为 `Reflect` 的内置对象，它使我们在使用代理时更容易操作目标对象。

以前，我们尝试通过使用括号表示法直接获取或设置值来修改和访问代理中目标对象的属性。 相反，我们可以使用 `Reflect` 对象。 `Reflect` 对象上的方法与处`handler`对象上的方法同名。

我们可以通过 `Reflect.get()` 和 `Reflect.set()` 访问或修改目标对象上的属性，而不是通过 `obj[prop]` 访问属性或通过 `obj[prop] = value` 设置属性。 这些方法接收与处理程序对象上的方法相同的参数。

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
});

personProxy.name;
personProxy.age = 43;
personProxy.name = "Jane Doe";
```

代理是添加对对象行为的控制的强大方法。 代理可以有各种用例：它可以帮助验证、格式化、通知或调试。

过度使用 Proxy 对象或对每个`handler`方法调用执行繁重的操作很容易对应用程序的性能产生负面影响。 最好不要将代理用于性能关键代码。

### 提供者模式(Provider Pattern)

在某些情况下，我们希望为应用程序中的许多（如果不是全部）组件提供可用数据。 虽然我们可以使用 props 将数据传递给组件，但如果应用程序中的几乎所有组件都需要访问 props 的值，这可能很难做到。

我们经常会得到一种叫做 prop 钻取的东西，当我们将 props 传递到组件树的很远的地方时就是这种情况。 重构依赖于 props 的代码几乎是不可能的，而且很难知道某些数据的来源。

```jsx
function App() {
  const data = { ... }

  return (
    <div>
      <SideBar data={data} />
      <Content data={data} />
    </div>
  )
}

const SideBar = ({ data }) => <List data={data} />
const List = ({ data }) => <ListItem data={data} />
const ListItem = ({ data }) => <span>{data.listItem}</span>

const Content = ({ data }) => (
  <div>
    <Header data={data} />
    <Block data={data} />
  </div>
)
const Header = ({ data }) => <div>{data.title}</div>
const Block = ({ data }) => <Text data={data} />
const Text = ({ data }) => <h1>{data.text}</h1>
```

以这种方式传递道具会变得非常混乱。 如果我们将来想重命名 data 属性，我们必须在所有组件中重命名它。 你的应用程序越大，属性钻取就越棘手。

如果我们可以跳过不需要使用这些数据的所有组件层，那将是最佳选择。 我们需要一些东西，让需要访问数据价值的组件直接访问它，而不依赖于属性钻取。

这就是提供者模式可以帮助我们的地方！ 使用**提供者模式**，我们可以使数据可用于多个组件。 我们可以将所有组件包装在 `Provider` 中，而不是通过 props 将数据向下传递到每一层。 Provider 是 `Context` 对象提供给我们的高阶组件。 我们可以使用 React 为我们提供的 `createContext` 方法创建一个 Context 对象。

```jsx
const DataContext = React.createContext()

function App() {
  const data = { ... }

  return (
    <div>
      <DataContext.Provider value={data}>
        <SideBar />
        <Content />
      </DataContext.Provider>
    </div>
  )
}
```

我们不再需要手动将 `data` prop 传递给每个组件！ 那么，`ListItem`、`Header` 和 `Text` 组件如何访问`data`的值呢？

通过使用 `useContext` hook，每个组件都可以访问数据。 这个hoook接收数据有引用的上下文，在这种情况下是DataContext。 useContext 钩子让我们可以读取和写入数据到上下文对象。

```jsx
const DataContext = React.createContext();

function App() {
  const data = { ... }

  return (
    <div>
      <SideBar />
      <Content />
    </div>
  )
}

const SideBar = () => <List />
const List = () => <ListItem />
const Content = () => <div><Header /><Block /></div>


function ListItem() {
  const { data } = React.useContext(DataContext);
  return <span>{data.listItem}</span>;
}

function Text() {
  const { data } = React.useContext(DataContext);
  return <h1>{data.text}</h1>;
}

function Header() {
  const { data } = React.useContext(DataContext);
  return <div>{data.title}</div>;
}
```

Provider 模式对于共享全局数据非常有用。 提供者模式的一个常见用例是与许多组件共享主题 UI 状态。

```jsx
import React, { useState } from "react";
import "./styles.css";

import List from "./List";
import Toggle from "./Toggle";

export const themes = {
  light: {
    background: "#fff",
    color: "#000"
  },
  dark: {
    background: "#171717",
    color: "#fff"
  }
};

export const ThemeContext = React.createContext();

export default function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className={`App theme-${theme}`}>
      <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
        <>
          <Toggle />
          <List />
        </>
      </ThemeContext.Provider>
    </div>
  );
}
```

#### Hooks

我们可以创建一个hook来为组件提供上下文。 不必在每个组件中导入 useContext 和 Context，我们可以使用一个hook来返回我们需要的上下文。

#### 案例分析

一些库提供了内置的providers，我们可以在消费组件中使用这些值。 一个很好的例子就是[styled-components](https://styled-components.com/docs/advanced).。

#### 优点

 Provider pattern/Context API 使得将数据传递给许多组件成为可能，而无需手动通过每个组件层传递数据。

#### 缺点

在某些情况下，过度使用Provider 模式会导致性能问题。 所有使用上下文的组件都会在每次状态更改时重新渲染。

为了确保组件不使用包含可能更新的不必要值的providers ，你可以为每个单独的用例创建多个providers 。

### 观察者模式

使用观察者模式，我们可以将某些对象（观察者）订阅到另一个对象，称为 observable。 每当一个事件发生时，observable 就会通知它的所有观察者！

An observable object usually contains 3 important parts:

- `observers`: an array of observers that will get notified whenever a specific event occurs
- `subscribe()`: a method in order to add observers to the observers list
- `unsubscribe()`: a method in order to remove observers from the observers list
- `notify()`: a method to notify all observers whenever a specific event occurs



尽管我们可以通过多种方式使用观察者模式，但它在处理异步、基于事件的数据时非常有用。 也许你希望某些组件在某些数据完成下载时得到通知，或者每当用户向留言板发送新消息时，所有其他成员都应该得到通知。

#### 案例分析

A popular library that uses the observable pattern is RxJS.

> ReactiveX 将观察者模式与迭代器模式和函数式编程与集合相结合，以满足对管理事件序列的理想方式的需求。 -RxJS

#### 优点

使用观察者模式是执行关注点分离和单一职责原则的好方法。 观察者对象与可观察对象没有紧密耦合，并且可以随时（解）耦合。 可观察对象负责监控事件，而观察者只是处理接收到的数据。

#### 缺点

如果观察者变得过于复杂，则在通知所有订阅者时可能会导致性能问题。

### Mixin Pattern

mixin 是一个对象，我们可以使用它来向另一个对象或类添加可重用的功能，而无需使用继承。 我们不能单独使用 mixin：它们的唯一目的是在没有继承的情况下向对象或类添加功能。

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!")
};

Object.assign(Dog.prototype, dogFunctionality);
```

#### React (pre ES6)

在引入 ES6 类之前，Mixins 经常被用来为 React 组件添加功能。 React 团队不鼓励使用 mixin，因为它很容易给组件增加不必要的复杂性，使其难以维护和重用。 React 团队鼓励使用高阶组件，现在通常可以用 Hooks 代替。



Mixins 允许我们通过将功能注入到对象的原型中轻松地向对象添加功能而无需继承。 修改对象的原型被视为不好的做法，因为它可能导致原型污染和我们功能来源的不确定性。

### 原型模式

在许多相同类型的对象之间共享属性

原型模式是在许多相同类型的对象之间共享属性的有用方式。 原型是 JavaScript 原生的对象，对象可以通过原型链访问。

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");
```

请注意这里的构造函数如何包含一个 name 属性，而类本身包含一个 bark 属性。 当使用 ES6 类时，在类本身上定义的所有属性，在本例中为 bark，都会自动添加到原型中。

我们可以通过访问构造函数的`prototype`属性，或通过任何实例的 `__proto__` 属性直接看到`prototype`。

```js
console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()
```



很清楚为什么它被称为原型链：当我们尝试访问对象上不直接可用的属性时，JavaScript 会递归地遍历 `__proto__` 指向的所有对象，直到找到该属性！

#### Object.create

`Object.create` 方法允许我们创建一个新对象，我们可以将其原型的值显式传递给该对象。

```js
const dog = {
  bark() {
    return `Woof!`;
  }
};

const pet1 = Object.create(dog);
```
虽然 pet1 本身没有任何属性，但它确实可以访问其原型链上的属性！ 由于我们将 dog 对象作为 pet1 的原型传递，我们可以访问 bark 属性。
```js
const dog = {
  bark() {
    console.log(`Woof!`);
  }
};

const pet1 = Object.create(dog);

pet1.bark(); // Woof!
console.log("Direct properties on pet1: ", Object.keys(pet1));	
//Direct properties on pet1:  []

console.log("Properties on pet1's prototype: ", Object.keys(pet1.__proto__));
// Properties on pet1's prototype:  (1) ["bark"]
```



原型模式允许我们轻松地让对象访问和继承其他对象的属性。 由于原型链允许我们访问不是直接在对象本身上定义的属性，我们可以避免方法和属性的重复，从而减少使用的内存量。

### Container/Presentational Pattern

在 React 中，强制分离关注点的一种方法是使用 Container/Presentational 模式。 使用这种模式，我们可以将视图与应用程序逻辑分开。

#### 展示组件

一个展示组件通过 `props` 接收它的数据。 它的主要功能是简单地以我们希望的方式展示它接收到的数据，包括样式，而不修改该数据。

展示组件通常是无状态的：它们不包含自己的 React 状态，除非它们需要用于 UI 目的的状态。 他们收到的数据不会被展示组件本身更改。

展示组件从容器组件接收数据。

#### 容器组件

容器组件的主要功能是将数据传递给它们所包含的展示组件。

#### Hooks

在许多情况下，可以用 React Hooks 替换 Container/Presentational 模式。 Hooks 的引入使开发人员可以轻松添加状态，而无需容器组件来提供该状态。

```jsx
export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return dogs;
}
```

通过使用这个hook，我们不再需要包装 `DogImagesContainer` 容器组件来获取数据，并将其发送到展示的 `DogImages` 组件。 相反，我们可以直接在我们的演示 `DogImages` 组件中使用这个hook！

```jsx
import React from "react";
import useDogImages from "./useDogImages";

export default function DogImages() {
  const dogs = useDogImages();

  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

Hooks 使得在组件中分离逻辑和视图变得容易，就像容器/展示模式一样。 它为我们节省了将展示组件包装在容器组件中所需的额外层。

#### 优点

#### 缺点

Container/Presentational 模式使得将应用程序逻辑与呈现逻辑分离变得很容易。 然而，Hooks 使得无需使用Container/Presentational 模式就可以实现相同的结果，也无需将无状态的功能组件重写为类组件。注意今天，我们不需要创建类组件来使用 状态了。

尽管我们仍然可以使用 Container/Presentational 模式，即使使用 React Hooks，这种模式在较小的应用程序中很容易被过度使用。

### 模块模式

将您的代码拆分成更小的、可重用的部分

除了能够将您的代码拆分成更小的可重用部分外，模块还允许您将文件中的某些值保密。 默认情况下，模块内的声明范围（封装）到该模块。 如果我们不显式导出某个值，则该值在该模块之外不可用。 这降低了代码库其他部分中声明的值的名称冲突风险，因为这些值在全局范围内不可用。