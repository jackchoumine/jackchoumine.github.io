/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-07 11:21:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-07 15:01:35
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

describe('函数调用顺序', () => {
  it('检查调用顺序', () => {
    const mockFn1 = vi.fn()
    const mockFn2 = vi.fn()

    mockFn1()
    mockFn2()

    // 检查调用顺序
    expect(mockFn1).toHaveBeenCalledBefore(mockFn2)
    expect(mockFn2).toHaveBeenCalledAfter(mockFn1)
  })
})
describe('异步函数匹配器', () => {
  it('检查异步函数 resolve', async () => {
    const mockAsyncFn = vi.fn(async () => 'hello')

    const result = await mockAsyncFn()

    // 检查异步函数是否被调用
    expect(mockAsyncFn).toHaveBeenCalled()
    expect(mockAsyncFn).toHaveResolvedWith('hello')
    expect(mockAsyncFn).toHaveResolvedTimes(1)
    expect(result).toBe('hello')
    await expect(mockAsyncFn()).resolves.toBe('hello')
  })

  it('检查异步函数抛出错误', async () => {
    const mockAsyncFn = vi.fn(async () => {
      throw new Error('Fail!')
    })

    // 检查异步函数是否抛出错误
    await expect(mockAsyncFn()).rejects.toThrow('Fail!')

    const asyncReject = vi.fn(
      () => new Promise((_, reject) => reject(new Error('Fail!')))
    )
    // NOTE 不能这样测试
    //const result = await asyncReject()
    // 检查异步函数是否抛出错误
    await expect(asyncReject()).rejects.toThrow('Fail!')
  })
})
