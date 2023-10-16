<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:46:35
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 10:54:44
 * @Description : 测试 useStorage
-->
<script lang="ts" setup>
import { createStorage } from '@/utils'

import { useStorage } from '../useStorage'

const $localStorage = createStorage('local')
const myName = useStorage('my-name', 'local')
</script>

<template>
  <div class="DemoOne">
    demo-one myName {{ myName }}
    <button @click="$localStorage.set(++myName)">更新 myName</button>
  </div>
</template>

<style scoped lang="scss">
.DemoOne {
  // scss code
}
</style>
