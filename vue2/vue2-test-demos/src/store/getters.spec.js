/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-02 21:32:03
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 21:39:43
 * @Description : getters
 */
import { getters } from './getters'

describe('getters', () => {
  const todos = [
    { done: true, content: '起床' },
    { done: false, content: '吃法' },
  ]
  it('getTodos', () => {
    const state = {
      todos,
    }
    expect(getters.getTodos(state)).toEqual(todos)
  })
  it('getDoneTodos', () => {
    const state = {
      todos,
    }
    expect(getters.getDoneTodos(state)).toEqual([todos[0]])
  })
})
