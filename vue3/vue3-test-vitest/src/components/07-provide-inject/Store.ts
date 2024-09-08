/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-08 22:15:06
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-08 22:31:49
 * @Description : Store
 */
import { reactive, readonly } from 'vue'

type User = { name: string; age: number }
type State = { users: User[] }
export class Store {
  #state: State
  constructor(state: State) {
    this.#state = reactive(state)
  }
  getState() {
    return readonly(this.#state)
  }
  addUser(user: User) {
    this.#state.users.push(user)
  }
}
