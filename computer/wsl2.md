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

