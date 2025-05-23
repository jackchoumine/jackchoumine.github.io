<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-19 17:36:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-05-23 09:37:27
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
const props = defineProps({
  bgColor: {
    type: String,
    default: 'lightcyan',
  },
})
const textColor = ref('blue')
const theme = reactive({
  fontSize: '30px',
})
</script>

<template>
  <div class="test-slotted">
    <h3>使用:slotted 修改插槽样式</h3>
    <slot />
    <h3 class="h3">使用v-bind 绑定变量</h3>
  </div>
</template>

<style lang="scss" scoped>
//:global(.slot) {
//  background-color: red;
//}
.test-slotted {
  :slotted(.slot1) {
    background-color: lightcyan;
  }

  .h3 {
    font-size: v-bind('theme.fontSize');
    color: v-bind('textColor');
    background-color: v-bind('props.bgColor');
  }
}
</style>
