/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-06 21:32:20
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-06 21:34:51
 * @加微信         : MasonChou123，进技术交流群
 */
import { describe, expect, it } from 'vitest'

describe('字符串匹配器', () => {
  it('正则验证', () => {
    expect('hello vitest').toMatch(/vitest/)
    expect('hello vitest').toMatch(/Vitest/i)
  })
  it('检查子串', () => {
    expect('hello vitest').toContain('hello')
  })
  it('检查长度', () => {
    expect('hello').toHaveLength(5)
  })
})
