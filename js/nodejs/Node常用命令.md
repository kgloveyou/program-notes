# Node常用命令

## 查看所有全局安装包

```shell
npm list -g --depth 0
```

https://medium.com/@alberto.schiabel/npm-tricks-part-1-get-list-of-globally-installed-packages-39a240347ef0

输出

```shell
+-- @ant-design/codemod-v4@1.1.0
+-- annot-ui@1.9.14 -> D:\work_repos\ad-magic-frontend\annot-ui
+-- cnpm@6.1.1
+-- create-react-app@3.4.1
+-- cvat@1.0.0 -> D:\work_repos\cvat
+-- cvat-core@3.8.1 -> D:\work_repos\cvat\cvat-core
+-- cvat-ui@1.9.14 -> D:\work_repos\cvat\cvat-ui
+-- gatsby-cli@2.19.1
+-- generator-apulis-frontend-cli@0.2.2
+-- gulp-cli@2.3.0
+-- i18next-json-csv-converter@0.2.0
+-- lerna@4.0.0
+-- npx@10.2.2
+-- svgo@1.3.2
+-- tp-good-cli@0.0.7
+-- ts-node@9.0.0
+-- typescript@4.1.3
+-- yarn@1.22.10
`-- yo@4.2.0
```

## npm ci

[What is the difference between "npm install" and "npm ci"?](https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci)

**`npm ci`** (also known as **C**lean **I**nstall) is meant to be used in automated environments — such as test platforms, continuous integration, and deployment — or, any situation where you want to make sure you're doing a clean install of your dependencies.

It installs dependencies directly from `package-lock.json` and uses `package.json` only to validate that there are no mismatched versions. **If any dependencies are missing or have incompatible versions, it will throw an error**.

Use `npm install` to add new dependencies, and to update dependencies on a project. Usually, you would use it during development after pulling changes that update the list of dependencies but it may be a good idea to use `npm ci` in this case.

Use `npm ci` if you need a deterministic, repeatable build. For example during continuous integration, automated jobs, etc. and when installing dependencies for the first time, instead of `npm install`.

[Difference between npm i and npm ci in Node.js](https://www.geeksforgeeks.org/difference-between-npm-i-and-npm-ci-in-node-js/)

**npm i:** The npm i (or npm install) is used to install all dependencies or devDependencies from a *package.json* file.

**npm ci:** CI stands for clean install and npm ci is used to install all exact version dependencies or devDependencies from a package-lock.json file.