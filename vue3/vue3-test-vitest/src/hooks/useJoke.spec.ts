/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-23 02:01:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-27 09:50:07
 * @Description : 测试 useJoke
 */
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { createApp } from 'vue'
import type { App } from 'vue'
// import axios from 'axios'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import type { SetupServer } from 'msw/node'
import useJoke from './useJoke'

// 第一个参数为模块的导入路径，第二个参数是一个模块对象的工厂函数
// 工厂函数返回的对象有一`default`属性，用于模拟模块的默认导出
// vi.mock('path',factoryFunction)
// axios.get
// vi.mock('axios', () => {
//   return {
//     default: {
//       get: vi.fn()
//     }
//   }
// })

let app: App | null = null
const joke = 'this is a joke'

let server: SetupServer

beforeEach(() => {
  server = setupServer(
    http.get('https://icanhazdadjoke.com', () => {
      return HttpResponse.json({
        joke
      })
    })
  )
  server.listen()
})

afterEach(() => {
  server.close()
  app!.unmount()
})

it('useJoke', async () => {
  const { result, app: _app } = setupHook(useJoke)
  app = _app as App

  expect(result.loading.value).toBe(true)
  expect(result.joke.value).toBe('')

  // 接口请求完成后
  await flushPromises()

  expect(result.loading.value).toBe(false)
  expect(result.joke.value).toBe(joke)
  expect(result.fetchJoke).instanceOf(Function)
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
