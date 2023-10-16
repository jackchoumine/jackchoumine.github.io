/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:38:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 09:51:31
 * @Description :
 */
import { ref } from 'vue'

import { $localStorage } from './localStorage'
import mediator from './mediator'

const createMediator = () => mediator.install({})

export const useStorage = (key: string) => {
  const string = ref(null)

  const sub = createMediator()

  sub.subscribe(key, value => {
    string.value = value
  })
  onMounted(() => {
    string.value = $localStorage.get(key)
  })
  return string
}
