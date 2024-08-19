/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-18 01:41:20
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 01:41:31
 * @Description : 数组分块
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}
