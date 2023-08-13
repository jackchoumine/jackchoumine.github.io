/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-14 01:06:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-14 02:49:17
 * @Description :
 */
import { runCallBack } from './mock'
// NOTE 设置路径简写
// https://github.yanhaixiang.com/jest-tutorial/basic/transformer/#%E8%B7%AF%E5%BE%84%E7%AE%80%E5%86%99
import { asyncApiPromise, asyncApiPromise4042 } from 'apis'
import axios from 'axios'

// NOTE mock 模块
jest.mock('axios')
// NOTE mock axios
// https://www.csrhymes.com/2022/03/09/mocking-axios-with-jest-and-typescript.html
const mockedAxios = axios as jest.Mocked<typeof axios>

// NOTE 导入模拟模块中的真实函数
// const {getRealFunction} = jest.requireActual('axios')
describe('学习各种mock', () => {
  describe('mock 函数', () => {
    let func: any
    beforeEach(() => {
      func = jest.fn()
    })
    it('监听函数是否执行', () => {
      runCallBack(func)

      // NOTE 只有 jest.fn 才能被监听到调用情况
      // 普通函数不行
      // 调用情况包含哪些
      // 1. 是否被调用
      // 2. 调用次数
      // 3. 调用时的参数
      // 4. 调用时的返回值
      // 5. 调用顺序
      // 6. 调用时的this
      expect(func).toBeCalled()
    })
    it('监听函数的执行次数', () => {
      runCallBack(func)
      runCallBack(func)

      // console.log(func.mock, 'zqj log')

      expect(func).toBeCalledTimes(2)
    })

    it('监听函数执行时的参数', () => {
      const callbackParams = 'hello'
      runCallBack(func, callbackParams)

      expect(func).toBeCalledWith(callbackParams)
    })
    it('监听函数执行时的返回值 ', () => {
      func.mockReturnValueOnce('hello')
      // NOTE mockReturnValueOnce 只能监听一次
      // 固定的返回值，多次调用都是这个返回值
      // func.mockReturnValue('hello')

      expect(func()).toEqual('hello')
      expect(func()).toBeUndefined()

      // mock 函数是传递实现
      const mockFunc = jest.fn(() => {
        return 'hello'
      })

      expect(mockFunc()).toEqual('hello')
      expect(mockFunc()).toEqual('hello')
    })
  })
  describe('mock 模块', () => {
    it('mock axios resolve', async () => {
      const data = {
        id: 121,
      }
      // NOTE mockResolvedValueOnce 只能监听一次
      // 固定的返回值，多次调用都是这个返回值
      // axios.get.mockResolvedValueOnce(data)
      mockedAxios.get.mockResolvedValue({
        data,
        // status: 200,
        // statusText: 'Ok',
        // headers: {},
        // config: {},
      })

      const res = await asyncApiPromise()

      expect(res).toEqual(data)
    })
    it('mock axios reject', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        status: 404,
      })

      await asyncApiPromise().catch(error => {
        console.log(error, 'zqj log')
        expect(error.status).toEqual(404)
      })
    })
  })
})
