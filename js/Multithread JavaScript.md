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

服务工作线程（service worker）充当一种代理，位于在浏览器中运行的一个或多个网页与服务器之间。因为服务工作线程不仅与单个网页关联，而且可能与多个页面关联，它更类似于共享工作线程而不是专用工作线程。它们甚至以与共享工作线程相同的方式“keyed”。但服务工作线程可以在页面不一定仍然打开的情况下存在并运行在后台。因此，你可以将专用工作线程视为与一个页面关联，将共享工作线程视为与一个或多个页面关联，但将服务工作线程视为与零个或多个页面关联。但共享工作线程并不会奇迹般地自行生成。相反，它确实需要首先打开一个网页以安装共享工作线程。

服务工作线程主要用于执行网站或单页面应用程序的缓存管理。它们最常在向服务器发送网络请求时被调用，在这种情况下，服务工作线程中的事件处理程序拦截网络请求。服务工作线程的闻名之处在于，当浏览器显示网页但其运行的计算机不再具有网络访问权限时，它可以用于返回缓存的资产。当服务工作线程收到请求时，它可能会查询缓存以查找缓存的资源，向服务器发出请求以检索资源的某种程度，甚至执行繁重的计算并返回结果。虽然最后一种选项使其类似于你已经了解的其他网络工作线程，但你真的不应该仅仅出于将 CPU 密集型工作卸载到另一个线程的目的而使用服务工作线程。

服务工作线程暴露的 API 比其他网络工作线程更多，尽管它们的主要用途不是为了将繁重的计算卸载到主线程之外。服务工作线程足够复杂，可以有专门的书籍来介绍它们。也就是说，因为本书的主要目标是教你有关 JavaScript 的多线程能力，我们不会对其进行详细介绍。例如，有一个完整的推送 API 可用于接收从服务器推送到浏览器的消息，但这个部分我们将不涉及。

就像其他 Web Worker 一样，Service Worker 无法访问 DOM。它们也不能进行阻塞请求。例如，将 XMLHttpRequest#open() 的第三个参数设置为 false，即阻塞代码执行，直到请求成功或超时，是不允许的。浏览器只允许 Service Worker 在使用 HTTPS 协议提供的 web 页面上运行。幸运的是，有一个显着的例外，即 localhost 可以使用 HTTP 加载 Service Worker，这是为了使本地开发更加方便。Firefox 在使用其隐私浏览功能时不允许 Service Worker。然而，Chrome 在使用其隐身模式功能时允许 Service Worker。尽管如此，Service Worker 实例无法在常规窗口和隐身窗口之间进行通信。

Firefox 和 Chrome 都在检查器中有一个包含“Service Worker”部分的“应用”面板。您可以使用此功能查看与当前页面相关的任何Service Worker，并执行一个非常重要的开发操作：注销它们，这基本上允许您将浏览器状态重置到注册worker之前。不幸的是，截至当前浏览器版本，这些浏览器面板不提供进入Service Worker的 JavaScript 检查器的方法。

**调试 Service Workers**

要进入服务工作线程实例的检查器面板，您需要去其他地方。在 Firefox 中，打开地址栏并访问 `about:debugging#/runtime/this-firefox`。向下滚动到服务工作者部分，今天创建的任何工作者都应该显示在底部。对于 Chrome，有两个不同的屏幕可用于访问浏览器的服务工作者。更强大的页面位于 `chrome://serviceworker-internals/`。它包含服务工作者的列表、它们的状态和基本的日志输出。另一个在 `chrome://inspect/#service-workers`，它包含的信息要少得多。

### Service Worker Hello World  

在本节中，您将构建一个非常基本的 Service Worker，拦截从基本网页发送的所有 HTTP 请求。大多数请求将不经修改地传递到服务器。然而，对特定资源的请求将返回由 Service Worker 自己计算的值。大多数 Service Worker 通常会执行大量的缓存查找，但是再次强调，目标是从多线程的角度展示 Service Worker。

main.js

```js
navigator.serviceWorker.register('/sw.js', { // <1>
  scope: '/'
});

navigator.serviceWorker.oncontrollerchange = () => { // <2>
  console.log('controller change');
};

async function makeRequest() { // <3>
  const result = await fetch('/data.json');
  const payload = await result.json();
  console.log(payload);
}
```

1、注册 Service Worker 并定义范围。
2、监听 `controllerchange` 事件。
3、用于发起请求的函数。



现在事情开始变得有点有趣了。这个文件中的第一件事是创建 Service Worker。与您使用构造函数和 `new` 关键字创建的其他 Web Worker 不同，这里的代码依赖于 `navigator.serviceWorker` 对象来创建 Worker。第一个参数是充当 Service Worker 的 JavaScript 文件的路径。第二个参数是一个可选的配置对象，支持一个 `scope` 属性。

`scope` 代表了当前 origin 的目录，其中任何在其中加载的 HTML 页面都会通过 Service Worker 传递其请求。默认情况下，`scope` 值与加载 Service Worker 的目录相同。在这种情况下，`/` 的值是相对于 `index.html` 目录的，因为 `sw.js` 位于相同的目录中，我们可以省略 `scope`，它会表现得完全相同。

一旦 Service Worker 已经为页面安装，所有出站的 HTTP 请求都将通过 Service Worker 发送。这包括对不同 origin 的请求。由于此页面的 `scope` 设置为 origin 的最顶层目录，因此在此 origin 打开的任何 HTML 页面都必须通过 Service Worker 进行资源请求。如果 `scope` 设置为 `/foo`，那么在 `/bar.html` 打开的页面将不受 Service Worker 的影响，但在 `/foo/baz.html` 打开的页面将受到影响。

接下来发生的事情是向 `navigator.serviceWorker` 对象添加了一个 `controllerchange` 事件的监听器。当这个监听器触发时，将在控制台中打印一条消息。此消息仅用于在 Service Worker 控制已加载的页面时进行调试，而这个页面位于 Worker 范围内。

最后，定义了一个名为 `makeRequest()` 的函数。该函数发起一个对 `/data.json` 路径的 GET 请求，将响应解码为 JavaScript 对象表示法 (JSON)，并打印结果。正如你可能注意到的那样，这个函数没有被引用。相反，稍后你将在控制台中手动运行它以测试功能。

有了这个文件，现在你已经准备好创建 Service Worker 本身了。创建一个名为 `sw.js` 的第三个文件，并将示例 2-10 中的内容添加到其中。





最后一个事件处理程序是 `onfetch` 函数。这是最复杂的处理程序，也是在 Service Worker 的整个生命周期中被调用最多的处理程序。每当 Service Worker 控制的网页发起网络请求时，都会调用此处理程序。之所以称其为 `onfetch`，是为了表示它与浏览器中的 `fetch()` 函数相关，尽管这几乎是一个误称，因为任何网络请求都将通过它进行。例如，如果稍后向页面添加了图像标签，该请求也将触发 `onfetch`。

此函数首先记录一条消息，以确认它正在运行，并打印正在请求的 URL。有关所请求资源的其他信息也是可用的，例如标头和 HTTP 方法。在实际应用程序中，可以使用这些信息与缓存进行交互，以查看资源是否已经存在。例如，可以从缓存中提供对当前源内资源的 GET 请求，但如果不存在，可以使用 `fetch()` 函数请求，然后将其插入缓存，然后返回给浏览器。

### 高级 Service Worker 概念

Service workers 的目的是仅用于执行异步操作。因此，技术上在读取和写入时会阻塞的 `localStorage` API 不可用。然而，异步的 `indexedDB` API 是可用的。此外，Service workers 中也禁用了顶级 `await`。

在跟踪状态时，你主要会使用 self.caches 和 indexedDB。再次强调，在全局变量中保存数据是不可靠的。实际上，当调试你的 service worker 时，你可能会发现它们偶尔会停止，此时你无法进入检查器。浏览器有一个按钮允许你重新启动 worker，使你能够再次进入检查器。停止和启动会清除全局状态。

浏览器对 Service Worker 脚本进行了相当积极的缓存。在重新加载页面时，浏览器可能会请求脚本，但除非脚本发生了变化，否则不会考虑替换它。Chrome 浏览器确实提供了在重新加载页面时触发脚本更新的功能；为此，请在检查器的 "Application" 选项卡中导航到 "Service Workers"，然后勾选 "Update on reload" 复选框。

每个 Service Worker 从其创建时到可以使用的整个过程都会经历状态变化。通过读取 `self.serviceWorker.state` 属性，可以在 Service Worker 中获取其当前状态。以下是它可能经历的各个阶段：



在哲学上，应该将 Service Worker 视为一种渐进增强的形式。这意味着如果根本不使用 Service Worker，任何使用它们的网页仍应该表现得像往常一样。这很重要，因为可能会遇到不支持 Service Worker 的浏览器，或者安装阶段可能会失败，或者注重隐私的用户可能会完全禁用它们。换句话说，如果您只想为应用程序添加多线程功能，那么选择其他 Web Worker 之一就足够了。

在 Service Worker 中使用的全局 `self` 对象是 `ServiceWorker GlobalScope` 的实例。其他 Web Worker 中可用的 `importScripts()` 函数在这个环境中也是可用的。与其他 worker 一样，也可以将消息传递到 service worker 中，并从中接收消息。同样的 `self.onmessage` 处理程序可以被分配。这可能可用于向 Service Worker 发送信号，指示它应执行某种缓存失效。再次强调，通过这种方式传递的消息受到附录中讨论的相同克隆算法的影响。

在调试 Service Worker 以及从浏览器发出的请求时，需要牢记缓存。不仅可以通过编程方式实现由您控制的缓存，而且浏览器本身还必须处理常规的网络缓存。这意味着从您的 Service Worker 发送到服务器的请求可能并不总是被服务器接收。因此，请牢记 `Cache-Control` 和 `Expires` 标头，并确保设置有意义的值。

Service Worker 有许多更多的功能，超出了本节介绍的范围。Mozilla，Firefox 背后的公司，很友好地制作了一个包含构建 Service Worker 时常见策略的食谱网站。该网站位于 https://serviceworke.rs，如果您考虑在下一个 Web 应用程序中实现 Service Worker，我们建议您查看这个网站。

Service Worker 和您已经了解的其他 Web Worker 确实带有一些复杂性。幸运的是，有一些方便的库和可以实现的通信模式，可以使它们的管理变得更容易。

**跨文档通信**
在浏览器中，有其他方法可以实现多线程 JavaScript 编程，而无需实例化 Web Worker。这可以通过在不同的浏览器上下文之间进行通信来实现，包括完全打开的页面和 iframe。浏览器提供了 API 以允许在这些页面之间进行通信。

第一种方法是通过在网页中嵌入 iframe，或者创建一个弹出窗口，这在 Web Worker 存在之前就已经可用。父窗口能够获取对子窗口的引用，然后可以在该引用上调用 `.postMessage()` 方法以向子窗口发送消息。子窗口随后可以在其 window 对象上监听消息事件。子窗口还可以将消息传递回父窗口。这种模式可能启发了 Web Worker 接口的设计。

第二种方法更为通用。它允许在不仅弹出窗口和 iframe，而且同一源打开的任何窗口之间进行通信。它甚至进一步允许在线程之间进行通信。通过实例化一个新的 BroadcastChannel 实例并将通道的名称作为第一个参数传递，可以实现此通信。然后，该通道允许进行发布/订阅（publish and subscribe）通信。生成的对象具有 `.postMessage()` 方法，并可以分配一个 `.onmessage` 处理程序。所有在不同环境中监听此通道的对象在发布消息后都将调用其消息处理程序。该实例还具有一个 `.close()` 方法，以断开与通道的连接。

## 消息传递抽象

本章介绍的每种 Web Worker 都提供了一个接口，用于在不同的 JavaScript 环境中传递消息，并从中接收消息。这使您能够构建能够同时在多个核心上运行 JavaScript 的应用程序。
然而，到目前为止，您只处理了简单的、虚构的示例，传递简单的字符串并调用简单的函数。当构建更大型的应用程序时，重要的是传递可以扩展并在可扩展的 worker 中运行代码的消息，并在与 worker 一起工作时简化接口，从而减少潜在错误。

### The RPC Pattern  

RPC（远程过程调用）模式是一种将函数及其参数的表示序列化并传递到远程目的地以执行的方式。字符串 square_sum|num:1000000 实际上是一种我们无意中重新创建的 RPC 形式。也许它最终可以转化为一个函数调用，例如 squareNum(1000000)，这在第45页的“命令调度器模式”中有介绍。

### The Command Dispatcher Pattern  

虽然 RPC 模式对于定义协议很有用，但它并没有必要提供在接收端确定要执行的代码路径的机制。命令调度器模式解决了这个问题，提供了一种接受序列化命令、找到适当函数并执行它（可选地传入参数）的方式。

这种模式实现起来相当简单，不需要太多的魔法。首先，我们可以假设有两个包含关于代码需要运行的方法或命令的相关信息的变量。第一个变量叫做 method，是一个字符串。第二个变量叫做 args，是要传递给方法的值的数组。假设这些信息已经从应用程序的 RPC 层中提取出来。

最终需要运行的代码可能存在于应用程序的不同部分。例如，平方和的代码可能存在于第三方库中，而斐波那契代码可能是您更本地声明的。无论代码存在于何处，您都希望创建一个单一的存储库，将这些命令映射到需要运行的代码。有几种实现这一点的方法，例如使用 Map 对象，但由于这些命令将是相当静态的，一个简单的 JavaScript 对象就足够了。

另一个重要的概念是只有已定义的命令应该被执行。如果调用者想要调用一个不存在的方法，应该生成一个优雅的错误，可以返回给调用者，而不会导致 Web Worker 崩溃。虽然参数可以作为数组传递到方法中，但如果将参数数组展开为普通的函数参数，接口会更加友好。

示例 2-11 展示了一个命令调度器的示例实现，您可以在应用程序中使用。

### Putting It All Together  

在 JavaScript 应用程序中，我们经常考虑使用外部服务执行工作。例如，可能会调用数据库或进行 HTTP 请求。当这发生时，我们需要等待响应。理想情况下，我们可以提供一个回调函数或将此查找视为 Promise。尽管 Web Worker 消息传递接口不太直观，但我们绝对可以手动构建它。

Example 2-17. ch2-patterns/worker.js  

```js
const sleep = (ms) => new Promise((res) => setTimeout(res, ms)); // <1>

function asyncOnMessageWrap(fn) { // <2>
  return async function(msg) {
    postMessage(await fn(msg.data));
  }
}

const commands = {
  async square_sum(max) {
    await sleep(Math.random() * 100); // <3>
    let sum = 0; for (let i = 0; i < max; i++) sum += Math.sqrt(i);
    return sum;
  },
  async fibonacci(limit) {
    await sleep(Math.random() * 100);
    let prev = 1n, next = 0n, swap;	//这里的 n 表示这是一个大整数（BigInt），用于处理超出 JavaScript 常规数值范围的整数。
    while (limit) { swap = prev; prev = prev + next; next = swap; limit--; }
    return String(next); // <4>
  },
  async bad() {
    await sleep(Math.random() * 10);
    throw new Error('oh no');
  }
};

self.onmessage = asyncOnMessageWrap(async (rpc) => { // <5>
  const { method, params, id } = rpc;

  if (commands.hasOwnProperty(method)) {
    try {
      const result = await commands[method](...params);
      return { id, result }; // <6>
    } catch (err) {
      return { id, error: { code: -32000, message: err.message }};
    }
  } else {
    return { // <7>
      id, error: {
        code: -32601,
        message: `method ${method} not found`
      }
    };
  }
});
```



<4> BigInt 结果被强制转换为 JSON 友好的字符串值。

# 第3章 Node.js

在浏览器之外，只有一个值得注意的 JavaScript 运行时，那就是 Node.js。尽管它最初是一个强调单线程并采用传递继续风格回调的服务器并发平台，但在使其成为通用编程平台方面付出了大量努力。

Node.js 程序执行的许多任务并不适用于其传统用例，即提供 Web 请求服务或处理网络连接。相反，许多较新的 Node.js 程序是作为 JavaScript 构建系统或其组成部分的命令行工具。这类程序通常涉及大量 I/O 操作，就像服务器一样，但它们通常还涉及大量数据处理。



## Before We Had Threads  

虽然我们可以使用 Node.js 的 child_process API 来实现类似的功能，但最好使用 cluster，因为它是专门为这种用例构建的模块。这个模块的目的是将网络流量分散到多个工作进程中。让我们继续在一个简单的“Hello, World”示例中使用它。

Example 3-2. A “Hello, World” server in Node.js using cluster

```js
const http = require('http');
const cluster = require('cluster'); // <1>

if (cluster.isPrimary) { // <2>
  cluster.fork(); // <3>
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  http.createServer((req, res) => {
    res.end('Hello, World!\n');
  }).listen(3000); // <4>
}
```

你可能注意到我们正在创建在四个不同进程中监听相同端口的 Web 服务器。这似乎是一个错误。毕竟，如果我们尝试将服务器绑定到已经在使用的端口，通常会出现错误。别担心！我们实际上并不是在同一个端口上监听四次。原来 Node.js 在集群中为我们进行了一些魔术。

当在集群中设置工作进程时，对 `listen()` 的任何调用实际上都会导致 Node.js 在主进程而不是在工作进程上进行监听。然后，一旦在主进程中接收到连接，它将通过 IPC 传递给工作进程。在大多数系统上，这是以轮询的方式进行的。这种有点复杂的系统是使得每个工作进程看起来好像在同一个端口上进行监听，实际上它只是主进程在该端口上进行监听，并将连接传递给所有工作进程。

进程产生一些线程不具备的额外开销，而且我们也无法获得共享内存，这有助于更快地传输数据。为了实现这一点，我们需要使用 `worker_threads` 模块。

## The worker_threads Module  

# 第4章 Shared Memory  

这一章介绍了两个可用于 JavaScript 应用程序的强大工具：`Atomics` 对象和 `SharedArrayBuffer` 类。它们允许你在两个线程之间共享内存，而无需依赖消息传递。但在深入解释这些对象的完整技术细节之前，有必要先进行一个简短的介绍性示例。

在错误的使用方式下，这里介绍的工具可能会很危险，给你的应用程序引入逻辑缺陷，这些缺陷在开发过程中潜伏在阴影中，只有在生产环境中才会显露出来。但在经过磨练并正确使用时，这些工具可以让你的应用程序在硬件上实现前所未见的性能水平。

## 共享内存简介

### 在浏览器中的共享内存

### Node.js  中的共享内存

## SharedArrayBuffer 和 TypedArrays  

ArrayBuffer 和 SharedArrayBuffer 的实例表示的是一段二进制数据缓冲区，它具有固定的长度且无法调整大小。虽然这两者非常相似，但本节将重点介绍 SharedArrayBuffer，因为它允许应用程序在不同线程之间共享内存。二进制数据在许多传统编程语言（如C语言）中是一个普遍而且首要的概念，但对于使用高级语言如JavaScript的开发者来说，可能容易产生误解。

在考虑到这种模糊性的同时，还值得提到 ArrayBuffer（以及 SharedArrayBuffer）的内容不能直接修改。相反，必须首先创建对缓冲区的“视图”。此外，与其他一些语言可能提供对废弃内存的访问不同，当在JavaScript中实例化ArrayBuffer时，缓冲区的内容会被初始化为0。考虑到这些缓冲区对象仅存储数值数据，它们确实是一种非常基本的数据存储工具，通常用于构建更复杂的系统。

术语“`view`”已经在一些地方提到过，现在是定义它的好时机。由于二进制数据可能的含义不明确，我们需要使用视图来读取和写入底层缓冲区。在JavaScript中有几种这样的视图可用。每个视图都是从一个称为 TypedArray 的基类继承而来的。这个类不能直接实例化，也不作为全局变量提供，但可以通过获取从实例化的子类中获取 `.prototype` 属性来访问它。

对于 Uint8ClampedArray，其行为略有不同。当写入负值时，它会被转换为 0。当写入大于 255 的值时，它会被转换为 255。当提供非整数值时，它会被传递给 Math.round()。根据您的用例，使用这个视图可能更有意义。

最后，BigInt64Array 和 BigUint64Array 条目也值得特别关注。与其他 TypedArray 视图不同，这两个变体使用 BigInt 类型（1 是 Number，而 1n 是 BigInt）。这是因为可以用 64 字节表示的数值超出了可以用 JavaScript 的 Number 表示的范围。因此，使用这些视图设置值必须使用 BigInt，并且检索到的值也将是 BigInt 类型。

总的来说，在可能的情况下，使用多个 TypedArray 视图，特别是不同大小的视图，查看同一缓冲区实例是一种危险的做法，应尽量避免。您可能会发现在执行不同操作时意外覆盖了一些数据。在线程之间传递多个 SharedArrayBuffer 是可能的，因此如果发现自己需要混合类型，则可能会受益于使用多个缓冲区。

现在您已经熟悉了 ArrayBuffer 和 SharedArrayBuffer 的基础知识，可以使用更复杂的 API 与它们进行交互。

## 原子操作用于数据操作的方法

JavaScript提供了一个名为`Atomics`的全局对象，上面有几个静态方法。这个全局对象遵循与熟悉的`Math`全局对象相同的模式。在任一情况下，都不能使用`new`运算符创建新实例，而可用的方法是无状态的，不影响全局对象本身。相反，在`Atomics`中，它们通过传入要修改的数据的引用来使用。

# 第7章 WebAssembly  

虽然本书的标题是《Multithreaded JavaScript》，但现代JavaScript运行时还支持WebAssembly。对于不了解的人，WebAssembly（常简写为WASM）是一种以二进制编码的指令格式，运行在基于堆栈的虚拟机上。它被设计时考虑了安全性，并在一个沙盒中运行，只能访问由主机环境提供的内存和函数。在浏览器和其他JavaScript运行时中使用这样的技术的主要动机是，在执行速度比JavaScript快得多的环境中运行程序的性能敏感部分。另一个目标是为通常由编译的语言（如C、C++和Rust）编写的程序提供一个编译目标。这为这些语言的开发人员为Web开发提供了可能。

通常，WebAssembly模块使用ArrayBuffers表示内存，但也可以使用SharedArrayBuffers表示。此外，还有用于原子操作的WebAssembly指令，类似于我们在JavaScript中拥有的Atomics对象。通过SharedArrayBuffers、原子操作和Web Workers（或Node.js中的worker_threads），我们有足够的工具来完成使用WebAssembly进行多线程编程的全部任务。

在我们深入研究多线程WebAssembly之前，让我们构建一个“Hello, World!”的示例并执行它，以找出WebAssembly的优势和局限性。

## Your First WebAssembly  

# 第8章 分析

目前你应该已经对使用JavaScript构建多线程应用程序相当熟悉，无论是在用户的浏览器中运行的代码，还是在服务器上运行的代码，甚至是同时使用两者的应用程序。虽然本书提供了许多用例和参考资料，但从未在任何时候说过“你应该在你的应用程序中添加多线程”，而这有一个重要的原因。

总的来说，向应用程序添加工作线程的主要原因是为了提高性能。但这种权衡是有附加复杂性成本的。KISS原则，即“保持简单，愚蠢”，建议你的应用程序应该如此愚蠢简单，以至于任何人都能迅速查看代码并理解它。能够在编写代码后阅读代码至关重要，而在没有目的地简单地向程序中添加线程绝对是违反KISS原则的。

确实有很好的理由向应用程序添加线程，只要你在测量性能并确认速度提升超过了附加的维护成本，那么你就发现了一个值得使用线程的情况。但是，如何识别线程在哪些情况下有助于提升性能，在不经过所有实现工作的情况下如何确定线程是否有帮助？又该如何衡量性能影响呢？

## 何时不使用

多线程并不是一个能够解决应用程序性能问题的灵丹妙药。在性能方面，它通常也不是最容易解决的问题，通常应该作为最后的努力。在JavaScript中尤其如此，因为多线程在这个社区中的理解并不像其他语言那样广泛。添加多线程支持可能需要对应用程序进行大量更改，这意味着如果你首先找出其他代码的低效之处，那么你的付出与性能收益的比例可能会更高。

一旦完成了这个步骤，而且你已经在其他方面使应用程序性能良好，那么你将面临一个问题：“现在是添加多线程的好时机吗？”本节的其余部分包含一些情况，其中添加线程很可能不会提供任何性能优势。这可以帮助你避免进行一些不必要的发现工作。

### 低内存约束

这里有两个用于衡量程序内存使用的重要变量，它们的单位都是千字节。第一个是VSZ，即虚拟内存大小，这是进程可以访问的内存，包括交换内存、分配的内存，甚至是由共享库（如TLS）使用的内存，大约为1.4 GB。接下来是RSS，即常驻集大小，这是进程当前正在使用的物理内存量，大约为48 MB。
衡量内存可能有些模糊不清，估计实际上可以容纳多少个进程在内存中是棘手的。在这种情况下，我们主要将关注RSS值。

现在，让我们考虑程序的一个更复杂的版本，使用了线程。同样，将使用相同的非常简单的定时器，但在这种情况下将创建总共四个线程。在这种情况下，需要一个新的worker.js文件：

根据这些信息，似乎在使用Node.js 16.5在x86处理器上实例化每个新线程的额外RSS内存开销约为6 MB。再次强调，这个数字有些模糊，你需要在你的特定情况下进行测量。当线程引入更多模块时，内存开销当然会增加。如果在每个线程中实例化了庞大的框架和Web服务器，你可能会给你的进程增加数百兆字节的内存。

### Low Core Count  

一个自然的问题可能是：为了最大化ch6-threadpool应用程序的吞吐量，线程池的大小应该多大，应用程序应该提供多少个核心？为了找到答案，对应用程序应用了16种基准的排列，并测量了性能。为了帮助减少任何异常请求，测试的长度增加到了两分钟。表8-2提供了这些数据的表格版本。

### Containers Versus Threads  

在编写服务器软件时，比如使用Node.js，一个经验法则是进程应该进行水平扩展。这是一个花哨的术语，意味着你应该以隔离的方式运行程序的多个冗余版本，比如在一个Docker容器中。水平扩展有助于性能，使开发人员能够微调整个应用程序群的性能。这样的调优在扩展原语发生在程序内部、以线程池的形式时不容易执行。

编排器，比如Kubernetes，是在多台服务器上运行容器的工具。它们使得根据需求轻松扩展应用程序；在假期季节，工程师可以手动增加运行实例的数量。编排器还可以根据其他启发式（如CPU使用率、流量吞吐量，甚至工作队列的大小）动态更改规模。
如果在运行时在应用程序内执行动态扩展，这种动态扩展可能会是什么样子呢？嗯，肯定需要调整可用的线程池大小。还需要一些通信机制，允许工程师发送消息给进程以调整池的大小；也许需要一个额外的服务器监听端口以接收这样的管理命令。这样的功能则需要将额外的复杂性添加到应用程序代码中。
虽然与增加线程数相比，添加额外的进程会增加总体资源消耗，更不用说将进程封装在容器中的开销了，但较大的公司通常更喜欢这种方法的扩展灵活性。

## 何时使用

*Embarrassingly parallel*
这是一个问题类别，其中一个大任务可以被分解为较小的任务，并且几乎不需要或根本不需要共享状态。其中一个例子是在第106页的“示例应用程序：康威生命游戏”中介绍的生命游戏模拟。对于这个问题，游戏网格可以被划分为更小的网格，每个网格可以分配给一个独立的线程。

*重型数学计算*
适合使用线程的问题的另一个特征是涉及大量数学运算，也就是CPU密集型的工作。当然，有人可能会说计算机做的一切都是数学，但数学密集型应用程序的反面是I/O密集型的应用程序，或者主要涉及网络操作的应用程序。考虑一个密码哈希破解工具，该工具具有密码的弱SHA1摘要。这类工具可能通过在所有可能的10字符密码组合上运行安全哈希算法1（SHA1）算法来工作，这确实是大量的数学运算。

*适合MapReduce的问题*
MapReduce是受到函数式编程启发的编程模型。这个模型通常用于大规模数据处理，该数据被分布在许多不同的机器上。MapReduce被分为两部分。第一部分是Map，它接受一组值并产生一组值。第二部分是Reduce，其中对值列表进行迭代，产生一个单一的值。这可以在JavaScript中创建单线程版本，使用Array#map()和Array#reduce()，但多线程版本需要不同的线程处理数据列表的子集。搜索引擎使用Map扫描数百万份文档以查找关键字，然后使用Reduce对其进行评分和排名，为用户提供一页面的相关结果。像Hadoop和MongoDB这样的数据库系统从MapReduce中受益。

*图形处理*
许多图形处理任务也受益于多线程。与康威生命游戏问题类似，该问题在一个单元格网格上操作，图像则表示为像素网格。在这两种情况下，每个坐标的值都可以表示为一个数字，尽管康威生命游戏使用一个单一的1位数字，而图像更可能使用3或4个字节（红色、绿色、蓝色和可选的Alpha透明度）。然后，图像过滤变成了将图像划分为较小图像，使线程池中的线程并行处理较小图像，然后在更改完成后更新界面的问题。



这并不是一个完整的使用多线程的所有情况的列表；它只是一些最明显的用例的列表。
其中一个重复的主题是，不需要共享数据，或者至少不需要对共享数据进行协调读写的问题，更容易使用多线程进行建模。虽然编写不具有许多副作用的代码通常是有益的，但在编写多线程代码时，这种好处会增加。
另一个对JavaScript应用程序特别有益的用例是模板渲染。根据所使用的库，模板的渲染可能是使用表示原始模板的字符串和包含要修改模板的变量的对象完成的。在这种用例中，通常没有太多的全局状态需要考虑，只有两个输入，同时返回一个字符串输出。这适用于流行的模板渲染包mustache和handlebars。将模板渲染从Node.js应用程序的主线程中卸载似乎是获得性能的一个合理地方。
让我们测试一下这个假设。创建一个名为ch8-template-render/的新目录。在此目录中，从示例6-3中复制并粘贴现有的ch6-thread-pool/rpc-worker.js文件。尽管文件不经修改就可以正常工作，但你应该注释掉console.log()语句，以免减慢基准速度。

## 注意事项总结

这是在JavaScript中使用线程时提到的注意事项的综合列表：

- 复杂性

当使用共享内存时，应用程序往往更复杂。特别是当手动调用原子操作（Atomics）并手动处理SharedBufferArray实例时，这一点尤其明显。当然，要承认的是，通过使用第三方模块，可以将许多这种复杂性隐藏在应用程序中。在这种情况下，可以以清晰的方式表示工作线程，与主线程进行通信，并将所有的互通和协调抽象化。

- 内存开销

每添加一个线程到程序中都会带来额外的内存开销。如果在每个线程中加载了大量模块，这种内存开销就会累积起来。尽管在现代计算机上，这种开销可能并不是一个很大的问题，但为了安全起见，值得在最终运行代码的目标硬件上进行测试。缓解这个问题的一种方法是审查在单独的线程中加载的代码。确保你没有不必要地加载过多的东西！

- 没有共享对象

无法在线程之间共享对象可能会使将单线程应用程序轻松转换为多线程应用程序变得困难。相反，当涉及到改变对象时，你需要传递消息，最终会导致改变一个存在于单一位置的对象。

- 没有DOM访问

只有基于浏览器的应用程序的主线程才能访问DOM。这可能会使将UI渲染任务卸载到另一个线程变得困难。尽管如此，完全可以让主线程负责DOM的变化，而额外的线程可以完成繁重的工作，并将数据更改返回给主线程以更新UI。

- 修改后的API

与无法访问DOM相似，线程中可用的API有一些轻微的变化。在浏览器中，这意味着不能调用alert()，而各种工作线程类型甚至有更多规则，比如禁止阻塞XMLHttpRequest#open()请求、localStorage的限制、顶级等待等。虽然一些问题可能有点边缘，但这意味着并非所有代码都可以在每种可能的JavaScript上下文中无修改地运行。在处理这些问题时，文档是你的朋友。

- 结构化克隆算法的限制

结构化克隆算法存在一些约束，可能会使在不同线程之间传递某些类实例变得困难。目前，即使两个线程可以访问相同的类定义，传递线程之间的类实例将变成普通的Object实例。虽然可以将数据重新转换为类实例，但这需要手动努力。

- 浏览器需要特殊的头信息

在浏览器中通过SharedArrayBuffer使用共享内存时，服务器必须在用于页面的HTML文档请求中提供两个额外的头信息。如果你完全控制服务器，那么引入这些头信息可能很容易。然而，在某些托管环境中，提供这样的头信息可能会很困难或不可能。即使是本书中用于托管本地服务器的包也需要修改以启用这些头信息。

- 线程准备检测

没有内置功能来知道生成的线程何时准备好使用共享内存。相反，首先必须构建一个解决方案，该解决方案基本上会向线程发送ping，然后等待直到接收到响应。

# 附录 结构化克隆算法

结构化克隆算法（*structured clone algorithm*）是JavaScript引擎在使用某些API复制对象时的一种机制。最明显的是，在工作线程之间传递数据时使用它，尽管其他API也使用它。通过这种机制，数据被序列化，然后在另一个JavaScript领域内作为对象进行反序列化。
当以这种方式克隆对象，例如从主线程到工作线程或从一个工作线程到另一个工作线程时，在一侧修改对象不会影响另一侧的对象。现在基本上有两份数据的副本。结构化克隆算法的目的是为开发人员提供比`JSON.stringify`更友好的机制，同时施加合理的限制。

在浏览器在web workers之间复制数据时，它使用结构化克隆算法。类似地，Node.js在worker线程之间复制数据时也使用它。基本上，当你看到一个`.postMessage()`调用时，传递的数据是以这种方式克隆的。浏览器和Node.js遵循相同的规则，但它们都支持可以被复制的额外对象实例。
作为一个快速的经验法则，任何可以清晰表示为JSON的数据都可以以这种方式安全地克隆。遵循以这种方式表示的数据肯定会带来很少的惊喜。尽管如此，结构化克隆算法也支持其他几种类型的数据。
首先，所有在JavaScript中可用的原始数据类型，除了`Symbol`类型之外，都可以表示。这包括`Boolean、null、undefined、Number、BigInt`和`String`类型。
`Array、Map`和`Set`的实例，它们分别用于存储数据集合，也可以以这种方式克隆。甚至存储二进制数据的`ArrayBuffer、ArrayBufferView`和`Blob`实例也可以传递。