<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-02 16:37:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-13 01:31:09
 * @Description : 公共地图数据
 * http://www.xiaobaigis.com/GiSarticles/GiSArticle?ID=30
 * https://lzugis.cn/geoserver/web/wicket/bookmarkable/org.geoserver.web.demo.MapPreviewPage?4&filter=false
-->
<script lang="ts" setup>
import { Map, View } from 'ol'

import { Image as ImageLayer, Tile } from 'ol/layer'
// import { fromLonLat } from 'ol/proj'
import { BingMaps, ImageWMS, OSM, TileWMS, XYZ } from 'ol/source'
import Static from 'ol/source/ImageStatic'

import { initMap } from './tool'

const publicMapData = ref()

onMounted(() => {
  const { map } = initMap({
    target: publicMapData.value,
    zoom: 4,
  })
  // 图片图层
  const imageLayer = new ImageLayer({
    // demo https://openlayers.org/en/latest/examples/wms-image.html
    source: new ImageWMS({
      // crossOrigin: 'anonymous',
      url: 'https://lzugis.cn/geoserver/lzugis/wms',
      // params: { LAYERS: 'lzugis:lake' },
      params: { LAYERS: 'lzugis:china' },
      ratio: 1,
      // serverType: 'geoserver',
    }),
  })
  map.addLayer(imageLayer)

  // TileWMS 图层
  const tileLayer = new Tile({
    // demo https://openlayers.org/en/latest/examples/wms-tiled.html
    source: new TileWMS({
      url: 'https://lzugis.cn/geoserver/lzugis/wms',
      params: { LAYERS: 'lzugis:city' },
      transition: 0,
    }),
  })
  map.addLayer(tileLayer)

  // 静态图片图层
  const staticLayer = new ImageLayer({
    source: new Static({
      url: '/china.png',
      imageExtent: [
        -12.575765437499996, 67.60788818750001, 65.7347814375, 145.7426538125,
      ],
    }),
  })
  map.addLayer(staticLayer)
})
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
