# ol 之快速开始

[openLayers](https://openlayers.org/) 是一个开源的二维的 JS 地图库，用于在 web 上显示交互式的地图，简称 ol。

ol 的特点：

* 开源
* 模块化 -- 使用 ES6 模块化语法
* 流行 -- 开发活跃，一直在更新；社区活跃，能够找到大量的资料
* 成熟 -- 2013 年发布，历史悠久
* 高性能
* 功能丰富
* 高度可定制
* 支持多种数据源 -- XML、JSON、GeoJSON、MVT、GML、KML、WKT等
* 支持多种投影方式

## 在 vue3 中使用 ol

### 安装

```bash
npm i ol
```

### 引入

在 `main.js` 中引入样式文件

```js
import 'ol/ol.css'
```

在 `OLInitMap.vue` 中引入 ol，加载一幅最简单的地图。

```html
<script lang="ts" setup>
  import {
    Map,
    View
  } from 'ol'

  import {
    Tile
  } from 'ol/layer'
  import {
    XYZ
  } from 'ol/source'

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

渲染效果：

![设置中心点到贵阳](https://image-static.segmentfault.com/357/418/3574189240-650ea8ff67bd2_fix732)

### 加载一幅最简单的地图

至少需要设置三个属性：

1. `target`： 地图容器的 id，唯一。
2. `layers`： 图层，可包含多个图层。
3. `view`： 视图，只有一个。

> target

target 指定地图渲染的容器，是页面上一个元素的 id 或者元素，地图将被渲染到该元素中。

初始化时没有指定 target，可以通过 `setTarget` 方法动态设置 target，比如动态设置 `target` ，可交换页面上两个图地图。

target 对 `transform` 属性有特殊要求，仅支持 `scale` 。

可给容器设置一个背景，当放缩范围较大时，可避免出现空白，同时起到美化作用。

> layers

layers 是一个图层数组，数组中的每个元素都是一个图层对象。图层渲染的顺序与数组中的顺序一致，数组中的第一个图层将被渲染在最底层。

至少需要一个图层，否则地图将是空白的。

例子中使用[天地图](http://lbs.tianditu.gov.cn/server/MapService.html)的瓦片图层服务，需要申请 key。

::: tip 特别注意

天地图给的图层数据链接为

 `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=您的密钥`

通过 `ol` 添加图层，需要将链接中的 `x` 、 `y` 对换位置，即：

 `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=您的密钥`

为何需要对换位置？

天地图和 ol 定义的参数不同，天地图把 `x` 定义为 `TILECOL` ， `y` 定义为 `TILEROW` ，而 ol 把 `x` 定义为 `TILEROW` ， `y` 定义为 `TILECOL` ，所以需要对换位置。
:::

初始化时没有指定 layers，可以通过 `map.addLayer` 方法动态设置 layers。

> view

view 是一个视图对象，用于控制地图的显示范围、中心位置和缩放级别等，例子中设置放缩级别为 `10` 、中心位置在贵阳，投影方式为 `EPSG:4326` 。

center 的值为经纬度坐标，数组，先经度后纬度，即 [longitude, latitude] 或者 [lng, lat]。

`View` 是地图视图类，主要控制地图和人的交互，比如地图的中心点、缩放级别、旋转角度等。

一个页面上有两个地图，可共有一个 `View` ，实现两个地图联动，这种需求不太常见。

> Map -- 地图容器类

Map 类是 ol 的核心类，用于创建地图实例，管理地图的图层、地图控件(放缩、比例尺、鸟瞰图等)以及地图交互功能。

比如通过 map 的实例方法 `addLayer` 、 `removeLayer` ，可动态添加或者删除图层。

> Tile -- 瓦片图层类

Tile 类是 ol 的瓦片图层基类，用于加载瓦片图层数据。

> XYZ -- 瓦片图层数据源类

XYZ 类是 ol 的瓦片图层数据源基类，用于加载瓦片图层数据源。

## 小结

1. 了解 ol 的特点：开源、模块化、成熟、可高度定制；
2. 在 vue3 中使用 ol；
3. 加载一幅最简单的地图需要设置三个属性：target、layers、view。

## 参考

[从 0 使用 openlayers 加载官网天地图--b 站视频](https://www.bilibili.com/video/BV1Su411q7pz/?spm_id_from=333.999.0.0&vd_source=9bbf149e26315d2edf55b034712e09d6)
