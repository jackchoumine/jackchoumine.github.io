<script setup>
import { Map, TileLayer } from 'leaflet'
import { ref } from 'vue'

const mapContainer = ref()

onMounted(() => {
  initMap(mapContainer.value)
})

function initMap(mapContainer) {
  const gaoDeLayer = new TileLayer(
    // 高德地图图层服务
    'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
    {
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
