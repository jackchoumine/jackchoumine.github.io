<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-23 10:16:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-23 10:46:05
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
import { defineAsyncComponent, h, ref } from 'vue'

import { componentPath, menuList } from '@/demos/menu'

const defaultPath = menuList[0].children[0].path
console.log({ defaultPath }, 'zqj')
const currentPath = ref(defaultPath)
const comCache = new Map()

function toView(path) {
  currentPath.value = path
}

function getComponent(key = defaultPath) {
  if (comCache.has(key)) {
    return comCache.get(key)
  }
  if (!componentPath[key]) return h('div', `${key} 暂无对应组件...`)
  const com = defineAsyncComponent(componentPath[key])
  comCache.set(key, com)
  return com
}
const opends = [defaultPath]
</script>

<template>
  <el-row class="h-full">
    <el-col :span="3">
      <el-menu default-active="navigationControl" :default-openeds="opends">
        <el-sub-menu v-for="menu in menuList" :key="menu.name" :index="menu.path">
          <template #title>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="subMenu in menu.children"
            :index="subMenu.path"
            :key="subMenu.name"
            @click="toView(subMenu.path)">
            {{ subMenu.name }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <component :is="getComponent(currentPath)" />
    </el-col>
  </el-row>
</template>

<style lang="scss">
.h-full {
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
</style>
