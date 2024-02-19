<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-02 09:31:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-17 00:52:11
 * @Description : 初始化 ol 地图
-->
<script setup>
import { Map, View } from 'ol'

import { Attribution } from 'ol/control'
import { Draw, Modify, Snap } from 'ol/interaction.js'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import { TileJSON, Vector as VectorSource, XYZ } from 'ol/source'

import { GeoList } from './components'

// console.log(Map)
// console.log(View)
const vectorSource = new VectorSource()
const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: {
    'fill-color': 'rgba(255, 255, 255, 0.2)',
    'stroke-color': '#ffcc33',
    'stroke-width': 2,
    'circle-radius': 7,
    'circle-fill-color': '#ffcc33',
  },
})

let map = null
onMounted(initMap)

function initMap() {
  const maptilerKey = 'vWhISZ4E9RttLWtmRiyw'

  const attribution = new Attribution({
    collapsible: false,
  })

  const source = new TileJSON({
    url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${maptilerKey}`, // source URL
    tileSize: 512,
    crossOrigin: 'anonymous',
  })
  const tianDiTuKey = '4c409692826bccaca32ee3e1a74ba1b5'
  const tianDiTuUrl = `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
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
  // 影像地图
  const tianDiTuUrl4 = `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource4 = new XYZ({
    url: tianDiTuUrl3,
  })
  // 影像注记
  const tianDiTuUrl5 = `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource5 = new XYZ({
    url: tianDiTuUrl5,
  })

  map = new Map({
    target: 'ol-map-init',
    layers: [
      // new ol.layer.Tile({
      //   source,
      // }),
      // new ol.layer.Tile({
      //   source: tianDiTuSource2,
      // }),
      // new ol.layer.Tile({
      //   source: tianDiTuSource3,
      // }),
      new Tile({
        source: tianDiTuSource4,
      }),
      new Tile({
        source: tianDiTuSource5,
      }),
      vectorLayer,
    ],
    // controls: ol.control.defaults.defaults({ attribution: false }).extend([attribution]),
    view: new View({
      // constrainResolution: true,
      center: [106.675271, 26.579508], // ol.proj.fromLonLat([106.675271, 26.579508]),
      // center: ol.proj.fromLonLat([16.62662018, 49.2125578]), // starting position [lng, lat]
      zoom: 10, // starting zoom
      projection: 'EPSG:4326',
    }),
  })
  const modify = new Modify({ source: vectorSource })
  map.addInteraction(modify)
  // addInteractions()
  // map.addControl(attribution)
  // map.removeLayer(map.getLayers().getArray()[0])
  // map.addLayer(new Tile({ source }))
}

let draw, snap // global so we can remove them later

function addInteractions(type) {
  draw = new Draw({
    source: vectorSource,
    type,
  })
  map.addInteraction(draw)
  snap = new Snap({ source: vectorSource })
  map.addInteraction(snap)
}
function onSelect(type) {
  map.removeInteraction(draw)
  if (type === 'None') return
  addInteractions(type)
}
function onUndo() {
  console.log(123, 'zqj log')
  draw.removeLastPoint()
}
</script>

<template>
  <div class="init-map" id="ol-map-init">
    <GeoList @select="onSelect" @undo="onUndo" />
  </div>
</template>

<style scoped lang="scss">
.init-map {
  position: absolute;

  // about insert https://www.lambdatest.com/blog/css-inset-property/
  inset: 0;
}
</style>
