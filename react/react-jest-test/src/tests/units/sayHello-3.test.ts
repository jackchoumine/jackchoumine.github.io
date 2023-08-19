/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-20 01:31:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-20 02:11:58
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
  test('Capitalizes name if config requires that', () => {
    shouldCapitalizeMock.mockReturnValue(true)

    expect(sayHello('john')).toBe('Hi, John')
  })

  test('does not capitalize name if config does not require that', () => {
    shouldCapitalizeMock.mockReturnValue(false)

    expect(sayHello('john')).toBe('Hi, john')
  })
})
// 参考
// https://mikeborozdin.com/post/changing-jest-mocks-between-tests/
