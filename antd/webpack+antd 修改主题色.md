# webpack+antd 修改主题色

## 定制主题（官方文档）

https://ant-design.gitee.io/docs/react/customize-theme-cn

### 社区教程[#](https://ant-design.gitee.io/docs/react/customize-theme-cn#社区教程)

- [Using Ant Design in Sass-Styled Webpack Projects with `antd-scss-theme-plugin`](https://intoli.com/blog/antd-scss-theme-plugin/)

  只有一个theme.scss文件

- [How to Customize Ant Design with React & Webpack… the Missing Guide](https://medium.com/@GeoffMiller/how-to-customize-ant-design-with-react-webpack-the-missing-guide-c6430f2db10f)

  主题覆盖在编译时完成，因此在运行时没有（内置）主题切换。

- [Theming Ant Design with Sass and Webpack](https://gist.github.com/Kruemelkatze/057f01b8e15216ae707dc7e6c9061ef7)

  使用了两种主题色，可以切换；但是是用scss样式。

- [Using Sass/Scss with React App (create-react-app)](https://medium.com/@mzohaib.qc/using-sass-scss-with-react-app-create-react-app-d03072083ef8)

- [Dynamic Theming in Browser using Ant Design](https://medium.com/@mzohaib.qc/ant-design-dynamic-runtime-theme-1f9a1a030ba0)

- [Zero config custom theme generator](https://www.npmjs.com/package/@emeks/antd-custom-theme-generator)

​		一个npm包，用户生成custom-theme.less文件。@emeks/antd-custom-theme-generator



## 动态主题（实验性）

https://ant-design.gitee.io/docs/react/customize-theme-variable-cn，没看明白。

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

## 动态切换主题

https://github.com/GitOfZGT/dynamic-theme-demos/tree/master/projects/webpack-react-antd-dynamic-theme

