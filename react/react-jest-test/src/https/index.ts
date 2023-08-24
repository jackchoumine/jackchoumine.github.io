/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-25 01:19:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-25 01:19:48
 * @Description :
 */
import axios from 'axios'

function getProfile() {
  return axios.get('http://localhost:3001/profile').then(res => res.data)
}

export { getProfile }
