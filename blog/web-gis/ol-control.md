# ol 常用控件

地图控件：方便用户操作地图的工具，如缩放、旋转、全屏、鼠标位置、比例尺等，都是 **ol.control.Control** 的子类。

每个控件都作为一个 DOM 元素显示在屏幕上，因此可以**通过 CSS 样式来控制控件的显示位置、大小、颜色**等。

9 个常用控件：

1. 滑块缩放控件（ZoomSlider） —— 以滑块的形式缩放地图。
2. 缩放至特定位置控件（ZoomToExtent） —— 用于将地图视图缩放至特定位置。
3. 普通缩放控件（Zoom） —— 普通缩放控件，它会默认加入到地图中。
4. 全屏控件（FullScreen） —— 控制地图全屏展示。
5. 鹰眼控件（OverviewMap） —— 生成地图的一个概览图。
6. 旋转控件（Rotate） —— 用于鼠标拖拽旋转地图，它会默认加入到地图中。
7. 坐标拾取控件（MousePosition） —— 用于在地图上拾取坐标。
8. 比例尺控件（ScaleLine） —— 用于生成地图比例尺。
9. 归属控件（Attribution） —— 用于展示地图资源的版权或者归属，它会默认加入到地图中。

添加控件的方式：

1. 在创建地图时，通过 `controls` 参数添加控件

```js
import {ZoomSlider, defaults as defaultControls } from 'ol/control'

const map= new Map({
    controls: defaultControls({
      attribution: false,
      zoom: false,
      rotate: false,
    }).extend([
        new ZoomSlider(),
    ])
})
```

2. 通过 `addControl` 方法添加控件

```js
import {ZoomSlider} from 'ol/control'

const map= new Map({
    controls: [],
})
map.addControl(new ZoomSlider())
```

## 默认控件

ol 默认通过`ol.control.defaults`添加了 3 个控件：放缩控件(`ol.control.Zoom`)、旋转控件(`ol.control.Rotate`)和图层数据源属性控件(`ol.control.Attribute`)。

```js
import { defaults as defaultControls } from 'ol/control'

const map= new Map({
    controls: defaultControls({
      attribution: false,
      zoom: false,
      rotate: false,
    })
})

// 获取控件列表
const defaultControlList = map.getControls()
defaultControlList.forEach(control => {
  console.log(control, 'zqj log')
})
```

> 以上代码设置了**不加载**默认的属性控件、放缩控件和旋转控件。

## 放缩控件

三种放缩控件：按钮放缩、滑块放缩和缩放至特定位置。

### 按钮放缩

按钮形式的放缩控件`Zoom`，包含放大和缩小两个按钮，点击按钮可以放大或缩小地图，在地图左上角。

```js
import { Zoom } from 'ol/control'
const zoom = new Zoom()
map.addControl(zoom)
```

### 滑块放缩

滑块形式的放缩控件`ZoomSlider`，包含一个滑块，拖动滑块可以放大或缩小地图，在地图左上角。

```js
import { ZoomSlider } from 'ol/control'
const zoomSlider = new ZoomSlider()
map.addControl(zoomSlider)
```

### 缩放至特定位置

缩放至特定位置控件`ZoomToExtent`，包含一个按钮，点击按钮可以将地图视图缩放至特定位置，在地图左上角。

```js
import { ZoomToExtent } from 'ol/control'
const zoomToExtent = new ZoomToExtent({
    // TODO extent 是什么值？
    extent: [0, 0, 100, 100],
})
map.addControl(zoomToExtent)
```

## 全屏控件

全屏控件`FullScreen`，包含一个按钮，点击按钮可以将地图全屏展示，在地图右上角。

```js
import { FullScreen } from 'ol/control'
const fullScreen = new FullScreen()
map.addControl(fullScreen)
```

## 鹰眼控件

鹰眼控件`OverviewMap`，包含一个按钮，点击按钮可以将地图全屏展示，在地图左下角。

```js
import { OverviewMap } from 'ol/control'
const overviewMap = new OverviewMap({
    collapsed: false,// 是否折叠，默认为 true
})
map.addControl(overviewMap)
```

## 旋转控件

旋转控件`Rotate`，包含一个按钮，点击按钮可以旋转地图，在地图右上角。

默认为`0`弧度，为 0 时，会自动隐藏。

```js
import { Rotate } from 'ol/control'
const rotate = new Rotate({
  autoHide: false,// 是否自动隐藏，默认为 true
})
map.addControl(rotate)
```

## 坐标拾取控件

坐标拾取控件`MousePosition`，在地图右上角显示鼠标的坐标。

```js
import { MousePosition } from 'ol/control'
const mousePosition = new MousePosition()
map.addControl(mousePosition)
```

## 比例尺控件

比例尺控件`ScaleLine`，在地图左下角显示比例尺。

```js
import { ScaleLine } from 'ol/control'
const scaleLine = new ScaleLine()
map.addControl(scaleLine)
```

## 归属控件

归属控件`Attribution`，在地图右下角显示地图资源的版权或者归属。

```js
import { Attribution } from 'ol/control'
const tianDiTuKey = '4c409692826bccaca32ee3e1a74ba1b5'
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
  view: new View({
    center: [106.675271, 26.579508],
    zoom: 10, // starting zoom
    projection: 'EPSG:4326',
  }),
})

const attribution = new Attribution({
  collapsible: true, // 是否可折叠，默认为 false
})
map.addControl(attribution)
```

## 移除控件

通过`removeControl`方法移除控件。

```js
map.removeControl(attribution)
```

## 修改控件

控件都是通过 DOM 元素实现的，可通过修改 DOM 元素样式实现自定义控件样式。

比如，把坐标拾取控件的坐标显示在地图**下方中间**的位置。

```html
<style scoped lang="scss">
.init-map {
  position: absolute;
  inset: 0;

  :deep(.ol-overlaycontainer-stopevent) {
    .ol-mouse-position {
      position: absolute;
      inset: auto auto 8px 300px;
      background-color: azure;
    }
  }
}
</style>
```

ol 默认的控件类名都是以`ol-`开头的，所以可以通过`ol-`来修改控件样式。

> 组件使用`scoped`，需要使用深度选择器`:deep()`来获取内部样式。

## 完全自定义某个控件

如何完全自定义某个控件，比如完全自定义坐标拾取控件？在控件初始化时传相关参数即可。

自定义鼠标坐标拾取控件

```js
const mousePosition = new MousePosition({
  coordinateFormat: createStringXY(6), // 保留小数点后4位, 默认为 createStringXY(15)
  projection: 'EPSG:4326', // 坐标系
  // undefinedHTML: '&nbsp', // 未定义坐标时的提示
  className: 'custom-mouse-position', // 自定义样式
  target: document.getElementById('mouse-position'), // 显示坐标的目标容器
})
map.addControl(mousePosition)
```

target 是控件放置的容器，可以是 DOM 元素，也可以是 DOM 元素的 id，需要自己创建。

> target 不要求是地图容器的子元素，也可以是地图容器的兄弟元素。
> 需要注意新建的 div 对默认的控件样式的影响。

```html
<div class="init-map" ref="mapContainer">
  <div id="mouse-position"></div>
</div>
```

className 是坐标容器的类名，ol 会创建一个类名为 className 的 div，并添加为`target`的子元素，不会创建默认的坐标容器。通过修改 className 的样式，可以实现自定义坐标拾取控件。

## 常用控件的参数和方法

上述常用控件的参数和方法可以参考[官方文档](https://openlayers.org/en/latest/apidoc/module-ol_control_Control-Control.html)。

## 图层控件

有时候，用户希望能控制图层的显示和隐藏，这时候就需要图层控件。

ol 没有提供图层控件，可结合相关接口实现对图层的控制。

```js
const layers = map.getAllLayers() // 获取所有图层
layers[0].getVisible() // 获取图层的显示状态
layers[0].setVisible(bool) // 隐藏或者显示图层
```

```html
<script lang="ts" setup>
import { Map, View } from 'ol'

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
    url: tianDiTuUrl3,
  })
  // 影像注记
  const tianDiTuUrl5 = `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
  const tianDiTuSource5 = new XYZ({
    url: tianDiTuUrl5,
  })

  const map = new Map({
    target: mapContainer.value,
    layers: [
      new Tile({
        source: tianDiTuSource3,
      }),
      new Tile({
        source: tianDiTuSource5,
      }),
    ],
    view: new View({
      center: [106.675271, 26.579508],
      zoom: 10, // starting zoom
      projection: 'EPSG:4326',
    }),
  })
  layers.value = map.getAllLayers()
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
}
</style>
```

![自定义图层控件](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/ol-layer-control.png)

通过复选框，实现对图层的控制。

## 基本操作

基本操作是指用户和地图交互的简单操作，比如平移、缩放、旋转等。基本操作的方式多样：单击放缩控件、鼠标滚轮、键盘按键等，但其核心方法都是通过`View`类的方法实现的。

### 缩放

```js
const view = map.getView()
view.setZoom(10) // 设置缩放级别
```

### 平移

即把地图移动到指定的位置，可通过设置中心点实现。

```js
view.setCenter([106.675271, 26.579508]) // 设置中心点
```

### 旋转

```js
view.setRotation(Math.PI / 6) // 设置旋转角度
```

### 复位

即回到地图初始化状态，可从配置项中获取初始值或者初始化完成后获取初始状态，复位时再回答初始状态，使用前面几种操作即可

```js
view.setZoom(10)
view.setCenter([106.675271, 26.579508])
view.setRotation(0)
```

## 动画控件

上述操作，希望增加动画效果，比如缩放时，希望有缩放的动画效果，这时候就需要动画控件。

<!-- TODO 4.4.9 -->

## 图层探测控件

<!-- TODO 运行不符合预期 4.4.8 -->
