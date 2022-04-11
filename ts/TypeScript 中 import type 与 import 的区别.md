# TypeScript 中 import type 与 import 的区别

## 背景

这周遇到了一个比较奇怪的问题：如何在 TypeScript 中根据某个 enum 的取值来执行后续逻辑？

按理来说应该很简单，这是 enum 的定义：

```typescript
export enum MyEnum {
  DEFAULT = 0,
  SOME_VALUE = 1,
  SOME_OTHER_VALUE = 2,
}

```

然后在另一个项目中，通过 import type 来引入：

```typescript
import type { MyEnum } from 'somepackage';

const someFunction = (myEnum: MyEnum) => {
  if (myEnum === MyEnum.SOME_VALUE) {
  	// some logic here
    return
  }
  if (myEnum === MyEnum.SOME_OTHER_VALUE) {
    // some logic here
    return
  }
  // some logic here
  return
}

```

但是这个时候 VS Code 居然提示了一个错误：

```typescript
'MyEnum' cannot be used as a value because it was imported using 'import type'.ts(1361)
```


我的第一反应是，难道在 TypeScript 里不能检查 enum 的取值？这也太说不过去了吧…

后来折腾了半天，发现按照提示，把 `import type` 换成 `import` 就好了。


## `import type` vs `import`

之前没有深入学习过 TypeScript，就是看项目里别人怎么用，就照猫画虎地写。

这次也是一样，别人都是 `import type`，我就直接在其中加了一个我想引入的 `MyEnum`，结果就不行了，还得把 `MyEnum` 分开来用 `import`。

但这是为什么呢？后来搜了一下，终于弄明白了。TypeScript 3.8 文档上说：

> import type only imports declarations to be used for type annotations and declarations. It always gets fully erased, so there’s no remnant of it at runtime.

大概意思就是：**import type 是用来协助进行类型检查和声明的，在运行时是完全不存在的。**

这下终于明白上面 enum 的那个问题了：如果通过 `import type` 来引入 `MyEnum`，固然可以在构建时起到类型检查的作用，但在运行时 `MyEnum` 就不存在了，当然就无法检查 `MyEnum.SOME_VALUE` 之类的取值了！

可是仔细一想，TypeScript 本来就不应该在运行时存在呀！为什么还要用 `import type` 呢？

其实，在少部分情况下（刚好就包括 enum ），`import` 的内容在运行时的确是存在的，使用 `import type` 和`import` 就会有区别。

## 使用 `import type` 的好处

`import type` 是 TypeScript 3.8 才加入的，为什么要加入这个功能呢？使用 `import type` 而不是 `import` 有什么好处？

简单来说，大部分情况下用 `import` 完全就可以了，但在比较罕见的情况下，会遇到一些问题，这时候使用 `import type` 就可以解决问题了。

当然，我也没碰到过这样的问题，只不过项目里在所有引入 TypeScript 类型的地方用的基本都是 `import type`，也就跟着用了。这样当然是更保险一些，没啥坏处。
————————————————
版权声明：本文为CSDN博主「兜兜小猎犬」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/VoisSurTonChemin/article/details/122508528



[Do I need to use the "import type" feature of TypeScript 3.8 if all of my imports are from my own file?](https://stackoverflow.com/questions/61412000/do-i-need-to-use-the-import-type-feature-of-typescript-3-8-if-all-of-my-import)

*Short answer:* Being more explicit by using `import type` and `export type` statements seem to yield explicable benefits by **safeguarding against edge-case problems**, as well as **giving current and upcoming tooling better ground for improving processing performance and reliability with type definition analysis**.

> `import type` only imports declarations to be used for type annotations and declarations. **It always gets fully erased, so there’s no remnant of it at runtime.** Similarly, export type only provides an export that can be used for type contexts, and is also erased from TypeScript’s output.

