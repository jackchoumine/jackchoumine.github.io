/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-19 19:04:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-20 14:55:12
 * @Description :
 */
import { render, screen, fireEvent } from '@testing-library/react'
// import useEvent from '@testing-library/user-event'
import React from 'react'
import { MyInput } from './MyInput'

describe('MyInput.tsx', () => {
  it('测试用户输入', async () => {
    const { getByText } = render(<MyInput />)
    const name = 'jack'
    const input = screen.getByPlaceholderText('请输入名字')

    fireEvent.change(input, {
      target: {
        value: name,
      },
    })
    const span = getByText(name, {
      selector: 'span',
    })

    expect(span).not.toBeNull()
  })
})
