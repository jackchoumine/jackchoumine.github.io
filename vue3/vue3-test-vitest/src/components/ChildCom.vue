<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 12:11:28
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-08 12:12:01
 * @Description : 
-->
<script lang="ts" setup>
import { inject } from 'vue'
const theme = inject('theme')
</script>

<template>
  <div class="child-com">{{ theme }}</div>
</template>

<style scoped lang="scss">
.child-com {
  // scss code
}
</style>
