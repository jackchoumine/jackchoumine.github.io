<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-26 10:07:10
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-26 16:28:36
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

const mapContainer = ref(null)
const layers = shallowRef([])
onMounted(initMap)

function initMap() {
  const tianDiTuKey = '4c409692826bccaca32ee3e1a74ba1b5'
  // 矢量注记
  const tianDiTuUrl3 = `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource3 = new XYZ({
    // attributions: '天地图-矢量注记',
    attributions: frameState => {
      // console.log(frameState)
      return ['天地图-矢量注记']
    },
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
    target: mapContainer.value,
    layers: [
      new Tile({
        // name: 'hello',
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
    // [经度1,纬度1,经度2,纬度2]
    extent: [
      105.49904724511718, 26.075510197265626, 107.85149475488281, 27.083505802734376,
    ],
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
  const mousePosition = new MousePosition({})
  map.addControl(mousePosition)
  const scaleLine = new ScaleLine()
  map.addControl(scaleLine)
  const attribution = new Attribution({
    collapsible: true,
  })
  map.addControl(attribution)
  console.log(map)
  layers.value = map.getAllLayers()
  // layers.forEach(layer => {
  //   layer.getSource().setAttributions('hello')
  //   const attr = layer.getSource().getAttributions()(null)
  //   console.log(attr)
  // })
}
function toggleLayer(index: number) {
  layers.value[index].setVisible(!layers.value[index].getVisible())
}
</script>

<template>
  <div class="init-map" ref="mapContainer">
    <div class="layer-control">
      <div class="title">
        <label> 图层列表 </label>
      </div>
      <ul class="layer-tree">
        <li v-for="(layer, index) in layers" :key="index">
          <label :for="'' + index">
            <input
              type="checkbox"
              :id="'' + index"
              :checked="layer.getVisible()"
              @change="toggleLayer(index)" />
            {{ '图层' + (index + 1) }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.init-map {
  position: absolute;
  inset: 0;

  /* 图层控件的样式设置 */
  .layer-control {
    position: absolute;
    top: 20%;
    right: 0;
    z-index: 2001;
    min-width: 200px;
    max-height: 200px;
    color: #fff;
    background-color: #4c4e5a;
    border-width: 10px;
    border-radius: 10px;
    border-color: #000;

    .title {
      margin: 10px;
      font-size: 15px;
      font-weight: bold;
    }

    li {
      list-style: none;
      margin: 5px 10px;

      label {
        display: inline-block;
        width: 100%;
      }
    }
  }

  :deep(.ol-overlaycontainer-stopevent) {
    .ol-mouse-position {
      position: absolute;
      inset: auto auto 8px 300px;
      background-color: azure;
    }

    .ol-zoom {
      .ol-zoom-out {
        margin-top: 204px;

        .ol-has-tooltip:focus [role='tooltip'],
        .ol-has-tooltip:hover [role='tooltip'] {
          top: 232px;
        }
      }
    }

    .ol-zoomslider {
      top: 2.75em;
      background-color: transparent;
    }

    /* ol.control.zoomToExtent 控件样式的设置，将其放到导航条下方 */
    .ol-zoom-extent {
      top: 280px;
    }
  }
}
</style>
