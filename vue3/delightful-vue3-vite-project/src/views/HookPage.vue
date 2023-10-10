<!--
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 17:59:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-09 16:53:03
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
onMounted(() => {
  console.log(countOne.value, 'zqj log')
})
</script>

<template>
  <div class="page">
    <h3>hook 共享状态</h3>
    <CountOne @add-count="onAddCount" ref="countOne" />
    <CountTwo />
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
