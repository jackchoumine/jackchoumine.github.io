#  jest + ts + react + sass 测试环境搭建

## 配置环境

```BASH
npm init -y
```

> 添加 `src/.npmrc`

```bash
# save-exact 的优先级更加高
# save-exact=true
# 相似版本
save-prefix=~
registry=https://registry.npmmirror.com/
```

> 指定项目的 `npmrc` 只是个人习惯，不是必须的。

```BASH
npm i -D jest@27.5.1
npx jest --init # 初始化 jest 配置
```

我的 jest 选项：

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

> 推荐使用 vscode 扩展 ---- `liver Server` 打开 html，可以实时查看哪些哪些代码没有覆盖到。

![jest测试覆盖率报告](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/WX20230812-184731@2x.png)

## 使用 vscode 插件获得更好的测试体验

`npm run test` 会运行所有测试，但是我们可能只想运行当前文件的测试，或者只想运行当前光标所在的测试，可安装 vscode 插件 `Jest Runner` ，得到更好的测试体验。

## 配置 ts

```BASH
npm i -D typescript@">=3.8 <5.0" ts-jest@27.1.5 @types/jest@27.5.2
```

> 指定版本安装，避免安装最新版本，导致兼容性问题。

修改 `sum.js` 为 `sum.ts` :

```ts
// src/utils/sum.ts
function sum(a: number, b: number) {
  return a + b
}

export { sum }
```

修改 `sum.test.js` 为 `sum.test.ts` :

```ts
// src/utils/sum.test.ts
import { sum } from './sum'

describe('sum', () => {
  it('可以做加法', () => {
    expect(sum(1, 1)).toEqual(2)
  })
})
```

修改 `jest.config.js` :

```js
{
  // 配置 ts 转化器
  "preset": "ts-jest",
}
```

执行 `npm run test` 检查环境是否配置成功。

> 修改 `tsconfig.json` ，可选的

```json
"module": "ES2015" // 修改为 ES2015 希望转换成 ES6 的代码
```

## 搭建 react 测试环境

```BASH
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin ts-loader

# React 以及业务
npm i react@"<18" react-dom@"<18" axios antd classnames
npm i -D @types/react@"<18" @types/react-dom@"<18"
npm i -D sass sass-loader style-loader css-loader # 使用 sass
```

> antd 5 以后，不再使用 less，而是 css-in-js，我想使用 sass，所以安装了 sass 相关的依赖。

添加启动脚本 `package.json`

```json
{
  "scripts": {
    "start": "webpack serve",
  }
}
```

添加 `webpack.config.js` :

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.tsx',
  },
  module: {
    rules: [
      // 解析 TypeScript
      {
        test: /\.(tsx?|jsx?)$/,
        use: 'ts-loader',
        exclude: /(node_modules|tests)/,
      },
      // 解析 CSS
      {
        test: /\.css$/i,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }],
      },
      // 解析 scss
      {
        test: /\.scss$/i,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            // NOTE 不配置 options
            // options: {
            //   modules: {
            //     mode: resourcePath => {
            //       if (/pure.css$/i.test(resourcePath)) {
            //         return 'pure'
            //       }
            //       if (/global.css$/i.test(resourcePath)) {
            //         return 'global'
            //       }
            //       return 'local'
            //     },
            //   },
            // },
          },
          {
            loader: 'sass-loader'
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
    // 设置别名
    alias: {
      utils: path.join(__dirname, 'src/utils/'),
      components: path.join(__dirname, 'src/components/'),
      assets: path.join(__dirname, 'src/assets/'),
      apis: path.join(__dirname, 'src/apis/'),
      hooks: path.join(__dirname, 'src/hooks/'),
      store: path.join(__dirname, 'src/store/'),
    },
  },
  devtool: 'inline-source-map',
  // 3000 端口打开网页
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
    open: true,
  },
  // 默认输出
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // 指定模板 html
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
```

添加 `src/main.tsx` :

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'assets/main.scss'

ReactDOM.render(<App />, document.querySelector('#root'))
```

添加 `src/App.tsx` :

```tsx
import React from 'react'
import { Button } from 'antd'
import classnames from 'classnames'
import { sum } from 'utils'

const App = () => {
  const h1ClassNames = classnames('h1-title hello')
  const result = sum(1, 2)
  return (
    <div>
      <h1 className={h1ClassNames}>Hello,{result}</h1>
      <Button>点我</Button>
    </div>
  )
}

export default App
```

添加 `assets/main.scss` :

```scss
// src/assets/main.scss
body {
  background-color: antiquewhite;
  .h1-title {
    font-size: 40px;
    margin: 0;
  }
}
```

添加 `public/index.html` :

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8" />
  <title>React App</title>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

`tsconfig.json` 添加路径映射

```json
{
  "moduleResolution": "NodeNext",
  "baseUrl": "./src",
  "paths": {
    "utils/*": ["utils/*"],
    "assets/*": ["assets/*"],
    "components/*": ["components/*"],
    "apis/*": ["apis/*"],
    "hooks/*": ["hooks/*"],
    "store/*": ["store/*"]
  },
}
```

执行 `npm start` 启动项目，能启动成功，说明环境搭建成功。

## 测试一个 react 组件

新建组件

```tsx
// src/components/HelloJest.tsx
import React from 'react'

function HelloJest({ name = 'Hello Jest' }: { name?: string } = {}) {
  return <div className='hello-jest'>{name}!</div>
}

export { HelloJest }

```

测试用例：

```tsx
// src/components/HelloJest.test.tsx
import { render, screen } from '@testing-library/react'
import React from 'react'
import { HelloJest } from './HelloJest'

describe('HelloJest.tsx', () => {
  it('可以正常展示', () => {
    // 准备测试环境
    render(<HelloJest />)
    // 执行动作
    const helloJest = screen.getByText(/Hello Jest/i)
    // 断言
    expect(helloJest).toBeDefined()
  })
})
```

运行测试，通过。

给 HelloJest 添加样式：

```scss
// src/components/HelloJest.scss
.hello-jest {
  color: red;
  background-color: cornsilk;
}
```

引入

```tsx
// src/components/HelloJest.tsx
import './HelloJest.scss'
```

运行测试，报错，提示识别不到 scss。

安装转换器

```bash
npm i -D jest-transform-stub
```

配置 `jest.config.js` 的 transform:

```js
{
  transform: {
    '.+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  }
},
```

在运行测试，不再报错。

上面的例子测试渲染输出，再写一个测试用户交互的例子

测试用例：

```tsx
// MyInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { MyInput } from './MyInput'

describe('MyInput.tsx', () => {
  it('测试用户输入', async () => {
    const { getByText } = render(<MyInput />)
    const name = 'jack'
    const input = screen.getByPlaceholderText('请输入名字')

    fireEvent.change(input, {
      target: {
        value: name,
      },
    })
    const span = getByText(name, {
      selector: 'span',
    })

    expect(span).not.toBeNull()
  })
})
```

`MyInput.tsx` :

```tsx
import React, { useState } from 'react'

function MyInput() {
  const [name, setName] = useState('')
  return (
    <div>
      <input
        value={name}
        placeholder='请输入名字'
        onChange={e => setName(e.target.value)}
      />
      <p>
        this is my name: <span>{name}</span>
      </p>
    </div>
  )
}

export { MyInput }
```

> 通过 `fireEvent` 来模拟用户交互，使用 `userEvent` 模拟用户交互，会更好一些，之后都使用它来测试用户行为；
> render 函数返回的对象中，包含查询 DOM 的方法。

## 依赖列表

```json
{
  "name": "react-jest-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve",
    "local-server": "json-server --watch db.json --port 3001",
    "test:w": "jest --watch",
    "test": "jest"
  },
  "devDependencies": {
    "@testing-library/react": "~12.1.5",
    "@types/jest": "~27.5.2",
    "@types/react": "~17.0.64",
    "@types/react-dom": "~17.0.20",
    "css-loader": "~6.8.1",
    "html-webpack-plugin": "~5.5.3",
    "jest": "~27.5.1",
    "jest-transform-stub": "~2.0.0",
    "json-server": "~0.17.3",
    "sass": "~1.65.1",
    "sass-loader": "~13.3.2",
    "style-loader": "~3.3.3",
    "ts-jest": "~27.1.5",
    "ts-loader": "~9.4.4",
    "typescript": "~4.9.5",
    "webpack": "~5.88.2",
    "webpack-cli": "~5.1.4",
    "webpack-dev-server": "~4.15.1"
  },
  "dependencies": {
    "antd": "~5.8.3",
    "axios": "~1.4.0",
    "classnames": "~2.3.2",
    "react": "~17.0.2",
    "react-dom": "~17.0.2"
  }
}
```

## 小结

* 搭建 jest + ts + react + sass 测试环境；
