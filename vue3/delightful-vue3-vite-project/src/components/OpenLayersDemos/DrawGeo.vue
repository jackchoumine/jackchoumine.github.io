<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-08 16:29:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-09 17:46:11
 * @Description : 绘制几何图形
 * 参考 https://openlayers.org/en/latest/examples/draw-features.html
-->
<script lang="ts" setup>
import { Map, View } from 'ol'

import { Draw, Interaction } from 'ol/interaction'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource, XYZ } from 'ol/source'

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

const geoList = shallowRef([
  { type: 'Point', text: '点', active: false },
  { type: 'LineString', text: '线', active: false },
  { type: 'Polygon', text: '面', active: false },
  { type: 'Circle', text: '圆', active: false },
])

function onSelect(index) {
  geoList.value = geoList.value.map((item, i) => {
    if (i === index) {
      item.active = true //! item.active
      addInteraction(item.type)
    } else {
      item.active = false
    }
    return item
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
    <div class="geo-list">
      <ul>
        <li
          v-for="(item, index) in geoList"
          :key="index"
          @click="onSelect(index)"
          :class="{ 'active-item': item.active }">
          {{ item.text }}
        </li>
        <li @click="undo">清除</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.draw-geo {
  position: absolute;
  inset: 0;

  .geo-list {
    position: absolute;
    top: 100px;
    left: 10px;
    z-index: 999;
    background-color: #fff;
    border-radius: 5px;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        padding: 5px 10px;
        text-align: center;
        cursor: pointer;

        &.active-item {
          background-color: #aaa;
        }

        &:hover {
          background-color: darkcyan;
        }
      }
    }
  }
}
</style>
