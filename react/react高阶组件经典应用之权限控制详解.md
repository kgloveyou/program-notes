# react高阶组件经典应用之权限控制详解

本文链接：https://www.ddpool.cn/article/44735.html

**<font color=red>前言</font>**

所谓高级组件，即：接受一个组件作为参数，并且其返回值也为一个react组件

而大家应该都知道，权限控制算是软件项目中的常用功能了。在网站中，权限控制一般分为两个维度：页面级别和页面元素级别。

我们来说说页面元素粒度的权限控制。在某个页面中，有个“创建用户”的按钮，管理员才能看到。

**<font color=red>一般想到的做法类似这样</font>**

```jsx
class Page extends Component{
 render() {
 let hasCreatePermission = tool.getAuth("createUser"); 
 return (
  <div>
  {hasCreatePermission ? <Button>创建用户</Button> : null}
  </div>
 );
 }
}
```

在当前用户的权限列表中判断是否有“创建用户”的权限，然后控制按钮的显示和隐藏。

有一天，产品经理说，“没有权限的话，按钮就置灰”。

**于是代码改成了这样：**

```jsx
 render() {
 let hasCreatePermission = tool.getAuth("createUser"); 
 return (
  <div>
  {hasCreatePermission ? <Button>创建用户</Button> : <Button disabled={true}>创建用户</Button>}
  </div>
 );
 }
```

过了一个月，产品经理又说，“没有权限的话，按钮也正常展示，只是点击后给个'申请权限'的文案提示”。

**额，硬着头皮改了下代码：**

```jsx
 render() {
 let hasCreatePermission = tool.getAuth("createUser"); 
 return (
  <div>
  {hasCreatePermission ? <Button>创建用户</Button> : <Button onClick={()=>alert("权限不足，请找管理员小K申请")}>创建用户</Button>}
  </div>
 );
 }
```

如果网站中只有几个权限控制的按钮还好，想象一下，如果有50+这样的按钮，内心是不是想砍需求方？

需求方是不敢砍的。那么有没有一种方法，可以统一控制无权限时候的表现呢？

**<font color=red>有。让我们来试试React的高阶组件吧。</font>**

```jsx
export let wrapAuth = ComposedComponent =>class WrapComponent extends Component {
 // 构造
 constructor(props) {
  super(props);
 }

 static propTypes = {
  auth:PropTypes.string.isRequired,
 };

 render() {
  if (tool.getAuth(this.props.auth)) {
  return <ComposedComponent { ...this.props} />;
  } else {
  return null;
  }
 }
};
```

这个方法实际上是一个包装器，接受一个组件参数，根据权限，返回一个新的组件。

**然后页面按钮的权限控制实现改成：**

```jsx
const AuthButton = wrapAuth(Button);
class Page extends Component{
 render() {
 return (
  <div>
  <AuthButton auth="createUser">创建用户</AuthButton>
  </div>
 );
 }
}
```

当遇到前面所说的需求变动时，现在只要把包装器里`return null`这行代码改成

```jsx
return <ComposedComponent disabled={true} { ...this.props} />
```

或者

```jsx
return <ComposedComponent onClick={()=>alert("权限不足，请找管理员小K申请")} { ...this.props} />
```

就行啦。

嗯，高阶组件让生活又美好了一些~

**<font color=red>总结</font>**

以上就是这篇文章的全部内容了，希望本文的内容对大家的学习或者工作能带来一定的帮助，如果有疑问大家可以留言交流，谢谢大家对的支持。