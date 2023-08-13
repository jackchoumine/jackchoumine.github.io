/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-12 18:23:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-12 19:37:43
 * @Description :
 */
import { sum } from './sum'

describe('sum', () => {
  it('可以做加法', () => {
    expect(sum(1, 1)).toEqual(2)
  })
})
