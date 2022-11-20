# wsl2

将你的Windows，快速打造成Docker工作站！

https://baijiahao.baidu.com/s?id=1705068403009467252&wfr=spider&for=pc

lenovo/apulis#2020

# 常用命令

## 切换到windows目录

切换到c盘。

```shell
cd /mnt/c  
```

## 列出发行版

```sh
wsl --list

wsl --list --running

wsl --list –verbose
```

## 使用 wsl 命令运行 Linux 命令

```sh
wsl ls ~

wsl cat /etc/issue
```

## 关闭指定的发行版

```sh
wsl --terminate Ubuntu-20.04
```

## 关闭 WSL 和所有正在运行的发行版

```sh
wsl --shutdown
```

# SSH代理转发

在 windows 服务中启用`OpenSSH Authentication Agent`  ，然后使用`ssh-add`命令添加ssh key。

```sh
ssh-add ~/.ssh/id_rsa.
```

安装失败，https://stuartleeks.com/posts/wsl-ssh-key-forward-to-windows/

# 第4章：Windows到Linux的互操作性

可以在windows 文件浏览器中直接列出运行中的distros目录。

# 第 7 章：在 WSL 中使用容器

## 在 Docker 中构建和运行 Web 应用程序

```dockerfile
FROM python:3.8-slim-buster
EXPOSE 5000
ADD requirements.txt .
RUN python -m pip install -r requirements.txt
WORKDIR /app
ADD . /app
CMD ["gunicorn", "--bind", "0.0.0.0:5000","app:app"]
```

构建镜像时，如果 Docker 确定命令中使用的文件与先前构建的层匹配，那么它将重用该层并使用 `---> Using cache` 输出表明这一点。 如果文件不匹配，则 Docker 运行命令**并使任何后续层的缓存无效**。

层缓存是我们从应用程序的 **Dockerfile** 中的主要应用程序内容中分离出 **requirements.txt** 的原因：安装需求通常是一个缓慢的操作，而且通常，应用程序文件的其余部分更改更频繁。 在复制应用程序代码之前拆分需求并执行 **pip install** 可确保层缓存在我们开发应用程序时与我们一起工作。

**Docker教程**

https://www.docker.com/101-tutorial/

> 一旦层发生变化，所有下游层也必须重新创建

有关层缓存的，请看这里，http://localhost/tutorial/image-building-best-practices/#layer-caching

## 在Kubernetes中运行web应用程序

When working with Kubernetes, using the *latest* image version means that Kubernetes will try to pull the image from a registry, even if it has the image locally.  

# Chapter 8: Working with WSLDistros  

你可以使用`export`和`import`命令备份发行版或将其复制到另一台计算机。

# 第9章：Visual Studio Code和WSL