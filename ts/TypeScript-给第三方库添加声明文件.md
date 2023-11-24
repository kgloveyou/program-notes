1、[TypeScript-给第三方库添加声明文件](https://www.cclliang.com/2020/09/11/TypeScript/%E7%BB%99%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93%E6%B7%BB%E5%8A%A0%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6/)

2、[ts实战：给没有类型声明的第三方库编写一个类型声明文件](https://www.mulingyuer.com/archives/883/)

#  dts-gen

## 如何给现有的js库编写d.ts文件

**回答**

编写一个 .d.ts 文件来为现有的 JavaScript 库提供类型定义是一种常见的做法，它可以让 TypeScript 在使用该库时进行类型检查和智能提示。下面是一些步骤来编写一个 .d.ts 文件：

1. 创建一个与 JavaScript 库相同名称的 .d.ts 文件。例如，如果你的 JavaScript 库名为 "my-library.js"，那么你的 .d.ts 文件应该命名为 "my-library.d.ts"。

2. 在 .d.ts 文件中使用 declare module 语法来声明模块。例如：

```typescript
declare module 'my-library' {
  // 在这里添加你的类型定义
}
```

3. 在模块声明中添加你需要导出的类型定义。这可以包括接口、类、函数等。例如：

```typescript
declare module 'my-library' {
  interface MyInterface {
    // 添加接口定义
  }

  class MyClass {
    // 添加类定义
  }

  function myFunction(): void {
    // 添加函数定义
  }

  // 添加其他类型定义
}
```

4. 如果你的 JavaScript 库使用了全局变量或全局函数，你可以在模块声明中使用 declare global 语法来声明全局变量或函数。例如：

```typescript
declare module 'my-library' {
  declare global {
    interface Window {
      // 添加全局变量定义
    }

    function globalFunction(): void {
      // 添加全局函数定义
    }
  }

  // 添加其他类型定义
}
```

5. 根据你的 JavaScript 库的具体情况，继续添加其他需要的类型定义。

编写 .d.ts 文件时，你可以参考 JavaScript 库的文档、源代码或其他可用的类型定义文件。你还可以使用工具如 dts-gen 来自动生成初始的 .d.ts 文件，并根据需要进行修改和完善。

请注意，编写 .d.ts 文件需要一定的 TypeScript 知识和对 JavaScript 库的理解。如果你对 JavaScript 库的类型定义不确定，可以参考已有的类型定义文件或向社区寻求帮助。

## dts-gen 命令行如何为项目中安装的非全局npm包生成d.ts文件

**回答**

要为项目中安装的非全局 npm 包生成 .d.ts 文件，你可以使用 dts-gen 命令行工具。下面是一些步骤来生成 .d.ts 文件：

1. 首先，确保你已经在项目中安装了 dts-gen。你可以使用以下命令进行全局安装：

```
npm install -g dts-gen
```

2. 然后，进入你的项目目录，并确保你已经安装了需要生成 .d.ts 文件的 npm 包。你可以使用以下命令进行安装，以 `your-package` 为例：

```
npm install your-package
```

3. 接下来，使用 dts-gen 命令行工具来生成 .d.ts 文件。你可以使用以下命令：

```
dts-gen -m your-package
```

这将在当前目录下生成一个名为 `your-package.d.ts` 的文件，其中包含了从 `your-package` 包中推断出的类型定义。

请注意，dts-gen 工具是根据运行时对象的形状来生成类型定义的，因此生成的 .d.ts 文件可能会包含一些 `any` 类型。你可能需要手动修改生成的文件，以提供更准确的类型定义。

希望这可以帮助你生成所需的 .d.ts 文件！

