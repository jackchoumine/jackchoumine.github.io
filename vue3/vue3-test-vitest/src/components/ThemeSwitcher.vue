<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-29 09:52:12
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-29 09:56:41
 * @Description :
-->
<script setup>
import { inject } from 'vue'

const { theme, toggleTheme } = inject('useTheme')
console.log('theme', theme)
</script>

<template>
  <div class="ThemeSwitcher">
    <p>当前主题：{{ theme }}</p>
    <button @click="toggleTheme">切换主题</button>
  </div>
</template>

<style scoped lang="scss">
.ThemeSwitcher {
  // scss code
}
</style>
