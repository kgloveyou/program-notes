# 升级antd 5

基于lerna实现的monorepo组件库。



## 官方升级文档

https://ant-design.antgroup.com/docs/blog/v4-ood-cn

- 从 v4 到 v5

https://ant-design.antgroup.com/docs/react/migration-v5-cn

- token api

https://ant-design.antgroup.com/docs/react/customize-theme-cn#api

- 从 Less 变量到 Design Token

https://ant-design.antgroup.com/docs/react/migrate-less-variables-cn



## antd-style：业务应用中的 antd CSSinJS 最佳实践

### less to antd-style 的一键迁移

https://juejin.cn/post/7263871284010303546

```bash
$ npx @chenshuai2144/less2cssinjs less2js -i src
```

## Ant Design Style

### 文档

https://ant-design.github.io/antd-style/zh-CN

###  使用 codemod 一键 迁移 Less 应用

https://ant-design.github.io/antd-style/zh-CN/guide/migrate-less-codemod

### antd-style

https://github.com/ant-design/antd-style

A business-level `css-in-js` solution built on the Ant Design V5 Token System. It is based on [emotion](https://emotion.sh/) at the bottom.

`antd-style` 是基于 Ant Design V5 Token System 构建的业务级 css-in-js 解决方案，它基于 emotion 二次封装。

[createStyles API 文档](https://ant-design.github.io/antd-style/zh-CN/api/create-styles)（※）

### Less 应用自动化迁移

https://ant-design.github.io/antd-style/zh-CN/guide/migrate-less-codemod

迁移工具源码：https://github.com/chenshuai2144/less2cssinjs



### Less组件迁移

https://ant-design.github.io/antd-style/zh-CN/guide/migrate-less-component

## emotion-js

https://github.com/emotion-js/emotion

### Object Styles

https://emotion.sh/docs/object-styles

# 现有项目升级 antd 5.x

