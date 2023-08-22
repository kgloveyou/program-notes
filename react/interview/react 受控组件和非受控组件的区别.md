# react 受控组件和非受控组件的区别

React 中的受控组件和非受控组件是两种处理表单元素的不同方式，它们有以下主要区别：

**受控组件（Controlled Components）：**

1. **状态由 React 管理：** 在受控组件中，表单元素的值（例如 input 字段的值）由 React 组件的状态（state）来控制和管理。

2. **事件处理器：** 受控组件通常会使用事件处理器来处理输入的变化。当用户输入数据时，onChange 事件处理函数会被触发，然后更新组件的状态，从而重新渲染组件并反映新的输入值。

3. **单一数据源：** 数据存储在 React 组件的状态中，使得数据的来源和修改非常明确。这也使得对数据的验证、转换和处理变得更加容易。

4. **动态控制：** 受控组件允许你动态地控制输入元素的值，例如，你可以在用户输入之前对输入进行验证并决定是否接受输入。

5. **适用于大多数场景：** 受控组件适用于大多数情况，特别是当你需要对用户输入进行验证、转换或处理时。

**非受控组件（Uncontrolled Components）：**

1. **状态不受 React 控制：** 在非受控组件中，表单元素的值不受 React 组件的状态管理。相反，DOM 元素自己管理它们的状态。

2. **直接 DOM 操作：** 你可以使用原生 JavaScript 或 jQuery 等工具来操作表单元素，而不需要通过 React 事件处理器。

3. **数据来源不明确：** 数据可以来自多个来源，因为 React 不掌握数据的控制权。

4. **难以实现动态控制：** 非受控组件通常不容易实现动态控制，因为 React 不跟踪表单元素的值，你需要手动查询 DOM 来获取数据。

5. **适用于集成第三方库：** 非受控组件可能在需要集成使用不受 React 控制的第三方库时有用，或者在某些情况下可以简化代码。

通常情况下，建议使用受控组件，因为它们更易于管理和测试，并与 React 的响应性特性更加兼容。非受控组件通常用于特殊情况，或者当你需要与不受 React 控制的外部代码进行交互时。

# 分别举几个受控组件和非受控组件的列子

以下是受控组件和非受控组件的一些示例：

**受控组件示例：**

1. **受控输入框（Controlled Input）：**
   ```jsx
   class ControlledInput extends React.Component {
     constructor(props) {
       super(props);
       this.state = { value: '' };
     }

     handleChange(event) {
       this.setState({ value: event.target.value });
     }

     render() {
       return (
         <input
           type="text"
           value={this.state.value}
           onChange={(e) => this.handleChange(e)}
         />
       );
     }
   }
   ```
   在这个示例中，输入框的值受 React 组件状态的控制。

2. **受控复选框（Controlled Checkbox）：**
   ```jsx
   class ControlledCheckbox extends React.Component {
     constructor(props) {
       super(props);
       this.state = { isChecked: false };
     }

     toggleCheckboxChange() {
       this.setState({ isChecked: !this.state.isChecked });
     }

     render() {
       return (
         <input
           type="checkbox"
           checked={this.state.isChecked}
           onChange={() => this.toggleCheckboxChange()}
         />
       );
     }
   }
   ```
   这个示例中，复选框的选中状态也受 React 组件状态的控制。

**非受控组件示例：**

1. **非受控输入框（Uncontrolled Input）：**
   ```jsx
   function UncontrolledInput() {
     let inputRef = React.createRef();

     function handleButtonClick() {
       alert('Input Value: ' + inputRef.current.value);
     }

     return (
       <div>
         <input type="text" ref={inputRef} />
         <button onClick={handleButtonClick}>获取输入值</button>
       </div>
     );
   }
   ```
   在这个示例中，输入框的值不受 React 状态管理，而是通过 DOM 引用 (`ref`) 直接访问。

2. **非受控表单（Uncontrolled Form）：**
   ```jsx
   function UncontrolledForm() {
     function handleSubmit(event) {
       event.preventDefault();
       const formData = new FormData(event.target);
       console.log('Form Data:', Object.fromEntries(formData.entries()));
     }

     return (
       <form onSubmit={handleSubmit}>
         <input type="text" name="username" placeholder="用户名" />
         <input type="password" name="password" placeholder="密码" />
         <button type="submit">提交</button>
       </form>
     );
   }
   ```
   在这个示例中，整个表单的数据通过 DOM 直接处理，而不需要 React 状态管理。

受控组件的主要特点是 React 状态管理输入值，而非受控组件则直接通过 DOM 操作来处理输入值。选择哪种方式取决于具体的需求和项目的复杂性。通常情况下，受控组件更容易管理和测试，而非受控组件可能在某些情况下更灵活。