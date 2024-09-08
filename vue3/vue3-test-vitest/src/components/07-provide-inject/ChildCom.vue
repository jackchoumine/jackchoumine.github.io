<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-08 16:55:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-08 22:08:38
 * @Description :
-->
<script setup lang="ts">
import { inject } from 'vue'
import { name_key, type AgeType, type NameType } from './provide_keys'
import { useAge } from './useAge'
const { name, changeName } = inject<NameType>(name_key) as NameType
const { age, changeAge } = useAge<AgeType>()
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
