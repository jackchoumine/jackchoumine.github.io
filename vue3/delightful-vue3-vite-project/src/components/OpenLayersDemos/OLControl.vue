<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-26 10:07:10
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-28 23:54:17
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
import { Coordinate, createStringXY } from 'ol/coordinate'
import { easeIn, easeOut } from 'ol/easing'
import { Extent } from 'ol/extent'
import { Tile } from 'ol/layer'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj'
import { XYZ } from 'ol/source'

const mapContainer = ref(null)
const layers = shallowRef([])
onMounted(initMap)

let view: View = null
const initZoom = 10
const initCenter: Coordinate = [106.675271, 26.579508]
const initExtent: Extent = [
  105.49904724511718, 26.075510197265626, 107.85149475488281, 27.083505802734376,
]
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

  const firstLayer = new Tile({
    source: tianDiTuSource3,
  })
  const secondLayer = new Tile({
    source: tianDiTuSource5,
  })
  const map = new Map({
    target: mapContainer.value,
    layers: [firstLayer, secondLayer],
    // loadTilesWhileAnimating: true,
    view: new View({
      center: initCenter, // starting center position
      zoom: initZoom, // starting zoom
      projection: 'EPSG:4326',
    }),
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
    extent: initExtent,
  })
  map.addControl(zoomToExtent)
  const fullScreen = new FullScreen({
    tipLabel: '全屏',
  })
  map.addControl(fullScreen)
  // const overviewMap = new OverviewMap({
  //   collapsed: false,
  // })
  // map.addControl(overviewMap)
  const rotate = new Rotate()
  map.addControl(rotate)
  const mousePosition = new MousePosition({
    coordinateFormat: createStringXY(6), // 保留小数点后4位, 默认为 createStringXY(15)
    projection: 'EPSG:4326', // 坐标系
    // undefinedHTML: '&nbsp', // 未定义坐标时的提示
    className: 'custom-mouse-position', // 自定义样式
    target: document.getElementById('mouse-position'), // 显示坐标的目标容器
  })
  map.addControl(mousePosition)
  const scaleLine = new ScaleLine({
    units: 'metric',
  })
  map.addControl(scaleLine)
  const attribution = new Attribution({
    collapsible: true,
  })
  map.addControl(attribution)
  // console.log(map)
  layers.value = map.getAllLayers()
  view = map.getView()
  // console.log(view.getZoom(), 'zqj log')
  // console.log(view.getRotation(), 'zqj log')
  // console.log(view.getCenter(), 'zqj log')

  // initZoom = view.getZoom()
  // layers.forEach(layer => {
  //   layer.getSource().setAttributions('hello')
  //   const attr = layer.getSource().getAttributions()(null)
  //   console.log(attr)
  // })
  // onDocumentKeyDown(map)
  // layerDetection(map, secondLayer, map.getView())
}
function toggleLayer(index: number) {
  layers.value[index].setVisible(!layers.value[index].getVisible())
}
function resetMap() {
  view.setCenter(initCenter)
  view.setZoom(initZoom)
  // 旋转，使用弧度
  // 为 0 时自动隐藏旋转控件
  // view.setRotation((45 / 180) * Math.PI)
}

function zoom(step: number) {
  const zoom = view.getZoom()
  view.setZoom(zoom + step)
}
function goToGuiYang() {
  // TODO 如何使用 fromLonLat ？
  // const wh = fromLonLat([105, 27])
  // TODO 如何这是动画？
  view.setCenter(initCenter)
  view.setZoom(initZoom)
}
let mousePosition = null
// 探查半径
let radius = 75
function layerDetection(map: Map, secondLayer: TileLayer<XYZ>, view: View) {
  view.addEventListener('mousemove', function (event) {
    mousePosition = map.getEventPixel(event)
    console.log(mousePosition, 'zqj log')
    map.render() // 重新渲染
  })
  view.addEventListener('mouseout', function () {
    mousePosition = null
    map.render()
  })
  // 在渲染之前进行剪裁
  secondLayer.on('prerender', function (event) {
    const ctx = event.context // 影像图层画布
    const pixelRatio = event.frameState.pixelRatio // 像素比率
    ctx.save()
    ctx.beginPath()
    if (mousePosition) {
      // 只显示一个以鼠标焦点为中心(圆心)的圆圈
      ctx.arc(
        mousePosition[0] * pixelRatio,
        mousePosition[1] * pixelRatio,
        radius * pixelRatio,
        0,
        2 * Math.PI
      )
      ctx.lineWidth = 5 * pixelRatio // 圆边框的宽,设置为 5 个像素单位
      ctx.strokeStyle = 'rgba(0,0,0,0.5)' // 圆边框样式(颜色)
      ctx.stroke()
    }
    ctx.clip() // 裁剪画布
  })
  // 呈现下层图层后,恢复画布的背景
  secondLayer.on('postrender', function (event) {
    const ctx = event.context
    ctx.restore()
  })
}

function onDocumentKeyDown(map) {
  document.addEventListener('keydown', function (evt: KeyboardEvent) {
    // console.log(evt.which, 'zqj log') // TODO which 被废弃了
    // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/which
    // https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
    // https://javascript.info/keyboard-events
    // https://www.cnblogs.com/Renyi-Fan/p/8973576.html
    // keyCode 列表
    // https://css-tricks.com/snippets/javascript/javascript-keycodes/
    // console.log(evt.key, 'zqj log')
    if ('' + evt.which === '38') {
      radius = Math.min(radius + 5, 150)
      map.render()
      evt.preventDefault()
      console.log('zqj log', radius)
    } else if ('' + evt.which === '40') {
      radius = Math.max(radius - 5, 25)
      map.render()
      evt.preventDefault()
      console.log('zqj log', radius)
    }
  })
}
const shenYang = fromLonLat([123.24, 41.5])
const beiJing = fromLonLat([116.28, 39.54])
const shangHai = fromLonLat([121.29, 31.14])
const wuHan = fromLonLat([114.21, 30.37])
const guangZhou = fromLonLat([113.15, 23.08])
const haiKou = fromLonLat([110.2, 20.02])

function rotateToShenYang() {
  const center = view.getCenter()
  view.animate(
    {
      center: [(center[0] + shenYang[0]) / 2, (center[1] + shenYang[1]) / 2],
      rotation: Math.PI,
      easing: easeIn,
    },
    {
      center: shenYang,
      rotation: Math.PI * 3,
      easing: easeOut,
    }
  )
  console.log(view.getCenter(), 'zqj log')
}

function bounceToShanghai() {
  view.animate({
    center: shangHai,
    duration: 2000,
    easing: bounce,
  })
}
function bounce(t) {
  const s = 7.5625
  const p = 2.75
  let l
  if (t < 1 / p) {
    l = s * t * t
  } else {
    if (t < 2 / p) {
      t -= 1.5 / p
      l = s * t * t + 0.75
    } else {
      if (t < 2.5 / p) {
        t -= 2.25 / p
        l = s * t * t + 0.9375
      } else {
        t -= 2.625 / p
        l = s * t * t + 0.984375
      }
    }
  }
  return l
}
function elastic(t) {
  return Math.pow(2, -10 * t) * Math.sin(t - 0.075 - (2 * Math.PI) / 0.3) + 1
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
      <div class="base-operate">
        <p>基本操作</p>
        <button @click="zoom(-1)">缩小</button>
        <button @click="zoom(+1)">放大</button>
        <button @click="goToGuiYang">平移到贵阳</button>
        <button @click="resetMap">复位</button>
        <hr />
        <button @click="rotateToShenYang">旋转定位到沈阳</button>
        <button @click="rotateToShenYang">弹性定位到北京</button>
        <button @click="bounceToShanghai">反弹定位到上海</button>
        <button @click="rotateToShenYang">围绕武汉旋转</button>
        <button @click="rotateToShenYang">飞行定位到广州</button>
      </div>
    </div>
    <div id="mouse-position"></div>
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
    opacity: 0.8;
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

    button {
      margin: 2px;
      padding: 2px;
      background-color: var(--q-primary);
    }
  }

  :deep(.custom-mouse-position) {
    display: inline;
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 2001;
    font-size: x-large;
    color: red;
    background-color: aquamarine;
    opacity: 0.8;
    transform: translateX(-50%);
  }

  :deep(.ol-overlaycontainer-stopevent) {
    // .ol-mouse-position {
    //   position: absolute;
    //   inset: auto auto 8px 300px;
    //   background-color: azure;
    // }

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
