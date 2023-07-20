/*
 * @Description : 数字匹配器
 * @Date        : 2022-06-07 06:44:01 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-07 06:49:12 +0800
 * @LastEditors : JackChou
 */
describe('数值匹配器', () => {
  test('大于等于', () => {
    expect(100).toEqual(100)
    expect(200).toBeGreaterThan(100)
    expect(200).toBeGreaterThanOrEqual(20)
  })
  test('小于等于', () => {
    expect(200).toBeLessThan(300)
    expect(200).toBeLessThanOrEqual(300)
  })
  test('等于', () => {
    // console.log(0.1 + 0.2) // NOTE js 浮点数预算不精确，无法计算全等
    expect(0.1 + 0.2).toBeCloseTo(0.3)
    expect(0.1 + 0.2).not.toEqual(0.3)
  })
})
