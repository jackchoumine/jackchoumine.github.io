/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-08 22:19:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-08 22:37:43
 * @Description :
 */
import { Store } from './Store'

export const usersStore = new Store({
  users: [{ name: 'zqj', age: 18 }]
})
