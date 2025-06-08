/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-07 14:09:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-07 14:59:41
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import Vue from 'vue'

/**
 * @description useHttp 是一个组合式函数，用于发送 HTTP 请求并管理请求状态
 * @param {string} url 请求的 URL
 * @param {Object} options 请求的选项
 * @returns Object 包含 data, error, loading 和 mixins
 * @example
 * ```js
 * import { useHttp } from '@/hooks'
 * const { data, error, loading, mixin } = useHttp('https://jsonplaceholder.typicode.com/todos/1')
 * ```
 */
export function useHttp(url, immediate = true, params = {}, options = {}) {
  const data = Vue.observable({ value: null })
  const error = Vue.observable({ value: null })
  const loading = Vue.observable({ value: false })

  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const _options = { ...defaultOptions, ...options }

  const mixin = {
    mounted() {
      if (immediate) {
        fetchData(url, params, _options)
      }
    },
  }

  return { data, loading, mixin, error, sendHttp }

  async function fetchData(url, params = {}, options = _options) {
    loading.value = true
    try {
      const response = await fetch(url, { ...options, body: JSON.stringify(params) })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function sendHttp(params = {}) {
    return fetchData(url, params, _options)
  }
}

useHttp.get = (url, params = {}, immediate = true, options = {}) => {
  const data = Vue.observable({ value: null })
  const error = Vue.observable({ value: null })
  const loading = Vue.observable({ value: false })

  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const _options = { ...defaultOptions, ...options }

  const mixin = {
    mounted() {
      if (immediate) {
        fetchData(url, params, _options)
      }
    },
  }

  return { data, loading, mixin, error, sendHttp }

  async function fetchData(url, params = {}, options = _options) {
    loading.value = true
    try {
      const queryString = new URLSearchParams(params).toString()
      const fullUrl = queryString ? `${url}?${queryString}` : url
      const response = await fetch(fullUrl, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  function sendHttp(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const fullUrl = queryString ? `${url}?${queryString}` : url
    return fetchData(fullUrl, params, _options)
  }
}

useHttp.post = (url, params = {}, immediate = true, options = {}) => {
  const data = Vue.observable({ value: null })
  const error = Vue.observable({ value: null })
  const loading = Vue.observable({ value: false })

  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const _options = { ...defaultOptions, ...options }

  const mixin = {
    mounted() {
      if (immediate) {
        fetchData(url, params, _options)
      }
    },
  }

  return { data, loading, mixin, error, sendHttp }

  async function fetchData(url, params = {}, options = _options) {
    loading.value = true
    try {
      const response = await fetch(url, {
        ...options,
        body: JSON.stringify(params),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function sendHttp(params = {}) {
    return fetchData(url, params, _options)
  }
}
