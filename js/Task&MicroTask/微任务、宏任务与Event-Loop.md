

# 微任务、宏任务与Event-Loop

作者：Jiasm
链接：https://juejin.cn/post/6844903657264136200
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 微任务与宏任务的区别

**在当前的微任务没有执行完成时，是不会执行下一个宏任务的。**

demo1.js

```js
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})

console.log(2)

#输出结果
1
2
3
4
```

`setTimeout`就是作为宏任务来存在的，而`Promise.then`则是具有代表性的微任务，上述代码的执行顺序就是按照序号来输出的。

**所有会进入的异步都是指的事件回调中的那部分代码**
 也就是说`new Promise`在实例化的过程中所执行的代码都是同步进行的，而`then`中注册的回调才是异步执行的。
 在同步代码执行完成后才回去检查是否有异步任务完成，并执行对应的回调，而微任务又会在宏任务之前执行。
 所以就得到了上述的输出结论`1、2、3、4`。


所以进阶的，即便我们继续在`Promise`中实例化`Promise`，其输出依然会早于`setTimeout`的宏任务：

demo2.js

```js
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
  Promise.resolve().then(_ => {
    console.log('before timeout')
  }).then(_ => {
    Promise.resolve().then(_ => {
      console.log('also before timeout')
    })
  })
})

console.log(2)

#输出结果
1
2
3
before timeout
also before timeout
4
```

当然了，实际情况下很少会有简单的这么调用`Promise`的，一般都会在里边有其他的异步操作，比如`fetch`、`fs.readFile`之类的操作。
而这些其实就相当于注册了一个宏任务，而非是微任务。

*P.S. 在[Promise/A+的规范](https://promisesaplus.com/#notes)中，`Promise`的实现可以是微任务，也可以是宏任务，但是普遍的共识表示(至少`Chrome`是这么做的)，`Promise`应该是属于微任务阵营的*

所以，明白哪些操作是宏任务、哪些是微任务就变得很关键，这是目前业界比较流行的说法：

### 宏任务

| #                       | 浏览器 | Node |
| ----------------------- | ------ | ---- |
| `I/O`                   | ✅      | ✅    |
| `setTimeout`            | ✅      | ✅    |
| `setInterval`           | ✅      | ✅    |
| `setImmediate`          | ❌      | ✅    |
| `requestAnimationFrame` | ✅      | ❌    |

*有些地方会列出来`UI Rendering`，说这个也是宏任务，可是在读了[HTML规范文档](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)以后，发现这很显然是和微任务平行的一个操作步骤*
 *`requestAnimationFrame`姑且也算是宏任务吧，`requestAnimationFrame`在[MDN的定义](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)为，下次页面重绘前所执行的操作，而重绘也是作为宏任务的一个步骤来存在的，且该步骤晚于微任务的执行*

### 微任务

| #                            | 浏览器 | Node |
| ---------------------------- | ------ | ---- |
| `process.nextTick`           | ❌      | ✅    |
| `MutationObserver`           | ✅      | ❌    |
| `Promise.then catch finally` | ✅      | ✅    |

## Event-Loop是个啥

```js
const macroTaskList = [
  ['task1'],
  ['task2', 'task3'],
  ['task4'],
]

for (let macroIndex = 0; macroIndex < macroTaskList.length; macroIndex++) {
  const microTaskList = macroTaskList[macroIndex]
  
  for (let microIndex = 0; microIndex < microTaskList.length; microIndex++) {
    const microTask = microTaskList[microIndex]

    // 添加一个微任务
    if (microIndex === 1) microTaskList.push('special micro task')
    
    // 执行任务
    console.log(microTask)
  }

  // 添加一个宏任务
  if (macroIndex === 2) macroTaskList.push(['special macro task'])
}

// > task1
// > task2
// > task3
// > special micro task
// > task4
// > special macro task

```

## 在浏览器中的表现

首先要明确的一点是，宏任务必然是在微任务之后才执行的（因为微任务实际上是宏任务的其中一个步骤）

`I/O`这一项感觉有点儿笼统，有太多的东西都可以称之为`I/O`，点击一次`button`，上传一个文件，与程序产生交互的这些都可以称之为`I/O`。



## 在Node中的表现

Node也是单线程，但是在处理`Event Loop`上与浏览器稍微有些不同，这里是[Node官方文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#event-loop-explained)的地址。

就单从API层面上来理解，Node新增了两个方法可以用来使用：微任务的`process.nextTick`以及宏任务的`setImmediate`。

### setImmediate与setTimeout的区别

在官方文档中的定义，`setImmediate`为一次`Event Loop`执行完毕后调用。
 `setTimeout`则是通过计算一个延迟时间后进行执行。

但是同时还提到了如果在主进程中直接执行这两个操作，很难保证哪个会先触发。
 因为如果主进程中先注册了两个任务，然后执行的代码耗时超过`XXs`，而这时定时器已经处于可执行回调的状态了。
 所以会先执行定时器，而执行完定时器以后才是结束了一次`Event Loop`，这时才会执行`setImmediate`。

```js
setTimeout(_ => console.log('setTimeout'))
setImmediate(_ => console.log('setImmediate'))
```

有兴趣的可以自己试验一下，执行多次真的会得到不同的结果。


![](微任务、宏任务与Event-Loop.assets/1653c82abfac7543)

### process.nextTick

就像上边说的，这个可以认为是一个类似于`Promise`和`MutationObserver`的微任务实现，在代码执行的过程中可以随时插入`nextTick`，并且会保证在下一个宏任务开始之前所执行。

在使用方面的一个最常见的例子就是一些事件绑定类的操作：

```
class Lib extends require('events').EventEmitter {
  constructor () {
    super()

    this.emit('init')
  }
}

const lib = new Lib()

lib.on('init', _ => {
  // 这里将永远不会执行
  console.log('init!')
})
复制代码
```

因为上述的代码在实例化`Lib`对象时是同步执行的，在实例化完成以后就立马发送了`init`事件。
 而这时在外层的主程序还没有开始执行到`lib.on('init')`监听事件的这一步。
 所以会导致发送事件时没有回调，回调注册后事件不会再次发送。

我们可以很轻松的使用`process.nextTick`来解决这个问题：

```js
class Lib extends require('events').EventEmitter {
  constructor () {
    super()

    process.nextTick(_ => {
      this.emit('init')
    })

    // 同理使用其他的微任务
    // 比如Promise.resolve().then(_ => this.emit('init'))
    // 也可以实现相同的效果
  }
}
```

这样会在主进程的代码执行完毕后，程序空闲时触发`Event Loop`流程查找有没有微任务，然后再发送`init`事件。

*关于有些文章中提到的，循环调用`process.nextTick`会导致报警，后续的代码永远不会被执行，这是对的，参见上边使用的双重循环实现的`loop`即可，相当于在每次`for`循环执行中都对数组进行了`push`操作，这样循环永远也不会结束*



## 多提一嘴async/await函数

因为，`async/await`本质上还是基于`Promise`的一些封装，而`Promise`是属于微任务的一种。所以在使用`await`关键字与`Promise.then`效果类似：

```js
setTimeout(_ => console.log(4))

async function main() {
  console.log(1)
  await Promise.resolve()
  console.log(3)
}

main()

console.log(2)
```

**async函数在await之前的代码都是同步执行的，可以理解为await之前的代码属于`new Promise`时传入的代码，await之后的所有代码都是在`Promise.then`中的回调**