<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 23:03:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-16 21:08:46
 * @Description : 图层类型
 * 瓦片图层
-->
<script lang="ts" setup>
import L from 'leaflet'

const tianDiTuKey = '4c409692826bccaca32ee3e1a74ba1b5'

let map = null
let layer = null
let wmsLayer = null
let staticImgLayer = null
// 矢量注记
const tianDiTuUrl3 = `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
// 影像注记
const tianDiTuUrl5 = `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`

// lzugis WMS 图层
const lzugisWMS = 'https://lzugis.cn/geoserver/lzugis/wms'

const mapContainer = ref()

const currentLayer = reactive({
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  name: '',
})
watch(
  () => currentLayer.url,
  val => {
    // TODO setUrl 用于切换 url
    // layer.setUrl(val)
  }
)

const layers = [
  {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    name: 'osm瓦片图层',
  },
  {
    url: tianDiTuUrl3,
    name: '天地图--矢量注记',
  },
  {
    url: tianDiTuUrl5,
    name: '天地图--影像注记',
  },
]

onMounted(() => {
  map = initMap(mapContainer.value)
  layer = createLayer(currentLayer.url)
  wmsLayer = createWMSLayer('https://lzugis.cn/geoserver/lzugis/wms', 'lzugis:city')
  staticImgLayer = createStaticImgLayer(
    './china.png',
    [-12.575765437499996, 67.60788818750001, 65.7347814375, 145.7426538125]
  )
  wmsLayer.addTo(map)
  const added = layer.addTo(map)
  // staticImgLayer.addTo(map)
})

function initMap(
  mapContainer: HTMLElement,
  coordinates: [number, number] = [26.55, 106.6],
  zoom: number = 5
) {
  const map = L.map(mapContainer).setView(coordinates, zoom)
  return map
}

function selectLayer({ url, name }) {
  currentLayer.name = name
  currentLayer.url = url
}

function createLayer(url) {
  const layer = L.tileLayer(url, {
    maxZoom: 19,
  })
  return layer
}
/**
 * wms 图层
 * @param url
 * @param layers
 */
function createWMSLayer(url, layers) {
  return L.tileLayer.wms(url, {
    layers,
    format: 'image/png',
    transparent: true,
  })
}
/**
 * 静态图片图层
 * @param url
 * @param extend
 */
function createStaticImgLayer(url, extend) {
  return L.imageOverlay(url, extend)
}
</script>

<template>
  <div class="h-full" ref="mapContainer">
    <ul class="base-layers">
      <li
        class="layer"
        v-for="layer in layers"
        :class="{ active: currentLayer.url === layer.url }"
        :key="layer.url"
        @click="selectLayer(layer)">
        {{ layer.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.base-layers {
  position: absolute;
  top: 10px;
  right: 10px;

  // inset: 0 10px 10px 100px;
  z-index: 1009;
  background-color: azure;
  list-style: none;

  .layer {
    padding: 5px;
    background-color: bisque;

    &.active {
      background-color: aqua;
    }
  }
}
</style>
