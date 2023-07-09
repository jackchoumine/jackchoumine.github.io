<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-09 18:19:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-09 19:16:18
 * @Description : 几何图形的样式
-->
<script lang="ts" setup>
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'

import { GeoList } from './components'
import { initMap } from './tool'

const mapContainer = ref<HTMLElement>()

let map = null
onMounted(() => {
  const result = initMap({
    target: mapContainer.value,
  })
  map = result.map
  const layer = new VectorLayer({
    source: new VectorSource({
      wrapX: false,
    }),
    style: {
      'fill-color': 'rgba(255, 255, 255, 0.2)',
      'stroke-color': '#ffcc33',
      'stroke-width': 2,
      'circle-radius': 7,
      'circle-fill-color': '#ffcc33',
    },
  })
  map.addLayer(layer)
})
</script>

<template>
  <div class="map-container" ref="mapContainer"><GeoList /></div>
</template>

<style scoped lang="scss">
@import './map-style';
</style>
