<!--
 * @Date        : 2022-08-08 16:42:27
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-05-13 01:56:19
 * @Description : 关于页面
-->
<script setup lang="ts">
import { DemoOne } from '@/components/ConcurrencyControl'
import StorageDemoOne from '@/hooks/useStorage/demos/DemoOne.vue'
import StorageDemoTwo from '@/hooks/useStorage/demos/DemoTwo.vue'
const open = ref(true)
</script>

<template>
  <div class="page">
    <h3>并发控制</h3>
    <DemoOne />
    <StorageDemoOne />
    <StorageDemoTwo />
    <h2>测试 ecui组件库 {{ open }}</h2>
    <EcButton color="red" icon="message">按钮</EcButton>
    <EcSwitch v-model="open"/>
  </div>
</template>

<style lang="scss"></style>
