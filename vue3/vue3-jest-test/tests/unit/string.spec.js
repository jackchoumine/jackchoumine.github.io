/*
 * @Description : 字符串匹配器
 * @Date        : 2022-06-07 06:51:00 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-12 01:01:08 +0800
 * @LastEditors : JackChou
 */
describe('字符串匹配器', () => {
  test('包含', () => {
    const hello = 'hello world'
    expect(hello).toEqual('hello world')
    expect(hello).toMatch('hello world')
    expect(hello).toMatch('hello')
    expect(hello).not.toMatch('hello2')
    expect(hello).not.toMatch('good')
  })
})
