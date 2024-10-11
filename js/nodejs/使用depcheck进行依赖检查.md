`depcheck` 是一个[命令行工具](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7&spm=1001.2101.3001.7020)，用于检查 Node.js 项目的 \`package.json\` 文件中的依赖项，确保所有在代码中使用的包都被列在 \`dependencies\`、\`devDependencies\` 或 \`peerDependencies\` 中。它还可以列出那些已经声明但未使用的依赖项。

以下是如何使用 \`depcheck\` 进行依赖检查的基本步骤：

1\. \*\*安装 depcheck\*\*：  
   首先，你需要全局安装 \`depcheck\`。使用 npm 或 yarn 进行安装：

   使用 npm:  
```sh  
   npm install -g depcheck  
```

   使用 yarn:  
```sh  
   yarn global add depcheck  
```

2\. \*\*运行 depcheck\*\*：  
   在全局安装了 \`depcheck\` 之后，你可以在项目的根目录下运行它：

```sh  
   depcheck  
```

   这将列出所有缺失的依赖项和未使用的依赖项。

3. **使用 depcheck 的选项**：  
   `depcheck` 提供了一些命令行选项，你可以用它们来定制输出结果：

   - `--without-dev`：忽略 `devDependencies` 中的依赖项。  
   - `--without-peer`：忽略 `peerDependencies` 中的依赖项。  
   - `--json`：以 JSON 格式输出结果。

   例如，要忽略开发依赖项并以 JSON 格式输出结果，可以使用：  
```sh  
   depcheck --without-dev --json  
```

4\. \*\*解读输出结果\*\*：  
   \`depcheck\` 会输出两组信息：  
   - \`missing\`：这部分列出了所有在 \`node\_modules\` 中找到但在 \`[package.json](https://so.csdn.net/so/search?q=package.json&spm=1001.2101.3001.7020)\` 中未列出的依赖项。  
   - \`unused\`：这部分列出了所有在 \`package.json\` 中列出但未在代码中使用的依赖项。

5\. \*\*根据输出结果更新 package.json\*\*：  
   根据 \`depcheck\` 的输出，你可以手动更新 \`package.json\` 文件，添加缺失的依赖项或移除未使用的依赖项。

6\. \*\*集成到构建流程\*\*：  
   如果你希望将 \`depcheck\` 集成到你的自动化构建流程中，你可以在 npm scripts 或其他构建系统中调用它。

请注意，\`depcheck\` 可能不总是完全准确，特别是对于大型项目或使用了复杂构建工具的项目。它主要作为一个辅助工具来帮助识别潜在的依赖问题。在使用它之前，确保理解你的项目结构和构建过程。

### 具体应用：

1、比如有个工程，本地开发运行都没问题。但是把工程发布出去就有问题了。本地工程如下图：

![](https://i-blog.csdnimg.cn/blog_migrate/9dfc12766ef64b08ae3ae9529c4b3466.png) 

![](https://i-blog.csdnimg.cn/blog_migrate/df029c605d7b254ea75bf7f4657d1f5b.png)

2、模拟问题：比如新建一个copy文件夹，把依赖除外的文件复制过来，就好比如在远程仓库克隆的效果。如下图：

![](https://i-blog.csdnimg.cn/blog_migrate/399c009f0c4accc2dec67e44f877c760.png) 

3、还原依赖：

![](https://i-blog.csdnimg.cn/blog_migrate/196435b4289a6685ed7a3ae2f11c4b43.png)

4、npm run serve 运行copy工程就报错了：

![](https://i-blog.csdnimg.cn/blog_migrate/353cf8ee10ef629ffe5aefe7115782f0.png)

报错说缺失依赖。典型的本地没问题，上传就出问题。

5、通过工具depcheck工具可以检查出缺失哪些依赖：

先进行全局安装：

```javascript
npm i -g depcheck
```

然后在项目工程根目录下直接输入depcheck回车即可检查依赖缺失情况：

![](https://i-blog.csdnimg.cn/blog_migrate/e93e982b4624e8ba950f083e43779a6c.png)

![](https://i-blog.csdnimg.cn/blog_migrate/7ff3f33f1d5aed7cb0c672bb4e87941c.png)

目前缺失的依赖是missing dependencies：highlight.js和mock.js，而且还能看到这些依赖在哪些文件里面用到。

6、 所以现在要做的就是安装缺失的依赖：

```javascript
npm i highlight.js mock.js
```

 ![](https://i-blog.csdnimg.cn/blog_migrate/fccd321fb68a6f0c3b2bbddaec5da60a.png)

 7、安装好依赖后，运行depcheck：

![](https://i-blog.csdnimg.cn/blog_migrate/eea7c0201d34b40ce9a4ceddd3606c47.png)

目前就没有缺失的依赖了。此时工程就可以正常运行了。 

![](https://i-blog.csdnimg.cn/blog_migrate/50f538d64c5b06ee6900f056ba0c1d9b.png) 

#### 扩展：

 8、运行depcheck后，可以看到没有用到的依赖：

Unused dependencies

\* core-js

\* querystring

但是这个检查并没有那么准确，具体还要看自己实际项目依赖的使用情况来决定。

如果是完美主义者，不想看到没必要的提示，或者这个检查是在软件生产管线里面自动化运行的，不希望出现这些报错，以上情况可以在根目录下新建一个忽略文件 .depcheckrc，在使用depcheck命令时就会走这个文件，在里面忽略掉一些检查。

ignores: \[ "core-js", "less", "less-loader" \]

![](https://i-blog.csdnimg.cn/blog_migrate/e3dbbe084f12f1bfbbcba5c243ef220c.png) 

9、忽略完后再运行depcheck命令，就会发现被忽略的就不再提示了。

如果querystring真的没用到的话，就删除掉：

npm remove querystring 

![](https://i-blog.csdnimg.cn/blog_migrate/124197a622ea5a02d697bc00e66aaca6.png) 

10、移除完，在运行depcheck，就没任何问题提示了。

![](https://i-blog.csdnimg.cn/blog_migrate/852c42750554f43707873c4d005af2d1.png) 

以上就是depcheck的具体使用情况。

depcheck还有别的一些作用，比如说在我们搭建CI/CD的流水线上，一些关键的节点，我们可以加上这个命令进行检查，必须要求这个命令要完全能通过，不然的话就可以打回来，避免上线的时候出错现一些问题。