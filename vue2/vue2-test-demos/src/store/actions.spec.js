/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-02 21:56:41
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 22:08:36
 * @Description : 测试 actions
 */
import { actions } from './actions'
import { getTodos } from '../api'
import flushPromises from 'flush-promises'

jest.mock('../api')

describe('actions', () => {
  it('fetchTodos calls commit with the result of getTodos', async () => {
    expect.assertions(1)
    const todos = [{}, {}]
    const type = 'add'
    getTodos.mockImplementation(calledWith => {
      return calledWith === type ? Promise.resolve(todos) : Promise.resolve()
    })
    const context = {
      commit: jest.fn(),
    }
    actions.fetchTodos(context, { type })
    await flushPromises()
    expect(context.commit).toHaveBeenCalledWith('addTodos', todos)
  })
})
