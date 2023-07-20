/*
 * @Description :
 * @Date        : 2021-11-15 19:48:59 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-15 19:58:03 +0800
 * @LastEditors : JackChou
 */
import { onBeforeUnmount } from 'vue'

export function useOn(
  event: string,
  target: HTMLElement | Document | Window,
  handler: (event: any) => void
) {
  target.addEventListener(event, handler)
  onBeforeUnmount(() => {
    target.removeEventListener(event, handler)
  })
}
