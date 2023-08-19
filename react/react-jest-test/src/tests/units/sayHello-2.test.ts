/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-20 01:31:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-20 01:57:15
 * @Description :
 */
import { sayHello } from './sayHello-2'
// NOTE 默认导出，合并导出到一个对象上，方便在每次用例中重置
import * as config from './config-default'

jest.mock('./config-default', () => ({
  __esModule: true,
  default: void 0,
}))
const mockConfig = config as { default: boolean }
describe('sayHello', () => {
  test('Capitalizes name if config requires that', () => {
    mockConfig.default = true

    expect(sayHello('john')).toBe('Hi, John')
  })

  test('does not capitalize name if config does not require that', () => {
    mockConfig.default = false

    expect(sayHello('john')).toBe('Hi, john')
  })
})
