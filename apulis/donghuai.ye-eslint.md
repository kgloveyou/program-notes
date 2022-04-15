## eslint 配置

.eslintrc.js中配置规则：

```js
  rules: {
    'object-curly-newline': 'off',
    'object-shorthand': 'off',
    'no-unused-expressions': ["error", { "allowShortCircuit": true }],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-param-reassign': 'off',
    'no-return-await': 'off',
    'prefer-destructuring': 'off',
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    "no-shadow": "off",
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    // 新增
    'import/no-mutable-exports': 'error',
    'import/no-commonjs': 'off',
    'import/no-amd': 'error',
    'import/no-nodejs-modules': 'error',
    'no-confusing-arrow': ['error', {
        'allowParens': true
    }],
    'no-unused-vars': 'warn',
    'react/forbid-prop-types': 'off',
    'array-callback-return': 'warn',
    'react/jsx-sort-props': 'off',
    'no-console': 'warn',
    'object-curly-spacing': ['error', 'always'],
    'no-invalid-this': 'off',
    'indent': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'space-before-function-paren': 'off',
    'react/jsx-no-bind': 'off',
    'no-alert': 'off',
    "import/no-unresolved": 'off',
    'import/no-nodejs-modules': 'off',
    'no-warning-comments': 'off',
    'react/no-deprecated': 'off',
    'react/jsx-handler-names': 'off',
    "linebreak-style": [0 ,"error", "windows"], 
    "@typescript-eslint/no-unused-vars": 1,
    "no-plusplus": 0,
    "react/no-unused-prop-types": 1,
    "indent": ["error",2,{"SwitchCase":1}]
  }
```
*欢迎大家补充*

## package.json 新增指令
```js
  "lint--fix": "eslint src/.  --ext .js,.jsx,.tsx,.ts --fix --quiet"
```

## 保存自动格式化（项目代码中未采用）
### setting.json 新增

```js
    // 自动格式化
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescriptreact",
        "html",
    ],
```

## git 提交时自动启动 eslint --fix

### 工具下载
```js
    npm install pre-commit --save-dev
    npm install lint-staged --save-dev
```

### package.json 配置 
```js
"scripts": {
    "lint:staged": "lint-staged"
}

"lint-staged": {
    "src/**": [
      "yarn lint--fix"
    ]
  }

"pre-commit": "lint:staged",
```

## cz-customizable + commitizen git commit message 规范配置

`cz-customizable`是`commitizen` 的一个插件。（https://github.com/leoforfree/cz-customizable）

```js
npm install -g @commitlint/cli @commitlint/config-conventional
npm i cz-customizable --save-dev -g
```

### 新增commitlint.config.js 文件

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // Level [0..2]: 0 disables the rule. For 1 it will be considered a warning for 2 an error.
      'always', // Applicable always|never: never inverts the rule.
      [
        'wip', // 正在进行中, 临时commit
        'feat', // 新功能
        'fix', // 修bug
        'docs', // 文档
        'style', // 修改代码格式
        'refactor', // 代码重构
        'improvement', // 提升性能的更改
        'test', // 修改测试用例
        'revert', // 版本回退
        'ci', // 修改持续化集成配置
        'chore', // 杂项
        'build' // 变更项目构建或外部依赖
      ]
    ],
    'type-empty': [2, 'never'], // 类型不能为空
    'scope-empty': [1, 'never'], // 影响范围不能为空, 视项目情况提高级别
    'scope-enum': [0, 'always', []], // 影响范围枚举, 视项目情况开启
    'subject-empty': [2, 'never'], // 简短说明不能为空
    'subject-max-length': [2, 'always', 50] // 简短说明不能超过50个字符
  }
}
```

**备注：**

这里的配置不对吧？参见：https://kisstar.xyz/notebook/project/basis/commit-lint.html#%E8%87%AA%E5%AE%9A%E4%B9%89-adapter

当我们使用 `cz-customizable` 做了违背 Angular 风格的提交说明时，就需要使用 `commitlint-config-cz` 而不是 `@commitlint/config-conventional` 规则对其进行校验。

https://www.npmjs.com/package/commitlint-config-cz



```bash
commitlint-config-cz
```

在 `commitlint` 的配置文件中配置：

```js
module.exports = {
  extends: ['cz'],
}
```

### 新增 cz-config.js 文件

```js 
module.exports = {
  types: [
    {
      value: 'wip',
      name: '🚧wip:          进行中...'
    },
    {
      value: 'feat',
      name: '🎉feat:         新增功能'
    },
    {
      value: 'fix',
      name: '🐛fix:          修复BUG'
    },
    {
      value: 'style',
      name: '🎨style:        修改代码格式'
    },
    {
      value: 'ci',
      name: '👷‍ci:           修改持续化集成配置'
    },
    {
      value: 'refactor',
      name: '👍refactor:     代码重构'
    },
    {
      value: 'improvement',
      name: '🚀improvement:  提升性能'
    },
    {
      value: 'docs',
      name: '📓docs:         修改文档'
    },
    {
      value: 'test',
      name: '✅test:         修改测试用例'
    },
    {
      value: 'build',
      name: '🔨build:        变更项目构建或外部依赖'
    },
    {
      value: 'revert',
      name: '⏪revert:       版本回退'
    },
    {
      value: 'chore',
      name: '💩chore:        杂项'
    }
  ],
  scopes: [
    { name: 'view:main' },
    { name: 'view:plugins' },
    { name: 'Api' },
    { name: 'other' }
  ],
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',
  messages: {
    type: '(必填)选择您要提交的更改类型:',
    scope: '(必填)更改的范围:',
    // used if allowCustomScopes is true
    customScope: '(必填)更改的范围:\n',
    subject: '(必填)撰写简短的变更描述:\n',
    body: '(选填)撰写更改的详细描述, 使用"|"换行:\n',
    breaking: '(选填)不兼容变动:\n',
    footer: '(选填)要关闭的issue列表, 例: #31, #34:\n',
    confirmCommit: '🚨确认以上Commit-Message'
  },
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100
}
```



### package.json 增加配置 
```js
"cz": "git cz",
"c": "git add . && git cz" // 提交指令

"config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }

  "husky": {
    "hooks": {
      "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
    }
  },
```

### 效果图

首先安装`commitizen`，https://www.npmjs.com/package/commitizen

```
npm install -g commitizen
```

Simply use `git cz` or just `cz` instead of `git commit` when committing.



项目使用

```js
PS F:\workSpeace\apharbor-frontend> yarn c
$ git add . && git cz
cz-cli@4.2.4, cz-customizable@6.3.0

All lines except first will be wrapped after 100 characters.
? (必填)选择您要提交的更改类型: (Use arrow keys)
> 🚧wip:          进行中...
  🎉feat:         新增功能
  🐛fix:          修复BUG
  🎨style:        修改代码格式
  👷‍ci:           修改持续化集成配置
  👍refactor:     代码重构
  🚀improvement:  提升性能
(Move up and down to reveal more choices)

```
```js
? (必填)更改的范围: (Use arrow keys)
> view:main
  view:plugins
  Api
  other
```
```JS
All lines except first will be wrapped after 100 characters.
? (必填)选择您要提交的更改类型: 🐛fix:          修复BUG
? (必填)更改的范围: view:main
? (必填)撰写简短的变更描述:
 message
? (选填)撰写更改的详细描述, 使用"|"换行:

? (选填)不兼容变动:

? (选填)要关闭的issue列表, 例: #31, #34:


###--------------------------------------------------------###
fix(view:main): message
###--------------------------------------------------------###

? 🚨确认以上Commit-Message (Yneh)
```


## 总结
 *呼吁大家书写规范的提交说明，代码说明不规范，项目成员泪两行*