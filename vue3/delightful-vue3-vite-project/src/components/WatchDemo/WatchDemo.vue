<!--
 * @Date        : 2022-11-04 09:41:26
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-18 00:03:23
 * @Description : watch 有哪些用法 
-->
<template>
  <div>
    <h1>watch</h1>
    <WatchCleanup />
    <WatchRefDemo />
    <WatchRef />
    <WatchReactive />
  </div>
</template>

<script setup lang="ts">
import WatchCleanup from './WatchCleanup.vue'
import WatchReactive from './WatchReactive.vue'
import WatchRef from './WatchRef.vue'
import WatchRefDemo from './WatchRefDemo.vue'
</script>

<style lang="scss"></style>
