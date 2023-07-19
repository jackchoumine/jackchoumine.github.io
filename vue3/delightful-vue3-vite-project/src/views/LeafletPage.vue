<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 20:29:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-19 20:56:18
 * @Description : leaflet 学习
-->
<script setup>
import {
  EditFeatures,
  GeoJSON,
  InitMap,
  InitMap2,
  LayerControl,
  LayerDemo,
  MarkerDemo,
  WithAMap,
} from '@/components'

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
          <QTab name="init" label="初始化-demo1" />
          <QTab name="init2" label="初始化-demo2" />
          <QTab name="with-a-map" label="整合高德" />
          <QTab name="tile-layer" label="瓦片图层" />
          <QTab name="marker" label="标记" />
          <QTab name="layer-control" label="图层控制" />
          <QTab name="geo-json" label="geoJson" />
          <QTab name="edit-features" label="编辑要素" />
          <QTab name="event" label="事件" />
          <QTab name="style-custom" label="修改组件样式" />
        </QTabs>
        <QSeparator />
        <QTabPanels v-model="tab" animated>
          <QTabPanel name="init">
            <InitMap />
          </QTabPanel>
          <QTabPanel name="init2">
            <InitMap2 />
          </QTabPanel>
          <QTabPanel name="with-a-map">
            <WithAMap />
          </QTabPanel>
          <QTabPanel name="tile-layer"><LayerDemo /> </QTabPanel>
          <QTabPanel name="marker"> <MarkerDemo /> </QTabPanel>
          <QTabPanel name="layer-control"> <LayerControl /> </QTabPanel>
          <QTabPanel name="geo-json"><GeoJSON /> </QTabPanel>
          <QTabPanel name="edit-features"> <EditFeatures /></QTabPanel>
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
