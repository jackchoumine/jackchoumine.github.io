# git 提交规 -- 约定式提交

> 意义及现状

在使用git作为版本控制工具时候，有时候需要查看历史提交记录，这时候就需要查看提交信息。

如果提交信息规范，那么查看起来就会更加方便，而且也能够更好的了解提交的内容。但是在实际开发中，提交信息并不规范，就会造成查看提交记录时候的不便，**难以从提交信息中了解做了什么修改**。要是能规范提交信息，那么就能够更好的了解提交的内容，也能够更好的管理项目。

![vue3的提交记录](https://cdn.jsdelivr.net/npm/zqj-pics/js/git-commit-2024-08-09_02-53-27.png)

vue3 的提交记录，就非常规范，从提交信息中就能够了解到做了什么修改。

## 约定式提交规范

开源社区经过讨论，制定了一套规范的提交格式，称为 [约定式提交规范（Conventional Commits）](https://www.conventionalcommits.org/zh-hans/v1.0.0/)。

它是一种格式约定，方便工具和人阅读提交信息，通过约定提交信息，能清晰的知道修改的目的和内容。

### 约定式提交规范的格式

```bash
<类型>[可选 修改范围]: <描述>

[可选 正文]

[可选 脚注]
```

建议只有**类型**和**描述**是必填的，其他部分是可选的。这些类型是建议的，不是强制的，可以根据项目实际情况自定义。

> 类型后面的 `:` 是必须的，冒号后面有一个空格。

> 常见的提交类型有：

```bash
feat:  新功能 feature，对应 minor版本升级
fix:  修复 bug，对应 patch 版本升级
style:  仅对代码格式(换行、空格、缩进等)的调整，不影响代码的执行逻辑和变量含义
refactor:  重构，既不增加新功能，也不是修复bug，保证对外接口不变，修改内部实现，比如调整分支结构、重命名变量等
perf:  性能优化，降低内存占用和执行时间等，保证对外接口不变，重构也可能是性能优化的一部分
test:  修改测试，比如增加用例，修改测试代码等
merge:  合并分支
docs:  更新文档，比如 README.md、CHANGELOG.md 和注释等
build:  修改构建系统，比如修改 webpack 配置，增加构建相关依赖等
ci:  修改 CI/CD 配置，比如修改 travis 配置等
revert:  git 版本回退, 用于撤销之前的提交，通常推荐在脚注中写明被撤销的提交信息
chore:  其他非业务性改动，比如修改 gitignore 文件、编辑器配置和代码规范检查等
```

> 不区分大小写，但是建议使用小写。

### 约定式提交有哪些好处？

1. 对人类友好，方便阅读，方便回溯；
2. 对工具友好，可以根据提交信息自动生成 Change log；
3. 包含了语义化的信息，从提交信息中可推断代码修改意图，方便代码评审；
4. 提交信息和语义化版本号关联，方便版本管理：fix 提交对应`patch`升级，feat 提交对应`minor`升级，BREAKING CHANGE 对应`major`版本升级。
5. 避免了杂乱无章的提交信息，促使我们做出更有组织的提交和 PR，保证项目长期的快速演进。

### 提交信息和语义化版本号是如何关联的？

`语义化版本号` 是一个三位数字，分别表示 `major` 、 `minor` 和 `patch` 版本号，比如 `1.2.3` 。

1. fix 类型提交对应 `patch` 版本升级，比如 `1.2.3` -> `1.2.4` ；
2. feat 类型提交对应 `minor` 版本升级，比如 `1.2.3` -> `1.3.0` ；
3. 如果提交信息中包含 `BREAKING CHANGE` ，对应 `major` 版本升级，比如 `1.2.3` -> `2.0.0` 。

只有这三种类型的提交会版本号升级，其他类型的提交不会触发版本号升级， `只有这三种提交都修改了对外接口` 。

### 如何在提交信息中标记 `BREAKING CHANGE` ？

两种方式：

1. 使用`!`

在类型后面加上 `!` ，表示这是一个 `BREAKING CHANGE` ，比如 `feat!` 、 `fix!` 。

```bash
feat!: 新增了一个功能，这是一个破坏性变更
fix!: 修复了一个 bug，这是一个破坏性变更
```

> `!` 在类型和 `:` 之间，没有空格。

2. 在脚注中写明 `BREAKING CHANGE` ，并描述具体的变更内容。

```bash
feat: allow provided config object to extend other configs

BREAKING CHANGE: 在脚注中说明是一个破坏性变更，描述具体的变更内容
```

> BREAKING CHANGE 必须大写，有空格。

> 同时包含 `!` 和 `BREAKING CHANGE` ，也是可以的。

```bash
feat!: allow provided config object to extend other configs

BREAKING CHANGE: 在脚注中说明是一个破坏性变更，描述具体的变更内容
```

### 如何在提交信息中标记 `关闭 issue` ？

在脚注中写明 `Closes #issueNumber` ，表示提交信息解决了某个 issue 。

```bash
fix: 用户登录失败

Closes: #123, #245
```

### 每次编写这样的提交信息，是不是很麻烦？

是的，每次编写这样的提交信息，是很麻烦的，但是我们可以使用工具来帮助我们生成这样的提交信息。

## 如何在项目开发中使用约定式提交规范？

社区有很多工具能帮助我们实现约定式提交规范，减少手动编写提交信息的工作量。

### 使用 `commitizen` 和 `cz-customizable` 实现交互式提交

`commitizen` 是一个工具，可以帮助我们生成符合约定式提交规范的提交信息，并不指定提交信息的格式，而是提供了一些交互式的命令，帮助我们编写符合规范的提交信息。用 `git cz` 或者 `cz` 命令代替 `git commit` 命令，就可以使用交互式的方式编写提交信息。

它只提供默认的约定是提交格式，通过适配器来指定提交信息的格式，方便扩展。

`cz-customizable` 是一个适配器，实现自定义提交信息。

有很多适配器可以选择，比如、 `cz-jira-smart-commit` 、 `cz-emoji` 等，[适配器列表](https://github.com/commitizen/cz-cli?tab=readme-ov-file#adapters)

安装依赖：

```bash
npm i -D commitizen cz-customizable
```

执行命令：

```bash
npx commitizen init cz-customizable
```

> 作用是指定提交格式，会在 package.json 中添加如下选项：

```json
{
 "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
}
```

> 验证配置是否成功

执行 `git cz` ，会出现交互式提交信息的界面。

> 自定义约定式提交格式

新建 `.cz-config.cjs` ：

```js
// src/.cz-config.cjs
module.exports = {
  types: [{
      value: 'feat',
      name: '    feat: 新增功能'
    },
    {
      value: 'fix',
      name: '     fix: 修复问题'
    },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
    },
    {
      value: 'perf',
      name: '    perf: 性能优化(类似重构，不改变接口，比如：减少内存占用、增加缓存)',
    },
    {
      value: 'merge',
      name: '   merge: 合并分支'
    },
    {
      value: 'test',
      name: '    test: 增加或者修改测试'
    },
    {
      value: 'format',
      name: '  format: 格式化代码(不影响代码运行的变动，仅仅修改代码格式)',
    },
    {
      value: 'docs',
      name: '    docs: 文档变更(文档变更、代码注释等)'
    },
    {
      value: 'revert',
      name: '  revert: 版本回滚'
    },
    {
      value: 'build',
      name: '   build: 构建相关的改动'
    },
    {
      value: 'ci',
      name: '      ci: ci/cd相关的配置改动'
    },
    {
      value: 'chore',
      name: '   chore: 其他改动非 src 或测试的改动'
    },
    {
      value: 'release',
      name: ' release: 发布版本'
    },
  ],
  // override the messages, defaults are as follows
  messages: {
    type: '请选择提交类型:',
    // scope: '请输入文档修改范围(可选):',
    // used if allowCustomScopes is true
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选，待优化去除，跳过即可):',
    // breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: '请输入要关闭的issue(待优化去除，跳过即可):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
  },
  allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['scope', 'body', 'footer'],
  // limit subject length, commitlint默认是72
  subjectLimit: 72,
}
```

指定配置文件：

```json
{
  "config": {
    "cz-customizable": {
      "config": "./.cz-config.cjs"
    }
  }
}
```

执行 `git cz` ，会出现交互式提交信息的界面，上下键选择，回车进入下一个交互。

### 根据提交信息自动生成 Change log

安装依赖：

```bash
npm i -D release-it @release-it/conventional-changelog
```

创建配置文件 `release-it.json` ：

```json
{
  "$schema": "https://unpkg.com/release-it/schema/release-it.json",
  "github": {
    "release": true
  },
  "git": {
    "commitMessage": "release: v${version}"
  },
  "npm": {
    "publish": false
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "infile": "CHANGELOG.md",
      "ignoreRecommendedBump": true,
      "strictSemVer": true,
      "preset": {
        "name": "conventionalcommits",
        "types": [
          {
            "type": "feat",
            "section": "✨新增功能"
          },
          {
            "type": "fix",
            "section": "🐛修复bug"
          },
          {
            "type": "docs",
            "section": "📚更新文档"
          },
          {
            "type": "BREAKING CHANGE",
            "section": "💥重大变更"
          }
        ]
      }
    }
  }
}
```

验证配置是否成功：

```bash
npx release-it --dry-run # --dry-run 表示不发布
```

没有什么问题，就可以发布了：

```bash
npx release-it
```

### 使用 commitlint 和 husky 检查提交信息是否符合规范

为了实现规范，我们使用 `commitlint` 和 `husky` 来进行提交检查，当执行 git commit 时会在对应的 git 钩子上做校验，只有符合格式的 commit message 才能提交成功。

> 安装依赖

```bash
npm i -D husky  @commitlint/cli @commitlint/config-conventional
```

> 配置规则

在项目根目录添加规则 `commitlint.config.cjs` ：

```js
// src/commitlint.config.cjs
const czConfig = require('./.cz-config.cjs')
const types = czConfig.types.map(item => item.value)
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义
    'type-enum': [
      2, // 2 表示必须
      'always',
      types // 从配置文件中读取类型，方便保持两个始终一样
    ],
    // subject 大小写不做校验
    'subject-case': [0],
  },
}
```

> 配置 git hook 检查提交信息

执行 `npx husky init` , 会生成 `.husky` 文件夹，里面有 git 钩子的配置文件。

执行 `echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg` , 删除 `pre-commit` 文件内的 `npm` 。

> 验证配置是否可用：

```bash
git add .
```

```bash
git commit -m 'foo: 一定会提交失败'
```

要是提交失败，说明检查生效。

再提交一次，使其检查通过：

```git
git cz 
```

> husky 4 的设置不同, 比如 `^4.3.8`

在 `package.json` 文件中增加相关配置

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

或者 `.huskyrc.js`

```js
module.exports = {
  hooks: {
    // git commit 前的钩子
    'pre-commit': 'lint-staged',
    // 检查 git 提交信息
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
}
```

### 一些疑问

> merge 能否通过检查？

可以。

> 如何添加 emoji ？

可以使用 `cz-emoji` 适配器，它提供了 emoji 的选择，可以根据 emoji 来选择提交类型。

> 一个功能，多个提交信息，支持在日志记录合并显示吗？

目前不支持，每次提交都会生成一条记录。**推荐把功能拆分成独立的功能，分别开发和提交**。

## 参考

* [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

* [超详细的Git提交规范引入指南](https://juejin.cn/post/6844903793033756680)
