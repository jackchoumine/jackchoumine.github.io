<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-26 11:20:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-26 12:40:31
 * @Description : 
-->
<script setup>
import { ref } from 'vue'
const count = ref(0)
const emit = defineEmits(['submit'])
function onEmitSubmit() {
  emit('submit', count.value)
}
function onClickPlus() {
  ++count.value
}
</script>

<template>
  <div class="simple-count">
    <button @click="onClickPlus">+</button>
    <span>{{ count }}</span>
    <button @click="onEmitSubmit" role="submit">submit</button>
  </div>
</template>

<style scoped lang="scss">
.simple-count {
  // scss code
}
</style>
