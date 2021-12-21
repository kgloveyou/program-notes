# lerna

Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。

https://www.lernajs.cn/

Lerna 是一种工具，针对 使用 git 和 npm 管理多软件包代码仓库的工作流程进行优化



## 命令

### 使用lerna来管理项目依赖

引入`lerna`后，第一件事就是要处理安装依赖的问题，我们需要用`lerna add` 命令来代替我们习惯的`npm`或`yarn`，比如说给rntest项目安装`lodash`，就要执行下面的命令。

```sh
lerna add lodash --scope=rntest
```

### lerna的依赖提升

`lerna`可以通过`lerna bootstrap`一行命令安装所有子项目的依赖包，而且在安装依赖时还有依赖提升功能，所谓“依赖提升”，就是把所有项目npm依赖文件都提升到根目录下，这样能避免相同依赖包在不同项目安装多次。比如多个项目都用了`redux`，通过依赖提升，多个项目一共只需要下载一次即可。不过，需要额外的参数`--hoist`让依赖提升生效。

```sh
lerna bootstrap --hoist
```

#### yarn是lerna的最佳搭档

`lerna`默认使用`npm`作为安装依赖包工具，但也可以选择其他工具。`yarn`在1.0版本之后提供了workspaces的功能，该功能从更底层的地方提供了依赖提升，做的事情跟`lerna`如出一辙。把它跟`lerna`放在一起看，简直就像是为`lerna`量身定做一样。因此，推荐在lerna中搭配yarn一起使用。

把npm替换成yarn只需在lerna的配置文件添加两行代码即可，配置完以后立刻顺畅百倍。

![](lerna.assets/17336e46c6eed674tplv-t2oaga2asx-watermark.awebp)




作者：上线前夕
链接：https://juejin.cn/post/6847902224794943495
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



## 参考资料：

1、Lerna-如何优雅地管理多个npm包

https://juejin.cn/post/6844904151692869645

2、基于 lerna 的多包 JavaScript 项目搭建维护

https://juejin.cn/post/6969544464113074189

其中设置了如何将包推送到verdaccio 搭建的私服。

3、大前端项目代码重用，也许lerna是最好的选择

https://juejin.cn/post/6847902224794943495

4、中文文档

http://www.febeacon.com/lerna-docs-zh-cn/

