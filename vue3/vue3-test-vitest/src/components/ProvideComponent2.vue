<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 12:09:12
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-08 12:10:47
 * @Description : 测试 provide
-->
<script lang="ts" setup>
import { provide } from 'vue'
import ChildCom from './ChildCom.vue'
provide('theme', 'dark')
</script>

<template>
  <div class="provide-component2">
    <ChildCom />
  </div>
</template>

<style scoped lang="scss">
.provide-component2 {
  // scss code
}
</style>
