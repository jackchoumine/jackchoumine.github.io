/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 10:30:21
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-22 18:30:17
 * @Description : 测试依赖组件的 hooks -- 依赖生命周期
 */
import { describe, it, expect, vi } from 'vitest'
import { createApp, defineComponent, h } from 'vue'
import { useTodo } from './useTodo'
import { shallowMount, flushPromises, mount } from '@vue/test-utils'

const todo = {
  userId: 1,
  id: 3,
  title: 'fugiat veniam minus',
  completed: false
}

global.fetch = vi.fn().mockResolvedValue({
  json: () => Promise.resolve([todo])
})

describe('useTodo', () => {
  it('call useTodo in onMounted', async () => {
    const {
      result: { todo: _todo }
    } = setupHook(useTodo, 3)

    expect(_todo.value).toBeUndefined()

    await flushPromises()

    expect(_todo.value).toEqual(todo)
  })
})

// 如何模拟 fetch
// https://runthatline.com/how-to-mock-fetch-api-with-vitest/

function setupHook(hook: Function, params?: any) {
  let result: any

  //const HelperComponent = defineComponent(() => {
  //  result = hook(params)
  //  return () => null
  //})
  const HelperComponent = defineComponent({
    setup() {
      result = hook(params)
      return () => null
    }
  })

  // NOTE shallowMount 提示没有活动的组件实例
  //const wrapper = shallowMount(HelperComponent, {
  //  attachTo: document.body
  //})

  const app = createApp({
    setup() {
      result = hook(params)
      return () => null
    }
  })

  app.mount(document.createElement('div'))

  return {
    result
    // wrapper: app
  }
}
