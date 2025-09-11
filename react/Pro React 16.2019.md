# 第 14 章 

## Using Contexts for Global Data  

组件的属性（props）管理可能会变得复杂，无论你如何组织你的应用。随着应用复杂度的增加，需要协作的组件数量也随之增多。当组件的层级结构越来越深时，状态数据会被提升到应用中更高的位置，离实际使用这些数据的地方越来越远，结果就是每个组件都不得不传递它自己并不直接使用、但它的后代组件却依赖的属性。

为了解决这个问题，React 提供了上下文（context）功能，它允许状态数据从定义的地方直接传递到需要的地方，而无需通过中间组件层层传递。为了演示这一点，我将把示例应用中的“专业模式”（Pro Mode）设计得更加细致，使其禁用排序按钮，而不是完全隐藏数据列表。

在清单 14-25 中，我为 ActionButton 组件渲染的按钮元素添加了一个属性，该属性根据传入的 prop 设置按钮的 disabled 状态，并更改了 Bootstrap 主题，使得按钮被禁用时更加明显。



这被称为 **属性钻取（prop drilling）** 或 **属性传递（prop threading）**，即数据值通过组件层级向下传递，直到能够被使用的地方。很容易忘记传递某个后代组件所需的属性，而在复杂的应用中，要找出属性传递在哪一步被遗漏也是一件很麻烦的事。在清单 14-26 中，我更新了 App 组件，移除了上一节中的 ProFeature 组件，并将 proMode 状态属性的值作为属性传递给 SortedList 组件，从而开始了属性传递的过程。

正是 **context（上下文）** 功能解决了这个问题，它允许状态数据直接传递给使用它的组件，而无需通过那些在层级结构中将它们分隔开的中间组件进行层层传递。

### 定义 Context

### 创建 Context Consumer  

### 创建 Context Provider  

### 在 Consumer 中更改Context数据

上下文中的数据值是只读的，但你可以在上下文对象中包含一个用于更新源状态数据的函数，从而创建一个等效于函数属性（function prop）的效果。在清单 14-31 中，我添加了一个函数的占位符，该函数将在提供者（provider）应用内容而不使用 value 属性时被调用。

### 使用简化的 Context Consumer APIs  

React 提供了另一种访问上下文的方式，这种方式比使用渲染属性函数（render prop function）更简单易用，如清单 14-35 所示。

通过将一个名为 contextType 的静态属性赋值为某个上下文，该上下文就可以在整个组件中通过 this.context 访问。这是 React 相对较新的一个特性，使用起来可能更加简便，但需要注意的是，一个组件只能消费一个上下文。

### Consuming a Context Using Hooks  

`useContext` 钩子为函数组件提供了与 `contextType` 属性相对应的解决方案。在清单 14-36 中，我将 `ProModeToggle` 组件重写为一个依赖 `useContext` 钩子的函数定义。

```jsx
import React, { useContext } from "react";
import { ProModeContext } from "./ProModeContext";

export function ProModeToggle(props) {
    
  const context = useContext(ProModeContext);
    
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        value={context.proMode}
        onChange={context.toggleProMode}
      />
      <label className="form-check-label">{props.label}</label>
    </div>
  );
}
```

`useContext` 函数返回一个上下文对象，通过该对象可以访问其中的属性和函数。