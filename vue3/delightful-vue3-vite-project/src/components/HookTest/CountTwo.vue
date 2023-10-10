<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-09 16:14:35
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-09 16:26:15
 * @Description : 
-->
<script lang="ts" setup>
import { useTestGlobalState } from '@/hooks'

const { localCount, addLocalCount, globalCount, addGlobalCount } = useTestGlobalState()
</script>

<template>
  <div class="count-one">
    <h4>CountTwo.vue</h4>
    <p>localCount:{{ localCount }}</p>
    <p>修改localCount<button @click="addLocalCount">addLocalCount</button></p>
    <p>globalCount:{{ globalCount }}</p>
    <p>修改globalCount<button @click="addGlobalCount">addGlobalCount</button></p>
  </div>
</template>

<style scoped lang="scss">
.count-one {
  // scss code
}
</style>
