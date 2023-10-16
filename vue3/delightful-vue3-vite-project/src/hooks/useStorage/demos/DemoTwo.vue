<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:49:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 10:21:39
 * @Description : 
-->
<script setup lang="ts">
import { ref } from 'vue'

// import { $localStorage } from '../localStorage'
// const count = ref($localStorage.get('my-name'))
import { createStorage } from '@/utils'

const $localStorage = createStorage('local')
console.log($localStorage, 'zqj log')
const count = ref($localStorage.get('my-name'))
</script>

<template>
  <div>
    <p>DemoTwo</p>
    <button type="button" @click="$localStorage.set('my-name', ++count)">
      count is {{ count }}
    </button>
  </div>
</template>
