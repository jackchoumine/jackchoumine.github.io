/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-06 20:41:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-06 21:27:59
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { describe, expect, it } from 'vitest'

const shallowArr = [1, 2, 3]
const deepArr = [
  { name: 'vite', age: 5 },
  { name: 'vue', age: 15, info: { rate: 5, user: 100 } },
]

describe('数组匹配器', () => {
  it('宽松深度比较', () => {
    // 元素为 undefined 视为有
    expect(shallowArr).toEqual([1, 2, 3])
    expect(shallowArr).not.toEqual([1, 2, 3, undefined])
    const result = [
      { name: 'vite', age: 5 },
      { name: 'vue', age: 15, info: { rate: 5, user: 100 } },
    ]
    expect(deepArr).toEqual(result)
  })
  it.skip('严格深度比较', () => {
    const result = [
      { name: 'vite', age: 5 },
      { name: 'vue', age: 15, info: { rate: 5, user: 100 } },
    ]
    expect(deepArr).toStrictEqual(result)
  })
  it('是否包含给定对象', () => {
    // 值比较
    expect(deepArr).toContainEqual({ name: 'vite', age: 5 })
    // 引用比较
    expect(deepArr).not.toContain({ name: 'vite', age: 5 })
    expect(deepArr).toContain(deepArr[0])
  })
  it('是否包含子集', () => {
    expect(deepArr).toEqual(expect.arrayContaining([{ name: 'vite', age: 5 }]))
  })
  it('检查长度', () => {
    expect(deepArr).toHaveLength(2)
  })
})
