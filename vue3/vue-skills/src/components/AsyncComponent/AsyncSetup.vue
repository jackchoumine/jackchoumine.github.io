<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-17 15:58:44
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-17 11:19:42
 * @Description :
-->
<script lang="ts" setup>
import { useMitt } from '@/hooks'
import { onMounted, ref } from 'vue'

const url = 'https://jsonplaceholder12.typicode.com/todos/1'
const todo = ref()
try {
  const res = await fetch(url)
  todo.value = await res.json()
} catch (error) {
  todo.value = '获取 todo 遇到错误'
}
const { emit, on } = useMitt('user:login', false)
// 触发事件，传递数据
const onClickEmit = () => {
  emit({
    username: 'ZhouQiJun',
    password: Math.random().toString(36).slice(2, 8)
  })
}
on((payload) => {
  console.log('password', payload.password)
})
onMounted(() => {
  console.log('AsyncSetup mounted')
})
</script>

<template>
  <div class="AsyncSetup">
    {{ todo }}
    <button @click="onClickEmit">触发事件</button>
  </div>
</template>

<style scoped lang="scss">
.AsyncSetup {
  // scss code
}
</style>
