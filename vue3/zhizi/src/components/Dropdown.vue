<!--
 * @Description : 下拉菜单
 * @Date        : 2021-10-07 15:34:15 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-15 20:11:15 +0800
 * @LastEditors : JackChou
-->
<template>
  <div ref="dropdownRef" class="dropdow">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul v-if="isOpen" class="dropdown-menu" :style="{ display: 'block' }">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useClickOutside } from '../hooks'
export default defineComponent({
  name: 'DropDown',
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false)
    function toggleOpen() {
      isOpen.value = !isOpen.value
    }

    const dropdownRef = ref<HTMLElement | null>(null)
    useClickOutside(dropdownRef, (isClickOutside) => {
      isOpen.value = !isClickOutside
    })

    return {
      dropdownRef,
      isOpen,
      toggleOpen,
    }
  },
})
</script>

<style scoped lang="scss"></style>
