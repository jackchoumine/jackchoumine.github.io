/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:38:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 16:17:04
 * @Description :
 */
import { ref } from 'vue'

import { createStorage } from '@/utils'

// import { $localStorage } from './localStorage'
import mediator from './mediator'

const createMediator = () => mediator.install({})

type StoreType = 'session' | 'local'

export const useStorage = (key: string, type: StoreType = 'session') => {
  const value = ref(null)
  const sub = createMediator()
  sub.subscribe(key, changeValue)

  const storage = createStorage(type)

  onMounted(() => {
    value.value = storage.get(key)
  })

  type === 'session' && shareSessionStorage()

  return [value, setValue]

  function setValue(_value) {
    storage.set(key, _value)
  }

  function changeValue(_value) {
    value.value = _value
  }

  function shareSessionStorage() {
    const storage = createStorage('session')
    if (!sessionStorage.length) {
      // 没有 sessionStorage，获取 sessionStorage 触发 storage 事件
      localStorage.setItem('getSessionStorage', Date.now())
    }

    window.addEventListener('storage', storageChange)

    function storageChange(event) {
      console.log('storage event', event)

      if (event.key == 'getSessionStorage') {
        console.log(sessionStorage, 'zqj log')
        // Some tab asked for the sessionStorage -> send it
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
        localStorage.removeItem('sessionStorage')
      } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
        // sessionStorage is empty -> fill it
        const data = JSON.parse(event.newValue)
        // console.log(data, 'zqj log')
        const keys = Object.keys(data ?? {})
        keys.forEach(key => {
          // console.log(data[key], 'zqj log data[key]')
          const value = JSON.parse(data[key])
          storage.set(key, value)
        })
      }
    }
  }
}
