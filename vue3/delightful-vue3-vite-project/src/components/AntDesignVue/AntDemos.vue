<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-12 18:41:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-22 18:23:45
 * @Description : 
-->
<script setup lang="tsx" name="Demos">
// TODO
import { useEvent, useEventBus } from '@/hooks'

// const { emit } = useEventBus()
const { emit } = useEvent()
onMounted(() => {
  console.log('ant-design-vue mounted')
  emit('ant-btn-mounted', 'ant-design-vue')
})
function whenMounted(p) {
  console.log('ant-design-vue mounted 12', p)
}
function whenBeforeUnmount(p) {
  console.log('ant-design-vue beforeUnmount', p)
}
</script>

<template>
  <div class="vue-component">
    <h2>ant-design-vue</h2>
    <AButton
      type="primary"
      shape="round"
      @vue:mounted="whenMounted"
      @vue:beforeUnmount="whenBeforeUnmount">
      测试 ant-design-vue 可用性
    </AButton>
  </div>
</template>

<style lang="scss">
.vue-component {
  // TODO
}
</style>
