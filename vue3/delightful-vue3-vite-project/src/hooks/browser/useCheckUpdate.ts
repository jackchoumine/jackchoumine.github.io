// import { ElNotification } from 'element-plus'

// import { isProd } from '@/utils'

export function useCheckUpdate() {
  let checkWorker
  onMounted(() => {
    checkWorker = new Worker('/checkUpdate.worker.js')
    checkWorker.addEventListener('message', ({ data }) => {
      console.log(data)
      ElNotification({
        dangerouslyUseHTMLString: true,
        title: `有新版本: ${data.version}`,
        message: Message(data), // '是否现在就更新?',
        duration: 0, // 31 * 1000,
        type: 'success',
        customClass: 'version-notification',
      })
    })
    checkWorker.postMessage({
      type: 'check',
    })
  })
  onUnmounted(() => {
    checkWorker.postMessage({
      type: 'terminate',
    })
    checkWorker.terminate()
  })

  function Message({ shortTime }) {
    const props = {
      class: 'version-container',
      style: { display: 'flex', fontSize: '16px' },
    }

    return h('div', props, [
      h('div', { class: 'version-desc' }, '发布时间:'),
      h('div', { class: 'version-time' }, shortTime),
      h('div', { onClick: updateNow, class: 'version-refresh' }, '现在刷新'),
      h('div', { onClick: updateIn5min, class: 'version-refresh' }, '5分钟后刷新'),
    ])

    function updateNow() {
      location.reload()
    }
    function updateIn5min() {
      setTimeout(() => {
        location.reload()
      }, 5 * 60 * 1000)
    }
  }
}
