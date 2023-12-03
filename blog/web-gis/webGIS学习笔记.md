# WEB GIS 介绍

## GIS 介绍

### GIS

GIS: 地理信息系统(geographic information system)

在硬软件的支持下，对**地理空间数据**进行采集、存储、管理、处理、分析、显示、输出等一系列操作的计算机系统。

### GIS 的应用

* 行业应用

应用于国土资源、城市规划、环境保护、农业、林业、水利、地质、测绘、物流等领域，为这些领域的决策提供空间信息支持。

* 大众应用

地图导航、地图搜索、地图标注、地图分享、地图游戏等。

## WEB GIS

GIS 和 WEB 服务相结合，将 GIS 功能发布到 WEB 上，用户通过**浏览器**访问 GIS 服务，实现空间数据的共享和交换。

得益于 WEB 技术的发展，WEB GIS 也在不断发展，从最初的静态地图，到现在的动态地图，WEB GIS 的应用也越来越广泛。

WEB GIS 的项目架构和传统 WEB 项目的架构几乎没有区别，都是前端(表现层)、后端、数据库三层，只是前端的展示形式不同，即 WEB GIS 的前端加入了地图功能，后端需要提供地图服务。

### 常用的 WEB GIS 库或者平台

1.  [leaflet](https://leafletjs.cn/)

轻量、简单、易上手、支持移动端

<!-- 为何移动端支持友好？

使用 img 和 svg 绘图，不使用 canvas，canvas 在移动端的性能不好。 -->

2. [openLayers](https://openlayers.org/)

功能强大、支持移动端，绘制图形的方式是 canvas，主要用在 pc 上。

3. [mapbox](https://www.mapbox.com/)

多端支持，渲染的地图精美，付费的。绘制图形的方式是 canvas WEBGL 模式。

4. [cesium](https://cesium.com/)

3D 地图，WEBGL 模式。

此外，还有 google earth、arcGis、百度地图和高德地图等地图厂商，也提供了强大的GIS服务，有一定的免费额度。

### 常见的开源WEB GIS 平台

类型|项目|说明
-----|-----|-----
桌面工具|QGIS、uDig、GRASS|主要用于制图，即桌面端加载数据和对数据编辑
服务器|geoServer、MapServer、Geodjiango|主要用于发布地图服务，geoServer基于J2EE框架、MapServer 核心部分基于C语言
数据库|PostGIS、PortgreSQL、MySQL Spatial|主要用于存在空间数据
客户端|openLayers、openScales、leaflet、arcGis、cesium|客户端开发框架或者平台

## 传统的 WEB 开发者需要了解的 GIS 知识

GIS 最核心的是空间数据，空间数据的表现形式是**地图**，地图的表现形式是**图层**，图层的表现形式是**要素**，要素的表现形式是**几何图形**。

这句话概括了GIS需要学习的内容。

### 计算机图形学

在浏览器平台上，需要了解这些知识

* canvas API

* WEBGL

> 学会使用上述生常用的地图库，使用它们开发项目，有精力再深入

### 几何图形 (geometry)

* 常见几何图形

> 点

几何图形的基本单元，只有位置，没有大小。点是现实世界点状物体（电杆、水文站等）的抽象，种类多种多样，除了位置坐标，还有一些附加属性，比如种类、颜色、高度等用于描述物体的数据。

> 线

描述现实世界中的条状物体，比如河流、航线、道路。采用线上的一些节点可就描述整条线，这些节点是线的端点和转折点。在计算机中，采用有序点来表示。线也有附加属性。

> 面

描述现实世界中的面状物体，比如地块、湖泊、行政区等。在计算机中，面是三个以及三个以上的节点连接而成的封闭图形。可通过有序的节点描述。

带洞的面。

* 几何图形的空间关系

### 坐标系

地球时一个两级扁赤道突的椭球体，为了方便计算，将地球投影到一个平面上，这个平面就是地图，投影的方式有很多种，每种投影方式都有自己的坐标系。

* 地理坐标系 (GCS)

表示方式：经纬度。

* 投影坐标系 (PCS)

表示方式：米。

投影坐标系 = 地理坐标系 + 投影方法

 `(x,y) = F(lng,lat)`

莫卡托投影： 光源在地球中心，投影到平面上，保证了角度的不变性，但是面积会发生变化。

WEB mercator = WGS84 + 莫卡托投影

![](https://cdn.jsdelivr.net/gh/jackchoumine/jack-picture@master/xy.png)

投影变换库

[pro4js](https://github.com/proj4js/proj4js)

transform 函数源码学习

<!-- TODO  -->

> 地图坐标系和屏幕坐标的转化如何转换？

### 两种数据类型

* 矢量数据

> 几何图形的表示 geojson

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [102.0, 0.5]
  },
  "properties": {
    "prop0": "value0"
  }
}
```

[生成几何图形](https://geojson.io)

矢量数据放大缩小不会失真，但会出现锯齿，和屏幕分辨率有关。

常见的矢量格式：

svg、shapeFile(shp)、geojson、kml、gml

实操：使用 [qgis](https://qgis.org/) 软件作图，了解矢量数据的特点。

[B 站 qgis 软件操作教程](https://www.bilibili.com/video/BV1vg4y1B7Wa/?vd_source=9bbf149e26315d2edf55b034712e09d6)

* 栅格数据

栅格数据放大会失真

常见的栅格格式：

png jpg bmp tiff（影像图层）

### FeatureClass & FeatureLayer

（矢量）图层（FeatureLayer）：将具有同类特征的要素(Feature)归为一类要素类(FeatureClass)，通过一定的配置(标注、渲染符号等)渲染到地图上。

![](https://cdn.jsdelivr.net/gh/jackchoumine/jack-picture@master/%E7%9F%A2%E9%87%8F%E5%9B%BE%E5%B1%82-1.png)

![](https://cdn.jsdelivr.net/gh/jackchoumine/jack-picture@master/%E7%9F%A2%E9%87%8F%E5%9B%BE%E5%B1%82-2.png)

> 矢量图层数据源格式：

* esri shapeFile (.shp) 标准格式

* geojson -- 常见于 WEBGIS 数据交换

* esri geoDatabase (.pgdb .fgdb ) -- esri 公司的专有格式

* qgis geoPackage (.gpkg) -- qgis 公司的专有格式

### 数据切片

矢量切片

栅格切片

## 渲染方式

### 客户端渲染

三种渲染方式

栅格数据渲染方式：

1. 渲染到 img 标签上
2. 渲染到 canvas 标签上

矢量数据渲染方式：

1. 渲染到 svg 标签上
2. 渲染到 canvas 标签上

这些是常见 WEB GIS 库底层渲染原理。

### 后端渲染

### 静态切片

## 参考教程

[湖南师范大学 -- GIS 原理及应用 -- bilibili 视频课程](https://www.bilibili.com/video/BV1bV4y1M7aV/?spm_id_from=pageDriver&vd_source=9bbf149e26315d2edf55b034712e09d6)

[WEB GIS 入门介绍 -- bilibili 视频课程](https://space.bilibili.com/1042945573/channel/collectiondetail?sid=1361242)

[WEBGIS开发教程 -- 讲的很一般](https://lzugis15.gitee.io/lzugis-blogs/)
