<!--
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 17:59:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-02-26 18:19:08
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
import { CountOne, CountTwo } from '@/components/HookTest'

const myInput = ref('hello')
const draggable = ref(true)
const count1 = ref(0)
function onAddCount(count) {
  count1.value = count
}

const countOne = ref()
const key1 = ref(1)
const key2 = ref(2)
onMounted(() => {
  console.log(countOne.value, 'zqj log')
})
</script>

<template>
  <div class="page">
    <h3>hook 共享状态</h3>
    <CountOne :key="key1" @add-count="onAddCount" ref="countOne" />
    <CountTwo :key="key2" />
    <button @click="key1 = Math.random()">销毁CountOne</button>
    <button @click="key2 = Math.random()">销毁CountTwo</button>
    <p>count1:{{ count1 }}</p>
    <hr />
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
