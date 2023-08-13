/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-13 17:40:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-13 17:56:39
 * @Description :
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { HelloJest } from './HelloJest'

describe('HelloJest.tsx', () => {
  it('可以正常展示', () => {
    render(<HelloJest />)

    const helloJest = screen.getByText(/Hello Jest/i)

    expect(helloJest).toBeDefined()
  })
})
