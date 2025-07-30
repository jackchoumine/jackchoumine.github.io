<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-30 16:28:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-31 02:05:32
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const APP_URL = import.meta.env.VITE_APP_URL
const MODE = import.meta.env.MODE
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
</script>

<template>
  <main>
    <div>
      <h3>count</h3>
      <div>count :{{ counterStore.count }}</div>
      <h4>{{ APP_URL }}</h4>
      <h4>isDev {{ isDev }} isProd {{ isProd }}</h4>
      <h4>MODE {{ MODE }}</h4>
      <div>
        <el-button type="primary" @click="counterStore.increment">+</el-button>
      </div>
    </div>
    <TheWelcome />
  </main>
</template>
