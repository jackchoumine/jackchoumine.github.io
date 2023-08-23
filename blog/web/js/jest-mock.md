# jest 中的模拟

被代码会依赖一些外部环境，比如 http 接口，npm 模块、数据库等，集成这些环境往往会使得测试用例不可控，真实环境也许是缓慢和脆弱的，比如真实环境要求定时器的间隔为20分钟，测试不可能等待20分钟，需要使用代码模拟一个稳定的环境，jest 可模拟常见的"环境"，比如**回调函数**、**定时器**、**数据库**等。

通过模拟，可以使得测试用例更加可控，更加稳定，更加快速，且能方便的知道依赖的模块的调用情况：

1. 是否被调用
2. 调用次数
3. 调用时的参数
4. 调用时的返回值
6. 调用时的 this
5. 调用顺序

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

### jest.fn 实现原理

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
//3.  mockFn 有一个无操作函数作为参数
function mockFn(impl=()=>{}) {
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

## jest.spyOn

## jest.mock

## 参考

[How to Write Functional Tests in React (Part 1)](https://echobind.com/post/how-to-write-functional-tests-in-react-part-1)

[Jest Spyon: All You Need To Know About This Function](https://www.positioniseverything.net/jest-spyon/)

[The Jest Handbook](https://codewithhugo.com/guides/jest-handbook/)

[Spying on Functions and Changing Implementation](https://silvenon.com/blog/mocking-with-jest/functions)

[Frontend Unit Testing | Best Practices & Tutorial](https://www.meticulous.ai/blog/frontend-unit-testing-best-practices)
