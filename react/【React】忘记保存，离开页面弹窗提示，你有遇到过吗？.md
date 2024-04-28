# 【React】忘记保存，离开页面弹窗提示，你有遇到过吗？

https://juejin.cn/post/7269584107218075667

> 实际开发中有遇到过填写了好多表单，以为自己保存了，其实是忘记提交了的场景吗？假设一个场景多节点，没做实时保存，而在最终提交，这时候产品提出需求，要做一个离开提示，需求就来了。话不多说上硬菜！

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68eb8ff0963c49f7baf103d1a2dacbbf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### 1.关闭浏览器和刷新浏览器场景

这种情况比较常见也比较简单，百度一下就发现一大堆没什么争议，很简单我们就这样子实现就可以了，起初我以为`returnValue`是可以自定义的，后续发现有些浏览器自带的无法更改，当然有些浏览器是可以自定义的，这是一个小小的弊端，也待详情验证

```ini
  const leaveWarning = '离开当前页后，所有未保存的数据将会丢失，是否继续？';
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = leaveWarning;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


```

实现完效果如下图

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/568e569a14164f38a95a3054bbcdb428~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### 2.路由切换自定义提示

上述的方法使用后发现不能在路由切换生效，翻阅了一些文章，我发现了一些文章的坑，也咨询了一下chatgpt（十分不靠谱），大多数的文章会让我们使用`Prompt`，有的文章写的是`import { Prompt } from 'umi'` ，也有的文章写的是 `import { Prompt } from 'react-router-dom'` 博主这边没找到对应的导出模块，可能是看漏了，总之很多篇文章结果显示Prompt的展现方式是类似于`window.confirm`。这边我才用的是路由监听，基于umi架构上的，大家可以参考一下。

```javascript
......
import { history } from 'umi';
import { Modal } from 'antd';
......

  useEffect(() => {
    const unblock = history.block((location, action) => {
      // 这个函数将在路由发生变化时被调用
      // 可以在这里执行导航阻止逻辑，显示确认提示框等
      Modal.confirm({
        title: '你确定要离开此页面?',
        content: '系统可能不会保存您所做的更改',
        onOk() {
          // 不要在这里执行路由跳转
          unblock(); //此处有坑，一定要这么执行
          history.push(location.location.pathname);
        },
        onCancel() {},
      });

      console.log(location, 'location', action);
    });

    return () => {
      // 当组件卸载时，解除监听
      unblock();
    };
  }, []); // 仅在组件加载时执行一次

```

这里有一个很坑的点，我查阅了网上的资料，在antd 弹窗点确认的时候要执行路由跳转，发现还是会触发监听，也就会出现循环弹窗的问题，之前我做了一次锁来控制，发现并不能生效。网上很多文章说允许跳转 `return true` 反之`return false`，尝试过后，这是错误的。仔细看我在`onOK`里执行了`unblock`函数，这一步是打开锁，`history.block`可以看作是一把路由的锁，当你监听到路由变化他就给你上锁，当满足条件我们需要执行开锁，这一步很坑网上的文章，多数文章没有给出正确的答案，可以注意一下。以上实现效果如下图所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78e5ada0d85943c3acd889f160b76cb8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

> 上述就是我今天分享的一个小需求解决方案，如果有问题或者是上述提到过待验有知道的可以留言交流一下。