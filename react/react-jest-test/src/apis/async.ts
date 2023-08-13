/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-13 22:57:51
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-14 00:37:42
 * @Description :
 */
import axios from 'axios'

function asyncApiCallback(callback: any) {
  axios.get('http://localhost:3001/posts').then(res => callback(res.data))
}
function asyncApiPromise() {
  return axios.get('https://jsonplaceholder.typicode.com/todos/120').then(res => res.data)
}
function asyncApiProfile() {
  return axios.get('http://localhost:3001/profile').then(res => res.data)
}
function asyncApiPromise404() {
  return axios
    .get('https://api.github.com/users/ajafaklfa-testdada')
    .then(res => res.data)
  // .catch(error => {
  //   console.log(error.response, 'zqj log')
  //   return Promise.reject(error.response)
  // })
}
function asyncApiPromise4042() {
  return axios
    .get('https://api.github.com/users/ajafaklfa-testdada')
    .then(res => res.data)
    .catch(error => {
      //   console.log(error.response, 'zqj log')
      return Promise.reject(error.response)
    })
}

export {
  asyncApiCallback,
  asyncApiPromise,
  asyncApiProfile,
  asyncApiPromise404,
  asyncApiPromise4042,
}
