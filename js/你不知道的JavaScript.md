https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/README.md

https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN

第2版中文翻译：https://github.com/qiweiii/You-Dont-Know-JS

# 你不知道的JavaScript(上卷)

## 第 4 章  提升

### 4.2 编译器再度来袭  

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

**重返块作用域**  

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

### 5.5 模块  

### 5.6 小结  

当函数可以记住并访问所在的词法作用域， 即使函数是在当前词法作用域之外执行， 这时就产生了闭包。  

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

