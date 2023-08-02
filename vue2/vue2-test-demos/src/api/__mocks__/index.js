/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 18:56:06
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 22:14:15
 * @Description : 模拟模块依赖
 */
const getTodoList = jest.fn(() => Promise.resolve([]))
const getTodos = jest.fn(() => Promise.resolve([]))
export { getTodoList, getTodos }
