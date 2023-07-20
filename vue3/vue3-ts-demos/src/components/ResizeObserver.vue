<!--
 * @Description : 
 * @Date        : 2021-11-07 19:45:04 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-07 22:08:47 +0800
 * @LastEditors : JackChou
-->
<template>
  <div class="resize-container">
    <div class="box">
      <h3 class="info"></h3>
    </div>
    <div class="box small">
      <h3 class="info"></h3>
    </div>
  </div>
</template>
<script>
/*
为何要引入 ResizeObserver?
① 使用 resize 有性能问题: 每次事件触发都要调用函数，且需要手动计算尺寸，性能不好
② resize 事件只能监听 window 和 body 窗口大小变化，不能监听元素大小变化
more info: https://stackoverflow.com/questions/48087965/why-was-resizeobserver-introduced-to-listen-to-resize-changes-and-not-a-simple

// 何时发出通知：
1、 当检测到元素插入和移除时
2、 当元素的display设置为none是
3、 当元素开始渲染时且尺寸不是 0*0
注意：非替换行内元素，不会触发，CSS transforms 不会触发
moreinfo https://xebia.com/blog/resize-observer-api-detecting-element-size-change/

// 使用场景
1. 希望针对每个元素进行媒体查询，然后进行布局
2. 滚动布局，以便在滚动时调整布局
3. 
*/
export default {
  name: 'ResizeObserver',
}
</script>
<script setup>
import { onMounted, onUnmounted } from 'vue'
let resizeObserver = null

function observerBoxSizeChange() {
  const boxs = document.querySelectorAll('.box')
  console.log(boxs)
  resizeObserver = new ResizeObserver((entries, resizeObserver) => {
    entries.forEach((entry) => {
      console.log(entry)
      // entry.target 是被观察的元素
      // contentRect 是被观察元素的新的大小，内容区域，不含padding和border
      // top left 是 top
      console.log(entry.target.getBoundingClientRect())
      // console.log(entry.target.getComputedStyle())
      const infoEl = entry.target.querySelector('.info')

      // const width = Math.floor(entry.contentRect.width)
      // const height = Math.floor(entry.contentRect.height)

      const { top, left, bottom, right, width, height, x, y } = entry.contentRect

      const angle = Math.floor((width / 360) * 100)
      const gradient = `linear-gradient(${angle}deg, rgba(0,143,104,1), rgba(250,224,66,1))`
      entry.target.style.background = gradient
      console.log('x')
      console.log(x)
      console.log('y')
      console.log(y)
      const padding = `top padding is ${top} px，left padding is ${left} px.`
      const xy = `x:${x},y:${y}.`
      infoEl.innerText = `I'm ${width}px and ${height}px tall! ${padding} ${xy}`
    })
    console.log(resizeObserver)
  })
  boxs.forEach((box) => {
    resizeObserver.observe(box) //, 'border-box')
  })
}

onMounted(observerBoxSizeChange)
onUnmounted(() => {
  // 取消所有监听
  resizeObserver.disconnect()
  // 取消某个目标元素的监听
  // resizeObserver.unobserve(target)
})
</script>

<style lang="scss">
.box {
  text-align: center;
  height: 500px;
  width: 700px;
  border-radius: 8px;
  box-shadow: 0 0 4px var(--subtle);

  display: flex;
  box-sizing: content-box;
  justify-content: center;
  align-items: center;

  padding: 30px 20px 10px 5px;
  border: 5px solid red;
}

.box h3 {
  color: #fff;
  margin: 0;
  font-size: 5vmin;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.box.small {
  max-width: 850px;
  margin: 1rem auto;
}
</style>
