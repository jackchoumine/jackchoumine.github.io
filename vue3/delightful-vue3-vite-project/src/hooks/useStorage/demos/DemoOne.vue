<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:46:35
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-13 17:08:32
 * @Description : 测试 useStorage
-->
<script lang="ts" setup>
import { useStorage } from '../useStorage'

const myName = useStorage('my-name')
</script>

<template>
  <div class="DemoOne">demo-one myName {{ myName }}</div>
</template>

<style scoped lang="scss">
.DemoOne {
  // scss code
}
</style>
