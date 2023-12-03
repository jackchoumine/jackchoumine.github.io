/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:38:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 16:34:07
 * @Description :
 */
import { ref } from 'vue'

import { createStorage } from '@/utils'

// import { $localStorage } from './localStorage'
import mediator from './mediator'

const createMediator = () => mediator.install({})

type StoreType = 'session' | 'local'

let hasStorageListener = false

export const useStorage = (key: string, type: StoreType = 'session') => {
  const value = ref(null)
  const sub = createMediator()
  sub.subscribe(key, changeValue)

  const storage = createStorage(type)

  onMounted(() => {
    value.value = storage.get(key)
  })

  !hasStorageListener && shareSessionStorage(type)

  return [value, setValue]

  function setValue(_value) {
    storage.set(key, _value)
  }

  function changeValue(_value) {
    value.value = _value
  }

  function shareSessionStorage(type) {
    if (!sessionStorage.length) {
      // 没有 sessionStorage，获取 sessionStorage 触发 storage 事件
      localStorage.setItem('getSessionStorage', Date.now())
    }

    window.addEventListener('storage', storageChange)

    function storageChange(event) {
      // console.log('storage event', event)

      if (event.key == 'getSessionStorage') {
        console.log(sessionStorage, 'zqj log')
        // Some tab asked for the sessionStorage -> send it
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
        localStorage.removeItem('sessionStorage')
      } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
        const storage = createStorage('session')
        // sessionStorage is empty -> fill it
        const data = JSON.parse(event.newValue)
        // console.log(data, 'zqj log')
        const keys = Object.keys(data ?? {})
        keys.forEach(key => {
          // console.log(data[key], 'zqj log data[key]')
          const value = JSON.parse(data[key])
          storage.set(key, value)
        })
      } else {
        // 当前 tab 修改 localStorage，同步到其他 tab
        const storage = createStorage('local')
        const data = JSON.parse(event.newValue)
        storage.set(event.key, data)
      }
    }
    hasStorageListener = true
  }
}
