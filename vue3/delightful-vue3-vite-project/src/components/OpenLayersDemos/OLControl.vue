<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-26 10:07:10
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-26 13:00:58
 * @Description : 常用控件
-->
<script lang="ts" setup>
import { Map, View } from 'ol'

import {
  Attribution,
  FullScreen,
  MousePosition,
  OverviewMap,
  Rotate,
  ScaleLine,
  ZoomSlider,
  ZoomToExtent, // defaults as defaultControls,
} from 'ol/control'
import { Tile } from 'ol/layer'
import { XYZ } from 'ol/source'

const olControl = ref(null)
onMounted(initMap)

function initMap() {
  const tianDiTuKey = '4c409692826bccaca32ee3e1a74ba1b5'
  // 矢量注记
  const tianDiTuUrl3 = `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource3 = new XYZ({
    attributions: '天地图-矢量注记',
    url: tianDiTuUrl3,
  })
  // 影像注记
  const tianDiTuUrl5 = `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource5 = new XYZ({
    attributions: [
      '天地图-版权所有',
      '<a href="http://www.tianditu.gov.cn" target="_blank" style="color:blue;">天地图</a>',
      `<span style="color:red;">可放置 html 代码</span>`,
    ],
    url: tianDiTuUrl5,
  })

  const map = new Map({
    target: olControl.value,
    layers: [
      new Tile({
        source: tianDiTuSource3,
      }),
      new Tile({
        source: tianDiTuSource5,
      }),
    ],
    // NOTE 默认控件
    // controls: defaultControls({
    //   attribution: true,
    //   zoom: false,
    //   rotate: false,
    // }).extend([
    //   new Attribution({
    //     collapsible: false,
    //   }),
    // ]),
    view: new View({
      center: [106.675271, 26.579508],
      zoom: 10, // starting zoom
      projection: 'EPSG:4326',
    }),
  })
  // 获取控件列表
  const defaultControlList = map.getControls()
  defaultControlList.forEach(control => {
    console.log(control)
    // console.log(control.element, 'zqj log')
  })
  // 实例化控件
  const zoomSlider = new ZoomSlider()
  // 添加控件
  map.addControl(zoomSlider)
  const zoomToExtent = new ZoomToExtent({
    // TODO 设置缩放范围 [minx, miny, maxx, maxy]
    // 这些值是在地图上的像素坐标？经纬度坐标？
    extent: [12667718, 2562800, 12718359, 2597725],
  })
  map.addControl(zoomToExtent)
  const fullScreen = new FullScreen()
  map.addControl(fullScreen)
  const overviewMap = new OverviewMap({
    collapsed: false,
  })
  map.addControl(overviewMap)
  const rotate = new Rotate()
  map.addControl(rotate)
  // const mousePosition = new MousePosition({})
  // map.addControl(mousePosition)
  const scaleLine = new ScaleLine()
  map.addControl(scaleLine)
  const attribution = new Attribution({
    collapsible: true,
  })
  map.addControl(attribution)
}
</script>

<template>
  <div class="init-map" ref="olControl"></div>
</template>

<style scoped lang="scss">
.init-map {
  position: absolute;
  inset: 0;
}
</style>
