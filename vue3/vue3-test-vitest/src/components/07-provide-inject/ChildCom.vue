<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-08 16:55:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-08 21:47:30
 * @Description :
-->
<script setup>
import { inject } from 'vue'
import { name_key } from './provide_keys'
import { useAge } from './useAge'
const { name, changeName } = inject(name_key)
const { age, changeAge } = useAge()
</script>

<template>
  <div class="ChildCom">
    <h2>ChildCom</h2>
    <p>注入依赖：{{ name }}</p>
    <button @click="changeName">后代组件通过父组件的方法修改数据</button>
    <p>age :{{ age }}</p>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<style scoped lang="scss">
.ChildCom {
  // scss code
}
</style>
