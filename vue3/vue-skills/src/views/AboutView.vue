<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-19 17:36:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-03 15:11:16
 * @Description : 关于博主，前端程序员，最近专注于 webGis
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup lang="ts">
import { ref } from 'vue'

import { useMitt } from '@/hooks'
import { MyInput } from '@/components'

const dateFromEmit = ref('')

useMitt('user:login', (payload) => {
  console.log('接收到关于页面的 payload:', payload.username)
  dateFromEmit.value = payload.username
})
const testInput = ref()
</script>

<template>
  <div class="about">
    <MyInput v-model="testInput">
      <template #append>
        <span>.com</span>
      </template>
    </MyInput>
    <h1>This is an about page testInput {{ testInput }}</h1>
    <p>dataFromEmit {{ dateFromEmit }}</p>
  </div>
</template>

<style>
.about {
  /*min-height: 100vh;*/
}
</style>
