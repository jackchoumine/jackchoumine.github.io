# jest 测试笔记（二）

## js函数的测试

js 函数的测试，是最简单的测试，只需要调用函数，然后断言函数的返回值是否符合预期即可。

> 常见的对 storage 的封装

```js
// src/utils/storage.js
type StorageType = 'local' | 'session'

function set < V = unknown > (key: string, value: V, type: StorageType = 'session') {
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
      let value = JSON.parse(localStorage.getItem(key) !)
      return value
    } catch (error) {
      return localStorage.getItem(key)
    }
  } else if (type === 'session') {
    try {
      let value = JSON.parse(sessionStorage.getItem(key) !)
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

export {
  storage
}
```

测试代码：

```JS
// src/utils/storage.test.js
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

再次运行测试，测试通过，测试覆盖率都是 100%。✅

> 测试技巧1 --- 先正常，后异常

先测试代码的正常运行的分支，再测试异常分支，更加有条理。

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

### js 函数测试策略

1. js 函数最好到达100%的覆盖率

### 如何模拟浏览器的环境

jest 是在 node 环境下运行的，没有浏览器的环境，所以我们需要模拟浏览器的环境。

jsdom 是一个模拟浏览器环境的库，可以在 node 环境下运行。

1. 使用 jsdom 模拟浏览器环境

`jest.config.js` 的 `testEnvironment: 'jsdom'` ，开启 jsdom 模拟浏览器环境。

2. 自己实现一个 localStorage

可参考这个教程

[jest小书---测试环境](https://github.yanhaixiang.com/jest-tutorial/basic/test-environment/#%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83)

[jest模拟window.location](https://github.yanhaixiang.com/jest-tutorial/basic/navigation/#mock-location)

## 组件测试
