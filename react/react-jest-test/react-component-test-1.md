# react 组件测试

## testing-library 简介

[testing-library](https://testing-library.com/) 是一个用于测试 UI 组件的工具库**集合**，它提供了一套 API，用于**模拟用户操作**，获取组件组件渲染输出，以及对组件进行断言。

> 测试越接近软件的使用方式，测试越能给你信心。

支持多种框架，包括 react、vue、angular、svelte 等。

`testing-library/react` 是针对 react 的实现。

testing-library 倡导以用户实际使用软件的方式来测试组件，所以应该避免测试**实现细节**：

1. 组件的内部状态；
2. 内部方法；
3. 组件的生命周期；
4. 子组件。

## testing-library 常用的方法

### 查询渲染输出

根据行为可分四种

| type         | no match | 1 match | 1+ match | await | 使用场景               |
| ------------ | -------- | ------- | -------- | ----- | ---------------------- |
| queryBy\*    | null     | return  | throw    | NO    | 元素可不存在           |
| queryAllBy\* | []       | array   | array    | NO    | 元素可不存在           |
| getBy\*      | throw    | return  | throw    | No    | 元素一定存在           |
| getAllBy\*   | throw    | array   | array    | No    | 元素一定存在           |
| findBy\*     | throw    | return  | throw    | Yes   | 元素一定存在，异步更新 |
| findAllBy\*  | throw    | array   | array    | Yes   | 元素一定存在，异步更新 |

> 异步使用 findBy，同步使用 getBy 和 query。
> 元素必须存在，用例才通过，使用 getBy, 不存在也通过，使用 queryBy

具体的查询DOM的方法：

根据查询参照物可分为 8 种，看 get 的例子。

1. getByText
2. getByLabelText
3. getByPlaceholderText
4. getByDisplayValue
5. getByRole
6. getByAltText
7. getByTitle
8. getByTestId

> 行为决定查询前缀，参照物决定后缀。

该如何选择查询函数呢？

> 单测的越接近用户的使用方式，单测越稳定，越可靠，只要需求不变，单测就无需调整。

基于这样的原则，根据用户是否能看到查询参照，把查询参照分成三类：

可见的参照，推荐使用：getByText、getByLabelText、getByPlaceholderText、getByDisplayValue、getByRole
条件可见的参照，可使用：getByAltText、getByTitle
不建议使用: getByTestId

等待元素出现

```js
await screen.findByText('hello')
```

等待元素消失

```js
await waitForElementToBeRemove(() => screen.queryByText('hello'))
```

开启调试

```js
screen.debug()
```

通过父元素查询 DOM

```js
import { screen, within } from '@testing-library/react'

const messages = screen.getById('messages')
const hello = within(messages).getByText('hello')
```

> 其他查询方法？

通过父元素

```jsx
const { container } = render(
  <form>
    <input type="text" />
  </form>
)
const input = container.querySelector('input') // 直接查找 DOM
expect(input).toBeInTheDocument()
```

container vs screen

| 特性   | container            | screen   |
| ------ | -------------------- | -------- |
| 来源   | render 返回          | 直接导入 |
| 用途   | 通过父元素查询子元素 | 任何查询 |
| 推荐度 | 谨慎使用 ❌️         | 首选 ✅  |

什么时候可以用 container？

- 需要直接操作 DOM（如测试 document.title 变化）。

- 某些特殊元素（如 svg、canvas）无法用常规查询方法获取时。

- 调试时快速检查渲染的 HTML 结构。

React Testing Library 的设计哲学是 模拟用户交互，而不是依赖实现细节（如 DOM 结构），而 container 依赖于实现细节，会导致测试代码不稳定。

## 页面元素的断言

| 使用场景       | 断言 API                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| 可见性         | `toBeEmptyDOMElement`、`toBeVisible`、`toBeInTheDocument`、`toHaveTextContent`                                 |
| 表单验证       | `toBeDisabled`、`toBeEnabled`、`toBeRequired`、`toHaveFocus`、`toBeChecked`、`toHaveFormValues`、`toHaveValue` |
| 代码层面的验证 | `toHaveAttribute`、`toHaveClass`、`toHaveStyle`                                                                |

### 可见性断言

toBeEmptyDOMElement、toBeVisible和toBeInTheDocument 含义接近：

| 匹配器              | 含义                               | 使用场景                               |
| ------------------- | ---------------------------------- | -------------------------------------- |
| toBeInTheDocument   | 存在文档中                         | 条件渲染                               |
| toBeEmptyDOMElement | 标签之间是否有可见内，空格也算内容 | 子元素                                 |
| toBeVisible         | 是否可见                           | display 为 none , visibility 为 hidden |

### 表单验证

| 匹配器           | 含义                                   |
| ---------------- | -------------------------------------- |
| toBeDisabled     | 检查 disable 属性                      |
| toBeEnabled      | 是否未被禁用，等同于 .not.toBeDisabled |
| toBeRequired     | 是否必填                               |
| toHaveFocus      | 是否聚焦                               |
| toBeChecked      | checkbox 或者是 radio 是否被选中       |
| toHaveValue      | 单个表单先的值                         |
| toHaveFormValues | 整体表单的值是否和预期值匹配           |

## 元素属性验证

除了从用户交互角度对页面进行验证，有时还需要验证元素的属性，比如验证某个类名、属性或者样式。

| 匹配器          | 用途         | 注意点   |
| --------------- | ------------ | -------- |
| toHaveClass     | 验证类名     |          |
| toHaveAttribute | 验证属性     |          |
| toHaveStyle     | 验证内联样式 | 精准匹配 |

## 测试异步函数

组件中异步函数很常见，比如调用 http 接口后，再更新页面。

有一组件如下：

```jsx
import { useEffect, useMemo, useState } from 'react'

export default function AsyncUpdate() {
  const [todo, setTodo] = useState('nothing')
  const loading = useMemo(() => {
    return todo === 'nothing'
  }, [todo])

  useEffect(() => {
    setTimeout(() => {
      setTodo('code')
    }, 200)
  }, [])

  return (
    <div>
      <span>{todo}</span>
      {loading && <span>loading</span>}
    </div>
  )
}
```

200 毫秒接口返回，页面更新。

测试方法：先判断 loading 和 nothing 一定存在，等待 200 毫秒，loading 消失，code 存在。

```js
it('异步查询 DOM', async () => {
  render(<AsyncUpdate />)

  const nothing = screen.getByText('nothing')
  const loading = screen.getByText('loading')

  expect(loading).toBeInTheDocument()
  expect(nothing).toBeInTheDocument()

  const code = await screen.findByText('code')
  const loading2 = screen.queryByText('loading')

  expect(code).toBeInTheDocument()
  expect(loading2).not.toBeInTheDocument()
})
```

没有使用类似 setTimeout 等待 200 毫秒，因为 findByText 默认等待 1000 毫秒了。

### waitFor

等待异步操作在测试中非常常见，因为测试库提供了专门的函数`waitFor`：

```js
waitFor(callback, options)
// options 的常用属性：
// {timeout:1000, interval: 50, onTimeout:e => e}
```

findBy 函数就是基于 waitFor + getBy 实现的。

使用 waitFor 实现上面的测试用例：

```js
it('waitFor', async () => {
  render(<AsyncUpdate />)

  const nothing = screen.getByText('nothing')
  const loading = screen.getByText('loading')
  expect(loading).toBeInTheDocument()
  expect(nothing).toBeInTheDocument()

  await waitFor(
    () => {
      const code = screen.getByText('code')
      const loading2 = screen.queryByText('loading')

      expect(code).toBeInTheDocument()
      expect(loading2).not.toBeInTheDocument()
    },
    {
      timeout: 500,
      interval: 100,
      // onTimeout
    }
  )
})
```

### 移除DOM

waitForElementToBeRemoved 是 React Testing Library 提供的一个异步工具，用于等待某个元素从 DOM 中被移除或消失。它通常用于测试动态行为（如加载状态隐藏、模态框关闭、数据更新后元素卸载等场景）。

```js
waitForElementToBeRemoved(ele || callback, options)
// options 和 waitFor 的 options 一致
```

如果元素始终存在，会抛出超时错误：

```bash
Error: Timed out in waitForElementToBeRemoved.
```

> 涉及异步 dom 更新的最佳实践

- 优先使用 getBy 获取初始元素（确保它存在）。

- 避免无限等待：合理设置 timeout（默认 1 秒）。

- 配合 queryBy 检查消失后的状态。

## 测试定时任务

定时功能也是很常见的，如何对定时任务进行测试呢？比如一个定时任务需要一个小时执行一次，真实的去测试这个定时任务，就需要等待一个小时，单元测试要求快速得到反馈，这样显然不可取。

好在 jest 提供快速推进时间的 api -- 使用假的定时器来代替真实的定时器。

| api                  | 作用               |
| -------------------- | ------------------ |
| useFakeTimers        | 启用假的定时器     |
| useRealTimers        | 启用真的定时器     |
| runAllTimers         | 启用真的定时器     |
| runOnlyPendingTimers | 只执行等待的定时器 |
| advanceTimersByTime  | 前进 x 毫秒        |

有两个函数等待函数需要测试：

```js
function sleep(millisecond: number) {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond)
  })
}

function loopSleep(millisecond: number, result: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result)
      setTimeout(() => {
        loopSleep(millisecond, result)
      }, millisecond)
    }, millisecond)
  })
}
```

测试用例：

```js
describe('定时器', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('执行所有定时器', async () => {
    const fn = jest.fn()
    sleep(1000).then(fn)
    jest.runAllTimers()
    await Promise.resolve()
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('递归定时器', async () => {
    const result = 'hello jest'
    const res = loopSleep(1000, result)
    //jest.runAllTimers() // ❌️ 栈溢出
    jest.runOnlyPendingTimers() // 清除所有在等待中的定时器
    await expect(res).resolves.toBe(result)
  })

  it('推进时间', async () => {
    const fn = jest.fn()
    sleep(1000).then(fn)
    jest.advanceTimersByTime(1000)
    await Promise.resolve()
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
```

## 模拟外部模块

依赖外部在实际开发中也非常常见，比如组件依赖 http 接口、依赖 axios 等第三方模块，这些外部依赖不是单元测试关注点，被测试代码本身才是关注点。

此时就需要把这些外部依赖在测试用例中 mock 掉 -- 使用假的依赖代替，外部依赖的内部实现不需要关注，模拟外部依赖的对外接口即可。

### 全局 mock

```js
// 传入模块导入路径和可选的模块工厂函数
jest.mock(modulePath, moduleFactory)
```

moduleFactory 要求和模块的api 保持一致或者兼容，mock 的外部依赖会被提升到真正的依赖之前。

开发中常常使用 axios 发起网络请求，以 axios 为例子，看看如何做全局 mock。

```bash
npm i axios # 安装依赖
```

```js
import axios from 'axios'

jest.mock('axios')

describe('模拟外部依赖', () => {
  it('axios.get函数', async () => {
    const result = 'hello mock'
    axios.get.mockResolvedValue(result)
    // 发起请求
    const data = await axios.get('/')
    expect(data).toBe(result)
  })
})
```

mockResolvedValue 提示类型错误，使用`jest-mock`解决：

```bash
npm i jest-mock -D
```

修改测试用例：

```js
import axios from 'axios'
import { mocked } from 'jest-mock'

jest.mock('axios')

describe('模拟外部依赖', () => {
  it('axios.get函数', async () => {
    const result = 'hello mock'
    //axios.get.mockResolvedValue(result)
    mocked(axios.get).mockResolvedValue(result)
    const data = await axios.get('/')
    expect(data).toBe(result)
  })
})
```

把 axios 用假的模块代替，背离了用户真实的使用情况，太假了。

确实很假。

> mock 越多，意味着我们越关注测代码的实现细节，就难以反映用户使用软件的真实场景。应该尽量少模拟。

实际上，上面测试用例仅仅是模拟了 axios 中的get函数，没有真的发起请求，也不能返回 http herder 的情况。

对于发起网络请求这类外部依赖，后续我们使用 mws 代替，真实地测试 http 请求。

### 单次 mock

除全局的 mock 外，还可以单次 mock，jest 提供了 doMock 做单次 mock。

```js
jest.doMock(modulePath, moduleFactory)
```

```js
it('单次mock', () => {
  jest.doMock('./helloMock', () => ({
    __esModule: true,
    sayHello: () => {
      return 'sayHello'
    },
  }))
  const mock = require('./helloMock')
  expect(mock.sayHello()).toBe('sayHello')
})
```

### mock 函数

除了需要模拟外部依赖，还需要模拟函数。

jest 提供了 jest.fn 和 jest.spyOn 来实现这一需求：

```js
jest.fn(fnImplementation) // 传入可选的函数实现
jest.spyOn(mockObject, methodName)
```

上面的 axios.get ，改用 jest.spyOn 实现：

```js
it('模拟 axios 对象上 get ', async () => {
  const result = 'hello mock'
  jest.spyOn(axios, 'get').mockResolvedValue(result)
  const data = await axios.get('/')
  expect(data).toBe(result)
})
```

模拟函数：

有一 http 函数，会调用回调函数：

```js
function http(callback) {
  setTimeout(() => {
    const res = '123'
    callback(res)
  }, 500)
}
```

如何测试这个回调调用时的情况呢？ 比如是否调用、调用次数和返回值呢？

```js
it('模拟函数', () => {
  const returnValue = 'hello jest.fn'
  const fn = jest.fn(() => returnValue)
  jest.useFakeTimers()

  http(fn)
  jest.advanceTimersByTime(500)

  expect(fn).toHaveBeenCalled()
  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toHaveBeenCalledWith('123')
  expect(fn).toHaveReturnedWith(returnValue)
})
```

常用的验证函数调用情况的匹配器：

| 匹配器                | 作用         |
| --------------------- | ------------ |
| toHaveBeenCalled      | 检查是否调用 |
| toHaveBeenCalledTimes | 检查调用次数 |
| toHaveBeenCalledWith  | 检查调用参数 |
| toHaveReturnedWith    | 检查返回值   |
| fn.calls              | 所有调用记录 |

## 测试 hook

有一 userCounter 如下：

```js
function useCounter(init = 0) {
  const [count, setCount] = useState(init)

  function plus(step: number) {
    setCount(count + step)
  }

  return [count, plus]
}
```

如何测试它呢？

### 通过组件测试

hook 只能在组件顶部，自然想到写一个组件来测试：

```jsx
function CounterDemo() {
  const [count, plus] = useCounter()
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => plus(10)}>plus</button>
    </div>
  )
}
```

测试用例`CounterDemo.test.tsx`：

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'

import CounterDemo from './CounterDemo'

describe('测试hook', () => {
  it('通过组件测试', async () => {
    const { user } = setup(<CounterDemo />)
    // 初始状态
    const count = screen.getByText('0')
    expect(count).toBeInTheDocument()
    // 用户点击
    const btn = screen.getByText('plus')
    await user.click(btn)
    const oldCount = screen.queryByText('0')

    expect(count).toHaveTextContent('10')
    // 原来的 0 不在文档中
    expect(oldCount).not.toBeInTheDocument()

    // 再次点击
    await user.click(btn)
    expect(count).toHaveTextContent('20')
  })
})

function setup(com: ReactElement) {
  const result = render(com)
  return {
    user: userEvent.setup(),
    ...result,
  }
}
```

### 单独测试

testing-library 提供了`renderHook`，用它可单独测试 hook。

```js
import { act, renderHook } from '@testing-library/react'

import { useCounter } from './CounterDemo'

it('单独测试', () => {
  //const result = renderHook(() => useCounter(10))
  //console.log(result)
  const { result } = renderHook(() => useCounter(10))
  expect(result.current[0]).toBe(10)
  //plus(100)
  //expect(count).toBe(100)
  // renderHook 没有触发 rerender 因为需要使用 act 包裹 plus
  act(() => {
    result.current[1](100)
  })
  expect(result.current[0]).toBe(110)
})
```

> act 触发组件更新。
> react hook 是特殊的函数，必须在组件顶部调用，因此不能像测试普通函数那样单独测试。

## 模拟用户操作

```js
userEvent.click()
userEvent.dblClick()
userEvent.type()
userEvent.keyboard() // 键盘事件
userEvent.upload() // 上传文件
userEvent.selectOptions()
userEvent.deselectOptions()
userEvent.tab() // tab 导航
userEvent.hover()
userEvent.unhover()
userEvent.paste()
userEvent.clear()
```

使用 `userEvent` 提换MyInput测试用例中的 `fireEvent` ，安装依赖

```bash
npm i -D @testing-library/user-event
```

```tsx
// MyInput.test.tsx
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { ReactElement } from 'react'

import { MyInput } from './MyInput'

describe('MyInput.tsx', () => {
  it('测试用户输入', async () => {
    const { getByText, getByPlaceholderText, user } = setup(<MyInput />)
    const name = 'jack'
    const input = getByPlaceholderText('请输入名字')

    await user.type(input, name)
    const span = getByText(name, {
      selector: 'span',
    })

    expect(span).not.toBeNull()
  })
})

function setup(component: ReactElement) {
  const result = render(component)
  return {
    user: userEvent.setup(),
    ...result,
  }
}
```

`userEvent.setup` 的返回值如下：

```json
{
  user: {
    click: [Function: click],
    dblClick: [Function: dblClick],
    tripleClick: [Function: tripleClick],
    hover: [Function: hover],
    unhover: [Function: unhover],
    tab: [Function: tab],
    keyboard: [Function: keyboard],
    copy: [Function: copy],
    cut: [Function: cut],
    paste: [Function: paste],
    pointer: [Function: pointer],
    clear: [Function: clear],
    deselectOptions: [Function: deselectOptions],
    selectOptions: [Function: selectOptions],
    type: [Function: type],
    upload: [Function: upload],
    setup: [Function: bound setupSub]
  }
}
```

是一个对象，属性是一些可模拟用户交互的函数，这些函数返回 `Promise` 。

### `userEvent` 和 `fireEvent` 有什么不同？

`@testing-library/user-event` 是一个构建在 fireEvent 之上的包，但它提供了几种更接近用户交互的方法。

比如用户输入，实际每个字符触发 keyDown、keyPress 和 keyUp 事件，user-event 就能简单地模拟了这些交互，而 fireEvent 做不到这么简化。

[userEvent differences from fireEvent](https://testing-library.com/docs/user-event/intro/#differences-from-fireevent)

> 优先使用 userEvent，如果 userEvent 实在无法实现再使用 fireEvent，比如触发 input 事件，却不想触发 `focus` 和 `change` 事件时。

### render 返回值是什么？

render 返回一个对象，对象包含一些查询DOM的方法，可直接解构使用。

[react-render](https://testing-library.com/docs/react-testing-library/api/#render)

render 的第二个参数是一个配置对象，可传递组件的 props、父组件等。

[render-options](https://testing-library.com/docs/react-testing-library/api/#render-options)

## 参考

[基于 Jest 的单元测试](https://sinoui.github.io/sinoui-guide/docs/jest-introduction)
