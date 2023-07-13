<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-08 16:29:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-13 21:11:56
 * @Description : 绘制几何图形
 * 参考 https://openlayers.org/en/latest/examples/draw-features.html
-->
<script lang="ts" setup>
import { GeoJSON } from 'ol/format'
import {
  DoubleClickZoom,
  DragPan,
  Draw,
  Interaction,
  Modify,
  Select,
  Snap,
} from 'ol/interaction'
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

  // 选中
  select = new Select({
    layers: [vectorLayer],
    // style
  })

  select.on('select', event => {
    console.log('select', event)
    if (event.selected.length) {
      // 选中时，添加捕捉
      addSnap()
    } else {
      // 取消选中
      map.removeInteraction(snap)
    }
  })
  map.addInteraction(select)

  // 修改
  modify = new Modify({
    // source: vectorSource,
    // 使用选中的要素
    features: select.getFeatures(),
  })
  map.addInteraction(modify)
  // 修改结束
  modify.on('modifyend', event => {
    console.log('modifyend', event)
    const features = event.features.getArray()
    console.log(features)
    const geoJson = new GeoJSON().writeFeatures(features[0])
    console.log(geoJson, 'zqj log')
  })
})

function drewFeatures(type = 'Point') {
  setDoubleClickActive(false)
  addSnap()
  addDraw(type)
  // 双击结束绘制，因此需要在绘制让双击放大失效
  map.on('drawend', event => {
    console.log('drawend', event)
    map.removeInteraction(draw)
    map.removeInteraction(snap)
    // 绘制结束后，图层可能还在渲染，所以延迟一下
    setTimeout(() => {
      setDoubleClickActive(true)
    }, 300)
  })
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

function setDoubleClickActive(active) {
  map.getInteractions().forEach(interaction => {
    if (interaction instanceof DoubleClickZoom) {
      interaction.setActive(active)
    }
    if (interaction instanceof DragPan) {
      interaction.setActive(active)
    }
  })
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
