/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-07 16:24:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-07 17:01:41
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { beforeEach, describe, expect, it } from 'vitest'

describe('用户模块', () => {
  let user: any

  beforeEach(() => {
    console.log('beforeEach', 'zqj')
    user = { name: 'Alice', age: 25 } // 当前分组共享的初始化
  })

  it('应正确创建用户', () => {
    console.log('it1', 'zqj log')
    expect(user.name).toBe('Alice')
  })

  it.todo('创建管理员') // 待完成的用例

  // 嵌套分组
  describe.skip('权限检查', () => {
    beforeEach(() => {
      console.log('beforeEach inner', 'zqj')
    })
    it('年龄应大于18岁', () => {
      console.log('it2', 'zqj log')
      expect(user.age).toBeGreaterThan(18)
    })
  })
})

describe('用户模块2', () => {
  //@ts-ignore
  const isProd = process.env.NODE_ENV === 'production'
  // 正式环境，测试用例才执行
  it.skipIf(!isProd)('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2)
  })
  it.skip('1 + 100 = 101', () => {
    expect(1 + 100).toBe(101)
  })

  it('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2)
  })

  it.each([
    { a: 1, b: 1, expected: 2 },
    { a: 1, b: 2, expected: 3 },
    { a: 2, b: 1, expected: 3 },
  ])('sum($a, $b) = $expected', ({ a, b, expected }) => {
    function sum(a: number, b: number) {
      return a + b
    }
    expect(sum(a, b)).toBe(expected)
  })
})
