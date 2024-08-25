/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 02:16:51
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-25 16:48:03
 * @Description : counter store
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counterStore', () => {
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)

  function increment(amount = 1) {
    count.value += amount
  }

  return { count, doubleCount, increment }
})
