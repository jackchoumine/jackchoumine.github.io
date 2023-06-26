<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-27 02:28:01
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-27 03:29:25
 * @Description : 指令测试页面
-->
<script lang="ts" setup>
import { ClickOutside, JSXDemo, PreviewDemo, RenderDemo } from '@/components'
</script>

<template>
  <div class="directive-page">
    <!-- <h3>v-focus</h3> -->
    <!-- <input v-focus /> -->
    <ClickOutside />
    <PreviewDemo />
    <JSXDemo />
    <RenderDemo />
  </div>
</template>

<style scoped lang="scss">
.directive-page {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0 20px;
}
</style>
