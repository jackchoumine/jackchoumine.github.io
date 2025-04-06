/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-06 20:00:01
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-06 20:02:52
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { describe, expect, it } from 'vitest'

import { sum } from './sum'

describe('sum 求和函数', () => {
  it('sum(1,2)', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
