<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-25 15:30:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 10:50:02
 * @Description : JSX 测试页面
-->
<script setup lang="ts" name="JSXPage">
import { Button, UseButton } from '../components'
</script>

<template>
  <div class="page">
    <h2>测试jsx 中使用插槽</h2>
    <Button>
      <template #left>
        <span style="margin-right: 10px">left</span>
      </template>
      <span>hello</span>
      <template #right>
        <span style="margin-left: 10px">right</span>
      </template>
    </Button>
    <hr />
    <UseButton>
      <template #left>
        <span>左</span>
      </template>
      <span>中</span>
      <template #right>
        <span>右</span>
      </template>
    </UseButton>
    <hr />
    <UseButton>
      <template #left>
        <span>左</span>
      </template>
      <template #right>
        <span>右</span>
      </template>
    </UseButton>
  </div>
</template>

<style lang="scss"></style>
