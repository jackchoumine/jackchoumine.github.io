# 最常用的配置项

```js
// .prettierrc.cjs
module.exports = {
  semi: false, // 默认 true
  printWidth: 100, // 行宽 默认 80
  singleQuote: true, // 字符串使用单引号 默认为 false
  arrowParens: 'avoid', // 箭头函数只有一个参数时，是否给括号 js：avoid ts : always
  bracketSameLine: false, // jsx 开头标签的 > 和 < 是否在同一行
  jsxSingleQuote: true, // 在 jsx 中使用单引号
  embeddedLanguageFormatting: 'auto',
}
```

> webStorm 编辑器只支持 `.prettierrc.` 配置文件，为了团队协作中使用 webStorm 的队友能使用 prettier 进行代码格式化，建议使用 `.prettierrc.` 配置文件。

## 在提交之前执行有改动的文件

使用 `lint-staged` 和 `simple-git-hooks` 进行提交前的代码检查和格式化。

```bash
pnpm i -D lint-staged simple-git-hooks
```

在 `package.json` 中添加以下配置：

```json
{
  "scripts": {
    "postinstall": "npx simple-git-hooks"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,css,scss,less,html}": ["prettier --write"]
  },
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  }
}
```

> pretty-quick 也能起到类似 lint-staged + simple-git-hooks 的作用，但 lint-staged 更加灵活，支持多种文件类型的格式化。

## 依赖分组

prettier 插件`'@trivago/prettier-plugin-sort-imports'` 能按照依赖距离进行分组，使用时需要安装以下依赖：

```bash
pnpm i -D @trivago/prettier-plugin-sort-imports
```

配置：

```js
module.exports = {
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  // 排序规则
  importOrder: [
    '^@/(.*)$',
    '^#c/(.*)$',
    '^../(.*)',
    '^./((?!scss).)*$',
    '^./(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
```

以便阅读代码时不关注第三方依赖，比如 vue 的依赖。

> 分组后，会改变依赖导入的顺序，若依赖导入顺序很关键，比如 vue 项目的 main 文件，通常 vue 的依赖必须在第一个导入，建议把 main加入 `.prettierignore` 文件。
