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
