<!--
 * @Description : 测试 slots
 * @Date        : 2023-01-12 00:27:37 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-12 00:50:16 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <div class="left">
      <slot name="left">
        <p>插槽后备内容</p>
      </slot>
    </div>
    <slot />
    <p>hello center</p>
    <slot name="right" :msg="name"></slot>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'SlotDemo',
  setup(props, { emit, attrs, slots }) {
    const name = ref('right')
    return { name }
  },
})
</script>

<style scoped lang="scss"></style>
