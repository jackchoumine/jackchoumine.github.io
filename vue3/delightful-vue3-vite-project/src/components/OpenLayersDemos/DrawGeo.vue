<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-08 16:29:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-09 19:24:50
 * @Description : 绘制几何图形
 * 参考 https://openlayers.org/en/latest/examples/draw-features.html
-->
<script lang="ts" setup>
import { Map, View } from 'ol'

import { Draw, Interaction } from 'ol/interaction'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource, XYZ } from 'ol/source'

import { GeoList } from './components'

const mapContainer = ref()

onMounted(initMap)

let map = null
let vectorSource = null
let draw = null
function initMap() {
  const tianDiTuKey = '4c409692826bccaca32ee3e1a74ba1b5'
  // 矢量地图
  const tianDiTuUrl2 = `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource2 = new XYZ({
    url: tianDiTuUrl2,
  })
  // 矢量注记
  const tianDiTuUrl3 = `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource3 = new XYZ({
    url: tianDiTuUrl3,
  })

  vectorSource = new VectorSource({
    wrapX: false,
  })
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  })
  map = new Map({
    target: mapContainer.value,
    layers: [
      new Tile({
        source: tianDiTuSource2,
      }),
      new Tile({
        source: tianDiTuSource3,
      }),
      // NOTE  不添加矢量图层，绘制的图形会被覆盖，绘制不了
      vectorLayer,
    ],
    view: new View({
      center: [106.675271, 26.579508],
      zoom: 10,
      projection: 'EPSG:4326',
    }),
  })
}

// TODO 如何导入 Draw 参数类型
function addInteraction(type: any) {
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
  <div class="draw-geo" ref="mapContainer">
    <GeoList @select="addInteraction" @undo="undo" />
  </div>
</template>

<style scoped lang="scss">
.draw-geo {
  position: absolute;
  inset: 0;
}
</style>
