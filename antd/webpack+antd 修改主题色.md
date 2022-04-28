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

  Ant Design Dynamic/Runtime Theme（*）

  更新主题的代码

  E:\github-demos\antd-theme-webpack-plugin\examples\antd-init\index.js

  ```js
    handleColorChange = (varname, color) => {
      const { vars } = this.state;
      if (varname) vars[varname] = color;
      console.log(vars);
      window.less
        .modifyVars(vars)
        .then(() => {
          // message.success(`Theme updated successfully`);
          this.setState({ vars });
          localStorage.setItem("app-theme", JSON.stringify(vars));
        })
        .catch(error => {
          message.error(`Failed to update theme`);
        });
    };
  ```

  

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

上面设置太麻烦了。

## 实现antd一键更换皮肤（×）

https://juejin.cn/post/6893746081986215944

基于create-react-app脚手架创建的项目，没有webpack.config.js文件（没有eject出来）。

依赖`customize-cra`库，该项目提供了一组实用程序来自定义 create-react-app 版本 2 和 3 配置，利用 react-app-rewired 核心功能。

## react实现antd线上主题动态切换功能（×）

https://juejin.cn/post/6844903910503776269

跟上述文章一模一样。

## admagic切换主题

### 读取配置

annot-ui\src\components\cvat-app.tsx

```tsx
// 获取platformConfig
if (!platformConfigInitialized && !platformConfigFetching) {
    fetchPlatformConfig();
}
```

### 实现方案

目前，Ant Design Dynamic/Runtime Theme（*）看来是可以尝试的方案。

这种方案的类似文章：

[Create Dynamic theme with antd and reactjs](https://cloud.tencent.com/developer/article/1653803)

[React+antd在线上动态更换皮肤主题](https://juejin.cn/post/6844903795093159943)

