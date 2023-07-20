<template>
  <div>
    <p>count:{{ counter.count }}</p>
    <p>doubleCount:{{ counter.doubleCount }}</p>
    <p><button @click="counter.increase.value">加一</button></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useCount } from '../hooks'
export default defineComponent({
  name: 'Form',
  setup() {
    const counter = useCount()
    onMounted(() => {
      console.log('Form mounted')
    })
    console.log(counter) // increase 属性是具有响应性
    return { counter }
  },
})
</script>
