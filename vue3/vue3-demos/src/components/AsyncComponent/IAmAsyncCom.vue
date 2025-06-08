<script lang="ts" setup>
import { useMitt } from '@/hooks'

const { payload, off } = useMitt('user:login', (payload) => {
  console.log('接收到异步组件的 payload:', payload.password)
})

const onClickCancel = () => {
  // 取消监听
  off()
}
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
