/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-22 22:04:39
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-24 20:02:00
 * @Description :
 */
import { flushPromises, shallowMount } from '@vue/test-utils'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import JokeContainer from './JokeContainer.vue'

type Res = {
  joke: unknown
}
const fakeFetch = (res: Res) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(res)
  })
}

describe.skip('JokeContainer.vue vi.fn', () => {
  let originalFetch: typeof global.fetch

  let joke = 'Why don’t scientists trust atoms? Because they make up everything!'
  beforeAll(() => {
    // 保存原始的 fetch 函数，以便在测试结束后恢复
    originalFetch = global.fetch
    // global.fetch = vi.fn(() => fakeFetch({ joke }))
    global.fetch = vi.fn().mockImplementation(() => {
      return fakeFetch({
        joke
      })
    })
  })
  afterAll(() => {
    global.fetch = originalFetch
  })

  it('fetch joke from http api is ok', async () => {
    const wrapper = shallowMount(JokeContainer)

    await flushPromises()

    expect(wrapper.text()).toContain(joke)
    expect(wrapper.find('p').text()).toEqual(joke)
    expect(global.fetch).toHaveBeenCalledTimes(1)

    joke = 'new joke'
    wrapper.find('button').trigger('click')

    await flushPromises()

    expect(wrapper.text()).toContain(joke)
    expect(wrapper.find('p').text()).toEqual(joke)
    expect(global.fetch).toHaveBeenCalledTimes(2)
  })

  it.skip('fetch joke from http api is fail', async () => {
    global.fetch = vi.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })

    const wrapper = shallowMount(JokeContainer)
    await flushPromises()

    expect(wrapper.text()).toContain('获取笑话失败')
    expect(wrapper.find('p').text()).toEqual('获取笑话失败')
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})

describe.todo('JokeContainer.vue vi.spyOn', () => {
  let fetchSpy: any
  beforeAll(() => {
    fetchSpy = vi.spyOn(global, 'fetch')
    fetchSpy.mockImplementation(fakeFetch)
  })
  afterAll(() => {
    fetchSpy.mockRestore()
  })

  it('fetch joke http api is ok', async () => {
    const wrapper = shallowMount(JokeContainer)
    global.fetch()
    await flushPromises()

    console.log(wrapper.html())
    // expect(wrapper.text()).toContain(joke)
    // expect(wrapper.find('p').text()).toEqual(joke)
    // expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})
