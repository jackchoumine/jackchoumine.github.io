# openLayers 学习笔记

openLayers 是一个开源的二维的 JavaScript 地图库，用于在 web 上显示交互式的地图，简称 ol。

ol 的特点：

## 在 vue3 中使用 ol

### 安装

```bash
npm i ol
```

### 引入

在`main.js`中引入样式文件

```js
import 'ol/ol.css'
```

在`OLInitMap.vue`中引入 ol，加载一幅最简单的地图。

```html
<script lang="ts" setup>
import { Map, View } from 'ol'

import { Attribution } from 'ol/control'
import { Tile } from 'ol/layer'
import { XYZ } from 'ol/source'


onMounted(initMap)

function initMap() {
  const tianDiTuKey = '你的天地图key'
  // 矢量注记
  const tianDiTuUrl3 = `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource3 = new XYZ({
    url: tianDiTuUrl3,
  })
  // 影像注记
  const tianDiTuUrl5 = `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource5 = new XYZ({
    url: tianDiTuUrl5,
  })

  const map = new Map({
    target: 'ol-map-init',
    layers: [
      new Tile({
        source: tianDiTuSource3,
      }),
      new Tile({
        source: tianDiTuSource5,
      }),
    ],
    view: new View({
      center: [106.675271, 26.579508],
      zoom: 10, // starting zoom
      projection: 'EPSG:4326',
    }),
  })
}
</script>

<template>
  <div class="init-map" id="ol-map-init"></div>
</template>

<style scoped lang="scss">
.init-map {
  position: absolute;
  inset: 0;
}
</style>
```

### 加载一幅**最简单的**地图

至少需要设置三个属性：

1. `target`： 地图容器的 id
2. `layers`： 图层
3. `view`： 视图

> target

target 指定地图渲染的容器，是页面上一个元素的 id 或者元素，地图将被渲染到该元素中。

初始化时没有指定 target，可以通过`setTarget`方法动态设置 target。

target 对`transform`属性有特殊要求，仅支持`scale`。

> layers

layers 是一个图层数组，数组中的每个元素都是一个图层对象。图层渲染的顺序与数组中的顺序一致，数组中的第一个图层将被渲染在最底层。

至少需要一个图层，否则地图将是空白的。

例子中使用[天地图](http://lbs.tianditu.gov.cn/server/MapService.html)的瓦片图层服务，需要申请 key。

::: tip 特别注意

天地图给的图层数据链接为

`http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=您的密钥`

通过`ol`添加图层，需要将链接中的`x`、`y`对换位置，即：

`http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=您的密钥`

为何需要对换位置？

天地图和 ol 定义的参数不同，天地图把`x`定义为`TILECOL`，`y`定义为`TILEROW`，而 ol 把`x`定义为`TILEROW`，`y`定义为`TILECOL`，所以需要对换位置。
:::

初始化时没有指定 layers，可以通过`setLayers`方法动态设置 layers。

> view

view 是一个视图对象，用于控制地图的显示范围、中心位置和缩放级别等，例子中设置放缩级别为`10`、中心位置在贵阳，投影方式为`EPSG:4326`。

center 的值为经纬度坐标，先经度后纬度。

## 参考

[从 0 使用 openlayers 加载官网天地图--b 站视频](https://www.bilibili.com/video/BV1Su411q7pz/?spm_id_from=333.999.0.0&vd_source=9bbf149e26315d2edf55b034712e09d6)
