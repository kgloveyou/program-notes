# webpack+antd 修改主题色

## 少量内容

在cvat-ui\webpack.config.js中，少量内容，可以直接添加，参考文件D:\work_repos\ad-magic-frontend\annot-ui\webpack.config.js

```js
            {
                test: /\.less$/i,
                include: [
                    /[\\/]node_modules[\\/].*antd/,
                    /[\\/]node_modules[\\/].*ant-design/,
                    path.resolve(__dirname, './node_modules/@ant-design'),
                    path.resolve(__dirname, './node_modules/@apulis/aistudio-layout'),
                    path.resolve(__dirname, './node_modules/@apulis/table'),
                    path.resolve(__dirname, './node_modules/@apulis/select-lang'),
                    path.resolve(__dirname, './node_modules/@apulis/group-selector')
                ],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    'primary-color': '#4168AA',
                                    'link-color': '#4168AA',
                                    'border-radius-base': '2px',
                                },
                                javascriptEnabled: true,
                            },
                        }
                    },
                ],
            },
```

**备注：**

可以在Less中编写Javascript函数

首先需要在Webpack中对less-loader设置`javascriptEnabled`，使其支持编写Javascript！

ess-loader6.0.0之后,javascriptEnabled被放到了lessOptions中（[webpack中less-loader6.0.0的javascriptEnabled报错解决](https://www.jianshu.com/p/fd1a91316813)）



## 大量内容

大量内容，新建less文件，然后在webpack.config.js中引入，代码如下。

```json
// const serveriusTheme = require('./src/theme/serverius-theme/index.js');

{
    test: /\.less$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
            },
        },
        {
            loader: 'less-loader', // compiles Less to CSS
            options: {
                lessOptions: {
                    modifyVars: {
                        // 'primary-color': '#F60',
                        // 'link-color': '#F60',
                        // or
                        'hack': `true; @import "src/theme/serverius.less";`, // Override with less file
                    },
                    // modifyVars: serveriusTheme,
                    javascriptEnabled: true,
                },
            }
        },
    ],
},
```



其中serverius.less的内容如下：

```less
@primary-color: #f60;
@link-color: #f60;
// Menu
// ---
@menu-bg: rgba(0,10,40,0.9);
@menu-item-color: #fff;


// @icon-color: #f60;
// @text-color: #fff;

// Tooltip
// ---
// Tooltip background color
@tooltip-bg: rgba(0, 10, 40, 0.9);

// Buttons
@btn-border-radius-base: 0;
// @btn-primary-color: #000A28;
// @btn-border-width: 2px;
@btn-primary-bg: #f60;

// Outline
@outline-color: @primary-color;

// @border-color-base: #f60; // 边框色

```

