/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-13 13:15:58
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-13 16:36:40
 * @Description : localStorage 和 sessionStorage 的封装
 */
const KEY_NAME = 'my-app-' as const

type StorageType = 'local' | 'session'

function set<V = unknown>(key: string, value: V, type: StorageType = 'session') {
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

function get(key: string, type: StorageType = 'session') {
  if (type === 'local') {
    try {
      let value = JSON.parse(localStorage.getItem(key)!)
      return value
    } catch (error) {
      return localStorage.getItem(key)
    }
  } else if (type === 'session') {
    try {
      let value = JSON.parse(sessionStorage.getItem(key)!)
      return value
    } catch (error) {
      return sessionStorage.getItem(key)
    }
  } else {
    throw new Error('不支持的存储类型')
  }
}

function clear(type: StorageType = 'session') {
  if (type === 'local') {
    localStorage.clear()
  } else if (type === 'session') {
    sessionStorage.clear()
  } else {
    throw new Error('不支持的存储类型')
  }
}

function remove(key: string, type: StorageType = 'session') {
  if (type === 'local') {
    localStorage.removeItem(key)
  } else if (type === 'session') {
    sessionStorage.removeItem(key)
  } else {
    throw new Error('不支持的存储类型')
  }
}

const storage = {
  get,
  set,
  clear,
  remove,
}

export { storage }
