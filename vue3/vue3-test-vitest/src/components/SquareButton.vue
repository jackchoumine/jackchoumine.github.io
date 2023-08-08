<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-07 15:33:21
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-08 09:34:24
 * @Description : 
-->
<script lang="ts" setup>
import { ref } from 'vue'
const emit = defineEmits(['squared'])
const count = ref(10)
function onClick() {
  emit('squared', Math.pow(count.value, 2))
}
</script>

<template>
  <button class="square-button" @click="onClick">Square!</button>
</template>

<style scoped lang="scss">
.square-button {
  // scss code
}
</style>
