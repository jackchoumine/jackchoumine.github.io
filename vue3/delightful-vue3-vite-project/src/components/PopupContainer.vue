<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-17 19:40:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-26 18:27:44
 * @Description : 组件弹出层
-->
<script lang="ts" setup>
import { useHover } from '@/hooks'

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
})
// 鼠标输入时，提示可拖拽
const headerContainer = ref<HTMLDivElement>(null)
useHover(headerContainer, {
  in: () => {
    headerContainer.value.title = '鼠标长按，可拖拽'
  },
  out: () => {
    headerContainer.value.title = ''
  },
})

const innerTop = ref(props.top)
const innerRight = ref(props.right)
const innerBottom = ref(props.bottom)
const innerLeft = ref(props.left)
const innerZIndex = ref(props.zIndex)

const popupContainer = ref<HTMLDivElement>(null)
const transitionValue = ref('all 1s ease')
const useSelect = ref('auto')
const cursor = ref('default')

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', onMouseup)
})

let shiftX = 0
let shiftY = 0
function onMousedown(event) {
  // 鼠标相对于header的初始便宜位置
  shiftX = event.clientX - headerContainer.value.getBoundingClientRect().left
  shiftY = event.clientY - headerContainer.value.getBoundingClientRect().top
  moveAt(event)
  // 设置移动样式
  cursor.value = 'move'
  useSelect.value = 'none'
  transitionValue.value = 'all 0 ease'
  // 鼠标按下，监听鼠标移动事件和鼠标松开事件
  document.addEventListener('mousemove', onMousemove)
  headerContainer.value.addEventListener('mouseup', onMouseup)
}

function onMouseup() {
  // 鼠标松开时，移除事件，恢复默认值
  cursor.value = 'default'
  useSelect.value = 'auto'
  transitionValue.value = 'all 1s ease'
  document.removeEventListener('mousemove', onMousemove)
}
// 是否拖拽
let dragged = false

function onMousemove(event) {
  dragged = true
  moveAt(event)
}

function moveAt({ pageX, pageY }) {
  if (innerTop.value !== 'auto' && !dragged) {
    innerTop.value = 'auto'
  }
  if (innerRight.value !== 'auto' && !dragged) {
    innerRight.value = 'auto'
  }
  if (innerBottom.value !== 'auto' && !dragged) {
    innerBottom.value = 'auto'
  }
  if (innerLeft.value !== 'auto' && !dragged) {
    innerLeft.value = 'auto'
  }
  innerLeft.value = `${pageX - shiftX}px`
  innerTop.value = `${pageY - shiftY}px`
}

// 禁止原生拖拽，防止和自定义拖拽冲突
function onDragstart() {
  return false
}
</script>

<template>
  <teleport to="body">
    <div ref="popupContainer" class="popup-container">
      <div
        ref="headerContainer"
        class="header"
        @dragstart="onDragstart"
        @mousedown="onMousedown">
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
  transition: v-bind(transitionValue);
  border-radius: 0.25rem;
  user-select: v-bind(useSelect);

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
