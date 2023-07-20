/*
 * @Description : 抛出方法匹配
 * @Date        : 2022-06-07 07:02:36 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-12 01:04:35 +0800
 * @LastEditors : JackChou
 */
// import { fetchData, githubUsers } from '../../src/async.fn.js'

const testFn = () => {
  throw new Error('test')
}

describe('函数', () => {
  test('should throw error', () => {
    expect(testFn).toThrow()
    expect(testFn).not.toThrow('a')
    expect(testFn).toThrow('test')
  })

  // test('异步函数', done => {
  //   fetchData(n => {
  //     expect(n).toEqual(30)
  //   })
  //   done()
  // })
  test('函数返回 promise', () => {
    // NOTE
    //expect.assertions(1) // 必须执行一次 expect
    // jest.setTimeout(1)// 设置过期时间
    // return githubUsers()
    //   .then(res => {
    //     expect(res).toEqual(23)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  })

  test('函数返回 promise', async () => {
    // const res = await githubUsers()
    expect(23).toEqual(23)
  })
})
