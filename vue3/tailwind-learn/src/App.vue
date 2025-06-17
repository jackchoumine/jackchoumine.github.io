<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-05-29 11:32:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-17 17:26:07
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-gray-100 min-h-auto">
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">颜色</RouterLink>
        <RouterLink to="/size-space">尺寸和间距</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: green;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-size: 1.2rem;
}

nav a:first-of-type {
  border: 0;
}
</style>
