<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-29 09:41:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-29 09:41:39
 * @Description : 病人表单
-->
<script setup>
import { ref } from 'vue'

// 不超过 20 个字 必填
const name = ref('')
// 0 - 150 之间 必填
const age = ref()

function onSubmit() {
  console.log('submit')
}
</script>

<template>
  <form>
    <label for="name">Name</label>
    <input id="name" v-model="name" />
    <label for="age">Age</label>
    <input id="age" v-model="age" range />
    <button @click="onSubmit">Submit</button>
  </form>
</template>
