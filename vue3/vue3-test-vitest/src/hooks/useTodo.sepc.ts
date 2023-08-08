/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 10:30:21
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-08 11:23:46
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
global.fetch = vi.fn().mockResolvedValue(() => {
  return {
    json: Promise.resolve(todo)
  }
})

describe('useTodo', () => {
  it('call useTodo in onMounted', async () => {
    const HelperComponent = defineComponent({
      setup() {
        const { todo } = useTodo(3)
        return {
          todo
        }
      }
    })
    const wrapper = shallowMount(HelperComponent)

    expect(wrapper.vm.todo).toBeUndefined()

    await flushPromises()

    expect(wrapper.vm.todo).toEqual(todo)
  })
})
// 如何模拟 fetch
// https://runthatline.com/how-to-mock-fetch-api-with-vitest/
