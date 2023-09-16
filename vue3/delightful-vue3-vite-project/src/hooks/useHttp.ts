/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-09-16 12:03:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-16 12:47:53
 * @Description :
 */
type Method = 'post' | 'get'
type MaybeRef<T> = Ref<T> | T

function useHttp(
  url: string,
  params: MaybeRef<Record<string, any>> = ref({}),
  { enableWatch = true, immediate = true, autoAbort = true } = {},
  method: Method = 'get'
) {
  const _method = method
  const _params = unref(params)
  const data = ref()
  const error = ref()
  const loading = ref(false)

  enableWatch &&
    watch(
      params,
      newParams => {
        sendHttp(newParams, _method)
      },
      {
        deep: true,
      }
    )

  onMounted(() => {
    immediate && sendHttp(unref(params))
  })

  let abortController = null // new AbortController()
  onBeforeUnmount(() => {
    autoAbort && abortHttp()
  })

  return [data, loading, sendHttp, error]

  function sendHttp(params: Record<string, any> = _params, method = _method) {
    let path = url
    let body = undefined
    if (method === 'get') {
      let query = Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&')
      path += `?${query}`
    } else if (method === 'post') {
      body = JSON.stringify(params)
    }

    abortController = new AbortController()
    const options = { body, signal: abortController.signal }

    loading.value = true

    return fetch(path, options)
      .then(res => res.json())
      .then(res => {
        data.value = res
        return res
      })
      .catch(err => {
        error.value = err
        return Promise.reject(err)
      })
      .finally(() => {
        loading.value = false
        abortController = null
      })
  }

  function abortHttp() {
    abortController?.abort()
  }
}

export { useHttp }
