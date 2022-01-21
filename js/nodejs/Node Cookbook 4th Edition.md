

# 2 Handling I/O  

`process.cwd()`  is a function on the global process object that returns the current directory of the Node.js process.  



The asynchronous version of `readFileSync()` is `readFile()`.   

30

### Using the fs Promises API  

1. To use the API, you'll first need to import it:  

```js
const fs = require("fs").promises;
```

## 检查文件元数据

### 还有更多

#### Checking file access  

如果只是想检查文件是否存在，则可以使用 `fs.access()` 或 `fs.accessSync()` APIs。

**Important note**  

有一个现在已弃用的旧 API，称为 `fs.exists()`。 不建议使用此函数 — 应改用 `fs.access()` API。

#### Modifying file permissions  

`chmod()`, and an equivalent synchronous API, `chmodSync()`.   

