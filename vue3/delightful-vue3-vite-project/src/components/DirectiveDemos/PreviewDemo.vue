<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-27 02:48:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-27 02:52:49
 * @Description : 
-->
<script lang="ts" setup>
const imgSrcs = [
  'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/008i3skNgy1gqrnq8dbcpj31j60t4n1d.webp',
]
</script>

<template>
  <div class="preview-demo">
    <h2>v-preview</h2>
    <div class="img-preview-container">
      <img v-for="src in imgSrcs" :key="src" :src="src" v-preview />
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview-demo {
  .img-preview-container {
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
