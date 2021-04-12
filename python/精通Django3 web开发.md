# 精通Django3 web开发 

## 1.5 创建Django项目

运行项目指令

```sh
python manage.py runserver 8001
```

其中8001是端口号，如果在指令里没有设置端口，端口就默认为8000。



## 4.4 使用QuerySet操作数据

在PyCharm的Terminal下开启Shell模式，输入`python manage.py shell`指令即可。

# 第7章 商品信息模块

## 7.4 商品详细页的业务逻辑

```python
def detailView(request, id):
    title = '商品介绍'
    classContent = 'datails'
    commoditys = CommodityInfos.objects.filter(id=id).first()
    items = CommodityInfos.objects.exclude(id=id).order_by('-sold')[:5]
    likesList = request.session.get('likes', [])
    likes = True if id in likesList else False
    return render(request, 'details.html', locals())
```

变量likesList是当前用户与Django的会话连接，即session会话，session是用户在网站的一个身份凭证，而且session能存储用户的一些数据信息。

## 7.7 Session的配置与操作

# 第8章 用户信息模块

## 8.1 内置User实现注册登录

表8-1 User模型各个字段的说明

| 字段     | 说明                                      |
| -------- | ----------------------------------------- |
| is_staff | 用来判断用户是否可以登录进入Admin后台系统 |

