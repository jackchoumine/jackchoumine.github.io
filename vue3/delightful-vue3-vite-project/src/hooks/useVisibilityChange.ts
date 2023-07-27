/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-27 08:59:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-27 09:03:19
 * @Description : 浏览器 tab 页面状态变化
 */
import { useOn } from './useOn'

export type VisibilityChange = (hidden: boolean) => void

function useTabChange(visibilityChange: VisibilityChange) {
  const hidden = ref(document.hidden)
  function change() {
    hidden.value = document.hidden
    visibilityChange?.(document.hidden)
  }
  useOn('visibilitychange', change, document)
  return hidden
}
export { useTabChange }
