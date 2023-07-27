<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-17 19:40:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-27 15:57:34
 * @Description : 组件弹出层
-->
<script lang="ts" setup>
import { useDraggable } from '@/hooks'

const props = defineProps({
  top: {
    type: String,
    default: 'auto',
  },
  right: {
    type: String,
    default: 'auto',
  },
  bottom: {
    type: String,
    default: 'auto',
  },
  left: {
    type: String,
    default: 'auto',
  },
  zIndex: {
    type: [String, Number],
    default: 'auto',
  },
  draggable: {
    type: Boolean,
    default: false,
  },
})
const { dragging, setDragEle, setPositionEle } = useDraggable(
  computed(() => props.draggable)
)

const innerTop = computed(() => {
  return dragging.value ? 'auto' : props.top
})
const innerRight = computed(() => {
  return dragging.value ? 'auto' : props.right
})
const innerBottom = computed(() => {
  return dragging.value ? 'auto' : props.bottom
})
const innerLeft = computed(() => {
  return dragging.value ? 'auto' : props.left
})
const innerZIndex = ref(props.zIndex)

const transitionValue = computed(() => {
  return dragging.value ? 'all 0 ease' : 'all 1s ease'
})

const useSelect = ref('auto')
const cursor = ref('default')
</script>

<template>
  <teleport to="body">
    <div :ref="setPositionEle" class="popup-container">
      <div :ref="setDragEle" class="header">
        <slot name="header" />
      </div>
      <!-- <div class="body"> -->
      <slot />
      <!-- </div> -->
      <slot name="footer" />
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.popup-container {
  position: fixed;
  top: v-bind(innerTop);
  right: v-bind(innerRight);
  bottom: v-bind(innerBottom);
  left: v-bind(innerLeft);
  z-index: v-bind(innerZIndex);
  background-color: white;
  transition: v-bind(transitionvalue);
  border-radius: 0.25rem;
  user-select: v-bind(useselect);

  .header {
    //   // width: 100%;
    //   width: 300px;
    //   height: 40px;

    //   // height: fit-content;
    //   background-color: aquamarine;
    cursor: v-bind(cursor);
  }

  // .body {
  //   width: 300px;
  //   height: 40px;

  //   // width: fit-content;
  //   // height: fit-content;
  //   background-color: red;
  // }
}
</style>
