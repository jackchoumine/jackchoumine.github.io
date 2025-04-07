/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-07 11:21:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-07 11:48:21
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { describe, expect, it, vi } from 'vitest'

describe('函数匹配器', () => {
  it('函数是否定义', () => {
    const fn = () => {}
    // 函数是否定义
    expect(fn).toBeInstanceOf(Function)
    expect(1).not.toBeInstanceOf(Function)
    expect(fn).toBeDefined()
    expect(fn).toEqual(expect.any(Function))
    // 无法检查函数的形参
  })
  it('是否抛出错误', () => {
    function throwError() {
      throw new Error('Fail!')
    }

    // 检查是否抛出错误
    expect(() => throwError()).toThrow() // ✅

    // 检查错误消息是否匹配
    expect(() => throwError()).toThrow('Fail!') // ✅
    expect(() => throwError()).toThrow(/Fail/) // ✅ 正则匹配
  })
})
describe('函数执行情况', () => {
  it('检查是否被调用', () => {
    const mockCallback = vi.fn()
    const arr = [1, 2, 3]

    arr.forEach(mockCallback)

    expect(mockCallback).toHaveBeenCalled()
    expect(mockCallback).toHaveBeenCalledTimes(arr.length)
    // 调用时传入的参数
    //console.log(mockCallback.mock.calls) // [[1], [2], [3]]
    mockCallback.mock.calls.forEach((call, index) => {
      expect(call[0]).toBe(arr[index])
      expect(call[1]).toBe(index)
    })
  })

  it('检查调用状态', () => {
    const mockFn = vi.fn()
    mockFn.mockReturnValue('hello')
    mockFn('hello', 42)
    mockFn(true)
    // 调用时的参数
    expect(mockFn).toHaveBeenCalledWith('hello', 42)
    expect(mockFn).toHaveBeenCalledWith(true)
    // 返回值
    expect(mockFn).toHaveReturned()
    expect(mockFn).toReturnWith('hello')
    expect(mockFn).toHaveReturnedTimes(2)
  })
})
