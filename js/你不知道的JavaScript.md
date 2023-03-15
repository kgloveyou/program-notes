https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/README.md

https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN

第2版中文翻译：https://github.com/qiweiii/You-Dont-Know-JS

# 你不知道的JavaScript(上卷)

# 第 3章  函数作用域和块作用域

### 3.3.2 立即执行函数表达式  

```js
var a = 2;
(function foo() {
  var a = 3;
  console.log(a); // 3
})();
console.log(a); // 2
```

这种模式很常见， 几年前社区给它规定了一个术语： IIFE， 代表立即执行函数表达式（Immediately Invoked Function Expression） ；  

## 第 4 章  提升

### 4.2 编译器再度来袭  

因此， 正确的思考思路是， 包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。  

**例1**

```js
a = 2;
var a;
console.log( a );
```

会以如下形式进行处理：  

```js
var a;
a = 2;
console.log( a );
```
**例2**

```js
console.log( a );
var a = 2;
```

实际是按照以下流程处理的：  

```js
var a;
console.log( a );
a = 2;
```

因此， 打个比方， 这个过程就好像变量和函数声明从它们在代码中出现的位置被“移动”到了最上面。 这个过程就叫作`提升`。
换句话说， `先有蛋（声明） 后有鸡（赋值）` 。  

**注意**：只有声明本身会被提升， 而赋值或其他运行逻辑会留在`原地`。 如果提升改变了代码执行的顺序， 会造成非常严重的破坏。  

```js
foo();
function foo() {
  console.log(a); // undefined
  var a = 2;
}
```

函数声明会被提升， 但是函数表达式却不会被提升。  

```js
function foo() {
	var a;

	console.log( a ); // undefined

	a = 2;
}

foo();
```

```js
foo(); // not ReferenceError, but TypeError!

var foo = function bar() {
	// ...
};
```

### 4.3 函数优先  

函数声明和变量声明都会被提升。 但是一个值得注意的细节（这个细节可以出现在有多个“重复” 声明的代码中） 是函数会首先被提升， 然后才是变量。  

## 第 5 章  作用域闭包  



### 5.4 循环和闭包

```
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

  输出

```bash
[Running] node "c:\Users\Administrator\Desktop\js\5.4.js"
6
6
6
6
6

[Done] exited with code=0 in 5.124 seconds
```

**重返块作用域**  

`for` 循环头部的 `let` 声明还会有一个特殊的行为。 这个行为指出变量在循环过程中不止被声明一次， 每次迭代都会声明。 随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。  

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```
输出
```bash
[Running] node "c:\Users\Administrator\Desktop\js\5.4.js"
1
2
3
4
5

[Done] exited with code=0 in 5.146 seconds
```



### 5.5 模块

### 5.5.2 未来的模块机制

**注意**：基于函数的模块并不是一个能被稳定识别的模式（编译器无法识别）， 它们的 API 语义只有在运行时才会被考虑进来。 因此可以在运行时修改一个模块的 API（参考前面关于公共 API 的讨论）。  

相比之下， ES6 模块 API 更加稳定（API 不会在运行时改变）。 由于编辑器知道这一点， 因此可以在（的确也这样做了） 编译期检查对导入模块的 API 成员的引用是否`真实存在`。 如果 API 引用并不存在， 编译器会在运行时抛出一个或多个“早期” 错误， 而不会像往常一样在运行期采用动态的解决方案。  



### 5.6 小结  

`当函数可以记住并访问所在的词法作用域， 即使函数是在当前词法作用域之外执行， 这时就产生了闭包。`  

## 附 录 A  动态作用域  

js中词法作用域

```js
function foo() {
	console.log( a ); // 2
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();
```

主要区别： 词法作用域是在写代码或者说定义时确定的， 而动态作用域是在运行时确定的。（`this` 也是！ ） 词法作用域关注函数在何处声明， 而动态作用域关注函数从何处调用。  