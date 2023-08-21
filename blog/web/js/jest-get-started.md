# jest 快速上手

前面的文章中，介绍了测试的难点之一是不知道如何模拟，而 jest 提供了丰富的模拟方法，使得测试变得简单。

本文能帮助你快速上手 jest，尤其是依赖的模拟和异步函数的测试，这两个是测试的难点和重点。

## 常见数据类型的匹配器

jest 提供了丰富的匹配器，用来判断值是否符合预期。

### 引用类型（对象和数组）

> toBe 引用比较 或者 `===`

> toEqual 值比较，值相同，就相等

> toBeNull 检查 `null`

> toBeDefined(只要有值，即通过测试)、toBeUndefined 检查 `undefined`

> toContain 数组、set 严格匹配

> toContainEqual 数组、set 值相等匹配

### 字符串

> toContain 包含字符串

### 数字

> BeCloseTo 浮点数判断相等

> toBeGreaterThan 大于

### 布尔值

> toBeTruthy 真值

> toBeFalsy 假值

> 技巧：少用 toBe(true)，因为当测试失败，它给不出更加具体的错误提示，只是 true 或者 false，会难以定位错误。

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

### 常用函数钩子

`beforeEach` 在每个测试之前运行。
`afterEach` 在每个测试之后运行。
`beforeAll` 所有测试运行运行之前运行。
`afterAll` 所有测试运行运行之后运行。

钩子函数的运行的作用域，可通过 `describe` 进行分组，限制钩子函数的运行的范围。

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

`test.only` 在测试之前相互影响时，很有用。

## 测试异步代码

当你有以**异步方式**运行的代码时，Jest 需要知道当前它测试的代码是否已完成，然后它可以转移到另一个测试。

### 回调类型的异步

```js
test('异步函数', done => {
  fetchData(n => {
    expect(n).toEqual(30)
  })
  done()
})
```

### promise 类型的异步

```js
test('函数返回 promise', () => {
  return githubUsers()
    .then(res => {
      expect(res).toEqual(23)
    })
    .catch(error => {
      console.log(error)
    })
})
```

使用 await

```js
test('函数返回 promise', async () => {
  const res = await githubUsers()
  expect(res).toEqual(23)
})
```

## 模拟依赖

代码会依赖一些外部环境，比如 http 接口，npm 模块、数据库等，集成这些环境往往会使得测试用例不可控，真实环境也许是缓慢和脆弱的，比如真实环境要求定时器的间隔为 ### 小时，测试不可能等待 ### 小时，需要使用代码模拟一个稳定的环境，jest 可模拟常见"环境"，比如**回调函数**、**定时器**、**数据库**等。

有一个函数：

```js
function forEach(items, callback) {
  for (let index = # # # index < items.length; index++) {
    callback(items[index])
  }
}
```

callback 是用户使用这个函数给的具体实现，希望测试 forEach，就需要模拟一个实现，测试函数的行为：入参、调用次数、返回值等。

```js
describe('forEach', () => {
  test('forEach', () => {
    const mockCallback = jest.fn(x => # # # + x)
    forEach([# # # 1], mockCallback)
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

所有 mock 函数都有一个 `.mock` 属性，它保存了关于函数如何被调用、调用时的返回值、this 等信息。

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

3.  `mock.results[0].value` 第一次被调用的返回值

4. `mock.lastCall[0]` 最后一次调用的第一个参数

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

const result = [1 # # # 12].filter(num => filterTestFn(num))

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
  const users = [{
    name: 'Bob'
  }]
  const resp = {
    data: users
  }

  axios.get.mockResolvedValue(resp) // NOTE 模拟 promise resolve

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users))
})
```
