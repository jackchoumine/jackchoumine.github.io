<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 21:08:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-04 16:22:48
 * @Description : 初始化地图
-->
<script lang="ts" setup>
import L from 'leaflet'

import { AntDesignDemos } from '../AntDesignVue'

const mapContainer = ref()

onMounted(() => {
  const map = initMap(mapContainer.value)
  map.on('mousemove', onMouseMove)
})

const GuiYangPosition: [number, number] = [26.55, 106.6] // [latitude,longitude] [纬度,经度]

const currentZoom = ref(11)
function initMap(
  mapContainer: HTMLElement,
  coordinates: [number, number] = GuiYangPosition,
  zoom: number = 11
) {
  currentZoom.value = zoom
  const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  })
  const map = L.map(mapContainer, {
    zoomControl: true,
    attributionControl: false,
    closePopupOnClick: false,
    trackResize: true,
    center: coordinates, // 初始视角中心 [latitude,longitude] [纬度,经度]
    zoom, // 初始缩放等级
    // layers: [layer], // 初始图层
    minZoom: 1,
    maxZoom: 19,
    zoomDelta: 1, // 整数，否则无法缩小
    // zoomSnap: 0.5,
    boxZoom: true,
    // 地图投影
    crs: L.CRS.EPSG3857,
    doubleClickZoom: 'center',
    maxBounds: [
      [27.33, 107.21],
      [26.21, 106.33],
    ],
    // 最大边界 使用经纬度标识，设置后地图不可拖出该范围
    // 是否允许拖动
    dragging: true,
    renderer: L.svg(), // 渲染器 Renderer，根据浏览器环境自动选择
  }) // .setView(coordinates, zoom)

  // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution:
  //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // }).addTo(map)
  layer.addTo(map)

  // const marker = L.marker([26.55, 106.6]).addTo(map)
  // function componentAsContent(VueComponent, props, mountEl = 'div') {
  //   const container = document.createElement(mountEl)
  //   return layer => {
  //     console.log(container)
  //     console.log(layer)
  //     return createApp(VueComponent, props).mount(container).$el
  //   }
  // }

  // marker
  //   .bindPopup(componentAsContent(AntDesignDemos, { title: '使用vue组件' }), {
  //     closeButton: false,
  //     autoClose: false,
  //   })
  //   .openPopup()

  // L.circle(GuiYangPosition, {
  //   color: 'red',
  //   fillColor: '#f03',
  //   fillOpacity: 0.5,
  //   radius: 5000,
  // }).addTo(map)

  map.on('load', event => {
    console.log('map load', event)
  })
  map.on('zoom', event => {
    console.log('map zoom', event)
    currentZoom.value = map.getZoom()
  })
  map.on('layeradd', event => {
    console.log('map layeradd', event)
  })
  return map
}

const coordinates = ref({
  lat: undefined,
  lng: undefined,
})
function onMouseMove(e: L.LeafletMouseEvent) {
  const { lat, lng } = e.latlng
  coordinates.value.lat = lat.toFixed(4)
  coordinates.value.lng = lng.toFixed(4)
}
</script>

<template>
  <div class="h-full" ref="mapContainer">
    <span class="coordinates">
      纬度:{{ coordinates.lat }}，经度:{{ coordinates.lng }} zoom:{{ currentZoom }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.coordinates {
  position: absolute;
  bottom: 10px;
  left: calc(50%);
  z-index: 401;
  color: white;
  background-color: rgba($color: #000, $alpha: 0.7);
  transform: translateX(-50%);

  font: {
    size: 20px;
    weight: 900;
  }
}
</style>
