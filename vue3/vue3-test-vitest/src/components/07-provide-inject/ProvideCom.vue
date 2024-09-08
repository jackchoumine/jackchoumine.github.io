<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-08 16:54:10
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-08 17:43:58
 * @Description : 依赖注入
-->
<script setup>
import { provide, ref, readonly, inject } from 'vue'
import { name_key, age_key } from './provide_keys'

const name = ref('ZhouQiJun')

function onClick() {
  name.value = Math.random().toString(36)
}

provide(name_key, {
  name: readonly(name),
  changeName: onClick
})

const { age } = inject(age_key)
</script>

<template>
  <div class="ProvideCom">
    <h2>ProvideCom</h2>
    <p>提供依赖 name:{{ name }}</p>
    <button @click="onClick">修改名字</button>
    <p>age :{{ age }}</p>
    <slot />
  </div>
</template>
