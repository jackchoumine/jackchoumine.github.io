/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 10:32:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 10:23:15
 * @Description :
 */
import mediator from '@/hooks/useStorage/mediator'

type StoreType = 'session' | 'local'

const keys: string[] = []

const createMediator = () => mediator.install({})

const sub = createMediator()

function set<V = unknown>(key: string, value: V, type: StoreType = 'session') {
  if (!key || typeof key !== 'string') throw new Error('必须有一个字符串参数 key')

  const jsonValue = JSON.stringify(value)
  if (type === 'local') {
    localStorage.setItem(key, jsonValue)
  } else if (type === 'session') {
    sessionStorage.setItem(key, jsonValue)
  } else {
    throw new Error('不支持的存储类型')
  }
  // NOTE  stringify 支持的值
  // 1， 对象 {...}
  // 2， 数组 [...]
  // 3， 字符串
  // 4， 数字
  // 5， 布尔值
  // 6， null

  // 被忽略的属性值
  // 1， undefined
  // 2， Symbol
  // 3， 函数
}

function get<V = string | null | unknown>(key: string, type: StoreType = 'session'): V {
  if (!key || typeof key !== 'string') throw new Error('必须有一个字符串参数 key')

  if (type === 'local') {
    try {
      const value = JSON.parse(localStorage.getItem(key)!)
      return value
    } catch (error) {
      return localStorage.getItem(key) as any
    }
  } else if (type === 'session') {
    try {
      const value = JSON.parse(sessionStorage.getItem(key)!)
      return value
    } catch (error) {
      return sessionStorage.getItem(key) as any
    }
  } else {
    throw new Error('不支持的存储类型')
  }
}

function clear(type: StoreType = 'session') {
  if (type === 'local') {
    localStorage.clear()
  } else if (type === 'session') {
    sessionStorage.clear()
  } else {
    throw new Error('不支持的存储类型')
  }
}

function remove(key: string, type: StoreType = 'session') {
  if (!key || typeof key !== 'string') throw new Error('必须有一个字符串参数 key')

  if (type === 'local') {
    localStorage.removeItem(key)
  } else if (type === 'session') {
    sessionStorage.removeItem(key)
  } else {
    throw new Error('不支持的存储类型')
  }
}
// window.addEventListener('storage', event => {
//   console.log(event, 'zqj log')
//   // servername 为 localStorage 的 key
//   if (event.key === 'servername') {
//     this.data.serverName = event.newValue // newValue 即为新设置的 localStorage 的值，更新 topmenu 为 localStorage 里的值，保持多 tab 页一致。
//   }
// })

const storage = {
  get,
  set,
  clear,
  remove,
}

function createStorage(type: StoreType = 'session') {
  let _storage = null
  if (type === 'local') {
    _storage = window.localStorage
  } else if (type === 'session') {
    _storage = window.sessionStorage
  } else {
    throw new Error('不支持的存储类型')
  }
  return {
    get: key => storage.get(key, type),
    set: (key, value) => {
      // 防止重复发布
      if (!keys.includes(key)) keys.push(key)

      // 被修改就发布事件
      sub.publish(key, value)

      storage.set(key, value, type)
    },
    clear: () => {
      // 被删除就每个key发布事件
      keys.map(key => sub.publish(key, undefined))
      // 发布后清空记录key的数组
      keys.length = 0

      storage.clear(type)
    },
    remove: key => {
      keys.splice(keys.indexOf(key), 1)

      // 被移除就发布 undefined
      sub.publish(key, undefined)
      storage.remove(key)
    },
    // key: _storage.key,
    length: _storage.length,
  }
}

export { storage }
export default createStorage
