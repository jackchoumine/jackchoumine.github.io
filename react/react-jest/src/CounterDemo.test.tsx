import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'

import CounterDemo, { useCounter } from './CounterDemo'

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
})

function setup(com: ReactElement) {
  const result = render(com)
  return {
    user: userEvent.setup(),
    ...result,
  }
}
