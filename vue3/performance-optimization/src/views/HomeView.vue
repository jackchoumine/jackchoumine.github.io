<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-30 16:28:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-30 16:57:43
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <main>
    <div>
      <h3>count</h3>
      <div>count :{{ counterStore.count }}</div>
      <div>
        <button @click="counterStore.increment">+</button>
      </div>
    </div>
    <TheWelcome />
  </main>
</template>
