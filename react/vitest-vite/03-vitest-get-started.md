# vitest 快速入门

vitest 提供了和 jest 兼容的 api，同时保证了很高的性能，如果你熟悉 jest，那么使用 vitest，会毫无成本。

主要学习常用的匹配器和钩子函数。

## 常用的匹配器

> 匹配器：检查函数执行结果是否符合预期的函数，比如 `toBeTruthy` 检查结果是否为真值。

匹配器(Matcher) 是用来 验证测试结果是否符合预期 的方法。它们通常用于 expect() 语句后，对值进行比较、检查类型或结构，并决定测试是否通过。

vitest 有很多匹配，根据数据类型不同，学习常用的就行了。

### 匹配器的作用

1. 比较值(如 toBe, toEqual)

2. 检查类型(如 toBeNull, toBeInstanceOf)

3. 验证数据结构(如 toContain, toHaveProperty)

4. 模糊匹配(如 expect.any(), expect.anything())

5. 异常处理 toThrow

expect 函数里放代码执行结果，而匹配器放预期结果，如果两个结果相同，测试断言通过。

### 对象匹配器

| 匹配器                           | 用途                                              | 示例                                                     |
| -------------------------------- | ------------------------------------------------- | -------------------------------------------------------- |
| `toEqual()`                      | 深度比较对象的值是否相等                          | `expect(obj).toEqual({ a: 1 })`                          |
| `toStrictEqual()`                | 深度比较对象的值和结构(包括`undefined`和额外属性) | `expect(obj).toStrictEqual({ a: 1 })`                    |
| `toMatchObject()`                | 检查对象是否包含给定的属性(不要求完全匹配)        | `expect(obj).toMatchObject({ a: 1 })`                    |
| `toHaveProperty(keyPath, value)` | 检查对象是否包含某属性路径(可验证值)              | `expect(obj).toHaveProperty('a.b', 1)`                   |
| `objectContaining(object)`       | 检查对象是否包含部分属性                          | `expect(obj).toEqual(expect.objectContaining({ a: 1 }))` |
| `expect.any(constructor)`        | 匹配对象属性是否为指定类型                        | `expect(obj.a).toEqual(expect.any(Number))`              |
| `expect.anything()`              | 匹配任何非`null`或`undefined`的值                 | `expect(obj.a).toEqual(expect.anything())`               |

```ts
import { describe, expect, it } from 'vitest'

const obj = {
  a: {
    b: {
      age: 123,
    },
  },
  users: [
    { name: 'jack', age: 20 },
    { name: 'tom', age: 40 },
  ],
}
const simpleObj = {
  a: 1,
}
describe('对象匹配器', () => {
  it('宽松深度比较', () => {
    // 属性值为 undefined 视为没有
    // 数组中的 undefined 元素，视为存在
    const obj2 = {
      a: {
        b: {
          age: 123,
        },
      },
      users: [
        { name: 'jack', age: 20 },
        { name: 'tom', age: 40 },
      ],
      c: undefined,
    }
    expect(obj).toEqual(obj2)
    expect(simpleObj).toEqual({ a: 1, b: undefined })
    expect(simpleObj).not.toEqual({ a: 1, b: undefined, c: '123' })

    const arr = [1, 3]
    expect(arr).not.toEqual([1, undefined, 3])
  })
  it('严格深度比较', () => {
    const obj2 = {
      a: {
        b: {
          age: 123,
        },
      },
      users: [
        { name: 'jack', age: 20 },
        { name: 'tom', age: 40 },
      ],
      c: undefined,
    }
    expect(obj).not.toStrictEqual(obj2)
  })
  it('检查对象的属性', () => {
    expect(obj).toHaveProperty('a.b.age')
    expect(obj).toHaveProperty('users')
  })
  it('是否包含给定对象', () => {
    const obj2 = {
      a: {
        b: {
          age: 123,
        },
      },
    }
    expect(obj).toMatchObject(obj2)
  })
  it('是否包含部分属性', () => {
    const obj2 = {
      a: {
        b: {
          age: 123,
        },
      },
    }
    expect(obj).toEqual(expect.objectContaining(obj2))
  })
  it('属性值为 null 或者 undefined', () => {
    expect(obj.users).toEqual(expect.anything())
    // @ts-ignore
    expect(obj.no).not.toEqual(expect.anything())
    // @ts-ignore
    expect(obj.no).toBeUndefined()

    const o = {
      name: null,
    }
    expect(o.name).toBeNull()
  })
})
```

> toEqual vs toStrictEqual

toEqual 会忽略值为 undefined 的属性，而 toStrictEqual 不会。

推荐使用 toEqual，能覆盖大部分场景。

### 数组、set 匹配器

| 匹配器                    | 用途                                              | 示例                                                  |
| ------------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| `toEqual()`               | 深度比较数组的值是否相等                          | `expect(arr).toEqual([1, 2, 3])`                      |
| `toStrictEqual()`         | 深度比较数组的值和结构(包括`undefined`或稀疏数组) | `expect(arr).toStrictEqual([1, 2])`                   |
| `toContain(item)`         | 检查数组是否包含某个值(适用于基本类型)            | `expect(arr).toContain(2)`                            |
| `toContainEqual(item)`    | 检查数组是否包含某个对象/数组(深度匹配)           | `expect(arr).toContainEqual({ a: 1 })`                |
| `toHaveLength(n)`         | 检查数组长度                                      | `expect(arr).toHaveLength(3)`                         |
| `arrayContaining(array)`  | 检查数组是否包含子集                              | `expect(arr).toEqual(expect.arrayContaining([1, 2]))` |
| `expect.any(constructor)` | 匹配数组元素是否为指定类型                        | `expect(arr[0]).toEqual(expect.any(Number))`          |

```ts
import { describe, expect, it } from 'vitest'

const shallowArr = [1, 2, 3]
const deepArr = [
  { name: 'vite', age: 5 },
  { name: 'vue', age: 15, info: { rate: 5, user: 100 } },
]

describe('数组匹配器', () => {
  it('宽松深度比较', () => {
    // 元素为 undefined 视为有
    expect(shallowArr).toEqual([1, 2, 3])
    expect(shallowArr).not.toEqual([1, 2, 3, undefined])
    const result = [
      { name: 'vite', age: 5 },
      { name: 'vue', age: 15, info: { rate: 5, user: 100 } },
    ]
    expect(deepArr).toEqual(result)
  })
  it('严格深度比较', () => {
    const result = [
      { name: 'vite', age: 5 },
      { name: 'vue', age: 15, info: { rate: 5, user: 100 } },
    ]
    expect(deepArr).toStrictEqual(result)
  })
  it('是否包含给定对象', () => {
    // 值比较
    expect(deepArr).toContainEqual({ name: 'vite', age: 5 })
    // 引用比较
    expect(deepArr).not.toContain({ name: 'vite', age: 5 })
    expect(deepArr).toContain(deepArr[0])
  })
  it('是否包含子集', () => {
    expect(deepArr).toEqual(expect.arrayContaining([{ name: 'vite', age: 5 }]))
  })
  it('检查长度', () => {
    expect(deepArr).toHaveLength(2)
  })
})
```

### 字符串匹配器

| 匹配器              | 用途                   | 示例                               |
| ------------------- | ---------------------- | ---------------------------------- |
| `toMatch(regex)`    | 检查字符串是否匹配正则 | `expect('hello').toMatch(/^hel/)`  |
| `toContain(subStr)` | 检查子串               | `expect('hello').toContain('ell')` |

```ts
import { describe, expect, it } from 'vitest'

describe('字符串匹配器', () => {
  it('正则验证', () => {
    expect('hello vitest').toMatch(/vitest/)
    expect('hello vitest').toMatch(/Vitest/i)
  })
  it('检查子串', () => {
    expect('hello vitest').toContain('hello')
  })
  it('检查长度', () => {
    expect('hello').toHaveLength(5)
  })
})
```

### 数值匹配器

| 匹配器                      | 用途           | 示例                                   |
| --------------------------- | -------------- | -------------------------------------- |
| `toBeGreaterThan(n)`        | 是否大于 n     | `expect(10).toBeGreaterThan(5)`        |
| `toBeGreaterThanOrEqual(n)` | 是否大于等于 n | `expect(10).toBeGreaterThanOrEqual(5)` |
| `toBeLessThan(n)`           | 是否小于 n     | `expect(10).toBeLessThan(5)`           |
| `toBeLessThanOrEqual(n)`    | 是否小于等于 n | `expect(10).toBeLessThanOrEqual(5)`    |
| `toBeCloseTo(n, numDigits)` | 是否接近 n     | `expect(0.1 + 0.2).toBeClose(0.3)`     |

> js 浮点数计算不精确，使用 toBeCloseTo 来比较浮点数。

数值匹配比较简单，不举例。

### 布尔值匹配器

| 匹配器         | 用途       | 示例                        |
| -------------- | ---------- | --------------------------- |
| `toBeTruthy()` | 是否为真值 | `expect(true).toBeTruthy()` |
| `toBeFalsy()`  | 是否为假值 | `expect(false).toBeFalsy()` |

> 技巧：少用 toBe(true) 或 布尔值匹配器，因为当测试失败，它给不出更加具体的错误提示，只是 true 或者 false，会增加排错难度。

### 通用匹配器

| 匹配器             | 用途             | 示例                                                    |
| ------------------ | ---------------- | ------------------------------------------------------- |
| `toBe()`           | 检查引用是否相同 | `expect(obj).toBe(obj)`                                 |
| `toBeNull()`       | 是否为 null      | `expect(null).toBeNull()`                               |
| `toBeUndefined()`  | 是否为 undefined | `expect(undefined).toBeUndefined()`                     |
| `toBeDefined()`    | 是否已定义       | `expect(1).toBeDefined()`                               |
| `toBeNaN()`        | 是否为 NaN       | `expect(NaN).toBeNaN()`                                 |
| `toBeInstanceOf()` | 是否为实例       | `expect(fn).toBeInstanceOf(Function)`                   |
| `toBeOneOf()`      | 数组中一个元素   | `expect(ele).toBeOneOf([expect.any(String),undefined])` |
| `toBeTypeOf()`     | 检查类型         | `expect(obj).toBeTypeOf('object')`                      |
| `toSatisfy(fn)`    | 传入函数         | `expect(1).toSatisfy(n=> n % 2 !==0)`                   |

### 模糊匹配器

模糊匹配器不用于精确匹配，而是用于检查值是否符合某种模式或类型。常用的使用场景：

- 非 null 和 undefined 的值；
- 检查数据类型，固定格式，随机数据；
- 检查部分数据结构。

常用的模糊匹配器有：

| 匹配器                            | 用途                              | 示例                                                      |
| --------------------------------- | --------------------------------- | --------------------------------------------------------- |
| `expect.any(constructor)`         | 匹配对象属性是否为指定类型        | `expect(obj.a).toEqual(expect.any(Number))`               |
| `expect.anything()`               | 匹配任何非`null`或`undefined`的值 | `expect(obj.a).toEqual(expect.anything())`                |
| `expect.arrayContaining(array)`   | 检查数组是否包含子集              | `expect(arr).toEqual(expect.arrayContaining([1, 2]))`     |
| `expect.objectContaining(object)` | 检查对象是否包含部分属性          | `expect(obj).toEqual(expect.objectContaining({ a: 1 }))`  |
| `expect.stringContaining(str)`    | 匹配包含子串的字符串              | `expect('hello').toEqual(expect.stringContaining('ell'))` |
| `expect.stringMatching(regex)`    | 匹配符合正则的字符串              | `expect('hello').toEqual(expect.stringMatching(/ell/))`   |

```ts
import { describe, expect, it } from 'vitest'

const deepArr = [
  { name: 'vite', age: 5 },
  { name: 'vue', age: 15, info: { rate: 5, user: 100 } },
]

describe('模糊配器', () => {
  it('检查数据类型', () => {
    expect(10).toEqual(expect.any(Number)) // ✅ 数字
    expect([]).toEqual(expect.any(Array)) // ✅ 数组
    expect('world').toEqual(expect.any(String)) // ✅ 字符串
    expect({}).toEqual(expect.any(Object)) // ✅ 对象
    expect(() => {}).toEqual(expect.any(Function)) // ✅ 函数
    expect(Symbol()).toEqual(expect.any(Symbol)) // ✅ 符号
  })
  it('检查非 nullish 值', () => {
    expect(42).toEqual(expect.anything()) // ✅ 数字
    expect('test').toEqual(expect.anything()) // ✅ 字符串
    expect(false).toEqual(expect.anything()) // ✅ 布尔值
    expect(null).not.toEqual(expect.anything()) // ❌ null 不匹配
  })

  it('是否包含子集', () => {
    expect(deepArr).toEqual(expect.arrayContaining([{ name: 'vite', age: 5 }]))
  })
  it('是否包含部分属性', () => {
    expect({ a: 1, age: 2 }).toEqual(
      expect.objectContaining({ a: 1 }) // ✅ 包含 a: 1
    )
  })
  it('是否包含子串', () => {
    expect('hello world').toEqual(
      expect.stringContaining('hello') // ✅ 包含 "hello"
    )
  })
  it('组合使用', () => {
    // 匹配一个对象，包含数组(数组包含数字和特定字符串)
    expect({
      id: expect.any(Number),
      items: expect.arrayContaining([
        expect.stringMatching(/item-\d+/),
        expect.any(String),
      ]),
    }).toEqual({
      id: 1,
      items: ['item-1', 'test'],
    })
  })
})
```

模糊匹配器常以 `expect.` 开头，用在 toEqual 或者 expect 中，可嵌套，而`to`开头的匹配器只能用在 expect 后，不可嵌套。

> 尽量使用精确匹配器，更简单直接，便于排错。

> 模糊匹配在检查 api 返回数据时，非常有用。

```ts
describe('模糊匹配器检查 api 返回', () => {
  it('检查 api 返回', () => {
    const response = {
      id: '123', // ✅ ID 是字符串 使用 number 作为 id，可能超出 js 安全整数范围
      name: 'Alice',
      createdAt: '2023-01-01 00:00:00', // ✅ 日期格式 YYYY-MM-DD HH:mm:ss
      age: 25,
      city: 'Beijing',
    }

    const YYYYMMDDHHmmss =
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
    expect(response).toEqual(
      // ✅ 包含 id、name、createdAt
      expect.objectContaining({
        id: expect.anything(), // ✅ 必须有 id
        name: expect.any(String), // ✅ 名字是字符串
        createdAt: expect.stringMatching(YYYYMMDDHHmmss), // ✅ 日期格式
      })
    )
  })
  it('检查分页接口', () => {
    const tableApiRes = {
      code: 0,
      msg: 'success',
      //✅ 这里需要的数据
      data: {
        rows: [], // 数据
        total: 100, // 总条数
        pageNow: 1, // 当前页
        pageSize: 10, // 每页条数
        a: 1, // 其他字段
        b: '2',
      },
    }

    // 先检查固定的字段
    expect(tableApiRes).toEqual(
      expect.objectContaining({
        code: expect.any(Number), // ✅ 数字
        msg: expect.any(String), // ✅ 字符串
        data: expect.any(Object), // ✅ 对象
      })
    )
    // 再检查分页部分
    expect(tableApiRes?.data).toEqual(expect.anything()) // ✅ 对象
    // 模糊配器 放在 toEqual 里更加好理解
    expect(tableApiRes.data).toEqual(
      expect.objectContaining({
        rows: expect.any(Array), // ✅ 数组
        total: expect.any(Number), // ✅ 数字
        pageNow: expect.any(Number), // ✅ 数字
        pageSize: expect.any(Number), // ✅ 数字
      })
    )
    // ok
    //expect(
    //  expect.objectContaining({
    //    rows: expect.any(Array), // ✅ 数组
    //    total: expect.any(Number), // ✅ 数字
    //    pageNow: expect.any(Number), // ✅ 数字
    //    pageSize: expect.any(Number), // ✅ 数字
    //  })
    //).toEqual(tableApiRes.data)
  })
})
```

### 函数匹配器

函数相关的匹配器，有三种：

- 检查函数是否定义：`toBeInstanceOf(Function)`
- 检查函数是否抛出异常：`toThrow`
- 调用情况：是否被调用，调用次数，实参，返回值，this 指向

#### 函数是否定义和抛错

```ts
import { describe, expect, it, vi } from 'vitest'

describe('函数匹配器', () => {
  it('函数是否定义', () => {
    const fn = () => {}
    // 函数是否定义
    expect(fn).toBeInstanceOf(Function)
    expect(1).not.toBeInstanceOf(Function)
    expect(fn).toBeDefined()
    expect(fn).toEqual(expect.any(Function))
    // 无法检查函数的形参
  })
  it('是否抛出错误', () => {
    function throwError() {
      throw new Error('Fail!')
    }

    // 检查是否抛出错误
    expect(() => throwError()).toThrow() // ✅

    // 检查错误消息是否匹配
    expect(() => throwError()).toThrow('Fail!') // ✅
    expect(() => throwError()).toThrow(/Fail/) // ✅ 正则匹配
  })
})
```

#### 函数调用情况

| 匹配器                              | 用途                               | 示例                                        |
| ----------------------------------- | ---------------------------------- | ------------------------------------------- |
| `toHaveBeenCalled()`                | 检查函数是否被调用                 | `expect(fn).toHaveBeenCalled()`             |
| `toHaveBeenCalledTimes(n)`          | 检查函数被调用次数                 | `expect(fn).toHaveBeenCalledTimes(2)`       |
| `toHaveBeenCalledWith(...args)`     | 检查函数被调用时的参数             | `expect(fn).toHaveBeenCalledWith(1, 2)`     |
| `toHaveBeenLastCalledWith(...args)` | 检查函数最后一次调用的参数         | `expect(fn).toHaveBeenLastCalledWith(1, 2)` |
| `toHaveReturned()`                  | 检查函数是否返回值                 | `expect(fn).toHaveReturned()`               |
| `toHaveReturnedTimes(n)`            | 检查函数返回次数                   | `expect(fn).toHaveReturnedTimes(2)`         |
| `toHaveReturnedWith(value)`         | 检查函数返回值                     | `expect(fn).toHaveReturnedWith(1)`          |
| `toHaveLastReturnedWith(value)`     | 检查函数最后返回值                 | `expect(fn).toHaveLastReturnedWith(1)`      |
| `toHaveNthReturnedWith(n, value)`   | 检查函数第 n 次返回值              | `expect(fn).toHaveNthReturnedWith(1, 1)`    |
| `toHaveBeenCalledBefore(fn)`        | 检查函数是否在另一个函数之前被调用 | `expect(fn).toHaveBeenCalledBefore(fn2)`    |
| `toHaveBeenCalledAfter(fn)`         | 检查函数是否在另一个函数之后被调用 | `expect(fn).toHaveBeenCalledAfter(fn2)`     |

```ts
describe('函数执行情况', () => {
  it('检查是否被调用', () => {
    const mockCallback = vi.fn()
    const arr = [1, 2, 3]

    arr.forEach(mockCallback)

    expect(mockCallback).toHaveBeenCalled()
    expect(mockCallback).toHaveBeenCalledTimes(arr.length)
    // 调用时传入的参数
    //console.log(mockCallback.mock.calls) // [[1], [2], [3]]
    mockCallback.mock.calls.forEach((call, index) => {
      expect(call[0]).toBe(arr[index])
      expect(call[1]).toBe(index)
    })
  })

  it('检查调用状态', () => {
    const mockFn = vi.fn()
    mockFn.mockReturnValue('hello')
    mockFn('hello', 42)
    mockFn(true)
    // 调用时的参数
    expect(mockFn).toHaveBeenCalledWith('hello', 42)
    expect(mockFn).toHaveBeenCalledWith(true)
    // 返回值
    expect(mockFn).toHaveReturned()
    expect(mockFn).toReturnWith('hello')
    expect(mockFn).toHaveReturnedTimes(2)
  })
})

describe('函数调用顺序', () => {
  it('检查调用顺序', () => {
    const mockFn1 = vi.fn()
    const mockFn2 = vi.fn()

    mockFn1()
    mockFn2()

    // 检查调用顺序
    expect(mockFn1).toHaveBeenCalledBefore(mockFn2)
    expect(mockFn2).toHaveBeenCalledAfter(mockFn1)
  })
})
```

以上是同步函数的匹配器，现在看看异步函数的匹配器。

#### 异步函数匹配器

> promise 和 async 型

| 匹配器                      | 用途                              | 示例                                            |
| --------------------------- | --------------------------------- | ----------------------------------------------- |
| `toHaveResolved()`          | promise 已经 resolved             | `expect(promise).toHaveResolved()`              |
| `toHaveResolvedWith(value)` | promise 已经 resolved value 值    | `expect(promise).toHaveResolvedWith('2')`       |
| `toHaveResolvedTimes()`     | promise 已经 resolved 次数        | `expect(promise).toHaveResolvedTimes(2)`        |
| `toHaveLastResolvedWith()`  | promise 最后 resolved value 值    | `expect(promise).toHaveLastResolvedWith('2')`   |
| `toHaveNthResolvedWith(n)`  | promise 第 n 次 resolved value 值 | `expect(promise).toHaveNthResolvedWith(1, '2')` |
| `resolves`                  | 检查 promise 是否成功             | `await expect(promise).resolves.toEqual(value)` |
| `rejects`                   | 检查 promise 是否失败             | `await expect(promise).rejects.toThrow(error)`  |

```ts
describe('异步函数匹配器', () => {
  it('检查异步函数 resolve', async () => {
    const mockAsyncFn = vi.fn(async () => 'hello')

    const result = await mockAsyncFn()

    // 检查异步函数是否被调用
    expect(mockAsyncFn).toHaveBeenCalled()
    expect(mockAsyncFn).toHaveResolvedWith('hello')
    expect(mockAsyncFn).toHaveResolvedTimes(1)
    expect(result).toBe('hello')
    await expect(mockAsyncFn()).resolves.toBe('hello')
  })

  it('检查异步函数抛出错误', async () => {
    const mockAsyncFn = vi.fn(async () => {
      throw new Error('Fail!')
    })

    // 检查异步函数是否抛出错误
    await expect(mockAsyncFn()).rejects.toThrow('Fail!')

    const asyncReject = vi.fn(
      () => new Promise((_, reject) => reject(new Error('Fail!')))
    )
    // NOTE 不能这样测试
    //const result = await asyncReject()
    // 检查异步函数是否抛出错误
    await expect(asyncReject()).rejects.toThrow('Fail!')
  })

  it('.then .catch 测试异步函数', () => {
    const async = async () => {
      return 'hello'
    }
    const reject = () => new Promise((_, reject) => reject(new Error('Fail!')))

    async().then(data => {
      expect(data).toBe('hello')
    })
    reject().catch(err => {
      expect(err).toEqual(new Error('Fail!'))
    })
  })
})
```

> 注意：异步函数的匹配器，必须使用 async/await 来测试。

> 也可以使用 return 的方式，不推荐这样写，扩展性差。

```ts
it('不推荐的测试方式1', () => {
  const mockAsyncFn = vi.fn(async () => {
    throw new Error('Fail!')
  })
  return expect(mockAsyncFn()).rejects.toThrow('Fail!') // ✅
})
it('不推荐的测试方式2', () => {
  const mockAsyncFn = vi.fn(async () => 'hello')
  return expect(mockAsyncFn()).resolves.toBe('hello') // ✅
})
```

> vitest 从 v0.1.0 起，不再支持通过 done 来测试回调型异步函数，推荐使用 async/await 来测试异步函数。

不举例了。

### 自定义匹配器

vitest 允许我们自定义匹配器，以满足自定义需求，方便我们在测试中复用。

toBeNull 和 toBeUndefined 是内置的匹配器，我们可以自定义一个匹配器，来检查对象是否为 null 或 undefined。

```ts
// fuzzyMatchers.test.ts
expect.extend({
  toBeNullish(received) {
    const isNullish = received == null // null 和 undefined 都会返回 true
    return {
      pass: isNullish,
      message: () => `expected to be null or undefined, but got ${received}`,
    }
  },
})
```

添加类型声明：在 vite-env.d.ts 中添加：

```ts
import { Assertion } from 'vitest'

declare module 'vitest' {
  interface Assertion {
    toBeNullish(): void
  }
}
```

上面测试接口返回分页结构的时候，使用多个匹配器，现在自定义一个分页接口匹配器：

```ts
// fuzzyMatchers.test.ts
expect.extend({
  toBePaginationRes(received) {
    let isValid = false
    const { rows, total, pageNow, pageSize } = received ?? {}
    isValid =
      Array.isArray(rows) &&
      typeof total === 'number' &&
      typeof pageNow === 'number' &&
      typeof pageSize === 'number'

    return {
      pass: isValid,
      message: () =>
        `expected ${this.utils.printReceived(received)} 符合分页接口返回的返回格式`,
    }
  },
})
```

使用：

```ts
it('检查分页接口返回', () => {
  const tableApiRes = {
    code: 0,
    msg: 'success',
    //✅ 这里需要的数据
    data: {
      rows: [], // 数据
      total: 100, // 总条数
      pageNow: 1, // 当前页
      pageSize: 10, // 每页条数
      a: 1, // 其他字段
      b: '2',
    },
  }

  // 先检查固定的字段
  expect(tableApiRes).toEqual(
    expect.objectContaining({
      code: expect.any(Number), // ✅ 数字
      msg: expect.any(String), // ✅ 字符串
      data: expect.any(Object), // ✅ 对象
    })
  )
  // 再检查分页部分
  expect(tableApiRes?.data).toEqual(expect.anything()) // ✅ 对象
  // 模糊配器 放在 toEqual 里更加好理解
  expect(tableApiRes.data).toEqual(
    expect.objectContaining({
      rows: expect.any(Array), // ✅ 数组
      total: expect.any(Number), // ✅ 数字
      pageNow: expect.any(Number), // ✅ 数字
      pageSize: expect.any(Number), // ✅ 数字
    })
  )
  expect(tableApiRes.data).toBePaginationRes() // ✅ 自定义配器
})
```

使用了自定义匹配器后，代码简洁多了。

#### 初始化文件

> 想让自定义匹配器在所有文档中可用，可定义在 vitest 的初始化配置文件中。

初始化文件会在运行测试之前自动执行，常用于全局测试环境的初始化：

- 扩展匹配器；
- 配置全局测试变量；
- 初始化模拟；
- 设置生命周期；
- 加载 polyfill，比如 使用 node-fetch 代替 fetch。

新建配置文件`vitest.setup.ts`:

```ts
import { expect } from 'vitest'

expect.extend({
  toBeNullish(received) {
    const isNullish = received == null // null 和 undefined 都会返回 true
    return {
      pass: isNullish,
      message: () =>
        `expected to be null or undefined, but got ${this.utils.printReceived(received)}`,
    }
  },
  toBePaginationRes(received) {
    let isValid = false
    const { rows, total, pageNow, pageSize } = received ?? {}
    isValid =
      Array.isArray(rows) &&
      typeof total === 'number' &&
      typeof pageNow === 'number' &&
      typeof pageSize === 'number'

    return {
      pass: isValid,
      message: () =>
        `expected ${this.utils.printReceived(received)} 符合分页接口返回的返回格式`,
    }
  },
})
```

在 vitest 配置文件中引入初始化文件：

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'], // 可选：全局初始化文档
  },
})
```

删除 `fuzzyMatchers.test.ts` 中的自定义匹配器，执行测试，正常。

定义匹配器还能定义成 async 函数：

```ts
expect.extend({
  async toBeAsyncEven(received: number) {
    const isEven = await Promise.resolve(received % 2 === 0)
    return {
      pass: isEven,
      message: () => `期望 ${received} 是偶数`,
    }
  },
})
```

> setupFiles vs setupFilesAfterEnv

vitest 的配置中，有 setupFiles 和 setupFilesAfterEnv 选项，它们有什么不同呢？

| 配置项             | 执行时机             | 用途                                           |
| ------------------ | -------------------- | ---------------------------------------------- |
| setupFiles         | 所有测试文档执行之前 | 扩展匹配器、全局模拟、全局生命周期、全局变量等 |
| setupFilesAfterEnv | 所有测试文档执行之后 | 恢复模拟                                       |

自定义匹配器小结：

- 定义匹配器：`expect.extend({ ... })`。
- 类型扩展：在 vite.env.d.ts 声明 Assertion 接口，匹配器的参数可不声明。
- 全局共享：通过配置文档或 setupFiles 加载。
- 异步支持：返回 Promise 即可。

## 相关测试 api

describe、it 都是 vitest 提供的 api，帮助我们组织测试用例，提供了更好的可读性和可维护性，让测试报告更加清晰。

> 会在控制台输出测试结果。

describe 用于分组测试用例，而 it 是 test 的别名，用于定义测试用例。

describe 可以嵌套，it 不可嵌套。

嵌套的 describe 可以共享上下文，比如共享变量、函数、mock 等。

```ts
import { beforeEach, describe, expect, it } from 'vitest'

describe('用户模块', () => {
  let user: any

  beforeEach(() => {
    console.log('beforeEach', 'zqj')
    user = { name: 'Alice', age: 25 } // 当前分组共享的初始化
  })

  it('应正确创建用户', () => {
    console.log('it1', 'zqj log')
    expect(user.name).toBe('Alice')
  })

  // 嵌套分组
  describe('权限检查', () => {
    beforeEach(() => {
      console.log('beforeEach inner', 'zqj')
    })
    it('年龄应大于18岁', () => {
      console.log('it2', 'zqj log')
      expect(user.age).toBeGreaterThan(18)
    })
  })
})
```

外层 describe 定义的 user 和 beforeEach ，在内层的 describe 可访问。

通常一个测试文件只会有一个 describe，多个 describe 适合用在大型项目中，或者需要分组的场景。

`it(name,fn)`，name 是测试用例的名称，通常是**预期的行为**，比如'1 + 1 应该为 2'、'多次调用，会等待100毫秒不再有新的调用，才执行'。

> 给单元测试起个好名字，能让测试报告更加清晰易读。

### describe 和 it 的扩展和参数

describe 和 it 都提供了一些扩展，帮助筛选测试分组和测试用例。

| 扩展                       | 用途                                                            |
| -------------------------- | --------------------------------------------------------------- |
| .only                      | 只运行当前测试用例或分组，跳过其他测试,常用于 debug             |
| .skip                      | 跳过当前测试用例或分组，常用在功能废弃后的测试                  |
| .skipIf(condition)('name') | 条件地跳过用例                                                  |
| .runIf(condition)('name')  | 条件地执行用例                                                  |
| .each                      | 运行多个测试用例，传入不同的参数                                |
| .todo                      | 标记为待办，表示测试用例待完成，常用于 TDD 先写测试用例，再实现 |

```ts
describe('用户模块2', () => {
  //@ts-ignore
  const isProd = process.env.NODE_ENV === 'production'
  // 正式环境，测试用例才执行
  it.skipIf(!isProd)('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2)
  })
  it.skip('1 + 100 = 101', () => {
    expect(1 + 100).toBe(101)
  })

  it('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2)
  })

  it.each([
    { a: 1, b: 1, expected: 2 },
    { a: 1, b: 2, expected: 3 },
    { a: 2, b: 1, expected: 3 },
  ])('sum($a, $b) = $expected', ({ a, b, expected }) => {
    function sum(a: number, b: number) {
      return a + b
    }
    expect(sum(a, b)).toBe(expected)
  })
})
```

it 的回调函数的参数叫测试上下文，有 expect、skip 方法，通过 each 传入的参数，也会附加到测试上下文中。

## 测试生命周期函数

测试生命周期函数是指在测试运行的不同阶段自动调用的函数。它们可以用于设置和清理测试环境，或者在测试运行前后执行一些操作，**确保测试环境的一致性和隔离性**。

vitest 提供了以下生命周期函数：

| 生命周期函数 | 执行时机                   | 常见用途                                 |
| ------------ | -------------------------- | ---------------------------------------- |
| beforeAll    | 在所有测试用例之前执行一次 | 配置全局资源，比如数据库连接，启动服务器 |
| beforeEach   | 在每个测试用例之前执行     | 设置模拟函数，比如使用假定时器           |
| afterEach    | 在每个测试用例之后执行     | 恢复模拟函数，比如使用真定时器           |
| afterAll     | 在所有测试用例之后执行一次 | 释放全局资源                             |

```ts
import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from 'vitest'

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

describe('函数调用顺序', () => {
  it('测试1', () => {
    console.log('测试1')
  })
  it('测试2', () => {
    console.log('测试2')
  })
})
// 调用顺序：
// beforeAll -> beforeEach -> 测试1 -> afterEach -> beforeEach -> 测试2 -> afterEach -> afterAll
```

举例：有一 delay 函数，模拟异步请求，使用 fake timers 来测试。

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms, ms))
}

beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})

describe('使用生命周期函数', () => {
  it('测试1', async () => {
    const p = delay(1000).then(() => '0')
    vi.advanceTimersByTime(1100)

    await expect(p).resolves.toBe('0')
  })

  it('测试2', async () => {
    const p = delay(2000)
    vi.advanceTimersByTime(2000)

    await expect(p).resolves.toEqual(expect.anything())
  })
})
```

在每个测试用例之前，使用 `beforeEach` 来设置假定时器，测试完成后，使用 `afterEach` 来恢复真定时器。

关于定时器的模拟，后续会单独讲解。

## 小结

- 常用的匹配器有：`toEqual`、`toBe`、`toMatch`、`toHaveProperty`、`toContain`、`toThrow`、`toBeInstanceOf` 等。
- 匹配器分为精确匹配器和模糊匹配器，精确匹配器用于检查值是否相等，模糊匹配器用于检查值是否符合某种模式或类型。
- 使用 `describe` 和 `it` 来组织测试用例，提供更好的可读性和可维护性。
- 使用生命周期函数来设置和清理测试环境，确保测试环境的一致性和隔离性。
- 异步函数的匹配器，使用 async/await 来测试。
- vitest 提供了自定义匹配器的定制接口，方便实现符合业务需求的匹配器。
