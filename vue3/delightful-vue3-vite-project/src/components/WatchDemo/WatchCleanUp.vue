<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-18 02:17:39
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-18 03:09:32
 * @Description : 
-->
<script setup>
import http from '@jack/http'

const postID = ref(1)
const post = ref()

watch(postID, callback, { immediate: true })

async function callback(newID, oldID, cleanUp) {
  let lastController
  console.log('callback ')
  cleanUp(() => {
    console.log('cleanUp 回调会在 callback 之前执行 ', '可以在此取消正在进行的请求')
    lastController?.abort()
  })
  lastController = new AbortController()
  const [error, data] = await http.get(
    `http://localhost:3001/posts/${newID}`,
    {},
    {
      signal: lastController.signal,
    }
  )
  lastController = null
  !error && (post.value = data)
}
setTimeout(function () {
  postID.value = 2
}, 9)
setTimeout(function () {
  postID.value = 3
}, 10)
</script>

<template>
  <div>
    <h2>watch onCleanup</h2>
    <p>post:{{ post }}</p>
  </div>
</template>
