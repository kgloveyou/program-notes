# Learning JavaScript Design Patterns

https://www.patterns.dev/posts/singleton-pattern/

## Design Patterns

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

将你的代码拆分成更小的、可重用的部分

除了能够将你的代码拆分成更小的可重用部分外，模块还允许你将文件中的某些值保密。 默认情况下，模块内的声明范围（封装）到该模块。 如果我们不显式导出某个值，则该值在该模块之外不可用。 这降低了代码库其他部分中声明的值的名称冲突风险，因为这些值在全局范围内不可用。

#### ES2015 模块

```js
import * as math from "./math.js";

math.default(7, 8);
math.multiply(8, 9);
math.subtract(10, 3);
math.square(3);
```

#### React

#### 动态导入

在文件顶部导入所有模块时，所有模块都会在文件的其余部分之前加载。 在某些情况下，我们只需要根据某个条件导入一个模块。 通过动态导入，我们可以按需导入模块。

```jsx
import("module").then(module => {
  module.default();
  module.namedExport();
});

// Or with async/await
(async () => {
  const module = await import("module");
  module.default();
  module.namedExport();
})();
```

让我们动态导入前面段落中使用的 math.js 示例。

只有当用户点击按钮时，模块才会被加载。

```jsx
const button = document.getElementById("btn");

button.addEventListener("click", () => {
  import("./math.js").then((module) => {
    console.log("Add: ", module.add(1, 2));
    console.log("Multiply: ", module.multiply(3, 2));

    const button = document.getElementById("btn");
    button.innerHTML = "Check the console";
  });
});

/*************************** */
/**** Or with async/await ****/
/*************************** */
// button.addEventListener("click", async () => {
//   const module = await import("./math.js");
//   console.log("Add: ", module.add(1, 2));
//   console.log("Multiply: ", module.multiply(3, 2));
// });

```

通过动态导入模块，我们可以减少页面加载时间。 我们只需要在用户需要时加载、解析和编译用户真正需要的代码。

除了能够按需导入模块外，import() 函数还可以接收表达式。 它允许我们传递模板文字，以便根据给定值动态加载模块。



用户单击“单击以加载图像”按钮后，将加载每个图像。 图像是本地 .png 文件，它们根据我们传递给字符串的 num 值加载。

```jsx
const res = await import(`../assets/dog${num}.png`);
```

这样，我们不依赖于硬编码的模块路径。 它为你根据用户输入、从外部源接收的数据、函数的结果等导入模块的方式增加了灵活性。

### 中介者/中间件模式

中介者模式使组件可以通过一个中心点相互交互：中介者。 中介者不是直接相互交谈，而是接收请求，并将它们转发！ 在 JavaScript 中，中介通常只是一个对象字面量或一个函数。

你可以将此模式与空中交通管制员和飞行员之间的关系进行比较。 与其让飞行员直接相互交谈（这可能最终会变得非常混乱），不如飞行员与空中交通管制员交谈。 空中交通管制员确保所有飞机都接收到安全飞行所需的信息，而不会撞到其他飞机。

尽管我们希望不在 JavaScript 中控制飞机，但我们经常不得不处理对象之间的多向数据。 如果有大量组件，组件之间的通信会变得相当混乱。

不是让每个对象直接与其他对象对话，从而产生多对多关系，而是由中介处理对象的请求。 中介处理此请求，并将其发送到需要的位置。

[](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1609056523/patterns.dev/Screen_Shot_2020-12-23_at_11.23.32_PM_wjft0a.png)

中介者模式的一个很好的用例是聊天室！ 聊天室中的用户不会直接相互交谈。 相反，聊天室充当用户之间的中介。

```js
class ChatRoom {
  logMessage(user, message) {
    const sender = user.getName();
    console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}

const chatroom = new ChatRoom();

const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane Doe", chatroom);

user1.send("Hi there!");
user2.send("Hey!");

```

#### 案例分析

Express.js 是一个流行的 Web 应用程序服务器框架。 我们可以为用户可以访问的某些路由添加回调。



中间件模式让我们很容易简化对象之间的多对多关系，让所有通信都流经一个中心点。

### HOC 模式

在我们的应用程序中，我们经常希望在多个组件中使用相同的逻辑。 此逻辑可以包括将特定样式应用于组件、要求授权或添加全局状态。

能够在多个组件中重用相同逻辑的一种方法是使用高阶组件模式。 这种模式允许我们在整个应用程序中重用组件逻辑。

高阶组件 (HOC) 是接收另一个组件的组件。 HOC 包含我们想要应用于作为参数传递的组件的某些逻辑。 应用该逻辑后，HOC 返回带有附加逻辑的元素。

假设我们一直想为应用程序中的多个组件添加某种样式。 不用每次都在本地创建样式对象，我们可以简单地创建一个 HOC，将样式对象添加到我们传递给它的组件中

```jsx
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```



高阶组件模式允许我们为多个组件提供相同的逻辑，同时将所有逻辑保存在一个地方。 `withLoader` HOC 并不关心它接收到的组件或 url：只要它是一个有效的组件和一个有效的 API 端点，它就会简单地将数据从那个 API 端点传递给我们传递的组件。

#### Composing



>*A well-known library used for composing HOCs is* [recompose](https://github.com/acdlite/recompose)*. Since HOCs can largely be replaced by React Hooks, the recompose library is no longer maintained, thus won't be covered in this article.*

#### Hooks

在某些情况下，我们可以用 React Hooks 替换 HOC 模式。



一般来说，React Hooks 不会取代 HOC 模式。

*"In most cases, Hooks will be sufficient and can help reduce nesting in your tree."* - [React Docs](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)

正如 React 文档告诉我们的，使用 Hooks 可以减少组件树的深度。 使用 HOC 模式，很容易得到一个深度嵌套的组件树。

```jsx
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```

通过直接向组件添加 Hook，我们不再需要包装组件。



使用高阶组件可以为许多组件提供相同的逻辑，同时将该逻辑全部保存在一个地方。 Hooks 允许我们从组件中添加自定义行为，如果多个组件依赖此行为，与 HOC 模式相比，这可能会增加引入错误的风险。

##### HOC 的最佳用例：

- 整个应用程序中的许多组件都需要使用相同的、未定制的行为。
- 该组件可以独立工作，无需添加自定义逻辑。

##### Hooks 的最佳用例：

- 必须为使用它的每个组件自定义行为。
- 该行为不会在整个应用程序中传播，只有一个或几个组件使用该行为。
- 该行为为组件添加了许多属性

#### 案例分析

一些依赖 HOC 模式的库在发布后添加了 Hooks 支持。 [Apollo Client](https://www.apollographql.com/docs/react) 就是一个很好的例子。

使用 Apollo Client 的一种方法是通过 `graphql()` 高阶组件。

```jsx
import React from "react";
import "./styles.css";

import { graphql } from "react-apollo";
import { ADD_MESSAGE } from "./resolvers";

class Input extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleClick = () => {
    this.props.mutate({ variables: { message: this.state.message } });
  };

  render() {
    return (
      <div className="input-row">
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Type something..."
        />
        <button onClick={this.handleClick}>Add</button>
      </div>
    );
  }
}

export default graphql(ADD_MESSAGE)(Input);
```

使用 `graphql()` HOC，我们可以使来自客户端的数据可用于由高阶组件包装的组件！ 虽然我们目前仍然可以使用 `graphql()` HOC，但使用它也有一些缺点。

在 Hooks 发布后，Apollo 在 Apollo Client 库中添加了 Hooks 支持。 开发人员现在可以通过库提供的挂钩直接访问数据，而不是使用 `graphql()` 高阶组件。

让我们看一个示例，该示例使用与我们之前在示例中使用 `graphql()` 高阶组件看到的完全相同的数据。 这一次，我们将使用 Apollo Client 为我们提供的 `useMutation` 钩子向组件提供数据。

```jsx
import React, { useState } from "react";
import "./styles.css";

import { useMutation } from "@apollo/react-hooks";
import { ADD_MESSAGE } from "./resolvers";

export default function Input() {
  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE, {
    variables: { message }
  });

  return (
    <div className="input-row">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type something..."
      />
      <button onClick={addMessage}>Add</button>
    </div>
  );
}
```

通过使用 `useMutation` 钩子，我们减少了向组件提供数据所需的代码量。

除了减少样板文件之外，在一个组件中使用多个解析器的数据也更容易。 不必组合多个高阶组件，我们可以简单地在组件中编写多个钩子。 通过这种方式，了解数据如何传递到组件要容易得多，并且可以在重构组件或将它们分解成更小的部分时改善开发人员的体验。

#### 优点

使用高阶组件模式允许我们将想要重用的逻辑全部保存在一个地方。 这通过一遍又一遍地重复代码降低了在整个应用程序中意外传播错误的风险，每次都可能引入新的错误。 通过将逻辑全部保存在一个地方，我们可以保持代码 DRY 并轻松实施关注点分离。

#### 缺点

HOC 可以传递给元素的属性的名称可能会导致命名冲突。



当使用多个组合的 HOC 时，它们都将 props 传递给包裹在其中的元素，很难确定哪个 HOC 负责哪个 prop。 这可能会妨碍调试和轻松扩展应用程序。

### Render Props 模式

通过 props 将 JSX 元素传递给组件

另一种使组件非常可重用的方法是使用 render prop 模式。 render prop 是组件上的属性，其值是返回 JSX 元素的函数。 除了 render prop 之外，组件本身不渲染任何东西。 相反，组件只是调用 render prop，而不是实现自己的渲染逻辑。

假设我们有一个 `Title` 组件。 在这种情况下，`Title` 组件除了渲染我们传递的值之外不应该做任何事情。 我们可以为此使用render prop！ 让我们将希望 `Title` 组件渲染的值传递给 `render` prop。

```jsx
import React from "react";
import { render } from "react-dom";
import "./styles.css";

const Title = (props) => props.render();

render(
  <div className="App">
    <Title render={() => <h1>✨ First render prop! ✨</h1>} />
    <Title render={() => <h2>🔥 Second render prop! 🔥</h2>} />
    <Title render={() => <h3>🚀 Third render prop! 🚀</h3>} />
  </div>,
  document.getElementById("root")
);

```

尽管它们被称为*render* 属性，但渲染属性不一定名称是`render`。



A component that takes a render prop usually does a lot more than simply invoking the `render` prop. Instead, we usually want to pass data from the component that takes the render prop, to the element that we pass as a render prop!

```jsx
function Component(props) {
  const data = { ... }

  return props.render(data)
}
```

render prop 现在可以接收我们作为参数传递的这个值。

```jsx
<Component render={data => <ChildComponent data={data} />}
```

#### Lifting state

#### Render props

```jsx
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input
        render={value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  );
}
```

#### Children as a function

除了常规的 JSX 组件，我们还可以将函数作为子组件传递给 React 组件。 这个功能可以通过 children 属性提供给我们，从技术上讲，它也是一个 render prop。

让我们更改 Input 组件。 我们将只传递一个函数作为 Input 组件的子组件，而不是显式传递 render prop。

```jsx
export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input>
        {value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      </Input>
    </div>
  );
}
```

我们可以通过 Input 组件上可用的 `props.children` 属性访问此函数。 我们不会使用用户输入的值调用 `props.render`，而是使用用户输入的值调用 `props.children`。

```jsx
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
}
```

#### Hooks

在某些情况下，我们可以用 Hooks 替换 render props。 [Apollo Client](https://www.apollographql.com/docs/react) 就是一个很好的例子。

#### 优点



#### 缺点

我们试图用 render props 解决的问题，在很大程度上已经被 React Hooks 所取代。 由于 Hooks 改变了我们向组件添加可重用性和数据共享的方式，它们在许多情况下可以取代 render props 模式。

由于我们无法将生命周期方法添加到 render props，我们只能在不需要更改它们接收到的数据的组件上使用它。

### Hooks 模式

使用函数在整个应用程序的多个组件之间重用有状态逻辑



React 16.8 引入了一个名为 [Hooks](https://reactjs.org/docs/hooks-intro.html) 的新特性。 Hooks 使得使用 React 状态和生命周期方法成为可能，而无需使用 ES2015 类组件。

虽然 Hooks 不一定是一种设计模式，但 Hooks 在你的应用程序设计中扮演着非常重要的角色。 许多传统的设计模式都可以被 Hooks 取代。

#### 类组件

虽然在引入 React Hooks 之后我们仍然可以使用类组件，但是使用类组件可能会有一些缺点！ 让我们看看使用类组件时最常见的一些问题。

##### 了解 ES2015 类

##### 重构

##### 复杂性

随着我们向类组件添加更多逻辑，组件的大小会迅速增加。 该组件中的逻辑可能会变得混乱和非结构化，这会使开发人员难以理解在类组件中使用某些逻辑的位置。 这会使调试和优化性能变得更加困难。

生命周期方法也需要在代码中进行大量重复。 我们来看一个例子，它使用了一个 `Counter` 组件和一个 `Width` 组件。

#### Hooks

很明显，类组件在 React 中并不总是一个很棒的特性。 为了解决 React 开发者在使用类组件时可能遇到的常见问题，React 引入了 React Hooks。 React Hooks 是可用于管理组件状态和生命周期方法的函数。 React Hooks 可以：

- 向函数式组件添加状态
- 管理组件的生命周期，而无需使用诸如 `componentDidMount` 和 `componentWillUnmount` 之类的生命周期方法
- 在整个应用程序的多个组件中重用相同的有状态逻辑

##### State Hook

##### Effect Hook

With the `useEffect` hook, we can *"hook into"* a components lifecycle. The `useEffect` hook effectively combines the `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` lifecycle methods.

```jsx
componentDidMount() { ... }
useEffect(() => { ... }, [])

componentWillUnmount() { ... }
useEffect(() => { return () => { ... } }, [])

componentDidUpdate() { ... }
useEffect(() => { ... })
```

##### Custom Hooks

除了 React 提供的内置 hooks（`useState`、`useEffect`、`useReducer`、`useRef`、`useContext`、`useMemo`、`useImperativeHandle`、`useLayoutEffect`、`useDebugValue`、`useCallback`）外，我们还可以轻松创建自己的自定义 hooks。

你可能已经注意到所有的 hooks 都是以`use`开始的。 为了让 React 检查它是否违反 [Hooks 的规则](https://reactjs.org/docs/hooks-rules.html)，以 `use` 开始你的 hooks 是很重要的。

```jsx
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  function handleDown({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  function handleUp({ key }) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return keyPressed;
}
```

我们现在可以在多个组件中重用 `useKeyPress` hook，而不是将按键逻辑保留在 `Input` 组件的本地，而不必一遍又一遍地重写相同的逻辑。

Hooks 的另一个巨大优势是社区可以构建和共享 Hooks。 我们只是自己编写了 `useKeyPress` 钩子，但实际上根本没有必要！ 该钩子已经[由其他人构建](https://github.com/streamich/react-use/blob/master/docs/useKeyPress.md)，如果我们刚刚安装它，就可以在我们的应用程序中使用它！

这里有一些网站列出了社区构建的所有钩子，并准备在你的应用程序中使用。

- **[React Use](https://github.com/streamich/react-use)**
- **[useHooks](https://usehooks.com/)**
- **[Collection of React Hooks](https://nikgraf.github.io/react-hooks/)**

让我们重写上一节中显示的计数器和宽度示例。 我们将使用 React Hooks 重写应用程序，而不是使用类组件。

```jsx
import React, { useState, useEffect } from "react";
import "./styles.css";

import { Count } from "./Count";
import { Width } from "./Width";

function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  });

  return width;
}

export default function App() {
  const counter = useCounter();
  const width = useWindowWidth();

  return (
    <div className="App">
      <Count
        count={counter.count}
        increment={counter.increment}
        decrement={counter.decrement}
      />
      <div id="divider" />
      <Width width={width} />
    </div>
  );
}
```

使用 React Hooks 可以更清晰地将我们组件的逻辑分成几个更小的部分。 重用相同的有状态逻辑变得更加容易，如果我们想让组件有状态，我们不再需要将功能组件重写为类组件。 不再需要对 ES2015 类有很好的了解，并且拥有可重用的有状态逻辑增加了组件的可测试性、灵活性和可读性。

##### Additional Hooks guidance

###### Adding Hooks

**1. useState**

**2. useEffect**

`useEffect` Hook 用于在函数组件的主要生命周期事件期间运行代码。 函数组件的主体不允许突变（mutations）、订阅（subscriptions）、计时器（timers）、日志记录（logging）和其他副作用（side effects）。 如果它们被允许，可能会导致 UI 中出现令人困惑的错误和不一致。 `useEffect` hook可防止所有这些“副作用”，并允许 UI 顺利运行。 它是 `componentDidMount` 、 `componentDidUpdate` 和 `componentWillUnmount` 的组合，都在一个地方。

**3. useContext**

`useContext` Hook 接受一个上下文对象，它是从 `React.createcontext` 返回的值，并返回该上下文的当前上下文值。 `useContext` Hook 还可以与 React Context API 一起使用，以便在整个应用程序中共享数据，而无需将你的应用程序属性向下传递到各个级别。

需要注意的是，传递给 `useContext` 钩子的参数必须是上下文对象本身，并且任何调用 `useContext` 的组件总是在上下文值发生变化时重新渲染。

**4. useReducer**

`useReducer` Hook 提供了 `setState` 的替代方案，当你具有涉及多个子值的复杂状态逻辑或下一个状态取决于前一个状态时，它尤其可取。 它接受一个`reducer`函数和一个初始状态输入，并通过数组解构返回当前状态和一个`dispatch`函数作为输出。 `useReducer` 还优化了触发深度更新的组件的性能。

##### 使用Hooks的优缺点

以下是使用 Hooks 的一些好处：

**更少的代码行** Hooks 允许你按关注点和功能而不是生命周期对代码进行分组。 这使得代码不仅更简洁，而且更短。 下面是一个使用 React 的可搜索产品数据表的简单无状态组件的比较，以及使用 `useState` 关键字后它在 Hooks 中的外观。

**简化复杂的组件**

JavaScript 类可能难以管理，难以与热重载一起使用，并且可能不会缩小。 React Hooks 解决了这些问题并确保函数式编程变得容易。 有了 Hooks 的实现，我们就不需要类组件了。

**重用有状态逻辑**

JavaScript 中的类鼓励多层次的继承，这会迅速增加整体复杂性和出错的可能性。 但是，Hooks 允许你在不编写类的情况下使用状态和其他 React 功能。 使用 React，你始终可以重用有状态逻辑，而无需一遍又一遍地重写代码。 这减少了出错的机会，并允许使用普通函数进行组合。

**Sharing non-visual logic**

但是，Hooks 的引入解决了这个问题，因为它允许将有状态逻辑提取到一个简单的 JavaScript 函数中。



当然，Hooks 有一些潜在的缺点值得牢记：

- 必须尊重它的规则，没有 linter 插件，很难知道哪个规则被破坏了。
- 需要相当长的时间练习才能正确使用（Exp: useEffect）。
- 注意错误使用（Exp: useCallback, useMemo）。

#### React Hooks vs 类

以下是 Hooks 和 Classes 之间的一些区别，可帮助你做出决定：

| React Hooks                                     | Classes                                                      |
| ----------------------------------------------- | ------------------------------------------------------------ |
| 它有助于避免多个层次结构并使代码更清晰          | Generally, when you use HOC or *renderProps,* you have to restructure your App with multiple hierarchies when you try to see it in DevTools |
| It provides uniformity across React components. | Classes confuse both humans and machines due to the need to understand binding and the context in which functions are called. |

### 享元模式（Flyweight Pattern）

Reuse existing instances when working with identical objects

当我们创建大量相似对象时，享元模式是一种节省内存的有用方法。

```jsx
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const books = new Map();
const bookList = [];

const addBook = (title, author, isbn, availability, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn
  };

  bookList.push(book);
  return book;
};

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};

addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", true, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);

console.log("Total amount of copies: ", bookList.length);
console.log("Total amount of books: ", books.size);

```

当你创建大量对象时，享元模式很有用，这可能会耗尽所有可用的 RAM。 它使我们能够最大限度地减少消耗的内存量。

在 JavaScript 中，我们可以通过[原型继承](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)轻松解决这个问题。 如今，硬件拥有 GB 的 RAM，这使得享元模式变得不那么重要了。

### 工厂模式

使用工厂模式，我们可以使用工厂函数来创建新对象。 当一个函数返回一个新对象而不使用 new 关键字时，它就是一个工厂函数！

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
});

const user1 = createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com"
});

const user2 = createUser({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com"
});

console.log(user1);
console.log(user2);
```

如果我们要创建相对复杂和可配置的对象，工厂模式会很有用。 可能会发生键和值的值取决于特定环境或配置的情况。 使用工厂模式，我们可以轻松创建包含自定义键和值的新对象！

```js
const createObjectFromArray = ([key, value]) => ({
  [key]: value
});

createObjectFromArray(["name", "John"]); // { name: "John" }
```

#### 优点

当我们必须创建多个共享相同属性的较小对象时，工厂模式很有用。 工厂函数可以根据当前环境或用户特定的配置轻松返回自定义对象。

#### 缺点

在 JavaScript 中，工厂模式只不过是一个不使用 new 关键字就返回对象的函数。 [ES6 箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Arrow_functions)允许我们创建每次隐式返回一个对象的小型工厂函数。

但是，在许多情况下，每次创建新实例而不是新对象可能更节省内存。

```js
class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user1 = new User({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com"
});

const user2 = new User({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com"
});
```

### 复合模式

创建多个组件协同工作以执行单个任务

在我们的应用程序中，我们经常有属于彼此的组件。 它们通过共享状态相互依赖，并共同共享逻辑。 你经常会在`select`、下拉组件或菜单项等组件中看到这一点。 复合组件模式允许你创建所有组件一起工作以执行任务。

#### Context API

使用复合组件模式和 React 的 [Context API](https://reactjs.org/docs/context.html) 非常适合这个例子！

FlyOut.js

```jsx
import React from "react";
import Icon from "./Icon";

const FlyOutContext = React.createContext();

export function FlyOut(props) {
  const [open, toggle] = React.useState(false);

  return (
    <div className={`flyout`}>
      <FlyOutContext.Provider value={{ open, toggle }}>
        {props.children}
      </FlyOutContext.Provider>
    </div>
  );
}

function Toggle() {
  const { open, toggle } = React.useContext(FlyOutContext);

  return (
    <div className="flyout-btn" onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

function List({ children }) {
  const { open } = React.useContext(FlyOutContext);
  return open && <ul className="flyout-list">{children}</ul>;
}

function Item({ children }) {
  return <li className="flyout-item">{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

```

FlyoutMenu.js

```jsx
import React from "react";
import "./styles.css";
import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```

#### [React.Children.map](https://reactjs.org/docs/react-api.html#reactchildrenmap)

We can also implement the Compound Component pattern by mapping over the children of the component. We can add the `open` and `toggle` properties to these elements, by [cloning](https://reactjs.org/docs/react-api.html#cloneelement) them with the additional props.

FlyOut.js

```js
import React from "react";
import Icon from "./Icon";

export function FlyOut(props) {
  const [open, toggle] = React.useState(false);

  return (
    <div className={`flyout`}>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { open, toggle })
      )}
    </div>
  );
}

function Toggle({ open, toggle }) {
  return (
    <div className="flyout-btn" onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

function List({ children, open }) {
  return open && <ul className="flyout-list">{children}</ul>;
}

function Item({ children }) {
  return <li className="flyout-item">{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

```

#### 优点

复合组件管理它们自己的内部状态，它们在几个子组件之间共享。 在实现复合组件时，我们不必担心自己管理状态。

导入复合组件时，我们不必显式导入该组件上可用的子组件。

```jsx
import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```



#### 缺点

当使用 `React.Children.map` 提供值时，组件嵌套是有限的。 只有父组件的直接子组件才能访问 `open` 和 `toggle` 属性，这意味着我们不能将这些组件中的任何一个包装在另一个组件中。

### 命令模式

使用命令模式，我们可以将执行某个任务的对象与调用该方法的对象分离。

假设我们有一个在线食品配送平台。 用户可以下达、跟踪和取消订单。

```js
class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}

class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command(orders => {
    orders.push(id);
    console.log(`You have successfully ordered ${order} (${id})`);
  });
}

function CancelOrderCommand(id) {
  return new Command(orders => {
    orders = orders.filter(order => order.id !== id);
    console.log(`You have canceled your order ${id}`);
  });
}

function TrackOrderCommand(id) {
  return new Command(() =>
    console.log(`Your order ${id} will arrive in 20 minutes.`)
  );
}

const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

#### 优点

命令模式允许我们将方法与执行操作的对象分离。 如果你正在处理具有特定生命周期的命令，或者应该在特定时间排队和执行的命令，它会给你更多的控制权。

#### 缺点

命令模式的用例非常有限，并且经常向应用程序添加不必要的样板（boilerplate ）。

## 渲染模式（Rendering Patterns）

### 简介

如今，可以通过多种方式在 Web 上渲染内容。 决定如何以及在何处获取和渲染内容是应用程序性能的关键。 可用的框架和库可用于实现不同的渲染模式，如客户端渲染、静态渲染、水化（Hydration）、渐进式渲染和服务器端渲染。 在决定哪种模式最适合我们的应用程序之前，了解每种模式的含义很重要。

Chrome 团队[鼓励](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)开发人员考虑静态渲染或服务器端渲染，而不是完全补水（rehydration）的方法。 随着时间的推移，默认情况下的渐进式加载和渲染技术可能有助于在使用现代框架时实现性能和功能交付的良好平衡

以下部分将提供有关衡量应用程序在 Web 渲染方面的性能要求的指南，并建议最能满足这些要求的模式。 随后，我们将深入探索每种模式并了解如何实现它。 我们还将讨论可用于实现这些模式的 Next.js。 但是，在我们进入可用模式或 Next.js 之前，让我们先看看我们是如何到达这里的，以及导致创建 React 框架和 Next.js 的驱动程序是什么。

#### 渲染 - 关键性能指标