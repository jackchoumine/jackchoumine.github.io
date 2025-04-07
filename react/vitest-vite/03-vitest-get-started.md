# vitest 快速入门

vitest 提供了和 jest 兼容的 api，同时保证了很高的性能，如果你熟悉 jest，那么使用 vitest，会毫无成本。

主要学习常用的匹配器和钩子函数。

## 常用的匹配器

> 匹配器：检查函数执行结果是否符合预期的函数，比如 `toBeTruthy` 检查结果是否为真值。

匹配器（Matcher） 是用来 验证测试结果是否符合预期 的方法。它们通常用于 expect() 语句后，对值进行比较、检查类型或结构，并决定测试是否通过。

vitest 有很多匹配，根据数据类型不同，学习常用的就行了。

### 匹配器的作用

1. 比较值（如 toBe, toEqual）

2. 检查类型（如 toBeNull, toBeInstanceOf）

3. 验证数据结构（如 toContain, toHaveProperty）

4. 模糊匹配（如 expect.any(), expect.anything()）

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
  it.skip('严格深度比较', () => {
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

| 匹配器            | 用途             | 示例                                |
| ----------------- | ---------------- | ----------------------------------- |
| `toBe()`          | 检查引用是否相同 | `expect(obj).toBe(obj)`             |
| `toBeNull()`      | 是否为 null      | `expect(null).toBeNull()`           |
| `toBeUndefined()` | 是否为 undefined | `expect(undefined).toBeUndefined()` |
| `toBeDefined()`   | 是否已定义       | `expect(1).toBeDefined()`           |
| `toBeNaN()`       | 是否为 NaN       | `expect(NaN).toBeNaN()`             |

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
    // 匹配一个对象，包含数组（数组包含数字和特定字符串）
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

## 钩子函数

## 小结
