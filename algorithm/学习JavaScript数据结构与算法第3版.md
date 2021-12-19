# 学习JavaScript数据结构与算法第3版

`null`表示变量没有值，`undefined`表示变量已经被声明，但尚未赋值。



数组解构也可以用来进行值的互换，而不需要创建临时变量，如下所示。

```
[x, y] = [y, x];
```

这对学习排序算法很有用，因为互换值的情况很常见。



**使用属性存取器**

下面的例子声明了`get`和`set`函数的类。

```js
class Person {
    constructor (name) {
    	this._name = name; // {1}
    }
    get name() { // {2}
    	return this._name;
    }
    set name(value) { // {3}
    	this._name = value;
    }
}

let lotrChar = new Person('Frodo');

console.log(lotrChar.name); // {4}

lotrChar.name = 'Gandalf'; // {5}

console.log(lotrChar.name);

lotrChar._name = 'Sam'; // {6}

console.log(lotrChar.name);
```

### 2.2.9 模块

- 在Node.js中使用原生的ES2015导入功能

将文件的扩展名由js修改为mjs.

在node命令后面添加`--experimental-modules`   来执行代码，如下所示。

```sh
node --experimental-modules 17-ES2015-ES6-Modules.mjs
```

### 2.3.1 类型推断

TypeScript  有一个类型推断机制，会根据为变量赋的值自动给该变量设置一个类型。因此，不需要显式地给这些变量设置类型。

```tsx
let age = 20; // 数
let existsFlag = true; // 布尔值
let language = 'JavaScript'; // 字符串
```

那么，什么时候需要给变量设置类型呢？如果声明了一个变量但没有设置其初始值，推荐为其设置一个类型。如下所示。

### 2.3.4 TypeScript中对 JavaScript 文件的编译时检查

# 第3章 数组

### 3.3.2  在数组开头插入元素

**使用unshift方法**

```js
numbers.unshift(-2);
numbers.unshift(-4, -3);
```

## 3.4 删除元素