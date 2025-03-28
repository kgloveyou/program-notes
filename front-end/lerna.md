# lerna

Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。

https://www.lernajs.cn/

Lerna 是一种工具，针对 使用 git 和 npm 管理多软件包代码仓库的工作流程进行优化



## 命令

### lerna version

https://github.com/lerna/lerna/tree/main/libs/commands/version#readme

> Bump version of packages changed since the last release

[深入 lerna 发包机制 —— lerna version](https://juejin.cn/post/6935765350067732516)

https://juejin.cn/post/6894434733355188232

```sh
lerna version --conventional-commits
```

--conventional-commits的参数，可以支持直接根据我们的git提交记录（前提是满足【约定式提交】规范），来自动更新版本号：

- 存在**feat**提交： 需要更新minor版本
- 存在**fix**提交： 需要更新patch版本
- 存在**BREAKING CHANGE**提交： 需要更新大版本

版本更新成功之后，lerna会使用chore(release): publish提交commit并推送到git，来作为版本发布的提交记录，并且各个package会自动生成当前版本的tag，留作版本回退备用。

> 如果不想自动生成版本号，可以不带--conventional-commits参数，然后手动指定各个package的版本，**但是不建议。**



https://juejin.cn/post/6844903918279852046

`lerna version` 会检测从上一个版本发布以来的变动，但有一些文件的提交，我们不希望触发版本的变动，譬如 .md 文件的修改，并没有实际引起 package 逻辑的变化，不应该触发版本的变更。可以通过 `ignoreChanges` 配置排除。如下。

lerna.json

```json
{
  "packages": [
    "packages/*"
  ],
  "command": {
    "bootstrap": {
      "hoist": true
    },
    "version": {
      "conventionalCommits": true
    }
  },
  "ignoreChanges": [
    "**/*.md"
  ],
  "version": "0.0.1-alpha.1"
}

```



### lerna publish

[深入 lerna 发包机制 —— lerna publish](https://juejin.cn/post/6946504838834290695)

lerna publish 的做的工作其实很简单，就是将 monorepo 需要发布的包，发布到 npm registry 上面去。

> lerna publish 永远不会发布 package.json 中 private 设置为 true 的包

lerna提供了publish和version来支持版本的升级和发布, publish的功能可以即包含version的工作，也可以单纯的只做发布操作。（[来源](https://juejin.cn/post/6844903918279852046)）

实际 `lerna version`很少直接使用，因为它包含在 `lerna publish` 中了，直接使用 `lerna publish`就好了。（[来源](https://juejin.cn/post/6844903918279852046)）



https://github.com/lerna/lerna/tree/main/libs/commands/publish#readme

#### **用法**

```bash
lerna publish              # publish packages that have changed since the last release
lerna publish from-git     # explicitly publish packages tagged in the current commit
lerna publish from-package # explicitly publish packages where the latest version is not present in the registry
```

#### Positionals

**bump from-git**
 除了 Lerna 版本管理中支持的语义化版本（semver）关键字外，**Lerna 发布**（`lerna publish`）还支持 `from-git` 关键字。该关键字会识别由 `lerna version` 标记的包，并将它们发布到 npm。这在持续集成（CI）场景中非常有用，尤其是当你希望手动增加版本号，但希望通过自动化过程一致地发布包内容时。

**bump from-package**
 与 `from-git` 关键字类似，但发布包列表是通过检查每个 `package.json` 文件并判断是否有任何包的版本尚未存在于注册表中来确定的。任何尚未存在于注册表中的版本都将被发布。这在之前 `lerna publish` 未能将所有包发布到注册表的情况下非常有用。



### lerna link

### lerna changed

```bash
lerna changed
```

列出改动过的包，发布时只更新改动过的包。

```bash
$ lerna changed
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
lerna info Looking for changed packages since @apulis/table@1.24.0
lerna info ignoring diff in paths matching [
lerna info ignoring diff in paths matching   '**/*.md',
lerna info ignoring diff in paths matching   '**/*.test.ts',      
lerna info ignoring diff in paths matching   '**/*.e2e.ts',       
lerna info ignoring diff in paths matching   '**/demos/**',
lerna info ignoring diff in paths matching   '**/fixtures/**',
lerna info ignoring diff in paths matching   '**/dist/**',
lerna info ignoring diff in paths matching   '**/lib/**',
lerna info ignoring diff in paths matching   '**/es/**',
lerna info ignoring diff in paths matching   '**/test/**'
lerna info ignoring diff in paths matching ]
@apulis/aistudio-layout
@apulis/authz
@apulis/first-login
@apulis/group-selector
@apulis/header
@apulis/image
@apulis/ip-input
@apulis/notice-icon-view
@apulis/pro-table
@apulis/provider
@apulis/request
@apulis/select-lang
@apulis/select
@apulis/table
lerna success found 14 packages ready to publish
```



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

5、使用lerna的介绍与用法

https://juejin.cn/post/7016332558975647781

6、lerna+yarn workspace+monorepo项目的最佳实践（※）

https://juejin.cn/post/6844903918279852046

7、基于 Lerna 管理 packages 的 Monorepo 项目最佳实践

https://mp.weixin.qq.com/s/NlOn7er0ixY1HO40dq5Gag

说明：6中大部分内容参照的这里。

8、[lerna + dumi + eslint多包管理实践](https://zhuanlan.zhihu.com/p/417555553)

我们需要注意的是 lerna 版本更新支持两种模式:

- 固定/锁定模式(默认, 指定版本号)

这种模式自动将所有 packages 包版本捆绑在一起，对任何其中一个或者多个 packages 进行重大改动都会导致所有 packages 的版本号进行更新。

- [独立模式](https://zhida.zhihu.com/search?content_id=180920077&content_type=Article&match_order=1&q=独立模式&zhida_source=entity)(independent)

独立模式，init的时候需要设置选项--independent。这种模式允许使用者对每个package单独改变版本号。每次执行lerna publish的时候，针对所有有更新的package，会逐个询问需要升级的版本号，基准版本为它自身的package.json里面的版本号。这种情况下，lerna.json的版本号不会变化， 默认为independent。 我们可以在 lerna 初始化时指定:

```shell
lerna init --independent
```

9、https://github.com/MrXujiang/best-cps

应该是基于该开源项目开发的。

- lerna boostrap 自动解决packages之间的依赖关系，对于packages内部的依赖会直接采用symlink的方式关联
- lerna publish 依赖git检测文件改动，自动发布，管理版本号
- lerna create 创建一个 lerna 管理的package包
- lerna clean 删除所有包下面的node_modules目录（不包含主仓库下的node_modules），也可以删除指定包下面的node_modules

同时 **lerna** 还会根据 git 提交记录，自动生成 changelog. 当然 **lerna** 还提供了很多有用的命令, 大家感兴趣可以在官网学习.

10、鲸品堂｜Lerna最佳实践

https://www.iwhalecloud.com/news1/shownews.php?id=293

11、Lerna通关秘籍

https://blog.csdn.net/weixin_36813246/article/details/126928388

12、现代前端工程化-基于 Monorepo 的 lerna 详解(从原理到实战)（※）

https://blog.csdn.net/xgangzai/article/details/115423425

- package.json

`package.json` 中有一点需要注意，他的 `private` 必须设置为 `true` ，因为 `mono-repo` 本身的这个 `Git`仓库并不是一个项目，他是多个项目，所以一般不进行直接发布，发布的应该是 `packages/` 下面的各个子项目。

- lerna bootstrap

`lerna` 提供了可以**将子项目的依赖包提升到最顶层**的方式 ，我们可以执行 `lerna clean`先删除每个子项目的 `node_modules` , 然后执行命令  `lerna bootstrop --hoist`。

`lerna bootstrop --hoist` 会将 `packages` 目录下的公共模块包抽离到最顶层，但是这种方式会有一个问题，**不同版本号只会保留使用最多的版本**，这种配置不太好，当项目中有些功能需要依赖老版本时，就会出现问题。

- yarn workspaces

有没有更优雅的方式？再介绍一个命令 `yarn workspaces` ，可以解决前面说的当不同的项目依赖不同的版本号问题， `yarn workspaces`会检查每个子项目里面依赖及其版本，如果版本不一致都会保留到自己的 `node_modules` 中，只有依赖版本号一致的时候才会提升到顶层。注意：这种需要在 `lerna.json` 中增加配置。

```json
  "npmClient": "yarn",  // 指定 npmClent 为 yarn
  "useWorkspaces": true // 将 useWorkspaces 设置为 true
```

增加了这个配置后 不再需要 `lerna bootstrap` 来安装依赖了，可以直接使用 `yarn install` 进行依赖的安装。注意：`yarn install` 无论在顶层运行还是在任意一个子项目运行效果都是可以。

lerna publish

> 注意⚠️：这里再次声明一下，如果使用了 `independent` 方式进行版本控制，在 `packages` 内部的包进行互相依赖时，每次发布之后记得修改下发布后的版本号，否则在本地调试时会出现刚发布的代码不生效问题(这个问题本人亲自遇到过，单独说下)

13、[团队工程实践 - 打造monorepo工作流](https://juejin.cn/post/6894434733355188232)（※）

管理依赖

- 查看内部依赖

  ```bash
  yarn workspaces info
  ```

  

- 

14、[Lerna 多包管理工具](https://juejin.cn/post/6871164831534317576)

`Monorepo` 的全称是 `monolithic repository`，即单体式仓库。

15、[Why Lerna and Yarn Workspaces is a Perfect Match for Building Mono-Repos – A Close Look at Features and Performance](https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/)（※）

**Correlation between *npm*, *yarn*, *yarn workspaces*, and *lerna***

One big feature that is exclusive to *yarn* is *yarn workspaces* (4) that was added to *yarn* about a year ago. It expands *yarn* by native *Mono-Repo* capabilities. The next section goes more into *Mono-Repo* features.

**Mono-Repo – What is native? What is user land?**

标记为红色的是提供 Mono-Repo 功能的技术。它们都基于 **npm** 或 **yarn**。后者（npm 和 yarn）除了分别提供 `npm link` 或 `yarn link` 外，并未提供用于构建 Mono-Repo 的高级功能。

**yarn workspaces** 是唯一原生支持 Mono-Repo 功能的技术代表。**lerna** 已经存在了相当长的时间，甚至在 yarn workspaces 出现之前就已经问世。lerna 在用户层面提供了 Mono-Repo 功能，同时依赖 npm 或 yarn 作为依赖管理工具。

为此，lerna 利用了符号链接（semantic links）。它还允许使用 yarn workspaces，并将 Mono-Repo 的整个管理部分完全交给 yarn workspaces 的原生功能。此外，lerna 提供了复杂的发布和版本管理功能，甚至支持独立发布项目。简而言之，lerna 提供了许多超越 Mono-Repo 管理的功能。另一方面，yarn workspaces 的唯一目的是简化 Mono-Repo 工作流程。因此，你不必在两者之间做出选择。结合使用 lerna 和 yarn workspaces 是完全有意义的。



## 问题：

1、`lerna publish`发布报错：

```shell
lerna ERR! E404 Scope not found
```

原因：

https://github.com/any86/Notes/issues/66

如果库已经存在, 但是想改为组织, 那么必须先去npm网站手动创建组织

## lerna version --conventional-commits

`lerna version --conventional-commits` 是 Lerna 中一个非常有用的命令，它可以根据 Git 提交记录（遵循常规提交规范，Conventional Commits）自动生成版本号，并更新包版本和相关的依赖关系。以下是该命令的详细说明和使用方法：

---

### **命令作用**
`lerna version --conventional-commits` 的主要功能包括：
1. **自动版本管理**：根据 Git 提交记录中的类型（如 `feat`、`fix`、`BREAKING CHANGE` 等），确定每个包需要升级的版本号（遵循语义化版本规范 **SemVer**）。
2. **更新依赖关系**：如果包之间存在依赖关系，Lerna 会自动更新相关包的依赖版本。
3. **生成 CHANGELOG**：为每个包生成基于提交记录的 CHANGELOG 文件。
4. **提交变更**：自动提交版本变更到 Git 仓库，并打上对应的 Tag。

---

### **Conventional Commits 规范**
为了正确使用 `--conventional-commits`，你的提交记录需要遵循 **Conventional Commits** 规范，格式如下：

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

#### **常用提交类型（`type`）**
- `feat`：新增功能（触发 **minor** 版本升级）。
- `fix`：修复问题（触发 **patch** 版本升级）。
- `BREAKING CHANGE`：破坏性变更（触发 **major** 版本升级）。
- 其他类型（如 `docs`、`style`、`refactor` 等）不会触发版本升级。

#### **示例**
```bash
feat: add new button component
fix: resolve layout issue in mobile view
BREAKING CHANGE: remove deprecated API
```

---

### **使用步骤**
以下是如何使用 `lerna version --conventional-commits` 的详细步骤：

#### **1. 安装 Lerna**
如果你还没有安装 Lerna，可以通过以下命令安装：
```bash
npm install -g lerna
```

#### **2. 初始化 Lerna 项目**
如果你的项目还没有初始化 Lerna，可以运行：
```bash
lerna init
```

#### **3. 添加常规提交支持**
运行以下命令，启用常规提交模式：
```bash
lerna version --conventional-commits
```

#### **4. 提交符合规范的 Git 记录**
确保你的 Git 提交记录遵循 Conventional Commits 规范。例如：
```bash
git commit -m "feat: add login feature"
```

#### **5. 运行命令**
执行 `lerna version --conventional-commits`，Lerna 会根据提交记录自动确定版本号并更新相关文件。

---

### **常用参数**
除了 `--conventional-commits`，你还可以结合以下参数来定制行为：
- `--no-changelog`：不生成 CHANGELOG 文件。
- `--yes`：跳过所有确认提示，直接执行。
- `--force-publish`：强制发布所有包，即使没有变更。
- `--conventional-graduate`：将所有包的版本从未发布状态 (`0.x.x`) 升级到稳定状态 (`1.0.0`)。
- `--preid`：为预发布版本添加标识，例如 `alpha`、`beta`。

#### **示例**
```bash
lerna version --conventional-commits --yes
```

---

### **示例流程**
1. 在 `packages/package-a` 中新增一个功能，并提交：
   ```bash
   git commit -m "feat: add user profile component"
   ```
2. 在 `packages/package-b` 中修复一个问题，并提交：
   ```bash
   git commit -m "fix: correct alignment issue"
   ```
3. 运行 `lerna version --conventional-commits`：
   ```bash
   lerna version --conventional-commits
   ```
4. 结果：
   - `package-a` 的版本从 `1.0.0` 升级到 `1.1.0`（`feat` 触发 minor 版本升级）。
   - `package-b` 的版本从 `1.0.0` 升级到 `1.0.1`（`fix` 触发 patch 版本升级）。

---

### **注意事项**
1. **确保 Git 提交记录符合规范**：否则 Lerna 无法正确识别版本变更类型。
2. **依赖关系更新**：如果包之间存在依赖关系，Lerna 会自动更新相关包的依赖版本。
3. **CHANGELOG 生成**：默认会为每个包生成 CHANGELOG 文件，如果不需要可以使用 `--no-changelog` 参数。
4. **预发布版本**：如果需要发布预发布版本（如 `1.0.0-beta.1`），可以结合 `--conventional-prerelease` 使用。

---

### **总结**
`lerna version --conventional-commits` 是一个强大的工具，可以帮助你自动化版本管理，减少手动操作的错误。如果你的项目遵循 Conventional Commits 规范，这个命令会成为你版本管理的最佳助手。如果有更多问题或需要帮助，请随时告诉我！

## lerna version --exact --message '🎨 chore(release): Publish'  --conventional-commits

`lerna version --exact --message '🎨 chore(release): Publish' --conventional-commits` 是一个更复杂的 Lerna 命令，它在自动版本管理的基础上添加了额外的行为。以下是该命令的详细说明：

---

### **命令解析**

1. **`--conventional-commits`**
   根据常规提交规范（Conventional Commits）自动确定版本号，并生成 CHANGELOG 文件。

2. **`--exact`**
   在更新依赖时，使用精确版本号（`^` 或 `~` 等范围符号将被移除）。例如：
   ```json
   "dependencies": {
     "package-a": "1.0.0" // 而不是 "package-a": "^1.0.0"
   }
   ```

3. **`--message '🎨 chore(release): Publish'`**
   指定版本提交时的 Git 提交消息。这里的消息是 `🎨 chore(release): Publish`。

---

### **行为详解**
执行此命令时，Lerna 会：
1. **分析提交记录**：根据常规提交规范确定需要升级的版本号。
2. **更新版本号**：
   - 对于每个包，Lerna 会根据其提交记录的类型（`feat`、`fix`、`BREAKING CHANGE` 等）决定升级 **major**、**minor** 或 **patch** 版本。
3. **更新依赖**：
   - 使用 `--exact`，Lerna 会将依赖版本号固定为精确版本（移除 `^` 或 `~` 等范围符号）。
4. **提交变更**：
   - 使用指定的提交消息 `🎨 chore(release): Publish`，将版本变更提交到 Git 仓库。
5. **打 Tag**：
   - 为每个包的版本创建一个 Git Tag，命名规则为 `<package-name>@<version>`。例如 `package-a@1.0.0`。

---

### **使用场景**
这个命令适合于需要精确控制依赖版本的场景，特别是当你希望在包之间保持严格的版本一致性时。例如：
- 发布稳定版本时，移除依赖的范围符号，确保版本锁定。
- 在大型 monorepo 中，确保多个包之间的依赖关系不会因为范围符号而引入不一致。

---

### **示例流程**

假设你的 monorepo 包含两个包：`package-a` 和 `package-b`，并且它们之间存在依赖关系。

1. **提交记录**：
   - 在 `package-a` 中新增功能：
     ```bash
     git commit -m "feat: add new feature"
     ```
   - 在 `package-b` 中修复问题：
     ```bash
     git commit -m "fix: correct alignment issue"
     ```

2. **运行命令**：
   ```bash
   lerna version --exact --message '🎨 chore(release): Publish' --conventional-commits
   ```

3. **结果**：
   - 根据提交记录，Lerna 确定版本变更：
     - `package-a` 从 `1.0.0` 升级到 `1.1.0`（`feat` 触发 minor 版本升级）。
     - `package-b` 从 `1.0.0` 升级到 `1.0.1`（`fix` 触发 patch 版本升级）。
   - 更新依赖时，移除范围符号：
     - 如果 `package-b` 依赖 `package-a`，依赖将被更新为 `"package-a": "1.1.0"`（而不是 `"package-a": "^1.1.0"`）。
   - 提交变更，消息为 `🎨 chore(release): Publish`。
   - 打上对应的 Git Tag，如 `package-a@1.1.0` 和 `package-b@1.0.1`。

---

### **注意事项**
1. **确保提交记录符合规范**：`--conventional-commits` 依赖规范的提交记录来确定版本变更。
2. **精确版本的影响**：`--exact` 移除了范围符号，确保依赖的严格锁定，但可能限制版本更新的灵活性。
3. **提交消息格式**：你可以根据团队的风格自定义提交消息。
4. **CHANGELOG 生成**：默认会为每个包生成 CHANGELOG 文件，如果不需要可以使用 `--no-changelog` 参数。

---

### **结合其他参数**
你还可以结合以下参数进一步定制命令行为：
- `--yes`：跳过所有确认提示，直接执行。
- `--force-publish`：强制发布所有包，即使没有变更。
- `--conventional-prerelease`：发布预发布版本（如 `1.0.0-beta.1`）。
- `--preid`：为预发布版本添加标识（如 `alpha`、`beta`）。

#### **示例**
```bash
lerna version --exact --message '🎨 chore(release): Publish' --conventional-commits --yes
```

---

### **总结**
`lerna version --exact --message '🎨 chore(release): Publish' --conventional-commits` 是一个高效的版本管理命令，特别适合需要精确控制依赖版本和自动化发布的项目。如果你有其他问题或需要更多帮助，请随时告诉我！

## 联调

[团队工程实践 - 打造monorepo工作流](https://juejin.cn/post/6894434733355188232)（※）

### 4.8、联调相关

#### 4.8.1、本地

建议使用npm link到本地成果，来进行本地代码的联调，具体方式：

1. cd到packageA目录下，执行：

   ```bash
   npm link
   ```
2. cd到依赖packageA的项目中，执行

   ```bash
   npm link packageA
   ```
then done。就这么简单，这样就可以在本地项目中，直接调试本地packageA的代码而不需要发布新版本。  
   

# yarn

[lerna+yarn workspace+monorepo项目的最佳实践](https://juejin.cn/post/6844903918279852046)

##  安装|删除依赖

普通项目： 通过yarn add和yarn remove即可简单姐解决依赖库的安装和删除问题

monorepo: 一般分为三种场景

- 给某个package安装依赖：yarn workspace packageB add packageA 将packageA作为packageB的依赖进行安装
- 给所有的package安装依赖: 使用yarn workspaces add lodash 给所有的package安装依赖
- 给root 安装依赖：一般的公用的开发工具都是安装在root里，如typescript,我们使用yarn add -W -D typescript来给root安装依赖

对应的三种场景删除依赖如下

```bash
yarn workspace packageB remove packageA
yarn workspaces remove lodash
yarn remove -W -D typescript
```



## 清理所有packages的node_modules

#### **1. 清理所有工作区的 `node_modules`**

运行以下命令：

<BASH>

```bash
yarn workspaces run rimraf node_modules
```

**说明**：

- `yarn workspaces run`：在所有工作区中运行命令。
- `rimraf`：一个跨平台的删除工具，用于删除文件夹。

**注意**：如果没有安装 `rimraf`，需要先全局安装：

<BASH>

```
yarn global add rimraf
```

#### **2. 清理根目录的 `node_modules`**

运行以下命令：

<BASH>

```bash
rimraf node_modules
```