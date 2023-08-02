/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-02 21:48:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 22:06:49
 * @Description : actions
 */
import { getTodos } from '../api'

function fetchTodos({ commit }, { type }) {
  return getTodos(type).then(todos => {
    commit('addTodos', todos)
  })
}

const actions = {
  fetchTodos,
}
export { actions }
