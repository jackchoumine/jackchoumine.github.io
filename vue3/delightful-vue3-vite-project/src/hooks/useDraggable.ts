/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-26 19:01:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-17 11:14:28
 * @Description : 拖拽元素 hook
 */
import type { VNodeRef } from 'vue'
import { MaybeRef } from 'vue'

import { useHover } from './useHover'

export interface DraggableOptions {
  dragTips?: string
  dragZIndex?: number
}

/**
 * 拖拽元素 hook
 * @param enable 是否启用拖拽功能，默认为 true, 可通过 ref 动态控制
 * @param options
 * @param options.dragTips 鼠标移动到可拖拽元素上时的提示
 * @param options.dragZIndex 拖拽时的 z-index，默认为 10，可根据实际情况调整，防止被其他元素遮挡
 */
function useDraggable(
  enable: MaybeRef<boolean> = ref(true),
  options: DraggableOptions = {
    dragTips: '长按鼠标，可拖拽',
    dragZIndex: 10,
  }
) {
  const title = computed(() => (unref(enable) ? options.dragTips : ''))
  const { setHoverTarget } = useHover({
    in: dragTarget => {
      if (!dragTarget) return
      dragTarget.title = title.value
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
      if (!unref(enable)) {
        if (bindEvent) {
          dragEle.value.removeEventListener('mousedown', onMousedown)
          bindEvent = false
        }
        return
      }
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
    // NOTE 禁用原生的拖拽事件
    dragEle.value.addEventListener('dragstart', disableDrag)
    // NOTE 拖拽时禁止选中文本
    document.body.style.userSelect = 'none'

    dragEleInitCursor = dragEle.value.style.cursor
    dragEle.value.style.cursor = 'move'
    initTransition = transition
    positionEle.value.style.transition = 'all 0 ease'
  }
  function onMove(event) {
    moveAt(event)
  }
  function onMouseup() {
    document.removeEventListener('mousemove', onMove)
    dragEle.value.removeEventListener('dragstart', disableDrag)
    document.body.style.userSelect = ''

    positionEle.value.style.transition = initTransition
    dragEle.value.style.cursor = dragEleInitCursor

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
    positionEle.value.style.zIndex = options.dragZIndex
  }
  function disableDrag() {
    return false
  }
}

export { useDraggable }
