# git submodule 和 git subtree，你会选择哪个来管理子项目？

https://mp.weixin.qq.com/s/Cm-xgtregfljwk6Ep9hSpw

 神说要有光zxg [神光的编程秘籍](javascript:void(0);) *2023-03-15 20:37* *发表于北京*



如果想在一个项目中用另一个项目的代码，你会怎么做呢？

有同学说，可以发一个 npm 包呀，然后在另一个项目里引入。

这样是可以，但是如果经常需要改动它的源码呢？这样频繁发包就很麻烦。

那可以用 monorepo 的形式来组织呀，也就是一个项目下包含多个包，它们之间可以相互依赖。

这样确实可以频繁改动源码，然后另一个包里就直接可用了。

但如果这个包是一个独立的 git 仓库，我希望它虽然在另一个项目里用了，但要保留 git 仓库的独立性呢？

这种就可以用 git submodule 或者 git subtree 了。这俩都实现了一个 git 项目里引入了另一个 git 项目的功能。

那 submodule 和 subtree 都能做这个，它俩有什么区别呢？我该用哪个好呢？

这篇文章我们就来详细对比下 git submodule 还有 git subtree。

首先我们准备这样一个 git 项目：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUVTtfmpUdxqa9joqTtRMqkpoEyiaicicP8B3TwibOG15SnqDDDtCxAUQ4Yg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

3 个 commit，每个文件一个 commit。

然后在另一个项目里引入：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUicfVz9iaJHw837BPSMTCicjVHiaPZydpU8LWenich4I3mULccepz8Whfm5g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

该怎么做呢？

我们先用 git submodule 的方式：

执行

```
git submodule add git@github.com:QuarkGluonPlasma/git-research-child.git child
```

这个命令就是添加这个 git 项目到 child 目录下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUy630OdFzp5uibetEiaF2x9z1nAOFpxPDY2z2lWgDmqMPL5dnlLjSqlXw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

然后我们再在 child 目录下再添加一个 git submodule：

```
cd child
git submodule add git@github.com:QuarkGluonPlasma/git-research-child.git child2
```

现在就是两级 git submodule 了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUhCtDzSGwL2hc5ly7p2vlibPC2PhlZGlJl4np6AmnbZepJVzWcvvtofg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在 .gitmodules 里记录着它的 url 和保存的 path：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUvLpicwBJgHMYrUafOgaar2D6ziaKJ4hgZlIX67ahyaqjyWBOdIbJdE0Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

前面说 submodule 能保留独立性，怎么看出来的呢？

首先，它有独立的 .git 目录，代表是单独 git 项目。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYU7eajSF4kFUrkias6VXTeP0ggWg2MRISahA7etmwibkvmq1njX83ru72g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

虽然这个 .git 目录是放在根 git 项目的 .git 下的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUGibD3hZb896uPYSQGpia1nYoPLcuuPlq6CShiazWpVUxRUmPLA7NHxO4A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样就保证了它们依然可以独立的 pull 和 push。

比如我在 child 里加了一个 444.md 的文件：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYU3cv2U1B5qnKh6WjDo3gHwMsXUWEa31cGR9T1dzjf5rIwd5B4Wia0CNg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

你 git status 只能看到它提示了 submodule 有内容变动，但是根本不会管有什么变动。

你需要进入这个目录执行 git add、git commit、git push 才行。

也就是它依然是独立的项目，父项目只是记录了它关联的 commit id 是啥。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUSAglMep9MDaAjCGYJQTmZrgDDjWByjPRyd64FnBlIjiaibgpTnv1pkaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，子项目可以正常 push 成功。

这时候在 child 目录下执行 git status 就可以看到没有变动了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUmFO7clytpBIp5lhYbfcbsydx5rhjtApQQhd6Sm8fg9p7814oqEib5bg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

但这时候你回到父级目录可以看到提示 submodule 有新的 commit：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUJb5hVtw0cXjp78ZibRoQrnUZianmZBJpsStosmNDTXiaicryJeGFeRw6ibA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们新生成一个 commit 来保存这次变更：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUmDRgicKDxkAt7X61GHicBfLkKLeJN43aicBToibvmczyMnoHfnuQ24DcpQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这就是 submodule 的独立性，你可以在这个目录下单独执行 pull、push，单独管理变更，父项目只是记录关联的 commit 的变化。

那如果别人 clone 下这个项目来，还有这个 submodule 么？

我们 clone 下试试：

```
git clone git@github.com:QuarkGluonPlasma/git-research.git git-research-2
```

我把这个项目 clone 下来：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到确实有 child 这个目录，但是没内容。

这是因为它需要单独初始化一下并更新下代码：

执行

```
git submodule init
git submodule update
```

或者执行

```
git submodule update --init
```

就可以看到代码被拉下来了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYURD8Ce6YftqibvbDn3Ot8hvj5IpjAduGgVDQtdUw7xk4pABBwXx2A32Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

但只有一层，如果想递归的 init 和 update，可以这样：

```
git submodule update --init --recursive
```

这样它就会把每一层 submodule 都拉下来：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUsTnvxpMxXO78RI5cNHSKl9mQibOIpAPGUfqqPKm7YdibTezOx1dfHr8w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样就完整下载了整个项目的代码。

当然，这一步可以提前到 git clone，也就是执行：

```
git clone --recursive-submodules xxx
```

这样就不用单独 git submodule init 和 git submodule update 了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUWKMgTVQiaCcdS0ETUQfzlhWCdkdfXvicmHEUDa2H0SOSVMyaSo3yg0Nw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

小结下 git submodule 的用法：

- **通过 git submodule add 在一个项目目录下添加另一个 git 项目作为 submodule**
- **submodule 下可以单独 pull、push、add、commit 等**
- **父项目只是记录了 gitmodules 的 url 和它最新的 commit，并不管具体内容是什么**
- **submodule 可以多层嵌套**
- **git clone 的时候可以 --recursive-submodules 来递归初始化 submodules，或者单独执行 git submodule init 和 git submodule update**

可以体会到啥叫复用子项目代码的同时保留项目的独立性了么？

然后我们再来试试 git subtree：

还是这样一个项目：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUpXvBCm5mOeE3us31Hwtz1QNzv9q0VmkhGg1OSIaWaV3vusdv7soibFw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我们用 subtree 的命令添加子项目：

```
git subtree add --prefix=child git@github.com:QuarkGluonPlasma/git-research-child.git main
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUOUcRbC8DtCNvJBauyBhXdJ0icPAKeZsdJv3IcEHr1jQCYYV0Ec2G52g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样和 submodule 有什么区别呢？

不知道你有没有发现，child 目录下是没有 .git 的，这代码它不是一个单独的 git 项目，只是一个普通目录：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUE9BBRNWjQG4zFClvgMwLN3ohhKV2AOLtRLNV8tdka9pxx3IfWickKKQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

所以你在这个目录下的任何改动都可以被检测到：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以和整个项目一起 git add、commit、push 等。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

不过 subtree 的方式在创建目录的时候会生成一个 commit：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

那这样都作为一个普通目录了，这个子项目还独立么？还能单独 pull 和 push 么？

可以的！

虽然没有单独的 .git 目录，但它依然有独立性。你可以通过 subtree 的命令来 pull 和 push 它的代码：

比如我们先试试 pull。

我在 git-search-child 这个项目下加两个 commit：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUpGTgicldl65zjHrBSesVHthPcDHMvOxsjZqAT10EBian6VdOvbARZQibg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

加了 555、666 这俩 commit。

然后我在项目下执行 git subtree pull：

```
git subtree pull --prefix=child git@github.com:QuarkGluonPlasma/git-research-child.git main
```

这样子项目的最新改动就拉下来了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUnxJUJl6pYicgL4eibrZSamIUiclZOfYtT8EMn5GvD7hGe5Klzw12E1xLw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

所以说 subtree 虽然把它作为普通目录来管理了，但它依然保留着独立 pull 和 push 到单独项目的能力！

上面的 url 如果你觉得敲起来麻烦，可以放到 git remote 里来管理：

```
git remote add child git@github.com:QuarkGluonPlasma/git-research-child.git
```

这样就可以只写它的名字了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUMoia0A6EiaOYP1cPUxn9h8FZoWQPx5BQasm85ZyAQjh6YdbgkP3gH1pg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样 pull，会生成 3 个 commit：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUicChibIicgzsBKuJwkmNNMdzJEicDQwdiaA1xfRJ82zYibI08DFicicawGopqA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

刚拉下来的 555、666 的 commit，还有一个 merge commit。

你也可以加个 --squash 来合并：

```
git subtree pull --prefix=child child main --squash
```

（这个 child 是我们前面添加的 git remote）

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUe4ImVqd1Re8DXO8j0ib4LbqnzDI8VhEj20KLfmNXkgN4QrGiap1u2tqg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样就只有一个合并后的 commit，一个 merge commit 了。这就是 --squash 的作用：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUx7qia7kHsiaLUPpWQzB6YOQ9FIzrkxoFfDXp4wGLhtT14RRDGBXGicVHg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

再来试下独立的 push。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUlwFo0HqZph2AEIiaDBcFTbIqJZIduxHkiaZ4zWI3zVMDyMaKicy9nRTJA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样就把它 push 上去了。

注意，这里可不是整个项目的 push，而是把那个子项目目录的改动 push 到了子项目里去。

另一个项目里就可以把它拉下来：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYU1uQAnMpXM94axq9liajibRj26v45EXfBlwIxic8ft3e3ibW6vS7qLwdngA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

那问题来了，不是都没有 .git 目录了么？

那 subtree 是怎么知道哪些 commit 是新的，是属于这个子项目的呢？

还记得 subtree add 的时候单独生成了一个 commit 么？

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUgDPyKwRxpP5LM7P3Omx4WgIBEWkaVlmdn6pib6C8ibNibVqUFqWWic5AibA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

git 会遍历 git log，直到找到这个 commit，然后把之间的 commit 里涉及到那个目录的改动摘出来，单独 push 到子项目。

因为有个遍历 commit 的过程，所以这一步可能会比较慢。

当然也有优化的方式，当 commit 多的时候，你可以执行：

```
git subtree split --prefix=child --rejoin
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUxWHicZr8q6nx5PUw6yMju5gAqzZBibPicUhLwkYa4AjBCPN3Ziatv84Pqw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这样会单独生成一个这样的 commit：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUf7QkzRvpxiaibB5z2fwRxfQNUwX7BAPlm6LOBMTygeQcdiaT2gwsR1ZDw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

因为 subtree push 的时候会从上往下找 commit，直到找到这样的 commit 结束。

所以 split 命令就可以指定找到哪个 commit，之前的就不找了，从而优化性能。

最后，git submodule 在 clone 的时候需要单独拉一下子项目代码，那 git subtree 呢？

我们试试：

```
git clone git@github.com:QuarkGluonPlasma/git-research.git git-research-3
```

可以看到，拉下来的就是全部的代码：

![图片](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGjWuq18zWIsIXNqjenWfeYUaK6M3tdSA9wzAv9japXT5vJjBT52lzOicYH7RbVSPRdeFibng0oia0eYQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

也就是说它真的就是个普通目录，只不过可以单独的作为子项目 pull 和 push 而已。

这就 git subtree 的使用方式。

小结一下：

- **git subtree add 可以在一个目录下添加另一个子项目**
- **子项目目录和别的目录没有区别，目录下改动会被 git 检测到**
- **可以用 git subtree pull 和 git subtree push 单独提交和拉取子项目代码**
- **git subtree pull 加一个 --squash 可以合并拉下来的 commit**
- **add 的时候会创建一个 commit，这是 push 的时候搜索 commit 的终点，你也可以用 git subtree split --rejoin 来单独生成一个这样的 commit**

还有一点要注意，我用的 url 都是 git@github.com:QuarkGluonPlasma/git-research-child.git 这种，而不是 https://github.com/QuarkGluonPlasma/git-research-child

因为 github 现在 https 的方式需要输入用户名密码，而且已经被 github 禁掉了，这会导致子项目pull 和 push失败，所以统一用 ssh 的方式。

## 总结

当你想一个项目加入到另一个项目里来复用，并且还有保持这个项目可以作为独立 git 仓库管理的时候，就可以用 git submodule 或者 git subtree 了。

git submodule 会把子项目作为独立 git 仓库，你可以在这个目录下 pull、push、add、commit，父项目只记录着关联的 commit 是啥，并不关心子项目的具体变动。

git subtree 则是把子项目作为普通目录来管理，和别的文件没啥区别，都可以 add、commit 等。只不过依然保留了这个目录下的改动单独 pull、push 到子项目 git 仓库的能力。

这两种方式都可以复用项目代码的同时，保留子项目独立性。

不过 submodule 的方式耦合比较低，你能感觉出来它就是一个独立的 git 项目，你需要单独操作。

subtree 的方式，你根本感觉不到子项目的存在，它彻底融入了父项目。只是你依然可以单独的对它 pull、push 到子项目仓库。

我个人更喜欢 subtree 的方式，它更无感一点。

你呢？管理 git 项目里的 git 项目，你会选择 git submodule 还是 git subtree 呢？