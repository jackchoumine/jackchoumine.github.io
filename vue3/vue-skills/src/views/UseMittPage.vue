<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-17 11:24:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-17 11:33:11
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
import OnEventOne from '@/components/use-mitt/OnEventOne.vue'
import OnEventTwo from '@/components/use-mitt/OnEventTwo.vue'
import EmitEvent from '@/components/use-mitt/EmitEvent.vue'
</script>

<template>
  <div class="UseMittPage">
    <OnEventOne />
    <OnEventTwo />
    <EmitEvent />
  </div>
</template>

<style scoped lang="scss">
.UseMittPage {
  // scss code
}
</style>
