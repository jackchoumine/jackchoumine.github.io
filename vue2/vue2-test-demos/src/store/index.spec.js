/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-02 22:28:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 23:28:00
 * @Description :
 */
import { createLocalVue } from '@vue/test-utils'
// import cloneDeep from 'lodash.clonedeep'
import { storeConfig } from './index'
import { getTodos } from '../api'
import flushPromises from 'flush-promises'

jest.mock('../api')

const localVue = createLocalVue()
import Vuex from 'vuex'
localVue.use(Vuex)

describe('store', () => {
  let store = null
  beforeEach(() => {
    store = new Vuex.Store(storeConfig)
  })
  it('state.count', () => {
    expect(store.state.count).toBe(0)
    store.commit('increment')
    expect(store.state.count).toBe(1)
    store.commit('increment', 2)
    expect(store.state.count).toBe(3)
  })
  it('test actions.fetchTodos', async () => {
    expect.assertions(1)
    const todos = [
      { done: true, content: '吃饭' },
      { done: false, content: '睡觉' },
    ]
    const type = 'add'
    getTodos.mockImplementation(calledWith => {
      return calledWith === type ? Promise.resolve(todos) : Promise.resolve()
    })
    store.dispatch('fetchTodos', { type })
    await flushPromises()
    expect(store.getters.getTodos).toEqual(todos)
  })
})
