/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-19 17:36:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-03-29 15:30:55
 * @Description :
 */
import type { MaybeRef } from '@vueuse/core'

export function useTitle(newTitle?: MaybeRef<string>) {
  const title = ref(newTitle)
  watchEffect(() => {
    const _title = title.value || document.title
    document.title = _title
  })
  return title
}

export function useTitle2(title: MaybeRef<string> = document.title, shouldRestore: true) {
  const cacheTitle = document.title
  const _title = ref(title)

  watchEffect(() => {
    document.title = _title.value
  })

  if (shouldRestore) {
    onUnmounted(() => {
      document.title = cacheTitle
    })
  }

  function setTile(title: string) {
    _title.value = title
  }

  return setTile
}
