<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 19:51:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-17 15:56:59
 * @Description : pinia 管理弹窗
-->
<script setup lang="ts">
import { useTodosStore } from '@/stores'

const todosStore = useTodosStore()

function openDialog() {
  todosStore.dialog.open({
    title: '弹窗标题',
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
  })
}
</script>

<template>
  <div>
    <button @click="openDialog">打开弹窗</button>
    <ul>
      <li v-for="item in todosStore.dialog.items">{{ item }}</li>
    </ul>
  </div>
</template>
