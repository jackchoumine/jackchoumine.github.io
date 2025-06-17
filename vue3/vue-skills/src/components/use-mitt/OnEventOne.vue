<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-17 11:25:54
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-17 11:27:08
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
import { useMitt } from '@/hooks'

const { payload } = useMitt('user:login')
</script>

<template>
  <div class="OnEventOne">payload {{ payload }}</div>
</template>

<style scoped lang="scss">
.OnEventOne {
  // scss code
}
</style>
