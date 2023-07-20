# leaflet 要素编辑

使用 leaflet 插件[geoman-io](https://geoman.io/docs/getting-started/free-version)实现要素编辑功能，这个插件有免费版和付费版，免费版功能已经很强大了，付费版功能更强大，但是价格也不菲，最低 999 欧元/年。

## 安装

```bash
npm i @geoman-io/leaflet-geoman-free
```

引入插件

```js
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
```

> 没找到按需引入的方法。

## 添加编辑控件到地图

```js
map.pm.addControls({
  position: 'topright',
})
```

> 位置可以是：topleft, topright, bottomleft or bottomright

这样就可在地图上绘制要素了。

## 如何配置？

配置项有点多，等需要时再来了解吧。

## 编辑完成后，如何获取要素？

编辑完成后，希望获取到要素信息，然后通过接口保存到数据库。

<!-- TODO 获取要素信息 -->
