<!--
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 17:59:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-27 15:57:07
 * @Description : 
-->
<script setup lang="ts" name="HookPage">
import {
  FileViewer,
  HookDemo,
  MyInput,
  PopperButton,
  PopperButtonHook,
  PopupContainer,
  testNameExport,
} from '@/components'

const myInput = ref('hello')
const draggable = ref(true)
</script>

<template>
  <div class="page">
    <button @click="draggable = !draggable">
      draggable?{{ draggable ? 'yes' : 'no' }}
    </button>
    <PopupContainer :draggable="draggable">
      <template #header>
        <div style="width: 200px; height: 40px; background-color: beige">hello</div>
      </template>
      <template #default>
        <div>Popup content</div>
      </template>
    </PopupContainer>
    <PopupContainer draggable left="100px" bottom="10rem">
      <template #header>
        <div style="width: 200px; height: 40px; background-color: beige">hello</div>
      </template>
      <template #default>
        <div>Popup</div>
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
