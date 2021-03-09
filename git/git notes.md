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