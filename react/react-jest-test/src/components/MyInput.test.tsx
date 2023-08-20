/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-19 19:04:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-20 16:19:43
 * @Description :
 */
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
  //   console.log({ ...render(component) })
  const result = render(component)
  return {
    user: userEvent.setup(),
    ...result,
  }
}
