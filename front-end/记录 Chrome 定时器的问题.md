## 背景

前段时间，开发 web terminal 功能，使用了 WebSocket 来建立长链接。但是测试反馈，在闲置一段时间后，web terminal 会出现断连。

web terminal 会经过网关，再连接到后端的 WebSocket 服务，而网关设置了 1 分钟超时，所以在 1 分钟内不进行消息通信，会因为网关的超时断开连接。为了处理超时断连，我们的 WebSocket 服务做了心跳处理，每 30s 会发送一次心跳消息，来保证长连接。

但是在已经做了心跳的情况下，为什么还是会出现断连，虽然断连时间不是固定，但是是必现的。下面就跟大家分享一下问题分析过程和解决方式。

## 问题分析

（1）首先是复现问题  
我打开 web terminal 后，去处理其他事情，一段时间后回来看，确实是断开连接的，问题确实是存在的

（2）然后是输出日志来分析  
在每次发送心跳、报错、断连事件发生的时候打印日志，为了更好的调试，不仅是输出一段标识字符，还需要输出当前日志打印的时间。

ps：实际上为了更好的调试 WebSocket 连接，在开发环境下，我们需要保持输出消息的发送、接收，心跳，报错，断连等日志。这些日志部分可以在生产环境下关闭，防止过多的 log 对页面性能造成影响，只需要保留报错和断连日志即可。

经过重复多次测试，发现断连时间大致在 3-5 分钟左右。再经过对比心跳发送的时间和最终断连的时间后，发现最后一次心跳消息间隔断连有 1 分钟左右，我明明设置的心跳间隔时间是 30s，为什么在最后断连前的心跳没有发送呢？于是我怀疑到定时器的问题。

### 定时器问题分析

（1）setTimeout 代替 setInterval  
在设置定时器的时候我使用的是 setInterval，想起来实际上很多人都会使用 setTimeout 来代替 setInterval，于是我去查了下原因：[为什么有时候用 setTimeout 替代 setInterval?](https://zhuanlan.zhihu.com/p/87595858 "https://zhuanlan.zhihu.com/p/87595858")

其实是考虑到回调函数中执行的代码耗时过长，导致下一次 interval 的时间间隔被大大缩短，所以采用 setTimeout 优化。对于我们代码中只做了发送心跳信息的简单处理，实际并不会有影响。

（2）单线程阻塞问题  
其实我一开始最先想到的就是阻塞问题。因为 js 是单线程的，就算定时器已经到时间了，回调函数被放入队列中，也需要等待主线程代码执行完成，才会执行回调函数。但是实际代码中并没有耗时任务，更不可能存在阻塞 1 分钟的情况

实际上分析到这里，思路已经断了。然而在同事的提醒下，会不会是浏览器不在当前 tab 的时候，闲置下来会有异常呢。这一下子就给我打开了思路，经过测试后发现，确实是只有在页面不在当前 tab 的时候，一段时间后才会断连。

### 浏览器对定时器的优化

（1）进一步验证  
为了避免其他因素的干扰，我临时写了一个 html 来验证页面闲置后定时器的问题，发现确实存在这样的问题

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb2d322cb2e044fc859f18e5fdaaeae7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在闲置之后，实际上定时器的执行会很不稳定，有时候会超出 1 分钟，而我们网关设置刚好是 1 分钟断连。在回来页面的时候，又会在小于当前设置的定时器时间的短时间内重新触发一次定时器回调。

（2）查找资料  
查找资料后发现，Chrome 浏览器为了保证电脑电池寿命，优化了后台运行的页面，其中就有对定时器进行节流。

浏览器非活动标签页对 定时器的优化：  
[developer.chrome.com/blog/timer-…](https://developer.chrome.com/blog/timer-throttling-in-chrome-88/ "https://developer.chrome.com/blog/timer-throttling-in-chrome-88/")

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6bedfd668ce4a3584eef33ef733db35~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 解决方案

这是浏览器的一个行为，对定时器进行了节流，那么前端有办法解决吗？

其实在查找这个问题的时候，已经查到了答案：[浏览器非活动页定时器执行频率下降问题-CSDN博客](https://blog.csdn.net/shuxiaohua/article/details/122627979 "https://blog.csdn.net/shuxiaohua/article/details/122627979")

web worker 不受这个节流策略的影响，前端可以通过 web worker 来实现定时器功能。这里我推荐一下 [set-worker-timer](https://github.com/lawrence-witt/set-worker-timer "https://github.com/lawrence-witt/set-worker-timer")，相比于文章中推荐的 [HackTimer](https://github.com/turuslan/HackTimer "https://github.com/turuslan/HackTimer")，封装的更友好一些，并且使用了 ts。我是直接参考了前者的代码，在自己的项目中实现了一个 worker timer 来使用的。

当然这也是目前的一个 hack 方案，以后浏览器会不会支持还是另外一回事。如果长远考虑，我能想到的方案有两个，未实践仅供参考：

-   由后端来定时发送心跳，前端只是做心跳响应，这样就可以规避浏览器定时器的问题
-   不处理定时器的问题，而是延长网关断连时长，从测试情况来看，最好能延长到 3 分钟断连比较好

## 参考

如果对您有所帮助，请给个赞吧，感谢您的阅读~

-   [为什么有时候用 setTimeout 替代 setInterval?](https://zhuanlan.zhihu.com/p/87595858 "https://zhuanlan.zhihu.com/p/87595858")
-   [developer.chrome.com/blog/timer-…](https://developer.chrome.com/blog/timer-throttling-in-chrome-88/ "https://developer.chrome.com/blog/timer-throttling-in-chrome-88/")
-   [浏览器非活动页定时器执行频率下降问题-CSDN博客](https://blog.csdn.net/shuxiaohua/article/details/122627979 "https://blog.csdn.net/shuxiaohua/article/details/122627979")
-   [set-worker-timer](https://github.com/lawrence-witt/set-worker-timer "https://github.com/lawrence-witt/set-worker-timer")

本文为原创文章，请引用此文章时，声明文章出处。

原文链接：[www.yuque.com/destinytaoe…](https://www.yuque.com/destinytaoer/blog/avbwg5vgdprma3nv "https://www.yuque.com/destinytaoer/blog/avbwg5vgdprma3nv")

> 生命的意义不仅是活着，而是我们给别人的生命带来了何种不同。