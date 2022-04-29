最近在安装 [husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged#readme) + [prettier](https://prettier.io/docs/en) 做提交前的代码规范检测的时候，发现 `prettier` 的 `pre-commit` hook 的[使用方式文档](https://prettier.io/docs/en/precommit.html)里，提供的安装方式变成了：

> Make sure Prettier is installed and is in your `devDependencies` before you proceed.\
> `npx mrm lint-staged`

之前就有用过 npx 安装过一些依赖，但是一直没时间看看 npx 和 npm 到底有什么区别。

npm（node package manager）是我们用于 node.js 包管理的工具，在现在前端开发的环境下，我们会经常使用到这个命令来管理和发布自己的包。

在正常情况下，我们安装 npm 包，都会生成一个 `node_modules` 目录，如果是本地安装，这个目录会生成在执行 `npm install` 命令的目录下面。如果是全局安装，根据系统和 node 的安装方式的不同，生成到不同的目录中。比如在 macOS 系统下面，通过 nvm 方式安装的 node.js，`node_modules` 会生成到 `~/.nvm/versions/node/v10.15.3/lib` 下面。相应的，包的内容就会被下载到 `node_modules` 的对应目录中。

但是有些时候，我们只是临时想要使用一些 cli 工具，比如 `create-react-app`，我们可能只是需要生成一个 React 项目。但是 `npm` 不能够在不将包安装到本地的情况下，使用相关的依赖，所以 npx 出现了。

本文将会介绍一些 npm 和 npx 不同的地方，以及如何来使用 npx，详细的参数文档，可以查看 npx 的[官方文档](https://github.com/npm/npx#readme)。

## npm 进行包管理

npm 本身具有很多功能，其中最重要，也是我们使用最多的，还是作为一个在线的包管理工具来使用。

npm 本身不能够执行任何包，对于本地项目的包，如果想要执行，则需要写入到 `package.json` 里面，然后通过 npm 来解析 `package.json` 文件，解析到包的 bin 文件路径，在 bash 中执行。

![.bin](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00b5dee136394e0db553cbb1276b0030~tplv-k3u1fbpfcp-watermark.image)

本地安装的包，一般的执行方式都是通过 `package.json` 来指定执行脚本，比如：

```
{
	"name": "my-project",
	"version": "1.0.0",
	"scripts": {
		"some-package": "some-package"
	}
}
```
然后通过 `npm run some-package` 的方式执行。
而全局安装的包，则是会创建一个软连接到 `bin` 目录下面，通过 bash 的方式来执行。最终也是链接到对应包的 bin 文件，和本地安装的方式类似。

![global](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1df38a4fd4fd46499069bf16ac94eefb~tplv-k3u1fbpfcp-watermark.image)

## npx

在 npm 5.2.0 版本之后，npm 内置了 npx 的包，所以现在大部分的开发者都可以直接使用到 npx 的功能。

npx 仍然是一个简单的 cli 工具，来让我们更加方便的执行一些 npm 包，而不用通过 npm 来将包安装到开发者的电脑上面。

### 执行本地已经安装的包

npx 的一个最基本的功能，是可以帮助我们更方便地执行本地包。npx 会检测要执行的命令或者包，是否在环境变量，或者本地项目的 bin 目录里面，如果存在的话就直接执行。

这样做的优势是可以抹平全局安装的包和本地安装的包的差异。

比如经常遇到的一种情况是，项目使用了一个新的可执行依赖，拿我们常用的 `eslint` 来举例，几个开发者共同开发一个项目，通过 `eslint` 来做代码规范管理，我们可能会添加常用的脚本到 `package.json` 里面：

```
{
	"name": "my-project",
	"scripts": {
	  "lint": "eslint --ext .ts,.tsx ./"
	},
	"devDependencies": {
	  "eslint": "^7.6.0"
	}
}
```

这样，我们只需要在项目目录中执行 `npm install` 就可以安装所有依赖，然后通过 `npm run lint` 来执行代码 lint。但是，如果开发者想要执行其他 eslint 命令，就必须要通过 `npm install -g eslint`，先全局安装 eslint，再通过命令行来执行，或者直接指定本地目录中，bin 文件所在的位置来执行 eslint。

比如，可以直接在项目目录下面执行 `eslint --fix --ext .js.jsx ./` 也是允许的。

npx 会查找本地项目的 bin 文件目录以及全局中的 bin 文件目录，存在就可以直接执行，为包的执行提供了一些便利。

### 不进行包的安装，直接执行

npx 的另外一个主要功能是提供一个不需要安装 npm 包，就可以直接执行的功能。

有些时候，你可能想要使用某个 CLI 工具，但是并不想进行安装。这样可以节省一些磁盘空间，并且减少全局环境变量的污染。毕竟每添加一个新的包，都会在环境变量中创建一个软连接指向对应的包，方便命令行进行执行。

### 直接执行 github 上面的代码

先看看效果：

![gist](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b129505a07204303b5ad229a4cbea991~tplv-k3u1fbpfcp-watermark.image)

我创建了一份 https://gist.github.com 上面的代码片，这段代码片可以直接执行，只需要让它看起来像是一个可执行的包就好（需要 `package.json` 中指定 bin 的入口文件，并且需要加上 `#!/usr/bin/env node` 的 bash 环境声明）。
大家可以在自己本地尝试一下执行[直接执行 github 代码 · GitHub](https://gist.github.com/LucaslEliane/9aae6c698ec266a216d872d0dec25822)看看。

这种方式存在一定的风险，毕竟不是发布到 npm 的包，有些代码可能会不完善，或者有入侵型代码在里面。

### 测试包的不同版本

npx 还提供了更加方便地执行不同版本的 node.js 包或者依赖的功能，比如你常用的某个包更新了，但是更新的版本可能还是 `beta` 或者 `alpha`，这样的版本可能会存在问题。你只是想试试这些新的功能能够带来什么样的变化和体验更新。

在使用 npm 的情况下，你需要直接安装这个包的最新版本，比如：

`npm install -g create-react-app@7.11.0`

如果使用的时候出现了问题，你还得把这个包降级到原来的版本，真是一件非常麻烦的事情。
通过 npx，我们可以直接试用这些 CLI 工具的最新版本而不用下载下来，污染本地环境。
我们可以先通过 `npm v create-react-app` 来查看项目的 release tags：

![create-react-app-version](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88557a970cba4cd199f8e39a94f63802~tplv-k3u1fbpfcp-watermark.image)

虽然没有新的 next 版本有点尴尬，但是我本地的版本足够旧：

![local-version](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a54c27b5ff35419482259fbadef8f577~tplv-k3u1fbpfcp-watermark.image)

可以直接试用 latest 版本：

```
npx create-react-app@latest my-project
```

![create-react-app result](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/619709002e734e928c7dbe183a1fd1bc~tplv-k3u1fbpfcp-watermark.image)

这样就得到了一个最新版本 `create-react-app` 工具生成的 React 项目了。然而我们本地的 `creact-react-app` 还保持在原来的版本。

## 回到开头

那么现在我们看看文章开头中，`prettier` 文档中安装方式的命令：

```
npx mrm lint-staged
```

这个命令的功能就很清晰了。其实它只是通过 npx，来让我们能够不在本地安装 [mrm](https://github.com/sapegin/mrm) 的情况下，直接执行 `mrm` 命令，并且通过 `mrmr` 来将 `lint-staged` 的配置添加到本地的项目工程配置当中，比如：`package.json` 文件。

刚才的命令就在我本地的工程当中，写入了类似这样的配置（当然这个配置我也稍微修改了一下 lol）。

![package.json](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf17f3e5bce04fc79961da58282f54cb~tplv-k3u1fbpfcp-watermark.image)

## npx vs npm

npx 为 npm 文件执行功能进行了一些扩展，提供了一种使用 node.js CLI 工具的新方式，这种方式比起以前的执行方式更加灵活，并且对于本地环境变量的污染更小（你可以到自己的 node 安装目录下看一下，有多少个 bin 目录下的软连接在污染你的环境变量）。指定包版本的功能可以让我们更灵活地测试一些新的功能，而不用进行升级和降级，还是能够带来很多方便的。

