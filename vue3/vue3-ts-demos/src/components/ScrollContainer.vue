<!--
 * @Description : 
 * @Date        : 2021-11-07 22:53:04 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-07 23:47:28 +0800
 * @LastEditors : JackChou
-->
<template>
  <div class="srcoll-container" :style="{ height }">
    <slot></slot>
    <!-- <IntersectionObserver /> -->
  </div>
</template>
<script>
export default {
  name: 'ScrollContainer',
}
</script>
<script setup>
import IntersectionObserver from './IntersectionObserver.vue'
defineProps({
  height: {
    type: String,
    default: '300px',
  },
})
</script>

<style lang="scss">
.srcoll-container {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
