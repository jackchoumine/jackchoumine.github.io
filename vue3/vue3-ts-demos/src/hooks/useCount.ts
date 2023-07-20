/*
 * @Description : 计数器hooks
 * @Date        : 2021-10-07 16:08:36 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-27 21:47:03 +0800
 * @LastEditors : JackChou
 */
import { computed, reactive, toRefs, onMounted } from 'vue'
type dataPropsType = {
  count: number
  doubleCount: number
  increase: () => void
}

function useCount() {
  const dataProps: dataPropsType = reactive({
    count: 0,
    increase: () => {
      dataProps.count++
    },
    doubleCount: computed(() => dataProps.count * 2),
  })
  onMounted(() => {
    console.log('onMounted')
  })
  return {
    ...toRefs(dataProps), // 不加 increase，在模板中使用 counter.increase.value
    // increase: dataProps.increase, // 结构出 increase 在模板中使用 counter.increase
  }
}

export { useCount }
