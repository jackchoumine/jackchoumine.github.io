<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:49:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 11:14:13
 * @Description : 
-->
<script setup lang="ts">
import { ref } from 'vue'

// import { createStorage } from '@/utils'
// const $localStorage = createStorage('local')
// const count = ref($localStorage.get('my-name'))
import { useStorage } from '../useStorage'

const [count, updateCount] = useStorage('my-name', 'local')
</script>

<template>
  <div>
    <p>DemoTwo</p>
    <button type="button" @click="updateCount(++count)">count is {{ count }}</button>
  </div>
</template>
