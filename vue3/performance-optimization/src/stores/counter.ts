import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const obj = {
    format: undefined,
  }
  const params = reactive({
    ...obj,
    format: 'image/png',
  })
  return { count, doubleCount, increment, params }
})
