<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:46:35
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 16:22:23
 * @Description : 测试 useStorage
-->
<script lang="ts" setup>
import { createStorage } from '@/utils'

import { useStorage } from '../useStorage'

const [info, updateName] = useStorage('my-name', 'local')
</script>

<template>
  <div class="DemoOne">
    demo-one myName {{ info }}
    <button @click="updateName({ name: info.name, age: info.age + 1 })">
      更新 myName
    </button>
  </div>
</template>

<style scoped lang="scss">
.DemoOne {
  // scss code
}
</style>
