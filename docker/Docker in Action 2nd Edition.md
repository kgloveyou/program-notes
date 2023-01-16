# Docker in Action 2nd Edition

## 8.1 使用 Dockerfile 打包 Git

关于 Dockerfile 的唯一特殊规则是第一条指令必须是 `FROM`。 如果你从一个空镜像开始并且你的软件没有依赖项，或者你将提供所有依赖项，那么你可以从一个名为 `scratch` 的特殊空存储库开始。

## 8.2 Dockerfile 入门

```sh
docker inspect dockerinaction/mailer-base:0.6
```

**提示** 请记住，`docker inspect` 命令可用于查看容器或镜像的元数据。 在本例中，你使用它来检查镜像。

