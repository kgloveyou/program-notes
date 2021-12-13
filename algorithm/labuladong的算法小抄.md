# labuladong的算法小抄

## 勘误表

https://mp.weixin.qq.com/s/kYxypgM__1Co8LsqQSwhKg

## 书中代码

百度云下载链接: https://pan.baidu.com/s/1xG6ZKMNIFuZg3rPsWVJmWg  密码: 9kuc

## 作者个人网站

https://labuladong.gitee.io/algo/

## 3.6 Git原理之二叉树最近公共祖先

`git pull = git fetch + git merge`

`git pull --rebase =git fetch + git rebase`

`git pull`这个命令，我们会经常使用，它默认是使用`merge`方式将远端别人的修改拉到本地；`git pull -r`，就会使用`rebase`的方式将远端的修改拉到本地。

这二者最直观的区别就是：`merge`方式合并的分支会有很多“分叉”，而`rebase`方式合并的分支就是一条直线。

**对于多人协作，`merge`的方式并不好。**

**所以一般来说，实际工作中更推荐使用`rebase`方式合并代码。**

**缺点：**

如果比较关注commit时间的话，还是用git merge，rebase会打乱时间线是不可避免的