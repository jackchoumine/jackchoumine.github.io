/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:36:06
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 09:41:15
 * @Description :
 */
import mediator from './mediator'

const keys: string[] = []

const createMediator = () => mediator.install({})

const sub = createMediator()

export const $localStorage = {
  get: (key: string) => {
    return window.localStorage.getItem(key)
  },

  set: (key: string, value: any) => {
    // 防止重复发布
    if (!keys.includes(key)) keys.push(key)

    // 被修改就发布事件
    sub.publish(key, value)

    window.localStorage.setItem(key, value)
  },
  clear: () => {
    // 被删除就每个key发布事件
    keys.map(key => sub.publish(key, undefined))
    // 发布后清空记录key的数组
    keys.length = 0

    window.localStorage.clear()
  },
  remove: (key: string) => {
    keys.splice(keys.indexOf(key), 1)

    // 被移除就发布 undefined
    sub.publish(key, undefined)

    window.localStorage.removeItem(key)
  },
  key: window.localStorage.key,
  length: window.localStorage.length,
}
