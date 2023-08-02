/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-02 21:31:52
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 21:37:45
 * @Description : getters
 */
const getters = {
  getTodos(state) {
    return state.todos
  },
  getDoneTodos(state) {
    return state.todos.filter(todo => todo.done)
  },
}
export { getters }
