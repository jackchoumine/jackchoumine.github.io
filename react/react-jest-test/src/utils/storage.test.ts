/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-12 18:23:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-13 17:13:03
 * @Description :
 */
import { storage } from './storage'
describe('storage', () => {
  describe('默认是 sessionStorage', () => {
    beforeEach(() => {
      sessionStorage.clear()
    })
    it('storage.set', () => {
      const value = 'hello'
      const key = 'sessionKey'
      storage.set(key, value)
      expect(sessionStorage.getItem(key)).toEqual(JSON.stringify(value))

      const key2 = 'sessionKey2'
      const value2 = {
        name: 'zqj',
      }
      storage.set(key2, value2)

      expect(storage.get(key2)).toEqual(value2)
    })

    it('storage.get', () => {
      const value = JSON.stringify('hello')
      const key = 'sessionKey'
      sessionStorage.setItem(key, value)

      expect(sessionStorage.getItem(key)).toEqual(value)
      expect(storage.get(key)).toEqual(JSON.parse(value))
    })
    it('storage.remove', () => {
      const key = 'sessionKey'
      const value = ['hello']
      storage.set(key, value)

      expect(storage.get(key)).toEqual(value)

      storage.remove(key)

      expect(storage.get(key)).toBeNull()
    })
    it('storage.clear', () => {
      const key = 'sessionKey'
      const value = ['hello']
      storage.set(key, value)
      const key2 = 'sessionKey2'
      const value2 = {}
      storage.set(key2, value2)

      expect(storage.get(key)).toEqual(value)
      expect(storage.get(key2)).toEqual(value2)

      storage.clear()

      expect(storage.get(key)).toBeNull()
      expect(storage.get(key2)).toBeNull()
    })
  })
  describe('设置 localStorage', () => {
    beforeEach(() => {
      localStorage.clear()
    })
    it('storage.set', () => {
      const value = 'hello'
      const key = 'sessionKey'
      storage.set(key, value, 'local')
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(value))

      const key2 = 'sessionKey2'
      const value2 = {
        name: 'zqj',
      }
      storage.set(key2, value2, 'local')

      expect(storage.get(key2, 'local')).toEqual(value2)
    })

    it('storage.get', () => {
      const value = JSON.stringify('hello')
      const key = 'sessionKey'
      localStorage.setItem(key, value)

      expect(localStorage.getItem(key)).toEqual(value)
      expect(storage.get(key, 'local')).toEqual(JSON.parse(value))
    })
    it('storage.remove', () => {
      const key = 'sessionKey'
      const value = ['hello']
      storage.set(key, value, 'local')

      expect(storage.get(key, 'local')).toEqual(value)

      storage.remove(key, 'local')

      expect(storage.get(key, 'local')).toBeNull()
    })
    it('storage.clear', () => {
      const key = 'sessionKey'
      const value = ['hello']
      storage.set(key, value, 'local')
      const key2 = 'sessionKey2'
      const value2 = {}
      storage.set(key2, value2, 'local')

      expect(storage.get(key, 'local')).toEqual(value)
      expect(storage.get(key2, 'local')).toEqual(value2)

      storage.clear('local')

      expect(storage.get(key, 'local')).toBeNull()
      expect(storage.get(key2, 'local')).toBeNull()
    })
  })
  describe('设置错误的 type', () => {
    it('storage.set throw', () => {
      expect(() => storage.set('key', 'error', 'errorType' as any)).toThrowError()
    })
    it('storage.get throw', () => {
      storage.set('key', 'error')

      expect(() => storage.get('key', 'errorType' as any)).toThrowError()

      const value = 'error'
      sessionStorage.setItem('key2', value)
      expect(storage.get('key2')).toBe(value)

      // 不是一个合法的 json 字符串
      const valueObj = '{name: "zqj"}}'
      localStorage.setItem('key2', valueObj)
      // 部署合法的 JSON 字符串，返回原字符串，不进行 JSON.parse
      expect(storage.get('key2', 'local')).toBe(valueObj)
    })
    it('storage.remove throw', () => {
      storage.set('key', 'error')

      expect(() => storage.remove('key', 'errorType' as any)).toThrowError()
    })
    it('storage.clear throw', () => {
      expect(() => storage.clear('errorType' as any)).toThrowError()
    })
  })
})
