/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-12 18:23:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-16 18:59:17
 * @Description :
 */
import { sum } from './sum'
import { isNon0Falsy, isStr0 } from './utils'

describe('sum', () => {
  it('可以做加法', () => {
    expect(sum(1, 1)).toEqual(2)
    expect(isNon0Falsy()).toBe(true)
    expect(isStr0()).toBe(false)
    expect(isNon0Falsy(undefined)).toBe(true)
    expect(isStr0(undefined)).toBe(false)
    expect(isNon0Falsy('')).toBe(true)
    expect(isStr0('')).toBe(false)
    expect(isNon0Falsy(``)).toBe(true)
    expect(isStr0(``)).toBe(false)
    expect(isNon0Falsy(null)).toBe(true)
    expect(isStr0(null)).toBe(false)
    expect(isNon0Falsy(NaN)).toBe(true)
    expect(isStr0(NaN)).toBe(false)
    expect(Number.isNaN(NaN)).toBe(true)
  })
})
