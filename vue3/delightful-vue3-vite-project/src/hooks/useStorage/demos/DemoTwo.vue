<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 15:49:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 14:40:35
 * @Description : 
-->
<script setup lang="ts">
import { ref } from 'vue'

// import { createStorage } from '@/utils'
// const $localStorage = createStorage('local')
// const count = ref($localStorage.get('my-name'))
import { useStorage } from '../useStorage'

const [info, updateCount] = useStorage('my-name', 'session')
</script>

<template>
  <div>
    <p>DemoTwo</p>
    <button type="button" @click="updateCount({ name: 'JackChou', age: +info?.age + 1 })">
      count is {{ info }}
    </button>
  </div>
</template>
