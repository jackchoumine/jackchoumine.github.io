<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-17 23:50:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-19 20:30:25
 * @Description : leaflet 和高德地图底图集成
 * 参考 https://stackblitz.com/edit/leaflet-d10?file=index.js
-->
<script lang="ts" setup>
import {
  Canvas,
  CircleMarker,
  FeatureGroup,
  Icon,
  Map,
  Marker,
  Point,
  Polygon,
  Polyline,
} from 'leaflet'
import { MarkerClusterGroup } from 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'

import { redSvg, someGeoJson, threeMakerInGuiYang } from './data'

const aMapContainer = ref()
const leafletMapContainer = ref()
onMounted(function () {
  const aMap = initAMap()
  const map = new Map(leafletMapContainer.value, {
    renderer: new Canvas(),
    maxZoom: 20,
  })
  // NOTE 不设置地图中心点，监听不到事件
  // map.setView([26.55, 106.6], 13)
  map.setView([26.543571948749644, 106.70140365782015], 13)
  // map.setView([26.5509186, 116.397411], 10)

  map.on('zoom', event => {
    const zoom = map.getZoom()
    aMap.setZoom(zoom)
  })
  map.on('move', event => {
    const { lng, lat } = map.getCenter()
    const zoom = map.getZoom()
    aMap.setZoomAndCenter(zoom, [lng, lat])
  })

  // 使用 FeatureGroup 用来存放多个marker
  // const featureGroup = new FeatureGroup()
  const featureGroup = new MarkerClusterGroup()
  threeMakerInGuiYang.features.forEach(feature => {
    const marker = new Marker(
      [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
      {
        icon: new Icon({
          iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(redSvg)}`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
      }
    )
    marker.bindPopup(feature.properties.NAME)
    // marker.addTo(featureGroup)
    featureGroup.addLayer(marker)
  })
  const featMap = {
    // Point,
    LineString: Polyline,
    Polygon,
  }
  // someGeoJson.features.forEach(feature => {
  //   // console.log(feature.geometry, 'zqj log')
  //   if (feature.geometry.type === 'Point') {
  //     const feat = new Point(feature.geometry.coordinates)
  //     featureGroup.addLayer(feat)
  //   } else if (feature.geometry.type === 'LineString') {
  //     const feat = new Polyline(feature.geometry.coordinates)
  //     featureGroup.addLayer(feat)
  //   } else if (feature.geometry.type === 'Polygon') {
  //     const feat = new Polygon(feature.geometry.coordinates)
  //     // featureGroup.addLayer(feat)
  //     feat.addTo(featureGroup)
  //   }
  // })
  featureGroup.on('click', event => {
    console.log('featureGroup click', event)
  })
  // featureGroup.bindPopup(feature => {
  //   // const { NAME } = feature.
  //   console.log('featureGroup bindPopup', feature)
  //   return `<span>hello</span>`
  // })
  // 点  图标
  new Marker([26.5509186, 106.397411], {
    icon: new Icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconAnchor: [12, 41],
    }),
  }).addTo(featureGroup)

  // 点  圆点
  new CircleMarker([26.5509186, 106.557411]).addTo(featureGroup)

  // 线
  new Polyline([
    [26.5509186, 106.597411],
    [26.5599186, 106.587411],
  ]).addTo(featureGroup)

  // 面
  new Polygon([
    [26.5599186, 106.577411],
    [26.5599186, 106.527411],
    [26.5699186, 106.517411],
    [26.5899186, 106.507411],
  ]).addTo(featureGroup)

  featureGroup.addTo(map)
  // setTimeout(() => {
  //   map.removeLayer(featureGroup)
  // }, 2000)
})

function initAMap() {
  const amap = new window.AMap.Map(aMapContainer.value, {
    fadeOnZoom: false,
    navigationMode: 'classic',
    optimizePanAnimation: false,
    animateEnable: false,
    dragEnable: false,
    zoomEnable: false,
    resizeEnable: true,
    doubleClickZoom: false,
    keyboardEnable: false,
    scrollWheel: false,
    expandZoomRange: true,
    zooms: [1, 20],
    mapStyle: 'amap://styles/1e65d329854a3cf61b568b7a4e2267fd',
    features: ['road', 'point', 'bg'],
    viewMode: '2D',
  })
  return amap
}
</script>

<template>
  <!-- <div>  bg-transparent -->
  <div
    class="leaflet-map w-full h-full absolute bg-transparent"
    ref="leafletMapContainer"></div>
  <div class="a-map w-full h-full absolute" ref="aMapContainer"></div>
  <!-- </div> -->
</template>

<style scoped lang="scss">
.leaflet-map {
  z-index: 100;

  //   background-color: red;
}

.a-map {
  z-index: 90;
}
</style>
