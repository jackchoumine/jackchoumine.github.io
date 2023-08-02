/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-02 21:25:57
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 22:32:55
 * @Description : mutations
 */
const mutations = {
  addTodos(state, todos) {
    state.todos = todos
  },
  increment(state, payload = 1) {
    state.count += payload
  },
}

export { mutations }
