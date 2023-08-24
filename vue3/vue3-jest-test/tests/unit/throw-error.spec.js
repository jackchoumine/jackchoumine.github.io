/*
 * @Description : 抛出方法匹配
 * @Date        : 2022-06-07 07:02:36 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-08-24 09:50:13
 * @LastEditors : ZhouQiJun
 */
import { fetchData, githubUsers } from '../../src/async.fn.js'

import MontyPython from './MontyPython'

const testFn = () => {
  throw new Error('test')
}

function asyncFn(callback) {
  setTimeout(() => {
    callback(30)
  }, 1000)
}
describe('函数', () => {
  test('should throw error', () => {
    // 异常匹配
    expect(testFn).toThrow()
    expect(testFn).not.toThrow('a')
    expect(testFn).toThrow(/test/)
    expect(testFn).toThrow('test')
  })

  it('async callback function', done => {
    expect.assertions(1)
    let finish = false
    jest.useFakeTimers()
    setTimeout(() => {
      finish = true
      console.log('finish setTimeout callback', finish)
      expect(finish).toBe(true)
      done()
    }, 1000)
    jest.advanceTimersByTime(1000)
    console.log('finish', finish)
  })
  it('async promise function', done => {
    expect.assertions(1)
    jest.useFakeTimers()
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('finish setTimeout callback')
        resolve(100)
      }, 1000)
    })
    jest.advanceTimersByTime(1000)
    promise.then(res => {
      console.log('finish promise', res)
      expect(res).toBe(100)
      done()
    })
    console.log('finish')
  })
  it('async promise function', async () => {
    expect.assertions(1)
    const promiseFn = () => {
      return new Promise((resolve, reject) => {
        resolve(100)
      })
    }
    const res = await promiseFn()
    console.log('finish promise', res)
    expect(res).toBe(100)
    console.log('finish')
  })
  // test('函数返回 promise', () => {
  //   // NOTE
  //   //expect.assertions(1) // 必须执行一次 expect
  //   // jest.setTimeout(1)// 设置过期时间
  //   // return githubUsers()
  //   //   .then(res => {
  //   //     expect(res).toEqual(23)
  //   //   })
  //   //   .catch(error => {
  //   //     console.log(error)
  //   //   })
  // })

  it('callFnWithTheMeaningOfLife should call the provided function with the number 42', () => {
    const mockFn = jest.fn()
    const montyPython = new MontyPython()

    montyPython.callFnWithTheMeaningOfLife(mockFn)

    expect(mockFn).toHaveBeenCalledWith(42)
  })
  it('getTheMeaningOfLife', () => {
    const mockRandom = jest.spyOn(Math, 'random')
    mockRandom.mockReturnValue(10)

    const montyPython = new MontyPython()

    const result = montyPython.getTheMeaningOfLife()

    expect(mockRandom).toHaveBeenCalled()
    expect(result).toBe(10 * 100)
    mockRandom.mockRestore()
  })
})
