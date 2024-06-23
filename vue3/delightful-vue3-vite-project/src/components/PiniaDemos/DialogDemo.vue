<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 19:51:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-23 20:27:23
 * @Description : pinia 管理弹窗
-->
<script setup lang="ts">
import { useTodosStore } from '@/stores'

import useModal, { modalState } from '../Modal/useModal'

const modal = useModal()
const todosStore = useTodosStore()

function openDialog() {
  const modalOptions = {
    id: 'test-id',
    title: '弹窗1',
    size: {
      width: '400px',
      height: '300px',
    },
    position: {
      left: '50px',
      top: '10px',
    },
    props: {},
    // body:()=>
    onClose: data => {
      console.log('点击了关闭按钮', data)
    },
  }
  modal.open(modalOptions)
}

function openDialog2() {
  const modalOptions = {
    // id: 'test-id-2',
    title: '弹窗2',
    size: {
      width: '400px',
      height: '300px',
    },
    position: {
      bottom: '100px',
      right: '50px',
    },
    props: {},
    onClose: data => {
      console.log('点击了关闭按钮', data)
    },
  }
  modal.open(modalOptions)
}

// const modal = useModal()
// modal.open({
//  title: '弹窗',
//  content: '内容',
//  onClose: () => {
//    console.log('点击了确定按钮')
//  },
// })
// modal.close(id)
// const { openDialog } = useDialog()
</script>

<template>
  <div>
    <button @click="openDialog">打开弹窗</button>
    <button @click="openDialog2">打开弹窗2</button>
    <ul>
      <li v-for="item in todosStore.dialog.items" :key="item.id">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="item in modalState.items" :key="item.id">{{ item }}</li>
    </ul>
  </div>
</template>
