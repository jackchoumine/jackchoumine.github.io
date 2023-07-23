/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 19:21:42
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-23 21:51:59
 * @Description :
 */
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import { getTodoList } from '@/api'

import MockModule from './MockModule.vue'

jest.mock('@/api') // 模拟 api 模块
describe('MockModule.vue', () => {
  const todos = [{ id: '1', title: '测试' }]
  beforeEach(() => {
    // getTodoList.mockResolvedValueOnce(todos)
    getTodoList.mockResolvedValue(todos)
  })
  it('测试异步接口', async () => {
    expect.assertions(1)
    // const todo = { id: '1', title: '测试' }
    // getTodoList.mockResolvedValue(todo)
    const res = await getTodoList()
    expect(res).toEqual(todos)
  })
  it('模拟模块依赖', async () => {
    const wrapper = shallowMount(MockModule)
    await flushPromises()
    expect(wrapper.vm.todoList).toEqual(todos)
  })
})
