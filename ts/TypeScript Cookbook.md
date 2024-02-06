# TypeScript Cookbook  

16

book’s website（https://typescript-cookbook.com） 

# 第1章 项目设置

## 1.1 JavaScript 的类型检查

### 解决方案

在你想要进行类型检查的每个 JavaScript 文件的开头添加一行注释 `@ts-check`。使用合适的编辑器，当 TypeScript 遇到不太合适的地方时，你已经可以看到红色的波浪线。

### 讨论

```js
// @ts-check
let a_number = 1000;

if (Math.random() < 0.5) {
  a_number = "Hello, World!";
  // ^-- Type 'string' is not assignable to type 'number'.ts(2322)
}

console.log(a_number * 10);
```

在某些情况下，你需要更多的类型推断。在 JavaScript 文件中，你可以通过 JSDoc 类型注释为函数参数和绑定进行注解。[JSDoc](https://jsdoc.app) 是一种注释约定，允许你以一种不仅对人类可读而且对机器可解释的方式描述变量和函数接口。TypeScript 将获取你的注释并将其用作类型系统的类型：

```js
// @ts-check

/** @type {number} */
let amount;
amount = '12';
// ^-- Argument of type 'string' is not assignable
// to parameter of type 'number'.ts(2345)
/**
 * Adds VAT to a price
 *
 * @param {number} price The price without VAT
 * @param {number} vat The VAT [0-1]
 *
 * @returns {number}
 */
function addVAT(price, vat = 0.2) {
  return price * (1 + vat);
}
```

JSDoc 还允许你为对象定义新的复杂类型：

```js
/**
 * @typedef {Object} Article
 * @property {number} price
 * @property {number} vat
 * @property {string} string
 * @property {boolean=} sold
 */
/**
 * Now we can use Article as a proper type
 * @param {[Article]} articles
 */
function totalAmount(articles) {
  return articles.reduce((total, article) => {
    return total + addVAT(article);
  }, 0);
}
```

假设你有一个通过 JSDoc 很好文档化的 JavaScript 代码库，只需在文件顶部添加一行，就能很好地了解代码中是否出现了问题。

## 1.2 安装 TypeScript

### 讨论

TypeScript 是用 TypeScript 编写的，经过编译后生成 JavaScript，并且使用 Node.js 作为其主要执行环境。即使您不是在编写 Node.js 应用程序，JavaScript 应用程序的工具将在 Node 上运行。因此，请确保从官方网站获取 Node.js 并熟悉其命令行工具。

```bash
$ npm install -D typescript
```

安装了 TypeScript 后，可以初始化一个新的 TypeScript 项目。使用 NPX 可以执行相对于项目安装的命令行工具。
使用以下命令：
```bash
$ npx tsc --init
```
这将运行项目中安装的 TypeScript 编译器的本地版本，并传递 init 标志以创建新的 `tsconfig.json` 文件。



```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

`esModuleInterop` 确保了那些不是 ECMAScript 模块的模块在导入时与标准对齐。`forceConsistentCasingInFileNames` 有助于使用区分大小写文件系统的人与使用不区分大小写文件系统的人合作。`skipLibCheck` 假设您安装的类型定义文件（稍后详细介绍）没有错误。因此，编译器不会检查它们，会变得稍微更快。

## 1.3 将类型放在一边

### 问题

您希望编写常规的JavaScript，而无需额外的构建步骤，但仍然希望获得一些编辑器支持和函数的正确类型信息。但是，您不想像第1.1节中所示那样使用JSDoc来定义复杂的对象类型。

### 解决方案

Keep type definition files “on the side” and run the TypeScript compiler in the “check JavaScript” mode.

### 讨论

渐进式采用一直是TypeScript的一个明确目标。通过这种我称之为“types on the side（将类型放在一边）”的技术，您可以使用TypeScript语法来编写对象类型和高级功能，如泛型和条件类型（参见第5章），而不是使用繁琐的JSDoc注释，但仍然可以为实际的应用程序编写JavaScript。

## 1.4 迁移项目到 TypeScript

11