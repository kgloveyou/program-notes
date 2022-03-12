# yeoman-generator

https://yeoman.io/generators/

## 四、Yeoman：一个通用的脚手架系统

https://juejin.cn/post/6966119324478079007#heading-39



## apulis-frontend-cli

generators\app\index.js

路径：E:\apulis\work_repos\apulis-frontend-cli\generators\app\index.js

```js
'use strict';
const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    this.argument('project', {
      type: String,
      required: false
    });

    this.name = path.basename(process.cwd());
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'project',
      message: 'Your project name',
      default: this.name
    }]).then(answers => {
      this.project = answers.project || this.options.project;
      this.log('project', this.project);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('./'),
      this.destinationPath('./'), {
        project: this.project,
      }, {}, {
        globOptions: {
          dot: true
        }
      }
    );
  }
};
```

