<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 20:44:49
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-16 21:08:40
 * @Description : 
-->
<script setup lang="ts">
import { useTodosStore } from '@/stores'

type Offset = {
  left: string
  top: string
}
const props = defineProps<{
  id: string | number | symbol
  offset: Offset
}>()
const todosStore = useTodosStore()
const left = computed(() => {
  return props.offset.left
})
const top = computed(() => {
  return props.offset.top
})
// const dialogId = ref(props.id)
function onClose() {
  console.log('onClose')
  todosStore.dialog.onClose(props.id)
}
</script>

<template>
  <div class="j-dialog">
    <div>
      header
      <button @click="onClose">关闭</button>
    </div>
    <div>body {{ props.offset }}</div>
    <div class="footer">footer</div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.j-dialog {
  position: fixed;
  top: v-bind(top);
  left: v-bind(left);
  z-index: 999;
  width: 400px;
  height: 400px;
  background-color: rgb(0 0 0 / 0.5);
}
</style>
