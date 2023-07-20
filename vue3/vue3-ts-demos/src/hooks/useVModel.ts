/*
 * @Description :
 * @Date        : 2021-10-28 02:11:46 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-28 02:17:10 +0800
 * @LastEditors : JackChou
 */
import { computed, getCurrentInstance } from 'vue'

export function useVModel<K extends keyof P, P>(props: P, name: K) {
  const emit = getCurrentInstance()!.emit
  return computed({
    get() {
      return props[name]
    },
    set(value) {
      emit(`update:${name}`, value)
    },
  })
}
