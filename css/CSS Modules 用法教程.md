# CSS Modules 用法教程

http://www.ruanyifeng.com/blog/2016/06/css_modules.html

​		本文介绍的 [CSS Modules](https://github.com/css-modules/css-modules) 有所不同。它不是将CSS改造成编程语言，而是功能很单纯，只加入了局部作用域和模块依赖，这恰恰是网页组件最急需的功能。

因此，CSS Modules 很容易学，因为它的规则少，同时又非常有用，可以保证某个组件的样式，不会影响到其他组件。

​		CSS Modules 提供各种插件，支持不同的构建工具。本文使用的是 Webpack 的css-loader插件，因为它对 CSS Modules 的支持最好，而且很容易使用。

```
module.exports = {
  entry: __dirname + '/index.js',
  output: {
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
      },
    ]
  }
};
```


上面代码中，关键的一行是<code>style-loader!css-loader?modules</code>，它在<code>css-loader</code>后面加了一个查询参数<code>modules</code>，表示打开 CSS Modules 功能。

## 一、局部作用域

CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。

产生局部作用域的唯一方法，就是使用一个独一无二的`class`的名字，不会与其他选择器重名。这就是 CSS Modules 的做法。

下面是一个React组件[`App.js`](https://github.com/ruanyf/css-modules-demos/blob/master/demo01/components/App.js)。

```css

import React from 'react';
import style from './App.css';

export default () => {
  return (
    <h1 className={style.title}>
      Hello World
    </h1>
  );
};
```

上面代码中，我们将样式文件[`App.css`](https://github.com/ruanyf/css-modules-demos/blob/master/demo01/components/App.css)输入到`style`对象，然后引用`style.title`代表一个`class`。

```css

.title {
  color: red;
}
```

构建工具会将类名`style.title`编译成一个哈希字符串。

```html

<h1 class="_3zyde4l1yATCOkgn-DBWEL">
  Hello World
</h1>
```

`App.css`也会同时被编译。

```css

._3zyde4l1yATCOkgn-DBWEL {
  color: red;
}
```

这样一来，这个类名就变成独一无二了，只对`App`组件有效。

现在，运行这个Demo。

```bash
$ npm run demo01
```

打开 http://localhost:8080 ，可以看到[结果](http://ruanyf.github.io/css-modules-demos/demo01/)，`h1`标题显示为红色。

## 二、全局作用域

CSS Modules 允许使用`:global(.className)`的语法，声明一个全局规则。凡是这样声明的`class`，都不会被编译成哈希字符串。

[`App.css`](https://github.com/ruanyf/css-modules-demos/blob/master/demo02/components/App.css)加入一个全局`class`。

```css

.title {
  color: red;
}

:global(.title) {
  color: green;
}
```

[`App.js`](https://github.com/ruanyf/css-modules-demos/blob/master/demo02/components/App.css)使用普通的`class`的写法，就会引用全局`class`。

```css

import React from 'react';
import styles from './App.css';

export default () => {
  return (
    <h1 className="title">
      Hello World
    </h1>
  );
};
```

运行这个示例。

```bash
$ npm run demo02
```

打开 http://localhost:8080，应该会[看到](http://ruanyf.github.io/css-modules-demos/demo02/)`h1`标题显示为绿色。

CSS Modules 还提供一种显式的局部作用域语法`:local(.className)`，等同于`.className`，所以上面的`App.css`也可以写成下面这样。

```css

:local(.title) {
  color: red;
}

:global(.title) {
  color: green;
}
```

