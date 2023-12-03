<!--
 * @Description : 测试 http 
 * @Date        : 2022-12-16 00:31:13 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-10-16 15:00:40
 * @LastEditors : ZhouQiJun
-->
<script lang="ts" setup>
import { UserCart } from '@/components/HookTest'
import { TodoDemo } from '@/components/TestHttp'
import DemoThree from '@/hooks/useStorage/demos/DemoThree.vue'
</script>

<template>
  <div class="page">
    <TodoDemo />
    <MyButton />
    <UserCart />
    <DemoThree />
  </div>
</template>

<style scoped lang="scss"></style>
