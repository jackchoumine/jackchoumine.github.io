<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-17 15:58:44
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-17 16:31:52
 * @Description : 
-->
<script lang="ts" setup>
import { ref } from 'vue'
const url = 'https://jsonplaceholder12.typicode.com/todos/1'
const todo = ref()
try {
  const res = await fetch(url)
  todo.value = await res.json()
} catch (error) {
  todo.value = '获取 todo 遇到错误'
}
</script>

<template>
  <div class="AsyncSetup">{{ todo }}</div>
</template>

<style scoped lang="scss">
.AsyncSetup {
  // scss code
}
</style>
