/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-25 01:16:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-25 01:50:57
 * @Description :
 */
import { getProfile } from '../../https'

import dbJson from '../../../db.json'
import { mockGlobal } from './globalMock'
jest.mock('../../https')

describe('mock global', () => {
  it('重写模拟函数', async () => {
    const mockGetProfile = getProfile as jest.MockedFunction<typeof getProfile>
    const mockData = dbJson.profile
    mockGetProfile.mockResolvedValue(mockData)

    const profile = await getProfile()

    expect(profile).toEqual(mockData)
  })
  it('mockGlobal', async () => {
    const mockData = dbJson.profile
    const profile = await mockGlobal()

    expect(profile).toEqual(mockData)
  })
})
