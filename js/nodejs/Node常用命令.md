# Node常用命令

## 查看所有全局安装包

```shell
npm list -g --depth 0
```

https://medium.com/@alberto.schiabel/npm-tricks-part-1-get-list-of-globally-installed-packages-39a240347ef0

输出

```shell
+-- @ant-design/codemod-v4@1.1.0
+-- annot-ui@1.9.14 -> D:\work_repos\ad-magic-frontend\annot-ui
+-- cnpm@6.1.1
+-- create-react-app@3.4.1
+-- cvat@1.0.0 -> D:\work_repos\cvat
+-- cvat-core@3.8.1 -> D:\work_repos\cvat\cvat-core
+-- cvat-ui@1.9.14 -> D:\work_repos\cvat\cvat-ui
+-- gatsby-cli@2.19.1
+-- generator-apulis-frontend-cli@0.2.2
+-- gulp-cli@2.3.0
+-- i18next-json-csv-converter@0.2.0
+-- lerna@4.0.0
+-- npx@10.2.2
+-- svgo@1.3.2
+-- tp-good-cli@0.0.7
+-- ts-node@9.0.0
+-- typescript@4.1.3
+-- yarn@1.22.10
`-- yo@4.2.0
```

## npm ci

[What is the difference between "npm install" and "npm ci"?](https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci)

**`npm ci`** (also known as **C**lean **I**nstall) is meant to be used in automated environments — such as test platforms, continuous integration, and deployment — or, any situation where you want to make sure you're doing a clean install of your dependencies.

It installs dependencies directly from `package-lock.json` and uses `package.json` only to validate that there are no mismatched versions. **If any dependencies are missing or have incompatible versions, it will throw an error**.

Use `npm install` to add new dependencies, and to update dependencies on a project. Usually, you would use it during development after pulling changes that update the list of dependencies but it may be a good idea to use `npm ci` in this case.

Use `npm ci` if you need a deterministic, repeatable build. For example during continuous integration, automated jobs, etc. and when installing dependencies for the first time, instead of `npm install`.

[Difference between npm i and npm ci in Node.js](https://www.geeksforgeeks.org/difference-between-npm-i-and-npm-ci-in-node-js/)

**npm i:** The npm i (or npm install) is used to install all dependencies or devDependencies from a *package.json* file.

**npm ci:** CI stands for clean install and npm ci is used to install all exact version dependencies or devDependencies from a package-lock.json file.

## npx 

`npx` 是 Node.js 包管理器 npm 的一部分，它允许你直接运行安装在项目本地 `node_modules/.bin` 目录下的可执行文件。它的作用是执行当前项目中安装的包的可执行文件，而不需要全局安装这些包。

通常情况下，当你需要执行一个在项目中安装的包的命令时，可以使用 `npx` 命令。这样做的好处是你无需担心命令所在的路径，也无需将这个包全局安装在你的系统中，而是可以直接在项目中使用。

例如，假设你在项目中安装了 ESLint，但你不想全局安装它，你可以使用 `npx eslint --init` 来执行 ESLint 的初始化命令，而不必担心是否能够在命令行中找到 ESLint。



`npx` 是从 Node.js 版本 5.2.0 开始引入的，并从 Node.js 版本 8.2.0 开始作为 npm 的一部分进行了更广泛的发布。因此，如果你使用 Node.js 版本 8.2.0 或更高版本，就可以使用 `npx` 命令了。



**devv.ai**

npx 是 Node.js 中的一个命令行工具，用于执行 Node 包。它的作用是临时安装和运行 Node 包，而无需显式地将其安装到全局或本地环境中。这意味着您可以快速运行 Node 包，而无需担心全局安装或版本冲突的问题。npx 还可以执行未事先安装的包，从 GitHub gist 或 repository 运行代码，以及测试不同版本的 Node.js 包。

### npx 是如何临时安装和运行 Node 包的？

npx 通过以下步骤实现临时安装和运行 Node 包：

1. 首先，npx 查找要使用的包及其可选指定版本的 npx 命令。
2. 然后，它将包及其依赖项下载到临时文件夹中，类似于使用 npm install 安装包和依赖项的过程。
3. 包的脚本文件（例如 cli.js）位于临时文件夹中，并在其中执行。
4. 在此过程中，包使用其依赖项在临时文件夹中运行，并与系统的其余部分隔离。
5. 一旦包的操作完成，npx 将删除临时文件夹及其所有内容。因此，包及其依赖项不会留在系统中浪费磁盘空间。

这样，npx 实现了临时安装和运行 Node 包，而无需将其永久安装在系统中。