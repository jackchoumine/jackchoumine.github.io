# jest 快速上手

jest 是一个包含了最佳实践、测试运行器、CLI、断言库、存根库、模块模拟库和覆盖率的js测试框架。

## 常见数据类型的匹配器

jest 提供了丰富的匹配器，用来判断值是否符合预期。

### 对象

> toHaveProperty('name')，判断对象是否有某个属性

> toBe 引用比较 或者 `===`

> toEqual 值比较，值相同，就相等，会递归地比较。

> toBeNull 检查 `null`

> toBeDefined(只要有值，即通过测试)、toBeUndefined 检查 `undefined`

### 数组、set

| 匹配器         | 使用场景             |
| -------------- | -------------------- |
| toContain      | 包含，全等           |
| toContainEqual | 数组、set 值相等匹配 |
| toHaveLength   | 判断长度             |

### 字符串

> toContain 包含字符串

### 数字

> BeCloseTo 浮点数判断相等

> toBeGreaterThan 大于

### 布尔值

> toBeTruthy 真值

> toBeFalsy 假值

> 技巧：少用 toBe(true)，因为当测试失败，它给不出更加具体的错误提示，只是 true 或者 false，会难以定位错误。

### 快照匹配器

| 匹配器                | 使用场景 |
| --------------------- | -------- |
| toMatchInlineSnapshot | 内联快照 |

### 函数匹配器

> 抛出异常

```js
const testFn = () => {
  throw new Error('test')
}
describe('函数抛出方法匹配', () => {
  test('should throw error', () => {
    expect(testFn).toThrow()
    expect(testFn).not.toThrow(/a/)
    expect(testFn).toThrow('test')
  })
})
```

jest 匹配器还有很多，可以参考官方文档：[Expect](https://jestjs.io/docs/expect)。

### 常用函数钩子

`beforeEach` 在每个测试之前运行。
`afterEach` 在每个测试之后运行。
`beforeAll` 所有测试运行运行之前运行。
`afterAll` 所有测试运行运行之后运行。

钩子函数的作用域：钩子函数的作用域和 `describe` 的作用域一样，只在当前 `describe` 有效。

顶级的 beforeEach 会比 describe 中的 beforeEach 执行的更早。

```js
beforeAll(() => {
  console.log('beforeAll ---1')
})

afterAll(() => {
  console.log('afterAll ---1')
})

beforeEach(() => {
  console.log('beforeEach ----- 1')
})

afterEach(() => {
  console.log('afterEach ----- 1')
})

test('city database has Vienna', () => {
  expect('Vienna').toBeTruthy()
})

describe('真值假值测试', () => {
  beforeAll(() => {
    console.log('beforeAll')
  })

  afterAll(() => {
    console.log('afterAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })
  afterEach(() => {
    console.log('afterEach')
  })

  test('真值？', () => {
    expect(true).toBeTruthy()
    expect('0').toBeTruthy()
    expect(1).toBeTruthy()
    expect(100).toBeTruthy()
    expect({}).toBeTruthy()
    expect([]).toBeTruthy()
  })
})
// beforeAll ---1

// beforeEach ----- 1
// afterEach ----- 1

// beforeAll
// beforeEach ----- 1
// beforeEach
// afterEach
// afterEach ----- 1

// afterAll
// afterAll ----- 1
```

describe 之间互不影响。

```js
describe('describe 1', () => {
  beforeAll(() => {
    console.log('beforeAll ---1')
  })

  afterAll(() => {
    console.log('afterAll ---1')
  })

  beforeEach(() => {
    console.log('beforeEach ----- 1')
  })

  afterEach(() => {
    console.log('afterEach ----- 1')
  })

  test('city database has Vienna', () => {
    expect('Vienna').toBeTruthy()
  })
})

describe('真值假值测试', () => {
  beforeAll(() => {
    console.log('beforeAll')
  })

  afterAll(() => {
    console.log('afterAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })
  afterEach(() => {
    console.log('afterEach')
  })
  test('真值？', () => {
    expect(true).toBeTruthy()
    expect('0').toBeTruthy()
    expect(1).toBeTruthy()
    expect(100).toBeTruthy()
    expect({}).toBeTruthy()
    expect([]).toBeTruthy()
  })

  // beforeAll ---1
  // beforeEach ----- 1
  // afterEach ----- 1
  // afterAll ---1

  // beforeAll
  // beforeEach
  // afterEach
  // afterAll
})
```

describe 的回调先于所有测试之前运行。

```js
describe('describe outer', () => {
  console.log('describe outer-a')

  describe('describe inner 1', () => {
    console.log('describe inner 1')

    test('test 1', () => console.log('test 1'))
  })

  console.log('describe outer-b')

  test('test 2', () => console.log('test 2'))

  describe('describe inner 2', () => {
    console.log('describe inner 2')

    test('test 3', () => console.log('test 3'))
  })

  console.log('describe outer-c')
})
```

只运行一条测试：

```js
describe('describe outer', () => {
  console.log('describe outer-a')

  describe('describe inner 1', () => {
    console.log('describe inner 1')

    test('test 1', () => console.log('test 1'))
  })

  console.log('describe outer-b')

  test.only('test only', () => console.log('test only'))
  test('test 2', () => console.log('test 2'))

  describe('describe inner 2', () => {
    console.log('describe inner 2')

    test('test 3', () => console.log('test 3'))
  })

  console.log('describe outer-c')
})
```

`test.only` 表示只运行这个测试用例，其他测试用例都会被跳过, 在测试之间相互影响时，很有用。

it 是 test 的别名 xit 表示跳过这个测试用例，在跳过某些正在或者不想要测试的用例时特别有用。

第一个参数是测试用例的名字，在同一个测试套件里要**唯一**，取名字最好见名知义。

更多阅读：[How to run, ignore or skip Jest tests, suites and files](https://codewithhugo.com/jest-run-ignore-skip-tests/)

## 测试异步代码

当你有以**异步方式**运行的代码时，Jest 需要知道当前它测试的代码是否已完成，然后它可以转移到另一个测试。

### 回调类型的异步

使用 `done`

有一函数：

```js
import axios from 'axios'

function asyncApiCallback(callback: any) {
  axios.get('http://localhost:3001/posts').then(res => callback(res.data))
}
```

测试用例：

```js
it('asyncApiCallback', done => {
  asyncApiCallback((data: any) => {
    expect(data).toEqual(dbJson.posts)
    done()
  })
})
```

### promise 类型的异步

使用 async await

有一函数：

```js
function asyncApiPromise() {
  return axios.get('https://jsonplaceholder.typicode.com/todos/120').then(res => res.data)
}
```

测试用例：

```js
it('asyncApiPromise async', async () => {
  const res = await asyncApiPromise()
  expect(res.id).toEqual(120)
})
```

也可以使用 done

```js
it('asyncApiPromise', done => {
  asyncApiPromise().then((data: any) => {
    expect(data.id).toEqual(120)
    done()
  })
})
```

还可以使用 `return` 的方式：

```js
it('asyncApiPromise2', () => {
  expect.assertions(1)
  return asyncApiPromise().then((data: any) => {
    expect(data.id).toEqual(120)
  })
})
```

> 推荐的实践：回调类型的使用 `done` ，promise 类型的使用 `async await` ，且使用 `expect.assertions(1)` 保证有一个断言，防止忘记写断言。

## 模拟依赖

有一个函数：

```js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index])
  }
}
```

callback 是用户使用这个函数给的具体实现，希望测试 forEach，就需要模拟一个实现，测试函数的行为：入参、调用次数、返回值等。

```js
describe('forEach', () => {
  test('forEach', () => {
    const mockCallback = jest.fn(x => 42 + x)
    forEach([0, 1], mockCallback)
    // 此 mock 函数被调用了两次
    expect(mockCallback.mock.calls.length).toBe(2)

    // 第一次调用函数时的第一个参数是 0
    expect(mockCallback.mock.calls[0][0]).toBe(0)

    // 第二次调用函数时的第一个参数是 1
    expect(mockCallback.mock.calls[1][0]).toBe(1)

    // 第一次函数调用的返回值是 42
    expect(mockCallback.mock.results[0].value).toBe(42)
  })
})
```

> mock 属性

所有 mock 函数都有一个 `.mock` 属性，它保存了函数调用情况：是否被调用、调用次数、调用参数、返回值、调用顺序和this 等信息。

```js
const myMock1 = jest.fn()
const a = new myMock1()
// this 实例
console.log(myMock1.mock.instances) //  [ mockConstructor { name: 'a' } ]
// > [ <a> ]

const myMock2 = jest.fn()
const b = {}
const bound = myMock2.bind(b)
bound()
// this 实例
console.log(myMock2.mock.contexts) //  [ { name: 'b' } ]
// > [ <b> ]
```

1. `mock.calls` 被调用的次数

2. `mock.calls[0][0]` 第一次被调用的第一个参数

3. `mock.results[0].value` 第一次被调用的返回值

4. `mock.lastCall[0]` 最后一次调用的第一个参数

但是这种用法，挺繁琐，下面是更简单的用法。

> mock 函数返回值

直接模拟返回值，可跳过中间操作，直接观察组件的表现。

```js
const myMock = jest.fn()
console.log(myMock())
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true)

console.log(myMock(), myMock(), myMock(), myMock())
//### x true true // 返回值保留著最后一个

const filterTestFn = jest.fn()

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false)

const result = [1, 12].filter(num => filterTestFn(num))

console.log(result)
// > [11]
console.log(filterTestFn.mock.calls[0][0]) // 11
console.log(filterTestFn.mock.calls[1][0]) // 12
```

> mock 模块

有一个模块：

```js
import axios from 'axios'

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

测试这个接口调用，也许接口还没写好，也许接口很脆弱（不能多次调用），就需要我们模拟接口的返回值，提供一些假的数据。

```js
import axios from 'axios'

import Users from './users'

jest.mock('axios')

test('should fetch users', () => {
  const users = [
    {
      name: 'Bob',
    },
  ]
  const resp = {
    data: users,
  }

  axios.get.mockResolvedValue(resp) // NOTE 模拟 promise resolve

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users))
})
```

### 如何模拟浏览器的环境

jest 是在 node 环境下运行的，没有浏览器的环境，所以我们需要模拟浏览器的环境。

jsdom 是一个模拟浏览器环境的库，可以在 node 环境下运行。

1. 使用 jsdom 模拟浏览器环境

`jest.config.js` 的 `testEnvironment: 'jsdom'` ，开启 jsdom 模拟浏览器环境。

2. 自己实现一个 localStorage

可参考这个教程

[jest小书---测试环境](https://github.yanhaixiang.com/jest-tutorial/basic/test-environment/#%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83)

[jest模拟 window.location](https://github.yanhaixiang.com/jest-tutorial/basic/navigation/#mock-location)

## js 函数的测试

js 函数的测试，是最简单的测试，只需要调用函数，然后断言函数的返回值是否符合预期即可。

> 使用的环境是 [jest + ts + react + sass 测试环境](https://jackchoumine.github.io/web/js/jest-setup-2.html)，封装一个浏览器存储函数，对其进行测试。

```ts
// src/utils/storage.ts
type StorageType = 'local' | 'session'

function set<V = unknown>(key: string, value: V, type: StorageType = 'session') {
  const jsonValue = JSON.stringify(value)
  if (type === 'local') {
    localStorage.setItem(key, jsonValue)
  } else if (type === 'session') {
    sessionStorage.setItem(key, jsonValue)
  } else {
    throw new Error('不支持的存储类型')
  }
}

function get(key: string, type: StorageType = 'session') {
  if (type === 'local') {
    try {
      let value = JSON.parse(localStorage.getItem(key)!)
      return value
    } catch (error) {
      return localStorage.getItem(key)
    }
  } else if (type === 'session') {
    try {
      let value = JSON.parse(sessionStorage.getItem(key)!)
      return value
    } catch (error) {
      return sessionStorage.getItem(key)
    }
  } else {
    throw new Error('不支持的存储类型')
  }
}

function clear(type: StorageType = 'session') {
  if (type === 'local') {
    localStorage.clear()
  } else if (type === 'session') {
    sessionStorage.clear()
  } else {
    throw new Error('不支持的存储类型')
  }
}

function remove(key: string, type: StorageType = 'session') {
  if (type === 'local') {
    localStorage.removeItem(key)
  } else if (type === 'session') {
    sessionStorage.removeItem(key)
  } else {
    throw new Error('不支持的存储类型')
  }
}

const storage = {
  get,
  set,
  clear,
  remove,
}

export { storage }
```

测试代码：

```JS
// src/utils/storage.test.ts
import {
  storage
} from './storage'
describe('storage', () => {
  describe('默认是 sessionStorage', () => {
    beforeEach(() => {
      sessionStorage.clear()
    })
    it('storage.set', () => {
      const value = 'hello'
      const key = 'sessionKey'
      storage.set(key, value)
      expect(sessionStorage.getItem(key)).toEqual(JSON.stringify(value))

      const key2 = 'sessionKey2'
      const value2 = {
        name: 'zqj',
      }
      storage.set(key2, value2)

      expect(storage.get(key2)).toEqual(value2)
    })

    it('storage.get', () => {
      const value = JSON.stringify('hello')
      const key = 'sessionKey'
      sessionStorage.setItem(key, value)

      expect(sessionStorage.getItem(key)).toEqual(value)
      expect(storage.get(key)).toEqual(JSON.parse(value))
    })
    it('storage.remove', () => {
      const key = 'sessionKey'
      const value = ['hello']
      storage.set(key, value)

      expect(storage.get(key)).toEqual(value)

      storage.remove(key)

      expect(storage.get(key)).toBeNull()
    })
    it('storage.clear', () => {
      const key = 'sessionKey'
      const value = ['hello']
      storage.set(key, value)
      const key2 = 'sessionKey2'
      const value2 = {}
      storage.set(key2, value2)

      expect(storage.get(key)).toEqual(value)
      expect(storage.get(key2)).toEqual(value2)

      storage.clear()

      expect(storage.get(key)).toBeNull()
      expect(storage.get(key2)).toBeNull()
    })
  })
  describe('设置 localStorage', () => {
    beforeEach(() => {
      localStorage.clear()
    })
    it('storage.set', () => {
      const value = 'hello'
      const key = 'sessionKey'
      storage.set(key, value, 'local')
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(value))

      const key2 = 'sessionKey2'
      const value2 = {
        name: 'zqj',
      }
      storage.set(key2, value2, 'local')

      expect(storage.get(key2, 'local')).toEqual(value2)
    })

    it('storage.get', () => {
      const value = JSON.stringify('hello')
      const key = 'sessionKey'
      localStorage.setItem(key, value)

      expect(localStorage.getItem(key)).toEqual(value)
      expect(storage.get(key, 'local')).toEqual(JSON.parse(value))
    })
    it('storage.remove', () => {
      const key = 'sessionKey'
      const value = ['hello']
      storage.set(key, value, 'local')

      expect(storage.get(key, 'local')).toEqual(value)

      storage.remove(key, 'local')

      expect(storage.get(key, 'local')).toBeNull()
    })
    it('storage.clear', () => {
      const key = 'sessionKey'
      const value = ['hello']
      storage.set(key, value, 'local')
      const key2 = 'sessionKey2'
      const value2 = {}
      storage.set(key2, value2, 'local')

      expect(storage.get(key, 'local')).toEqual(value)
      expect(storage.get(key2, 'local')).toEqual(value2)

      storage.clear('local')

      expect(storage.get(key, 'local')).toBeNull()
      expect(storage.get(key2, 'local')).toBeNull()
    })
  })
})
```

控制台的测试报告显示，测试通过，但是 `storage.ts` 的代码语句覆盖率、分支覆盖率、行级覆盖率都不是100%。

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/WX20230813-170006@2x.png)

使用 `liver Server` 扩展打来测试报告，看看哪些代码没有覆盖到：

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/WX20230813-170138@2x.png)

> 粉红色表示未覆盖的语句，黄色表示未覆盖的分支。

> 行号旁边的 nx，表示这行代码执行过几次。

> 是否生成测试报告和统计哪些文件的覆盖率，可从 `jest.config.js` 配置：

```JS
{
  collectCoverage: true, // 是否生成测试报告
  collectCoverageFrom: [ // 统计哪些文件的覆盖率
    './src/**/*.{js,jsx,ts,tsx}',
    '!./src/apis/**',
    '!./src/**/*/index.{ts,tsx,js,jsx}',
    '!./src/**/*.d.ts',
    '!./src/App.tsx',
    '!./src/main.tsx',
    '!**/node_modules/**',
  ],
}
```

报告显示，几个异常分支没有覆盖到，我们来补充测试用例，再嵌套一个 `describe('设置错误的 type')` ：

```JS
describe('设置错误的 type', () => {
  it('storage.set throw', () => {
    expect(() => storage.set('key', 'error', 'errorType'
      as any)).toThrowError()
  })
  it('storage.get throw', () => {
    storage.set('key', 'error')
    expect(() => storage.get('key', 'errorType'
      as any)).toThrowError()

    const value = 'error'
    sessionStorage.setItem('key2', value)

    expect(storage.get('key2')).toBe(value)

    // 不是一个合法的 json 字符串
    const valueObj = '{name: "zqj"}}'
    localStorage.setItem('key2', valueObj)

    // 部署合法的 JSON 字符串，返回原字符串，不进行 JSON.parse
    expect(storage.get('key2', 'local')).toBe(valueObj)
  })
  it('storage.remove throw', () => {
    storage.set('key', 'error')
    expect(() => storage.remove('key', 'errorType'
      as any)).toThrowError()
  })
  it('storage.clear throw', () => {
    expect(() => storage.clear('errorType'
      as any)).toThrowError()
  })
})
```

再次运行测试，测试通过，测试覆盖率都是 100%。✅ js 函数的测试，最好是 100% 的覆盖率。

> 测试技巧1 --- 先正常，后异常

先测试代码的正常分支，再测试异常分支，更加有条理。

> 测试技巧2 --- 同类用例合并

一个 `describe` 是一个测试套件，一个 `it` 是一个测试用例，一个 `describe` 可以嵌套多个 `it` ，通常把同类型的测试用例放在一个 `describe` 中，更加有条理，比如上面的 `describe('默认是 sessionStorage')` ，都是 `sessionStorage` 的测试用例。

> 测试技巧3 --- 一个文件最好只有一个测试套件

上面的三个 `describe` 放在一个 `describe('storage')` 中，可以使用 `jest Runner` 一键执行所有用例。

> 测试技巧4 --- 给测试用例起一个好名字

it 的第一个参数是测试用例的名字，在同一个测试套件里要唯一，取名字最好见名知义。

> 测试技巧5 --- 使用 jest 钩子在用例执行之前或者之后执行一些操作

`beforeEach` 在每个测试用例执行之前执行，可以在这里做一些初始化操作，比如上面的 `beforeEach(() => { localStorage.clear() })` ，在每个测试用例执行之前清空 localStorage。

`afterEach` 在每个测试用例执行之后执行。
`beforeAll` 在所有测试用例执行之前执行。
`afterAll` 在所有测试用例执行之后执行。

钩子函数的作用域：钩子函数的作用域和 `describe` 的作用域一样，只在当前 `describe` 有效。

## 小结

- 学习了常用的匹配器
- 学习了测试异步代码的方法
- 学习如何模拟依赖
- 使用钩子函数组织测试用例
- 封装了 storage 工具类，学习了如何测试 js 函数
