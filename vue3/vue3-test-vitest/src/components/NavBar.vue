<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-12 23:48:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-13 00:21:38
 * @Description : 
-->
<script setup>
const props = defineProps({
  logined: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="nav-bar">
    <span>hello</span>
    <a>{{ props.logined ? '退出' : '登录' }}</a>
  </div>
</template>
