# 查看python安装路径以及pip安装的包列表及路径

## Linux系统

### 查看Python路径

```bash
whereis python
```

此命令将会列出系统所安装的所有版本的Python的路径效果如下：

![](https://img-blog.csdn.net/20180819090818455?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzI5MTU4MzE1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

使用以下命令可分别查看Python2，Python3的安装路径

```bash
whereis python2
whereis python3
```

### 查看使用pip安装的软件包

默认Python3

```bash
pip list
```

Python2查看pip安装的软件包名称及版本

```bash
python2 -m pip list 
```

Python3查看pip安装的软件包及版本

```bash
python3 -m pip list
```

同样也可以是用命令

```bash
pip freeze
```

进行查看，安装包的路径。

两者的具体区别详见：[pip list 和 pip freeze(https://blog.csdn.net/vitaminc4/article/details/76576956)

### 查看pip安装的软件包路径

例如查看 beautifulsoup4的安装路径

```bash
pip show beautifulsoup4
```

效果如下：

![](查看python安装路径以及pip安装的包列表及路径.assets/20180819085932277)

## Windows 环境

### 查看Python路径

```bash
where python
```

### 查看使用pip安装的软件包

命令同Linux系统环境，若出现错误“不是内部或外部命令也不是可运行程序”请修改环境变量添加Python相应路径。

————————————————
版权声明：本文为CSDN博主「流溟」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/sinat_29158315/article/details/81813556