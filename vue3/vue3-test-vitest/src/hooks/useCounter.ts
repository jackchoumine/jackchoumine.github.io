/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 10:17:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-08 10:18:11
 * @Description :
 */
import { ref } from 'vue'

export function useCounter(initCount: number = 10) {
  const count = ref(initCount)

  const add = () => {
    count.value++
  }

  return {
    count,
    add
  }
}
