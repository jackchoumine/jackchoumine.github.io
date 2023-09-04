# leaflet 学习笔记(一)--快速开始

[leaflet](https://leafletjs.com/)是一个**开源**且对**移动端友好**的地图 js 库，大小仅有 `42kb` ，但是绝大部分地图功能，它都支持。

leaflet 由乌克兰程序员[Volodymyr Agafonkin](https://agafonkin.com/)在 2010 年创建，被世界上诸多公司使用，可以说已经很成熟了，向开源英雄致敬。

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

## 一个简单的例子

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

![定位到贵阳的地图](https://cdn.staticaly.com/gh/jackchoumine/jack-picture@master/leaflet-init-demo-00.png)

## 代码解读

导入 `Map` 和 `TileLayer` ，如果使用 `script` 引入或者不想按需引入，这些方法会放在 `L` 对象上。

```js
import L from 'leaflet';
const layer = L.tileLayer()
const map = L.map()
```

`new Map` 创建一个地图实例，第一个参数是一个 DOM 元素或者 `CSS选择器` ，用作地图容器。第二个参数是一个配置对象，这里配置了图层、地图的初始中心点和放缩层级。

配置了地图容器、图层、地图中心点和放缩层级，就能显示一个简单的地图了。

> 中心点使用 `[纬度,经度]` 的方式设置。

> 默认显示了两个地图控件：左上角的放缩控件和右下角的归属控件。

## 地图库学习要点

所有地图库具备的功能大同小异，在学习地图库时，需要关注地图库的通用功能，有需要，再去了解它的特殊功能，才能使学习事半功倍。

学习地图库，需要重点关注这些通用功能

1. 初始化
2. 图层
3. 地图数据源
4. 地图控件
5. 几何要素绘制
6. 周边生态

后续的学习将围绕这些展开。

## 小结

1. 了解了 leaflet 的特点；
2. 了解了如何使用 leaflet 创建一个简单的地图；
3. 了解了学习地图库的要点。
