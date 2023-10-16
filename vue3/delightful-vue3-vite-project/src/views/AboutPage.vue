<!--
 * @Date        : 2022-08-08 16:42:27
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 11:15:25
 * @Description : 关于页面
-->
<script setup lang="ts">
import { DemoOne } from '@/components/ConcurrencyControl'
import StorageDemoOne from '@/hooks/useStorage/demos/DemoOne.vue'
import DemoThree from '@/hooks/useStorage/demos/DemoThree.vue'
import StorageDemoTwo from '@/hooks/useStorage/demos/DemoTwo.vue'
</script>
<template>
  <div class="page">
    <h3>并发控制</h3>
    <DemoOne />
    <StorageDemoOne />
    <StorageDemoTwo />
    <DemoThree />
  </div>
</template>

<style lang="scss"></style>
