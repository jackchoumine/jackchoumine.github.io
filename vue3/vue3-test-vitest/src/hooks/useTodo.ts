/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 10:24:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-22 18:19:40
 * @Description : 使用了 vue 生命钩子的 hooks
 */
import { onMounted, ref } from 'vue'

export function useTodo(id: string | number) {
  const todo = ref()

  function getTodo() {
    fetch(`https://jsonplaceholder.typicode.com/todos?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        todo.value = res?.[0]
      })
  }
  getTodo()
  //onMounted(getTodo)

  return {
    todo
  }
}
