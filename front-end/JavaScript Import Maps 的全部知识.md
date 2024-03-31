# 关于JavaScript Import Maps 你需要知道的全部知识

https://www.honeybadger.io/blog/import-maps/

当 [ES 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)在 [ECMAScript 2015](https://262.ecma-international.org/6.0/) 中首次引入作为 JavaScript 中标准化模块系统的一种方式时，它通过在导入语句中强制指定相对或绝对路径来实现。

```javascript
import dayjs from "https://cdn.skypack.dev/dayjs@1.10.7"; // ES 模块

console.log(dayjs("2019-01-25").format("YYYY-MM-DDTHH:mm:ssZ[Z]"));
```

这与其他常见模块系统（如 CommonJS）以及使用像 [webpack](https://webpack.js.org/) 这样的模块打包工具中模块的工作方式略有不同，后者使用了更简单的语法：

```javascript
const dayjs = require('dayjs') // CommonJS

import dayjs from 'dayjs'; // webpack
```

在这些系统中，导入指定符通过 Node.js 运行时或所使用的构建工具映射到特定（及版本化的）文件。用户只需要在导入语句中应用裸模块指定符（通常是包名称），模块解析的问题将自动处理。

由于开发人员已经熟悉了从 npm 导入包的这种方式，需要一个构建步骤来确保以这种方式编写的代码能够在浏览器中运行。[import maps](https://github.com/WICG/import-maps)解决了这个问题。基本上，它允许将导入指定符映射到相对或绝对 URL，这有助于在不应用构建步骤的情况下控制模块的解析。

## Import Maps 的工作原理

```html
<script type="importmap">
{
  "imports": {
    "dayjs": "https://cdn.skypack.dev/dayjs@1.10.7",
  }
}
</script>
<script type="module">
  import dayjs from 'dayjs';

  console.log(dayjs('2019-01-25').format('YYYY-MM-DDTHH:mm:ssZ[Z]'));
</script>
```

Import Map通过 HTML 文档中的 `<script type="importmap">` 标签指定。该脚本标签必须放置在文档中第一个 `<script type="module">` 标签之前（最好放在 `<head>` 中），以便在执行模块解析之前对其进行解析。此外，目前每个文档只允许一个Import Map，尽管未来有计划取消这个限制。

在 `<script>` 标签内部，使用 JSON 对象来指定文档中脚本所需的所有模块的映射。典型Import Map的结构如下所示：

```html
<script type="importmap">
{
  "imports": {
    "react": "https://cdn.skypack.dev/react@17.0.1",
    "react-dom": "https://cdn.skypack.dev/react-dom",
    "square": "./modules/square.js",
    "lodash": "/node_modules/lodash-es/lodash.js"
  }
}
</script>
```

在上述的 `imports` 对象中，每个属性对应一个映射。映射的左侧是导入指定符的名称，而右侧是该指定符应映射到的相对或绝对 URL。在映射中指定相对 URL 时，请确保它们始终以 `/`、`../` 或 `./` 开头。请注意，Import Map中存在的包并不一定意味着浏览器将加载它。如果页面上的脚本未使用的模块将不会被浏览器加载，即使它在Import Map中存在。

```html
<script type="importmap" src="importmap.json"></script>
```

除了在 `<script type="importmap">` 标签内直接定义映射之外，你还可以将映射指定在一个单独的外部文件中。然后，使用 `src` 属性在 `<script type="importmap">` 标签中引用该外部文件（正如上文所示）。

如果你选择使用这种外部文件的方式，请确保该文件的 `Content-Type` 头设置为 `application/importmap+json`。需要注意的是，出于性能方面的原因，**推荐使用内联的方式定义映射**，本文后续示例也将采用这种方式。

一旦你指定了映射，就可以在 `import` 语句中使用模块标识符，如下所示：

```html
<script type="module">
  import { cloneDeep } from 'lodash';

  const objects = [{ a: 1 }, { b: 2 }];

  const deep = cloneDeep(objects);
  console.log(deep[0] === objects[0]);
</script>
```

需要注意的是，Import Map中的映射不会影响 `<script>` 标签的 `src` 属性等位置中的 URL。因此，如果您使用类似 `<script src="/app.js">` 这样的内容，浏览器将尝试在该路径下载一个字面上的 `app.js` 文件，而不管Import Map中是否存在相关映射。

## 将标识符映射到整个包

除了将标识符映射到单个模块之外，还可以将其映射到包含多个模块的包。这可以通过使用以斜杠结尾的标识符键和路径来实现。

```html
<script type="importmap">
{
  "imports": {
    "lodash/": "/node_modules/lodash-es/"
  }
}
</script>
```

这种技术允许你在指定路径中导入任何模块，而不是整个主模块，这样可以避免浏览器下载所有组件模块。

```html
<script type="module">
  import toUpper from 'lodash/toUpper.js';
  import toLower from 'lodash/toLower.js';

  console.log(toUpper('hello'));
  console.log(toLower('HELLO'));
</script>
```

## 动态构建Import Maps

映射也可以根据任意条件在脚本中动态构建，并且此功能可用于根据特征检测有条件地导入模块。下面的示例根据 IntersectionObserver API 是否受支持来选择要在 lazyload 指定符下导入的正确文件。

```html
<script>
  const importMap = {
    imports: {
      lazyload: 'IntersectionObserver' in window
        ? './lazyload.js'
        : './lazyload-fallback.js',
    },
  };

  const im = document.createElement('script');
  im.type = 'importmap';
  im.textContent = JSON.stringify(importMap);
  document.currentScript.after(im);
</script>
```

如果你想使用此方法，请确保在创建和插入Import Map脚本标签之前执行此操作（如上所示），因为修改已存在的Import Map对象将不会产生任何效果。

## 通过映射消除哈希以提高脚本可缓存性

实现静态文件的长期缓存的[常用技术](https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching)是在它们的名称中使用文件内容的哈希，以便文件在内容发生更改之前保留在浏览器缓存中。当发生这种情况时，文件将获得一个新名称，以便应用程序立即反映最新更新。

使用传统的脚本打包方式，如果更新了多个模块依赖项依赖的依赖项，则该技术可能会出现问题。这将导致所有依赖于该依赖项的文件都将被更新，这会迫使浏览器重新下载它们，即使只更改了一个字符的代码也是如此。

Import Map通过允许通过重新映射技术单独更新每个依赖项来解决此问题。假设你需要从名为 post.bundle.8cb615d12a121f6693aa.js 的文件中导入一个方法，则可以使用类似以下内容的Import Map：

```html
<script type="importmap">
  {
    "imports": {
      "post.js": "./static/dist/post.bundle.8cb615d12a121f6693aa.js",
    }
  }
</script>
```

而不是编写如下语句：

```javascript
import { something } from './static/dist/post.bundle.8cb615d12a121f6693aa.js'
```

你可以编写以下内容：

```javascript
import { something } from 'post.js'
```

当更新文件时，只需更新Import Map即可。由于其导出的引用不会更改，因此它们将保留在浏览器中的缓存中，而由于更新了哈希，更新的脚本将再次被下载。

```html
<script type="importmap">
  {
    "imports": {
      "post.js": "./static/dist/post.bundle.6e2bf7368547b6a85160.js",
    }
  }
</script>
```

## 使用同一模块的多个版本

使用Import Map很容易要求同一软件包的多个版本。你只需要在映射中使用不同的导入指定符，如下所示：

```html
<script type="importmap">
  {
    "imports": {
      "lodash@3/": "https://unpkg.com/lodash-es@3.10.1/",
      "lodash@4/": "https://unpkg.com/lodash-es@4.17.21/"
    }
  }
</script>
```

你还可以通过使用作用域来使用相同的导入指定符来引用同一软件包的不同版本。这使你可以在给定范围内更改导入指定符的含义。

```html
<script type="importmap">
  {
    "imports": {
      "lodash/": "https://unpkg.com/lodash-es@4.17.21/"
    },
    "scopes": {
      "/static/js": {
        "lodash/": "https://unpkg.com/lodash-es@3.10.1/"
      }
    }
  }
</script>
```

使用此映射，任何路径为 /static/js 的模块在引用 import 语句中的 lodash/ 指定符时将使用 https://unpkg.com/lodash-es@3.10.1/ URL，而其他模块将使用 https://unpkg.com/lodash-es@4.17.21/。

## 使用Import Map与 NPM 包

正如本文所示，任何使用 ES 模块的 NPM 包的生产就绪版本都可以通过 [ESM](https://esm.sh/)、[Unpkg](https://unpkg.com/) 和 [Skypack](https://www.skypack.dev/) 等 CDN 在你的Import Map中使用。即使 NPM 上的软件包并不是为 ES 模块系统和原生浏览器导入行为而设计的，Skypack 和 ESM 这样的服务也可以将它们转换为可以在Import Map中使用的形式。你可以在 Skypack 的首页上使用搜索栏找到经过优化以供浏览器直接使用的 NPM 包，而无需繁琐的构建步骤。

## 以编程方式检测Import Map支持

要在浏览器中检测导入映射的支持，只要支持 [HTMLScriptElement.supports()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/supports) 方法就可以实现。以下代码片段可以用于此目的：

```javascript
if (HTMLScriptElement.supports && HTMLScriptElement.supports('importmap')) {
  // 支持Import Map
}
```

## 支持旧版浏览器

![](https://www.honeybadger.io/images/blog/posts/import-maps/import-maps.png?1711762046)

Import Map在 caniuse.com 上的支持情况

Import Map使得在浏览器中可以使用裸模块指定符，而无需依赖当前 JavaScript 生态系统中普遍存在的复杂构建系统，但目前在网络浏览器中的支持并不广泛。截至撰写本文时，Chrome 和 Edge 浏览器的版本 89 及更高版本提供了完整的支持，但 Firefox、Safari 和一些移动浏览器不支持此技术。为了在此类浏览器中保持对Import Map的使用，必须使用适当的 polyfill。

可以使用的一个示例 polyfill 是 ES Module Shims polyfill，它为具有 ES 模块基线支持的任何浏览器（约占浏览器总数的 94%）添加了对Import Map和其他新模块功能的支持。你只需要在Import Map脚本之前在 HTML 文件中包含 es-module-shim 脚本：

```html
<script async src="https://unpkg.com/es-module-shims@1.3.0/dist/es-module-shims.js"></script>
```

在这些浏览器中，即使包含了 polyfill，你仍可能在控制台中收到 JavaScript TypeError。可以安全地忽略此错误，因为它不会对用户产生任何影响。

```plaintext
Uncaught TypeError: Error resolving module specifier “lodash/toUpper.js”. Relative module specifiers must start with “./”, “../” or “/”.
```

你可以在其 GitHub 仓库中找到与Import Map相关的其他 polyfill 和工具。

## 结论

Import Map提供了一种更合理的方式，在浏览器中使用 ES 模块，而不局限于从相对或绝对 URL 导入。这使得你可以轻松移动代码，而无需调整导入语句，并且使得对单个模块进行更新更加无缝，而不会影响依赖于这些模块的脚本的可缓存性。总的来说，Import Map使得在服务器和浏览器中使用 ES 模块的方式更加一致。

你是否会使用Import Map来替换或补充当前的构建系统？请在 Twitter 上告诉我你做出这个决定的原因。

感谢阅读，祝你编码愉快！