# js

## undefined  与 ReferenceError  

通过在声明之前打印变量，可以验证变量会被提升。声明的提升意味着会输出 `undefined` 而不是 `Reference Error`：  

```
console.log(name); // undefined
var name = 'Jake';
```

下面是变量提升？
```
var name;
console.log(name); // 'Jake'
name = 'Jake';
```

未声明直接调用，会报错：

VM664:1 Uncaught ReferenceError: a is not defined

```js
console.log(a)  
```

## var、let、const

`let` 的行为非常适合在循环中声明迭代变量。使用 `var` 声明的迭代变量会泄漏到循环外部，这种情况应该避免。来看下面两个例子：  

```js
for (var i = 0; i < 10; ++i) {}
console.log(i); // 10

for (let j = 0; j < 10; ++j) {}
console.log(j); // ReferenceError: j 没有定义
```

## typeof 与 instanceof  

JavaScript 变量可以保存两种类型的值：原始值和引用值。原始值可能是以下 6 种原始数据类型之一： `Undefined`、 `Null`、 `Boolean`、 `Number`、 `String` 和 `Symbol`。  

`typeof` 操作符可以确定值的原始类型，而 `instanceof` 操作符用于确保值的引用类型。  



还有一种复杂数据类型叫 Object（对象）。  