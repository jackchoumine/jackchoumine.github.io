# vite 编译后代码如何实现异步加载模块

```js
polyfillModulePreload()
var _n = preloadResourcesAndExecute
// 保持原始函数名兼容性
var __vite__mapDeps = mapModuleDependencies
/**
 * 异步加载模块的函数
 */
var n = dn(() => _n(() => import('./Standalone-UYBR_23S.js'), []))
/**
 * 异步加载组件的函数
 */
var s = dn({
  loader: () => _n(() => import('./IAmAsyncCom-S3lbjMCd.js'), __vite__mapDeps([0, 1])),
  loadingComponent: Uu,
  errorComponent: Du,
  delay: 200,
  timeout: 3e3,
  suspensible: !1,
  onError(c, l, d, a) {
    c.message.match(/fetch/) && a <= 3 ? l() : d()
  }
})

var r = dn(() => _n(() => import('./LoginPopup-Dsvts-Lo.js'), __vite__mapDeps([2, 3])))
/**
 * 路由配置对象
 */
var route = {
  path: '/about',
  name: 'about',
  component: () => _n(() => import('./AboutView-C44h4-HG.js'), __vite__mapDeps([4, 5]))
}

/**
 * 模块依赖映射器
 * 将模块索引映射到对应的资源路径
 *
 * @param {number[]} moduleIndices - 需要映射的模块索引数组
 * @param {object} [memo=__vite__mapDeps] - 用于缓存的memo对象
 * @returns {string[]} 对应的资源路径数组
 */
function mapModuleDependencies(moduleIndices, memo = mapModuleDependencies) {
  // 初始化或获取缓存的依赖列表
  const dependencyList = initializeDependencyList(memo)

  // 将索引映射为实际路径
  return moduleIndices.map((index) => {
    if (index < 0 || index >= dependencyList.length) {
      throw new Error(`Invalid module index: ${index}`)
    }
    return dependencyList[index]
  })
}

/**
 * 初始化依赖列表
 * @param {object} memo - 缓存对象
 * @returns {string[]} 依赖路径列表
 */
function initializeDependencyList(memo) {
  // 如果已有缓存则直接返回，否则初始化默认列表
  return (
    memo.dependencyList ||
    (memo.dependencyList = [
      'js/IAmAsyncCom-S3lbjMCdA.js',
      'assets/IAmAsyncCom-DP0wY5gyA.css',
      'js/LoginPopup-Dsvts-Lo.js',
      'assets/LoginPopup-yD_xjPbh.css',
      'js/AboutView-C44h4-HGA.js',
      'assets/AboutView-CSIvawM9A.css'
    ])
  )
}

/**
 * 预加载资源并执行回调函数
 * @param {Function} callback - 预加载完成后执行的回调函数
 * @param {string[]} resources - 需要预加载的资源URL数组
 * @param {string} scriptType - 脚本类型标识
 * @returns {Promise} 返回一个Promise，表示整个预加载和执行过程
 */
function preloadResourcesAndExecute(callback, resources = [], scriptType) {
  console.log('Preloading resources:', resources)
  // 如果没有资源需要预加载，直接执行回调
  if (!resources || resources.length === 0) {
    return Promise.resolve().then(() => callback())
  }

  // 获取CSP nonce值（用于内容安全策略）
  const nonce = getCspNonce()

  // 预加载所有资源
  return preloadAllResources(resources, scriptType, nonce)
    .then((results) => {
      // 处理预加载失败的情况
      handlePreloadErrors(results)
      // 执行回调函数
      return callback()
    })
    .catch(handleExecutionError)
}

/**
 * 获取CSP nonce值
 * @returns {string|null} 返回nonce值，如果没有则返回null
 */
function getCspNonce() {
  const cspMeta = document.querySelector('meta[property="csp-nonce"]')
  return cspMeta?.nonce || cspMeta?.getAttribute('nonce') || null
}

/**
 * 预加载所有资源
 * @param {string[]} resources - 资源URL数组
 * @param {string} scriptType - 脚本类型标识
 * @param {string|null} nonce - CSP nonce值
 * @returns {Promise<Array>} 返回所有预加载结果的Promise
 */
function preloadAllResources(resources, scriptType, nonce) {
  // 全局缓存，避免重复加载
  const resourceCache = window.__resourceCache || (window.__resourceCache = {})

  return Promise.allSettled(
    resources.map((resourceUrl) => {
      // 规范化URL
      const normalizedUrl = normalizeUrl(resourceUrl)

      // 如果资源已缓存，跳过
      if (resourceCache[normalizedUrl]) {
        return
      }

      // 标记为已缓存
      resourceCache[normalizedUrl] = true

      // 创建并返回预加载Promise
      return preloadSingleResource(normalizedUrl, scriptType, nonce)
    })
  )
}

/**
 * 规范化URL
 * @param {string} url - 原始URL
 * @returns {string} 规范化后的URL
 */
function normalizeUrl(url) {
  // 这里可以添加URL规范化逻辑
  return url
}

/**
 * 预加载单个资源
 * @param {string} url - 资源URL
 * @param {string} scriptType - 脚本类型标识
 * @param {string|null} nonce - CSP nonce值
 * @returns {Promise|undefined} 返回资源的预加载Promise
 */
function preloadSingleResource(url, scriptType, nonce) {
  const isCss = url.endsWith('.css')
  const selector = isCss ? '[rel="stylesheet"]' : ''

  // 如果资源已存在于DOM中，跳过
  if (document.querySelector(`link[href="${url}"]${selector}`)) {
    return
  }

  // 创建link元素
  const link = document.createElement('link')
  if (isCss) {
    link.rel = 'stylesheet'
  } else if (!isCss && scriptType) {
    link.rel = scriptType
  }
  link.crossOrigin = ''
  link.href = url

  // 如果不是CSS，设置as属性
  if (!isCss) {
    link.as = 'script'
  }

  // 设置nonce（如果存在）
  if (nonce) {
    link.setAttribute('nonce', nonce)
  }

  // 添加到DOM
  document.head.appendChild(link)

  // 对于CSS文件，返回加载完成的Promise
  if (isCss) {
    return new Promise((resolve, reject) => {
      link.addEventListener('load', resolve)
      link.addEventListener('error', () => {
        reject(new Error(`Unable to preload CSS for ${url}`))
      })
    })
  }
}

/**
 * 处理预加载错误
 * @param {Array} results - Promise.allSettled的结果数组
 */
function handlePreloadErrors(results) {
  results?.forEach((result) => {
    if (result?.status === 'rejected') {
      dispatchPreloadErrorEvent(result.reason)
    }
  })
}

/**
 * 分发预加载错误事件
 * @param {Error} error - 错误对象
 */
function dispatchPreloadErrorEvent(error) {
  const event = new Event('vite:preloadError', {
    cancelable: true
  })
  event.payload = error

  // 允许外部处理错误
  const isDefaultPrevented = !window.dispatchEvent(event)

  // 如果事件没有被阻止默认行为，抛出错误
  if (!isDefaultPrevented) {
    throw error
  }
}

/**
 * 处理执行错误
 * @param {Error} error - 错误对象
 */
function handleExecutionError(error) {
  dispatchPreloadErrorEvent(error)
}

function polyfillModulePreload() {
  // 1. 检测浏览器是否原生支持 modulepreload
  const linkElement = document.createElement('link')
  if (linkElement.relList?.supports?.('modulepreload')) {
    console.log('支持 modulepreload')
    return // 原生支持则退出
  }

  // 2. 预加载现有所有 modulepreload 标签
  const modulePreloadLinks = document.querySelectorAll('link[rel="modulepreload"]')
  modulePreloadLinks.forEach((preloadLink) => {
    fetchModule(preloadLink)
  })

  // 3. 监听未来新增的 modulepreload 标签
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== 'childList') return

      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'LINK' && node.getAttribute('rel') === 'modulepreload') {
          fetchModule(node)
        }
      })
    })
  })

  observer.observe(document, {
    childList: true,
    subtree: true
  })

  /**
   * 生成安全的 fetch 请求参数
   * @param {HTMLLinkElement} link - link 标签元素
   * @returns {RequestInit} fetch 配置对象
   */
  function generateFetchOptions(link) {
    const options = {}

    // 保留完整性校验
    if (link.integrity) {
      options.integrity = link.integrity
    }

    // 保留 Referrer 策略
    if (link.referrerPolicy) {
      options.referrerPolicy = link.referrerPolicy
    }

    // 处理跨域策略
    switch (link.crossOrigin) {
      case 'use-credentials':
        options.credentials = 'include'
        break
      case 'anonymous':
        options.credentials = 'omit'
        break
      default:
        options.credentials = 'same-origin'
    }

    return options
  }

  /**
   * 执行模块预加载
   * @param {HTMLLinkElement} link - link 标签元素
   */
  function fetchModule(link) {
    // 避免重复处理
    if (link.hasAttribute('data-processed')) return
    link.setAttribute('data-processed', 'true')

    const fetchOptions = generateFetchOptions(link)
    console.log(fetchOptions)
    fetch(link.href, fetchOptions).catch((error) => {
      console.error('Module preload failed:', link.href, error)
    })
  }
}
```
