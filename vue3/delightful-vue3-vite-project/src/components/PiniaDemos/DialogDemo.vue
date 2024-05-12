<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 19:51:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-05-09 19:14:48
 * @Description : pinia 管理弹窗
-->
<script setup lang="ts">
import { useTodosStore } from '@/stores'

const todosStore = useTodosStore()

function openDialog() {
  todosStore.dialog.open({
    id: 'test-id',
    title: '弹窗1',
    size: {
      width: '400px',
      height: '400px',
    },
    position: {
      left: '100px',
      top: '100px',
    },
    props: {},
    // body:()=>
    onCancel: () => {
      console.log('点击了取消按钮')
    },
    onClose: (data) => {
      console.log('点击了关闭按钮', data)
    },
  })
}

function openDialog2() {
  todosStore.dialog.open({
    id: 'test-id-2',
    title: '弹窗2',
    size: {
      width: '100px',
      height: '100px',
    },
    position: {
      left: '50px',
      top: '500px',
    },
    props: {},
    // onCancel: () => {
    //   console.log('点击了取消按钮')
    // },
    onClose: (data) => {
      console.log('点击了关闭按钮', data)
    },
  })
}
</script>

<template>
  <div>
    <button @click="openDialog">打开弹窗</button>
    <button @click="openDialog2">打开弹窗2</button>
    <ul>
      <li v-for="item in todosStore.dialog.items">{{ item }}</li>
    </ul>
  </div>
</template>
