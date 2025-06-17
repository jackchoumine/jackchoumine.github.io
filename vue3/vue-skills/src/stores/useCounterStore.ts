/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-07 13:25:52
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-07 13:48:38
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCounterStore = defineStore('counterStore', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 10)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

if (import.meta.hot) {
  // 支持热更新，且能维持原来的状态
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
