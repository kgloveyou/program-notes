# git 操作命令

## git merge最简洁用法

- 开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```shell
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

- 当master代码改动了，需要更新开发分支（dev）上的代码

```shell
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## -u

如果当前分支只有一个追踪分支，那么主机名都可以省略。

```shell
$ git push
```

如果当前分支与多个主机存在追踪关系，则可以使用`-u`选项指定一个默认主机，这样后面就可以不加任何参数使用`git push`。

```shell
$ git push -u origin master
```

上面命令将本地的`master`分支推送到`origin`主机，同时指定`origin`为默认主机，后面就可以不加任何参数使用`git push`了。

不带任何参数的`git push`，默认只推送当前分支，这叫做simple方式。

## git flow

https://www.cnblogs.com/jeffery-zou/p/10280167.html

**注意**，新开发的功能代码永远不能直接合并入master。

## exit

Q

## 查看远程仓库地址

```bash
$ git remote -v
```

## git 获取 remote 的 url

```sh
$ git ls-remote --get-url origin
```

## 更改远程仓库地址

```bash
# 更改远程仓库地址
git remote set-url origin git@apulis-gitlab.apulis.cn:apulis/cvat.git
# OR
git remote set-url origin https://apulis-gitlab.apulis.cn/apulis/cvat.git

# 更改完毕验证
git remote -v
```



## 回退版本

先用git log查看需要回退到的commit_id。

然后执行如下：

```sh
git reset --hard 36fe378194450a10e5c6d28dd9e4b760552b2b2a
git push origin HEAD --force
```

## 单文件回退

1、查看文件commit记录

```sh
git log 文件，例如 git log src/index.java
```

2、找到需要提交到上一个版本的commit号，然后checkout该文件的上一版本，输入下面的指令：

```sh
git checkout [commit id] 文件，
例如 git checkout a57fb4b474888f0db4cba18de2180496 src/index.java
```

3、然后将checkout的版本提交到本地

```sh
git commit -m "回退到上一版本"
```

4、最后将改变提交到分支远程：

```sh
git push origin 分支名
```

这样此文件本地和远程都是上一版本内容

## 放弃本地修改

### 1. 未使用git add 缓存代码

- 使用git checkout -- filename，注意中间有--

```bash
git checkout -- filename
```

- 放弃所有文件修改 git checkout .

```sh
git checkout .
```

- 此命令用来放弃掉所有还没有加入到缓存区（就是 git add 命令）的修改：**内容修改与整个文件删除**
- **此命令不会删除新建的文件，因为新建的文件还没加入git管理系统中，所以对git来说是未知，只需手动删除即可**

### 2. 已使用git add 缓存代码，未使用git commit

- 使用 git reset HEAD filename

```sh
git reset HEAD filename
```

- 放弃所有文件修改 git reset HEAD

```undefined
git reset HEAD
```

- 此命令用来清除 git  对于文件修改的缓存。相当于撤销 git add 命令所在的工作。**在使用本命令后，本地的修改并不会消失，而是回到了第一步1. 未使用git add 缓存代码，继续使用用git checkout -- filename，就可以放弃本地修改**

### 3. 已经用 git commit  提交了代码

- 使用 git reset --hard HEAD^ 来回退到上一次commit的状态

```shell
git reset --hard HEAD^
```

- 或者回退到任意版本git reset --hard  commit id ，使用git log命令查看git提交历史和commit id

```sh
git reset --hard commit id
```



## 显示当前commitid

```bash
git rev-parse HEAD
```



## git 创建tag , 查看tag ， 删除tag

```bash
git tag　　//查看tag
git tag test_tag c809ddbf83939a89659e51dc2a5fe183af384233　　　　//在某个commit 上打tag
git tag
...
git push origin test_tag　　　　//!!!本地tag推送到线上
...
git tag -d test_tag　　　　　　　　//本地删除tag
git push origin :refs/tags/test_tag　　　　//本地tag删除了，再执行该句，删除线上tag
```

## stash

查看列表

```bash
git stash list 
```
清空列表
```bash
git stash clear
```

## 查看分支创建时间

```bash
git reflog show --date=iso v0.2.0
```

## 查看某个分支的创建者以及创建时间

列出远程Git分支按作者排序的committerdate：

```bash
git for-each-ref --format='%(committerdate) %09 %(authorname) %09 %(refname)' | sort -k5n -k2M -k3n -k4n
```

然后比如你想查看某个分支branch_A, 那么就再后面加上|grep branch_A

```bash
git for-each-ref --format='%(committerdate) %09 %(authorname) %09 %(refname)' | sort -k5n -k2M -k3n -k4n|grep branch_A
```

## 一并暂存及提交

```bash
 git commit -a -m '描述文字'
```

## 查看分支从哪里签出

```bash
git reflog  show 'v0.2.0' --date=local
```

## git 比较两个分支内容差异

使用git diff 比较两个分支

```bash
git diff 分支1 分支2
```

　　

加--stat参数，显示文件列表, 默认是文件内容diff，如上

```bash
git diff 分支1 分支2 --stat
```

## 删除分支

https://www.freecodecamp.org/news/how-to-delete-a-git-branch-both-locally-and-remotely/

首先需要切换到其他分支。

```bash
// 删除本地分支
git branch -d localBranchName
```

The `-d` option will delete the branch only if it has already been pushed and merged with the remote branch. Use `-D` instead if you want to force the branch to be deleted, even if it hasn't been pushed or merged yet.

```bash
// 删除远程分支
git push origin --delete remoteBranchName
```

## 分支重命名

1. 本地分支重命名

```sh
git branch -m oldName newName
```

2. 将重命名后的分支推送到远程

```sh
git push origin newName
```

3. 删除远程的旧分支

```sh
git push --delete origin oldName
```

## git全局配置和单个项目仓库的用户名邮箱配置

目前大部分公司都已经使用gitlab或github管理项目代码, 在使用git时相信大家都配置了一个全局的用户名和邮箱

```sh
$ git config --global user.name "gitlab Name"
 
$ git config --global user.email "gitlab@xx.com"
 
$ git config --list
```

如果你配置的全局的用户名和邮箱是公司的，而自己也有私人用户名和邮箱来开发自己项目，这样可能一台电脑需要设置多个git用户名配置的项目。如果你不进行配置用户名和邮箱的话, 则会使用全局的, 这个时候是错误的, 正确的做法是针对个人的项目, **在自己的项目根目录下进行单独配置**

```sh
$ git config user.name "mygitlab Name"

$ git config user.email "mygitlab@xx.com"

$ git config --list
```

`git config --list`查看当前配置, 在当前项目下面查看的配置是全局配置+当前项目的配置, 使用的时候会**优先使用当前项目的配置**



## 修改gitee个人项目配置信息

```sh
$ git config user.email 'hanjiangfeng2009@gmail.com'

$ git config user.name 'hanjf'
$ git config --list
```

