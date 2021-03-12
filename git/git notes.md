# git笔记

## git merge 和 git merge --no-ff的区别

git merge –no-ff 可以保存你之前的分支历史。能够更好的查看 merge历史，以及branch 状态。

git merge 则不会显示 feature，只保留单条分支记录。

<img src="https://nvie.com/img/merge-without-ff@2x.png" style="zoom:50%;" />

## Undo git rm -r --cached
https://stackoverflow.com/questions/25311743/undo-git-rm-r-cached

脑残使用`git rm -r --cached .`删除了暂存中的文件记录，使用`git reset HEAD .`进行恢复。



My `.gitignore` file wasn't working, so I followed this [question](https://stackoverflow.com/questions/11451535/gitignore-not-working).

And now I have bunch of files that I need to commit, in order to proceed. I made a mistake and committed those, because I couldn't find a way to get rid of those.

Is there any way that I can revert all these actions? I can't do `reset` cause I now I get error: `error: The following untracked working tree files would be overwritten by checkout`.

Stupid stupid mistake, and I can find solution for this.



If you've run only `git rm -r --cached`, try doing a `git reset HEAD .` from within your repo root.

If you did a `git commit -m "msg"` after doing a `git rm -r --cached`, i.e., you committed the changes, then do `git reset HEAD~1` to [undo your last commit](https://stackoverflow.com/q/927358/1860929).

## Git 撤销放弃本地修改

- 未使用 git add 缓存代码时。

可以使用 git checkout -- filepathname (比如： git checkout -- readme.md  ，不要忘记中间的 “--” ，不写就成了检出分支了！！)。放弃所有的文件修改可以使用 git checkout .  命令。

此命令用来放弃掉所有还没有加入到缓存区（就是 git add 命令）的修改：内容修改与整个文件删除。但是此命令不会删除掉刚新建的文件。因为刚新建的文件还没已有加入到 git 的管理系统中。所以对于git是未知的。自己手动删除就好了。



————————————————
版权声明：本文为CSDN博主「白马不是马」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/kuodannie1668/article/details/91383496