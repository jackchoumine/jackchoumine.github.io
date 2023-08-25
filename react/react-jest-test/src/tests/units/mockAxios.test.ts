/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-25 01:47:57
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-25 02:12:22
 * @Description :
 */
import axios from 'axios'

import { getTodoList } from './mockAxios'

jest.mock('axios')
describe('mock axios', () => {
  it('getTodoList', async () => {
    const mockData = [{ id: 1, name: 'zqj' }]
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockData }))

    const totoList = await getTodoList()

    expect(totoList).toEqual(mockData)
  })
})
