# 第1章 基础知识

## 1.1 Node是什么

Node底层使用C++实现，语法则是遵循ECMAScript规范。

## 1.2 Node的内部机制

虽然代码运行在单线程环境下，但依靠异步+回调的方式，也能实现对高并发的支持。



# 第2章 常用模块

## 2.1 Module

### 2.1.1 JavaScript的模块规范

**1.	CommonJS**

​	CommonJS将每个文件都看作一个模块，模块内部定义的变量都是私有的，无法被其他模块实现，除非使用预定义的方法将内部的变量暴露出来（通过exports和require关键字来实现），CommonJS最出名的实现就是Node.js。

​	CommonJS一个显著的特点就是模块的加载是同步的，就目前来说，受限于宽带速度，并不适用于浏览器中的JavaScript。

**2.	AMD**

​	目前在前端流行的RequireJS就是AMD规范的一种实现。

​	此外，ES6中也提出了一种模块机制。

### 2.1.2 require及其运行机制

注意：在引入自定义模块时省略相对路径"./"会导致错误。

require关键字并不依赖于exports，我们也可以加载一个没有暴露任何方法的模块，这相当于直接执行一个模块内部的代码，通常没什么意义。

**1、重复引入**

​		在Node中无须关心重复引入的问题，因为Node默认先从缓存中加载模块，也就是说在任何情况下每个模块都在缓存中有一个实例。

**2、require的缓存策略**

​		Node的缓存是基于文件路径定位的，这表示即使有两个完全相同的文件，但它们在不同的路径下，也会在缓存中维持两份。

### 2.1.3 require的隐患

当调用require加载一个模块时，模块内部的代码都会被调用，有时候这可能会带来隐藏的bug。

```javascript
//module.js

function moduleTest(){
​    setInterval(function(){

​        console.log("test");

​    },1000)
}

moduleTest();

//test.js

var test = require("./module.js");


```

会一直输出test......

### 2.1.4 模块化与作用域

**1.控制台中的this**

Node.js REPL(交互式解释器)

我们可以输入以下命令来启动 Node 的终端：

```sh
$ node
> 
```

**2.脚本中的this**

**3.Node中的作用域种类**

以下讨论的作用域内容仅限于脚本文件。

（1）全局作用域

（2）模块作用域

（3）函数作用域

（4）块级作用域

ES2015中引入的let关键字提供了块级作用域支持。

## 2.2 Buffer

## 2.3 File System

## 2.4 HTTP服务

### 2.4.1 创建HTTP服务器

通常使用createServer方法创建HTTP服务器。

### 2.4.2 处理HTTP请求

### 2.4.3 Response对象

### 2.4.4 上传数据

```javascript
var formidable = require("formidable");
```

代码中引入了第三方模块，需要`npm install formidable`进行安装。

### 2.4.5 HTTP客户端服务

### 2.4.6 创建代理服务器

代理服务器相当于在客户端和目标服务器之间建立了一个中转，所有的访问和流量都经过这个服务器进行中转。

**关于反向代理**

如果一个代理服务器可以代理外部的访问来访问内部网络时，这种代理方式就被称为反向代理。

CDN就是一个反向代理的例子。

## 2.5 TCP服务

## 2.6 更安全的传输方式-SSL

HTTPS（HTTP+SSL）

**HTTPS的缺点**

​		HTTPS的缺点在于比普通的HTTP连接要慢，普通的HTTP只需要三次握手就能建立TCP连接，而HTTPS还需要加上额外的SSL验证过程。

## 2.7 WebSocket

​		WebSocket提供了客户端和服务器之间全双工的通信机制。

### 2.7.2 为什么要有WebSocket

​		WebSocket可以实现浏览器和服务器的全双工通信，，它和传统的jsonp、comet等解决方案不同，不必浏览器发送请求后再由服务器返回消息，而是可以由服务器主动发起向浏览器的数据传输。



## 2.8 Stream

## 2.9 Events

​		Node的Events模块只定义了一个类，就是EventEmitter。

2.9.2

## 2.10 多进程服务

### 2.10.1 child_process模块

child_process模块，用来提供多进程的支持。

### 2.10.2 spawn

### 2.10.3 fork

### 2.10.4 exec和execFile

### 2.10.6 进程间通信

## 2.11 Process对象

process是一个全局对象，无需声明即可访问，每个Node进行都有独立的process对象。

```js
//环境变量
console.log(process.env)
// console.log(process.getuid());//用户ID
console.log(process.argv);//node 的命令行参数列表，argv[0]表示node，argv[1]表示当前文件路径
console.log(process.pid);//进程ID
console.log(process.cwd());//当前目录
console.log(process.version);//Node版本
```



## 2.12 Timer

### 2.12.2 定时器中的this

​		在JavaScript中，setTimeout和setInterval中的this均指向Window。原因很简单，定时器方法的第一个参数是匿名函数，在JavaScript中所有匿名函数的this都指向Window。

```js
setTimeout(function () {
    console.log(this);
}, 1000);

//Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
```

​		

在Node中，setTimeout和setInterval中的this均指向timeout类。该类在setTimeout和setInterval内部创建并返回。

```js
setTimeout(function () {
    console.log(this);
}, 1000);

//Timeout {...}
```

*注意：箭头函数中this引用setTimeout的外面一层的this而已。（箭头函数本身没有定义this,在箭头函数内部使用this关键字时，它开始在代码定义的位置向上找，直到遇见第一个this。）

```js
setTimeout(() => {
    console.log(this);
}, 1000);

//{}
```

如果在setTimeout方法内部涉及了this的指向问题，通常会使用bind或者call方法来重新绑定this.

```js
function Person() {
    this.name = 'Leaf';
}

Person.prototype.intro = function () {
    console.log(this.name);
}

var person = new Person();
setTimeout(
    person.intro.bind(person)
, 1000);
```



# 第3章 用ES6来写Node

## 3.2 块级作用域

### 3.2.1 ES5中的作用域

ES5中只有两种作用域，全局作用域和函数作用域，例如在一个js文件中声明一个变量：

```js
var name = 'lear';
```

​		代码中的name变量属于全局作用域，这表示在同一文件中的任何位置都可以访问到该变量，如果想创建一个新的作用域，只能通过声明一个新的函数来实现。

```js
var name = 'lear';

function test() {
    var name = 'Sue';
    console.log(name);
}

test();		//Sue
console.log(name);		//lear
```

1. **块级作用域**

   ES5中没有块级作用域的设计。

   ```js
   if(true){
       var x = 2;
       console.log(x);		//2
   }
   console.log(x);		//2
   ```

   这表明if代码块也属于全局作用域。要想避免这种情况，通常使用一个闭包来隔离作用域。

   ```js
   function foo(params) {
       var x = 1;
       if(x){
           (function () {
               var x = 2;
               console.log(x);		//2
           }());
       }
       console.log(x)		//1
   }
   
   foo();
   ```

   

2. **变量提升**

   ```
   console.log(msg);
   
   var msg = 'I get you';
   ```

   最后打印出的是undefined。

   实际上，上面代码存在一个隐式的变量提升，变量msg的声明被提升到代码最前面。

   实际执行的是如下代码：

   ```
   var msg;
   
   console.log(msg);
   
   msg = 'I get you';
   ```

   

### 3.2.2 let 关键字

### 3.2.3 const 关键字

const声明的变量虽然不能修改，但使用const修改的对象却是可以被修改的。

```js
const b = {};
b.name ="lear";
b.age =10;
console.log(b);//{ name: 'lear', age: 10 }
```

这表明const内部是依靠指针来判断一个对象是否被修改的。

## 3.3 数组

​		ES5中的Array方法：

- shift()	

  Remove the first item of an array:

- slice()    

  Select elements from an array:

  ```js
  var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
  var citrus = fruits.slice(1, 3);
  ```

- splice()

  https://www.w3schools.com/jsref/jsref_splice.asp

  The splice() method adds/removes items to/from an array, and returns the removed item(s).

  ```js
  var fruits = ["Banana", "Orange", "Apple", "Mango"];
  fruits.splice(2, 0, "Lemon", "Kiwi");
  ```

  ## Definition and Usage

  The splice() method adds/removes items to/from an array, and returns the removed item(s).

  **Note:** This method changes the original array.

  ## Syntax

  *array*.splice(*index*, *howmany*, *item1*, ....., *itemX*)

  

## 3.4 函数

### 3.4.3 箭头函数

​		除了简洁之外，箭头函数还有一个优点，即“修复”this作用域的问题。

​		**匿名函数中的this**

​		在ES5中，匿名函数默认是指向全局对象的，在浏览器中为Window对象，在Node中大部分情况下都会指向global对象（定时器API略有不同）。

### 3.4.4 箭头函数的陷阱

​		箭头函数本身没有定义this,在箭头函数内部使用this关键字时，它开始在代码定义的位置向上找，直到遇见第一个this。



​		JavaScript中的this是在运行时基于函数的执行环境决定的：

- 全局函数中的this指向全局对象
- 当作为某个对象的方法调用时会指向当前对象
- 箭头函数因为本身没有this，而是会一直往上查找。

## 3.5 Set和Map

### 3.5.1 Set和WeakSet

​		WeakSet和Set的主要区别在于WeakSet的成员只能是对象。

​		WeakSet中的“Weak”指的是弱引用。它的优点在于对垃圾回收有利。

## 3.6 Iterator

### 3.6.2 ES6中的Iterator

​		ES6中的Iterator接口通过Symbol.iterator属性来实现。如果一个对象设置了Symbol.iterator属性，就表示该对象是可以被遍历的，我们就可以使用next方法类遍历它。

```js
var Iter ={
    [Symbol.iterator] : function () {
        var i=0;
        return {
            next: function () {
                return ++i;
            }
        };
    }
};

var obj = new Iter[Symbol.iterator]();
// var obj = new Iter();   //TypeError: Iter is not a constructor

obj.next();	// 1
obj.next();	// 2
```

### 3.6.3 Iterator遍历

​		在ES6中，所有实现了Symbol.iterator接口的对象都可以使用for/of循环进行遍历。

## 3.7 对象

### 3.7.1 新的方法

1. **Object.assign()**

   ```js
   var obj1 = { a: {b: 1}}
   var obj2 = Object.assign({}, obj1)
   
   obj1.a.b = 2
   
   console.log(obj2.a.b)	// 2
   ```

   浅拷贝

2. **Object.setPrototypeOf()**

3. **Object.getPrototypeOf()**

   ```js
   var Person = function(name,age){
       this.name = name;
       this.age = age;
       this.greed= function(){
           console.log("Hello,I am ",this.name)
       }
   }
   
   function Student(){
   
   }
   
   
   var stud = new Student();
   Object.setPrototypeOf(stud,Person);
   console.log(stud.__proto__);//[Function: Person]
   
   Student.prototype = Person
   var stud2 = new Student()
   console.log(Object.getPrototypeOf(stud2).name)  // Person
   ```

   ### 3.7.2 对象的遍历

   ES5中对象的遍历方法有以下几种：

   **1、使用for/in遍历**

   **2、使用Object.keys()遍历**

   返回包含所有键值的数组，不包含不可枚举的属性。

   **3、使用Object.getOwnPropertyName()遍历**

   返回全部的属性，无论是否可以枚举。

   ```js
   var obj ={
       "name":"lear",
       "age":10,
       "sex":"male"
   }
   
   Object.defineProperty(obj, 'sex', {
       value: "male",
       enumerable: false
   });
   
   for(var key in obj){
       //name--lear
       //age--10
       console.log(key+"--"+obj[key]);
   }
   
   console.log(Object.keys(obj));//[ 'name', 'age' ]
   console.log(Object.getOwnPropertyNames(obj));//[ 'name', 'age', 'sex' ]
   ```

   **1.枚举属性**

   不可枚举的属性可以正常通过a.b的形式访问，但无法通过for/in循环和Object.keys()方法遍历到。

   **2.ES6中的遍历方法**

   新增了Object.getOwnPropertySymbols()和Reflect.ownKeys()两个方法。

   前者返回对象的全部Symbol属性，后者返回对象的全部属性。

## 3.8 类

## 3.9 类的继承

### 3.9.3 Node中类继承

## 3.10 ES6的模块化标准

# 第4章 书写异步代码

## 4.1 异步操作的返回值

## 4.2 组织回调方法

### 4.2.1 回调与CPS

​	另一种做法是将回调函数作数传递，这种书写方式通常被称为Continuation Passing Style（CPS），它的本质仍然是一个高阶函数。

```js
var fs = require("fs");
function callback1(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
        fs.readFile("./async/2.txt",{encoding:"utf-8"},callback2);
    }
}
function callback2(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
        fs.readFile("./async/3.txt",{encoding:"utf-8"},callback3);
    }
}
function callback3(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
}
fs.readFile("./async/1.txt",{encoding:"utf-8"},callback1);
```

## 4.3 使用Promise

### 4.3.2 Promise是什么

​	可以将Promise理解为一个状态机，它存在下面三种不同的状态，并在某一时刻只能有一种状态：

- Pending：执行中
- Fullfilled（或Resolved）：执行成功
- Rejected：执行失败

​	Promise是对一个操作（通常是异步操作）的封装，异步操作有等待完成、成功、失败三种可能结果，对应了Promise的三种状态。	Pending，Fullfilled，Rejected

### 4.3.3 ES2015中的Promise

​	ES2015中的Generator或者ES2017的async方法，都是以Promise作为基础的。

**1、将异步方法封装成Promise**

```js
var fs = require("fs");

function readFile_promises(path){
    return  new Promise(function(resolve, reject) {
        fs.readFile(path,"UTF-8",function(err,data){
            if (data){
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}
```

​		resolve方法和reject方法也没有做多余的操作，仅仅是把异步的结果传递出去而已，对于异步结果的处理，是交给then方法来完成的。

**2、使用then方法获取结果**

​		一个then方法通常是如下这种形式：

```js
promise.then(function(value){
    //success
}, function(error){
    //failure
})
```

​		通常来说，如果onRejected的回调方法被调用就表示异步过程中出现了错误，这时可以使用catch方法而不是回调函数来处理异常。

```js
promise
.then(function(value){
    //success
})
.catch(function(error){
    //failure
});
```

**3、then方法的返回值**

​		then方法总是返回一个新的Promise对象。

**4、Promise的执行**

```js
var promise = new Promise((resolve, reject) => {
    console.log('begin');
    resolve();
});

setTimeout(() => {
    promise.then(() => {
        console.log('end');
    })
}, 5000);
```

​		程序立刻打印begin，5秒后打印end。

​		Promise从被创建的那一刻起就开始执行，then方法只是提供了访问Promise状态的接口，与Promise的执行无关。

### 4.3.4 Promise的常用API

1. **Promise.resolve**

2. **Promise.reject**

3. **Promise.all**

   ​		如果有多个promsie需要执行，可以使用promise.all方法统一声明，该方法可以将多个Promise对象包装成一个Promise。

   ​		promise.all会按照顺序返回封装Promise的结果，那么是否代表内部的Promise是顺序执行呢？

   ​		答案是否定的，一个Promise的执行是从被创建的那一刻开始的，也就是说当调用promise.all时，所有的Promise都已经开始执行了，all方法只是等到全部的Promise完成后，对所有的执行结果做一个封装并返回。

4. **Promise.race**

5. **Promise.catch**

### 4.3.5 使用Promise组织异步代码



## 4.4 Generator,一种过渡方案

​		ES2015中的Generator几乎是Python中Generator的翻版。

​		Generator本质上是一个函数，它的最大特点是可以被中断，然后恢复执行。

​		Generator函数可以由用户执行中断或恢复执行的操作。Generator中断后可以转去执行别的操作，然后再回头从中断的地方恢复执行。

​		这其实是一种协程的概念。

### 4.4.2 Generator函数的执行

Generator对象会逐个经历所有的状态，直到Generator函数执行完毕。

### 4.4.4 用Generator组织异步方法



## 4.5 回调的终点-async/await

### 4.5.1 async函数的概念

async函数可以看做是自带执行器的Generator函数。

await关键字后面往往是一个Promise，如果不是就隐式调用promise.resolve来转换成一个Promise。

2. **async的返回值**

   ​		async函数总是会返回一个Promise对象，如果return关键字后面不是一个Promise，那么默认调用promise.resolve方法进行转换。

   ```js
   async function asyncFunc() {
       return "hello node"
   }
   
   asyncFunc().then(function (data) {
       console.log(data)
   })
   ```

### 4.5.2 await关键字

​		对于async函数来说，await关键字不是必需的。由于async本质上是对Promise的封装，那么可以使用Promise的方法来执行一个async方法。

​		而await关键字则是对这一情况的语法糖，它可以“自动执行”一个Promise（其实是等待后面的Promise完成后再进行下一步动作），当async函数内有多个Promsie需要串行执行的时候，这种特性带来的好处是显而易见的。

### 4.5.4  async和await小结

​		**await关键字小结**

- 不能在普通箭头函数中使用await关键字，需要在箭头函数前面增加async关键字。

- await用来串行地执行异步操作，想实现并行可以考虑promise.all。

### 4.5.5 async函数的缺点

​		假设我们有很多层的方法调用，最底层的异步操作被封装成async方法，那么该函数的所有上层方法可能都要变成async方法。

# 第5章 使用Koa2构建Web站点

## 5.1 Node Web框架的发展历程

Connect--------->Express--------->Koa(2)



## 5.4 middleware

### 5.4.1 中间件的概念

​		中间件本质上是接收请求并且做出相应动作的函数，该函数通常接收req和res作为参数，以便对request和response对象进行操作。

### 5.5.3 数据存储

**1、使用Mongoose访问MongoDB**

Mongoose是一种ODM，提供的是对象和文档数据库之间的映射关系。

