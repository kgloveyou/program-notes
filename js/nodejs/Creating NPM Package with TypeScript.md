# 第2章 项目配置

要连接到远程仓库，请通过本地终端进入你的包的根目录，然后运行 git remote add 命令。语法如下：

```sh
git remote add origin https://github.com/your-username/remote-repo-name.git
```

```sh
git push -u origin main
```

上述命令会指示 Git 将你本地 main 分支的 .git 目录推送到 GitHub 上的远程 origin 分支。

# 第3章 测试包的代码

# 提交信息配置

## 设置 Husky  

Husky 是一个能让你更轻松、高效地使用 Git 钩子的工具。

# 设置 GitHub Actions

# 将 TypeScript 编译为 JavaScript

# 将 TypeScript 编译为 ECMAScript 模块与 CommonJS 模块

# 定义包的入口文件

# 本地测试未发布的包

## 将包从系统全局文件夹安装到测试应用

```sh
npm link package-name
```

## 安装 Parcel 打包工具

```shell
npm i -D parcel@2.14.4
```

由于 npm 会在你安装或卸载包时自动断开符号链接，请重新将你的包从系统全局文件夹安装到测试应用中。

```shell
npm link thank-you-tweet-button-001  
```

安装完 Parcel 和你的包后，请在终端运行以下命令，使用 Parcel 构建并启动演示应用：

```bash
npx parcel ./index.html
```

上述命令会指示 Parcel 从项目的入口文件（`index.html`）开始构建演示应用。

构建完成后，Parcel 会自动启动内置的开发服务器。此时，在浏览器中打开 http://localhost:1234/ 即可实时预览运行中的应用！

## 从测试应用中取消链接你的包

然后从测试应用的 node_modules 目录中卸载该包：

```bash
npm unlink package-name
```

## 从全局文件夹中取消链接你的包

在终端运行以下命令，从全局环境中卸载该包：

```bash
npm rm --global package-name
```

# 创建 LICENSE  

可以从下面网站中复制 license。

https://choosealicense.com/licenses/mit/

# 将包发布到 NPM

## 2、指定要发布到 NPM 的文件

在 `package.json` 文件中添加 `"files"` 字段，用于指定需要发布到 NPM 的文件列表。

```json
{
  "name": "thank-you-tweet-button-001",
  "version": "1.0.0",
  "main": "dist/cjs/tweetButton.js",
  "module": "dist/esm/tweetButton.js",
  "types": "dist/esm/tweetButton.d.ts",
  "files": ["dist/"],
  "license": "MIT"
}
```

## 3、确认 NPM 将发布的文件

在指定要发布的文件后，建议通过模拟发布来确认最终打包内容。

运行以下命令查看 NPM 将要发布的文件：

```bash
npm publish --dry-run
```

该命令会让 NPM 执行一次"试发布"（dry run），不会实际上传到仓库，而是生成一份详细的打包报告，显示哪些文件会被包含在最终的发布包中。

执行后你会看到类似这样的输出：

```bash
$ npm publish --dry-run
npm notice 
npm notice 📦  your-package-name@1.0.0
npm notice === Tarball Contents === 
npm notice 1.2kB  package.json        
npm notice 3.4kB  README.md           
npm notice 56B    index.js            
npm notice 1024B  lib/utils.js        
npm notice === Tarball Details === 
npm notice name:          your-package-name         
npm notice version:       1.0.0                   
npm notice filename:      your-package-name-1.0.0.tgz  
npm notice package size:  2.8 kB                  
npm notice unpacked size: 5.7 kB                  
npm notice shasum:        abc123...               
npm notice integrity:     sha512-xyz...             
npm notice total files:   4                       
npm notice 
```

# 生产环境测试已发布的包

# 更新包的版本

以下是更新包版本号的语法：

```bash
npm version 更新类型
```

（其中 `更新类型` 可以是 `patch`、`minor` 或 `major`，分别对应语义化版本控制的补丁、次版本和主版本更新。）

## 示例 3：升级到主版本（Major Version）

```bash
git add -A && git commit -m "feat: make users provide a rating" -m "BREAKING CHANGE: This commit breaks compatibility with the previous version"
```

- 每个 `-m` 参数告诉 Git 开始一个新的段落。
- 第一个 `-m` 用于编写提交信息的标题（header）。
- 第二个 `-m` 用于编写提交信息的正文（body）。
- 在正文中以 **`BREAKING CHANGE`** 开头是一种表明本次提交包含破坏性变更（Breaking Change）的方式。本指南后续还会介绍另一种替代方法。

# 自动化版本管理

## Release-it 如何确定您包的最新版本

## 如何向 Release-it 提供推荐版本

# 自动化 Changelog  管理

```bash
git add -A && git commit -m 'feat(tweetbutton)!: make users to specify the best npm package they have created'
```

- 感叹号(!)表示破坏性变更。
- 在提交信息中使用感叹号时，必须用单引号('')将其括起来。否则，bash会报"unrecognized history modifier  "错误。

# 自动化 GitHub Releases  