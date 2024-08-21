# 如何编写一个库

## 编写库流程有哪些？

想法（需求） -> 目标 -> 设计 -> 实现 -> 发布

> 更加规范的流程

想法（需求） -> 目标 -> 设计 -> 实现 -> **测试 ->** 发布 **-> 维护**

## 库的需求来自哪儿？

从哪儿获得灵感或需求？

* 从自己的项目中获得

平时在开发公司业务项目时，会遇到一些问题，可能是一些通用的问题，可以抽象出来，形成一个库。方便管理和使用，同时减少重复开发和重复代码。

* 从开源社区中获得

在开发过程中，会遇到一些优秀的库，但是这些库可能并不能完全满足我们的需求或者使用不方便，这时候可以在这些库的基础上进行**二次开发**，形成一个新的库。

* 灵光闪现的想法

有时候可能我们会突然有个想法，由于没时间立即去实现或者想法不够完善，就会先记录下来，等有时间了再来完善想法。

> 深复制使项目常见的操作，现在把这个需求抽象出来，形成一个库，方便使用。

## 库的目标是什么？

* 为什么要编写这个库？

> 学习编写 JS 库。

* 这个库的目标是什么？

> 实现一个**深复制库**，能满足不同的使用方式：script 引入、npm 下载和 ESM 引入。

> 提供 ESM，是希望能按需加载和 tree shaking。

## 库的设计是什么？

* 库的名称 `@jack/utils`

使用 ESM 模块编写，再使用 `rollup` 打包，输出 `umd` 模块、 `CJS` 模块和 `ESM` 模块。

## 如何实现这个库？

### js 的模块化方案有哪些？

模块的特点

* 独立性 -- 能独立完成某个功能，不受外部环境影响

* 完整性 -- 能完整的完成某个功能

* 可复用性 -- 能在不同的项目中使用

* 可依赖 -- 能依赖其他模块

* 被依赖 -- 能被其他模块依赖

> 模块是一个独立的空间，模块内部的变量、函数、类等都是私有的，不会污染全局作用域，同时模块内部的变量、函数、类等可以通过**导出**的方式暴露给外部使用。能引用其他模块，也能被其他模块引用。

js 常用得模块化方案，根据**使用方式**看，主要有三种

1. script 标签引入 -- IIFE 模块

```html
<script src="xxx.js"></script>
<script src="yyy.js"></script>
```

使用 `IIFE` 模块，即**立即调用函数表达式**，把库的接口挂载到全局对象(通常是 window)上，供外部使用

```js
;
(function(window) {
  function xxx() {
    // ...
  }
  window.xxx = xxx
})(window)
```

[mdn 更多信息](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)

这种方式，依赖关系和引入顺序相关，使用者需要手动管理依赖关系，不方便。

再者，这些库往往把**它的依赖**也打包到一起，导致库过大。

> UMD 模块，是一种兼容 AMD 、 CommonJS 和 IIFE 模块的规范，这种库可以在浏览器和 node 环境中使用。

2. npm 安装 -- cmj 或者 cjs 模块

开发者使用 `npm` 等依赖管理工具安装库， 通过 `package.json` 对库的依赖和版本进行说明，然后使用 `require` 引入，这种方式不需要手动管理依赖关系，但要求库遵循 `commonjs` 或者 `cmj` 规范编写，这种库不能直接在浏览器中使用，需要使用 `rollup` 、 `webpack` 等工具转换成浏览器支持的代码。

导出：

```js
function xxx() {
  // ...
}
module.exports = xxx
```

引入

```js
const yyy = require('xxx') // xxx 是库的名称 也可以是相对路径
```

cjs 的定义如下：

```js
define(function(require, exports, module) {
  // 模块代码
})
```

> define 包裹函数系统自动生成的，不需要我们手动添加，但是我们需要手动添加 `module.exports` ，这样才能导出模块。

3. rollup、webpack 等工具打包 -- ESM 模块

ESM 是 ES6 的模块化规范，使用 `import` 和 `export` 导入导出模块，这种库可以直接在浏览器中使用。

```html
<script type="module" src="xxx.js"></script>
```

使用 `ESM` 规范

导出

```js
export default {
  // ...
}
export function xxx() {
  // ...
}
```

引入

```js
import xxx from 'xxx'
// 或者
import {
  xxx
} from 'xxx'
```

**打包工具**目前还是前端开发中必不可少的，使用 ESM，能充分使用这些工具的功能，比如摇树优化、代码压缩等，从而减少打包体积。

加载一个库时，这些工具会自动解析 `package.json` 中的 `type` 和 `module` 字段，type 字段为 `module` ， 表明是 `ESM` 规范的库， `module` 字段指定 ESM 的入口。type 为 `commonjs` ，表示是 cjs 模块， main 字段指定了 `CJS` 规范的库的入口文件。打包工具会根据这些信息，加载相关的文件。

> 由于历史原因，早些时候一些库使用 `jsnext` 指定 `ESM` 规范的库的入口文件，这个字段已经被 `module` 字段取代。

> [mdn 上关系 ESM 的更多信息](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)

为了满足不同的使用方式，需要借助一些工具，把库打包成不同的模块化规范，比如 `rollup` 、 `webpack` 等。

> 总结如下：

* IIFE 模块 -- 适用于浏览器环境，需要手动管理依赖关系，不推荐使用。

* cjs 模块 -- 适用于 node 环境，需要使用`rollup`、`webpack`等工具打包成浏览器可用的代码。

* ESM 模块 -- 适用于浏览器环境，可以直接使用，老的浏览器不支持 ESM，可用`rollup`、`webpack`等工具转换。

> 库需要提供不同的模块化规范，才能满足不同的使用场景。

| 使用方式 | 入口文件     | 模块规范 | 内部依赖 | 外部依赖 |
| -------- | ------------ | -------- | -------- | -------- |
| script   | index.umd.js | UMD      | 打包     | 打包     |
| node     | index.cjs.js | CJS      | 打包     | 不打包   |
| 打包工具 | index.js     | ESM      | 打包     | 不打包   |

> 既然 CJS 和 UMD 兼容，为何需要两者，因为 CJS 的条件导入更好。

```js
if (process.env.NODE_ENV === "production") {
  module.exports = require("my-lib.production.js");
} else {
  module.exports = require("my-lib.development.js");
}
```

上面的例子，当使用 CommonJS 模块时，只会引入 production 或 development 包中的一个。但是，对于 UMD 模块，最终可能会将两个包全部引入。

最后还需要注意是，开发者可能会在其应用中同时使用 cjs 和 esm，发生双包危险。[dual package hazard](https://github.com/nodejs/modules/issues/409) 一文介绍了一些缓解该问题的方法。利用 package.json 的 `exports` ，也可以帮助防止这种情况的发生。

### 实现代码

目录结构

```bash
├── README.md # 说明文档
├── build  # 打包配置
│   ├── rollup.config.es.js
│   ├── rollup.config.js
│   └── rollup.config.umd.js
├── dist # 打包输出
│   ├── index.cjs.js
│   ├── index.js
│   └── index.umd.js
├── clone.js
├── type.js
├── index.js  # 入口文件 从这里导出 API
├── index.html  # 用来测试 umd 模块的
└── package.json
```

> `clone.js`

```js
import {
  type
} from './type.js'
/**
 * 深度复制
 * @param {any} source
 * @returns
 */
function clone(source) {
  const t = type(source)
  if (!['object', 'array'].includes(t)) return source
  let target
  if (t === 'array') {
    target = []
    const len = source.length
    let i = 0
    while (i < len) {
      target[i] = clone(source[i])
      i++
    }
  } else if (t === 'object') {
    target = {}
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = clone(source[key])
      }
    }
  }
  return target
}

// 统一导出
export {
  clone
}
```

> `type.js` --- 一个内部依赖

```js
/**
 * 获取类型
 * @param {any} value 需要检查类型的值
 * @returns {string} 返回类型
 */
function type(value) {
  const typeStr = Object.prototype.toString.call(value)
  return typeStr.slice(8, -1).toLowerCase()
}

export {
  type
}
```

> `index.js` 库的入口

```js
export * from './clone'
```

> `build/rollup.config.js` cjs 打包输出配置

```js
import {
  terser
} from 'rollup-plugin-terser'

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
  },
  plugins: [terser()], // 压缩代码
}
```

> `build/rollup.config.es.js` es 打包输出配置

```js
export default {
  input: 'index.js',
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
}
```

> `build/rollup.config.umd.js` umd 打包输出配置

```js
export default {
  input: 'index.js',
  output: {
    file: 'dist/index.es.js',
    format: 'umd',
    name: 'jackUtils', // 指定全局变量的名字，浏览器环境下会挂载到 window 上，node 环境下会挂载到 global 上
    // 所有导出的函数、变量都会成为这个全局变量的属性
  },
}
```

 `package.json`

```json
{
  "name": "@jack/utils",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.cjs.js",
  "module": "dist/index.js",
  "files": ["dist"],
  "scripts": {
    "build:cjs": "rollup -c build/rollup.config.js",
    "build:umd": "rollup -c build/rollup.config.umd.js",
    "build:es": "rollup -c build/rollup.config.es.js",
    "build": "npm run build:cjs && npm run build:umd && npm run build:es"
  },
  "devDependencies": {
    "rollup": "3.5.1",
    "rollup-plugin-terser": "~7.0.2"
  },
  "keywords": ["clone", "deep clone", "deep copy"],
  "author": "jackchoumine <jackzhoumine@gmail.com;jackchou4job@163.com>",
  "license": "MIT"
}
```

以上就是打包一个 js 库的基本配置了。

<!--
* 选择合适的工具链

* 选择合适的语言

* 选择合适的工具

* 选择合适的框架

* 选择合适的依赖

* 选择合适的测试工具 -->

> 需要保留原始目录结构吗？

在输出目录中保留原始目录结构，可更加方便地标记 sideEffects，以及更好的 tree-shaking。

一个例外：创建一个不依赖任何打包工具的转换、直接在浏览器中使用的库（通常是 umd 格式，但也可能是现代的 esm 格式），最好让浏览器请求一个大文档，而不是请求多个小文档，就不要保留原始目录结构了。此外，应该进行代码压缩并为其创建 sourcemap。

> 要不要压缩代码？

需要。

> 需要 sourcemap 吗？

需要，因为它可以帮助你在生产环境中调试代码。

> 需要支持老的浏览器吗？

需要，尤其是使用了新的特性时。

原则：

* 当开发者使用你的库时，开发者能自行选择兼容的老版本浏览器；

* 输出多个产出，支持不同的浏览器。

> 如何兼容老版本浏览器呢？

几种方案：

1. 使用了 ts，tsconfig.json 的 target 设置成不同的值，能达到兼容的目的。

esnext，现代的 ESM 版本。

es5，兼容老板的 UMD 版本。

[How to publish to npm in 2023 --- add tsconfig](https://blog.taskli.st/posts/how-to-publish-to-npm-in-2023#3-add-typescript)

2. 使用 babel

<!-- 如何配置兼容设置？ -->

> UI 库，如何拆分 css，实现按需加载 css?

<!-- TODO 如何拆分 -->

创建 ui 库，关于 css 最简单的方式的提供单一的 css 文档，但是可能导致文件过大。

最好的方式：拆分 css 文件，让使用者可按需引入。

## 发布之前需要修改 package.json 的哪些字段？

在把库发布到[npm](https://npm.org)之前，最好完善 package.json，它对库至关重要。

重点关注这些字段。

### name 和 version --- 库的唯一标识

发布到 [npm](https://npm.org) 上供大家使用之前，请给库取一个**好记**、**能说明库功能的名字**，方便开发者找到你的库。

每次发布，都指定一个版本号，严格按照语义化版本的方式升级，来说明升级的影响，以方便使用者决定是否升级到新版本。

良好的 changelog 记录也是必需的。

### 使用 `type` 或者 `exports` 指定库使用的模块规范

* type 字段用于定义 package.json 文件和该文件所在目录中`.js`文件和无拓展名文件的遵循的**模块规范**。

值为 `module` 则当作 ES 模块处理；值为 `commonjs` 或者没有，则被当作 cjs 模块处理。

> node 需要 14.17 开始才支持 ESM，因此需要声明声明需要的 node 版本。

```json
{
  "type": "module",
  "engines": {
    "node": ">=14.17"
  }
}
```

无论 package.json 中的 `type` 字段为何值， `.mjs` 的文件都按照 ES 模块来处理， `.cjs` 的文件都按照 cjs 模块来处理。

node 官方建议包的开发者明确指定 package.json 中 type 字段的值。

* 关于 exports 字段

尽管指定 exports 增加了复杂性，但是它还是比较有用的：

1. 定义可从库中导入的 API

没有在 exports 中列出的，开发者不可以使用 `import` 或者 `require` 导入，从而实现了接口隐藏。

```json
{
  "exports": {
    ".": "./index.js",
    "./package.json": "./package.json"
  }
}
```

2. 指定导入方式

库的使用者在使用一些打包工具时，比如 webpack 或者 rollup ，会根据 exports 去导入指定的文件。

一个覆盖大部分场景的例子：

```json
{
  "exports": {
    ".": {
      "types": "index.d.ts",
      "module": "index.js",
      "import": "index.js",
      "require": "index.cjs",
      "default": "index.js"
    },
    "./package.json": "./package.json"
  }
}
```

* `.` 标识默认入口。

* 入口的识别是从上到下的，找到匹配的入口就立即停止，入口的顺序很重要。

* types 用于指定类型，帮助 ts 获得类型提示，放在第一位，指向的文件应和`types`字段的值一致。

* module 是非官方字段，被 webpack 和 rollup 支持，放在`import`和`require`之前，指定 ESM 产出。

* 指定 import 使用 import 语法导入时的入口。

* 指定 require 使用 require 语法导入时的入口。

* default 最后的备用，前面的匹配都失败了，它会启用。

> 当一个打包工具或者运行时支持 exports 字段的时候，那么 package.json 中的顶级字段 main、types、module 还有 browser 将被忽略，被 exports 取代。但是，对于尚不支持 exports 字段的工具或运行时来说，设置这些字段仍然很重要。

如果你有一个 "development" 和一个 "production" 的产出（例如，你有一些警告在 development 产出中有但在 production 产出中没有），那么你可以通过在 exports 字段中 "development" 和 "production" 来设置它们。注意一些打包工具例如 webpack 和 vite 将会**自动识别**这些导出条件，而 Rollup 也可以通过配置来识别它们，你需要提醒开发者在他们自己打包工具的配置中去做这些事。

#### 参考信息

[webpack 对 exports 的说明](https://webpack.js.org/guides/package-exports/)

[Node "exports", "module" fields explanation](https://github.com/sheremet-va/dual-packaging)

[why-is-type-module-in-package-json-file](https://stackoverflow.com/questions/61401475/why-is-type-module-in-package-json-file)

[How to Use ES Modules in Node.js](https://dmitripavlutin.com/ecmascript-modules-nodejs/)

[参考信息](https://github.com/SunshowerC/blog/issues/8)

[How to publish dual npm package (CommonJS + modules) so that submodules are uniformly imported](https://stackoverflow.com/questions/60028301/how-to-publish-dual-npm-package-commonjs-modules-so-that-submodules-are-unif)

[Declare .css in package.json exports](https://github.com/vitejs/vite/discussions/2657)

### 设置 cdn 的入口

方便使用者通过 cdn 引入库，可设置特定字段指向 umd 的入口。

```json
{
  "unpkg": "dist/index.umd.js",
  "jsdelivr": "dist/index.umd.js",
}
```

### style 字段指定样式文件

如果你的库有样式文件，可指定 style 字段，方便使用者引入样式文件。

```json
{
  "style": "dist/index.css"
}
```

### scss 字段指定 scss 文件

如果你的库有 scss 文件，可指定 scss 字段，方便使用者引入 scss 文件。

```json
{
  "scss": "dist/index.scss"
}
```

> style 和 scss 字段都是非官方字段，但是很多打包工具都支持。

### files 指定哪些文件发布到 npm

files 字段指定哪些文件包含在 npm 包中，可有效限制包的大小，体积越小，越容易被更多的人使用。

```json
{
  "files": ["dist","path2"]
}
```

可使用 glob 语法指定文件。

使用 `npm publish --dry-run` 可帮助你列出包含的文件。

### sideEffects 字段指定是否有副作用或者有副作用的文件

创建一个无副作用的库，能更好地 tree shaking，不设置的，打包工具会假设所有文件都是有副作用的。

指定副作用的方式：

所有文件都没副作用

```json
{
  "sideEffects": false
}
```

列出有副作用的文件

```json
{
  "sideEffects": ["sideEffects.js"]
}
```

除了 `sideEffects.js` 有副作用，其他都是无副作用的。

[更多参考文章](https://github.com/rollup/rollup/issues/1293)

#### 哪些行为会导致副作用？

1. 修改全局变量

```js
// 具有副作用的模块
export const myVar = "hello";

window.example = "testing";
```

导入 myVar 时，自动设置添加 window 的属性 example。

有时候，这种行为是有意义的，可以把修改全局变量的行为封装成函数，保持整个模块无副作用。

```js
// 一个“纯”模块
const myVar = "hello";

function setExample() {
  window.example = "testing";
}

export {
  myVar,
  setExample
}
```

只有开发人员手动调用 setExample 函数，才会修改全局变量。

2. 发送 http 请求

3. 导出 css

> 且开发人员不做任何事情，这些动作就会被执行。

### 外部依赖应该放在哪儿？

放在开发依赖还是生产依赖？

都不是，放在 `peerDependencies` ，这样可以避免重复安装。

### license --- 应该使用哪个开源许可证？

我选择选择 MIT 即可。要是你想了解更多，可以看看这篇文章。

[如何选择开源许可证？](https://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)

### 其他常用字段

* `keywords`：指定关键字，便于被搜索到。
* `description`：指定描述信息，简要介绍库的功能、特色。
* `repository`：指定代码仓库地址，方便开发者查看源码。
* `private`：指定是否私有，公开发布到 npm 时，设置为 false，私有的仓库，不能发不到 npm 上。
* `publishConfig`：指定发布配置，指定发布源和是否私有。
* `engines`：指定运行环境，可指定 node 和 npm 版本。
* `author`：指定作者，可指定多个作者。
* `homepage`：指定项目主页。
* `bugs`：指定 bug 反馈地址。
* `contributors`：指定贡献者。
* `funding`：指定赞助地址。

> `publishConfig` 用于指定发布配置

```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/",
    "tag": "latest"
  }
}
```

> `private` vs `publishConfig.access`

如果你的包是私有的，设置 `private` 为 `true` ，如果你的包是公开的，设置 `publishConfig.access` 为 `public` 。

private 为 true，将无法**公开**发布到 npm。

> `engines` vs `enginesStrict`

`engines` 指定运行环境，可指定 node 和 npm 版本，不满足，允许安装，但是会有警告。

```json
{
  "engines" : {
    "npm" : ">=8.0.0 <9.0.0",
    "node" : ">=16.0.0 <17.0.0"
  }
}
```

`enginesStrict` 指定运行环境是否严格匹配，不满足，不允许安装。 已经废弃。

[How can I specify the required Node.js version in package.json?](https://stackoverflow.com/questions/29349684/how-can-i-specify-the-required-node-js-version-in-package-json)

## 如何发布这个库？

发布之前升级版本号。

```bash
npm version patch # 升级补丁版本号，如 1.0.0 -> 1.0.1 向下兼容，修复 bug
npm version prepatch # 升级预发布版本号，如 1.0.0 -> 1.0.1-0

npm version minor # 升级小版本号，如 1.0.0 -> 1.1.0 向下兼容，增加功能
npm version major # 升级大版本号，如 1.0.0 -> 2.0.0 不向下兼容，重大改变

# 所有
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]
```

生成 1.0.0-alpha.1 风格的版本号

```bash
npm version prerelease --preid=alpha
```

执行了 npm version 之后，脚本会自动修改版本号，并在 git 中创建提交和标签，如果想要禁用该行为，可以传入 `--no-git-tag-version` 来阻止。

### 打 tag

tag 用于标记不同版本的用途，默认为 `latest` ，可根据测试版本、稳定版本、预发布版本打不同的 tag。

```bash
npm publish --tag beta
npm publish --tag next
npm publish --tag alpha
```

tag 会在 npm 上显示，用户可以根据 tag 安装不同版本。

```bash
npm install vue@v2-latest # 指定 tag 安装 vue2 的最新版
```

使用 `npm view <package-name> dist-tags` 查看所有 tag。

### 移除 tag

```bash
npm dist-tag rm <package-name>@<version> <tag>
```

发布前需要升级版本或者打 tag，发布后根据需要移除 tag。

### 推荐使用 np 发布

[np](https://github.com/sindresorhus/np)

## 维护

changlog 的非常重要。

使用自动化工具，从 git 提交记录中生成 changelog。

## 参考

[打包 JavaScript 库的现代化指南](https://github.com/frehner/modern-guide-to-packaging-js-library/blob/main/README-zh_CN.md)

[redux 作者迁移 redux 到 ESM 的心得教训](https://blog.isquaredsoftware.com/2023/08/esm-modernization-lessons/)

[使用 tsdx 发布一个 npm package](https://www.leighhalliday.com/publish-npm-package)

[How to publish to npm in 2023](https://blog.taskli.st/posts/how-to-publish-to-npm-in-2023)

[Best practices for creating a modern npm package](https://snyk.io/blog/best-practices-create-modern-npm-package/)

[如何创建可进行摇树优化的库](https://blog.theodo.com/2021/04/library-tree-shaking/)

[ESModule 与 CommonJS 的异同点是什么？](https://mp.weixin.qq.com/s/MqoIa80IpvRDfOA2EahBdQ)

[制作一个同时支持 ESM, CJS, Browser 的 Package](https://juejin.cn/post/7129335434588454919)
