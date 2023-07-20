<!--
 * @Description : 
 * @Date        : 2021-11-08 00:00:52 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-08 01:41:28 +0800
 * @LastEditors : JackChou
-->
<template>
  <div class="img-container">
    <img
      :src="placeholderImg"
      data-src="https://images.unsplash.com/photo-1504272017915-32d1bd315a59?fit=crop&w=600&q=80"
    /><br />
    <img
      :src="placeholderImg"
      data-src="https://images.unsplash.com/photo-1502716643504-c4ea7b357d91?fit=crop&w=600&q=80"
    /><br />
    <img
      :src="placeholderImg"
      data-src="https://images.unsplash.com/photo-1502716716838-6ad177344906?fit=crop&w=600&q=80"
    /><br />
    <img
      :src="placeholderImg"
      data-src="https://images.unsplash.com/photo-1504271933050-2cf260bbec95?fit=crop&w=600&q=80"
    /><br />
    <img
      :src="placeholderImg"
      data-src="https://images.unsplash.com/photo-1502716197620-bf14ce1651b3?fit=crop&w=600&q=80"
    />
    <br />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const placeholderImg = ref('https://fakeimg.pl/600x420/?text=loading...')
// NOTE:
// https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/
// https://www.smashingmagazine.com/2019/04/mutationobserver-api-guide/
onMounted(() => {
  let observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src
          observer.unobserve(entry.target)
        }
      })
    },
    //NOTE 可以设置触发事件的范围,距离根元素底部 -200px 时，发生交叉 即图片向上移动 200px 才发生交叉
    { rootMargin: '0px 0px -420px 0px', root: document.querySelector('.img-container') }
  )
  document
    .querySelector('.img-container')
    .querySelectorAll('img')
    .forEach((img) => {
      observer.observe(img)
    })
})
</script>
<style scoped lang="scss">
.img-container {
  overflow-y: scroll;
  height: 550px;
  /* position: relative; */
  img {
    width: 600px;
    height: 420px;
    display: inline-block;
    margin: 50px;
    box-shadow: 0 0 20px #333;
  }
}
</style>
