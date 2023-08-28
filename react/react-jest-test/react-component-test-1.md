# react 组件测试

## testing-library 简介

[testing-library](https://testing-library.com/) 是一个用于测试 UI 组件的工具库**集合**，它提供了一套 API，用于**模拟用户操作**，获取组件组件渲染输出，以及对组件进行断言。

> 测试越接近软件的使用方式，测试越能给你信心。

支持多种框架，包括 react、vue、angular、svelte 等。

`testing-library/react` 是针对 react 的实现。

testing-library 倡导以用户实际使用软件的方式来测试组件，所以应该避免测试实现细节：

1. 组件的内部状态；
2. 内部方法；
3. 组件的生命周期；
4. 子组件。

## testing-library 常用的方法

### 查询渲染输出

| type       | no match | 1 match | 1+ match | await |
| ---------- | -------- | ------- | -------- | ----- |
| getBy*      | throw    | return  | throw    | No    |
| getAllBy*   | throw    | array   | array    | No    |
| findBy*     | throw    | return  | throw    | Yes   |
| findAllBy*  | throw    | array   | array    | Yes   |
| queryBy*    | null     | return  | throw    | NO    |
| queryAllBy* | []       | array   | array    | NO    |

> 异步使用 findBy，同步使用 getBy。

具体的查询DOM的方法：

1. getByRole
2. getByLabelText
3. getByPlaceholderText
4. getByText
5. getByDisplayValue
6. getByAltText
7. getByTitle
8. getByTestId

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
import { screen,within } from '@testing-library/react';
const messages = screen.getById('messages')
const hello = within(messages).getByText('hello')
```

### 模拟用户操作

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
