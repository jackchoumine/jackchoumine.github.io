/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:47:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-02-27 11:43:29
 * @Description :
 */
import { createGlobalState } from '@vueuse/core'

// 全局状态
// NOTE 技巧：闭包的形式共享全局状态
// 单例模式： 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
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
  // effectScope 作用域
  // https://www.cnblogs.com/wangyang0210/p/17217109.html
  const isOpen = ref(false)
  function toggleOpen(open?: boolean) {
    isOpen.value = open ?? !isOpen.value
  }
  return {
    isOpen: readonly(isOpen),
    toggleOpen,
  }
})

/*
NOTE 全局状态单例单例和闭包实现单例有什么区别？

全局状态单例实现和闭包实现单例的区别在于作用域和访问方式。

全局状态实现单例是通过将状态保存在全局变量中，可以在任何地方访问和修改该状态。这种方式的优点是简单直接，可以方便地在不同的模块或组件中使用和共享状态。但是，全局状态可能会导致命名冲突和状态管理的复杂性。

闭包实现单例是通过将状态保存在函数的闭包中，只能通过特定的函数访问和修改该状态。这种方式的优点是隔离性强，可以更好地控制状态的访问权限，避免了全局命名冲突的问题。但是，闭包实现单例的状态只能在闭包函数内部访问，需要通过返回值或其他方式将状态暴露给外部使用。

因此，选择哪种取决于具体的需求和设计考虑。全局状态适用于需要在多个模块或组件中共享状态的情况，而闭包适用于需要更好的封装和控制状态访问权限的情况。
*/
