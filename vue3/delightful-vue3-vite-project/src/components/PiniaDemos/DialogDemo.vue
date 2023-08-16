<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 19:51:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-16 21:05:44
 * @Description : pinia 管理弹窗
-->
<script setup lang="ts">
import { useTodosStore } from '@/stores'

const todosStore = useTodosStore()

function openDialog() {
  todosStore.dialog.open({
    title: '弹窗标题',
    footer: '弹窗底部',
    body: '弹窗内容',
    confirmText: '确认按钮',
    cancelText: '取消按钮',
    props:{
      offset:{
        left: '100px',
        top: '100px'
      }
    },
    onConfirm: () => {
      console.log('点击了确认按钮')
    },
    onCancel: () => {
      console.log('点击了取消按钮')
    },
  })
}
</script>

<template>
  <div>
    <button @click="openDialog">打开弹窗</button>
    <p>
      <ul>
        <li v-for="item in todosStore.dialog.items">{{ item }}</li>
      </ul>
    </p>
  </div>
</template>
