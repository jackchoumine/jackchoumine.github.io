/*
 * @Description :
 * @Date        : 2021-10-28 01:05:11 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-28 01:23:49 +0800
 * @LastEditors : JackChou
 */
import { shallowRef, Ref, unref } from 'vue'
declare type MaybeRef<T = unknown> = Ref<T> | T
export function useFetch<T>(url: MaybeRef<string>) {
  const data = shallowRef<T | undefined>()
  const error = shallowRef<Error | undefined>()

  fetch(`${unref(url)}?api_key=feb97d79-2a3e-400e-9223-6ceca9d5593d`)
    .then((res) => res.json())
    .then((res) => (data.value = res))
    .catch((err) => {
      console.error(err)
      error.value = err
    })

  return { data, error }
}
