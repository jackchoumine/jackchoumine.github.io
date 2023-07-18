<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-17 09:48:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-18 21:27:02
 * @Description : 使用ES6模块化引入leaflet
 * 参考例子：https://stackblitz.com/@shengzheng1981
 【Leaflet_D2】 https://www.bilibili.com/video/BV1kX4y1y7Gq/?share_source=copy_web&vd_source=c23ab500627f369ceee9c74b051e83b6
 * 图层组：用于将几个图层分组并作为一个整体处理。如果你把它添加到地图上，任何从该组中添加或删除的图层也会在地图上添加/删除。
 * 冲突检测，
 * 视频 https://www.bilibili.com/video/BV1Sf4y1t73B/?spm_id_from=333.337.search-card.all.click&vd_source=9bbf149e26315d2edf55b034712e09d6
-->
<script lang="ts" setup>
import { CanvasLabel } from '@panzhiyue/leaflet-canvaslabel'
import {
  CircleMarker,
  LatLng,
  LatLngExpression,
  LayerGroup,
  Map,
  Polyline,
  TileLayer,
} from 'leaflet'
import { reverse } from 'lodash-es'

import { guiYangPosition, tianDiTuUrl2, tianDiTuUrl3 } from '../OpenLayersDemos/data'

const canvasLabel = new CanvasLabel({
  collisionFlg: true,
  scale: 2,
})

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
  // 添加矢量数据 106.635271, 26.579508
  const p = new Polyline(
    [
      [
        [26.575786, 106.639213],
        [26.576786, 106.638213],
        [26.575786, 106.637213],
      ],
      [
        [26.575786 + 0.1, 106.639213],
        [26.576786 + 0.1, 106.638213],
        [26.575786 + 0.1, 106.637213],
      ],
    ],
    {
      labelStyle: {
        text: 'Leaflet.LabelTextCollision!!!!!!!!',
        zIndex: 0,
        collisionFlg: false,
        zIndex: 0,
      },
      color: '#fe57a1',
    }
  ).addTo(map)

  for (let i = 0; i < 1000; i++) {
    const plus = Math.random() > 0.5 ? 1 : -1
    const plus2 = Math.random() > 0.5 ? 1 : -1
    const latlng = new LatLng(
      26.545786 + Math.random() * 1.8 * plus,
      106.639213 + Math.random() * 3.6 * plus2
    )
    const c = new CircleMarker(latlng, {
      radius: 5,
      labelStyle: {
        text: '22222',
        scale: 1,
        rotation: 0,
        zIndex: i,
      },
    }).addTo(map)
  }
  layerGroup.addTo(map)
})

function initMap(
  container,
  layers = [],
  coordinates = reverse(guiYangPosition),
  zoom = 8
) {
  const map = new Map(container, {
    layers,
    renderer: canvasLabel,
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
