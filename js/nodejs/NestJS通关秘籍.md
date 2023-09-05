# Nest 通关秘籍

# 3 快速掌握 Nest CLI

```sh
npm install -g @nestjs/cli

nest new 项目名
```



# 5 种 HTTP 数据传输方式

dto 是 data transfer object，就是用于封装传输的数据的对象：

# 12 Nest 如何自定义装饰器

```typescript
import { SetMetadata } from '@nestjs/common';

export const Aaa = (...args: string[]) => SetMetadata('aaa', args);
```

`export const Aaa = (...args: string[]) => SetMetadata('aaa', args);`：在这里，你创建了一个名为 `Aaa` 的自定义装饰器。这个装饰器接受任意数量的字符串参数（`...args: string[]`），然后使用 `SetMetadata` 函数将元数据键 `'aaa'` 与提供的参数关联起来。