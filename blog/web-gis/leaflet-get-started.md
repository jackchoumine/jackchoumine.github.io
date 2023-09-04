# leaflet 学习笔记(一)--快速开始

[leaflet](https://leafletjs.com/)是一个**开源**且对**移动端友好**的地图 js 库，大小仅有 `42kb` ，但是绝大部分地图功能，它都支持。

leaflet 由乌克兰程序员[Volodymyr Agafonkin](https://agafonkin.com/)在 2010 年创建，被世界上诸多公司使用，可以说已经很成熟了，向开源人致敬。

它的突出特点有：

1. 轻量，对移动端友好；
2. API 优雅易用；
3. 文档和案例完善；
4. 生态好：社区有大量扩展支持；
5. 代码可读性高；
6. ESM 按需引入等。

## 使用方式

和大部分 js 库的使用方式相同：支持 npm 安装和 script 标签引入。

在 vue3 项目中使用：

安装:

```BASH
 npm i leaflet
```

> 写此文章时，版本号为 `1.9.4` 。

在 `main.ts` 中引入样式

```js
import 'leaflet/dist/leaflet.css'
```

## 一个例子

 `InitMap.vue`

```html
<script setup>
  import {
    Map,
    TileLayer
  } from 'leaflet'

  import {
    ref
  } from 'vue'

  const mapContainer = ref()

  onMounted(() => {
    initMap(mapContainer.value)
  })

  function initMap(mapContainer) {
    const gaoDeLayer = new TileLayer(
      // 高德地图图层服务
      'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7', {
        subdomains: ['1', '2', '3', '4'], // 子域名 用于负载均衡，加快地图加载速度
      }
    )
    const map = new Map(mapContainer, {
      center: [26.579508, 106.675271], // [纬度，经度]
      layers: [gaoDeLayer],
      zoom: 13,
    })
    return map
  }
</script>

<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<style>
  .map-container {
    height: 100%;
  }
</style>
```

渲染结果：

![leaflet-init-demo-00](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/leaflet-init-demo-00.png)
