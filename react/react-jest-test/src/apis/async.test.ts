/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-13 22:58:12
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-24 23:43:10
 * @Description :
 */
import {
  asyncApiCallback,
  asyncApiPromise,
  asyncApiProfile,
  asyncApiPromise404,
  asyncApiPromise4042,
} from './async'

import dbJson from '../../db.json'

describe('async function', () => {
  it('asyncApiPromise--test', () => {
    expect(1).toBe(1)
  })
})
/*
describe('async function', () => {
  it('asyncApiCallback', done => {
    asyncApiCallback((data: any) => {
      expect(data).toEqual(dbJson.posts)
      done()
    })
  }, 1000)
  it('asyncApiPromise', done => {
    asyncApiPromise().then((data: any) => {
      // console.log(data, 'zqj log')
      expect(data.id).toEqual(120)
      done()
    })
  })
  it('asyncApiPromise async', async () => {
    const res = await asyncApiPromise()
    expect(res.id).toEqual(120)
  })
  it('asyncApiPromise2', () => {
    expect.assertions(1)
    return asyncApiPromise().then((data: any) => {
      expect(data.id).toEqual(120)
    })
  })
  it('asyncApiPromise404', done => {
    // NOTE 技巧： expect.assertions(1) 保证异步调用中至少一次断言
    expect.assertions(1)
    asyncApiPromise404().catch(error => {
      // console.log(error, 'zqj log')
      expect(error.status).toBe(404)
      done()
    })
  })

  it('asyncApiPromise--3', () => {
    return expect(asyncApiPromise()).resolves.toMatchObject({
      id: 120,
    })
  })
  it('asyncApiPromise--4', async () => {
    await expect(asyncApiPromise()).resolves.toMatchObject({
      id: 120,
    })
  })
  it('asyncApiPromise-5', async () => {
    const data = await asyncApiProfile()
    expect(data).toEqual(dbJson.profile)
  })

  it('asyncApiPromise404-2', () => {
    return expect(asyncApiPromise404()).rejects.toThrowError()
  })
  it('asyncApiPromise4042', async () => {
    expect.assertions(1)
    await asyncApiPromise4042().catch(error => {
      //   console.log(error, 'zqj log')
      expect(error.status).toBe(404)
    })
  })
})
*/
// 异步函数设置超时时间
// https://stackoverflow.com/questions/49603939/message-async-callback-was-not-invoked-within-the-5000-ms-timeout-specified-by

// 最佳实践：
// 使用 done 参数测试回调类型的异步函数
// 使用 async/await 测试 Promise 类型的异步函数
