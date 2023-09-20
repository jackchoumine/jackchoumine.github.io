# leaflet 学习笔记(二)--地图初始化

Map 是 leaflet 的核心类，通过它可以在页面上创建并操作地图。

其初始化方法为: `L.map(<String|HTMLElement> id, <Map options> options?)`

主要 `options` 对象选项

| 分组     | key                | 类型              | 默认值    | 描述                                                             |
| -------- | ------------------ | ----------------- | --------- | ---------------------------------------------------------------- |
| 渲染配置 | preferCanvas       | boolean           | false     | 线和面要素的渲染方式，支持 svg 和 canvas 两种，默认为 svg。      |
| 控件配置 | attributionControl | boolean           | true      | 是否显示 attribution 控件，即图层版权信息。                      |
| 交互配置 | closePopupOnClick  | boolean           | true      | 点击地图是否关闭 popup。                                         |
| 控件配置 | zoomControl        | boolean           | true      | 是否添加放缩控件。                                               |
| 交互配置 | zoomDelta          | number            | 1         | 放缩数量级。                                                     |
| 交互配置 | trackResize        | boolean           | true      | 地图容器大小变化时地图是否调整。                                 |
| 交互配置 | boxZoom            | boolean           | true      | 按下 shift, 是否可框选放缩地图，放缩框选的位置。                 |
| 交互配置 | doubleClickZoom    | boolean \| string | true      | 开启双击放大。 `center` ，取地图中心点放大，true，鼠标位置放大。 |
| 交互配置 | dragging           | boolean           | true      | 是否可拖拽。                                                     |
| 初始状态 | crs                | CRS               | EPSG3857  | 投影方式                                                         |
| 初始状态 | center             | LatLng            | undefined | 地图中心                                                         |
| 初始状态 | zoom               | number            | undefined | 放缩级别                                                         |
| 初始状态 | minZoom            | number            | undefined | 最小放缩级别                                                     |
| 初始状态 | maxZoom            | number            | undefined | 最大放缩级别                                                     |
| 初始状态 | layers             | Layer[]           | []        | 图层                                                             |
| 初始状态 | maxBounds          | LatLngBounds[]    | null      | 最大展示范围                                                     |
| 初始状态 | renderer           | Renderer          | \*        | 矢量图形的渲染方式，L. SVG 或者 L. Canvas                        |

## 全部配置选项

```ts
interface MapOptions {
    preferCanvas?: boolean | undefined;

    // Control options
    attributionControl?: boolean | undefined;
    zoomControl?: boolean | undefined;

    // Interaction options
    closePopupOnClick?: boolean | undefined;
    zoomSnap?: number | undefined;
    zoomDelta?: number | undefined;
    trackResize?: boolean | undefined;
    boxZoom?: boolean | undefined;
    doubleClickZoom?: Zoom | undefined;
    dragging?: boolean | undefined;

    // Map state options
    crs?: CRS | undefined;
    center?: LatLngExpression | undefined;
    zoom?: number | undefined;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    layers?: Layer[] | undefined;
    maxBounds?: LatLngBoundsExpression | undefined;
    renderer?: Renderer | undefined;

    // Animation options
    fadeAnimation?: boolean | undefined;
    markerZoomAnimation?: boolean | undefined;
    transform3DLimit?: number | undefined;
    zoomAnimation?: boolean | undefined;
    zoomAnimationThreshold?: number | undefined;

    // Panning inertia options
    inertia?: boolean | undefined;
    inertiaDeceleration?: number | undefined;
    inertiaMaxSpeed?: number | undefined;
    easeLinearity?: number | undefined;
    worldCopyJump?: boolean | undefined;
    maxBoundsViscosity?: number | undefined;

    // Keyboard navigation options
    keyboard?: boolean | undefined;
    keyboardPanDelta?: number | undefined;

    // Mousewheel options
    scrollWheelZoom?: Zoom | undefined;
    wheelDebounceTime?: number | undefined;
    wheelPxPerZoomLevel?: number | undefined;

    // Touch 交互配置
    tap?: boolean | undefined;
    tapTolerance?: number | undefined;
    touchZoom?: Zoom | undefined;
    bounceAtZoomLimits?: boolean | undefined;
}
```

> `zoomDelta` 只能是整数， `zoomSnap` 可以是小数吗？

是的。

在 Leaflet.js 中，zoomSnap 和 zoomDelta 是用于控制地图缩放行为的两个属性。

1. zoomSnap（缩放步进）：它定义了地图缩放级别的步进值。当使用鼠标滚轮或可缩放控件来进行缩放时，地图的缩放级别将根据此属性进行调整。例如，将 zoomSnap 设置为 0.5，则缩放级别只能是 0.5 的倍数，即 1、1.5、2、2.5 等。这可以用来限制缩放级别的精确度，避免出现非常小或非常大的缩放级别。

2. zoomDelta（缩放增量）：它定义了地图缩放级别的增量值。当使用键盘或触摸设备进行缩放时，地图的缩放级别将根据此属性进行调整。例如，将 zoomDelta 设置为 1，则每次按下"+"或"-"键时，缩放级别将增加或减少 1 个级别。这可以用来控制缩放级别变化的速度。

简单地说，zoomSnap 用于限制缩放级别的精确度，而 zoomDelta 用于控制缩放级别的增量变化。通过调整这两个属性，可以更好地控制地图的缩放行为，以满足特定需求和用户体验。

## 初始化地图

调用 `Map` 类初始化地图

```js
const map = new Map(mapContainer.value, {

})
```

## 事件

地图状态事件

| 事件名           | 描述                                 |
| ---------------- | ------------------------------------ |
| load             | 地图加载完成时触发。                 |
| resize           | 地图容器大小变化时触发。             |
| movestart        | 地图开始移动时触发。                 |
| move             | 地图移动时触发，移动过程中连续触发。 |
| moveend          | 地图移动结束时触发。                 |
| zoomstart        | 地图开始缩放时触发。                 |
| zoom             | 地图缩放时触发，缩放过程中连续触发。 |
| zoomend          | 地图缩放结束时触发。                 |
| zoomlevelschange | 地图缩放级别发生变化时触发。         |
| dragstart        | 地图开始拖拽时触发。                 |
| drag             | 地图拖拽时触发，拖拽过程中连续触发。 |
| dragend          | 地图拖拽结束时触发。                 |

图层事件

| 事件名          | 描述                            |
| --------------- | ------------------------------- |
| baselayerchange | 当底图切换时触发。              |
| overlayadd      | 当图层控件选择 overlay 时触发。 |
| overlayremove   | 当图层控件从地图上移除时触发。  |
| layeradd        | 当图层添加到地图时触发。        |
| layerremove     | 当图层从地图上移除时触发。      |

弹出框事件

| 事件名     | 描述                 |
| ---------- | -------------------- |
| popupopen  | 当弹出框打开时触发。 |
| popupclose | 当弹出框关闭时触发。 |

提示信息事件

| 事件名       | 描述                   |
| ------------ | ---------------------- |
| tooltipopen  | 当提示信息打开时触发。 |
| tooltipclose | 当提示信息关闭时触发。 |

定位事件

| 事件名        | 描述               |
| ------------- | ------------------ |
| locationfound | 当定位成功时触发。 |
| locationerror | 当定位失败时触发。 |

交互事件

| 事件名      | 描述                   |
| ----------- | ---------------------- |
| click       | 当鼠标点击时触发。     |
| dblclick    | 当鼠标双击时触发。     |
| mousedown   | 当鼠标按下时触发。     |
| mouseup     | 当鼠标松开时触发。     |
| mouseover   | 当鼠标移入时触发。     |
| mouseout    | 当鼠标移出时触发。     |
| mousemove   | 当鼠标移动时触发。     |
| contextmenu | 当鼠标右键点击时触发。 |

## 方法

### 渲染相关

| 方法        | 参数  | 返回值   | 描述         |
| ----------- | ----- | -------- | ------------ |
| getRenderer | layer | Renderer | 获取渲染方式 |

### 空间相关

| 方法                             | 返回值 | 描述 |
| -------------------------------- | ------ | ---- |
| `addControl(control:Control)` | this   |      |
| `removeControl(control:Control)` | this   |      |

### 图层相关

| 方法                                          | 返回值                                              | 描述     |
| --------------------------------------------- | --------------------------------------------------- | -------- |
| `addLayer(layer:Layer)` | this                                                | 添加图层 |
| `removeLayer(layer:Layer)` | this                                                | 移除图层 |
| `hasLayer(layer:Layer)` | boolean                                             |          |
| `eachLayer(callBack:function,context:Object)` | this                                                | 遍历图层 |
| `openPopup(popup:Popup)` | this                                                |          |
| `openPopup(content:string\|HTMLElement,latlng:LatLng,options?:PopupOptions)` | this     | 创建 popup |
| `closePopup(popup?:Popup)` | this                                                |          |
| `openTooltip(tooltip:Tooltip)` | this                                                |          |
| `openTooltip(content:string\|HTMLElement,latlng:LatLng,options?:TooltipOptions)` | this     |            |
| `closePopup(tooltip:Tooltip)` | this                                                |          |

### 修改地图状态相关

| 方法                                                         | 返回值 | 描述             |
| ------------------------------------------------------------ | ------ | ---------------- |
| `setView(latlng:LatLng,zoom:number,zoomOptions?:options)` | this   | 设置中心点       |
| `setZoom(zoom:number,zoomOptions?:options)` | this   | 设置放缩级别     |
| `setZoom(zoom:number,zoomOptions?:options)` | this   | 设置放缩级别     |
| `setMinZoom(zoom:number)` | this   | 设置最小放缩级别 |
| `setMaxZoom(zoom:number)` | this   | 设置最大放缩级别 |
| `zoomIn(delta?:number,zoomOptions?:options)` | this   | 放大地图         |
| `zoomOut(delta?:number,zoomOptions?:options)` | this   | 放大地图         |
| `fitBounds(bounds:LatLngBounds,fitOptions?:options)` | this   | 设置地图范围     |
| `panBy(point:offset,panOptions?:options)` | this   | 移动到某一像素点 |
| `flyTo(latlng:LatLng,zoom:number,zoomOptions?:options)` | this   | 飞到某一点       |
| `flyToBounds(bounds:LatLngBounds,fitBoundsOptions?:options)` | this   | 飞到范围         |
| `locate(locateOptions?:options)` | this   | 定位             |
| `stopLocate()` | this   | 停止定位         |
| `setMaxBounds(bounds:LatLngBounds)` | this   | 设置最大范围     |
| `setMaxBounds(bounds:LatLngBounds)` | this   | 设置最大范围     |

### 获取地图状态

| 方法                                             | 返回值 | 描述         |
| ------------------------------------------------ | ------ | ------------ |
| `getPane(name:string)` | pane   | 获取图层面板 |
| `createPane(name:string,container?:HTMLElement)` | this   |              |
| `getPanes()` | panes  |              |
| `getCenter()` | LatLng |              |
| `getZoom()` | number |              |

### 其他方法

| 方法                               | 返回值 | 描述         |
| ---------------------------------- | ------ | ------------ |
| `addHandler(name:string,callBack)` | this   | 添加操作     |
| `remove()` | this   | 移除所有操作 |

## 小结

介绍了核心类 `Map` 相关的配置、事件和方法。
