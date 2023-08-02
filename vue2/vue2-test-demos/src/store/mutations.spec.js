/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-02 21:22:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 21:29:28
 * @Description : 测试 mutations
 */
import { mutations } from './mutations'

describe('mutations', () => {
  it('addTodos mutations', function () {
    const todos = [{ done: true, content: '起床' }]
    const state = {
      todos: [],
    }
    mutations.addTodos(state, todos)
    expect(state.todos).toEqual(todos)
  })
})
