<!--
 * @Description :
 * @Date        : 2021-11-15 18:07:23 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-15 18:49:53 +0800
 * @LastEditors : JackChou
-->
<template>
  <li class="dropdown-item" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>
<script lang="ts">
import { ref, reactive, watch, computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'DropdownItem',
  components: {},
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, attrs, slots }) {
    return {}
  },
})
</script>

<style>
.dropdown-item.is-disabled * {
  background-color: transparent;
  color: #6c757d;
  pointer-events: none;
  cursor: not-allowed;
}
</style>
