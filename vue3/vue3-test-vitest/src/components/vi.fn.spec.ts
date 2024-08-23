/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-23 01:26:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-23 01:38:13
 * @Description :
 */
import { expect, it, vi } from 'vitest'

function randomStr() {
  return Math.random().toString(36).slice(2)
}

it('randomStr', () => {
  const returnVal = 'abc1234'
  const mockRandomStr = vi.fn(() => returnVal)

  expect(mockRandomStr()).toBe(returnVal)
})
