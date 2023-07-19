# leaflet 标记聚合

在地图上标记大量的点时，如果点之间的距离很小，当地图缩小时，点会重叠在一起，遮挡地图，这时候就需要对点进行聚合，当地图缩小时，点会聚合在一起，当地图放大时，点会分散开来。

使用 leaflet 的插件`leaflet.markercluster`来标记聚合。

## 在地图上添加标记

```js
  const featureGroup = new FeatureGroup()
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
    marker.addTo(featureGroup)
  })
  featureGroup.addTo(map)
```

地图放缩级别为`13`时的标记

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/marker-cluster-before.png)

缩小，标记重叠

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/marker-overlap.png)

使用 leaflet 聚合插件，优化显示：

1. 安装插件

```bash
npm i leaflet.markercluster
```

2. 引入插件

```js
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { MarkerClusterGroup } from 'leaflet.markercluster'
```

使用`MarkerClusterGroup`代替`FeatureGroup`

```js
// const featureGroup = new FeatureGroup()
const featureGroup = new MarkerClusterGroup()
```

地图放缩级别为`13`时的标记，距离很近的标记会聚合在一起，并有数字标记聚合的数量

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/marker-cluster-after.png)

地图缩小到一定级别，标记聚合成一个

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/marker-cluster-to-one.png)

## 如何配置聚合插件？

配置项有点多，等需要时再来了解吧。

文档：[markercluster](https://github.com/Leaflet/Leaflet.markercluster)

## 可以聚合其他图层吗，比如 circleMarker ？

可以聚合 circleMarker，其他不行。

## 关于 FeatureGroup

FeatureGroup 要素组，扩展了 LayerGroup，方便对所有要素图层进行操作，比如添加到地图上，移除等。

文档：[featuregroup](https://leafletjs.cn/reference.html#featuregroup)

比如：

```js
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

  setTimeout(() => {
    map.removeLayer(featureGroup)
  }, 2000)
```

把要素添加到要素组中，然后把要素组添加到地图上，2 秒后移除要素组。

## 关于聚合容差 tolerance

检测两个点是否重叠的容差，单位是像素，当小于这个容差时，两个点会被聚合在一起。

## 参考

[Leaflet 进阶 D14--marker 聚合源码](https://stackblitz.com/edit/leaflet-d14?file=index.js)
