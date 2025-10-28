# Promise

## Promise.all()

https://hackmamba.io/blog/2020/12/aggregate-multiple-api-requests-with-promise-all/

If any of the promises in Promise.all() is rejected, the promise aggregation is rejected. Here's an example below:

```js
const fetchNames = async () => {
    try {
      const res = await Promise.all([
        axios.get("./names.json"),
        axios.get("./names-mid.json"),
        axios.get("./names-old.json")
      ]);
      const data = res.map((res) => res.data);
      console.log(data.flat());
    } catch {
      throw Error("Promise failed");
    }
  };
```



## Promise.allSettled()

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

Promise.allSettled() 方法返回一个在所有给定的 Promise 都已实现或拒绝后解析的 Promise，并带有一组对象，每个对象都描述每个 Promise 的结果。

它通常用于当你有多个不依赖于彼此成功完成的异步任务，或者你总是想知道每个承诺的结果时。

相比之下， Promise.all() 返回的 Promise 可能更合适，如果任务相互依赖/如果你想在其中任何一个拒绝时立即拒绝。



[Promise.all和Promise.allSettled的区别](https://segmentfault.com/a/1190000023413699)

Promise.all()一旦有一个promise出现了异常，被reject了，情况就会变的麻烦。

```js
const promises = [
  delay(100).then(() => 1),
  delay(200).then(() => 2),
  Promise.reject(3)
  ]

Promise.all(promises).then(values=>console.log(values))
// 最终输出： Uncaught (in promise) 3

Promise.all(promises)
.then(values=>console.log(values))
.catch(err=>console.log(err))
// 加入catch语句后，最终输出：3

```

尽管能用catch捕获其中的异常，但你会发现其他执行成功的Promise的消息都丢失了，仿佛石沉大海一般。

要么全部成功，要么全部重来，这是Promise.all本身的强硬逻辑，也是痛点的来源，不能说它错，但这的确给Promise.allSettled留下了立足的空间。

假如使用Promise.allSettled来处理这段逻辑会怎样呢?

```js
const promises = [
  delay(100).then(() => 1),
  delay(200).then(() => 2),
  Promise.reject(3)
  ]

Promise.allSettled(promises).then(values=>console.log(values))
// 最终输出： 
//    [
//      {status: "fulfilled", value: 1},
//      {status: "fulfilled", value: 2},
//      {status: "rejected", value: 3},
//    ]
```

可以看到所有promise的数据都被包含在then语句中，且每个promise的返回值多了一个status字段，表示当前promise的状态，没有任何一个promise的信息被丢失。

因此，当用Promise.allSettled时，我们只需专注在then语句里，当有promise被异常打断时，我们依然能妥善处理那些已经成功了的promise，不必全部重来。

## Promise.any()

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any

`Promise.any()` 接收一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)可迭代对象，只要其中的一个 `promise` 成功，就返回那个已经成功的 `promise` 。如果可迭代对象中没有一个 `promise` 成功（即所有的 `promises` 都失败/拒绝），就返回一个失败的 `promise `和[`AggregateError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)类型的实例，它是 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error) 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和[`Promise.all()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)是相反的。

```js
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// expected output: "quick"

```

## Promise.race()

The **`Promise.race()`** method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"

```

# 使用 for-await-of 循环

```js
/**
 * @fileoverview Understanding JavaScript Promises Example 04-15
 * @author Nicholas C. Zakas
 * @see https://leanpub.com/understanding-javascript-promises
 */

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

for await (const value of [promise1, promise2, promise3]) {
    console.log(value);
}
```

# 顶层 Await 表达式

```js
/**
 * @fileoverview Understanding JavaScript Promises Example 04-19
 * @author Nicholas C. Zakas
 * @see https://leanpub.com/understanding-javascript-promises
 */

// static import
import something from "./file.js";

// dynamic import
const filename = "./another-file.js";
const somethingElse = await import(filename);
```

使用顶层 await，你可以动态加载模块，同时保留静态加载的模块。（动态加载模块还允许你动态构造模块路径，这是静态导入无法做到的。）本例通过静态导入和动态导入对比两者的差异。

当 JavaScript 引擎遇到顶层 await 时，会暂停当前模块的执行，直到 Promise 完成（settled）。如果被暂停模块的父模块还有其他静态导入需要处理，这些静态导入会继续执行，即使它的兄弟模块（使用了顶层 await 的模块）处于暂停状态。此时，兄弟模块的加载顺序无法保证，但在大多数情况下，这个顺序并不影响功能。

> 顶层 await 表达式不能在 JavaScript 脚本中使用。为了使用顶层 await，你必须通过 import 或 <script type="module"> 来加载你的 JavaScript 代码。