<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-29 22:13:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-22 18:48:46
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
import { inject } from 'vue'
import { useCounterStore } from '@/stores/counterStore'
const counterStore = useCounterStore()
const theme = inject('useTheme')
</script>

<template>
  <div class="CounterComponent">
    <p>theme{{ theme }}</p>
    <h3>count: {{ counterStore.count }}</h3>
    <h3>doubleCount: {{ counterStore.doubleCount }}</h3>
    <button @click="counterStore.increment(2)">Increment</button>
  </div>
</template>

<style scoped lang="scss">
.CounterComponent {
  // scss code
}
</style>
