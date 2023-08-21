/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-22 05:47:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-22 06:34:46
 * @Description :
 */
const baseUrl = 'https://jsonplaceholder.typicode.com/todos'
const urls = []
let i = 1
while (i <= 100) {
  urls.push(`${baseUrl}/${i}`)
  ++i
}

function concurrencyHttp(urls, maxConcurrent) {
  return new Promise(resolve => {
    if (urls.length === 0) {
      resolve([])
      return
    }
    const results = []
    let index = 0
    let completeCount = 1
    async function doHttp() {
      let i = index
      const url = urls[index]
      // NOTE 不能等待前一请求完成再加一
      index += 1

      if (index <= urls.length) {
        try {
          const res = await fetch(url)
          const data = await res.json()
          results[i] = data
        } catch (error) {
          results[i] = error
        } finally {
          if (completeCount === urls.length) {
            resolve(results)
            return
          }
          // NOTE 不能等待前一请求完成再加一
          // 因为需要同时发起多个请求
          // index++
          completeCount += 1
          doHttp()
        }
      }
    }
    const min = Math.min(maxConcurrent, urls.length)
    let count = 0
    while (count < min) {
      doHttp()
      count++
    }
  })
}

function onClick() {
  concurrencyHttp(urls, 10).then(results => {
    console.log(results)
  })
}

window.onClick = onClick
