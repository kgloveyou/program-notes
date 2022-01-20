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

​		一些开发者还是更习惯使用普通的 JavaScript 语言，而不是 TypeScript 来进行开发。但是在JavaScript 中使用一些类型和错误检测功能也是很不错的！
​		好消息是 TypeScript 提供了一个特殊的功能，允许我们在编译时对代码进行错误检测和类型检测！要使用它的话，需要在计算机上全局安装 TypeScript。使用时，只需要在 JavaScript 文件的第一行添加一句`// @ts-check`，如下图所示。  

​		向代码中添加 JSDoc（ JavaScript 文档）之后，类型检测将被启用。如果试着向 `circle`（或`circleArea`）方法中传入一个字符串，会得到一个编译错误。  

17-CalcArea.mjs

```js
/**
 * 
 * @param {number} r (radius of a circle)
 * @returns 
 */
export const circleArea = r => 3.14 * (r ** 2);
```
17-ES2015-ES6-Modules.mjs

<img src="学习JavaScript数据结构与算法第3版.assets/image-20220120204942226.png" alt="image-20220120204942226" style="zoom:50%;" />

# 第3章 数组

### 3.3.2  在数组开头插入元素

**使用unshift方法**

```js
numbers.unshift(-2);
numbers.unshift(-4, -3);

//[ -4, -3, -2 ]
```

## 3.4 删除元素

### 3.4.1 从数组末尾删除元素  

```js
numbers.pop();  
```

通过 `push` 和 `pop` 方法，就能用数组来模拟栈 。

### 3.4.2 从数组开头删除元素  

```js
numbers.shift();  
```

通过 `shift` 和 `unshift` 方法，我们就能用数组模拟基本的队列数据结构。（？）

## 3.5 在任意位置添加或删除元素  

使用 splice 方法，简单地通过指定位置/索引，就可以删除相应位置上指定数量的元素。  

```js
numbers.splice(5,3);  
```

这行代码删除了从数组索引 5 开始的 3 个元素。  这就意味着 numbers[5]、 numbers[6]和numbers[7]从数组中删除了。  



现在，我们想把数 2、 3、 4 插入数组里，放到之前删除元素的位置上，可以再次使用 splice方法。

```js
numbers.splice(5, 0, 2, 3, 4);  
```

`splice` 方法接收的第一个参数，表示想要删除或插入的元素的索引值。第二个参数是删除元素的个数（这个例子里，我们的目的不是删除元素，所以传入 0）。第三个参数往后，就是要添加到数组里的值（元素 2、 3、 4）。  

## 3.6 二维和多维数组  

### 3.6.1 迭代二维数组的元素  

```js
let averageTemp = [];
// day 1
averageTemp[0] = [];
averageTemp[0][0] = 72;
averageTemp[0][1] = 75;
averageTemp[0][2] = 79;
averageTemp[0][3] = 79;
averageTemp[0][4] = 81;
averageTemp[0][5] = 81;
// day 2
averageTemp[1] = [];
averageTemp[1][0] = 81;
averageTemp[1][1] = 79;
averageTemp[1][2] = 75;
averageTemp[1][3] = 75;
averageTemp[1][4] = 73;
averageTemp[1][5] = 73;

console.table(averageTemp)
```

<img src="学习JavaScript数据结构与算法第3版.assets/image-20220120153900454.png" alt="image-20220120153900454" style="zoom:50%;" />

### 3.6.2 多维数组  

```js
const matrix3x3x3 = [];
for (let i = 0; i < 3; i++) {
    matrix3x3x3[i] = []; // 我们需要初始化每个数组
    for (let j = 0; j < 3; j++) {
        matrix3x3x3[i][j] = [];
        for (let z = 0; z < 3; z++) {
            matrix3x3x3[i][j][z] = i + j + z;
        }
    }
}
```

输出这个矩阵的内容  

```js
for (let i = 0; i < matrix3x3x3.length; i++) {
    for (let j = 0; j < matrix3x3x3[i].length; j++) {
        for (let z = 0; z < matrix3x3x3[i][j].length; z++) {
            console.log(matrix3x3x3[i][j][z]);
        }
    }
}
```

## 3.7 JavaScript 的数组方法参考  

| 方法   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| slice  | 传入索引值，将数组里对应索引范围内的元素作为新数组返回       |
| filter | 对数组中的每个元素运行给定函数，返回该函数会返回 true 的元素组成的数组 |
| map    | 对数组中的每个元素运行给定函数，返回每次函数调用的结果组成的数组 |

### 3.7.1 数组合并  

```js
const zero = 0;
const positiveNumbers = [1, 2, 3];
const negativeNumbers = [-3, -2, -1];
let numbers = negativeNumbers.concat(zero, positiveNumbers);
// [-3, -2, -1, 0, 1,  2,  3]
```

`concat` 方法可以向一个数组传递数组、对象或是元素。数组会按照该方法传入的参数顺序连接指定数组。  

### 3.7.2 迭代器函数  

#### 5. 使用 reduce 方法  

reduce 方法接收一个有如下四个参数的函数： previousValue、currentValue、 index 和 array。因为 index 和 array 是可选的参数，所以如果用不到它们
的话，可以不传。这个函数会返回一个将被叠加到累加器的值， reduce 方法停止执行后会返回这个累加器。如果要对一个数组中的所有元素求和，这就很有用。  

```js
numbers.reduce((previous, current) => previous + current);  
```



这三个方法（ `map`、 `filter` 和 `reduce`）是 JavaScript 函数式编程的基础  

### 3.7.3 ECMAScript 6 和数组的新功能  

#### \6. 使用 fill 方法  

```js
numbersCopy.fill(0);  
```

我们还可以指定开始填充的索引，如下所示。  

```js
numbersCopy.fill(2, 1);  
// [0, 2, 2, 2, 2, 2]
```

可以指定结束填充的索引。  

```
numbersCopy.fill(1, 3, 5);  
```

在上面的例子里，我们会把 1 填充到数组索引 3 到 5 的位置（不包括 3 和 5），得到的数组为[0, 2, 2, 1, 1, 2]。  



创建数组并初始化值的时候， `fill` 方法非常好用，就像下面这样。

```js
let ones = Array(6).fill(1);
```

上面的代码创建了一个长度为 6、所有值都是 1 的数组（ `[1, 1, 1, 1, 1, 1]`）。  

### 3.7.4 排序元素  

```js
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
numbers.sort()
// [1, 10, 11, 12, 13, 14, 15,  2,  3,  4,  5,  6, 7,  8,  9]
```

这是因为 sort 方法在对数组做排序时，把元素默认成字符串进行相互比较。  

我们可以传入自己写的比较函数。  

```js
numbers.sort((a, b) => a - b);
```

在 b 大于 a 时，这段代码会返回负数，反之则返回正数。如果相等的话，就会返回 0。也就是说返回的是负数，就说明 a 比 b 小，这样 sort 就能根据返回值的情况对数组进行排序。  

以上将数组按升序排序。  

#### \1. 自定义排序  

#### \2. 字符串排序  

```js
let names = ['Ana', 'ana', 'john', 'John'];
console.log(names.sort());
// ["Ana", "John", "ana", "john"]
```

这是因为 JavaScript 在做字符比较的时候，是根据字符对应的 ASCII 值来比较的。  

## 3.8 类型数组  

​	类型数组则用于存储单一类型的数据。它的语法是 `let myArray = new TypedArray(length)`，其中 `TypedArray` 需替换为下表所列之一。  



​	使用 WebGL API、进行位操作、处理文件和图像时，类型数组都可以大展拳脚。它用起来和普通数组毫无二致，本章所学的数组方法和功能都可以用于类型数组。  

​	https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/是一个很好的教程，讲解了如何使用类型数组处理二进制数据，以及它在实际项目中的应用。

## 3.9 TypeScript 中的数组  

# 第 4 章  栈

## 4.2 栈数据结构  

### 4.2.1 创建一个基于数组的栈  

