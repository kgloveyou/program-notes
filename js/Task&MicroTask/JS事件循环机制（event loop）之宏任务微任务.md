# JS事件循环机制（event loop）之宏任务/微任务

作者：张倩qianniuer
链接：https://juejin.cn/post/6844903638238756878
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

```

打印顺序是什么？ 正确答案是：script start, script end, promise1, promise2, setTimeout 

```js
setTimeout(() => {
    task()
},3000)

sleep(10000000)		#js没有原生sleep函数
```

乍一看其实差不多嘛，但我们把这段代码在chrome执行一下，却发现控制台执行task()需要的时间远远超过3秒，说好的延时三秒，为啥现在需要这么长时间啊？ 这时候我们需要重新理解`setTimeout`的定义。我们先说上述代码是怎么执行的：

- task()进入Event Table并注册,计时开始。
- 执行sleep函数，很慢，非常慢，计时仍在继续。
- 3秒到了，计时事件timeout完成，task()进入Event Queue，但是sleep也太慢了吧，还没执行完，只好等着。
- sleep终于执行完了，task()终于从Event Queue进入了主线程执行。

上述的流程走完，我们知道setTimeout这个函数，是经过指定时间后，把要执行的任务(本例中为task())加入到Event Queue中，又因为是单线程任务要一个一个执行，如果前面的任务需要的时间太久，那么只能等着，导致真正的延迟时间远远大于3秒。




我们还经常遇到`setTimeout(fn,0)`这样的代码，0秒后执行又是什么意思呢？是不是可以立即执行呢？ 答案是不会的，`setTimeout(fn,0)`的含义是，指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行。举例说明：

```
//代码1
console.log('先执行这里');
setTimeout(() => {
    console.log('执行啦')
},0);
```

代码1的输出结果是：

```
先执行这里
执行啦
```

```js
//代码2
console.log('先执行这里');
setTimeout(() => {
    console.log('执行啦')
},3000);
```

代码2的输出结果是：

```
//先执行这里
// ... 3s later
// 执行啦
```

关于setTimeout要补充的是，即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒。有兴趣的同学可以自行了解。

```js
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})

setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0)
```

##### 这回是嵌套，大家可以看看，最后输出结果是Promise1，setTimeout1，Promise2，setTimeout2

- 一开始执行栈的同步任务执行完毕，会去 microtasks queues 找 清空 microtasks queues ，输出`Promise1`，同时会生成一个异步任务 setTimeout1
- 去宏任务队列查看此时队列是 setTimeout1 在 setTimeout2 之前，因为setTimeout1执行栈一开始的时候就开始异步执行,所以输出 `setTimeout1`
- 在执行setTimeout1时会生成Promise2的一个 microtasks ，放入 microtasks queues 中，接着又是一个循环，去清空 microtasks queues ，输出 `Promise2`
- 清空完 microtasks queues ，就又会去宏任务队列取一个，这回取的是 `setTimeout2`




```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

```

1

7

6

8

2

4

3

5

9

11

10

12

第一轮事件循环流程分析如下：

- 整体script作为第一个宏任务进入主线程，遇到console.log，输出`1`。
- 遇到setTimeout，其回调函数被分发到宏任务Event Queue中。我们暂且记为`setTimeout1`。
- 遇到process.nextTick()，其回调函数被分发到微任务Event Queue中。我们记为`process1`。
- 遇到Promise，new Promise直接执行，输出7。then被分发到微任务Event Queue中。我们记为`then1`。
- 又遇到了setTimeout，其回调函数被分发到宏任务Event Queue中，我们记为`setTimeout2`。

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------- |
| setTimeout1       | process1          |
| setTimeout2       | then1             |

- 上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了`1`和`7`。

我们发现了process1和then1两个微任务。

- 执行process1,输出`6`。
- 执行then1，输出`8`。

好了，第一轮事件循环正式结束，这一轮的结果是输出`1，7，6，8`。那么第二轮时间循环从setTimeout1宏任务开始：

- 首先输出`2`。接下来遇到了process.nextTick()，同样将其分发到微任务Event Queue中，记为process2。
- new Promise立即执行输出`4`，then也分发到微任务Event Queue中，记为then2

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------- |
| setTimeout2       | process3          |
|                   | then3             |

- 第三轮事件循环宏任务执行结束，执行两个微任务process3和then3。
- 输出`10`。
- 输出`12`。
- 第三轮事件循环结束，第三轮输出`9，11，10，12`。
- 整段代码，共进行了三次事件循环，完整的输出为`1，7，6，8，2，4，3，5，9，11，10，12`。(请注意，node环境下的事件监听依赖libuv与前端环境不完全相同，输出顺序可能会有误差)

