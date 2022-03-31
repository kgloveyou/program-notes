# webpack的 loader 和 plugin 区别

https://juejin.cn/post/6944349196539396133

`Loader`是一个模块转换器，将非JS模块转换成JS模块，供webpack进行打包处理。

非js模块即样式文件（.css、.less、.scss等），非标准JS文件（.ts、.jsx、.vue），以及其他类型的文件（svg、png | jpg | jpeg等）。

`Plugin`是webpack运行生命周期的各个阶段上挂载的事件，会被指定的时间节点被触发（相当于订阅/发布模式），能够改变构建结果、拆分和优化bundle等。

## 常用的loader

   - babel-loader

     此 package 允许你使用 [Babel](https://github.com/babel/babel) 和 [webpack](https://github.com/webpack/webpack) 转译 `JavaScript` 文件。

   - less-loader-->postcss-loader-->css-loader-->style-loader

     ```js
     {
         test: /\.less$/i,
             include: [
                 /[\\/]node_modules[\\/].*antd/,
                 /[\\/]node_modules[\\/].*ant-design/,
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

     

   - sass-loader

     ```js
     {
         test: /\.(css|scss)$/,
             use: [
                 'style-loader',
                 {
                     loader: 'css-loader',
                     options: {
                         importLoaders: 2,
                     },
                 },
                 'postcss-loader',
                 'sass-loader',
             ],
     },
     ```

     

   - file-loader

     ```js
                 {
                     test: /\.(png|jpe?g|gif)$/i,
                     use: [
                         {
                             loader: 'file-loader',
                         },
                     ],
                 },
     ```

     

   - react-svg-loader

     ```js
                 {
                     test: /src[\s\S]*\.svg$/,
                     exclude: /node_modules/,
                     use: [
                         'babel-loader',
                         {
                             loader: 'react-svg-loader',
                             query: {
                                 svgo: {
                                     plugins: [{ pretty: true }, { cleanupIDs: false }],
                                 },
                             },
                         },
                     ],
                 },
     ```

     

   - worker-loader

     ```js
                 {
                     test: /\.worker\.js$/,
                     exclude: /3rdparty/,
                     use: {
                         loader: 'worker-loader',
                         options: {
                             publicPath: '/AIStudio/admagic/',
                             name: '[name].[contenthash].js',
                         },
                     },
                 },
     ```

     

## webpack 常用插件

https://webpack.docschina.org/plugins

- HtmlWebpackPlugin

  ```js
  new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      // Adds the given favicon path to the output HTML
      favicon: `${assetsDir}/favicon.ico`,
  }),
  ```

  

- CopyPlugin

  ```js
  new CopyPlugin([
      {
          from: '../annot-data/src/js/3rdparty/avc.wasm',
          to: '3rdparty/',
      },
      {
          from: `${assetsDir}/favicon.ico`,
          to: 'favicon.ico'
      },
  ]),
  ```

  

- MonacoWebpackPlugin