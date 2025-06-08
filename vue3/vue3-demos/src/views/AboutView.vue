<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-19 17:36:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-08 17:17:09
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup lang="ts">
import { useMitt } from '@/hooks'

import { ref } from 'vue'

const dateFromEmit = ref('')

useMitt('user:login', (payload) => {
  console.log('接收到关于页面的 payload:', payload.username)
  dateFromEmit.value = payload.username
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>dataFromEmit {{ dateFromEmit }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
