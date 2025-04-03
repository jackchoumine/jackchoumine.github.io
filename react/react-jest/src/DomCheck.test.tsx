/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 21:52:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-03 09:11:19
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { render, screen } from '@testing-library/react'

import DomCheck from './DomCheck'

describe('检测DOM', () => {
  it('存在性检查', () => {
    render(<DomCheck />)
    const emptyNote = screen.getByRole('generic', { name: 'empty_note' })
    const [hiddenNote] = screen.getAllByRole('note', { hidden: true })
    const normalNote = screen.getByRole('note')
    const hiddenEle = screen.queryByText('1234', {
      selector: 'div.hidden',
    })

    expect(emptyNote).toBeEmptyDOMElement()
    expect(emptyNote).toBeInTheDocument()
    expect(hiddenNote).toBeInTheDocument()
    expect(normalNote).toBeInTheDocument()
    expect(hiddenNote).not.toBeVisible()
    // ele 为 null , 等价于 not.toBeInTheDocument
    //expect(hiddenEle).toBe(null)
    //expect(hiddenEle).not.toBeInTheDocument()
    expect(hiddenEle).toBeInTheDocument()
    expect(hiddenEle).not.toBeVisible()
  })
  it('textContent检查', () => {
    render(<DomCheck />)
    const hiddenEle = screen.queryByText('1234', {
      selector: 'div.hidden',
    })

    expect(hiddenEle).toBeInTheDocument()
    expect(hiddenEle).not.toBeVisible()
    expect(hiddenEle).toHaveTextContent(/1/i)
  })
})
