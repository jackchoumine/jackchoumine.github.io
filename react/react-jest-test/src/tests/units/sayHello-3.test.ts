/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-20 01:31:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 00:13:35
 * @Description :
 */
import { sayHello } from './sayHello-3'
// NOTE 默认导出，是一个函数
import * as config from './config-default-fn'

jest.mock('./config-default-fn', () => ({
  __esModule: true,
  default: jest.fn(),
}))
const shouldCapitalizeMock = config.default as jest.Mock
describe('sayHello', () => {
  test('jest.resetModules', () => {
    // NOTE jest.doMock 会覆盖 jest.mock
    // const mockDefault =
    jest.mock('./config-default-fn', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => false),
    }))
    expect(sayHello('john')).toBe('Hi, john')
    jest.resetModules()
  })
  // test('Capitalizes name if config requires that', () => {
  //   // shouldCapitalizeMock.mockReturnValue(true)
  //   jest.unmock('./config-default-fn')

  //   expect(sayHello('john')).toBe('Hi, John')
  // })

  test('does not capitalize name if config does not require that', () => {
    shouldCapitalizeMock.mockImplementation(() => false)

    expect(sayHello('john')).toBe('Hi, john')
  })
  test('jest.resetModules', () => {
    // NOTE jest.doMock 会覆盖 jest.mock
    // const mockDefault =
    jest.mock('./config-default-fn', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => false),
    }))
    expect(sayHello('john')).toBe('Hi, john')
    jest.resetModules()
  })

  test("don't mock", () => {
    jest.requireActual('./config-default-fn')

    expect(sayHello('john')).toBe('Hi, john')
  })
})
// 参考
// https://mikeborozdin.com/post/changing-jest-mocks-between-tests/
