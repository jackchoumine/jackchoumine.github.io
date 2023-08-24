/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-25 01:20:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-25 01:50:10
 * @Description :
 */

import dbJson from '../../../db.json'

function getProfile() {
  return jest.fn().mockResolvedValue(dbJson.profile)
}

export { getProfile }
