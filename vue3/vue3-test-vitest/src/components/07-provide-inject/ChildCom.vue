<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-08 16:55:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-08 22:33:45
 * @Description :
-->
<script setup lang="ts">
import { inject, computed } from 'vue'
import { name_key, type AgeType, type NameType } from './provide_keys'
import { usersStore } from './usersStore'
import { useAge } from './useAge'
const { name, changeName } = inject<NameType>(name_key) as NameType
const { age, changeAge } = useAge<AgeType>()
// const store = usersStore()
const users = computed(() => {
  return usersStore.getState().users
})
function onAddUser() {
  usersStore.addUser({ name: 'zqj123' })
}
</script>

<template>
  <div class="ChildCom">
    <button @click="onAddUser">添加 user</button>
    <ul>
      <li v-for="user in users">{{ user.name }}</li>
    </ul>
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
