# leaflet 学习笔记

[Leaflet](https://leafletjs.cn/) 是一个**开源**并且对**移动端友好**的交互式**二维**地图 JS 库，拥有绝大部分开发者所需要的所有地图特性。

Leaflet **简单**、**高效**、**易用**。 它可以高效的运行在桌面和移动平台, 拥有着大量的**扩展插件**、 **优秀的文档**、简单**易用的 API** 和**完善的案例**, 以及可读性较好的源码。

> Leaflet 是一个易学、易用的二维地图库，**中文文档**完善，特性丰富，生态比较繁荣，对移动端友好，能满足大部分的二维地图需求。

## 快速入门

### 安装

多种方式安装 Leaflet，推荐使用 npm 安装。

```bash
pnpm i leaflet # 我使用的是 pnpm
pnpm i @types/leaflet -D # 类型声明
```

使用 vite + vue + ts 学习的，在 main.ts 引入 leaflet 的样式：

```ts
import 'leaflet/dist/leaflet.css'
```

### 使用

新建 `InitMap.vue`

```ts
<script lang="ts" setup>
import L from 'leaflet'

const mapContainer = ref()
onMounted(() => {
  initMap(mapContainer.value)
})

function initMap(
  mapContainer: HTMLElement,
  coordinates: [number, number] = [26.55, 106.6],
  zoom: number = 11
) {
  const map = L.map(mapContainer).setView(coordinates, zoom)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  return map
}
</script>

<template>
  <div class="h-full" ref="mapContainer">
  </div>
</template>
```

`map` 方法接收一个**元素**作为参数，作为防止地图的 div，返回一个地图对象。这个元素设置了一个固定高度， `h-full` 是 `height:100%` ，撑开到父元素的高度。

其他常用参数：

<!-- TODO -->

`setView` 接收一个坐标（维度和经度）和一个缩放级别作为参数，设置地图的中心点和缩放级别，返回地图对象。用于设置用户的初始视角（用户一开始看到地图的位置）。

```ts
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map)
```

使用一个瓦片图层作为底图， `tileLayer` 方法接收一个 url 作为参数，第二个参数里的 maxZoom 指定地图的最大放缩级别。返回一个图层对象。 `addTo` 方法接收一个地图对象作为参数，将图层添加到地图上。

完成了一个简单的地图。

> 大多数 Leaflet 方法不显示声明返回值时，返回的都是地图对象，这样可以实现链式调用。

> leaflet 不绑定任何地图图层，需要自己添加。

可在地图上**添加标记**、**绘制几何图形**、添加**事件监听**、**弹出 popup** 和**其他图层**等，后续的内容围绕这些主题展开。

## 要素

地图上可添加实体或者要素（feature），实体可以是点、线、多边形或者圆圈。通过要素把数据展示在地图上，用户可以通过**点击**、**拖动**要素或者**hover**到要素上来获取更多信息。

### 标记

```ts
const marker = L.marker([26.55 /*纬度*/, 106.6 /*经度*/]).addTo(map) // 创建一个标记，添加到地图的经纬度位置
```

`marker` 两个参数，第一个是坐标，第二个是可选参数，用于设置标记的图标。不传递第二个参数时，会使用默认的图标。

![默认的标记图标](https://github.com/Leaflet/Leaflet/blob/main/dist/images/marker-icon.png)

[标记文档](https://leafletjs.cn/reference.html#marker)

第二个参数常用的选项：

```ts
const options = {
  icon: new IconDefault(), // 自定义图标
  title: '', // 和 dom title 属性一样，鼠标悬停时显示, 默认是空字符串
  alt: 'Marker', // 和 img alt 属性一样，图片加载失败时显示
  opacity: 1, // 标记的透明度
  draggable: false, // 标记是否可以拖动
}
```

> 这些属性值默认值。

如何自定义标记的图标？

leaflet 提供了一个 `Icon` 类，用于创建自定义的图标。

```ts
const myIcon = L.icon({
  iconUrl: 'my-icon.png', // 第一个地图地址或者直接是一个 base64 编码的图片。或者直接导入图片
  iconSize: [20, 40],
  iconAnchor: [22, 94],
})
```

[更多自定义图标的教程](https://leafletjs.cn/examples/custom-icons/)

### 圆圈

```ts
L.circle(GuiYangPosition, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 5000,
}).addTo(map)
```

要素的更多内容，后面学习 `geoJSON` 时，还会再讲。

## popup 弹出框

将某些信息附加到地图上的特定要素时，通常会使用 Popups。当用户操作是，比如点击或者 hover 到要素上时，会显示一个弹出框，告知更多信息。

```ts
const marker = L.marker([26.55, 106.6]).addTo(map) // 添加标记到地图上
marker.bindPopup('<p>我是一个 popup</p>').openPopup() // 弹出 popup
// 顺序重要，先添加标记到地图，后绑定 popup 内容，再打开 popup
```

`bindPopup` 方法接收一个字符串作为参数，设置 popup 的内容。 `openPopup` 方法打开**标记**上的 popup。**用户不需要点击标记，弹窗已经打开了**。

> openPopup 是图层上的一个方法，可使用它打开**标记**上的 popup。其他要素不能使用这个方法，用户点击要素才能打开 popup。

bindPopup 第一个参数可以是 `innerHTML` 即字符串，也可以是一个 `HTMLElement` ，还可以是一个函数，返回 innerHTML，比如：

```ts
const marker = L.marker([26.55, 106.6]).addTo(map)
const span = document.createElement('span')
span.style.color = 'red'
span.innerHTML = '我是一个 popup'
marker.bindPopup(span).openPopup()
```

接收一个函数，返回一个 `innerHTML` ：

```ts
const marker = L.marker([26.55, 106.6]).addTo(map)
const contentFn = layer => {
  return `<span style="background-color:red;color:#fff;font-size:20px">我是函数返回的innerHtml</span>`
}
marker.bindPopup(contentFn).openPopup()
```

> 如何让 popup 的内容可以是 vue 组件？

构造一个函数，该函数接收 vue 组件和 props，返回一个函数给 bindPopup。

```ts
const marker = L.marker([26.55, 106.6]).addTo(map)
function componentAsContent(VueComponent, props, mountEl = 'div') {
  const container = document.createElement(mountEl)
  return layer => {
    return createApp(VueComponent, props).mount(container).$el
  }
}

marker
  .bindPopup(componentAsContent(AntDesignDemos, { title: '使用vue组件' }), {
    closeButton: false,
    autoClose: false,
  })
  .openPopup()
```

> 关键，借助 `createApp` 来挂载组件，然后返回组件的渲染结果。这样一改造，当展示复杂内容时，或者弹窗里需要使用组件库的组件开展示数据时，就非常强大了。

还是可以直接在图层上添加一个**孤立的弹窗**：

```ts
const GuiYangPosition: [number, number] = [26.55, 106.6]
const popupContent = `<div style="background-color:red;color:#fff;font-size:20px">I am a standalone popup.我是一个孤立的弹窗。</div>`
const popup = L.popup().setLatLng(GuiYangPosition).setContent(popupContent)
popup.openOn(map)
```

`setContent` 接收一个参数，和 `bindPopup` 的第一个参数类型一样。

### 要素的显示顺序

默认情况下，要素的显示顺序是按照添加到地图上的顺序来的，**后添加的要素会覆盖前面的要素**。如果想要改变显示顺序，可以使用 `bringToFront` 和 `bringToBack` 方法。

```js
const circle = L.circle(GuiYangPosition, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 5000,
})
circle.bringToFront() // 将要素置于最前面
```

缺点：

当要素很多时，这种方式就不太好用了。

> 推荐的方式 -- 使用地图 panes

panes 是一些 DOM 元素的集合，leaflet 会将要素添加到这些 DOM 元素中，不同的 pane 具有不同的 z-index，从而控制不同的图层。panes 有 4 个，分别是：

* mapPane
* tilePane
* overlayPane
* shadowPane
* markerPane
* tooltipPane
* popupPane

mapPane 的 z-index 为 auto, popupPane 的 z-index 为 7000，最大。具体可看[官方文档](https://leafletjs.com/reference-1.7.1.html#map-pane)

overlayPane 默认容纳矢量要素的 pane，z-index 为 400。

通过 `createPane` 方法创建一个 pane，然后将要素添加到这个 pane 上，从而实现控制要素的显示顺序。

```js
const circlesPane = map.createPane('circlesPane')
circlesPane.style.zIndex = 410 // 比如默认的 overlayPane 大 10
const mapCircles = L.geoJSON(circles as GeoJSON.GeoJsonObject, {
  pane: 'circlesPane',
})
mapCircles.addTo(map)
```

页面上会创建一个 `div` ，类名为 `leaflet-pane leaflet-circles-pane` ，然后将要素添加到这个 `div` 中。

> 通过 pane 批量设置要素的层级，是非常有用的。

## 图层

```ts

```

切换图层

```js
layer.setUrl()
```

添加 wms 图层

```js
L.tileLayer
  .wms('http://demo.boundlessgeo.com/geoserver/ows?', {
    layers: 'nasa:bluemarble',
    format: 'image/png',
    transparent: true,
    attribution: 'NASA Blue Marble',
  })
  .addTo(map)
```

加载静态图片

```js
L.imageOverlay('http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg', [
  [40.712216, -74.22655],
  [40.773941, -74.12544],
]).addTo(map)
```

加载矢量图层

### GeoJSON

```js
L.geoJSON(geojsonFeature, {
  style: function(feature) {
    return {
      color: feature.properties.color
    }
  },
}).addTo(map)
```

### 添加线

### 添加面

### 删除图层

```js

```

> 为何使用图层组，方便操作图层，比如添加、删除、切换图层等。

### marker

## 地理信息数据结构

表示地理信息的数据格式有多种： `geoJSON` 、 `WKT` 、 `WKB` 、 `GML` 、 `GPX` 、 `KML` 、 `TopoJSON` 等。

### geoJSON

geoJSON 是一种用于表示地理信息的数据结构，它是一种 JSON 格式的数据，可以用于表示点、线、面等实体。2016 年被 IETF 标准化为 RFC 7946。Leaflet 也是支持 geoJSON 格式的数据的。

一个 GeoJSON 对象可以是 Geometry, Feature 或者 FeatureCollection。

其几何对象包括有点（表示位置）、线（表示街道、公路、边界）、多边形（表示国家、省、领土），以及由以上类型组合成的复合几何图形。

> TopoJSON（英语：TopoJSON）基于 GeoJSON 作了扩展，使得文件更小。

#### 基本几何体

> 点

```json
{
  "type": "Point",
  "coordinates": [30, 10]
}
```

![点](./102px-SFA_Point.svg.png)

> 线段

```json
{
  "type": "LineString",
  "coordinates": [
    [30, 10],
    [10, 30],
    [40, 40]
  ]
}
```

![线段](./102px-SFA_LineString.svg.png)

> 多边形或面

```json
{
  "type": "Polygon",
  "coordinates": [
    [
      [30, 10],
      [40, 40],
      [20, 40],
      [10, 20],
      [30, 10]
    ]
  ]
}
```

![多边形](./SFA_Polygon.svg.png)

```json
{
  "type": "Polygon",
  "coordinates": [
    [
      [35, 10],
      [45, 45],
      [15, 40],
      [10, 20],
      [35, 10]
    ],
    [
      [20, 30],
      [35, 35],
      [30, 20],
      [20, 30]
    ]
  ]
}
```

![多边形](./SFA_Polygon_with_hole.svg)

#### 复合几何体

[维基百科例子](https://www.wikiwand.com/zh-cn/GeoJSON)

#### 相关资源

[获取 geojson](http://datav.aliyun.com/portal/school/atlas/area_selector#&lat=33.521903996156105&lng=104.29849999999999&zoom=4)

[另一获取 geojson 的网站](http://geojson.io/#map=2/0/20)

### 参考

[【第三章 数据格式】geojson 格式详解](https://zhuanlan.zhihu.com/p/510882183)

[维基百科 geoJSON](ttps://www.wikiwand.com/zh-cn/GeoJSON)

[GeoJSON 格式入门](https://mahouoji.com/geojson-101)

[geoJson 格式说明](https://chenoge.github.io/2019/07/18/geoJson%E6%A0%BC%E5%BC%8F/)

### WKT

WKT(Well-known text)是一种用于表示**空间矢量几何体**的**文本标记语言**，类似 `html` ，就是一种特殊的文本，二进制格式为 `WKB` 。

#### 普通几何体

> 点 -- POINT

 `POINT(30,10)`

> 线段 -- LINESTRING

 `LINESTRING(30 10, 10 30, 40 40)`

> 面 -- POLYGON

 `POLYGON((30 10, 40 40, 20 40, 10 20, 30 10))`

 
 `POLYGON((35 10, 45 45, 15 40, 10 20, 35 10), (20 30, 35 35, 30 20, 20 30))`

#### 多部分几何体

> 多点 -- MULTIPOINT

 `MULTIPOINT ((10 40), (40 30), (20 20), (30 10))`

 `MULTIPOINT (10 40, 40 30, 20 20, 30 10)`

> 多线 -- MULTILINESTRING

 `MULTILINESTRING((10 10, 20 20, 10 40),(40 40, 30 30, 40 20, 30 10))`

> 多面 -- MULTIPOLYGON

 `MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)),((20 35, 10 30, 10 10, 30 5, 45 20, 20 35),(30 20, 20 15, 20 25, 30 20)))`

#### 总结表格

类型|例子|描述
-----|-----|-----
Point| `POINT(30 10)` |x坐标未30，y坐标为10的点
LineString| `LINESTRING(30 10, 10 30, 40 40)` |连接 `(30,10)、(10，30)、(40,40)` 三点的线
Polygon| `POLYGON((30 10, 40 40, 20 40, 10 20, 30 10))` |连接5个点围成的面
MultiPoint| `MULTIPOINT((10 40), (40 30), (20 20), (30 10))` |4点的集合
MultiLineString| `MULTILINESTRING((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))` |两条线段，每条线段连接2点
MultiPolygon| `MULTIPOLYGON(((30 20, 45 40, 10 40, 30 20)),((15 5, 40 10, 10 20, 5 10, 15 5)))` |两个面
GeometryCollection| `GEOMETRYCOLLECTION(POINT(10 40), LINESTRING(30 10, 10 30, 40 40), POLYGON((30 10, 40 40, 20 40, 10 20, 30 10)))` |多种几何体的集合

#### WKT 的限制

* 大小和冗余程度高：在表示复杂的空间对象时，会很冗余。相比之下，二进制的`WKB`和`Shapefile`，要小很多。
* 不能附加空间属性：WKT 仅表示几何体，无法附加几何体的属性。`GeoJSON`、`Shapefiles`和`KML`允许附加空间属性。
* 不包含参考坐标系统：坐标系统对空间分析至关重要。`GeoJSON`、`Shapefiles`包含坐标系统。
* 不能表示复杂几何体：比如曲线，3D几何体。
* 不太适合web应用：由于`大小限制`和无法附加空间属性，不太适用于web应用（传输效率低）。

由于 WKT 存在这些限制，应该综合考虑选择它。

### 验证 WKT 的格式是否正确

复杂的WKT，肉眼无法知道它的是否正确，需要借助工具验证。

python 库：

```Python
from shapely import wkt

def validate_wkt(wkt_string):
    try:
        geometry = wkt.loads(wkt_string)
        return True
    except Exception as e:
        print("Error:", e)
        return False

wkt_data = "POINT (30 10)"
is_valid = validate_wkt(wkt_data)

if is_valid:
    print("WKT is valid.")
else:
    print("WKT is not valid.")
```

[在线网页-Wicket](https://arthur-e.github.io/Wicket/)

#### 参考

[Well-known text representation of geometry](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry)

[A guide to WKT in GIS](https://mapscaping.com/a-guide-to-wkt-in-gis/)

## 渲染方式

leaflet 支持两种渲染方式： `SVG` 和 `Canvas` ，默认使用 `SVG` 。

启用 `Canvas` 渲染方式：

```js
Map(id, {
  renderer: L.canvas(),
})
```

> 启用后，检测页面的的 `.overlay-pane` 节点，会发现多了一个 canvas 节点。

> canvas 和 svg 有什么区别？

svg 是基于 XML 或者 html, 用于定义二维图形和动画。SVG 图像是通过描述形状、路径、颜色和样式等元素来构建的，它们以文本的形式存储，并且可以通过 CSS 和 JavaScript 进行操作和控制。

canvas 是 HTML5 提供的一个元素，通过 JavaScript 来实现图形绘制。Canvas 提供了一个空白的画布，开发者可以使用 JavaScript 绘制图形和动画。与 SVG 不同，Canvas 绘图是基于像素的，意味着图形的细节和清晰度取决于屏幕的分辨率。当画布的大小改变时，画布上的图像会被擦除，因此需要通过 JavaScript 重新绘制。

总的来说，SVG 适用于需要保持高清晰度和可伸缩性的图形，特别适用于图标、图表和矢量艺术等场景。而 Canvas 更适用于需要实时动画和复杂的图形处理，例如游戏和图像编辑器。选择使用 SVG 还是 Canvas 取决于你的具体需求和场景。

## 问题

1. 不支持 ES6 按需引入吗？

支持:

```js
import {
  Map
} from 'lefalet'
```

## 一些地理信息的网站

[geoapify](https://www.geoapify.com)

[一个地理信息的播客](https://mapscaping.com/)
