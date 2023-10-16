/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:38:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 14:32:20
 * @Description :
 */
import { ref } from 'vue'

import { createStorage } from '@/utils'

// import { $localStorage } from './localStorage'
import mediator from './mediator'

const createMediator = () => mediator.install({})

export const useStorage = (key: string, type) => {
  const value = ref(null)
  const sub = createMediator()
  sub.subscribe(key, changeValue)

  const storage = createStorage(type)
  onMounted(() => {
    value.value = storage.get(key)
  })

  return [value, setValue]

  function setValue(_value) {
    storage.set(key, _value)
  }

  function changeValue(_value) {
    value.value = _value
  }
}
