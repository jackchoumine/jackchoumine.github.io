<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 20:29:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-10 21:08:23
 * @Description : leaflet 学习
-->
<script setup>
import {
  DrawGeo,
  GeoStyle,
  ModifyFeatures,
  /* GeoJSON, InitMap, LayerControl, MarkerDemo */
  OLControl,
  OLInitMap,
  PublicMapData,
} from '@/components/OpenLayersDemos'

const tab = ref('init')
</script>

<template>
  <div class="q-pa-md h-full">
    <div class="q-gutter-y-md h-full">
      <QCard class="h-full">
        <QTabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator>
          <QTab name="init" label="初始化" />
          <QTab name="control" label="地图控件" />
          <QTab name="public-map-data" label="公共地图数据" />
          <QTab name="draw-geo" label="交互绘制" />
          <QTab name="geo-style" label="几何图形的样式" />
          <QTab name="modify-features" label="修改要素" />
          <QTab name="marker" label="标记" />
          <QTab name="layer-control" label="图层控制" />
          <QTab name="geo-json" label="geoJson" />
          <QTab name="event" label="事件" />
          <QTab name="style-custom" label="修改组件样式" />
        </QTabs>
        <QSeparator />
        <QTabPanels v-model="tab" animated>
          <QTabPanel name="init">
            <OLInitMap />
          </QTabPanel>
          <QTabPanel name="control"><OLControl /> </QTabPanel>
          <QTabPanel name="public-map-data">
            <PublicMapData />
          </QTabPanel>
          <QTabPanel name="draw-geo">
            <!-- 交互绘制几何图形 -->
            <DrawGeo />
          </QTabPanel>
          <QTabPanel name="geo-style">
            <!-- 交互绘制几何图形 -->
            <GeoStyle />
          </QTabPanel>
          <QTabPanel name="modify-features">
            <ModifyFeatures />
          </QTabPanel>
          <QTabPanel name="marker">
            <!-- <MarkerDemo /> -->
          </QTabPanel>
          <QTabPanel name="layer-control">
            <!-- <LayerControl /> -->
          </QTabPanel>
          <QTabPanel name="geo-json">
            <!-- <GeoJSON />  -->
          </QTabPanel>
          <QTabPanel name="event"> </QTabPanel>
          <QTabPanel name="style-custom"> </QTabPanel>
        </QTabPanels>
      </QCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.q-tab-panels {
  height: calc(100% - 38px);
}
</style>
