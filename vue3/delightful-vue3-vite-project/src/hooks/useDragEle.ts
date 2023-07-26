/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-26 23:34:38
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-27 01:35:33
 * @Description : 拖拽 hook
 */
import { onBeforeUnmount, reactive } from 'vue'

import { useHover } from './useHover'

// dragEle: HTMLElement, positionEle: HTMLElement = dragEle
function useDragEle() {
  const dragEle = ref<HTMLElement>(null)

  const { setHoverEle } = useHover({
    in: () => {
      dragEle.value.title = '鼠标长按，可拖拽'
    },
    out: () => {
      dragEle.value.title = ''
    },
  })

  const positionEle = ref<HTMLElement>(null)
  let initTransition = dragEle.value?.style?.transition
  let initCursor = dragEle.value?.style?.cursor
  let initUseSelect = dragEle.value?.style?.userSelect
  // let initZIndex = dragEle.value?.style?.zIndex

  const position = reactive({
    left: positionEle.value?.style?.left,
    top: positionEle.value?.style?.top,
  })

  watchEffect(
    () => {
      if (dragEle.value === null) return
      initTransition = dragEle.value?.style?.transition
      initCursor = dragEle.value?.style?.cursor
      initUseSelect = dragEle.value?.style?.userSelect
      // initZIndex = dragEle.value?.style?.zIndex
      setHoverEle(dragEle.value)
      dragEle.value?.addEventListener?.('dragstart', onDragstart)
      dragEle.value?.addEventListener?.('mousedown', onMousedown)
    },
    {
      flush: 'post',
    }
  )
  // onMounted(() => {
  //   dragEle.value.addEventListener('mousedown', onMousedown)
  //   dragEle.value.addEventListener('dragstart', onDragstart)
  // })

  // onBeforeUpdate(() => {
  //   dragEle.value = null
  //   positionEle.value = null
  // })

  onBeforeUnmount(() => {
    document.removeEventListener('mouseup', onMouseup)
  })
  // 是否拖拽
  let dragged = false

  let shiftX = 0
  let shiftY = 0

  return {
    position,
    setDragEle: ele => {
      if (dragEle.value) return
      dragEle.value = ele
    },
    setPositionEle: ele => {
      if (positionEle.value) return
      positionEle.value = ele
    },
  }

  function onMousedown(event) {
    // 鼠标相对于拖拽元素的相对初始位置
    shiftX = event.clientX - dragEle.value.getBoundingClientRect().left
    shiftY = event.clientY - dragEle.value.getBoundingClientRect().top
    moveAt(event)

    // 鼠标按下，监听鼠标移动事件和鼠标松开事件
    document.addEventListener('mousemove', onMousemove)
    dragEle.value.addEventListener('mouseup', onMouseup)
  }

  function onMouseup() {
    // 鼠标松开时，移除事件，恢复默认值
    document.removeEventListener('mousemove', onMousemove)
    setStyleWhenStop(positionEle)
  }

  function onMousemove(event) {
    dragged = true
    // 设置移动样式
    setStyleWhenMove(positionEle)
    moveAt(event)
  }

  function moveAt({ pageX, pageY }) {
    const _left = `${pageX - shiftX}px`
    const _top = `${pageY - shiftY}px`

    position.left = _left
    position.top = _top

    positionEle.value.style.left = _left
    positionEle.value.style.top = _top
  }

  // 禁止原生拖拽，防止和自定义拖拽冲突
  function onDragstart() {
    return false
  }

  function setStyleWhenMove(dragEle) {
    const { top, left, right, bottom, transition } = dragEle.value.style
    if (top !== 'auto' && !dragged) {
      dragEle.value.style.top = 'auto'
    }
    if (right !== 'auto' && !dragged) {
      dragEle.value.style.right = 'auto'
    }
    if (bottom !== 'auto' && !dragged) {
      dragEle.value.style.bottom = 'auto'
    }
    if (left !== 'auto' && !dragged) {
      dragEle.value.style.left = 'auto'
    }
    if (transition !== 'all 0 ease' && !dragged) {
      dragEle.value.style.transition = 'all 0 ease'
    }
    // if (zIndex && !dragged) {
    //   dragEle.value.style.zIndex = zIndex
    // }
    dragEle.value.style.cursor = 'move'
    dragEle.value.style.userSelect = 'none'
  }
  function setStyleWhenStop(dragEle) {
    dragEle.value.style.transition = initTransition
    dragEle.value.style.transition = initTransition
    dragEle.value.style.cursor = initCursor
    dragEle.value.style.userSelect = initUseSelect
    // dragEle.value.style.zIndex = initZIndex
  }
}

export { useDragEle }
