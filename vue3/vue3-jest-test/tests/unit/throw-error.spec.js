/*
 * @Description : 抛出方法匹配
 * @Date        : 2022-06-07 07:02:36 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-08-13 19:49:42
 * @LastEditors : ZhouQiJun
 */
import { fetchData, githubUsers } from '../../src/async.fn.js'

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

  test('函数返回 promise', async () => {
    const res = await githubUsers()
    expect(23).toEqual(23)
  })
})
