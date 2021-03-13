# `dependencies vs devDependencies`

https://medium.com/@stalonadsl948/dependencies-vs-devdependencies-926e096a3dee

**devDependencies** should contain packages which are used during development or which are used to build your bundle, for example, mocha, jscs, grunt-contrib-watch, gulp-jade and etc. These packages are neseccery only while you are developing your project, also ESlint is used to check everything during building your bundle.So install all these packages using `-dev` flag, this will say to the npm, heeey, I need these package for development, so this will automatically add package to devDependencies instead of usual dependencies.

**devDependencies** 包含开发过程中使用到的依赖包，这些依赖仅在开发项目过程有用。

```sh
$ npm install eslint --save-dev
```

By the way, `npm install` by default installing packages from both dependencies and devDependencies. I haven't seen usage of this flag for years, but I will just let you know this, for small projects this may work `npm install --production` , **--production** flag says to the npm, heey, I want you to install packages only from usual dependencies.

`npm install` 默认会安装dependencies 和devDependencies中的依赖包。`npm install --production` , **--production**标识符可以只安装dependencies 中的依赖包，通常用于生产环境。yarn中也有类似的命令：

```bash
yarn install --production[=true|false]
```

Yarn will not install any package listed in `devDependencies` if the `NODE_ENV` environment variable is set to `production`. Use this flag to instruct Yarn to ignore `NODE_ENV` and take its production-or-not status from this flag instead.

**Notes:** `--production` is the same as `--production=true`. `--prod` is an alias of `--production`



**Dependencies** should contain libs and framewors your app is built on, such as Vue, React, Angular, Express, JQuery and etc. You will agree with me, if I say, that your project wont work without these packages(if you are using them, of course).

