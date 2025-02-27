<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:40:42
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-02-27 12:17:14
 * @Description :
-->
<script lang="ts" setup>
import { useDraggable } from '@vueuse/core'

import { CreateGlobalState, CreateGlobalStateTwo } from '@/components'
import { useDraggable as useDraggable_ } from '@/hooks'

const el = ref()
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
const { setDragEle, position, dragging } = useDraggable_()
</script>

<template>
  <div class="vue-use-page">
    <h3>vueUse学习</h3>
    <CreateGlobalState />
    <CreateGlobalStateTwo />
    <div ref="el" :style="style" style="position: fixed; background-color: lightblue">
      拖动我 x：{{ x }} y:{{ y }} style:{{ style }}
    </div>
    <div :ref="setDragEle" style="position: fixed; background-color: lightcoral">
      拖动我 x：{{ position.left }} y:{{ position.top }} dragging：{{ dragging }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.vue-use-page {
  // scss code
}
</style>
