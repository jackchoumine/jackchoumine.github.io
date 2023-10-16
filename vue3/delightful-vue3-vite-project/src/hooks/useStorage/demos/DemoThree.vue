<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:46:35
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 15:00:53
 * @Description : 测试 useStorage
-->
<script lang="ts" setup>
import { useStorage } from '../useStorage'

const [myName, changeName] = useStorage('my-name', 'local')
</script>

<template>
  <div class="DemoThree">
    DemoThree myName {{ myName }}
    <!-- <button @click="changeName(++myName)">更新 myName</button> -->
  </div>
</template>

<style scoped lang="scss">
.DemoThree {
  // scss code
}
</style>
