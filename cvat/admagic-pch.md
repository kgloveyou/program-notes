# admagic-pch

## svg logo不显示问题

**可能的原因：**

[mime.types nginx svg](https://juejin.cn/s/mime.types%20nginx%20svg)

在nginx服务器中，MIME类型（Multipurpose Internet Mail Extensions）是用于标识文档类型的标准，它指示了在浏览器中如何解释网站上的不同类型的文件。Nginx使用mime.types文件来配置支持的MIME类型。

对于SVG（Scalable Vector Graphics）文件，它是一种基于XML的矢量图形格式，可以用来显示各种图形，包括简单的图形、图表和复杂的插图。在nginx中，如果要支持SVG文件，需要在mime.types文件中添加以下行：

```arduino
image/svg+xml                      svg svgz;
```

这个配置告诉nginx将所有以“.svg”和“.svgz”为后缀的文件都作为“image/svg+xml”类型的文件来处理。这将使nginx能够正确地解释SVG文件并在浏览器中显示它们。

在添加这个配置后，您需要重新加载或重启nginx服务器，以便让它生效。

希望这个回答能够解决你的问题。如果你还有其他问题，请随时问我。



[Do I need to configure SVG images showing in nginx?](https://serverfault.com/questions/874597/do-i-need-to-configure-svg-images-showing-in-nginx)



**结论：**

在容器的nginx配置中有下面的代码，

```
image/svg+xml                                    svg svgz;
```

