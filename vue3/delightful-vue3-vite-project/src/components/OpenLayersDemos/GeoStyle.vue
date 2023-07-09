<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-09 18:19:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-10 01:33:55
 * @Description : 几何图形的样式
 * 参考：https://openlayers.org/en/latest/examples/draw-and-modify-features.html
-->
<script lang="ts" setup>
import { Draw, Modify, Snap } from 'ol/interaction'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'

import { GeoList } from './components'
import { initMap } from './tool'

const mapContainer = ref<HTMLElement>()

let map = null
let vectorSource = null
let draw = null
let modify = null
let snap = null
onMounted(() => {
  const result = initMap({
    target: mapContainer.value,
  })
  map = result.map
  vectorSource = new VectorSource({
    wrapX: false,
  })
  const layer = new VectorLayer({
    source: vectorSource,
    style: {
      'fill-color': 'rgba(255, 255, 255, 0.2)',
      // 'fill-color': 'red',
      'stroke-color': '#ffcc33',
      'stroke-width': 2,
      'circle-radius': 7,
      'circle-fill-color': '#ffcc33',
    },
  })
  modify = new Modify({ source: vectorSource })
  map.addInteraction(modify)
  snap = new Snap({ source: vectorSource })
  map.addInteraction(snap)
  map.addLayer(layer)
})

function addInteraction(type: any) {
  draw && map.removeInteraction(draw)
  draw = new Draw({
    source: vectorSource,
    type,
  })
  map.addInteraction(draw)
}

function undo() {
  console.log('undo', draw)
  //  map.removeInteraction(draw)
  draw.removeLastPoint()
  // vectorSource.clear()
}
</script>

<template>
  <div class="map-container" ref="mapContainer">
    <GeoList @select="addInteraction" @undo="undo" />
  </div>
</template>

<style scoped lang="scss">
@import './map-style';
</style>
