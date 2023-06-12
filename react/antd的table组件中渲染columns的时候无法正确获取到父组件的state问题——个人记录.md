# antd的table组件中渲染columns的时候无法正确获取到父组件的state问题——个人记录

## 问题描述

首先我使用的是函数式组件（因为封装的原因 我将以下代码都写在了父组件函数里面）

然后在父组件中我定义了一个state 用于记录某个作用的id  
![在这里插入图片描述](https://img-blog.csdnimg.cn/e4910a2228f94feea910cd98150632bc.png)  
初始值是333 （这333后面有用）  
但是在显示组件的时候 我利用useEffect函数 发起请求 获取后端最新的deptid 然后使用setDeptid对deptid进行从新的赋值  
![在这里插入图片描述](https://img-blog.csdnimg.cn/9b3e80a4518443ebb815dc15d693cb5d.png)  
当重新赋值deptid之前 我是已经渲染 table的columns  
下图是columns中的某一个 操作列  
![在这里插入图片描述](https://img-blog.csdnimg.cn/703491e1fe94403eac69de9107ecc8ba.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5L2V56iL5bqP5ZGY,size_20,color_FFFFFF,t_70,g_se,x_16)  
如上图 删除按钮是一个deleteItem的函数  
![在这里插入图片描述](https://img-blog.csdnimg.cn/5c78442fa375457fabf621499cd49e1b.png)  
如图所示该函数执行会输出了父组件的state但是该输出却是333 并不是最新的数据

## 原因分析

究其原因发现原来 是我掉进了闭包陷阱当中  
在渲染table的时候 我将之前的deptid放到了deleteItem中 由此形成了一个闭包 在内存中将之前的333缓存了起来 然后当你再次点击按钮触发deleteItem函数的时候 该值重新从缓存中拿出来 那么显示的就是之前的值，而在类组件中是不会存在这种问题的

## 解决方案

如上图所示 解决方案是在父组件中使用一个useRef钩子 来保存最新的数据 需要用的时候 直接console.log(countRef.current)即可  
![在这里插入图片描述](https://img-blog.csdnimg.cn/b23a4e277f9b422ba4c95075af350477.png)

## 参考文献

[添加链接描述](https://blog.csdn.net/weixin_38080573/article/details/115178502)