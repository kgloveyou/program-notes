 

# 团队工程实践 - 打造monorepo工作流

[掘金泥石流](/user/3421335914034983/posts)

2020-11-13 5,114 阅读12分钟

关注

智能总结

复制

重新生成

这篇文章主要介绍了团队在工程化实践中打造 monorepo 工作流的过程。先是复盘了之前多包管理的问题，然后阐述了选择 monorepo 的原因，接着详细说明了方案细节，包括基本目录结构、环境搭建、创建新 package、依赖管理、项目构建、发布及联调等，最后总结目前成果并展望未来完善方向。

关联问题: monorepo 优势在哪 如何优化工作流 团队协作要注意啥

AI智能总结首次生成速度较慢, 请耐心等待

# 前言

本篇是团队里同学在做工程化实践产出的一些经验心得, 虽然 es6 模块提供了解耦代码, 降低软件复杂度的能力, 但与之相匹配的工程化手段一直都比较让人头疼, 仅仅依靠 npm 和 npm 自带的 link 能力完全不能适应大规模模块化的系统, 为此我们在这方面做了一些实践和尝试, 目前看来效果还不错, 本文作者的视角是从团队的需求出发, 行文风格会比较接地气, 读者可以自行代入阅读.

> 作者: 税友体验技术团队 - 姜浩

## 一、背景

上个月，我们借助个代接入事项，已经初步尝试将智能财税线的【客户端方法调用】和【公共菜单逻辑】剥离到npm包中统一管理。 当时采用的剥离公共技术的技术方案简单分为以下几点：

* 各个公共技术包当作独立的package存在。
* 各package共享一个公共技术git仓库（scavenger）。
* 各package独立发布npm包。
* 各package独立管理版本。
* 各业务组多人协作开发、发布。

> 但在实际开发过程中，发现各个环节均存在一些问题，仿佛是在原始社会，规范、工作流、生产线均不完整。

## 二、问题复盘

### 2.1、内部

* 开发协作
    * 分支管理，拉取、合并规范。
    * 阻断问题修复同步困难。
    * ...
* 内部依赖管理
    * 内部依赖处理麻烦，手动更新版本。
    * 不同分支版本不一样，缺少统一管理依赖的能力。
    * ...
* 版本管理
    * 手动更新版本，很低效，经常忘记升级版本且容易出错。
    * 缺少统一管理版本的能力。
    * 版本升级同步，多分支时极易出错。
    * ...
* 发布管理
    * 发布权限、发布分支没有收敛，极易出错、成果相互覆盖等问题。
    * ...
* 内部联调
    * 内部联调复杂。
    * 手动link效率低，且package相互依赖后link基本是不可实现的方案。
    * ...
* 生产线缺失

### 2.2、外部

* 外部联调
    * 外部联调极其不方便，导致版本激增。
    * ...
* CHANGELOG管理
    * 缺失，导致沟通成本增加，版本增多后外部无法感知修改点。

## 三、生产线

### 3.1、类比工厂生产线

> 为了先形成一个抽象的概念，我们将npm包生产线抽象类比工厂生产线，帮助记忆和理解。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cca0b74ee4e94503b41b8970619e40c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

npm包的生产线也是类似，同样具备创建 ->开发联调 -> 测试 -> 打包构建 -> 发布 这样一条流程。我们初步的目标就是打造一条针对npm多包的完整生产线。

### 3.2、WHY monorepo

monorepo的概念，用白话来说，就是把多个npm包放在一个代码仓库里面管理的一种方式（与之相对的就是multirepo，指多包多仓库）。

> 目前很多流行的开源项目都在使用monorepo的方式管理代码，如：babel、Vue3.0

* 我们需要的是什么？

首先明确我们工程治理的一个方向，一定是不断的剥离公共技术、拆分成粒度更细的模块来支持更灵活的业务与复用，这样下去npm包的数量一定是以很快的增速在不断增多，相互依赖也会更加复杂。那么针对不断增多的npm包，我们迫切需要一个完善、统筹、方便协作、尽量覆盖全流程的一个包管理方案。这是我们需要的。

而多仓库的方式管理起来天然是麻烦的。无论对于多人协作还是独立开发，多仓库的问题复杂度一定是指数上升的。

* monorepo解决的是什么？

而monorepo正是为了解决这些问题的。

> “Any problem in computer science can be solved by anther layer of indirection.” “计算机领域所有问题都可以通过增加一层来解决” - IT届谚语

通过将各包统一收敛在packages中，在上层统一统筹管理各个package的依赖、构建、开发/调试、测试、版本、发布，提供更优雅的多包管理和协作方案。

## 四、方案细节

> 生产线初步方案的目标，是完善与落地。

lerna和yarn workspaces是市面上常见的monorepo管理工具，由于lerna和yarn workspaces有不少功能上的重叠，这里计划也采用yarn官网上提供的建议（yarn workspaces的目标只是提供更好的依赖解决方案，不会提供类似lerna的一些复杂管理功能）

* 使用yarn workspaces单纯的处理依赖问题。
* 用lerna来处理统筹管理package的问题。

> 同样初期也会有一些工具解决不了的事情，这里考虑通过【规范/约束 + review】来保障。

### 4.1、基本目录结构

```go
├── README.md
├── lerna.json                // 全局的lerna配置文件
├── package.json							// 全局package.json，主要用来配置yarn workspaces和全局依赖、全局scripts
├── packages									// 各个npm包放在这个文件夹下
│   ├── itr-menu							// package A
│   │   ├── README.md
│   │   ├── dist
│   │   ├── lib
│   │   ├── package.json			// package A的package.json，配置自己的依赖、scripts、描述。
│   └── scavenger-client			// package B
│       ├── README.md
│       ├── dist
│       ├── index.js
│       ├── package.json			// package B的package.json
│       ├── src
└── yarn.lock

```

### 4.2、环境搭建

这里的环境搭建主要指的是lerna的安装，可以选择全局安装lerna：

```bash
npm i lerna -g

```

> 也可以选择使用项目中的lerna，cd到总repo中安装依赖。

如果主工程首次使用lerna，那么需要使用lerna初始化主工程：

```bash
lerna init

```

在工程根目录下生成lerna.json、package.json两个文件来描述lerna的依赖和配置，常用配置项接下来会详细介绍，这里先不展开。

> 官方文档 - [lerna.json配置项](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flerna%2Flerna%23lernajson "https://github.com/lerna/lerna#lernajson")

### 4.3、创建新package

使用lerna创建新的package非常方便，只需要在主工程根目录下，通过命令行:

```bash
lerna create package-name

```

然后根据提示输入package描述信息即可创建完成。

> 后续可以考虑结合脚手架使用

### 4.4、依赖管理

按照之前复盘的内容来看，其实针对依赖管理，我们面临如下几个方面的问题：

1.  子packages依赖包体积：随着package数量的增加，包体积成指数上升、安装依赖耗时指数上升。
2.  子packages间相互依赖：随着package数量的增加，开发联调过程中手动link、版本操作负担巨大。
3.  子packages包依赖操作复杂：随着package数量的增加，依赖安装、清理操作复杂。

由此可见，我们迫切需要一个统筹、自动化管理依赖的工具，来解决上述几个方面的问题。yarn workspace的能力如下：

1.  yarn workspace通过依赖分析、依赖提升算法，将各个package的公用、常用依赖包提升到主工程下，解决包体积和安装耗时问题。
2.  yarn workspace会按照拓扑序列，分析package之间的内部依赖，自动通过类似软链（link）的方式来解决内部相互依赖的问题。
3.  yarn workspace可以在主工程下，通过简单的几个命令，统一管理以来的安装、清理、查看依赖关系等等操作，简单快捷。

> lerna本身也是具备依赖管理的能力，但是yarn workspaces具有更优秀的依赖分析、依赖提升（hoisting）的算法（[《lerna与yarn workspace的hoisting算法浅析》](https://link.juejin.cn?target=https%3A%2F%2Fyrq110.me%2Fpost%2Ftool%2Fhow-lerna-manage-package-dependencies%2F "https://yrq110.me/post/tool/how-lerna-manage-package-dependencies/")），因此这里我们选择使用yarn workspaces来管理我们的依赖。

#### 4.4.1、具体使用及常用命令

* 首先需要在主工程里开启yarn workspaces，开启的方式非常简单，只需要在主工程的package.json文件里面：

```json
{
  "name": "root",
  "private": true,             // 标明是主工程，不会被发布
  "devDependencies": {
    "lerna": "^3.22.1"
  },
  "workspaces": [              // 开启workspaces功能，并且声明子package（可以手动指定package，也可以通配符指定package路径）
    "packages/*"
  ]
}

```

> 使用lerna初始化主工程后，会自动开启yarn workspaces

简单开启之后，子package无需做任何修改，就可以开始通过yarn workspace管理依赖。

* 安装依赖

安装依赖只需要在主工程根目录下，执行一句yarn install（或者直接yarn），yarn workspace就会自动把依赖分析、提升、安装、软链处理好。

```bash
yarn install

```

* 新增 | 删除依赖

新增 | 删除依赖一般分为三种场景：

1.  给某个package新增依赖

```bash
// 新增-第三方
yarn workspace package-name add react
// 新增-内部
yarn workspace packageA add packageB
// 删除
yarn workspace package-name remove react

```

2.  给所有package新增依赖

```bash
// 新增
yarn workspaces add react
// 删除
yarn workspaces remove react

```

3.  给主工程新增依赖

```bash
// 新增
yarn add -W -D react
// 删除
yarn remove -W -D react

```

* 查看内部依赖

```bash
yarn workspaces info

```

以树形结构输出当前workspaces内部各个package的依赖信息（yarn版本要求1.13以上），例如：

```json
{
  "@itr/itr-menu": {
    "location": "packages/itr-menu",
    "workspaceDependencies": [
      "scavenger-client"
    ],
    "mismatchedWorkspaceDependencies": []
  },
  "scavenger-client": {
    "location": "packages/scavenger-client",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "test-package": {
    "location": "packages/test-package",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  }
}

```

### 4.5、项目构建

子package会有自己的构建命令，按照团队规范统一各package打包构建命令，使用lerna可以一键构建所有子package。另外，如果子package之间存在相互依赖（如packageB只有在packageA构建完之后才能进行构建，否则就会出错），那么，lerna同样也支持根据拓扑排序的规则进行构建。具体命令如下：

```bash
lerna run --stream --sort build

```

当有独立构建的需要时，lerna也支持单独运行某一个package的script命令

```bash
lerna run --scope package-name build

```

### 4.7、项目发布

当开发、测试结束之后，正式进入成果发布阶段，但是在正式发布到npm之前，还有几件事情需要处理：

> **version bump -> changelog -> git release -> npm publish**

\*\*

#### 4.7.1、version bump

版本更新是我们之前比较明显的痛点之一，手动改版本号，麻烦不说，而且package多了很容易出错，如果有相互依赖的package，更是噩梦。

而针对这些问题，lerna提供给我们很棒的解决方案，可以支持一键管理所有package的版本号更新，包括内部相互依赖的package也可以一键同步更新。甚至包括推git、建版本tag在内，一条龙服务。下面来详细介绍lerna的version bump机制。

一个核心的命令：

```bash
lerna version

```

这个命令在更新版本前，会自动做一些版本更新的前置条件判断：

* 如果本地代码有未提交的修改，则不可以更新版本，除非回滚修改或者提交修改。
* 如果某个package的代码与上个发布版本的代码比较没有任何修改内容，则不会执行没有修改内容的package的版本更新。

在这些前置判断都通过的情况下，就可以执行版本更新了

```bash
lerna version --conventional-commits

```

\--conventional-commits的参数，可以支持直接根据我们的git提交记录（前提是满足【约定式提交】规范），来自动更新版本号：

* 存在**feat**提交： 需要更新minor版本
* 存在**fix**提交： 需要更新patch版本
* 存在**BREAKING CHANGE**提交： 需要更新大版本

版本更新成功之后，lerna会使用chore(release): publish提交commit并推送到git，来作为版本发布的提交记录，并且各个package会自动生成当前版本的tag，留作版本回退备用。

> 如果不想自动生成版本号，可以不带--conventional-commits参数，然后手动指定各个package的版本，**但是不建议。**

#### 4.7.2、changelog

其实在经过上一步的version命令之后，lerna就已经根据git提交记录，为每一个package自动生成了一份CHANGELOG.md文件，当然，同样也是根据【约定式提交】来的。

需要注意的一点是，提交时需要使用包含作用域的提交说明，这样在最终生成CHANGELOG时才会将不同package的提交内容分到各自的CHANGELOG文件下，例如：

```bash
feat(scavenger-client): xxxxx

```

#### 4.7.3、publish

接下来就是最后一步，发布npm。其实前置准备工作我们都已经做好，就差最后一行命令，就可以根据version生成的tag进行npm发包了：

```bash
lerna publish from-git

```

> 这里建议统一切回master合并后再发版本。

### 4.8、联调相关

#### 4.8.1、本地

建议使用npm link到本地成果，来进行本地代码的联调，具体方式：

1.  cd到packageA目录下，执行：

```bash
npm link

```

2.  cd到依赖packageA的项目中，执行

```bash
npm link packageA

```

then done。就这么简单，这样就可以在本地项目中，直接调试本地packageA的代码而不需要发布新版本。

## 五、总结

至此，从package的创建到发布的流程已经完成，这条生产线也有了初步的样子和功能。但是后续还是需要继续不断完善，包括测试流程、外部联调，与ci/cd打通，使流程能够自动化等等，严格来说目前的成果算不上是工作流、生产线（可恶！是标题党），但可能是带领我们从“原始社会”的纯手工劳动转型到“工业1.0”的蒸汽机代替手工的机械生产时代，未来要走的路还有很长，2.0、3.0时代更需要继续往批量化、自动化、现代化的“生产线“贴近。随着我们团队前端工程化的不断发展和演进，相信下一次的“工业革命”很快就会到来。

# 后话

后续会分享更多我们团队关于工程实践上的经验和心得, 如果你专注于工程实践, 致力于思考和解决各种复杂的工程问题, 不妨关注我们, 共同学习.