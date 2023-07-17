<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-17 09:48:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-17 10:03:00
 * @Description : 使用ES6模块化引入leaflet
-->
<script lang="ts" setup>
import { LatLngExpression, Map, TileLayer } from 'leaflet'
import { reverse } from 'lodash-es'

import { guiYangPosition } from '../OpenLayersDemos/data'

const mapContainer = ref()

onMounted(() => {
  initMap(mapContainer.value)
})

function initMap(container, coordinates = reverse(guiYangPosition), zoom = 11) {
  const map = new Map(container)
  const layer = new TileLayer(
    // 高德地图图层服务
    'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
    {
      subdomains: '1234', // 子域名 用于负载均衡，加快地图加载速度
    }
  )
  layer.addTo(map)
  map.setView(coordinates as LatLngExpression, zoom)
  return map
}
</script>

<template>
  <div class="init-map-2 h-full" ref="mapContainer"></div>
</template>

<style scoped lang="scss">
.init-map-2 {
  // scss code
}
</style>
