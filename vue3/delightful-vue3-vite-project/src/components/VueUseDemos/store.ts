/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:47:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-12-13 12:44:09
 * @Description :
 */
import { createGlobalState } from '@vueuse/core'

// 全局状态
// 技巧： 闭包保存状态

export const useGlobalCounter = createGlobalState(() => {
  const count = ref(0)
  return { count }
})

// 使用全局变量保存全局状态
// TODO 两者有何区别和优劣
const isOpen = ref(false)

export function useOpen() {
  function toggleOpen(open?: boolean) {
    isOpen.value = open ?? !isOpen.value
  }
  return {
    isOpen: readonly(isOpen),
    toggleOpen,
  }
}

function globalState(initState) {
  let initialized = false
  let state = null
  return () => {
    if (!initialized) {
      state = initState()
      initialized = true
      return state
    }
    return state
  }
}

// 使用闭包的形式共享全局状态
export const useOpen2 = globalState(() => {
  const isOpen = ref(false)
  function toggleOpen(open?: boolean) {
    isOpen.value = open ?? !isOpen.value
  }
  return {
    isOpen: readonly(isOpen),
    toggleOpen,
  }
})
