/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:38:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 11:11:26
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

  const storage = createStorage(type)

  sub.subscribe(key, setValue)

  onMounted(() => {
    value.value = storage.get(key)
  })

  return [value, updateValue]

  function setValue(_value) {
    value.value = _value
  }

  function updateValue(_value) {
    storage.set(key, _value)
  }
}
