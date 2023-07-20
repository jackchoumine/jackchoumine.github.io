/*
 * @Description :
 * @Date        : 2021-11-15 19:14:45 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-15 20:08:42 +0800
 * @LastEditors : JackChou
 */
import { ref, Ref, watch } from 'vue'
import { useOn } from './useOn'

export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  watchHandler: (isClickOutside: boolean) => void
) {
  const isClickOutside = ref(false)
  function onClick(event: MouseEvent) {
    if (elementRef.value) {
      if (elementRef.value.contains(event.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  watch(isClickOutside, (isClickOutside) => {
    watchHandler(isClickOutside)
  })

  useOn('click', document, onClick)

  return isClickOutside
}
