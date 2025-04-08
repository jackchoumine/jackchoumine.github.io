/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-07 10:22:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-08 10:18:28
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { describe, expect, it } from 'vitest'

const deepArr = [
  { name: 'vite', age: 5 },
  { name: 'vue', age: 15, info: { rate: 5, user: 100 } },
]

describe('模糊配器', () => {
  it('检查数据类型', () => {
    expect(10).toEqual(expect.any(Number)) // ✅ 数字
    expect([]).toEqual(expect.any(Array)) // ✅ 数组
    expect('world').toEqual(expect.any(String)) // ✅ 字符串
    expect({}).toEqual(expect.any(Object)) // ✅ 对象
    expect(() => {}).toEqual(expect.any(Function)) // ✅ 函数
    expect(Symbol()).toEqual(expect.any(Symbol)) // ✅ 符号
  })
  it('检查非 nullish 值', () => {
    expect(42).toEqual(expect.anything()) // ✅ 数字
    expect('test').toEqual(expect.anything()) // ✅ 字符串
    expect(false).toEqual(expect.anything()) // ✅ 布尔值
    expect(null).not.toEqual(expect.anything()) // ❌ null 不匹配
    expect(1).not.toBeNullish()
    expect(undefined).toBeNullish()
    expect(null).toBeNullish()
  })

  it('是否包含子集', () => {
    expect(deepArr).toEqual(expect.arrayContaining([{ name: 'vite', age: 5 }]))
  })
  it('是否包含部分属性', () => {
    expect({ a: 1, age: 2 }).toEqual(
      expect.objectContaining({ a: 1 }) // ✅ 包含 a: 1
    )
  })
  it('是否包含子串', () => {
    expect('hello world').toEqual(
      expect.stringContaining('hello') // ✅ 包含 "hello"
    )
  })
  it('组合使用', () => {
    // 匹配一个对象，包含数组（数组包含数字和特定字符串）
    expect({
      id: expect.any(Number),
      items: expect.arrayContaining([
        expect.stringMatching(/item-\d+/),
        expect.any(String),
      ]),
    }).toEqual({
      id: 1,
      items: ['item-1', 'test'],
    })
  })
})

describe('模糊匹配器检查 api 返回', () => {
  it('检查 api 返回', () => {
    const response = {
      id: '123', // ✅ ID 是字符串 使用 number 作为 id，可能超出 js 安全整数范围
      name: 'Alice',
      createdAt: '2023-01-01 00:00:00', // ✅ 日期格式 YYYY-MM-DD HH:mm:ss
      age: 25,
      city: 'Beijing',
    }

    const YYYYMMDDHHmmss =
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
    expect(response).toEqual(
      // ✅ 包含 id、name、createdAt
      expect.objectContaining({
        id: expect.anything(), // ✅ 必须有 id
        name: expect.any(String), // ✅ 名字是字符串
        createdAt: expect.stringMatching(YYYYMMDDHHmmss), // ✅ 日期格式
      })
    )
  })
  it('检查数据结构', () => {
    const tableApiRes = {
      code: 0,
      msg: 'success',
      //✅ 这里需要的数据
      data: {
        rows: [], // 数据
        total: 100, // 总条数
        pageNow: 1, // 当前页
        pageSize: 10, // 每页条数
        a: 1, // 其他字段
        b: '2',
      },
    }

    // 先检查固定的字段
    expect(tableApiRes).toEqual(
      expect.objectContaining({
        code: expect.any(Number), // ✅ 数字
        msg: expect.any(String), // ✅ 字符串
        data: expect.any(Object), // ✅ 对象
      })
    )
    // 再检查分页部分
    expect(tableApiRes?.data).toEqual(expect.anything()) // ✅ 对象
    // 模糊配器 放在 toEqual 里更加好理解
    expect(tableApiRes.data).toEqual(
      expect.objectContaining({
        rows: expect.any(Array), // ✅ 数组
        total: expect.any(Number), // ✅ 数字
        pageNow: expect.any(Number), // ✅ 数字
        pageSize: expect.any(Number), // ✅ 数字
      })
    )
    expect(tableApiRes.data).toBePaginationRes() // ✅ 自定义配器
    // ok
    //expect(
    //  expect.objectContaining({
    //    rows: expect.any(Array), // ✅ 数组
    //    total: expect.any(Number), // ✅ 数字
    //    pageNow: expect.any(Number), // ✅ 数字
    //    pageSize: expect.any(Number), // ✅ 数字
    //  })
    //).toEqual(tableApiRes.data)
  })
})
