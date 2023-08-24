/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-20 01:31:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-24 23:58:55
 * @Description :
 */
import { sayHello } from './sayHello'
// NOTE 命名导出，合并命名导出到一个对象上，方便在每次用例中重置
import * as config from './config'

jest.mock('./config', () => ({
  __esModule: true,
  CAPITALIZE: void 0,
}))

// 解决 ts 无法重写导入属性的问题
const mockConfig = config as { CAPITALIZE: boolean }

describe('sayHello', () => {
  test('Capitalizes name if config requires that', () => {
    // NOTE 无法为"CAPITALIZE"赋值，因为它是只读属性。
    // NOTE ts 视导入为常量，且对象的属性是只读的
    mockConfig.CAPITALIZE = true

    expect(sayHello('john')).toBe('Hi, John')
  })

  test('does not capitalize name if config does not require that', () => {
    mockConfig.CAPITALIZE = false

    expect(sayHello('john')).toBe('Hi, john')
  })
})
