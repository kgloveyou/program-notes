# 第1章 介绍

示例 1-2. 生成一个浏览器线程

```js
const worker = new Worker('worker.js');
worker.postMessage('Hello, world');

// worker.js
self.onmessage = (msg) => console.log(msg.data);
```

一个进程也可以生成线程，而不是完整的进程。一个线程就像一个进程，不同之处在于它与它所属的进程共享内存空间。一个进程可以有多个线程，每个线程都有自己的指令指针。关于进程执行的所有属性同样适用于线程。由于它们共享内存空间，很容易在线程之间共享程序代码和其他值。这使得它们在为程序添加并发性方面比进程更有价值，但也带来了一些编程上的复杂性，我们将在本书后面讨论。

利用线程的典型方式是将 CPU 密集型工作，比如数学运算，转移到一个额外的线程或线程池中，而主线程则可以通过在无限循环中检查新的交互来与用户或其他程序进行外部交互。许多经典的 Web 服务器程序，比如 Apache，使用了这样的系统来处理大量的 HTTP 请求。这可能看起来类似于图1-1。在这个模型中，HTTP 请求数据被传递给一个工作线程进行处理，当响应准备好时，它被交还给主线程，然后返回给用户代理。

## 并发与并行

*并发* 

任务在重叠的时间内运行。

*并行* 

任务在完全相同的时间内运行。

虽然这两者可能看起来意味着相同的事情，但请考虑任务可能被分解成更小的部分，然后交错执行。在这种情况下，可以实现并发而不涉及并行，因为任务运行的时间帧可以重叠。要实现并行运行的任务，它们必须在*完全相同的时间内* 运行。通常，这意味着它们必须在完全相同的时间内在不同的CPU核心上运行。

线程并不自动提供并行性。系统硬件必须允许这样做，即具有多个CPU核心，而操作系统调度程序必须决定在单独的CPU核心上运行线程。在单核系统或线程数多于CPU核心数的系统中，可以通过在适当的时候在它们之间切换，让多个线程同时在单个CPU上运行。此外，在像Ruby和Python这样具有全局解释器锁（GIL）的语言中，线程被明确地阻止提供并行性，因为在整个运行时只能一次执行一条指令。

在计时方面考虑这一点也很重要，因为通常会向程序添加线程以提高性能。如果系统只允许并发性，因为只有一个CPU核心可用或已经负载有其他任务，那么使用额外的线程可能不会产生任何明显的好处。事实上，在线程之间同步和上下文切换的开销可能导致程序的性能变得更差。始终在预期运行的条件下测量应用程序的性能。这样，你可以验证多线程编程模型是否真的对你有益。

## 单线程 JavaScript  

从历史上看，JavaScript运行的平台一开始并没有提供任何线程支持，因此该语言被认为是单线程的。当你听到有人说 JavaScript 是单线程的时候，他们指的是这个历史背景和它自然倾向的编程风格。确实如本书标题所示，尽管语言本身没有任何内置功能来创建线程。这并不奇怪，因为它同样没有内置功能来与网络、设备或文件系统进行交互，或者进行任何系统调用。实际上，即使像 `setTimeout()` 这样的基本功能实际上也不是 JavaScript 的特性。相反，嵌入了虚拟机（VM）的环境，比如 Node.js 或浏览器，通过特定于环境的API提供这些功能。

与将线程作为并发原语相比，大多数 JavaScript 代码都是以事件驱动的方式编写的，操作单个执行线程。随着各种事件的发生，比如用户交互或I/O操作，它们会触发之前设置在这些事件上运行的函数。这些函数通常被称为回调函数，是在Node.js和浏览器中进行异步编程的核心。即使在 promises 或 async/await 语法中，回调函数仍然是底层原语。重要的是要认识到回调函数不是在并行运行，也不是与任何其他代码一起运行。当回调中的代码正在运行时，那是当前唯一正在运行的代码。换句话说，在任何给定时间只有一个调用栈是活动的。

在没有线程的情况下，我们只能使用一个JavaScript环境。这意味着只有一个VM实例，一个指令指针和一个垃圾收集器实例。通过一个指令指针，我们指的是JavaScript解释器在任何给定时间只执行一条指令。这并不意味着我们受限于一个全局对象。在浏览器和Node.js中，我们可以使用不同的领域（[realms](https://oreil.ly/uy7E2)）。

领域（Realms）可以被视为提供给JavaScript代码的JavaScript环境的实例。这意味着每个领域都有自己的全局对象，以及全局对象的所有相关属性，比如内置类（如`Date`）和其他对象（如`Math`）。在Node.js中，全局对象被称为`global`，而在浏览器中被称为`window`，但在两者的现代版本中，你可以将全局对象称为`globalThis`。

在浏览器中，网页中的每个框架（frame）都有一个包含其中所有JavaScript的领域。由于每个框架都有自己的Object和其他基本对象的副本，你会注意到它们有自己的继承树，并且在处理来自不同领域的对象时，`instanceof` 可能不会按照你的期望工作。这在示例1-4中进行了演示。

```js
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const FrameObject = iframe.contentWindow.Object;	//在iframe内部，可以通过`contentWindow`属性访问全局对象。

console.log(Object === FrameObject);	//这会返回 `false`，因此frame内部的Object对象与主frame中的不同。
console.log(new Object() instanceof FrameObject);	//`instanceof` 返回 `false`，正如预期的那样，因为它们不是同一个 Object。
console.log(FrameObject.name);	//尽管如此，这两个构造函数都具有相同的 `name` 属性。
```

在Node.js中，可以使用`vm.createContext()`函数构建领域，如示例1-5所示。在Node.js术语中，领域被称为Contexts。适用于浏览器框架的所有规则和属性也适用于Contexts，但在Contexts中，你无法访问任何全局属性或可能在Node.js文件中处于作用域中的其他东西。如果想要使用这些功能，需要手动将它们传递到Context中。

Example 1-5. Objects from a new Context in Node.js  

```js
const vm = require('vm');
const ContextObject = vm.runInNewContext('Object');	//我们可以使用 `runInNewContext` 从新上下文中获取对象。

console.log(Object === ContextObject);	//这会返回 `false`，因此与浏览器中的iframe一样，在上下文内部的Object对象与主上下文中的不同。
console.log(new Object() instanceof ContextObject);	//同样地，`instanceof` 评估为 `false`。
console.log(ContextObject.name);	//再次，这两个构造函数都具有相同的 `name` 属性。
```

在任何这些领域的情况下，重要的是要注意我们仍然只有一个指令指针，并且在任何给定时间只有一个领域的代码在运行，因为我们仍然只谈论单线程执行。

## Hidden Threads

尽管你的 JavaScript 代码可能在一个单线程的环境中运行，至少默认情况下是这样的，但这并不意味着运行代码的进程是单线程的。事实上，可能会使用多个线程来使代码运行流畅和高效。认为 Node.js 是一个单线程进程是一个常见的误解。

现代的JavaScript引擎，如V8，使用单独的线程来处理垃圾回收和其他不需要与JavaScript执行同步发生的功能。此外，平台运行时本身可能使用额外的线程提供其他功能。

在Node.js中，libuv被用作独立于操作系统的异步I/O接口。由于并非所有由系统提供的I/O接口都是异步的，libuv使用一个工作线程池来避免在使用其他阻塞API（例如文件系统API）时阻塞程序代码。默认情况下，会生成四个这样的线程，尽管通过`UV_THREADPOOL_SIZE`环境变量可以配置此数量，并且最多可以达到1,024。

在Linux系统上，你可以通过在给定进程上使用`top -H`来查看这些额外的线程。在示例1-6中，启动了一个简单的Node.js Web服务器，记录了PID并传递给top。你可以看到各种V8和libuv线程加起来总共有七个线程，其中包括JavaScript代码运行的线程。你可以尝试在自己的Node.js程序中尝试这样做，甚至尝试更改`UV_THREADPOOL_SIZE`环境变量以查看线程数量的变化。

类似地，浏览器执行许多任务，比如文档对象模型（DOM）渲染，会使用与用于JavaScript执行的线程不同的线程。使用类似我们在Node.js中使用的`top -H`进行实验将得到类似的几个线程。现代浏览器通过使用多个进程进一步提高了安全性，通过隔离添加了一层安全保护。

在进行应用程序的资源规划时，考虑到这些额外的线程是很重要的。永远不要假设仅因为JavaScript是单线程的，你的JavaScript应用程序只会使用一个线程。例如，在生产中的Node.js应用程序中，要测量应用程序使用的线程数量并进行相应的规划。不要忘记Node.js生态系统中许多本地插件也会生成自己的线程，因此在逐个应用程序的基础上进行这项工作是很重要的。

# 第2章 浏览器

JavaScript并没有像大多数其他编程语言那样的单一定制实现。例如，在Python中，你可能会运行由语言维护者提供的Python二进制文件。另一方面，JavaScript有许多不同的实现。这包括随不同Web浏览器一起提供的JavaScript引擎，如Chrome中的V8，Firefox中的SpiderMonkey和Safari中的JavaScriptCore。V8引擎也被Node.js在服务器上使用。

## Dedicated Workers  

Web workers允许你为执行JavaScript生成一个新的环境。以这种方式执行的JavaScript被允许在与生成它的JavaScript不同的线程中运行。这两个环境之间通过一种称为消息传递的模式进行通信。请记住，JavaScript的本质是单线程的。Web workers与这种本质很好地协同工作，并通过触发要由事件循环运行的函数来公开消息传递。
一个JavaScript环境有可能生成多个web worker，并且给定的web worker可以自由生成更多的web worker。尽管如此，如果你发现自己生成了大量的web worker层次结构，可能需要重新评估你的应用程序。
有不止一种类型的web worker，其中最简单的是dedicated  worker。

### Dedicated Worker Hello World

Example 2-1. ch2-web-workers/index.html

```html
<html>
  <head>
    <title>Web Workers Hello World</title>
    <script src="main.js"></script>
  </head>
</html>
```

Example 2-2. ch2-web-workers/main.js  

```js
console.log('hello from main.js');

const worker = new Worker('worker.js'); // <1>

worker.onmessage = (msg) => { // <2>
  console.log('message received from worker', msg.data);
};

worker.postMessage('message sent to worker'); // <3>

console.log('hello from end of main.js');
```

Example 2-3. ch2-web-workers/worker.js  

```js
console.log('hello from worker.js');

self.onmessage = (msg) => {
  console.log('message from main', msg.data);

  postMessage('message sent from worker');
};
```

Table 2-1. Example console output  

| Log                                                    | Location       |
| ------------------------------------------------------ | -------------- |
| hello from main.js                                     | main.js:1:9    |
| hello from end of main.js                              | main.js:11:9   |
| hello from worker.js                                   | worker.js:1:9  |
| message from main, message sent to worker              | worker.js:4:11 |
| message received from worker, message sent from worker | main.js:6:11   |

这个输出确认了消息执行的顺序，尽管它不是完全确定的。首先，加载main.js文件并打印其输出。然后，实例化并配置worker，调用其postMessage()方法，然后打印最后一个消息。接下来，运行worker.js文件，并调用它的消息处理程序，打印一条消息。然后，它调用postMessage()将消息发送回main.js。最后，在main.js中调用专用worker的onmessage处理程序，并打印最后一条消息。

### Advanced Dedicated Worker Usage  

现在你已经熟悉了专用worker的基础知识，你可以开始使用一些更复杂的功能了。
当你使用不涉及专用worker的JavaScript时，所有加载的代码都在同一个领域中可用。加载新的JavaScript代码可以通过使用`<script>`标签加载脚本，或者通过进行XHR请求并使用带有表示代码的字符串的`eval()`函数来完成。但是对于专用worker，你不能将`<script>`标签注入到DOM中，因为专用worker没有关联的DOM。
相反，你可以使用`importScripts()`函数，这是仅在web worker中可用的全局函数。这个函数接受一个或多个参数，表示要加载的脚本的路径。这些脚本将从与web页面相同的来源加载。这些脚本以同步的方式加载，因此在函数调用之后运行的代码将在脚本加载后运行。
Worker的实例继承自EventTarget，并具有一些用于处理事件的通用方法。然而，Worker类在实例上提供了最重要的方法。以下是这些方法的列表，其中一些你已经使用过，一些是新的：



在专用worker内，全局变量`self`是`WorkerGlobalScope`的一个实例。最显著的添加是`importScripts()`函数，用于注入新的JavaScript文件。一些高级通信API，比如XMLHttpRequest、WebSocket和`fetch()`是可用的。一些不一定是JavaScript的一部分但由每个主要引擎重新构建的有用函数，比如`setTimeout()`、`setInterval()`、`atob()`和`btoa()`，也是可用的。两个数据存储API，`localStorage`和`indexedDB`，也是可用的。

然而，对于缺失的API，你需要进行实验并查看你有权访问什么。通常，修改Web页面全局状态的API是不可用的。在主JavaScript领域中，全局`location`是可用的，并且是`Location`的一个实例。在专用worker内，`location`仍然可用，但它是`WorkerLocation`的一个实例，有一些不同之处，尤其是缺少了一个可能导致页面刷新的`.reload()`方法。`document`全局对象也缺失，这是访问页面DOM的API。

## Shared Workers  

*shared  worker* 是另一种 web worker 类型，它的特殊之处在于可以被不同的浏览器环境访问，比如不同的窗口（标签页）、跨 iframes，甚至是不同的 web worker。它们在 worker 内部还有一个不同的 `self`，是 `SharedWorkerGlobalScope` 的一个实例。共享 worker 只能被运行在相同源上的 JavaScript 访问。例如，在 http://localhost:5000 上运行的窗口无法访问在 http://google.com:80 上运行的共享 worker。

**注意**：共享 worker 在 Safari 中目前处于禁用状态，这似乎至少从 2013 年开始就一直如此，这无疑会影响该技术的采用。

在深入编码之前，有几个需要考虑的事项。使共享 worker 有点难以理解的一件事是，它们不一定附加到特定的window  （环境）。当然，它们最初是由特定窗口生成的，但之后它们可能会“属于”多个窗口。这意味着当第一个窗口关闭时，共享 worker 仍然存在。

**提示**：由于共享 worker 不属于特定的窗口，一个有趣的问题是 `console.log` 的输出应该去哪里？在 Firefox v85 中，输出与生成共享 worker 的第一个窗口关联。打开另一个窗口，第一个窗口仍然会得到日志。关闭第一个窗口，日志现在是不可见的。打开另一个窗口，历史日志将出现在最新的窗口中。另一方面，Chrome v87 不显示共享 worker 的日志。在调试时请记住这一点。

**调试共享 worker**



共享 worker 可以用于保存一个半持久的状态，在其他窗口连接到它时保持状态。例如，如果窗口 1 告诉共享 worker 写入一个值，那么窗口 2 可以请求共享 worker 读回该值。刷新窗口 1，该值仍然保持。刷新窗口 2，它也保持不变。关闭窗口 1，它仍然保持。然而，一旦关闭或刷新最后一个仍在使用共享 worker 的窗口，状态将丢失，并且共享 worker 脚本将被重新评估。

**注意**：共享 worker 的 JavaScript 文件在多个窗口使用时会被缓存；刷新页面不一定会重新加载你的更改。相反，你需要关闭其他打开的浏览器窗口，然后刷新剩余的窗口，才能让浏览器运行你的新代码。

### Shared Worker Hello World  

共享 worker 是基于其在当前来源的位置进行“keyed”的。例如，在这个示例中，你将使用的共享 worker 位于类似 http://localhost:5000/shared-worker.js 的某个地方。无论 worker 是从位于 /red.html、/blue.html 或甚至 /foo/index.html 的 HTML 文件加载的，共享 worker 实例始终保持相同。有一种方法可以使用相同的 JavaScript 文件创建不同的共享 worker 实例，这在第32页的“高级共享 worker 使用”中有介绍。

### 高级Shared worker 使用

32

## Service Workers  

33