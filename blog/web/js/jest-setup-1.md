# jest 测试环境搭建

## node 环境

安装依赖：

```bash
npm i -D jest # 此时版本是 ~28.1.0
```

写一个测试：

```js
test('可用吗？', () => {
  expect(1 + 2).toBe(3)
})
```

`npx jest` 测试通过，说明环境搭建好。

配置监听脚本，代码改变，自动执行测试：

```json
"scripts": {
    "test": "jest --watchAll"
  }
```

## ESM 环境搭建

两种搭建办法：

### babel 转换

jest 在是 node 下使用的，只能使用 CJS 模块，希望使用 ES6 模块语法，需要 babel 转化。

```bash
npm i -D @babel/core @babel/preset-env
```

配置 `.babelrc.js` :

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
}
```

引入测试用代码验证环境是否可用：

```js
// tests/can-use.spec.js
import { sum } from '../src/es6.sum.js'

test('可用吗？', () => {
  expect(sum(1, 2)).toBe(3)
})
```

执行 `npx jest` 。

> 如果 package.json 含有 `"type": "module"` ，该选项表示此 npm 包采用 ESM。

报错：

`Error while loading config - You appear to be using a native ECMAScript module configuration file, which is only supported when running Babel asynchronously.`

两个办法解决：

1. 修改 type 为 `commonjs` 或者删除 type。 推荐。

2. 修改`.babelrc.js` 为`.babelrc.cjs`

### 设置 jest 环境变量

```json
{
  "type": "module", // 声明 npm 采用 ESM 规范
  "scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules jest --watchAll"
  }
}
```

> 此方式，需要保证所有用到的依赖都是支持 ESM 规范。
