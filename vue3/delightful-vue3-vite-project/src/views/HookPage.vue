<!--
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 17:59:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-27 09:51:08
 * @Description : 
-->
<script setup lang="ts" name="HookPage">
import {
  FileViewer,
  HookDemo,
  MyInput,
  PopperButton,
  PopperButtonHook,
  testNameExport,
  PopupContainer,
} from '@/components'

const myInput = ref('hello')
</script>

<template>
  <div class="page">
    <PopupContainer>
      <template #header>
        <div style="width: 200px;height: 40px; background-color: beige;">hello</div>
      </template>
      <template #default>
        <div>Popup content</div>
      </template>
    </PopupContainer>
    <HookDemo />
    <MyInput v-model="myInput" />
    <p>{{ myInput }}</p>
    <hr />
    <FileViewer />
    <p>{{ testNameExport }}</p>
    <h4>usePopper -- hook 与第三方库</h4>
    <PopperButtonHook />
    <PopperButton />
  </div>
</template>

<style lang="scss"></style>
