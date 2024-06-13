/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 10:19:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-12 20:55:33
 * @Description :
 */
import { describe, it, expect } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('should be work', () => {
    const { count, add } = useCounter()

    expect(count.value).toBe(10)

    add()

    expect(count.value).toBe(11)
  })
})
