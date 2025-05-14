import { ref } from 'vue'

export function useCounter(init: number) {
  const count = ref(init)
  const add = () => {
    count.value += 1
  }
  return {
    count,
    add
  }
}
