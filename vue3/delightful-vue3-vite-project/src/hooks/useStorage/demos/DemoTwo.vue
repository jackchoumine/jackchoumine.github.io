<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:49:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 10:56:07
 * @Description : 
-->
<script setup lang="ts">
import { ref } from 'vue'

// import { $localStorage } from '../localStorage'
// const count = ref($localStorage.get('my-name'))
import { createStorage } from '@/utils'

import { useStorage } from '../useStorage'

const $localStorage = createStorage('local')
console.log($localStorage, 'zqj log')
// const count = ref($localStorage.get('my-name'))
const count = useStorage('my-name', 'local')
</script>

<template>
  <div>
    <p>DemoTwo</p>
    <button type="button" @click="$localStorage.set('my-name', ++count)">
      count is {{ count }}
    </button>
  </div>
</template>
