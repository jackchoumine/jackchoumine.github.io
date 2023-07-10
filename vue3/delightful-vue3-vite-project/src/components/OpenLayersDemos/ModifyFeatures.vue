<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-10 21:04:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-10 21:44:54
 * @Description : 修改几何图形
-->
<script lang="ts" setup>
import { Feature } from 'ol'

import { LineString, Point, Polygon } from 'ol/geom'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'

import { GeoList } from './components'
import { initMap } from './tool'

const mapContainer = ref<HTMLElement | null>(null)
let map = null
onMounted(() => {
  const result = initMap({ target: mapContainer.value })
  map = result.map
  const point = new Point([106.675271, 26.579508])

  const pointSource = new VectorSource({
    features: [
      new Feature(point),
      // new Feature(lineStr),
      // new Feature(new LineString([[106.675271, 26.579508], [106.675271, 26.579508]]])),
    ],
    wrapX: false,
  })
  const pointLayer = new VectorLayer({
    source: pointSource,
    style: {
      'fill-color': 'rgba(255, 255, 255, 0.2)',
      'stroke-color': '#ffcc33',
      'stroke-width': 2,
      'circle-radius': 7,
      'circle-fill-color': '#ffcc33',
    },
  })
  map.addLayer(pointLayer)

  const lineStr = new LineString([
    [106.675271, 26.579508],
    [106.675271, 26.579508],
  ])
  const lineStrLayer = new VectorLayer({
    source: new VectorSource({
      features: [new Feature(lineStr)],
      wrapX: false,
    }),
    style: {
      'stroke-color': '#ffcc33',
      'stroke-width': 2,
    },
  })
  map.addLayer(lineStrLayer)

  const polygon = new Polygon([
    [
      [106.675271, 26.579508],
      [106.675271, 26.579508],
      [106.675271, 26.579508],
      [106.675271, 26.579508],
    ],
  ])
  const polygonLayer = new VectorLayer({
    source: new VectorSource({
      features: [new Feature(polygon)],
      wrapX: false,
    }),
    style: {
      'stroke-color': '#ffcc33',
      'stroke-width': 2,
    },
  })
  map.addLayer(polygonLayer)
})
</script>

<template>
  <div class="map-container" ref="mapContainer"><GeoList /></div>
</template>

<style scoped lang="scss">
@import './map-style';
</style>
