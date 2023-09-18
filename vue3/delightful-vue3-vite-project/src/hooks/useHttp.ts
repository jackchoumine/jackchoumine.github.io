/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-09-16 12:03:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-18 09:16:24
 * @Description :
 */
type Method = 'post' | 'get'
type MaybeRef<T> = Ref<T> | T

type Options = {
  method?: Method
  enableWatch?: boolean
  immediate?: boolean
  autoAbort?: boolean
}

function useHttp(
  url: string,
  params: MaybeRef<Record<string, any>> = ref({}),
  { enableWatch = true, immediate = true, autoAbort = true, method = 'get' }: Options = {}
) {
  const _params = unref(params)
  const data = ref()
  const error = ref()
  const loading = ref(false)

  enableWatch &&
    watch(
      params,
      newParams => {
        sendHttp(newParams)
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

  type SendHttp = (params?: Record<string, any>) => Promise<any>

  return [data, loading, sendHttp, error] as [
    Ref<any>,
    Ref<boolean>,
    SendHttp,
    Ref<Error>
  ]

  function sendHttp(params: Record<string, any> = _params) {
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
