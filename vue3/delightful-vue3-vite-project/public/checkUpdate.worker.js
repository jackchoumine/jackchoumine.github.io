/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-18 18:11:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-18 18:59:45
 * @Description : 检测前端资源是否有更新
 */
let lastEtag
let hasUpdate = false
let intervalId = ''
// 监听主线程发送过来的数据
self.addEventListener('message', ({ data }) => {
  if (data.type === 'check') {
    // 每5分钟执行一次
    // 立即执行一次，获取最新的etag，避免在setInterval等待中系统更新，第一次获取的etag是新的，但是lastEtag还是undefined，不满足条件，错失刷新时机
    checkUpdate()
    intervalId = setInterval(checkUpdate, 30 * 1000)
  }
  if (data.type === 'terminate') {
    clearInterval(intervalId)
    self.close()
  }
})

async function checkUpdate() {
  try {
    // 检测前端资源是否有更新
    let response = await fetch(`/manifest.json?v=${Date.now()}`, {
      method: 'get',
    })
    // 获取最新的etag和data
    let etag = response.headers.get('etag')
    // console.log('etag:', etag)
    let data = await response.json()
    // console.log('data:', data)
    hasUpdate = lastEtag !== undefined && etag !== lastEtag
    // if (hasUpdate) {
    postMessage({
      type: 'hasUpdateed',
      //   mainfest: data,
      //   lastEtag: lastEtag,
      //   etag: etag,
      ...data,
    })
    // }
    lastEtag = etag
  } catch (e) {
    return Promise.reject(e)
  }
}
