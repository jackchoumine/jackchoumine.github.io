/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-25 01:03:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-25 18:14:00
 * @Description : 使用 vitest 测试 store
 */
import { afterEach, describe, vi } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, it, expect } from 'vitest'
import { useJokeStore } from './jokeStore'
import { flushPromises } from '@vue/test-utils'

let joke = 'joke'
let globalFetch: any

function mockFetch() {
  return Promise.resolve({
    json: () => Promise.resolve({ joke })
  })
}
const fakeFetch = (res: any) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(res)
  })
}

describe('jokeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    globalFetch = global.fetch
    // ok
    // global.fetch = vi.fn(() => mockFetch())
    // ok
    global.fetch = vi.fn().mockImplementation(() => mockFetch())
    // ok
    // global.fetch = vi.fn().mockImplementation(() => {
    //   // return fakeFetch({ joke })
    //   return mockFetch()
    // })
  })
  afterEach(() => {
    global.fetch = globalFetch
  })

  it('joke 默认状态', () => {
    const jokeStore = useJokeStore()
    // store 状态
    expect(jokeStore.joke).toBe('')
    expect(jokeStore.jokeLetterCount).toBe(0)
  })

  it('请求接口后的状态', async () => {
    const jokeStore = useJokeStore()

    jokeStore.fetchJoke()

    await flushPromises()

    expect(jokeStore.joke).toBe(joke)
    expect(jokeStore.jokeLetterCount).toBe(joke.length)
  })
})
