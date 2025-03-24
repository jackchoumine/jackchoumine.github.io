import { defineEmits } from 'vue'

// 全局状态，不会随着组件的销毁重置
const globalCount = ref(0)

export function useTestGlobalState() {
  // NOTE 不能在 hook 中使用 emit
  // const emit = defineEmits(['add-count'])
  // 两种解决办法：
  // 1. 使用 hook 内修改 ref，组件内 watch + emit 代替 【推荐】
  // 2. hook 参数接收 emit，在 hook 内部调用 emit 触发事件
  // 本地状态，会随着组件的销毁重置
  const localCount = ref(0)

  onBeforeUnmount(resetGlobalCount)

  return {
    localCount,
    addLocalCount,
    globalCount,
    addGlobalCount,
  }

  function addLocalCount() {
    localCount.value = localCount.value + 1
    // emit('add-count', localCount.value)
  }
  function addGlobalCount() {
    globalCount.value = globalCount.value + 1
  }
  function resetGlobalCount() {
    globalCount.value = 0
  }
}
