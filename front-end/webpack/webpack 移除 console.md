使用插件`babel-plugin-transform-remove-console`

- 安装插件 `babel-plugin-transform-remove-console`

`npm install --save-dev babel-plugin-transform-remove-console`
- 使用插件

`plugins:[ ["transform-remove-console",{ "exclude":["log"] }] ]`

仅保留console.log，去除其他所有console。

```
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin} = require("clean-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader");

module.exports = {
    mode:"development",
    devtool:"cheap-source-map",
    devServer:{
        port:3000,
        contentBase:path.join(__dirname,"dist")
    },
    entry:{
        "index":"./src/index.js"
    },
    output:{
        filename:"[name].bundle.js",
        path:path.join(__dirname,"dist")
    },
    resolve:{
        modules:[path.join(__dirname,"node_modules")],
        extensions:[".vue",".js",".json"],
        alias:{
            "vue$":"vue/dist/vue.esm.js"
        }
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                include:/src/,
                use:["vue-loader"]
            },
            {
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-env"],
                        plugins:[
                            ["transform-remove-console",{
                            "exclude":["log"]
                            }]
                        ]
                    }
                }
            },
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}
```

原文：https://blog.csdn.net/qzw752890913/article/details/108822775