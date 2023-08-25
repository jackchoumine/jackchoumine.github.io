/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-25 01:16:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-25 02:03:09
 * @Description :
 */
import { getProfile } from '../../https'

async function mockGlobal() {
  const profile = await getProfile()
  return profile
}

export { mockGlobal }
