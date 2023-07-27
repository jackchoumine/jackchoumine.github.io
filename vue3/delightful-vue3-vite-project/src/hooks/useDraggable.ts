/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-26 19:01:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-27 14:40:34
 * @Description : 拖拽元素 hook
 */
import type { VNodeRef } from 'vue'

import { useHover } from './useHover'

/**
 * 拖拽元素 hook
 * @param options
 * @param options.dragTips 鼠标移动到可拖拽元素上时的提示
 * @param options.dragZIndex 拖拽时的 z-index，默认为 10，可根据实际情况调整，防止被其他元素遮挡
 */
function useDraggable({ dragTips = '长按鼠标，可拖拽', dragZIndex = 10 } = {}) {
  const { setHoverTarget } = useHover({
    in: dragTarget => {
      dragTarget.title = dragTips
    },
  })
  const position = reactive({ left: 'auto', top: 'auto' })
  const dragging = ref(false)
  // 拖拽元素
  const dragEle = ref(null)
  const setDragEle: VNodeRef = ele => {
    if (dragEle.value) return
    dragEle.value = ele
  }
  // 拖拽 dragEle.value 时需要定位的元素
  const positionEle = ref(null)
  const setPositionEle: VNodeRef = ele => {
    if (positionEle.value) return
    positionEle.value = ele
  }
  // 是否绑定事件
  let bindEvent = false
  watchEffect(
    () => {
      if (!dragEle.value || bindEvent) return
      if (!positionEle.value) positionEle.value = dragEle.value
      setHoverTarget(dragEle.value)
      position.left = positionEle.value.style.left
      position.top = positionEle.value.style.top
      dragEle.value.addEventListener('mousedown', onMousedown)
      bindEvent = true
    },
    {
      flush: 'post',
    }
  )

  onBeforeUnmount(() => {
    dragEle.value.removeEventListener('mouseup', onMouseup)
  })

  let shiftX = 0
  let shiftY = 0
  let initTransition = ''
  let dragEleInitCursor = ''

  return {
    dragging: readonly(dragging),
    position: readonly(position),
    setDragEle,
    setPositionEle,
  }
  function onMousedown(event) {
    // 鼠标相对于header的初始便宜位置
    shiftX = event.clientX - dragEle.value.getBoundingClientRect().left
    shiftY = event.clientY - dragEle.value.getBoundingClientRect().top
    document.addEventListener('mousemove', onMove)
    dragEle.value.addEventListener('mouseup', onMouseup)

    const { transition, right, bottom } = positionEle.value.style

    if (right !== 'auto') positionEle.value.style.right = 'auto'
    if (bottom !== 'auto') positionEle.value.style.bottom = 'auto'

    moveAt(event)
    // 禁用原生的拖拽事件
    dragEle.value.addEventListener('dragstart', disableDrag)

    dragEleInitCursor = dragEle.value.style.cursor
    dragEle.value.style.cursor = 'move'
    initTransition = transition
    positionEle.value.style.transition = 'all 0 ease'

    document.body.style.userSelect = 'none'
  }
  function onMove(event) {
    moveAt(event)
  }
  function onMouseup() {
    document.removeEventListener('mousemove', onMove)
    dragEle.value.removeEventListener('dragstart', disableDrag)

    positionEle.value.style.transition = initTransition
    dragEle.value.style.cursor = dragEleInitCursor

    document.body.style.userSelect = ''
    dragging.value = false
  }

  function moveAt({ pageX, pageY }) {
    const _left = `${pageX - shiftX}px`
    const _top = `${pageY - shiftY}px`
    position.left = _left
    position.top = _top
    dragging.value = true
    positionEle.value.style.left = _left
    positionEle.value.style.top = _top
    positionEle.value.style.zIndex = dragZIndex
  }
  function disableDrag() {
    return false
  }
}

export { useDraggable }
