/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 16:36:08
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-23 19:32:41
 * @Description :
 */
function getTodoList() {
  return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
}
export { getTodoList }
