/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-25 01:03:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-28 21:55:08
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
// 参考链接
// https://runthatline.com/vitest-test-pinia-store-actions-getters/

// NOTE 测试 pinia store ，通常需要测试两方面：
// 1、 单独测试 store 的状态：重点关注 store 的状态是否正确
// 2、 测试 store 在 vue 组件中的使用：重点关注 store 与组件的交互是否正确，即 store 的 action 是否被正确调用，store 的状态是否被正确更新
// https://testdriven.io/blog/vue-pinia-testing/

// NOTE 在组件的单元测试中，如何修改 store 的状态，让修改反馈到组件中
// https://github.com/vuejs/pinia/discussions/1130
