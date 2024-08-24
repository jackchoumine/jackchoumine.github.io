/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 10:30:21
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-25 00:55:07
 * @Description : 测试依赖组件的 hooks -- 依赖生命周期
 */
import { describe, it, expect, vi } from 'vitest'
import { defineComponent } from 'vue'
import { useTodo } from './useTodo'
import { shallowMount, flushPromises } from '@vue/test-utils'

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
      result: { todo: _todos }
    } = setupHook(useTodo, 3)

    // expect(_todos.value).toBeUndefined()

    await flushPromises()

    expect(_todos.value).toEqual(todo)
  })
})

// 如何模拟 fetch
// https://runthatline.com/how-to-mock-fetch-api-with-vitest/

function setupHook(hook: Function, params?: any) {
  let result: any

  const HelperComponent = defineComponent({
    setup() {
      result = hook(params)
      return () => null
    }
  })

  const wrapper = shallowMount(HelperComponent)

  return {
    result,
    wrapper
  }
}
