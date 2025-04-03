/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 21:52:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-03 10:22:55
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { render, screen } from '@testing-library/react'

import FormCheck from './FormCheck'

describe('表单测试', () => {
  it('某个表单项的值', () => {
    render(<FormCheck />)

    const username = screen.getByPlaceholderText('请输入用户名')
    const age = screen.getByLabelText('age')

    expect(username).toHaveValue('JACK')
    expect(username).not.toHaveValue('JACk')
    expect(age).toHaveValue(23)
  })
  it('整个表单的值', () => {
    const { container } = render(<FormCheck />)

    const form = container.querySelector('form')

    expect(form).toHaveFormValues({
      username: 'JACK',
      age: 23,
      sex: 'man',
    })
  })

  it('禁用', () => {
    render(<FormCheck />)

    const username = screen.getByPlaceholderText('请输入用户名')
    const age = screen.getByLabelText('age')

    expect(username).toBeDisabled()
    expect(age).toBeEnabled()
  })

  it('必填', () => {
    render(<FormCheck />)

    const username = screen.getByPlaceholderText('请输入用户名')
    const age = screen.getByLabelText('age')

    expect(username).not.toBeRequired()
    expect(age).toBeRequired()
  })
  it('选中', () => {
    render(<FormCheck />)

    const manRadio = screen.getByLabelText('man')
    const womanRadio = screen.getByLabelText('woman')

    //screen.debug(manRadio)
    expect(manRadio).toBeChecked()
    expect(womanRadio).not.toBeChecked()
  })
  it('聚焦', () => {
    render(<FormCheck />)

    const ageInput = screen.getByLabelText('age')

    expect(ageInput).toHaveFocus()
  })
})
