/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 18:56:06
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-23 21:06:28
 * @Description : 模拟模块依赖
 */
const getTodoList = jest.fn(() => Promise.resolve([]))

export { getTodoList }
