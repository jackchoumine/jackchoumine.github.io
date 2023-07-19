<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-19 20:54:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-19 21:02:22
 * @Description : 编辑要素
-->
<script lang="ts" setup>
import { LatLngExpression, Map, TileLayer } from 'leaflet'
import { reverse } from 'lodash-es'

import { guiYangPosition } from '../OpenLayersDemos/data'

const mapContainer = ref()

const gaoDeLayer = new TileLayer(
  // 高德地图图层服务
  'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
  {
    subdomains: ['1', '2', '3', '4'], // 子域名 用于负载均衡，加快地图加载速度
  }
)

let map = null
onMounted(() => {
  map = initMap(mapContainer.value, [gaoDeLayer])
})

function initMap(
  container,
  layers = [],
  coordinates = reverse(guiYangPosition),
  zoom = 13
) {
  const map = new Map(container, {
    layers,
  })
  map.setView(coordinates as LatLngExpression, zoom)
  return map
}
</script>

<template>
  <div class="init-map-2 h-full" ref="mapContainer"></div>
</template>

<style scoped lang="scss">
.init-map-2 {
}
</style>
