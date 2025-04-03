/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-03 16:33:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-03 17:16:18
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import axios from 'axios'
import { mocked } from 'jest-mock'

//import mock from './helloMock'

jest.mock('axios')

describe('模拟外部依赖', () => {
  it('axios.get函数', async () => {
    const result = 'hello mock'
    //axios.get.mockResolvedValue(result)
    mocked(axios.get).mockResolvedValue(result)
    const data = await axios.get('/')
    expect(data).toBe(result)
  })
  it('单次mock', () => {
    jest.doMock('./helloMock', () => ({
      __esModule: true,
      sayHello: () => {
        return 'sayHello'
      },
    }))
    const mock = require('./helloMock')
    expect(mock.sayHello()).toBe('sayHello')
  })
})

function http(callback) {
  setTimeout(() => {
    const res = '123'
    callback(res)
  }, 500)
}
describe('模拟函数', () => {
  it('模拟 axios 对象上 get ', async () => {
    const result = 'hello mock'
    jest.spyOn(axios, 'get').mockResolvedValue(result)
    const data = await axios.get('/')
    expect(data).toBe(result)
  })

  it('模拟函数', () => {
    const returnValue = 'hello jest.fn'
    const fn = jest.fn(() => returnValue)
    jest.useFakeTimers()

    http(fn)
    jest.advanceTimersByTime(500)

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('123')
    expect(fn).toHaveReturnedWith(returnValue)
  })
})
