<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-17 11:25:54
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-17 11:28:15
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
import { useMitt } from '@/hooks'
import { ref } from 'vue'

const password = ref('')

useMitt('user:login', (payload) => {
  console.log({ payload }, 'user:login')
  password.value = payload.password
})
</script>

<template>
  <div class="OnEventOne">添加事件监听 {{ password }}</div>
</template>

<style scoped lang="scss">
.OnEventOne {
  // scss code
}
</style>
