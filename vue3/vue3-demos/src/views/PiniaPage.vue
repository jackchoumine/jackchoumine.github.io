<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-07 13:30:49
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-07 13:53:12
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
import { useCounterStore } from '@/stores'

const { increment } = useCounterStore()
const counterStore = useCounterStore()
</script>

<template>
  <div class="PiniaPage">
    <h1>Pinia Page</h1>
    <p>Count: {{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
    <button @click="increment">Increment</button>
    <hr />
  </div>
</template>

<style lang="scss">
.PiniaPage {
  // scss code
}
</style>
