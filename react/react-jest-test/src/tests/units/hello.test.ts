import * as hello from './hello'

// @ts-ignore
hello.add = jest.fn(() => 'hello') // 模拟实现
jest.mock('./hello') // 模拟实现
describe('hello.ts', () => {
  it('模拟命名导出', () => {
    jest.spyOn(hello, 'add')

    expect(hello.add()).toBe('hello')
    expect(hello.add).toHaveBeenCalled()
  })
  it('在用例中重写模块里的方法-1', () => {
    jest.spyOn(hello, 'add')
    // @ts-ignore
    hello.add.mockImplementation(() => 'hi')

    expect(hello.add()).toBe('hi')
    expect(hello.add).toHaveBeenCalled()
  })
  it('在用例中重写模块里的方法-2', () => {
    // @ts-ignore
    hello.add.mockReturnValue('hi')
    expect(hello.add()).toBe('hi')
  })
  it('在用例中重写模块里的方法-3', async () => {
    // @ts-ignore
    hello.add.mockResolvedValue('hey')
    jest.spyOn(hello, 'add')

    expect(await hello.add()).toBe('hey')
    expect(hello.add).toHaveBeenCalled()
  })
})

// 参考 https://webtips.dev/webtips/jest/mock-named-exports-in-jest
