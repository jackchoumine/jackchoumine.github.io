/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 21:52:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-03 12:54:05
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import AsyncUpdate from './AsyncUpdate'

describe('异步函数', () => {
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

  it('移除 DOM', async () => {
    render(<AsyncUpdate />)

    // 1. 一开始 loading 一定存在，故使用 getBy
    const loading = screen.getByText('loading')
    // 2. 等待 loading 被移除
    await waitForElementToBeRemoved(loading)
    // 3. loading 一定不在了 故使用 queryBy
    expect(screen.queryByText('loading')).not.toBeInTheDocument()
  })
})
