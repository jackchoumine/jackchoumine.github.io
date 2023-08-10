/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-10 10:37:22
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-10 11:18:10
 * @Description :
 */
const axios = {
  get: jest.fn(() => Promise.resolve({ data: 'value' })),
}

export default axios
