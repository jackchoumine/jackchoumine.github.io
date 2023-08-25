# jest 中的模拟

被代码会依赖一些外部环境，比如 http 接口，npm 模块、数据库等，集成这些环境往往会使得测试用例不可控，真实环境也许是缓慢和脆弱的，比如真实环境要求定时器的间隔为 20 分钟，测试不可能等待 20 分钟，需要使用代码模拟一个稳定的环境，jest 可模拟常见的"环境"，比如**回调函数**、**定时器**、**数据库**等。

通过模拟，可以使得测试用例更加可控，更加稳定，更加快速，且能方便的知道依赖的模块的调用情况：

1. 是否被调用
2. 调用次数
3. 调用时的参数
4. 调用时的返回值
5. 调用时的 this
6. 调用顺序

jest 有三种创建模拟函数的方式：

* jest.fn() -- 模拟函数
* jest.spyOn() -- 模拟对象的方法
* jest.mock() -- 模拟模块

先看 jest.fn

## jest.fn

jest.fn 是最简单的模拟函数的方法。

### 模拟一个无操作的函数

```js
it('simple jest.fn', () => {
  const mockFn = jest.fn()

  mockFn()

  expect(mockFn).toBeCalled()
})
```

输出 mockFn 看看：

```js
[Function: mockConstructor] {
  _isMockFunction: true,
  getMockImplementation: [Function(anonymous)],
  mock: [Getter / Setter],
  mockClear: [Function(anonymous)],
  mockReset: [Function(anonymous)],
  mockRestore: [Function(anonymous)],
  mockReturnValueOnce: [Function(anonymous)],
  mockResolvedValueOnce: [Function(anonymous)],
  mockRejectedValueOnce: [Function(anonymous)],
  mockReturnValue: [Function(anonymous)],
  mockResolvedValue: [Function(anonymous)],
  mockRejectedValue: [Function(anonymous)],
  mockImplementationOnce: [Function(anonymous)],
  mockImplementation: [Function(anonymous)],
  mockReturnThis: [Function(anonymous)],
  mockName: [Function(anonymous)],
  getMockName: [Function(anonymous)]
}
```

是一个函数，有很多属性。

### 模拟函数实现

```js
it('simple jest.fn give implement', () => {
  const mockFn = jest.fn(() => 'hello')
  const result = mockFn()

  expect(mockFn).toBeCalled()
  expect(result).toBe('hello')

  const mockFn2 = jest.fn((a, b) => a + b)
  const result2 = mockFn2(1, 2)

  expect(mockFn2).toBeCalledTimes(1)
  expect(mockFn2).toBeCalledWith(1, 2)
})
```

还可以这样：

```js
it('simple jest.fn give implement - 2', () => {
  const mockFn = jest.fn()
  mockFn.mockImplementation(() => 'hello')

  const result = mockFn()

  expect(mockFn).toBeCalled()
  expect(result).toBe('hello')
})
```

模拟出函数后，就可使用 `toBeCalled` 、 `toBeCalledTimes` 和 `toBeCalledWith` 匹配器断言执行情况。

上面的三个例子比较简单，下面看看复杂一点的例子。

```js
// MontyPython.js
export default class MontyPython {
  callFnWithTheMeaningOfLife(fn) {
    fn(42)
  }
  getTheMeaningOfLife() {
    return Math.random() * 100
  }
}
```

需要测试回调 fn 是否被调用，且参数为 42。

```js
// MontyPython.spec.js
import MontyPython from './MontyPython'
it('callFnWithTheMeaningOfLife', () => {
  const mockFn = jest.fn()
  const montyPython = new MontyPython()

  montyPython.callFnWithTheMeaningOfLife(mockFn)

  expect(mockFn).toHaveBeenCalledWith(42)
})
```

参数是固定的 42，能预测，但是如果参数或者返回值是随机的，就无法预测了，比如 `getTheMeaningOfLife` , 这时候就需要模替换掉 `Math.random` ，random 是对象上的一个方法，所以需要模拟对象的方法， `jest.spyOn` 出场。

## jest.spyOn

`getTheMeaningOfLife` 的测试用例：

```js
// MontyPython.spec.js
it('getTheMeaningOfLife', () => {
  const mockRandom = jest.spyOn(Math, 'random')
  mockRandom.mockImplementation(() => 10)

  const montyPython = new MontyPython()

  const result = montyPython.getTheMeaningOfLife()

  expect(mockRandom).toHaveBeenCalled()
  expect(result).toBe(10 * 100)
  mockRandom.mockRestore()
})
```

> jest.spyOn 会返回一个模拟对象，可以使用 `mockImplementation` 重写函数的实现。

> mockRandom.mockRestore() 会恢复原来的实现。

还可以这样模拟返回值：

```js
mockRandom.mockReturnValue(10)
```

## jest.mock

学习了如何模拟函数和对象的方法，现在看看如何模拟模块。

jest 提供了 `mock` 和 `doMock` 用于模拟模块。

```js
jest.mock('path/to/file', () => ({
  __esModule: true // 标明是 esm
  // 一个返回对象的函数：工厂函数
}))
```

### 模拟命名导出

有一 `config.ts` 模块

```js
// config.ts
const CAPITALIZE = true

export {
  CAPITALIZE
}
```

有一 `sayHello.ts` 模块使用了 `config`

```ts
// sayHello.ts
import { CAPITALIZE } from './config'

export const sayHello = (name: string) => {
  let result = 'Hi, '

  if (CAPITALIZE) {
    result += name[0].toUpperCase() + name.substring(1, name.length)
  } else {
    result += name
  }

  return result
}
```

> 如何测试 sayHello 函数呢？

sayHello 有两个分支，至少需要两个用例来覆盖，而这分支里用到了外部依赖 `CAPITALIZE` , 需要模拟 `CAPITALIZE` 的值。

```ts
// sayHello.test.ts
import {
  sayHello
} from './sayHello'
// NOTE 命名导出，合并命名导出到一个对象上，方便在每次用例中重置
import * as config from './config'

jest.mock('./config', () => ({
  __esModule: true,
  CAPITALIZE: void 0,
}))

// 解决 ts 无法重写导入属性的问题
const mockConfig = config as {
  CAPITALIZE: boolean
}

describe('sayHello', () => {
  test('Capitalizes name if config requires that', () => {
    // NOTE 无法为"CAPITALIZE"赋值，因为它是只读属性。
    // NOTE ts 视导入为常量，且对象的属性是只读的
    mockConfig.CAPITALIZE = true
    expect(sayHello('john')).toBe('Hi, John')
  })

  test('does not capitalize name if config does not require that', () => {
    mockConfig.CAPITALIZE = false

    expect(sayHello('john')).toBe('Hi, john')
  })
})
```

> ts 中会把引入的模块视为常量。能重置它的值，否则报错：无法为"CAPITALIZE"赋值，因为它是只读属性。

> 使用 `const mockConfig = config as {CAPITALIZE: boolean}` 解决。

> 使用 `import * as ` 把所有命名导出，合并到一个对象上，方便模拟。

> 正常的导入是不能少的，即 `import * as config from './config'` 必须有，否则 jest.mock 不知道模拟哪个模块。

### 模拟默认导出

有一模块:

```ts
// sayHello-3.ts
import shouldCapitalize from './config-default-fn'

export const sayHello = (name: string) => {
  let result = 'Hi, '
  if (shouldCapitalize()) {
    result += name[0].toUpperCase() + name.substring(1, name.length)
  } else {
    result += name
  }

  return result
}
```

依赖模块 `config-default-fn` ：

```ts
// config-default-fn.ts
const shouldCapitalize = () => true

export default shouldCapitalize
```

要如何模拟这个命名导出呢？

default 是特殊命名导出，其实和普通命名导出一样，就是重写这个属性。

看测试用例：

```ts
// sayHello-3.test.ts
import { sayHello } from './sayHello-3'
// NOTE 默认导出，是一个函数
import * as config from './config-default-fn'

jest.mock('./config-default-fn', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// NOTE 手动指定类型，去掉重写报错
const shouldCapitalizeMock = config.default as jest.Mock

describe('sayHello', () => {
  test('Capitalizes name if config requires that', () => {
    shouldCapitalizeMock.mockReturnValue(true)

    expect(sayHello('john')).toBe('Hi, John')
  })

  test('does not capitalize name if config does not require that', () => {
    shouldCapitalizeMock.mockImplementation(() => false)

    expect(sayHello('john')).toBe('Hi, john')
  })
})
```

在两个用例里，以指定返回值和重新函数实现的方式，替换了 `shouldCapitalize` 。

> 依赖是默认的导出的变量呢？

比如:

```ts
const CAPITALIZE = true

export default CAPITALIZE
```

可以这样模拟：

```ts
import * as config from './config-default'

jest.mock('./config-default', () => ({
  __esModule: true,
  default: void 0,
}))
const mockConfig = config as { default: boolean }
```

> 在用例中可重置它的值。

### 同时模拟命名导出和默认导出

有一模块如下：

```ts
function say(greeting = 'Hello', name = 'World!') {
  //   console.log(`${greeting}, ${name}!`)
  return `${greeting}, ${name}!`
}

function sum(a: number, b: number) {
  return a + b
}

export { say, sum }
// import {sum} from './mockExportObj'
// sum()

export default { say }
// import exportObj from './mockExportObj'
// exportObj.say()
```

可以这样模拟：

```ts
import exportObj, { sum } from './mockExportObj'

// NOTE 模拟默认导出和命名导出
jest.mock('./mockExportObj', () => {
  let mockSum = jest.fn().mockImplementation((a, b) => '' + a + '' + b)
  return {
    __esModule: true, // this property makes it work
    default: {
      say: jest.fn().mockImplementation((greeting = 'Hello', name = 'World') => {
        return `${greeting},${name}`
      }),
    },
    sum: mockSum, //: jest.fn().mockImplementation((a, b) => '' + a + '' + b),
  }
})
```

完整的测试用例：

```ts
import exportObj, { sum } from './mockExportObj'

// NOTE 模拟默认导出和命名导出
jest.mock('./mockExportObj', () => {
  let mockSum = jest.fn().mockImplementation((a, b) => '' + a + '' + b)
  return {
    __esModule: true, // this property makes it work
    default: {
      say: jest.fn().mockImplementation((greeting = 'Hello', name = 'World') => {
        return `${greeting},${name}`
      }),
    },
    sum: mockSum,
  }
})
// console.log(result, 'zqj log')
describe('mock 模块默认对象', () => {
  it('exportObj.say', () => {
    jest.spyOn(exportObj, 'say')

    expect(exportObj.say()).toBe('Hello,World')
    expect(exportObj.say('你好')).toBe('你好,World')
    expect(exportObj.say('你好', 'Jest')).toBe('你好,Jest')
    expect(exportObj.say).toHaveBeenCalledTimes(3)
  })
  it('测试命名导出', () => {
    expect(sum(1, 2)).toBe('12')

    // 直接断言执行次数，不用 jest.spyOn
    expect(sum).toHaveBeenCalledTimes(1)
  })
  it('重写命名导出', () => {
    // @ts-ignore
    sum.mockImplementation((a, b) => a / b)

    expect(sum(4, 2)).toBe(2)
    expect(sum).toHaveBeenCalledTimes(1)
    expect(sum).toHaveBeenCalledWith(4, 2)
  })
  it('重写模块中的某个函数', () => {
    jest.spyOn(exportObj, 'say')
    // @ts-ignore
    exportObj.say.mockImplementation((greeting = 'Hello', name = 'World') => {
      return `${greeting} + ${name}`
    })
    expect(exportObj.say()).toBe('Hello + World')
    expect(exportObj.say('你好')).toBe('你好 + World')
    expect(exportObj.say('你好', 'Jest')).toBe('你好 + Jest')
    expect(exportObj.say).toHaveBeenCalledTimes(3)
  })
})
```

### jest.mock 使用小结

1. 第二个参数是一个工厂函数，返回的对象可重写模块的实现；
2. 正常导入的模块不能省略。

### 想要在某个用例里模拟呢？

`jest.doMock` 提供了在某个用例里模拟的能力。

```ts
test('jest.resetModules', () => {
  // NOTE jest.doMock 会覆盖 jest.mock
  // const mockDefault =
  jest.doMock('./config-default-fn', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => false),
  }))
  expect(sayHello('john')).toBe('Hi, john')
  // NOTE 重置模块
  jest.resetModules()
})
```

它会覆盖外部的 `jest.mock` 。

> jest.mock 和 jest.doMock 的区别是什么？

带工厂函数的 mock 会提升到文件的顶部，会代替相关 `import` ，会自动清除 mock，而 doMock 用在 test 里，不会提升到文件顶部，需要手动清除 mock。

参考：

[Difference between jest.mock and jest.doMock](https://stackoverflow.com/questions/64245013/difference-between-jest-mock-and-jest-domock)

> 在某个用例里不想模拟，而是调用真实的模块呢？

`jest.dontMock` 可停止模拟。

```ts
test("don't mock", () => {
  jest.dontMock('./config-default-fn')

  // sayHello 内部调用真实的 shouldCapitalize
  // BUG 没有通过断言
  expect(sayHello('john')).toBe('Hi, John')
})
```

> jest.unmock 可以终止 `jest.mock` , 几乎不用。

> 想要调用真实的模拟，而不是模拟的模块呢？

```ts
test("don't mock", () => {
  jest.requireActual('./config-default-fn')

  // BUG 没有通过断言
  expect(sayHello('john')).toBe('Hi, John')
})
```

### jest.mock('path/to/file')，没有工厂函数，可实现全局模拟

有一模块如下：

```ts
// tests/units/mockGlobal.ts

import { getProfile } from '../../https'// 从 src/https/index.ts 导入

async function mockGlobal() {
  const profile = await getProfile()
  return profile
}
```

https.ts 模块如下：

```ts
// src/https/index.ts
import axios from 'axios'

function getProfile() {
  return axios.get('http://localhost:3001/profile').then(res => res.data)
}

export { getProfile }
```

在 `src/https` 目录下创建 `__mocks__/index.ts`

```js
// src/https/__mocks__/index.ts
import dbJson from '../../../db.json'

function getProfile() {
  return jest.fn().mockResolvedValue(dbJson.profile)
}

export {
  getProfile
}
```

在测试用例中使用 `jest.mock('../../https')` ，jest 会自动找到 `__mocks__/index.ts` 模块，实现全局模拟。

```ts
// tests/units/mockGlobal.test.ts
import { getProfile } from '../../https'

import dbJson from '../../../db.json'
import { mockGlobal } from './globalMock'
jest.mock('../../https')

describe('mock global', () => {
  it('重写模拟函数', async () => {
    const mockGetProfile = getProfile as jest.MockedFunction<typeof getProfile>
    const mockData = dbJson.profile
    mockGetProfile.mockResolvedValue(mockData)

    const profile = await getProfile()

    expect(profile).toEqual(mockData)
  })
  it('mockGlobal', async () => {
    const mockData = dbJson.profile
    const profile = await mockGlobal()

    expect(profile).toEqual(mockData)
  })
})
```

> jest.mock 不仅可全局模拟项目里的模块，还能模拟 npm 模块。

模拟常见的http库 `axios`

```ts
// tests/units/mockAxios.ts
import axios from 'axios'

function getTodoList() {
  return axios.get('https://jsonplaceholder.typicode.com/todos').then(res => res.data)
}
export { getTodoList }
```

测试用例：
  

```ts
import axios from 'axios'

import { getTodoList } from './mockAxios'

// 模拟 导入的 axios
jest.mock('axios')

describe('mock axios', () => {
  it('getTodoList', async () => {
    const mockData = [{ id: 1, name: 'zqj' }]
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockData }))

    const totoList = await getTodoList()

    expect(totoList).toEqual(mockData)
  })
})
```

### jest.mock 使用小结

1. `jest.mock('path/to/file')`  --- 模拟全局依赖
2. `jest.mock('path/to/file', () => {})` --- 在测试文件中模拟模块
3. `jest.doMock('path/to/file', () => {})` --- 在某个用例里模拟模块，需要手动清除模拟

## jest.fn 是如何记住执行情况？ --- jest.fn 的原理

模拟出来的函数有一个 `mock` ，一个对象，里面记录着函数的执行情况。

```js
{
  // 记录调用次数和参数
  calls: [
    []
  ],
  // this 对象
  instances: [undefined],
  // 调用顺序
  invocationCallOrder: [1],
  // 返回值
  results: [{
    type: 'return',
    value: 'hello'
  }],
  lastCall: []
}
```

函数执行的完成的结果有三种：

1. 显示地返回一个值；
2. 隐式地返回 `undefined`；
3. 抛出错误。

现在实现一个简易版的模拟函数 mockFn

```js
function mockFn() {
  const fn = () => {}
  fn.mock = {

    calls: [],
    results: [],
    instances: [],

  }
  // 1. mockFn 返回一个函数
  // 2. 函数是一个可调用对象，可有自己得属性，所以可附上 mock 属性
  return fn
}
```

参数情况

```js
// 3.  mockFn 有一个无操作函数作为参数
function mockFn(impl = () => {}) {
  // 4. fn 接收不定参数
  const fn = (...agrs) => {}
  fn.mock = {
    calls: [],
    results: [],
    instances: [],
  }
  return fn
}
```

> 如何记录 fn 的调用情况呢？在函数 fn 内部记录。

```js
const fn = (...args) => {
  fn.mock.calls.push(args)
  fn.mock.instances.push(this)
  try {
    const value = impl.apply(this, args)
    fn.mock.results.push({
      type: 'return',
      value
    })
    return value
  } catch (error) {
    fn.mock.results.push({
      type: 'throw',
      value: error
    })
    return error
  }
}
```

完整的代码：

```js
function mockFn(impl = function() {}) {
  const fn = function(...args) {
    fn.mock.calls.push(args)
    fn.mock.instances.push(this)
    try {
      const value = impl.apply(this, args)
      fn.mock.results.push({
        type: 'return',
        value
      })
      return value
    } catch (error) {
      fn.mock.results.push({
        type: 'throw',
        value: error
      })
      return error
    }
  }
  fn.mock = {
    calls: [],
    results: [],
    instances: [],
  }
  return fn
}
```

> 涉及到的关键知识：

1. 函数是可调用的对象，能添加属性；
2. 函数闭包；
3. apply 指定 this。

测试一下看：

```js
const f2 = mockFn(function(n, m) {
  return n + m
})
const r1 = f2(1, 2)
const r2 = f2(0, 10)
console.log(r1, 'zqj log')
console.log(r2, 'zqj log')
console.log(f2.mock, 'zqj log')
```

> 经过测试，符合我们的预期。

## 参考

[How to Write Functional Tests in React (Part 1)](https://echobind.com/post/how-to-write-functional-tests-in-react-part-1)

[Jest Spyon: All You Need To Know About This Function](https://www.positioniseverything.net/jest-spyon/)

[The Jest Handbook](https://codewithhugo.com/guides/jest-handbook/)

[Spying on Functions and Changing Implementation](https://silvenon.com/blog/mocking-with-jest/functions)

[Frontend Unit Testing | Best Practices & Tutorial](https://www.meticulous.ai/blog/frontend-unit-testing-best-practices)

[mocking-default-imports-in-jest-with-typescript](https://ilikekillnerds.com/2019/10/mocking-default-imports-in-jest-with-typescript/)
