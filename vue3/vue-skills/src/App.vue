<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-17 15:17:02
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-07 13:34:58
 * @Description :
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { routes } from './router'
</script>

<template>
  <header>
    <nav>
      <RouterLink v-for="route in routes" :key="route.path" :to="route.path">
        {{ route.name }}
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss">
header {
  line-height: 2;
  max-height: 100vh;
  background-color: lightblue;
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 1rem;
    a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);
    }
    a:first-of-type {
      border: 0;
    }
    a.router-link-exact-active {
      color: var(--active-color);
      :hover {
        background-color: transparent;
      }
    }
  }
}
</style>
