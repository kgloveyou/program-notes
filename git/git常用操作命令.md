# git常用操作命令

## 本地项目提交到远程仓库(远程仓库已建，内容为空)

1、git branch dev0.0  # 创建本地分支
2、git checkout dev0.0 # 切换分支
（步骤1、2可以合并成）git checkout -b dev0.0 #创建+切换分支
3、git add .
4、git commit -m "gis基础平台初始代码(供参考)."
5、git push origin dev0.0

--------------------------

## 文件修改过后提交

1、git add map.poi.js	#git add添加多个文件时，多个文件名之间用空格隔开
2、git commit -m "修改类型查找时翻页错误"
3、git push origin dev0.0

## 文件删除

1、$ git rm 我的文件	#在本地仓库删除文件
   $ git rm -r 我的文件夹	#在本地仓库删除文件夹,此处-r表示递归所有子目录  
2、$ git commit -m"我的修改"	#提交代码
3、$ git push origin xxxxxx	#推送到远程仓库

## 获取某个版本代码

1、git checkout develop
2、

## 将远程git仓库里的指定分支拉取到本地（本地不存在的分支）

git checkout -b 本地分支名 origin/远程分支名

git checkout -b develop origin/develop

git checkout -b tmp origin/tmp

## 删除本地分支

git branch -d develop
git branch -D br	#强制删除

## 删除远程分支

git push origin --delete dev

## 删除本地和远程分支

https://blog.csdn.net/qq_32452623/article/details/54340749

## -git比较远程和本地

git fetch origin  
git diff master origin/master 

git fetch origin  feature-gis
git diff feature-gis origin/feature-gis 
git merge origin/feature-gis 

## 从现有仓库克隆

git clone git://github.com/schacon/grit.git
这会在当前目录下创建一个名为grit的目录，其中包含一个 .git 的目录，用于保存下载下来的所有版本记录，然后从中取出最新版本的文件拷贝。

git clone http://192.168.0.135:8081/gis/gis-manage.git
git clone http://192.168.37.5/web/doc.git front-doc

git clone http://192.168.37.5/nenv/nv-template.git

git clone http://192.168.37.5/gph/manage-front.git

## 修改远程仓库地址

git remote set-url origin http://192.169.37.5/gis/document.git
git remote set-url origin http://192.169.37.5/gis/infore-gis-platform.git
git remote set-url origin http://192.168.37.5/gis/gis-manage.git

gitlab 已迁移到192.168.37.5 用户名密码不变

请在自己的本地项目中执行命令修改远程仓库地址：
（项目对应git地址）
git remote set-url origin http://192.169.37.5/xxxxxxxxxxxxxxxxxxx.git

如果提交出现如下错误：
“fatal: unable to access 'http://192.169.37.5/infore/basic-platform.git/': Failed to connect to 192.169.37.5 port 80: Timed out
”
请执行：
git config --global http.proxy http://192.168.37.5:80   

## 从github克隆仓库

git clone -o github git@github.com:michael-laoyu/MapTileGenerator.git

## 整体提交流程

git status
git add .
git commit -m "更新"
git push origin dev

## 后台代码更新

D:\gis-manage>git pull origin gis

## 查看本地分支

git branch

## 查看所有分支（本地、远程）

git branch -a

-commit your changes or stash them before you can merge-----
http://blog.csdn.net/lincyang/article/details/21519333

git stash
git pull
git stash pop

## 移除文件夹版本控制

http://blog.csdn.net/dipolar/article/details/53138452

git rm -r -n --cached "bin/" //-n：加上这个参数，执行命令时，是不会删除任何文件，而是展示此命令要删除的文件列表预览。
git rm -r --cached  "bin/"      //最终执行命令. 
git commit -m" remove bin folder all file out of control"    //提交
git push origin master   //提交到远程服务器

## 合并分支到master上

http://blog.csdn.net/boysky0015/article/details/78185879

## 当前用户名和邮箱

git config user.name
git config user.email

## 打标签

 git tag -a v0.9.0 -m "0.9.0版本"

## 提交标签 

git push origin --tags 

## 删除tag

https://www.liaoxuefeng.com/wiki/896043488029600/902335479936480

## 新建分支 

新建一个本地分支：git checkout -b dev
把新建的本地分支push到远程服务器:git push origin dev:dev

## 查看提交日志 

git log

退出方法：英文状态下按Q

重命名tag-----
1. git tag newtag oldtag
2. git tag -d oldtag
3. git push origin :refs/tags/oldtag
4. git push --tags

## 分支重命名

If you want to rename a branch while you are at this branch:（使用-M则表示强制重命名）
git branch -m new_branch_name

If you want to rename a branch while you are not at this branch:
git branch -m old_branch_name new_branch_name

If you make a commit, have not pushed yet:
git commit --amend


如果你需要重命名远程分支，推荐的做法是：

删除远程待修改分支
push本地新分支名到远程

## 删除远程分支

git push origin --delete [branch_name]