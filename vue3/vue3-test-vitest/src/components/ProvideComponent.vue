<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 11:24:31
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-08 11:26:32
 * @Description : 测试 provide
-->
<script lang="ts" setup>
import { provide } from 'vue'
provide('theme', 'dark')
</script>

<template>
  <div class="provide-component">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.provide-component {
  // scss code
}
</style>
