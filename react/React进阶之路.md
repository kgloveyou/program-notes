# 第1章 初始React
## 1.1 React简介

## 1.2 ES6语法简介



# 第2章 React基础

## 2.1 JSX

### 2.1.1 JSX简介

JSX是一种用于描述UI的JavaScript扩展语法，React使用这种语法描述组件的UI。

### 2.1.2 JSX语法

1. **基本语法**

2. **标签类型**

   ​		在jsx语法中，使用的标签类型有两种：DOM类型的标签(div、span等)和React组件类型的标签。当使用DOM类型的标签时，标签的首字母必须小写；当使用React组件类型的标签时，组件名称的首字母必须大写。React正是通过首字母的大小写判断渲染的是一个DOM类型的标签还是一个React组件类型的标签。

3. **JavaScript表达式**

   在JSX中使用JavaScript表达式需要将表达式用大括号“{}”包起来。

4. **标签属性**

   

5. **注释**

   

## 2.2 组件

### 2.2.1 组件定义

​		定义一个组件有两种方式，使用ES6 class（类组件）和使用函数（函数组件）。

​		使用class定义组件需要满足两个条件：

​		（1）class继承自React.Component。

​		（2）class内部必须定义render方法，render方法返回代表该组件UI的React元素。

### 2.2.2 组件的props

​		组件的props用于把父组件的数据或方法传递给子组件，供子组件使用。

​		现在我们利用props定义PostItem组件：

```jsx
//PostItem.js
import React, { Component } from "react";

class PostItem extends Component {
  render() {
    const { title, author, date } = this.props;
    return (
      <li>
        <div>
          {title}
        </div>
        <div>
          创建人：<span>{author}</span>
        </div>
        <div>
          创建时间：<span>{date}</span>
        </div>
      </li>
    );
  }
}

export default PostItem;
```

​	然后在PostList中使用PostItem:

```jsx
//PostList.js
import React, { Component } from "react";
import PostItem from "./PostItem";

const data = [
  { title: "大家一起来讨论React吧", author: "张三", date: "2017-09-01 10:00" },
  { title: "前端框架，你最爱哪一个", author: "李四", date: "2017-09-01 12:00" },
  { title: "Web App的时代已经到来", author: "王五", date: "2017-09-01 14:00" }
];
class PostList extends Component {
  render() {
    return (
      <div>
        帖子列表：
        <ul>
          {data.map(item =>
            <PostItem
              title={item.title}
              author={item.author}
              date={item.date}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default PostList;
```



### 2.2.3 组件的state

​		组件的state是组件内部的状态，state的变化最终将反映到组件UI的变化上。我们在组件的构造方法constructor中通过this.state定义组件的初始状态，并通过调用this.setState方法改变组件状态（也是改变组件状态的唯一方式），进而组件UI也会随之重新渲染。

​		React组件正是由props和state两种类型的数据驱动渲染出组件UI。props是组件对外的接口，组件通过props接收外部传入的数据（包括方法）；state是组件对内的接口，组件内部状态的变化通过state来反映。另外，props是只读的，你不能在组件内部修改props；state是可变的，组件状态的变化通过修改state来实现。

### 2.2.4 有状态组件和无状态组件

state用来反映组件内部状态的变化，如果一个组件内部状态是不变的，当然就用不到state，这样的组件成为**无状态组件**。反之，一个组件的内部状态会发生变化，就需要使用state来保存变化，这样的组件称之为**有状态组件**。

使用无状态组件时，应该尽量将其定义成函数组件。



### 2.2.5 属性校验和默认属性

React提供了PropTypes对象，用于校验组件属性的类型。我们通过定义一个对象（对象的key是组件的属性名，value是对应属性的类型）实现组件属性类型的校验。

```jsx
import PropTypes from 'prop-types';

class PostItem extends React.Component{

​	// ......

}

PostItem.propTypes={

​	post:PropTypes.object,

​	onVote:PropTypes.func

};
```

​	如果属性是组件的必须属性，也就是当使用某个组件时，必须传入的属性，就需要在PropTypes的类型属性上调用isRequired。

```jsx
PostItem.propTypes = {

  post: PropTypes.shape({

​    	id: PropTypes.number,

​    	title: PropTypes.string,

​    	author: PropTypes.string,

​    	date: PropTypes.string,

​    	vote: PropTypes.number

  }).isRequired,

  onVote: PropTypes.func.isRequired

}
```

​		React还提供了为组件属性指定默认值的特性，这个特性通过组件的defaultProps实现。当组件属性未被赋值时，组件会使用defaultProps定义的默认属性。例如：

```jsx
function Welcome(props){
	return <h1 className='foo'>Hello,{props.name}</h1>;
}

Welcome.defaultProps={
	name:'stranger'
}
```



### 2.2.6 组件样式

**1、外部CSS样式表**

React元素要使用className来代替class作为选择器。

另一种是把样式表文件当做一个模块，在使用该样式表的组件中，像导入其他组件一样导入样式表文件：

```javascript
import './style.css';	//要保证相对路径的正确

function Welcome(props){

​	return <h1 className='foo'>Hello,{props.name}</h1>;

}
```

2、**内联样式**

在使用内联样式时，还有一点需要格外注意：样式的属性名必须使用驼峰格式的命名。



图标也可以作为一个模块被js文件导入，如PostItem.js所示：

```jsx
import React from "react";
import "./PostItem.css";
import like from "./images/like-default.png";

function PostItem(props) {
  const handleClick = () => {
    props.onVote(props.post.id);
  };
  const { post } = props;
  return (
    <li className='item'>
      <div className='title'>
        {post.title}
      </div>
      <div>
        创建人：<span>{post.author}</span>
      </div>
      <div>
        创建时间：<span>{post.date}</span>
      </div>
      <div className='like'>
         <span><img alt='vote' src={like} onClick={handleClick} /></span>
         <span>{post.vote}</span> 
      </div>
    </li>
  );
}

export default PostItem;
```

### 2.2.7 组件和元素



## 2.3 组件的生命周期

https://react.docschina.org/docs/react-component.html

### 2.3.1 挂载阶段

​		这个阶段组件被创建，执行初始化，并被挂载到DOM中，完成组件的第一次渲染。依次调用的生命周期方法有：

1. constructor

2. componentWillMount

3. render

   这是定义组件时唯一必要的方法（组件的其他生命周期方法都可以省略）。

4. componentDidMount

   这个方法通常还会用于向服务器请求数据。在这个方法中调用this.setState会引起组件的重新渲染。

   

### 2.3.2 更新阶段

（过时的生命周期方法,这些方法仍然有效，但不建议在新代码中使用它们。）

   组件更新阶段，依次调用的生命周期方法有：

1. UNSAFE_componentWillReceiveProps

   此生命周期之前名为 componentWillReceiveProps。该名称将继续使用至 React 17。

2. shouldComponentUpdate(nextProps, nextState)

3. UNSAFE_componentWillUpdate(nextProps, nextState)

   此生命周期之前名为 componentWillUpdate。该名称将继续使用至 React 17。

4. render()

5. componentDidUpdate(prevProps, prevState, snapshot)

### 2.3.3 卸载阶段

当组件从 DOM 中被卸载的过程，这个过程中只有一个生命周期方法：

componentWillUnmount()

 这个方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清理组件中使用的定时器，清除componentDidMount中手动创建的DOM元素等，以避免引起内存泄露。

最后需要提醒下，只有类组件才有生命周期方法，函数组件是没有生命周期方法的，因此永远不要在函数组件中使用生命周期方法。

##    

## 2.4 列表和Keys

​	   React使用key属性来标记列表中的每个元素，当列表数据发生变化时，React就通过key知道哪些元素发生了变化，从而只重新渲染发生变化的元素，提高渲染效率。

​	一般使用列表数据的ID作为key值。

```javascript
            <PostItem

​              key = {item.id}

​              post = {item}

​              onVote = {this.handleVote}

​            />
```



## 2.5 事件处理

在React元素中绑定事件有两点需要注意：

（1）在React中，事件的命名采用驼峰命名方式，而不是DOM元素中的小写字母命名方式。例如，onclick要写成onClick，onchange要写成onChange等。

（2）处理事件的响应函数要以对象的形式赋值给事件属性，而不是DOM中的字符串形式。

```javascript
<button onClick={clickButton}>	//clickButton是一个函数

​	click

</button>
```

​		React中的事件是合成事件，并不是原生的DOM事件。React根据W3C规范定义了一套兼容各个浏览器的事件对象。



​		在React组件中处理事件最容易出错的地方是事件处理函数中this的指向问题，因为ES6 class并不会为方法自动绑定this到当前对象。React事件处理函数的写法主要有三种方式，不同的写法解决this指向问题的方式也不同。

1、**使用箭头函数**



2、**使用组件方法**



3、**属性初始化语法**

使用ES7的property initializers会自动为class中定义的方法绑定this。

## 2.6 表单

### 2.6.1 受控组件

​		如果一个表单元素的值是由React来管理的，那么它就是一个受控组件。

### 2.6.2 非受控组件

​		非受控组件指表单的状态依然由表单元素自己管理，而不是交给React组件管理。

​		React提供了一个特殊的属性ref，用来引用React组件或DOM元素的实例，因此我们可以通过为表单元素定义ref属性获取元素的值。



# 第3章 React 16 新特征

## 3.1 render新的返回类型

## 3.2  错误处理

定义了componentDidCatch(err, info)这个方法的组件将成为一个错误边界。

## 3.3 Portals

​		React 16 的Portals特性让我们可以把组件渲染到当前组件树以外的DOM节点上，这个特性典型的应用场景是渲染应用的全局弹框。

## 3.4 自定义DOM属性

React 16 之前会忽略不识别的HTML和SVG属性，现在React会把不识别的属性传递给DOM元素。

# 第4章 深入理解组件

## 4.1 组件state

### 4.1.1 设计合适的state

​		state所代表的一个组件UI呈现的完整状态集又可以分成两类数据：用作渲染组件时使用到的数据来源以及用作组件UI展现形式的判断依据。

​		state和props又有什么区别呢？state和props都直接和组件的UI渲染有关，它们的变化都会触发组件重新渲染，但props对于使用它的组件来说是只读的，是通过父组件传递过来的，要想修改props，只能在父组件中修改；而state是组件内部自己维护的状态，是可变的。

### 4.1.2 正确修改state

修改state时，往往有很多陷阱需要注意。

**1、不能直接修改state**

正确的修改方式时使用setState():

```javascript
//正确

this.setState({title:'React'});
```

**2、state的更新是异步的**

​		调用setState时，组件的state并不会立即改变，setState只是把要修改的状态放入一个队列中，React会优化真正的执行时机，并且出于性能原因，可能会将多次setState的状态修改合并成一次状态修改。另外，需要注意的是，props的更新也是异步的。

​		如果有这样的需求，可以使用另外一个接收一个函数作为参数的setState

```javascript
//正确

this.setState((preState,props)=>({

​	counter:preState.quantity+1;

}))
```

另：

setState函数原型

https://zh-hans.reactjs.org/docs/react-component.html#setstate

```jsx
setState(updater[, callback])
```

其中：

`updater` 函数：

```jsx
(state, props) => stateChange
```

**3、state的更新是一个合并的过程**

当调用setState修改组件状态时，只需要传入发送改变的state

### 4.1.3 state与不可变对象

1. **state的类型是不可变类型（数字、字符串、布尔值、null、undefined）**

2. **state的类型是数组**

   ​		不要使用push、pop、shift、unshift、splice等方法修改数组类型的状态，因为这些方法都是在原数组的基础上修改的，而concat、slice、filter会返回一个新的数组。

3. **state的类型是普通对象（不包含字符串、数组）**

   （1）使用ES6的Object.assign方法：

   ```jsx
   this.setState(preState=>({
   	owner:Object.assign({},preState.owner,{name:'Jason'});
   }))
   ```

   （2）使用对象扩展语法：

   ```jsx
   this.setState(preState=>({
   	owner:{...preState.owner,name:'Jason'};
   }))
   ```

   ​		总结一下，创建新的状态对象的关键是，避免使用会直接修改原对象的方法，而是使用可以返回一个新对象的方法。

## 4.2 组件与服务器通信

### 4.2.1 组件挂载阶段通信

​		UserListContainer是在*componentDidMount*中与服务器进行通信的，这个时候组件已经挂载，真实DOM也已经完成渲染，是调用服务器API最安全的地方，也是React官方推荐的进行服务器通信的地方。

### 4.2.2 组件更新阶段通信

​		组件在更新阶段常常需要再次与服务器通信，获取服务器上的最新数据。例如，组件需要以props中的某个属性作为与服务器通信时的请求参数，当这个属性值发生更新时，组件自然需要重新与服务器通信。不难发现*componentWillReceiveProps*非常适合做这个工作。

## 4.3 组件通信

### 4.3.1 父子组件通信

​		父组件向子组件通信是通过父组件向子组件的props传递数据完成的。

​		当子组件需要向父组件通信时，又该怎么办呢？答案依然是props。父组件可以通过子组件的props传递给子组件一个回调函数，子组件在需要改变父组件数据时，调用这个回调函数即可。

### 4.3.2 兄弟组件通信

### 4.3.3 Context

​		React提供了一个context上下文，让任意层级的子组件都可以获取父组件的状态和方法。

​		虽然context给组件通信带来了便利，但过多使用context会让应用中的数据流变得混乱，而且context是一个实验性的API，在未来的React版本中可能被修改或者废弃。所以，使用context一定要慎重。

### 4.3.4 延伸

​		当应用更加复杂时，还可以引入专门的状态管理库实现组件通信和组件状态的管理，例如Redux和Mobx是当前非常流行的两种状态管理库。

## 4.4 特殊的ref

​		ref不仅可以用来获取表单元素，还可以用来获取其他任意DOM元素，甚至可以用来获取React组件实例。

### 4.4.1 在DOM元素上使用ref

​		在DOM元素上使用ref是最常见的使用场景。ref接收一个回调函数作为值，在组件被挂载或卸载时，回调函数会被调用，在组件被挂载时，回调函数会接收当前DOM元素作为参数；在组件被卸载时，回调函数会接收null作为参数。



### 4.4.2 在组件上使用ref

注意，只能为类组件定义ref属性，而不能为函数组件定义ref属性。

函数组件虽然不能定义ref属性，但这并不影响在函数组件内部使用ref来引用其他DOM元素或组件。

### 4.4.3 父组件访问子组件的DOM节点



# 第5章 虚拟DOM和性能优化

​		React之所以执行效率高，一个很重要的原因是它的虚拟DOM机制。React应用常用的性能优化方法也大都与虚拟DOM机制相关。

## 5.1虚拟DOM
前端性能优化中有一条原则：尽量减少DOM操作。

虚拟DOM并非React所独有的，它是一个独立的技术，只不过React使用这项技术来提高自身性能。

虚拟DOM使用普通的JavaScript对象来描述DOM元素，实际上，React元素本身就是一种虚拟DOM节点。

## 5.2 Diff算法

​		React会通过比较两次虚拟DOM结构的变化找出差异部分，更新到真实DOM上，从而减少最终要在真实DOM上执行的操作，提高程序执行效率。其中的关键是比较两个树形结构的Diff算法。

​		当渲染列表元素时，需要为每一个元素定义一个key。这个key就是为了帮助React提高Diff算法的效率。

## 5.3 性能优化

1. **使用生产环境版本的库**

2. **避免不必要的组件渲染**

   ​		当组件的props或state发生变化时，组件的render方法会被重新调用，返回一个新的虚拟DOM对象。但在一些情况下，组件是没必要重新调用render方法的。

   ​		React组件的生命周期方法中提供了一个shouldComponentUpdate方法，这个方法的默认返回值是true，如果返回false，组件此次的更新将会停止，也就是后续的componentWillUpdate、render等方法都不会再被执行。我们可以把这个方法作为钩子，在这个方法中根据组件自身的业务逻辑决定返回true还是false，从而避免组件不必要的渲染。

   ​		React提供了一个PureComponent组件，这个组件会使用浅比较来比较新旧props和state，因此可以通过让组件继承PureComponent来替代手写shouldComponentUpdate的逻辑。

3. **使用key**

   ​		React会根据key索引元素，在render前后，拥有相同key值的元素是同一个元素。可见，key的使用减少了DOM操作，提高了DOM更新效率。

   
   
   ​		以上三种是性能优化最常用的三种方法，其中使用生产环境版本的库是项目中必须采用的，使用key也是推荐在项目中采用的。通过重写shouldComponentUpdate方法在项目开始阶段可以不必在意，当发现项目确实存在性能问题时，再考虑该方法进行优化。

## 5.4 性能检测工具




# 第6章 高阶组件
## 6.1 基本概念

​		在JavaScript中，高阶函数是以函数为参数，并且返回值也是函数的函数。类似地，高阶组件（简称HOC）接收React组件作为参数，并且返回一个新的React组件。高阶组件本质上也是一个函数，并不是一个组件。高阶组件的函数形式如下：

```react
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

​		高阶组件的主要功能是封装并分离组件的通用逻辑，让通用逻辑在组件间更好地被复用。高阶组件的这种实现方式本质上是`装饰者设计模式`。

## 6.2 使用场景

高阶组件的使用场景主要有以下4种：

1. 操纵props
2. 通过ref访问组件实例
3. 组件状态提升
4. 用其他元素包装组件

## 6.3 参数传递

```react
HOC(...params)(WrappedComponent)
```

HOC(...params)的返回值是一个高阶组件，高阶组件需要的参数是先传递给HOC函数的。

## 6.4 继承方式实现高阶组件

在使用高阶组件时，应尽量通过代理方式实现高阶组件。

## 6.5 注意事项



# 第7章 路由：用React Router开发单页面应用

## 7.1 基本用法

### 7.1.1 单页面应用和前端路由

React Router就是一种前端路由的实现方式。

### 7.1.2 React Router的安装

react-router-dom（在浏览器中使用）

react-router-native（在react native中使用）

安装react-router-dom：

`npm install react-router-dom`

### 7.1.3 Router

​		React Router通过Router和Route两个组件完成路由功能。Router可以理解成路由器，一个应用只需要一个Router实例，所有的路由配置组件Route都定义为Router的子组件。在Web应用中，我们一般会使用对Router进行封装的**BrowserRouter**或**HashRouter**两个组件。BrowserRouter使用HTML5的history API（pushState、replaceState等）实现应用的UI和URL的同步。HashRouter使用URL的hash实现应用的UI和URL的同步。

### 7.1.4 Route配置

​		Route是React Router中用于配置路由信息的组件，也是React Router中使用频率最高的组件。每当有一个组件需要根据URL决定是否渲染时，就需要创建一个Route。

1. **path**

2. **match**

3. **Route渲染组件的方式**

4. **Switch和exact**

   ​		当URL和多个Route匹配时，这些Route都会执行渲染操作。如果只想让第一个匹配的Route渲染，那么可以把这些Route包到一个Switch组件中。如果想让URL和Route完全匹配时，Route才渲染，那么可以使用Route的exact属性。Switch和exact常常联合使用，用于应用首页的导航。例如：

   ```jsx
   <Router>
   	<Switch>
   	  <Route exact path="/" component={Home} />
   	  <Route path="/login" component={Login} />
   	  <Route path="/posts" component={Home} />
   	</Switch>
   </Router>
   ```

   

5. **嵌套路由**

   嵌套路由是指在Route渲染的组件内部定义新的Route。

### 7.1.5 Link

​		Link是React Router提供的链接组件，一个Link组件定义了当点击该Link时，页面应该如何路由。

### 7.1.6 NavLink

NavLink是Link的一个子类，在Link组件的基础上增加了绘制组件的样式，比如：

```jsx
<NavLink to="/me" activeStyle={{SomeStyle}} activeClassName="selected">
  My Profile
</NavLink>
```

​		除了使用Link外，我们还可以使用history对象手动实现导航。history中最常用的两个方法是push(path,[state])和replace(path,[state])，push会向浏览历史记录新增一条记录，replace会用新记录替换当前记录。

## 7.2 项目实战

### 7.2.1 后台服务API介绍

​		我们使用HTML5 fetch接口调用API，在utils/request.js中对fetch进行了封装，定义了get、post、put三个方法，分别满足不同HTTP方法（Get、Post、Put）调用API的场景。

​		因为APICloud提供的API和本地程序运行在不同域下，所以本地程序直接调用APICloud的API会存在跨域调用的问题。我们利用代理服务器解决这个问题。在create-react-app中使用代理很简单，只需要在项目的package.json中配置proxy属性，proxy的值是请求要转发到的最终地址。APICloud提供的API运行在https://d.api.com/mcm/api下，因此配置如下：

```javascript
"proxy": "https://d.apicloud.com/mcm/api"
```

​		但需要注意，使用这种配置代理只在开发环境下有效，即npm start启动程序时，代理有效。（build下如何设置？）



https://segmentfault.com/q/1010000008508440/a-1020000008516740

大概是这样

你在`packge.json`加入

```
"proxy": "http://news-at.zhihu.com"
```

然后你页面中的请求`fetch('/api/userdata/')`就会转发到`proxy`中的地址

也就是真实的请求是`http://news-at.zhihu.com/api/userdata/`，而且也不会有跨域问题

因为在浏览器看来，你只是发了`fetch('/api/userdata/')`，没有跨域问题

## 7.3 代码分片

​		默认情况下，当在项目根路径下执行`npm run build`时，create-react-app内部使用webpack将src/路径下的所有代码打包成一个JS文件和一个CSS文件。

​		理想情况下，当用户访问一个页面时，该页面应该只加载自己使用到的代码。解决这个问题的方案就是代码分片，将JS代码分片打包到多个文件中，然后在访问页面时按需加载。

​		create-react-app支持通过动态import()的方式实现代码分片。import()接收一个模块的路径作为参数，然后返回一个Promise对象，Promise对象的值就是待导入的模块对象。

```jsx
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import asyncComponent from "./AsyncComponent";

const AsyncHome = asyncComponent(() => import("./components/Home"));
const AsyncLogin = asyncComponent(() => import("./components/Login"));

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AsyncHome} />
          <Route path="/login" component={AsyncLogin} />
          <Route path="/posts" component={AsyncHome} />
        </Switch>
      </Router>
    );
  }
}

export default App;
```

​		在使用import()时，必须显式地声明要导入的组件路径，webpack在打包时，会根据这些显式的声明拆分代码，否则，webpack无法获得足够的关于拆分代码的信息。



​		执行`npm run eject`，项目中会多出两个文件夹：config和scripts，scripts中包含项目启动、编译和测试的脚本，config中包含项目使用的配置文件，webpack的配置文件就在这个路径下。

​		`npm run eject`是一个不可逆操作，一旦将配置“弹射”出，就不能再回到之前的状态，配置的维护和修改工作将全权交给用户。

# 第8章 Redux：可预测的状态管理机

## 8.1 简介

### 8.1.1 基本概念

​		Redux通过一系列约定的规范将修改应用状态的步骤标准化，让应用状态的管理不再错综复杂。

​		当需要修改应用状态时，必须发送一个action，action描述应用状态应该如何修改，其实action只是一个普通的JavaScript对象。例如，当新增一个待办事项时，可以发送下面的action:

​		`{type:'ADD_TODO',text:'Learn Mobx'}`

​		注意，action的结构并不是确定的（但必须包含type字段）。

​		Redux通过reducer解析action。reducer是一个普通的JavaScript函数，接收action作为参数，然后返回一个新的应用状态state.

### 8.1.2 三大原则

1. **唯一数据源**

   ​		Redux应用只维护一个全局的状态对象，存储在Redux的store中。唯一数据源是一种集中式管理应用状态的方式，便于监控任意时刻应用的状态和调试应用，减少出错的可能性。

2. **保存应用状态只读**

   ​		在任何时候都不能直接修改应用状态。当需要修改应用状态时，必须发送一个action，由这个action描述如何修改应用状态。

3. **应用状态的改变通过纯函数完成**

   ​		action表明修改应用状态的意图，真正对应用状态修改的是reducer。reducer必须是纯函数，所以reducer在接收到action时，不能直接修改原来的状态对象，而是要创建一个新的状态对象返回。

## 8.2 主要组成

​		通过前面的介绍可以发现Redux应用的主要组成有action、reducer和store。

### 8.2.1 action

​		action是Redux中信息的载体，是store唯一的信息来源。把action发送给store必须通过store的dispatch方法。action是普通的JavaScript对象，但每个action必须有一个type属性描述action的类型，type一般定义为字符串常量。除了type属性外，action的结构完全有自己决定，但应该确保action的结构能清晰地描述实际业务场景。

​		一般通过action creator创建action，action creator是返回action的函数。例如，下面是一个新增待办事项的action creator：

```jsx
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

### 8.2.2 reducer

​		action用于描述应用发生了什么操作，reducer则根据action做出响应，决定如何修改应用的状态state。

​		reducer是一个纯函数，它接收两个参数，当前的state和action，返回新的state。reducer函数签名如下：

​		`(previousState,action)=>newState`

​		我们先来创建一个最基本的reducer:

```jsx
import { VisibilityFilters } from './actions'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function todoApp(state = initialState, action) {
  // 这里暂不处理任何 action，
  // 仅返回传入的 state。
  return state
}
```

​		现在可以处理 `SET_VISIBILITY_FILTER`。需要做的只是改变 state 中的 `visibilityFilter`。

```jsx
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```

​		Redux还提供了一个`combineReducers`函数，用于合并多个reducer。使用combineReducers，todosApp可以改写成如下：

```javascript
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})
```

### 8.2.3 store

​		store是Redux中的一个对象，也是action和reducer之间的桥梁。

​		一个Redux应用中只有一个store，store保存了唯一数据源。store通过createStore()函数创建，创建时需要传递reducer作为参数。

```javascript
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer)
```

​		store创建完成后，就可以通过getState()获取当前应用的状态state:

```javascript
const state=store.getState()
```

​		当需要修改state时，通过store的dispatch方法发送action。

```jsx
//定义action

function addTodo(text){

​	return {type:'ADD_TODO',text}

}

//发送action

store.dispatch(addTodo('Learn about actions'))
```

​		当todoApp这个reducer处理完成addTodo这个action时，应用的状态会被更新，此时通过store.getState()可以得到最新的应用状态。为了能准确知道应用状态更新的时间，需要向store注册一个监听函数：

```jsx
let unsubscribe=store.subscribe(()=>

​	console.log(store.getState())

)
```

​		这样，每次应用状态更新时，最新的应用状态就会被打印出来。当需要取消监听时，直接调用store.subscribe返回的函数即可：

```javascript
unsubscribe()
```

## 8.3 在React中使用Redux

### 8.3.1 安装react-redux

`npm install react-redux`

### 8.3.2 展示组件和容器组件

**展示组件**负责应用的UI展示（how things look），也就是组件如何渲染，具有很强的内聚性。

**容器组件**负责应用逻辑的处理（how things work），如发送网络请求、处理返回的数据、将处理过的数据传递给展示组件等。

### 8.3.3 connect

​		react-redux提供了一个connect函数，用于把React组件和Redux的store连接起来，生成一个容器组件，负责数据管理和业务逻辑，代码如下：

```jsx
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```

​		mapStateToProps和mapDispatchToProps的类型都是函数，前者负责从全局应用状态state中取出所需数据，映射到展示组件的props，后者负责把需要用到的action映射到展示组件的props上。

### 8.3.4 mapStateToProps

​		mapStateToProps是一个函数，从名字可以看出，它的作用是把state转换成props。state就是Redux store中保存的应用状态，它会作为参数传递给mapStateToProps，props就是被连接的展示组件的props。

```jsx
function getVisibleTodos(todos, filter){
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

function mapStateToProps(state){
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```

​		每当store中的state更新时，mapStateToProps就会重新执行，重新计算传递给展示组件的props，从而触发组件的重新渲染。

### 8.3.5 mapDispatchToProps

​		mapDispatchToProps接收store.dispatch方法作为参数，返回展示组件用来修改store的函数

```jsx
function toggleTodo(id) {
  return { type: 'TOGGLE_TODO', id }
}

function mapDispatchToProps(dispatch){
  return {
    onTodoClick: function(id){
      dispatch(toggleTodo(id))
    }
  }
}
```

​		这样，展示组件就可以调用this.props.onTodoClick(id)发送修改待办事项状态的action了。另外，与mapStateToProps相同，mapDispatchToProps也支持第二个参数代表容器组件的props。



### 8.3.6 Provider组件

​		通过connect函数创建出容器组件，但这个容器组件是如何获取到Redux的store？react-redux提供了一个Provider组件。

​		使用Provider组件时，一般把它作为根组件，这样内层的任意组件才可以从context中获取store对象。

```jsx
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## 8.4 中间件与异步操作

### 8.4.1 中间件

以上介绍的日志输出功能就可以使用专门的日志中间件redux-logger。为store添加中间件支持的代码如下：

```jsx
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reducer from './reducers'

let store = createStore(
  reducer,
  applyMiddleware(logger)
)
```

### 8.4.2 异步操作

Redux中处理异步操作必须借助中间件的帮助。redux-thunk是处理异步操作最常用的中间件。

```jsx
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

let store = createStore(
  reducer,
  applyMiddleware(thunk)
)
```

除了redux-thunk外，常用于处理异步操作的中间件还有redux-promise、redux-saga等。



# 第9章 Redux项目实战

## 9.1 组织项目结构

关于如何组织React+Redux的项目结构，目前主流的方案有三种：按照类型、按照页面功能和Ducks。

**1、按照类型**

**2、按照页面功能**

**3、Ducks**

提倡将相关联的reducer、action types和action creators写到一个文件里。



## 9.2 设计state

### 9.2.3 合理设计state



## 9.3 设计模块

​	一个功能相关的reducer、aciton types、action creators将定义到一个文件中，作为一个Redux模块。

## 9.4 连接Redux

​		通过Redux的connect函数把组件和Redux的store进行连接。

### 9.4.1 注入state

​		selector是一个函数，用于从state中获取外部组件所需的数据。这样当组件需要使用state中的数据时，不再直接访问state，而是通过selector获取。selector适合定义在相关Redux模块中，即一个Redux模块不仅包含action types、action creators和reducers，还包含从该模块state中获取数据的selectors。

```jsx
//containers/PostList/index.js
import { getLoggedUser } from "../../redux/modules/auth";
import { isAddDialogOpen } from "../../redux/modules/ui";
import { getPostListWithAuthors } from "../../redux/modules";

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state),
    posts: getPostListWithAuthors(state),
    isAddDialogOpen: isAddDialogOpen(state)
  };
};
```

​	其中：

```jsx
auth.js
// selectors
export const getLoggedUser = state => state.auth;

ui.js
// selectors
export const isAddDialogOpen = state => {
  return state.ui.addDialogOpen;
};

modules/index.js
// complex selectors
export const getPostListWithAuthors = state => {
  const postIds = getPostIds(state);
  return postIds.map(id => {
    const post = getPostById(state, id);
    return { ...post, author: getUserById(state, post.author) };
  });
};
```



### 9.4.2 注入action creators

```jsx
//containers/PostList/index.js
import { bindActionCreators } from "redux";
import { actions as postActions } from "../../redux/modules/posts";
import { actions as uiActions, isAddDialogOpen } from "../../redux/modules/ui";

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  };
};
```

​		其中，bindActionCreators是Redux提供的一个工具函数，它使用store的dispatch方法把参数对象中包含的每个action creator包裹起来，这样就不需要显式地使用dispatch方法发送action了，而是可以直接调用action creator函数。

​		mapDispatchToProps使用bindActionCreators后，

```jsx
const mapDispatchToProps = dispatch => {
  return {
    someActionCreator:bindActionCreators(someActionCreator, dispatch)
  };
};
```

​		只需要这样调用即可发送action:

```jsx
this.props.someActionCreator();
```

### 9.4.3 connect连接PostList和Redux

​		最后，利用Redux的connect函数将PostList和Redux连接起来，并导出连接后的组件：

```jsx
//containers/PostList/index.js

import { connect } from "react-redux";

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
```

​		最后，我们还需要把Redux的store通过Provider组件注入应用中，这个操作在应用的根组件中完成：

```jsx
//index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import App from "./containers/App";

const store = configureStore();

ReactDOM.render(

  <Provider store={store}>

​    <App />

  </Provider>,

  document.getElementById("root")

);
```

## 9.5 Redux调试工具

Redux DevTools是一款调试Redux应用的浏览器插件，使用方式参见configureStore.js。

## 9.6 性能优化

### 9.6.1 Redux Router引起的组件重复渲染问题

新建一个高阶组件connectRoute：

```jsx
import React from "react";

export default function connectRoute(WrappedComponent) {
  return class ConnectRoute extends React.Component {
    shouldComponentUpdate(nextProps) {
      return nextProps.location !== this.props.location;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }

  };
}
```

用connectRoute包裹Home、Login:

```jsx
const AsyncHome = connectRoute(asyncComponent(() => import("../Home")));

const AsyncLogin = connectRoute(asyncComponent(() => import("../Login")));
```



### 9.6.2 Immutable.JS

​		Immutable.js的作用在于以更加高效的方式创建不可变对象。

安装依赖

```jsx
npm install immutable
```



### 9.6.3 Reselect

​		Reselect可以创建具有记忆功能的selectors，当selectors计算使用的参数未发生改变时，不会再次计算，而是直接使用上次缓存的计算结果。

# 第10章 Mobx：简单可扩展的状态管理解决方案

相较于Redux，MobX更轻量

## 10.1 简介

## 10.2 主要组成

### 10.2.1 state

​		state是驱动应用的数据，是应用的核心。在实际应用中，一般还会另外创建一个store来管理state，这和Redux中的store也是类似的。但Mobx中，可以在一个应用中使用多个store，store中的state也是可变的。

Mobx提供了observable和@observable两个API创建可观测的state，用法如下：

```jsx
observable(value)

@observable classProperty=value
```



### 10.2.2 computed value

​		computed value是根据state衍生出的新值，新值必须是通过纯函数计算得到的。computed value依赖的state改变时，会自动重新计算，前提是这个computed value有被reaction调用。也就是说，computed value采用延迟更新策略，只有被使用时才会自动更新。一般通过computed()和@computed创建computed value，使用方法如下：

```jsx
computed(()=>expression)

@computed get classProperty(){return expression;}
```

computed()一般用于接收一个函数，例如：



@computed 一般用于修改class的属性的getter方法，例如：

### 10.2.3 reaction

​		reaction是自动响应state变化的有副作用的函数。与computed value不同的是，reatcion产生的不是一个值，而是执行一些有副作用的动作，例如打印信息到控制台、发送网络请求、根据React组件树更新DOM等。

### 10.2.4 action

action是用来修改state的函数。MobX提供了API action和@action用来包装action函数。常见的用法有：

```jsx
action(fn)

@action classMethod
```

使用action时，需要注意函数内this指向的问题，例如：



## 10.3 Mobx响应的常见误区

## 10.4 在React中使用Mobx

# 第11章 Mobx项目实战



