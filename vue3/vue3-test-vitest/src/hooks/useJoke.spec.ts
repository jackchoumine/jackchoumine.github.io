/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-23 02:01:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-24 20:21:52
 * @Description : 测试 useJoke
 */
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { createApp } from 'vue'
import axios from 'axios'
import useJoke from './useJoke'

// 第一个参数为模块的导入路径，第二个参数是一个模块对象的工厂函数
// 工厂函数返回的对象有一`default`属性，用于模拟模块的默认导出
// vi.mock('path',factoryFunction)
// axios.get
vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn()
    }
  }
})

let _app = null
const joke = 'this is a joke'

beforeEach(() => {
  // @ts-ignore
  axios.get.mockResolvedValue({ data: { joke }, status: 200 })
})

it('useJoke', async () => {
  const { result, app } = setupHook(useJoke)
  _app = app
  await flushPromises()

  expect(result.loading.value).toBe(false)
  expect(result.joke.value).toBe(joke)
  expect(result.fetchJoke).instanceOf(Function)
})

afterEach(() => {
  // @ts-ignore
  axios.get.mockReset()
  // @ts-ignore
  _app.unmount()
})

function setupHook(hook: Function, params?: any) {
  let result: any

  const app = createApp({
    setup() {
      result = hook(params)
      return () => null
    }
  })

  app.mount(document.createElement('div'))

  return {
    result,
    app
  }
}
