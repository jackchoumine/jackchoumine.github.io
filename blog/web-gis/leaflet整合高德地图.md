# leaflet 集成高德地图

这样做的好处：能够最大限度的利用高德地图的图层，又能使用 leaflet 的的 api 控制图层。

> 可一定程度是自定义高德地图的图层样式，有时候能满足更加个性化的需求，具体操作看高德地图的 api 文档。

## 如何做？

### 1. 引入高德地图的 js

```html
<script src="https://webapi.amap.com/maps?v=1.4.15&key=你的高德地图 key"></script>
```

### 创建两个 div 作为两个地图容器

```html
<template>
  <div
    class="leaflet-map w-full h-full absolute bg-transparent"
    ref="leafletMapContainer"></div>
  <div class="a-map w-full h-full absolute" ref="aMapContainer"></div>
</template>

<style scoped lang="scss">
.leaflet-map {
  z-index: 100;
}

.a-map {
  z-index: 90;
}
</style>
```

> 使用 tailwindcss 设置了一些样式。

两个 div 的 z-index 设置不同，leaflet 的较大，因为希望用户操作的是 leaflet 的地图，高德地图只是作为底图。

初始化两个地图，就实现了图层区域叠加在一起。

### 初始时地图

```js
import { Canvas, CircleMarker, Icon, Map, Marker, Polygon, Polyline } from 'leaflet'

const aMapContainer = ref()
const leafletMapContainer = ref()

onMounted(function () {
  const aMap = initAMap()
  const map = new Map(leafletMapContainer.value, {
    renderer: new Canvas(),
  })
  // NOTE 不设置地图中心点，监听不到事件
  //   map.setView([26.55, 106.6], 11)
  map.setView([39.909186, 116.397411], 10)

  map.on('zoom', event => {
    const zoom = map.getZoom()
    aMap.setZoom(zoom)
  })
  map.on('move', event => {
    const { lng, lat } = map.getCenter()
    const zoom = map.getZoom()
    aMap.setZoomAndCenter(zoom, [lng, lat])
  })

  // 点  图标
  new Marker([39.909186, 116.397411], {
    icon: new Icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconAnchor: [12, 41],
    }),
  }).addTo(map)

  // 点  圆点
  new CircleMarker([39.909186, 116.457411]).addTo(map)

  // 线
  new Polyline([
    [39.909186, 116.457411],
    [39.999186, 116.457411],
  ]).addTo(map)

  // 面
  new Polygon([
    [39.999186, 116.507411],
    [39.999186, 116.407411],
    [40.099186, 116.407411],
    [40.099186, 116.507411],
  ]).addTo(map)
})

function initAMap() {
  const amap = new window.AMap.Map(aMapContainer.value, {
    fadeOnZoom: false,
    navigationMode: 'classic',
    optimizePanAnimation: false,
    animateEnable: false,
    dragEnable: false,
    zoomEnable: false,
    resizeEnable: true,
    doubleClickZoom: false,
    keyboardEnable: false,
    scrollWheel: false,
    expandZoomRange: true,
    zooms: [1, 20],
    mapStyle: 'amap://styles/1e65d329854a3cf61b568b7a4e2267fd',
    features: ['road', 'point', 'bg'],
    viewMode: '2D',
  })
  return amap
}
```

关键点：

1. leaflet 不提供图层，高德地图有图层；
2. 设置 leaflet 的地图中心点，高德地图才能监听到事件；
3. 初始化完成后，监听 leaflet 的 zoom 和 move 事件，把 leaflet 的 zoom 和 center 设置到高德地图上。
