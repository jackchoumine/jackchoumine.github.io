<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-08 16:29:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-13 20:33:01
 * @Description : 绘制几何图形
 * 参考 https://openlayers.org/en/latest/examples/draw-features.html
-->
<script lang="ts" setup>
import { Image, Map, View } from 'ol'

import { Draw, Interaction, Modify, Select, Snap } from 'ol/interaction'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource, XYZ } from 'ol/source'
import { Circle, Fill, Stroke, Style } from 'ol/style'

import { GeoList } from './components'
import { initMap } from './tool'

const mapContainer = ref()

let map = null
let vectorSource = null
let vectorLayer = null

let draw = null
let modify = null
let select = null
let snap = null

onMounted(() => {
  const result = initMap({ target: mapContainer.value })
  map = result.map
  // TODO 添加矢量图层
  const obj = createVectorLayer()
  vectorSource = obj.vectorSource
  vectorLayer = obj.vectorLayer
  map.addLayer(vectorLayer)

  // // 选中
  // select = new Select({
  //   layers: [vectorLayer],
  //   // style
  // })
  // map.addInteraction(select)

  // // 修改
  // modify = new Modify({
  //   // source: vectorSource,
  //   // 使用选中的要素
  //   features: select.getFeatures(),
  // })
  // map.addInteraction(modify)
})

function drewFeatures(type = 'Point') {
  addSnap()
  addDraw(type)
}

function addDraw(type) {
  // TODO 添加的顺序有要求吗
  draw && map.removeInteraction(draw)
  draw = new Draw({
    source: vectorSource,
    type: type, // 'Point', 'LineString', 'Polygon', 'Circle'
  })
  map.addInteraction(draw)
}
function addSnap() {
  // 捕捉
  snap && map.removeInteraction(snap)
  snap = new Snap({
    source: vectorSource,
  })
  map.addInteraction(snap)
}

function undo() {
  console.log('undo', draw)
  //  map.removeInteraction(draw)
  draw.removeLastPoint()
  // vectorSource.clear()
}

function createVectorLayer() {
  const vectorSource = new VectorSource({
    wrapX: false,
    features: [],
  })
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: features => {
      return new Style({
        fill: new Fill({
          color: 'rgba(255, 0,0, 0.2)',
        }),
        stroke: new Stroke({
          color: '#f00',
          width: 2,
        }),
        image: new Circle({
          radius: 10,
          fill: new Fill({
            color: 'rgba(255, 0,0, 0.8)',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    },
  })
  return { vectorSource, vectorLayer }
}
</script>

<template>
  <div class="draw-geo" ref="mapContainer">
    <GeoList @select="drewFeatures" @undo="undo" />
  </div>
</template>

<style scoped lang="scss">
.draw-geo {
  position: absolute;
  inset: 0;
}
</style>
