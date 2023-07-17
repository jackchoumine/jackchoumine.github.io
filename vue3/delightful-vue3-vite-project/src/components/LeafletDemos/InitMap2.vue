<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-17 09:48:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-17 15:32:34
 * @Description : 使用ES6模块化引入leaflet
 * 参考例子：https://stackblitz.com/@shengzheng1981
 【Leaflet_D2】 https://www.bilibili.com/video/BV1kX4y1y7Gq/?share_source=copy_web&vd_source=c23ab500627f369ceee9c74b051e83b6
 * 图层组：用于将几个图层分组并作为一个整体处理。如果你把它添加到地图上，任何从该组中添加或删除的图层也会在地图上添加/删除。
-->
<script lang="ts" setup>
import { LatLngExpression, LayerGroup, Map, TileLayer } from 'leaflet'
import { reverse } from 'lodash-es'

import { guiYangPosition, tianDiTuUrl2, tianDiTuUrl3 } from '../OpenLayersDemos/data'

const mapContainer = ref()

const gaoDeLayer = new TileLayer(
  // 高德地图图层服务
  'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
  {
    subdomains: ['1', '2', '3', '4'], // 子域名 用于负载均衡，加快地图加载速度
  }
)

const tianDiTuLayer2 = new TileLayer(tianDiTuUrl2, {
  id: '2',
  attribution: '天地图2',
})
const tianDiTuLayer3 = new TileLayer(tianDiTuUrl3, {
  id: '3',
  attribution: '天地图3',
})
const layerGroup = new LayerGroup([tianDiTuLayer2, tianDiTuLayer3]) // .addLayer(tianDiTuLayer2).addLayer(tianDiTuLayer3)
let map = null
onMounted(() => {
  map = initMap(mapContainer.value)
  layerGroup.addTo(map)
})

function initMap(
  container,
  layers = [],
  coordinates = reverse(guiYangPosition),
  zoom = 11
) {
  const map = new Map(container, {
    layers,
  })
  map.setView(coordinates as LatLngExpression, zoom)
  return map
}

const currentLayerId = ref(['2', '3'])
const layerOptions = [
  {
    id: '2',
    name: '天地图2',
    layer: tianDiTuLayer2,
  },
  {
    id: '3',
    name: '天地图3',
    layer: tianDiTuLayer3,
  },
]

function toggleLayer(selectIDs: string[]) {
  layerOptions.forEach(item => {
    if (selectIDs.includes(item.id)) {
      layerGroup.addLayer(item.layer)
    } else {
      layerGroup.removeLayer(item.layer)
    }
  })
}
</script>

<template>
  <div class="init-map-2 h-full" ref="mapContainer">
    <ElCheckboxGroup v-model="currentLayerId" @change="toggleLayer">
      <ElCheckbox v-for="layer in layerOptions" :key="layer.id" :label="layer.id">
        {{ layer.name }}
      </ElCheckbox>
    </ElCheckboxGroup>
  </div>
</template>

<style scoped lang="scss">
.init-map-2 {
  :deep(.el-checkbox-group) {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1100;
    padding: 0 5px;
    /* stylelint-disable-next-line color-function-notation */
    // background-color: rgba(255, 255, 255, 0.6);
    background-color: bisque;
  }
}
</style>
