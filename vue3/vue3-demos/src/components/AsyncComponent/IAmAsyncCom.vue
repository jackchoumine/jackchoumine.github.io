<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-19 17:36:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-09 10:30:41
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script lang="ts" setup>
import { useMitt } from '@/hooks'
import { onMounted } from 'vue'

const { payload, off } = useMitt('user:login', (payload) => {
  console.log('接收到异步组件的 payload:', payload.password)
})

const onClickCancel = () => {
  // 取消监听
  off()
}

onMounted(() => {
  const name = window.userName
  console.log('异步组件 mounted，window.name:', name)
})
</script>

<template>
  <div class="i-am-async-com">
    我是一个异步组件 {{ payload }}
    <button @click="onClickCancel">取消监听</button>
  </div>
</template>

<style scoped lang="scss">
.i-am-async-com {
  color: green;
}
</style>
