/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-23 19:43:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-23 20:38:33
 * @Description : 弹窗逻辑
 */
const baseZIndex = 100

export const modalState = reactive({
  items: [],
  frontModal: null, // 最前面的 Modal id
  baseZIndex,
})

export default function useModal() {
  /**
   *
   * @param {Object} options {id,title,body,header,footer,onClose}
   */
  function openModal(options) {
    console.log('打开弹窗')
    console.log(options)
    if ([undefined, null, ''].includes(options.id)) {
      options.id = Math.random().toString(36).slice(3)
      modalState.items.push(options)
      return
    }
    const exist = modalState.items.find(item => item.id === options.id)
    if (exist) {
      // 已经存在，提到最前面，通过 z-index 将其提到最前面
      modalState.frontDialog = exist.id
    } else {
      const index = modalState.items.length
      modalState.items.push({
        ...options,
        zIndex: index + 1 + modalState.zIndex,
      })
    }
  }

  function closeModal(id) {
    if (!id) {
      return
    }
    console.log('关闭弹窗', id)
    const item = modalState.items.find(item => item.id === id)
    const index = modalState.items.findIndex(item => item.id === id)
    item.onClose?.()
    nextTick(() => {
      modalState.items.splice(index, 1)
    })
  }

  return {
    open: openModal,
    openModal,
    close: closeModal,
    closeModal,
  }
}
