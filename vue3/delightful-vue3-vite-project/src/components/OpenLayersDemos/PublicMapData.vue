<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-02 16:37:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-02 23:13:07
 * @Description : 公共地图数据
-->
<script lang="ts" setup>
import { Map, View } from 'ol'

import { Tile } from 'ol/layer'
import { fromLonLat } from 'ol/proj'
import { BingMaps, OSM, XYZ } from 'ol/source'

const publicMapData = ref()

const bingMapKey = `mVyFfa19lPVoePMsMGJa0L_Z-UcAkv-5IzPo5NmfafJAd9Hh3Q`

onMounted(initMap)

const gaoDeSource = new XYZ({
  url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={y}&y={x}&z={z}',
})
function initMap() {
  const map = new Map({
    target: publicMapData.value,
    layers: [
      //   new Tile({
      //     source: new OSM(),
      //   }),
      //   new Tile({
      //     source: new BingMaps({
      //       key: bingMapKey,
      //       // 地图类型
      //       imagerySet: 'Road',
      //     }),
      //   }),
      new Tile({
        source: gaoDeSource,
        // wrapX: false,
      }),
    ],
    view: new View({
      center: [106.675271, 26.579508],
      zoom: 10,
    }),
  })
}
</script>

<template>
  <div class="public-map-data" ref="publicMapData"></div>
</template>

<style scoped lang="scss">
.public-map-data {
  position: absolute;
  inset: 0;
}
</style>
