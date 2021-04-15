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

## 8.2 CSRF防护

​		CSRF（Cross-Site Request Forgery，跨站请求伪造），同城缩写为CSRF或XSRF。

​		用户在提交表单时，表单会自动加入csfrmiddlewaretoken隐藏控件，这个隐藏控件的值会与网站后台保存的csfrmiddlewaretoken进行匹配，只有匹配成功，网站才会处理表单数据。CSRF防护，原理如下：



​		如果表单中设置了CSRF防护功能，在浏览器开发者工具中，可以查看：

```html
  <form class="layui-form" action="" method="post">
    <input type="hidden" name="csrfmiddlewaretoken"
      value="WsEm2eL3wrcIyjxNJedVTyV4akuzsex9oOtbJcs5vDIdiQL8u0aIwq29HpYrOHro">
    <legend>手机号注册登录</legend>
    <div class="layui-form-item">
      <div class="layui-inline iphone">
        <div class="layui-input-inline">
          <i class="layui-icon layui-icon-cellphone iphone-icon"></i>

          <input type="text" name="username" class="layui-input" placeholder="请您输入手机号" lay-verify="required|phone"
            id="username" maxlength="150" required="">
        </div>
      </div>
      <div class="layui-inline iphone">
        <div class="layui-input-inline">
          <i class="layui-icon layui-icon-password iphone-icon"></i>

          <input type="password" name="password" class="layui-input" placeholder="请您输入密码" lay-verify="required|password"
            id="password" maxlength="128" required="">
        </div>
      </div>
    </div>
    <p></p>
    <div class="layui-form-item login-btn">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit="" lay-filter="demo1">注册/登录</button>
      </div>
    </div>
  </form>
```

# 第9章 购物车功能模块

# 第10 章 商城后台管理系统

## 10.1 Admin基本配置

创建超级管理员账号和密码，使用Django内置指令createsuperuser完成。

```shell
python manage.py createsuperuser
```

# 第11章 项目上线与部署

两种主流部署方案：Nginx+uWSGI+Django和Apache+uWSGI+Django。

### 11.4.3 部署uWSGI

