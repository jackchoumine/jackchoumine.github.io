/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 15:26:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-02 16:35:00
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
// ./src/App.test.tsx
import { render, screen } from '@testing-library/react'

import App from './App'

describe('test', () => {
  it('first unit test', () => {
    //  <React.StrictMode>
    // </React.StrictMode>
    render(<App />)
    const text = 'Click on the Vite and React logos to learn more'
    const p = screen.getByText(text)
    expect(p).toBeInTheDocument()
  })
})
