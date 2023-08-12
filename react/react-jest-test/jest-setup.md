# jest 测试环境搭建

## 配置环境

```BASH
npm init -y
npm i -D jest@27.5.1
npx jest --init # 初始化 jest 配置
```

我的选项：

```BASH
✔ Would you like to use Typescript for the configuration file? … no
✔ Choose the test environment that will be used for testing › jsdom (browser-like)
✔ Do you want Jest to add coverage reports? … yes
✔ Which provider should be used to instrument code for coverage? › v8
✔ Automatically clear mock calls, instances and results before every test? … yes
```

执行完毕后，会在项目根目录生成一个 `jest.config.js` 。

## 第一个测试

编写一个简单的测试，检查环境可用性。

```JS
// src/utils/sum.js
function sum(a, b) {
  return a + b
}

module.exports = sum
```

测试用例：

```JS
// src/utils/sum.test.js
const sum = require('../../src/utils/sum')

describe('sum', () => {
  it('可以做加法', () => {
    expect(sum(1, 1)).toEqual(2)
  })
})
```

执行测试：

```BASH
npm run test
```

查看控制台，全部绿色，测试通过，环境配置好了。

## 查看测试覆盖率报告

`coverage` 目录下，生成了各种格式的测试覆盖率报告，有 html 格式的，可以直接在浏览器中打开查看。

> 推荐使用 vscode 扩展 ---- `liver Server` 打开 html 查看。

![jest测试覆盖率报告](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/WX20230812-184731@2x.png)

## 使用 vscode 插件获得更好的测试体验

`npm run test` 会运行所有测试，但是我们可能只想运行当前文件的测试，或者只想运行当前光标所在的测试，可安装 vscode 插件 `Jest Runner` ，得到更好的测试体验。

## 小结

* 搭建 jest 测试环境；
* 编写了第一个测试用例。
