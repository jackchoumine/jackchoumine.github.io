/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:34:21
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 09:59:23
 * @Description : 中介者模式
 * 参考：https://www.51cto.com/article/756513.html
 */

export interface MediatorProps {
  uuid?: number
  publish?: (key: string, ...args: unknown[]) => void
  subscribe?: (key: string, callback: (...args: unknown[]) => void) => void
}

const mediator = (function () {
  let keys = []
  let uuid = 0
  // [{fn,uui}]
  function subscribe(key: string, callback: (...args: unknown[]) => void) {
    uuid++
    keys[key] = keys[key] ? [...keys[key], { callback, uuid }] : [{ callback, uuid }]
  }

  function publish(key: string, ...args: unknown[]) {
    if (keys[key]) {
      keys[key].map(item => item.callback(...args))
    }
  }
  return {
    install: function (obj: MediatorProps) {
      obj.uuid = uuid
      obj.publish = publish
      obj.subscribe = subscribe
      return obj
    },
  }
})()

export default mediator
