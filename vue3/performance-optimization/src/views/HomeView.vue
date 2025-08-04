<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-30 16:28:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-08-02 03:56:29
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup lang="ts">
import { ref, shallowRef } from 'vue'

import png40 from '@/assets/40.png'
import png80 from '@/assets/80.png'
import png200 from '@/assets/200.png'
import png500 from '@/assets/500.png'
import png1500 from '@/assets/1500.min.png'
import png5000 from '@/assets/5000.png'
import big1m from '@/assets/big1m_min.jpg'
import { css as fontDingLieSongKeTi } from '@/assets/fonts/DingLieSongKeTi/dingliesongtypeface20241217-2.ttf'
import imgSrc from '@/assets/test_2025-08-02.png'
import TheWelcome from '@/components/TheWelcome.vue'
import { useCounterStore } from '@/stores/counter'

//console.log({ fontDingLieSongKeTi }, 'zqj log')

const counterStore = useCounterStore()
const APP_URL = import.meta.env.VITE_APP_URL
console.log(typeof APP_URL)
const MODE = import.meta.env.MODE
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
const dingLieSongKeTi = shallowRef(fontDingLieSongKeTi)
</script>

<template>
  <main>
    <div>
      <h3>count</h3>
      <div>count :{{ counterStore.count }}</div>
      <h4>{{ APP_URL }}</h4>
      <h4>isDev {{ isDev }} isProd {{ isProd }}</h4>
      <h4>MODE {{ MODE }}</h4>
      <p class="DingLieSongKeTi" style="font-weight: 900">白日依山尽</p>
      <p class="DingLieSongKeTi normal">白日依山尽</p>
      <p class="DingLieSongKeTi border">白日依山尽</p>
      <p>白日依山尽</p>
      <div>
        <el-button type="primary" @click="counterStore.increment">+</el-button>
      </div>
    </div>
    <div class="img-container">
      <img :src="imgSrc" alt="测试图片压缩" width="200" height="200" />
      <img :src="png40" alt="40" width="200" height="200" />
      <img :src="png80" alt="80" width="200" height="200" />
      <img :src="png200" alt="200" width="200" height="200" />
      <img :src="png500" alt="500" width="200" height="200" />
      <img :src="png1500" alt="1500" width="200" height="200" />
      <img :src="png5000" alt="5000" width="200" height="200" />
      <img :src="big1m" alt="big1m" width="200" height="200" />
      <img src="/test_in_public.min.png" alt="big1m" width="200" height="200" />
    </div>
    <!--<TheWelcome />-->
  </main>
</template>

<style>
p {
  font-size: 40px;
}
.normal {
  font-weight: normal;
}
.bolder {
  font-weight: bolder;
}
.DingLieSongKeTi {
  /*font-family: dingliesongtypeface;*/
  /*font-weight: v-bind(css.bolder);*/
  font-family: v-bind(dingLieSongKeTi.family);
}
.img-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10;
}
</style>
