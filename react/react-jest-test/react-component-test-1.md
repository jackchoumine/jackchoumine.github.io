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

根据行为可分四种

| type         | no match | 1 match | 1+ match | await |
| ------------ | -------- | ------- | -------- | ----- |
| getBy\*      | throw    | return  | throw    | No    |
| getAllBy\*   | throw    | array   | array    | No    |
| queryBy\*    | null     | return  | throw    | NO    |
| queryAllBy\* | []       | array   | array    | NO    |
| findBy\*     | throw    | return  | throw    | Yes   |
| findAllBy\*  | throw    | array   | array    | Yes   |

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

> 单测的越接近用户的使用方式，单侧越稳定越可靠，只要需要不变，单测就无需调整。

基于这样的原则，把查询参照分成三类：

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

## 页面元素的断言

| 使用场景       | 断言 API                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| 可见性         | `toBeEmptyDOMElement`、`toBeVisible`、`toBeInTheDocument`、`toHaveTextContent`                                 |
| 表单验证       | `toBeDisabled`、`toBeEnabled`、`toBeRequired`、`toHaveFocus`、`toBeChecked`、`toHaveFormValues`、`toHaveValue` |
| 代码层面的验证 | `toHaveAttribute`、`toHaveClass`、`toHaveStyle`                                                                |

### 可见性断言

toBeEmptyDOMElement、toBeVisible和toBeInTheDocument 含义接近：

| 断言                | 含义                               | 使用场景                               |
| ------------------- | ---------------------------------- | -------------------------------------- |
| toBeInTheDocument   | 存在文档中                         | 添加渲染                               |
| toBeEmptyDOMElement | 标签之间是否有可见内，空格也算内容 | 子元素                                 |
| toBeVisible         | 是否可见                           | display 为 none , visibility 为 hidden |

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
