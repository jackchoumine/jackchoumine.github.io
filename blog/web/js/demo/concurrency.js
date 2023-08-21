/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-22 05:47:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-22 07:21:13
 * @Description :
 */
const baseUrl = 'https://jsonplaceholder.typicode.com/todos'
const urls = []
let i = 1
while (i <= 10) {
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
          // console.log(results, 'zqj log')
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

// concurrencyHttpPromiseAll(urls, 5)
// concurrencyHttpPromiseAll(urls, 3)

function concurrencyHttpPromiseAll(urls, maxConcurrent) {
  return new Promise(resolve => {
    if (urls.length === 0) {
      resolve([])
      return
    }
    const restNum = urls.length % maxConcurrent
    const groupCount = Math.floor(urls.length / maxConcurrent)
    let count = 0
    const urlGroup = []
    while (count < groupCount) {
      urlGroup.push(urls.slice(count * maxConcurrent, (count + 1) * maxConcurrent))
      count++
    }
    restNum && urlGroup.push(urls.slice(urls.length - restNum))
    const dataList = []
    urlGroup.forEach(urls => {
      const httpList = urls.map(url => {
        return doHttp(url)
      })
      Promise.all(httpList).then(res => {
        console.log(res, 'zqj log')
        dataList.push(res)
      })
      //   console.log(groupCount + restNum, dataList.length, 'zqj log')
      //   if (groupCount + restNum === dataList.length) {
      //     resolve(dataList)
      //   }
    })

    function doHttp(url) {
      return fetch(url).then(res => res.json())
    }
  })
}

function onClick() {
  concurrencyHttp(urls, 3).then(results => {
    console.log(results)
  })
  //   concurrencyHttpPromiseAll(urls, 3).then(res => {
  //     console.log(res, 'zqj log')
  //   })
}

//NOTE 和 Promise.all 的区别？

// Promise.all会同时发起请求，等待所有请求完成，才算完成，存在阻塞
// 使用 concurrencyHttp，会同时发起 n 个请求，完成1个，
// 马上补充1个，不会等待 n 请求都完成，再发起请求，即 n 请求之间不会阻塞

window.onClick = onClick
// window.onClick = concurrencyHttpPromiseAll
