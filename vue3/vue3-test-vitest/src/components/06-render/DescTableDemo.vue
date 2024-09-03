<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-02 14:38:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-02 16:56:42
 * @Description :
-->
<script setup lang="jsx">
import { h, reactive, shallowRef } from 'vue'
import DescTable from './DescTable.vue'
const dataInfo = {
  gifts: 'https://cdn.jsdelivr.net/npm/zqj-pics/vue3/form-table.png',
  name: '张三'
}

const cols = [
  {
    label: '姓名',
    prop: 'name',
    slot: true
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
          src: imgSrc,
          title: 'hello'
        })
      )
    }
  }
]
</script>

<template>
  <DescTable :data="dataInfo" :cols="cols">
    <template #name="{ data }">
      <span style="color: blue">{{ data.name }}</span>
    </template>
  </DescTable>
</template>
