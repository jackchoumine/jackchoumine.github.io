/*
 * @Description : api 接口
 * @Date        : 2022-06-09 17:39:21 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-09 17:39:23 +0800
 * @LastEditors : JackChou
 */
import axios from 'axios'

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
