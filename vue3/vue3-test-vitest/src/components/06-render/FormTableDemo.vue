<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-02 14:38:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-02 15:13:07
 * @Description :
-->
<script setup lang="jsx">
import { h, reactive, shallowRef } from 'vue'
import FormTable from './FormTable.vue'
const dataInfo = {
  gifts: 'https://cdn.jsdelivr.net/npm/zqj-pics/vue3/form-table.png',
  name: '张三'
}

const cols = [
  {
    label: '姓名',
    prop: 'name'
  },
  {
    label: '赠送礼物',
    prop: 'gifts',
    // span: 2,
    render: (data) => {
      const imgSrc = data.gifts
      return h(
        'span',
        null,
        h('img', {
          src: imgSrc
        })
      )
    }
  }
]
</script>

<template>
  <FormTable :data="dataInfo" :cols="cols" />
</template>
