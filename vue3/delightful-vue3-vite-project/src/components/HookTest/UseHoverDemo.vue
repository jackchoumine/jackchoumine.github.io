<!--
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 11:18:42
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-27 15:01:09
 * @Description : 
-->
<script setup lang="ts">
import { useHover } from '@/hooks'

const { isHover: isHover1, setHoverTarget: setHoverEle1 } = useHover({
  in: ele => {
    ele.title = 'in'
  },
})
const { isHover: isHover2, setHoverTarget: setHoverEle2 } = useHover()
const { isHover: isHover3, setHoverTarget: setHoverEle3 } = useHover()
</script>

<template>
  <div class="test-use-hover">
    <div class="items one" :ref="setHoverEle1">{{ isHover1 ? '是' : '否' }}</div>
    <div class="items two" :ref="setHoverEle2">{{ isHover2 ? '是' : '否' }}</div>
    <div class="items three" :ref="setHoverEle3">{{ isHover3 ? '是' : '否' }}</div>
  </div>
</template>

<style lang="scss">
.test-use-hover {
  display: flex;
  justify-content: center;
  align-items: center;

  .items {
    width: 100px;
    height: 100px;
    margin: 0 10px;

    &.one {
      background-color: lightgreen;
    }

    &.two {
      background-color: lightgray;
    }

    &.three {
      background-color: lightyellow;
    }
  }
}
</style>
