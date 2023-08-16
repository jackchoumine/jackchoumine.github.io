/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 01:27:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-16 02:50:23
 * @Description :
 */
import exportObj, { sum } from './mockExportObj'

// console.log(exportObj, 'zqj log')

// NOTE 模拟默认导出和命名导出
jest.mock('./mockExportObj', () => {
  let mockSum = jest.fn().mockImplementation((a, b) => '' + a + '' + b)
  return {
    __esModule: true, // this property makes it work
    default: {
      say: jest.fn().mockImplementation((greeting = 'Hello', name = 'World') => {
        return `${greeting},${name}`
      }),
    },
    sum: mockSum, //: jest.fn().mockImplementation((a, b) => '' + a + '' + b),
  }
})
describe('mock 模块默认对象', () => {
  it('exportObj.say', () => {
    jest.spyOn(exportObj, 'say')

    expect(exportObj.say()).toBe('Hello,World')
    expect(exportObj.say('你好')).toBe('你好,World')
    expect(exportObj.say('你好', 'Jest')).toBe('你好,Jest')
    expect(exportObj.say).toHaveBeenCalledTimes(3)
  })
  it('测试命名导出', () => {
    expect(sum(1, 2)).toBe('12')

    // 直接断言执行次数，不用 jest.spyOn
    expect(sum).toHaveBeenCalledTimes(1)
  })
  it('重写命名导出', () => {
    // @ts-ignore
    sum.mockImplementation((a, b) => a / b)

    expect(sum(4, 2)).toBe(2)
    expect(sum).toHaveBeenCalledTimes(1)
    expect(sum).toHaveBeenCalledWith(4, 2)
  })
  it('重写模块中的某个函数', () => {
    jest.spyOn(exportObj, 'say')
    // @ts-ignore
    exportObj.say.mockImplementation((greeting = 'Hello', name = 'World') => {
      return `${greeting} + ${name}`
    })
    expect(exportObj.say()).toBe('Hello + World')
    expect(exportObj.say('你好')).toBe('你好 + World')
    expect(exportObj.say('你好', 'Jest')).toBe('你好 + Jest')
    expect(exportObj.say).toHaveBeenCalledTimes(3)
  })
})

// 参考 https://ilikekillnerds.com/2019/10/mocking-default-imports-in-jest-with-typescript/
