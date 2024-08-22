import { expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { createApp } from 'vue'

import useJoke from './useJoke'

it('useJoke', async () => {
  const joke = 'this is a joke'
  global.fetch = vi.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ joke })
    })
  })

  const { result } = setupHook(useJoke)
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
