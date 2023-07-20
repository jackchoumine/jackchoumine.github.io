<script setup lang="ts">
import ColumnList, { ColumnListProps } from './components/ColumnList.vue'
import TheHeader, { UserProps } from './components/TheHeader.vue'
import { Example } from './components/index'

const cols: ColumnListProps[] = [
  {
    id: 1,
    title: '铺先生',
    avatar: '',
    // avatar:
    //   'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
    description: '酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技',
  },
  {
    id: 2,
    title: 'Vehicle 攻城狮',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
    description: '半吊子系统和程序狗，沉迷高端理论，日渐消瘦',
  },
  {
    id: 3,
    title: '我不是鞋神',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
    description: '鞋神号： sunmen123123',
  },
  {
    id: 4,
    title: '爱生活爱眼睛',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/60e56451fc0f930997b01a81.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
    description: '愿你有一颗热爱生活的心和一双不老的眼睛！',
  },
]
const user: UserProps = { hasLogin: true, name: 'jackchou' }
</script>

<template>
  <div class="container">
    <TheHeader :user="user" />
    <Example />
    <ColumnList :list="cols" />
  </div>
</template>
