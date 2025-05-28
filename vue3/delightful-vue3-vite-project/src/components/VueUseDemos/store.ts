/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:47:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-05-28 10:43:31
 * @Description :
 */
import { createGlobalState } from '@vueuse/core'

// 全局状态
// NOTE 技巧：闭包的形式共享全局状态
// 单例模式： 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
export const useGlobalCounter = createGlobalState(() => {
  onMounted(() => {
    console.log('onMounted createGlobalState function')
  })
  const count = ref(0)
  return { count }
})

/**
 * 使用模块变量保存全局状态
 */
const isOpen = ref(false)

export function useOpen() {
  function toggleOpen(open?: boolean) {
    isOpen.value = open ?? !isOpen.value
  }
  onMounted(() => {
    console.log('onMounted module variable')
  })
  return {
    isOpen: readonly(isOpen),
    toggleOpen,
  }
}

/**
 * 使用闭包的形式共享全局状态
 */
export const useOpen2 = globalState((...rest) => {
  console.log({ rest }, 'globalState rest')
  // effectScope 作用域
  // https://www.cnblogs.com/wangyang0210/p/17217109.html
  const isOpen = ref(false)
  function toggleOpen(open?: boolean) {
    isOpen.value = open ?? !isOpen.value
  }
  onMounted(() => {
    console.log('onMounted globalState function')
  })
  return {
    isOpen: readonly(isOpen),
    toggleOpen,
  }
})

/*
NOTE 模块变量实现单例和闭包实现单例有什么区别？

区别在于多个地方调用，初始化函数的执行情况。
闭包只在第一次调用时初始化，即使使用了该全局状态的组件重新挂载，也不会再次初始化，而模块变量实现单例，每次调用都会执行，因此 hook 内的组件生命周期函数也会多次执行(虽然也能做到只执行一次)。

应该选择哪种？
需要每次调用都初始化获取当前的状态，使用模块变量，否则使用闭包。
每次调用都可能传递不同的参数，使用模块变量，否则使用闭包。
*/

function globalState(initState) {
  let initialized = false
  let state = null
  return (...rest) => {
    if (!initialized) {
      state = initState(...rest)
      initialized = true
      return state
    }
    return state
  }
}
