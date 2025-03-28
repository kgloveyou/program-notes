 React 通关秘籍

https://juejin.cn/book/7294082310658326565

https://github.com/QuarkGluonPlasma/react-course-code

# 2、一网打尽组件常用 Hook

## memo + useMemo + useCallback

**memo 是防止 props 没变时的重新渲染，useMemo 和 useCallback 是防止 props 的不必要变化。**

所以说，**如果子组件用了 memo，那给它传递的对象、函数类的 props 就需要用 useMemo、useCallback 包裹，否则，每次 props 都会变，memo 就没用了。**

**反之，如果 props 使用 useMemo、useCallback，但是子组件没有被 memo 包裹，那也没意义，因为不管 props 变没变都会重新渲染，只是做了无用功。**

memo + useCallback、useMemo 是搭配着来的，少了任何一方，都会使优化失效。

**但 useMemo 和 useCallback 也不只是配合 memo 用的：**

比如有个值的计算，需要很大的计算量，你不想每次都算，这时候也可以用 useMemo 来缓存。

# 3、Hook 的闭包陷阱的成因和解决方案

# 5、React 组件如何调试

# 6、受控模式 VS 非受控模式

**value 由用户控制就是非受控模式，由代码控制就是受控模式**。

那什么情况用受控模式呢？

当然是你**需要对输入的值做处理之后设置到表单的时候，或者是你想实时同步状态值到父组件。**

## 总结

涉及到用户输入的组件都要考虑用受控模式还是非受控模式。

**value 由用户控制就是非受控模式，由代码控制就是受控模式**。

非受控模式就是完全用户自己修改 value，我们只是设置个 defaultValue，可以通过 onChange 或者 ref 拿到表单值。

受控模式是代码来控制 value，用户输入之后通过 onChange 拿到值然后 setValue，触发重新渲染。

单独用的组件，绝大多数情况下，用非受控模式就好了，因为你只是想获取到用户的输入。

受控模式只在需要对用户的输入做一些修改然后再设置到 value 的情况用，再就是实时同步表单值到父组件的时候，比如 Form。

如果需要结合 Form 表单用，那是要支持受控模式，因为 Form 会通过 Store 来统一管理所有表单项。

封装业务组件的话，用非受控模式或者受控都行。

有的团队就要求组件一定是受控的，然后在父组件里维护状态并同步到状态管理库，这样组件重新渲染也不会丢失数据。

但是基础组件还是都要支持，也就是支持 defaultValue 和 value + onChange 两种参数，内部通过判断 value 是不是 undefined 来区分。

写组件想同时支持受控和非受控，可以直接用 ahooks 的 useControllableValue，也可以自己实现。

arco design、ant design 等组件库都是这么做的，并且不约而同封装了 useMergedValue 的 hook，我们也封装了一个。

理清受控模式和非受控模式的区别，在写组件的时候灵活选用或者都支持。

# 17、浏览器的 5 种 Observer

## IntersectionObserver

一个元素从不可见到可见，从可见到不可见，这种变化如何监听呢？

用 IntersectionObserver。

**IntersectionObserver 可以监听一个元素和可视区域相交部分的比例，然后在可视比例达到某个阈值的时候触发回调。**

# 20、图解网页的各种距离

## 总结

浏览器里计算位置、宽高、判断一些交互，都需要用到距离、宽高的属性。

这类属性比较多，我们整体过了一遍：

- e.pageY：鼠标距离文档顶部的距离
- e.clientY：鼠标距离可视区域顶部的距离
- e.offsetY：鼠标距离触发事件元素顶部的距离
- e.screenY：鼠标距离屏幕顶部的距离
- winwodw.scrollY：页面滚动的距离，也叫 window.pageYOffset，等同于 document.documentElement.scrollTop
- element.scrollTop：元素滚动的距离
- element.clientTop：上边框高度
- element.offsetTop：相对有 position 的父元素的内容顶部的距离，可以递归累加，加上 clientTop，算出到文档顶部的距离
- clientHeight：内容高度，不包括边框
- offsetHeight：包含边框的高度
- scrollHeight：滚动区域的高度，不包括边框
- window.innerHeight：窗口的高度
- element.getBoundingClientRect：拿到 width、height、top、left 属性，其中 top、left 是元素距离可视区域的距离，width、height 绝大多数情况下等同 offsetHeight、offsetWidth，但旋转之后就不一样了，拿到的是包围盒的宽高

其中，还要注意 react 的合成事件没有 offsetY 属性，可以自己算，react-use 的 useMouse 的 hook 就是自己算的，也可以用 e.nativeEvent.offsetY 来拿到。

掌握这些宽高、距离属性，就足够处理各种需要计算位置、宽高的需求了。

# 21、自定义 hook 练习

**自定义 hook 就是函数封装，和普通函数的区别只是在于名字规范是用 use 开头，并且要用到 rect 的内置 hook。**



其中要注意的是返回的函数一般都用 useCallback 包裹，这样返回值作为 memo 组件的参数的时候，调用者不用再处理。

# 22、自定义 hook 练习（二）

## useWhyDidYouUpdate

props 变了会导致组件重新渲染，而 [useWhyDidYouUpdate](https://ahooks.js.org/zh-CN/hooks/use-why-did-you-update) 就是用来打印是哪些 props 改变导致的重新渲染。



# 非空断言

```typescript
const targetNode = containerRef.current!;
```

在你的代码片段中，`const targetNode = containerRef.current!;` 这一行使用了 TypeScript 的非空断言操作符 `!`。这个操作符告诉 TypeScript 编译器，尽管类型检查器无法确定该值是否为 `null` 或 `undefined`，但你可以保证它在此上下文中不会是 `null` 或 `undefined`。

### 解释

- **`containerRef`**：这是一个 React 引用（通常通过 `useRef` 钩子创建），用于直接访问 DOM 元素或 React 组件实例。
  
- **`current` 属性**：`useRef` 返回的对象有一个名为 `current` 的属性，它可以指向任何可变的值。对于 DOM 引用，`current` 将指向相应的 DOM 节点。

- **非空断言 `!`**：在 `containerRef.current!` 中使用的 `!` 是 TypeScript 的非空断言操作符。它告诉 TypeScript 编译器假设 `containerRef.current` 不会是 `null` 或 `undefined`，即使 TypeScript 类型系统认为它可能是。

### 使用场景

当你确定 `containerRef.current` 在运行时不会为 `null` 或 `undefined` 时，可以使用非空断言来避免编译错误。例如：

```typescript
import React, { useRef, useEffect } from 'react';

const MyComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetNode = containerRef.current!; // 使用非空断言

    // 现在可以安全地调用 targetNode 上的方法
    targetNode.style.backgroundColor = 'lightblue';
  }, []);

  return <div ref={containerRef}>Hello, world!</div>;
};

export default MyComponent;
```

### 注意事项

1. **确保安全性**：虽然非空断言可以帮助你绕过 TypeScript 的类型检查，但请确保在实际运行时逻辑中确实不会出现 `null` 或 `undefined` 的情况。否则，可能会导致运行时错误。

2. **替代方案**：如果你不能完全确定 `containerRef.current` 是否为 `null` 或 `undefined`，可以考虑使用条件判断来处理这种情况：
   
   ```typescript
   useEffect(() => {
     if (containerRef.current) {
       const targetNode = containerRef.current;
       targetNode.style.backgroundColor = 'lightblue';
     }
   }, []);
   ```

3. **初始化引用**：确保在组件挂载后引用才被正确设置。如果在组件尚未挂载时尝试访问 `current`，它将为 `null`。因此，通常会在 `useEffect` 钩子中进行此类操作。

### 总结

使用非空断言 `!` 可以简化代码并避免不必要的类型检查，但在使用时务必确保其安全性。如果你有任何疑问或需要进一步的帮助，请随时告知！

# 32、项目里如何快速定位组件源码？

使用了click-to-react-component组件。

react1s浏览器插件可以实现类似的功能，且使用更方便。

# 39、React 组件库都是怎么构建的

lib 下的组件是 commonjs 的：

es 下的组件是 es module 的：

dist 下的组件是 umd 的：

然后在 package.json 里分别声明了 commonjs、esm、umd 还有类型的入口。

这样，当你用 require 引入的就是 lib 下的组件，用 import 引入的就是 es 下的组件。

而直接 script 标签引入的就是 unpkg 下的组件。

# 45、基于 React Router 实现 keepalive

评论中提到的几个类似组件：umi-plugin-keep-alive、react-activation、react-offscreen。

# 46、History api 和 React Router 实现原理

浏览器长按后退按钮，就会列出历史记录，这就是 history。

# 47、React Context 的实现原理和在 antd 里的应用

总结来说就是**用 createContext 创建 context 对象，用 Provider 修改其中的值， function 组件使用 useContext 的 hook 来取值，class 组件使用 Consumer 来取值。**