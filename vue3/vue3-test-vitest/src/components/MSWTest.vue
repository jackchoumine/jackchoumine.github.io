<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-03-24 23:06:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-24 23:47:09
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
import { ref } from 'vue'
const users = ref()
const loading = ref()

getUsers()

function getUsers() {
  loading.value = true
  fetch('/api/users')
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      users.value = data
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="MSWTest">users {{ users }}</div>
</template>

<style scoped lang="scss">
.MSWTest {
  // scss code
}
</style>
