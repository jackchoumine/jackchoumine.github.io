import axios from 'axios'

function getTodoList() {
  return axios.get('https://jsonplaceholder.typicode.com/todos').then(res => res.data)
}
export { getTodoList }
