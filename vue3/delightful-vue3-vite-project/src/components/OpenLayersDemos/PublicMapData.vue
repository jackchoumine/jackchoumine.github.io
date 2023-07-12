<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-02 16:37:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-13 03:45:19
 * @Description : 公共地图数据
 * http://www.xiaobaigis.com/GiSarticles/GiSArticle?ID=30
 * https://lzugis.cn/geoserver/web/wicket/bookmarkable/org.geoserver.web.demo.MapPreviewPage?4&filter=false
-->
<script lang="ts" setup>
import { GeoJSON } from 'ol/format'
import { Image as ImageLayer, Tile, Vector as VectorLayer } from 'ol/layer'
// import { fromLonLat } from 'ol/proj'
import { BingMaps, ImageWMS, OSM, TileWMS, Vector as VectorSource, XYZ } from 'ol/source'
import Static from 'ol/source/ImageStatic'
import { Fill, Stroke, Style, Text } from 'ol/style'

import testGeoJson from './TestGeoJson.json'
import { initMap } from './tool'

const publicMapData = ref()

onMounted(() => {
  const { map } = initMap({
    target: publicMapData.value,
    zoom: 10,
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

  // geojson 图层
  // https://openlayers.org/en/latest/examples/geojson.html
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(testGeoJson, {
      // dataProjection: 'EPSG:4326',
      // featureProjection: 'EPSG:3857',
    }),
  })

  function styleFunction(features) {
    // TODO features 有哪些属性
    // console.log(features, 'zqj log')
    const name = features.get('name')
    const population = features.get('population')
    const color = features.get('color')
    return new Style({
      // 边框
      stroke: new Stroke({
        color: '#319FD3',
        lineDash: [4],
        width: 2,
      }),
      // 填充
      fill: new Fill({
        // color: 'rgba(255, 255, 255, 0.2)',
        color: 'rgba(255, 255, 255, 0.6)',
      }),
      text: new Text({
        font: 'bolder 20px 微软雅黑',
        fill: new Fill({
          color,
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3,
        }),
        text: name, // [name, 'bolder 20px 微软雅黑', population],
      }),
    })
  }
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction,
  })
  map.addLayer(vectorLayer)
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
