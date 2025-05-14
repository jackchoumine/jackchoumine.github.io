# rollup 基础使用

[rollup](https://rollupjs.org/) 号称是下一代模块打包器，由 [Svelte](https://svelte.dev/) 的作者在 2015 年开发，专注于 JS 打包，通过其插件，也能处理其他文件。

相比 webpack 复杂的配置，其配置简单，打包后的代码体积很小，代码可读性高，因此生态系统迅速发展壮大。vue、react 等知名 JS 库，都是用它打包的。

## rollup 的优势

1. 配置简单；

2. tree-shaking 优化；

3. 多入口，多出口多格式输出；

4. 打包输出的代码可读性高；

5. 天然支持 ESM；

6. 生态系统大，插件多。

## 使用命令打包

```json
{
  "scripts": {
    "iife": "rollup ./src/main.js --file ./dist/bundle.js --format iife"
  }
}
```

`--file` 指定输出文件，`--format`指定输出格式，`./src/main.js` 是输入文件。

`src/main.js`

```js
import * as dom from './lib/dom.js'
import { formatHMS } from './lib/time.js'

// get clock element
const clock = dom.get('.clock')

if (clock) {
  console.log('initializing clock')

  // update clock every second
  setInterval(() => {
    clock.textContent = formatHMS()
  }, 1000)
}
```

`src/lib/dom.js`

```js
// fetch first node from selector
export function get(selector, doc = document) {
  return doc.querySelector(selector)
}

// fetch all nodes from selector
export function getAll(selector, doc = document) {
  return doc.querySelectorAll(selector)
}
```

`src/lib/time.js`

```js
// time formatting

// return 2-digit value
function timePad(n) {
  return String(n).padStart(2, '0')
}

// return time in HH:MM format
export function formatHM(d = new Date()) {
  return timePad(d.getHours()) + ':' + timePad(d.getMinutes())
}

// return time in HH:MM:SS format
export function formatHMS(d = new Date()) {
  return formatHM(d) + ':' + timePad(d.getSeconds())
}
```

打包输出`dist/bundle.js`

```js
;(function () {
  'use strict'

  function get(selector, doc = document) {
    return doc.querySelector(selector)
  }

  function timePad(n) {
    return ('' + n).padStart(2, '0')
  }

  function formatHM(d = new Date()) {
    return timePad(d.getHours() + ':' + timePad(d.getMinutes()))
  }

  function formatHMS(d = new Date()) {
    return formatHM(d) + ':' + timePad(d.getSeconds())
  }

  // get clock element
  const clock = get('.clock') // NOTE 即使是统一导入，也只会打包使用的函数

  if (clock) {
    console.log('initializing clock')
    // update clock every second
    setInterval(() => {
      clock.textContent = formatHMS()
    }, 1000)
  }
})() // IIFE 参数呢？
```

输出代码可读性非常高。

<!-- TODO -->

如何指定 iife 的参数？

### 其他常用命令

| 命令           | 缩写 | 作用                                           | 例子                                                        |
| -------------- | ---- | ---------------------------------------------- | ----------------------------------------------------------- |
| --config       | -c   | 指定配置文件                                   |                                                             |
| --help         | -h   | 帮助                                           |                                                             |
| --version      | -v   | 版本                                           |                                                             |
| --watch        | -w   | 监听文件变化                                   |                                                             |
| --format       | -f   | 指定输出格式                                   |                                                             |
| --name         | -n   | 为 iife 或者 umd 指定全局库名称                |                                                             |
| --dir          | -d   | 指定输出目录                                   |                                                             |
| --output       | -o   | 指定输出文件                                   |                                                             |
| --configPlugin |      | 使用 rollup 转译配置文件，使用 ts 编写配置文件 |                                                             |
| --environment  |      | 配置环境变量                                   | `--environment INCLUDE_DEPS,BUILD:production`               |
| --plugin       | -p   | 指定插件                                       | `-p ./my-plugin.js`、`-p node-resolve`、` -p commonjs,json` |

## 配置文件

使用命令打包，容易错误，且不灵活，因此推荐使用配置文件。

### 常用的核心配置选项

| 配置项            | 类型                               | 默认值 | 作用                          | 补充                             |
| ----------------- | ---------------------------------- | ------ | ----------------------------- | -------------------------------- |
| input             | string \| string[] \| {entry:path} |        | 入口配置                      | 可配置多入口                     |
| output            | [] \| {}                           |        | 出口配置                      | 可配置多出口                     |
| output.format     | string                             | 'es'   | 出口格式                      | esm、cjs、umd、iife、amd、system |
| \*.dir            | string                             |        | 出口目录                      | 设置多出口时，需要此配置         |
| \*.file           | string                             |        | 出口文件                      | 设置单出口时，需要此配置         |
| \*.name           | string                             |        | 导出的全局变量名              | 适用于 iife、umd,不进行代码分割  |
| \*.plugins        | []                                 |        | 为此输出添加插件              |                                  |
| \*.chunkFileNames |                                    |        | [name]-[hash].js              |                                  |
| \*.manualChunks   | { chunkId: string[] }              |        | 分包策略                      | 可配置成函数                     |
| \*.assetFileNames |                                    |        | assets/[name]-[hash][extname] | 非js输出                         |
| \*.globals        | {moduleId:string}                  |        | 为 iffe、umd 提供全局依赖名称 |                                  |
| external          | string[] \| id=>boolean            |        | 从打包输出中排除依赖          |                                  |
| plugins           | []                                 |        | 插件配置                      |                                  |

> \* 代表 output。

### 配置文件 `rollup.config.js` 的结构：

```js
export default {
  // 核心选项
  input, // 必须
  output: {
    // 必须 (要输出多种格式，设置成一个数组)
    // 核心选项
    file, // 输出单个文件，必须，否则设置 dir
    format, // 必须
    name, // iife, umd 必须
    globals, // iiife, umd 中的全局变量

    // 额外选项
    banner,
    footer,
    sourcemap, // 生成 sourcemap  boolean | 'inline' | 'hidden'
    paths,
  },
  external,
  plugins,
  // watch: boolean | watchOptions
  watch: {
    include: '需要监听的文件', // string | RegExp | (string | RegExp)[]; // 包含文件 'src/**'
    exclude: '排除监听的文件', // string | RegExp | (string | RegExp)[]; // 排除文件 'node_modules/**'
    clearScreen: true, // 清除控制台 默认 true
    buildDelay: 100, // 延迟构建 默认 0 ms 即立即构建
  },
}
```

```js
export default {
  input: './src/main.js',
  output: {
    file: './build/bundle.js',
    format: 'iife',
    sourcemap: true, // 独立的 sourcemap,
    // sourcemap: 'inline', // 行内 sourcemap,
  },

  // 监听配置
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
    skipWrite: false, // Do not write files to disk when watching, 可提供打包速度
    clearScreen: false, // 不清除控制台打包输出信息
  },
}
```

> 使用 esm 模块编写配置文件，需要 package.json 中配置`"type": "module"`。

### 排除依赖

external 配置选项用于排除不需要打包的依赖。

```js
export default {
  input: './cjs2es/input.js',
  output: {
    file: './cjs2es/output.js',
    format: 'es',
  },
  external: ['dayjs'], // 会从输出文件中排除 dayjs 的代码
}
```

编写 js 库时，常把库需要的依赖安装成对等依赖，版本号设置范围大点，让使用库的人自行安装这些对等依赖。

使用 `rollup-plugin-peer-deps-external` 插件自动排除对等依赖。

```bash
pnpm i -D rollup-plugin-peer-deps-external
```

```js
import peerExternal from 'rollup-plugin-peer-deps-external'

export default {
  input: './cjs2es/input.js',
  output: {
    file: './cjs2es/output.js',
    format: 'es',
  },
  plugins: [peerExternal()],
}
```

## 环境变量

rollup 允许指定环境变量，根据环境变量适配配置选项：

`npx rollup --config --environment VAR1,VAR2:value2,VAR3:x`

在配置文件中，可通过`process.env`环境变量：

```js
process.env.VAR1 // true
process.env.VAR2 // value2
process.env.VAR3 // x
```

脚本配置：

```json
{
  "iifeb": "rollup -c --environment production"
}
```

`rollup.config.js` 中获取环境变量：

```js
const isProduction = process.env.production

console.log(`running in ${isProduction ? 'production' : 'development'} mode`)

const sourcemap = isProduction ? false : true
```

## 插件

插件作用：插件在 rollup 可在特别的构建阶段修改构建源码，有些插件专门用于输出过程。

rollup 提供了插件配置，帮助增强功能：编译 TS、压缩代码、处理 scss 等，都可通过插件实现。

插件按照来源分为官方插件和社区插件。官方插件以`@rollup/plugin-`开头，比如`@rollup/plugin-json`，以`rollup-plugin-`开头的是社区插件。

### 插件使用方式

插件是一个函数，接受配置选项，返回一个对象，对象中包含`name`属性和`resolveId`方法等属性。

使用方式是直接调用插件函数，传入配置选项。

```js
import del from 'rollup-plugin-delete'

export default {
  plugins: [del({ targets: 'dist/*' })],
}
```

### 常见插件

| 插件                                 | 关键作用                                  | 补充                       |
| ------------------------------------ | ----------------------------------------- | -------------------------- |
| @rollup/plugin-node-resolve          | 解析`node_modules`中的模块和解析 index.js |                            |
| @rollup/plugin-commonjs              | 将`commonJS`模块转换为`ES6`模块           |                            |
| @rollup/plugin-alias                 | 为导入路径设置别名，指定依赖的解析路径    |                            |
| @rollup/plugin-json                  | 将.json 文件转换为 ES6 模块               |                            |
| @rollup/plugin-replace               | 替换目标字符串                            |                            |
| @rollup/plugin-image                 | 处理文件                                  |                            |
| @rollup/typescript                   | 转译 ts                                   |                            |
| @rollup/plugin-babel                 | 自动化解决 babel 的转换问题               | 写 ES6 以上的新语法        |
| @rollup/plugin-terser                | 压缩文件                                  |                            |
| rollup-plugin-delete                 | 删除文件                                  |                            |
| rollup-plugin-terser                 | 压缩文件                                  |                            |
| rollup-plugin-esbuild-minify         | 压缩文件                                  |                            |
| rollup-plugin-glsl                   | 处理 glsl 文件                            |                            |
| rollup-plugin-generate-html-template | 生成 html 文件                            |                            |
| rollup-plugin-generate-package-json  | 生成 package.json                         |                            |
| rollup-plugin-dts                    | 生成 ts 声明文件                          |                            |
| rollup-plugin-html-entry             | html 入口                                 |                            |
| rollup-plugin-vue                    | 转换 vue 单文件组件                       |                            |
| rollup-plugin-livereload             | 热加载                                    | 文件变化后，不必手动属刷新 |
| rollup-plugin-gzip                   | gzip 压缩                                 | 打包应用是常用             |
| rollup-plugin-serve                  | 开发服务器                                |                            |
| rollup-plugin-sizes                  | 显示 bundle 大小                          |                            |
| rollup-plugin-analyzer               | 打包结果分析                              |                            |
| rollup-plugin-version-injector       | 版本注入                                  |                            |
| rollup-plugin-license                | 生成版权声明                              |                            |
| rollup-plugin-banner                 | 为打包后的文件添加版权声明                |                            |

> @rollup/plugin-babel 需要有 babel 相关的依赖包，如`@babel/core`、`@babel/preset-env`、`@babel/plugin-proposal-class-properties`等。

[官方插件列表](https://github.com/rollup/plugins)

[官网推荐的插件列表](https://github.com/rollup/awesome)

### 开发自己的插件

<!-- TODO 单独开文章介绍 -->

## 一些常用插件的使用例子

### 解析 npm 包和转换 commonjs 模块为 es 模块

很多 npm 包使用的是 commonjs 模块规范，而 es 模块是日后会逐渐被广泛采用的官方模块规范， rollup 提供了两个插件来解决这个问题：

[plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)-- 解析 node_modules 中的 npm 包。

[plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)-- 转 commonjs 模块为 es。

以上两个插件配合使用，即可在 es 中使用 commonjs 的 npm。

入口文件引入 dayjs

```js
import dayjs from 'dayjs'

export function format() {
  return dayjs().format('HH:mm:ss')
}
```

打包配置文件：

```js
// cjs2es.js
export default {
  input: './cjs2es/input.js',
  output: {
    file: './cjs2es/output.js',
    format: 'es',
  },
}
```

执行打包后，打包正常，虽然 dayjs 没有打入输出文件中，但是警告无法解析依赖。

![](https://cdn.jsdelivr.net/npm/zqj-pics/build-tools/can-not-resolve-npm.png)

使用插件解决：

```js
import commonjs from '@rollup/plugin-commonjs'
import resolveNode from '@rollup/plugin-node-resolve'

export default {
  input: './cjs2es/input.js',
  output: {
    file: './cjs2es/output.js',
    format: 'es',
  },
  plugins: [resolveNode(), commonjs()],
}
```

dayjs 被打包进入输出文件中了，警告消失。

### 替换代码中的字符串

在代码中注入变量，比如版本号，是一个常见的的需求，可使用[@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace) 实现。

```js
// cjs2es/input.js
import dayjs from 'dayjs'

export const version = '__version__' // 库的版本号，希望在打包时替换成 package.json 中的版本号
export function format() {
  return dayjs().format('HH:mm:ss')
}
```

配置 replace 插件：

```js
import replace from '@rollup/plugin-replace'

export default {
  // ...
  plugins: [
    replace({
      __version__: '1.0.0',
      preventAssignment: true,
    }),
  ],
}
```

`preventAssignment` 选项，防止替换变量被赋值。

输出文件：

```js
const version = '1.0.0'

function format() {
  return dayjs().format('HH:mm:ss')
}

export { format, version }
```

注入版本号、名字等库的信息，是`rollup-plugin-version-injector`插件更加方便。

```js
import dayjs from 'dayjs'

// 希望从 package.json 注入 version 和生成打包时间
const [v, buildOn] = '[VI]{version}|{date}[/VI]'.split('|')

export const version = v
export const buildTime = buildOn

export function format() {
  return dayjs().format('HH:mm:ss')
}
```

配置：rollup-plugin-version-injector

```js
/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-11-24 14:15:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-11-24 15:22:06
 * @Description : commonjs转es配置
 */
import commonjs from '@rollup/plugin-commonjs'
import resolveNode from '@rollup/plugin-node-resolve'
import peerExternal from 'rollup-plugin-peer-deps-external'
import versionInj from 'rollup-plugin-version-injector'

export default {
  input: './cjs2es/input.js',
  output: {
    file: './cjs2es/output.js',
    format: 'es',
  },
  plugins: [
    versionInj({
      injectInTags: {
        fileRegexp: /\.(js|html|css)$/,
        dateFormat: 'yyyy-mm-d HH:MM:ss',
      },
    }),
    peerExternal(),
    resolveNode(),
    commonjs(),
  ],
}
```

输出结果：

```js
const [v, buildOn] = '1.0.0|2024-11-24 15:27:37'.split('|')

const version = v
const buildTime = buildOn
export { buildTime, version }
```

其他插件的例子不在编写了，再打包 js 库和组件库的时候再详细说明。

## 目标

1. 打包一个 vue 项目
2. 打包一个多模块的 js 库
3. 打包一个 ts 库
4. 打包一个 vue 按需导入的组件库

## 参考

[An Introduction to the Rollup.js JavaScript Bundler](https://www.sitepoint.com/rollup-javascript-bundler-introduction/)

[Rollup 的基本使用](https://touchczy.blog.csdn.net/article/details/113892622)

[Rollup 打包工具的使用（超详细，超基础，附代码截图超简单）](https://juejin.cn/post/6844904058394771470)

[Building and publishing a module with TypeScript and Rollup.js](https://hackernoon.com/building-and-publishing-a-module-with-typescript-and-rollup-js-faa778c85396)

[The Ultimate Guide to Getting Started with the Rollup.js JavaScript Bundler](https://blog.openreplay.com/the-ultimate-guide-to-getting-started-with-the-rollup-js-javascript-bundler)

[How to Setup a TypeScript project using Rollup.js](https://www.thisdot.co/blog/how-to-setup-a-typescript-project-using-rollup-js)

[Support dual package in npm - the easy way](https://tduyng.com/blog/dual-package-typescript/)
