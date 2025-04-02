/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 15:26:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-02 15:30:54
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('test', () => {
  test('first unit test', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })
})
