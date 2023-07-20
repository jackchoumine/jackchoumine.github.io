# label 冲突检测

什么是 label 冲突？

当两个 label 距离很近的时候，会发生重叠，这就是 label 冲突。

![leaflet-label](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/leaflet-collision.png '两个label重叠')

![leaflet-label](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/leaflet-collision-many-20230718205042.png '很多label冲突')

label 重叠 (label overlapping)，会导致用户无法看清楚地图上的信息，所以需要解决 label 冲突。

## 解决方案

使用 leaflet 插件`@panzhiyue/leaflet-canvaslabel`

```bash
pnpm i @panzhiyue/leaflet-canvaslabel
```
