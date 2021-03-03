# 更换（Pypi）pip源到国内镜像

### pip国内的一些镜像

- 阿里云 http://mirrors.aliyun.com/pypi/simple/
- 中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
- 豆瓣(douban) http://pypi.douban.com/simple/
- 清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
- 中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

**提示：若担心安全问题请使用HTTPS加密源**

### 修改源方法：

#### 临时使用：

**Linux Mac Windows 通用命令**

可以在使用pip的时候在后面加上-i参数，指定pip源

> pip install scrapy -i https://pypi.tuna.tsinghua.edu.cn/simple

#### 永久修改：

**Linux:**

修改 pip.conf 文件 (没有就创建一个)

> $HOME/.config/pip/pip.conf

修改内容如下：

> [global]
>
> index-url = https://pypi.tuna.tsinghua.edu.cn/simple12

**Mac:**

修改 pip.conf 文件

> $HOME/Library/Application Support/pip/pip.conf

如果没有上面的目录,在如下目录创建 pip.conf

> $HOME/.config/pip/pip.conf

修改内容如下：

> [global]
>
> index-url = https://pypi.tuna.tsinghua.edu.cn/simple12

**Windows:**

修改 pip.conf 文件 (没有就创建一个)

> %APPDATA%\pip\pip.ini

修改内容如下：

> [global]
>
> index-url = https://pypi.tuna.tsinghua.edu.cn/simple

### 修改文件后，执行命令发生错误

使用非HTTPS加密源（如豆瓣源），在执行命令发生错误，在命令最后加上`--trusted-host pypi.douban.com`

> pip install django -i http://pypi.douban.com/simple --trusted-host [pypi.douban.com](http://pypi.douban.com/)



https://developer.aliyun.com/article/652884