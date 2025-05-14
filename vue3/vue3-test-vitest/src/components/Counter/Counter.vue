<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-29 14:48:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-29 15:47:34
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
import { ref } from 'vue'
import { useCounter } from './useCounter'
const { count, add } = useCounter(100)
import LineChart from './MyCounter'
const show = ref(true)
</script>

<template>
  <div class="Counter">
    <h2>counter</h2>
    <p>{{ count }}</p>
    <button @click="add">+</button>
    <button @click="show = !show">切切换</button>
    <LineChart v-if="show" />
  </div>
</template>

<style scoped lang="scss">
.Counter {
  // scss code
}
</style>
