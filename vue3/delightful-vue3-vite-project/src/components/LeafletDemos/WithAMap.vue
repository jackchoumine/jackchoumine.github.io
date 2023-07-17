<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-17 23:50:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-18 00:59:50
 * @Description : leaflet 和高德地图底图集成
 * 参考 https://stackblitz.com/edit/leaflet-d10?file=index.js
-->
<script lang="ts" setup>
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
</script>

<template>
  <!-- <div>  bg-transparent -->
  <div
    class="leaflet-map w-full h-full absolute bg-transparent"
    ref="leafletMapContainer"></div>
  <div class="a-map w-full h-full absolute" ref="aMapContainer"></div>
  <!-- </div> -->
</template>

<style scoped lang="scss">
.leaflet-map {
  z-index: 100;

  //   background-color: red;
}

.a-map {
  z-index: 90;
}
</style>
